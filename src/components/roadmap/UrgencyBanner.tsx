import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getMonthsBehind, getWeeksUntilCompliance } from '@/utils/dateUtils';

const UrgencyBanner = () => {
  const monthsBehind = getMonthsBehind();
  const weeksUntilCompliance = getWeeksUntilCompliance();

  if (monthsBehind < 6) return null; // Only show if significantly behind

  return (
    <Alert variant="destructive" className="border-2 border-destructive mb-6 animate-fade-in">
      <AlertTriangle className="h-5 w-5" />
      <AlertDescription className="ml-2">
        <strong className="font-bold">⚠️ CRITICAL: You are {monthsBehind} months behind the recommended timeline.</strong>
        <br />
        <span className="text-sm">
          Immediate action required for January 2026 compliance. Only {weeksUntilCompliance} weeks remaining.
          Consider accelerated implementation plan and external support.
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default UrgencyBanner;
