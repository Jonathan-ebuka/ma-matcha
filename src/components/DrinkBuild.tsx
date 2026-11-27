"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { build, site } from "@/content/site";
import { ArrowButton, HandNote, Smiley } from "@/components/ui";

/**
 * Pinned, scroll-scrubbed drink build (More Nutrition-style sequence).
 *
 * The drink is a 145-frame image sequence drawn to a <canvas>. The studio
 * backdrop was keyed out of the frames, so they sit on any background.
 * Phones load every second frame (/build/sm), desktops all of them (/build/lg).
 *
 * While the frames advance, a card per ingredient slides in from alternating
 * sides, the cup sways the other way, hand-written notes fade in and out and
 * a step rail tracks progress.
 */

const FRAME_W = 640;
const FRAME_H = 1138;
const pad = (n: number) => String(n).padStart(3, "0");

export default function DrinkBuild() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const current = useRef(0);
  const step = useRef(1); // 2 on phones: only even frames exist in /build/sm

  /* ---------------------------------------------------------------------- */
  /* Frame loading + drawing                                                 */
  /* ---------------------------------------------------------------------- */

  const draw = (index: number) => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    // fall back to the nearest frame below that has loaded
    let i = Math.round(index / step.current) * step.current;
    while (i > 0 && !images.current[i]?.complete) i -= step.current;
    const img = images.current[i];
    if (!img?.complete || !img.naturalWidth) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
  };

  useEffect(() => {
    const c = canvas.current!;
    const set = window.innerWidth < 768 ? "sm" : "lg";
    step.current = set === "sm" ? 2 : 1;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      draw(current.current);
    };

    // first frame straight away, the rest once the section is getting close
    const load = (i: number) => {
      if (images.current[i]) return;
      const img = new Image();
      img.decoding = "async";
      img.src = `/build/${set}/${pad(i)}.webp`;
      img.onload = () => {
        if (Math.abs(i - current.current) <= step.current) draw(current.current);
      };
      images.current[i] = img;
    };
    load(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        for (let i = step.current; i < build.frames; i += step.current) load(i);
        io.disconnect();
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(root.current!);

    const ro = new ResizeObserver(size);
    ro.observe(c);
    size();
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Scroll timeline                                                         */
  /* ---------------------------------------------------------------------- */

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ desk: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
        const { desk } = ctx.conditions as { desk: boolean };
        const sway = desk ? 17 : 4; // vw the cup drifts away from each card
        const playhead = { frame: 0 };
        const cards = q("[data-build-card]");
        const notes = q("[data-build-note]");
        const steps = q("[data-build-step]");
        const cup = q("[data-build-cup]")[0];

        const STEP = 2; // timeline seconds per stage
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        // background: ribbon draws, soft blobs drift
        tl.fromTo(q("[data-build-ribbon]"), { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", duration: build.stages.length * STEP + 1 }, 0)
          .fromTo(q("[data-build-blob='a']"), { xPercent: -30, yPercent: 20 }, { xPercent: 40, yPercent: -30, ease: "none", duration: build.stages.length * STEP + 2 }, 0)
          .fromTo(q("[data-build-blob='b']"), { xPercent: 30, yPercent: -10 }, { xPercent: -50, yPercent: 30, ease: "none", duration: build.stages.length * STEP + 2 }, 0)
          .fromTo(
            q("[data-build-rail-fill]"),
            { scaleX: 0 },
            { scaleX: 1, ease: "none", duration: build.stages.length * STEP },
            0,
          );

        build.stages.forEach((s, i) => {
          const at = i * STEP;
          const side = i % 2 === 0 ? 1 : -1; // +1 → card on the right, cup drifts left

          // frames for this ingredient
          tl.fromTo(
            playhead,
            { frame: s.from },
            { frame: s.to, ease: "none", duration: STEP, onUpdate: () => { current.current = playhead.frame; draw(playhead.frame); } },
            at,
          );

          // cup sways away from the card
          tl.to(cup, { x: `${-side * sway}vw`, rotation: -side * (desk ? 4 : 2), duration: STEP * 0.6 }, at);

          // card in / out
          tl.fromTo(
            cards[i],
            { xPercent: desk ? side * 60 : 0, yPercent: desk ? 0 : 30, rotation: side * 8, autoAlpha: 0 },
            { xPercent: 0, yPercent: 0, rotation: side * -2, autoAlpha: 1, duration: STEP * 0.4, ease: "power3.out" },
            at + 0.1,
          ).from(cards[i].querySelectorAll("[data-draw]"), { drawSVG: "0%", duration: STEP * 0.35, stagger: 0.05 }, at + 0.35);
          if (i < build.stages.length - 1) {
            tl.to(cards[i], { yPercent: -40, autoAlpha: 0, rotation: side * 3, duration: STEP * 0.3, ease: "power2.in" }, at + STEP * 0.78);
          }

          // handwritten note near the cup
          tl.fromTo(notes[i], { autoAlpha: 0, y: 16, rotation: -side * 6 }, { autoAlpha: 1, y: 0, rotation: -side * 3, duration: STEP * 0.25 }, at + 0.3)
            .to(notes[i], { autoAlpha: 0, y: -16, duration: STEP * 0.2 }, at + STEP * 0.8);

          // step rail
          tl.to(steps[i], { opacity: 1, duration: 0.2 }, at).to(steps[i], { opacity: 0.35, duration: 0.2 }, at + STEP - 0.05);
        });

        // finish: last card leaves, cup returns to centre, closing title
        const end = build.stages.length * STEP;
        tl.to(cards[cards.length - 1], { yPercent: -40, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, end - 0.2)
          .to(steps[steps.length - 1], { opacity: 1, duration: 0.2 }, end)
          .to(cup, { x: 0, rotation: 0, scale: desk ? 1.04 : 1, duration: 1.2 }, end)
          .fromTo(q("[data-build-end] > *"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }, end + 0.3)
          .to({}, { duration: 1.2 });

        draw(0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[720vh] bg-pale md:h-[760vh]" aria-label="How your matcha is built">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* background */}
        <div data-build-blob="a" className="absolute left-[8%] top-[12%] size-[60vw] rounded-full bg-sage/40 blur-3xl md:size-[34vw]" aria-hidden="true" />
        <div data-build-blob="b" className="absolute bottom-[-10%] right-[4%] size-[70vw] rounded-full bg-leaf/20 blur-3xl md:size-[38vw]" aria-hidden="true" />
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            data-build-ribbon
            d="M-60 640C160 560 260 300 520 330S840 690 1060 600 1300 220 1520 160"
            fill="none"
            stroke="white"
            strokeWidth="34"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* the drink */}
        <div
          data-build-cup
          className="absolute bottom-[7svh] left-1/2 z-20 aspect-[720/1280] h-[50svh] -translate-x-1/2 md:bottom-auto md:top-1/2 md:h-[min(86svh,860px)] md:-translate-y-1/2"
        >
          {/* soft page-coloured glow so the ribbon and blobs fade out behind the cup */}
          <div
            className="absolute inset-x-[-25%] bottom-[-4%] top-[10%] rounded-full bg-[radial-gradient(closest-side,var(--color-pale)_55%,transparent)]"
            aria-hidden="true"
          />
          <canvas
            ref={canvas}
            width={FRAME_W}
            height={FRAME_H}
            className="relative h-full w-full [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_94%,transparent_100%)]"
            role="img"
            aria-label="An iced matcha being built: ice, milk, matcha, ube, cold foam and cookie crumbs"
          />
          {/* hand-written notes, one per stage, sitting beside the cup */}
          {build.stages.map((s, i) => (
            <div
              key={s.key}
              data-build-note
              className={`invisible absolute top-[18%] hidden whitespace-nowrap md:block ${i % 2 === 0 ? "right-[92%] text-right" : "left-[92%]"}`}
            >
              <HandNote
                lines={[s.note]}
                arrow={i % 2 === 0 ? "down-right" : "down-left"}
                className="text-[6.4vw] md:text-[min(2.2vw,32px)]"
                arrowClassName={i % 2 === 0 ? "ml-auto" : ""}
              />
            </div>
          ))}
        </div>

        {/* ingredient cards */}
        {build.stages.map((s, i) => {
          const right = i % 2 === 0;
          return (
            <article
              key={s.key}
              data-build-card
              className={`invisible absolute inset-x-5 top-[8svh] z-30 rounded-2xl bg-sage-deep/85 px-5 pb-5 pt-9 text-center backdrop-blur-sm md:inset-x-auto md:top-[30svh] md:w-[min(30vw,440px)] md:px-10 md:pb-10 md:pt-14 ${
                right ? "md:right-[5vw]" : "md:left-[5vw]"
              }`}
            >
              <Smiley className="absolute left-1/2 top-0 size-14 -translate-x-1/2 -translate-y-1/2 md:size-[72px]" />
              <p className="font-hand text-xl text-forest/80 md:text-2xl">
                Step {i + 1} · {s.step}
              </p>
              <h3 className="type-display mt-1 text-[11vw] text-cream md:text-[min(5vw,72px)]">
                {s.title[0]}
                <br />
                {s.title[1]}
              </h3>
              <p className="mx-auto mt-3 max-w-[26ch] text-[4.6vw] font-medium leading-[1.1] tracking-tight text-forest md:mt-4 md:text-[min(1.45vw,21px)]">
                {s.body}
              </p>
            </article>
          );
        })}

        {/* closing state */}
        <div
          data-build-end
          className="absolute inset-x-0 top-[8svh] z-30 flex flex-col items-center px-6 text-center md:inset-x-auto md:left-[6vw] md:top-1/2 md:max-w-[34vw] md:-translate-y-1/2 md:items-start md:px-0 md:text-left"
        >
          <h2 className="type-title invisible text-[10vw] text-forest md:text-[min(4.6vw,66px)]">
            {build.end.title[0]}
            <span className="block text-leaf">{build.end.title[1]}</span>
          </h2>
          <div className="invisible mt-5">
            <ArrowButton href={site.orderHref} target="_blank" rel="noreferrer">
              Order yours
            </ArrowButton>
          </div>
        </div>

        {/* step rail */}
        <div className="absolute inset-x-5 bottom-4 z-40 md:inset-x-[28vw] md:bottom-6">
          <div className="relative flex justify-between">
            <span className="absolute inset-x-0 top-[5px] h-px bg-forest/15" aria-hidden="true" />
            <span
              data-build-rail-fill
              className="absolute inset-x-0 top-[5px] h-px origin-left bg-forest"
              aria-hidden="true"
            />
            {build.stages.map((s, i) => (
              <span key={s.key} data-build-step className="relative flex flex-col items-center gap-1 opacity-35">
                <span className="size-[11px] rounded-full border-2 border-pale bg-forest" />
                <span className="hidden text-base font-medium tracking-tight text-forest md:inline">
                  {pad(i + 1).slice(1)} {s.step}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
