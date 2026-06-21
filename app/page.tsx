import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SkillsPreview } from "@/components/sections/SkillsPreview";

export const metadata: Metadata = {
  title: "Portfolio - Software Engineer",
  description: "Professional portfolio showcasing software engineering projects and skills",
  openGraph: {
    title: "Portfolio - Software Engineer",
    description: "Professional portfolio showcasing software engineering projects and skills",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProjects />
      <SkillsPreview />
    </div>
  );
}
