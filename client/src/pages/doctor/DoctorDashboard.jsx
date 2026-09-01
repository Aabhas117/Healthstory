import React from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { useDoctorStore } from '../../store/useDoctorStore.js';
import { EmptyState } from '../../components/common/EmptyState.jsx';
import { StatusBadge } from '../../components/common/StatusBadge.jsx';
import { PageHeader } from '../../components/common/PageHeader.jsx';
import { Stethoscope, AlertTriangle, Search, Filter, Clock, ChevronRight, User, Shield, CheckCircle, Activity } from '../../lib/icons.jsx';

export const DoctorDashboard = () => {
  const navigate = useNavigate();
  const {
    patients,
    filterRedFlagsOnly,
    setFilterRedFlagsOnly,
    searchQuery,
    setSearchQuery,
    setSelectedPatientId
  } = useDoctorStore();

  const filteredPatients = patients.filter((p) => {
    if (filterRedFlagsOnly && !p.aiSummary?.redFlagAlert) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(q);
      const tokenMatch = (p.tokenNumber || p.id).toLowerCase().includes(q);
      const complaintMatch = p.complaint.toLowerCase().includes(q);
      return nameMatch || tokenMatch || complaintMatch;
    }
    return true;
  });

  const redFlagCount = patients.filter(p => p.aiSummary?.redFlagAlert).length;

  const handleOpenPatient = (patientId) => {
    setSelectedPatientId(patientId);
    navigate(`/doctor/patient/${patientId}`);
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        
        {/* Page Header */}
        <PageHeader
          icon={Stethoscope}
          title="Clinical Triage Workstation"
          subtitle="Real-time patient queue, AI-synthesized history intakes & red flag clinical alerts"
          badgeText="OPD Cardiology"
          rightContent={
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Last synced: Just now</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          }
        />

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Active Queue
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {patients.length} <span className="text-xs text-slate-400 font-sans font-normal">patients</span>
            </div>
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold mt-1 block">
              Waiting for consultation
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm">
            <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
              Urgent Red Flags
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400 font-mono">
              {redFlagCount} <span className="text-xs text-red-500 font-sans font-normal">cases</span>
            </div>
            <span className="text-[11px] text-red-600 dark:text-red-400 font-semibold mt-1 block flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Immediate review required
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Avg Wait Duration
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              8m <span className="text-xs text-slate-400 font-sans font-normal">est.</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-1 block">
              Optimal triage speed
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              ABDM Consent Status
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              100% <span className="text-xs text-emerald-500 font-sans font-normal">verified</span>
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
              Digital records linked
            </span>
          </div>
        </div>

        {/* Search & Triage Controls */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, encounter ID, symptom..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Filter Toggles */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterRedFlagsOnly(!filterRedFlagsOnly)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                filterRedFlagsOnly
                  ? 'bg-red-600 text-white border-red-700 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Red Flags Only ({redFlagCount})</span>
            </button>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold px-1">
              Showing {filteredPatients.length} of {patients.length}
            </span>
          </div>

        </div>

        {/* Clinical Patient Queue Table / Cards */}
        {filteredPatients.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Matching Records"
            description="No patient in the active queue matches your current search criteria."
            actionLabel="Reset Search & Filters"
            onAction={() => { setSearchQuery(''); setFilterRedFlagsOnly(false); }}
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Triage Queue</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Sorted by Clinical Priority</span>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredPatients.map((patient) => {
                const isRedFlag = patient.aiSummary?.redFlagAlert;

                return (
                  <div
                    key={patient.id}
                    onClick={() => handleOpenPatient(patient.id)}
                    className={`p-4 sm:p-5 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-slate-50 dark:hover:bg-slate-850 ${
                      isRedFlag ? 'bg-red-50/40 dark:bg-red-950/20' : ''
                    }`}
                  >
                    {/* Left: Token & Patient Demographics */}
                    <div className="flex items-start gap-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm border ${
                        isRedFlag 
                          ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800' 
                          : 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800'
                      }`}>
                        {patient.tokenNumber || patient.id}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                            {patient.name}
                          </h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            ({patient.age} yrs, {patient.gender})
                          </span>

                          <StatusBadge 
                            status={isRedFlag ? 'redflag' : 'routine'}
                            text={isRedFlag ? 'Potential Red Flag' : 'Standard Priority'}
                            size="sm"
                          />
                        </div>

                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Chief Concern: <span className="text-sky-700 dark:text-sky-400 font-bold">{patient.complaint}</span>
                        </p>

                        {/* Symptoms Tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {patient.symptoms.map((s) => (
                            <span
                              key={s}
                              className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                                isRedFlag && (s.includes('Chest') || s.includes('Breath') || s.includes('Sweat'))
                                  ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Meta & Action */}
                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-200 dark:border-slate-800 pt-3 md:pt-0">
                      <div className="text-left md:text-right text-xs">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Encounter Status</span>
                        <strong className={`font-bold ${isRedFlag ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {patient.status}
                        </strong>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-mono">
                          Arrival: {patient.createdTime || '10:30 AM'}
                        </span>
                      </div>

                      <button className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition-all shadow-sm">
                        <span>Review Record</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
