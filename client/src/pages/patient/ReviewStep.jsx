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

    // Calls api.js -> mockApi.js
    const result = await api.patient.submitIntake(payload);
    setIsSubmitting(false);

    setSubmittedToken(result.tokenNumber);
    setCurrentStep(8);
    navigate('/patient/complete');
  };

  return (
    <PatientLayout currentStep={7}>
      <div className="flex-1 flex flex-col justify-between py-4 max-w-xl mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 mx-auto flex items-center justify-center mb-3">
            <FileText className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.reviewTitle}
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Please verify all recorded information before clinical submission
          </p>
        </div>

        {/* Clinical Red Flag Warning Banner */}
        {redFlagAlert.isRedFlag && (
          <RedFlagBanner 
            title={redFlagAlert.title}
            description={redFlagAlert.description}
          />
        )}

        {/* Section 1: Demographics */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-base text-white">Patient Identity</h3>
            </div>
            <button
              onClick={() => navigate('/patient/identify')}
              className="text-xs font-bold text-teal-400 hover:underline flex items-center gap-1 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-400 text-xs block">Full Name</span>
              <strong className="text-white text-base">{patientInfo.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">Age & Gender</span>
              <strong className="text-white text-base">{patientInfo.age} yrs ({patientInfo.gender})</strong>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">Mobile</span>
              <span className="text-slate-200">{patientInfo.mobile}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">ABHA ID</span>
              <span className="text-teal-300 font-mono text-xs">{patientInfo.abhaId}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Chief Complaint & Symptoms */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-base text-white">Symptoms & Concerns</h3>
            </div>
            <button
              onClick={() => navigate('/patient/interview')}
              className="text-xs font-bold text-teal-400 hover:underline flex items-center gap-1 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div>
            <span className="text-slate-400 text-xs block mb-1">Chief Complaint</span>
            <p className="text-white font-semibold bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              {complaint || 'Chest pain for 3 days'}
            </p>
          </div>

          <div>
            <span className="text-slate-400 text-xs block mb-1.5">Recorded Symptom Cluster</span>
            <div className="flex flex-wrap gap-1.5">
              {symptoms.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-200 border border-rose-500/40 text-xs font-bold flex items-center gap-1"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: History, Medications, Allergies */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white">History & Allergies</h3>
            </div>
            <button
              onClick={() => navigate('/patient/documents')}
              className="text-xs font-bold text-teal-400 hover:underline flex items-center gap-1 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Past History:</span>
              <strong className="text-slate-200">{history.join(', ')}</strong>
            </div>
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Current Medication:</span>
              <strong className="text-teal-300">{medication}</strong>
            </div>
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Known Allergy:</span>
              <strong className="text-rose-400 font-bold">{allergies.join(', ')}</strong>
            </div>
          </div>
        </div>

        {/* Affirmation Checkbox */}
        <label className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={finalConsent}
            onChange={(e) => setFinalConsent(e.target.checked)}
            className="w-5 h-5 text-teal-500 rounded focus:ring-teal-500/30 accent-teal-500 shrink-0"
          />
          <span className="text-xs font-semibold text-slate-300">
            I confirm all details are accurate and submit for clinical triage review.
          </span>
        </label>

        {/* Final Action Button */}
        <div className="pt-2">
          <KioskButton
            onClick={handleSubmit}
            disabled={isSubmitting || !finalConsent}
            icon={ArrowRight}
            variant="primary"
            size="xl"
          >
            {isSubmitting ? 'Submitting to Doctor Triage...' : t.submitIntake}
          </KioskButton>
        </div>

      </div>
    </PatientLayout>
  );
};

export default ReviewStep;
