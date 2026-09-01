import React, { useState } from 'react';
import { X, Check, Edit3, Shield } from '../../lib/icons.jsx';

export const DoctorVerificationModal = ({
  isOpen = false,
  field = null,
  onClose = () => {},
  onSave = () => {}
}) => {
  if (!isOpen || !field) return null;

  const [editedValue, setEditedValue] = useState(field.value || '');
  const [reason, setReason] = useState('Corrected during clinical evaluation');

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      ...field,
      value: editedValue,
      status: 'Doctor Verified',
      changeReason: reason
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Verify Clinical Field: {field.label}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          
          {/* Original Value Display */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
              AI-Extracted Original Value
            </span>
            <span className="text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold block mt-0.5">
              {field.originalValue || field.value}
            </span>
          </div>

          {/* Edited Value Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Physician Corrected Value
            </label>
            <input
              type="text"
              required
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Reason for Change */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Clinical Rationale / Reason for Correction
            </label>
            <textarea
              rows={2}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Type clinical reason for edit..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save & Verify Record</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default DoctorVerificationModal;
