import type { Metadata } from "next";
import { getProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects - Portfolio",
  description: "Portfolio projects showcasing software engineering work",
  openGraph: {
    title: "Projects - Portfolio",
    description: "Portfolio projects showcasing software engineering work",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col">
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Projects
          </h1>
          <div className="grid gap-6">
            {projects.length === 0 ? (
              <p className="text-muted-foreground">No projects listed yet.</p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-border rounded-lg p-6 hover:border-accent transition-colors"
                >
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
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
                        className="text-accent hover:underline"
                      >
                        Repository
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
