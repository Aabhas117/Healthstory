import React, { useState, useEffect } from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout.jsx';
import { useParams, useNavigate } from '../../lib/router.jsx';
import { useDoctorStore } from '../../store/useDoctorStore.js';
import { RedFlagBanner } from '../../components/patient/RedFlagBanner.jsx';
import { LoadingSpinner } from '../../components/common/LoadingSpinner.jsx';
import { StatusBadge } from '../../components/common/StatusBadge.jsx';
import { api } from '../../services/api.js';
import { DEMO_PATIENT } from '../../data/mockPatients.js';
import { Stethoscope, User, ArrowLeft, CheckCircle, FileText, Activity, Shield, AlertTriangle, Sparkles, Clock } from '../../lib/icons.jsx';

export const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctorNotes, setDoctorNotes, approveClinicalReview } = useDoctorStore();
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewApproved, setReviewApproved] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'history' | 'documents' | 'notes'

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
        <div className="py-20">
          <LoadingSpinner label="Loading Clinical Electronic Health Record..." size="lg" />
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
        
        {/* Navigation Back Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400 hover:underline bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Triage Queue</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Encounter Date: <strong>{new Date().toLocaleDateString()}</strong></span>
          </div>
        </div>

        {/* Patient Clinical EHR Header Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-extrabold text-xl shrink-0 border ${
                isRedFlag 
                  ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' 
                  : 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
              }`}>
                {patient.tokenNumber || patient.id}
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{patient.name}</h1>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                    {patient.age} yrs • {patient.gender}
                  </span>
                  
                  <StatusBadge 
                    status={isRedFlag ? 'redflag' : 'routine'} 
                    text={isRedFlag ? 'Urgent Red Flag' : 'Standard Priority'}
                    size="sm"
                  />
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
                  <span>ABHA ID: <strong className="text-sky-600 dark:text-sky-400">{patient.abhaId}</strong></span>
                  <span>Mobile: <strong className="text-slate-800 dark:text-slate-200">{patient.mobile}</strong></span>
                  <span>Language: <strong className="text-slate-800 dark:text-slate-200">{patient.language}</strong></span>
                </div>
              </div>
            </div>

            <div className="text-left md:text-right text-xs bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Clinical Approval Status</span>
              <strong className={`text-sm font-bold ${reviewApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {reviewApproved ? 'Approved by Physician' : patient.status}
              </strong>
            </div>

          </div>

          {/* Clinical Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'summary'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              AI Clinical Summary
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'history'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Symptoms & History
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'documents'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              OCR Documents ({(patient.documents || []).length})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'notes'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Doctor Notes & Action
            </button>
          </div>
        </div>

        {/* Urgent Red Flag Banner */}
        {isRedFlag && (
          <RedFlagBanner 
            title={patient.aiSummary.redFlagTitle || 'Potential Red Flag Detected'}
            description={patient.aiSummary.redFlagDescription || 'Triple symptom cluster (Chest Pain + Breathlessness + Sweating) detected. Clinical review is recommended.'}
          />
        )}

        {/* Tab 1: AI Clinical Summary */}
        {activeTab === 'summary' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">AI-Generated Clinical History Summary</h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded border border-sky-200 dark:border-sky-800">
                For Clinical Review Only
              </span>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Chief Complaint Narrative</h3>
              <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-medium bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                {patient.aiSummary?.chiefComplaint || patient.complaint}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Synthesized Clinical Findings:</h3>
              <ul className="space-y-1.5 text-xs">
                {(patient.aiSummary?.keyFindings || []).map((finding, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                    <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400 shrink-0"></span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Symptoms & History */}
        {activeTab === 'history' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Activity className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Recorded Symptom Cluster</span>
              </h2>
              <div className="space-y-2 text-xs">
                {patient.symptoms.map(s => (
                  <div key={s} className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                    <span>{s}</span>
                    <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400">Recorded</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Medical History & Allergies</span>
              </h2>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Past History:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{(patient.history || []).join(', ') || 'None'}</strong>
                </div>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Current Medication:</span>
                  <strong className="text-sky-700 dark:text-sky-400 font-bold">{patient.medication || 'Amlodipine 5 mg once daily'}</strong>
                </div>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Documented Allergy:</span>
                  <strong className="text-red-600 dark:text-red-400 font-bold">{(patient.allergies || []).join(', ') || 'None'}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: OCR Documents */}
        {activeTab === 'documents' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>OCR Extracted Prescriptions & Lab Reports</span>
            </h2>

            {patient.documents && patient.documents.length > 0 ? (
              patient.documents.map((doc) => (
                <div key={doc.id} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-slate-900 dark:text-white">{doc.name}</strong>
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                      OCR Extracted
                    </span>
                  </div>
                  {doc.extractedData && (
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      <p>Medication: <strong className="text-sky-700 dark:text-sky-400">{doc.extractedData.medications.join(', ')}</strong></p>
                      <p>Allergies: <strong className="text-red-600 dark:text-red-400">{doc.extractedData.allergies.join(', ')}</strong></p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">No medical documents uploaded.</p>
            )}
          </div>
        )}

        {/* Tab 4: Physician Notes & Clinical Review Action */}
        {(activeTab === 'notes' || activeTab === 'summary') && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Attending Physician Clinical Review Notes</span>
            </h2>

            <textarea
              rows={3}
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Type clinical observations, ECG orders, or physician notes..."
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-sky-500"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                * Reviewing validates history for official medical record archive.
              </span>

              <button
                onClick={handleApprove}
                disabled={reviewApproved}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                  reviewApproved
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 cursor-default'
                    : 'bg-sky-600 hover:bg-sky-700 text-white'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{reviewApproved ? 'Clinical Review Completed' : 'Approve & Validate Clinical Intake'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </DoctorLayout>
  );
};

export default PatientDetail;
