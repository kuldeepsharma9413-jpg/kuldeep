import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, Trophy, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images';

interface VictoryModalProps {
  isOpen: boolean;
  isGrandWinner: boolean;
  scoreLabel: string;
  totalCorrect: number;
  onRestart: () => void;
  ageGroupLabel: string;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  isGrandWinner,
  scoreLabel,
  totalCorrect,
  onRestart,
  ageGroupLabel,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire festive confetti cannon!
      try {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const interval: ReturnType<typeof setInterval> = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0.6 } });
          confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0.6 } });
        }, 250);

        return () => clearInterval(interval);
      } catch {
        // graceful ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#091638] via-[#050e24] to-[#020612] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.5)] text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/20 blur-3xl pointer-events-none rounded-full" />

        {/* Trophy visual */}
        <div className="relative mx-auto w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.6)] mb-4 bg-slate-900">
          <img
            src={ASSET_IMAGES.trophyImg}
            alt="Golden Championship Trophy"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Celebration Title */}
        <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-xs font-black uppercase tracking-widest text-amber-300">
            {isGrandWinner ? 'Grand 7 Crore Jackpot Winner!' : 'Fantastic Effort!'}
          </span>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-tight">
          {isGrandWinner ? 'You are a Super Crorepati Champ!' : 'Congratulations Little Star!'}
        </h2>

        {/* Certificate / Prize Summary Card */}
        <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-4 my-4 shadow-inner">
          <span className="text-xs text-sky-200/80 block">Points & Star Rewards Won:</span>
          <div className="text-3xl sm:text-4xl font-black text-amber-300 my-1 tabular-nums drop-shadow-md">
            {scoreLabel}
          </div>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-300 mt-2 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{totalCorrect} Questions Solved</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{ageGroupLabel}</span>
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 px-4">
          You answered with great intelligence, confidence, and curiosity! Keep learning and shining bright! ⭐
        </p>

        {/* Play Again Button */}
        <button
          onClick={onRestart}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-base shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5 text-slate-950" />
          <span>Play Again with Fresh Questions! 🎮</span>
        </button>
      </div>
    </div>
  );
};
