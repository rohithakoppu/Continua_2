import React, { useState, useEffect } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  X, 
  Check, 
  ArrowRight, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  FileCode, 
  AlertTriangle,
  Zap,
  Repeat
} from 'lucide-react';

interface HandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HandoffModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { 
    projects, 
    selectedProjectId, 
    aiProviders, 
    switchAIEngine, 
    projectMemories,
    saveWorkSnapshot,
    createHandoffPackage
  } = useContinua();

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];
  const memory = projectMemories[selectedProjectId];

  // Pipeline steps animation state
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDestAI, setSelectedDestAI] = useState('ai-coding');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const pipelineSteps = [
    { label: 'Reading active conversation history (16 messages)', detail: '42,800 raw context tokens scanned' },
    { label: 'Anchoring to Project Permanent Source of Truth', detail: `Project: ${project.name} (Branch: ${project.activeBranch})` },
    { label: 'Extracting 12 architectural decisions', detail: 'Decision #12 (Firebase Auth & Firestore) locked' },
    { label: 'Identifying completed work & pending tasks', detail: '8 completed milestones · 3 pending sprint items' },
    { label: 'Isolating unresolved blockers', detail: 'firestore.rules custom token claim assertion' },
    { label: 'Selecting relevant repository files', detail: 'firebase.ts, login.tsx, dashboard.tsx attached' },
    { label: 'Applying Context Compression algorithm', detail: '42,800 tokens → 4,900 tokens (Prototype estimate: ~89% smaller)' },
    { label: 'Formatting continuation payload for target engine', detail: 'Continuation Package #08 structured' }
  ];

  // Auto-run pipeline when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsProcessing(true);
      setIsReady(false);

      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= pipelineSteps.length - 1) {
            clearInterval(interval);
            setIsProcessing(false);
            setIsReady(true);
            // Auto save snapshot and package
            saveWorkSnapshot(selectedProjectId, 'Before AI Handoff');
            createHandoffPackage(selectedProjectId, 'Demo AI Workspace', 'Coding AI Engine');
            return prev;
          }
          return prev + 1;
        });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isOpen, selectedProjectId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Repeat className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 leading-tight">
                Cross-AI Work Handoff
              </h3>
              <p className="text-xs text-neutral-500">
                Change the AI. Keep the Work.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Top Engine Compare Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 block mb-1">
                Current AI Session
              </span>
              <p className="text-xs font-bold text-neutral-900">Demo AI Workspace</p>
              <p className="text-[11px] text-amber-700 font-mono mt-0.5 font-medium">
                42,800 / 45,000 tokens (Session Limit Approaching)
              </p>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-neutral-200 pt-2 sm:pt-0 sm:pl-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 block mb-1">
                Destination AI Engine
              </span>
              <select
                value={selectedDestAI}
                onChange={(e) => setSelectedDestAI(e.target.value)}
                className="w-full text-xs font-semibold bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              >
                {aiProviders.filter(a => a.id !== 'ai-workspace-a').map(ai => (
                  <option key={ai.id} value={ai.id}>
                    {ai.name} ({ai.model})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Processing Checklist */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center justify-between">
              <span>Generating Continuation Package</span>
              <span className="font-mono text-neutral-500 text-[11px]">
                {Math.min(currentStep + 1, pipelineSteps.length)} / {pipelineSteps.length}
              </span>
            </h4>

            <div className="space-y-2 border border-neutral-200 rounded-xl p-3 bg-neutral-50/40 divide-y divide-neutral-100">
              {pipelineSteps.map((step, idx) => {
                const isComplete = idx <= currentStep;
                const isCurrent = idx === currentStep && isProcessing;

                return (
                  <div key={idx} className={`pt-2 first:pt-0 flex items-start gap-2.5 transition-opacity ${isComplete ? 'opacity-100' : 'opacity-35'}`}>
                    <div className="mt-0.5">
                      {isComplete ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-neutral-300" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs ${isComplete ? 'font-semibold text-neutral-900' : 'text-neutral-500'}`}>
                        {step.label}
                      </p>
                      <p className="text-[11px] text-neutral-500 font-mono">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Context Compression Metric Box */}
          {isReady && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/90 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Handoff Package Ready
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                  Prototype estimate: ~89% smaller context
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-200/60 text-xs">
                <div>
                  <span className="text-[11px] text-neutral-600 block">Original Chat</span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">42,800 tokens</span>
                </div>
                <div>
                  <span className="text-[11px] text-neutral-600 block">Compacted Context</span>
                  <span className="font-mono font-bold text-emerald-800 tabular-nums">4,900 tokens</span>
                </div>
                <div>
                  <span className="text-[11px] text-neutral-600 block">Preserved Decisions</span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">12/12 decisions</span>
                </div>
              </div>

              <p className="text-[11px] text-neutral-600 pt-1">
                Zero loss of completed work. The destination AI will resume directly from the pending recruiter dashboard task.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={!isReady}
            onClick={() => switchAIEngine(selectedDestAI)}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg shadow-xs transition-all ${
              isReady
                ? 'bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <span>Continue with Selected AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
