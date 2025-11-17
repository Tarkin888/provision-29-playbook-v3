import { Milestone } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface UpcomingMilestonesProps {
  milestones: Milestone[];
}

const UpcomingMilestones = ({ milestones }: UpcomingMilestonesProps) => {
  if (milestones.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No upcoming milestones at this time
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {milestones.map((milestone) => (
        <Card key={milestone.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="outline">Week {milestone.week}</Badge>
              {milestone.critical && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Critical
                </Badge>
              )}
            </div>
            <CardTitle className="text-base">{milestone.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <span className="font-semibold">Owner:</span>{" "}
              <span className="text-muted-foreground">{milestone.owner}</span>
            </div>
            {milestone.date && (
              <div className="text-sm text-muted-foreground">
                {new Date(milestone.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UpcomingMilestones;
