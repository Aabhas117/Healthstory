import React from "react";
import { AdminLayout } from "../../layouts/AdminLayout.jsx";
import { useAdminStore } from "../../store/useAdminStore.js";
import { PageHeader } from "../../components/common/PageHeader.jsx";
import { StatusBadge } from "../../components/common/StatusBadge.jsx";
import {
  Shield,
  Search,
  Lock,
  AlertTriangle,
  CheckCircle,
} from "../../lib/icons.jsx";

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

        <div className="bg-white rounded-2xl border border-[#DCEAF0] shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EEF6F9] flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#17324D]">
              Audit Events Log ({auditLogs.length})
            </h2>
            <span className="text-xs font-mono text-[#536B7D]">
              Encrypted Log Stream
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F5FAFC] border-b border-[#DCEAF0] text-[#536B7D] uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Audit ID</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Patient Record</th>
                  <th className="py-3 px-4">Source / Terminal</th>
                  <th className="py-3 px-4 text-center">Triage Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF6F9] font-medium text-[#17324D]">
                {auditLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-[#F5FAFC] transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#20B8C8]">
                      {log.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#536B7D]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#17324D]">
                      {log.action}
                    </td>
                    <td className="py-3.5 px-4">{log.patientId}</td>
                    <td className="py-3.5 px-4 text-[#536B7D]">
                      {log.kioskId}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge
                        status={log.redFlagFlagged ? "redflag" : "success"}
                        text={log.redFlagFlagged ? "ALERT" : "CLEARED"}
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
