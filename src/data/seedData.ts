import { 
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
  AIProvider 
} from '../types';

export const initialProjects: Project[] = [
  {
    id: 'proj-placement',
    name: 'Student Placement Platform',
    description: 'Recruitment portal connecting university seniors with corporate talent partners, automated resume vetting, and placement scheduling.',
    category: 'Full-Stack Web',
    progress: 68,
    currentAIId: 'ai-workspace-a',
    currentAIName: 'Demo AI Workspace',
    activeBranch: 'main',
    branches: ['main', 'auth-upgrade', 'supabase-experiment'],
    lastActivity: '12 minutes ago',
    pendingTasksCount: 3,
    completedTasksCount: 8,
    image: '/src/assets/images/project_placement_preview_1790366926504.jpg',
    color: '#0284c7',
    createdAt: '2026-09-18',
    updatedAt: '2026-09-25T12:55:00Z',
  },
  {
    id: 'proj-hackathon',
    name: 'College Hackathon Portal',
    description: 'Real-time hackathon management platform with team formation, mentor matchmaking, and live judging scoring matrix.',
    category: 'Event Platform',
    progress: 42,
    currentAIId: 'ai-coding',
    currentAIName: 'Coding AI Engine',
    activeBranch: 'main',
    branches: ['main', 'mvp-submission'],
    lastActivity: '2 hours ago',
    pendingTasksCount: 5,
    completedTasksCount: 6,
    image: '/src/assets/images/project_hackathon_preview_1790366938521.jpg',
    color: '#16a34a',
    createdAt: '2026-09-21',
    updatedAt: '2026-09-25T10:30:00Z',
  },
  {
    id: 'proj-portfolio',
    name: 'Executive Portfolio Website',
    description: 'Minimalist editorial showcase for design engineering work with interactive case studies and typography craft.',
    category: 'Design Engineering',
    progress: 90,
    currentAIId: 'ai-workspace-b',
    currentAIName: 'Creative AI Assistant',
    activeBranch: 'main',
    branches: ['main'],
    lastActivity: 'Yesterday',
    pendingTasksCount: 1,
    completedTasksCount: 12,
    color: '#9333ea',
    createdAt: '2026-09-10',
    updatedAt: '2026-09-24T18:00:00Z',
  },
  {
    id: 'proj-ecommerce',
    name: 'Nordic Goods E-Commerce Prototype',
    description: 'High-performance headless storefront prototype with edge inventory verification and clean checkout flows.',
    category: 'E-Commerce',
    progress: 35,
    currentAIId: 'ai-workspace-c',
    currentAIName: 'Reasoning Model 3.5',
    activeBranch: 'main',
    branches: ['main', 'stripe-integration'],
    lastActivity: '3 days ago',
    pendingTasksCount: 7,
    completedTasksCount: 4,
    color: '#ea580c',
    createdAt: '2026-09-15',
    updatedAt: '2026-09-22T14:10:00Z',
  },
];

