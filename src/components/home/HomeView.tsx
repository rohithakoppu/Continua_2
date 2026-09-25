import React from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  Play, 
  ArrowRight, 
  Shield, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  GitBranch, 
  FileText, 
  Sparkles,
  MessageSquare,
  HardDrive,
  Github,
  Calendar,
  Layers
} from 'lucide-react';

export function HomeView() {
  const { 
    projects, 
    conversations, 
    projectMemories, 
    snapshots, 
    handoffPackages, 
    connectors, 
    setCurrentView, 
    setSelectedProjectId, 
    setSelectedConversationId,
    setActiveProjectTab,
    launchDemoStory 
  } = useContinua();

  const activeProject = projects.find(p => p.id === 'proj-placement') || projects[0];
  const memory = projectMemories['proj-placement'];

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* Welcome Banner with Hero Demo Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Good evening. Continue where you left off.
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            CONTINUA guarantees that when your AI session resets or providers change, your project work stays intact.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={launchDemoStory}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch 30-Second Demo Story</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: CONTINUE WORKING */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Continue Working
          </h2>
          <button 
            onClick={() => setCurrentView('projects')}
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
          >
            <span>View all projects</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(0, 3).map((proj) => {
            return (
              <div 
                key={proj.id}
                className="bg-white border border-neutral-200/80 rounded-xl p-5 hover:border-neutral-300 transition-all hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm text-neutral-900 leading-snug">
                      {proj.name}
                    </h3>
                    <span className="text-xs font-mono tabular-nums text-neutral-500 shrink-0">
                      {proj.progress}% complete
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-neutral-600 pt-3 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Currently working with:</span>
                      <span className="font-medium text-neutral-800">{proj.currentAIName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Last activity:</span>
                      <span>{proj.lastActivity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Pending tasks:</span>
                      <span className="font-semibold text-neutral-900 tabular-nums">
                        {proj.pendingTasksCount} tasks
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 flex items-center gap-2 border-t border-neutral-100">
                  <button
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      if (proj.id === 'proj-placement') {
                        setSelectedConversationId('conv-placement-1');
                      }
                      setCurrentView('chat');
                    }}
                    className="flex-1 py-1.5 px-3 text-xs font-medium text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors text-center"
                  >
                    Continue Chat
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      setCurrentView('project-detail');
                    }}
                    className="py-1.5 px-3 text-xs font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors"
                  >
                    Memory
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: WORK MEMORY SUMMARY (Core Differentiator) */}
      <div className="bg-white border border-neutral-200/80 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Work Memory
              </span>
              <span className="text-xs font-medium text-neutral-600">
                · {activeProject.name}
              </span>
            </div>
            <h3 className="text-base font-semibold text-neutral-900 mt-0.5">
              Permanent Project Truth
            </h3>
          </div>
          <button
            onClick={() => {
              setSelectedProjectId(activeProject.id);
              setCurrentView('project-detail');
              setActiveProjectTab('memory');
            }}
            className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Inspect Project Memory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3.5 bg-neutral-50/70 rounded-lg border border-neutral-200/50">
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium">Decisions</span>
            </div>
            <p className="text-xl font-bold text-neutral-900 tabular-nums">
              {memory?.decisions.length || 12}
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              Archived & pinned architectural choices
            </p>
          </div>

          <div className="p-3.5 bg-neutral-50/70 rounded-lg border border-neutral-200/50">
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium">Completed Work</span>
            </div>
            <p className="text-xl font-bold text-neutral-900 tabular-nums">
              {memory?.completedWork.length || 8}
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              Verified modules & verified schemas
            </p>
          </div>

          <div className="p-3.5 bg-neutral-50/70 rounded-lg border border-neutral-200/50">
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-medium">Blockers</span>
            </div>
            <p className="text-xl font-bold text-neutral-900 tabular-nums">
              {memory?.blockers.length || 1}
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              Unresolved security rule flags
            </p>
          </div>

          <div className="p-3.5 bg-neutral-50/70 rounded-lg border border-neutral-200/50">
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <Camera className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium">Work Snapshots</span>
            </div>
            <p className="text-xl font-bold text-neutral-900 tabular-nums">
              {snapshots.length}
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              Zero-loss restorable state checkpoints
            </p>
          </div>
        </div>

        {/* Current State Highlight */}
        <div className="mt-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200/60 text-xs">
          <span className="font-semibold text-neutral-900">Current Focus: </span>
          <span className="text-neutral-700">{memory?.currentState}</span>
        </div>
      </div>

      {/* SECTION 3: RECENT CONVERSATIONS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Recent Conversations
          </h2>
          <button 
            onClick={() => setCurrentView('chat')}
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
          >
            All chats
          </button>
        </div>

        <div className="bg-white border border-neutral-200/80 rounded-xl overflow-hidden divide-y divide-neutral-100">
          {conversations.slice(0, 4).map((c) => {
            return (
              <div 
                key={c.id}
                onClick={() => {
                  setSelectedConversationId(c.id);
                  setSelectedProjectId(c.projectId);
                  setCurrentView('chat');
                }}
                className="p-4 hover:bg-neutral-50/80 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-neutral-900 truncate">
                      {c.title}
                    </h4>
                    <span className="text-xs text-neutral-600">·</span>
                    <span className="text-xs text-neutral-600 font-medium">
                      {c.projectName}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-1">
                    {c.preview}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-500 shrink-0">
                  <span className="font-medium text-neutral-700">{c.aiProviderName}</span>
                  <span className="font-mono tabular-nums text-neutral-600">{c.tokenCount.toLocaleString()} tokens</span>
                  <span className="text-neutral-600">{c.lastUpdated}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: CONNECTED SERVICES & CONTINUITY STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Connected Services */}
        <div className="bg-white border border-neutral-200/80 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Connected Services
            </h3>
            <button
              onClick={() => setCurrentView('connectors')}
              className="text-xs font-semibold text-neutral-900 hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-neutral-200/60 bg-neutral-50/50 flex items-center gap-3">
              <Github className="w-5 h-5 text-neutral-900 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-neutral-900 truncate">GitHub</p>
                <p className="text-[11px] text-emerald-700 font-medium">Connected</p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-neutral-200/60 bg-neutral-50/50 flex items-center gap-3">
              <HardDrive className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-neutral-900 truncate">Google Drive</p>
                <p className="text-[11px] text-emerald-700 font-medium">Connected</p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-neutral-200/60 bg-neutral-50/50 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-neutral-800 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-neutral-900 truncate">Google Calendar</p>
                <p className="text-[11px] text-emerald-700 font-medium">Connected</p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-neutral-200/60 bg-neutral-50/50 flex items-center gap-3">
              <Cpu className="w-5 h-5 text-purple-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-neutral-900 truncate">AI Workspaces</p>
                <p className="text-[11px] text-emerald-700 font-medium">4 Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Continuity Status */}
        <div className="bg-white border border-neutral-200/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                AI Continuity Status
              </h3>
            </div>
            <p className="text-sm font-semibold text-neutral-900">
              Your work is protected across provider limits.
            </p>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              When an AI session fills or a model is changed, CONTINUA packages your decisions, files, and blockers without repeating giant prompts.
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
            <span className="font-mono tabular-nums">{projects.length} active projects</span>
            <span>·</span>
            <span className="font-mono tabular-nums">{snapshots.length} saved snapshots</span>
            <span>·</span>
            <span className="font-mono tabular-nums">{handoffPackages.length} handoff packages</span>
          </div>
        </div>
      </div>
    </div>
  );
}
