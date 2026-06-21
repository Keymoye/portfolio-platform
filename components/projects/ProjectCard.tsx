import Link from "next/link";
import type { ProjectData } from "@/lib/content/schemas";

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article data-testid="project-card" className="border border-border rounded-lg p-6 hover:border-accent transition-colors">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-accent transition-colors"
          >
            {project.title}
          </Link>
        </h2>
        {project.featured && (
          <span className="px-2 py-1 bg-accent text-background text-xs font-medium rounded-full">
            Featured
          </span>
        )}
      </div>
      <p className="text-muted-foreground mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-background-muted text-foreground-muted text-sm rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline text-sm"
          >
            Repository
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline text-sm"
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
