/**
 * Skip link — keyboard users jump past chrome to main content.
 */
export function SkipToContent({
  href = "#main-content",
  label = "Skip to main content",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      className="bg-primary text-primary-foreground focus-visible:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[var(--uds-z-overlay)] focus:rounded-button focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:shadow-md focus:ring-3 focus:outline-none"
    >
      {label}
    </a>
  );
}
