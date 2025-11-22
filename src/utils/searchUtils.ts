import { P29Data } from '@/data';

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  category: 'template' | 'faq' | 'glossary' | 'article' | 'page';
  url: string;
  icon?: string;
  relevance?: number;
}

// Highlight matching text in a string
export const highlightMatch = (text: string, query: string): string => {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
};

// Extract snippet around matching text
export const extractSnippet = (text: string, query: string, maxLength: number = 150): string => {
  if (!query) return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  
  if (index === -1) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');
  }
  
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + query.length + 100);
  
  let snippet = text.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';
  
  return snippet;
};

// Calculate relevance score
const calculateRelevance = (text: string, query: string): number => {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  let score = 0;
  
  // Exact match in title
  if (lowerText === lowerQuery) score += 100;
  
  // Starts with query
  if (lowerText.startsWith(lowerQuery)) score += 50;
  
  // Contains query
  if (lowerText.includes(lowerQuery)) score += 25;
  
  // Word matches
  const words = lowerQuery.split(' ');
  words.forEach(word => {
    if (lowerText.includes(word)) score += 10;
  });
  
  return score;
};

// Search templates
export const searchTemplates = (query: string, limit: number = 5): SearchResult[] => {
  if (!query) return [];
  
  const templates = P29Data.templates.getAll();
  const results: SearchResult[] = [];
  
  templates.forEach(template => {
    const searchText = [
      template.name,
      template.description,
      ...template.keyFeatures,
      ...template.roles,
    ].join(' ');
    
    if (searchText.toLowerCase().includes(query.toLowerCase())) {
      results.push({
        id: template.id,
        title: template.name,
        snippet: extractSnippet(template.description, query),
        category: 'template',
        url: `/templates?selected=${template.id}`,
        icon: '📄',
        relevance: calculateRelevance(template.name, query),
      });
    }
  });
  
  return results
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    .slice(0, limit);
};

// Search FAQs
export const searchFAQs = (query: string, limit: number = 5): SearchResult[] => {
  if (!query) return [];
  
  const faqs = P29Data.faqs.getAll();
  const results: SearchResult[] = [];
  
  faqs.forEach(faq => {
    const searchText = `${faq.question} ${faq.answer}`;
    
    if (searchText.toLowerCase().includes(query.toLowerCase())) {
      results.push({
        id: faq.id,
        title: faq.question,
        snippet: extractSnippet(faq.answer, query),
        category: 'faq',
        url: `/faq?q=${encodeURIComponent(faq.question)}`,
        icon: '❓',
        relevance: calculateRelevance(faq.question, query),
      });
    }
  });
  
  return results
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    .slice(0, limit);
};

// Search glossary
export const searchGlossary = (query: string, limit: number = 5): SearchResult[] => {
  if (!query) return [];
  
  const terms = P29Data.glossary.getAll();
  const results: SearchResult[] = [];
  
  terms.forEach(term => {
    const searchText = `${term.term} ${term.definition} ${term.example || ''}`;
    
    if (searchText.toLowerCase().includes(query.toLowerCase())) {
      results.push({
        id: term.term,
        title: term.term,
        snippet: extractSnippet(term.definition, query),
        category: 'glossary',
        url: `/glossary?term=${encodeURIComponent(term.term)}`,
        icon: '📖',
        relevance: calculateRelevance(term.term, query),
      });
    }
  });
  
  return results
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    .slice(0, limit);
};

// Search articles
export const searchArticles = (query: string, limit: number = 3): SearchResult[] => {
  if (!query) return [];
  
  const articles = P29Data.resources.getArticles();
  const results: SearchResult[] = [];
  
  articles.forEach(article => {
    const searchText = `${article.title} ${article.excerpt} ${article.author}`;
    
    if (searchText.toLowerCase().includes(query.toLowerCase())) {
      results.push({
        id: article.id,
        title: article.title,
        snippet: extractSnippet(article.excerpt, query),
        category: 'article',
        url: `/resources?tab=articles&id=${article.id}`,
        icon: '📰',
        relevance: calculateRelevance(article.title, query),
      });
    }
  });
  
  return results
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    .slice(0, limit);
};

// Search pages
export const searchPages = (query: string, limit: number = 3): SearchResult[] => {
  if (!query) return [];
  
  const pages = [
    { title: 'Implementation Roadmap', description: '24-month journey from scoping to declaration', url: '/roadmap', keywords: ['roadmap', 'implementation', 'phases', 'timeline'] },
    { title: 'Template Library', description: 'Ready-to-use templates and tools', url: '/templates', keywords: ['templates', 'tools', 'download'] },
    { title: 'Role Guides', description: 'Tailored guidance for boards, CFOs, risk, audit', url: '/roles', keywords: ['roles', 'board', 'cfo', 'audit', 'risk'] },
    { title: 'Resources Hub', description: 'Articles, case studies, and best practices', url: '/resources', keywords: ['resources', 'articles', 'case studies', 'videos'] },
    { title: 'FAQ', description: 'Frequently asked questions', url: '/faq', keywords: ['faq', 'questions', 'help'] },
    { title: 'Glossary', description: 'Key terms and definitions', url: '/glossary', keywords: ['glossary', 'terms', 'definitions'] },
    { title: 'Readiness Assessment', description: 'Evaluate your P29 readiness', url: '/assessment', keywords: ['assessment', 'evaluate', 'readiness', 'score'] },
  ];
  
  const results: SearchResult[] = [];
  
  pages.forEach(page => {
    const searchText = `${page.title} ${page.description} ${page.keywords.join(' ')}`;
    
    if (searchText.toLowerCase().includes(query.toLowerCase())) {
      results.push({
        id: page.url,
        title: page.title,
        snippet: page.description,
        category: 'page',
        url: page.url,
        icon: '🏠',
        relevance: calculateRelevance(page.title, query),
      });
    }
  });
  
  return results
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    .slice(0, limit);
};

// Global search across all categories
export const globalSearch = (query: string): {
  templates: SearchResult[];
  faqs: SearchResult[];
  glossary: SearchResult[];
  articles: SearchResult[];
  pages: SearchResult[];
  total: number;
} => {
  const templates = searchTemplates(query);
  const faqs = searchFAQs(query);
  const glossary = searchGlossary(query);
  const articles = searchArticles(query);
  const pages = searchPages(query);
  
  return {
    templates,
    faqs,
    glossary,
    articles,
    pages,
    total: templates.length + faqs.length + glossary.length + articles.length + pages.length,
  };
};

// Recent searches management
const RECENT_SEARCHES_KEY = 'p29-recent-searches';
const MAX_RECENT_SEARCHES = 5;

export const getRecentSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addRecentSearch = (query: string): void => {
  if (!query.trim()) return;
  
  try {
    let recent = getRecentSearches();
    
    // Remove if already exists
    recent = recent.filter(q => q.toLowerCase() !== query.toLowerCase());
    
    // Add to beginning
    recent.unshift(query);
    
    // Keep only max items
    recent = recent.slice(0, MAX_RECENT_SEARCHES);
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error saving recent search:', error);
    }
  }
};

export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error clearing recent searches:', error);
    }
  }
};