export const initialProjectMemories: Record<string, ProjectMemory> = {
  'proj-placement': {
    projectId: 'proj-placement',
    goal: 'Build an end-to-end recruitment platform for 1,200+ graduating engineers and 45 corporate recruiters with automated credentialing, resume parsing, and interview scheduling.',
    currentState: 'Authentication and student registration completed. The recruiter dashboard is currently the active task; Firebase permission rule for recruiter verification has a pending blocker.',
    nextAction: 'Finalize recruiter verification rule in firestore.rules and complete applicant review candidate list.',
    conversationSummary: '5 days of active design and full-stack development across 5 conversations. Key architecture established around Firebase Auth + Firestore, with verified role-based routing.',
    requirements: [
      { id: 'req-1', title: 'Role-based access separation for Students, Recruiters, and Placement Coordinators', status: 'finalized', date: '2026-09-18', source: 'Placement Specs v1' },
      { id: 'req-2', title: 'Resume parsing and structured skills extraction from PDF', status: 'finalized', date: '2026-09-19', source: 'placement-requirements.pdf' },
      { id: 'req-3', title: 'Recruiter job posting interface with application tracking pipeline', status: 'in-progress', date: '2026-09-20', source: 'Conversation #04' },
      { id: 'req-4', title: 'Real-time interview slot booking with Google Calendar integration', status: 'draft', date: '2026-09-22', source: 'Meeting Notes' },
      { id: 'req-5', title: 'Strict verification of corporate recruiter domain emails', status: 'finalized', date: '2026-09-23', source: 'Decision #07' },
      { id: 'req-6', title: 'Audit logging for student profile revisions and recruiter views', status: 'in-progress', date: '2026-09-24', source: 'Security Review' }
    ],
    decisions: [
      {
        id: 'dec-12',
        decision: 'Use Firebase for Auth & Firestore Data Store',
        reason: 'Fast implementation, integrated authentication, and native support for fine-grained security rules.',
        date: 'September 26, 2026',
        sourceTitle: 'Conversation #12',
        sourceConversationId: 'conv-placement-1',
        pinned: true,
        category: 'Architecture'
      },
      {
        id: 'dec-11',
        decision: 'Enforce TypeScript with Zod validation on client & server boundary',
        reason: 'Eliminate runtime payload mismatch between candidate resume parser and database schema.',
        date: 'September 24, 2026',
        sourceTitle: 'Conversation #09',
        pinned: true,
        category: 'Engineering'
      },
      {
        id: 'dec-10',
        decision: 'Adopt Tailwind CSS with light neutral aesthetic',
        reason: 'Ensures optimal readability for dense tabular applicant review tables without visual fatigue.',
        date: 'September 22, 2026',
        sourceTitle: 'Conversation #07',
        pinned: false,
        category: 'UI/UX'
      },
      {
        id: 'dec-09',
        decision: 'Client-side OAuth tokens passed via Bearer headers for Google Workspace integration',
        reason: 'Adheres to zero-secret client-side requirement while enabling secure Calendar scheduling.',
        date: 'September 21, 2026',
        sourceTitle: 'Conversation #05',
        pinned: true,
        category: 'Security'
      },
      {
        id: 'dec-08',
        decision: 'Store candidate resumes in Firebase Storage under secure user UID paths',
        reason: 'Enforces student ownership and prevents unauthorized recruiter enumeration of unposted applications.',
        date: 'September 20, 2026',
        sourceTitle: 'Conversation #03',
        pinned: false,
        category: 'Storage'
      },
      {
        id: 'dec-07',
        decision: 'Two-tier verification for corporate recruiters (DNS domain match + coordinator approval)',
        reason: 'Prevents fraudulent companies from collecting student resume contact information.',
        date: 'September 19, 2026',
        sourceTitle: 'Conversation #02',
        pinned: true,
        category: 'Compliance'
      },
      {
        id: 'dec-06',
        decision: 'Use PDF Analyzer tool for structured skills extraction',
        reason: 'Deterministic extraction avoids hallucinated GPA or university accreditation metrics.',
        date: 'September 19, 2026',
        sourceTitle: 'Conversation #02',
        pinned: false,
        category: 'Tooling'
      },
      {
        id: 'dec-05',
        decision: 'Denormalize applicant status counters inside job posting documents',
        reason: 'Reduces Firestore document reads when rendering recruiter company overview card grids.',
        date: 'September 18, 2026',
        sourceTitle: 'Conversation #01',
        pinned: false,
        category: 'Database'
      },
      {
        id: 'dec-04',
        decision: 'Separate student application states: Submitted, Under Review, Shortlisted, Interview, Offer',
        reason: 'Matches university placement cell mandatory progression gates.',
        date: 'September 18, 2026',
        sourceTitle: 'Conversation #01',
        pinned: false,
        category: 'Domain'
      },
      {
        id: 'dec-03',
        decision: 'Implement Context Compression before cross-AI continuation',
        reason: 'Preserves 89% token budget when switching from ideation AI to deep coding AI.',
        date: 'September 18, 2026',
        sourceTitle: 'Conversation #01',
        pinned: true,
        category: 'CONTINUA Core'
      },
      {
        id: 'dec-02',
        decision: 'Project as Permanent Source of Truth pattern',
        reason: 'No work loss when provider sessions disconnect or token limits terminate conversation.',
        date: 'September 18, 2026',
        sourceTitle: 'Conversation #01',
        pinned: true,
        category: 'CONTINUA Core'
      },
      {
        id: 'dec-01',
        decision: 'Git repository sync via CONTINUA GitHub Connector',
        reason: 'Maintains live file inspection (`firebase.ts`, `login.tsx`, `dashboard.tsx`) directly in chat composer.',
        date: 'September 18, 2026',
        sourceTitle: 'Conversation #01',
        pinned: true,
        category: 'Integration'
      }
    ],
    completedWork: [
      { id: 'cw-1', title: 'Firebase Authentication configured with email & password', completedDate: '2026-09-19', details: 'Configured in firebase.ts with persistence and token refresh.' },
      { id: 'cw-2', title: 'Student registration form with step-by-step validator', completedDate: '2026-09-20', details: 'Built in login.tsx and profile.tsx with field-level error messages.' },
      { id: 'cw-3', title: 'Resume upload component with MIME and size constraints', completedDate: '2026-09-21', details: 'Built in resume-upload.tsx with drag-and-drop preview.' },
      { id: 'cw-4', title: 'Recruiter job posting UI draft layout', completedDate: '2026-09-22', details: 'Responsive job creation form with stipend, location, and requirements.' },
      { id: 'cw-5', title: 'Company profile verification flow', completedDate: '2026-09-23', details: 'Pending coordinator approval banner and document attachment.' },
      { id: 'cw-6', title: 'Application status badges & progression pipeline', completedDate: '2026-09-23', details: 'Visual pipeline for students tracking their interview stages.' },
      { id: 'cw-7', title: 'Student profile view with academic transcripts link', completedDate: '2026-09-24', details: 'Secure transcript preview rendered from verified storage.' },
      { id: 'cw-8', title: 'Firestore composite indexes for applicant queries', completedDate: '2026-09-24', details: 'Indexed by companyId + status + appliedAt descending.' }
    ],
    pendingTasks: [
      { id: 'task-1', title: 'Resolve recruiter verification security rule in firestore.rules', priority: 'high', status: 'pending', due: 'Today' },
      { id: 'task-2', title: 'Build recruiter applicant review table with multi-criteria filters', priority: 'high', status: 'in-progress', due: 'Tomorrow' },
      { id: 'task-3', title: 'Integrate automated email notification trigger on candidate status transition', priority: 'medium', status: 'pending', due: 'Sept 28' }
    ],
    openQuestions: [
      { id: 'oq-1', question: 'Should interview slots sync automatically with recruiter Google Calendar or emit .ics download links?', status: 'open' },
      { id: 'oq-2', question: 'What is the daily rate limit for candidate application submissions to prevent spamming?', status: 'resolved', answer: 'Cap at 5 applications per student per 24 hours.' }
    ],
    blockers: [
      { id: 'blk-1', issue: 'Firebase permission rule: recruiters cannot write verification status without admin coordinator custom claim', severity: 'critical', reportedDate: '2026-09-25', status: 'unresolved' }
    ],
    aiHistory: [
      { aiId: 'ai-workspace-a', name: 'Demo AI Workspace', datesUsed: 'Sept 18–25', tokensHandled: 124500, completedItems: 'Architecture, Auth schema, UI layouts' },
      { aiId: 'ai-coding', name: 'Coding AI Engine', datesUsed: 'Sept 22', tokensHandled: 48000, completedItems: 'TypeScript interfaces & Zod validators' },
      { aiId: 'ai-workspace-c', name: 'Reasoning Model 3.5', datesUsed: 'Sept 20', tokensHandled: 32000, completedItems: 'Matching algorithm logic' }
    ]
  }
};

