"use client";

import { useCallback } from "react";

interface TechnologyFiltersProps {
  technologies: string[];
  selectedTechnologies: string[];
  onToggle: (technology: string) => void;
}

export function TechnologyFilters({
  technologies,
  selectedTechnologies,
  onToggle,
}: TechnologyFiltersProps) {
  const handleToggle = useCallback(
    (technology: string) => {
      onToggle(technology);
    },
    [onToggle]
  );

  if (technologies.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm text-muted-foreground self-center mr-2">
        Filter by technology:
      </span>
      {technologies.map((technology) => {
        const isSelected = selectedTechnologies.includes(technology);
        return (
          <button
            key={technology}
            type="button"
            onClick={() => handleToggle(technology)}
            aria-pressed={isSelected}
            aria-label={`Filter by ${technology}`}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
              isSelected
                ? "bg-accent text-background font-medium"
                : "bg-background-muted text-foreground hover:bg-accent hover:text-background"
            }`}
          >
            {technology}
          </button>
        );
      })}
    </div>
  );
}
