import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Portfolio",
  description: "Learn about my background, experience, and career goals",
  openGraph: {
    title: "About - Portfolio",
    description: "Learn about my background, experience, and career goals",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            About Me
          </h1>
          <div className="prose prose-lg text-foreground">
            <p className="text-muted-foreground mb-6">
              I am a software engineer passionate about building production-quality applications with modern web technologies.
            </p>
            <p className="text-muted-foreground mb-6">
              My focus is on creating performant, accessible, and maintainable software that solves real problems.
            </p>
            <p className="text-muted-foreground">
              I am constantly learning and exploring new technologies to improve my craft and deliver better solutions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
