import React from 'react';
import { FileText, RefreshCw } from '../../lib/icons.jsx';

export const ScannerAnimation = ({ isScanning = false }) => {
  if (!isScanning) return null;

  return (
    <div className="w-full bg-[#F5FAFC] rounded-2xl border border-[#20B8C8]/40 p-6 text-center space-y-2 shadow-xs">
      <RefreshCw className="w-8 h-8 text-[#20B8C8] mx-auto animate-spin" />
      <p className="font-bold text-[#17324D] text-sm">Processing Medical Record with Optical Character Recognition (OCR)...</p>
      <p className="text-xs text-[#536B7D]">Extracting documented medications, history, and allergies automatically</p>
    </div>
  );
};

export default ScannerAnimation;
