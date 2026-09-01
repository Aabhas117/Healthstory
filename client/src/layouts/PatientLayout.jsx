import React from 'react';
import { Header } from '../components/common/Header.jsx';
import { Footer } from '../components/common/Footer.jsx';
import { ProgressBar } from '../components/common/ProgressBar.jsx';

export const PatientLayout = ({ children, currentStep = 1 }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white">
      {/* Header Navigation */}
      <Header />

      {/* Progress Step Indicator Bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Main Kiosk Step Content Container (Mobile-First & Touch Optimized) */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-8 flex flex-col">
        {children}
      </main>

      {/* Footer Disclaimer */}
      <Footer />
    </div>
  );
};

export default PatientLayout;
