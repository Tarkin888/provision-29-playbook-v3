import { useFiscalYear, FiscalYearEnd } from '@/contexts/FiscalYearContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FiscalYearSelector = () => {
  const { fiscalYearEnd, setFiscalYearEnd, getComplianceFYStart, getComplianceFYEnd, getAnnualReportDueDate } = useFiscalYear();

  const yearEndOptions: { value: FiscalYearEnd; label: string; example: string }[] = [
    { value: 'december', label: 'December (31 Dec)', example: 'Jan 2026 - Dec 2026' },
    { value: 'march', label: 'March (31 Mar)', example: 'Apr 2026 - Mar 2027' },
    { value: 'june', label: 'June (30 Jun)', example: 'Jul 2026 - Jun 2027' },
    { value: 'september', label: 'September (30 Sep)', example: 'Oct 2026 - Sep 2027' },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const complianceFYStart = getComplianceFYStart();
  const complianceFYEnd = getComplianceFYEnd();
  const annualReportDue = getAnnualReportDueDate();

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle>Your Fiscal Year-End</CardTitle>
        </div>
        <CardDescription>
          Select your company's fiscal year-end to see customized timelines throughout this playbook
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {yearEndOptions.map((option) => (
            <Button
              key={option.value}
              variant={fiscalYearEnd === option.value ? 'default' : 'outline'}
              onClick={() => setFiscalYearEnd(option.value)}
              className="h-auto flex-col items-start p-3 gap-1"
            >
              <span className="font-semibold text-sm">{option.label}</span>
              <span className="text-xs opacity-80 font-normal whitespace-normal text-left">
                {option.example}
              </span>
            </Button>
          ))}
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm space-y-2">
            <p className="font-semibold">Your Compliance Timeline:</p>
            <div className="space-y-1 text-xs">
              <p>📅 <strong>Compliance FY Starts:</strong> {formatDate(complianceFYStart)}</p>
              <p>📅 <strong>Compliance FY Ends:</strong> {formatDate(complianceFYEnd)}</p>
              <p>📄 <strong>Annual Report Due:</strong> ~{formatDate(annualReportDue)} (4 months after FY-end)</p>
              <p className="text-muted-foreground mt-2">
                Evidence collection for P29 compliance must cover your entire fiscal year from{' '}
                {formatDate(complianceFYStart)} to {formatDate(complianceFYEnd)}.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        <div className="text-xs text-muted-foreground border-t pt-4">
          <p className="font-semibold mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>All timelines in this playbook will adjust based on your selection</li>
            <li>Phase durations remain the same, but start/end dates shift to align with your FY</li>
            <li>Preparation activities should be completed before your compliance FY starts</li>
            <li>Your first P29 declaration will be included in your annual report published ~4 months after FY-end</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FiscalYearSelector;
