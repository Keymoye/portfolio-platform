import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/content/projects";

// Required by architecture to prevent ISR regression and ensure static generation.
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Project pages use ISR with 1-hour revalidation per architecture requirements.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-background-muted text-foreground-muted text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mb-8">
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent text-background rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                View Repository
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border rounded-md font-medium hover:bg-accent hover:text-background transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
          {project.caseStudy && (
            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Case Study
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Problem
                  </h3>
                  <p className="text-muted-foreground">{project.caseStudy.problem}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Solution
                  </h3>
                  <p className="text-muted-foreground">{project.caseStudy.solution}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Architecture
                  </h3>
                  <p className="text-muted-foreground">{project.caseStudy.architecture}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Challenges
                  </h3>
                  <p className="text-muted-foreground">{project.caseStudy.challenges}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Outcomes
                  </h3>
                  <p className="text-muted-foreground">{project.caseStudy.outcomes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
