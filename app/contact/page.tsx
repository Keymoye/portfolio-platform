import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Portfolio",
  description: "Get in touch with me via the contact form",
  openGraph: {
    title: "Contact - Portfolio",
    description: "Get in touch with me via the contact form",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Portfolio",
    description: "Get in touch with me via the contact form",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Contact
          </h1>
          
          <div className="mb-12">
            <p className="text-xl text-muted-foreground mb-4">
              Have a question or want to work together? Send me a message and I&apos;ll get back to you soon.
            </p>
          </div>

          <div className="bg-background-muted border border-border rounded-lg p-8">
            <ContactForm />
          </div>

          <div className="mt-8 bg-background-muted border border-border rounded-lg p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Other Ways to Connect
            </h2>
            <p className="text-muted-foreground mb-4">
              You can also find me on professional networks or check out my projects and skills.
            </p>
            <div className="flex gap-4">
              <Link
                href="/projects"
                className="text-accent hover:underline"
              >
                View Projects →
              </Link>
              <Link
                href="/skills"
                className="text-accent hover:underline"
              >
                View Skills →
              </Link>
              <Link
                href="/resume"
                className="text-accent hover:underline"
              >
                Download Resume →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
