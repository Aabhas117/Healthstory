import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/patient/KioskButton.jsx';
import { TRANSLATIONS } from '../../data/translations.js';
import { Heart, Sparkles, User, Mic, ArrowRight } from '../../lib/icons.jsx';

export const WelcomeStep = () => {
  const navigate = useNavigate();
  const { language, loadDemoPreset, resetSession } = usePatientStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleStartFresh = () => {
    resetSession();
    navigate('/patient/language');
  };

  const handleLoadDemo = () => {
    loadDemoPreset();
    navigate('/patient/identify');
  };

  return (
    <PatientLayout currentStep={1}>
      <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
        
        {/* Animated Kiosk Emblem */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-teal-300 flex items-center justify-center text-slate-950 shadow-2xl shadow-teal-500/30 ring-8 ring-teal-500/20 kiosk-glow-teal">
            <Heart className="w-14 h-14 fill-slate-950 stroke-[2.5]" />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-emerald-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full border-2 border-slate-950 shadow-lg flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Kiosk
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {t.welcomeHeading}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
          {t.welcomeSubheading}
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-8 text-left">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200">Voice Assistant</h3>
              <p className="text-xs text-slate-400 mt-0.5">Speak naturally in Hindi or English</p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200">Smart Intake</h3>
              <p className="text-xs text-slate-400 mt-0.5">Adaptive questions for quick registration</p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200">Clinical Review</h3>
              <p className="text-xs text-slate-400 mt-0.5">Doctor reviews summary before visit</p>
            </div>
          </div>
        </div>

        {/* Large Touch Actions */}
        <div className="w-full max-w-md space-y-4">
          <KioskButton 
            onClick={handleStartFresh}
            icon={ArrowRight}
            variant="primary"
            size="xl"
          >
            {t.startKiosk}
          </KioskButton>

          <KioskButton 
            onClick={handleLoadDemo}
            icon={User}
            variant="secondary"
            size="lg"
          >
            ⚡ {t.demoQuickStart}
          </KioskButton>
        </div>

        <p className="text-xs text-slate-400 mt-6 max-w-md">
          {t.disclaimer}
        </p>

      </div>
    </PatientLayout>
  );
};

export default WelcomeStep;
