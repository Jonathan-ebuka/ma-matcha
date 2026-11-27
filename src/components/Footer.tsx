"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { drinks, footer, site } from "@/content/site";
import { ArrowButton, SocialLinks, Wordmark } from "@/components/ui";

function TileIcon({ name }: { name: string }) {
  if (name === "pin")
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-leaf" aria-hidden="true">
        <path d="M24 43s13-12.4 13-22a13 13 0 0 0-26 0c0 9.6 13 22 13 22Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="21" r="5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-leaf" aria-hidden="true">
      <path d="M14 14h20l-2.5 28h-15L14 14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 14h24M27 14l4-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 24h15" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-foot-word]"), {
          yPercent: 40,
          ease: "none",
          scrollTrigger: { trigger: q("[data-foot-word]")[0], start: "top bottom", end: "bottom bottom", scrub: true },
        });
        gsap.from(q("[data-foot-cups] > *"), {
          yPercent: 40,
          rotation: (i: number) => (i ? 18 : -18),
          autoAlpha: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(q("[data-foot-tile]"), {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-pale px-2.5 pt-2.5">
      <div className="relative z-10 grid gap-10 md:grid-cols-[minmax(0,700px)_1fr] md:gap-0">
        {/* Big card */}
        <div className="relative overflow-hidden rounded-lg">
          <Image src="/slides/backdrop.webp" alt="" fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover" />
          <div className="relative flex min-h-[560px] flex-col items-center px-6 pb-10 pt-12 text-center md:min-h-[650px]">
            <h2 className="type-display text-[17vw] text-cream md:text-[min(6.2vw,90px)]">
              {footer.cardTitle.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <div data-foot-cups className="relative -mt-6 flex w-full max-w-[420px] items-end justify-center">
              <Image src={drinks.breakfast.cutout.src} alt="" width={drinks.breakfast.cutout.width} height={drinks.breakfast.cutout.height} sizes="200px" className="relative z-10 h-auto w-[46%] -rotate-6 drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]" />
              <Image src={drinks.berry.cutout.src} alt="" width={drinks.berry.cutout.width} height={drinks.berry.cutout.height} sizes="200px" className="-ml-[8%] h-auto w-[40%] rotate-6 drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]" />
            </div>
            <div className="mt-auto pt-6">
              <ArrowButton href={site.orderHref} target="_blank" rel="noreferrer" tone="white" size="lg">
                Order now
              </ArrowButton>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col px-4 md:pl-5 md:pr-10">
          <div className="flex gap-2.5">
            {footer.tiles.map((t) => (
              <a
                key={t.href}
                href={t.href}
                data-foot-tile
                className="flex aspect-[1/1] w-[40vw] flex-col items-center justify-end gap-3 rounded-lg bg-white pb-5 transition-transform duration-300 hover:-translate-y-1 md:w-[min(9.6vw,138px)]"
              >
                <TileIcon name={t.icon} />
                <span className="type-display text-center text-2xl text-forest md:text-xl">
                  {t.label[0]}
                  <br />
                  {t.label[1]}
                </span>
              </a>
            ))}
          </div>

          <div className="md:ml-[min(10vw,148px)] md:mt-[min(4.4vw,64px)]">
            <p className="type-title mt-10 text-[12vw] md:mt-0 md:text-[min(4.4vw,64px)]">
              <span className="block text-leaf">{footer.brandTop}</span>
              <span className="block text-forest">{footer.brandBottom}</span>
            </p>
            <ul className="mt-7 space-y-2">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-xl font-medium tracking-tight text-forest underline decoration-1 underline-offset-[6px] hover:text-leaf"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <SocialLinks items={site.social} className="mt-8 [&_a]:bg-white" />
          </div>
        </div>
      </div>

      {/* Giant wordmark bleeding off the bottom */}
      <div aria-hidden="true" className="relative mt-10 select-none overflow-hidden md:-mt-[9vw]">
        <div data-foot-word className="whitespace-nowrap text-center text-[23vw] text-forest md:text-[16.2vw]">
          <Wordmark className="[&>span]:md:inline-block" />
        </div>
      </div>

      <div className="relative flex flex-col gap-2 px-4 pb-6 pt-2 text-base font-medium tracking-tight text-forest md:flex-row md:justify-between md:px-8">
        <p>© {site.year} {site.name}. All rights reserved.</p>
        <p>{site.city}</p>
      </div>
    </footer>
  );
}
