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
          <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mx-auto flex items-center justify-center mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.documentUploadTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
            Upload old prescriptions or lab reports to auto-extract medications
          </p>
        </div>

        {/* Upload Zone or Scanner */}
        {isUploadingDoc ? (
          <ScannerAnimation isScanning={true} />
        ) : (
          <label className="border-2 border-dashed border-sky-300 dark:border-sky-800 hover:border-sky-500 bg-white dark:bg-slate-900 rounded-xl p-6 text-center cursor-pointer block transition-all shadow-sm group">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 mx-auto flex items-center justify-center mb-2">
              <Upload className="w-6 h-6" />
            </div>
            <p className="font-extrabold text-base text-slate-900 dark:text-white mb-0.5">
              {t.uploadPrompt}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Supports PDF, PNG, JPG (e.g. Previous Prescription Cardiology)
            </p>
          </label>
        )}

        {/* Processed Documents List */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Extracted Medical Records ({uploadedDocuments.length})</span>
          </h3>

          {uploadedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{doc.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">OCR Extraction Complete</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  Processed
                </span>
              </div>

              {/* Extracted Key Items */}
              {doc.extractedData && (
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Medication:</span>
                    <strong className="text-sky-700 dark:text-sky-400">{doc.extractedData.medications.join(', ')}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Allergies:</span>
                    <strong className="text-red-600 dark:text-red-400">{doc.extractedData.allergies.join(', ')}</strong>
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