export const initialSnapshots: WorkSnapshot[] = [
  {
    id: 'snap-01',
    snapshotNumber: '01',
    name: 'Project Created',
    triggerReason: 'Initial repository setup and project workspace initialization',
    timestamp: '2026-09-18 10:00 AM',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    goal: 'Create career placement portal for engineering graduating class.',
    stateSummary: 'Initialized folder structure and requirements brief.',
    decisionsCount: 3,
    completedCount: 1,
    pendingCount: 8,
    filesCount: 3,
    tokenCountOriginal: 8200,
    tokenCountCompressed: 1400,
    compressionRatio: 83
  },
  {
    id: 'snap-03',
    snapshotNumber: '03',
    name: 'Requirements Finalized',
    triggerReason: 'Signed off placement spec and recruiter verification criteria',
    timestamp: '2026-09-20 03:30 PM',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    goal: 'Lock in core specifications and security boundaries.',
    stateSummary: 'Requirements finalized with coordinator approval workflow.',
    decisionsCount: 6,
    completedCount: 3,
    pendingCount: 6,
    filesCount: 5,
    tokenCountOriginal: 19400,
    tokenCountCompressed: 2600,
    compressionRatio: 86
  },
  {
    id: 'snap-05',
    snapshotNumber: '05',
    name: 'Authentication Completed',
    triggerReason: 'Firebase Auth and role guards verified working',
    timestamp: '2026-09-22 06:15 PM',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    goal: 'Deploy secure authentication for students and talent partners.',
    stateSummary: 'Dual-role login and registration active with email verification.',
    decisionsCount: 9,
    completedCount: 5,
    pendingCount: 4,
    filesCount: 8,
    tokenCountOriginal: 31200,
    tokenCountCompressed: 3800,
    compressionRatio: 88
  },
  {
    id: 'snap-08',
    snapshotNumber: '08',
    name: 'Before AI Handoff',
    triggerReason: 'AI Session token limit reached (42,800 tokens) — state preserved',
    timestamp: '2026-09-25 01:05 PM',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    goal: 'Complete Recruiter Dashboard while resolving Firebase rule blocker.',
    stateSummary: 'Active task: Recruiter Dashboard UI. Blocker: Firebase permission rule. Ready for handoff.',
    decisionsCount: 12,
    completedCount: 8,
    pendingCount: 3,
    filesCount: 10,
    tokenCountOriginal: 42800,
    tokenCountCompressed: 4900,
    compressionRatio: 89
  }
];

export const initialHandoffPackages: HandoffPackage[] = [
  {
    id: 'pkg-08',
    packageNumber: '08',
    title: 'Handoff from Demo AI Workspace to Coding AI Engine',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    sourceAI: 'Demo AI Workspace',
    destinationAI: 'Coding AI Engine',
    snapshotId: 'snap-08',
    createdAt: '2026-09-25 01:07 PM',
    originalTokens: 42800,
    compressedTokens: 4900,
    compressionRatio: 89,
    status: 'ready',
    summary: 'Compressed 5 days of placement platform discussion into actionable context. Preserved 12 architecture decisions, identified Firebase permission blocker, and extracted recruiter dashboard requirements.',
    keyDecisions: [
      'Firebase selected for Auth & Firestore (Decision #12)',
      'TypeScript + Zod strict boundary validation (Decision #11)',
      'Candidate resumes in isolated UID paths (Decision #08)'
    ],
    activeTasks: [
      'Fix recruiter verification rule in firestore.rules',
      'Build applicant review table with filter controls'
    ],
    payloadText: `[CONTINUA WORK CONTINUATION PACKAGE #08]
PROJECT: Student Placement Platform
SOURCE OF TRUTH: Permanent Project Memory (Branch: main)
PREVIOUS ENGINE: Demo AI Workspace (Session Token Limit Reached at 42,800 tokens)
DESTINATION ENGINE: Coding AI Engine

--- CORE GOAL ---
Recruitment portal connecting 1,200+ engineering seniors with verified recruiters.

--- CURRENT STATE ---
Authentication complete with role separation (Student vs Recruiter). The Recruiter Dashboard is the active task.

--- CRITICAL UNRESOLVED BLOCKER ---
Firebase permission issue: Recruiter accounts cannot write verification status in Firestore without admin custom claims check.

--- NEXT IMMEDIATE ACTION ---
1. Review and patch firestore.rules to permit verified recruiter profile updates.
2. Continue implementation of applicant review candidate table in dashboard.tsx.

--- KEY DECISIONS (12 VERIFIED) ---
• Decision #12: Firebase selected for Auth + Firestore (Integrated auth + rules).
• Decision #11: TypeScript + Zod schema validation.
• Decision #09: Client-side Bearer headers for Google Workspace tokens.
• Decision #08: Secure user UID paths in storage.

--- ATTACHED REPOSITORY FILES ---
• firebase.ts (Auth initialization & Firestore client)
• login.tsx (Role-based authentication view)
• dashboard.tsx (Recruiter workspace layout)`
  },
  {
    id: 'pkg-05',
    packageNumber: '05',
    title: 'Handoff for Auth Module Verification',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    sourceAI: 'Demo AI Workspace',
    destinationAI: 'Reasoning Model 3.5',
    snapshotId: 'snap-05',
    createdAt: '2026-09-22 06:20 PM',
    originalTokens: 31200,
    compressedTokens: 3800,
    compressionRatio: 88,
    status: 'transferred',
    summary: 'Transferred authentication verification to reasoning engine for edge case review.',
    keyDecisions: ['Two-tier verification for corporate recruiters'],
    activeTasks: ['Implement resume upload validation component'],
    payloadText: 'Authentication module verification payload.'
  }
];

