import { Role } from "@/types/data";
import { CheckCircle2, Target, Settings, FileText } from "lucide-react";

interface RoleOverviewProps {
  role: Role;
}

const RoleOverview = ({ role }: RoleOverviewProps) => {
  const isBoardRole = role.id === "board";

  return (
    <div className="space-y-8">
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
              <p className="text-sm flex-1">{responsibility}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Questions or Decisions */}
      <div>
        <h3 className="text-2xl font-bold mb-4">
          {isBoardRole ? "Critical Questions to Ask" : "Critical Questions"}
        </h3>
        <div className="grid gap-3">
          {role.criticalQuestions.map((question, idx) => (
            <div 
              key={idx} 
              className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">❓</span>
                <div className="flex-1">
                  <p className="font-medium mb-1">{question}</p>
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
              <p className="text-sm">{metric}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleOverview;
