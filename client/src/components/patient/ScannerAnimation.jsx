import React from 'react';
import { FileText } from '../../lib/icons.jsx';

export const ScannerAnimation = ({ isScanning = false }) => {
  if (!isScanning) return null;

  return (
    <div className="relative w-full h-48 bg-slate-900/90 rounded-2xl border-2 border-teal-500/40 overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl">
      {/* Moving Laser Line */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#2dd4bf] animate-scan-beam" />
      
      <FileText className="w-12 h-12 text-teal-400 mb-2 animate-pulse" />
      <p className="font-extrabold text-teal-300 text-base">Processing Document with OCR...</p>
      <p className="text-xs text-slate-400 mt-1">Extracting medications & allergies automatically</p>
    </div>
  );
};

export default ScannerAnimation;
