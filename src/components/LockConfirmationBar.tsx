import React from 'react';
import { Lock, ArrowRight, RotateCcw } from 'lucide-react';
import { OptionLetter, GameStatus } from '../types/game';

interface LockConfirmationBarProps {
  selectedIndex: number | null;
  gameStatus: GameStatus;
  selectedOptionText: string;
  onConfirmLock: () => void;
  onNextQuestion: () => void;
  onClearSelection: () => void;
  isGameOver: boolean;
}

const LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D'];

export const LockConfirmationBar: React.FC<LockConfirmationBarProps> = ({
  selectedIndex,
  gameStatus,
  selectedOptionText,
  onConfirmLock,
  onNextQuestion,
  onClearSelection,
  isGameOver,
}) => {
  // If nothing selected and playing, show prompt to select
  if (selectedIndex === null && gameStatus === 'PLAYING') {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-2 text-center text-xs sm:text-sm text-sky-300/80 font-medium">
        👆 Tap on your favorite option (A, B, C, or D) to select it!
      </div>
    );
  }

  // Selected, waiting for lock
  if (selectedIndex !== null && gameStatus === 'PLAYING') {
    const letter = LETTERS[selectedIndex];
    return (
      <div className="w-full max-w-xl mx-auto px-4 my-2">
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border border-amber-500/50 rounded-2xl p-3 sm:p-4 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <div className="text-xs text-amber-200/80 font-semibold uppercase tracking-wider">
              Computer Ji, Option {letter} ko lock kiya jaye?
            </div>
            <div className="text-sm font-bold text-white truncate max-w-xs">
              "{selectedOptionText}"
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClearSelection}
              className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
            >
              Change
            </button>
            <button
              onClick={onConfirmLock}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.5)] active:scale-95 transition-all"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>Lock Kar Do! 🔒</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Locked, waiting for reveal
  if (gameStatus === 'LOCKED') {
    return (
      <div className="w-full max-w-xl mx-auto px-4 my-2 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-sm font-bold animate-pulse">
          <Lock className="w-4 h-4" />
          <span>Locked! Let's check with Computer Ji...</span>
        </div>
      </div>
    );
  }

  // Answer revealed correct: button for next question
  if (gameStatus === 'REVEALED_CORRECT' && !isGameOver) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 my-2">
        <button
          onClick={onNextQuestion}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 hover:from-emerald-400 hover:to-green-300 text-slate-950 font-black text-base shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-[0.98] transition-all"
        >
          <span>Next Question / Agla Sawal</span>
          <ArrowRight className="w-5 h-5 text-slate-950" />
        </button>
      </div>
    );
  }

  return null;
};
