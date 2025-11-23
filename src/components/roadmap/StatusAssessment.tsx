import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { getCurrentWeek, getWeeksUntilCompliance, getMonthsBehind, getRiskLevel } from '@/utils/dateUtils';

const StatusAssessment = () => {
  const currentWeek = getCurrentWeek();
  const weeksUntilCompliance = getWeeksUntilCompliance();
  const monthsBehind = getMonthsBehind();
  const riskLevel = getRiskLevel();

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'CRITICAL': return 'destructive';
      case 'HIGH': return 'destructive';
      case 'MEDIUM': return 'default';
      default: return 'secondary';
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'CRITICAL': return <AlertCircle className="h-5 w-5" />;
      case 'HIGH': return <AlertCircle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Your Current Status Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Current Week</div>
            <div className="text-2xl font-bold">Week {currentWeek}</div>
            <div className="text-xs text-muted-foreground">November 2025</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Time to Compliance</div>
            <div className="text-2xl font-bold">{weeksUntilCompliance} weeks</div>
            <div className="text-xs text-muted-foreground">Until Jan 1, 2026</div>
          </div>
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
            <Badge variant={getRiskColor()} className="text-base">
              {getRiskIcon()}
              <span className="ml-1">{riskLevel}</span>
            </Badge>
          </div>
        </div>

        {/* Key Risks */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            Key Risks of Late Start ({monthsBehind} months behind)
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <span>Insufficient board engagement time (need 4+ board meetings minimum)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <span>Compressed GRC platform implementation (normally requires 6-12 months)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <span>Limited or no dry-run testing before live compliance period</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <span>Higher risk of control failures throughout 2026</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <span>Potential qualification required in 2027 annual report</span>
            </li>
          </ul>
        </div>

        {/* Mitigation Actions */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Mitigation Actions Required NOW
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span><strong>This Week:</strong> Secure emergency board approval and executive sponsorship</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span><strong>Weeks 1-2:</strong> Fast-track GRC vendor selection using pre-vetted shortlist</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span><strong>Immediate:</strong> Deploy interim manual controls for Q1 2026</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span><strong>Critical:</strong> Plan phased implementation (highest-risk controls first)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span><strong>Budget:</strong> Allocate funds for external support (framework design + audit)</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusAssessment;
