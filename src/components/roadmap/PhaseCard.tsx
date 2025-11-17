import { Phase } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PhaseCardProps {
  phase: Phase;
  onViewDetails: () => void;
}

const PhaseCard = ({ phase, onViewDetails }: PhaseCardProps) => {
  const truncatedObjective = phase.objective.length > 120 
    ? phase.objective.slice(0, 120) + "..." 
    : phase.objective;

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer h-full flex flex-col">
      <div 
        className="h-1 rounded-t-lg"
        style={{ backgroundColor: phase.color }}
      />
      <CardHeader className="relative">
        <div 
          className="absolute -top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
          style={{ backgroundColor: phase.color }}
        >
          {phase.id}
        </div>
        <CardTitle className="mt-2">{phase.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">{phase.duration}</span> | {phase.timing}
          </div>
          
          <p className="text-sm">{truncatedObjective}</p>
          
          <div className="flex flex-wrap gap-4 pt-2 border-t">
            <div className="flex items-center gap-2 text-sm">
              <span>📋</span>
              <span className="text-muted-foreground">
                {phase.keyActivities.length} Key Activities
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>✅</span>
              <span className="text-muted-foreground">
                {phase.deliverables?.length || 0} Deliverables
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onViewDetails}
          variant="outline"
          className="mt-4 w-full"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PhaseCard;
