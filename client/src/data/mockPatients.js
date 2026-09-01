export const DEMO_PATIENT = {
  id: 'P-101',
  abhaId: '91-4829-1029-4821',
  name: 'Rajesh Kumar',
  age: 46,
  gender: 'Male',
  language: 'Hindi',
  mobile: '+91 98765 43210',
  complaint: 'Chest pain for 3 days',
  symptoms: ['Chest pain', 'Breathlessness', 'Sweating'],
  onset: '3 days ago',
  severity: 'Moderate to High',
  history: ['Hypertension'],
  medication: 'Amlodipine 5 mg once daily',
  allergies: ['Penicillin'],
  vitals: {
    bloodPressure: '148/92 mmHg',
    heartRate: '88 bpm',
    spo2: '96%',
    temperature: '98.4 °F'
  },
  aiSummary: {
    chiefComplaint: 'Patient presents with persistent anterior chest discomfort for 3 days, accompanied by shortness of breath and diaphoresis.',
    keyFindings: [
      'Anterior chest pain (3 days duration)',
      'Associated exertional breathlessness',
      'Diaphoresis (profuse sweating)',
      'Known history of Hypertension on Amlodipine 5mg QD',
      'Documented allergy: Penicillin'
    ],
    redFlagAlert: true,
    redFlagTitle: 'Potential Red Flag Detected',
    redFlagDescription: 'Triple symptom cluster (Chest Pain + Breathlessness + Sweating) in a hypertensive patient requires urgent clinical review to rule out acute cardiac etiology.',
    clinicalAction: 'Requires immediate clinical review by attending physician.',
    triageScore: 'High Priority (Level 1)'
  },
  documents: [
    {
      id: 'DOC-01',
      name: 'Previous_Prescription_Cardiology.pdf',
      type: 'Prescription',
      uploadedAt: '2026-09-01T10:15:00Z',
      extractedData: {
        medications: ['Amlodipine 5mg OD'],
        diagnosis: 'Essential Hypertension',
        allergies: ['Penicillin (Skin Rash)']
      }
    }
  ],
  consentGiven: true,
  status: 'Waiting Clinical Review',
  createdTime: '10:30 AM'
};

export const MOCK_PATIENT_QUEUE = [
  DEMO_PATIENT,
  {
    id: 'P-102',
    abhaId: '91-3312-9988-1120',
    name: 'Sunita Sharma',
    age: 52,
    gender: 'Female',
    language: 'Hindi',
    mobile: '+91 98123 77654',
    complaint: 'High fever and dry cough for 4 days',
    symptoms: ['Fever', 'Dry Cough', 'Fatigue'],
    history: ['Diabetes Type 2'],
    medication: 'Metformin 500 mg BD',
    allergies: ['None'],
    vitals: { bloodPressure: '124/80 mmHg', heartRate: '92 bpm', spo2: '97%', temperature: '101.2 °F' },
    aiSummary: {
      chiefComplaint: 'High grade fever with non-productive cough in diabetic patient.',
      keyFindings: ['Fever 101.2 F', 'Dry Cough', 'Type 2 Diabetes'],
      redFlagAlert: false,
      clinicalAction: 'Routine outpatient consultation recommended.'
    },
    documents: [],
    consentGiven: true,
    status: 'In Consultation',
    createdTime: '10:45 AM'
  },
  {
    id: 'P-103',
    abhaId: '91-7744-2211-5566',
    name: 'Amitabh Verma',
    age: 61,
    gender: 'Male',
    language: 'English',
    mobile: '+91 99001 12233',
    complaint: 'Joint pain in both knees for 2 weeks',
    symptoms: ['Knee Pain', 'Joint Stiffness'],
    history: ['Osteoarthritis'],
    medication: 'Paracetamol 650 mg SOS',
    allergies: ['Sulfa drugs'],
    vitals: { bloodPressure: '130/84 mmHg', heartRate: '74 bpm', spo2: '98%', temperature: '98.6 °F' },
    aiSummary: {
      chiefComplaint: 'Bilateral knee pain exacerbated by walking.',
      keyFindings: ['Chronic joint pain', 'No systemic red flags'],
      redFlagAlert: false,
      clinicalAction: 'Orthopedic consultation scheduled.'
    },
    documents: [],
    consentGiven: true,
    status: 'Waiting Clinical Review',
    createdTime: '11:00 AM'
  }
];
