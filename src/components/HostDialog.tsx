import React from 'react';
import { ASSET_IMAGES } from '../assets/images';
import { GameStatus } from '../types/game';

interface HostDialogProps {
  gameStatus: GameStatus;
  explanation: string;
  correctAnswerText: string;
  hostMessage: string;
}

export const HostDialog: React.FC<HostDialogProps> = ({
  gameStatus,
  explanation,
  correctAnswerText,
  hostMessage,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 my-2 sm:my-3">
      <div className="bg-gradient-to-r from-[#071330]/90 via-[#050e24]/95 to-[#071330]/90 border border-sky-500/30 rounded-2xl p-3 sm:p-4 shadow-[0_0_15px_rgba(56,189,248,0.15)] flex items-center gap-3 sm:gap-4">
        {/* Computer Ji mascot avatar */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.4)] bg-slate-900">
          <img
            src={ASSET_IMAGES.hostMascotImg}
            alt="Computer Ji"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
        </div>

        {/* Dialogue Bubble */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider">
              Computer Ji (Host)
            </span>
          </div>

          {gameStatus === 'REVEALED_CORRECT' ? (
            <div>
              <p className="text-xs sm:text-sm font-black text-emerald-300">
                🎉 Adbhut! Bilkul Sahi Jawab! (Awesome! Absolutely Right!)
              </p>
              <p className="text-xs text-slate-200 mt-0.5">
                {explanation}
              </p>
            </div>
          ) : gameStatus === 'REVEALED_WRONG' ? (
            <div>
              <p className="text-xs sm:text-sm font-black text-rose-300">
                Aww, koi baat nahi, champ! You tried your best! ❤️
              </p>
              <p className="text-xs text-slate-200 mt-0.5">
                The correct answer was <span className="font-bold text-amber-300">"{correctAnswerText}"</span>. {explanation}
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm font-medium text-slate-200">
              {hostMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
