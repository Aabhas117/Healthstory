import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout.jsx';
import { useAdminStore } from '../../store/useAdminStore.js';
import { Shield, Search, Lock, AlertTriangle, CheckCircle } from '../../lib/icons.jsx';

export const AdminAudit = () => {
  const { auditLogs } = useAdminStore();

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-400" />
                <span>ABDM Security & Clinical Audit Logs</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Immutable audit trail of patient intake consents, document processing, and doctor reviews
              </p>
            </div>
            <span className="text-xs font-mono bg-teal-500/10 text-teal-300 px-3 py-1 rounded-lg border border-teal-500/20">
              DPDP Act 2023 Compliant
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Audit ID</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Patient ID</th>
                  <th className="py-3 px-4">Kiosk / Terminal</th>
                  <th className="py-3 px-4 text-center">Red Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-850 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-teal-300">{log.id}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-white font-semibold">{log.action}</td>
                    <td className="py-3.5 px-4">{log.patientId}</td>
                    <td className="py-3.5 px-4 text-slate-400">{log.kioskId}</td>
                    <td className="py-3.5 px-4 text-center">
                      {log.redFlagFlagged ? (
                        <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          ALERT
                        </span>
                      ) : (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          CLEARED
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminAudit;
