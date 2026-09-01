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
    <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 space-y-3 shadow-xl">
      <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition-all shadow"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
