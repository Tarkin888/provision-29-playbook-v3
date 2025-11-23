import { Phase } from "@/types/data";
import { Badge } from "@/components/ui/badge";
import { getPhaseStatus } from "@/utils/dateUtils";

interface TimelineVisualizationProps {
  phases: Phase[];
  currentWeek?: number;
  isAcceleratedView?: boolean;
}

const TimelineVisualization = ({ phases, currentWeek = 1, isAcceleratedView = false }: TimelineVisualizationProps) => {
  const totalWeeks = Math.max(...phases.map(p => p.endWeek));
  
  return (
    <div className="mb-12">
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block">
        <div className="relative h-32 bg-muted/30 rounded-lg overflow-hidden">
          {/* Phase blocks */}
          <div className="flex h-full">
            {phases.map((phase) => {
              const widthPercent = ((phase.endWeek - phase.startWeek + 1) / totalWeeks) * 100;
              
              const status = getPhaseStatus(phase.startWeek, phase.endWeek, currentWeek);
              const isOverdue = !isAcceleratedView && status === 'overdue';
              
              return (
                <div
                  key={phase.id}
                  className="relative flex flex-col justify-center px-4 border-r border-background/50 transition-all hover:brightness-110"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: phase.color,
                    opacity: isOverdue ? 0.5 : 1,
                  }}
                >
                  <div className="text-white">
                    <div className="text-xs font-semibold opacity-90">Phase {phase.id}</div>
                    <div className="text-sm font-bold">{phase.shortName}</div>
                    <div className="text-xs opacity-80 mt-1">
                      Week {phase.startWeek}-{phase.endWeek}
                    </div>
                    {isOverdue && (
                      <div className="text-xs font-bold text-destructive-foreground bg-destructive/90 px-1 rounded mt-1">
                        OVERDUE
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Current week indicator */}
          {currentWeek && currentWeek <= totalWeeks && (
            <div
              className="absolute top-0 bottom-0 w-1 bg-destructive z-10 shadow-lg"
              style={{
                left: `${(currentWeek / totalWeeks) * 100}%`,
              }}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <Badge variant="destructive" className="text-xs font-bold shadow-lg px-3 py-1">
                  📍 Week {currentWeek} (NOW)
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden space-y-4">
        {phases.map((phase) => {
          const status = getPhaseStatus(phase.startWeek, phase.endWeek, currentWeek);
          const isOverdue = !isAcceleratedView && status === 'overdue';
          
          return (
            <div key={phase.id} className="relative">
              <div
                className="rounded-lg p-4 text-white"
                style={{ 
                  backgroundColor: phase.color,
                  opacity: isOverdue ? 0.5 : 1,
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-semibold opacity-90">Phase {phase.id}</div>
                    <div className="text-lg font-bold">{phase.shortName}</div>
                    <div className="text-sm opacity-80 mt-1">{phase.duration}</div>
                    <div className="text-xs opacity-80">
                      Week {phase.startWeek}-{phase.endWeek}
                    </div>
                    {isOverdue && (
                      <Badge variant="destructive" className="text-xs mt-2">
                        OVERDUE
                      </Badge>
                    )}
                  </div>
                  {currentWeek && currentWeek >= phase.startWeek && currentWeek <= phase.endWeek && (
                    <Badge variant="destructive" className="text-xs">
                      📍 Week {currentWeek}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineVisualization;
