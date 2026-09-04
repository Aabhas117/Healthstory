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
      <div className="flex-1 flex flex-col items-center justify-center py-6 text-center max-w-md mx-auto w-full">
        
        {/* Checkmark Emblem */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 border-4 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 shadow-md">
          <CheckCircle className="w-12 h-12 stroke-[2.5]" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          {t.completedTitle}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 font-medium">
          Your clinical history intake has been securely transmitted to the attending physician.
        </p>

        {/* Token Card */}
        <div className="w-full bg-white dark:bg-slate-900 border-2 border-sky-600/40 rounded-2xl p-6 shadow-md mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700 dark:text-sky-400 block mb-1">
            {t.queueToken}
          </span>
          <div className="text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight my-2">
            {displayToken}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Estimated Wait Time: <strong>~5 to 10 mins</strong></span>
          </div>
        </div>

        {/* Red Flag Priority Notice */}
        {redFlagAlert.isRedFlag && (
          <div className="w-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 p-4 rounded-xl text-left text-xs text-red-900 dark:text-red-200 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-950 dark:text-red-100 font-bold block mb-0.5 text-xs">
                Urgent Triage Assigned
              </strong>
              <p className="text-red-800 dark:text-red-200/90 leading-relaxed text-[11px]">
                Due to potential red flag symptoms (Chest pain + breathlessness + sweating), your intake record has been escalated to Priority 1 clinical review.
              </p>
            </div>
          </div>
        )}

        {/* Waiting Instructions */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 text-left w-full space-y-2 mb-6 shadow-sm">
          <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <Stethoscope className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Next Steps for Patient ({patientInfo.name}):</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 text-xs">
            <li>Please take a seat in <strong>Waiting Zone B (OPD Cardiology)</strong>.</li>
            <li>When token <strong className="text-sky-700 dark:text-sky-400">{displayToken}</strong> is called on the display screen, proceed to Room 104.</li>
            <li>The attending physician will review your history summary before examination.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="w-full space-y-2.5">
          <KioskButton
            onClick={() => navigate('/doctor/dashboard')}
            icon={Stethoscope}
            variant="accent"
            size="lg"
          >
            Switch to Doctor View (View Patient Record)
          </KioskButton>

          <KioskButton
            onClick={handleDone}
            icon={Heart}
            variant="secondary"
            size="lg"
          >
            Return to Portal Home
          </KioskButton>
        </div>

      </div>
    </PatientLayout>
  );
};

export default CompleteStep;
