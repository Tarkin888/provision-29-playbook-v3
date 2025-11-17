import type {
  Phase,
  PhaseData,
  Template,
  TemplateData,
  TemplateType,
  Milestone,
  MilestoneData,
  Role,
  RoleData,
  FAQ,
  FAQData,
  GlossaryTerm,
  GlossaryData,
  Resource,
  ResourceData,
  CaseStudy,
  Video,
} from '@/types/data';

// Import JSON data
import phasesData from '@/data/phases.json';
import templatesData from '@/data/templates.json';
import milestonesData from '@/data/milestones.json';
import rolesData from '@/data/roles.json';
import faqsData from '@/data/faqs.json';
import glossaryData from '@/data/glossary.json';
import resourcesData from '@/data/resources.json';

// Type assertions for imported JSON
const phases = (phasesData as PhaseData).phases;
const templates = (templatesData as TemplateData).templates;
const milestones = (milestonesData as MilestoneData).milestones;
const roles = (rolesData as RoleData).roles;
const faqs = (faqsData as FAQData).faqs;
const glossary = (glossaryData as GlossaryData).glossary;
const resources = resourcesData as ResourceData;

// ============================================================================
// PHASE LOADER
// ============================================================================
const PhaseLoader = {
  /**
   * Get all phases
   */
  getAll(): Phase[] {
    return phases;
  },

  /**
   * Get phase by ID
   */
  getById(id: number): Phase | undefined {
    return phases.find((phase) => phase.id === id);
  },

  /**
   * Get phase by short name
   */
  getByShortName(shortName: string): Phase | undefined {
    return phases.find(
      (phase) => phase.shortName.toLowerCase() === shortName.toLowerCase()
    );
  },

  /**
   * Get current phase based on current date and week
   * @param currentWeek - Current week number (1-104)
   */
  getCurrent(currentWeek: number): Phase | undefined {
    return phases.find(
      (phase) => currentWeek >= phase.startWeek && currentWeek <= phase.endWeek
    );
  },

  /**
   * Get timeline view of all phases
   */
  getTimeline(): Array<{
    phase: Phase;
    startWeek: number;
    endWeek: number;
    durationWeeks: number;
  }> {
    return phases.map((phase) => ({
      phase,
      startWeek: phase.startWeek,
      endWeek: phase.endWeek,
      durationWeeks: phase.endWeek - phase.startWeek + 1,
    }));
  },

  /**
   * Get phases by year
   */
  getByYear(year: number): Phase[] {
    return phases.filter((phase) => phase.timing.includes(year.toString()));
  },
};

// ============================================================================
// TEMPLATE LOADER
// ============================================================================
const TemplateLoader = {
  /**
   * Get all templates
   */
  getAll(): Template[] {
    return templates;
  },

  /**
   * Get template by ID
   */
  getById(id: string): Template | undefined {
    return templates.find((template) => template.id === id);
  },

  /**
   * Get templates by phase
   */
  getByPhase(phaseId: number): Template[] {
    return templates.filter((template) => template.phase === phaseId);
  },

  /**
   * Get templates by role
   */
  getByRole(roleId: string): Template[] {
    return templates.filter((template) =>
      template.roles.some((role) => role.toLowerCase().includes(roleId.toLowerCase()))
    );
  },

  /**
   * Get templates by type
   */
  getByType(type: TemplateType): Template[] {
    return templates.filter((template) => template.type === type);
  },

  /**
   * Search templates by keyword
   */
  search(query: string): Template[] {
    const lowerQuery = query.toLowerCase();
    return templates.filter(
      (template) =>
        template.name.toLowerCase().includes(lowerQuery) ||
        template.description.toLowerCase().includes(lowerQuery) ||
        template.keyFeatures.some((feature) =>
          feature.toLowerCase().includes(lowerQuery)
        )
    );
  },

  /**
   * Get templates by format
   */
  getByFormat(format: string): Template[] {
    return templates.filter(
      (template) => template.format.toLowerCase() === format.toLowerCase()
    );
  },

  /**
   * Get all unique template types
   */
  getTypes(): TemplateType[] {
    return Array.from(new Set(templates.map((t) => t.type)));
  },
};

