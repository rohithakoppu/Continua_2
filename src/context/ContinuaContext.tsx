import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  ViewMode, 
  Project, 
  ProjectMemory, 
  WorkSnapshot, 
  HandoffPackage, 
  Conversation, 
  Message, 
  Connector, 
  ToolPlugin, 
  FileItem, 
  ImageItem, 
  ScheduledTask, 
  ContinuaNotification,
  AIProvider,
  Decision,
  ContextConflict
} from '../types';
import { 
  initialProjects, 
  initialProjectMemories, 
  initialSnapshots, 
  initialHandoffPackages, 
  initialConversations, 
  initialMessages, 
  initialConnectors, 
  initialTools, 
  initialFiles, 
  initialImages, 
  initialScheduledTasks, 
  initialNotifications, 
  initialAIProviders 
} from '../data/seedData';

interface SearchResult {
  id: string;
  type: 'conversation' | 'decision' | 'file' | 'project' | 'connector' | 'snapshot';
  title: string;
  snippet: string;
  sourceLabel: string;
  action: () => void;
}

interface ContinuaContextType {
  // Navigation
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  selectedConversationId: string;
  setSelectedConversationId: (id: string) => void;
  activeProjectTab: string;
  setActiveProjectTab: (tab: string) => void;
  
  // Modals & Panels
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isHandoffModalOpen: boolean;
  setIsHandoffModalOpen: (open: boolean) => void;
  isGuidedDemoOpen: boolean;
  setIsGuidedDemoOpen: (open: boolean) => void;
  demoStepIndex: number;
  setDemoStepIndex: (step: number) => void;

  // State
  projects: Project[];
  projectMemories: Record<string, ProjectMemory>;
  snapshots: WorkSnapshot[];
  handoffPackages: HandoffPackage[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  connectors: Connector[];
  tools: ToolPlugin[];
  files: FileItem[];
  images: ImageItem[];
  scheduledTasks: ScheduledTask[];
  notifications: ContinuaNotification[];
  aiProviders: AIProvider[];
  
  // Intelligence Banners
  contextConflict: ContextConflict | null;
  duplicateWorkAlert: { detected: boolean; module: string; file: string; message: string } | null;
  isGeneratingMessage: boolean;
  
  // Actions
  createNewChat: (projectId?: string, aiId?: string) => void;
  sendMessage: (
    content: string, 
    attachedFiles?: { id: string; name: string; type: string; source: string }[], 
    attachedTools?: string[], 
    attachedConnectors?: string[]
  ) => Promise<void>;
  stopGeneration: () => void;
  saveWorkSnapshot: (projectId: string, reason?: string) => WorkSnapshot;
  createHandoffPackage: (projectId: string, sourceAI: string, destAI: string) => HandoffPackage;
  switchAIEngine: (destAIId: string) => void;
  resolveConflict: (action: 'keep-existing' | 'accept-new' | 'compare') => void;
  resolveDuplicateWork: (action: 'review' | 'continue' | 'branch') => void;
  connectConnector: (connectorId: string) => void;
  disconnectConnector: (connectorId: string) => void;
  toggleConnectorPermission: (connectorId: string, permissionId: string) => void;
  toggleToolInstalled: (toolId: string) => void;
  addFileToProjectMemory: (fileId: string, purpose: string) => void;
  createProjectBranch: (projectId: string, branchName: string) => void;
  switchProjectBranch: (projectId: string, branchName: string) => void;
  addProjectDecision: (projectId: string, decision: { decision: string; reason: string; sourceTitle: string; category?: string }) => void;
  toggleDecisionPin: (projectId: string, decisionId: string) => void;
  deleteProjectDecision: (projectId: string, decisionId: string) => void;
  toggleTaskStatus: (projectId: string, taskId: string) => void;
  addProjectTask: (projectId: string, task: { title: string; priority: 'high' | 'medium' | 'low' }) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  runScheduledTaskNow: (taskId: string) => void;
  toggleScheduledTask: (taskId: string) => void;
  uploadFileDemo: (name: string, type: 'document' | 'image' | 'code' | 'spreadsheet') => void;
  searchAcrossAll: (query: string) => SearchResult[];
  launchDemoStory: () => void;
}

const ContinuaContext = createContext<ContinuaContextType | undefined>(undefined);

export function ContinuaProvider({ children }: { children: ReactNode }) {
  // Navigation state
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-placement');
  const [selectedConversationId, setSelectedConversationId] = useState<string>('conv-placement-1');
  const [activeProjectTab, setActiveProjectTab] = useState<string>('overview');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHandoffModalOpen, setIsHandoffModalOpen] = useState(false);
  const [isGuidedDemoOpen, setIsGuidedDemoOpen] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(0);

