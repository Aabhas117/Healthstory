import { DEMO_PATIENT, MOCK_PATIENT_QUEUE } from '../data/mockPatients.js';
import { MOCK_ADMIN_DATA } from '../data/mockSystem.js';

let inMemoryPatients = [...MOCK_PATIENT_QUEUE];
let inMemoryLogs = [...MOCK_ADMIN_DATA.auditLogs];

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Speech-to-text simulation
  async transcribeAudio(language = 'hi') {
    await delay(1200);
    if (language === 'hi') {
      return {
        transcript: 'मुझे 3 दिनों से छाती में दर्द हो रहा है। सांस लेने में भी तकलीफ है और पसीना आ रहा है।',
        translation: 'I have had chest pain for 3 days. I also have difficulty breathing and sweating.',
        detectedSymptoms: ['Chest pain', 'Breathlessness', 'Sweating']
      };
    }
    return {
      transcript: 'I have been experiencing chest pain for the last 3 days with breathlessness and cold sweating.',
      translation: 'I have been experiencing chest pain for the last 3 days with breathlessness and cold sweating.',
      detectedSymptoms: ['Chest pain', 'Breathlessness', 'Sweating']
    };
  },

  // Document OCR simulation
  async processDocument(file) {
    await delay(1600);
    return {
      id: `DOC-${Date.now().toString().slice(-4)}`,
      name: file ? file.name : 'Prescription_Cardiology_2026.pdf',
      size: file ? `${(file.size / 1024).toFixed(1)} KB` : '420 KB',
      processedAt: new Date().toISOString(),
      extractedData: {
        medications: ['Amlodipine 5 mg once daily'],
        history: ['Hypertension'],
        allergies: ['Penicillin']
      }
    };
  },

  // Red Flag Clinical Analysis (Strict non-diagnostic triage rule)
  async analyzeRedFlags({ symptoms = [], complaint = '' }) {
    await delay(300);
    const hasChestPain = symptoms.some(s => s.toLowerCase().includes('chest')) || complaint.toLowerCase().includes('chest');
    const hasBreathlessness = symptoms.some(s => s.toLowerCase().includes('breath')) || complaint.toLowerCase().includes('breath');
    const hasSweating = symptoms.some(s => s.toLowerCase().includes('sweat')) || complaint.toLowerCase().includes('sweat');

    // Trigger Red Flag on Chest pain + Breathlessness + Sweating
    if (hasChestPain && (hasBreathlessness || hasSweating)) {
      return {
        isRedFlag: true,
        redFlagTitle: 'Potential Red Flag Detected',
        redFlagDescription: 'Triple symptom cluster (Chest Pain + Breathlessness + Sweating) detected. Clinical review is recommended.',
        triageLevel: 'High Priority',
        recommendedAction: 'Immediate triage and clinical review by attending medical practitioner.'
      };
    }

    return {
      isRedFlag: false,
      redFlagTitle: 'Standard Intake Priority',
      redFlagDescription: 'No acute emergency red flags identified during automated history intake.',
      triageLevel: 'Routine Priority',
      recommendedAction: 'Standard medical consultation.'
    };
  },

  // Patient Intake Submission
  async submitPatientRecord(patientData) {
    await delay(800);
    const tokenNumber = `TK-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord = {
      id: `P-${Date.now().toString().slice(-3)}`,
      tokenNumber,
      abhaId: patientData.abhaId || '91-4829-1029-4821',
      name: patientData.name || 'Ramesh Patel',
      age: patientData.age || 46,
      gender: patientData.gender || 'Male',
      language: patientData.language || 'Hindi',
      mobile: patientData.mobile || '+91 98765 43210',
      complaint: patientData.complaint || 'Chest pain for 3 days',
      symptoms: patientData.symptoms || ['Chest pain', 'Breathlessness', 'Sweating'],
      history: patientData.history || ['Hypertension'],
      medication: patientData.medication || 'Amlodipine 5 mg once daily',
      allergies: patientData.allergies || ['Penicillin'],
      documents: patientData.documents || [],
      consentGiven: patientData.consentGiven !== undefined ? patientData.consentGiven : true,
      aiSummary: {
        chiefComplaint: patientData.complaint || 'Chest pain for 3 days',
        keyFindings: [
          'Anterior chest pain (3 days duration)',
          'Associated breathlessness and sweating',
          'History of Hypertension on Amlodipine 5mg QD',
          'Documented Penicillin allergy'
        ],
        redFlagAlert: true,
        redFlagTitle: 'Potential Red Flag Detected',
        redFlagDescription: 'Chest pain + Breathlessness + Sweating cluster requires clinical review.',
        clinicalAction: 'Clinical review is recommended.'
      },
      status: 'Waiting Clinical Review',
      createdTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    inMemoryPatients.unshift(newRecord);

    // Append Audit Log
    inMemoryLogs.unshift({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      action: 'Patient Kiosk Intake Submitted',
      patientId: `${newRecord.id} (${newRecord.name})`,
      kioskId: 'Kiosk-01 (OPD Reception)',
      redFlagFlagged: true,
      abdmConsentId: 'CONSENT-ABDM-LIVE'
    });

    return {
      success: true,
      tokenNumber,
      patient: newRecord
    };
  },

  // Doctor API methods
  async fetchPatients() {
    await delay(300);
    return [...inMemoryPatients];
  },

  async fetchPatientById(id) {
    await delay(300);
    const found = inMemoryPatients.find(p => p.id === id || p.tokenNumber === id) || DEMO_PATIENT;
    return found;
  },

  // Admin API methods
  async fetchAdminMetrics() {
    await delay(300);
    return MOCK_ADMIN_DATA.metrics;
  },

  async fetchAuditLogs() {
    await delay(300);
    return [...inMemoryLogs];
  },

  async fetchModelConfig() {
    await delay(300);
    return MOCK_ADMIN_DATA.modelsConfig;
  },

  async fetchIntegrations() {
    await delay(300);
    return MOCK_ADMIN_DATA.integrations;
  }
};
