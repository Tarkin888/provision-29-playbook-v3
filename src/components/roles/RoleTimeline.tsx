import { Role } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoleTimelineProps {
  role: Role;
}

const RoleTimeline = ({ role }: RoleTimelineProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">Your P29 Journey</h3>
        <p className="text-muted-foreground">
          Phase-by-phase breakdown of your involvement and focus areas
        </p>
      </div>

      <div className="space-y-4">
        {role.timeline.map((item, idx) => (
          <Card key={idx} className="overflow-hidden">
            <div 
              className="h-1"
              style={{ backgroundColor: role.color }}
            />
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <Badge 
                    variant="secondary"
                    style={{ 
                      backgroundColor: `${role.color}20`,
                      color: role.color,
                      borderColor: role.color 
                    }}
                    className="mb-2"
                  >
                    {item.period}
                  </Badge>
                  <CardTitle className="text-lg">{item.activity}</CardTitle>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleTimeline;
