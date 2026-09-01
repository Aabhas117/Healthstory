import React from 'react';
import { Mic } from '../../lib/icons.jsx';

export const VoiceWaveAnimation = ({ isRecording = false, onToggle = () => {} }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <button
        onClick={onToggle}
        className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative ${
          isRecording
            ? 'bg-rose-600 text-white animate-mic-pulse ring-8 ring-rose-500/30'
            : 'bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 hover:scale-105 shadow-teal-500/30 ring-4 ring-teal-500/20'
        }`}
      >
        <Mic className={`w-12 h-12 sm:w-14 sm:h-14 ${isRecording ? 'animate-bounce' : ''}`} />
      </button>

      <div className="mt-4 text-center">
        <p className={`font-extrabold text-lg sm:text-xl ${isRecording ? 'text-rose-400 animate-pulse' : 'text-teal-300'}`}>
          {isRecording ? 'Recording Live Voice... Speak Now' : 'Tap Microphone to Speak'}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          {isRecording ? 'Listening in Hindi / English...' : 'Touch input is also supported below'}
        </p>
      </div>
    </div>
  );
};

export default VoiceWaveAnimation;
