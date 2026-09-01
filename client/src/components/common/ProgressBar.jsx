import React from 'react';
import { usePatientStore } from '../../store/usePatientStore.js';
import { Check } from '../../lib/icons.jsx';

export const PATIENT_STEPS = [
  { id: 1, labelEn: 'Welcome', labelHi: 'स्वागत', path: '/patient/welcome' },
  { id: 2, labelEn: 'Language', labelHi: 'भाषा', path: '/patient/language' },
  { id: 3, labelEn: 'Identity', labelHi: 'पहचान', path: '/patient/identify' },
  { id: 4, labelEn: 'Consent', labelHi: 'सहमति', path: '/patient/consent' },
  { id: 5, labelEn: 'Interview', labelHi: 'प्रश्न', path: '/patient/interview' },
  { id: 6, labelEn: 'Documents', labelHi: 'दस्तावेज़', path: '/patient/documents' },
  { id: 7, labelEn: 'Review', labelHi: 'समीक्षा', path: '/patient/review' },
  { id: 8, labelEn: 'Complete', labelHi: 'पूर्ण', path: '/patient/complete' }
];

export const ProgressBar = ({ currentStep = 1 }) => {
  const { language } = usePatientStore();
  const percentage = Math.round((currentStep / PATIENT_STEPS.length) * 100);

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800 py-3 px-4 shadow-inner">
      <div className="max-w-4xl mx-auto">
        
        {/* Step Percentage & Label Header */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center text-xs font-bold">
              {currentStep}
            </span>
            <span className="text-teal-400 font-bold uppercase tracking-wider text-[11px]">
              Step {currentStep} of {PATIENT_STEPS.length}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200">
              {language === 'hi' ? PATIENT_STEPS[currentStep - 1]?.labelHi : PATIENT_STEPS[currentStep - 1]?.labelEn}
            </span>
          </div>
          <span className="text-teal-400 font-bold">{percentage}% Complete</span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden relative p-0.5 border border-slate-700/50">
          <div 
            className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 rounded-full transition-all duration-500 ease-out shadow-sm shadow-teal-500/50"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Step Badges (Visible on tablet & desktop) */}
        <div className="hidden sm:flex items-center justify-between mt-2.5">
          {PATIENT_STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div 
                key={step.id} 
                className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                  isCurrent 
                    ? 'text-teal-300 font-bold' 
                    : isCompleted 
                    ? 'text-emerald-400' 
                    : 'text-slate-500'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isCurrent 
                    ? 'bg-teal-500 text-slate-950 font-bold ring-2 ring-teal-400/40' 
                    : isCompleted 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : step.id}
                </span>
                <span className="hidden md:inline">
                  {language === 'hi' ? step.labelHi : step.labelEn}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
