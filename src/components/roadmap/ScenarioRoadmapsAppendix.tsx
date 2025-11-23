import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScenarioRoadmapCard from "./ScenarioRoadmapCard";
import scenarioData from "@/data/scenarioRoadmaps.json";
import { FileText, Filter } from "lucide-react";

const ScenarioRoadmapsAppendix = () => {
  const [selectedFiscalYear, setSelectedFiscalYear] = useState<string | null>(null);
  const [selectedMaturity, setSelectedMaturity] = useState<string | null>(null);

  const fiscalYearOptions = [
    { value: 'december', label: 'December' },
    { value: 'march', label: 'March' },
    { value: 'june', label: 'June' },
    { value: 'september', label: 'September' },
  ];

  const maturityOptions = [
    { value: 'level1', label: 'Level 1: Starting Fresh' },
    { value: 'level2', label: 'Level 2: Foundation' },
    { value: 'level3', label: 'Level 3: Documented' },
  ];

  const filteredScenarios = scenarioData.scenarios.filter(scenario => {
    if (selectedFiscalYear && scenario.fiscalYearEnd !== selectedFiscalYear) return false;
    if (selectedMaturity && scenario.maturityLevel !== selectedMaturity) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Appendix: Scenario-Specific Implementation Roadmaps</h2>
        </div>
        <p className="text-muted-foreground max-w-4xl mx-auto">
          Pre-generated roadmaps for 12 common scenarios covering different fiscal year-ends and maturity levels. 
          Each roadmap shows actual dates, phase durations, critical milestones, resource requirements, and risk assessments 
          tailored to your specific situation.
        </p>
      </div>

      {/* Filter Section */}
      <Card className="p-6 bg-muted/30">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Filter Scenarios</h3>
        </div>
        
        <div className="space-y-4">
          {/* Fiscal Year Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Fiscal Year-End</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedFiscalYear === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFiscalYear(null)}
              >
                All
              </Button>
              {fiscalYearOptions.map(option => (
                <Button
                  key={option.value}
                  variant={selectedFiscalYear === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFiscalYear(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Maturity Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Maturity Level</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedMaturity === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMaturity(null)}
              >
                All
              </Button>
              {maturityOptions.map(option => (
                <Button
                  key={option.value}
                  variant={selectedMaturity === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMaturity(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing <Badge variant="secondary">{filteredScenarios.length}</Badge> scenario{filteredScenarios.length !== 1 ? 's' : ''}
          </p>
        </div>
      </Card>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredScenarios.map(scenario => (
          <ScenarioRoadmapCard key={scenario.id} scenario={scenario} />
        ))}
      </div>

      {/* Usage Guide */}
      <Card className="p-6 bg-primary/5">
        <h3 className="text-lg font-semibold mb-3">How to Use These Roadmaps</h3>
        <div className="space-y-2 text-sm">
          <p className="flex items-start gap-2">
            <span className="font-semibold text-primary">1.</span>
            <span>Find your scenario by matching your fiscal year-end and maturity level (from the assessment)</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-semibold text-primary">2.</span>
            <span>Review the phase timeline to understand your compressed or extended schedule</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-semibold text-primary">3.</span>
            <span>Note the critical milestones and decision gates with actual dates for planning</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-semibold text-primary">4.</span>
            <span>Plan resource allocation around the identified peak periods</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-semibold text-primary">5.</span>
            <span>Pay close attention to the risk callouts specific to your scenario timeline</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-semibold text-primary">6.</span>
            <span>Use these roadmaps as templates for your internal project planning and board reporting</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ScenarioRoadmapsAppendix;
