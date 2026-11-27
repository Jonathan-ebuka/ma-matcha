"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { takeHome } from "@/content/site";
import { HandNote } from "@/components/ui";

/** Two big cards: the bottled juices and the take-home matcha powder. */
export default function TakeHome() {
  const root = useRef<HTMLElement>(null);
  const { juices, powder } = takeHome;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-take-card]"), {
          y: 80,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
        gsap.fromTo(
          q("[data-juices]"),
          { yPercent: 18, rotation: -3 },
          { yPercent: -6, rotation: 2, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.fromTo(
          q("[data-powder]"),
          { scale: 1.18, yPercent: -4 },
          { scale: 1.04, yPercent: 4, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.from(q("[data-take-head] > *"), {
          yPercent: 60,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-pale px-2.5 pb-10 pt-6">
      <div className="grid gap-2.5 md:grid-cols-2">
        {/* Juices */}
        <article
          data-take-card
          className="grain relative flex min-h-[600px] flex-col items-center overflow-hidden rounded-lg bg-[radial-gradient(120%_80%_at_50%_15%,#6b7536_0%,#4a5424_55%,#353d18_100%)] px-6 pt-14 text-center text-cream md:min-h-[min(56vw,760px)] md:pt-[min(5vw,72px)]"
        >
          <div data-take-head className="relative z-10">
            <h2 className="font-display text-[15vw] leading-[0.9] md:text-[min(6vw,88px)]">{juices.title}</h2>
            <p className="mt-3 text-[5.4vw] font-medium uppercase tracking-tight md:text-[min(1.9vw,28px)]">{juices.line}</p>
            <p className="mt-2 font-display text-[4vw] opacity-90 md:text-[min(1.2vw,17px)]">{juices.small}</p>
          </div>
          <div data-juices className="relative z-10 mt-auto w-[118%] max-w-none translate-y-[6%] md:w-[104%]">
            <Image
              src={juices.image.src}
              alt="Four bottles of Ma Matcha fresh-pressed juice"
              width={juices.image.width}
              height={juices.image.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full drop-shadow-[0_40px_40px_rgba(0,0,0,0.35)]"
            />
          </div>
        </article>

        {/* Powder */}
        <article data-take-card className="relative flex min-h-[600px] flex-col overflow-hidden rounded-lg bg-[#d9d8d2] md:min-h-[min(56vw,760px)]">
          <div data-powder className="absolute inset-0">
            <Image src={powder.image.src} alt="Mamatcha ceremonial matcha powder pouch in a mound of matcha" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-bottom" />
          </div>
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#e4e3de] via-[#e4e3de]/70 to-transparent" aria-hidden="true" />
          <div data-take-head className="relative z-10 px-6 pt-14 text-center text-forest-deep md:pt-[min(5vw,72px)]">
            <h2 className="type-display mx-auto max-w-[16ch] text-[11vw] md:text-[min(4.6vw,66px)]">{powder.title}</h2>
            <p className="mt-3 text-[4.6vw] font-medium tracking-tight md:text-[min(1.5vw,22px)]">{powder.line}</p>
            <HandNote lines={[powder.small]} className="mt-1 text-[6vw] md:text-[min(2vw,28px)]" />
          </div>
        </article>
      </div>
    </section>
  );
}
