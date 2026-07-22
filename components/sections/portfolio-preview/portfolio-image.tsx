"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PortfolioImageProps = {
  src: string;
  alt: string;
  categoryLabel: string;
  className?: string;
  priority?: boolean;
};

/**
 * Portfolio cover with category badge and hover zoom.
 */
export function PortfolioImage({
  src,
  alt,
  categoryLabel,
  className,
  priority = false,
}: PortfolioImageProps) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden bg-muted",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-[var(--uds-duration-slow)] ease-[var(--uds-ease-standard)] motion-reduce:transition-none group-hover/project:scale-105 group-focus-within/project:scale-105"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-90"
      />

      <div className="absolute top-4 left-4 z-10">
        <Badge
          variant="secondary"
          size="lg"
          className="border border-border/60 bg-background/90 text-text-primary shadow-xs backdrop-blur-sm"
        >
          {categoryLabel}
        </Badge>
      </div>
    </div>
  );
}
