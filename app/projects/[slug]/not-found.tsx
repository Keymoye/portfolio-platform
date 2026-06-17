import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Project not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/projects"
            className="px-6 py-3 bg-accent text-background rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            View all projects
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-border rounded-md font-medium hover:bg-accent hover:text-background transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
