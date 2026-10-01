import React from 'react';
import { Volume2, VolumeX, Mic, MicOff, Award, Sparkles, Layers } from 'lucide-react';
import { AgeGroup } from '../types/game';

interface HeaderProps {
  ageGroup: AgeGroup;
  onSelectAgeGroup: (age: AgeGroup) => void;
  currentPrize: string;
  isMuted: boolean;
  onToggleMute: () => void;
  isSpeechEnabled: boolean;
  onToggleSpeech: () => void;
  onOpenLadder: () => void;
  level: number;
}

export const Header: React.FC<HeaderProps> = ({
  ageGroup,
  onSelectAgeGroup,
  currentPrize,
  isMuted,
  onToggleMute,
  isSpeechEnabled,
  onToggleSpeech,
  onOpenLadder,
  level,
}) => {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-amber-500/20 px-4 py-2.5 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-blue-900 p-0.5 shadow-[0_0_12px_rgba(245,158,11,0.5)]">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-400 font-black text-sm tracking-tighter">
              KBC
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 uppercase flex items-center gap-1.5 leading-none">
              Junior Star Quiz <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h1>
            <p className="text-[11px] text-sky-300/70 font-medium tracking-normal mt-0.5 hidden sm:block">
              Kaun Banega Crorepati · Kids Edition (Ages 3–8)
            </p>
          </div>
        </div>

        {/* Center: Age Category Selector (Interactive segmented control) */}
        <div className="hidden md:flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => onSelectAgeGroup('toddler')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              ageGroup === 'toddler'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🐣 Ages 3–5 (Little Stars)
          </button>
          <button
            onClick={() => onSelectAgeGroup('junior')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              ageGroup === 'junior'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🚀 Ages 6–8 (Super Champs)
          </button>
          <button
            onClick={() => onSelectAgeGroup('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              ageGroup === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🌟 All Stars (3–8)
          </button>
        </div>

        {/* Right Zone: Current Prize + Audio Controls + Ladder Button */}
        <div className="flex items-center gap-2">
          {/* Current bank prize */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-500/40 rounded-lg shadow-inner">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-right">
              <span className="text-[10px] text-amber-200/70 block leading-none">Prize Bank</span>
              <span className="text-xs sm:text-sm font-bold text-amber-300 tabular-nums">
                {currentPrize}
              </span>
            </div>
          </div>

          {/* Voice readout toggle */}
          <button
            onClick={onToggleSpeech}
            title={isSpeechEnabled ? "Voice Readout ON (Reads questions aloud)" : "Voice Readout OFF"}
            className={`p-2 rounded-lg border transition-all ${
              isSpeechEnabled
                ? 'bg-sky-950/70 border-sky-400/50 text-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.3)]'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {isSpeechEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Sound FX toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? "Unmute Sounds" : "Mute Sounds"}
            className={`p-2 rounded-lg border transition-all ${
              !isMuted
                ? 'bg-slate-900 border-amber-500/30 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Mobile ladder button */}
          <button
            onClick={onOpenLadder}
            className="lg:hidden p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1 text-xs font-bold"
          >
            <Layers className="w-4 h-4" />
            <span>Q{level}</span>
          </button>
        </div>
      </div>

      {/* Mobile Age Group Selector */}
      <div className="flex md:hidden items-center justify-center gap-1 mt-2 pt-2 border-t border-slate-800/80">
        <button
          onClick={() => onSelectAgeGroup('toddler')}
          className={`flex-1 py-1 text-[11px] font-semibold rounded text-center transition-colors ${
            ageGroup === 'toddler' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-900/60'
          }`}
        >
          Ages 3–5
        </button>
        <button
          onClick={() => onSelectAgeGroup('junior')}
          className={`flex-1 py-1 text-[11px] font-semibold rounded text-center transition-colors ${
            ageGroup === 'junior' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-900/60'
          }`}
        >
          Ages 6–8
        </button>
        <button
          onClick={() => onSelectAgeGroup('all')}
          className={`flex-1 py-1 text-[11px] font-semibold rounded text-center transition-colors ${
            ageGroup === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-900/60'
          }`}
        >
          All (3–8)
        </button>
      </div>
    </header>
  );
};
