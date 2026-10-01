import React from 'react';
import { Award, ShieldCheck, X } from 'lucide-react';
import { PRIZE_LADDER } from '../data/questions';

interface PrizeLadderProps {
  currentLevel: number;
  isOpenOnMobile: boolean;
  onCloseMobile: () => void;
}

export const PrizeLadder: React.FC<PrizeLadderProps> = ({
  currentLevel,
  isOpenOnMobile,
  onCloseMobile,
}) => {
  const content = (
    <div className="bg-gradient-to-b from-[#08122c] to-[#030714] border border-amber-500/30 rounded-2xl p-3 sm:p-4 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex flex-col h-full">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="font-extrabold text-sm sm:text-base text-amber-300 uppercase tracking-wider">
            Prize Tree (Padhao)
          </h3>
        </div>
        {isOpenOnMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Ladder list */}
      <div className="flex flex-col gap-1 overflow-y-auto pr-1">
        {PRIZE_LADDER.map((item) => {
          const isCurrent = item.level === currentLevel;
          const isCompleted = item.level < currentLevel;
          const isMilestone = item.isMilestone;

          let rowClasses = 'text-slate-400 hover:bg-slate-900/40';
          if (isCurrent) {
            rowClasses = 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-[0_0_12px_rgba(245,158,11,0.6)] scale-[1.02]';
          } else if (isCompleted) {
            rowClasses = 'text-emerald-400 font-bold bg-emerald-950/20';
          } else if (isMilestone) {
            rowClasses = 'text-amber-300 font-bold bg-amber-950/20 border border-amber-500/20';
          }

          return (
            <div
              key={item.level}
              className={`flex items-center justify-between px-3 py-1 rounded-lg text-xs transition-all ${rowClasses}`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-5 font-mono text-center font-bold ${isCurrent ? 'text-slate-950' : 'text-slate-500'}`}>
                  {item.level}
                </span>
                {isMilestone && (
                  <ShieldCheck className={`w-3.5 h-3.5 ${isCurrent ? 'text-slate-950' : 'text-amber-400'}`} />
                )}
              </div>

              <span className="font-bold tracking-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Safe Milestone Explanation note for kids */}
      <div className="mt-auto pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
        🚩 Levels 5 & 10 are <span className="text-amber-300 font-semibold">Safe Padhao</span>! You keep those stars even on a mistake!
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        {content}
      </div>

      {/* Mobile Drawer / Overlay */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-sm max-h-[85vh] overflow-hidden rounded-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
