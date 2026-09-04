import React, { useState } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/patient/KioskButton.jsx';
import { RedFlagBanner } from '../../components/patient/RedFlagBanner.jsx';
import { TRANSLATIONS } from '../../data/translations.js';
import { api } from '../../services/api.js';
import { FileText, User, Heart, Shield, Edit3, CheckCircle, ArrowRight, AlertTriangle, Activity } from '../../lib/icons.jsx';

export const ReviewStep = () => {
  const navigate = useNavigate();
  const {
    language,
    patientInfo,
    symptoms,
    complaint,
    history,
    medication,
    allergies,
    uploadedDocuments,
    redFlagAlert,
    setSubmittedToken,
    setCurrentStep
  } = usePatientStore();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalConsent, setFinalConsent] = useState(true);

  const handleSubmit = async () => {
    if (!finalConsent) return;
    setIsSubmitting(true);

    const payload = {
      name: patientInfo.name,
      age: patientInfo.age,
      gender: patientInfo.gender,
      mobile: patientInfo.mobile,
      abhaId: patientInfo.abhaId,
      complaint: complaint || 'Chest pain for 3 days',
      symptoms,
      history,
      medication,
      allergies,
      documents: uploadedDocuments
    };

    const result = await api.patient.submitIntake(payload);
    setIsSubmitting(false);

    setSubmittedToken(result.tokenNumber);
    setCurrentStep(8);
    navigate('/patient/complete');
  };

  return (
    <PatientLayout currentStep={7}>
      <div className="flex-1 flex flex-col justify-between py-4 max-w-xl mx-auto w-full space-y-5">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mx-auto flex items-center justify-center mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.reviewTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
            Please verify all recorded information before submitting to doctor
          </p>
        </div>

        {/* Urgent Red Flag Banner */}
        {redFlagAlert.isRedFlag && (
          <RedFlagBanner 
            title={redFlagAlert.title || "Potential red flag detected"}
            reason={redFlagAlert.description || "Chest pain + breathlessness + sweating"}
            action="Immediate physician assessment"
          />
        )}

        {/* Section 1: Demographics */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Patient Demographics</h3>
            </div>
            <button
              onClick={() => navigate('/patient/identify')}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded border border-sky-200 dark:border-sky-800"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Full Name</span>
              <strong className="text-slate-900 dark:text-white text-sm font-bold">{patientInfo.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Age & Gender</span>
              <strong className="text-slate-900 dark:text-white text-sm font-bold">{patientInfo.age} yrs ({patientInfo.gender})</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Mobile</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{patientInfo.mobile}</span>
            </div>
            <div>
              <span className="text-slate-500 block">ABHA ID</span>
              <span className="text-sky-700 dark:text-sky-400 font-mono text-xs">{patientInfo.abhaId}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Symptoms */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-600 dark:text-red-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Symptoms & Concerns</h3>
            </div>
            <button
              onClick={() => navigate('/patient/interview')}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded border border-sky-200 dark:border-sky-800"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div>
            <span className="text-slate-500 text-xs block mb-1">Chief Concern Narrative</span>
            <p className="text-slate-900 dark:text-white font-semibold bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              {complaint || 'Chest pain for 3 days'}
            </p>
          </div>

          <div>
            <span className="text-slate-500 text-xs block mb-1.5">Selected Symptoms</span>
            <div className="flex flex-wrap gap-1.5">
              {symptoms.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800 text-xs font-bold flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3 text-red-600 dark:text-red-400" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: History & Medication */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">History & Medications</h3>
            </div>
            <button
              onClick={() => navigate('/patient/documents')}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded border border-sky-200 dark:border-sky-800"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500">Past History:</span>
              <strong className="text-slate-900 dark:text-white font-bold">{history.join(', ')}</strong>
            </div>
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500">Current Medication:</span>
              <strong className="text-sky-700 dark:text-sky-400 font-bold">{medication}</strong>
            </div>
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500">Known Allergies:</span>
              <strong className="text-red-600 dark:text-red-400 font-bold">{allergies.join(', ')}</strong>
            </div>
          </div>
        </div>

        {/* Affirmation Checkbox */}
        <label className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer shadow-sm">
          <input
            type="checkbox"
            checked={finalConsent}
            onChange={(e) => setFinalConsent(e.target.checked)}
            className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500 shrink-0"
          />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            I confirm all details are accurate and submit for clinical triage review.
          </span>
        </label>

        {/* Final Submit Button */}
        <div>
          <KioskButton
            onClick={handleSubmit}
            disabled={isSubmitting || !finalConsent}
            icon={ArrowRight}
            variant="primary"
            size="xl"
          >
            {isSubmitting ? 'Submitting Record to Triage...' : t.submitIntake}
          </KioskButton>
        </div>

      </div>
    </PatientLayout>
  );
};

export default ReviewStep;
