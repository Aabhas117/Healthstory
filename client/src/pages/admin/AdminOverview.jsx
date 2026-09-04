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
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Active Patients
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              142
            </div>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 mt-1 block font-semibold">
              Today's registrations
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Documents Processed
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              86
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 block font-semibold">
              OCR prescriptions/labs
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              AI Fields Generated
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              568
            </div>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 mt-1 block font-semibold">
              Clinical entities extracted
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Doctor Corrections
            </span>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
              14
            </div>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 block font-semibold">
              Edited by physicians
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-red-200 dark:border-red-950 shadow-sm col-span-2 lg:col-span-1">
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
              Potential Red Flags
            </span>
            <div className="text-2xl font-black text-red-600 dark:text-red-400 font-mono">
              18
            </div>
            <span className="text-[10px] text-red-600 dark:text-red-400 mt-1 block font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> High priority triage
            </span>
          </div>
        </div>

        {/* Throughput Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Hourly Patient Intake Throughput
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total patient intake versus urgent review flags
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-sky-600"></span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">
                  Total Patients
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-600"></span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">
                  Red Flags
                </span>
              </div>
            </div>
          </div>

          <div className="h-64 pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={throughputData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#0284c7" />
                <Bar dataKey="redFlags" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
