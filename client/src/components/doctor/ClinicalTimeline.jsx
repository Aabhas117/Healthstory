import React, { useState } from 'react';
import { Clock, FileText, Activity, Shield, CheckCircle } from '../../lib/icons.jsx';

export const ClinicalTimeline = ({ events = [], onOpenEvidence = () => {} }) => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Symptoms', 'Medications', 'Labs', 'History'];

  const filteredEvents = events.filter(e => {
    if (filter === 'All') return true;
    return (e.category || '').toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] space-y-4 shadow-xs">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEF6F9] pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#20B8C8]" />
          <h2 className="text-base font-bold text-[#17324D]">Chronological Clinical Timeline</h2>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-[#20B8C8] text-white shadow-xs'
                  : 'bg-[#F5FAFC] text-[#536B7D] border border-[#DCEAF0] hover:bg-[#EEF6F9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline List */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2 font-sans before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DCEAF0]">
        {filteredEvents.map((evt) => (
          <div key={evt.id} className="relative group">
            
            {/* Timeline Dot */}
            <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#20B8C8] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#20B8C8]"></div>
            </div>

            {/* Event Card */}
            <div 
              onClick={() => evt.documentId && onOpenEvidence(evt.documentId)}
              className={`p-3.5 rounded-xl border transition-all ${
                evt.documentId ? 'cursor-pointer hover:border-[#20B8C8] bg-[#F5FAFC]' : 'bg-[#F5FAFC] border-[#DCEAF0]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-extrabold text-[#20B8C8] font-mono">{evt.date}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EEF6F9] text-[#536B7D] px-2 py-0.5 rounded-lg border border-[#DCEAF0]">
                  {evt.category}
                </span>
              </div>

              <h4 className="font-bold text-sm text-[#17324D] mb-0.5">
                {evt.title}
              </h4>
              <p className="text-xs text-[#536B7D]">
                {evt.description}
              </p>

              {evt.documentId && (
                <div className="mt-2 text-[11px] font-bold text-[#20B8C8] flex items-center gap-1 hover:underline">
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Source Evidence ({evt.documentId})</span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ClinicalTimeline;
