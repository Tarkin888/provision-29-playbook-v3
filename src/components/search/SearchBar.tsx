import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchContext } from '@/contexts/SearchContext';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

interface SearchBarProps {
  mobile?: boolean;
}

const SearchBar = ({ mobile = false }: SearchBarProps) => {
  const { openSearch } = useSearchContext();

  // Cmd/Ctrl + K to open search
  useKeyboardShortcut(['Meta', 'k'], openSearch);
  useKeyboardShortcut(['Control', 'k'], openSearch);

  if (mobile) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={openSearch}
        className="min-h-[44px] min-w-[44px] p-2"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={openSearch}
      className="hidden md:flex items-center gap-2 w-64 justify-start text-muted-foreground"
    >
      <Search className="h-4 w-4" />
      <span className="flex-1 text-left">Search...</span>
      <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
};

export default SearchBar;
