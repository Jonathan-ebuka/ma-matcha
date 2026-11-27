"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { pageReady } from "@/lib/loader";
import { hero, site } from "@/content/site";
import { ArrowButton, HandNote, Squiggle, Wordmark } from "@/components/ui";
import ArcBand from "@/components/ArcBand";

const cup = hero.cup;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const chars = SplitText.create(q("[data-hero-word]"), { type: "chars", mask: "chars" });
        const lines = SplitText.create(q("[data-hero-head] > span"), { type: "lines", mask: "lines" });

        gsap.set("[data-hero-ring] circle", { drawSVG: "0%" });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .set(".js-intro", { autoAlpha: 1 })
          .from(chars.chars, { yPercent: 105, duration: 1.4, stagger: 0.045 })
          .from("[data-hero-cta]", { scale: 0, duration: 1, ease: "back.out(2)" }, 0.45)
          .to("[data-hero-ring] circle", { drawSVG: "100%", duration: 2.2, ease: "power3.inOut" }, 0.2)
          .from("[data-hero-cup]", { yPercent: 70, rotation: 25, autoAlpha: 0, duration: 1.8 }, 0.35)
          .from("[data-hero-stat]", { scale: 0, duration: 1.1, ease: "back.out(1.6)", stagger: 0.1 }, 0.75)
          .from(lines.lines, { yPercent: 100, duration: 1.2, stagger: 0.08 }, 0.6)
          .from("[data-hero-body]", { autoAlpha: 0, y: 20, duration: 1 }, 0.95)
          .from("[data-hero] [data-draw]", { drawSVG: "0%", duration: 1.2, ease: "power2.inOut", stagger: 0.1 }, 1.1)
          .from("[data-hero] [data-hand] span", { autoAlpha: 0, x: -10, duration: 0.6, stagger: 0.12 }, 1);

        pageReady.then(() => intro.play());

        // Scroll: cup lifts and spins out of the frame, wordmark drifts slower.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          })
          .to("[data-hero-cup-scroll]", { yPercent: -38, rotation: 28 }, 0)
          .to("[data-hero-word]", { yPercent: 35 }, 0)
          .to("[data-hero-ring]", { rotation: 40 }, 0)
          .to("[data-hero-stat-wrap]", { y: (i) => -60 - i * 50 }, 0);

        // idle bob
        gsap.to("[data-hero-cup]", {
          y: -12,
          rotation: 2,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        return () => {
          chars.revert();
          lines.revert();
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-hero
      className="grain relative isolate overflow-hidden bg-sage pt-28 md:pt-[84px]"
      aria-label="Ma Matcha"
    >
      {/* Wordmark + CTA */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <h1 className="sr-only">Ma Matcha — smoothies with personality</h1>
        <div
          data-hero-word
          aria-hidden="true"
          className="js-intro text-center text-[19vw] text-forest md:text-[min(12.4vw,190px)]"
        >
          <Wordmark />
        </div>
        <div data-hero-cta className="js-intro mt-8 md:mt-6">
          <ArrowButton href={site.orderHref} target="_blank" rel="noreferrer" size="lg">
            Order now
          </ArrowButton>
        </div>
      </div>

      {/* Stage */}
      <div className="relative mx-auto mt-14 max-w-[1440px] md:mt-[2.6vw] md:h-[min(44vw,640px)]">
        {/* Ring + cup */}
        <div className="relative h-[118vw] md:absolute md:left-[21%] md:top-[3%] md:h-auto md:w-[46%]">
          <svg
            data-hero-ring
            viewBox="0 0 100 100"
            className="absolute left-1/2 top-[34vw] w-[128vw] -translate-x-1/2 md:top-0 md:w-full"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="48.6" fill="none" stroke="white" strokeWidth="2.2" transform="rotate(-90 50 50)" />
          </svg>
          {/* keeps the ring box square on desktop */}
          <div className="hidden aspect-square md:block" />

          <div
            data-hero-cup-scroll
            className="absolute left-1/2 top-0 z-30 w-[62vw] -translate-x-1/2 md:left-[47%] md:top-[-4%] md:w-[46%]"
          >
            <div data-hero-cup className="js-intro -rotate-[14deg]">
              <Image
                src={cup.src}
                alt="Ube cream top iced matcha"
                width={cup.width}
                height={cup.height}
                priority
                sizes="(min-width: 768px) 22vw, 62vw"
                className="h-auto w-full drop-shadow-[0_40px_40px_rgba(35,72,33,0.28)]"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="pointer-events-none relative z-30 -mt-[44vw] h-[64vw] md:absolute md:inset-0 md:mt-0 md:h-auto">
          {hero.stats.map((s, i) => {
            const pos = [
              "left-[62%] top-0 md:left-[15.8%] md:top-[3%]",
              "left-[35%] top-[16%] md:left-[7.6%] md:top-[13.5%]",
              "left-[7%] top-[34%] md:left-[2.8%] md:top-[30%]",
            ][i];
            return (
              <div key={s.label} data-hero-stat-wrap className={`absolute ${pos}`}>
                <div
                  data-hero-stat
                  className="js-intro grid size-[30vw] place-content-center rounded-full bg-cream text-center text-forest md:size-[min(9.7vw,140px)]"
                >
                  <p className="type-display text-[10vw] leading-[0.85] md:text-[min(3.4vw,50px)]">
                    {s.value}
                    <span className="text-[0.55em]">{s.unit}</span>
                  </p>
                  <p className="text-[3.6vw] font-medium leading-tight tracking-tight md:text-[min(1.1vw,17px)]">
                    {s.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <HandNote
          lines={hero.note}
          arrow="up-right"
          className="relative z-30 ml-[52vw] -mt-[6vw] text-[6.4vw] md:absolute md:left-[2.8%] md:top-[2%] md:m-0 md:text-[min(2vw,30px)]"
          arrowClassName="md:hidden"
        />
        <HandNote
          lines={[]}
          arrow="down-right"
          className="absolute left-[3.6%] top-[13%] hidden text-[min(2vw,30px)] md:block"
          arrowClassName="w-[min(3.4vw,50px)]"
        />

        {/* Headline */}
        <div className="relative z-20 mt-10 px-6 pb-[34vw] text-center md:absolute md:right-[5%] md:top-[1%] md:mt-0 md:w-[30%] md:p-0">
          <h2 data-hero-head className="type-display text-[15.5vw] md:text-[min(5.7vw,84px)]">
            <span className="js-intro block text-cream">{hero.headline[0]}</span>
            <span className="js-intro block text-forest">{hero.headline[1]}</span>
            <span className="js-intro block text-forest">{hero.headline[2]}</span>
          </h2>
          <div data-hero-body className="js-intro mx-auto mt-5 max-w-[22em] md:mt-6">
            <p className="type-title text-[5.6vw] text-forest md:text-[min(1.6vw,23px)]">{hero.body}</p>
            <Squiggle className="ml-auto mr-[8%] mt-1 w-[34vw] text-cream md:w-[min(11vw,160px)]" />
          </div>
        </div>
      </div>

      <ArcBand text={hero.marquee} />
    </section>
  );
}
