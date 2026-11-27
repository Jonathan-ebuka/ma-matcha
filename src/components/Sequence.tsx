"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { features, lineup } from "@/content/site";
import { HandNote, Smiley } from "@/components/ui";

/**
 * Long scroll-scrubbed story, like the reference's product sequence:
 * a cup swings from side to side while feature cards take turns appearing,
 * a white ribbon draws itself across the screen, and it all ends in the
 * three-cup line-up with fruit flying in.
 */

const fruit = [
  { src: "/fruit/strawberry.webp", w: 470, h: 373, cls: "left-[4%] top-[58%] w-[16vw] md:left-[9%] md:top-[56%] md:w-[min(9vw,130px)]", from: [-60, 40, -50] },
  { src: "/fruit/blueberry.webp", w: 259, h: 198, cls: "left-[20%] top-[86%] w-[9vw] md:left-[24%] md:top-[80%] md:w-[min(4.6vw,66px)]", from: [-40, 60, 90] },
  { src: "/fruit/strawberry.webp", w: 470, h: 373, cls: "right-[2%] top-[48%] w-[22vw] -scale-x-100 md:right-[4%] md:top-[50%] md:w-[min(12vw,170px)]", from: [70, -20, 60] },
  { src: "/fruit/blueberry.webp", w: 259, h: 198, cls: "right-[22%] top-[40%] w-[8vw] md:right-[25%] md:top-[44%] md:w-[min(4vw,58px)]", from: [50, -60, -80] },
];

