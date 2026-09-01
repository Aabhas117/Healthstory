import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout.jsx';
import { useAdminStore } from '../../store/useAdminStore.js';
import { Settings, Shield, Activity, RefreshCw, CheckCircle } from '../../lib/icons.jsx';

export const AdminIntegrations = () => {
  const { integrations, toggleIntegration } = useAdminStore();

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-teal-400" />
                <span>ABDM & Hospital Information System (HIS) Connectors</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated API endpoints for Ayushman Bharat Digital Mission (M2/M3) and EHR gateways
              </p>
            </div>
            <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-lg border border-teal-500/20">
              Mock Services Active
            </span>
          </div>

          <div className="space-y-4">
            {integrations.map((item) => {
              const isActive = item.status.includes('Active');
              return (
                <div
                  key={item.id}
                  className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white">{item.name}</h3>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-400">{item.endpoint}</p>
                    <p className="text-[11px] text-teal-300">Mode: {item.mode}</p>
                  </div>

                  <button
                    onClick={() => toggleIntegration(item.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                      isActive
                        ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        : 'bg-teal-500 text-slate-950 border-teal-400'
                    }`}
                  >
                    {isActive ? 'Pause Connector' : 'Activate Connector'}
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminIntegrations;
