import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/patient/KioskButton.jsx';
import { Globe, Check, ArrowRight, Volume2 } from '../../lib/icons.jsx';

export const LanguageStep = () => {
  const navigate = useNavigate();
  const { language, setLanguage, setCurrentStep } = usePatientStore();

  const languages = [
    { code: 'hi', nameHi: 'हिंदी', nameEn: 'Hindi', script: 'नमस्ते, आप कैसे हैं?' },
    { code: 'en', nameHi: 'English', nameEn: 'English', script: 'Hello, how can we help you today?' },
    { code: 'ta', nameHi: 'தமிழ்', nameEn: 'Tamil (Demo)', script: 'வணக்கம்' },
    { code: 'te', nameHi: 'తెలుగు', nameEn: 'Telugu (Demo)', script: 'నమస్కారం' }
  ];

  const handleSelectLanguage = (code) => {
    setLanguage(code);
  };

  const handleNext = () => {
    setCurrentStep(3);
    navigate('/patient/identify');
  };

  return (
    <PatientLayout currentStep={2}>
      <div className="flex-1 flex flex-col justify-between py-4">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mx-auto flex items-center justify-center mb-3">
            <Globe className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            भाषा चुनें / Select Preferred Language
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
            Choose your language for voice assistant and kiosk prompts
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl mx-auto w-full mb-8">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between kiosk-btn ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-sky-600 dark:border-sky-500 shadow-md ring-2 ring-sky-500/20'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">{lang.nameHi}</span>
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">{lang.nameEn}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800 pt-2 w-full">
                  <span>{lang.script}</span>
                  <Volume2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="max-w-md mx-auto w-full pt-4">
          <KioskButton
            onClick={handleNext}
            icon={ArrowRight}
            variant="primary"
            size="lg"
          >
            {language === 'hi' ? 'आगे बढ़ें (Continue)' : 'Continue to Details'}
          </KioskButton>
        </div>

      </div>
    </PatientLayout>
  );
};

export default LanguageStep;
