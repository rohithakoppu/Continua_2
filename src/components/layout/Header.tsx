import React from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  Search, 
  Bell, 
  Play, 
  Layers, 
  ExternalLink, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export function Header() {
  const { 
    currentView, 
    setCurrentView, 
    projects, 
    selectedProjectId, 
    conversations, 
    selectedConversationId,
    setIsSearchOpen, 
    setIsNotificationsOpen, 
    notifications,
    launchDemoStory 
  } = useContinua();

  const currentProject = projects.find(p => p.id === selectedProjectId);
  const currentConv = conversations.find(c => c.id === selectedConversationId);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-14 border-b border-neutral-200/80 bg-white/95 backdrop-blur px-5 flex items-center justify-between z-20 shrink-0">
      {/* Zone 1: Contextual Breadcrumb Path */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 min-w-0">
        <button 
          onClick={() => setCurrentView('home')}
          className="font-medium text-neutral-800 hover:text-neutral-900 transition-colors"
        >
          CONTINUA
        </button>
        
        {currentView === 'home' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-600 font-medium truncate">Workspace Overview</span>
          </>
        )}

        {(currentView === 'chat' || currentView === 'new-chat') && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <button 
              onClick={() => setCurrentView('project-detail')}
              className="hover:text-neutral-800 transition-colors truncate max-w-[140px]"
            >
              {currentProject?.name || 'Project'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium truncate max-w-[200px]">
              {currentConv?.title || 'New Session'}
            </span>
          </>
        )}

        {currentView === 'project-detail' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <button 
              onClick={() => setCurrentView('projects')}
              className="hover:text-neutral-800 transition-colors"
            >
              Projects
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-900 font-medium truncate max-w-[240px]">
              {currentProject?.name}
            </span>
          </>
        )}

        {currentView === 'projects' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">Projects Repository</span>
          </>
        )}

        {currentView === 'connectors' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">Connected Services</span>
          </>
        )}

        {currentView === 'tools' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">Tools & Plugins</span>
          </>
        )}

        {currentView === 'handoffs' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">Cross-AI Handoff Packages</span>
          </>
        )}

        {currentView === 'library' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">Files & Library</span>
          </>
        )}

        {currentView === 'images' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">Generated & Project Images</span>
          </>
        )}

        {currentView === 'ai-connections' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">AI Engine Workspaces</span>
          </>
        )}

        {currentView === 'scheduled' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">Scheduled Work</span>
          </>
        )}

        {currentView === 'settings' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">Settings & Memory Config</span>
          </>
        )}

        {currentView === 'help' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-800 font-medium">Architecture & Continuity Guide</span>
          </>
        )}
      </div>

      {/* Zone 2: Search Bar Affordance */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-neutral-400 bg-neutral-100/80 hover:bg-neutral-100 hover:text-neutral-600 rounded-lg border border-neutral-200/60 transition-colors"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">Search decisions, files, projects, or memory...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-neutral-500 border border-neutral-200 rounded shrink-0 shadow-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Actions & Controls */}
      <div className="flex items-center gap-2">
        {/* Launch Demo Story CTA for Judges */}
        <button
          onClick={launchDemoStory}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
          title="Step-by-step interactive 17-step demo story"
        >
          <Play className="w-3 h-3 fill-emerald-700 text-emerald-700 shrink-0" />
          <span>Launch Demo Story</span>
        </button>

        {/* View Landing Page Switcher */}
        <button
          onClick={() => setCurrentView(currentView === 'landing' ? 'home' : 'landing')}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
            currentView === 'landing'
              ? 'bg-neutral-900 text-white border-neutral-900'
              : 'text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-50 border-neutral-200'
          }`}
          title="Toggle between Workspace and Landing Page view"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{currentView === 'landing' ? 'Workspace' : 'Landing'}</span>
        </button>

        {/* Search trigger on mobile */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors md:hidden"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Popover Trigger */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-1.5 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        {/* Status Pill */}
        <div className="hidden lg:flex items-center gap-1.5 pl-2 text-xs text-neutral-500 border-l border-neutral-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-medium text-neutral-700">Memory Guarded</span>
        </div>
      </div>
    </header>
  );
}
