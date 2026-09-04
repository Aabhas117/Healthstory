import React from 'react';
import { FileText } from '../../lib/icons.jsx';

export const EmptyState = ({ 
  icon: Icon = FileText, 
  title = 'No Data Available', 
  description = 'There are no records to display at this moment.', 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-[#DCEAF0] text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 space-y-3 shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-[#F5FAFC] border border-[#DCEAF0] flex items-center justify-center text-[#20B8C8]">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-[#17324D]">{title}</h3>
      <p className="text-xs text-[#536B7D] leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 rounded-xl bg-[#20B8C8] text-white font-bold text-xs hover:bg-[#1CA6B4] transition-all shadow-xs"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
