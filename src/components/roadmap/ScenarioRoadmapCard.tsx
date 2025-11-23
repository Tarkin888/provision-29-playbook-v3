import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Users, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";

interface Phase {
  phase: string;
  startDate: string;
  endDate: string;
  duration: string;
  color: string;
}

interface Milestone {
  name: string;
  date: string;
  type: string;
}

interface ResourcePeak {
  period: string;
  fte: string;
  reason: string;
}

interface ScenarioRoadmap {
  id: string;
  name: string;
  fiscalYearEnd: string;
  maturityLevel: string;
  startDate: string;
  complianceFYStart: string;
  complianceFYEnd: string;
  reportDueDate: string;
  description: string;
  phases: Phase[];
  milestones: Milestone[];
  resourcePeaks: ResourcePeak[];
  riskCallouts: string[];
}

interface Props {
  scenario: ScenarioRoadmap;
}

const ScenarioRoadmapCard = ({ scenario }: Props) => {
  const getRiskColor = () => {
    const firstCallout = scenario.riskCallouts[0].toLowerCase();
    if (firstCallout.includes('low risk')) return 'bg-primary/10 border-primary/20';
    if (firstCallout.includes('medium risk')) return 'bg-warning/10 border-warning/20';
    if (firstCallout.includes('high risk') || firstCallout.includes('critical')) return 'bg-destructive/10 border-destructive/20';
    return 'bg-muted/30 border-border';
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'decision-gate':
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getMaturityLabel = (level: string) => {
    switch (level) {
      case 'level1': return 'Level 1: Starting Fresh';
      case 'level2': return 'Level 2: Foundation Established';
      case 'level3': return 'Level 3: Controls Documented';
      case 'level4': return 'Level 4: Testing Ready';
      default: return level;
    }
  };

  const getFiscalYearLabel = (yearEnd: string) => {
    return yearEnd.charAt(0).toUpperCase() + yearEnd.slice(1);
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold">{scenario.name}</h3>
          <div className="flex gap-2">
            <Badge variant="outline">{getFiscalYearLabel(scenario.fiscalYearEnd)} YE</Badge>
            <Badge variant="secondary">{getMaturityLabel(scenario.maturityLevel)}</Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{scenario.description}</p>
      </div>

      {/* Key Dates */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Key Timeline Dates</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Start Date:</span>
            <p className="font-medium">{format(parseISO(scenario.startDate), 'dd MMM yyyy')}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Compliance FY Starts:</span>
            <p className="font-medium">{format(parseISO(scenario.complianceFYStart), 'dd MMM yyyy')}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Compliance FY Ends:</span>
            <p className="font-medium">{format(parseISO(scenario.complianceFYEnd), 'dd MMM yyyy')}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Report Due:</span>
            <p className="font-medium">{format(parseISO(scenario.reportDueDate), 'dd MMM yyyy')}</p>
          </div>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Phase Timeline</h4>
        <div className="space-y-2">
          {scenario.phases.map((phase, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="h-8 flex-1 rounded flex items-center px-3 text-xs font-medium text-white"
                style={{ backgroundColor: phase.color === '#9ca3af' ? '#9ca3af' : phase.color }}
              >
                {phase.phase}
              </div>
              <Badge variant="outline" className="whitespace-nowrap">
                {phase.duration}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Milestones */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Critical Milestones</h4>
        <div className="space-y-2">
          {scenario.milestones.filter(m => m.type === 'critical' || m.type === 'decision-gate').slice(0, 6).map((milestone, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              {getMilestoneIcon(milestone.type)}
              <div className="flex-1">
                <span className="font-medium">{milestone.name}</span>
                <span className="text-muted-foreground ml-2">
                  {format(parseISO(milestone.date), 'dd MMM yyyy')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Peaks */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Resource Peak Periods</h4>
        </div>
        <div className="space-y-2">
          {scenario.resourcePeaks.map((peak, index) => (
            <div key={index} className="p-3 bg-muted/30 rounded-lg text-sm">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium">{peak.period}</span>
                <Badge variant="secondary">{peak.fte}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{peak.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Callouts */}
      <Alert className={getRiskColor()}>
        <AlertTriangle className="h-5 w-5" />
        <AlertDescription>
          <div className="space-y-2">
            {scenario.riskCallouts.map((callout, index) => (
              <div key={index} className="text-sm">
                {index === 0 ? (
                  <p className="font-semibold">{callout}</p>
                ) : (
                  <p className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{callout}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </AlertDescription>
      </Alert>
    </Card>
  );
};

export default ScenarioRoadmapCard;
