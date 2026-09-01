import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/patient/KioskButton.jsx';
import { TRANSLATIONS } from '../../data/translations.js';
import { CheckCircle, Clock, Heart, ArrowRight, Stethoscope, Sparkles, AlertTriangle } from '../../lib/icons.jsx';

export const CompleteStep = () => {
  const navigate = useNavigate();
  const { language, submittedToken, patientInfo, redFlagAlert, resetSession } = usePatientStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const displayToken = submittedToken || 'TK-402';

  const handleDone = () => {
    resetSession();
    navigate('/');
  };

  return (
    <PatientLayout currentStep={8}>
      <div className="flex-1 flex flex-col items-center justify-center py-6 text-center max-w-lg mx-auto w-full">
        
        {/* Animated Checkmark Emblem */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-500/20 border-4 border-emerald-400 text-emerald-400 flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/30 animate-bounce">
          <CheckCircle className="w-14 h-14 stroke-[2.5]" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.completedTitle}
        </h1>
        <p className="text-base text-slate-300 mb-6">
          Your clinical history intake has been securely transmitted to the attending doctor.
        </p>

        {/* Token Card */}
        <div className="w-full bg-slate-900 border-2 border-teal-500/40 rounded-3xl p-6 shadow-2xl mb-6 kiosk-glow-teal">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 block mb-1">
            {t.queueToken}
          </span>
          <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight my-2 bg-gradient-to-r from-teal-300 via-emerald-300 to-white bg-clip-text text-transparent">
            {displayToken}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mt-3 pt-3 border-t border-slate-800">
            <Clock className="w-4 h-4 text-teal-400" />
            <span>Estimated Wait Time: <strong>~5 to 10 mins</strong></span>
          </div>
        </div>

        {/* Red Flag Priority Notice */}
        {redFlagAlert.isRedFlag && (
          <div className="w-full bg-rose-950/80 border border-rose-500/60 p-4 rounded-2xl text-left text-xs text-rose-200 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-300 font-bold block mb-0.5 text-sm">
                High Priority Triage Assigned
              </strong>
              <p className="text-rose-200/90 leading-relaxed">
                Due to potential red flag symptoms (Chest pain + breathlessness + sweating), your case has been escalated to High Priority clinical review.
              </p>
            </div>
          </div>
        )}

        {/* Waiting Instructions */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 text-left w-full space-y-2 mb-6">
          <p className="font-bold text-white flex items-center gap-2 text-sm">
            <Stethoscope className="w-4 h-4 text-teal-400" />
            <span>Next Steps for Patient ({patientInfo.name}):</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
            <li>Please take a seat in <strong>Waiting Zone B (OPD Cardiology Triage)</strong>.</li>
            <li>When token <strong className="text-teal-300">{displayToken}</strong> is called on the display screen, proceed to Room 104.</li>
            <li>The doctor will review your AI-synthesized history and conduct your clinical examination.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="w-full space-y-3">
          <KioskButton
            onClick={() => navigate('/doctor/dashboard')}
            icon={Stethoscope}
            variant="accent"
            size="lg"
          >
            Switch to Doctor View (View Patient Ticket)
          </KioskButton>

          <KioskButton
            onClick={handleDone}
            icon={Heart}
            variant="secondary"
            size="lg"
          >
            Return to Welcome Screen
          </KioskButton>
        </div>

      </div>
    </PatientLayout>
  );
};

export default CompleteStep;
