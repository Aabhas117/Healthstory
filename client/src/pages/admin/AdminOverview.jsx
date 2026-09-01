import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout.jsx';
import { useAdminStore } from '../../store/useAdminStore.js';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from '../../lib/recharts.jsx';
import { PageHeader } from '../../components/common/PageHeader.jsx';
import { Activity, Shield, Sparkles, User, AlertTriangle, CheckCircle } from '../../lib/icons.jsx';

export const AdminOverview = () => {
  const { metrics } = useAdminStore();

  const throughputData = [
    { time: '08:00', total: 12, redFlags: 2 },
    { time: '09:00', total: 28, redFlags: 4 },
    { time: '10:00', total: 42, redFlags: 7 },
    { time: '11:00', total: 35, redFlags: 3 },
    { time: '12:00', total: 25, redFlags: 2 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Page Header */}
        <PageHeader
          icon={Activity}
          title="System Metrics & Throughput"
          subtitle="Hospital OPD intake rate, triage red flag detection & ABDM compliance"
          badgeText="System Governance"
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Total Intakes Today
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {metrics.totalIntakesToday}
            </div>
            <span className="text-xs text-sky-600 dark:text-sky-400 mt-2 block font-semibold">
              +14% vs yesterday
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
              Red Flags Flagged
            </span>
            <div className="text-3xl font-black text-red-600 dark:text-red-400 font-mono">
              {metrics.redFlagsDetected}
            </div>
            <span className="text-xs text-red-600 dark:text-red-400 mt-2 block font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> High priority triage
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Avg Intake Duration
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {metrics.avgIntakeDurationMinutes}m
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block font-semibold">
              Kiosk intake speed
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              ABDM Consent Rate
            </span>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {metrics.abdmConsentSuccess}
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 block font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Fully compliant
            </span>
          </div>
        </div>

        {/* Throughput Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Hourly Patient Intake Throughput</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Registrations vs Urgent Red Flags Flagged</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-sky-600"></span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">Total Patients</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-600"></span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">Red Flags</span>
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
