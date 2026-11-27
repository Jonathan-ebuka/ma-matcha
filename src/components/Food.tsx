"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { food, site } from "@/content/site";
import { ArrowButton, HandNote, Smiley } from "@/components/ui";

/**
 * "Food worth the trip": the section pins and the cards slide sideways as you scroll.
 * Falls back to a swipeable row when reduced motion is on.
 */
export default function Food() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const slide = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(q("[data-food-progress]"), {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        // each card's image drifts and tilts as it travels across
        q("[data-food-img]").forEach((img, i) => {
          gsap.fromTo(
            img,
            { xPercent: 8, rotation: i % 2 ? 4 : -4 },
            {
              xPercent: -8,
              rotation: i % 2 ? -3 : 3,
              ease: "none",
              scrollTrigger: { trigger: img, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
            },
          );
        });

        const split = SplitText.create(q("[data-food-title] > span"), { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 100,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="food" className="relative overflow-hidden bg-pale motion-reduce:overflow-x-auto">
      <div className="flex h-svh flex-col justify-center">
        <div ref={track} className="flex w-max items-center gap-4 pl-6 pr-[10vw] md:gap-6 md:pl-10">
          {/* intro panel */}
          <div className="flex w-[84vw] shrink-0 flex-col justify-center md:w-[min(34vw,500px)] md:pr-8">
            <HandNote lines={food.note} arrow="down" className="mb-4 text-[6vw] md:text-[min(2vw,28px)]" />
            <h2 data-food-title className="type-title text-[17vw] md:text-[min(7vw,104px)]">
              <span className="block text-forest">{food.title[0]}</span>
              <span className="block text-leaf">{food.title[1]}</span>
            </h2>
            <p className="mt-5 max-w-[24ch] text-[5vw] font-medium leading-[1.1] tracking-tight text-forest md:text-[min(1.6vw,22px)]">
              Matcha&apos;s best friends: comfort food from the Ma Matcha kitchen, to share or not.
            </p>
            <div className="mt-7">
              <ArrowButton href={site.orderHref} target="_blank" rel="noreferrer">
                Order food
              </ArrowButton>
            </div>
          </div>

          {food.items.map((f) => (
            <article
              key={f.name}
              className="relative flex h-[72svh] w-[80vw] shrink-0 flex-col overflow-hidden rounded-lg md:h-[76svh] md:w-[min(30vw,440px)]"
            >
              <div className={`relative flex-1 overflow-hidden rounded-lg ${f.cutout ? "bg-sage-deep/70" : "bg-forest"}`}>
                {f.cutout ? (
                  <>
                    <Smiley className="absolute left-5 top-5 size-14" />
                    <div data-food-img className="absolute inset-x-[6%] top-1/2 -translate-y-1/2">
                      <Image
                        src={f.image.src}
                        alt={f.name}
                        width={f.image.width}
                        height={f.image.height}
                        sizes="(min-width: 768px) 420px, 76vw"
                        className="h-auto w-full drop-shadow-[0_34px_34px_rgba(35,72,33,0.35)]"
                      />
                    </div>
                  </>
                ) : (
                  <div data-food-img className="absolute inset-[-8%]">
                    <Image src={f.image.src} alt={f.name} fill sizes="(min-width: 768px) 480px, 86vw" className="object-cover" />
                  </div>
                )}
              </div>
              <div className="pt-4">
                <h3 className="type-display text-[9vw] text-forest md:text-[min(2.6vw,38px)]">{f.name}</h3>
                <p className="mt-1 max-w-[30ch] text-[4.6vw] font-medium leading-tight tracking-tight text-forest/80 md:text-lg">{f.line}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-6 mt-6 h-[3px] overflow-hidden rounded-full bg-forest/10 md:mx-10" aria-hidden="true">
          <div data-food-progress className="h-full origin-left scale-x-0 rounded-full bg-forest" />
        </div>
      </div>
    </section>
  );
}
