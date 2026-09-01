import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from '../../lib/icons.jsx';

export const StatusBadge = ({ status = 'routine', text }) => {
  const styles = {
    redflag: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    warning: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    info: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    routine: 'bg-slate-800 text-slate-300 border-slate-700'
  };

  const icons = {
    redflag: AlertTriangle,
    warning: AlertTriangle,
    success: CheckCircle,
    info: Clock,
    routine: Clock
  };

  const IconComponent = icons[status.toLowerCase()] || icons.routine;
  const styleClass = styles[status.toLowerCase()] || styles.routine;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${styleClass}`}>
      <IconComponent className="w-3.5 h-3.5" />
      <span>{text || status}</span>
    </span>
  );
};

export default StatusBadge;
