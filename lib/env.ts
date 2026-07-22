/**
 * Validated public environment variables.
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get apiBaseUrl() {
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  },
  get siteUrl() {
    return (
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.NEXT_PUBLIC_APP_URL ??
      "https://univodigital.com"
    );
  },
  get isDev() {
    return process.env.NODE_ENV === "development";
  },
  get isProd() {
    return process.env.NODE_ENV === "production";
  },
  /** Use when a call absolutely requires the API base URL */
  requireApiBaseUrl() {
    return required(
      "NEXT_PUBLIC_API_BASE_URL",
      process.env.NEXT_PUBLIC_API_BASE_URL,
    );
  },
} as const;
