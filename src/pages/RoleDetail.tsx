import { useParams, useNavigate } from "react-router-dom";
import { P29Data } from "@/data";
import SEOHead from "@/components/common/SEOHead";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, BookOpen, Settings } from "lucide-react";
import RoleOverview from "@/components/roles/RoleOverview";
import RoleTimeline from "@/components/roles/RoleTimeline";
import RoleResources from "@/components/roles/RoleResources";
import RoleSettings from "@/components/roles/RoleSettings";

const RoleDetail = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();

  const role = P29Data.roles.getById(roleId || "");

  if (!role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Role Not Found</h1>
          <Button onClick={() => navigate("/roles")}>
            Back to Roles
          </Button>
        </div>
      </div>
    );
  }

  // Get templates for this role
  const templates = P29Data.templates.getByRole(role.name) || [];

  // Get all roles for navigation
  const allRoles = P29Data.roles.getAll();
  const currentIndex = allRoles.findIndex(r => r.id === role.id);
  const previousRole = currentIndex > 0 ? allRoles[currentIndex - 1] : null;
  const nextRole = currentIndex < allRoles.length - 1 ? allRoles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={role.name}
        description={role.description}
        canonical={`${window.location.origin}/roles/${role.id}`}
      />
      
      {/* Hero Section */}
      <section 
        className="py-12 md:py-16 px-4 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${role.color}15 0%, ${role.color}05 100%)` 
        }}
      >
        <div className="container mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <Breadcrumbs 
            items={[
              { label: 'Roles', href: '/roles' },
              { label: role.name }
            ]} 
            className="mb-6"
          />

          {/* Role Header */}
          <div className="flex items-start gap-6 mb-6">
            <div 
              className="text-6xl flex-shrink-0"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
            >
              {role.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{role.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                {role.description}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: role.color }}
              >
                📋
              </div>
              <div>
                <div className="font-bold">{role.keyResponsibilities.length}</div>
                <div className="text-muted-foreground">Key Responsibilities</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: role.color }}
              >
                ❓
              </div>
              <div>
                <div className="font-bold">{role.criticalQuestions.length}</div>
                <div className="text-muted-foreground">Critical Questions</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: role.color }}
              >
                📄
              </div>
              <div>
                <div className="font-bold">{templates.length}</div>
                <div className="text-muted-foreground">Recommended Templates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Tabs defaultValue="settings" className="w-full">
            <div className="sticky top-[var(--nav-height)] bg-background/95 backdrop-blur-sm z-10 pb-4 border-b mb-8">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
                <TabsTrigger value="overview" className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="timeline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="settings">
              <RoleSettings />
            </TabsContent>

            <TabsContent value="overview">
              <RoleOverview role={role} />
            </TabsContent>

            <TabsContent value="timeline">
              <RoleTimeline role={role} />
            </TabsContent>

            <TabsContent value="resources">
              <RoleResources role={role} templates={templates} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Role Navigation */}
      <section className="py-8 px-4 border-t bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            {previousRole ? (
              <Button
                variant="outline"
                onClick={() => navigate(`/roles/${previousRole.id}`)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-semibold">{previousRole.name.split('/')[0].trim()}</div>
                </div>
              </Button>
            ) : (
              <div />
            )}

            {nextRole ? (
              <Button
                variant="outline"
                onClick={() => navigate(`/roles/${nextRole.id}`)}
                className="gap-2"
              >
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="font-semibold">{nextRole.name.split('/')[0].trim()}</div>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoleDetail;