export const initialConversations: Conversation[] = [
  {
    id: 'conv-placement-1',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    title: 'Recruiter Dashboard — Authentication & Role Guard',
    aiProviderId: 'ai-workspace-a',
    aiProviderName: 'Demo AI Workspace',
    modelName: 'Workspace Model Alpha 4.2',
    messageCount: 16,
    lastUpdated: '12 minutes ago',
    preview: 'I understand the current project state. The recruiter dashboard is the active task...',
    tokenCount: 42800,
    pinned: true,
    branchName: 'main',
    hasSessionLimitReached: true
  },
  {
    id: 'conv-placement-2',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    title: 'Student Placement Platform — Firebase Setup & Security Rules',
    aiProviderId: 'ai-workspace-a',
    aiProviderName: 'Demo AI Workspace',
    modelName: 'Workspace Model Alpha 4.2',
    messageCount: 22,
    lastUpdated: '2 days ago',
    preview: 'Configured firestore.rules and validated student UID path isolation.',
    tokenCount: 28400,
    pinned: false,
    branchName: 'main'
  },
  {
    id: 'conv-placement-3',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    title: 'Resume Matching — Architecture & Scoring Algorithm',
    aiProviderId: 'ai-workspace-c',
    aiProviderName: 'Reasoning Model 3.5',
    modelName: 'Reasoning Pro 1.2',
    messageCount: 14,
    lastUpdated: '3 days ago',
    preview: 'Outlined weighted scoring vector across verified project skills and GPA thresholds.',
    tokenCount: 21100,
    pinned: false,
    branchName: 'main'
  },
  {
    id: 'conv-placement-4',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    title: 'Recruiter Dashboard — UI Planning & Component Wireframes',
    aiProviderId: 'ai-workspace-a',
    aiProviderName: 'Demo AI Workspace',
    modelName: 'Workspace Model Alpha 4.2',
    messageCount: 18,
    lastUpdated: '4 days ago',
    preview: 'Defined responsive layout with applicant pipeline stages and candidate cards.',
    tokenCount: 19800,
    pinned: false,
    branchName: 'main'
  },
  {
    id: 'conv-hackathon-1',
    projectId: 'proj-hackathon',
    projectName: 'College Hackathon Portal',
    title: 'Hackathon — Problem Statement & Evaluation Matrix',
    aiProviderId: 'ai-coding',
    aiProviderName: 'Coding AI Engine',
    modelName: 'DeepCode 3.1',
    messageCount: 10,
    lastUpdated: '2 hours ago',
    preview: 'Set up real-time leaderboard schema with peer review weighting.',
    tokenCount: 14200,
    pinned: true,
    branchName: 'main'
  },
  {
    id: 'conv-portfolio-1',
    projectId: 'proj-portfolio',
    projectName: 'Executive Portfolio Website',
    title: 'Portfolio Typography System & Dynamic Case Study Scroller',
    aiProviderId: 'ai-workspace-b',
    aiProviderName: 'Creative AI Assistant',
    modelName: 'Creative Flow 2',
    messageCount: 12,
    lastUpdated: 'Yesterday',
    preview: 'Configured Plus Jakarta Sans display typography and smooth scroll micro-interactions.',
    tokenCount: 16500,
    pinned: false,
    branchName: 'main'
  }
];

