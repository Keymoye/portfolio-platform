import Link from "next/link";

export function Hero() {
  return (
    <section className="py-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Software Engineer
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Building production-quality software with modern web technologies
        </p>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-accent text-background rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            View Projects
          </Link>
          <Link
            href="/resume"
            className="px-6 py-3 border border-border rounded-md font-medium hover:bg-accent hover:text-background transition-colors"
          >
            Download Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
