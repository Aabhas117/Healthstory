import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/common/UIComponents.jsx';
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
      <div className="flex-1 flex flex-col justify-between py-4 max-w-xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 mx-auto flex items-center justify-center mb-3">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.consentTitle}
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Ayushman Bharat Digital Mission (ABDM) Data Privacy Terms
          </p>
        </div>

        {/* Consent Card */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 mb-6">
          
          <div className="flex items-start gap-3 p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <Lock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Your health history is encrypted end-to-end and stored securely under ABDM M2/M3 guidelines for clinical review by attending hospital doctors.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              <strong className="text-amber-300 font-bold block mb-1">No AI Medical Diagnosis:</strong>
              The AI intake assistant assists in collecting clinical history only. The AI is <strong>not a doctor</strong> and will not diagnose your condition.
            </p>
          </div>

          {/* Interactive Checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-950 border-2 border-teal-500/40 cursor-pointer hover:border-teal-400 transition-all select-none">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-6 h-6 rounded border-slate-700 text-teal-500 focus:ring-teal-500/30 accent-teal-500 shrink-0 mt-0.5"
            />
            <span className="text-sm font-bold text-white leading-tight">
              {t.acceptConsent}
            </span>
          </label>

        </div>

        {/* Action Button */}
        <div className="pt-2">
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
