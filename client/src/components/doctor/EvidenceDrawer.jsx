import React from 'react';
import { X, FileText, CheckCircle, Shield, Eye, Clock } from '../../lib/icons.jsx';

export const EvidenceDrawer = ({
  isOpen = false,
  document = null,
  onClose = () => {}
}) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg h-full border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Source Evidence Viewer
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {document.type || 'Prescription / Lab Record'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Document Meta Info */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span className="text-slate-500">File Name:</span>
              <strong className="font-mono text-slate-900 dark:text-white">{document.name}</strong>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span className="text-slate-500">Upload Date:</span>
              <span className="font-mono">{document.uploadedAt ? new Date(document.uploadedAt).toLocaleDateString() : 'Today'}</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span className="text-slate-500">Verification Status:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> OCR Processed
              </span>
            </div>
          </div>

          {/* Source Text Snippet with Highlight */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Extracted Source Text & Highlight
            </h4>
            <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 font-mono leading-relaxed">
              <span className="bg-amber-200 dark:bg-amber-800 px-1 py-0.5 rounded font-bold">
                "{document.snippet || 'Rx: Tab Amlodipine 5mg OD. History of Essential Hypertension. Documented Allergy: Penicillin.'}"
              </span>
            </div>
          </div>

          {/* Mock Document Visual Representation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Document Preview
            </h4>
            <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
              <FileText className="w-16 h-16 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{document.name}</p>
              <p className="text-[11px] text-slate-500">Official Clinical Records Scan</p>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 shadow-sm"
          >
            Close Evidence Drawer
          </button>
        </div>

      </div>
    </div>
  );
};

export default EvidenceDrawer;
