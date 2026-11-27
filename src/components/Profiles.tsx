"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { profiles, specials } from "@/content/site";
import { ArrowIcon, HandNote } from "@/components/ui";

const cards = [
  { ...profiles.intro, img: null },
  ...specials.map((s) => ({ name: s.name, tagline: s.note, aside: "Matcha special", img: s.cutout })),
];

/** Big photo headline + a row of matcha-special cards (in place of customer reviews). */
export default function Profiles() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);

  const go = (dir: 1 | -1) => {
    const next = (active + dir + cards.length) % cards.length;
    setActive(next);
    const el = track.current?.children[next] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(q("[data-prof-title]"), { type: "words,chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 100,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.025,
          scrollTrigger: { trigger: q("[data-prof-title]")[0], start: "top 80%" },
        });
        gsap.fromTo(
          q("[data-prof-bg]"),
          { yPercent: -12, scale: 1.15 },
          { yPercent: 12, scale: 1.15, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.fromTo(
          q("[data-prof-cup]"),
          { yPercent: 25, rotation: -8 },
          { yPercent: -15, rotation: 6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.from(q("[data-prof-card]"), {
          y: 60,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: track.current, start: "top 90%" },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-forest pb-16 pt-28 text-cream md:pb-24 md:pt-36">
      <div data-prof-bg className="absolute inset-0" aria-hidden="true">
        <Image src="/slides/backdrop.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/25" aria-hidden="true" />

      <div className="relative text-center">
        <HandNote lines={[profiles.eyebrow]} className="text-[6vw] text-cream md:text-[min(2vw,28px)]" />
        <h2
          data-prof-title
          className="type-title relative z-10 mx-auto mt-4 max-w-[9ch] text-[21vw] leading-[0.84] md:max-w-none md:text-[min(9.5vw,140px)]"
        >
          {profiles.title.join(" ")}
        </h2>
        <div data-prof-cup className="relative z-20 mx-auto -mt-[14vw] w-[52vw] md:-mt-[min(6vw,90px)] md:w-[min(17vw,250px)]">
          <Image
            src={profiles.cup.src}
            alt=""
            width={profiles.cup.width}
            height={profiles.cup.height}
            sizes="(min-width: 768px) 250px, 52vw"
            className="h-auto w-full drop-shadow-[0_40px_40px_rgba(0,0,0,0.3)]"
          />
        </div>
        <p className="type-display relative z-30 -mt-10 text-[9vw] md:-mt-14 md:text-[min(3.4vw,48px)]">{profiles.subtitle}</p>
      </div>

      {/* Cards */}
      <div className="relative mt-8 flex justify-center gap-2" aria-hidden="false">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous profile"
          className="grid size-10 place-items-center rounded-full bg-cream text-forest transition-transform hover:scale-110"
        >
          <ArrowIcon className="w-3.5 -rotate-[135deg]" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next profile"
          className="grid size-10 place-items-center rounded-full bg-cream text-forest transition-transform hover:scale-110"
        >
          <ArrowIcon className="w-3.5 rotate-45" />
        </button>
      </div>

      <div
        ref={track}
        data-lenis-prevent
        className="no-scrollbar relative mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[10vw] md:px-[calc(50vw-min(16vw,230px))]"
      >
        {cards.map((c, i) => (
          <article
            key={c.name}
            data-prof-card
            onClick={() => setActive(i)}
            className={`relative flex min-h-[200px] w-[80vw] shrink-0 snap-center flex-col rounded-lg border p-6 transition-colors duration-500 md:w-[min(32vw,460px)] md:p-7 ${
              active === i ? "border-white bg-white text-forest" : "border-white/30 bg-white/10 text-cream backdrop-blur-md"
            }`}
          >
            <p className={`font-hand text-xl ${active === i ? "text-leaf" : "text-cream/80"}`}>{i === 0 ? "Meet the line-up" : "If you order…"}</p>
            <h3 className="type-title mt-3 text-3xl md:text-[34px]">{c.name}</h3>
            <p className="mt-2 text-xl font-medium leading-tight tracking-tight">{c.tagline}</p>
            <div className={`mt-auto flex items-end justify-between border-t pt-4 ${active === i ? "border-forest/15" : "border-white/25"}`}>
              <p className="max-w-[24ch] text-base italic leading-tight opacity-80">({c.aside})</p>
              {c.img && (
                <Image src={c.img.src} alt="" width={c.img.width} height={c.img.height} sizes="48px" className="-mb-2 h-auto w-12 shrink-0" />
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
