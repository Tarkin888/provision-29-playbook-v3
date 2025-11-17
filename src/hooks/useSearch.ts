import { useState, useEffect, useCallback } from 'react';
import { globalSearch, addRecentSearch, getRecentSearches } from '@/utils/searchUtils';
import type { SearchResult } from '@/utils/searchUtils';

interface SearchResults {
  templates: SearchResult[];
  faqs: SearchResult[];
  glossary: SearchResult[];
  articles: SearchResult[];
  pages: SearchResult[];
  total: number;
}

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({
    templates: [],
    faqs: [],
    glossary: [],
    articles: [],
    pages: [],
    total: 0,
  });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({
        templates: [],
        faqs: [],
        glossary: [],
        articles: [],
        pages: [],
        total: 0,
      });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      const searchResults = globalSearch(query);
      setResults(searchResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery);
      setRecentSearches(getRecentSearches());
    }
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    search,
    clearQuery,
    results,
    recentSearches,
    isSearching,
    hasResults: results.total > 0,
  };
};
