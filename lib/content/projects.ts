import type { ProjectData } from './schemas';
import { loadProjectMDX, getAllProjectSlugs } from './mdx';

export async function getProjects(): Promise<ProjectData[]> {
  const slugs = await getAllProjectSlugs();
  const projects: ProjectData[] = [];

  for (const slug of slugs) {
    const project = await loadProjectMDX(slug);
    if (project) {
      // Extract only the frontmatter data, not the content
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...projectData } = project;
      projects.push(projectData);
    }
  }

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const project = await loadProjectMDX(slug);
  if (!project) {
    return null;
  }
  // Extract only the frontmatter data, not the content
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...projectData } = project;
  return projectData;
}
