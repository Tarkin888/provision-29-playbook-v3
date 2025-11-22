import { SearchResult } from '@/utils/searchUtils';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';

interface SearchResultsProps {
  results: {
    templates: SearchResult[];
    faqs: SearchResult[];
    glossary: SearchResult[];
    articles: SearchResult[];
    pages: SearchResult[];
    total: number;
  };
  query: string;
  onSelect: () => void;
}

const SearchResults = ({ results, query, onSelect }: SearchResultsProps) => {
  const navigate = useNavigate();

  const handleResultClick = (url: string) => {
    navigate(url);
    onSelect();
  };

  const renderResultItem = (result: SearchResult, index: number) => (
    <button
      key={result.id}
      onClick={() => handleResultClick(result.url)}
      className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors group"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{result.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              <Highlighter
                searchWords={[query]}
                textToHighlight={result.title}
                highlightClassName="bg-yellow-200 dark:bg-yellow-800"
              />
            </h4>
            <Badge variant="outline" className="text-xs flex-shrink-0">
              {result.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            <Highlighter
              searchWords={[query]}
              textToHighlight={result.snippet}
              highlightClassName="bg-yellow-200 dark:bg-yellow-800"
            />
          </p>
        </div>
      </div>
    </button>
  );

  if (results.total === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground mb-4">
          No results found for <span className="font-semibold">"{query}"</span>
        </p>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              material controls
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              roadmap
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              assessment
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              board training
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.templates.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-3">
            Templates ({results.templates.length})
          </h3>
          <div className="space-y-1">
            {results.templates.map((result, index) => renderResultItem(result, index))}
          </div>
        </div>
      )}

      {results.faqs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-3">
            FAQs ({results.faqs.length})
          </h3>
          <div className="space-y-1">
            {results.faqs.map((result, index) => renderResultItem(result, index))}
          </div>
        </div>
      )}

      {results.glossary.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-3">
            Glossary ({results.glossary.length})
          </h3>
          <div className="space-y-1">
            {results.glossary.map((result, index) => renderResultItem(result, index))}
          </div>
        </div>
      )}

      {results.articles.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-3">
            Articles ({results.articles.length})
          </h3>
          <div className="space-y-1">
            {results.articles.map((result, index) => renderResultItem(result, index))}
          </div>
        </div>
      )}

      {results.pages.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-3">
            Pages ({results.pages.length})
          </h3>
          <div className="space-y-1">
            {results.pages.map((result, index) => renderResultItem(result, index))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
