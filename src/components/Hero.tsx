"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Logo from "@/components/Logo";

/*
 * Layout is drawn on two fixed "stages" (desktop 16:9, mobile 9:14).
 * The SVG (blob + arched text) and the cups share the same box, so
 * percentages on the cups line up with the SVG viewBox at any size.
 */

type Cup = {
  key: string;
  name: string;
  src: string;
  width: number;
  height: number;
  /** position + size in % of the stage; r = base tilt in deg */
  mobile: { x: number; y: number; w: number; r: number };
  desktop: { x: number; y: number; w: number; r: number };
  depth: number;
  z: string;
};

const CUPS: Cup[] = [
  {
    key: "breakfast",
    name: "Breakfast in a Cup",
    src: "/drinks/breakfast.webp",
    width: 558,
    height: 771,
    mobile: { x: 25, y: 14, w: 33, r: -14 },
    desktop: { x: 20, y: 17, w: 16.5, r: -16 },
    depth: 0.6,
    z: "z-10",
  },
  {
    key: "berry",
    name: "Berry Blast",
    src: "/drinks/berry.webp",
    width: 524,
    height: 701,
    mobile: { x: 49, y: 40, w: 45, r: 0 },
    desktop: { x: 50, y: 30, w: 21, r: 0 },
    depth: 1,
    z: "z-20",
  },
  {
    key: "tropics",
    name: "From the Tropics",
    src: "/drinks/tropics.webp",
    width: 513,
    height: 699,
    mobile: { x: 79, y: 27, w: 29, r: 12 },
    desktop: { x: 80.5, y: 41, w: 15.5, r: 10 },
    depth: 0.75,
    z: "z-10",
  },
];

const ARC_TEXT = "MA MATCHA · SIP · MA MATCHA";

