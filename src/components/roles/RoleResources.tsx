import { Role, Template } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, FileText, Video, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RoleResourcesProps {
  role: Role;
  templates: Template[];
}

const RoleResources = ({ role, templates }: RoleResourcesProps) => {
  const navigate = useNavigate();

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "article":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Recommended Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Templates Designed for Your Role</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/templates?role=${encodeURIComponent(role.name)}`)}
          >
            View All Templates
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="outline">Phase {template.phase}</Badge>
                  <Badge variant="secondary">{template.type}</Badge>
                </div>
                <CardTitle className="text-base">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {template.description}
                </p>
                <Button size="sm" variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Training Resources */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Build Your Knowledge</h3>
        <div className="space-y-3">
          {role.trainingResources.map((resource, idx) => (
            <Card key={idx} className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${role.color}20`, color: role.color }}
                  >
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="font-semibold">{resource.title}</h4>
                      <Badge variant="outline" className="flex-shrink-0">
                        {resource.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleResources;
