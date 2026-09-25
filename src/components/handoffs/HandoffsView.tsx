import React, { useState } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { HandoffPackage } from '../../types';
import { 
  Repeat, 
  ArrowRight, 
  ShieldCheck, 
  Copy, 
  Check, 
  Eye, 
  Layers, 
  Cpu, 
  FileText,
  Sparkles
} from 'lucide-react';

export function HandoffsView() {
  const { handoffPackages, switchAIEngine, setIsHandoffModalOpen } = useContinua();
  const [selectedPackage, setSelectedPackage] = useState<HandoffPackage | null>(handoffPackages[0] || null);
  const [copied, setCopied] = useState(false);

  const handleCopyPayload = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Cross-AI Handoff Packages
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Compact continuation packages that allow switching between AI models without repeating your original giant prompt.
          </p>
        </div>

        <button
          onClick={() => setIsHandoffModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Repeat className="w-4 h-4 text-emerald-400" />
          <span>Create New Handoff</span>
        </button>
      </div>

      {/* Main Grid: Packages List + Payload Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Packages List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Available Packages ({handoffPackages.length})
          </h3>

          <div className="space-y-3">
            {handoffPackages.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-neutral-900 shadow-xs ring-1 ring-neutral-900'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-neutral-900">
                      Package #{pkg.packageNumber}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ~{pkg.compressionRatio}% smaller context
                    </span>
                  </div>

                  <p className="text-xs font-medium text-neutral-800 mb-1 leading-snug">
                    {pkg.title}
                  </p>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mb-3">
                    {pkg.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-2 border-t border-neutral-100">
                    <span className="tabular-nums">{pkg.originalTokens.toLocaleString()} → {pkg.compressedTokens.toLocaleString()} tokens</span>
                    <span>{pkg.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Package Detail & Inspector */}
        <div className="lg:col-span-7">
          {selectedPackage ? (
            <div className="bg-white border border-neutral-200/90 rounded-xl p-6 space-y-5">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">
                      Continuation Package #{selectedPackage.packageNumber}
                    </span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs font-mono text-neutral-600">
                      {selectedPackage.projectName}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mt-1">
                    {selectedPackage.title}
                  </h3>
                </div>

                <button
                  onClick={() => switchAIEngine('ai-coding')}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors shrink-0"
                >
                  <span>Continue in AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Compression Metrics Banner */}
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-900">Context Compression Breakdown</span>
                  <span className="text-[11px] font-mono text-neutral-500">Prototype estimate</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-sans">Raw Conversation</span>
                    <span className="font-bold text-neutral-800 tabular-nums">
                      {selectedPackage.originalTokens.toLocaleString()} tokens
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-sans">Compacted Context</span>
                    <span className="font-bold text-emerald-800 tabular-nums">
                      {selectedPackage.compressedTokens.toLocaleString()} tokens
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-sans">Efficiency Gain</span>
                    <span className="font-bold text-neutral-900 tabular-nums">
                      ~{selectedPackage.compressionRatio}% savings
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Decisions in Package */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Preserved Decisions
                </h4>
                <div className="space-y-1.5 text-xs">
                  {selectedPackage.keyDecisions.map((dec, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{dec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payload Inspector with Copy */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Structured Continuation Payload
                  </h4>
                  <button
                    onClick={() => handleCopyPayload(selectedPackage.payloadText)}
                    className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied Payload</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Payload</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 bg-neutral-900 text-neutral-100 rounded-xl font-mono text-[11px] whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto select-text">
                  {selectedPackage.payloadText}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-neutral-200/90 rounded-xl p-12 text-center text-neutral-400">
              Select a package to inspect its continuation state.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