// ============================================================================
// MILESTONE LOADER
// ============================================================================
const MilestoneLoader = {
  /**
   * Get all milestones
   */
  getAll(): Milestone[] {
    return milestones;
  },

  /**
   * Get milestone by ID
   */
  getById(id: string): Milestone | undefined {
    return milestones.find((milestone) => milestone.id === id);
  },

  /**
   * Get critical milestones only
   */
  getCritical(): Milestone[] {
    return milestones.filter((milestone) => milestone.critical);
  },

  /**
   * Get decision gates (milestones requiring decisions)
   */
  getDecisionGates(): Milestone[] {
    return milestones.filter((milestone) => milestone.decisionRequired);
  },

  /**
   * Get upcoming milestones from a given week
   */
  getUpcoming(currentWeek: number, limit: number = 5): Milestone[] {
    return milestones
      .filter((milestone) => milestone.week >= currentWeek)
      .sort((a, b) => a.week - b.week)
      .slice(0, limit);
  },

  /**
   * Get milestones by phase
   */
  getByPhase(phaseId: number): Milestone[] {
    return milestones.filter((milestone) => milestone.phase === phaseId);
  },

  /**
   * Get milestones by owner
   */
  getByOwner(owner: string): Milestone[] {
    return milestones.filter(
      (milestone) => milestone.owner.toLowerCase() === owner.toLowerCase()
    );
  },

  /**
   * Get milestones by date range
   */
  getByDateRange(startDate: string, endDate: string): Milestone[] {
    return milestones.filter(
      (milestone) => milestone.date >= startDate && milestone.date <= endDate
    );
  },

  /**
   * Get milestone timeline grouped by phase
   */
  getTimelineByPhase(): Record<number, Milestone[]> {
    return milestones.reduce((acc, milestone) => {
      if (!acc[milestone.phase]) {
        acc[milestone.phase] = [];
      }
      acc[milestone.phase].push(milestone);
      return acc;
    }, {} as Record<number, Milestone[]>);
  },
};

// ============================================================================
// ROLE LOADER
// ============================================================================
const RoleLoader = {
  /**
   * Get all roles
   */
  getAll(): Role[] {
    return roles;
  },

  /**
   * Get role by ID
   */
  getById(id: string): Role | undefined {
    return roles.find((role) => role.id === id);
  },

  /**
   * Search roles by keyword
   */
  search(query: string): Role[] {
    const lowerQuery = query.toLowerCase();
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(lowerQuery) ||
        role.description.toLowerCase().includes(lowerQuery) ||
        role.keyResponsibilities.some((resp) =>
          resp.toLowerCase().includes(lowerQuery)
        )
    );
  },

  /**
   * Get roles with specific template recommendation
   */
  getByTemplate(templateId: string): Role[] {
    return roles.filter((role) =>
      role.recommendedTemplates.includes(templateId)
    );
  },

  /**
   * Get executive roles
   */
  getExecutiveRoles(): Role[] {
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes('director') ||
        role.name.toLowerCase().includes('ceo') ||
        role.name.toLowerCase().includes('cfo') ||
        role.name.toLowerCase().includes('cro')
    );
  },

  /**
   * Get operational roles
   */
  getOperationalRoles(): Role[] {
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes('owner') ||
        role.name.toLowerCase().includes('manager') ||
        role.name.toLowerCase().includes('analyst')
    );
  },
};

// ============================================================================
// FAQ LOADER
// ============================================================================
const FAQLoader = {
  /**
   * Get all FAQs
   */
  getAll(): FAQ[] {
    return faqs;
  },

  /**
   * Get FAQ by ID
   */
  getById(id: string): FAQ | undefined {
    return faqs.find((faq) => faq.id === id);
  },

  /**
   * Get FAQs by category
   */
  getByCategory(category: string): FAQ[] {
    return faqs.filter(
      (faq) => faq.category.toLowerCase() === category.toLowerCase()
    );
  },

  /**
   * Search FAQs by keyword
   */
  search(query: string): FAQ[] {
    const lowerQuery = query.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(lowerQuery) ||
        faq.answer.toLowerCase().includes(lowerQuery) ||
        faq.category.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get all unique categories
   */
  getCategories(): string[] {
    return Array.from(new Set(faqs.map((faq) => faq.category)));
  },

  /**
   * Get FAQs grouped by category
   */
  getGroupedByCategory(): Record<string, FAQ[]> {
    return faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, FAQ[]>);
  },
};

