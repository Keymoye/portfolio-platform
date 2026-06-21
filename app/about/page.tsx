import type { Metadata } from "next";
import { getAboutContent } from "@/lib/content/mdx";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "About - Portfolio",
  description: "Learn about my background, experience, and career goals",
  openGraph: {
    title: "About - Portfolio",
    description: "Learn about my background, experience, and career goals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Portfolio",
    description: "Learn about my background, experience, and career goals",
  },
};

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <div className="flex flex-col">
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            About Me
          </h1>
          <div className="prose prose-lg text-foreground">
            {content ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">
                About content not available.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
