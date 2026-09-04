import React from "react";
import { useNavigate, useLocation } from "../../lib/router.jsx";
import {
  Stethoscope,
  Activity,
  User,
  Clock,
  FileText,
  Shield,
  Settings,
  Heart,
  ChevronRight,
  Sparkles,
} from "../../lib/icons.jsx";

export const Sidebar = ({
  isMobileOpen = false,
  setIsMobileOpen = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Patient Queue",
      path: "/doctor/dashboard",
      icon: Stethoscope,
      group: "Clinical",
    },
    {
      label: "Clinical Workstation",
      path: "/doctor/dashboard",
      icon: Clock,
      group: "Clinical",
    },
    {
      label: "System Health",
      path: "/admin",
      icon: Activity,
      group: "Administration",
    },
    {
      label: "Security & Audit",
      path: "/admin/audit",
      icon: Shield,
      group: "Administration",
    },
    {
      label: "AI Model Settings",
      path: "/admin/models",
      icon: Sparkles,
      group: "Administration",
    },
    {
      label: "Integrations",
      path: "/admin/integrations",
      icon: Settings,
      group: "Administration",
    },
    {
      label: "Start Patient Intake",
      path: "/patient/welcome",
      icon: Heart,
      group: "Patient",
    },
  ];

  const handleNav = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <aside
      className={`w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all ${
        isMobileOpen
          ? "block fixed inset-y-0 left-0 z-50 shadow-2xl"
          : "hidden md:flex"
      }`}
    >
      <div className="p-4 space-y-6">
        {/* Brand Header */}
        <div
          onClick={() => handleNav("/")}
          className="flex items-center gap-3 px-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-sm">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                AyuDrishti
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Clinical History &amp; Triage
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-4">
          <div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              Clinical Workstation
            </span>
            <div className="space-y-1">
              {navItems
                .filter((i) => i.group === "Clinical")
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNav(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-sky-600 text-white shadow-sm font-bold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
            </div>
          </div>

          <div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              Administration &amp; Security
            </span>
            <div className="space-y-1">
              {navItems
                .filter((i) => i.group === "Administration")
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNav(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-sky-600 text-white shadow-sm font-bold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
            </div>
          </div>

          <div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              Patient Intake
            </span>
            <div className="space-y-1">
              {navItems
                .filter((i) => i.group === "Patient")
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith("/patient");
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNav(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-teal-600 text-white shadow-sm font-bold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
            </div>
          </div>
        </nav>
      </div>

      {/* Hospital Footer Info */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs space-y-2">
        <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 block font-bold uppercase">
            Hospital Facility
          </span>
          <strong className="text-slate-900 dark:text-white font-bold text-xs">
            OPD Cardiology Unit A
          </strong>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            District Civil Hospital
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
