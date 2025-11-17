// Phase & Activity Types
export interface KeyActivity {
  id: string;
  name: string;
  description: string;
  subTasks: string[];
}

export interface Deliverable {
  name: string;
  description?: string;
  owner?: string;
  dueDate?: string;
}

export interface CommonPitfall {
  pitfall: string;
  impact: string;
  solution: string;
}

export interface Phase {
  id: number;
  name: string;
  shortName: string;
  color: string;
  duration: string;
  timing: string;
  startWeek: number;
  endWeek: number;
  objective: string;
  keyActivities: KeyActivity[];
  deliverables?: Deliverable[];
  criticalSuccessFactors?: string[];
  commonPitfalls?: CommonPitfall[];
}

// Milestone Types
export interface Milestone {
  id: string;
  week: number;
  date: string;
  phase: number;
  name: string;
  description: string;
  critical: boolean;
  decisionRequired: boolean;
  decisionGate?: string;
  owner: string;
  deliverables: string[];
  successCriteria: string[];
  goCriteria?: string[];
  noGoCriteria?: string[];
  declarationOptions?: string[];
}

export interface DecisionGate {
  id: string;
  week: number;
  date: string;
  phase: number;
  name: string;
  description: string;
  owner: string;
  approvers?: string[];
  exitCriteria?: string[];
}

// Template Types
export type TemplateType = 'Assessment' | 'Documentation' | 'Workshop' | 'Dashboard' | 'Process';

export interface Template {
  id: string;
  name: string;
  phase: number;
  type: TemplateType;
  format: string;
  roles: string[];
  description: string;
  keyFeatures: string[];
  downloadUrl: string;
  previewUrl: string;
}

// Role Types
export interface TaskItem {
  period: string;
  activity: string;
  duration?: string;
}

export interface RoleTimeline {
  period: string;
  activity: string;
}

export interface TrainingResource {
  title: string;
  type: string;
  duration: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  keyResponsibilities: string[];
  criticalQuestions: string[];
  timeline: RoleTimeline[];
  recommendedTemplates: string[];
  trainingResources: TrainingResource[];
  successMetrics: string[];
}

// FAQ Types
export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

// Glossary Types
export interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
  relatedTerms: string[];
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  excerpt: string;
  keyTakeaways: string[];
  url: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  sector: string;
  companySize: string;
  complexity: string;
  date: string;
  duration: string;
  controlCount: number;
  totalCost: string;
  summary: string;
  approach: string[];
  lessonsLearned: string[];
  results: string[];
  keyMetrics: {
    phaseBreakdown: Record<string, string>;
    resourceUtilisation: string;
    budgetBreakdown: Record<string, string>;
  };
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  category: string;
  audience: string[];
  description: string;
  keyTopics: string[];
  embedUrl: string;
  thumbnailUrl: string;
}

// Data file wrapper types
export interface FAQData {
  faqs: FAQ[];
}

export interface RoleData {
  roles: Role[];
}

export interface MilestoneData {
  milestones: Milestone[];
}

export interface TemplateData {
  templates: Template[];
}

export interface PhaseData {
  phases: Phase[];
}

export interface ResourceData {
  articles: Resource[];
  caseStudies?: CaseStudy[];
  videos?: Video[];
}

export interface GlossaryData {
  glossary: GlossaryTerm[];
}
