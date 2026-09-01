import React from 'react';
import { AlertTriangle, Sparkles } from '../../lib/icons.jsx';

export const RedFlagBanner = ({ 
  title = 'Potential Red Flag Detected', 
  description = 'Triple symptom cluster (Chest Pain + Breathlessness + Sweating) detected. Clinical review is recommended.',
  className = '' 
}) => {
  return (
    <div className={`p-4 sm:p-5 rounded-xl bg-red-50 dark:bg-red-950/60 border-2 border-red-300 dark:border-red-800 text-red-950 dark:text-red-100 shadow-sm ${className}`}>
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 flex items-center justify-center shrink-0 text-red-600 dark:text-red-400">
          <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-red-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded tracking-wider">
              Urgent Clinical Alert
            </span>
            <h3 className="font-extrabold text-base text-red-900 dark:text-red-200 tracking-tight">
              {title}
            </h3>
          </div>
          <p className="text-xs font-semibold text-red-800 dark:text-red-200/90 leading-relaxed mb-2">
            {description}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-700 dark:text-red-300 bg-red-100/80 dark:bg-red-900/40 px-2.5 py-1 rounded-md border border-red-200 dark:border-red-800 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
            <span>AI-generated recommendation: Clinical review is recommended.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedFlagBanner;
