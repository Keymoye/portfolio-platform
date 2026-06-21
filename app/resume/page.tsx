import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume - Portfolio",
  description: "Download my resume to learn more about my experience and qualifications",
  openGraph: {
    title: "Resume - Portfolio",
    description: "Download my resume to learn more about my experience and qualifications",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume - Portfolio",
    description: "Download my resume to learn more about my experience and qualifications",
  },
};

export default function ResumePage() {
  return (
    <div className="flex flex-col">
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Resume
          </h1>
          
          <div className="bg-background-muted border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Download My Resume
            </h2>
            <p className="text-muted-foreground mb-6">
              Download my resume to learn more about my professional experience, 
              technical skills, and career achievements.
            </p>
            
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-accent text-background rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume (PDF)
            </Link>
          </div>

          <div className="bg-background-muted border border-border rounded-lg p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Alternative Contact
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about my resume or would like to discuss 
              opportunities, feel free to reach out through the contact form.
            </p>
            <Link
              href="/contact"
              className="text-accent hover:underline"
            >
              Go to Contact Page →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
