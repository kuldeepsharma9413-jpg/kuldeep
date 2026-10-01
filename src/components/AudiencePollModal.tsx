import React, { useEffect, useState } from 'react';
import { Users, X, Check } from 'lucide-react';
import { OptionLetter } from '../types/game';

interface AudiencePollModalProps {
  isOpen: boolean;
  onClose: () => void;
  correctIndex: number;
  options: [string, string, string, string];
  eliminatedIndices: number[];
}

const LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D'];

export const AudiencePollModal: React.FC<AudiencePollModalProps> = ({
  isOpen,
  onClose,
  correctIndex,
  options,
  eliminatedIndices,
}) => {
  const [percentages, setPercentages] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (isOpen) {
      // Calculate realistic audience votes biased towards correct answer
      const baseVotes = [0, 0, 0, 0];
      const validIndices = [0, 1, 2, 3].filter(i => !eliminatedIndices.includes(i));

      // Correct answer gets 65% - 85%
      const correctShare = Math.floor(Math.random() * 20) + 65;
      baseVotes[correctIndex] = correctShare;

      let remaining = 100 - correctShare;
      const otherIndices = validIndices.filter(i => i !== correctIndex);

      if (otherIndices.length === 1) {
        baseVotes[otherIndices[0]] = remaining;
      } else if (otherIndices.length > 1) {
        otherIndices.forEach((idx, i) => {
          if (i === otherIndices.length - 1) {
            baseVotes[idx] = remaining;
          } else {
            const part = Math.floor(Math.random() * (remaining / 2)) + 5;
            baseVotes[idx] = part;
            remaining -= part;
          }
        });
      }

      setPercentages(baseVotes);
    }
  }, [isOpen, correctIndex, eliminatedIndices]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-gradient-to-b from-[#0a1435] to-[#04091a] border-2 border-amber-400/80 rounded-3xl p-5 sm:p-6 shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            <h3 className="text-lg font-black text-amber-300 uppercase tracking-wide">
              Audience Poll (Darshak Poll)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-sky-200/80 text-center my-3">
          Our audience of smart little kids and parents have voted!
        </p>

        {/* Vertical Bar Chart */}
        <div className="flex items-end justify-around h-48 my-4 pt-6 px-2 border-b border-slate-700">
          {percentages.map((pct, idx) => {
            const letter = LETTERS[idx];
            const isEliminated = eliminatedIndices.includes(idx);
            const isHighest = pct === Math.max(...percentages);

            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end w-14">
                <span className={`text-xs font-black tabular-nums ${isHighest ? 'text-amber-300' : 'text-slate-400'}`}>
                  {isEliminated ? '0%' : `${pct}%`}
                </span>

                <div className="w-10 sm:w-12 bg-slate-800 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                  <div
                    style={{ height: `${pct}%` }}
                    className={`w-full rounded-t-lg transition-all duration-700 ${
                      isHighest
                        ? 'bg-gradient-to-t from-amber-600 to-yellow-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'bg-gradient-to-t from-sky-800 to-sky-500'
                    }`}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <span className={`text-sm font-black ${isHighest ? 'text-amber-400' : 'text-slate-300'}`}>
                    {letter}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Options key */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-4">
          {options.map((opt, i) => (
            <div key={i} className="truncate">
              <span className="font-bold text-amber-400 mr-1">{LETTERS[i]}:</span>
              <span>{opt}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wide shadow-md flex items-center justify-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          <span>Thank You Audience!</span>
        </button>
      </div>
    </div>
  );
};
