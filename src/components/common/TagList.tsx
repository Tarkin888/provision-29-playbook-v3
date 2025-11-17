import { Badge } from '@/components/ui/badge';

interface Tag {
  id: string;
  label: string;
  category?: string;
}

interface TagListProps {
  tags: Tag[];
  onTagClick?: (tagId: string) => void;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TagList = ({ 
  tags, 
  onTagClick, 
  variant = 'outline', 
  size = 'md',
  className = '' 
}: TagListProps) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'lg':
        return 'text-base px-4 py-2';
      default:
        return 'text-sm px-3 py-1.5';
    }
  };

  if (tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          variant={variant}
          className={`${getSizeClass()} ${
            onTagClick ? 'cursor-pointer hover:bg-accent transition-colors' : ''
          }`}
          onClick={() => onTagClick?.(tag.id)}
        >
          {tag.category && (
            <span className="text-muted-foreground mr-1">{tag.category}:</span>
          )}
          {tag.label}
        </Badge>
      ))}
    </div>
  );
};

export default TagList;
