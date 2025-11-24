import { Role } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Info } from "lucide-react";
import { useFiscalYear } from "@/contexts/FiscalYearContext";

interface RoleTimelineProps {
  role: Role;
}

const RoleTimeline = ({ role }: RoleTimelineProps) => {
  const { fiscalYearEnd, getComplianceYearLabel, getComplianceFYStart, getComplianceFYEnd } = useFiscalYear();

  // Transform period text based on fiscal year
  const transformPeriod = (period: string) => {
    if (fiscalYearEnd === 'december') return period;
    
    const quarterMap: Record<string, Record<string, string>> = {
      'march': {
        'Q1 2025': 'Q2 2025 (Apr-Jun)',
        'Q2 2025': 'Q3 2025 (Jul-Sep)',
        'Q3 2025': 'Q4 2025 (Oct-Dec)',
        'Q4 2025': 'Q1 2026 (Jan-Mar)',
        'Q1 2026': 'Q2 2026 (Apr-Jun)',
        'Q2 2026': 'Q3 2026 (Jul-Sep)',
        'Q3 2026': 'Q4 2026 (Oct-Dec)',
        'Q4 2026': 'Q1 2027 (Jan-Mar)',
        'FY2026': 'Apr 2026 - Mar 2027'
      },
      'june': {
        'Q1 2025': 'Q3 2025 (Jul-Sep)',
        'Q2 2025': 'Q4 2025 (Oct-Dec)',
        'Q3 2025': 'Q1 2026 (Jan-Mar)',
        'Q4 2025': 'Q2 2026 (Apr-Jun)',
        'Q1 2026': 'Q3 2026 (Jul-Sep)',
        'Q2 2026': 'Q4 2026 (Oct-Dec)',
        'Q3 2026': 'Q1 2027 (Jan-Mar)',
        'Q4 2026': 'Q2 2027 (Apr-Jun)',
        'FY2026': 'Jul 2026 - Jun 2027'
      },
      'september': {
        'Q1 2025': 'Q4 2025 (Oct-Dec)',
        'Q2 2025': 'Q1 2026 (Jan-Mar)',
        'Q3 2025': 'Q2 2026 (Apr-Jun)',
        'Q4 2025': 'Q3 2026 (Jul-Sep)',
        'Q1 2026': 'Q4 2026 (Oct-Dec)',
        'Q2 2026': 'Q1 2027 (Jan-Mar)',
        'Q3 2026': 'Q2 2027 (Apr-Jun)',
        'Q4 2026': 'Q3 2027 (Jul-Sep)',
        'FY2026': 'Oct 2026 - Sep 2027'
      }
    };

    let transformed = period;
    Object.entries(quarterMap[fiscalYearEnd] || {}).forEach(([key, value]) => {
      transformed = transformed.replace(new RegExp(key, 'g'), value);
    });
    
    return transformed;
  };

  const transformActivity = (activity: string) => {
    return activity.replace(/FY2026/g, getComplianceYearLabel());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">Your P29 Journey</h3>
        <p className="text-muted-foreground">
          Phase-by-phase breakdown of your involvement and focus areas, adjusted for your {fiscalYearEnd.charAt(0).toUpperCase() + fiscalYearEnd.slice(1)} fiscal year-end
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Timeline adjusted for <strong>{fiscalYearEnd.charAt(0).toUpperCase() + fiscalYearEnd.slice(1)} year-end</strong>. Your compliance period runs from{' '}
          <strong>{getComplianceFYStart().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</strong> to{' '}
          <strong>{getComplianceFYEnd().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</strong>.
        </AlertDescription>
      </Alert>

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
                    {transformPeriod(item.period)}
                  </Badge>
                  <CardTitle className="text-lg">{transformActivity(item.activity)}</CardTitle>
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