export const initialMessages: Record<string, Message[]> = {
  'conv-placement-1': [
    {
      id: 'm-1',
      conversationId: 'conv-placement-1',
      role: 'user',
      content: 'Let’s review where we are with the Student Placement Platform. We need to implement the Recruiter Dashboard authentication check and applicant list today.',
      timestamp: 'Today, 12:30 PM',
      tokens: 42
    },
    {
      id: 'm-2',
      conversationId: 'conv-placement-1',
      role: 'assistant',
      content: `I've checked our project memory. We currently have **Decision #12 (Firebase for Auth & Firestore)** locked in, and the student registration and resume upload components are completed.

Here is the current implementation status:
1. **Authentication**: Handled via \`firebase.ts\` and \`login.tsx\` with role separation (\`student\` vs \`recruiter\`).
2. **Current Blocker**: Recruiters cannot write verification status in Firestore due to rule permission denial.
3. **Active Task**: Build the candidate applicant review table inside \`dashboard.tsx\`.

Would you like to patch the security rules first or begin assembling the applicant review table?`,
      timestamp: 'Today, 12:31 PM',
      tokens: 280
    },
    {
      id: 'm-3',
      conversationId: 'conv-placement-1',
      role: 'user',
      content: 'Where is authentication handled right now in our codebase? Can you check our connected files?',
      timestamp: 'Today, 12:36 PM',
      tokens: 30,
      attachedConnectors: ['GitHub']
    },
    {
      id: 'm-4',
      conversationId: 'conv-placement-1',
      role: 'assistant',
      content: `Inspecting your connected GitHub repository (**student-placement-platform**):

Authentication is currently handled in:
• **\`firebase.ts\`**: Initializes Firebase Auth, exports the \`auth\` instance, and sets session persistence.
• **\`login.tsx\`**: Implements the dual-tab sign-in and sign-up form with role dispatching (\`student\` vs \`recruiter\`).
• **\`profile.tsx\`**: Enforces the protected route wrapper, reading custom claims and redirecting unverified recruiters to the approval holding state.

The current token usage for this ongoing session is approaching the provider threshold (42,800 / 45,000 tokens).`,
      timestamp: 'Today, 12:37 PM',
      tokens: 390
    },
    {
      id: 'm-5',
      conversationId: 'conv-placement-1',
      role: 'user',
      content: 'Can you show me the code to fix the recruiter verification rule in firestore.rules and the applicant table snippet?',
      timestamp: 'Today, 12:50 PM',
      tokens: 45
    },
    {
      id: 'm-6',
      conversationId: 'conv-placement-1',
      role: 'assistant',
      content: `Here is the security rule patch for **\`firestore.rules\`**:

\`\`\`javascript
// firestore.rules - Recruiter Verification Patch
match /companies/{companyId} {
  allow read: if request.auth != null;
  allow update: if request.auth != null && 
    (request.auth.token.role == 'coordinator' || 
     (request.auth.token.role == 'recruiter' && 
      resource.data.domain == request.auth.token.email.split('@')[1]));
}
\`\`\`

And the candidate applicant review table for **\`dashboard.tsx\`**:
\`\`\`tsx
export function ApplicantReviewTable({ applicants }: { applicants: Applicant[] }) {
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
          <tr>
            <th className="py-2.5 px-4 font-medium">Candidate</th>
            <th className="py-2.5 px-4 font-medium">Degree & Major</th>
            <th className="py-2.5 px-4 font-medium">Skills Match</th>
            <th className="py-2.5 px-4 font-medium">Status</th>
            <th className="py-2.5 px-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {applicants.map(app => (
            <tr key={app.id} className="hover:bg-neutral-50/50">
              <td className="py-3 px-4 font-medium text-neutral-900">{app.name}</td>
              <td className="py-3 px-4 text-neutral-600">{app.major}</td>
              <td className="py-3 px-4 tabular-nums text-emerald-600 font-medium">{app.matchScore}%</td>
              <td className="py-3 px-4 text-xs">{app.status}</td>
              <td className="py-3 px-4 text-right">
                <button className="text-xs px-2.5 py-1 bg-neutral-900 text-white rounded hover:bg-neutral-800">
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
\`\`\`

⚠️ **Notice**: This AI session has reached its active token capacity limit (42,800 tokens). CONTINUA has safeguarded all project memory, decisions, and files.`,
      timestamp: 'Today, 12:54 PM',
      tokens: 680
    }
  ]
};

export const initialConnectors: Connector[] = [
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development',
    icon: 'Github',
    description: 'Sync repository metadata, inspect source code files, and link issues directly into project memory.',
    capabilities: ['Read repository structure', 'Inspect file content', 'Link issues & pull requests'],
    status: 'connected',
    connectedAs: 'Demo Developer (@rohitha-dev)',
    connectedAt: '2026-09-18 10:30 AM',
    permissions: [
      { id: 'repo-meta', name: 'Repository metadata', granted: true },
      { id: 'repo-files', name: 'Selected repository files', granted: true },
      { id: 'repo-issues', name: 'Issues and pull requests', granted: true }
    ],
    demoItemsCount: 14,
    demoFiles: [
      { name: 'README.md', type: 'Markdown', details: 'Project documentation and setup guide', path: '/README.md' },
      { name: 'login.tsx', type: 'TypeScript React', details: 'Dual-role authentication component', path: '/src/components/login.tsx' },
      { name: 'dashboard.tsx', type: 'TypeScript React', details: 'Recruiter talent review workspace', path: '/src/components/dashboard.tsx' },
      { name: 'profile.tsx', type: 'TypeScript React', details: 'Student profile & academic transcript view', path: '/src/components/profile.tsx' },
      { name: 'firebase.ts', type: 'TypeScript', details: 'Firebase client auth & Firestore configuration', path: '/src/lib/firebase.ts' },
      { name: 'resume-upload.tsx', type: 'TypeScript React', details: 'Candidate PDF upload & drag-drop handler', path: '/src/components/resume-upload.tsx' }
    ]
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    category: 'Cloud Storage',
    icon: 'HardDrive',
    description: 'Attach design briefs, placement policy documents, and requirements directly to AI chat sessions.',
    capabilities: ['Browse shared folders', 'Attach PDF/Docx files', 'Extract document text snippets'],
    status: 'connected',
    connectedAs: 'rohithakoppu2007@gmail.com',
    connectedAt: '2026-09-18 11:15 AM',
    permissions: [
      { id: 'drive-readonly', name: 'Read-only access to selected project documents', granted: true },
      { id: 'drive-metadata', name: 'File metadata and revisions', granted: true }
    ],
    demoItemsCount: 8,
    demoFiles: [
      { name: 'placement-requirements.pdf', type: 'PDF Document', details: 'Official university placement specifications (42 KB)' },
      { name: 'resume-format.docx', type: 'Word Document', details: 'Standard university resume template (18 KB)' },
      { name: 'project-notes.pdf', type: 'PDF Document', details: 'Kickoff meeting architectural notes (64 KB)' }
    ]
  },
  {
    id: 'gcalendar',
    name: 'Google Calendar',
    category: 'Productivity',
    icon: 'Calendar',
    description: 'Coordinate placement interviews, hackathon milestones, and scheduled AI project summaries.',
    capabilities: ['Read calendar availability', 'Schedule interview slots', 'Sync project deadlines'],
    status: 'connected',
    connectedAs: 'rohithakoppu2007@gmail.com',
    connectedAt: '2026-09-19 09:00 AM',
    permissions: [
      { id: 'cal-read', name: 'View primary calendar events', granted: true },
      { id: 'cal-create', name: 'Create interview appointments', granted: true }
    ],
    demoItemsCount: 4,
    demoEvents: [
      { title: 'Hackathon Review', time: 'Tomorrow, 10:00 AM – 11:30 AM', attendees: 'Evaluation Jury & Team Leads' },
      { title: 'Placement Presentation', time: 'Monday, 2:00 PM – 3:30 PM', attendees: 'Dean of Careers & Corporate Recruiters' },
      { title: 'Architecture Sync: Security Rules', time: 'Wednesday, 4:00 PM', attendees: 'Engineering Core Team' }
    ]
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    icon: 'MessageSquare',
    description: 'Deliver project milestone alerts, AI session handoff summaries, and task completions to your team channels.',
    capabilities: ['Post project updates', 'Receive alert webhooks', 'Sync thread discussions'],
    status: 'disconnected',
    permissions: [
      { id: 'slack-channels', name: 'Access public channels', granted: false },
      { id: 'slack-post', name: 'Post messages as CONTINUA bot', granted: false }
    ]
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity',
    icon: 'FileText',
    description: 'Sync project memory, decisions, and tasks into shared Notion team databases automatically.',
    capabilities: ['Read project pages', 'Write decision log entries', 'Sync sprint tasks'],
    status: 'disconnected',
    permissions: [
      { id: 'notion-pages', name: 'Read and write selected pages', granted: false }
    ]
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    icon: 'Layers',
    description: 'Inspect design tokens, UI wireframes, and component specs directly inside CONTINUA workspace.',
    capabilities: ['Inspect frame nodes', 'Extract color & typography variables', 'Render frame previews'],
    status: 'disconnected',
    permissions: [
      { id: 'figma-read', name: 'Read team design files', granted: false }
    ]
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    category: 'Cloud Storage',
    icon: 'Box',
    description: 'Link enterprise file archives and candidate portfolios stored in team Dropbox folders.',
    capabilities: ['Browse folder trees', 'Stream media assets'],
    status: 'disconnected',
    permissions: [
      { id: 'dropbox-files', name: 'Read files in designated CONTINUA folder', granted: false }
    ]
  }
];

