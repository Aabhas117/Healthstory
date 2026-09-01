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
  const [customInput, setCustomInput] = useState('');

  // Voice recording simulation
  const handleToggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessingAudio(true);

      // Simulate Speech-to-Text transcript arrival via api.js
      const result = await api.patient.transcribeAudio(language);
      setIsProcessingAudio(false);

      addTranscriptMessage({
        sender: 'patient',
        text: result.transcript,
        textEn: result.translation
      });

      // Ensure demo symptoms are present
      if (!symptoms.includes('Chest pain')) toggleSymptom('Chest pain');
      if (!symptoms.includes('Breathlessness')) toggleSymptom('Breathlessness');
      if (!symptoms.includes('Sweating')) toggleSymptom('Sweating');

      addTranscriptMessage({
        sender: 'ai',
        text: 'मैंने दर्ज कर लिया है: सीने में दर्द (3 दिन), सांस फूलना, और पसीना आना।',
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

  const handleSendCustomInput = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!customInput.trim()) return;

    addTranscriptMessage({
      sender: 'patient',
      text: customInput,
      textEn: customInput
    });
    setComplaint(customInput);
    setCustomInput('');
  };

  const handleNextStep = () => {
    setCurrentStep(6);
    navigate('/patient/documents');
  };

  const currentQ = MOCK_QUESTIONS[currentQuestionIndex];

  return (
    <PatientLayout currentStep={5}>
      <div className="flex-1 flex flex-col justify-between py-4 max-w-2xl mx-auto w-full space-y-6">
        
        {/* Real-time Red Flag Banner if Symptoms Match */}
        {redFlagAlert.isRedFlag && (
          <RedFlagBanner 
            title={redFlagAlert.title}
            description={redFlagAlert.description}
          />
        )}

        {/* Voice Recording Assistant Module */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl text-center">
          <VoiceWaveAnimation
            isRecording={isRecording}
            onToggle={handleToggleRecording}
          />

          {isProcessingAudio && (
            <div className="flex items-center justify-center gap-2 text-teal-400 text-sm font-semibold animate-pulse mt-2">
              <Sparkles className="w-4 h-4" />
              <span>Transcribing speech into clinical terms...</span>
            </div>
          )}
        </div>

        {/* Adaptive Question Prompt */}
        {currentQ && (
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Adaptive Question ({currentQuestionIndex + 1}/{MOCK_QUESTIONS.length})</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              {language === 'hi' ? currentQ.questionHi : currentQ.questionEn}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {(language === 'hi' ? currentQ.optionsHi : currentQ.optionsEn).map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt, currentQ.symptomKey)}
                  className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-left font-semibold text-sm text-slate-200 hover:border-teal-400 transition-all flex items-center justify-between kiosk-btn"
                >
                  <span>{opt}</span>
                  <Check className="w-4 h-4 text-teal-400 opacity-50" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Touch Symptom Selector Chips */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <span>{t.symptomsTitle}</span>
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
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-300/40'
                      : 'bg-slate-950 text-slate-300 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  <span>{sym.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Transcript Log */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 max-h-48 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
            <span>Intake Transcript Log</span>
          </div>
          {transcriptHistory.map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl text-xs ${
                item.sender === 'ai'
                  ? 'bg-slate-900 text-teal-300 border border-slate-800'
                  : 'bg-teal-500/10 text-white border border-teal-500/20 ml-4'
              }`}
            >
              <strong className="text-slate-400 block text-[10px] mb-0.5">
                {item.sender === 'ai' ? 'AI Assistant' : 'Patient Voice'}
              </strong>
              {language === 'hi' ? item.text : (item.textEn || item.text)}
            </div>
          ))}
        </div>

        {/* Next Action Button */}
        <div className="pt-2">
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
