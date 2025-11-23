import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ChevronRight, Clock } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

interface AcceleratedPhase {
  id: number;
  name: string;
  shortName: string;
  color: string;
  duration: string;
  timing: string;
  startWeek: number;
  endWeek: number;
  label: string;
  objective: string;
  keyActivities: any[];
  deliverables: any[];
  compressionRisks: string[];
  whatToSkip: string[];
}

interface AcceleratedPhaseCardProps {
  phase: AcceleratedPhase;
  onViewDetails?: () => void;
}

const AcceleratedPhaseCard = ({ phase, onViewDetails }: AcceleratedPhaseCardProps) => {
  const [showRisks, setShowRisks] = useState(false);

  return (
    <Card className="border-2 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3" style={{ borderLeftWidth: '4px', borderLeftColor: phase.color }}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">Phase {phase.id}</Badge>
              <Badge variant="secondary" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {phase.duration}
              </Badge>
            </div>
            <CardTitle className="text-lg sm:text-xl mb-2">{phase.name}</CardTitle>
            <Badge className="text-xs font-normal" variant="destructive">
              {phase.label}
            </Badge>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
          {phase.timing} • Weeks {phase.startWeek}-{phase.endWeek}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2">Objective</h4>
          <p className="text-sm text-muted-foreground">{phase.objective}</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Key Activities ({phase.keyActivities.length})</h4>
          <ul className="space-y-1">
            {phase.keyActivities.slice(0, 3).map((activity) => (
              <li key={activity.id} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{activity.name}</span>
              </li>
            ))}
          </ul>
          {phase.keyActivities.length > 3 && (
            <p className="text-xs text-muted-foreground mt-2">
              +{phase.keyActivities.length - 3} more activities
            </p>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Deliverables ({phase.deliverables.length})</h4>
          <div className="flex flex-wrap gap-1">
            {phase.deliverables.slice(0, 3).map((deliverable, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {deliverable.name}
              </Badge>
            ))}
            {phase.deliverables.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{phase.deliverables.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Compression Risks Collapsible */}
        <Collapsible open={showRisks} onOpenChange={setShowRisks}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="w-full text-xs">
              <AlertTriangle className="h-3 w-3 mr-2 text-destructive" />
              {showRisks ? 'Hide' : 'Show'} Compression Risks ({phase.compressionRisks.length})
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
              <p className="text-xs font-semibold mb-2 text-destructive">⚠️ Risks of Compressed Timeline:</p>
              <ul className="space-y-1">
                {phase.compressionRisks.map((risk, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
              
              {phase.whatToSkip.length > 0 && phase.whatToSkip[0] !== 'None - this is the live compliance period' && (
                <div className="mt-3 pt-3 border-t border-destructive/20">
                  <p className="text-xs font-semibold mb-2">What to Skip (if time-constrained):</p>
                  <ul className="space-y-1">
                    {phase.whatToSkip.map((item, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-muted-foreground mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {onViewDetails && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={onViewDetails}
          >
            View Full Details
            <ChevronRight className="h-3 w-3 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AcceleratedPhaseCard;
