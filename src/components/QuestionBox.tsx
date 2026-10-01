import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { Question } from '../types/game';

interface QuestionBoxProps {
  question: Question;
  questionNumber: number;
  prizeAmount: string;
  onReadAloud: () => void;
  isReading: boolean;
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({
  question,
  questionNumber,
  prizeAmount,
  onReadAloud,
  isReading,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto px-2 sm:px-6 my-2 sm:my-4">
      {/* Decorative horizontal gold bar passing through the question like on KBC TV */}
      <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent -translate-y-1/2 z-0" />

      {/* Main Hexagonal Ribbon Container */}
      <div className="relative z-10 p-0.5 rounded-2xl bg-gradient-to-r from-amber-500/30 via-amber-400/90 to-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
        <div className="bg-gradient-to-b from-[#08122c] via-[#050c20] to-[#020614] rounded-2xl p-4 sm:p-7 border border-amber-300/30 text-center relative overflow-hidden">
          {/* Subtle studio glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-20 bg-sky-500/10 blur-2xl pointer-events-none rounded-full" />

          {/* Top metadata unboxed clean text */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300/80 mb-2">
            <span className="uppercase tracking-widest text-[11px] text-amber-400 font-bold">
              Question {questionNumber}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-sky-300 font-medium">
              {question.category}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-amber-300 font-bold tabular-nums">
              For {prizeAmount}
            </span>
          </div>

          {/* Question Statement with big kid emoji & crystal-clear legible text */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-1">
            <span className="text-3xl sm:text-4xl filter drop-shadow-md select-none shrink-0" role="img" aria-label="question emoji">
              {question.emoji}
            </span>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-50 tracking-tight leading-snug max-w-2xl text-balance">
              {question.statement}
            </h2>
          </div>

          {/* Read Aloud Button for kids */}
          <div className="mt-3 flex items-center justify-center">
            <button
              onClick={onReadAloud}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                isReading
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.4)] animate-pulse'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 hover:border-amber-400/60'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${isReading ? 'text-sky-300' : 'text-amber-400'}`} />
              <span>{isReading ? 'Reading Question...' : 'Read Out Loud 🗣️'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
