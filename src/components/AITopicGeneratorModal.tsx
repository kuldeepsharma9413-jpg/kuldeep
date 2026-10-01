import React, { useState } from 'react';
import { Sparkles, X, Wand2, Loader2 } from 'lucide-react';
import { generateAIKidQuestion } from '../services/geminiService';
import { Question, AgeGroup } from '../types/game';

interface AITopicGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  ageGroup: AgeGroup;
  onCustomQuestionReady: (q: Question) => void;
}

const POPULAR_THEMES = [
  { label: '🦖 Dinosaurs & Beasts', topic: 'Dinosaurs, fossils, and prehistoric friendly creatures' },
  { label: '🦁 Jungle Animals', topic: 'Cute jungle safari animals and sounds' },
  { label: '🚀 Space & Rockets', topic: 'The Solar system, Moon, Sun, and astronaut rockets' },
  { label: '🐬 Ocean Friends', topic: 'Dolphins, sea turtles, corals, and ocean creatures' },
  { label: '🍎 Fruits & Vegetables', topic: 'Healthy colorful fruits and delicious veggies' },
  { label: '🚒 Fire Trucks & Cars', topic: 'Fire engines, police cars, airplanes, and trains' },
  { label: '🏰 Fairy Tales & Rhymes', topic: 'Classic gentle nursery rhymes and magical friendly tales' },
  { label: '🎨 Colors & Shapes', topic: 'Everyday colors, circles, squares, and rainbows' },
];

export const AITopicGeneratorModal: React.FC<AITopicGeneratorModalProps> = ({
  isOpen,
  onClose,
  ageGroup,
  onCustomQuestionReady,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async (topicToUse: string) => {
    setIsLoading(true);
    setErrorMsg('');

    const targetAge = ageGroup === 'toddler' ? 'toddler' : ageGroup === 'junior' ? 'junior' : 'both';
    const q = await generateAIKidQuestion(topicToUse, targetAge);

    setIsLoading(false);
    if (q) {
      onCustomQuestionReady(q);
      onClose();
    } else {
      setErrorMsg('Could not reach AI right now. Please try one of our popular themes or standard questions!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#0a1538] to-[#04091a] border-2 border-amber-400 rounded-3xl p-5 sm:p-7 shadow-[0_0_35px_rgba(245,158,11,0.4)] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide">
              Create AI Question for Kids
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-sky-200/80 my-3">
          Choose a theme your child loves, and Computer Ji will craft a brand-new 4-option question!
        </p>

        {/* Popular themes grid */}
        <div className="grid grid-cols-2 gap-2 my-3">
          {POPULAR_THEMES.map((theme, i) => (
            <button
              key={i}
              onClick={() => handleGenerate(theme.topic)}
              disabled={isLoading}
              className="p-2.5 text-left rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/60 text-xs font-bold text-slate-200 hover:text-amber-300 transition-all flex items-center gap-2"
            >
              <span>{theme.label}</span>
            </button>
          ))}
        </div>

        {/* Or custom theme text box */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Or type any topic (e.g. "Baking cookies", "Robots", "Butterflies"):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g., Baby animals on a farm"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => handleGenerate(customInput || 'Fun everyday facts')}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
          {errorMsg && (
            <p className="text-xs text-rose-400 mt-2">{errorMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
};
