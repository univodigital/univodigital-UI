"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

import { isNavActive } from "./nav-link";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  id: string;
};

/**
 * Full-screen mobile navigation drawer with focus management.
 */
export function MobileNav({ open, onClose, items, id }: MobileNavProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusable = panel?.querySelector<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    focusable?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const nodes = Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );

      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open]);

  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    onCloseRef.current();
  }, [pathname]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: duration.normal, ease: easing.emphasized };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-x-0 top-[var(--navbar-height,4.5rem)] bottom-0 z-[var(--uds-z-overlay)] flex flex-col bg-background/95 backdrop-blur-md lg:hidden"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={transition}
        >
          <div className="flex flex-1 flex-col overflow-y-auto px-[var(--uds-grid-margin)] py-6 pb-8">
            <p id={titleId} className="sr-only">
              Site navigation
            </p>

            <motion.ul
              className="flex flex-col gap-1"
              role="list"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: prefersReducedMotion
                      ? 0
                      : motionTokens.stagger,
                  },
                },
              }}
            >
              {items.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: duration.normal,
                        ease: easing.standard,
                      },
                    },
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-lg font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                      isNavActive(pathname, item.href)
                        ? "bg-muted text-text-primary"
                        : "text-text-primary hover:bg-muted/70",
                    )}
                    aria-current={
                      isNavActive(pathname, item.href) ? "page" : undefined
                    }
                    onClick={() => onCloseRef.current()}
                  >
                    {item.label}
                  </Link>

                  {item.children?.length ? (
                    <ul className="mt-1 mb-2 ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                              isNavActive(pathname, child.href)
                                ? "font-medium text-text-primary"
                                : "text-text-secondary hover:text-text-primary",
                            )}
                            aria-current={
                              isNavActive(pathname, child.href)
                                ? "page"
                                : undefined
                            }
                            onClick={() => onCloseRef.current()}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-auto pt-8">
              <Button asChild size="lg" className="w-full">
                <Link
                  href={ROUTES.contact}
                  onClick={() => onCloseRef.current()}
                >
                  Get a consultation
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
