import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NavLink } from '@/components/NavLink';
import { ArrowRight, Sparkles } from 'lucide-react';

interface RecommendedItem {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon?: string;
}

interface ContentRecommendationsProps {
  items: RecommendedItem[];
  title?: string;
}

const ContentRecommendations = ({ items, title = 'You Might Also Like' }: ContentRecommendationsProps) => {
  if (items.length === 0) return null;

  return (
    <div className="border-t pt-8 md:pt-12">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item) => (
          <NavLink key={item.id} to={item.url} className="group">
            <Card className="p-4 md:p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex flex-col h-full">
                {item.icon && (
                  <div className="text-3xl mb-3">{item.icon}</div>
                )}
                <Badge variant="outline" className="w-fit mb-2 text-xs">
                  {item.category}
                </Badge>
                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ContentRecommendations;
