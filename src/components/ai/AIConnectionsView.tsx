import React from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  Cpu, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck,
  Repeat
} from 'lucide-react';

export function AIConnectionsView() {
  const { aiProviders, switchAIEngine, projects, selectedProjectId } = useContinua();
  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            AI Engine Connections
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            CONTINUA is model-agnostic. Switch between general, coding, or reasoning engines while keeping your project memory unbroken.
          </p>
        </div>
      </div>

      {/* Grid of AI Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {aiProviders.map((ai) => {
          const isCurrentActive = currentProject.currentAIId === ai.id;
          const isLimitReached = ai.status === 'limit_reached' || ai.sessionTokensUsed >= 40000;

          return (
            <div
              key={ai.id}
              className={`bg-white rounded-xl border p-5 transition-all flex flex-col justify-between ${
                isCurrentActive
                  ? 'border-neutral-900 shadow-2xs ring-1 ring-neutral-900'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-neutral-100 rounded-lg text-neutral-800">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 leading-tight">
                        {ai.name}
                      </h3>
                      <p className="text-[11px] font-mono text-neutral-400">
                        {ai.model}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    isLimitReached
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : isCurrentActive
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-neutral-50 text-neutral-600 border-neutral-200'
                  }`}>
                    {isLimitReached ? 'Limit Approaching' : isCurrentActive ? 'Active in Session' : 'Ready'}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                  {ai.description}
                </p>

                {/* Context Capacity Meter */}
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60 text-xs space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Context Window:</span>
                    <span className="font-mono font-medium text-neutral-900">{ai.contextWindow}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">Session Usage:</span>
                    <span className="font-mono tabular-nums text-neutral-700">
                      {ai.sessionTokensUsed.toLocaleString()} tokens
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  CONTINUA Handoff Compatible
                </span>

                {isCurrentActive ? (
                  <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Selected Engine</span>
                  </span>
                ) : (
                  <button
                    onClick={() => switchAIEngine(ai.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    <span>Continue with this AI</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
