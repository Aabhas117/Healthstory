import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/common/UIComponents.jsx';
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
      <div className="flex-1 flex flex-col justify-between py-4 max-w-xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 mx-auto flex items-center justify-center mb-3">
            <User className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.patientDetails}
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Enter your registration details or verify the demo profile below
          </p>
        </div>

        {/* Demo Quick Load Banner */}
        <div className="bg-slate-900 border border-teal-500/30 p-3 rounded-xl mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="text-xs font-semibold text-teal-300">
              Demo Preset Loaded: <strong className="text-white">Rajesh Kumar (46, Male)</strong>
            </span>
          </div>
          <button
            onClick={loadDemoPreset}
            className="text-xs font-bold text-teal-400 hover:underline px-2 py-1 bg-teal-500/10 rounded border border-teal-500/30"
          >
            Reset Demo
          </button>
        </div>

        {/* Demographics Form */}
        <form onSubmit={handleNext} className="space-y-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {t.fullName}
            </label>
            <input
              type="text"
              required
              value={patientInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              placeholder="e.g. Rajesh Kumar"
            />
          </div>

          {/* Age & Gender Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                {t.age}
              </label>
              <input
                type="number"
                required
                min="1"
                max="120"
                value={patientInfo.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                {t.gender}
              </label>
              <select
                value={patientInfo.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="Male">{t.male}</option>
                <option value="Female">{t.female}</option>
                <option value="Other">{t.other}</option>
              </select>
            </div>
          </div>

          {/* Mobile & ABHA ID */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {t.mobile}
            </label>
            <input
              type="tel"
              required
              value={patientInfo.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>ABHA ID (Ayushman Bharat Health Account)</span>
              <span className="text-[10px] text-teal-400 font-normal">ABDM Linked</span>
            </label>
            <input
              type="text"
              value={patientInfo.abhaId}
              onChange={(e) => handleChange('abhaId', e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-teal-300 font-mono text-base focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="pt-4">
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
