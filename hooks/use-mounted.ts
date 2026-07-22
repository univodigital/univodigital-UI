"use client";

import { useEffect, useState } from "react";

/**
 * True after the component has mounted on the client.
 * Useful for avoiding hydration mismatches.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
