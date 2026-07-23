"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { PortfolioPreviewItem } from "./data";
import { PortfolioCard } from "./portfolio-card";

type PortfolioCarouselProps = {
  projects: readonly PortfolioPreviewItem[];
  className?: string;
};

/**
 * Full-bleed horizontal snap carousel — first card aligns with page gutters,
 * trailing cards peek past the right edge. Prev/next sit bottom-left.
 */
export function PortfolioCarousel({
  projects,
  className,
}: PortfolioCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();

    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => updateScrollState());
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, [updateScrollState, projects.length]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>("[data-portfolio-slide]");
    const gap = 20;
    const amount = (card?.offsetWidth ?? 360) + gap;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn(
          "flex gap-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-1",
          "snap-x snap-mandatory outline-none",
          "pl-[var(--uds-grid-margin)] lg:pl-[max(var(--uds-grid-margin-lg),calc((100vw-var(--uds-container-max))/2+var(--uds-grid-margin-lg)))]",
          "pr-[var(--uds-grid-margin)] lg:pr-[var(--uds-grid-margin-lg)]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-4",
        )}
      >
        {projects.map((project, index) => (
          <PortfolioCard
            key={project.id}
            project={project}
            priority={index === 0}
          />
        ))}
      </div>

      <div
        className={cn(
          "mt-8 flex items-center gap-2 sm:mt-10",
          "px-[var(--uds-grid-margin)] lg:px-[max(var(--uds-grid-margin-lg),calc((100vw-var(--uds-container-max))/2+var(--uds-grid-margin-lg)))]",
        )}
      >
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Previous projects"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
          className="size-10 rounded-xl disabled:opacity-35"
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Next projects"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
          className="size-10 rounded-xl disabled:opacity-35"
        >
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
