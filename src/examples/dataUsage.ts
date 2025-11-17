/**
 * Example usage of P29Data infrastructure
 * This file demonstrates how to use the data loaders
 */

import { P29Data } from '@/data';

// ============================================================================
// PHASE EXAMPLES
// ============================================================================

// Get all phases
const allPhases = P29Data.phases.getAll();
console.log(`Total phases: ${allPhases.length}`);

// Get current phase (assuming we're in week 10)
const currentPhase = P29Data.phases.getCurrent(10);
console.log(`Current phase: ${currentPhase?.name}`);

// Get phase by ID
const phase1 = P29Data.phases.getById(1);
console.log(`Phase 1: ${phase1?.name} - ${phase1?.duration}`);

// ============================================================================
// TEMPLATE EXAMPLES
// ============================================================================

// Get all templates
const allTemplates = P29Data.templates.getAll();
console.log(`Total templates: ${allTemplates.length}`);

// Get templates for Phase 1
const phase1Templates = P29Data.templates.getByPhase(1);
console.log(`Phase 1 templates: ${phase1Templates.length}`);

// Get templates by role
const boardTemplates = P29Data.templates.getByRole('Board');
console.log(`Board templates: ${boardTemplates.length}`);

// Search templates
const controlTemplates = P29Data.templates.search('control');
console.log(`Templates about controls: ${controlTemplates.length}`);

// ============================================================================
// MILESTONE EXAMPLES
// ============================================================================

// Get all milestones
const allMilestones = P29Data.milestones.getAll();
console.log(`Total milestones: ${allMilestones.length}`);

// Get critical milestones only
const criticalMilestones = P29Data.milestones.getCritical();
console.log(`Critical milestones: ${criticalMilestones.length}`);

// Get upcoming milestones (from week 5)
const upcomingMilestones = P29Data.milestones.getUpcoming(5, 3);
console.log(`Next 3 milestones:`, upcomingMilestones.map(m => m.name));

// Get decision gates
const decisionGates = P29Data.milestones.getDecisionGates();
console.log(`Decision gates: ${decisionGates.length}`);

// ============================================================================
// ROLE EXAMPLES
// ============================================================================

// Get all roles
const allRoles = P29Data.roles.getAll();
console.log(`Total roles: ${allRoles.length}`);

// Get role by ID
const boardRole = P29Data.roles.getById('board');
console.log(`Board role: ${boardRole?.name}`);

// Search roles
const cfoRoles = P29Data.roles.search('CFO');
console.log(`CFO-related roles: ${cfoRoles.length}`);

// ============================================================================
// FAQ EXAMPLES
// ============================================================================

// Get all FAQs
const allFaqs = P29Data.faqs.getAll();
console.log(`Total FAQs: ${allFaqs.length}`);

// Get FAQs by category
const generalFaqs = P29Data.faqs.getByCategory('General');
console.log(`General FAQs: ${generalFaqs.length}`);

// Search FAQs
const materialityFaqs = P29Data.faqs.search('materiality');
console.log(`FAQs about materiality: ${materialityFaqs.length}`);

// Get all categories
const categories = P29Data.faqs.getCategories();
console.log(`FAQ categories:`, categories);

// ============================================================================
// GLOSSARY EXAMPLES
// ============================================================================

// Get all glossary terms
const allTerms = P29Data.glossary.getAll();
console.log(`Total glossary terms: ${allTerms.length}`);

// Get specific term
const materialControl = P29Data.glossary.getByTerm('Material Control');
console.log(`Material Control definition:`, materialControl?.definition.substring(0, 100) + '...');

// Search glossary
const riskTerms = P29Data.glossary.search('risk');
console.log(`Terms about risk: ${riskTerms.length}`);

// Get alphabetical index
const alphabet = P29Data.glossary.getAlphabet();
console.log(`Terms start with letters:`, alphabet);

// ============================================================================
// RESOURCE EXAMPLES
// ============================================================================

// Get all articles
const allArticles = P29Data.resources.getArticles();
console.log(`Total articles: ${allArticles.length}`);

// Get articles by category
const thoughtLeadership = P29Data.resources.getArticlesByCategory('Thought Leadership');
console.log(`Thought Leadership articles: ${thoughtLeadership.length}`);

// Get articles by tag
const phase1Articles = P29Data.resources.getArticlesByTag('Phase 1');
console.log(`Phase 1 articles: ${phase1Articles.length}`);

// Search articles
const boardArticles = P29Data.resources.searchArticles('board');
console.log(`Articles about board: ${boardArticles.length}`);

// Get case studies
const caseStudies = P29Data.resources.getCaseStudies();
console.log(`Total case studies: ${caseStudies.length}`);

// Get videos
const videos = P29Data.resources.getVideos();
console.log(`Total videos: ${videos.length}`);

export {};
