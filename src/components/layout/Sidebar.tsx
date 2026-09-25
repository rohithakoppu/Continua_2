import React from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  Plus, 
  Search, 
  Home, 
  FolderKanban, 
  Files, 
  Image as ImageIcon, 
  PlugZap, 
  Wrench, 
  Cpu, 
  Repeat, 
  Clock, 
  Settings, 
  HelpCircle,
  MessageSquare,
  Shield,
  ChevronDown
} from 'lucide-react';

export function Sidebar() {
  const { 
    currentView, 
    setCurrentView, 
    createNewChat, 
    setIsSearchOpen, 
    projects, 
    conversations, 
    selectedConversationId, 
    setSelectedConversationId, 
    setSelectedProjectId,
    connectors,
    tools,
    handoffPackages,
    snapshots
  } = useContinua();

  const connectedCount = connectors.filter(c => c.status === 'connected').length;
  const installedToolsCount = tools.filter(t => t.installed).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, count: null },
    { id: 'projects', label: 'Projects', icon: FolderKanban, count: projects.length },
    { id: 'library', label: 'Library', icon: Files, count: 10 },
    { id: 'images', label: 'Images', icon: ImageIcon, count: 3 },
    { id: 'connectors', label: 'Connectors', icon: PlugZap, count: `${connectedCount} active` },
    { id: 'tools', label: 'Tools / Plugins', icon: Wrench, count: `${installedToolsCount} on` },
    { id: 'ai-connections', label: 'AI Connections', icon: Cpu, count: 4 },
    { id: 'handoffs', label: 'Handoffs', icon: Repeat, count: handoffPackages.length },
    { id: 'scheduled', label: 'Scheduled Work', icon: Clock, count: 3 },
    { id: 'settings', label: 'Settings', icon: Settings, count: null },
    { id: 'help', label: 'Continuity Guide', icon: HelpCircle, count: null },
  ];

  return (
    <aside className="w-64 bg-[#fcfcfc] border-r border-neutral-200/90 flex flex-col h-full shrink-0 select-none z-10">
      {/* Brand Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-200/60">
        <button 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2.5 group text-left"
        >
          {/* Original CONTINUA Identity Glyph: Interconnected Continuity Node */}
          <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
              <path d="M7 12a5 5 0 0 1 5-5c3 0 4.5 2 6 5 1.5 3 3 5 6 5" strokeLinecap="round" />
              <path d="M17 12a5 5 0 0 1-5 5c-3 0-4.5-2-6-5-1.5-3-3-5-6-5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-neutral-900 font-sans block leading-none">
              CONTINUA
            </span>
            <span className="text-[10px] text-neutral-600 font-medium tracking-wide">
              Keep the Work
            </span>
          </div>
        </button>
      </div>

      {/* Primary Actions: New Chat & Search */}
      <div className="p-3 space-y-1.5">
        <button
          onClick={() => createNewChat()}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950 rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between py-1.5 px-3 text-xs text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors border border-transparent hover:border-neutral-200/60"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">⌘K</span>
        </button>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-neutral-200/80 text-neutral-900 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.count !== null && (
                <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}

        {/* Recent Conversations Subsection */}
        <div className="pt-4 pb-1">
          <div className="px-2.5 pb-1 flex items-center justify-between text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            <span>Recent Chats</span>
          </div>
          <div className="space-y-0.5">
            {conversations.slice(0, 4).map((conv) => {
              const isSelected = selectedConversationId === conv.id && currentView === 'chat';
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversationId(conv.id);
                    setSelectedProjectId(conv.projectId);
                    setCurrentView('chat');
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-2 truncate ${
                    isSelected
                      ? 'bg-neutral-200/90 text-neutral-900 font-medium'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
                  }`}
                  title={conv.title}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate">{conv.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Continuity Status Card */}
        <div className="pt-3 px-1">
          <div className="p-2.5 bg-neutral-100/70 border border-neutral-200/60 rounded-lg text-neutral-600">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 mb-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Your work is protected.</span>
            </div>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {projects.length} active projects · {snapshots.length} saved snapshots · {handoffPackages.length} handoff packages
            </p>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-neutral-200/80 bg-white/50">
        <button 
          onClick={() => setCurrentView('settings')}
          className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-neutral-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/src/assets/images/avatar_demo_user_1790366914203.jpg"
              alt="Rohitha Koppu"
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover border border-neutral-200 shrink-0"
              onError={(e) => {
                // Fallback container
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="truncate">
              <p className="text-xs font-semibold text-neutral-900 leading-tight truncate">
                Rohitha Koppu
              </p>
              <p className="text-[10px] text-neutral-600 truncate">
                Demo Developer Plan
              </p>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        </button>
      </div>
    </aside>
  );
}
