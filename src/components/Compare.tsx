"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { compare } from "@/content/site";
import { Smiley } from "@/components/ui";

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-label="Yes">
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Cross() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-label="No">
      <path d="m3.5 3.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Compare() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-compare-card]"), {
          yPercent: 12,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 90%" },
        });
        gsap.from(q("[data-row]"), {
          autoAlpha: 0,
          x: 30,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: q("[data-rows]")[0], start: "top 80%" },
        });
        gsap.from(q("[data-draw]"), {
          drawSVG: "0%",
          duration: 1,
          stagger: 0.06,
          scrollTrigger: { trigger: q("[data-rows]")[0], start: "top 85%" },
        });
        gsap.to(q("[data-compare-img]"), {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative z-10 -mt-[30svh] bg-transparent px-2.5 md:-mt-[24svh]">
      <div data-compare-card className="relative grid overflow-hidden rounded-lg bg-white md:grid-cols-[0.8fr_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto">
          <div data-compare-img className="absolute inset-x-0 -top-[6%] h-[115%]">
            <Image
              src="/slides/intro.webp"
              alt="The three Ma Matcha smoothies side by side"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative px-6 pb-14 pt-16 md:px-[8%] md:pb-20 md:pt-24">
          <Smiley className="absolute left-1/2 top-0 size-16 -translate-x-1/2 -translate-y-1/2 md:left-0 md:top-24 md:-translate-x-1/2" />
          <h2 className="type-title text-[11vw] md:text-[min(3.6vw,52px)]">
            <span className="block text-leaf">{compare.title}</span>
            <span className="block text-forest">{compare.subtitle}</span>
          </h2>

          <div data-rows className="mt-10 max-w-[560px] text-forest">
            <div className="grid grid-cols-[1fr_88px_88px] items-end border-b border-forest/80 pb-2 text-sm text-leaf md:grid-cols-[1fr_110px_110px]">
              <span>The details</span>
              <span className="text-center font-display text-lg text-forest">{compare.columns[0]}</span>
              <span className="text-center leading-tight">{compare.columns[1]}</span>
            </div>
            {compare.rows.map((r) => (
              <div
                key={r}
                data-row
                className="grid grid-cols-[1fr_88px_88px] items-center border-b border-forest/15 py-2 text-[17px] font-medium tracking-tight md:grid-cols-[1fr_110px_110px] md:text-lg"
              >
                <span>{r}</span>
                <span className="mx-auto grid h-8 w-14 place-items-center rounded-md bg-pale">
                  <Check />
                </span>
                <span className="grid place-items-center">
                  <Cross />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
