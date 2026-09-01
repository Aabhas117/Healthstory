import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout.jsx';
import { useAdminStore } from '../../store/useAdminStore.js';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from '../../lib/recharts.jsx';
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
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Total Intakes Today
            </span>
            <div className="text-3xl font-black text-white font-mono">
              {metrics.totalIntakesToday}
            </div>
            <span className="text-[11px] text-teal-400 mt-2 block font-semibold">
              +14% vs yesterday
            </span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-rose-500/30 shadow-lg">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
              Red Flags Detected
            </span>
            <div className="text-3xl font-black text-rose-300 font-mono">
              {metrics.redFlagsDetected}
            </div>
            <span className="text-[11px] text-rose-400 mt-2 block font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> High priority triage
            </span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Avg Intake Duration
            </span>
            <div className="text-3xl font-black text-white font-mono">
              {metrics.avgIntakeDurationMinutes}m
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block font-semibold">
              Mobile kiosk speed
            </span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-emerald-500/30 shadow-lg">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              ABDM Consent Rate
            </span>
            <div className="text-3xl font-black text-emerald-300 font-mono">
              {metrics.abdmConsentSuccess}
            </div>
            <span className="text-[11px] text-emerald-400 mt-2 block font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Fully compliant
            </span>
          </div>
        </div>

        {/* Throughput Chart */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Hourly Patient Intake Throughput</h2>
              <p className="text-xs text-slate-400">Total Kiosk Registrations vs Potential Red Flags Flagged</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-teal-500"></span>
                <span className="text-slate-300">Total Patients</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-500"></span>
                <span className="text-slate-300">Red Flags</span>
              </div>
            </div>
          </div>

          <div className="h-64 pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={throughputData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#14b8a6" />
                <Bar dataKey="redFlags" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
