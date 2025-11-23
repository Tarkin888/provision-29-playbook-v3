import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calculator } from 'lucide-react';

const FiscalYearCalculator = () => {
  const scenarios = [
    {
      yearEnd: 'December (31 Dec)',
      complianceFYStarts: 'Jan 2026',
      evidencePeriod: 'Jan 2026 - Dec 2026',
      annualReportDue: 'Apr 2027',
      preparationYear: '2025',
      color: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      yearEnd: 'March (31 Mar)',
      complianceFYStarts: 'Apr 2026',
      evidencePeriod: 'Apr 2026 - Mar 2027',
      annualReportDue: 'Jul 2027',
      preparationYear: '2025 - Q1 2026',
      color: 'bg-green-100 dark:bg-green-900',
    },
    {
      yearEnd: 'June (30 Jun)',
      complianceFYStarts: 'Jul 2026',
      evidencePeriod: 'Jul 2026 - Jun 2027',
      annualReportDue: 'Oct 2027',
      preparationYear: '2025 - Q2 2026',
      color: 'bg-orange-100 dark:bg-orange-900',
    },
    {
      yearEnd: 'September (30 Sep)',
      complianceFYStarts: 'Oct 2026',
      evidencePeriod: 'Oct 2026 - Sep 2027',
      annualReportDue: 'Jan 2028',
      preparationYear: '2025 - Q3 2026',
      color: 'bg-purple-100 dark:bg-purple-900',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <CardTitle>Fiscal Year-End Timeline Calculator</CardTitle>
        </div>
        <CardDescription>
          How P29 compliance timelines vary based on your fiscal year-end
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fiscal Year-End</TableHead>
                <TableHead>Compliance FY Starts</TableHead>
                <TableHead>Evidence Collection Period</TableHead>
                <TableHead>Annual Report Due</TableHead>
                <TableHead>Preparation Activities</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((scenario, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Badge variant="outline" className={scenario.color}>
                      {scenario.yearEnd}
                    </Badge>
                  </TableCell>
                  <TableCell>{scenario.complianceFYStarts}</TableCell>
                  <TableCell className="font-semibold">{scenario.evidencePeriod}</TableCell>
                  <TableCell>{scenario.annualReportDue}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{scenario.preparationYear}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg space-y-3 text-sm">
          <p className="font-semibold">Key Takeaways:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Non-December year-ends have MORE preparation time:</strong> Companies with March, June, or September 
              year-ends can use part of calendar year 2026 for final preparation before their compliance period starts.
            </li>
            <li>
              <strong>Evidence collection aligns with your fiscal year:</strong> You must collect control evidence throughout 
              your entire fiscal year, not calendar year 2026.
            </li>
            <li>
              <strong>Annual report timing varies:</strong> Your P29 declaration will be published in your annual report, 
              typically 4 months after your fiscal year-end.
            </li>
            <li>
              <strong>Adjust all playbook dates accordingly:</strong> When you see references to specific months or quarters, 
              translate them to your fiscal year using this table.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FiscalYearCalculator;
