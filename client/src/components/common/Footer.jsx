import React from 'react';
import { Shield, AlertCircle, Sparkles } from '../../lib/icons.jsx';

export const Footer = () => {
  return (
    <footer className="mt-auto bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Compliance & Non-Diagnosis Banner */}
        <div className="flex items-start gap-3 max-w-3xl bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 text-amber-200/90">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-300 text-xs mb-0.5">
              Important Clinical & Safety Disclaimer
            </p>
            <p className="text-[11px] leading-relaxed text-amber-200/80">
              AyuDrishti is an AI-powered clinical history intake assistant designed solely for clinical workflow facilitation. 
              The system is <strong className="text-white">NOT a doctor</strong> and <strong className="text-white">DOES NOT provide medical diagnosis</strong>. 
              All AI-generated summaries and potential red flag alerts require direct clinical review by a registered medical practitioner.
            </p>
          </div>
        </div>

        {/* ABDM & SIH 2026 Badges */}
        <div className="flex items-center gap-4 shrink-0 text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Shield className="w-4 h-4 text-teal-400" />
            <span className="font-medium text-slate-300 text-[11px]">ABDM Compliant</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-medium text-slate-300 text-[11px]">SIH 2026 Project</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
