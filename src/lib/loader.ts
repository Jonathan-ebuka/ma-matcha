"use client";

/**
 * Resolves once the intro loader has finished sliding away, so sections can
 * start their entrance animations at the right moment.
 */
let resolveLoaded: () => void = () => {};
export const pageReady: Promise<void> =
  typeof window === "undefined"
    ? new Promise(() => {})
    : new Promise((res) => {
        resolveLoaded = res;
      });

export function markPageReady() {
  resolveLoaded();
}
