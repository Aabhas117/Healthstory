import React from 'react';
import { Header } from '../components/common/Header.jsx';
import { Footer } from '../components/common/Footer.jsx';
import { useNavigate, useLocation } from '../lib/router.jsx';
import { Activity, Shield, Settings, Sparkles, FileText } from '../lib/icons.jsx';

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Overview', path: '/admin', icon: Activity },
    { label: 'Audit Logs', path: '/admin/audit', icon: Shield },
    { label: 'AI Models', path: '/admin/models', icon: Sparkles },
    { label: 'Integrations', path: '/admin/integrations', icon: Settings }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header />

      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-slate-100 leading-none">
              System Administration & AI Governance
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Platform metrics, ABDM audit logs, model thresholds & integrations
            </p>
          </div>

          <nav className="flex items-center gap-1 bg-slate-850 p-1 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-teal-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default AdminLayout;
