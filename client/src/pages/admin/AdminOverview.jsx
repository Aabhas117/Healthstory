import React from "react";
import { AdminLayout } from "../../layouts/AdminLayout.jsx";
import { useAdminStore } from "../../store/useAdminStore.js";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "../../lib/recharts.jsx";
import { PageHeader } from "../../components/common/PageHeader.jsx";
import {
  Activity,
  Shield,
  Sparkles,
  User,
  AlertTriangle,
  CheckCircle,
  FileText,
  Check,
} from "../../lib/icons.jsx";

export const AdminOverview = () => {
  const { metrics } = useAdminStore();

  const throughputData = [
    { time: "08:00", total: 12, redFlags: 2 },
    { time: "09:00", total: 28, redFlags: 4 },
    { time: "10:00", total: 42, redFlags: 7 },
    { time: "11:00", total: 35, redFlags: 3 },
    { time: "12:00", total: 25, redFlags: 2 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader
          icon={Activity}
          title="System Administration & Metrics"
          subtitle="Hospital OPD intake throughput, AI field extraction performance, and audit compliance"
          badgeText="Administration & Security"
        />

        {/* 5 Admin KPI Metrics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-[#DCEAF0] shadow-xs">
            <span className="text-[10px] font-bold text-[#536B7D] uppercase tracking-wider block mb-1">
              Active Patients
            </span>
            <div className="text-2xl font-black text-[#17324D] font-mono">
              142
            </div>
            <span className="text-[10px] text-[#20B8C8] mt-1 block font-semibold">
              Today's registrations
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#DCEAF0] shadow-xs">
            <span className="text-[10px] font-bold text-[#536B7D] uppercase tracking-wider block mb-1">
              Documents Processed
            </span>
            <div className="text-2xl font-black text-[#17324D] font-mono">
              86
            </div>
            <span className="text-[10px] text-emerald-600 mt-1 block font-semibold">
              OCR prescriptions/labs
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#DCEAF0] shadow-xs">
            <span className="text-[10px] font-bold text-[#536B7D] uppercase tracking-wider block mb-1">
              AI Fields Generated
            </span>
            <div className="text-2xl font-black text-[#17324D] font-mono">
              568
            </div>
            <span className="text-[10px] text-[#20B8C8] mt-1 block font-semibold">
              Clinical entities extracted
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#DCEAF0] shadow-xs">
            <span className="text-[10px] font-bold text-[#536B7D] uppercase tracking-wider block mb-1">
              Doctor Corrections
            </span>
            <div className="text-2xl font-black text-amber-600 font-mono">
              14
            </div>
            <span className="text-[10px] text-amber-600 mt-1 block font-semibold">
              Edited by physicians
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-xs col-span-2 lg:col-span-1">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-1">
              Potential Red Flags
            </span>
            <div className="text-2xl font-black text-red-600 font-mono">
              18
            </div>
            <span className="text-[10px] text-red-600 mt-1 block font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> High priority triage
            </span>
          </div>
        </div>

        {/* Throughput Chart */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#17324D]">
                Hourly Patient Intake Throughput
              </h2>
              <p className="text-xs text-[#536B7D]">
                Total patient intake versus urgent review flags
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#20B8C8]"></span>
                <span className="text-[#17324D] font-semibold">
                  Total Patients
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-600"></span>
                <span className="text-[#17324D] font-semibold">
                  Red Flags
                </span>
              </div>
            </div>
          </div>

          <div className="h-64 pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={throughputData}>
                <XAxis dataKey="time" stroke="#536B7D" />
                <YAxis stroke="#536B7D" />
                <Tooltip />
                <Bar dataKey="total" fill="#20B8C8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="redFlags" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
