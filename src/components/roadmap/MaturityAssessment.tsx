import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Target, AlertCircle, RotateCcw } from 'lucide-react';
import { useMaturity, maturityQuestions } from '@/contexts/MaturityContext';

const MaturityAssessment = () => {
  const { answers, setAnswer, getMaturityLevel, getScore, resetAssessment } = useMaturity();
  const level = getMaturityLevel();
  const score = getScore();

  const maturityLevels = {
    level1: {
      title: 'Level 1: Starting Fresh',
      description: 'Begin at Phase 1 - Definition & Scoping',
      color: 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100',
      icon: AlertCircle,
      recommendation: 'You need the full phased implementation framework. Start with Phase 1 to establish foundational elements.',
      timeline: 'Full implementation (All phases)',
      startPhase: 'Phase 1',
    },
    level2: {
      title: 'Level 2: Foundation Established',
      description: 'Begin at Phase 2 - Design & Documentation',
      color: 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100',
      icon: Target,
      recommendation: 'You have principal risks and some control framework. Skip Phase 1 but validate your existing work meets P29 standards.',
      timeline: '18-20 months (Accelerated)',
      startPhase: 'Phase 2',
    },
    level3: {
      title: 'Level 3: Controls Documented',
      description: 'Begin at Phase 3 - Assurance Preparation',
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100',
      icon: CheckCircle2,
      recommendation: 'You have controls documented and ownership assigned. Focus on building assurance infrastructure and testing protocols.',
      timeline: '12-16 months (Compressed)',
      startPhase: 'Phase 3',
    },
    level4: {
      title: 'Level 4: Testing Infrastructure Ready',
      description: 'Begin at Phase 4 - Final Preparation',
      color: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100',
      icon: CheckCircle2,
      recommendation: 'You have control testing history and evidence processes. Focus on final preparation and full-year evidence collection.',
      timeline: '6-12 months (Rapid readiness)',
      startPhase: 'Phase 4',
    },
  };

  const currentLevel = maturityLevels[level];
  const Icon = currentLevel.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Implementation Readiness Assessment
            </CardTitle>
            <CardDescription className="mt-2">
              Determine your starting point based on current maturity level
            </CardDescription>
          </div>
          {score > 0 && (
            <Button variant="ghost" size="sm" onClick={resetAssessment}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Questionnaire */}
        <div className="space-y-4">
          <p className="text-sm font-semibold">Check all that apply to your organization:</p>
          {maturityQuestions.map((q) => (
            <div key={q.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/30">
              <Checkbox
                id={q.id}
                checked={answers[q.id] || false}
                onCheckedChange={(checked) => setAnswer(q.id, checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <label
                  htmlFor={q.id}
                  className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {q.question}
                </label>
                {q.helpText && (
                  <p className="text-xs text-muted-foreground">{q.helpText}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        {score > 0 && (
          <>
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">Your Score:</span>
                <Badge variant="secondary" className="text-base px-4 py-1">
                  {score} / {maturityQuestions.length}
                </Badge>
              </div>

              <Alert className={`${currentLevel.color} border-none`}>
                <Icon className="h-4 w-4" />
                <AlertTitle className="text-base font-bold">{currentLevel.title}</AlertTitle>
                <AlertDescription className="space-y-3 mt-2">
                  <p className="text-sm">{currentLevel.recommendation}</p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div>
                      <span className="font-semibold">Recommended Timeline:</span>
                      <p className="mt-1">{currentLevel.timeline}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Starting Point:</span>
                      <p className="mt-1">{currentLevel.startPhase}</p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>

            {/* Level-specific guidance */}
            <div className="p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <p className="font-semibold">Next Steps for Your Level:</p>
              {level === 'level1' && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Review the full implementation framework below</li>
                  <li>Start with Phase 1: Definition & Scoping</li>
                  <li>Secure executive sponsorship and establish steering committee</li>
                  <li>Define materiality criteria and identify material controls</li>
                </ul>
              )}
              {level === 'level2' && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Review Phase 1 validation checklist to confirm you can skip ahead</li>
                  <li>Start at Phase 2: Design & Documentation</li>
                  <li>Validate existing controls meet P29 materiality standards</li>
                  <li>Map existing controls to COSO/ISO framework</li>
                </ul>
              )}
              {level === 'level3' && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Review Phase 2 validation checklist to confirm readiness</li>
                  <li>Start at Phase 3: Assurance Preparation</li>
                  <li>Establish testing protocols and assurance mapping</li>
                  <li>Deploy or configure GRC platform for P29</li>
                </ul>
              )}
              {level === 'level4' && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Review Phase 3 validation checklist and dry run results</li>
                  <li>Start at Phase 4: Final preparation for live period</li>
                  <li>Validate board reporting mechanisms are operational</li>
                  <li>Prepare for full-year evidence collection</li>
                </ul>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MaturityAssessment;
