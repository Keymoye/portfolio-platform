"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectSearch({ value, onChange }: ProjectSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const previousValueRef = useRef(value);

  // Sync with external value changes (e.g., URL updates)
  useEffect(() => {
    if (previousValueRef.current !== value) {
      setLocalValue(value);
      previousValueRef.current = value;
    }
  }, [value]);

  // Debounced search with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setLocalValue("");
    onChange("");
  }, [onChange]);

  return (
    <div className="relative">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <input
        id="project-search"
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder="Search projects..."
        aria-label="Search projects by title, description, or technology"
        aria-describedby="search-hint"
        className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent rounded"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <span id="search-hint" className="sr-only">
        Type to search by project title, description, or technology stack
      </span>
    </div>
  );
}
