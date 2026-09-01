import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout.jsx';
import { useAdminStore } from '../../store/useAdminStore.js';
import { Sparkles, Settings, Shield, CheckCircle } from '../../lib/icons.jsx';

export const AdminModels = () => {
  const { modelsConfig, updateModelConfig } = useAdminStore();

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <span>AI Clinical Model & Prompt Governance</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure LLM parameters, safety guardrails, and non-diagnosis prompts
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
              Guardrails Enforced
            </span>
          </div>

          {/* Model Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Active LLM Engine
            </label>
            <select
              value={modelsConfig.activeModel}
              onChange={(e) => updateModelConfig({ activeModel: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-sm focus:outline-none focus:border-teal-400"
            >
              <option value="MedLLM-v3.4-Clinical-India">MedLLM-v3.4-Clinical-India (Optimized for Hindi/English)</option>
              <option value="Biomed-Llama-3-Health">Biomed-Llama-3-Health (Triage Specialized)</option>
              <option value="AyuDrishti-Mini-Offline">AyuDrishti-Mini-Offline (Edge Kiosk Local Model)</option>
            </select>
          </div>

          {/* System Prompt Rules */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>System Prompt Guardrail</span>
              <span className="text-[10px] text-amber-400 font-mono">Strict Non-Diagnosis Rule</span>
            </label>
            <textarea
              rows={4}
              value={modelsConfig.systemPrompt}
              onChange={(e) => updateModelConfig({ systemPrompt: e.target.value })}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-teal-200 font-mono text-xs focus:outline-none focus:border-teal-400"
            />
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Temperature (hallucination control):</span>
                <span className="text-teal-400">{modelsConfig.temperature}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.5"
                step="0.05"
                value={modelsConfig.temperature}
                onChange={(e) => updateModelConfig({ temperature: parseFloat(e.target.value) })}
                className="w-full accent-teal-500"
              />
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Max Output Tokens:</span>
                <span className="text-teal-400">{modelsConfig.maxTokens}</span>
              </div>
              <input
                type="range"
                min="256"
                max="1024"
                step="64"
                value={modelsConfig.maxTokens}
                onChange={(e) => updateModelConfig({ maxTokens: parseInt(e.target.value) })}
                className="w-full accent-teal-500"
              />
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminModels;