// ============================================================================
// GLOSSARY LOADER
// ============================================================================
const GlossaryLoader = {
  /**
   * Get all glossary terms
   */
  getAll(): GlossaryTerm[] {
    return glossary;
  },

  /**
   * Get term by exact name
   */
  getByTerm(term: string): GlossaryTerm | undefined {
    return glossary.find(
      (item) => item.term.toLowerCase() === term.toLowerCase()
    );
  },

  /**
   * Search glossary by keyword
   */
  search(query: string): GlossaryTerm[] {
    const lowerQuery = query.toLowerCase();
    return glossary.filter(
      (item) =>
        item.term.toLowerCase().includes(lowerQuery) ||
        item.definition.toLowerCase().includes(lowerQuery) ||
        item.example.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get alphabetical index (letters that have terms)
   */
  getAlphabet(): string[] {
    const letters = new Set(
      glossary.map((item) => item.term.charAt(0).toUpperCase())
    );
    return Array.from(letters).sort();
  },

  /**
   * Get terms starting with a specific letter
   */
  getByLetter(letter: string): GlossaryTerm[] {
    return glossary
      .filter(
        (item) =>
          item.term.charAt(0).toLowerCase() === letter.toLowerCase()
      )
      .sort((a, b) => a.term.localeCompare(b.term));
  },

  /**
   * Get related terms for a given term
   */
  getRelatedTerms(term: string): GlossaryTerm[] {
    const mainTerm = this.getByTerm(term);
    if (!mainTerm) return [];
    
    return mainTerm.relatedTerms
      .map((relatedTerm) => this.getByTerm(relatedTerm))
      .filter((term): term is GlossaryTerm => term !== undefined);
  },
};

// ============================================================================
// RESOURCE LOADER
// ============================================================================
const ResourceLoader = {
  /**
   * Get all articles
   */
  getArticles(): Resource[] {
    return resources.articles || [];
  },

  /**
   * Get article by ID
   */
  getArticleById(id: string): Resource | undefined {
    return resources.articles?.find((article) => article.id === id);
  },

  /**
   * Get articles by category
   */
  getArticlesByCategory(category: string): Resource[] {
    return (resources.articles || []).filter(
      (article) => article.category.toLowerCase() === category.toLowerCase()
    );
  },

  /**
   * Get articles by tag
   */
  getArticlesByTag(tag: string): Resource[] {
    return (resources.articles || []).filter((article) =>
      article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  },

  /**
   * Search articles by keyword
   */
  searchArticles(query: string): Resource[] {
    const lowerQuery = query.toLowerCase();
    return (resources.articles || []).filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.author.toLowerCase().includes(lowerQuery) ||
        article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  },

  /**
   * Get all case studies
   */
  getCaseStudies(): CaseStudy[] {
    return resources.caseStudies || [];
  },

  /**
   * Get case study by ID
   */
  getCaseStudyById(id: string): CaseStudy | undefined {
    return resources.caseStudies?.find((cs) => cs.id === id);
  },

  /**
   * Get case studies by sector
   */
  getCaseStudiesBySector(sector: string): CaseStudy[] {
    return (resources.caseStudies || []).filter(
      (cs) => cs.sector.toLowerCase() === sector.toLowerCase()
    );
  },

  /**
   * Get all videos
   */
  getVideos(): Video[] {
    return resources.videos || [];
  },

  /**
   * Get video by ID
   */
  getVideoById(id: string): Video | undefined {
    return resources.videos?.find((video) => video.id === id);
  },

  /**
   * Get videos by category
   */
  getVideosByCategory(category: string): Video[] {
    return (resources.videos || []).filter(
      (video) => video.category.toLowerCase() === category.toLowerCase()
    );
  },

  /**
   * Get all unique article categories
   */
  getArticleCategories(): string[] {
    return Array.from(
      new Set((resources.articles || []).map((a) => a.category))
    );
  },

  /**
   * Get all unique tags
   */
  getAllTags(): string[] {
    const tags = new Set<string>();
    (resources.articles || []).forEach((article) => {
      article.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  },

  /**
   * Get featured articles (first 3)
   */
  getFeaturedArticles(limit: number = 3): Resource[] {
    return (resources.articles || []).slice(0, limit);
  },
};

// ============================================================================
// MASTER EXPORT
// ============================================================================
export const P29Data = {
  phases: PhaseLoader,
  templates: TemplateLoader,
  milestones: MilestoneLoader,
  roles: RoleLoader,
  faqs: FAQLoader,
  glossary: GlossaryLoader,
  resources: ResourceLoader,
};

// Export individual loaders for direct imports
export {
  PhaseLoader,
  TemplateLoader,
  MilestoneLoader,
  RoleLoader,
  FAQLoader,
  GlossaryLoader,
  ResourceLoader,
};
