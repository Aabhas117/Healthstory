import React from 'react';
import { FileText, RefreshCw } from '../../lib/icons.jsx';

export const ScannerAnimation = ({ isScanning = false }) => {
  if (!isScanning) return null;

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-sky-300 dark:border-sky-800 p-6 text-center space-y-2 shadow-sm">
      <RefreshCw className="w-8 h-8 text-sky-600 dark:text-sky-400 mx-auto animate-spin" />
      <p className="font-bold text-slate-900 dark:text-white text-sm">Processing Medical Record with Optical Character Recognition (OCR)...</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">Extracting documented medications, history, and allergies automatically</p>
    </div>
  );
};

export default ScannerAnimation;
