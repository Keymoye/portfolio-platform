"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { ProjectData } from "@/lib/content/schemas";
import type { ProjectFilters as ProjectFiltersType } from "@/types/project-filters";
import { filterProjects } from "@/lib/projects/filter-projects";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectGrid } from "./ProjectGrid";

interface ProjectsPageClientProps {
  projects: ProjectData[];
}

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const searchParams = useSearchParams();

  // Derive unique technologies from all projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.techStack.forEach((tech) => {
        techSet.add(tech);
      });
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<ProjectFiltersType>(() => {
    const query = searchParams.get("q") || "";
    const techParams = searchParams.getAll("tech");
    const featuredOnly = searchParams.get("featured") === "true";

    return {
      query,
      technologies: techParams,
      featuredOnly,
    };
  });

  const previousSearchParamsRef = useRef(searchParams.toString());

  // Sync filters with URL params on mount and URL changes
  useEffect(() => {
    const currentSearchParams = searchParams.toString();
    if (previousSearchParamsRef.current !== currentSearchParams) {
      const query = searchParams.get("q") || "";
      const techParams = searchParams.getAll("tech");
      const featuredOnly = searchParams.get("featured") === "true";

      setFilters({
        query,
        technologies: techParams,
        featuredOnly,
      });
      previousSearchParamsRef.current = currentSearchParams;
    }
  }, [searchParams]);

  // Apply filtering
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, filters);
  }, [projects, filters]);

  const handleFiltersChange = useCallback(
    (newFilters: ProjectFiltersType) => {
      setFilters(newFilters);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({
      query: "",
      technologies: [],
      featuredOnly: false,
    });
  }, []);

  const hasActiveFilters = Boolean(filters.query || filters.technologies.length > 0 || filters.featuredOnly);

  return (
    <div className="flex flex-col">
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Projects
          </h1>
          <div className="mb-8">
            <ProjectFilters
              technologies={allTechnologies}
              onFiltersChange={handleFiltersChange}
            />
          </div>
          <ProjectGrid
            projects={filteredProjects}
            onClearFilters={handleClearFilters}
            showEmptyState={hasActiveFilters}
          />
        </div>
      </section>
    </div>
  );
}
