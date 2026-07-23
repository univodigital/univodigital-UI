"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";

import { BrandLogo } from "@/components/brand";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { MAIN_NAV } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrolled } from "@/hooks/use-scrolled";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

import { DesktopNav } from "./desktop-nav";
import { HamburgerButton } from "./hamburger-button";
import { MobileNav } from "./mobile-nav";

type NavbarProps = {
  items?: NavItem[];
  className?: string;
};

/**
 * Sticky site navbar.
 * Transparent over the hero; blurred surface after scroll (Motion System).
 */
export function Navbar({ items = MAIN_NAV, className }: NavbarProps) {
  const scrolled = useScrolled(16);
  const prefersReducedMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavId = useId();

  const surfaceActive = scrolled || mobileOpen;

  return (
    <>
      <motion.header
        className={cn(
          "sticky top-0 w-full transition-[backdrop-filter] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
          surfaceActive && "backdrop-blur-md supports-[backdrop-filter]:bg-background/80",
          mobileOpen
            ? "z-[calc(var(--uds-z-overlay)+1)]"
            : "z-[var(--uds-z-sticky)]",
          className,
        )}
        style={
          {
            "--navbar-height": "4.5rem",
          } as CSSProperties
        }
        initial={false}
        animate={{
          backgroundColor: surfaceActive
            ? "color-mix(in oklab, var(--uds-color-background) 80%, transparent)"
            : "transparent",
          boxShadow: surfaceActive
            ? "var(--uds-shadow-xs)"
            : "0 0 0 transparent",
        }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: duration.normal, ease: easing.standard }
        }
      >
        <div
          className={cn(
            "border-b",
            surfaceActive ? "border-border/80" : "border-transparent",
          )}
        >
          <Container
            size="max"
            className="flex h-[var(--navbar-height)] items-center justify-between gap-4"
          >
            <BrandLogo variant="responsive" priority />

            <nav
              aria-label="Primary"
              className="flex flex-1 items-center justify-end gap-2 lg:justify-between lg:pl-8"
            >
              <DesktopNav items={items} />

              <div className="flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  <Link href={ROUTES.contact}>Get a consultation</Link>
                </Button>

                <HamburgerButton
                  open={mobileOpen}
                  onToggle={() => setMobileOpen((value) => !value)}
                  controlsId={mobileNavId}
                />
              </div>
            </nav>
          </Container>
        </div>
      </motion.header>

      <MobileNav
        id={mobileNavId}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={items}
      />
    </>
  );
}
