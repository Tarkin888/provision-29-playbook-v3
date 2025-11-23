import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RoadmapViewToggleProps {
  view: 'ideal' | 'accelerated';
  onViewChange: (view: 'ideal' | 'accelerated') => void;
}

const RoadmapViewToggle = ({ view, onViewChange }: RoadmapViewToggleProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-bold">Select Timeline View</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Compare ideal vs realistic timelines for late starters
        </p>
      </div>
      <Tabs value={view} onValueChange={(v) => onViewChange(v as 'ideal' | 'accelerated')}>
        <TabsList className="grid w-full sm:w-auto grid-cols-2">
          <TabsTrigger value="accelerated" className="text-xs sm:text-sm">
            🚨 Accelerated Plan
          </TabsTrigger>
          <TabsTrigger value="ideal" className="text-xs sm:text-sm">
            📋 Ideal Timeline
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default RoadmapViewToggle;
