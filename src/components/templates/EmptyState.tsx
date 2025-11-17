import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState = ({ onClearFilters }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No templates found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        No templates match your current search and filter criteria. Try adjusting your filters or clearing them to see all available templates.
      </p>
      <Button onClick={onClearFilters} variant="outline">
        Clear All Filters
      </Button>
    </div>
  );
};

export default EmptyState;
