import React, { useState, useEffect } from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout.jsx';
import { useParams, useNavigate } from '../../lib/router.jsx';
import { useDoctorStore } from '../../store/useDoctorStore.js';
import { RedFlagBanner } from '../../components/common/UIComponents.jsx';
import { api } from '../../services/api.js';
import { DEMO_PATIENT } from '../../data/mockPatients.js';
import { Stethoscope, User, ArrowLeft, CheckCircle, FileText, Activity, Shield, AlertTriangle, Sparkles } from '../../lib/icons.jsx';

export const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctorNotes, setDoctorNotes, approveClinicalReview } = useDoctorStore();
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewApproved, setReviewApproved] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await api.doctor.getPatientById(id || 'P-101');
      setPatient(res || DEMO_PATIENT);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading || !patient) {
    return (
      <DoctorLayout>
        <div className="flex items-center justify-center py-20 text-teal-400 font-bold text-lg animate-pulse">
          Loading Clinical Case Sheet...
        </div>
      </DoctorLayout>
    );
  }

  const isRedFlag = patient.aiSummary?.redFlagAlert;

  const handleApprove = () => {
    approveClinicalReview(patient.id);
    setReviewApproved(true);
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/doctor/dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-teal-400 hover:underline bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Triage Queue</span>
        </button>

        {/* Header Card */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl ${
              isRedFlag ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
            }`}>
              {patient.tokenNumber || patient.id}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-extrabold text-white">{patient.name}</h1>
                <span className="text-sm font-semibold text-slate-300 bg-slate-800 px-3 py-0.5 rounded-full">
                  {patient.age} yrs • {patient.gender}
                </span>
                {isRedFlag && (
                  <span className="bg-rose-500 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow">
                    <AlertTriangle className="w-3.5 h-3.5" /> Red Flag
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-2 font-mono">
                <span>ABHA ID: <strong className="text-teal-300">{patient.abhaId}</strong></span>
                <span>Mobile: <strong className="text-slate-200">{patient.mobile}</strong></span>
                <span>Language: <strong className="text-slate-200">{patient.language}</strong></span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right text-xs">
            <span className="text-slate-400 block mb-0.5">Clinical Review Status</span>
            <strong className={`text-base font-bold ${reviewApproved ? 'text-emerald-400' : 'text-amber-400'}`}>
              {reviewApproved ? 'Approved by Physician' : patient.status}
            </strong>
          </div>
        </div>

        {/* Red Flag Warning Banner */}
        {isRedFlag && (
          <RedFlagBanner 
            title={patient.aiSummary.redFlagTitle || 'Potential Red Flag Detected'}
            description={patient.aiSummary.redFlagDescription || 'Triple symptom cluster (Chest Pain + Breathlessness + Sweating) detected. Clinical review is recommended.'}
          />
        )}

        {/* AI Clinical Summary (Strict Non-Diagnosis Compliance) */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-teal-500/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-bold text-white">AI-Generated Clinical Intake Summary</h2>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-lg border border-teal-500/20">
              For Clinical Review Only
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-950 p-4 rounded-2xl border border-slate-800">
            {patient.aiSummary?.chiefComplaint || patient.complaint}
          </p>

          <div className="space-y-1.5 pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Synthesized Findings:</h3>
            <ul className="space-y-1 text-xs text-slate-300">
              {(patient.aiSummary?.keyFindings || []).map((finding, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Two Column Grid: Medical History & Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* History, Meds & Vitals */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Activity className="w-5 h-5 text-teal-400" />
              <span>Intake History & Vitals</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Recorded Symptoms:</span>
                <strong className="text-rose-300 font-bold">{patient.symptoms.join(', ')}</strong>
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Past Medical History:</span>
                <strong className="text-slate-200">{(patient.history || []).join(', ') || 'None'}</strong>
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Current Medication:</span>
                <strong className="text-teal-300">{patient.medication || 'Amlodipine 5 mg once daily'}</strong>
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Documented Allergy:</span>
                <strong className="text-rose-400 font-bold">{(patient.allergies || []).join(', ') || 'None'}</strong>
              </div>
            </div>

            {patient.vitals && (
              <div className="pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Triage Vitals:</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Blood Pressure</span>
                    <strong className="text-teal-300 text-sm">{patient.vitals.bloodPressure}</strong>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">Heart Rate</span>
                    <strong className="text-teal-300 text-sm">{patient.vitals.heartRate}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Uploaded Documents OCR extractions */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>OCR Scanned Records</span>
            </h2>

            {patient.documents && patient.documents.length > 0 ? (
              patient.documents.map((doc) => (
                <div key={doc.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm text-white">{doc.name}</strong>
                    <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                      Processed
                    </span>
                  </div>
                  {doc.extractedData && (
                    <div className="text-xs text-slate-300 space-y-1">
                      <p>Meds: <strong className="text-teal-300">{doc.extractedData.medications.join(', ')}</strong></p>
                      <p>Allergies: <strong className="text-rose-400">{doc.extractedData.allergies.join(', ')}</strong></p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No medical documents uploaded.</p>
            )}
          </div>

        </div>

        {/* Doctor Notes & Clinical Decision */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-400" />
            <span>Attending Physician Clinical Notes & Action</span>
          </h2>

          <textarea
            rows={3}
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
            placeholder="Type clinical observation notes, ECG order, or treatment plan..."
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              * Clinical review validates AI history intake for medical record filing.
            </span>

            <button
              onClick={handleApprove}
              disabled={reviewApproved}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm transition-all shadow-lg ${
                reviewApproved
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 hover:brightness-110'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>{reviewApproved ? 'Clinical Review Completed' : 'Approve Clinical Intake'}</span>
            </button>
          </div>
        </div>

      </div>
    </DoctorLayout>
  );
};

export default PatientDetail;
