import Link from "next/link";
import { getProjects } from "@/lib/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export async function FeaturedProjects() {
  const projects = await getProjects();
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 px-6 md:px-8 bg-background-muted/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-accent hover:underline font-medium"
          >
            View All Projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
