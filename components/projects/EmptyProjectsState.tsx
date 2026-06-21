interface EmptyProjectsStateProps {
  onClearFilters: () => void;
}

export function EmptyProjectsState({ onClearFilters }: EmptyProjectsStateProps) {
  return (
    <div className="text-center py-12 px-6">
      <p className="text-lg text-muted-foreground mb-4">
        No projects match your current filters.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Clear filters
      </button>
    </div>
  );
}
