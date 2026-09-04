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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-[#DCEAF0] rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#EEF6F9] pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-[#20B8C8]" />
            <h3 className="font-extrabold text-base text-[#17324D]">
              Verify Clinical Field: {field.label}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7A8D9D] hover:text-[#17324D] hover:bg-[#F5FAFC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          
          {/* Original Value Display */}
          <div className="p-3 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0]">
            <span className="text-[#536B7D] font-bold uppercase tracking-wider block text-[10px]">
              AI-Extracted Original Value
            </span>
            <span className="text-[#17324D] font-mono text-xs font-semibold block mt-0.5">
              {field.originalValue || field.value}
            </span>
          </div>

          {/* Edited Value Input */}
          <div>
            <label className="block text-xs font-bold text-[#536B7D] uppercase tracking-wider mb-1">
              Physician Corrected Value
            </label>
            <input
              type="text"
              required
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#17324D] font-semibold text-sm focus:outline-none focus:border-[#20B8C8]"
            />
          </div>

          {/* Reason for Change */}
          <div>
            <label className="block text-xs font-bold text-[#536B7D] uppercase tracking-wider mb-1">
              Clinical Rationale / Reason for Correction
            </label>
            <textarea
              rows={2}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Type clinical reason for edit..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#17324D] text-xs focus:outline-none focus:border-[#20B8C8]"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEF6F9]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F5FAFC] text-[#536B7D] border border-[#DCEAF0] font-bold hover:bg-[#EEF6F9]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#20B8C8] hover:bg-[#1CA6B4] text-white font-bold flex items-center gap-1.5 shadow-xs"
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
