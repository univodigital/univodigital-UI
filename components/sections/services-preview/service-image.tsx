"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ServiceImageProps = {
  src?: string;
  alt: string;
  icon: LucideIcon;
  className?: string;
};

/**
 * Service cover image with zoom-ready wrapper and icon fallback.
 */
export function ServiceImage({
  src,
  alt,
  icon: Icon,
  className,
}: ServiceImageProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden bg-muted",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[var(--uds-duration-slow)] ease-[var(--uds-ease-standard)] motion-reduce:transition-none group-hover/service:scale-105 group-focus-within/service:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Icon className="size-6" strokeWidth={1.75} aria-hidden />
          </span>
        </div>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-80"
      />
    </div>
  );
}
