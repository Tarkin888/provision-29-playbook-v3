import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const LegalDisclaimer = () => {
  return (
    <Alert variant="default" className="border-2 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
      <AlertTriangle className="h-5 w-5 text-amber-600" />
      <AlertDescription className="ml-2 text-sm text-muted-foreground">
        <strong className="font-semibold text-foreground">⚠️ Legal Disclaimer:</strong>
        {' '}
        This accelerated timeline involves significant implementation risks and reduces assurance quality compared to the ideal 24-month framework. 
        Organisations starting in November 2025 or later should consider: 
        (1) Qualifying their first-year Provision 29 declaration in March 2027, 
        (2) Engaging external audit or consulting support for framework design and testing, and 
        (3) Implementing a phased approach with critical financial reporting controls prioritised over operational controls. 
        This guidance is for educational purposes only and does not constitute professional advice. 
        Organisations should seek advice from qualified risk, compliance, and audit professionals before making implementation decisions.
      </AlertDescription>
    </Alert>
  );
};

export default LegalDisclaimer;
