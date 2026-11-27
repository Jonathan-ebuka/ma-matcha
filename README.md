# Ma Matcha

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## GSAP

Import from `@/lib/gsap` (registers `ScrollTrigger` and `useGSAP` once):

```tsx
"use client";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
```

See `src/components/ScrollReveal.tsx` for an example.
