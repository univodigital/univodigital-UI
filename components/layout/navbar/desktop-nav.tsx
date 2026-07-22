"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

import { isNavActive, NavLink } from "./nav-link";

type DesktopNavProps = {
  items: NavItem[];
};

/**
 * Desktop navigation with keyboard-accessible Services dropdown.
 */
export function DesktopNav({ items }: DesktopNavProps) {
  return (
    <ul className="hidden items-center gap-1 lg:flex" role="list">
      {items.map((item) =>
        item.children?.length ? (
          <li key={item.href}>
            <NavDropdown item={item} />
          </li>
        ) : (
          <li key={item.href}>
            <NavLink href={item.href} external={item.external}>
              {item.label}
            </NavLink>
          </li>
        ),
      )}
    </ul>
  );
}

function NavDropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const children = item.children ?? [];
  const active =
    isNavActive(pathname, item.href) ||
    children.some((child) => isNavActive(pathname, child.href));

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function onButtonKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        const first = containerRef.current?.querySelector<HTMLElement>(
          "[data-nav-dropdown-item]",
        );
        first?.focus();
      });
    }
  }

  function onMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(
        "[data-nav-dropdown-item]",
      ) ?? [],
    );
    const index = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    }

    if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }

    if (event.key === "Tab") {
      setOpen(false);
    }
  }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: duration.fast, ease: easing.standard };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
          active
            ? "text-text-primary"
            : "text-text-secondary hover:text-text-primary",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
      >
        {item.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={transition}
          className="inline-flex"
        >
          <ChevronDownIcon className="size-4 opacity-70" aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={item.label}
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: -6, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: -4, scale: 0.98 }
            }
            transition={transition}
            className="absolute top-full left-0 z-[var(--uds-z-dropdown)] min-w-56 pt-2"
            onKeyDown={onMenuKeyDown}
          >
            <div className="rounded-xl border border-border bg-popover p-1.5 shadow-dropdown ring-1 ring-foreground/5">
              <Link
                href={item.href}
                role="menuitem"
                data-nav-dropdown-item
                className="block rounded-lg px-3 py-2 text-sm font-medium text-text-primary outline-none transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                onClick={() => setOpen(false)}
              >
                All {item.label}
              </Link>
              <div className="my-1 h-px bg-border" role="separator" />
              {children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  role="menuitem"
                  data-nav-dropdown-item
                  aria-current={
                    isNavActive(pathname, child.href) ? "page" : undefined
                  }
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm outline-none transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
                    isNavActive(pathname, child.href)
                      ? "font-medium text-text-primary"
                      : "text-text-secondary",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
