import { API_DEFAULTS } from "@/constants/api";
import type { ApiErrorBody, RequestConfig } from "@/types";

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly errors?: Record<string, string[]>;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message || "Request failed");
    this.name = "ApiError";
    this.status = status;
    this.code = body.code;
    this.errors = body.errors;
  }
}

function getBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Configure it in your environment.",
    );
  }
  return base.replace(/\/$/, "");
}

function buildUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Centralized fetch client for the Spring Boot REST API.
 * Server Components first — call from services, not from UI.
 */
export async function apiClient<T>(
  path: string,
  config: RequestConfig = {},
): Promise<T> {
  const {
    method = "GET",
    headers,
    body,
    cache,
    next,
    signal,
  } = config;

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    API_DEFAULTS.timeoutMs,
  );

  try {
    const response = await fetch(buildUrl(path), {
      method,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache,
      next,
      signal: signal ?? controller.signal,
    });

    if (!response.ok) {
      let errorBody: ApiErrorBody = {
        message: response.statusText || "Request failed",
      };

      try {
        errorBody = (await response.json()) as ApiErrorBody;
      } catch {
        // keep default message
      }

      throw new ApiError(response.status, errorBody);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
