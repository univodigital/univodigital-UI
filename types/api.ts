import type { ApiErrorBody, ApiSuccess, Paginated } from "./common";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiResponse<T> = ApiSuccess<T>;

export type ApiListResponse<T> = ApiSuccess<Paginated<T>>;

export type { ApiErrorBody, ApiSuccess, Paginated };

export type RequestConfig = {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: unknown;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  signal?: AbortSignal;
};

export type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};