export const initialTools: ToolPlugin[] = [
  {
    id: 'tool-code-analyzer',
    name: 'Code Analyzer',
    category: 'Coding',
    icon: 'Code',
    description: 'Performs static analysis, detects potential security oversights, and reviews architectural patterns.',
    capabilities: ['Type safety check', 'Security rule validation', 'Component dependency audit'],
    installed: true,
    version: '1.4.0',
    author: 'CONTINUA Labs'
  },
  {
    id: 'tool-pdf-analyzer',
    name: 'PDF Analyzer',
    category: 'Research',
    icon: 'FileSearch',
    description: 'Extracts structured tables, resumes, and text hierarchies from complex PDF documents with zero hallucination.',
    capabilities: ['Resume parsing', 'Document summarization', 'Table extraction'],
    installed: true,
    version: '2.1.0',
    author: 'CONTINUA Labs'
  },
  {
    id: 'tool-research-assistant',
    name: 'Research Assistant',
    category: 'Research',
    icon: 'Sparkles',
    description: 'Gathers academic citations, competitive benchmarks, and technical documentation synthesis.',
    capabilities: ['Domain research', 'Competitive analysis', 'Literature review'],
    installed: true,
    version: '1.2.5',
    author: 'CONTINUA Labs'
  },
  {
    id: 'tool-meeting-summarizer',
    name: 'Meeting Summarizer',
    category: 'Productivity',
    icon: 'Mic',
    description: 'Turns audio transcripts into structured action items, decisions, and tasks for project memory.',
    capabilities: ['Audio transcript ingestion', 'Decision extraction', 'Task assigner'],
    installed: false,
    version: '1.0.8',
    author: 'Productivity Hub'
  },
  {
    id: 'tool-project-planner',
    name: 'Project Planner & Gantt',
    category: 'Productivity',
    icon: 'CalendarCheck',
    description: 'Estimates task complexity, identifies critical path bottlenecks, and schedules sprint milestones.',
    capabilities: ['Milestone calculation', 'Dependency resolution', 'Capacity modeling'],
    installed: false,
    version: '1.3.2',
    author: 'Agile Systems'
  },
  {
    id: 'tool-database-explorer',
    name: 'Database Explorer',
    category: 'Data',
    icon: 'Database',
    description: 'Inspects Firestore and SQL collections, queries indexes, and visualizes document relationships.',
    capabilities: ['Schema visualization', 'Index optimization tips', 'Live collection preview'],
    installed: false,
    version: '1.1.4',
    author: 'Cloud Data Tooling'
  },
  {
    id: 'tool-ui-critic',
    name: 'UI Critic & Accessibility Auditor',
    category: 'Design',
    icon: 'Eye',
    description: 'Audits layouts against WCAG AA standards, typographic hierarchy, and anti-AI slop design discipline.',
    capabilities: ['Color contrast check', 'Keyboard navigation audit', 'Visual balance check'],
    installed: false,
    version: '2.0.1',
    author: 'Design Standard Alliance'
  }
];

