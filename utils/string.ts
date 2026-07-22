/**
 * String helpers.
 */

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(value: string, maxLength: number, suffix = "…"): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - suffix.length)).trimEnd()}${suffix}`;
}

export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
