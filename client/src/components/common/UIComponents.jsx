import React from 'react';
import { AlertTriangle, Mic, FileText, CheckCircle, Sparkles } from '../../lib/icons.jsx';

// Large Touch-Friendly Kiosk Button
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

// Red Flag Warning Banner (Strict Non-Diagnosis Compliance)
export const RedFlagBanner = ({ 
  title = 'Potential Red Flag Detected', 
  description = 'Triple symptom cluster (Chest Pain + Breathlessness + Sweating) detected. Clinical review is recommended.',
  className = '' 
}) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-rose-950/70 border-2 border-rose-500/80 text-rose-100 shadow-xl shadow-rose-950/50 kiosk-glow-red animate-pulse-slow ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400">
          <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-rose-500 text-slate-950 font-black text-xs uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              Urgent Alert
            </span>
            <h3 className="font-extrabold text-lg text-rose-200 tracking-tight">
              {title}
            </h3>
          </div>
          <p className="text-sm font-medium text-rose-200/90 leading-relaxed mb-2">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300/80 bg-rose-900/40 px-3 py-1.5 rounded-lg border border-rose-800/60 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>AI-generated recommendation: Clinical review is recommended.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Microphone Recording Animation
export const VoiceWaveAnimation = ({ isRecording = false, onToggle = () => {} }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <button
        onClick={onToggle}
        className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative ${
          isRecording
            ? 'bg-rose-600 text-white animate-mic-pulse ring-8 ring-rose-500/30'
            : 'bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 hover:scale-105 shadow-teal-500/30 ring-4 ring-teal-500/20'
        }`}
      >
        <Mic className={`w-12 h-12 sm:w-14 sm:h-14 ${isRecording ? 'animate-bounce' : ''}`} />
      </button>

      <div className="mt-4 text-center">
        <p className={`font-extrabold text-lg sm:text-xl ${isRecording ? 'text-rose-400 animate-pulse' : 'text-teal-300'}`}>
          {isRecording ? 'Recording Live Voice... Speak Now' : 'Tap Microphone to Speak'}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          {isRecording ? 'Listening in Hindi / English...' : 'Touch input is also supported below'}
        </p>
      </div>
    </div>
  );
};

// Document OCR Scanner Beam Animation
export const ScannerAnimation = ({ isScanning = false }) => {
  if (!isScanning) return null;

  return (
    <div className="relative w-full h-48 bg-slate-900/90 rounded-2xl border-2 border-teal-500/40 overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl">
      {/* Moving Laser Line */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#2dd4bf] animate-scan-beam" />
      
      <FileText className="w-12 h-12 text-teal-400 mb-2 animate-pulse" />
      <p className="font-extrabold text-teal-300 text-base">Processing Document with OCR...</p>
      <p className="text-xs text-slate-400 mt-1">Extracting medications & allergies automatically</p>
    </div>
  );
};
