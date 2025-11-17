import { useState } from "react";
import { P29Data } from "@/data";
import TimelineVisualization from "@/components/roadmap/TimelineVisualization";
import PhaseCard from "@/components/roadmap/PhaseCard";
import PhaseDetailModal from "@/components/roadmap/PhaseDetailModal";
import UpcomingMilestones from "@/components/roadmap/UpcomingMilestones";
import { Phase } from "@/types/data";

const Roadmap = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  
  const phases = P29Data.phases.getAll();
  const allMilestones = P29Data.milestones.getAll();
  const upcomingMilestones = P29Data.milestones.getUpcoming(8);
  
  // Calculate current week (example: Week 1 = Jan 2025)
  const currentWeek = 1;
  const currentQuarter = Math.ceil(currentWeek / 13);
  const currentYear = 2025;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 animate-fade-in">
            Your 24-Month Journey to Provision 29 Compliance
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 animate-fade-in">
            A proven implementation framework based on FTSE 100 delivery
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 md:px-4 py-2 rounded-full animate-fade-in">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">
              You are currently in Week {currentWeek} (Q{currentQuarter} {currentYear})
            </span>
          </div>
        </div>
      </section>

      {/* Timeline Visualization */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <TimelineVisualization phases={phases} currentWeek={currentWeek} />
        </div>
      </section>

      {/* Phase Cards */}
      <section className="py-8 md:py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">Implementation Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {phases.map((phase) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                onViewDetails={() => setSelectedPhase(phase)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Milestones */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Upcoming Milestones</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 md:mb-8">Next 8 weeks</p>
          <UpcomingMilestones milestones={upcomingMilestones} />
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
