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
          <div className="w-12 h-12 rounded-xl bg-[#20B8C8]/10 text-[#20B8C8] border border-[#20B8C8]/20 mx-auto flex items-center justify-center mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D]">
            {t.reviewTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#536B7D] mt-1 font-medium">
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
        <div className="bg-white p-5 rounded-2xl border border-[#DCEAF0] space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EEF6F9] pb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#20B8C8]" />
              <h3 className="font-bold text-sm text-[#17324D]">Patient Demographics</h3>
            </div>
            <button
              onClick={() => navigate('/patient/identify')}
              className="text-xs font-bold text-[#20B8C8] hover:underline flex items-center gap-1 bg-[#F5FAFC] px-2.5 py-1 rounded-lg border border-[#DCEAF0]"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#536B7D] block">Full Name</span>
              <strong className="text-[#17324D] text-sm font-bold">{patientInfo.name}</strong>
            </div>
            <div>
              <span className="text-[#536B7D] block">Age & Gender</span>
              <strong className="text-[#17324D] text-sm font-bold">{patientInfo.age} yrs ({patientInfo.gender})</strong>
            </div>
            <div>
              <span className="text-[#536B7D] block">Mobile</span>
              <span className="text-[#17324D] font-medium">{patientInfo.mobile}</span>
            </div>
            <div>
              <span className="text-[#536B7D] block">ABHA ID</span>
              <span className="text-[#20B8C8] font-mono text-xs">{patientInfo.abhaId}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Symptoms */}
        <div className="bg-white p-5 rounded-2xl border border-[#DCEAF0] space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EEF6F9] pb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#20B8C8]" />
              <h3 className="font-bold text-sm text-[#17324D]">Symptoms & Concerns</h3>
            </div>
            <button
              onClick={() => navigate('/patient/interview')}
              className="text-xs font-bold text-[#20B8C8] hover:underline flex items-center gap-1 bg-[#F5FAFC] px-2.5 py-1 rounded-lg border border-[#DCEAF0]"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div>
            <span className="text-[#536B7D] text-xs block mb-1">Chief Concern Narrative</span>
            <p className="text-[#17324D] font-semibold bg-[#F5FAFC] p-2.5 rounded-xl border border-[#DCEAF0] text-xs">
              {complaint || 'Chest pain for 3 days'}
            </p>
          </div>

          <div>
            <span className="text-[#536B7D] text-xs block mb-1.5">Selected Symptoms</span>
            <div className="flex flex-wrap gap-1.5">
              {symptoms.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg bg-[#20B8C8]/10 text-[#20B8C8] border border-[#20B8C8]/20 text-xs font-bold flex items-center gap-1"
                >
                  <Activity className="w-3 h-3 text-[#20B8C8]" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: History & Medication */}
        <div className="bg-white p-5 rounded-2xl border border-[#DCEAF0] space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EEF6F9] pb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-[#17324D]">History & Medications</h3>
            </div>
            <button
              onClick={() => navigate('/patient/documents')}
              className="text-xs font-bold text-[#20B8C8] hover:underline flex items-center gap-1 bg-[#F5FAFC] px-2.5 py-1 rounded-lg border border-[#DCEAF0]"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-[#F5FAFC] p-2.5 rounded-xl border border-[#DCEAF0]">
              <span className="text-[#536B7D]">Past History:</span>
              <strong className="text-[#17324D] font-bold">{history.join(', ')}</strong>
            </div>
            <div className="flex items-center justify-between bg-[#F5FAFC] p-2.5 rounded-xl border border-[#DCEAF0]">
              <span className="text-[#536B7D]">Current Medication:</span>
              <strong className="text-[#20B8C8] font-bold">{medication}</strong>
            </div>
            <div className="flex items-center justify-between bg-[#F5FAFC] p-2.5 rounded-xl border border-[#DCEAF0]">
              <span className="text-[#536B7D]">Known Allergies:</span>
              <strong className="text-red-600 font-bold">{allergies.join(', ')}</strong>
            </div>
          </div>
        </div>

        {/* Affirmation Checkbox */}
        <label className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[#DCEAF0] cursor-pointer shadow-xs">
          <input
            type="checkbox"
            checked={finalConsent}
            onChange={(e) => setFinalConsent(e.target.checked)}
            className="w-5 h-5 text-[#20B8C8] rounded focus:ring-[#20B8C8] shrink-0"
          />
          <span className="text-xs font-semibold text-[#17324D]">
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
