import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterBarProps {
  phaseFilter: string;
  roleFilter: string;
  typeFilter: string;
  onPhaseChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
  totalCount: number;
  availableTypes: string[];
}

const AVAILABLE_ROLES = ["Board", "CFO", "CRO", "Control Owner", "Internal Audit", "Programme Manager"];

const FilterBar = ({
  phaseFilter,
  roleFilter,
  typeFilter,
  onPhaseChange,
  onRoleChange,
  onTypeChange,
  onClearFilters,
  hasActiveFilters,
  resultCount,
  totalCount,
  availableTypes,
}: FilterBarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={phaseFilter} onValueChange={onPhaseChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Phases" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Phases</SelectItem>
            <SelectItem value="1">Phase 1</SelectItem>
            <SelectItem value="2">Phase 2</SelectItem>
            <SelectItem value="3">Phase 3</SelectItem>
            <SelectItem value="4">Phase 4</SelectItem>
          </SelectContent>
        </Select>

        <Select value={roleFilter} onValueChange={onRoleChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {AVAILABLE_ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {availableTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{resultCount}</span> of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span> templates
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {phaseFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Phase {phaseFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onPhaseChange("all")}
              />
            </Badge>
          )}
          {roleFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {roleFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onRoleChange("all")}
              />
            </Badge>
          )}
          {typeFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {typeFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onTypeChange("all")}
              />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-6 px-2"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
