import { ProjectCard } from "./ProjectCard";
import { EmptyProjectsState } from "./EmptyProjectsState";
import type { ProjectData } from "@/lib/content/schemas";

interface ProjectGridProps {
  projects: ProjectData[];
  onClearFilters?: () => void;
  showEmptyState?: boolean;
}

export function ProjectGrid({ projects, onClearFilters, showEmptyState = false }: ProjectGridProps) {
  if (projects.length === 0 && showEmptyState && onClearFilters) {
    return <EmptyProjectsState onClearFilters={onClearFilters} />;
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
