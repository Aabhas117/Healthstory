import React from "react";
import { AdminLayout } from "../../layouts/AdminLayout.jsx";
import { useAdminStore } from "../../store/useAdminStore.js";
import { PageHeader } from "../../components/common/PageHeader.jsx";
import {
  Settings,
  Shield,
  Activity,
  RefreshCw,
  CheckCircle,
} from "../../lib/icons.jsx";

export const AdminIntegrations = () => {
  const { integrations, toggleIntegration } = useAdminStore();

  const allIntegrations = [
    {
      id: "int-1",
      name: "Ayushman Bharat Digital Mission (ABDM M2/M3)",
      status: "Active (Connected)",
      endpoint:
        "https://api.abdm.gov.in/v0.5/health-information/hiu/on-request",
      mode: "Connected",
    },
    {
      id: "int-2",
      name: "Hospital Information System (HIS Gateway)",
      status: "Active (Connected)",
      endpoint: "https://his.hospital.org/api/v1/triage-feed",
      mode: "Connected",
    },
    {
      id: "int-3",
      name: "EHR / EMR Record Sync Engine",
      status: "Active (Connected)",
      endpoint: "https://emr.hospital.org/fhir/r4/Patient",
      mode: "Connected",
    },
    {
      id: "int-4",
      name: "Central Pathology Laboratory System",
      status: "Active (Connected)",
      endpoint: "https://lab.hospital.org/api/v2/reports",
      mode: "Connected",
    },
    {
      id: "int-5",
      name: "OPD Pharmacy Inventory & Dispense Gateway",
      status: "Inactive (Standby)",
      endpoint: "https://pharmacy.hospital.org/v1/dispense",
      mode: "Standby",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <PageHeader
          icon={Settings}
          title="Integrations & Connectivity"
          subtitle="Monitor ABDM, HIS, EHR, laboratory, and pharmacy connections"
          badgeText="System Status"
        />

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          {allIntegrations.map((item) => {
            const isActive = item.status.includes("Active");
            return (
              <div
                key={item.id}
                className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {item.name}
                    </h3>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {item.endpoint}
                  </p>
                  <p className="text-[11px] text-sky-700 dark:text-sky-400 font-semibold">
                    Mode: {item.mode}
                  </p>
                </div>

                <button
                  onClick={() => alert(`Toggled ${item.name} status.`)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border shrink-0 ${
                    isActive
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-300"
                      : "bg-sky-600 text-white border-sky-500 hover:bg-sky-700"
                  }`}
                >
                  {isActive ? "Pause Gateway" : "Activate Gateway"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminIntegrations;
