import Link from "next/link";
import { getSkills } from "@/lib/content/skills";

export async function SkillsPreview() {
  const skills = await getSkills();

  if (skills.length === 0) {
    return null;
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Show top 2 skills per category, max 3 categories
  const previewCategories = Object.entries(skillsByCategory)
    .slice(0, 3)
    .map(([category, categorySkills]) => ({
      category,
      skills: categorySkills.slice(0, 2),
    }));

  return (
    <section className="py-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Technical Skills
          </h2>
          <Link
            href="/skills"
            className="text-accent hover:underline font-medium"
          >
            View All Skills →
          </Link>
        </div>
        <div className="grid gap-6">
          {previewCategories.map(({ category, skills: categorySkills }) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-background-muted text-foreground text-sm rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
