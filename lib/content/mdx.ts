import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { projectSchema, type ProjectData } from './schemas';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects');
const ABOUT_FILE = path.join(process.cwd(), 'content', 'about.md');

export interface MDXProjectData extends ProjectData {
  content: string;
}

export async function loadProjectMDX(slug: string): Promise<MDXProjectData | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const source = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(source);

    // Validate frontmatter against Zod schema
    const validatedFrontmatter = projectSchema.parse(data);

    return {
      ...validatedFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error loading project MDX for slug "${slug}":`, error);
    return null;
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR);
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

export async function getAboutContent(): Promise<string | null> {
  try {
    if (!fs.existsSync(ABOUT_FILE)) {
      return null;
    }

    const content = fs.readFileSync(ABOUT_FILE, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error loading about content:', error);
    return null;
  }
}
