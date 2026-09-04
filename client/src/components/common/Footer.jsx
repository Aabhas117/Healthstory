import React from "react";
import { Shield, AlertCircle, Lock } from "../../lib/icons.jsx";

export const Footer = () => {
  return (
    <footer className="mt-auto bg-white border-t border-[#DCEAF0] text-[#536B7D] text-xs py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Clinical Disclaimer */}
        <div className="flex items-start gap-3 max-w-3xl bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed font-medium">
            <strong className="font-bold text-amber-950 mr-1">
              Clinical Disclaimer:
            </strong>
            AyuDrishti assists in clinical history collection only. The system is <strong>NOT a doctor</strong> and <strong>DOES NOT provide medical diagnosis</strong>. All AI-generated summaries and potential red flags require assessment by a registered medical practitioner.
          </div>
        </div>

        {/* Security & Compliance Badges */}
        <div className="flex items-center gap-2 shrink-0 text-[11px]">
          <div className="flex items-center gap-1.5 bg-[#F5FAFC] px-3 py-1.5 rounded-lg border border-[#DCEAF0] font-bold text-[#17324D]">
            <Shield className="w-3.5 h-3.5 text-[#20B8C8]" />
            <span>ABDM Compliant</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F5FAFC] px-3 py-1.5 rounded-lg border border-[#DCEAF0] font-bold text-[#17324D]">
            <Lock className="w-3.5 h-3.5 text-[#20B8C8]" />
            <span>DPDP Act 2023</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
