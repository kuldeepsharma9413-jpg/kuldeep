import React from 'react';
import { HelpCircle, X, Check, Lightbulb } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images';

interface ComputerJiHintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
}

export const ComputerJiHintModal: React.FC<ComputerJiHintModalProps> = ({
  isOpen,
  onClose,
  hint,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-gradient-to-b from-[#0a1435] to-[#04091a] border-2 border-amber-400/80 rounded-3xl p-5 sm:p-6 shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            <h3 className="text-lg font-black text-amber-300 uppercase tracking-wide">
              Computer Ji's Clue
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 my-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg shrink-0 bg-slate-900">
            <img
              src={ASSET_IMAGES.hostMascotImg}
              alt="Computer Ji Mascot"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback styled container if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="relative flex-1 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3.5 text-slate-100 shadow-inner">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
              <span>Psst... Here is a special hint:</span>
            </div>
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              "{hint}"
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wide shadow-md flex items-center justify-center gap-1.5 mt-2"
        >
          <Check className="w-4 h-4" />
          <span>Got it, Computer Ji!</span>
        </button>
      </div>
    </div>
  );
};
