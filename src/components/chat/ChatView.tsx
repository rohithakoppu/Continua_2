import React, { useState, useRef, useEffect } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { HandoffModal } from './HandoffModal';
import { 
  Send, 
  Square, 
  Paperclip, 
  Cpu, 
  Repeat, 
  Sparkles, 
  AlertTriangle, 
  Check, 
  Copy, 
  BookmarkPlus, 
  Github, 
  HardDrive, 
  Calendar, 
  Wrench, 
  Layers, 
  ShieldCheck, 
  ChevronDown,
  Info,
  GitBranch,
  FileCode,
  FileText
} from 'lucide-react';

export function ChatView() {
  const { 
    projects, 
    selectedProjectId, 
    conversations, 
    selectedConversationId, 
    messages, 
    sendMessage, 
    stopGeneration, 
    isGeneratingMessage, 
    contextConflict, 
    resolveConflict, 
    duplicateWorkAlert, 
    resolveDuplicateWork, 
    aiProviders, 
    connectors, 
    tools, 
    files,
    isHandoffModalOpen, 
    setIsHandoffModalOpen, 
    saveWorkSnapshot,
    addProjectDecision,
    setCurrentView,
    setActiveProjectTab
  } = useContinua();

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];
  const conversation = conversations.find(c => c.id === selectedConversationId) || conversations[0];
  const chatMessages = messages[conversation?.id] || [];

  const [inputContent, setInputContent] = useState('');
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isConnectorsOpen, setIsConnectorsOpen] = useState(false);
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{ id: string; name: string; type: string; source: string }[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isGeneratingMessage]);

  const handleSend = async () => {
    if (!inputContent.trim() || isGeneratingMessage) return;
    const text = inputContent;
    setInputContent('');
    const filesToAttach = [...attachedFiles];
    const toolsToAttach = [...selectedTools];
    const connectorsToAttach = [...selectedConnectors];

    // Reset attachments
    setAttachedFiles([]);
    setSelectedTools([]);
    setSelectedConnectors([]);
    setIsAttachOpen(false);
    setIsToolsOpen(false);
    setIsConnectorsOpen(false);

    await sendMessage(text, filesToAttach, toolsToAttach, connectorsToAttach);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const saveResponseToMemory = (text: string) => {
    addProjectDecision(project.id, {
      decision: text.slice(0, 80).replace(/[*#]/g, ''),
      reason: 'Extracted directly from verified AI response into Project Memory.',
      sourceTitle: conversation.title,
      category: 'Architecture'
    });
  };

  const isSessionLimit = (conversation?.tokenCount || 0) >= 40000 || conversation?.hasSessionLimitReached;

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* Top Workspace Session Bar */}
      <div className="h-13 px-5 border-b border-neutral-200/80 bg-white/90 backdrop-blur flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-900 truncate">
                {conversation?.title || 'Session'}
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-[11px] font-mono text-neutral-500">
                {project.name}
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded border border-neutral-200">
                Branch: {project.activeBranch}
              </span>
            </div>
          </div>
        </div>

        {/* Right Session Metrics & AI Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Token Capacity Meter */}
          <div className="hidden sm:flex flex-col items-end text-[10px]">
            <div className="flex items-center gap-1.5 font-mono">
              <span className={isSessionLimit ? 'text-amber-600 font-bold' : 'text-neutral-600'}>
                {(conversation?.tokenCount || 42800).toLocaleString()} / 45,000 tokens
              </span>
              <span className="text-neutral-400">({conversation?.aiProviderName})</span>
            </div>
            <div className="w-28 h-1 bg-neutral-100 rounded-full overflow-hidden mt-1">
              <div 
                className={`h-full rounded-full transition-all ${
                  isSessionLimit ? 'bg-amber-500' : 'bg-neutral-800'
                }`}
                style={{ width: `${Math.min(100, ((conversation?.tokenCount || 42800) / 45000) * 100)}%` }}
              />
            </div>
          </div>

          {/* MAIN HERO ACTION: CONTINUE WITH ANOTHER AI */}
          <button
            onClick={() => setIsHandoffModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            title="Create Continuation Package & transfer without prompt loss"
          >
            <Repeat className="w-3.5 h-3.5 text-emerald-400" />
            <span>Continue with Another AI</span>
          </button>
        </div>
      </div>

      {/* INTELLIGENCE ALERT 1: AI SESSION LIMIT REACHED BANNER */}
      {isSessionLimit && (
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center justify-between text-xs text-amber-900 shrink-0">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>AI Session Token Limit Approaching (42,800 tokens).</strong> All 12 project decisions and code files are permanently safe.
            </span>
          </div>
          <button
            onClick={() => setIsHandoffModalOpen(true)}
            className="px-2.5 py-1 text-xs font-bold text-amber-950 bg-amber-200/80 hover:bg-amber-200 rounded border border-amber-300 transition-colors whitespace-nowrap ml-3"
          >
            Save Work & Prepare Handoff
          </button>
        </div>
      )}

      {/* INTELLIGENCE ALERT 2: CONTEXT CONFLICT DETECTION */}
      {contextConflict && !contextConflict.resolved && (
        <div className="bg-red-50 border-b border-red-200 px-5 py-3 text-xs text-red-900 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-red-950">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>CONTEXT CONFLICT DETECTED</span>
              </div>
              <p className="mt-0.5 text-neutral-700">
                Existing locked project decision: <strong className="text-neutral-900">{contextConflict.existingDecision}</strong>
                <br />
                New AI suggestion: <strong className="text-red-700">{contextConflict.newSuggestion}</strong>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => resolveConflict('keep-existing')}
                className="px-3 py-1 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded transition-colors"
              >
                Keep Firebase
              </button>
              <button
                onClick={() => resolveConflict('accept-new')}
                className="px-3 py-1 text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 hover:bg-neutral-50 rounded transition-colors"
              >
                Accept Supabase
              </button>
              <button
                onClick={() => resolveConflict('compare')}
                className="px-3 py-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 underline"
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTELLIGENCE ALERT 3: DUPLICATE WORK DETECTION */}
      {duplicateWorkAlert && (
        <div className="bg-blue-50 border-b border-blue-200 px-5 py-3 text-xs text-blue-900 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-blue-950">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>DUPLICATE WORK DETECTED</span>
              </div>
              <p className="mt-0.5 text-neutral-700">
                {duplicateWorkAlert.message} (File: <code className="font-mono text-neutral-900">{duplicateWorkAlert.file}</code>)
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => resolveDuplicateWork('review')}
                className="px-3 py-1 text-xs font-semibold text-neutral-900 bg-blue-200 hover:bg-blue-300 rounded transition-colors"
              >
                Review Existing Work
              </button>
              <button
                onClick={() => resolveDuplicateWork('continue')}
                className="px-3 py-1 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded transition-colors"
              >
                Continue Module
              </button>
              <button
                onClick={() => resolveDuplicateWork('branch')}
                className="px-3 py-1 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded transition-colors"
              >
                Create Branch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {chatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          const isSystem = msg.role === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="max-w-2xl mx-auto my-2 p-3 bg-neutral-50 border border-neutral-200/70 rounded-xl text-xs text-neutral-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CONTINUA Session Memory Anchor</span>
                </div>
                <div className="whitespace-pre-line text-neutral-600 leading-relaxed font-sans">
                  {msg.content}
                </div>
              </div>
            );
          }

          return (
            <div 
              key={msg.id} 
              className={`max-w-3xl mx-auto flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              {/* Role Header */}
              <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-neutral-400">
                <span className="font-semibold text-neutral-700">
                  {isUser ? 'You' : conversation.aiProviderName}
                </span>
                <span>·</span>
                <span>{msg.timestamp}</span>
                {msg.tokens && (
                  <>
                    <span>·</span>
                    <span className="font-mono">{msg.tokens} tokens</span>
                  </>
                )}
              </div>

              {/* Message Bubble / Container */}
              <div 
                className={`rounded-2xl p-4 text-sm leading-relaxed max-w-full ${
                  isUser 
                    ? 'bg-neutral-900 text-white rounded-br-xs'
                    : 'bg-[#fafafa] border border-neutral-200/90 text-neutral-900 rounded-bl-xs'
                }`}
              >
                {/* Continuation Callout Flag if restored from handoff */}
                {msg.isContinuationPoint && (
                  <div className="mb-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex items-center justify-between font-medium">
                    <span className="flex items-center gap-1.5">
                      <Repeat className="w-3.5 h-3.5 text-emerald-600" />
                      Continuing from {msg.continuationSnapshot || 'Snapshot #08'}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono">Zero prompt re-typing</span>
                  </div>
                )}

                {/* Attached Connectors / Files Pills */}
                {msg.attachedFiles && msg.attachedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2 pb-2 border-b border-neutral-200/60">
                    {msg.attachedFiles.map(f => (
                      <span key={f.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-neutral-100 text-neutral-700 border border-neutral-200 font-mono">
                        <FileCode className="w-3 h-3 text-neutral-500" />
                        {f.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Message Body Content */}
                <div className="whitespace-pre-wrap font-sans text-[13.5px] leading-relaxed select-text space-y-2">
                  {msg.content}
                </div>

                {/* AI Message Action Bar */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-neutral-200/50 flex items-center gap-2 text-xs text-neutral-400">
                    <button
                      onClick={() => copyText(msg.id, msg.content)}
                      className="p-1 hover:text-neutral-700 transition-colors flex items-center gap-1"
                      title="Copy response"
                    >
                      {copiedMessageId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[11px] text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => saveResponseToMemory(msg.content)}
                      className="p-1 hover:text-neutral-700 transition-colors flex items-center gap-1"
                      title="Save as architectural decision in Project Memory"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Add to Memory</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Streaming Loading Indicator */}
        {isGeneratingMessage && (
          <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs text-neutral-500 py-2">
            <div className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
            <span className="font-medium">{conversation.aiProviderName} is synthesizing response with project memory...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK SUGGESTION PILLS FOR SPEEDY EVALUATION */}
      <div className="px-5 py-2 border-t border-neutral-100 bg-[#fbfbfb] overflow-x-auto flex items-center gap-2 text-xs shrink-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 shrink-0">
          Try:
        </span>
        <button
          onClick={() => sendMessage('Where is authentication handled in our repository?')}
          className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-md text-neutral-700 whitespace-nowrap transition-colors"
        >
          Where is authentication handled?
        </button>
        <button
          onClick={() => sendMessage('Analyze my latest project files.', [], ['tool-code-analyzer'])}
          className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-md text-neutral-700 whitespace-nowrap transition-colors"
        >
          Run Code Analyzer on repo
        </button>
        <button
          onClick={() => sendMessage('What do I have tomorrow on my calendar?')}
          className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-md text-neutral-700 whitespace-nowrap transition-colors"
        >
          Check Google Calendar
        </button>
        <button
          onClick={() => sendMessage('We should switch our database to Supabase instead of Firebase.')}
          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md text-amber-900 whitespace-nowrap transition-colors"
        >
          Test Conflict (Supabase)
        </button>
        <button
          onClick={() => sendMessage('Can you build me a new login page from scratch?')}
          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md text-blue-900 whitespace-nowrap transition-colors"
        >
          Test Duplicate Work Alert
        </button>
        <button
          onClick={() => setIsHandoffModalOpen(true)}
          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md text-emerald-900 font-semibold whitespace-nowrap transition-colors"
        >
          Simulate AI Session Handoff
        </button>
      </div>

      {/* Composer Area */}
      <div className="p-4 border-t border-neutral-200/80 bg-white shrink-0">
        <div className="max-w-3xl mx-auto">
          {/* Active Attachments Preview Bar */}
          {(attachedFiles.length > 0 || selectedTools.length > 0 || selectedConnectors.length > 0) && (
            <div className="flex flex-wrap items-center gap-1.5 pb-2 text-xs">
              {attachedFiles.map(f => (
                <span key={f.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-800 text-[11px] font-mono">
                  <FileText className="w-3 h-3 text-neutral-500" />
                  {f.name}
                  <button onClick={() => setAttachedFiles(prev => prev.filter(x => x.id !== f.id))} className="ml-1 text-neutral-400 hover:text-neutral-700">×</button>
                </span>
              ))}
              {selectedTools.map(t => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-800 text-[11px]">
                  <Wrench className="w-3 h-3" />
                  {tools.find(tool => tool.id === t)?.name || t}
                  <button onClick={() => setSelectedTools(prev => prev.filter(x => x !== t))} className="ml-1 text-purple-400 hover:text-purple-700">×</button>
                </span>
              ))}
              {selectedConnectors.map(c => (
                <span key={c} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
                  <ShieldCheck className="w-3 h-3" />
                  {c}
                  <button onClick={() => setSelectedConnectors(prev => prev.filter(x => x !== c))} className="ml-1 text-emerald-400 hover:text-emerald-700">×</button>
                </span>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="border border-neutral-300 rounded-xl bg-white shadow-2xs focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900 transition-all p-2.5">
            <textarea
              ref={textareaRef}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about the project, analyze repository files, or continue work..."
              rows={2}
              className="w-full text-xs text-neutral-900 placeholder:text-neutral-400 resize-none focus:outline-none leading-relaxed bg-transparent"
            />

            {/* Bottom Composer Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
              <div className="flex items-center gap-1.5 text-neutral-500">
                {/* Attach from Drive / GitHub */}
                <div className="relative">
                  <button
                    onClick={() => setIsAttachOpen(!isAttachOpen)}
                    className="p-1.5 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors flex items-center gap-1"
                    title="Attach repository code or Google Drive specifications"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px] font-medium">Attach</span>
                  </button>

                  {/* Attachment Popover */}
                  {isAttachOpen && (
                    <div className="absolute bottom-8 left-0 w-64 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 z-30 space-y-1 text-xs">
                      <div className="px-2 py-1 text-[11px] font-semibold text-neutral-600 uppercase">
                        Connected Sources
                      </div>
                      <button
                        onClick={() => {
                          setAttachedFiles(prev => [...prev, { id: 'file-1', name: 'placement-requirements.pdf', type: 'pdf', source: 'Google Drive' }]);
                          setIsAttachOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 hover:bg-neutral-50 rounded flex items-center gap-2"
                      >
                        <HardDrive className="w-3.5 h-3.5 text-blue-600" />
                        <span className="truncate">placement-requirements.pdf (Drive)</span>
                      </button>
                      <button
                        onClick={() => {
                          setAttachedFiles(prev => [...prev, { id: 'file-4', name: 'firebase.ts', type: 'ts', source: 'GitHub' }]);
                          setIsAttachOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 hover:bg-neutral-50 rounded flex items-center gap-2"
                      >
                        <Github className="w-3.5 h-3.5 text-neutral-800" />
                        <span className="truncate">firebase.ts (GitHub)</span>
                      </button>
                      <button
                        onClick={() => {
                          setAttachedFiles(prev => [...prev, { id: 'file-6', name: 'dashboard.tsx', type: 'tsx', source: 'GitHub' }]);
                          setIsAttachOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 hover:bg-neutral-50 rounded flex items-center gap-2"
                      >
                        <Github className="w-3.5 h-3.5 text-neutral-800" />
                        <span className="truncate">dashboard.tsx (GitHub)</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Tools Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsToolsOpen(!isToolsOpen)}
                    className="p-1.5 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors flex items-center gap-1"
                    title="Invoke installed tool plugins"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px] font-medium">Tools</span>
                  </button>

                  {isToolsOpen && (
                    <div className="absolute bottom-8 left-0 w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 z-30 space-y-1 text-xs">
                      <div className="px-2 py-1 text-[11px] font-semibold text-neutral-600 uppercase">
                        Installed Tools
                      </div>
                      {tools.filter(t => t.installed).map(tool => (
                        <button
                          key={tool.id}
                          onClick={() => {
                            setSelectedTools(prev => prev.includes(tool.id) ? prev : [...prev, tool.id]);
                            setIsToolsOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 hover:bg-neutral-50 rounded flex items-center justify-between"
                        >
                          <span className="truncate">{tool.name}</span>
                          {selectedTools.includes(tool.id) && <Check className="w-3 h-3 text-emerald-600" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Connectors Status */}
                <div className="relative">
                  <button
                    onClick={() => setIsConnectorsOpen(!isConnectorsOpen)}
                    className="p-1.5 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline text-[11px] font-medium">Connectors</span>
                  </button>

                  {isConnectorsOpen && (
                    <div className="absolute bottom-8 left-0 w-60 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 z-30 space-y-1 text-xs">
                      <div className="px-2 py-1 text-[11px] font-semibold text-neutral-600 uppercase">
                        Connected Services
                      </div>
                      {connectors.map(c => (
                        <div key={c.id} className="flex items-center justify-between px-2 py-1.5 hover:bg-neutral-50 rounded">
                          <span className="truncate">{c.name}</span>
                          <span className={`text-[10px] font-mono ${c.status === 'connected' ? 'text-emerald-700' : 'text-neutral-400'}`}>
                            {c.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Send / Stop Buttons */}
              <div className="flex items-center gap-2">
                {isGeneratingMessage ? (
                  <button
                    onClick={stopGeneration}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    <Square className="w-3 h-3 fill-current" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    disabled={!inputContent.trim()}
                    onClick={handleSend}
                    className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                      inputContent.trim()
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                        : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-600 mt-1 px-1">
            <span>Shift + Enter for new line · Project memory continuously anchored</span>
            <span className="hidden sm:inline">CONTINUA Core Protocol v2.5</span>
          </div>
        </div>
      </div>

      {/* Cross-AI Handoff Centerpiece Modal */}
      <HandoffModal
        isOpen={isHandoffModalOpen}
        onClose={() => setIsHandoffModalOpen(false)}
      />
    </div>
  );
}
