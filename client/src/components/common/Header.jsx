import React from "react";
import { useNavigate, useLocation } from "../../lib/router.jsx";
import { usePatientStore } from "../../store/usePatientStore.js";
import { useThemeStore } from "../../store/useThemeStore.js";
import {
  Heart,
  Search,
  User,
  Globe,
  Bell,
  Shield
} from "../../lib/icons.jsx";

export const Header = ({ onToggleMobileSidebar = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = usePatientStore();
  const { theme, toggleTheme } = useThemeStore();

  const isPatientPath = location.pathname.startsWith("/patient");

  const navLinks = [
    { label: "Patient Intake", path: "/patient/welcome" },
    { label: "Clinical Workstation", path: "/doctor/dashboard" },
    { label: "Administration", path: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DCEAF0] text-[#17324D] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Navigation Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-lg text-[#536B7D] hover:bg-[#F5FAFC]"
              aria-label="Toggle Navigation Sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Platform Brand Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#20B8C8] flex items-center justify-center text-white font-bold shadow-xs">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-[#17324D] tracking-tight leading-none">
                  AyuDrishti
                </span>
                <span className="text-[10px] font-semibold text-[#536B7D] mt-0.5">
                  Clinical History &amp; Triage
                </span>
              </div>
            </div>

            {/* Desktop Top Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 pl-4 border-l border-[#DCEAF0]">
              {navLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#E6F7F9] text-[#20B8C8]"
                        : "text-[#536B7D] hover:text-[#17324D] hover:bg-[#F5FAFC]"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Search Bar (Visible on desktop clinical view) */}
          {!isPatientPath && (
            <div className="hidden md:flex items-center flex-1 max-w-xs relative">
              <Search className="w-4 h-4 text-[#7A8D9D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, ABHA or encounter ID..."
                onClick={() => navigate("/doctor/dashboard")}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-xs text-[#17324D] placeholder-[#7A8D9D] focus:outline-none focus:border-[#20B8C8]"
              />
            </div>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle (Hindi / English) */}
            <div className="flex items-center bg-[#F5FAFC] rounded-xl p-1 border border-[#DCEAF0]">
              <button
                onClick={() => setLanguage("hi")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === "hi"
                    ? "bg-[#20B8C8] text-white shadow-xs"
                    : "text-[#536B7D] hover:text-[#17324D]"
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === "en"
                    ? "bg-[#20B8C8] text-white shadow-xs"
                    : "text-[#536B7D] hover:text-[#17324D]"
                }`}
              >
                EN
              </button>
            </div>

            {/* Doctor Profile Snippet */}
            {!isPatientPath && (
              <div
                onClick={() => navigate("/doctor/dashboard")}
                className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#DCEAF0] cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#E6F7F9] border border-[#20B8C8]/30 text-[#20B8C8] flex items-center justify-center font-bold text-xs">
                  DR
                </div>
                <div className="text-left text-xs leading-none">
                  <strong className="text-[#17324D] font-bold block">
                    Dr. V. Sharma
                  </strong>
                  <span className="text-[10px] text-[#536B7D]">
                    Cardiology OPD
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
