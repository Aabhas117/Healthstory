import React from "react";
import { PatientLayout } from "../../layouts/PatientLayout.jsx";
import { useNavigate } from "../../lib/router.jsx";
import { usePatientStore } from "../../store/usePatientStore.js";
import { KioskButton } from "../../components/patient/KioskButton.jsx";
import { TRANSLATIONS } from "../../data/translations.js";
import {
  Heart,
  Sparkles,
  User,
  Mic,
  ArrowRight,
  Shield,
} from "../../lib/icons.jsx";

export const WelcomeStep = () => {
  const navigate = useNavigate();
  const { language, resetSession } = usePatientStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleStartFresh = () => {
    resetSession();
    navigate("/patient/language");
  };

  return (
    <PatientLayout currentStep={1}>
      <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
        {/* Medical Kiosk Emblem */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-sky-600 flex items-center justify-center text-white shadow-lg mb-6">
          <Heart className="w-12 h-12 fill-white" />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {t.welcomeHeading}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg mb-8 leading-relaxed font-medium">
          {t.welcomeSubheading}
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-xl mb-8 text-left">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 font-bold">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Voice Assistant
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Speak naturally in Hindi or English
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Smart Intake
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Adaptive questions for quick registration
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Clinical Review
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Attending doctor validates before visit
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-3">
          <KioskButton
            onClick={handleStartFresh}
            icon={ArrowRight}
            variant="primary"
            size="xl"
          >
            {t.startKiosk}
          </KioskButton>
        </div>
      </div>
    </PatientLayout>
  );
};

export default WelcomeStep;
