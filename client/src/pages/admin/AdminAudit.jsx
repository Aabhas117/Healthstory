import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout.jsx';
import { useAdminStore } from '../../store/useAdminStore.js';
import { PageHeader } from '../../components/common/PageHeader.jsx';
import { StatusBadge } from '../../components/common/StatusBadge.jsx';
import { Shield, Search, Lock, AlertTriangle, CheckCircle } from '../../lib/icons.jsx';

export const AdminAudit = () => {
  const { auditLogs } = useAdminStore();

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        <PageHeader
          icon={Shield}
          title="ABDM Security & Clinical Audit Logs"
          subtitle="Immutable audit trail of patient intake consents, document processing, and physician approvals"
          badgeText="DPDP Act 2023 Compliant"
        />

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Audit Events Log ({auditLogs.length})</h2>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Encrypted Log Stream</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Audit ID</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Patient Record</th>
                  <th className="py-3 px-4">Kiosk / Terminal</th>
                  <th className="py-3 px-4 text-center">Triage Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-700 dark:text-sky-400">{log.id}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 dark:text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{log.action}</td>
                    <td className="py-3.5 px-4">{log.patientId}</td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{log.kioskId}</td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge 
                        status={log.redFlagFlagged ? 'redflag' : 'success'} 
                        text={log.redFlagFlagged ? 'ALERT' : 'CLEARED'}
                        size="sm"
                      />
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
