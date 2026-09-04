import React from "react";
import { PatientLayout } from "../../layouts/PatientLayout.jsx";
import { useNavigate } from "../../lib/router.jsx";
import { usePatientStore } from "../../store/usePatientStore.js";
import { KioskButton } from "../../components/patient/KioskButton.jsx";
import { Globe, Check, ArrowRight, Volume2 } from "../../lib/icons.jsx";

export const LanguageStep = () => {
  const navigate = useNavigate();
  const { language, setLanguage, setCurrentStep } = usePatientStore();

  const languages = [
    {
      code: "hi",
      nameHi: "हिंदी",
      nameEn: "Hindi",
      script: "नमस्ते, आप कैसे हैं?",
    },
    {
      code: "en",
      nameHi: "English",
      nameEn: "English",
      script: "Hello, how can we help you today?",
    },
    { code: "ta", nameHi: "தமிழ்", nameEn: "Tamil", script: "வணக்கம்" },
    { code: "te", nameHi: "తెలుగు", nameEn: "Telugu", script: "నమస్కారం" },
  ];

  const handleSelectLanguage = (code) => {
    setLanguage(code);
  };

  const handleNext = () => {
    setCurrentStep(3);
    navigate("/patient/identify");
  };

  return (
    <PatientLayout currentStep={2}>
      <div className="flex-1 flex flex-col justify-between py-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#20B8C8]/10 text-[#20B8C8] border border-[#20B8C8]/20 mx-auto flex items-center justify-center mb-3">
            <Globe className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D]">
            भाषा चुनें / Select Preferred Language
          </h1>
          <p className="text-xs sm:text-sm text-[#536B7D] mt-1 font-medium">
            Choose your language for voice and intake prompts
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
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between kiosk-btn ${
                  isSelected
                    ? "bg-white border-[#20B8C8] shadow-sm ring-2 ring-[#20B8C8]/20"
                    : "bg-white border-[#DCEAF0] text-[#536B7D] hover:border-[#20B8C8]/40"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-lg font-extrabold text-[#17324D]">
                    {lang.nameHi}
                  </span>
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-[#20B8C8] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="text-xs text-[#7A8D9D]">
                      {lang.nameEn}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-[#536B7D] mt-2 border-t border-[#EEF6F9] pt-2 w-full">
                  <span>{lang.script}</span>
                  <Volume2 className="w-4 h-4 text-[#20B8C8]" />
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
            {language === "hi" ? "आगे बढ़ें (Continue)" : "Continue to Details"}
          </KioskButton>
        </div>
      </div>
    </PatientLayout>
  );
};

export default LanguageStep;
