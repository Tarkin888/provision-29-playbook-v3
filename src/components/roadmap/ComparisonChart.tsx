import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getCurrentWeek } from '@/utils/dateUtils';

const ComparisonChart = () => {
  const currentWeek = getCurrentWeek();

  const milestones = [
    {
      milestone: 'Board Approval',
      idealTimeline: 'Q1 2025 (Week 12)',
      yourTimeline: 'Nov 2025 (Week 48)',
      gap: '36 weeks',
      risk: 'CRITICAL'
    },
    {
      milestone: 'GRC Platform Live',
      idealTimeline: 'Q3 2025 (Week 32)',
      yourTimeline: 'Jan 2026 (Week 52+)',
      gap: '20+ weeks',
      risk: 'CRITICAL'
    },
    {
      milestone: 'Dry Run Complete',
      idealTimeline: 'Q4 2025 (Week 48)',
      yourTimeline: 'Not feasible',
      gap: 'N/A',
      risk: 'CRITICAL'
    },
    {
      milestone: 'FY 2026 Compliance Starts',
      idealTimeline: 'Jan 1, 2026',
      yourTimeline: 'Jan 1, 2026',
      gap: 'On track',
      risk: 'LOW'
    },
    {
      milestone: 'First Declaration',
      idealTimeline: 'Mar 2027 (Unqualified)',
      yourTimeline: 'Mar 2027 (Likely qualified)',
      gap: 'N/A',
      risk: 'HIGH'
    }
  ];

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
        return <Badge variant="destructive" className="text-xs">🔴 CRITICAL</Badge>;
      case 'HIGH':
        return <Badge variant="destructive" className="text-xs">⚠️ HIGH</Badge>;
      case 'LOW':
        return <Badge variant="secondary" className="text-xs">🟢 LOW</Badge>;
      default:
        return <Badge variant="default" className="text-xs">{risk}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Comparison: Ideal vs Your Reality</CardTitle>
        <p className="text-sm text-muted-foreground">
          Understanding the gap between recommended timeline and late-start reality
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Milestone</TableHead>
                <TableHead className="min-w-[120px]">Ideal Timeline</TableHead>
                <TableHead className="min-w-[120px]">Your Timeline</TableHead>
                <TableHead className="min-w-[100px]">Gap</TableHead>
                <TableHead className="min-w-[100px]">Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.milestone}</TableCell>
                  <TableCell className="text-sm">{item.idealTimeline}</TableCell>
                  <TableCell className="text-sm font-semibold">{item.yourTimeline}</TableCell>
                  <TableCell className="text-sm">
                    {item.gap === 'On track' ? (
                      <span className="text-primary font-medium">{item.gap}</span>
                    ) : (
                      <span className="text-destructive font-medium">-{item.gap}</span>
                    )}
                  </TableCell>
                  <TableCell>{getRiskBadge(item.risk)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm">
          <p className="font-semibold mb-2">Key Insight:</p>
          <p className="text-muted-foreground">
            The compliance deadline (Jan 1, 2026) is fixed and cannot be moved. However, you are {Math.floor((currentWeek - 1) / 4)} months behind the ideal preparation timeline. 
            This means you must compress activities while accepting higher implementation risks and likely qualification of your first declaration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
