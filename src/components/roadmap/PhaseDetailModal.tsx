import { Phase, Milestone } from "@/types/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface PhaseDetailModalProps {
  phase: Phase | null;
  isOpen: boolean;
  onClose: () => void;
  milestones?: Milestone[];
}

const PhaseDetailModal = ({ phase, isOpen, onClose, milestones = [] }: PhaseDetailModalProps) => {
  if (!phase) return null;

  const phaseMilestones = milestones.filter(m => m.phase === phase.id);
  const decisionGate = phaseMilestones.find(m => m.decisionRequired);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: phase.color }}
            >
              {phase.id}
            </div>
            <div>
              <DialogTitle className="text-2xl">{phase.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {phase.duration} | {phase.timing}
              </p>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="gate">Decision Gate</TabsTrigger>
            <TabsTrigger value="pitfalls">Pitfalls</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div>
              <h3 className="font-semibold mb-2">Objective</h3>
              <p className="text-sm text-muted-foreground">{phase.objective}</p>
            </div>

            {phase.criticalSuccessFactors && phase.criticalSuccessFactors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Critical Success Factors</h3>
                <ul className="space-y-2">
                  {phase.criticalSuccessFactors.map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <div className="text-sm font-semibold mb-1">Duration</div>
                <div className="text-sm text-muted-foreground">{phase.duration}</div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-1">Timeline</div>
                <div className="text-sm text-muted-foreground">Week {phase.startWeek} - {phase.endWeek}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {phase.keyActivities.map((activity) => (
                <AccordionItem key={activity.id} value={activity.id}>
                  <AccordionTrigger>
                    <div className="text-left">
                      <div className="font-semibold">{activity.name}</div>
                      <div className="text-sm text-muted-foreground">{activity.description}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 space-y-2">
                      <div className="font-semibold text-sm mb-2">Sub-tasks:</div>
                      {activity.subTasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="deliverables" className="mt-6">
            <div className="space-y-3">
              {phase.deliverables && phase.deliverables.length > 0 ? (
                phase.deliverables.map((deliverable, idx) => (
                  <div key={idx} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold">{deliverable.name}</h4>
                        {deliverable.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {deliverable.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No deliverables defined for this phase
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="mt-6">
            <div className="space-y-3">
              {phaseMilestones.length > 0 ? (
                phaseMilestones.map((milestone) => (
                  <div key={milestone.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Week {milestone.week}</Badge>
                          {milestone.critical && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Critical
                            </Badge>
                          )}
                          {milestone.decisionRequired && (
                            <Badge className="bg-yellow-500 hover:bg-yellow-600 gap-1">
                              Decision Gate
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold">{milestone.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {milestone.description}
                        </p>
                        <div className="text-sm text-muted-foreground mt-2">
                          <span className="font-semibold">Owner:</span> {milestone.owner}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No milestones defined for this phase
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gate" className="mt-6">
            {decisionGate ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">Decision Gate</Badge>
                    <Badge variant="outline">Week {decisionGate.week}</Badge>
                  </div>
                  <h3 className="text-xl font-bold">{decisionGate.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {decisionGate.description}
                  </p>
                </div>

                {decisionGate.goCriteria && (
                  <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5" />
                      Proceed Criteria
                    </h4>
                    <ul className="space-y-2">
                      {decisionGate.goCriteria.map((criterion, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {decisionGate.noGoCriteria && (
                  <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/20">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5" />
                      Do Not Proceed Criteria
                    </h4>
                    <ul className="space-y-2">
                      {decisionGate.noGoCriteria.map((criterion, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No decision gate defined for this phase
              </p>
            )}
          </TabsContent>

          <TabsContent value="pitfalls" className="mt-6">
            <div className="space-y-4">
              {phase.commonPitfalls && phase.commonPitfalls.length > 0 ? (
                phase.commonPitfalls.map((pitfall, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
                            {pitfall.pitfall}
                          </h4>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-red-700 dark:text-red-400">
                            Impact:
                          </div>
                          <p className="text-sm text-muted-foreground">{pitfall.impact}</p>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-green-700 dark:text-green-400">
                            Solution:
                          </div>
                          <p className="text-sm text-muted-foreground">{pitfall.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No common pitfalls documented for this phase
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PhaseDetailModal;
