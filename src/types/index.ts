export type ViewMode = 
  | 'home' 
  | 'new-chat' 
  | 'chat' 
  | 'projects' 
  | 'project-detail' 
  | 'library' 
  | 'images' 
  | 'connectors' 
  | 'tools' 
  | 'ai-connections' 
  | 'handoffs' 
  | 'scheduled' 
  | 'settings' 
  | 'help'
  | 'landing';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  progress: number;
  currentAIId: string;
  currentAIName: string;
  activeBranch: string;
  branches: string[];
  lastActivity: string;
  pendingTasksCount: number;
  completedTasksCount: number;
  image?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Decision {
  id: string;
  decision: string;
  reason: string;
  date: string;
  sourceConversationId?: string;
  sourceTitle: string;
  pinned: boolean;
  category?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  due?: string;
  assignedAI?: string;
}

export interface Requirement {
  id: string;
  title: string;
  status: 'finalized' | 'draft' | 'in-progress';
  date: string;
  source: string;
}

export interface ProjectMemory {
  projectId: string;
  goal: string;
  currentState: string;
  nextAction: string;
  conversationSummary: string;
  requirements: Requirement[];
  decisions: Decision[];
  completedWork: {
    id: string;
    title: string;
    completedDate: string;
    details: string;
  }[];
  pendingTasks: TaskItem[];
  openQuestions: {
    id: string;
    question: string;
    status: 'open' | 'resolved';
    answer?: string;
  }[];
  blockers: {
    id: string;
    issue: string;
    severity: 'critical' | 'warning';
    reportedDate: string;
    status: 'unresolved' | 'resolved';
  }[];
  aiHistory: {
    aiId: string;
    name: string;
    datesUsed: string;
    tokensHandled: number;
    completedItems: string;
  }[];
}

export interface WorkSnapshot {
  id: string;
  snapshotNumber: string;
  name: string;
  triggerReason: string;
  timestamp: string;
  projectId: string;
  projectName: string;
  goal: string;
  stateSummary: string;
  decisionsCount: number;
  completedCount: number;
  pendingCount: number;
  filesCount: number;
  tokenCountOriginal: number;
  tokenCountCompressed: number;
  compressionRatio: number;
}

export interface HandoffPackage {
  id: string;
  packageNumber: string;
  title: string;
  projectId: string;
  projectName: string;
  sourceAI: string;
  destinationAI: string;
  snapshotId: string;
  createdAt: string;
  originalTokens: number;
  compressedTokens: number;
  compressionRatio: number;
  status: 'ready' | 'transferred' | 'archived';
  summary: string;
  keyDecisions: string[];
  activeTasks: string[];
  payloadText: string;
}

export interface Conversation {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  aiProviderId: string;
  aiProviderName: string;
  modelName: string;
  messageCount: number;
  lastUpdated: string;
  preview: string;
  tokenCount: number;
  pinned?: boolean;
  branchName?: string;
  hasSessionLimitReached?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  attachedFiles?: { id: string; name: string; type: string; source: string }[];
  attachedTools?: string[];
  attachedConnectors?: string[];
  tokens?: number;
  isContinuationPoint?: boolean;
  continuationSnapshot?: string;
}

export interface Connector {
  id: string;
  name: string;
  category: 'Development' | 'Cloud Storage' | 'Productivity' | 'Communication' | 'Design' | 'AI';
  icon: string;
  description: string;
  capabilities: string[];
  status: 'connected' | 'disconnected' | 'connecting';
  connectedAs?: string;
  connectedAt?: string;
  permissions: { id: string; name: string; granted: boolean }[];
  demoItemsCount?: number;
  demoFiles?: { name: string; type: string; details: string; path?: string }[];
  demoEvents?: { title: string; time: string; attendees: string }[];
}

export interface ToolPlugin {
  id: string;
  name: string;
  category: 'Writing' | 'Coding' | 'Research' | 'Productivity' | 'Design' | 'Data';
  icon: string;
  description: string;
  capabilities: string[];
  installed: boolean;
  version: string;
  author: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'code' | 'spreadsheet';
  extension: string;
  size: string;
  dateAdded: string;
  projectId?: string;
  projectName?: string;
  isProjectMemorySource: boolean;
  memoryPurpose?: string;
  source: 'upload' | 'github' | 'gdrive';
  contentSnippet?: string;
}

export interface ImageItem {
  id: string;
  name: string;
  url: string;
  type: 'generated' | 'uploaded' | 'project';
  projectId?: string;
  projectName?: string;
  date: string;
  dimensions: string;
  prompt?: string;
}

export interface ScheduledTask {
  id: string;
  title: string;
  schedule: string;
  nextRun: string;
  status: 'active' | 'paused';
  lastRunStatus: string;
  actionDescription: string;
  projectId?: string;
}

export interface ContinuaNotification {
  id: string;
  type: 'session_limit' | 'snapshot_created' | 'handoff_ready' | 'connector_connected' | 'conflict_detected' | 'scheduled_summary' | 'task_reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  targetView?: ViewMode;
  targetId?: string;
}

export interface AIProvider {
  id: string;
  name: string;
  model: string;
  contextWindow: string;
  providerType: 'general' | 'coding' | 'reasoning' | 'creative';
  status: 'active' | 'ready' | 'limit_reached';
  sessionTokensUsed: number;
  sessionTokenLimit: number;
  badge: string;
  description: string;
}

export interface ContextConflict {
  detected: boolean;
  existingDecision: string;
  newSuggestion: string;
  sourceReason: string;
  resolved: boolean;
}
