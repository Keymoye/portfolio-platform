import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Page not found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-accent text-background rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Go home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 border border-border rounded-md font-medium hover:bg-accent hover:text-background transition-colors"
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
}
