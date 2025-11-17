import { useState, useMemo } from "react";
import { P29Data } from "@/data";
import { Template } from "@/types/data";
import SearchBar from "@/components/templates/SearchBar";
import FilterBar from "@/components/templates/FilterBar";
import TemplateCard from "@/components/templates/TemplateCard";
import TemplateDetailModal from "@/components/templates/TemplateDetailModal";
import EmptyState from "@/components/templates/EmptyState";
import { Badge } from "@/components/ui/badge";

const PHASE_COLORS: Record<number, string> = {
  1: "#1e3a8a",
  2: "#06A77D",
  3: "#F18F01",
  4: "#10b981",
};

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const allTemplates = P29Data.templates.getAll();
  const availableTypes = P29Data.templates.getTypes();

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((template) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          template.name,
          template.description,
          ...template.keyFeatures,
        ].join(" ").toLowerCase();
        
        if (!searchableText.includes(query)) return false;
      }

      // Phase filter
      if (phaseFilter !== "all" && template.phase !== parseInt(phaseFilter)) {
        return false;
      }

      // Role filter
      if (roleFilter !== "all" && !template.roles.includes(roleFilter)) {
        return false;
      }

      // Type filter
      if (typeFilter !== "all" && template.type !== typeFilter) {
        return false;
      }

      return true;
    });
  }, [allTemplates, searchQuery, phaseFilter, roleFilter, typeFilter]);

  const hasActiveFilters = phaseFilter !== "all" || roleFilter !== "all" || typeFilter !== "all" || searchQuery !== "";

  const clearAllFilters = () => {
    setSearchQuery("");
    setPhaseFilter("all");
    setRoleFilter("all");
    setTypeFilter("all");
  };

  const handleQuickFilter = (type: "phase" | "role" | "type", value: string) => {
    clearAllFilters();
    if (type === "phase") setPhaseFilter(value);
    if (type === "role") setRoleFilter(value);
    if (type === "type") setTypeFilter(value);
  };

  const getRelatedTemplates = (template: Template) => {
    return allTemplates
      .filter((t) => 
        t.id !== template.id && 
        (t.phase === template.phase || t.roles.some(r => template.roles.includes(r)))
      )
      .slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Provision 29 Template Library
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in">
            {allTemplates.length} ready-to-use templates to accelerate your implementation
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-[var(--nav-height)] z-20 bg-background/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto max-w-7xl py-4 px-4 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            phaseFilter={phaseFilter}
            roleFilter={roleFilter}
            typeFilter={typeFilter}
            onPhaseChange={setPhaseFilter}
            onRoleChange={setRoleFilter}
            onTypeChange={setTypeFilter}
            onClearFilters={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
            resultCount={filteredTemplates.length}
            totalCount={allTemplates.length}
            availableTypes={availableTypes}
          />
        </div>
      </section>

      {/* Quick Filters */}
      <section className="py-6 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors"
              style={{ borderColor: PHASE_COLORS[1] }}
              onClick={() => handleQuickFilter("phase", "1")}
            >
              Phase 1 Templates
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleQuickFilter("role", "Board")}
            >
              For Board Directors
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleQuickFilter("type", "Assessment")}
            >
              Assessment Tools
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleQuickFilter("type", "Workshop")}
            >
              Workshop Materials
            </Badge>
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onViewDetails={() => setSelectedTemplate(template)}
                  phaseColor={PHASE_COLORS[template.phase]}
                />
              ))}
            </div>
          ) : (
            <EmptyState onClearFilters={clearAllFilters} />
          )}
        </div>
      </section>

      {/* Template Detail Modal */}
      <TemplateDetailModal
        template={selectedTemplate}
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        phaseColor={selectedTemplate ? PHASE_COLORS[selectedTemplate.phase] : undefined}
        relatedTemplates={selectedTemplate ? getRelatedTemplates(selectedTemplate) : []}
        onTemplateClick={setSelectedTemplate}
      />
    </div>
  );
};

export default Templates;
