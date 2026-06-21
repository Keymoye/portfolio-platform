import type { Metadata } from "next";
import { Suspense } from "react";
import { getProjects } from "@/lib/content/projects";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";

export const revalidate = 3600;
// ⚠ DO NOT REMOVE — ISR required for content freshness; see AI_CONTEXT §2

export const metadata: Metadata = {
  title: "Projects - Portfolio",
  description: "Portfolio projects showcasing software engineering work",
  openGraph: {
    title: "Projects - Portfolio",
    description: "Portfolio projects showcasing software engineering work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Portfolio",
    description: "Portfolio projects showcasing software engineering work",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <ProjectsPageClient projects={projects} />
    </Suspense>
  );
}
