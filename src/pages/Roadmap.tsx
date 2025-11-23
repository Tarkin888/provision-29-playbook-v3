import { useState } from "react";
import { P29Data } from "@/data";
import SEOHead from "@/components/common/SEOHead";
import TimelineVisualization from "@/components/roadmap/TimelineVisualization";
import PhaseCard from "@/components/roadmap/PhaseCard";
import AcceleratedPhaseCard from "@/components/roadmap/AcceleratedPhaseCard";
import PhaseDetailModal from "@/components/roadmap/PhaseDetailModal";
import UpcomingMilestones from "@/components/roadmap/UpcomingMilestones";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import QuickLinks from "@/components/common/QuickLinks";
import ContentRecommendations from "@/components/recommendations/ContentRecommendations";
import UrgencyBanner from "@/components/roadmap/UrgencyBanner";
import RoadmapViewToggle from "@/components/roadmap/RoadmapViewToggle";
import StatusAssessment from "@/components/roadmap/StatusAssessment";
import ComparisonChart from "@/components/roadmap/ComparisonChart";
import LegalDisclaimer from "@/components/roadmap/LegalDisclaimer";
import { Phase } from "@/types/data";
import { Calendar, FileText, Target, Download } from "lucide-react";
import { getCurrentWeek, getCurrentQuarter, getMonthsBehind } from "@/utils/dateUtils";
import { Button } from "@/components/ui/button";
import acceleratedPhasesData from "@/data/acceleratedPhases.json";
import FiscalYearSelector from "@/components/roadmap/FiscalYearSelector";
import FiscalYearCalculator from "@/components/roadmap/FiscalYearCalculator";
import FiscalYearDisclaimer from "@/components/roadmap/FiscalYearDisclaimer";
import MaturityAssessment from "@/components/roadmap/MaturityAssessment";
import AcceleratedTracks from "@/components/roadmap/AcceleratedTracks";
import GapAnalysisTool from "@/components/roadmap/GapAnalysisTool";
import FrameworkBridgingGuides from "@/components/roadmap/FrameworkBridgingGuides";
import PhaseSkipValidation from "@/components/roadmap/PhaseSkipValidation";
import { useFiscalYear } from "@/contexts/FiscalYearContext";
import PersonalisedTimelineCalculator from "@/components/roadmap/PersonalisedTimelineCalculator";
import ScenarioRoadmapsAppendix from "@/components/roadmap/ScenarioRoadmapsAppendix";

