import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Zap, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

const AcceleratedTracks = () => {
  const tracks = [
    {
      id: 'standard',
      label: 'Standard',
      title: 'Standard Track (Level 1 Maturity)',
      duration: 'Full implementation',
      maturityLevel: 'Level 1: Starting Fresh',
      phases: [
        { name: 'Phase 1: Definition', duration: '12 weeks', canCompress: false },
        { name: 'Phase 2: Design', duration: '16 weeks', canCompress: false },
        { name: 'Phase 3: Assurance', duration: '20 weeks', canCompress: false },
        { name: 'Phase 4: Live Operation', duration: '52 weeks', canCompress: false },
      ],
      cannotSkip: [
        'Board approval of materiality criteria and MCI',
        'Control documentation and ownership assignment',
        'Dry run testing (minimum 6-8 weeks)',
        'Full fiscal year of evidence collection',
      ],
      risks: [
        'Requires significant organizational commitment',
        'All phases executed in sequence',
        'No margin for delays',
      ],
      resources: '2-5 FTE throughout, £500K-800K total',
    },
    {
      id: '18-month',
      label: '18-Month',
      title: 'Accelerated Track (Level 2 Maturity)',
      duration: '18-20 months',
      maturityLevel: 'Level 2: Foundation Established',
      phases: [
        { name: 'Phase 1: SKIPPED', duration: '-', canCompress: true },
        { name: 'Phase 2: Design (Adapted)', duration: '12 weeks', canCompress: true },
        { name: 'Phase 3: Assurance', duration: '16 weeks', canCompress: true },
        { name: 'Phase 4: Live Operation', duration: '52 weeks', canCompress: false },
      ],
      cannotSkip: [
        'Validation of existing controls against P29 standards',
        'Framework mapping (COSO/ISO)',
        'Dry run testing (can be compressed to 4-6 weeks)',
        'Full fiscal year of evidence collection',
      ],
      risks: [
        'Assumes existing control framework is P29-compatible',
        'Less time for control owner training',
        'Compressed assurance preparation',
      ],
      resources: '3-6 FTE, £600K-1M total (includes external support)',
    },
    {
      id: '12-month',
      label: '12-Month',
      title: 'Compressed Track (Level 3 Maturity)',
      duration: '12-16 months',
      maturityLevel: 'Level 3: Controls Documented',
      phases: [
        { name: 'Phase 1-2: SKIPPED', duration: '-', canCompress: true },
        { name: 'Phase 3: Assurance (Compressed)', duration: '12 weeks', canCompress: true },
        { name: 'Phase 4: Live Operation', duration: '52 weeks', canCompress: false },
      ],
      cannotSkip: [
        'GRC platform deployment (can be partial in Q1)',
        'Assurance mapping and testing protocols',
        'Dry run (MINIMUM 4 weeks - cannot skip entirely)',
        'Full fiscal year of evidence collection',
      ],
      risks: [
        'HIGH RISK: Minimal buffer for issues',
        'GRC platform deployed with incomplete configuration',
        'Limited dry run reduces confidence',
        'Higher likelihood of control failures in Q1',
      ],
      resources: '4-8 FTE, £800K-1.5M total (heavy external support required)',
    },
    {
      id: '6-month',
      label: '6-Month',
      title: 'Rapid Readiness Track (Level 4 Maturity)',
      duration: '6-12 months',
      maturityLevel: 'Level 4: Testing Infrastructure Ready',
      phases: [
        { name: 'Phase 1-3: SKIPPED', duration: '-', canCompress: true },
        { name: 'Phase 4: Final Prep + Live', duration: '4-8 weeks prep + 52 weeks', canCompress: false },
      ],
      cannotSkip: [
        'Validation of existing testing results',
        'Board dashboard operational verification',
        'Final control owner training refresh',
        'Full fiscal year of evidence collection (CANNOT BE SHORTENED)',
      ],
      risks: [
        'ASSUMES all prior phases genuinely complete',
        'No time to fix structural issues',
        'Minimal margin for error',
        'Qualification likely if assumptions wrong',
      ],
      resources: '2-4 FTE for prep, then business-as-usual, £200K-400K',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Choose Your Implementation Track
        </CardTitle>
        <CardDescription>
          Select the timeline that matches your current maturity level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {tracks.map((track) => (
              <TabsTrigger key={track.id} value={track.id} className="text-xs">
                {track.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tracks.map((track) => (
            <TabsContent key={track.id} value={track.id} className="space-y-4 mt-4">
              {/* Header */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{track.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {track.duration}
                  </Badge>
                  <Badge variant="secondary">{track.maturityLevel}</Badge>
                </div>
              </div>

              {/* Phases */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Phase Breakdown:</h4>
                <div className="grid gap-2">
                  {track.phases.map((phase, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border ${
                        phase.canCompress
                          ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
                          : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{phase.name}</span>
                        <div className="flex items-center gap-2">
                          {phase.canCompress && (
                            <Badge variant="outline" className="text-xs">
                              Compressed/Skipped
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cannot Skip */}
              <div className="space-y-2">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold">What CANNOT be Skipped</AlertTitle>
                  <AlertDescription className="text-xs mt-2">
                    <ul className="space-y-1">
                      {track.cannotSkip.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Risks */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  Key Risks:
                </h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {track.risks.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-semibold mb-2">Resource Requirements:</h4>
                <p className="text-xs text-muted-foreground">{track.resources}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Important note */}
        <Alert className="mt-6 border-destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Critical:</strong> The full fiscal year of evidence collection (Phase 4 - 52 weeks) 
            CANNOT be compressed. Regardless of which track you choose, you must collect evidence 
            throughout your entire compliance fiscal year. Starting late affects preparation phases, 
            not the live evidence period.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AcceleratedTracks;
