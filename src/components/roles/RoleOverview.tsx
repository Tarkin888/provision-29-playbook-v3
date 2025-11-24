import { Role } from "@/types/data";
import { CheckCircle2, Target, AlertCircle, Lightbulb, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useFiscalYear } from "@/contexts/FiscalYearContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface RoleOverviewProps {
  role: Role;
}

const RoleOverview = ({ role }: RoleOverviewProps) => {
  const { fiscalYearEnd, getComplianceYearLabel } = useFiscalYear();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to transform fiscal year references in text
  const transformFiscalYearText = (text: string) => {
    return text
      .replace(/FY2026/g, getComplianceYearLabel())
      .replace(/Q1 2025/g, fiscalYearEnd === 'december' ? 'Q1 2025' : fiscalYearEnd === 'march' ? 'Q2 2025' : fiscalYearEnd === 'june' ? 'Q3 2025' : 'Q4 2025')
      .replace(/Q2 2025/g, fiscalYearEnd === 'december' ? 'Q2 2025' : fiscalYearEnd === 'march' ? 'Q3 2025' : fiscalYearEnd === 'june' ? 'Q4 2025' : 'Q1 2026')
      .replace(/Q3 2025/g, fiscalYearEnd === 'december' ? 'Q3 2025' : fiscalYearEnd === 'march' ? 'Q4 2025' : fiscalYearEnd === 'june' ? 'Q1 2026' : 'Q2 2026')
      .replace(/Q4 2025/g, fiscalYearEnd === 'december' ? 'Q4 2025' : fiscalYearEnd === 'march' ? 'Q1 2026' : fiscalYearEnd === 'june' ? 'Q2 2026' : 'Q3 2026')
      .replace(/Q1 2026/g, fiscalYearEnd === 'december' ? 'Q1 2026' : fiscalYearEnd === 'march' ? 'Q2 2026' : fiscalYearEnd === 'june' ? 'Q3 2026' : 'Q4 2026')
      .replace(/Q2 2026/g, fiscalYearEnd === 'december' ? 'Q2 2026' : fiscalYearEnd === 'march' ? 'Q3 2026' : fiscalYearEnd === 'june' ? 'Q4 2026' : 'Q1 2027')
      .replace(/Q3 2026/g, fiscalYearEnd === 'december' ? 'Q3 2026' : fiscalYearEnd === 'march' ? 'Q4 2026' : fiscalYearEnd === 'june' ? 'Q1 2027' : 'Q2 2027')
      .replace(/Q4 2026/g, fiscalYearEnd === 'december' ? 'Q4 2026' : fiscalYearEnd === 'march' ? 'Q1 2027' : fiscalYearEnd === 'june' ? 'Q2 2027' : 'Q3 2027');
  };

  return (
    <div className="space-y-8">
      {/* Fiscal Year Context Alert */}
      <Alert>
        <Calendar className="h-4 w-4" />
        <AlertDescription>
          Timeline guidance adjusted for your <strong>{fiscalYearEnd.charAt(0).toUpperCase() + fiscalYearEnd.slice(1)}</strong> fiscal year-end. 
          Your compliance period is <strong>{getComplianceYearLabel()}</strong>.
        </AlertDescription>
      </Alert>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" style={{ color: role.color }} />
            Quick Start for {role.name.split('/')[0].trim()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Your First Week:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {role.keyResponsibilities.slice(0, 3).map((resp, idx) => (
                <li key={idx}>{transformFiscalYearText(resp)}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Key Templates You'll Need:</h4>
            <div className="flex flex-wrap gap-2">
              {role.recommendedTemplates.slice(0, 3).map((template, idx) => (
                <Badge key={idx} variant="secondary">
                  {template.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Responsibilities */}
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" style={{ color: role.color }} />
          Key Responsibilities
        </h3>
        <div className="grid gap-3">
          {role.keyResponsibilities.map((responsibility, idx) => (
            <div 
              key={idx} 
              className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ backgroundColor: role.color }}
              >
                {idx + 1}
              </div>
              <p className="text-sm flex-1">{transformFiscalYearText(responsibility)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Questions/Decisions */}
      <div>
        <h3 className="text-2xl font-bold mb-4">
          {role.criticalQuestions ? "Critical Questions" : "Critical Decisions"}
        </h3>
        <div className="grid gap-3">
          {role.criticalQuestions?.map((question, idx) => (
            <div 
              key={idx} 
              className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">❓</span>
                <div className="flex-1">
                  <p className="font-medium">{transformFiscalYearText(question)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6" style={{ color: role.color }} />
          How to Measure Your Effectiveness
        </h3>
        <div className="space-y-3">
          {role.successMetrics.map((metric, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: role.color }} />
              <p className="text-sm">{transformFiscalYearText(metric)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Role Coordination */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" style={{ color: role.color }} />
            You'll Work Closely With
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {role.id === 'board' && (
            <>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">CFO</p>
                <p className="text-sm text-muted-foreground">Materiality criteria, board presentations, resource allocation</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">Chief Risk Officer</p>
                <p className="text-sm text-muted-foreground">Framework design, dashboard review, assurance planning</p>
              </div>
            </>
          )}
          {role.id === 'cfo' && (
            <>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">Board Directors</p>
                <p className="text-sm text-muted-foreground">Programme updates, budget approval, declaration sign-off</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">Programme Manager</p>
                <p className="text-sm text-muted-foreground">Resource allocation, timeline management, escalations</p>
              </div>
            </>
          )}
          {role.id === 'cro' && (
            <>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">Control Owners</p>
                <p className="text-sm text-muted-foreground">Control documentation, testing coordination, remediation</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">Internal Audit</p>
                <p className="text-sm text-muted-foreground">Assurance planning, framework validation, independence</p>
              </div>
            </>
          )}
          {role.id === 'control-owner' && (
            <>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">Chief Risk Officer</p>
                <p className="text-sm text-muted-foreground">Control documentation standards, testing requirements</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">Programme Manager</p>
                <p className="text-sm text-muted-foreground">Deadline management, workshop scheduling, template access</p>
              </div>
            </>
          )}
          {role.id === 'internal-audit' && (
            <>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">Chief Risk Officer</p>
                <p className="text-sm text-muted-foreground">Assurance scope, independence boundaries, testing approach</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">Board Audit Committee</p>
                <p className="text-sm text-muted-foreground">Assurance reporting, findings escalation, independence confirmation</p>
              </div>
            </>
          )}
          {role.id === 'programme-manager' && (
            <>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">CFO</p>
                <p className="text-sm text-muted-foreground">Budget tracking, resource requests, escalations</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold">All Control Owners</p>
                <p className="text-sm text-muted-foreground">Timeline compliance, deliverable tracking, workshop coordination</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleOverview;
