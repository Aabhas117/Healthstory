import { mockApi } from './mockApi.js';

/**
 * Service Abstraction Layer for AyuDrishti Clinical History Platform.
 * 
 * Components call methods on `api`. 
 * Currently delegates to `mockApi`.
 * In future production backend integration, `mockApi` calls inside these wrapper functions
 * will be replaced with real `fetch()` / `axios` API calls.
 */

export const api = {
  patient: {
    transcribeAudio: (language) => mockApi.transcribeAudio(language),
    processDocument: (file) => mockApi.processDocument(file),
    analyzeRedFlags: (data) => mockApi.analyzeRedFlags(data),
    submitIntake: (patientData) => mockApi.submitPatientRecord(patientData)
  },

  doctor: {
    getPatients: () => mockApi.fetchPatients(),
    getPatientById: (id) => mockApi.fetchPatientById(id)
  },

  admin: {
    getMetrics: () => mockApi.fetchAdminMetrics(),
    getAuditLogs: () => mockApi.fetchAuditLogs(),
    getModelConfig: () => mockApi.fetchModelConfig(),
    getIntegrations: () => mockApi.fetchIntegrations()
  }
};

export default api;
