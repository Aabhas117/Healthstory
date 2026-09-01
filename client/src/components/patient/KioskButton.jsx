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
  const baseClasses = 'kiosk-btn w-full inline-flex items-center justify-center gap-3 font-extrabold rounded-2xl transition-all duration-200 shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-base sm:text-lg tracking-wide';
  
  const variants = {
    primary: 'bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 text-slate-950 shadow-teal-500/25 hover:brightness-110 border border-teal-300/30',
    secondary: 'bg-slate-800 hover:bg-slate-750 text-slate-100 border border-slate-700 shadow-slate-900/50',
    danger: 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-rose-600/30 hover:brightness-110 border border-rose-400/30',
    accent: 'bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-indigo-500/25 hover:brightness-110 border border-indigo-400/30'
  };

  const sizes = {
    md: 'py-3 px-5 min-h-[48px] text-sm',
    lg: 'py-4 px-6 min-h-[56px] text-base',
    xl: 'py-5 px-8 min-h-[64px] text-lg sm:text-xl'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.lg} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-6 h-6 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export default KioskButton;
