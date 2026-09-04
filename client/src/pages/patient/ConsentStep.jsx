import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/patient/KioskButton.jsx';
import { TRANSLATIONS } from '../../data/translations.js';
import { Shield, Check, ArrowRight, Lock, AlertTriangle } from '../../lib/icons.jsx';

export const ConsentStep = () => {
  const navigate = useNavigate();
  const { language, consentGiven, setConsent, setCurrentStep } = usePatientStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleNext = () => {
    if (!consentGiven) return;
    setCurrentStep(5);
    navigate('/patient/interview');
  };

  return (
    <PatientLayout currentStep={4}>
      <div className="flex-1 flex flex-col justify-between py-4 max-w-lg mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#20B8C8]/10 text-[#20B8C8] border border-[#20B8C8]/20 mx-auto flex items-center justify-center mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D]">
            {t.consentTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#536B7D] mt-1 font-medium">
            Ayushman Bharat Digital Mission (ABDM) Data Privacy Terms
          </p>
        </div>

        {/* Consent Information Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] shadow-xs space-y-4 mb-6">
          
          <div className="flex items-start gap-3 p-3 bg-[#F5FAFC] rounded-xl border border-[#DCEAF0]">
            <Lock className="w-4 h-4 text-[#20B8C8] shrink-0 mt-0.5" />
            <p className="text-xs text-[#536B7D] leading-relaxed font-medium">
              Your health history is encrypted and securely saved under ABDM M2/M3 standards for clinical review by hospital doctors.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-amber-800">
              <strong className="font-bold block mb-0.5 text-amber-900">Non-Diagnostic AI Assistant:</strong>
              The AI collects history only. The system is <strong>not a doctor</strong> and will not diagnose your condition.
            </p>
          </div>

          {/* Interactive Consent Checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-xl bg-[#F5FAFC] border-2 border-[#20B8C8] cursor-pointer hover:border-[#20B8C8] transition-all select-none">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-[#20B8C8] focus:ring-[#20B8C8] shrink-0 mt-0.5"
            />
            <span className="text-xs sm:text-sm font-bold text-[#17324D] leading-snug">
              {t.acceptConsent}
            </span>
          </label>

        </div>

        {/* Action Button */}
        <div>
          <KioskButton
            onClick={handleNext}
            disabled={!consentGiven}
            icon={ArrowRight}
            variant="primary"
            size="lg"
          >
            {language === 'hi' ? 'आवाज़ प्रश्नोत्तरी शुरू करें' : 'Start Voice & Touch Interview'}
          </KioskButton>
        </div>

      </div>
    </PatientLayout>
  );
};

export default ConsentStep;
