"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query. SSR-safe (starts as false).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };

    onChange(media);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
