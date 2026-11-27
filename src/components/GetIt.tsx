"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { getIt } from "@/content/site";
import { HandNote } from "@/components/ui";

/** "Don't just crave it" — circles on an arc (ways to get a cup) + a white ribbon. */
export default function GetIt() {
  const root = useRef<HTMLElement>(null);
  const n = getIt.channels.length;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(q("[data-get-title] > span"), { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 100,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(q("[data-get-circle]"), {
          scale: 0,
          duration: 1,
          ease: "back.out(1.6)",
          stagger: { each: 0.07, from: "center" },
          scrollTrigger: { trigger: q("[data-get-row]")[0], start: "top 85%" },
        });
        q("[data-get-circle] > span").forEach((el, i) =>
          gsap.to(el, { y: i % 2 ? 8 : -8, duration: 2 + (i % 3) * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        );
        gsap.from(q("[data-get-ribbon]"), {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: { trigger: q("[data-get-ribbon]")[0], start: "top 95%", end: "bottom 40%", scrub: true },
        });
        gsap.from(q("[data-hand] [data-draw]"), {
          drawSVG: "0%",
          duration: 1,
          scrollTrigger: { trigger: root.current, start: "top 60%" },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="find-us" className="relative overflow-hidden bg-pale pb-[30vw] pt-16 md:pb-[14vw] md:pt-24">
      <HandNote lines={getIt.notes.left} arrow="down-right" className="absolute left-[6%] top-6 text-[6vw] md:left-[10%] md:top-10 md:text-[min(2.1vw,30px)]" />

      <h2 data-get-title className="type-title relative mt-16 px-6 text-center text-[13vw] md:mt-0 md:text-[min(6.6vw,96px)]">
        <span className="block text-forest">{getIt.title}</span>
        <span className="block text-leaf">{getIt.accent}</span>
      </h2>

      {/* arc of circles */}
      <div data-get-row className="relative mx-auto mt-10 flex justify-center md:mt-8">
        <ul className="flex w-max gap-3 md:gap-5">
          {getIt.channels.map((c, i) => {
            const mid = (n - 1) / 2;
            const dist = Math.abs(i - mid);
            const drop = (mid - dist) * 2.6; // deeper towards the middle
            return (
              <li
                key={c}
                data-get-circle
                style={{ marginTop: `calc(${drop} * var(--arc))` }}
                className="[--arc:4vw] md:[--arc:min(1.7vw,24px)]"
              >
                <span className="grid size-[34vw] place-items-center rounded-full bg-white px-4 text-center md:size-[min(14.5vw,210px)]">
                  <span className="type-display text-[7.4vw] text-forest md:text-[min(2.4vw,34px)]">{c}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <HandNote
        lines={getIt.notes.right}
        arrow="up-right"
        className="absolute bottom-[34vw] right-[6%] text-right text-[6vw] md:bottom-[16vw] md:right-[12%] md:text-[min(2.1vw,30px)]"
        arrowClassName="ml-auto"
      />

      <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[30vw] w-full md:h-[19vw]" aria-hidden="true">
        <path
          data-get-ribbon
          d="M-40 60C120 140 420 140 640 80S760 40 720 140 600 300 640 330M820 340C900 230 1100 170 1500 220"
          fill="none"
          stroke="white"
          strokeWidth="30"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  );
}
