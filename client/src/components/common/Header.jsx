import React from 'react';
import { useNavigate, useLocation } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { Stethoscope, Shield, Settings, Heart, Globe, AlertCircle, Phone } from '../../lib/icons.jsx';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = usePatientStore();

  const isPatientPath = location.pathname.startsWith('/patient');
  const isDoctorPath = location.pathname.startsWith('/doctor');
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent">
                  AyuDrishti
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none hidden sm:block">
                AI-Powered Clinical History Platform
              </p>
            </div>
          </div>

          {/* Center Navigation Switcher */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-850 p-1.5 rounded-xl border border-slate-800/80">
            <button
              onClick={() => navigate('/patient/welcome')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isPatientPath
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Heart className="w-4 h-4" />
              Patient Kiosk
            </button>

            <button
              onClick={() => navigate('/doctor/dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isDoctorPath
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Doctor Portal
            </button>

            <button
              onClick={() => navigate('/admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isAdminPath
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              Admin
            </button>
          </nav>

          {/* Right Controls: Language Selector & Emergency Hotline */}
          <div className="flex items-center gap-3">
            
            {/* Language Toggle (Hindi / English) */}
            <div className="flex items-center bg-slate-800/80 rounded-xl p-1 border border-slate-700/60">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  language === 'hi'
                    ? 'bg-teal-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-teal-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Emergency Hotline Button */}
            <a
              href="tel:108"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all"
              title="Emergency Helpline 108"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>108 Emergency</span>
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};
