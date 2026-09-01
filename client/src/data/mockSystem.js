export const MOCK_ADMIN_DATA = {
  metrics: {
    totalIntakesToday: 142,
    redFlagsDetected: 18,
    avgIntakeDurationMinutes: 3.4,
    activeKiosks: 8,
    ocrAccuracyRate: '99.2%',
    abdmConsentSuccess: '100%'
  },
  auditLogs: [
    {
      id: 'AUD-901',
      timestamp: '2026-09-01T10:30:14Z',
      action: 'Patient Intake Submitted',
      patientId: 'P-101 (Rajesh Kumar)',
      kioskId: 'Kiosk-04 (OPD Ground Floor)',
      redFlagFlagged: true,
      abdmConsentId: 'CONSENT-ABDM-88219'
    },
    {
      id: 'AUD-902',
      timestamp: '2026-09-01T10:15:02Z',
      action: 'Prescription Document Uploaded & OCR Scanned',
      patientId: 'P-101 (Rajesh Kumar)',
      kioskId: 'Kiosk-04 (OPD Ground Floor)',
      extractedFieldsCount: 3,
      abdmConsentId: 'CONSENT-ABDM-88219'
    },
    {
      id: 'AUD-903',
      timestamp: '2026-09-01T09:50:41Z',
      action: 'Clinical Review Approved',
      patientId: 'P-102 (Sunita Sharma)',
      kioskId: 'Doctor Terminal - Room 102',
      redFlagFlagged: false,
      doctorName: 'Dr. V. Sharma (M.D.)'
    }
  ],
  modelsConfig: {
    activeModel: 'MedLLM-v3.4-Clinical-India',
    temperature: 0.1,
    maxTokens: 512,
    safetyThreshold: 'Strict Clinical Triage Only',
    systemPrompt: `You are AyuDrishti Clinical History Assistant. You MUST NEVER diagnose patients or refer to yourself as a doctor. Formulate structured clinical summaries and flag potential red flags for clinical review.`
  },
  integrations: [
    {
      id: 'int-1',
      name: 'Ayushman Bharat Digital Mission (ABDM M2/M3)',
      status: 'Active (Connected)',
      endpoint: 'https://api.abdm.gov.in/v0.5/health-information/hiu/on-request',
      mode: 'Mock Simulation'
    },
    {
      id: 'int-2',
      name: 'Hospital Information System (HIS / EHR Gateway)',
      status: 'Active (Connected)',
      endpoint: 'https://his.hospital.org/api/v1/triage-feed',
      mode: 'Mock Simulation'
    },
    {
      id: 'int-3',
      name: 'AI Speech-to-Text Engine (Hindi / Regional Accent)',
      status: 'Active (Connected)',
      endpoint: 'https://ai.speech.healthstory.in/v1/transcribe',
      mode: 'Mock Simulation'
    }
  ]
};
