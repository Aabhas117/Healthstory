import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/patient/KioskButton.jsx';
import { ScannerAnimation } from '../../components/patient/ScannerAnimation.jsx';
import { TRANSLATIONS } from '../../data/translations.js';
import { api } from '../../services/api.js';
import { Upload, FileText, CheckCircle, ArrowRight, Sparkles, Shield } from '../../lib/icons.jsx';

export const DocumentsStep = () => {
  const navigate = useNavigate();
  const {
    language,
    uploadedDocuments,
    addDocument,
    isUploadingDoc,
    setIsUploadingDoc,
    setCurrentStep
  } = usePatientStore();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleFileUpload = async (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setIsUploadingDoc(true);

    const result = await api.patient.processDocument(file);
    setIsUploadingDoc(false);

    addDocument(result);
  };

  const handleNextStep = () => {
    setCurrentStep(7);
    navigate('/patient/review');
  };

  return (
    <PatientLayout currentStep={6}>
      <div className="flex-1 flex flex-col justify-between py-4 max-w-xl mx-auto w-full space-y-5">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-[#20B8C8]/10 text-[#20B8C8] border border-[#20B8C8]/20 mx-auto flex items-center justify-center mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D]">
            {t.documentUploadTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#536B7D] mt-1 font-medium">
            Upload old prescriptions or lab reports to auto-extract medications
          </p>
        </div>

        {/* Upload Zone or Scanner */}
        {isUploadingDoc ? (
          <ScannerAnimation isScanning={true} />
        ) : (
          <label className="border-2 border-dashed border-[#20B8C8]/40 hover:border-[#20B8C8] bg-white rounded-2xl p-6 text-center cursor-pointer block transition-all shadow-xs group">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-xl bg-[#F5FAFC] text-[#20B8C8] border border-[#DCEAF0] mx-auto flex items-center justify-center mb-2">
              <Upload className="w-6 h-6" />
            </div>
            <p className="font-extrabold text-base text-[#17324D] mb-0.5">
              {t.uploadPrompt}
            </p>
            <p className="text-xs text-[#536B7D]">
              Supports PDF, PNG, JPG (e.g. Previous Medical Records / Prescriptions)
            </p>
          </label>
        )}

        {/* Processed Documents List */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#536B7D] uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#20B8C8]" />
            <span>Extracted Medical Records ({uploadedDocuments.length})</span>
          </h3>

          {uploadedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-4 rounded-2xl border border-[#DCEAF0] space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#17324D]">{doc.name}</h4>
                    <p className="text-[11px] text-[#536B7D]">OCR Processed ✓ • 3 items extracted</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  Processed
                </span>
              </div>

              {/* Extracted Key Items */}
              {doc.extractedData && (
                <div className="bg-[#F5FAFC] p-2.5 rounded-xl border border-[#DCEAF0] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#536B7D]">Medication:</span>
                    <strong className="text-[#20B8C8]">{doc.extractedData.medications.join(', ')}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#536B7D]">Allergies:</span>
                    <strong className="text-red-600">{doc.extractedData.allergies.join(', ')}</strong>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div>
          <KioskButton
            onClick={handleNextStep}
            icon={ArrowRight}
            variant="primary"
            size="lg"
          >
            {language === 'hi' ? 'समीक्षा पर जाएं (Review)' : 'Proceed to Summary Review'}
          </KioskButton>
        </div>

      </div>
    </PatientLayout>
  );
};

export default DocumentsStep;
