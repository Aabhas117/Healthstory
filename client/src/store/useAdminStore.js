import { create } from '../lib/zustand.js';
import { MOCK_ADMIN_DATA } from '../data/mockSystem.js';

export const useAdminStore = create((set) => ({
  metrics: MOCK_ADMIN_DATA.metrics,
  auditLogs: MOCK_ADMIN_DATA.auditLogs,
  modelsConfig: MOCK_ADMIN_DATA.modelsConfig,
  integrations: MOCK_ADMIN_DATA.integrations,
  
  updateModelConfig: (newConfig) => set((state) => ({
    modelsConfig: { ...state.modelsConfig, ...newConfig }
  })),

  toggleIntegration: (id) => set((state) => ({
    integrations: state.integrations.map(item => 
      item.id === id 
        ? { ...item, status: item.status.includes('Active') ? 'Inactive (Paused)' : 'Active (Connected)' }
        : item
    )
  }))
}));
