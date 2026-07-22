"use client";

import { useState } from "react";
import type { AsyncStatus } from "@/types";

type UseAsyncStateResult<T> = {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  run: (promise: Promise<T>) => Promise<T | null>;
  reset: () => void;
};

/**
 * Lightweight async state helper for client-side mutations (forms).
 */
export function useAsyncState<T = unknown>(): UseAsyncStateResult<T> {
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  function reset() {
    setStatus("idle");
    setData(null);
    setError(null);
  }

  async function run(promise: Promise<T>) {
    setStatus("loading");
    setError(null);

    try {
      const result = await promise;
      setData(result);
      setStatus("success");
      return result;
    } catch (err) {
      const nextError =
        err instanceof Error ? err : new Error("Unexpected error");
      setError(nextError);
      setStatus("error");
      return null;
    }
  }

  return {
    status,
    data,
    error,
    isLoading: status === "loading",
    run,
    reset,
  };
}