const Roadmap = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [roadmapView, setRoadmapView] = useState<'ideal' | 'accelerated'>('accelerated');
  const { getComplianceYearLabel } = useFiscalYear();
  
  const phases = P29Data.phases.getAll();
  const acceleratedPhases = acceleratedPhasesData.phases;
  const allMilestones = P29Data.milestones.getAll();
  const upcomingMilestones = P29Data.milestones.getUpcoming(8);
  
  // Dynamic date calculations
  const currentWeek = getCurrentWeek();
  const { quarter: currentQuarter, year: currentYear } = getCurrentQuarter();
  const monthsBehind = getMonthsBehind();
  const isSignificantlyBehind = monthsBehind >= 6;

  // Quick links for roadmap
  const quickLinks = [
    {
      label: 'Download Emergency Action Plan',
      icon: <Download className="h-4 w-4" />,
      onClick: () => {
        alert('PDF generation coming soon! This will download a 6-week critical sprint checklist.');
      },
      variant: 'default' as const,
    },
    {
      label: 'View Templates',
      icon: <FileText className="h-4 w-4" />,
      href: '/templates',
    },
    {
      label: 'Start Readiness Assessment',
      icon: <Target className="h-4 w-4" />,
      href: '/assessment',
    },
  ];

  // Related content recommendations
  const recommendations = [
    {
      id: '1',
      title: 'Template Library',
      description: 'Access ready-to-use templates for each phase of your implementation',
      category: 'Templates',
      url: '/templates',
      icon: '📄',
    },
    {
      id: '2',
      title: 'Role Guides',
      description: 'Understand responsibilities for boards, CFOs, risk owners, and audit teams',
      category: 'Roles',
      url: '/roles',
      icon: '👥',
    },
    {
      id: '3',
      title: 'Resources Hub',
      description: 'Articles, case studies, and best practices from FTSE implementations',
      category: 'Resources',
      url: '/resources',
      icon: '📚',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={isSignificantlyBehind ? "Provision 29 Accelerated Implementation: Catch-Up Roadmap for November 2025" : "Implementation Roadmap - Fiscal Year Flexible"}
        description={isSignificantlyBehind ? "Realistic framework for organisations starting Provision 29 implementation behind schedule. Accelerated timeline with risk assessment and mitigation strategies. Flexible for all fiscal year-ends." : "24-month structured journey through all phases of Provision 29 compliance. Customizable for your fiscal year-end. Plan your implementation with our comprehensive roadmap."}
        canonical={`${window.location.origin}/roadmap`}
      />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-20 md:pt-24 pb-4">
        <Breadcrumbs items={[{ label: 'Implementation Roadmap' }]} />
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 animate-fade-in">
            {isSignificantlyBehind 
              ? "Provision 29 Accelerated Implementation: Catch-Up Roadmap for November 2025"
              : `Your 24-Month Journey to Provision 29 Compliance ${getComplianceYearLabel()}`
            }
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 animate-fade-in">
            {isSignificantlyBehind
              ? "A realistic framework for organisations starting behind schedule - customized for your fiscal year-end"
              : "A proven implementation framework based on FTSE 100 delivery - flexible for all fiscal year-ends"
            }
          </p>
          <div className="flex flex-wrap items-center gap-3 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 md:px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">
                Week {currentWeek} (Q{currentQuarter} {currentYear})
              </span>
            </div>
            {isSignificantlyBehind && (
              <div className="inline-flex items-center gap-2 bg-destructive/10 px-3 md:px-4 py-2 rounded-full border border-destructive/20">
                <span className="text-xs sm:text-sm font-medium text-destructive">
                  {monthsBehind} months behind schedule
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fiscal Year Selector - Always visible */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl space-y-4">
          <FiscalYearDisclaimer />
          <FiscalYearSelector />
        </div>
      </section>

      {/* Fiscal Year Calculator Table */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <FiscalYearCalculator />
        </div>
      </section>

      {/* Maturity Assessment */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <MaturityAssessment />
        </div>
      </section>

      {/* Personalised Timeline Calculator */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <PersonalisedTimelineCalculator />
        </div>
      </section>

      {/* Accelerated Tracks */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <AcceleratedTracks />
        </div>
      </section>

      {/* Phase Skip Validation */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Phase Skip Validation</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
              Already completed some phases? Use these checklists to validate you can skip ahead
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <PhaseSkipValidation phaseNumber={1} />
            <PhaseSkipValidation phaseNumber={2} />
            <PhaseSkipValidation phaseNumber={3} />
          </div>
        </div>
      </section>

      {/* Gap Analysis Tool */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <GapAnalysisTool />
        </div>
      </section>

      {/* Framework Bridging Guides */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <FrameworkBridgingGuides />
        </div>
      </section>

      {/* Urgency Banner */}
      {isSignificantlyBehind && (
        <section className="py-6 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <UrgencyBanner />
          </div>
        </section>
      )}

      {/* Status Assessment (for late starters) */}
      {isSignificantlyBehind && (
        <section className="py-8 md:py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <StatusAssessment />
          </div>
        </section>
      )}

      {/* Roadmap View Toggle (for late starters) */}
      {isSignificantlyBehind && (
        <section className="py-8 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <RoadmapViewToggle view={roadmapView} onViewChange={setRoadmapView} />
          </div>
        </section>
      )}

      {/* Timeline Visualization */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">
              {roadmapView === 'accelerated' && isSignificantlyBehind
                ? "Accelerated Implementation Timeline"
                : "Ideal 24-Month Timeline"
              }
            </h2>
            <p className="text-sm text-muted-foreground">
              {roadmapView === 'accelerated' && isSignificantlyBehind
                ? "Compressed timeline for organisations starting in November 2025 - dates adjust based on your fiscal year-end"
                : "Recommended timeline for organisations starting in Q1 2025 - dates adjust based on your fiscal year-end"
              }
            </p>
          </div>
          <TimelineVisualization 
            phases={roadmapView === 'accelerated' && isSignificantlyBehind ? acceleratedPhases : phases} 
            currentWeek={currentWeek}
            isAcceleratedView={roadmapView === 'accelerated'}
          />
        </div>
      </section>

      {/* Phase Cards */}
      <section className="py-8 md:py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">
            {roadmapView === 'accelerated' && isSignificantlyBehind
              ? "Accelerated Implementation Phases"
              : "Implementation Phases"
            }
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {roadmapView === 'accelerated' && isSignificantlyBehind ? (
              acceleratedPhases.map((phase: any) => (
                <AcceleratedPhaseCard
                  key={phase.id}
                  phase={phase}
                />
              ))
            ) : (
              phases.map((phase) => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  onViewDetails={() => setSelectedPhase(phase)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Comparison Chart (for late starters) */}
      {isSignificantlyBehind && (
        <section className="py-8 md:py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <ComparisonChart />
          </div>
        </section>
      )}

      {/* Upcoming Milestones */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Upcoming Milestones</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 md:mb-8">Next 8 weeks</p>
          <UpcomingMilestones milestones={upcomingMilestones} />
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <QuickLinks links={quickLinks} title="Quick Actions" />
        </div>
      </section>

      {/* Content Recommendations */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <ContentRecommendations items={recommendations} title="Explore Related Content" />
        </div>
      </section>

      {/* Legal Disclaimer (for late starters) */}
      {isSignificantlyBehind && (
        <section className="py-8 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <LegalDisclaimer />
          </div>
        </section>
      )}

      {/* Scenario-Specific Roadmaps Appendix */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <ScenarioRoadmapsAppendix />
        </div>
      </section>

      {/* Phase Detail Modal */}
      <PhaseDetailModal
        phase={selectedPhase}
        isOpen={!!selectedPhase}
        onClose={() => setSelectedPhase(null)}
        milestones={allMilestones}
      />
    </div>
  );
};

export default Roadmap;
