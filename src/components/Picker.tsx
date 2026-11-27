"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { drinks, picker, site, type DrinkKey } from "@/content/site";
import { ArrowButton, ArrowIcon, HandNote } from "@/components/ui";

const order: DrinkKey[] = ["berry", "tropics", "breakfast"];

/** "Chunky Flavour"-style picker: cup + its campaign card, with prev/next arrows. */
export default function Picker() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const busy = useRef(false);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(q("[data-pick-title]"), { type: "words,chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 100,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.03,
          scrollTrigger: { trigger: q("[data-pick-title]")[0], start: "top 85%" },
        });
        gsap.from(q("[data-pick-intro] > *"), {
          y: 24,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: q("[data-pick-intro]")[0], start: "top 85%" },
        });
        gsap.from(q("[data-pick-ring] circle"), {
          drawSVG: "0%",
          duration: 2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: q("[data-pick-ring]")[0], start: "top 80%" },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  function go(dir: 1 | -1) {
    if (busy.current) return;
    busy.current = true;
    const next = (index + dir + order.length) % order.length;
    const q = gsap.utils.selector(root);
    const out = gsap.timeline({
      defaults: { duration: 0.45, ease: "power2.in" },
      onComplete: () => {
        setIndex(next);
        requestAnimationFrame(() => {
          gsap
            .timeline({ defaults: { duration: 0.8, ease: "expo.out" }, onComplete: () => void (busy.current = false) })
            .fromTo(q("[data-pick-cup]"), { xPercent: dir * 60, rotation: dir * 25, autoAlpha: 0 }, { xPercent: 0, rotation: 0, autoAlpha: 1 })
            .fromTo(q("[data-pick-card]"), { rotation: dir * 30, scale: 0.7, autoAlpha: 0 }, { rotation: 0, scale: 1, autoAlpha: 1 }, 0.05)
            .fromTo(q("[data-pick-name] > *"), { yPercent: 100 }, { yPercent: 0, stagger: 0.05 }, 0.1);
        });
      },
    });
    out
      .to(q("[data-pick-cup]"), { xPercent: -dir * 60, rotation: -dir * 25, autoAlpha: 0 })
      .to(q("[data-pick-card]"), { rotation: -dir * 30, scale: 0.7, autoAlpha: 0 }, 0)
      .to(q("[data-pick-name] > *"), { yPercent: -100 }, 0);
  }

  const d = drinks[order[index]];

  return (
    <section ref={root} id="menu" className="relative overflow-hidden bg-pale pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="px-6 text-center">
        <h2 data-pick-title className="type-title text-[18vw] text-forest md:text-[min(12vw,176px)]">
          {picker.title}
        </h2>
        <div data-pick-intro className="mx-auto max-w-[40rem]">
          <p className="type-title mt-2 text-[8vw] text-leaf md:text-[min(3vw,44px)]">{picker.subtitle}</p>
          <p className="mx-auto mt-4 max-w-[34ch] text-[5vw] font-medium leading-[1.1] tracking-tight text-forest md:text-[min(1.6vw,22px)]">
            {picker.body}
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-[1440px] items-center gap-6 px-6 md:mt-10 md:grid-cols-[1fr_auto_1fr] md:gap-0 md:px-10">
        {/* cup */}
        <div className="relative mx-auto w-[60vw] md:w-[min(24vw,340px)]">
          <HandNote lines={picker.note} arrow="down-right" className="absolute -left-[16vw] -top-6 text-[6vw] md:-left-[9vw] md:text-[min(2vw,28px)]" />
          <div data-pick-cup>
            <Image
              src={d.cutout.src}
              alt={`${d.name} smoothie`}
              width={d.cutout.width}
              height={d.cutout.height}
              sizes="(min-width: 768px) 340px, 60vw"
              className="h-auto w-full -rotate-6 drop-shadow-[0_40px_40px_rgba(35,72,33,0.28)]"
            />
          </div>
        </div>

        {/* centre label */}
        <div className="order-last flex flex-col items-center text-center md:order-none md:self-end md:pb-6">
          <span className="text-5xl font-light text-white md:text-[min(7vw,100px)] md:leading-none" aria-hidden="true">
            +
          </span>
          <p className="mt-4 text-lg font-medium text-leaf md:mt-10">If you order…</p>
          <h3 data-pick-name className="type-display mt-2 overflow-hidden text-[12vw] text-forest md:text-[min(3.4vw,50px)]">
            <span className="block">{d.name}</span>
          </h3>
          <p className="mt-2 max-w-[28ch] text-lg font-medium leading-tight tracking-tight text-forest/80">{d.toppings}</p>
          <div className="mt-6">
            <ArrowButton href={site.orderHref} target="_blank" rel="noreferrer">
              Order now
            </ArrowButton>
          </div>
        </div>

        {/* card in ring */}
        <div className="relative mx-auto grid w-[86vw] place-items-center md:w-[min(36vw,520px)]">
          <svg data-pick-ring viewBox="0 0 100 100" className="absolute inset-[-12%] h-[124%] w-[124%]" aria-hidden="true">
            <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="2.6" transform="rotate(-90 50 50)" />
          </svg>
          <figure data-pick-card className="relative w-[64%] rotate-[6deg] overflow-hidden rounded-md bg-white p-1.5 shadow-[0_30px_60px_-20px_rgba(35,72,33,0.4)]">
            <Image src={d.slide} alt={`${d.name}: ${d.tagline}`} width={1170} height={1458} sizes="(min-width: 768px) 340px, 56vw" className="h-auto w-full rounded-sm" />
          </figure>
          <div className="absolute -bottom-6 right-0 flex gap-2 md:bottom-[2%] md:right-[-4%]">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous smoothie"
              className="grid size-12 place-items-center rounded-full bg-white text-forest shadow-sm transition-transform hover:scale-110 md:size-16"
            >
              <ArrowIcon className="w-4 -rotate-[135deg]" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next smoothie"
              className="grid size-12 place-items-center rounded-full bg-white text-forest shadow-sm transition-transform hover:scale-110 md:size-16"
            >
              <ArrowIcon className="w-4 rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
