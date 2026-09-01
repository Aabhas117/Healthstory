import React from 'react';
import { useNavigate } from '../lib/router.jsx';
import { usePatientStore } from '../store/usePatientStore.js';
import { useThemeStore } from '../store/useThemeStore.js';
import { Heart, Stethoscope, Settings, Sparkles, User, Shield, ChevronRight, AlertTriangle, Activity } from '../lib/icons.jsx';

export const Home = () => {
  const navigate = useNavigate();
  const { loadDemoPreset } = usePatientStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleQuickDemo = () => {
    loadDemoPreset();
    navigate('/patient/identify');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-sky-600 selection:text-white">
      
      {/* Top Clinical Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-600/20">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                AyuDrishti
              </span>
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">AI-Powered Clinical History Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5 text-xs font-semibold"
          >
            {theme === 'light' ? '🌙 Dark Theme' : '☀️ Light Theme'}
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Shield className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>ABDM & DPDP Compliant</span>
          </div>
        </div>
      </header>

      {/* Main Hub Content */}
      <main className="max-w-4xl mx-auto w-full my-auto py-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold mb-1">
            <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Hospital Clinical Portals / पोर्टलों में से चुनें</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Clinical History & Triage System
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Multi-lingual voice intake, medical OCR scanner, and physician workstation for OPD triage.
          </p>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Patient Kiosk */}
          <div 
            onClick={() => navigate('/patient/welcome')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1">
                Patient Kiosk
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Mobile-first kiosk flow with voice recognition, touch symptoms, OCR document upload, and summary review.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400">
              <span>Launch Kiosk Flow</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Doctor Workstation */}
          <div 
            onClick={() => navigate('/doctor/dashboard')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform font-bold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1">
                Doctor Workstation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Clinical triage dashboard with red flag priority sorting, AI history summaries, OCR records, and approvals.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
              <span>Open Doctor Portal</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: System Admin */}
          <div 
            onClick={() => navigate('/admin')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform font-bold">
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1">
                System Governance
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Throughput analytics, ABDM security audit logs, LLM prompt guardrails, and HIS gateway settings.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Open Admin Panel</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Quick Launch Demo Banner */}
        <div className="bg-white dark:bg-slate-900 border-2 border-sky-600/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                SIH 2026 Demo Test: Rajesh Kumar (46, Male, Hindi)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Chest pain for 3 days + Breathlessness + Sweating → Potential Red Flag Alert
              </p>
            </div>
          </div>

          <button
            onClick={handleQuickDemo}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-sm transition-all shrink-0"
          >
            🚀 Launch Rajesh Kumar Demo Flow
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-200 dark:border-slate-900">
        <p>AyuDrishti Clinical History Platform • Hospital Management & Information System Redesign</p>
      </footer>

    </div>
  );
};

export default Home;
