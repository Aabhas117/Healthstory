import React from "react";
import { useNavigate } from "../lib/router.jsx";
import { usePatientStore } from "../store/usePatientStore.js";
import { useThemeStore } from "../store/useThemeStore.js";
import {
  Heart,
  Stethoscope,
  Settings,
  Shield,
  ChevronRight,
  Activity,
  ArrowRight,
  Lock,
} from "../lib/icons.jsx";

export const Home = () => {
  const navigate = useNavigate();
  const { resetSession } = usePatientStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleStartIntake = () => {
    resetSession();
    navigate("/patient/welcome");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-sky-600 selection:text-white">
      {/* Navigation Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-sm">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                AyuDrishti
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                Enterprise SaaS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              AI-Powered Clinical History &amp; Triage
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-2 text-xs font-semibold hover:border-slate-300 transition-colors"
          >
            {theme === "light" ? (
              <>
                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="hidden sm:inline">Dark Theme</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="hidden sm:inline">Light Theme</span>
              </>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <Shield className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>ABDM &amp; DPDP Compliant</span>
          </div>
        </div>
      </header>

      {/* Main Hub Content */}
      <main className="max-w-5xl mx-auto w-full my-auto py-10 space-y-10">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold mb-1">
            <Activity className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Clinical Information &amp; Intake Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            AyuDrishti
          </h1>

          <p className="text-lg sm:text-xl font-bold text-sky-700 dark:text-sky-400">
            AI-Powered Clinical History &amp; Triage
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Capture patient history through voice, touch, and medical documents — and provide physicians with a structured clinical brief before consultation.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleStartIntake}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Start Patient Intake</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/doctor/dashboard")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-sm hover:border-sky-500 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Stethoscope className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Open Clinical Workstation</span>
          </button>
        </div>

        {/* Portal Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Card 1: Patient Intake */}
          <div
            onClick={() => navigate("/patient/welcome")}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1.5">
                Patient Intake
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Multilingual guided intake capturing symptoms, past history, medications, consent, and uploaded medical records.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400">
              <span>Start Patient Intake</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Clinical Workstation */}
          <div
            onClick={() => navigate("/doctor/dashboard")}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform font-bold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1.5">
                Clinical Workstation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                High-density physician dashboard with real-time patient queue, AI clinical briefs, red flags, verification controls, and FHIR export.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
              <span>Open Clinical Workstation</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Administration & Security */}
          <div
            onClick={() => navigate("/admin")}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform font-bold">
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1.5">
                Administration &amp; Security
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Configure ABDM connectivity, HIS/FHIR integration gateways, AI guardrails, audit logging, and OPD throughput analytics.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Open Admin Panel</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="text-center text-xs text-slate-500 dark:text-slate-400 py-4 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto w-full gap-2">
        <p>AyuDrishti · Clinical history and triage for connected care teams</p>
        <div className="flex items-center gap-3 text-[11px]">
          <span>ABDM M2/M3 Standards</span>
          <span>•</span>
          <span>DPDP Act 2023 Compliant</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
