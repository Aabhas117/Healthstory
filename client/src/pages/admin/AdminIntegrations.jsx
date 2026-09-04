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

        <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] shadow-xs space-y-4">
          {allIntegrations.map((item) => {
            const isActive = item.status.includes("Active");
            return (
              <div
                key={item.id}
                className="bg-[#F5FAFC] p-4 rounded-xl border border-[#DCEAF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-[#17324D]">
                      {item.name}
                    </h3>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg border ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-[#EEF6F9] text-[#536B7D] border-[#DCEAF0]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#536B7D]">
                    {item.endpoint}
                  </p>
                  <p className="text-[11px] text-[#20B8C8] font-semibold">
                    Mode: {item.mode}
                  </p>
                </div>

                <button
                  onClick={() => alert(`Toggled ${item.name} status.`)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border shrink-0 ${
                    isActive
                      ? "bg-[#EEF6F9] text-[#17324D] border-[#DCEAF0] hover:bg-[#DCEAF0]"
                      : "bg-[#20B8C8] text-white border-[#20B8C8] hover:bg-[#1CA6B4]"
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
