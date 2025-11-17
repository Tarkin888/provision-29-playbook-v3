import { Template } from "@/types/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2 } from "lucide-react";

interface TemplateDetailModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  phaseColor?: string;
  relatedTemplates?: Template[];
  onTemplateClick?: (template: Template) => void;
}

const ROLE_ICONS: Record<string, string> = {
  "Board": "👔",
  "CFO": "💰",
  "CRO": "⚠️",
  "Control Owner": "👤",
  "Internal Audit": "✓",
  "Programme Manager": "📊",
};

const TemplateDetailModal = ({ 
  template, 
  isOpen, 
  onClose, 
  phaseColor,
  relatedTemplates = [],
  onTemplateClick 
}: TemplateDetailModalProps) => {
  if (!template) return null;

  const handleDownload = () => {
    console.log("Download template:", template.downloadUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <div className="flex items-start gap-3 flex-wrap">
              <Badge 
                variant="secondary"
                style={{ 
                  backgroundColor: `${phaseColor}20`,
                  color: phaseColor,
                  borderColor: phaseColor 
                }}
              >
                Phase {template.phase}
              </Badge>
              <Badge variant="outline">{template.type}</Badge>
              <Badge variant="outline">{template.format}</Badge>
            </div>
            <DialogTitle className="text-2xl">{template.name}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {template.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who Uses This Template */}
          <div>
            <h3 className="font-semibold mb-3">Who uses this template?</h3>
            <div className="flex flex-wrap gap-3">
              {template.roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-2 bg-accent px-3 py-2 rounded-lg"
                >
                  <span className="text-xl">{ROLE_ICONS[role] || "👤"}</span>
                  <span className="text-sm font-medium">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Section */}
          <div className="border-t pt-6">
            <Button
              onClick={handleDownload}
              size="lg"
              className="w-full gap-2"
            >
              <Download className="h-5 w-5" />
              Download Template ({template.format})
            </Button>
          </div>

          {/* Related Templates */}
          {relatedTemplates.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">You might also need...</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedTemplates.map((related) => (
                  <div
                    key={related.id}
                    className="border rounded-lg p-3 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => onTemplateClick?.(related)}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        Phase {related.phase}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{related.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {related.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDetailModal;
