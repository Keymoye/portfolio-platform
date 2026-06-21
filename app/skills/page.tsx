import type { Metadata } from "next";
import { getSkills } from "@/lib/content/skills";

export const metadata: Metadata = {
  title: "Skills - Portfolio",
  description: "Technical skills and technologies I work with",
  openGraph: {
    title: "Skills - Portfolio",
    description: "Technical skills and technologies I work with",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills - Portfolio",
    description: "Technical skills and technologies I work with",
  },
};

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="flex flex-col">
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Skills
          </h1>
          <div className="grid gap-8">
            {skills.length === 0 ? (
              <p className="text-muted-foreground">No skills listed yet.</p>
            ) : (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className="border border-border rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {skill.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-2">
                    {skill.category}
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-sm ${
                          i < skill.proficiency
                            ? "bg-accent"
                            : "bg-border"
                        }`}
                      />
                    ))}
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