export default function Sequence() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ desk: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
        const { desk } = ctx.conditions as { desk: boolean };
        const swing = desk ? 23 : 14; // vw the cup travels left/right
        const title = SplitText.create(q("[data-seq-title] > span"), { type: "lines", mask: "lines" });
        const cards = q("[data-seq-card]");
        const cup = q("[data-seq-cup]")[0];

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
        });

        const step = 2.2;
        const total = 1 + cards.length * step + 2.6;

        tl.fromTo(q("[data-seq-ribbon]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: total - 1.6, ease: "none" }, 0)
          .from(cup, { yPercent: -170, rotation: -40, duration: 1.1, ease: "power3.out" }, 0);

        cards.forEach((card, i) => {
          const side = i % 2 === 0 ? 1 : -1; // +1 = card on the right
          const at = 0.8 + i * step;
          tl.fromTo(
            card,
            { xPercent: side * (desk ? 70 : 0), yPercent: desk ? 0 : 40, rotation: side * 10, autoAlpha: 0 },
            { xPercent: 0, yPercent: 0, rotation: side * -2.5, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
            at,
          )
            .from(card.querySelectorAll("[data-draw]"), { drawSVG: "0%", duration: 0.7, stagger: 0.06 }, at + 0.35)
            .to(cup, { x: `${-side * swing}vw`, rotation: side * -14, duration: 1 }, at - 0.15)
            .to(card, { yPercent: -45, autoAlpha: 0, rotation: side * 4, duration: 0.7, ease: "power2.in" }, at + step - 0.55);
        });

        const L = 0.8 + cards.length * step;
        tl.to(cup, { x: 0, y: desk ? "21vh" : "2vh", rotation: 0, scale: desk ? 1.05 : 0.92, duration: 1.1 }, L)
          .from(title.lines, { yPercent: 100, duration: 0.8, stagger: 0.1, ease: "power3.out" }, L + 0.25)
          .fromTo(
            q("[data-seq-side]"),
            { yPercent: 130, rotation: (i: number) => [-24, 24][i] },
            { yPercent: 0, rotation: (i: number) => [-7, 7][i], duration: 1.1, stagger: 0.12, ease: "power3.out" },
            L + 0.35,
          )
          .from(
            q("[data-seq-fruit]"),
            {
              x: (i: number) => `${fruit[i].from[0]}vw`,
              y: (i: number) => `${fruit[i].from[1]}vh`,
              rotation: (i: number) => fruit[i].from[2] * 3,
              autoAlpha: 0,
              duration: 1.4,
              ease: "power3.out",
              stagger: 0.08,
            },
            L + 0.5,
          )
          .from(q("[data-seq-label]"), { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.15 }, L + 1)
          .from(q("[data-seq-label] [data-draw]"), { drawSVG: "0%", duration: 0.6, stagger: 0.15 }, L + 1.1)
          .to({}, { duration: 0.6 });

        // fruit keeps drifting a little once it's in
        q("[data-seq-fruit] > *").forEach((el, i) =>
          gsap.to(el, { y: -10 - i * 3, rotation: i % 2 ? 8 : -8, duration: 2.4 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        );

        return () => title.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[620vh] bg-pale md:h-[680vh]" aria-label="Why Ma Matcha">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ribbon */}
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            data-seq-ribbon
            d="M-60 300C140 260 230 520 470 560S880 300 1060 230 1380 120 1520 60"
            fill="none"
            stroke="white"
            strokeWidth="34"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* feature cards */}
        {features.map((f, i) => {
          const right = i % 2 === 0;
          return (
            <article
              key={f.title.join(" ")}
              data-seq-card
              className={`invisible absolute inset-x-5 top-[11svh] z-20 rounded-2xl bg-sage-deep/80 px-6 pb-7 pt-11 text-center md:inset-x-auto md:top-[24svh] md:w-[min(31vw,450px)] md:px-10 md:pb-10 md:pt-14 ${
                right ? "md:right-[4vw]" : "md:left-[3vw] md:top-[44svh]"
              }`}
            >
              <Smiley className="absolute left-1/2 top-0 size-16 -translate-x-1/2 -translate-y-1/2 md:size-[72px]" />
              <h3 className="type-display text-[14vw] text-cream md:text-[min(5vw,72px)]">
                {f.title[0]}
                <br />
                {f.title[1]}
              </h3>
              <p className="mx-auto mt-4 max-w-[26ch] text-[5vw] font-medium leading-[1.1] tracking-tight text-forest md:text-[min(1.45vw,21px)]">
                {f.body}
              </p>
            </article>
          );
        })}

        {/* line-up title */}
        <h2
          data-seq-title
          className="type-title absolute inset-x-0 top-[12svh] z-10 px-6 text-center text-[11vw] md:top-[9svh] md:text-[min(5vw,72px)]"
        >
          <span className="block text-forest">{lineup.title[0]}</span>
          <span className="block text-forest">{lineup.title[1]}</span>
          <span className="block text-leaf">{lineup.accent}</span>
        </h2>

        {/* side cups for the line-up */}
        {[lineup.left, lineup.right].map((d, i) => (
          <div
            key={d.cutout.src}
            data-seq-side
            className={`absolute top-[60svh] z-10 w-[36vw] md:top-[54svh] md:w-[min(15vw,220px)] ${
              i === 0 ? "left-[calc(50%-50vw+2vw)] md:left-[calc(50%-27vw)]" : "right-[calc(50%-50vw+2vw)] md:right-[calc(50%-27vw)]"
            }`}
          >
            <Image src={d.cutout.src} alt={d.label.join(" ")} width={d.cutout.width} height={d.cutout.height} sizes="(min-width: 768px) 220px, 36vw" className="h-auto w-full drop-shadow-[0_30px_30px_rgba(35,72,33,0.25)]" />
          </div>
        ))}

        {/* travelling hero cup */}
        <div
          data-seq-cup
          className="absolute left-1/2 top-[74svh] z-30 w-[40vw] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:w-[min(19vw,280px)]"
        >
          <Image
            src={lineup.centre.src}
            alt="Ube cream top iced matcha"
            width={lineup.centre.width}
            height={lineup.centre.height}
            sizes="(min-width: 768px) 280px, 44vw"
            className="h-auto w-full drop-shadow-[0_40px_40px_rgba(35,72,33,0.3)]"
          />
        </div>

        {/* flying fruit */}
        {fruit.map((f, i) => (
          <div key={i} data-seq-fruit className={`absolute z-40 ${f.cls}`} aria-hidden="true">
            <Image src={f.src} alt="" width={f.w} height={f.h} sizes="170px" className="h-auto w-full drop-shadow-[0_18px_18px_rgba(35,72,33,0.25)]" />
          </div>
        ))}

        {/* labels */}
        <div data-seq-label className="absolute left-[3%] top-[47svh] z-40 md:left-[14%] md:top-[47svh]">
          <HandNote lines={lineup.left.label} arrow="down-right" className="text-[6vw] md:text-[min(2vw,28px)]" />
        </div>
        <div data-seq-label className="absolute right-[4%] top-[38svh] z-40 text-right md:right-[13%] md:top-[36svh]">
          <HandNote lines={lineup.right.label} arrow="down-left" className="text-[6vw] md:text-[min(2vw,28px)]" arrowClassName="ml-auto" />
        </div>
      </div>
    </section>
  );
}
