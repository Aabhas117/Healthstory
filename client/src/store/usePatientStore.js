import { create } from '../lib/zustand.js';

export const usePatientStore = create((set, get) => ({
  // Active state
  language: 'en', // 'en' | 'hi'
  currentStep: 1,
  
  // Patient details - Clean empty initial state for fresh intake
  patientInfo: {
    name: '',
    age: '',
    gender: 'Male',
    mobile: '',
    abhaId: ''
  },
  
  // Consent
  consentGiven: false,
  
  // Clinical symptoms intake
  complaint: '',
  symptoms: [],
  history: [],
  medication: '',
  allergies: [],
  
  // Voice & Document artifacts
  transcriptHistory: [],
  isRecording: false,
  isProcessingAudio: false,
  
  uploadedDocuments: [],
  isUploadingDoc: false,
  
  // Red Flag Alert evaluation
  redFlagAlert: {
    isRedFlag: false,
    title: '',
    description: ''
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
        title: isRedFlag ? 'Potential Red Flag Detected' : '',
        description: isRedFlag 
          ? 'Triple symptom cluster (Chest pain + breathlessness + sweating) detected. Recommended action: Immediate physician assessment.' 
          : ''
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

  resetSession: () => set({
    currentStep: 1,
    patientInfo: {
      name: '',
      age: '',
      gender: 'Male',
      mobile: '',
      abhaId: ''
    },
    consentGiven: false,
    symptoms: [],
    complaint: '',
    history: [],
    medication: '',
    allergies: [],
    transcriptHistory: [],
    uploadedDocuments: [],
    submittedToken: null,
    redFlagAlert: { isRedFlag: false, title: '', description: '' }
  })
}));
