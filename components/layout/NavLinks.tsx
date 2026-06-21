import Link from "next/link";

interface NavLinksProps {
  activeRoute?: string;
}

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function NavLinks({ activeRoute }: NavLinksProps) {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                activeRoute === item.href ? "text-accent" : "text-foreground"
              }`}
              aria-current={activeRoute === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
