/** Shared primitive / utility types */

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export type ID = string;

export type ISODateString = string;

export type Paginated<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type ApiSuccess<T> = {
  data: T;
  message?: string;
};

export type ApiErrorBody = {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
};

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export type SortOrder = "asc" | "desc";
