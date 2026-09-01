import React from 'react';
import { Mic } from '../../lib/icons.jsx';

export const VoiceWaveAnimation = ({ isRecording = false, onToggle = () => {} }) => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <button
        onClick={onToggle}
        className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-200 shadow-md relative ${
          isRecording
            ? 'bg-red-600 text-white ring-4 ring-red-300 dark:ring-red-900/60'
            : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20 ring-4 ring-sky-100 dark:ring-sky-950'
        }`}
      >
        <Mic className="w-10 h-10 sm:w-12 sm:h-12" />
      </button>

      <div className="mt-3 text-center">
        <p className={`font-bold text-base sm:text-lg ${isRecording ? 'text-red-600 dark:text-red-400' : 'text-sky-700 dark:text-sky-400'}`}>
          {isRecording ? 'Recording Audio... Tap to Stop' : 'Tap Microphone to Speak'}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {isRecording ? 'Listening in Hindi / English...' : 'Voice recognition helper'}
        </p>
      </div>
    </div>
  );
};

export default VoiceWaveAnimation;
