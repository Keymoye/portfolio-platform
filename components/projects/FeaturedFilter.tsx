"use client";

import { useCallback } from "react";

interface FeaturedFilterProps {
  featuredOnly: boolean;
  onToggle: () => void;
}

export function FeaturedFilter({ featuredOnly, onToggle }: FeaturedFilterProps) {
  const handleToggle = useCallback(() => {
    onToggle();
  }, [onToggle]);

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={featuredOnly}
      aria-label="Toggle featured projects only"
      className={`px-3 py-1.5 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
        featuredOnly
          ? "bg-accent text-background font-medium"
          : "bg-background-muted text-foreground hover:bg-accent hover:text-background"
      }`}
    >
      Featured only
    </button>
  );
}
