"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { pageReady } from "@/lib/loader";
import { site } from "@/content/site";
import { ArrowButton, SocialLinks } from "@/components/ui";

/**
 * Top bar, laid out like the reference:
 *  - left: round social buttons
 *  - centre (desktop only): small pill links
 *  - right: arrow "Order now" button
 * On mobile the centre links drop away and it's just socials + order button.
 */
export default function Navbar() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        pageReady.then(() => {
          gsap.fromTo(
            "[data-nav-item]",
            { autoAlpha: 0, y: -24 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.35 },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className="absolute inset-x-0 top-0 z-40">
      <nav
        aria-label="Main"
        className="mx-auto grid grid-cols-[1fr_auto] items-center gap-4 px-5 pt-5 md:grid-cols-[1fr_auto_1fr] md:px-10 md:pt-10"
      >
        <div data-nav-item className="js-intro">
          <SocialLinks items={site.social} />
        </div>

        <ul data-nav-item className="js-intro hidden items-center gap-2 md:flex">
          {site.nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block rounded-full bg-sage-deep px-2.5 pb-1 pt-0.5 text-[22px] font-medium leading-tight tracking-tight text-cream transition-colors duration-300 hover:bg-forest"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div data-nav-item className="js-intro justify-self-end">
          <ArrowButton href={site.orderHref} target="_blank" rel="noreferrer" tone="pale">
            Order now
          </ArrowButton>
        </div>
      </nav>
    </header>
  );
}
