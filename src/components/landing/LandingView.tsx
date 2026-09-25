import React from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  ArrowRight, 
  Repeat, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Layers, 
  Cpu, 
  Zap, 
  Clock, 
  FileCode,
  Github,
  HardDrive
} from 'lucide-react';

export function LandingView() {
  const { setCurrentView, launchDemoStory, createNewChat } = useContinua();

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] flex flex-col items-center">
      {/* Top Hero Section */}
      <section className="w-full max-w-5xl px-6 pt-16 pb-20 text-center space-y-6">
        {/* Subtle kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Award-Level Prototype · The Permanent AI Workspace</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight text-balance leading-[1.1]">
          Change the AI. <br className="hidden sm:inline" />
          <span className="text-neutral-500">Keep the Work.</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 font-normal leading-relaxed text-balance">
          Your project shouldn't restart just because your AI session ends. CONTINUA turns your project into the permanent source of truth.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              createNewChat('proj-placement');
            }}
            className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={launchDemoStory}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>See Handoff Demo (30s)</span>
          </button>
        </div>

        {/* Centerpiece Architecture Diagram: AI A -> CONTINUA -> AI B */}
        <div className="pt-12 max-w-4xl mx-auto">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs text-left">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                The CONTINUA Continuity Engine
              </span>
              <span className="text-xs font-mono font-medium text-emerald-700">
                ~89% Context Compression
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Box 1: Provider A */}
              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">AI Workspace Alpha</span>
                  <span className="text-[10px] text-amber-700 font-mono font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Limit Reached
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  42,800 raw context tokens. Ideation, architecture discussions, and initial code drafts.
                </p>
              </div>

              {/* Box 2: CONTINUA Permanent Memory Hub */}
              <div className="p-5 rounded-xl border-2 border-neutral-900 bg-white shadow-xs space-y-2 relative">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-neutral-900 text-white text-[10px] font-bold font-mono">
                  SOURCE OF TRUTH
                </div>
                <h4 className="text-sm font-bold text-neutral-900 pt-1">
                  CONTINUA Memory Hub
                </h4>
                <div className="text-[11px] text-neutral-600 space-y-1 font-mono">
                  <p>• 12 locked decisions</p>
                  <p>• 8 completed tasks</p>
                  <p>• Unresolved blockers</p>
                  <p>• Connected repo files</p>
                </div>
              </div>

              {/* Box 3: Destination AI */}
              <div className="p-4 rounded-xl border border-neutral-200 bg-emerald-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">Coding AI Engine</span>
                  <span className="text-[10px] text-emerald-800 font-mono font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                    Resumed State
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  <strong>4,900 compacted tokens.</strong> Immediately continues coding the recruiter dashboard without asking to repeat specs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Comparison Section */}
      <section className="w-full bg-white border-y border-neutral-200 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900">
              The Reality of Multi-Day AI Development
            </h2>
            <p className="text-xs text-neutral-500">
              Why current chatbot interfaces break down when you build real products over weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* The Old Chatbot Way */}
            <div className="p-6 rounded-2xl border border-red-200 bg-red-50/30 space-y-4">
              <span className="text-xs font-bold text-red-900 uppercase tracking-wider block">
                Standard AI Chatbots
              </span>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Giant Conversations:</strong> 50,000+ words where key architectural decisions get buried and forgotten.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Session Limit Interruptions:</strong> Work abruptly freezes when you hit usage quotas or token windows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>The Prompt Repetition Tax:</strong> Starting a new chat wastes 20 minutes copying requirements again.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Scattered Files:</strong> Uploads and code snippets are lost across 15 separate chat tabs.</span>
                </li>
              </ul>
            </div>

            {/* The CONTINUA Way */}
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-4">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                CONTINUA Architecture
              </span>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Permanent Project Memory:</strong> Decisions, requirements, and state are indexed outside of ephemeral chat threads.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Smart Context Compression:</strong> Packs 42,000 raw tokens into ~4,900 high-intent tokens (~89% savings).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero-Loss Cross-AI Handoff:</strong> Switch between models instantly; the new AI picks up where you left off.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Connected GitHub & Drive:</strong> Files and live repo code are directly accessible inside chat.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="w-full max-w-5xl px-6 py-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-neutral-900">
          “AI can change. Your work doesn't.”
        </h3>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Explore the full prototype workspace with pre-seeded projects, live connectors, and verified continuity.
        </p>
        <button
          onClick={() => setCurrentView('home')}
          className="px-6 py-2.5 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors"
        >
          Enter CONTINUA Workspace
        </button>
      </section>
    </div>
  );
}
