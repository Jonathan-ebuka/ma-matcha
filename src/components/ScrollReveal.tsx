"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