  // Entities state
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [projectMemories, setProjectMemories] = useState<Record<string, ProjectMemory>>(initialProjectMemories);
  const [snapshots, setSnapshots] = useState<WorkSnapshot[]>(initialSnapshots);
  const [handoffPackages, setHandoffPackages] = useState<HandoffPackage[]>(initialHandoffPackages);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [connectors, setConnectors] = useState<Connector[]>(initialConnectors);
  const [tools, setTools] = useState<ToolPlugin[]>(initialTools);
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>(initialScheduledTasks);
  const [notifications, setNotifications] = useState<ContinuaNotification[]>(initialNotifications);
  const [aiProviders, setAiProviders] = useState<AIProvider[]>(initialAIProviders);

  // Intelligence alerts state
  const [contextConflict, setContextConflict] = useState<ContextConflict | null>(null);
  const [duplicateWorkAlert, setDuplicateWorkAlert] = useState<{ detected: boolean; module: string; file: string; message: string } | null>(null);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

  // Keyboard shortcut for Cmd+K Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Create New Chat
  const createNewChat = (projId?: string, aiId?: string) => {
    const targetProjId = projId || selectedProjectId;
    const targetProject = projects.find(p => p.id === targetProjId) || projects[0];
    const targetAi = aiProviders.find(a => a.id === (aiId || targetProject.currentAIId)) || aiProviders[0];

    const newChatId = `conv-${Date.now()}`;
    const newTitle = `${targetProject.name} — Session ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    
    const newConv: Conversation = {
      id: newChatId,
      projectId: targetProjId,
      projectName: targetProject.name,
      title: newTitle,
      aiProviderId: targetAi.id,
      aiProviderName: targetAi.name,
      modelName: targetAi.model,
      messageCount: 0,
      lastUpdated: 'Just now',
      preview: 'New conversation started with permanent project memory connected.',
      tokenCount: 150,
      branchName: targetProject.activeBranch
    };

    setConversations(prev => [newConv, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newChatId]: [
        {
          id: `sys-${Date.now()}`,
          conversationId: newChatId,
          role: 'system',
          content: `Project memory loaded for **${targetProject.name}** (Branch: \`${targetProject.activeBranch}\`).\n\n• **Goal**: ${projectMemories[targetProjId]?.goal || targetProject.description}\n• **Decisions**: ${projectMemories[targetProjId]?.decisions.length || 0} active decisions\n• **Source Files**: Connected & available\n\nCONTINUA is maintaining the permanent source of truth for this session.`,
          timestamp: 'Just now',
          tokens: 150
        }
      ]
    }));

    setSelectedProjectId(targetProjId);
    setSelectedConversationId(newChatId);
    setCurrentView('chat');
  };

  // Send message with deterministic intelligence & simulation
  const sendMessage = async (
    content: string, 
    attachedFiles?: { id: string; name: string; type: string; source: string }[], 
    attachedTools?: string[], 
    attachedConnectors?: string[]
  ) => {
    if (!content.trim() || isGeneratingMessage) return;

    const convId = selectedConversationId;
    const currentConv = conversations.find(c => c.id === convId);
    const projId = currentConv?.projectId || selectedProjectId;
    const projMemory = projectMemories[projId];

    const userMsgId = `usr-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      conversationId: convId,
      role: 'user',
      content: content.trim(),
      timestamp: 'Just now',
      attachedFiles,
      attachedTools,
      attachedConnectors,
      tokens: Math.round(content.length / 4)
    };

    // Add user message
    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), userMsg]
    }));

    setIsGeneratingMessage(true);

    // Context Conflict check: user mentions Supabase when project locked Firebase (Decision #12)
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('supabase') && projId === 'proj-placement') {
      setContextConflict({
        detected: true,
        existingDecision: 'Firebase for Auth & Firestore (Decision #12)',
        newSuggestion: 'Supabase relational database & auth',
        sourceReason: 'Fast prototyping, Firestore rules isolation, and verified student security boundary.',
        resolved: false
      });
    }

    // Duplicate Work check: user asks to build login page when authentication module already exists
    if ((lowerContent.includes('build login') || lowerContent.includes('create login') || lowerContent.includes('make auth')) && projId === 'proj-placement') {
      setDuplicateWorkAlert({
        detected: true,
        module: 'Authentication & Role Guard Module',
        file: 'src/lib/firebase.ts & src/components/login.tsx',
        message: 'This project already contains an authentication module completed on Sept 19, 2026.'
      });
    }

    // Simulate response delay and streaming settlement
    setTimeout(() => {
      let aiResponseText = '';

      if (lowerContent.includes('where is authentication handled') || lowerContent.includes('auth handled')) {
        aiResponseText = `Inspecting your connected repository (**student-placement-platform**):

Authentication is currently implemented across two primary files:
• **\`src/lib/firebase.ts\`**: Handles Firebase client initialization and sets session persistence with token refreshing.
• **\`src/components/login.tsx\`**: Implements the dual-role sign-in and sign-up form with role dispatching (\`student\` vs \`recruiter\`).

Protected routing is enforced in **\`profile.tsx\`** via custom claims. Decision #12 (Firebase for Auth) is locked in project memory.`;
      } else if (lowerContent.includes('what do i have tomorrow') || lowerContent.includes('calendar') || lowerContent.includes('schedule')) {
        const cal = connectors.find(c => c.id === 'gcalendar');
        const events = cal?.demoEvents?.map(e => `• **${e.title}**: ${e.time} (${e.attendees})`).join('\n') || '';
        aiResponseText = `I checked your connected **Google Calendar**:\n\n${events}\n\nWould you like me to prepare meeting briefing notes or connect this to your project timeline?`;
      } else if (attachedFiles?.some(f => f.name.includes('placement-requirements.pdf'))) {
        aiResponseText = `I examined **placement-requirements.pdf** from your connected Google Drive:

**Extracted Specifications**:
1. **Eligibility Threshold**: Minimum CGPA of 7.0 with zero active academic backlogs.
2. **Quota Cap**: Maximum 5 company applications per student per active cycle.
3. **Verification Policy**: Corporate recruiter corporate domain verification must match DNS records before posting open roles.

I've linked these requirements directly to your project memory.`;
      } else if (attachedTools?.includes('tool-code-analyzer') || lowerContent.includes('analyze code') || lowerContent.includes('analyze my latest')) {
        aiResponseText = `[**Code Analyzer Execution**]
Analyzed 14 files in connected repository **student-placement-platform**:

✓ **Type Safety**: 0 TypeScript compilation errors in client modules.
⚠️ **Security Rule Flag**: \`firestore.rules\` currently rejects unverified recruiter write mutations (matches Blocker #01).
✓ **Architecture**: Clean role separation between student applications and recruiter dashboard.

**Recommendation**: Patch the custom token claim assertion in \`firestore.rules\` to permit verified corporate profile updates.`;
      } else if (attachedTools?.includes('tool-pdf-analyzer')) {
        aiResponseText = `[**PDF Analyzer Execution**]
Processed document attachment:
• **Extracted**: 4 core milestone rubrics and 12 grading dimensions.
• **Verification**: Parsed cleanly without hallucination or extrapolation.
• **Saved**: Indexed to Project Memory files.`;
      } else if (lowerContent.includes('session limit') || lowerContent.includes('simulate limit')) {
        aiResponseText = `⚠️ **AI Session Token Threshold Reached** (42,800 / 45,000 tokens).

In a conventional AI chat, this work would now be at risk of being interrupted, requiring you to repeat your entire prompt in a new chat.

With **CONTINUA**:
1. Your project is the permanent source of truth.
2. 12 decisions, 8 completed tasks, and current blockers are saved.
3. Click **"Save Work & Prepare Handoff"** to transfer smoothly to another AI engine.`;
      } else {
        aiResponseText = `I've updated the project context with your request.

• **Project**: ${projMemory?.goal ? 'Student Placement Platform' : 'Current Project'}
• **Status**: Active task preserved.
• **Memory Guard**: 12 decisions and 8 completed milestones are intact.

I am ready to proceed with the next step on ${projMemory?.nextAction || 'your pending tasks'}.`;
      }

      const aiMsgId = `asst-${Date.now()}`;
      const aiMsg: Message = {
        id: aiMsgId,
        conversationId: convId,
        role: 'assistant',
        content: aiResponseText,
        timestamp: 'Just now',
        tokens: Math.round(aiResponseText.length / 4)
      };

      setMessages(prev => ({
        ...prev,
        [convId]: [...(prev[convId] || []), aiMsg]
      }));

      // Update conversation token count and preview
      setConversations(prev => prev.map(c => {
        if (c.id === convId) {
          const newTokens = (c.tokenCount || 0) + (userMsg.tokens || 0) + (aiMsg.tokens || 0);
          return {
            ...c,
            lastUpdated: 'Just now',
            preview: aiResponseText.slice(0, 100) + '...',
            tokenCount: newTokens,
            messageCount: (c.messageCount || 0) + 2,
            hasSessionLimitReached: newTokens >= 42000
          };
        }
        return c;
      }));

      setIsGeneratingMessage(false);
    }, 600);
  };

  const stopGeneration = () => {
    setIsGeneratingMessage(false);
  };

  // Save Work Snapshot
  const saveWorkSnapshot = (projId: string, reason?: string): WorkSnapshot => {
    const proj = projects.find(p => p.id === projId) || projects[0];
    const memory = projectMemories[projId] || initialProjectMemories['proj-placement'];
    const snapshotCount = snapshots.filter(s => s.projectId === projId).length + 1;
    const snapshotNum = snapshotCount < 10 ? `0${snapshotCount}` : `${snapshotCount}`;

    const newSnapshot: WorkSnapshot = {
      id: `snap-${Date.now()}`,
      snapshotNumber: snapshotNum,
      name: reason || `Work Snapshot #${snapshotNum}`,
      triggerReason: reason || 'Manual work checkpoint saved by user',
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      projectId: projId,
      projectName: proj.name,
      goal: memory.goal,
      stateSummary: memory.currentState,
      decisionsCount: memory.decisions.length,
      completedCount: memory.completedWork.length,
      pendingCount: memory.pendingTasks.length,
      filesCount: files.filter(f => f.projectId === projId).length,
      tokenCountOriginal: 42800,
      tokenCountCompressed: 4900,
      compressionRatio: 89
    };

    setSnapshots(prev => [newSnapshot, ...prev]);

    // Add notification
    const newNotif: ContinuaNotification = {
      id: `notif-${Date.now()}`,
      type: 'snapshot_created',
      title: `Work Snapshot #${snapshotNum} Created`,
      message: `Preserved ${newSnapshot.decisionsCount} decisions, ${newSnapshot.completedCount} completed items, and ${newSnapshot.pendingCount} pending tasks.`,
      timestamp: 'Just now',
      read: false,
      actionLabel: 'View Snapshot',
      targetView: 'project-detail',
      targetId: projId
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newSnapshot;
  };

  // Create Continuation / Handoff Package
  const createHandoffPackage = (projId: string, sourceAI: string, destAI: string): HandoffPackage => {
    const proj = projects.find(p => p.id === projId) || projects[0];
    const memory = projectMemories[projId] || initialProjectMemories['proj-placement'];
    const pkgCount = handoffPackages.length + 1;
    const pkgNum = pkgCount < 10 ? `0${pkgCount}` : `${pkgCount}`;

    const latestSnap = snapshots.find(s => s.projectId === projId) || snapshots[0];

    const newPackage: HandoffPackage = {
      id: `pkg-${Date.now()}`,
      packageNumber: pkgNum,
      title: `Handoff from ${sourceAI} to ${destAI}`,
      projectId: projId,
      projectName: proj.name,
      sourceAI,
      destinationAI: destAI,
      snapshotId: latestSnap.id,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      originalTokens: 42800,
      compressedTokens: 4900,
      compressionRatio: 89,
      status: 'ready',
      summary: `Compressed full conversation history into a structured ~4,900 token state packet (~89% smaller prototype estimate). Includes 12 decisions, active recruiter dashboard state, and the unresolved Firebase security rule blocker.`,
      keyDecisions: memory.decisions.slice(0, 3).map(d => `${d.decision} (${d.sourceTitle})`),
      activeTasks: memory.pendingTasks.slice(0, 2).map(t => t.title),
      payloadText: `[CONTINUA WORK CONTINUATION PACKAGE #${pkgNum}]
PROJECT: ${proj.name}
BRANCH: ${proj.activeBranch}
ORIGINAL TOKENS: 42,800
COMPACTED CONTEXT: 4,900 (~89% smaller prototype estimate)
PREVIOUS ENGINE: ${sourceAI}
TARGET ENGINE: ${destAI}

GOAL:
${memory.goal}

CURRENT STATE:
${memory.currentState}

BLOCKERS:
${memory.blockers.map(b => `• ${b.issue}`).join('\n')}

PENDING IMMEDIATE TASKS:
${memory.pendingTasks.map(t => `• ${t.title} [Priority: ${t.priority}]`).join('\n')}

VERIFIED ARCHITECTURAL DECISIONS (${memory.decisions.length} TOTAL):
${memory.decisions.map(d => `• ${d.decision} - ${d.reason}`).join('\n')}`
    };

    setHandoffPackages(prev => [newPackage, ...prev]);

    const newNotif: ContinuaNotification = {
      id: `notif-${Date.now()}`,
      type: 'handoff_ready',
      title: `Continuation Package #${pkgNum} Ready`,
      message: `Handoff to ${destAI} generated with ~89% context compression. Zero prompt repeat required.`,
      timestamp: 'Just now',
      read: false,
      actionLabel: 'Continue with AI',
      targetView: 'handoffs',
      targetId: newPackage.id
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newPackage;
  };

  // Switch AI Engine and continue conversation seamlessly
  const switchAIEngine = (destAIId: string) => {
    const targetAI = aiProviders.find(a => a.id === destAIId) || aiProviders[1];
    const projId = selectedProjectId;
    const proj = projects.find(p => p.id === projId) || projects[0];
    const memory = projectMemories[projId] || initialProjectMemories['proj-placement'];

    // Update project current AI
    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          currentAIId: targetAI.id,
          currentAIName: targetAI.name,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));

    // Create a new continued conversation
    const newChatId = `conv-continued-${Date.now()}`;
    const newConv: Conversation = {
      id: newChatId,
      projectId: projId,
      projectName: proj.name,
      title: `${proj.name} — Continued on ${targetAI.name}`,
      aiProviderId: targetAI.id,
      aiProviderName: targetAI.name,
      modelName: targetAI.model,
      messageCount: 2,
      lastUpdated: 'Just now',
      preview: 'Continuing from Work Snapshot #08. I understand the current project state...',
      tokenCount: 4900,
      pinned: true,
      branchName: proj.activeBranch
    };

    const continuationMessage: Message = {
      id: `msg-cont-${Date.now()}`,
      conversationId: newChatId,
      role: 'assistant',
      content: `### Continuing from Work Snapshot #08

I understand the current project state for **${proj.name}**. 

• **Active Task**: The recruiter dashboard applicant review table is currently the focus.
• **Unresolved Blocker**: The Firebase permission issue in \`firestore.rules\` remains to be patched.
• **Locked Decisions**: All 12 decisions (including Decision #12: Firebase Auth & Firestore) are preserved.
• **Attached Files**: \`firebase.ts\`, \`login.tsx\`, and \`dashboard.tsx\` are loaded from your connected repository.

I will continue from there rather than restarting or asking you to repeat your requirements. Would you like me to output the complete patch for \`firestore.rules\` now?`,
      timestamp: 'Just now',
      tokens: 380,
      isContinuationPoint: true,
      continuationSnapshot: 'Snapshot #08'
    };

    setConversations(prev => [newConv, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newChatId]: [continuationMessage]
    }));

    setSelectedConversationId(newChatId);
    setCurrentView('chat');
    setIsHandoffModalOpen(false);
  };

  // Resolve Context Conflict
  const resolveConflict = (action: 'keep-existing' | 'accept-new' | 'compare') => {
    if (action === 'keep-existing') {
      setContextConflict(null);
      // Append a note to the conversation
      const convId = selectedConversationId;
      const noteMsg: Message = {
        id: `sys-${Date.now()}`,
        conversationId: convId,
        role: 'system',
        content: `**Context Conflict Resolved**: Kept existing project decision (**Decision #12: Firebase for Auth & Firestore**). Supabase suggestion rejected to maintain project continuity.`,
        timestamp: 'Just now',
        tokens: 60
      };
      setMessages(prev => ({
        ...prev,
        [convId]: [...(prev[convId] || []), noteMsg]
      }));
    } else if (action === 'accept-new') {
      setContextConflict(null);
      // Add new decision to project memory
      addProjectDecision(selectedProjectId, {
        decision: 'Migrate to Supabase for Relational Database & Auth',
        reason: 'Adopted based on recent architectural evaluation.',
        sourceTitle: 'Conflict Resolution',
        category: 'Architecture'
      });
    } else {
      // compare: opens comparison modal/view
      setContextConflict(null);
    }
  };

  // Resolve Duplicate Work
  const resolveDuplicateWork = (action: 'review' | 'continue' | 'branch') => {
    setDuplicateWorkAlert(null);
    if (action === 'review') {
      setCurrentView('project-detail');
      setActiveProjectTab('files');
    } else if (action === 'branch') {
      createProjectBranch(selectedProjectId, 'auth-alternative');
    }
  };

  // Connect / Disconnect Connectors
  const connectConnector = (connectorId: string) => {
    setConnectors(prev => prev.map(c => {
      if (c.id === connectorId) {
        return {
          ...c,
          status: 'connected',
          connectedAs: 'rohithakoppu2007@gmail.com',
          connectedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        };
      }
      return c;
    }));

    const conn = connectors.find(c => c.id === connectorId);
    const newNotif: ContinuaNotification = {
      id: `notif-${Date.now()}`,
      type: 'connector_connected',
      title: `${conn?.name || 'Service'} Connected`,
      message: `${conn?.name || 'Service'} is now connected to CONTINUA project memory and chat composer.`,
      timestamp: 'Just now',
      read: false,
      targetView: 'connectors',
      targetId: connectorId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const disconnectConnector = (connectorId: string) => {
    setConnectors(prev => prev.map(c => {
      if (c.id === connectorId) {
        return {
          ...c,
          status: 'disconnected',
          connectedAs: undefined,
          connectedAt: undefined
        };
      }
      return c;
    }));
  };

  const toggleConnectorPermission = (connectorId: string, permissionId: string) => {
    setConnectors(prev => prev.map(c => {
      if (c.id === connectorId) {
        return {
          ...c,
          permissions: c.permissions.map(p => {
            if (p.id === permissionId) {
              return { ...p, granted: !p.granted };
            }
            return p;
          })
        };
      }
      return c;
    }));
  };

  // Tools toggle
  const toggleToolInstalled = (toolId: string) => {
    setTools(prev => prev.map(t => {
      if (t.id === toolId) {
        return { ...t, installed: !t.installed };
      }
      return t;
    }));
  };

  // Add File to Project Memory
  const addFileToProjectMemory = (fileId: string, purpose: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId) {
        return {
          ...f,
          isProjectMemorySource: true,
          memoryPurpose: purpose || 'Key reference specification for project development.'
        };
      }
      return f;
    }));
  };

  // Project Branching
  const createProjectBranch = (projId: string, branchName: string) => {
    const cleanBranch = branchName.trim().toLowerCase().replace(/\s+/g, '-');
    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        const updatedBranches = p.branches.includes(cleanBranch) ? p.branches : [...p.branches, cleanBranch];
        return {
          ...p,
          branches: updatedBranches,
          activeBranch: cleanBranch
        };
      }
      return p;
    }));
  };

  const switchProjectBranch = (projId: string, branchName: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          activeBranch: branchName
        };
      }
      return p;
    }));
  };

  // Decisions
  const addProjectDecision = (projId: string, decision: { decision: string; reason: string; sourceTitle: string; category?: string }) => {
    const newDecision: Decision = {
      id: `dec-${Date.now()}`,
      decision: decision.decision,
      reason: decision.reason,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      sourceTitle: decision.sourceTitle || 'Manual Entry',
      pinned: true,
      category: decision.category || 'General'
    };

    setProjectMemories(prev => {
      const existing = prev[projId] || initialProjectMemories['proj-placement'];
      return {
        ...prev,
        [projId]: {
          ...existing,
          decisions: [newDecision, ...existing.decisions]
        }
      };
    });
  };

  const toggleDecisionPin = (projId: string, decisionId: string) => {
    setProjectMemories(prev => {
      const existing = prev[projId];
      if (!existing) return prev;
      return {
        ...prev,
        [projId]: {
          ...existing,
          decisions: existing.decisions.map(d => d.id === decisionId ? { ...d, pinned: !d.pinned } : d)
        }
      };
    });
  };

  const deleteProjectDecision = (projId: string, decisionId: string) => {
    setProjectMemories(prev => {
      const existing = prev[projId];
      if (!existing) return prev;
      return {
        ...prev,
        [projId]: {
          ...existing,
          decisions: existing.decisions.filter(d => d.id !== decisionId)
        }
      };
    });
  };

  // Tasks
  const toggleTaskStatus = (projId: string, taskId: string) => {
    setProjectMemories(prev => {
      const existing = prev[projId];
      if (!existing) return prev;
      return {
        ...prev,
        [projId]: {
          ...existing,
          pendingTasks: existing.pendingTasks.map(t => {
            if (t.id === taskId) {
              const newStatus = t.status === 'completed' ? 'pending' : 'completed';
              return { ...t, status: newStatus };
            }
            return t;
          })
        }
      };
    });
  };

  const addProjectTask = (projId: string, task: { title: string; priority: 'high' | 'medium' | 'low' }) => {
    setProjectMemories(prev => {
      const existing = prev[projId] || initialProjectMemories['proj-placement'];
      const newTask = {
        id: `task-${Date.now()}`,
        title: task.title,
        priority: task.priority,
        status: 'pending' as const,
        due: 'Next sprint'
      };
      return {
        ...prev,
        [projId]: {
          ...existing,
          pendingTasks: [newTask, ...existing.pendingTasks]
        }
      };
    });
  };

  // Notifications
  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Scheduled tasks
  const runScheduledTaskNow = (taskId: string) => {
    setScheduledTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          lastRunStatus: `Completed just now · Executed at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        };
      }
      return t;
    }));

    const task = scheduledTasks.find(t => t.id === taskId);
    const newNotif: ContinuaNotification = {
      id: `notif-${Date.now()}`,
      type: 'scheduled_summary',
      title: `${task?.title || 'Scheduled Task'} Executed`,
      message: `Completed scheduled project audit and verified active milestone status.`,
      timestamp: 'Just now',
      read: false,
      targetView: 'scheduled'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const toggleScheduledTask = (taskId: string) => {
    setScheduledTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: t.status === 'active' ? 'paused' : 'active'
        };
      }
      return t;
    }));
  };

  // Demo file upload
  const uploadFileDemo = (name: string, type: 'document' | 'image' | 'code' | 'spreadsheet') => {
    const ext = name.split('.').pop() || 'txt';
    const newFile: FileItem = {
      id: `file-${Date.now()}`,
      name,
      type,
      extension: ext,
      size: `${Math.floor(Math.random() * 80) + 12} KB`,
      dateAdded: new Date().toISOString().split('T')[0],
      projectId: selectedProjectId,
      projectName: projects.find(p => p.id === selectedProjectId)?.name || 'Student Placement Platform',
      isProjectMemorySource: false,
      source: 'upload',
      contentSnippet: `Uploaded file snippet for ${name}. Verified clean schema.`
    };
    setFiles(prev => [newFile, ...prev]);
  };

  // Global search across all entities
  const searchAcrossAll = (query: string): SearchResult[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResult[] = [];

    // Decisions
    Object.entries(projectMemories).forEach(([pId, mem]) => {
      const proj = projects.find(p => p.id === pId);
      mem.decisions.forEach(d => {
        if (d.decision.toLowerCase().includes(q) || d.reason.toLowerCase().includes(q)) {
          results.push({
            id: d.id,
            type: 'decision',
            title: `Decision: ${d.decision}`,
            snippet: `Reason: ${d.reason}`,
            sourceLabel: `Project: ${proj?.name || 'Project'} · ${d.sourceTitle}`,
            action: () => {
              setSelectedProjectId(pId);
              setCurrentView('project-detail');
              setActiveProjectTab('decisions');
              setIsSearchOpen(false);
            }
          });
        }
      });
    });

    // Conversations
    conversations.forEach(c => {
      if (c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q)) {
        results.push({
          id: c.id,
          type: 'conversation',
          title: c.title,
          snippet: c.preview,
          sourceLabel: `Chat · ${c.projectName} · ${c.aiProviderName}`,
          action: () => {
            setSelectedProjectId(c.projectId);
            setSelectedConversationId(c.id);
            setCurrentView('chat');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Files
    files.forEach(f => {
      if (f.name.toLowerCase().includes(q) || f.contentSnippet?.toLowerCase().includes(q) || f.memoryPurpose?.toLowerCase().includes(q)) {
        results.push({
          id: f.id,
          type: 'file',
          title: `File: ${f.name}`,
          snippet: f.memoryPurpose || f.contentSnippet || `${f.type} file`,
          sourceLabel: `Library · ${f.source.toUpperCase()} · ${f.projectName || 'General'}`,
          action: () => {
            setCurrentView('library');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Projects
    projects.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
        results.push({
          id: p.id,
          type: 'project',
          title: `Project: ${p.name}`,
          snippet: p.description,
          sourceLabel: `${p.category} · ${p.progress}% Complete`,
          action: () => {
            setSelectedProjectId(p.id);
            setCurrentView('project-detail');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Connectors
    connectors.forEach(c => {
      if (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
        results.push({
          id: c.id,
          type: 'connector',
          title: `Connector: ${c.name}`,
          snippet: c.description,
          sourceLabel: `${c.category} · ${c.status === 'connected' ? 'Connected' : 'Available'}`,
          action: () => {
            setCurrentView('connectors');
            setIsSearchOpen(false);
          }
        });
      }
    });

    return results;
  };

  // Launch Guided Demo Story (30-60 sec hackathon demo)
  const launchDemoStory = () => {
    setSelectedProjectId('proj-placement');
    setSelectedConversationId('conv-placement-1');
    setCurrentView('chat');
    setDemoStepIndex(0);
    setIsGuidedDemoOpen(true);
  };

  const value = useMemo(() => ({
    currentView,
    setCurrentView,
    selectedProjectId,
    setSelectedProjectId,
    selectedConversationId,
    setSelectedConversationId,
    activeProjectTab,
    setActiveProjectTab,
    isSearchOpen,
    setIsSearchOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isHandoffModalOpen,
    setIsHandoffModalOpen,
    isGuidedDemoOpen,
    setIsGuidedDemoOpen,
    demoStepIndex,
    setDemoStepIndex,
    projects,
    projectMemories,
    snapshots,
    handoffPackages,
    conversations,
    messages,
    connectors,
    tools,
    files,
    images,
    scheduledTasks,
    notifications,
    aiProviders,
    contextConflict,
    duplicateWorkAlert,
    isGeneratingMessage,
    createNewChat,
    sendMessage,
    stopGeneration,
    saveWorkSnapshot,
    createHandoffPackage,
    switchAIEngine,
    resolveConflict,
    resolveDuplicateWork,
    connectConnector,
    disconnectConnector,
    toggleConnectorPermission,
    toggleToolInstalled,
    addFileToProjectMemory,
    createProjectBranch,
    switchProjectBranch,
    addProjectDecision,
    toggleDecisionPin,
    deleteProjectDecision,
    toggleTaskStatus,
    addProjectTask,
    markNotificationRead,
    markAllNotificationsRead,
    runScheduledTaskNow,
    toggleScheduledTask,
    uploadFileDemo,
    searchAcrossAll,
    launchDemoStory
  }), [
    currentView,
    selectedProjectId,
    selectedConversationId,
    activeProjectTab,
    isSearchOpen,
    isNotificationsOpen,
    isHandoffModalOpen,
    isGuidedDemoOpen,
    demoStepIndex,
    projects,
    projectMemories,
    snapshots,
    handoffPackages,
    conversations,
    messages,
    connectors,
    tools,
    files,
    images,
    scheduledTasks,
    notifications,
    aiProviders,
    contextConflict,
    duplicateWorkAlert,
    isGeneratingMessage
  ]);

  return (
    <ContinuaContext.Provider value={value}>
      {children}
    </ContinuaContext.Provider>
  );
}

export function useContinua() {
  const context = useContext(ContinuaContext);
  if (!context) {
    throw new Error('useContinua must be used within a ContinuaProvider');
  }
  return context;
}
