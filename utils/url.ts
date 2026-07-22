import { SITE } from "@/constants/site";

/**
 * URL helpers.
 */

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url.replace(/\/$/, "")}${normalized}`;
}

export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
