"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { drinks, insider, site } from "@/content/site";
import { ArrowButton, HandNote } from "@/components/ui";

const cards = [
  { d: drinks.tropics, cls: "md:left-[-4%] md:top-[6%] md:-rotate-[9deg]", m: "-rotate-[5deg]", speed: 40 },
  { d: drinks.berry, cls: "md:left-[19%] md:top-[18%] md:rotate-[4deg]", m: "rotate-[4deg] ml-auto", speed: -30 },
  { d: drinks.breakfast, cls: "md:left-[38%] md:top-0 md:-rotate-[3deg]", m: "-rotate-[3deg]", speed: 70 },
];

export default function Insider() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(q("[data-insider-title] > span"), { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 100,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: q("[data-insider-title]")[0], start: "top 85%" },
        });

        q("[data-insider-card]").forEach((el, i) => {
          gsap.from(el, {
            yPercent: 30,
            rotation: i % 2 ? -12 : 12,
            autoAlpha: 0,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
          gsap.to(el.firstElementChild, {
            y: -cards[i].speed,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        gsap.from(q("[data-insider-copy] > *"), {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: q("[data-insider-copy]")[0], start: "top 80%" },
        });
        gsap.from(q("[data-draw]"), {
          drawSVG: "0%",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: q("[data-hand]")[0], start: "top 85%" },
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="why" className="relative bg-pale pb-24 pt-10 md:pb-40 md:pt-6">
      <h2
        data-insider-title
        className="type-title mx-auto px-6 text-center text-[8.6vw] md:text-[min(4.6vw,66px)]"
      >
        <span className="block text-forest">{insider.title[0]}</span>
        <span className="block text-forest">{insider.title[1]}</span>
        <span className="block text-leaf">{insider.titleAccent}</span>
      </h2>

      <div className="mx-auto mt-14 grid max-w-[1440px] gap-14 md:mt-20 md:grid-cols-[1.1fr_1fr] md:gap-0">
        {/* Photo cards */}
        <div className="relative flex flex-col gap-6 px-6 md:block md:h-[min(46vw,660px)] md:px-0">
          {cards.map(({ d, cls, m }) => (
            <div
              key={d.name}
              data-insider-card
              className={`w-[72%] md:absolute md:w-[min(23vw,330px)] ${cls}`}
            >
              <figure className={`overflow-hidden rounded-md bg-white p-2 shadow-[0_24px_50px_-18px_rgba(35,72,33,0.35)] md:rotate-0 ${m}`}>
                <Image
                  src={d.slide}
                  alt={`If you order ${d.name}: ${d.tagline}`}
                  width={1170}
                  height={1458}
                  sizes="(min-width: 768px) 300px, 72vw"
                  className="h-auto w-full rounded-sm"
                />
              </figure>
            </div>
          ))}
        </div>

        {/* Copy */}
        <div className="relative px-6 md:px-0 md:pr-[12%] md:pt-2">
          <div data-insider-copy className="max-w-[30em]">
            <p className="type-title text-[8.4vw] text-forest md:text-[min(2.3vw,34px)]">{insider.lead}</p>
            <p className="mt-5 max-w-[26em] text-[5vw] font-medium leading-[1.12] tracking-tight text-forest/85 md:text-[min(1.4vw,20px)]">
              {insider.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ArrowButton href={site.orderHref} target="_blank" rel="noreferrer">
                Order now
              </ArrowButton>
              <a
                href={site.social[0].href}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium tracking-tight text-forest underline decoration-1 underline-offset-4"
              >
                {insider.follow}
              </a>
            </div>
          </div>
          <HandNote
            lines={insider.note}
            arrow="down"
            className="mt-16 ml-[30%] text-[7vw] md:ml-[22%] md:mt-[min(10vw,140px)] md:text-[min(2vw,28px)]"
          />
        </div>
      </div>
    </section>
  );
}
