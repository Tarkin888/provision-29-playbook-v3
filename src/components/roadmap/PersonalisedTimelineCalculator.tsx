import { useFiscalYear } from "@/contexts/FiscalYearContext";
import { useMaturity } from "@/contexts/MaturityContext";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { differenceInDays, differenceInMonths, subMonths, format } from "date-fns";

const PersonalisedTimelineCalculator = () => {
  const { fiscalYearEnd, getComplianceFYStart, getComplianceFYEnd, getAnnualReportDueDate } = useFiscalYear();
  const { getMaturityLevel, getScore } = useMaturity();

  const today = new Date();
  const complianceFYStart = getComplianceFYStart();
  const complianceFYEnd = getComplianceFYEnd();
  const annualReportDue = getAnnualReportDueDate();
  const maturityLevel = getMaturityLevel();
  const maturityScore = getScore();

  // Calculate latest start dates for different tracks
  const latestStart24Month = subMonths(complianceFYStart, 24);
  const latestStart18Month = subMonths(complianceFYStart, 18);
  const latestStart12Month = subMonths(complianceFYStart, 12);

  // Calculate days until compliance
  const daysUntilCompliance = differenceInDays(complianceFYStart, today);
  const monthsUntilCompliance = differenceInMonths(complianceFYStart, today);
  const inCompliancePeriod = today >= complianceFYStart;

  // Determine timeline status
  const getTimelineStatus = () => {
    if (inCompliancePeriod) {
      return {
        status: 'CRITICAL',
        color: 'destructive',
        icon: XCircle,
        message: '🚨 CRITICAL: You are collecting evidence NOW. Emergency prioritisation required.',
      };
    } else if (today >= latestStart12Month) {
      return {
        status: 'URGENT',
        color: 'destructive',
        icon: AlertTriangle,
        message: '🚨 URGENT: Severely compressed timeline, consider external support and focus on minimum viable framework',
      };
    } else if (today >= latestStart18Month) {
      return {
        status: 'COMPRESSED',
        color: 'warning',
        icon: AlertTriangle,
        message: '⚠️ COMPRESSED: Accelerated timeline required, some phases must be compressed',
      };
    } else {
      return {
        status: 'ON TRACK',
        color: 'default',
        icon: CheckCircle2,
        message: '✅ ON TRACK: You have sufficient time for full implementation',
      };
    }
  };

  const timelineStatus = getTimelineStatus();

  // Determine risk level
  const getRiskLevel = () => {
    if (inCompliancePeriod) {
      return { level: 'CRITICAL', color: 'bg-destructive', explanation: 'Already in compliance period with no preparation time' };
    } else if (monthsUntilCompliance < 12) {
      return { 
        level: 'HIGH RISK', 
        color: 'bg-destructive', 
        explanation: 'Insufficient time for proper testing, dry runs, and remediation. High risk of control failures.' 
      };
    } else if (monthsUntilCompliance < 18) {
      return { 
        level: 'MEDIUM RISK', 
        color: 'bg-warning', 
        explanation: 'Compressed timeline requires careful prioritisation and may need external support for acceleration.' 
      };
    } else {
      return { 
        level: 'LOW RISK', 
        color: 'bg-primary', 
        explanation: 'Adequate time for proper framework design, testing, remediation, and dry runs.' 
      };
    }
  };

  const riskLevel = getRiskLevel();

  // Generate phase timeline based on maturity and time available
  const getPhaseTimeline = () => {
    const maturityLabels = {
      level1: 'Level 1: Starting Fresh',
      level2: 'Level 2: Foundation Established',
      level3: 'Level 3: Controls Documented',
      level4: 'Level 4: Testing Infrastructure Ready',
    };

    // Determine which phases to include based on maturity
    const phases = [];

    if (maturityLevel === 'level1') {
      // All phases required
      if (monthsUntilCompliance >= 18) {
        phases.push(
          { phase: 'Phase 1', duration: '6 months', status: 'required', description: 'Foundation & Gap Analysis' },
          { phase: 'Phase 2', duration: '8 months', status: 'required', description: 'Framework Design & Build' },
          { phase: 'Phase 3', duration: '4 months', status: 'required', description: 'Dry Run & Validation' },
          { phase: 'Phase 4', duration: '12 months', status: 'required', description: 'Full FY Evidence Collection' }
        );
      } else if (monthsUntilCompliance >= 12) {
        phases.push(
          { phase: 'Phase 1', duration: '3 months', status: 'compressed', description: 'Foundation & Gap Analysis (COMPRESSED)' },
          { phase: 'Phase 2', duration: '5 months', status: 'compressed', description: 'Framework Design & Build (COMPRESSED)' },
          { phase: 'Phase 3', duration: '4 months', status: 'compressed', description: 'Dry Run & Validation (MINIMAL)' },
          { phase: 'Phase 4', duration: '12 months', status: 'required', description: 'Full FY Evidence Collection' }
        );
      } else {
        phases.push(
          { phase: 'Phase 1-2', duration: `${monthsUntilCompliance} months`, status: 'critical', description: 'Emergency Sprint (SEVERELY COMPRESSED)' },
          { phase: 'Phase 4', duration: '12 months', status: 'required', description: 'Full FY Evidence Collection' }
        );
      }
    } else if (maturityLevel === 'level2') {
      // Skip Phase 1
      if (monthsUntilCompliance >= 12) {
        phases.push(
          { phase: 'Phase 1', duration: 'SKIP', status: 'skip', description: 'Already complete based on maturity' },
          { phase: 'Phase 2', duration: '6 months', status: 'required', description: 'Framework Design & Build' },
          { phase: 'Phase 3', duration: '4 months', status: 'required', description: 'Dry Run & Validation' },
          { phase: 'Phase 4', duration: '12 months', status: 'required', description: 'Full FY Evidence Collection' }
        );
      } else {
        phases.push(
          { phase: 'Phase 1', duration: 'SKIP', status: 'skip', description: 'Already complete based on maturity' },
          { phase: 'Phase 2', duration: `${Math.max(3, monthsUntilCompliance - 3)} months`, status: 'compressed', description: 'Framework Design & Build (COMPRESSED)' },
          { phase: 'Phase 3', duration: '2-3 months', status: 'compressed', description: 'Minimal Dry Run' },
          { phase: 'Phase 4', duration: '12 months', status: 'required', description: 'Full FY Evidence Collection' }
        );
      }
    } else if (maturityLevel === 'level3') {
      // Skip Phases 1-2
      if (monthsUntilCompliance >= 6) {
        phases.push(
          { phase: 'Phase 1-2', duration: 'SKIP', status: 'skip', description: 'Already complete based on maturity' },
          { phase: 'Phase 3', duration: '4 months', status: 'required', description: 'Dry Run & Validation' },
          { phase: 'Phase 4', duration: '12 months', status: 'required', description: 'Full FY Evidence Collection' }
        );
      } else {
        phases.push(
          { phase: 'Phase 1-2', duration: 'SKIP', status: 'skip', description: 'Already complete based on maturity' },
          { phase: 'Phase 3', duration: `${monthsUntilCompliance} months`, status: 'compressed', description: 'Rapid Testing & Validation (COMPRESSED)' },
          { phase: 'Phase 4', duration: '12 months', status: 'required', description: 'Full FY Evidence Collection' }
        );
      }
    } else {
      // Level 4 - Only Phase 4 required
      phases.push(
        { phase: 'Phase 1-3', duration: 'SKIP', status: 'skip', description: 'Already complete based on maturity' },
        { phase: 'Phase 4', duration: '12 months', status: 'required', description: 'Full FY Evidence Collection (Final Preparation)' }
      );
    }

    return { maturityLabel: maturityLabels[maturityLevel], phases };
  };

  const phaseTimeline = getPhaseTimeline();

  // Generate recommendations
  const getRecommendations = () => {
    const recommendations = [];

    if (inCompliancePeriod) {
      recommendations.push('🚨 IMMEDIATE: Activate emergency controls for material risks');
      recommendations.push('🚨 IMMEDIATE: Engage Big 4 or specialist consultancy for emergency framework');
      recommendations.push('🚨 IMMEDIATE: Consider qualifying your first-year P29 declaration');
      recommendations.push('🚨 IMMEDIATE: Implement manual evidence collection for critical controls');
    } else if (monthsUntilCompliance < 12) {
      recommendations.push('Engage external consultancy for accelerated framework design');
      recommendations.push('Fast-track GRC platform procurement (pre-vetted vendors only)');
      recommendations.push('Prioritise material controls only - defer non-material controls');
      recommendations.push('Plan for phased implementation (critical controls first)');
      recommendations.push('Budget for additional external audit support');
      recommendations.push('Consider qualifying first-year declaration due to compressed timeline');
    } else if (monthsUntilCompliance < 18) {
      recommendations.push('Consider external support for framework design acceleration');
      recommendations.push('Accelerate GRC platform implementation');
      recommendations.push('Increase internal resource allocation');
      recommendations.push('Plan compressed but complete dry run');
    } else {
      recommendations.push('Follow standard 24-month implementation track');
      recommendations.push('Conduct thorough gap analysis before starting');
      recommendations.push('Plan comprehensive dry run 6 months before compliance FY');
      recommendations.push('Budget for internal capability building');
    }

    // Add maturity-specific recommendations
    if (maturityLevel === 'level1') {
      recommendations.push('Build foundational risk management capability');
      recommendations.push('Invest in GRC platform early in timeline');
    } else if (maturityLevel === 'level2') {
      recommendations.push('Leverage existing control framework for P29 mapping');
      recommendations.push('Enhance GRC platform with P29-specific configuration');
    } else if (maturityLevel === 'level3') {
      recommendations.push('Validate existing controls meet P29 materiality criteria');
      recommendations.push('Focus on evidence collection process enhancement');
    } else {
      recommendations.push('Final validation of testing infrastructure');
      recommendations.push('Conduct comprehensive dry run');
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">Your Personalised Implementation Timeline</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Based on your fiscal year-end ({fiscalYearEnd}), current date, and maturity level - here's your customised roadmap
        </p>
      </div>

      {/* Critical Date Calculator */}
      <Card className="p-6 bg-muted/30">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">Critical Date Calculator</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Your fiscal year that triggers P29:</span>
              <span className="text-sm font-semibold text-right">
                {format(complianceFYStart, 'dd MMM yyyy')} - {format(complianceFYEnd, 'dd MMM yyyy')}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Your compliance evidence period:</span>
              <span className="text-sm font-semibold text-right">
                {format(complianceFYStart, 'dd MMM yyyy')} - {format(complianceFYEnd, 'dd MMM yyyy')}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Your annual report publication deadline:</span>
              <span className="text-sm font-semibold text-right">
                ~{format(annualReportDue, 'dd MMM yyyy')}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Latest start for 24-month track:</span>
              <span className="text-sm font-semibold text-right">
                {format(latestStart24Month, 'dd MMM yyyy')}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Latest start for 18-month track:</span>
              <span className="text-sm font-semibold text-right">
                {format(latestStart18Month, 'dd MMM yyyy')}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Latest start for 12-month track:</span>
              <span className="text-sm font-semibold text-right">
                {format(latestStart12Month, 'dd MMM yyyy')}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-semibold">Days until compliance FY begins:</span>
            </div>
            <span className="text-2xl font-bold text-primary">
              {inCompliancePeriod ? 'ALREADY STARTED' : `${daysUntilCompliance} days`}
            </span>
          </div>
        </div>
      </Card>

      {/* Timeline Status Indicator */}
      <Alert variant={timelineStatus.color === 'destructive' ? 'destructive' : 'default'}>
        <timelineStatus.icon className="h-5 w-5" />
        <AlertDescription className="text-base font-medium">
          {timelineStatus.message}
        </AlertDescription>
      </Alert>

      {/* Phase Timeline Adaptation */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Your Customised Phase Timeline</h3>
          <p className="text-sm text-muted-foreground">
            Based on your maturity level: <Badge variant="outline">{phaseTimeline.maturityLabel}</Badge>
          </p>
        </div>
        <div className="space-y-3">
          {phaseTimeline.phases.map((phase, index) => (
            <div 
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                phase.status === 'skip' ? 'bg-muted/30' :
                phase.status === 'critical' ? 'bg-destructive/10 border border-destructive/20' :
                phase.status === 'compressed' ? 'bg-warning/10 border border-warning/20' :
                'bg-primary/5 border border-primary/20'
              }`}
            >
              <div className="mt-1">
                {phase.status === 'skip' ? (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                ) : phase.status === 'critical' ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : phase.status === 'compressed' ? (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{phase.phase}</span>
                  <Badge variant={phase.status === 'skip' ? 'secondary' : 'default'}>
                    {phase.duration}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk Indicator */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className={`h-12 w-12 rounded-full ${riskLevel.color} flex items-center justify-center`}>
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Risk Level: {riskLevel.level}</h3>
            <p className="text-sm text-muted-foreground">{riskLevel.explanation}</p>
          </div>
        </div>
      </Card>

      {/* Recommendation Engine */}
      <Card className="p-6 bg-primary/5">
        <h3 className="text-xl font-bold mb-4">Recommended Actions</h3>
        <div className="space-y-2">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{rec}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PersonalisedTimelineCalculator;
