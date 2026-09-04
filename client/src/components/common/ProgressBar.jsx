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
    <div className="w-full bg-white border-b border-[#DCEAF0] py-3 px-4 shadow-xs">
      <div className="max-w-4xl mx-auto">
        
        {/* Step Percentage & Label Header */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#17324D] mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#E6F7F9] text-[#20B8C8] border border-[#20B8C8]/30 flex items-center justify-center text-xs font-bold">
              0{currentStep}
            </span>
            <span className="text-[#20B8C8] font-bold uppercase tracking-wider text-[11px]">
              Step 0{currentStep} of 0{PATIENT_STEPS.length}
            </span>
            <span className="text-[#7A8D9D]">|</span>
            <span className="text-[#17324D] font-bold">
              {language === 'hi' ? PATIENT_STEPS[currentStep - 1]?.labelHi : PATIENT_STEPS[currentStep - 1]?.labelEn}
            </span>
          </div>
          <span className="text-[#20B8C8] font-bold">{percentage}% Complete</span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2 bg-[#EEF6F9] rounded-full overflow-hidden relative border border-[#DCEAF0]">
          <div 
            className="h-full bg-[#20B8C8] rounded-full transition-all duration-300 ease-out"
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
                    ? 'text-[#20B8C8] font-bold' 
                    : isCompleted 
                    ? 'text-[#20B8C8] font-semibold' 
                    : 'text-[#7A8D9D]'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isCurrent 
                    ? 'bg-[#20B8C8] text-white font-bold' 
                    : isCompleted 
                    ? 'bg-[#E6F7F9] text-[#20B8C8] border border-[#20B8C8]/30' 
                    : 'bg-[#EEF6F9] text-[#7A8D9D]'
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
