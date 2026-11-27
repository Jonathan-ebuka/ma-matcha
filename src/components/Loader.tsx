"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { markPageReady } from "@/lib/loader";

/** Full-screen sage cover with a small spinner; slides up once fonts and images are in. */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const loaded = new Promise<void>((res) =>
        document.readyState === "complete" ? res() : window.addEventListener("load", () => res(), { once: true }),
      );
      const minTime = new Promise((res) => setTimeout(res, reduce ? 0 : 700));

      Promise.all([loaded, document.fonts.ready, minTime]).then(() => {
        ScrollTrigger.refresh();
        if (reduce) {
          gsap.set(ref.current, { autoAlpha: 0 });
          markPageReady();
          return;
        }
        gsap
          .timeline()
          .to("[data-spinner]", { autoAlpha: 0, scale: 0.6, duration: 0.3 })
          .to(ref.current, { yPercent: -100, duration: 1, ease: "expo.inOut" })
          .add(markPageReady, "-=0.55")
          .set(ref.current, { display: "none" });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grain fixed inset-0 z-50 bg-sage" aria-hidden="true">
      <svg data-spinner viewBox="0 0 24 24" className="absolute bottom-6 right-6 size-6 animate-spin text-forest md:bottom-8 md:right-8">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="42 60" strokeLinecap="round" />
      </svg>
    </div>
  );
}
