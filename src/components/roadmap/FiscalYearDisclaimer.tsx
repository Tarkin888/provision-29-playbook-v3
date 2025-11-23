import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const FiscalYearDisclaimer = () => {
  return (
    <Alert className="border-primary/30 bg-primary/5">
      <Info className="h-4 w-4" />
      <AlertTitle className="text-sm font-semibold">Fiscal Year-End Notice</AlertTitle>
      <AlertDescription className="text-sm space-y-2 mt-2">
        <p>
          This playbook uses <strong>illustrative dates assuming a December fiscal year-end</strong> for clarity. 
          UK listed companies have varying fiscal year-ends (March, June, September, December).
        </p>
        <p className="font-semibold text-foreground">
          ⚠️ You MUST adjust all timelines, milestones, and deadlines based on YOUR company's specific fiscal year-end.
        </p>
        <p>
          Use the <strong>Fiscal Year Selector</strong> above to customize all dates throughout this playbook 
          to match your organization's reporting calendar.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default FiscalYearDisclaimer;
