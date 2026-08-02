"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ZoomInIcon } from "lucide-react";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { StaggerContainer } from "@/animations";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioGalleryItem, PortfolioProject } from "@/data/portfolio-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { getBrandLogoPresentation } from "@/lib/portfolio-image";
import { cn } from "@/lib/utils";
import { cardSurfaceClassName } from "@/components/ui/card";

type ProjectGalleryProps = {
  project: PortfolioProject;
  className?: string;
};

const layoutClasses: Record<
  NonNullable<PortfolioGalleryItem["layout"]>,
  string
> = {
  default: "",
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
};

const aspectClasses: Record<
  NonNullable<PortfolioGalleryItem["layout"]>,
  string
> = {
  default: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  tall: "aspect-[3/4] sm:aspect-auto sm:h-full sm:min-h-[20rem]",
};

/**
 * Project gallery — masonry grid with hover zoom and lightbox.
 */
export function ProjectGallery({ project, className }: ProjectGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeItem, setActiveItem] = useState<PortfolioGalleryItem | null>(
    null,
  );
  const activeLogoPresentation = activeItem
    ? getBrandLogoPresentation(activeItem.src)
    : null;

  return (
    <>
      <Section
        id="gallery"
        spacing="lg"
        tone="default"
        aria-labelledby="gallery-heading"
        className={cn("relative overflow-hidden", className)}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 100%, color-mix(in oklab, var(--uds-color-accent) 8%, transparent), transparent 70%)",
          }}
        />

        <Container size="max">
          <motion.p
            className="text-caption font-medium tracking-wide text-accent uppercase"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
            }}
          >
            Gallery
          </motion.p>

          <motion.h2
            id="gallery-heading"
            className="font-heading mt-3 text-h2 text-balance text-text-primary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.slow,
              ease: easing.emphasized,
              delay: prefersReducedMotion ? 0 : 0.05,
            }}
          >
            {project.galleryHeading ?? "Visual highlights"}
          </motion.h2>

          <StaggerContainer
            className="mt-10 grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6"
            once
          >
            {project.gallery.map((item, index) => {
              const layout = item.layout ?? "default";
              const logoPresentation = getBrandLogoPresentation(item.src);

              return (
                <motion.figure
                  key={`${item.src}-${item.label ?? index}`}
                  className={cn(
                    cardSurfaceClassName("media"),
                    "group/gallery relative",
                    layoutClasses[layout],
                  )}
                  variants={
                    prefersReducedMotion ? reducedMotionVariant : fadeUp
                  }
                >
                  <button
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className={cn(
                      "relative block w-full cursor-zoom-in overflow-hidden outline-none",
                      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset",
                      aspectClasses[layout],
                      logoPresentation.surfaceClassName,
                    )}
                    aria-label={
                      item.label
                        ? `View full image: ${item.label}`
                        : `View full image ${index + 1}`
                    }
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      loading="lazy"
                      sizes={
                        layout === "wide"
                          ? "(max-width: 1024px) 100vw, 66vw"
                          : "(max-width: 1024px) 50vw, 33vw"
                      }
                      className={cn(
                        "object-top transition-transform duration-[var(--uds-duration-slow)] ease-[var(--uds-ease-standard)] motion-reduce:transition-none group-hover/gallery:scale-[1.04]",
                        logoPresentation.imageClassName,
                      )}
                    />

                    <span
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0",
                        "transition-opacity duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                        "group-hover/gallery:opacity-100 group-focus-visible/gallery:opacity-100",
                      )}
                      aria-hidden
                    />

                    <span
                      className={cn(
                        "absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-full",
                        "border border-border/40 bg-primary/80 text-text-inverse opacity-0 backdrop-blur-sm",
                        "transition-opacity duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                        "group-hover/gallery:opacity-100 group-focus-visible/gallery:opacity-100",
                      )}
                      aria-hidden
                    >
                      <ZoomInIcon className="size-4" />
                    </span>

                    {item.label ? (
                      <figcaption
                        className={cn(
                          "absolute bottom-0 left-0 px-4 pb-4 text-sm font-medium text-text-inverse",
                          "translate-y-1 opacity-0 transition-[transform,opacity] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                          "group-hover/gallery:translate-y-0 group-hover/gallery:opacity-100",
                          "group-focus-visible/gallery:translate-y-0 group-focus-visible/gallery:opacity-100",
                        )}
                      >
                        {item.label}
                      </figcaption>
                    ) : null}
                  </button>
                </motion.figure>
              );
            })}
          </StaggerContainer>
        </Container>
      </Section>

      <Dialog
        open={activeItem !== null}
        onOpenChange={(open) => {
          if (!open) setActiveItem(null);
        }}
      >
        <DialogContent
          className={cn(cardSurfaceClassName("solid"), "max-w-5xl p-2 sm:p-3")}
          showCloseButton
        >
          <DialogTitle className="sr-only">
            {activeItem?.label ?? "Project image"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Full-size preview of {activeItem?.alt}
          </DialogDescription>
          {activeItem && activeLogoPresentation ? (
            <div
              className={cn(
                "relative aspect-[16/10] w-full overflow-hidden rounded-lg",
                activeLogoPresentation.isLogo
                  ? activeLogoPresentation.surfaceClassName
                  : undefined,
              )}
            >
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1024px"
                className={
                  activeLogoPresentation.isLogo
                    ? activeLogoPresentation.imageClassName
                    : "object-contain"
                }
                priority
              />
            </div>
          ) : null}
          {activeItem?.label ? (
            <p className="px-1 pt-2 text-center text-sm text-text-secondary">
              {activeItem.label}
            </p>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
