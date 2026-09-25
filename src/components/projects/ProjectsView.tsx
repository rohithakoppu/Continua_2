import React, { useState } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  Plus, 
  FolderKanban, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  CheckCircle2, 
  GitBranch, 
  Layers,
  Sparkles
} from 'lucide-react';

export function ProjectsView() {
  const { 
    projects, 
    setCurrentView, 
    setSelectedProjectId, 
    setSelectedConversationId, 
    setActiveProjectTab,
    projectMemories
  } = useContinua();

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed'>('all');

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Projects Repository
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Projects are the permanent source of truth in CONTINUA. AI sessions can change while work remains unbroken.
          </p>
        </div>

        {/* Filter Segmented Control adhering to zero-pill discipline */}
        <div className="flex items-center gap-1 p-1 bg-neutral-200/60 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedFilter === 'all'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            onClick={() => setSelectedFilter('active')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedFilter === 'active'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Active
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {projects.map((proj) => {
          const memory = projectMemories[proj.id];
          return (
            <div
              key={proj.id}
              className="bg-white border border-neutral-200/90 rounded-xl p-5 hover:border-neutral-300 transition-all hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Title & Category Row */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 leading-snug">
                      {proj.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                      <span>{proj.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-neutral-700">Branch: {proj.activeBranch}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold tabular-nums text-neutral-700">
                    {proj.progress}%
                  </span>
                </div>

                <p className="text-xs text-neutral-600 mt-2 mb-4 leading-relaxed line-clamp-2">
                  {proj.description}
                </p>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-neutral-50 rounded-lg border border-neutral-200/60 text-xs mb-4">
                  <div>
                    <span className="text-[11px] text-neutral-500 block">AI Engine</span>
                    <span className="font-semibold text-neutral-800 truncate block">
                      {proj.currentAIName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-500 block">Decisions</span>
                    <span className="font-bold text-neutral-900 tabular-nums">
                      {memory?.decisions.length || 0} locked
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-500 block">Tasks</span>
                    <span className="font-semibold text-neutral-900 tabular-nums">
                      {proj.pendingTasksCount} pending
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Updated {proj.lastActivity}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      if (proj.id === 'proj-placement') {
                        setSelectedConversationId('conv-placement-1');
                      }
                      setCurrentView('chat');
                    }}
                    className="py-1.5 px-3 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    Open Chat
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      setCurrentView('project-detail');
                      setActiveProjectTab('overview');
                    }}
                    className="py-1.5 px-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
