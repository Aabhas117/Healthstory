import React from "react";
import { AdminLayout } from "../../layouts/AdminLayout.jsx";
import { useAdminStore } from "../../store/useAdminStore.js";
import { PageHeader } from "../../components/common/PageHeader.jsx";
import { Sparkles, Settings, Shield, CheckCircle } from "../../lib/icons.jsx";

export const AdminModels = () => {
  const { modelsConfig, updateModelConfig } = useAdminStore();

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <PageHeader
          icon={Sparkles}
          title="AI Model Settings"
          subtitle="Configure LLM engines, clinical safety guardrails, and non-diagnosis prompts"
          badgeText="Guardrails Enforced"
        />

        <div className="bg-white p-6 rounded-2xl border border-[#DCEAF0] shadow-xs space-y-6">
          {/* Active Model Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#536B7D] uppercase tracking-wider">
              Active Clinical LLM Engine
            </label>
            <select
              value={modelsConfig.activeModel}
              onChange={(e) =>
                updateModelConfig({ activeModel: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#17324D] font-semibold text-xs focus:outline-none focus:border-[#20B8C8]"
            >
              <option value="MedLLM-v3.4-Clinical-India">
                MedLLM-v3.4-Clinical-India (Optimized for Hindi/English)
              </option>
              <option value="Biomed-Llama-3-Health">
                Biomed-Llama-3-Health (Triage Specialized)
              </option>
              <option value="AyuDrishti-Mini-Offline">
                AyuDrishti-Mini-Offline (Local Model)
              </option>
            </select>
          </div>

          {/* System Prompt Rules */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#536B7D] uppercase tracking-wider flex items-center justify-between">
              <span>System Prompt Guardrails</span>
              <span className="text-[10px] text-amber-600 font-mono">
                Strict Non-Diagnosis Rule
              </span>
            </label>
            <textarea
              rows={4}
              value={modelsConfig.systemPrompt}
              onChange={(e) =>
                updateModelConfig({ systemPrompt: e.target.value })
              }
              className="w-full p-3.5 rounded-xl bg-[#F5FAFC] border border-[#DCEAF0] text-[#17324D] font-mono text-xs focus:outline-none focus:border-[#20B8C8]"
            />
          </div>

          {/* Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#F5FAFC] p-4 rounded-xl border border-[#DCEAF0] space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#536B7D]">
                <span>Temperature (Hallucination Control):</span>
                <span className="text-[#20B8C8]">
                  {modelsConfig.temperature}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.5"
                step="0.05"
                value={modelsConfig.temperature}
                onChange={(e) =>
                  updateModelConfig({ temperature: parseFloat(e.target.value) })
                }
                className="w-full accent-[#20B8C8]"
              />
            </div>

            <div className="bg-[#F5FAFC] p-4 rounded-xl border border-[#DCEAF0] space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#536B7D]">
                <span>Max Output Tokens:</span>
                <span className="text-[#20B8C8]">
                  {modelsConfig.maxTokens}
                </span>
              </div>
              <input
                type="range"
                min="256"
                max="1024"
                step="64"
                value={modelsConfig.maxTokens}
                onChange={(e) =>
                  updateModelConfig({ maxTokens: parseInt(e.target.value) })
                }
                className="w-full accent-[#20B8C8]"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminModels;
