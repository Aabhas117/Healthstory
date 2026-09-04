import React from 'react';
import { AlertTriangle, CheckCircle, Clock, AlertCircle } from '../../lib/icons.jsx';

export const StatusBadge = ({ status = 'routine', text, size = 'md' }) => {
  const statusLower = (status || '').toLowerCase();

  const isRedFlag = statusLower.includes('red') || statusLower.includes('critical') || statusLower.includes('urgent') || statusLower.includes('high');
  const isWarning = statusLower.includes('review') || statusLower.includes('warning') || statusLower.includes('pending');
  const isSuccess = statusLower.includes('completed') || statusLower.includes('approved') || statusLower.includes('normal') || statusLower.includes('cleared');

  let styleClass = 'bg-[#EEF6F9] text-[#536B7D] border-[#DCEAF0]';
  let IconComponent = Clock;

  if (isRedFlag) {
    styleClass = 'bg-red-50 text-red-700 border-red-200';
    IconComponent = AlertTriangle;
  } else if (isWarning) {
    styleClass = 'bg-amber-50 text-amber-700 border-amber-200';
    IconComponent = AlertCircle;
  } else if (isSuccess) {
    styleClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    IconComponent = CheckCircle;
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-xs'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-bold border uppercase tracking-wider ${sizes[size] || sizes.md} ${styleClass}`}>
      <IconComponent className="w-3.5 h-3.5 shrink-0" />
      <span>{text || status}</span>
    </span>
  );
};

export default StatusBadge;
