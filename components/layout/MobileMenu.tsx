"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeRoute?: string;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ isOpen, onClose, activeRoute }: MobileMenuProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-0 top-0 bottom-0 w-80 bg-background border-r border-border p-6 z-50 focus:outline-none">
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Mobile navigation menu with links to all pages
          </Dialog.Description>
          
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`text-lg font-medium transition-colors hover:text-accent block py-2 ${
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

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
