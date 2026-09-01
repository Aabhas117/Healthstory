import React from 'react';

export const KioskButton = ({ 
  children, 
  variant = 'primary', 
  size = 'lg',
  icon: Icon,
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'kiosk-btn w-full inline-flex items-center justify-center gap-2.5 font-extrabold rounded-xl transition-all duration-150 shadow-sm active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-base tracking-wide focus:outline-none focus:ring-2 focus:ring-sky-500/40';
  
  const variants = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20 border border-sky-500',
    secondary: 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-sm',
    teal: 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20 border border-teal-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 border border-red-500',
    accent: 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white border border-slate-800 dark:border-slate-200'
  };

  const sizes = {
    md: 'py-2.5 px-4 min-h-[44px] text-sm',
    lg: 'py-3.5 px-6 min-h-[52px] text-base',
    xl: 'py-4 px-8 min-h-[60px] text-lg sm:text-xl'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.lg} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export default KioskButton;
