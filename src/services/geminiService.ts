import { GoogleGenAI, Type } from '@google/genai';
import { Question } from '../types/game';

let aiInstance: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiInstance) {
    // Uses GEMINI_API_KEY from environment
    aiInstance = new GoogleGenAI({});
  }
  return aiInstance;
}

export async function generateAIKidQuestion(topic: string = 'animals and everyday fun', age: 'toddler' | 'junior' | 'both' = 'both'): Promise<Question | null> {
  try {
    const ai = getAIClient();
    const prompt = `Generate a single multiple-choice question suitable for a young child (age ${age === 'toddler' ? '3 to 5' : age === 'junior' ? '6 to 8' : '3 to 8'} years old) in the style of Kaun Banega Crorepati (KBC) quiz show.
Topic: ${topic}.
The question must have 1 clear short statement, exactly 4 distinct and plausible options, 1 correct index (0 to 3), 1 friendly emoji, a simple educational explanation for the child, and a gentle hint.
Keep words very simple, positive, encouraging, and easy for young kids.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            statement: { type: Type.STRING },
            category: { type: Type.STRING },
            emoji: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              minItems: 4,
              maxItems: 4,
            },
            correctIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            hint: { type: Type.STRING },
          },
          required: ['statement', 'category', 'emoji', 'options', 'correctIndex', 'explanation', 'hint'],
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      if (data && Array.isArray(data.options) && data.options.length === 4) {
        return {
          id: `ai-${Date.now()}`,
          statement: data.statement,
          category: data.category || 'Surprise Wonder',
          ageGroup: age,
          emoji: data.emoji || '🌟',
          options: data.options as [string, string, string, string],
          correctIndex: Math.max(0, Math.min(3, data.correctIndex ?? 0)),
          explanation: data.explanation || 'Great job answering!',
          hint: data.hint || 'Think carefully and look at the picture clues!',
        };
      }
    }
  } catch (error) {
    console.warn('Gemini API call skipped or failed, using curated question bank instead.', error);
  }
  return null;
}
