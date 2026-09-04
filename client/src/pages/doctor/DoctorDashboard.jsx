import React, { useState } from "react";
import { DoctorLayout } from "../../layouts/DoctorLayout.jsx";
import { useNavigate } from "../../lib/router.jsx";
import { useDoctorStore } from "../../store/useDoctorStore.js";
import { EmptyState } from "../../components/common/EmptyState.jsx";
import { StatusBadge } from "../../components/common/StatusBadge.jsx";
import { PageHeader } from "../../components/common/PageHeader.jsx";
import {
  Stethoscope,
  AlertTriangle,
  Search,
  Filter,
  Clock,
  ChevronRight,
  User,
  Shield,
  CheckCircle,
  Activity,
  Eye,
} from "../../lib/icons.jsx";

export const DoctorDashboard = () => {
  const navigate = useNavigate();
  const {
    patients,
    filterRedFlagsOnly,
    setFilterRedFlagsOnly,
    searchQuery,
    setSearchQuery,
    setSelectedPatientId,
  } = useDoctorStore();

  const [priorityFilter, setPriorityFilter] = useState("ALL"); // ALL | HIGH | MEDIUM | LOW
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | Waiting | In Consultation | Completed

  const filteredPatients = patients.filter((p) => {
    if (filterRedFlagsOnly && !p.aiSummary?.redFlagAlert) return false;

    if (
      priorityFilter !== "ALL" &&
      (p.priority || "MEDIUM").toUpperCase() !== priorityFilter
    ) {
      return false;
    }

    if (
      statusFilter !== "ALL" &&
      (p.status || "").toLowerCase() !== statusFilter.toLowerCase()
    ) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(q);
      const tokenMatch = (p.tokenNumber || p.id).toLowerCase().includes(q);
      const complaintMatch = p.complaint.toLowerCase().includes(q);
      return nameMatch || tokenMatch || complaintMatch;
    }
    return true;
  });

  const redFlagCount = patients.filter((p) => p.aiSummary?.redFlagAlert).length;
  const waitingCount = patients.filter((p) =>
    (p.status || "").includes("Waiting"),
  ).length;
  const pendingCount = patients.filter((p) =>
    (p.status || "").includes("Review"),
  ).length;

  const handleOpenPatient = (patientId) => {
    setSelectedPatientId(patientId);
    navigate(`/doctor/patient/${patientId}`);
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Welcome Doctor Banner */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Clinical Workstation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
            Active OPD patient triage queue, red flag alerts, and clinical summary verifications.
          </p>
        </div>

        {/* 4 Clean KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
              12
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mt-1">
              Waiting Patients
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-amber-200 dark:border-amber-950 shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 font-mono">
              4
            </div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mt-1">
              Pending Reviews
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-red-200 dark:border-red-950 shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-red-600 dark:text-red-400 font-mono">
              2
            </div>
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Potential Red Flags
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-emerald-200 dark:border-emerald-950 shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              8
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mt-1">
              Completed
            </span>
          </div>
        </div>

        {/* Patient queue header and controls */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Patient Queue
            </h2>

            {/* Red Flag Quick Filter Button */}
            <button
              onClick={() => setFilterRedFlagsOnly(!filterRedFlagsOnly)}
              className={`flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                filterRedFlagsOnly
                  ? "bg-red-600 text-white border-red-700 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Red Flags Only ({redFlagCount})</span>
            </button>
          </div>

          {/* Search & Select Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient name or chief complaint..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Priority Filter Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">
                Priority:
              </span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-semibold"
              >
                <option value="ALL">All Priorities</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>

            {/* Status Filter Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-semibold"
              >
                <option value="ALL">All Statuses</option>
                <option value="Waiting">Waiting</option>
                <option value="In Consultation">In Consultation</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Patient Queue Content (Table on Desktop, Cards on Mobile) */}
        {filteredPatients.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Matching Patients"
            description="No patient record matches your current search or filter criteria."
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setSearchQuery("");
              setPriorityFilter("ALL");
              setStatusFilter("ALL");
              setFilterRedFlagsOnly(false);
            }}
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                    <th className="py-3.5 px-4">Patient</th>
                    <th className="py-3.5 px-3">Age</th>
                    <th className="py-3.5 px-4">Chief Complaint</th>
                    <th className="py-3.5 px-3">Wait Time</th>
                    <th className="py-3.5 px-3">Priority</th>
                    <th className="py-3.5 px-3">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
                  {filteredPatients.map((patient) => {
                    const isRedFlag = patient.aiSummary?.redFlagAlert;

                    return (
                      <tr
                        key={patient.id}
                        onClick={() => handleOpenPatient(patient.id)}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer ${
                          isRedFlag ? "bg-red-50/40 dark:bg-red-950/20" : ""
                        }`}
                      >
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            <span>{patient.name}</span>
                            {isRedFlag && (
                              <span className="w-2 h-2 rounded-full bg-red-600 shrink-0"></span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block font-normal">
                            {patient.tokenNumber || patient.id}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 font-semibold">
                          {patient.age} ({patient.gender.slice(0, 1)})
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-sky-700 dark:text-sky-400 max-w-xs truncate">
                          {patient.complaint}
                        </td>

                        <td className="py-3.5 px-3 font-mono text-slate-500">
                          {patient.waitTime || "10 min"}
                        </td>

                        <td className="py-3.5 px-3">
                          <StatusBadge
                            status={
                              patient.priority === "HIGH"
                                ? "redflag"
                                : patient.priority === "MEDIUM"
                                  ? "warning"
                                  : "routine"
                            }
                            text={patient.priority || "MEDIUM"}
                            size="sm"
                          />
                        </td>

                        <td className="py-3.5 px-3">
                          <StatusBadge
                            status={
                              (patient.status || "").includes("Consultation")
                                ? "info"
                                : (patient.status || "").includes("Review")
                                  ? "warning"
                                  : "success"
                            }
                            text={patient.status}
                            size="sm"
                          />
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPatient(patient.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 shadow-xs inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Fallback */}
            <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-800">
              {filteredPatients.map((patient) => {
                const isRedFlag = patient.aiSummary?.redFlagAlert;

                return (
                  <div
                    key={patient.id}
                    onClick={() => handleOpenPatient(patient.id)}
                    className="p-4 space-y-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {patient.name}
                        </h3>
                        <span className="text-xs text-slate-500 font-mono">
                          {patient.age} yrs •{" "}
                          {patient.tokenNumber || patient.id}
                        </span>
                      </div>
                      <StatusBadge
                        status={
                          patient.priority === "HIGH" ? "redflag" : "warning"
                        }
                        text={patient.priority || "MEDIUM"}
                        size="sm"
                      />
                    </div>

                    <p className="text-xs font-semibold text-sky-700 dark:text-sky-400">
                      Chief Concern: {patient.complaint}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500 font-mono">
                        Wait: {patient.waitTime || "10 min"}
                      </span>
                      <button className="px-3 py-1 rounded-lg bg-sky-600 text-white font-bold text-xs">
                        View Record
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
