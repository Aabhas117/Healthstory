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
      className={`w-64 shrink-0 bg-[#EEF6F9] border-r border-[#DCEAF0] flex flex-col justify-between transition-all ${
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
          <div className="w-9 h-9 rounded-xl bg-[#20B8C8] flex items-center justify-center text-white font-bold shadow-xs">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-[#17324D] tracking-tight">
                AyuDrishti
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-white text-[#20B8C8] border border-[#DCEAF0]">
                CLINICAL
              </span>
            </div>
            <p className="text-[11px] text-[#536B7D] font-medium">
              Clinical History &amp; Triage
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-4">
          <div>
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-[#7A8D9D] block mb-2">
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
                          ? "bg-[#20B8C8] text-white shadow-xs font-bold"
                          : "text-[#17324D] hover:bg-white/80"
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
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-[#7A8D9D] block mb-2">
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
                          ? "bg-[#20B8C8] text-white shadow-xs font-bold"
                          : "text-[#17324D] hover:bg-white/80"
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
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-[#7A8D9D] block mb-2">
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
                          ? "bg-[#2499D6] text-white shadow-xs font-bold"
                          : "text-[#17324D] hover:bg-white/80"
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
        </nav>
      </div>

      {/* Hospital Footer Info */}
      <div className="p-4 border-t border-[#DCEAF0] text-xs space-y-2">
        <div className="bg-white p-3 rounded-xl border border-[#DCEAF0] shadow-xs">
          <span className="text-[10px] text-[#7A8D9D] block font-bold uppercase">
            Facility / OPD Unit
          </span>
          <strong className="text-[#17324D] font-bold text-xs">
            OPD Cardiology Unit A
          </strong>
          <p className="text-[11px] text-[#536B7D] mt-0.5">
            District Civil Hospital
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
