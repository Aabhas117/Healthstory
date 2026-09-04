import React, { useState } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout.jsx';
import { useNavigate } from '../../lib/router.jsx';
import { usePatientStore } from '../../store/usePatientStore.js';
import { KioskButton } from '../../components/patient/KioskButton.jsx';
import { VoiceWaveAnimation } from '../../components/patient/VoiceWaveAnimation.jsx';
import { RedFlagBanner } from '../../components/patient/RedFlagBanner.jsx';
import { TRANSLATIONS } from '../../data/translations.js';
import { MOCK_QUESTIONS } from '../../data/mockQuestions.js';
import { api } from '../../services/api.js';
import { Mic, MicOff, Check, ArrowRight, Sparkles, MessageSquare, Volume2, AlertTriangle } from '../../lib/icons.jsx';

export const InterviewStep = () => {
  const navigate = useNavigate();
  const {
    language,
    symptoms,
    toggleSymptom,
    complaint,
    setComplaint,
    transcriptHistory,
    addTranscriptMessage,
    isRecording,
    setIsRecording,
    isProcessingAudio,
    setIsProcessingAudio,
    redFlagAlert,
    setCurrentStep
  } = usePatientStore();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Voice recording simulation
  const handleToggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessingAudio(true);

      const result = await api.patient.transcribeAudio(language);
      setIsProcessingAudio(false);

      addTranscriptMessage({
        sender: 'patient',
        text: result.transcript,
        textEn: result.translation
      });

      if (!symptoms.includes('Chest pain')) toggleSymptom('Chest pain');
      if (!symptoms.includes('Breathlessness')) toggleSymptom('Breathlessness');
      if (!symptoms.includes('Sweating')) toggleSymptom('Sweating');

      addTranscriptMessage({
        sender: 'ai',
        text: 'दर्ज किया गया: सीने में दर्द (3 दिन), सांस फूलना, और पसीना आना।',
        textEn: 'Recorded: Chest pain (3 days), Breathlessness, and Sweating.'
      });

    } else {
      setIsRecording(true);
    }
  };

  const handleSelectOption = (option, symptomKey) => {
    if (symptomKey) {
      toggleSymptom(symptomKey);
    }
    addTranscriptMessage({
      sender: 'patient',
      text: option,
      textEn: option
    });

    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleNextStep = () => {
    setCurrentStep(6);
    navigate('/patient/documents');
  };

  const currentQ = MOCK_QUESTIONS[currentQuestionIndex];

  return (
    <PatientLayout currentStep={5}>
      <div className="flex-1 flex flex-col justify-between py-4 max-w-xl mx-auto w-full space-y-5">
        
        {/* Urgent Red Flag Banner */}
        {redFlagAlert.isRedFlag && (
          <RedFlagBanner 
            title={redFlagAlert.title || "Potential red flag detected"}
            reason={redFlagAlert.description || "Chest pain + breathlessness + sweating"}
            action="Immediate physician assessment"
          />
        )}

        {/* Voice Assistant Module */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <VoiceWaveAnimation
            isRecording={isRecording}
            onToggle={handleToggleRecording}
          />

          {isProcessingAudio && (
            <div className="flex items-center justify-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-semibold mt-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Transcribing speech into clinical terms...</span>
            </div>
          )}
        </div>

        {/* Adaptive Question Card */}
        {currentQ && (
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Adaptive Question ({currentQuestionIndex + 1}/{MOCK_QUESTIONS.length})</span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              {language === 'hi' ? currentQ.questionHi : currentQ.questionEn}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {(language === 'hi' ? currentQ.optionsHi : currentQ.optionsEn).map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt, currentQ.symptomKey)}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left font-semibold text-xs text-slate-800 dark:text-slate-200 hover:border-sky-500 transition-all flex items-center justify-between kiosk-btn"
                >
                  <span>{opt}</span>
                  <Check className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Touch Symptom Selector Chips */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            {t.symptomsTitle}
          </h3>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'Chest pain', label: t.chestPain },
              { id: 'Breathlessness', label: t.breathlessness },
              { id: 'Sweating', label: t.sweating },
              { id: 'Fever', label: t.fever },
              { id: 'Cough', label: t.cough },
              { id: 'Headache', label: t.headache }
            ].map((sym) => {
              const isSelected = symptoms.includes(sym.id);
              return (
                <button
                  key={sym.id}
                  onClick={() => toggleSymptom(sym.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{sym.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Action Button */}
        <div>
          <KioskButton
            onClick={handleNextStep}
            icon={ArrowRight}
            variant="primary"
            size="lg"
          >
            {language === 'hi' ? 'दस्तावेज़ अपलोड पर जाएं' : 'Proceed to Document Upload'}
          </KioskButton>
        </div>

      </div>
    </PatientLayout>
  );
};

export default InterviewStep;