function Backdrop({
  id,
  viewBox,
  blob,
  arc,
  origin,
  fontSize,
  className,
}: {
  id: string;
  viewBox: string;
  blob: string;
  arc: string;
  origin: string;
  fontSize: number;
  className: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMax meet"
      className={`absolute inset-0 h-full w-full overflow-visible ${className}`}
      aria-hidden="true"
    >
      <g className="hero-blob">
        {/* thick round-joined stroke = soft rounded corners on the polygon */}
        <path
          d={blob}
          fill="var(--color-sun)"
          stroke="var(--color-sun)"
          strokeWidth={90}
          strokeLinejoin="round"
        />
      </g>

      <path id={id} d={arc} fill="none" />
      <g className="hero-arc-scroll" data-origin={origin}>
        <g className="hero-arc js-intro" data-origin={origin}>
          <text
            fill="var(--color-ink)"
            fontSize={fontSize}
            style={{ fontFamily: "var(--font-display)" }}
          >
            <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
              {ARC_TEXT}
            </textPath>
          </text>
        </g>
      </g>
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const origin = (_: number, el: Element) =>
        (el as SVGElement).dataset.origin ?? "0 0";

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ---- Intro ------------------------------------------------------
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          ".hero-blob",
          { scale: 0.82, y: 120, transformOrigin: "50% 100%" },
          { scale: 1, y: 0, duration: 1.4 },
        )
          .fromTo(
            ".hero-arc",
            { rotation: -70, svgOrigin: origin, autoAlpha: 0 },
            { rotation: 0, svgOrigin: origin, autoAlpha: 1, duration: 1.8, ease: "expo.out" },
            0.15,
          )
          .fromTo(
            ".cup-intro",
            { yPercent: 140, rotation: (i: number) => [-25, 0, 25][i], autoAlpha: 0 },
            {
              yPercent: 0,
              rotation: 0,
              autoAlpha: 1,
              duration: 1.4,
              ease: "back.out(1.3)",
              stagger: { each: 0.12, from: "center" },
            },
            0.3,
          )
          .fromTo(
            ".hero-fade",
            { autoAlpha: 0, y: (i: number) => (i === 0 ? -16 : 16) },
            { autoAlpha: 1, y: 0, duration: 1 },
            0.9,
          );

        // ---- Idle float -------------------------------------------------
        gsap.utils.toArray<HTMLElement>(".cup-float").forEach((el, i) => {
          gsap.to(el, {
            y: -14 - i * 2,
            rotation: i % 2 ? -1.6 : 1.6,
            duration: 2.8 + i * 0.45,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.4 + i * 0.2,
          });
        });

        gsap.to(".scroll-cue-dot", {
          y: 10,
          duration: 1.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // ---- Scroll: cups drift apart, text keeps turning ---------------
        const scroll = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
        scroll
          .to(".cup-scroll-0", { xPercent: -35, yPercent: -40, rotation: -14 }, 0)
          .to(".cup-scroll-1", { yPercent: -18, scale: 1.12 }, 0)
          .to(".cup-scroll-2", { xPercent: 35, yPercent: -30, rotation: 14 }, 0)
          .to(".hero-arc-scroll", { rotation: 20, svgOrigin: origin }, 0)
          .to(".hero-blob", { y: 60 }, 0)
          .to(".hero-fade", { autoAlpha: 0, duration: 0.3 }, 0);
      });

      // ---- Pointer parallax (mouse/trackpad only) -------------------------
      mm.add(
        "(prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          const cups = gsap.utils.toArray<HTMLElement>(".cup-parallax");
          const setters = cups.map((el) => ({
            depth: Number(el.dataset.depth),
            x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          }));

          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            setters.forEach((s) => {
              s.x(nx * 40 * s.depth);
              s.y(ny * 26 * s.depth);
            });
          };
          window.addEventListener("pointermove", onMove);
          return () => window.removeEventListener("pointermove", onMove);
        },
      );

      // Fonts/images can shift layout after first paint.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate h-svh min-h-[560px] w-full overflow-hidden bg-background"
      aria-label="Ma Matcha smoothies"
    >
      <noscript>
        <style>{`.js-intro{opacity:1!important;visibility:visible!important}`}</style>
      </noscript>

      {/* Logo */}
      <header className="hero-fade js-intro absolute inset-x-0 top-0 z-30 flex justify-center pt-6 md:pt-8">
        <Logo />
      </header>

      {/* Stage */}
      <div className="absolute bottom-0 left-1/2 aspect-[9/14] w-[min(100vw,62svh)] -translate-x-1/2 md:aspect-video md:w-[min(100vw,178svh)]">
        <Backdrop
          id="arc-mobile"
          className="md:hidden"
          viewBox="0 0 900 1400"
          blob="M20 1500 L70 900 L230 720 L560 680 L800 790 L880 1500 Z"
          arc="M80 1560 A440 440 0 1 1 820 1560"
          origin="450 1380"
          fontSize={74}
        />
        <Backdrop
          id="arc-desktop"
          className="hidden md:block"
          viewBox="0 0 1600 900"
          blob="M190 960 L275 600 L440 470 L740 420 L1010 425 L1290 560 L1470 960 Z"
          arc="M310 1130 A520 520 0 1 1 1290 1130"
          origin="800 950"
          fontSize={104}
        />

        {CUPS.map((cup, i) => (
          <div
            key={cup.key}
            className={`cup-scroll-${i} absolute -translate-x-1/2 ${cup.z}
              left-[var(--x)] top-[var(--y)] w-[var(--w)] rotate-[var(--r)]
              md:left-[var(--mx)] md:top-[var(--my)] md:w-[var(--mw)] md:rotate-[var(--mr)]`}
            style={
              {
                "--x": `${cup.mobile.x}%`,
                "--y": `${cup.mobile.y}%`,
                "--w": `${cup.mobile.w}%`,
                "--r": `${cup.mobile.r}deg`,
                "--mx": `${cup.desktop.x}%`,
                "--my": `${cup.desktop.y}%`,
                "--mw": `${cup.desktop.w}%`,
                "--mr": `${cup.desktop.r}deg`,
              } as React.CSSProperties
            }
          >
            <div className="cup-intro js-intro">
              <div className="cup-parallax" data-depth={cup.depth}>
                <div className="cup-float">
                  <Image
                    src={cup.src}
                    alt={`${cup.name} smoothie`}
                    width={cup.width}
                    height={cup.height}
                    priority
                    sizes="(min-width: 768px) 22vw, 46vw"
                    className="h-auto w-full select-none drop-shadow-[0_28px_28px_rgba(64,56,24,0.22)]"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="hero-fade js-intro absolute inset-x-0 bottom-5 z-30 flex flex-col items-center gap-2 md:bottom-8">
        <span className="text-[10px] font-semibold tracking-[0.32em] text-ink md:text-xs">
          SCROLL TO DISCOVER
        </span>
        <span className="relative h-7 w-[1.5px] overflow-hidden rounded-full bg-ink/20">
          <span className="scroll-cue-dot absolute left-0 top-0 h-3 w-full rounded-full bg-ink" />
        </span>
      </div>
    </section>
  );
}
