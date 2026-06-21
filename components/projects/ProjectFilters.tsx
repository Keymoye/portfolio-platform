"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { ProjectFilters as ProjectFiltersType } from "@/types/project-filters";
import { ProjectSearch } from "./ProjectSearch";
import { TechnologyFilters } from "./TechnologyFilters";
import { FeaturedFilter } from "./FeaturedFilter";

interface ProjectFiltersProps {
  technologies: string[];
  onFiltersChange: (filters: ProjectFiltersType) => void;
}

export function ProjectFilters({
  technologies,
  onFiltersChange,
}: ProjectFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<ProjectFiltersType>({
    query: "",
    technologies: [],
    featuredOnly: false,
  });

  const previousSearchParamsRef = useRef(searchParams.toString());

  // Initialize filters from URL params on mount
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

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters: ProjectFiltersType) => {
      const params = new URLSearchParams();

      if (newFilters.query) {
        params.set("q", newFilters.query);
      }
      newFilters.technologies.forEach((tech) => {
        params.append("tech", tech);
      });
      if (newFilters.featuredOnly) {
        params.set("featured", "true");
      }

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(url, { scroll: false });
    },
    [pathname, router]
  );

  const handleQueryChange = useCallback(
    (query: string) => {
      const newFilters = { ...filters, query };
      setFilters(newFilters);
      onFiltersChange(newFilters);
      updateURL(newFilters);
    },
    [filters, onFiltersChange, updateURL]
  );

  const handleTechnologyToggle = useCallback(
    (technology: string) => {
      const currentTechnologies = filters.technologies;
      const newTechnologies = currentTechnologies.includes(technology)
        ? currentTechnologies.filter((t) => t !== technology)
        : [...currentTechnologies, technology];

      const newFilters = { ...filters, technologies: newTechnologies };
      setFilters(newFilters);
      onFiltersChange(newFilters);
      updateURL(newFilters);
    },
    [filters, onFiltersChange, updateURL]
  );

  const handleFeaturedToggle = useCallback(() => {
    const newFilters = { ...filters, featuredOnly: !filters.featuredOnly };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    updateURL(newFilters);
  }, [filters, onFiltersChange, updateURL]);

  return (
    <div className="space-y-4">
      <ProjectSearch value={filters.query} onChange={handleQueryChange} />
      <div className="flex flex-wrap gap-4 items-center">
        <TechnologyFilters
          technologies={technologies}
          selectedTechnologies={filters.technologies}
          onToggle={handleTechnologyToggle}
        />
        <FeaturedFilter
          featuredOnly={filters.featuredOnly}
          onToggle={handleFeaturedToggle}
        />
      </div>
    </div>
  );
}
