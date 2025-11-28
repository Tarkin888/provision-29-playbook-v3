import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, FileText } from "lucide-react";
import { useMemo } from "react";

interface UpcomingMilestonesProps {
  milestones?: any[]; // Keep for backwards compatibility but we'll ignore it
}

const UpcomingMilestones = ({ milestones }: UpcomingMilestonesProps) => {
  // Calculate days from now for each milestone
  const calculateDaysFromNow = (dateString: string) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const emergencyMilestones = useMemo(() => [
    {
      weekOf: "December 2, 2025",
      title: "Emergency Framework Scoping",
      description: "Rapidly define material controls framework with external support. Compress 8-week Phase 1 into 2 weeks using pre-configured templates.",
      status: "CRITICAL - IMMEDIATE START",
      priority: "critical",
      date: "2025-12-02"
    },
    {
      weekOf: "December 9, 2025",
      title: "Accelerated GRC Platform Selection",
      description: "Select and contract GRC platform within 1 week (vs. normal 12 weeks). Consider pre-configured packages and emergency deployment.",
      status: "CRITICAL - 1 WEEK",
      priority: "critical",
      date: "2025-12-09"
    },
    {
      weekOf: "December 16, 2025",
      title: "Rapid Platform Configuration & Control Setup",
      description: "Compress 16-week implementation to 3 weeks. Use vendor accelerators, accept out-of-box configurations, minimize customization.",
      status: "HIGH PRIORITY",
      priority: "high",
      date: "2025-12-16"
    },
    {
      weekOf: "December 23, 2025",
      title: "Emergency Testing & Evidence Collection",
      description: "Begin initial control testing during holiday period. Limited test coverage acceptable for year 1 with documented plan for expansion.",
      status: "HIGH PRIORITY",
      priority: "high",
      date: "2025-12-23"
    },
    {
      weekOf: "January 1, 2026",
      title: "Provision 29 Effective Date",
      description: "Framework operational for FY2026. Board must declare effectiveness by FY2026 annual report. Emergency implementations may qualify declaration with 'developing' status.",
      status: "EFFECTIVE DATE",
      priority: "deadline",
      date: "2026-01-01"
    }
  ], []);

  const priorityStyles: Record<string, string> = {
    critical: "bg-red-50 dark:bg-red-950/20 border-l-4 border-red-600",
    high: "bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-600",
    deadline: "bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600"
  };

  const priorityBadges: Record<string, string> = {
    "CRITICAL - IMMEDIATE START": "bg-red-600 dark:bg-red-700 text-white",
    "CRITICAL - 1 WEEK": "bg-red-600 dark:bg-red-700 text-white",
    "HIGH PRIORITY": "bg-orange-600 dark:bg-orange-700 text-white",
    "EFFECTIVE DATE": "bg-blue-600 dark:bg-blue-700 text-white"
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
        <h2 className="text-2xl font-bold text-foreground">
          Critical Deadlines: Emergency Implementation Track
        </h2>
      </div>

      {/* Urgency Banner */}
      <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-600 p-4 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
              ⚠️ URGENT: Only 5 weeks until FY2026 effective date (January 1, 2026)
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              Organizations starting now require emergency catch-up implementation
            </p>
          </div>
        </div>
      </div>

      {/* Milestone Cards */}
      <div className="space-y-4">
        {emergencyMilestones.map((milestone, index) => {
          const daysFromNow = calculateDaysFromNow(milestone.date);
          return (
            <Card 
              key={index}
              className={`${priorityStyles[milestone.priority]} transition-all hover:shadow-md border-0`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Week of {milestone.weekOf}
                      </span>
                      <Badge className={`${priorityBadges[milestone.status]} border-0`}>
                        {milestone.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {daysFromNow}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      days from now
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {milestone.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Emergency Guidance Footer */}
      <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start">
          <FileText className="w-5 h-5 text-yellow-700 dark:text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-yellow-900 dark:text-yellow-300">
            <p className="font-semibold mb-2">📋 NOTE: This emergency track accepts higher implementation risk including:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-yellow-800 dark:text-yellow-400">
              <li>Limited testing coverage in year 1</li>
              <li>Potential audit qualifications</li>
              <li>Reliance on external assurance providers</li>
              <li>Board declaration qualified with 'framework developing' language</li>
            </ul>
            <p className="mt-3 font-medium">
              For organizations with more time, see the full implementation framework above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMilestones;
