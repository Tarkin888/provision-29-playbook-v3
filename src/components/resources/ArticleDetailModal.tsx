import { Resource } from "@/types/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Download, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ArticleDetailModalProps {
  article: Resource | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleDetailModal = ({ article, isOpen, onClose }: ArticleDetailModalProps) => {
  if (!article) return null;

  const isExternalLink = article.url.startsWith('http');

  const handleDownload = () => {
    if (article.downloadUrl) {
      const link = document.createElement('a');
      link.href = article.downloadUrl;
      link.download = article.downloadUrl.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleVisitExternal = () => {
    if (isExternalLink) {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <Badge variant="secondary">{article.category}</Badge>
            <DialogTitle className="text-3xl leading-tight">{article.title}</DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-6">
          {/* Excerpt */}
          <div className="bg-accent/50 p-6 rounded-lg border-l-4 border-primary">
            <p className="text-base leading-relaxed">{article.excerpt}</p>
          </div>

          {/* Key Takeaways */}
          <div>
            <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
            <ul className="space-y-3">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{idx + 1}</span>
                  </div>
                  <span className="text-sm">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Topics</h4>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            {isExternalLink && (
              <Button variant="default" className="gap-2" onClick={handleVisitExternal}>
                <Share2 className="w-4 h-4" />
                Visit Resource
              </Button>
            )}
            {article.downloadUrl && (
              <Button variant="outline" className="gap-2" onClick={handleDownload}>
                <Download className="w-4 h-4" />
                Download Presentation
              </Button>
            )}
            {!isExternalLink && (
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDetailModal;
