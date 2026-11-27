import type { ComponentProps } from "react";

/* ------------------------------------------------------------------------ */
/* Arrow button: [↗][ Label ]  — on hover the arrow hops to the other side. */
/* ------------------------------------------------------------------------ */

type Tone = "forest" | "pale" | "white";

const tones: Record<Tone, { bubble: string; text: string }> = {
  forest: { bubble: "bg-forest", text: "text-cream" },
  pale: { bubble: "bg-cream", text: "text-forest" },
  white: { bubble: "bg-white", text: "text-forest" },
};

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" className={className} aria-hidden="true">
      <path d="M2 8 8 2M3.2 2H8v4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowButton({
  children,
  tone = "forest",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"a"> & { tone?: Tone; size?: "sm" | "md" | "lg" }) {
  const t = tones[tone];
  const h = { sm: "h-8 text-lg", md: "h-10 text-[22px]", lg: "h-12 text-[26px] md:h-14 md:text-3xl" }[size];
  const circle = { sm: "size-8", md: "size-10", lg: "size-12 md:size-14" }[size];
  const grow = { sm: "group-hover:w-8", md: "group-hover:w-10", lg: "group-hover:w-12 md:group-hover:w-14" }[size];
  const bubble = `grid shrink-0 place-items-center rounded-full ${t.bubble} ${t.text} transition-all duration-500 ease-[cubic-bezier(.65,0,.35,1)]`;

  return (
    <a className={`group inline-flex items-center ${h} ${className}`} {...props}>
      <span className={`${bubble} ${circle} group-hover:w-0 group-hover:scale-0`}>
        <ArrowIcon className="w-[34%]" />
      </span>
      <span
        className={`flex h-full items-center rounded-full px-[0.6em] font-medium leading-none tracking-tight ${t.bubble} ${t.text}`}
      >
        {children}
      </span>
      <span className={`${bubble} ${circle} w-0 scale-0 group-hover:scale-100 ${grow}`}>
        <ArrowIcon className="w-[34%]" />
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------------ */
/* Social icons                                                              */
/* ------------------------------------------------------------------------ */

export function SocialIcon({ name, className = "" }: { name: string; className?: string }) {
  if (name === "instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
      </svg>
    );
  if (name === "tiktok")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M14.6 3h3a4.6 4.6 0 0 0 3.4 3.6v3.1a7.6 7.6 0 0 1-3.4-1v6.2A6 6 0 1 1 11.6 9v3.2a2.9 2.9 0 1 0 3 2.9V3Z" />
      </svg>
    );
  if (name === "whatsapp")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M4 20.5 5.2 16A8.5 8.5 0 1 1 8.4 19.2L4 20.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 8.4c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .6-.4.8-.6.4-1.5.6-2.5.2a9 9 0 0 1-4.6-4.6c-.4-1-.2-1.9.1-2.6Z"
          fill="currentColor"
        />
      </svg>
    );
  return null;
}

export function SocialLinks({
  items,
  className = "",
  size = "size-10",
}: {
  items: readonly { name: string; href: string; icon: string }[];
  className?: string;
  size?: string;
}) {
  return (
    <ul className={`flex gap-1.5 ${className}`}>
      {items.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={s.name}
            className={`grid ${size} place-items-center rounded-full bg-cream text-forest transition-transform duration-300 hover:scale-110`}
          >
            <SocialIcon name={s.icon} className="w-[46%]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------------ */
/* Smiley badge (stroke is drawn in with DrawSVG)                            */
/* ------------------------------------------------------------------------ */

export function Smiley({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="currentColor" className="text-cream" />
      <g stroke="var(--color-leaf)" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <circle data-draw cx="32" cy="32" r="22" />
        <path data-draw d="M22.5 27.5c1-2 3.6-2 4.6 0" />
        <path data-draw d="M37 27.5c1-2 3.6-2 4.6 0" />
        <path data-draw d="M21 35c3 7.5 18 8.5 22 0" />
        <path data-draw d="M38 40.5c1.5 3 5 3 5.5-.5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Handwritten note + scribbled arrow                                        */
/* ------------------------------------------------------------------------ */

const arrows = {
  "down-right": "M6 6c-4 14 2 28 22 34m0 0-9-1.5M28 40l-3.5-8",
  down: "M30 4c-12 8-16 22-8 40m0 0-6-7m6 7 4-8",
  "down-left": "M40 6c4 14-2 28-22 34m0 0 9-1.5M18 40l3.5-8",
  "up-right": "M4 40C10 22 22 10 38 8m0 0-8-3m8 3-5 7",
} as const;

export function HandNote({
  lines,
  arrow,
  className = "",
  arrowClassName = "",
}: {
  lines: readonly string[];
  arrow?: keyof typeof arrows;
  className?: string;
  arrowClassName?: string;
}) {
  return (
    <div className={`pointer-events-none font-hand leading-[0.95] text-forest ${className}`} data-hand>
      {lines.map((l) => (
        <span key={l} className="block -rotate-6">
          {l}
        </span>
      ))}
      {arrow && (
        <svg viewBox="0 0 46 46" fill="none" className={`mt-1 w-10 ${arrowClassName}`} aria-hidden="true">
          <path data-draw d={arrows[arrow]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

/* Wavy underline used under paragraphs (drawn in on scroll). */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 14" fill="none" className={className} aria-hidden="true">
      <path
        data-draw
        d="M2 10c30-3 58-4 88-3 8 0 10-6 16-6 5 0 4 7 10 7 6 0 8-5 13-5 6 0 10 5 29 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Wordmark: two-line on small screens, one line from md up. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-[0.86] ${className}`}>
      <span className="block whitespace-nowrap md:mr-[0.22em] md:inline-block">MA</span>
      <span className="block whitespace-nowrap md:inline-block">MATCHA</span>
    </span>
  );
}
