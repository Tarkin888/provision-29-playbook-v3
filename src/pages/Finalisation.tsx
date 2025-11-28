import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SEOHead from '@/components/common/SEOHead';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { CheckCircle, Download, AlertTriangle, Clock, FileText, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Finalisation() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [monthsRemaining, setMonthsRemaining] = useState(0);

  useEffect(() => {
    // Load checklist from localStorage
    const saved = localStorage.getItem('p29_finalisation_checklist');
    if (saved) {
      setChecklist(JSON.parse(saved));
    }

    // Calculate months remaining
    const deadline = new Date('2026-01-01');
    const today = new Date();
    const months = Math.max(0, Math.floor((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)));
    setMonthsRemaining(months);
  }, []);

  const handleChecklistChange = (id: string, checked: boolean) => {
    const updated = { ...checklist, [id]: checked };
    setChecklist(updated);
    localStorage.setItem('p29_finalisation_checklist', JSON.stringify(updated));
  };

  const checklistItems = [
    { id: 'controls_complete', label: 'All material controls identified and documented', critical: true },
    { id: 'testing_complete', label: 'Testing completed for all material controls', critical: true },
    { id: 'deficiencies_resolved', label: 'Control deficiencies remediated or disclosed', critical: true },
    { id: 'evidence_archived', label: 'Testing evidence collected and archived', critical: false },
    { id: 'procedures_documented', label: 'Control identification procedures documented', critical: true },
    { id: 'governance_approved', label: 'Governance framework approved by board', critical: true },
    { id: 'roles_assigned', label: 'Roles and responsibilities clearly assigned', critical: false },
    { id: 'dry_run_complete', label: 'Dry run completed successfully', critical: true },
    { id: 'board_pack_prepared', label: 'Board pack prepared and reviewed', critical: true },
    { id: 'declaration_drafted', label: 'Declaration language drafted and approved', critical: true },
    { id: 'auditor_consulted', label: 'External auditor consulted and aligned', critical: false },
    { id: 'disclosure_reviewed', label: 'Annual report disclosure reviewed by legal', critical: true },
    { id: 'sign_off_obtained', label: 'CFO and CEO sign-off obtained', critical: true },
    { id: 'committee_briefed', label: 'Audit committee fully briefed', critical: true },
    { id: 'backup_evidence', label: 'Backup evidence and documentation prepared', critical: false }
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const completionPercentage = Math.round((completedCount / checklistItems.length) * 100);

  const dryRunSteps = [
    'Schedule dry run at least 6-8 weeks before board declaration',
    'Simulate the full control identification and assessment process',
    'Test evidence collection and documentation procedures',
    'Identify any gaps in control coverage or documentation',
    'Validate that board reporting materials are complete and accurate',
    'Confirm all stakeholders understand their roles and responsibilities',
    'Document lessons learned and implement improvements'
  ];

  const commonPitfalls = [
    {
      title: 'Rushing the Final Phases',
      description: 'Organizations often underestimate the time needed for board preparation and declaration finalization. Start the board pack preparation at least 2-3 months before your declaration date.',
      severity: 'critical'
    },
    {
      title: 'Incomplete Evidence Documentation',
      description: 'Failing to properly archive testing evidence can undermine your entire declaration. Ensure all evidence is collected, organized, and readily accessible for auditor review.',
      severity: 'high'
    },
    {
      title: 'Inadequate Board Engagement',
      description: 'Boards need adequate time to understand and approve the control framework. Don\'t present the declaration for approval without prior education sessions.',
      severity: 'high'
    },
    {
      title: 'Overlooking Remediation Plans',
      description: 'If control deficiencies exist, you must either remediate them or clearly disclose them in your declaration. Avoid the temptation to minimize known issues.',
      severity: 'critical'
    },
    {
      title: 'Misalignment with External Auditors',
      description: 'While auditors don\'t provide assurance on P29, their views matter. Engage them early to avoid last-minute disagreements about control scope or procedures.',
      severity: 'medium'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Final Preparations & Board Declaration - P29 Playbook"
        description="Complete finalisation guide for P29 implementation including checklist, dry run procedures, board pack templates, and external assurance guidance."
      />

      <div className="container mx-auto px-4 py-12 max-w-[1200px]">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Finalisation' }
        ]} />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Final Preparations & Board Declaration
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive guide to completing your P29 implementation and preparing for board declaration
          </p>
        </div>

        {/* Countdown Alert */}
        <Alert className={`mb-8 ${monthsRemaining < 6 ? 'bg-red-50 border-red-300' : 'bg-orange-50 border-orange-300'}`}>
          <Clock className={monthsRemaining < 6 ? 'text-red-600' : 'text-orange-600'} />
          <AlertDescription className={monthsRemaining < 6 ? 'text-red-900' : 'text-orange-900'}>
            <strong>{monthsRemaining} {monthsRemaining === 1 ? 'month' : 'months'} remaining</strong> until January 2026 deadline. Ensure all critical tasks are completed well in advance.
          </AlertDescription>
        </Alert>

        {/* Finalisation Checklist */}
        <section className="mb-16">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">
                Finalisation Checklist
              </h2>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{completionPercentage}%</div>
                <div className="text-sm text-muted-foreground">{completedCount} of {checklistItems.length} complete</div>
              </div>
            </div>

            <div className="space-y-3">
              {checklistItems.map((item) => (
                <div 
                  key={item.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    checklist[item.id] ? 'bg-green-50 border-green-200' : 'bg-background border-border'
                  }`}
                >
                  <Checkbox
                    id={item.id}
                    checked={checklist[item.id] || false}
                    onCheckedChange={(checked) => handleChecklistChange(item.id, checked as boolean)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={item.id}
                    className={`flex-1 cursor-pointer ${checklist[item.id] ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {item.label}
                    {item.critical && (
                      <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                        CRITICAL
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Dry Run Guide */}
        <section className="mb-16 bg-gray-50 dark:bg-gray-900 -mx-4 px-4 py-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Users className="w-12 h-12 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Dry Run Guide
              </h2>
            </div>

            <Card className="p-8">
              <p className="text-muted-foreground mb-6">
                A dry run is a full simulation of your P29 declaration process, conducted 6-8 weeks before your actual board declaration. This critical step identifies gaps and builds confidence.
              </p>

              <div className="space-y-4">
                {dryRunSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Board Pack Template */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <FileText className="w-12 h-12 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">
              Board Pack Template
            </h2>
          </div>

          <Card className="p-8 bg-primary/5">
            <p className="text-muted-foreground mb-6">
              Our board pack template includes all materials needed for your board declaration, including executive summary, control framework overview, testing results, and draft declaration language.
            </p>

            <Button size="lg">
              <Download className="mr-2 w-5 h-5" />
              Download Board Pack Template
            </Button>
          </Card>
        </section>

        {/* Common Pitfalls */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <AlertTriangle className="w-12 h-12 text-orange-600" />
            <h2 className="text-2xl md:text-3xl font-bold">
              Common Pitfalls to Avoid
            </h2>
          </div>

          <div className="space-y-4">
            {commonPitfalls.map((pitfall) => (
              <Alert 
                key={pitfall.title}
                className={`
                  ${pitfall.severity === 'critical' ? 'border-red-300 bg-red-50' : ''}
                  ${pitfall.severity === 'high' ? 'border-orange-300 bg-orange-50' : ''}
                  ${pitfall.severity === 'medium' ? 'border-yellow-300 bg-yellow-50' : ''}
                `}
              >
                <AlertTriangle className={`
                  ${pitfall.severity === 'critical' ? 'text-red-600' : ''}
                  ${pitfall.severity === 'high' ? 'text-orange-600' : ''}
                  ${pitfall.severity === 'medium' ? 'text-yellow-600' : ''}
                `} />
                <div>
                  <h3 className="font-semibold mb-2">{pitfall.title}</h3>
                  <AlertDescription className="text-muted-foreground">
                    {pitfall.description}
                  </AlertDescription>
                </div>
              </Alert>
            ))}
          </div>
        </section>

        {/* External Assurance */}
        <section className="mb-16 bg-gray-50 dark:bg-gray-900 -mx-4 px-4 py-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="w-12 h-12 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">
                External Assurance Guidance
              </h2>
            </div>

            <Card className="p-8">
              <p className="text-muted-foreground mb-6">
                While P29 does not require external assurance, many organizations choose to engage their external auditors for advisory services or limited assurance procedures. Here's what you need to know:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">No Mandatory Assurance</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlike SOX 404, P29 does not require external auditor attestation. The board declaration stands on its own.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Advisory Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Many companies engage auditors for advisory support during implementation, helping design procedures and review documentation approaches.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Voluntary Assurance</h3>
                  <p className="text-sm text-muted-foreground">
                    Some organizations may choose to obtain limited assurance over their P29 procedures to enhance stakeholder confidence, though this is not common practice.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Coordination is Key</h3>
                  <p className="text-sm text-muted-foreground">
                    Whether seeking formal assurance or not, coordinate with your external auditors throughout implementation to avoid misalignment on control scope or procedures.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-primary/5 -mx-4 px-4 rounded-lg mb-12">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help with Final Preparations?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access additional resources and templates to ensure a successful board declaration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/templates')}>
              Browse Templates
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/resources')}>
              View Resources
            </Button>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
