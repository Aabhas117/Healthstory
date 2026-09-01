export const DEMO_PATIENT = {
  id: 'P-101',
  abhaId: '91-4829-1029-4821',
  tokenNumber: 'TK-402',
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
  waitTime: '12 min',
  priority: 'HIGH',
  status: 'Waiting Clinical Review',
  createdTime: '10:30 AM',
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
  extractedFields: [
    {
      id: 'field-1',
      label: 'Current Medication',
      value: 'Amlodipine 5 mg once daily',
      originalValue: 'Amlodipine 5 mg once daily',
      confidence: 94,
      source: 'Prescription #1 (DOC-01)',
      status: 'Pending Verification'
    },
    {
      id: 'field-2',
      label: 'Documented Allergy',
      value: 'Penicillin (Severe rash)',
      originalValue: 'Penicillin (Severe rash)',
      confidence: 98,
      source: 'Patient Interview & Prescription #1',
      status: 'Pending Verification'
    },
    {
      id: 'field-3',
      label: 'Past Medical History',
      value: 'Essential Hypertension (2 years)',
      originalValue: 'Essential Hypertension (2 years)',
      confidence: 91,
      source: 'Prescription #1',
      status: 'Pending Verification'
    },
    {
      id: 'field-4',
      label: 'Chief Concern',
      value: 'Anterior chest pain for 3 days',
      originalValue: 'Anterior chest pain for 3 days',
      confidence: 96,
      source: 'Voice Kiosk Interview',
      status: 'Pending Verification'
    }
  ],
  timeline: [
    {
      id: 'tl-1',
      year: '2024',
      date: 'Oct 14, 2024',
      title: 'Hypertension Diagnosed',
      category: 'Symptoms',
      description: 'Diagnosed with Essential BP 145/90 mmHg at OPD.',
      documentId: 'DOC-01'
    },
    {
      id: 'tl-2',
      year: '2025',
      date: 'Jan 20, 2025',
      title: 'Prescription Uploaded',
      category: 'Medications',
      description: 'Started Amlodipine 5mg OD by Dr. Sharma.',
      documentId: 'DOC-01'
    },
    {
      id: 'tl-3',
      year: '2026',
      date: 'Aug 15, 2026',
      title: 'Blood & Lab Report',
      category: 'Labs',
      description: 'Hemoglobin: 9.2 g/dL (Low), Blood Glucose: 118 mg/dL.',
      documentId: 'DOC-02'
    },
    {
      id: 'tl-4',
      year: '2026',
      date: 'Sep 01, 2026',
      title: 'Current OPD Triage Intake',
      category: 'Symptoms',
      description: 'Patient registered with chest pain, breathlessness, and sweating.',
      documentId: null
    }
  ],
  labResults: [
    { name: 'Hemoglobin', value: '9.2', unit: 'g/dL', status: 'Low', range: '13.5 - 17.5 g/dL', source: 'Lab Report #02' },
    { name: 'Blood Pressure', value: '148/92', unit: 'mmHg', status: 'High', range: '< 120/80 mmHg', source: 'OPD Kiosk Vitals' },
    { name: 'Fasting Blood Glucose', value: '118', unit: 'mg/dL', status: 'Slightly High', range: '70 - 99 mg/dL', source: 'Lab Report #02' },
    { name: 'Serum Creatinine', value: '0.9', unit: 'mg/dL', status: 'Normal', range: '0.7 - 1.3 mg/dL', source: 'Lab Report #02' },
    { name: 'Troponin T', value: '0.01', unit: 'ng/mL', status: 'Normal', range: '< 0.04 ng/mL', source: 'OPD Quick Test' }
  ],
  medicationsList: [
    { name: 'Amlodipine', dose: '5 mg', frequency: 'Once daily', source: 'Prescription #1', confidence: '94%', status: 'Verified' },
    { name: 'Paracetamol', dose: '650 mg', frequency: 'As needed (SOS)', source: 'Patient Interview', confidence: '88%', status: 'Pending' }
  ],
  allergiesList: [
    { allergen: 'Penicillin', reaction: 'Severe Anaphylactic Skin Rash', source: 'Patient Interview & Prescription #1', reportedDate: 'Recorded 2025' }
  ],
  ayushProfile: {
    prakriti: 'Pitta-Kapha',
    ayushTreatments: ['Ayurvedic Arjuna Ksheerapaka for Cardiac Wellness', 'Pranayama & Anulom-Vilom Breathing'],
    herbalMedicines: ['Sarpagandha 250mg OD', 'Trifala Churna at bedtime'],
    dietaryPractices: ['Low Sodium Sattvic Diet', 'Avoided fried & spicy foods'],
    traditionalRemedies: ['Warm Garlic & Ginger Decoction'],
    lifestyleInfo: ['Regular 30 min morning walk', 'Non-smoker']
  },
  documents: [
    {
      id: 'DOC-01',
      name: 'Previous_Prescription_Cardiology.pdf',
      type: 'Prescription',
      uploadedAt: '2026-09-01T10:15:00Z',
      snippet: 'Rx: Tab Amlodipine 5mg OD. History of Hypertension. Allergy: Penicillin.',
      extractedData: {
        medications: ['Amlodipine 5mg OD'],
        diagnosis: 'Essential Hypertension',
        allergies: ['Penicillin (Skin Rash)']
      }
    },
    {
      id: 'DOC-02',
      name: 'Lab_Report_CBC_Lipid_2026.pdf',
      type: 'Lab Report',
      uploadedAt: '2026-08-15T11:00:00Z',
      snippet: 'Hemoglobin: 9.2 g/dL (L). Cholesterol: 210 mg/dL. Glucose: 118 mg/dL.',
      extractedData: {
        medications: [],
        diagnosis: 'Mild Anemia',
        allergies: []
      }
    }
  ],
  consentGiven: true
};

