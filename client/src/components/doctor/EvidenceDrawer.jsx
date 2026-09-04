import React from 'react';
import { X, FileText, CheckCircle, Shield, Eye, Clock } from '../../lib/icons.jsx';

export const EvidenceDrawer = ({
  isOpen = false,
  document = null,
  onClose = () => {}
}) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg h-full border-l border-[#DCEAF0] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#EEF6F9] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#20B8C8]/10 text-[#20B8C8] border border-[#20B8C8]/20 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#17324D]">
                  Source Evidence Viewer
                </h3>
                <span className="text-xs text-[#536B7D]">
                  {document.type || 'Prescription / Lab Record'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#7A8D9D] hover:text-[#17324D] hover:bg-[#F5FAFC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Document Meta Info */}
          <div className="bg-[#F5FAFC] p-4 rounded-xl border border-[#DCEAF0] space-y-2 text-xs">
            <div className="flex justify-between text-[#536B7D]">
              <span className="text-[#536B7D]">File Name:</span>
              <strong className="font-mono text-[#17324D]">{document.name}</strong>
            </div>
            <div className="flex justify-between text-[#536B7D]">
              <span className="text-[#536B7D]">Upload Date:</span>
              <span className="font-mono">{document.uploadedAt ? new Date(document.uploadedAt).toLocaleDateString() : 'Today'}</span>
            </div>
            <div className="flex justify-between text-[#536B7D]">
              <span className="text-[#536B7D]">Verification Status:</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> OCR Processed
              </span>
            </div>
          </div>

          {/* Source Text Snippet with Highlight */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#536B7D]">
              Extracted Source Text & Highlight
            </h4>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 font-mono leading-relaxed">
              <span className="bg-amber-100 px-1 py-0.5 rounded font-bold">
                "{document.snippet || 'Rx: Tab Amlodipine 5mg OD. History of Essential Hypertension. Documented Allergy: Penicillin.'}"
              </span>
            </div>
          </div>

          {/* Mock Document Visual Representation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#536B7D]">
              Document Preview
            </h4>
            <div className="bg-[#F5FAFC] border border-[#DCEAF0] rounded-2xl p-8 text-center space-y-3">
              <FileText className="w-16 h-16 text-[#7A8D9D] mx-auto" />
              <p className="text-xs font-bold text-[#17324D]">{document.name}</p>
              <p className="text-[11px] text-[#536B7D]">Official Clinical Records Scan</p>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#EEF6F9]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#20B8C8] text-white font-bold text-xs hover:bg-[#1CA6B4] shadow-xs"
          >
            Close Evidence Drawer
          </button>
        </div>

      </div>
    </div>
  );
};

export default EvidenceDrawer;
