import { CaseStudy } from "@/types/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, CheckCircle2 } from "lucide-react";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onViewDetails: () => void;
}

const CaseStudyCard = ({ caseStudy, onViewDetails }: CaseStudyCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <Badge variant="outline">{caseStudy.sector}</Badge>
        </div>
        <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span className="font-semibold">{caseStudy.companySize}</span>
          <span>•</span>
          <span>{caseStudy.complexity}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-accent/50 rounded-lg p-3">
            <div className="text-lg font-bold text-primary">{caseStudy.duration}</div>
            <div className="text-xs text-muted-foreground">Duration</div>
          </div>
          <div className="bg-accent/50 rounded-lg p-3">
            <div className="text-lg font-bold text-primary">{caseStudy.controlCount}</div>
            <div className="text-xs text-muted-foreground">Controls</div>
          </div>
          <div className="bg-accent/50 rounded-lg p-3">
            <div className="text-lg font-bold text-primary">{caseStudy.totalCost}</div>
            <div className="text-xs text-muted-foreground">Cost</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {caseStudy.summary}
        </p>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" onClick={onViewDetails}>
          View Case Study
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CaseStudyCard;
