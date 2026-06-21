import type { Project } from '@/types/project';
import type { ProjectFilters } from '@/types/project-filters';

/**
 * Pure function to filter projects based on search query, technologies, and featured status.
 * No React code. No browser APIs. 100% testable.
 *
 * @param projects - Array of projects to filter
 * @param filters - Filter criteria
 * @returns Filtered array of projects
 */
export function filterProjects(
  projects: Project[],
  filters: ProjectFilters
): Project[] {
  const { query, technologies, featuredOnly } = filters;

  return projects.filter((project) => {
    // Featured filter
    if (featuredOnly && !project.featured) {
      return false;
    }

    // Technology filter (multi-select: project must have ALL selected technologies)
    if (technologies.length > 0) {
      const hasAllTechnologies = technologies.every((tech) =>
        project.techStack.some((projectTech) =>
          projectTech.toLowerCase().includes(tech.toLowerCase())
        )
      );
      if (!hasAllTechnologies) {
        return false;
      }
    }

    // Search query (matches title, description, or tech stack)
    if (query.trim()) {
      const searchLower = query.toLowerCase();
      const matchesTitle = project.title.toLowerCase().includes(searchLower);
      const matchesDescription = project.description
        .toLowerCase()
        .includes(searchLower);
      const matchesTechStack = project.techStack.some((tech) =>
        tech.toLowerCase().includes(searchLower)
      );

      if (!matchesTitle && !matchesDescription && !matchesTechStack) {
        return false;
      }
    }

    return true;
  });
}
