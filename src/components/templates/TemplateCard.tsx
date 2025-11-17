import { Template } from "@/types/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

interface TemplateCardProps {
  template: Template;
  onViewDetails: () => void;
  phaseColor: string;
}

const ROLE_ICONS: Record<string, string> = {
  "Board": "👔",
  "CFO": "💰",
  "CRO": "⚠️",
  "Control Owner": "👤",
  "Internal Audit": "✓",
  "Programme Manager": "📊",
};

const TemplateCard = ({ template, onViewDetails, phaseColor }: TemplateCardProps) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would trigger actual download
    console.log("Download template:", template.downloadUrl);
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.03] h-full flex flex-col"
      onClick={onViewDetails}
    >
      {/* Preview/Icon Section */}
      <div
        className="h-32 rounded-t-lg flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${phaseColor}15, ${phaseColor}30)`,
        }}
      >
        <FileText className="w-16 h-16 opacity-40" style={{ color: phaseColor }} />
      </div>

      <CardHeader className="flex-1">
        <div className="flex items-start gap-2 mb-2 flex-wrap">
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
        </div>
        <h3 className="font-bold text-lg leading-tight">{template.name}</h3>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>

        <div>
          <div className="text-xs font-semibold mb-2">Key Features:</div>
          <ul className="space-y-1">
            {template.keyFeatures.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                <span className="text-primary mt-0.5">•</span>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold mb-2">For:</div>
          <div className="flex flex-wrap gap-1">
            {template.roles.map((role) => (
              <span
                key={role}
                className="text-lg"
                title={role}
              >
                {ROLE_ICONS[role] || "👤"}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t">
        <Button
          onClick={handleDownload}
          className="w-full gap-2"
          size="sm"
        >
          <Download className="h-4 w-4" />
          Download Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
