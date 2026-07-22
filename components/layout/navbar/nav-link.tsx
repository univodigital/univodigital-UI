"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
  external?: boolean;
};

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Accessible text nav link with active state.
 */
export function NavLink({
  href,
  children,
  className,
  onNavigate,
  external,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isNavActive(pathname, href);

  const classes = cn(
    "rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
    active
      ? "text-text-primary"
      : "text-text-secondary hover:text-text-primary",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}
