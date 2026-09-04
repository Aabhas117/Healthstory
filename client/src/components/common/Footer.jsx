import React from "react";
import { Shield, AlertCircle, Lock } from "../../lib/icons.jsx";

export const Footer = () => {
  return (
    <footer className="mt-auto bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Clinical Disclaimer */}
        <div className="flex items-start gap-3 max-w-3xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3 text-amber-900 dark:text-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed font-medium">
            <strong className="font-bold text-amber-950 dark:text-amber-100 mr-1">
              Clinical Disclaimer:
            </strong>
            AyuDrishti assists in clinical history collection only. The system is <strong>NOT a doctor</strong> and <strong>DOES NOT provide medical diagnosis</strong>. All AI-generated summaries and potential red flags require assessment by a registered medical practitioner.
          </div>
        </div>

        {/* Security & Compliance Badges */}
        <div className="flex items-center gap-2 shrink-0 text-[11px]">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">
            <Shield className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>ABDM Compliant</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">
            <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>DPDP Act 2023</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
