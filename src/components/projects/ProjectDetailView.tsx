import React, { useState } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  GitBranch, 
  Camera, 
  Repeat, 
  Pin, 
  Plus, 
  Trash2, 
  FileText, 
  Layers, 
  Cpu, 
  Clock, 
  ExternalLink,
  Shield,
  FileCode,
  HardDrive,
  Github
} from 'lucide-react';

export function ProjectDetailView() {
  const { 
    projects, 
    selectedProjectId, 
    setCurrentView, 
    activeProjectTab, 
    setActiveProjectTab, 
    projectMemories, 
    snapshots, 
    handoffPackages, 
    conversations, 
    setSelectedConversationId, 
    addProjectDecision, 
    toggleDecisionPin, 
    deleteProjectDecision, 
    toggleTaskStatus, 
    addProjectTask,
    createProjectBranch,
    switchProjectBranch,
    files,
    setIsHandoffModalOpen
  } = useContinua();

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];
  const memory = projectMemories[project.id] || projectMemories['proj-placement'];
  const projectSnapshots = snapshots.filter(s => s.projectId === project.id);
  const projectHandoffs = handoffPackages.filter(h => h.projectId === project.id);
  const projectConversations = conversations.filter(c => c.projectId === project.id);
  const projectFiles = files.filter(f => f.projectId === project.id);

  // Modal / local state
  const [newDecisionText, setNewDecisionText] = useState('');
  const [newDecisionReason, setNewDecisionReason] = useState('');
  const [isAddingDecision, setIsAddingDecision] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newBranchName, setNewBranchName] = useState('');
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [restoreFeedback, setRestoreFeedback] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'memory', label: 'Project Memory' },
    { id: 'chats', label: `Chats (${projectConversations.length})` },
    { id: 'decisions', label: `Decisions (${memory?.decisions.length || 0})` },
    { id: 'tasks', label: `Tasks (${memory?.pendingTasks.length || 0})` },
    { id: 'files', label: `Files (${projectFiles.length})` },
    { id: 'snapshots', label: `Snapshots (${projectSnapshots.length})` },
    { id: 'handoffs', label: `Handoffs (${projectHandoffs.length})` },
    { id: 'branches', label: `Branches (${project.branches.length})` }
  ];

  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDecisionText.trim()) return;
    addProjectDecision(project.id, {
      decision: newDecisionText.trim(),
      reason: newDecisionReason.trim() || 'Specified in architectural review',
      sourceTitle: 'Manual Entry',
      category: 'Architecture'
    });
    setNewDecisionText('');
    setNewDecisionReason('');
    setIsAddingDecision(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    addProjectTask(project.id, {
      title: newTaskText.trim(),
      priority: 'high'
    });
    setNewTaskText('');
  };

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchName.trim()) return;
    createProjectBranch(project.id, newBranchName.trim());
    setNewBranchName('');
    setIsAddingBranch(false);
  };

  const handleRestoreSnapshot = (snapshotNumber: string) => {
    // Restoring creates a new branch, never destroying current work!
    const restoredBranch = `restored-from-snap-${snapshotNumber}-${Date.now().toString().slice(-4)}`;
    createProjectBranch(project.id, restoredBranch);
    setRestoreFeedback(`Created new branch "${restoredBranch}" from Snapshot #${snapshotNumber}. Your existing "main" branch remains untouched.`);
    setTimeout(() => setRestoreFeedback(null), 5000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] flex flex-col h-full">
      {/* Top Banner Header */}
      <div className="bg-white border-b border-neutral-200/80 p-6 shrink-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-3 text-xs text-neutral-500">
            <button
              onClick={() => setCurrentView('projects')}
              className="hover:text-neutral-900 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Projects</span>
            </button>
            <span>/</span>
            <span className="text-neutral-800 font-medium">{project.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-neutral-900">
                  {project.name}
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                  Branch: {project.activeBranch}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  {project.progress}% Complete
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setSelectedConversationId('conv-placement-1');
                  setCurrentView('chat');
                }}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors"
              >
                Open in Chat
              </button>
              <button
                onClick={() => setIsHandoffModalOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Repeat className="w-3.5 h-3.5 text-emerald-600" />
                <span>Create Handoff</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation - Functional segmented tabs adhering to zero-pill discipline */}
          <div className="flex items-center gap-1 mt-6 border-b border-neutral-200 overflow-x-auto text-xs font-medium">
            {tabs.map((tab) => {
              const isActive = activeProjectTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveProjectTab(tab.id)}
                  className={`pb-2.5 px-3 whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${
                    isActive
                      ? 'border-neutral-900 text-neutral-900 font-semibold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Content Viewport */}
      <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {restoreFeedback && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{restoreFeedback}</span>
          </div>
        )}

        {/* 1. OVERVIEW TAB */}
        {activeProjectTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 bg-white border border-neutral-200/90 rounded-xl p-5 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Project Goal & Vision
                </h3>
                <p className="text-sm text-neutral-800 leading-relaxed font-medium">
                  {memory?.goal}
                </p>

                <div className="pt-3 border-t border-neutral-100 space-y-2">
                  <h4 className="text-xs font-semibold text-neutral-900">Current Focus State</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {memory?.currentState}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-900">Next Action:</span>
                  <span className="text-neutral-700">{memory?.nextAction}</span>
                </div>
              </div>

              {/* Status matrix */}
              <div className="bg-white border border-neutral-200/90 rounded-xl p-5 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Continuity Integrity
                </h3>
                <div className="space-y-2 text-xs divide-y divide-neutral-100">
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-neutral-500">Source of Truth:</span>
                    <span className="font-semibold text-emerald-700">Project Permanent Memory</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-neutral-500">Active AI Workspace:</span>
                    <span className="font-medium text-neutral-900">{project.currentAIName}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-neutral-500">Decisions Locked:</span>
                    <span className="font-mono font-bold text-neutral-900">{memory?.decisions.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-neutral-500">Completed Modules:</span>
                    <span className="font-mono font-bold text-neutral-900">{memory?.completedWork.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-neutral-500">Pending Tasks:</span>
                    <span className="font-mono font-bold text-neutral-900">{memory?.pendingTasks.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockers alert if any */}
            {memory?.blockers && memory.blockers.length > 0 && (
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Unresolved Project Blocker (1 Active)</span>
                </div>
                <p className="text-xs text-neutral-700">
                  {memory.blockers[0].issue}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 2. PROJECT MEMORY TAB */}
        {activeProjectTab === 'memory' && (
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200/90 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Permanent Memory Architecture
                </h3>
                <span className="text-xs font-mono text-emerald-700 font-semibold">
                  Zero Prompt Amnesia
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                CONTINUA decouples your project's permanent memory from any single AI's ephemeral chat context window. All decisions, requirements, code artifacts, and blockers live here.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-100 text-xs">
                <div>
                  <span className="font-semibold text-neutral-900 block mb-1">Primary Goal</span>
                  <p className="text-neutral-600">{memory?.goal}</p>
                </div>
                <div>
                  <span className="font-semibold text-neutral-900 block mb-1">Conversation Summary</span>
                  <p className="text-neutral-600">{memory?.conversationSummary}</p>
                </div>
              </div>
            </div>

            {/* Requirements list */}
            <div className="bg-white border border-neutral-200/90 rounded-xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Project Requirements & Specs
              </h3>
              <div className="divide-y divide-neutral-100 text-xs">
                {memory?.requirements.map((req) => (
                  <div key={req.id} className="py-2.5 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-neutral-900">{req.title}</p>
                      <p className="text-[11px] text-neutral-500">Source: {req.source} · {req.date}</p>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-600">{req.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI History */}
            <div className="bg-white border border-neutral-200/90 rounded-xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                AI Engines Used Across Project Lifetime
              </h3>
              <div className="divide-y divide-neutral-100 text-xs">
                {memory?.aiHistory.map((h, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-neutral-900">{h.name}</p>
                      <p className="text-[11px] text-neutral-500">Dates: {h.datesUsed} · Completed: {h.completedItems}</p>
                    </div>
                    <span className="font-mono text-neutral-600 tabular-nums">
                      {h.tokensHandled.toLocaleString()} tokens handled
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. DECISIONS TAB */}
        {activeProjectTab === 'decisions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Architectural & Product Decisions
                </h3>
                <p className="text-xs text-neutral-500">
                  Decisions made in chats are indexed here so new AI sessions never contradict established choices.
                </p>
              </div>
              <button
                onClick={() => setIsAddingDecision(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Decision</span>
              </button>
            </div>

            {/* Add Decision Form */}
            {isAddingDecision && (
              <form onSubmit={handleAddDecision} className="p-4 bg-white border border-neutral-300 rounded-xl space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Decision</label>
                  <input
                    type="text"
                    value={newDecisionText}
                    onChange={(e) => setNewDecisionText(e.target.value)}
                    placeholder="e.g. Use PostgreSQL for audit transactions"
                    className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Reason</label>
                  <input
                    type="text"
                    value={newDecisionReason}
                    onChange={(e) => setNewDecisionReason(e.target.value)}
                    placeholder="e.g. ACID compliance required by university placement guidelines"
                    className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button type="submit" className="px-3 py-1 text-xs font-bold text-white bg-neutral-900 rounded">
                    Save Decision
                  </button>
                  <button type="button" onClick={() => setIsAddingDecision(false)} className="px-3 py-1 text-xs text-neutral-600 hover:text-neutral-900">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Decisions List */}
            <div className="bg-white border border-neutral-200/90 rounded-xl overflow-hidden divide-y divide-neutral-100">
              {memory?.decisions.map((dec) => (
                <div key={dec.id} className="p-4 flex items-start justify-between gap-4 hover:bg-neutral-50/60 transition-colors">
                  <div className="space-y-1 min-w-0 flex-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 text-sm">{dec.decision}</span>
                      {dec.pinned && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-medium">
                          <Pin className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-600 leading-relaxed">{dec.reason}</p>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400 pt-1">
                      <span>Source: {dec.sourceTitle}</span>
                      <span>·</span>
                      <span>{dec.date}</span>
                      {dec.category && (
                        <>
                          <span>·</span>
                          <span className="font-mono">{dec.category}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleDecisionPin(project.id, dec.id)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded transition-colors"
                      title="Toggle pin"
                    >
                      <Pin className={`w-3.5 h-3.5 ${dec.pinned ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => deleteProjectDecision(project.id, dec.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 rounded transition-colors"
                      title="Delete decision"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TASKS TAB */}
        {activeProjectTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-900">Sprint Tasks & Backlog</h3>
              <form onSubmit={handleAddTask} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Add new pending task..."
                  className="px-3 py-1.5 text-xs border border-neutral-300 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
                <button type="submit" className="px-3 py-1.5 text-xs font-bold text-white bg-neutral-900 rounded-lg">
                  Add Task
                </button>
              </form>
            </div>

            <div className="bg-white border border-neutral-200/90 rounded-xl overflow-hidden divide-y divide-neutral-100 text-xs">
              {memory?.pendingTasks.map((task) => (
                <div key={task.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTaskStatus(project.id, task.id)}
                      className="rounded border-neutral-300 text-neutral-900 focus:ring-0 cursor-pointer"
                    />
                    <span className={`font-medium ${task.status === 'completed' ? 'line-through text-neutral-400' : 'text-neutral-900'}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-500 font-mono text-[11px]">
                    <span className={task.priority === 'high' ? 'text-red-600 font-semibold' : ''}>
                      {task.priority.toUpperCase()}
                    </span>
                    {task.due && <span>Due: {task.due}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. FILES TAB */}
        {activeProjectTab === 'files' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-900">Project Files & Code Artifacts</h3>
            <div className="bg-white border border-neutral-200/90 rounded-xl overflow-hidden divide-y divide-neutral-100 text-xs">
              {projectFiles.map((file) => (
                <div key={file.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {file.source === 'github' ? (
                      <Github className="w-4 h-4 text-neutral-800 shrink-0" />
                    ) : file.source === 'gdrive' ? (
                      <HardDrive className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-neutral-500 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-neutral-900 truncate">{file.name}</p>
                      <p className="text-[11px] text-neutral-500 truncate">{file.memoryPurpose || file.contentSnippet}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-500 font-mono text-[11px] shrink-0">
                    <span>{file.size}</span>
                    <span>{file.source.toUpperCase()}</span>
                    {file.isProjectMemorySource && (
                      <span className="text-emerald-700 font-semibold">Memory Source</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SNAPSHOTS TAB */}
        {activeProjectTab === 'snapshots' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Work Snapshots (Time Machine)</h3>
              <p className="text-xs text-neutral-500">
                Snapshots represent exact milestone states. Restoring always branches safely to prevent accidental overwrite of existing work.
              </p>
            </div>

            <div className="space-y-3">
              {projectSnapshots.map((snap) => (
                <div key={snap.id} className="bg-white border border-neutral-200/90 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-900">
                        Snapshot #{snap.snapshotNumber} — {snap.name}
                      </span>
                      <span className="text-neutral-400">·</span>
                      <span className="text-neutral-500 font-mono">{snap.timestamp}</span>
                    </div>
                    <p className="text-neutral-600">{snap.stateSummary}</p>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 pt-1">
                      <span>{snap.decisionsCount} decisions</span>
                      <span>·</span>
                      <span>{snap.completedCount} completed</span>
                      <span>·</span>
                      <span>{snap.pendingCount} pending</span>
                      <span>·</span>
                      <span className="font-mono text-emerald-700">~{snap.compressionRatio}% compression</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleRestoreSnapshot(snap.snapshotNumber)}
                      className="px-3 py-1.5 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                      title="Safely restore into a new working branch"
                    >
                      Restore into Branch
                    </button>
                    <button
                      onClick={() => setIsHandoffModalOpen(true)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      Create Handoff
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. HANDOFFS TAB */}
        {activeProjectTab === 'handoffs' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-900">Generated Continuation Packages</h3>
            <div className="space-y-3">
              {projectHandoffs.map((pkg) => (
                <div key={pkg.id} className="bg-white border border-neutral-200/90 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-sm">Package #{pkg.packageNumber}</span>
                    <span className="font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {pkg.originalTokens.toLocaleString()} → {pkg.compressedTokens.toLocaleString()} tokens (~{pkg.compressionRatio}% smaller)
                    </span>
                  </div>
                  <p className="text-neutral-700">{pkg.summary}</p>
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
                    <span>{pkg.sourceAI} ➔ {pkg.destinationAI}</span>
                    <span className="font-mono">{pkg.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. BRANCHES TAB */}
        {activeProjectTab === 'branches' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Project Branches</h3>
                <p className="text-xs text-neutral-500">
                  Branch your project to experiment with alternative architectures without risking current decisions.
                </p>
              </div>
              <button
                onClick={() => setIsAddingBranch(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Branch</span>
              </button>
            </div>

            {isAddingBranch && (
              <form onSubmit={handleCreateBranch} className="p-3.5 bg-white border border-neutral-300 rounded-xl flex items-center gap-2 text-xs">
                <input
                  type="text"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  placeholder="e.g. supabase-alternative-trial"
                  className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
                <button type="submit" className="px-3 py-1.5 font-bold text-white bg-neutral-900 rounded-lg">
                  Create Branch
                </button>
                <button type="button" onClick={() => setIsAddingBranch(false)} className="px-3 py-1.5 text-neutral-600">
                  Cancel
                </button>
              </form>
            )}

            <div className="bg-white border border-neutral-200/90 rounded-xl overflow-hidden divide-y divide-neutral-100 text-xs">
              {project.branches.map((b) => (
                <div key={b} className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-neutral-600" />
                    <span className="font-mono font-semibold text-neutral-900">{b}</span>
                    {project.activeBranch === b && (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Current Active
                      </span>
                    )}
                  </div>
                  {project.activeBranch !== b && (
                    <button
                      onClick={() => switchProjectBranch(project.id, b)}
                      className="px-3 py-1 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
                    >
                      Switch to this branch
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. CHATS TAB */}
        {activeProjectTab === 'chats' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-900">Conversations in this Project</h3>
            <div className="bg-white border border-neutral-200/90 rounded-xl overflow-hidden divide-y divide-neutral-100 text-xs">
              {projectConversations.map((c) => (
                <div 
                  key={c.id} 
                  onClick={() => {
                    setSelectedConversationId(c.id);
                    setCurrentView('chat');
                  }}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-neutral-900 truncate">{c.title}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{c.preview}</p>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-500 font-mono text-[11px] shrink-0">
                    <span>{c.aiProviderName}</span>
                    <span>{c.tokenCount.toLocaleString()} tokens</span>
                    <span>{c.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
