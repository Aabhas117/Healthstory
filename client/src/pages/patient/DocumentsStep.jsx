import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton, ScannerAnimation } from '../../components/common/UIComponents.jsx';
import { TRANSLATIONS } from '../../data/translations.js';
import { api } from '../../services/api.js';
import { Upload, FileText, CheckCircle, ArrowRight, Sparkles, Shield, Trash2 } from '../../lib/icons.jsx';

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

    // Process via api.js
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
      <div className="flex-1 flex flex-col justify-between py-4 max-w-xl mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 mx-auto flex items-center justify-center mb-3">
            <Upload className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.documentUploadTitle}
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Upload old prescriptions or lab reports to auto-extract medications
          </p>
        </div>

        {/* Upload Zone & Scanner */}
        {isUploadingDoc ? (
          <ScannerAnimation isScanning={true} />
        ) : (
          <label className="border-2 border-dashed border-teal-500/40 hover:border-teal-400 bg-slate-900/80 rounded-3xl p-8 text-center cursor-pointer block transition-all hover:bg-slate-900 group kiosk-glow-teal">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <p className="font-extrabold text-lg text-white mb-1">
              {t.uploadPrompt}
            </p>
            <p className="text-xs text-slate-400">
              Supports PDF, PNG, JPG (e.g. Previous Prescription Cardiology)
            </p>
          </label>
        )}

        {/* Processed Documents List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-teal-400" />
            <span>Extracted Medical Artifacts ({uploadedDocuments.length})</span>
          </h3>

          {uploadedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{doc.name}</h4>
                    <p className="text-xs text-slate-400">OCR Extraction Complete</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Processed
                </span>
              </div>

              {/* Extracted Key Items */}
              {doc.extractedData && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 font-medium">Extracted Medication:</span>
                    <strong className="text-teal-300">{doc.extractedData.medications.join(', ')}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 font-medium">Documented Allergy:</span>
                    <strong className="text-rose-400">{doc.extractedData.allergies.join(', ')}</strong>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2">
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
