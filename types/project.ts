export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;         // Short — for ProjectCard
  techStack: string[];
  links: {
    repo?: string;
    live?: string;
  };
  images?: string[];
  createdAt: string;           // ISO 8601
  featured?: boolean;          // Controls FeaturedProjects section
  caseStudy?: {
    problem: string;
    solution: string;
    architecture: string;
    challenges: string;
    outcomes: string;
  };
}
