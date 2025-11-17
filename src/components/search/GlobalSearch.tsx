import { useEffect, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Clock, X } from 'lucide-react';
import { useSearchContext } from '@/contexts/SearchContext';
import { useSearch } from '@/hooks/useSearch';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import SearchResults from './SearchResults';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const GlobalSearch = () => {
  const { isSearchOpen, closeSearch } = useSearchContext();
  const { query, setQuery, results, recentSearches, isSearching, hasResults } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Close on Escape
  useKeyboardShortcut(['Escape'], closeSearch, { enabled: isSearchOpen });

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={closeSearch}>
      <DialogContent className="max-w-3xl max-h-[80vh] p-0 gap-0">
        {/* Search Input */}
        <div className="p-4 border-b sticky top-0 bg-background z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search templates, FAQs, terms..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Keyboard hint */}
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>
              {isSearching ? 'Searching...' : hasResults ? `${results.total} results` : ''}
            </span>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">↑↓</kbd>
              <span>navigate</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">↵</kbd>
              <span>select</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">esc</kbd>
              <span>close</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)] p-4">
          {!query && recentSearches.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Searches
              </h3>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-2 group"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-foreground group-hover:text-primary">
                      {search}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Press ↵
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!query && recentSearches.length === 0 && (
            <div className="py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Start typing to search across all content
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline">Templates</Badge>
                <Badge variant="outline">FAQs</Badge>
                <Badge variant="outline">Glossary</Badge>
                <Badge variant="outline">Articles</Badge>
                <Badge variant="outline">Pages</Badge>
              </div>
            </div>
          )}

          {query && (
            <SearchResults
              results={results}
              query={query}
              onSelect={closeSearch}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
