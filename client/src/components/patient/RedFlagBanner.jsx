import React from 'react';
import { AlertTriangle, Sparkles } from '../../lib/icons.jsx';

export const RedFlagBanner = ({ 
  title = 'Potential Red Flag Detected', 
  description = 'Triple symptom cluster (Chest Pain + Breathlessness + Sweating) detected. Clinical review is recommended.',
  className = '' 
}) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-rose-950/70 border-2 border-rose-500/80 text-rose-100 shadow-xl shadow-rose-950/50 kiosk-glow-red ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400">
          <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-rose-500 text-slate-950 font-black text-xs uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              Urgent Alert
            </span>
            <h3 className="font-extrabold text-lg text-rose-200 tracking-tight">
              {title}
            </h3>
          </div>
          <p className="text-sm font-medium text-rose-200/90 leading-relaxed mb-2">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300/80 bg-rose-900/40 px-3 py-1.5 rounded-lg border border-rose-800/60 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>AI-generated recommendation: Clinical review is recommended.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedFlagBanner;
