import React from 'react';
import { ContinuaProvider, useContinua } from './context/ContinuaContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { HomeView } from './components/home/HomeView';
import { ChatView } from './components/chat/ChatView';
import { ProjectsView } from './components/projects/ProjectsView';
import { ProjectDetailView } from './components/projects/ProjectDetailView';
import { ConnectorsView } from './components/connectors/ConnectorsView';
import { ToolsView } from './components/tools/ToolsView';
import { LibraryView } from './components/library/LibraryView';
import { ImagesView } from './components/images/ImagesView';
import { HandoffsView } from './components/handoffs/HandoffsView';
import { AIConnectionsView } from './components/ai/AIConnectionsView';
import { ScheduledView } from './components/scheduled/ScheduledView';
import { SettingsView } from './components/settings/SettingsView';
import { HelpView } from './components/help/HelpView';
import { LandingView } from './components/landing/LandingView';
import { SearchModal } from './components/search/SearchModal';
import { NotificationsDrawer } from './components/notifications/NotificationsDrawer';
import { GuidedDemoModal } from './components/demo/GuidedDemoModal';

function WorkspaceLayout() {
  const { currentView } = useContinua();

  // If in pure landing page mode, render landing with top header
  if (currentView === 'landing') {
    return (
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#fafafa]">
        <Header />
        <LandingView />
        <SearchModal />
        <NotificationsDrawer />
        <GuidedDemoModal />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fafafa]">
      {/* Collapsible Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <Header />

        <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {currentView === 'home' && <HomeView />}
          {(currentView === 'chat' || currentView === 'new-chat') && <ChatView />}
          {currentView === 'projects' && <ProjectsView />}
          {currentView === 'project-detail' && <ProjectDetailView />}
          {currentView === 'connectors' && <ConnectorsView />}
          {currentView === 'tools' && <ToolsView />}
          {currentView === 'library' && <LibraryView />}
          {currentView === 'images' && <ImagesView />}
          {currentView === 'handoffs' && <HandoffsView />}
          {currentView === 'ai-connections' && <AIConnectionsView />}
          {currentView === 'scheduled' && <ScheduledView />}
          {currentView === 'settings' && <SettingsView />}
          {currentView === 'help' && <HelpView />}
        </main>
      </div>

      {/* Global Modals & Intelligence Overlays */}
      <SearchModal />
      <NotificationsDrawer />
      <GuidedDemoModal />
    </div>
  );
}

export default function App() {
  return (
    <ContinuaProvider>
      <WorkspaceLayout />
    </ContinuaProvider>
  );
}
