/**
 * Central data export for P29 Implementation Playbook
 * 
 * Usage:
 * import { P29Data } from '@/data';
 * 
 * const allPhases = P29Data.phases.getAll();
 * const criticalMilestones = P29Data.milestones.getCritical();
 * const faqsByCategory = P29Data.faqs.getByCategory('General');
 */

export { P29Data } from '@/utils/dataLoader';

export {
  PhaseLoader,
  TemplateLoader,
  MilestoneLoader,
  RoleLoader,
  FAQLoader,
  GlossaryLoader,
  ResourceLoader,
} from '@/utils/dataLoader';

export type {
  Phase,
  KeyActivity,
  Deliverable,
  Template,
  TemplateType,
  Milestone,
  DecisionGate,
  Role,
  RoleTimeline,
  TaskItem,
  TrainingResource,
  FAQ,
  GlossaryTerm,
  Resource,
  CaseStudy,
  Video,
} from '@/types/data';
