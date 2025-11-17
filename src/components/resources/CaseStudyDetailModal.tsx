import { CaseStudy } from "@/types/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Building2, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyDetailModal = ({ caseStudy, isOpen, onClose }: CaseStudyDetailModalProps) => {
  if (!caseStudy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{caseStudy.sector}</Badge>
                <Badge variant="outline">{caseStudy.companySize}</Badge>
                <Badge variant="outline">{caseStudy.complexity}</Badge>
              </div>
            </div>
            <DialogTitle className="text-3xl leading-tight">{caseStudy.title}</DialogTitle>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-accent/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{caseStudy.duration}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="bg-accent/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{caseStudy.controlCount}</div>
              <div className="text-sm text-muted-foreground">Material Controls</div>
            </div>
            <div className="bg-accent/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{caseStudy.totalCost}</div>
              <div className="text-sm text-muted-foreground">Total Cost</div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-xl font-bold mb-3">Overview</h3>
            <p className="text-base leading-relaxed text-muted-foreground">{caseStudy.summary}</p>
          </div>

          {/* Approach */}
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Approach Taken
            </h3>
            <ul className="space-y-2">
              {caseStudy.approach.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons Learned */}
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Lessons Learned
            </h3>
            <ul className="space-y-2">
              {caseStudy.lessonsLearned.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-xl font-bold mb-3">Results Achieved</h3>
            <ul className="space-y-2">
              {caseStudy.results.map((result, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Download */}
          <div className="pt-4 border-t">
            <Button className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Full Case Study (PDF)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyDetailModal;
