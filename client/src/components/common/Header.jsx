import React from 'react';
import { useNavigate, useLocation } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { useThemeStore } from '../../store/useThemeStore.js';
import { Stethoscope, Heart, Settings, Globe, Phone, Search, User, Eye } from '../../lib/icons.jsx';

export const Header = ({ onToggleMobileSidebar = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = usePatientStore();
  const { theme, toggleTheme } = useThemeStore();

  const isPatientPath = location.pathname.startsWith('/patient');

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Mobile Sidebar Toggle & Mobile Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation Sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Platform Brand (Visible on mobile or patient flow) */}
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2.5 cursor-pointer md:hidden"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                AyuDrishti
              </span>
            </div>
          </div>

          {/* Clinical Workstation Search Bar (Visible on desktop) */}
          {!isPatientPath && (
            <div className="hidden md:flex items-center flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, encounter ID, diagnosis or ABHA..."
                onClick={() => navigate('/doctor/dashboard')}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle (Light <-> Dark) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-xs font-semibold"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
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

            {/* Language Toggle (Hindi / English) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'hi'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Doctor Profile Snippet */}
            {!isPatientPath && (
              <div 
                onClick={() => navigate('/doctor/dashboard')}
                className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs">
                  DR
                </div>
                <div className="text-left text-xs leading-none">
                  <strong className="text-slate-900 dark:text-white font-bold block">Dr. V. Sharma</strong>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Cardiology OPD</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