export const initialFiles: FileItem[] = [
  {
    id: 'file-1',
    name: 'placement-requirements.pdf',
    type: 'document',
    extension: 'pdf',
    size: '42 KB',
    dateAdded: '2026-09-18',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    isProjectMemorySource: true,
    memoryPurpose: 'Core specifications for placement gates, candidate eligibility, and company quotas.',
    source: 'gdrive',
    contentSnippet: 'University placement requirements covering graduation criteria, minimum CGPA 7.0, verified internship credits, and recruiter tier limits.'
  },
  {
    id: 'file-2',
    name: 'resume-format.docx',
    type: 'document',
    extension: 'docx',
    size: '18 KB',
    dateAdded: '2026-09-19',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    isProjectMemorySource: true,
    memoryPurpose: 'Standard institutional resume format template for automated parsing.',
    source: 'gdrive',
    contentSnippet: 'Standardized resume layout guidelines with sections for Education, Technical Projects, Internships, Publications, and Certifications.'
  },
  {
    id: 'file-3',
    name: 'project-notes.pdf',
    type: 'document',
    extension: 'pdf',
    size: '64 KB',
    dateAdded: '2026-09-20',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    isProjectMemorySource: false,
    source: 'gdrive',
    contentSnippet: 'Minutes from initial stakeholder meeting with Placement Officer and Student Council Representatives.'
  },
  {
    id: 'file-4',
    name: 'firebase.ts',
    type: 'code',
    extension: 'ts',
    size: '4 KB',
    dateAdded: '2026-09-19',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    isProjectMemorySource: true,
    memoryPurpose: 'Client Firebase configuration and Auth persistence layer.',
    source: 'github',
    contentSnippet: 'export const app = initializeApp(firebaseConfig);\nexport const auth = getAuth(app);\nexport const db = getFirestore(app);'
  },
  {
    id: 'file-5',
    name: 'login.tsx',
    type: 'code',
    extension: 'tsx',
    size: '8 KB',
    dateAdded: '2026-09-20',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    isProjectMemorySource: true,
    memoryPurpose: 'Dual-role user authentication interface.',
    source: 'github',
    contentSnippet: 'export function LoginPage() {\n  const [role, setRole] = useState<"student" | "recruiter">("student");\n  // ...\n}'
  },
  {
    id: 'file-6',
    name: 'dashboard.tsx',
    type: 'code',
    extension: 'tsx',
    size: '12 KB',
    dateAdded: '2026-09-22',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    isProjectMemorySource: true,
    memoryPurpose: 'Active Recruiter workspace layout with applicant pipeline.',
    source: 'github',
    contentSnippet: 'export function RecruiterDashboard() {\n  // Applicant pipeline stages and review modal\n}'
  },
  {
    id: 'file-7',
    name: 'resume-upload.tsx',
    type: 'code',
    extension: 'tsx',
    size: '6 KB',
    dateAdded: '2026-09-21',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    isProjectMemorySource: false,
    source: 'github',
    contentSnippet: 'export function ResumeUploadZone({ onFileUploaded }: Props) {\n  // PDF drop zone with client-side mime check\n}'
  },
  {
    id: 'file-8',
    name: 'hackathon-rubric.pdf',
    type: 'document',
    extension: 'pdf',
    size: '35 KB',
    dateAdded: '2026-09-21',
    projectId: 'proj-hackathon',
    projectName: 'College Hackathon Portal',
    isProjectMemorySource: true,
    memoryPurpose: 'Evaluation scoring rubric for hackathon judges.',
    source: 'upload',
    contentSnippet: 'Judging scoring criteria: Innovation (30%), Technical Execution (30%), Design & UX (20%), Business Viability (20%).'
  },
  {
    id: 'file-9',
    name: 'candidate-mock-roster.csv',
    type: 'spreadsheet',
    extension: 'csv',
    size: '22 KB',
    dateAdded: '2026-09-23',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    isProjectMemorySource: false,
    source: 'upload',
    contentSnippet: 'RollNo,Name,Department,CGPA,PlacedStatus\n2022CS01,Aarav Patel,Computer Science,8.9,Open\n2022CS02,Priya Sharma,Information Tech,9.2,Shortlisted'
  },
  {
    id: 'file-10',
    name: 'security-audit-report.pdf',
    type: 'document',
    extension: 'pdf',
    size: '51 KB',
    dateAdded: '2026-09-24',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    isProjectMemorySource: true,
    memoryPurpose: 'Penetration test findings & Firestore security rules remediation list.',
    source: 'upload',
    contentSnippet: 'Rule security audit flagged unauthenticated recruiter document creation. Remediated with custom token domain assertion.'
  }
];

export const initialImages: ImageItem[] = [
  {
    id: 'img-1',
    name: 'Placement Platform Dashboard UI',
    url: '/src/assets/images/project_placement_preview_1790366926504.jpg',
    type: 'project',
    projectId: 'proj-placement',
    projectName: 'Student Placement Platform',
    date: '2026-09-25',
    dimensions: '1920 × 1080',
    prompt: 'Modern clean software dashboard interface concept for student career placement platform, subtle light gray cards, data charts, minimal Scandinavian tech aesthetic.'
  },
  {
    id: 'img-2',
    name: 'College Hackathon Collaboration Canvas',
    url: '/src/assets/images/project_hackathon_preview_1790366938521.jpg',
    type: 'project',
    projectId: 'proj-hackathon',
    projectName: 'College Hackathon Portal',
    date: '2026-09-25',
    dimensions: '1920 × 1080',
    prompt: 'Sleek modern collaborative workspace graphic for team hackathon, white and slate tones, blueprint sketches, high quality product visualization.'
  },
  {
    id: 'img-3',
    name: 'Developer Profile Avatar',
    url: '/src/assets/images/avatar_demo_user_1790366914203.jpg',
    type: 'uploaded',
    date: '2026-09-25',
    dimensions: '1024 × 1024',
    prompt: 'Professional studio headshot portrait of a friendly tech developer, warm natural lighting, modern minimalist gray background.'
  }
];

