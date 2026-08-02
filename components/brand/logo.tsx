import Image from "next/image";
import Link from "next/link";

import { BRAND, SITE } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

type BrandLogoVariant = "wordmark" | "icon" | "responsive";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  href?: string | null;
  className?: string;
  priority?: boolean;
};

/**
 * Official Univo brand mark — wordmark (full logo) or icon.
 */
export function BrandLogo({
  variant = "wordmark",
  href = ROUTES.home,
  className,
  priority = false,
}: BrandLogoProps) {
  const label = `${SITE.name} home`;

  const mark = (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      {(variant === "wordmark" || variant === "responsive") && (
        <Image
          src={BRAND.logo}
          alt={SITE.name}
          width={BRAND.logoWidth}
          height={BRAND.logoHeight}
          priority={priority}
          className={cn(
            "h-7 w-auto md:h-8 dark:brightness-0 dark:invert",
            variant === "responsive" && "hidden sm:block",
          )}
        />
      )}
      {(variant === "icon" || variant === "responsive") && (
        <Image
          src={BRAND.icon}
          alt={SITE.name}
          width={BRAND.iconWidth}
          height={BRAND.iconHeight}
          priority={priority}
          className={cn(
            "h-8 w-auto dark:brightness-0 dark:invert",
            variant === "responsive" && "sm:hidden",
          )}
        />
      )}
    </span>
  );

  if (href === null) {
    return mark;
  }

  return (
    <Link href={href} aria-label={label} className="inline-flex shrink-0">
      {mark}
    </Link>
  );
}
