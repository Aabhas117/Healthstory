import React from "react";
import { PatientLayout } from "../../layouts/PatientLayout.jsx";
import { useNavigate } from "../../lib/router.jsx";
import { usePatientStore } from "../../store/usePatientStore.js";
import { KioskButton } from "../../components/patient/KioskButton.jsx";
import { TRANSLATIONS } from "../../data/translations.js";
import { User, ArrowRight, Shield, Phone } from "../../lib/icons.jsx";

export const IdentifyStep = () => {
  const navigate = useNavigate();
  const { language, patientInfo, updatePatientInfo, setCurrentStep } =
    usePatientStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleChange = (field, value) => {
    updatePatientInfo({ [field]: value });
  };

  const handleNext = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setCurrentStep(4);
    navigate("/patient/consent");
  };

  return (
    <PatientLayout currentStep={3}>
      <div className="flex-1 flex flex-col justify-between py-4 max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#20B8C8]/10 text-[#20B8C8] border border-[#20B8C8]/20 mx-auto flex items-center justify-center mb-3">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D]">
            {t.patientDetails}
          </h1>
          <p className="text-xs sm:text-sm text-[#536B7D] mt-1 font-medium">
            Enter your details to create a clinical intake record
          </p>
        </div>

        {/* Demographics Form */}
        <form
          onSubmit={handleNext}
          className="space-y-4 bg-white p-6 rounded-2xl border border-[#DCEAF0] shadow-xs"
        >
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#536B7D] uppercase tracking-wider mb-1">
              {t.fullName}
            </label>
            <input
              type="text"
              required
              value={patientInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#17324D] font-semibold text-base focus:outline-none focus:border-[#20B8C8]"
              placeholder="Enter full name"
            />
          </div>

          {/* Age & Gender Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#536B7D] uppercase tracking-wider mb-1">
                {t.age}
              </label>
              <input
                type="number"
                required
                min="1"
                max="120"
                value={patientInfo.age}
                onChange={(e) =>
                  handleChange("age", parseInt(e.target.value) || "")
                }
                className="w-full px-4 py-3 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#17324D] font-semibold text-base focus:outline-none focus:border-[#20B8C8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#536B7D] uppercase tracking-wider mb-1">
                {t.gender}
              </label>
              <select
                value={patientInfo.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#17324D] font-semibold text-base focus:outline-none focus:border-[#20B8C8]"
              >
                <option value="Male">{t.male}</option>
                <option value="Female">{t.female}</option>
                <option value="Other">{t.other}</option>
              </select>
            </div>
          </div>

          {/* Mobile & ABHA ID */}
          <div>
            <label className="block text-xs font-bold text-[#536B7D] uppercase tracking-wider mb-1">
              {t.mobile}
            </label>
            <input
              type="tel"
              required
              value={patientInfo.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#17324D] font-semibold text-base focus:outline-none focus:border-[#20B8C8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#536B7D] uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>ABHA ID (Ayushman Bharat Health Account)</span>
              <span className="text-[10px] text-[#20B8C8] font-normal">
                ABDM Linked
              </span>
            </label>
            <input
              type="text"
              value={patientInfo.abhaId}
              onChange={(e) => handleChange("abhaId", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#20B8C8] font-mono text-sm focus:outline-none focus:border-[#20B8C8]"
            />
          </div>

          <div className="pt-3">
            <KioskButton
              type="submit"
              icon={ArrowRight}
              variant="primary"
              size="lg"
            >
              {language === "hi" ? "सहमति पर जाएं" : "Proceed to Consent"}
            </KioskButton>
          </div>
        </form>
      </div>
    </PatientLayout>
  );
};

export default IdentifyStep;
