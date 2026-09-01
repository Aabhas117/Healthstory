import React from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { useDoctorStore } from '../../store/useDoctorStore.js';
import { Stethoscope, AlertTriangle, Search, Filter, Clock, ChevronRight, User, Shield, CheckCircle } from '../../lib/icons.jsx';

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

  const handleOpenPatient = (patientId) => {
    setSelectedPatientId(patientId);
    navigate(`/doctor/patient/${patientId}`);
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        
        {/* Top Controls: Search & Triage Filters */}
        <div className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name, token, symptom..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          {/* Red Flag Triage Filter Toggle */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterRedFlagsOnly(!filterRedFlagsOnly)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                filterRedFlagsOnly
                  ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-300" />
              <span>Red Flags Only ({patients.filter(p => p.aiSummary?.redFlagAlert).length})</span>
            </button>

            <span className="text-xs text-slate-400 font-semibold px-2">
              Total Queue: {filteredPatients.length}
            </span>
          </div>

        </div>

        {/* Triage Queue Patient List */}
        <div className="space-y-3">
          {filteredPatients.map((patient) => {
            const isRedFlag = patient.aiSummary?.redFlagAlert;

            return (
              <div
                key={patient.id}
                onClick={() => handleOpenPatient(patient.id)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg group hover:scale-[1.005] ${
                  isRedFlag
                    ? 'bg-rose-950/40 border-rose-500/60 hover:border-rose-400'
                    : 'bg-slate-900/90 border-slate-800 hover:border-teal-500/50'
                }`}
              >
                {/* Left: Patient Meta & Symptoms */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-extrabold text-lg ${
                    isRedFlag ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                  }`}>
                    {patient.tokenNumber || patient.id}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-lg text-white group-hover:text-teal-300 transition-colors">
                        {patient.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">
                        ({patient.age} yrs, {patient.gender})
                      </span>

                      {isRedFlag && (
                        <span className="bg-rose-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                          <AlertTriangle className="w-3 h-3" /> Potential Red Flag
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-slate-200">
                      Chief Concern: <span className="text-teal-300">{patient.complaint}</span>
                    </p>

                    {/* Symptom Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {patient.symptoms.map((s) => (
                        <span
                          key={s}
                          className={`text-xs px-2.5 py-0.5 rounded-md font-semibold ${
                            isRedFlag && (s.includes('Chest') || s.includes('Breath') || s.includes('Sweat'))
                              ? 'bg-rose-900/60 text-rose-200 border border-rose-700/60'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: AI Summary Snapshot & Action */}
                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                  <div className="text-left md:text-right text-xs">
                    <span className="text-slate-400 block">Status:</span>
                    <strong className={`font-bold ${isRedFlag ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {patient.status}
                    </strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Intake Time: {patient.createdTime || '10:30 AM'}
                    </span>
                  </div>

                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500/10 text-teal-300 border border-teal-500/30 group-hover:bg-teal-500 group-hover:text-slate-950 font-extrabold text-xs transition-all shadow">
                    <span>Review Case Sheet</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
