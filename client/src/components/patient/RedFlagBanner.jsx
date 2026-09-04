import React from 'react';
import { AlertTriangle, ShieldAlert } from '../../lib/icons.jsx';

export const RedFlagBanner = ({ 
  title = 'Potential red flag detected', 
  reason = 'Chest pain + breathlessness + sweating',
  action = 'Immediate physician assessment',
  className = '' 
}) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-red-50/80 border border-red-200 text-red-950 shadow-xs ${className}`}>
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 font-bold">
          <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-md tracking-wider">
              URGENT REVIEW
            </span>
            <h3 className="font-extrabold text-sm sm:text-base text-red-950 tracking-tight">
              {title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium pt-1">
            <div className="bg-white p-2.5 rounded-xl border border-red-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block mb-0.5">
                Reason:
              </span>
              <strong className="text-[#17324D] font-bold">{reason}</strong>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-red-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block mb-0.5">
                Recommended Action:
              </span>
              <strong className="text-[#17324D] font-bold">{action}</strong>
            </div>
          </div>

          <div className="text-[11px] text-red-800 pt-1 font-semibold flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>Important: The system never presents AI output as a diagnosis. All alerts require registered physician verification.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedFlagBanner;
