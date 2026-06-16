import { projectSchema, type ProjectData } from './schemas';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects');

export async function getProjects(): Promise<ProjectData[]> {
  const files = fs.readdirSync(CONTENT_DIR);
  const projects: ProjectData[] = [];

  for (const file of files) {
    if (file.endsWith('.mdx') || file.endsWith('.md')) {
      const filePath = path.join(CONTENT_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      // Parse frontmatter and validate with Zod
      // For now, return empty array - will implement full parsing in Epic 4
    }
  }

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const projects = await getProjects();
  return projects.find(p => p.slug === slug) || null;
}
