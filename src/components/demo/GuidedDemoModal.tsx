import React, { useState, useEffect } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  Play, 
  Pause, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Check, 
  Repeat, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Github,
  Zap
} from 'lucide-react';

export function GuidedDemoModal() {
  const { 
    isGuidedDemoOpen, 
    setIsGuidedDemoOpen, 
    demoStepIndex, 
    setDemoStepIndex,
    setCurrentView,
    setSelectedProjectId,
    setSelectedConversationId,
    setActiveProjectTab,
    setIsHandoffModalOpen,
    sendMessage,
    switchAIEngine
  } = useContinua();

  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      title: 'Step 1: Open Student Placement Platform',
      desc: 'We begin inside a real 5-day project: A university recruitment portal with 68% progress.',
      action: () => {
        setSelectedProjectId('proj-placement');
        setCurrentView('project-detail');
        setActiveProjectTab('overview');
      }
    },
    {
      title: 'Step 2: Inspect 5-Day Project Conversations',
      desc: 'Notice that work is spread across 5 separate discussions rather than one giant unwieldy thread.',
      action: () => {
        setCurrentView('project-detail');
        setActiveProjectTab('chats');
      }
    },
    {
      title: 'Step 3: Open Project Memory (The Source of Truth)',
      desc: 'All 12 architectural decisions, completed work, and current focus are stored permanently in project storage.',
      action: () => {
        setCurrentView('project-detail');
        setActiveProjectTab('memory');
      }
    },
    {
      title: 'Step 4: Active Chat Session with Connected Code',
      desc: 'We open our active chat session. The AI knows authentication is already built in firebase.ts and login.tsx.',
      action: () => {
        setSelectedConversationId('conv-placement-1');
        setCurrentView('chat');
      }
    },
    {
      title: 'Step 5: Inspect Connected GitHub Repository',
      desc: 'The GitHub connector allows the AI to reference exact repository files directly without copy-pasting.',
      action: () => {
        setCurrentView('chat');
      }
    },
    {
      title: 'Step 6: AI Session Limit Reached (The Crisis Point)',
      desc: 'The provider context limit reaches 42,800 tokens. In traditional tools, this breaks continuity and loses your prompt.',
      action: () => {
        setCurrentView('chat');
      }
    },
    {
      title: 'Step 7: CONTINUA Saves Work State',
      desc: 'CONTINUA automatically captures Snapshot #08 ("Before AI Handoff") preserving all 12 decisions and current blocker.',
      action: () => {
        setCurrentView('project-detail');
        setActiveProjectTab('snapshots');
      }
    },
    {
      title: 'Step 8: Generate Continuation / Handoff Package',
      desc: 'CONTINUA analyzes the conversation, extracts key decisions, and prepares a compact handoff packet.',
      action: () => {
        setIsHandoffModalOpen(true);
      }
    },
    {
      title: 'Step 9: Smart Context Compression (~89% Smaller)',
      desc: 'The original 42,800 tokens are compacted to 4,900 high-intent tokens. Prototype estimate: ~89% context compression.',
      action: () => {
        setIsHandoffModalOpen(true);
      }
    },
    {
      title: 'Step 10: Select Destination AI Engine',
      desc: 'We select the Coding AI Engine (DeepCode 3.1 Pro) to take over the recruiter dashboard implementation.',
      action: () => {
        setIsHandoffModalOpen(true);
      }
    },
    {
      title: 'Step 11: Destination AI Resumes with Zero Prompt Repeat',
      desc: 'The new AI boots up with: "Continuing from Work Snapshot #08. I understand the recruiter dashboard is the active task..."',
      action: () => {
        switchAIEngine('ai-coding');
      }
    },
    {
      title: 'Step 12: First-Class Connectors Hub',
      desc: 'Inspect connected external sources: GitHub repository, Google Drive documents, and Google Calendar events.',
      action: () => {
        setCurrentView('connectors');
      }
    },
    {
      title: 'Step 13: Live Google Drive Document Grounding',
      desc: 'placement-requirements.pdf is linked to project memory and consulted during feature development.',
      action: () => {
        setCurrentView('library');
      }
    },
    {
      title: 'Step 14: Tools & Plugins Marketplace',
      desc: 'Installed tools like Code Analyzer and PDF Analyzer run directly in chat and write findings into memory.',
      action: () => {
        setCurrentView('tools');
      }
    },
    {
      title: 'Step 15: Context Conflict Detection',
      desc: 'If a new AI suggests Supabase when Decision #12 locked Firebase, CONTINUA flags a conflict banner.',
      action: () => {
        setSelectedConversationId('conv-placement-1');
        setCurrentView('chat');
      }
    },
    {
      title: 'Step 16: Safe Branching Architecture',
      desc: 'Alternative experiments (like a Supabase trial or auth rewrite) exist in isolated branches.',
      action: () => {
        setCurrentView('project-detail');
        setActiveProjectTab('branches');
      }
    },
    {
      title: 'Step 17: Return to Home — Work is Protected',
      desc: 'The project remains unbroken. The AI changed, but your work continued.',
      action: () => {
        setCurrentView('home');
      }
    }
  ];

  const currentStepData = demoSteps[demoStepIndex] || demoSteps[0];

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isPlaying && isGuidedDemoOpen) {
      timer = setTimeout(() => {
        if (demoStepIndex < demoSteps.length - 1) {
          const nextIndex = demoStepIndex + 1;
          setDemoStepIndex(nextIndex);
          demoSteps[nextIndex].action();
        } else {
          setIsPlaying(false);
        }
      }, 4500);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, demoStepIndex, isGuidedDemoOpen]);

  if (!isGuidedDemoOpen) return null;

  const goToStep = (index: number) => {
    if (index >= 0 && index < demoSteps.length) {
      setDemoStepIndex(index);
      demoSteps[index].action();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom duration-200">
      <div className="bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-800 p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Hackathon Demo ({demoStepIndex + 1}/{demoSteps.length})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 text-neutral-400 hover:text-white transition-colors"
              title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setIsGuidedDemoOpen(false);
                setIsPlaying(false);
              }}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-1.5 text-xs">
          <h4 className="text-sm font-bold text-white">
            {currentStepData.title}
          </h4>
          <p className="text-neutral-300 leading-relaxed">
            {currentStepData.desc}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${((demoStepIndex + 1) / demoSteps.length) * 100}%` }}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            disabled={demoStepIndex === 0}
            onClick={() => goToStep(demoStepIndex - 1)}
            className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 text-[11px] font-mono text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
            >
              {isPlaying ? 'Auto: ON' : 'Auto: OFF'}
            </button>

            {demoStepIndex < demoSteps.length - 1 ? (
              <button
                onClick={() => goToStep(demoStepIndex + 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-900 bg-white hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsGuidedDemoOpen(false);
                  setCurrentView('home');
                }}
                className="px-3 py-1.5 text-xs font-bold text-neutral-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                Complete Tour
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
