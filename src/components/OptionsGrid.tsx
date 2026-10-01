import React from 'react';
import { CheckCircle2, XCircle, Lock } from 'lucide-react';
import { OptionLetter, GameStatus } from '../types/game';

interface OptionsGridProps {
  options: [string, string, string, string];
  correctIndex: number;
  selectedIndex: number | null;
  gameStatus: GameStatus;
  eliminatedIndices: number[];
  onSelectOption: (index: number) => void;
  disabled: boolean;
}

const LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D'];

export const OptionsGrid: React.FC<OptionsGridProps> = ({
  options,
  correctIndex,
  selectedIndex,
  gameStatus,
  eliminatedIndices,
  onSelectOption,
  disabled,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto px-2 sm:px-6 my-2 sm:my-3">
      {/* Decorative horizontal gold bar connecting options like on KBC TV */}
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent -translate-y-1/2 z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 relative z-10">
        {options.map((optionText, idx) => {
          const letter = LETTERS[idx];
          const isEliminated = eliminatedIndices.includes(idx);
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === correctIndex;
          const isRevealed = gameStatus === 'REVEALED_CORRECT' || gameStatus === 'REVEALED_WRONG';
          const isLocked = gameStatus === 'LOCKED';

          // Determine option styling based on KBC state
          let containerClasses = 'bg-gradient-to-b from-[#091534] via-[#060e24] to-[#030714] border-slate-700/60 text-slate-100 hover:border-amber-400/80 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]';
          let letterBadgeClasses = 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950';

          if (isEliminated) {
            containerClasses = 'bg-slate-950/40 border-slate-900/40 text-slate-700 opacity-20 pointer-events-none';
            letterBadgeClasses = 'bg-slate-800 text-slate-600';
          } else if (isRevealed) {
            if (isCorrect) {
              containerClasses = 'bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 border-green-300 text-white animate-kbc-green';
              letterBadgeClasses = 'bg-white text-emerald-800';
            } else if (isSelected && !isCorrect) {
              containerClasses = 'bg-gradient-to-r from-red-800 via-rose-700 to-red-800 border-red-400 text-white';
              letterBadgeClasses = 'bg-white text-red-800';
            }
          } else if (isSelected) {
            if (isLocked) {
              containerClasses = 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 border-yellow-300 text-slate-950 font-bold';
              letterBadgeClasses = 'bg-slate-950 text-amber-400';
            } else {
              // Selected: Pulsing amber "Lock kiya jaye?"
              containerClasses = 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 border-yellow-200 text-slate-950 font-bold animate-kbc-gold';
              letterBadgeClasses = 'bg-slate-950 text-amber-300';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => !isEliminated && onSelectOption(idx)}
              disabled={disabled || isEliminated || isLocked || isRevealed}
              className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer text-left active:scale-[0.99] ${containerClasses}`}
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 pr-2">
                {/* Letter badge (A, B, C, D) */}
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-black text-sm sm:text-base shrink-0 shadow-md ${letterBadgeClasses}`}>
                  {letter}
                </div>

                {/* Option text */}
                <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight leading-snug">
                  {optionText}
                </span>
              </div>

              {/* Status indicators */}
              <div className="shrink-0 flex items-center gap-1">
                {isRevealed && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md animate-bounce" />
                )}
                {isRevealed && isSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-white drop-shadow-md" />
                )}
                {isSelected && isLocked && !isRevealed && (
                  <Lock className="w-5 h-5 text-slate-950 animate-pulse" />
                )}
                {isSelected && !isLocked && !isRevealed && (
                  <span className="text-[11px] font-black uppercase tracking-wider bg-slate-950/80 text-amber-300 px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
