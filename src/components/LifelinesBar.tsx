import React from 'react';
import { Users, HelpCircle, Shuffle, SplitSquareVertical } from 'lucide-react';
import { LifelineState } from '../types/game';

interface LifelinesBarProps {
  lifelines: LifelineState;
  onUseFiftyFifty: () => void;
  onUseAudiencePoll: () => void;
  onUseExpertHint: () => void;
  onUseFlipQuestion: () => void;
  disabled: boolean;
}

export const LifelinesBar: React.FC<LifelinesBarProps> = ({
  lifelines,
  onUseFiftyFifty,
  onUseAudiencePoll,
  onUseExpertHint,
  onUseFlipQuestion,
  disabled,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 my-2 sm:my-3">
      {/* 50:50 Lifeline */}
      <button
        onClick={onUseFiftyFifty}
        disabled={disabled || !lifelines.fiftyFifty}
        title="50:50 (Removes 2 wrong options)"
        className={`group relative flex flex-col items-center justify-center w-14 sm:w-18 h-12 sm:h-14 rounded-xl border-2 transition-all ${
          lifelines.fiftyFifty && !disabled
            ? 'bg-gradient-to-b from-slate-900 to-indigo-950 border-amber-400/80 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-105 hover:border-amber-300'
            : 'bg-slate-950/70 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
        }`}
      >
        <SplitSquareVertical className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] sm:text-xs font-black tracking-tight font-mono mt-0.5">50 : 50</span>
        {!lifelines.fiftyFifty && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-full h-0.5 bg-red-500/80 rotate-45 transform" />
          </span>
        )}
      </button>

      {/* Audience Poll */}
      <button
        onClick={onUseAudiencePoll}
        disabled={disabled || !lifelines.audiencePoll}
        title="Audience Poll (See what the audience thinks)"
        className={`group relative flex flex-col items-center justify-center w-14 sm:w-18 h-12 sm:h-14 rounded-xl border-2 transition-all ${
          lifelines.audiencePoll && !disabled
            ? 'bg-gradient-to-b from-slate-900 to-indigo-950 border-amber-400/80 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-105 hover:border-amber-300'
            : 'bg-slate-950/70 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
        }`}
      >
        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="text-[9px] sm:text-[11px] font-bold tracking-tight mt-0.5">Audience</span>
        {!lifelines.audiencePoll && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-full h-0.5 bg-red-500/80 rotate-45 transform" />
          </span>
        )}
      </button>

      {/* Ask Computer Ji (Hint) */}
      <button
        onClick={onUseExpertHint}
        disabled={disabled || !lifelines.expertHint}
        title="Ask Computer Ji (Gentle clue for kids)"
        className={`group relative flex flex-col items-center justify-center w-14 sm:w-18 h-12 sm:h-14 rounded-xl border-2 transition-all ${
          lifelines.expertHint && !disabled
            ? 'bg-gradient-to-b from-slate-900 to-indigo-950 border-amber-400/80 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-105 hover:border-amber-300'
            : 'bg-slate-950/70 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
        }`}
      >
        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="text-[9px] sm:text-[11px] font-bold tracking-tight mt-0.5">Hint 🤖</span>
        {!lifelines.expertHint && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-full h-0.5 bg-red-500/80 rotate-45 transform" />
          </span>
        )}
      </button>

      {/* Flip Question */}
      <button
        onClick={onUseFlipQuestion}
        disabled={disabled || !lifelines.flipQuestion}
        title="Flip Question (Replace with another question)"
        className={`group relative flex flex-col items-center justify-center w-14 sm:w-18 h-12 sm:h-14 rounded-xl border-2 transition-all ${
          lifelines.flipQuestion && !disabled
            ? 'bg-gradient-to-b from-slate-900 to-indigo-950 border-amber-400/80 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-105 hover:border-amber-300'
            : 'bg-slate-950/70 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
        }`}
      >
        <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="text-[9px] sm:text-[11px] font-bold tracking-tight mt-0.5">Flip 🔄</span>
        {!lifelines.flipQuestion && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-full h-0.5 bg-red-500/80 rotate-45 transform" />
          </span>
        )}
      </button>
    </div>
  );
};
