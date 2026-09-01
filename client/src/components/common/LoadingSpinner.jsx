import React from 'react';
import { RefreshCw } from '../../lib/icons.jsx';

export const LoadingSpinner = ({ label = 'Loading...', size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <RefreshCw className={`${sizes[size] || sizes.md} text-teal-400 animate-spin`} />
      {label && <p className="text-xs font-semibold text-teal-300 animate-pulse">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;
