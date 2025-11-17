import { Resource } from "@/types/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

interface ArticleCardProps {
  article: Resource;
  onViewDetails: () => void;
}

const ArticleCard = ({ article, onViewDetails }: ArticleCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center rounded-t-lg">
        <div className="text-6xl opacity-40">📄</div>
      </div>

      <CardHeader className="flex-1">
        <Badge variant="secondary" className="w-fit mb-2">
          {article.category}
        </Badge>
        <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-2">
          {article.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
