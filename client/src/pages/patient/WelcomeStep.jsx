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
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#20B8C8] flex items-center justify-center text-white shadow-md mb-6">
          <Heart className="w-12 h-12 fill-white" />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight mb-3">
          {t.welcomeHeading}
        </h1>
        <p className="text-base sm:text-lg text-[#536B7D] max-w-lg mb-8 leading-relaxed font-medium">
          {t.welcomeSubheading}
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-xl mb-8 text-left">
          <div className="bg-white p-4 rounded-2xl border border-[#DCEAF0] flex items-start gap-3 shadow-xs hover:border-[#20B8C8]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#20B8C8]/10 text-[#20B8C8] flex items-center justify-center shrink-0 font-bold">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#17324D]">
                Voice Assistant
              </h3>
              <p className="text-xs text-[#536B7D] mt-0.5">
                Speak naturally in Hindi or English
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#DCEAF0] flex items-start gap-3 shadow-xs hover:border-[#20B8C8]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#2499D6]/10 text-[#2499D6] flex items-center justify-center shrink-0 font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#17324D]">
                Smart Intake
              </h3>
              <p className="text-xs text-[#536B7D] mt-0.5">
                Adaptive clinical questions
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#DCEAF0] flex items-start gap-3 shadow-xs hover:border-[#20B8C8]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#17324D]">
                Clinical Review
              </h3>
              <p className="text-xs text-[#536B7D] mt-0.5">
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
