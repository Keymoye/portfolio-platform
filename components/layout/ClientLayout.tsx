"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SkipLink } from "./SkipLink";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  useEffect(() => {
    const h1 = document.querySelector("h1");
    if (h1) {
      h1.setAttribute("tabindex", "-1");
      h1.focus();
    }
  }, [pathname]);

  return (
    <>
      <SkipLink />
      {children}
    </>
  );
}
