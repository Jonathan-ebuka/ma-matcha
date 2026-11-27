"use client";

import { useId, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Thick forest-green band on a sweeping arc with text running along it,
 * separating the sage hero from the pale page below.
 */
export default function ArcBand({ text }: { text: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");
  const unit = `${text} · `.toUpperCase();
  const REPEAT = 8;

  useGSAP(
    () => {
      const tp = ref.current!.querySelector("textPath")!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const len = tp.getComputedTextLength() / REPEAT;
        const loop = gsap.fromTo(
          tp,
          { attr: { startOffset: 0 } },
          { attr: { startOffset: -len }, duration: 16, ease: "none", repeat: -1 },
        );
        // speed up a little while the page scrolls
        const st = gsap.to(loop, {
          timeScale: 2.4,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        return () => {
          loop.kill();
          st.scrollTrigger?.kill();
          st.kill();
        };
      });
    },
    { scope: ref },
  );

  const curve = "M -120 470 C 300 120, 900 40, 1560 250";

  return (
    <div className="relative -mt-[30vw] w-full overflow-hidden md:-mt-[13vw]" aria-hidden="true">
      <svg
        ref={ref}
        viewBox="0 0 1440 560"
        className="relative -left-[45vw] block w-[190vw] max-w-none md:left-0 md:w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={`${curve} L 1560 560 L -120 560 Z`} fill="var(--color-pale)" />
        <path id={id} d={curve} fill="none" stroke="var(--color-forest)" strokeWidth="112" />
        <text
          fill="var(--color-cream)"
          fontSize="82"
          fontWeight="600"
          letterSpacing="-1"
          dominantBaseline="central"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          <textPath href={`#${id}`} startOffset="0">
            {unit.repeat(REPEAT)}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
