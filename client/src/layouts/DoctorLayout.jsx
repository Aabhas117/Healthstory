import React from 'react';
import { Header } from '../components/common/Header.jsx';
import { Footer } from '../components/common/Footer.jsx';
import { useNavigate, useLocation } from '../lib/router.jsx';
import { Stethoscope, User, AlertTriangle, Activity, Search, Filter } from '../lib/icons.jsx';

export const DoctorLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header />

      {/* Doctor Dashboard Subheader */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-100 leading-none">
                Clinical Triage Portal
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                AI-synthesized patient histories requiring clinical review
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/doctor/dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                location.pathname === '/doctor/dashboard'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              Patient Queue
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default DoctorLayout;
