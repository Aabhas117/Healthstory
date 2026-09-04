import React, { useState, useEffect } from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout.jsx';
import { useParams, useNavigate } from '../../lib/router.jsx';
import { useDoctorStore } from '../../store/useDoctorStore.js';
import { RedFlagBanner } from '../../components/patient/RedFlagBanner.jsx';
import { LoadingSpinner } from '../../components/common/LoadingSpinner.jsx';
import { StatusBadge } from '../../components/common/StatusBadge.jsx';
import { ClinicalField } from '../../components/doctor/ClinicalField.jsx';
import { DoctorVerificationModal } from '../../components/doctor/DoctorVerificationModal.jsx';
import { EvidenceDrawer } from '../../components/doctor/EvidenceDrawer.jsx';
import { ClinicalTimeline } from '../../components/doctor/ClinicalTimeline.jsx';
import { api } from '../../services/api.js';
import { DEMO_PATIENT } from '../../data/mockPatients.js';
import {
  Stethoscope,
  User,
  ArrowLeft,
  CheckCircle,
  FileText,
  Activity,
  Shield,
  AlertTriangle,
  Sparkles,
  Clock,
  Check,
  Eye
} from '../../lib/icons.jsx';

export const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctorNotes, setDoctorNotes, approveClinicalReview } = useDoctorStore();
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewApproved, setReviewApproved] = useState(false);
  
  // Verification Modal State
  const [editingField, setEditingField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Evidence Drawer State
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Extracted AI Fields state
  const [extractedFields, setExtractedFields] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await api.doctor.getPatientById(id || 'P-101');
      const loaded = res || DEMO_PATIENT;
      setPatient(loaded);
      setExtractedFields(loaded.extractedFields || []);
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

  // Verification Handlers
  const handleAcceptField = (fieldId) => {
    setExtractedFields(prev => prev.map(f => f.id === fieldId ? { ...f, status: 'Doctor Verified' } : f));
  };

  const handleRejectField = (fieldId) => {
    setExtractedFields(prev => prev.map(f => f.id === fieldId ? { ...f, status: 'Rejected' } : f));
  };

  const handleOpenEditModal = (field) => {
    setEditingField(field);
    setIsModalOpen(true);
  };

  const handleSaveEditedField = (updatedField) => {
    setExtractedFields(prev => prev.map(f => f.id === updatedField.id ? updatedField : f));
  };

  const handleOpenEvidence = (docId) => {
    const doc = (patient.documents || []).find(d => d.id === docId) || patient.documents?.[0];
    if (doc) {
      setSelectedDoc(doc);
      setIsDrawerOpen(true);
    }
  };

  const handleApprove = () => {
    approveClinicalReview(patient.id);
    setReviewApproved(true);
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="flex items-center gap-2 text-xs font-bold text-[#20B8C8] hover:underline bg-white px-3.5 py-2 rounded-xl border border-[#DCEAF0] shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Triage Queue</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Printing Official EHR summary for ${patient.name}...`)}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#DCEAF0] text-xs font-bold text-[#536B7D] hover:bg-[#F5FAFC] shadow-xs"
            >
              Print EHR
            </button>
            <button
              onClick={() => alert(`Exported ABDM FHIR record for ${patient.name}.`)}
              className="px-3 py-1.5 rounded-xl bg-[#20B8C8] text-white text-xs font-bold hover:bg-[#1CA6B4] shadow-xs"
            >
              Export FHIR JSON
            </button>
          </div>
        </div>

        {/* Top Patient Clinical Banner */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EEF6F9] pb-4">
            
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl shrink-0 border ${
                isRedFlag 
                  ? 'bg-red-50 text-red-700 border-red-200' 
                  : 'bg-[#20B8C8]/10 text-[#20B8C8] border-[#20B8C8]/20'
              }`}>
                {patient.tokenNumber || patient.id}
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-[#17324D]">{patient.name}</h1>
                  <span className="text-xs font-semibold text-[#536B7D] bg-[#F5FAFC] px-2.5 py-0.5 rounded-full border border-[#DCEAF0]">
                    {patient.age} yrs • {patient.gender}
                  </span>
                  
                  <StatusBadge 
                    status={isRedFlag ? 'redflag' : 'routine'} 
                    text={isRedFlag ? 'Potential Red Flag' : 'Standard Priority'}
                    size="sm"
                  />
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-[#536B7D] mt-2 font-mono">
                  <span>Encounter ID: <strong className="text-[#17324D]">{patient.tokenNumber || patient.id}</strong></span>
                  <span>ABHA ID: <strong className="text-[#20B8C8]">{patient.abhaId}</strong></span>
                  <span>Mobile: <strong className="text-[#17324D]">{patient.mobile}</strong></span>
                  <span>Language: <strong className="text-[#17324D]">{patient.language}</strong></span>
                </div>
              </div>
            </div>

            <div className="text-left md:text-right text-xs bg-[#F5FAFC] p-3 rounded-2xl border border-[#DCEAF0]">
              <span className="text-[#7A8D9D] block text-[10px] uppercase font-bold">Consultation Status</span>
              <strong className={`text-sm font-bold ${reviewApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                {reviewApproved ? 'Approved by Physician' : patient.status}
              </strong>
            </div>

          </div>
        </div>

        {/* RED FLAG PANEL */}
        {isRedFlag && (
          <RedFlagBanner 
            title="Potential red flag detected"
            reason={patient.aiSummary.redFlagDescription || "Chest pain + breathlessness + sweating"}
            action="Immediate physician assessment"
          />
        )}

        {/* AI CLINICAL SUMMARY SECTION */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EEF6F9] pb-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#20B8C8]" />
              <h2 className="text-base font-bold text-[#17324D]">AI-Generated Clinical History Summary</h2>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#20B8C8] bg-[#20B8C8]/10 px-2.5 py-1 rounded-lg border border-[#20B8C8]/20">
              For Clinical Review Only
            </span>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#536B7D] uppercase tracking-wider mb-1">Chief Complaint Narrative</h3>
            <p className="text-sm text-[#17324D] leading-relaxed font-medium bg-[#F5FAFC] p-4 rounded-2xl border border-[#DCEAF0]">
              {patient.aiSummary?.chiefComplaint || patient.complaint}
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-bold text-[#536B7D] uppercase tracking-wider">Synthesized Clinical Findings:</h3>
            <ul className="space-y-1.5 text-xs">
              {(patient.aiSummary?.keyFindings || []).map((finding, idx) => (
                <li key={idx} className="flex items-center gap-2.5 bg-[#F5FAFC] p-3 rounded-xl border border-[#DCEAF0] text-[#17324D] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#20B8C8] shrink-0"></span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI CLINICAL FIELDS & VERIFICATION CONTROLS */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EEF6F9] pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#20B8C8]" />
              <h2 className="text-base font-bold text-[#17324D]">AI Extracted Clinical Fields & Verification</h2>
            </div>
            <span className="text-xs text-[#536B7D] font-semibold">Doctor Verification Controls</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {extractedFields.map((field) => (
              <ClinicalField
                key={field.id}
                label={field.label}
                value={field.value}
                confidence={field.confidence}
                source={field.source}
                status={field.status}
                onAccept={() => handleAcceptField(field.id)}
                onEdit={() => handleOpenEditModal(field)}
                onReject={() => handleRejectField(field.id)}
                onOpenSource={() => handleOpenEvidence(patient.documents?.[0]?.id)}
              />
            ))}
          </div>
        </div>

        {/* CLINICAL TIMELINE */}
        <ClinicalTimeline 
          events={patient.timeline || []} 
          onOpenEvidence={handleOpenEvidence}
        />

        {/* LAB REPORTS & MEDICATIONS & ALLERGIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LAB REPORTS SECTION */}
          <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#17324D] flex items-center gap-2 border-b border-[#EEF6F9] pb-3">
              <Activity className="w-5 h-5 text-[#20B8C8]" />
              <span>Laboratory Results & Vitals</span>
            </h2>

            <div className="space-y-2 text-xs">
              {(patient.labResults || []).map((lab, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#F5FAFC] p-3 rounded-xl border border-[#DCEAF0]">
                  <div>
                    <strong className="text-[#17324D] font-bold block">{lab.name}</strong>
                    <span className="text-[10px] text-[#536B7D]">Ref: {lab.range} • {lab.source}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-extrabold text-[#17324D] mr-2">{lab.value} {lab.unit}</span>
                    <StatusBadge 
                      status={lab.status === 'High' || lab.status === 'Low' ? 'warning' : 'success'} 
                      text={lab.status}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MEDICATIONS & ALLERGIES SECTION */}
          <div className="space-y-6">
            
            {/* DEDICATED ALLERGIES WARNING PANEL */}
            <div className="bg-red-50 p-5 rounded-2xl border-2 border-red-200 space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <h3 className="font-extrabold text-sm text-red-900">Documented Clinical Allergy Alert</h3>
              </div>
              
              {(patient.allergiesList || []).map((alg, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-red-200 text-xs">
                  <div className="flex justify-between items-center">
                    <strong className="text-red-700 font-extrabold text-sm">{alg.allergen}</strong>
                    <span className="text-[10px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      Reported
                    </span>
                  </div>
                  <p className="text-[#536B7D] mt-1 font-medium">Reaction: {alg.reaction}</p>
                  <span className="text-[10px] text-[#7A8D9D] mt-0.5 block">Source: {alg.source}</span>
                </div>
              ))}
            </div>

            {/* MEDICATIONS TABLE */}
            <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-[#17324D] flex items-center gap-2 border-b border-[#EEF6F9] pb-2">
                <FileText className="w-4 h-4 text-[#20B8C8]" />
                <span>Current Medications</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#DCEAF0] text-[#536B7D] font-bold">
                      <th className="py-2 px-2">Medication</th>
                      <th className="py-2 px-2">Dose</th>
                      <th className="py-2 px-2">Frequency</th>
                      <th className="py-2 px-2">Source</th>
                      <th className="py-2 px-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEF6F9]">
                    {(patient.medicationsList || []).map((med, idx) => (
                      <tr key={idx} className="font-medium text-[#17324D]">
                        <td className="py-2.5 px-2 font-bold text-[#20B8C8]">{med.name}</td>
                        <td className="py-2.5 px-2 font-mono">{med.dose}</td>
                        <td className="py-2.5 px-2">{med.frequency}</td>
                        <td className="py-2.5 px-2 text-[#536B7D]">{med.source}</td>
                        <td className="py-2.5 px-2 text-right">
                          <StatusBadge status={med.status === 'Verified' ? 'success' : 'warning'} text={med.status} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        {/* AYUSH PROFILE SECTION */}
        {patient.ayushProfile && (
          <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#EEF6F9] pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#20B8C8]" />
                <h2 className="text-base font-bold text-[#17324D]">AYUSH Profile & Traditional Medicine Intake</h2>
              </div>
              <span className="text-xs font-bold text-[#20B8C8] bg-[#20B8C8]/10 px-2.5 py-1 rounded-lg border border-[#20B8C8]/20">
                Prakriti: {patient.ayushProfile.prakriti}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#F5FAFC] p-4 rounded-xl border border-[#DCEAF0] space-y-1.5">
                <h4 className="font-extrabold text-[#17324D] uppercase tracking-wider text-[11px]">Herbal Medicines</h4>
                <ul className="list-disc list-inside space-y-1 text-[#536B7D] font-medium">
                  {patient.ayushProfile.herbalMedicines.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>

              <div className="bg-[#F5FAFC] p-4 rounded-xl border border-[#DCEAF0] space-y-1.5">
                <h4 className="font-extrabold text-[#17324D] uppercase tracking-wider text-[11px]">AYUSH Treatments</h4>
                <ul className="list-disc list-inside space-y-1 text-[#536B7D] font-medium">
                  {patient.ayushProfile.ayushTreatments.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>

              <div className="bg-[#F5FAFC] p-4 rounded-xl border border-[#DCEAF0] space-y-1.5">
                <h4 className="font-extrabold text-[#17324D] uppercase tracking-wider text-[11px]">Diet & Remedies</h4>
                <ul className="list-disc list-inside space-y-1 text-[#536B7D] font-medium">
                  {patient.ayushProfile.dietaryPractices.map((m, i) => <li key={i}>{m}</li>)}
                  {patient.ayushProfile.traditionalRemedies.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SOURCE DOCUMENTS CARDS */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-[#17324D] flex items-center gap-2 border-b border-[#EEF6F9] pb-3">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Uploaded Source Documents & Evidence</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(patient.documents || []).map((doc) => (
              <div key={doc.id} className="bg-[#F5FAFC] p-4 rounded-xl border border-[#DCEAF0] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-extrabold text-[#17324D]">{doc.name}</strong>
                  <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                    {doc.type}
                  </span>
                </div>

                <p className="text-xs text-[#536B7D] font-mono bg-white p-2.5 rounded-lg border border-[#DCEAF0]">
                  "{doc.snippet || 'Extracted medical record text...'}"
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenEvidence(doc.id)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-[#20B8C8] text-white font-bold text-xs hover:bg-[#1CA6B4] shadow-xs flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Evidence Drawer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PHYSICIAN NOTES & CLINICAL APPROVAL */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-[#17324D] flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#20B8C8]" />
            <span>Attending Physician Clinical Notes & Final Validation</span>
          </h2>

          <textarea
            rows={3}
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
            placeholder="Type clinical observations, ECG orders, or physician notes..."
            className="w-full p-3.5 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#17324D] text-xs focus:outline-none focus:border-[#20B8C8] font-medium"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#536B7D]">
              * Validates history for official hospital EMR record.
            </span>

            <button
              onClick={handleApprove}
              disabled={reviewApproved}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-xs ${
                reviewApproved
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-[#20B8C8] hover:bg-[#1CA6B4] text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{reviewApproved ? 'Clinical Review Completed' : 'Approve & Validate Record'}</span>
            </button>
          </div>
        </div>

        {/* EDIT VERIFICATION MODAL */}
        <DoctorVerificationModal
          isOpen={isModalOpen}
          field={editingField}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEditedField}
        />

        {/* EVIDENCE DRAWER */}
        <EvidenceDrawer
          isOpen={isDrawerOpen}
          document={selectedDoc}
          onClose={() => setIsDrawerOpen(false)}
        />

      </div>
    </DoctorLayout>
  );
};

export default PatientDetail;
