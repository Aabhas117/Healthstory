import { create } from '../lib/zustand.js';
import { DEMO_PATIENT } from '../data/mockPatients.js';

export const usePatientStore = create((set, get) => ({
  // Active state
  language: 'hi', // 'hi' | 'en'
  currentStep: 1,
  
  // Patient details
  patientInfo: {
    name: 'Rajesh Kumar',
    age: 46,
    gender: 'Male',
    mobile: '+91 98765 43210',
    abhaId: '91-4829-1029-4821'
  },
  
  // Consent
  consentGiven: true,
  
  // Clinical symptoms intake
  complaint: 'Chest pain for 3 days',
  symptoms: ['Chest pain', 'Breathlessness', 'Sweating'],
  history: ['Hypertension'],
  medication: 'Amlodipine 5 mg once daily',
  allergies: ['Penicillin'],
  
  // Voice & Document artifacts
  transcriptHistory: [
    { sender: 'ai', text: 'नमस्ते राजेश जी! आपको क्या परेशानी हो रही है?', textEn: 'Hello Rajesh! What symptoms are you experiencing?' },
    { sender: 'patient', text: 'मुझे 3 दिनों से छाती में तेज दर्द हो रहा है, सांस फूल रही है और बहुत पसीना आ रहा है।', textEn: 'I have severe chest pain for 3 days, breathlessness, and profuse sweating.' }
  ],
  isRecording: false,
  isProcessingAudio: false,
  
  uploadedDocuments: [
    {
      id: 'DOC-01',
      name: 'Prescription_Cardiology.pdf',
      processedAt: '2026-09-01T10:15:00Z',
      extractedData: {
        medications: ['Amlodipine 5 mg once daily'],
        allergies: ['Penicillin']
      }
    }
  ],
  isUploadingDoc: false,
  
  // Red Flag Alert evaluation
  redFlagAlert: {
    isRedFlag: true,
    title: 'Potential Red Flag Detected',
    description: 'Triple symptom cluster (Chest Pain + Breathlessness + Sweating) in a hypertensive patient. Clinical review is recommended.'
  },
  
  // Submission Token
  submittedToken: null,

  // Action methods
  setLanguage: (lang) => set({ language: lang }),
  setCurrentStep: (step) => set({ currentStep: step }),
  
  updatePatientInfo: (info) => set((state) => ({
    patientInfo: { ...state.patientInfo, ...info }
  })),
  
  setConsent: (consent) => set({ consentGiven: consent }),
  setComplaint: (complaint) => set({ complaint }),
  
  toggleSymptom: (symptom) => set((state) => {
    const exists = state.symptoms.includes(symptom);
    const updated = exists ? state.symptoms.filter((s) => s !== symptom) : [...state.symptoms, symptom];
    
    // Evaluate red flag on update
    const hasChestPain = updated.some(s => s.toLowerCase().includes('chest'));
    const hasBreathlessness = updated.some(s => s.toLowerCase().includes('breath'));
    const hasSweating = updated.some(s => s.toLowerCase().includes('sweat'));
    const isRedFlag = hasChestPain && (hasBreathlessness || hasSweating);

    return {
      symptoms: updated,
      redFlagAlert: {
        isRedFlag,
        title: isRedFlag ? 'Potential Red Flag Detected' : 'Standard Intake Priority',
        description: isRedFlag 
          ? 'Symptom cluster (Chest Pain + Breathlessness/Sweating) detected. Clinical review is recommended.' 
          : 'No emergency red flags detected.'
      }
    };
  }),

  setHistory: (history) => set({ history }),
  setMedication: (medication) => set({ medication }),
  setAllergies: (allergies) => set({ allergies }),
  
  addTranscriptMessage: (msg) => set((state) => ({
    transcriptHistory: [...state.transcriptHistory, msg]
  })),

  setIsRecording: (recording) => set({ isRecording: recording }),
  setIsProcessingAudio: (processing) => set({ isProcessingAudio: processing }),
  
  addDocument: (doc) => set((state) => ({
    uploadedDocuments: [doc, ...state.uploadedDocuments]
  })),
  
  setIsUploadingDoc: (uploading) => set({ isUploadingDoc: uploading }),
  setSubmittedToken: (token) => set({ submittedToken: token }),

  // Load standard Demo Scenario (Rajesh Kumar)
  loadDemoPreset: () => set({
    language: 'hi',
    currentStep: 3, // Identify Step
    patientInfo: {
      name: DEMO_PATIENT.name,
      age: DEMO_PATIENT.age,
      gender: DEMO_PATIENT.gender,
      mobile: DEMO_PATIENT.mobile,
      abhaId: DEMO_PATIENT.abhaId
    },
    consentGiven: true,
    complaint: DEMO_PATIENT.complaint,
    symptoms: [...DEMO_PATIENT.symptoms],
    history: [...DEMO_PATIENT.history],
    medication: DEMO_PATIENT.medication,
    allergies: [...DEMO_PATIENT.allergies],
    redFlagAlert: {
      isRedFlag: true,
      title: 'Potential Red Flag Detected',
      description: 'Triple symptom cluster (Chest Pain + Breathlessness + Sweating). Clinical review is recommended.'
    }
  }),

  resetSession: () => set({
    currentStep: 1,
    symptoms: [],
    complaint: '',
    uploadedDocuments: [],
    submittedToken: null,
    redFlagAlert: { isRedFlag: false, title: '', description: '' }
  })
}));
