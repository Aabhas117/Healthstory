import React from 'react';
import { useNavigate } from '../lib/router.jsx';
import { usePatientStore } from '../store/usePatientStore.js';
import { Heart, Stethoscope, Settings, Sparkles, User, Shield, ChevronRight, AlertTriangle } from '../lib/icons.jsx';

export const Home = () => {
  const navigate = useNavigate();
  const { loadDemoPreset } = usePatientStore();

  const handleQuickDemo = () => {
    loadDemoPreset();
    navigate('/patient/identify');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-white">
      
      {/* Top Brand Banner */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-xl shadow-teal-500/30">
            <Heart className="w-7 h-7 fill-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent">
                AyuDrishti
              </span>
              <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">AI-Powered Clinical History Platform</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <Shield className="w-4 h-4 text-teal-400" />
          <span>ABDM & DPDP Compliant</span>
        </div>
      </header>

      {/* Main Hub Content */}
      <main className="max-w-4xl mx-auto w-full my-auto py-8">
        
        {/* Welcome Callout */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Select System Portal / पोर्टलों में से चुनें</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            AI Clinical Intake & Triage Portal
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Multi-lingual voice assistant, medical document scanner, and doctor triage workflow for OPD registration.
          </p>
        </div>

        {/* Portal Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Patient Kiosk */}
          <div 
            onClick={() => navigate('/patient/welcome')}
            className="group bg-slate-900/90 hover:bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 hover:border-teal-400 transition-all cursor-pointer shadow-xl flex flex-col justify-between relative overflow-hidden kiosk-glow-teal"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold text-white group-hover:text-teal-300 transition-colors mb-1">
                Patient Kiosk
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mobile-first kiosk intake flow with voice recognition, touch symptoms, OCR document upload, and red flag alert review.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Patient Flow</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Doctor Portal */}
          <div 
            onClick={() => navigate('/doctor/dashboard')}
            className="group bg-slate-900/90 hover:bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 hover:border-teal-400 transition-all cursor-pointer shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold text-white group-hover:text-teal-300 transition-colors mb-1">
                Doctor Portal
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clinical triage dashboard with red flag priority sorting, AI intake summary sheets, OCR documents, and physician approvals.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>View Triage Queue</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Admin Console */}
          <div 
            onClick={() => navigate('/admin')}
            className="group bg-slate-900/90 hover:bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 hover:border-teal-400 transition-all cursor-pointer shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold text-white group-hover:text-teal-300 transition-colors mb-1">
                Admin & AI Rules
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                System throughput analytics, ABDM security audit logs, LLM guardrail settings, and HIS connectors.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>Open Admin Panel</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Quick Launch Demo Banner */}
        <div className="bg-slate-900 border-2 border-teal-500/40 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                SIH 2026 Test Scenario: Rajesh Kumar (46, Male, Hindi)
              </h3>
              <p className="text-xs text-slate-300">
                Chest pain for 3 days + Breathlessness + Sweating → Potential Red Flag Alert
              </p>
            </div>
          </div>

          <button
            onClick={handleQuickDemo}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg hover:brightness-110 transition-all shrink-0"
          >
            🚀 Launch Rajesh Kumar Demo Flow
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-900">
        <p>AyuDrishti Clinical History Platform • SIH 2026 Frontend Architecture</p>
      </footer>

    </div>
  );
};

export default Home;