export const initialScheduledTasks: ScheduledTask[] = [
  {
    id: 'sch-1',
    title: 'Generate Weekly Project Progress Summary',
    schedule: 'Every Monday at 9:00 AM',
    nextRun: 'Monday, Sept 29, 2026 at 9:00 AM',
    status: 'active',
    lastRunStatus: 'Completed successfully · Snapshot #07 archived',
    actionDescription: 'Analyzes all conversations, closed tasks, and updated decisions across active projects, outputting an executive status brief.',
    projectId: 'proj-placement'
  },
  {
    id: 'sch-2',
    title: 'Review Pending Tasks & Unresolved Blockers',
    schedule: 'Every Friday at 5:00 PM',
    nextRun: 'Friday, Oct 3, 2026 at 5:00 PM',
    status: 'active',
    lastRunStatus: 'Completed · 3 pending items flagged',
    actionDescription: 'Audits open questions and unresolved blockers in project memory, sending a reminder notification.',
    projectId: 'proj-placement'
  },
  {
    id: 'sch-3',
    title: 'Prepare Hackathon Presentation Checklist',
    schedule: 'Tomorrow at 8:00 AM',
    nextRun: 'Tomorrow at 8:00 AM',
    status: 'active',
    lastRunStatus: 'Scheduled',
    actionDescription: 'Compiles final feature completeness checklist against hackathon rubric specifications.',
    projectId: 'proj-hackathon'
  }
];

export const initialNotifications: ContinuaNotification[] = [
  {
    id: 'notif-1',
    type: 'session_limit',
    title: 'AI Session Token Threshold Reached',
    message: 'Demo AI Workspace has reached 42,800 tokens in "Recruiter Dashboard". All project memory is safeguarded. Ready for cross-AI handoff.',
    timestamp: '12 minutes ago',
    read: false,
    actionLabel: 'Continue with Another AI',
    targetView: 'chat',
    targetId: 'conv-placement-1'
  },
  {
    id: 'notif-2',
    type: 'snapshot_created',
    title: 'Work Snapshot #08 Saved',
    message: 'Snapshot #08 "Before AI Handoff" created automatically. 12 decisions, 8 completed tasks, and 10 files anchored to project memory.',
    timestamp: '15 minutes ago',
    read: false,
    actionLabel: 'View Snapshot',
    targetView: 'project-detail',
    targetId: 'proj-placement'
  },
  {
    id: 'notif-3',
    type: 'handoff_ready',
    title: 'Continuation Package Ready',
    message: 'Package #08 prepared with ~89% context compression (42,800 → 4,900 tokens). Instant handoff ready.',
    timestamp: '10 minutes ago',
    read: false,
    actionLabel: 'Inspect Package',
    targetView: 'handoffs',
    targetId: 'pkg-08'
  },
  {
    id: 'notif-4',
    type: 'connector_connected',
    title: 'GitHub Repository Synced',
    message: 'Connected repository "student-placement-platform" with 14 source files and 3 issues mapped.',
    timestamp: '3 hours ago',
    read: true,
    actionLabel: 'Manage Connectors',
    targetView: 'connectors',
    targetId: 'github'
  },
  {
    id: 'notif-5',
    type: 'task_reminder',
    title: 'Unresolved Security Blocker',
    message: 'Recruiter verification rule in firestore.rules requires coordinator claim patch.',
    timestamp: '1 day ago',
    read: true,
    actionLabel: 'Inspect Blocker',
    targetView: 'project-detail',
    targetId: 'proj-placement'
  }
];

export const initialAIProviders: AIProvider[] = [
  {
    id: 'ai-workspace-a',
    name: 'Demo AI Workspace',
    model: 'Workspace Alpha 4.2',
    contextWindow: '45,000 tokens',
    providerType: 'general',
    status: 'limit_reached',
    sessionTokensUsed: 42800,
    sessionTokenLimit: 45000,
    badge: 'Session Limit Reached',
    description: 'Current active session engine. Context saturated; ready for CONTINUA handoff package export.'
  },
  {
    id: 'ai-coding',
    name: 'Coding AI Engine',
    model: 'DeepCode 3.1 Pro',
    contextWindow: '128,000 tokens',
    providerType: 'coding',
    status: 'ready',
    sessionTokensUsed: 0,
    sessionTokenLimit: 128000,
    badge: 'Recommended for Continuation',
    description: 'Optimized for TypeScript, security rules, and component implementation without restarting context.'
  },
  {
    id: 'ai-workspace-b',
    name: 'Creative AI Assistant',
    model: 'Creative Flow 2',
    contextWindow: '64,000 tokens',
    providerType: 'creative',
    status: 'ready',
    sessionTokensUsed: 0,
    sessionTokenLimit: 64000,
    badge: 'Ready',
    description: 'Specialized in UI/UX architecture, design copy, and interactive layout structuring.'
  },
  {
    id: 'ai-workspace-c',
    name: 'Reasoning Model 3.5',
    model: 'Reasoning Pro 1.2',
    contextWindow: '128,000 tokens',
    providerType: 'reasoning',
    status: 'ready',
    sessionTokensUsed: 0,
    sessionTokenLimit: 128000,
    badge: 'Ready',
    description: 'High-depth logic analysis for algorithms, data modeling, and security verification.'
  }
];
