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
  const baseClasses = 'intake-btn w-full inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-150 shadow-xs active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-sm sm:text-base tracking-tight focus:outline-none focus:ring-2 focus:ring-[#20B8C8]/40 cursor-pointer';
  
  const variants = {
    primary: 'bg-[#20B8C8] hover:bg-[#1A9FA9] text-white shadow-xs border border-[#1FAAB9]',
    secondary: 'bg-white text-[#17324D] border border-[#DCEAF0] hover:bg-[#F5FAFC] shadow-xs',
    teal: 'bg-[#20B8C8] hover:bg-[#1A9FA9] text-white shadow-xs border border-[#1FAAB9]',
    blue: 'bg-[#2499D6] hover:bg-[#1D82B8] text-white shadow-xs border border-[#208CC4]',
    danger: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-xs border border-[#B91C1C]',
    accent: 'bg-[#17324D] text-white hover:bg-[#0F2338] border border-[#17324D]'
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
