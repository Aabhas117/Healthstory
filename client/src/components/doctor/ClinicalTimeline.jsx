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
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Chronological Clinical Timeline</h2>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline List */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2 font-sans before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {filteredEvents.map((evt) => (
          <div key={evt.id} className="relative group">
            
            {/* Timeline Dot */}
            <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-600 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-600"></div>
            </div>

            {/* Event Card */}
            <div 
              onClick={() => evt.documentId && onOpenEvidence(evt.documentId)}
              className={`p-3.5 rounded-xl border transition-all ${
                evt.documentId ? 'cursor-pointer hover:border-sky-500 bg-slate-50/50 dark:bg-slate-950/50' : 'bg-slate-50/30 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-extrabold text-sky-700 dark:text-sky-400 font-mono">{evt.date}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                  {evt.category}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">
                {evt.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {evt.description}
              </p>

              {evt.documentId && (
                <div className="mt-2 text-[11px] font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1 hover:underline">
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
