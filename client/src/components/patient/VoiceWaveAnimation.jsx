import React from 'react';
import { Mic } from '../../lib/icons.jsx';

export const VoiceWaveAnimation = ({ isRecording = false, onToggle = () => {} }) => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <button
        onClick={onToggle}
        className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-200 shadow-md relative ${
          isRecording
            ? 'bg-[#20B8C8] text-white ring-8 ring-[#20B8C8]/20 animate-pulse'
            : 'bg-[#20B8C8] hover:bg-[#1CA6B4] text-white ring-4 ring-[#20B8C8]/10'
        }`}
      >
        <Mic className="w-10 h-10 sm:w-12 sm:h-12" />
      </button>

      <div className="mt-3 text-center">
        <p className={`font-bold text-base sm:text-lg ${isRecording ? 'text-red-600' : 'text-[#17324D]'}`}>
          {isRecording ? 'Recording Audio... Tap to Stop' : 'Tap Microphone to Speak'}
        </p>
        <p className="text-xs text-[#536B7D] mt-0.5">
          {isRecording ? 'Listening in Hindi / English...' : 'Voice recognition helper'}
        </p>
      </div>
    </div>
  );
};

export default VoiceWaveAnimation;
