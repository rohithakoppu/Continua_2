import React from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  ShieldCheck, 
  Repeat, 
  Layers, 
  Cpu, 
  FileCode, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

export function HelpView() {
  const { launchDemoStory, setCurrentView } = useContinua();

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200/80">
        <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
          CONTINUA Architecture & Continuity Guide
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          "Change the AI. Keep the Work." — Why the Project is the permanent source of truth.
        </p>
      </div>

      {/* Core Principle Hero Card */}
      <div className="bg-white border border-neutral-200/90 rounded-2xl p-6 lg:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Core Philosophy
          </span>
          <h2 className="text-2xl font-bold text-neutral-900 mt-2">
            The Fundamental Problem in Modern AI Work
          </h2>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            Users may work with an AI for 5, 10, or 20+ days on a single project. During that time:
          </p>
        </div>

        {/* 4 Pain Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
            <h4 className="font-bold text-neutral-900 mb-1">1. Context Amnesia</h4>
            <p className="text-neutral-500">Conversations grow giant, crucial architectural decisions become buried in 100+ replies, and you forget what was decided on Day 2.</p>
          </div>
          <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
            <h4 className="font-bold text-neutral-900 mb-1">2. Arbitrary Provider Limits</h4>
            <p className="text-neutral-500">AI session token limits interrupt deep programming or product drafting unexpectedly, forcing an abrupt stop.</p>
          </div>
          <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
            <h4 className="font-bold text-neutral-900 mb-1">3. Giant Prompt Repetition</h4>
            <p className="text-neutral-500">Starting a new chat or switching providers forces you to spend 20 minutes copying and pasting giant prompts just to explain the baseline.</p>
          </div>
          <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
            <h4 className="font-bold text-neutral-900 mb-1">4. Provider Lock-in</h4>
            <p className="text-neutral-500">Your hard-earned project state becomes held hostage inside a single proprietary chatbot company's walled garden.</p>
          </div>
        </div>

        {/* The CONTINUA Solution Equation */}
        <div className="p-5 bg-neutral-900 text-white rounded-xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            The CONTINUA Equation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-neutral-800 rounded-lg">
              <span className="text-emerald-400 block font-bold">PROJECT</span>
              <span className="text-neutral-300">= Permanent Source of Truth</span>
            </div>
            <div className="p-3 bg-neutral-800 rounded-lg">
              <span className="text-purple-400 block font-bold">AI</span>
              <span className="text-neutral-300">= Interchangeable Work Engine</span>
            </div>
            <div className="p-3 bg-neutral-800 rounded-lg">
              <span className="text-blue-400 block font-bold">CONTINUA</span>
              <span className="text-neutral-300">= Memory + Handoff Protocol</span>
            </div>
          </div>
        </div>

        {/* Interactive Story Callout */}
        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">Experience the Hero Moment</h4>
            <p className="text-xs text-neutral-500">See how an AI session limit is detected, work is snapshotted, and work transfers seamlessly.</p>
          </div>
          <button
            onClick={launchDemoStory}
            className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors shrink-0"
          >
            Launch Interactive Story
          </button>
        </div>
      </div>
    </div>
  );
}
