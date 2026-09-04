import React from 'react';

export const IntakeButton = ({ 
  children, 
  variant = 'primary', 
  size = 'lg',
  icon: Icon,
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'intake-btn w-full inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-150 shadow-xs active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-sm sm:text-base tracking-tight focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer';
  
  const variants = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs border border-sky-500',
    secondary: 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs',
    teal: 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs border border-teal-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-xs border border-red-500',
    accent: 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white border border-slate-800 dark:border-slate-200'
  };

  const sizes = {
    md: 'py-2.5 px-4 min-h-[44px] text-xs font-semibold',
    lg: 'py-3 px-5 min-h-[48px] text-sm font-bold',
    xl: 'py-3.5 px-6 min-h-[52px] text-base font-extrabold'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.lg} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export const KioskButton = IntakeButton;
export default IntakeButton;
