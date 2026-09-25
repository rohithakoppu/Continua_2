import React, { useState } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  ShieldCheck, 
  Download, 
  Lock, 
  Trash2, 
  Check, 
  Cpu, 
  HardDrive, 
  Sliders, 
  Bell, 
  User
} from 'lucide-react';

export function SettingsView() {
  const { projects, projectMemories, snapshots, handoffPackages } = useContinua();

  const [autoSummaries, setAutoSummaries] = useState(true);
  const [autoTitles, setAutoTitles] = useState(true);
  const [trackDecisions, setTrackDecisions] = useState(true);
  const [autoSnapshots, setAutoSnapshots] = useState(true);
  const [contextCompression, setContextCompression] = useState(true);
  const [exportFeedback, setExportFeedback] = useState(false);

  const handleExportData = () => {
    const exportBundle = {
      exportedAt: new Date().toISOString(),
      platform: 'CONTINUA Work Continuity',
      version: '2.5.0',
      projects,
      projectMemories,
      snapshots,
      handoffPackages
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `continua-work-memory-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportFeedback(true);
    setTimeout(() => setExportFeedback(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200/80">
        <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
          Settings & Memory Governance
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Configure how CONTINUA stores permanent project memory, tracks architectural decisions, and compresses context for cross-AI handoffs.
        </p>
      </div>

      {/* Account Info */}
      <div className="bg-white border border-neutral-200/90 rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Account Profile
        </h3>
        <div className="flex items-center gap-4">
          <img
            src="/src/assets/images/avatar_demo_user_1790366914203.jpg"
            alt="Rohitha Koppu"
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover border border-neutral-200"
          />
          <div>
            <h4 className="text-sm font-bold text-neutral-900">Rohitha Koppu</h4>
            <p className="text-xs text-neutral-500">rohithakoppu2007@gmail.com · Demo Pro Developer Plan</p>
          </div>
        </div>
      </div>

      {/* Memory Settings */}
      <div className="bg-white border border-neutral-200/90 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Project Memory Automation
            </h3>
            <p className="text-xs text-neutral-500">
              Autonomous extraction rules that preserve project state across provider chat boundaries.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-semibold text-neutral-900">Automatic Conversation Summaries</p>
              <p className="text-neutral-500">Incrementally update project memory with key progress updates.</p>
            </div>
            <input
              type="checkbox"
              checked={autoSummaries}
              onChange={() => setAutoSummaries(!autoSummaries)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-semibold text-neutral-900">Automatic Meaningful Titles</p>
              <p className="text-neutral-500">Generate descriptive titles based on real work rather than generic "New Chat" labels.</p>
            </div>
            <input
              type="checkbox"
              checked={autoTitles}
              onChange={() => setAutoTitles(!autoTitles)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-semibold text-neutral-900">Decision Tracking</p>
              <p className="text-neutral-500">Index architectural and product choices into project decisions log.</p>
            </div>
            <input
              type="checkbox"
              checked={trackDecisions}
              onChange={() => setTrackDecisions(!trackDecisions)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-semibold text-neutral-900">Work Snapshots</p>
              <p className="text-neutral-500">Auto-create restorable state checkpoints before cross-AI continuation.</p>
            </div>
            <input
              type="checkbox"
              checked={autoSnapshots}
              onChange={() => setAutoSnapshots(!autoSnapshots)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-semibold text-neutral-900">Context Compression Protocol</p>
              <p className="text-neutral-500">Compress lengthy chat logs into ~89% smaller continuation packages.</p>
            </div>
            <input
              type="checkbox"
              checked={contextCompression}
              onChange={() => setContextCompression(!contextCompression)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
            />
          </label>
        </div>
      </div>

      {/* Privacy & Data Ownership */}
      <div className="bg-white border border-neutral-200/90 rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Privacy & Data Sovereignty
        </h3>

        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70 text-xs text-neutral-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-neutral-900">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>CONTINUA stores project memory separately from provider conversations.</span>
          </div>
          <p className="leading-relaxed">
            Your project decisions, requirements, and codebase indexes remain anchored in your private project storage. If an external AI provider experiences an outage, changes pricing, or exhausts its context limits, your accumulated work is never trapped or deleted.
          </p>
          <p className="text-[11px] text-neutral-400">
            Demo Security Notice: CONTINUA never requests or stores UPI PINs, bank passwords, or raw provider secrets.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-neutral-900">Export Complete Project State</h4>
            <p className="text-[11px] text-neutral-500">Download your full project memory, snapshots, and decisions in portable JSON format.</p>
          </div>
          <button
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors"
          >
            {exportFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Exported!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Bundle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