export const MOCK_PATIENT_QUEUE = [
  DEMO_PATIENT,
  {
    id: 'P-102',
    abhaId: '91-3312-9988-1120',
    tokenNumber: 'TK-403',
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    language: 'Hindi',
    mobile: '+91 98123 77654',
    complaint: 'Headache and mild fever for 2 days',
    symptoms: ['Headache', 'Fever', 'Fatigue'],
    history: ['Migraine'],
    medication: 'Paracetamol 650 mg SOS',
    allergies: ['None'],
    waitTime: '8 min',
    priority: 'MEDIUM',
    status: 'Waiting Clinical Review',
    createdTime: '10:45 AM',
    vitals: { bloodPressure: '124/80 mmHg', heartRate: '92 bpm', spo2: '97%', temperature: '100.2 °F' },
    aiSummary: {
      chiefComplaint: 'Mild fever with tension headache in 32yo female.',
      keyFindings: ['Fever 100.2 F', 'Headache', 'History of Migraine'],
      redFlagAlert: false,
      clinicalAction: 'Routine outpatient consultation recommended.'
    },
    documents: [],
    consentGiven: true
  },
  {
    id: 'P-103',
    abhaId: '91-7744-2211-5566',
    tokenNumber: 'TK-404',
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
    waitTime: '15 min',
    priority: 'LOW',
    status: 'In Consultation',
    createdTime: '11:00 AM',
    vitals: { bloodPressure: '130/84 mmHg', heartRate: '74 bpm', spo2: '98%', temperature: '98.6 °F' },
    aiSummary: {
      chiefComplaint: 'Bilateral knee pain exacerbated by walking.',
      keyFindings: ['Chronic joint pain', 'No systemic red flags'],
      redFlagAlert: false,
      clinicalAction: 'Orthopedic consultation scheduled.'
    },
    documents: [],
    consentGiven: true
  }
];
