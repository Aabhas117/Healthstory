import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/patient/KioskButton.jsx';
import { TRANSLATIONS } from '../../data/translations.js';
import { User, ArrowRight, Shield, Phone, Sparkles } from '../../lib/icons.jsx';

export const IdentifyStep = () => {
  const navigate = useNavigate();
  const { language, patientInfo, updatePatientInfo, setCurrentStep, loadDemoPreset } = usePatientStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleChange = (field, value) => {
    updatePatientInfo({ [field]: value });
  };

  const handleNext = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setCurrentStep(4);
    navigate('/patient/consent');
  };

  return (
    <PatientLayout currentStep={3}>
      <div className="flex-1 flex flex-col justify-between py-4 max-w-lg mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mx-auto flex items-center justify-center mb-3">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.patientDetails}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
            Enter your registration details or verify demo profile
          </p>
        </div>

        {/* Demo Preset Loaded Pill */}
        <div className="bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 p-3 rounded-xl mb-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Active Demo Scenario: <strong className="text-sky-700 dark:text-sky-300 font-bold">Rajesh Kumar (46, Male)</strong>
            </span>
          </div>
          <button
            onClick={loadDemoPreset}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline px-2.5 py-1 bg-sky-50 dark:bg-sky-950 rounded border border-sky-200 dark:border-sky-800"
          >
            Reset Demo
          </button>
        </div>

        {/* Demographics Form */}
        <form onSubmit={handleNext} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t.fullName}
            </label>
            <input
              type="text"
              required
              value={patientInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-base focus:outline-none focus:border-sky-500"
              placeholder="e.g. Rajesh Kumar"
            />
          </div>

          {/* Age & Gender Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                {t.age}
              </label>
              <input
                type="number"
                required
                min="1"
                max="120"
                value={patientInfo.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-base focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                {t.gender}
              </label>
              <select
                value={patientInfo.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-base focus:outline-none focus:border-sky-500"
              >
                <option value="Male">{t.male}</option>
                <option value="Female">{t.female}</option>
                <option value="Other">{t.other}</option>
              </select>
            </div>
          </div>

          {/* Mobile & ABHA ID */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t.mobile}
            </label>
            <input
              type="tel"
              required
              value={patientInfo.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-base focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>ABHA ID (Ayushman Bharat Health Account)</span>
              <span className="text-[10px] text-sky-600 dark:text-sky-400 font-normal">ABDM Linked</span>
            </label>
            <input
              type="text"
              value={patientInfo.abhaId}
              onChange={(e) => handleChange('abhaId', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sky-700 dark:text-sky-300 font-mono text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="pt-3">
            <KioskButton type="submit" icon={ArrowRight} variant="primary" size="lg">
              {language === 'hi' ? 'सहमति पर जाएं' : 'Proceed to Consent'}
            </KioskButton>
          </div>

        </form>

      </div>
    </PatientLayout>
  );
};

export default IdentifyStep;
