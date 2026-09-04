import React from 'react';
import { AlertTriangle, ShieldAlert } from '../../lib/icons.jsx';

export const RedFlagBanner = ({ 
  title = 'Potential red flag detected', 
  reason = 'Chest pain + breathlessness + sweating',
  action = 'Immediate physician assessment',
  className = '' 
}) => {
  return (
    <div className={`p-4 sm:p-5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-950 dark:text-red-100 shadow-xs ${className}`}>
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 font-bold">
          <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-700 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded tracking-wider">
              URGENT REVIEW
            </span>
            <h3 className="font-extrabold text-sm sm:text-base text-red-950 dark:text-red-100 tracking-tight">
              {title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium pt-1">
            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-red-200 dark:border-red-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block mb-0.5">
                Reason:
              </span>
              <strong className="text-slate-900 dark:text-slate-100 font-bold">{reason}</strong>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-red-200 dark:border-red-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block mb-0.5">
                Recommended Action:
              </span>
              <strong className="text-slate-900 dark:text-slate-100 font-bold">{action}</strong>
            </div>
          </div>

          <div className="text-[11px] text-red-800 dark:text-red-300 pt-1 font-semibold flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
            <span>Important: The system never presents AI output as a diagnosis. All alerts require registered physician verification.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedFlagBanner;
