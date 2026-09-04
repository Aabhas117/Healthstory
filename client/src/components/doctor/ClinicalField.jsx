import React from 'react';
import { Check, Edit3, X, FileText, Shield, CheckCircle } from '../../lib/icons.jsx';

export const ConfidenceBadge = ({ confidence = 90 }) => {
  let color = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (confidence < 75) {
    color = 'bg-amber-50 text-amber-700 border-amber-200';
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border font-mono ${color}`}>
      <span>Confidence: {confidence}%</span>
    </span>
  );
};

export const EvidenceBadge = ({ source, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#20B8C8]/10 text-[#20B8C8] border border-[#20B8C8]/20 hover:bg-[#20B8C8]/20 transition-colors"
      title="View Source Document & Evidence"
    >
      <FileText className="w-3 h-3 shrink-0" />
      <span className="truncate max-w-[150px]">{source || 'Source Document'}</span>
    </button>
  );
};

export const VerificationControls = ({ status, onAccept, onEdit, onReject }) => {
  const isVerified = status === 'Doctor Verified';
  const isRejected = status === 'Rejected';

  if (isVerified) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>Doctor Verified</span>
      </span>
    );
  }

  if (isRejected) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-200">
        <X className="w-3.5 h-3.5" />
        <span>Rejected</span>
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onAccept}
        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1"
        title="Accept & Verify"
      >
        <Check className="w-3.5 h-3.5 stroke-[3]" />
        <span>Accept</span>
      </button>

      <button
        onClick={onEdit}
        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#20B8C8] hover:bg-[#1CA6B4] text-white transition-colors flex items-center gap-1"
        title="Edit & Correct Value"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Edit</span>
      </button>

      <button
        onClick={onReject}
        className="px-2 py-1 rounded-lg text-xs font-bold bg-[#F5FAFC] text-[#536B7D] border border-[#DCEAF0] hover:bg-red-50 hover:text-red-600 transition-colors"
        title="Reject Field"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const ClinicalField = ({
  label,
  value,
  confidence = 92,
  source,
  status = 'Pending Verification',
  onAccept,
  onEdit,
  onReject,
  onOpenSource
}) => {
  return (
    <div className="p-3.5 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] space-y-2">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs font-bold uppercase tracking-wider text-[#536B7D]">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <ConfidenceBadge confidence={confidence} />
          {source && <EvidenceBadge source={source} onClick={onOpenSource} />}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
        <div className="font-extrabold text-sm text-[#17324D]">
          {value}
        </div>

        <VerificationControls
          status={status}
          onAccept={onAccept}
          onEdit={onEdit}
          onReject={onReject}
        />
      </div>
    </div>
  );
};

export default ClinicalField;
