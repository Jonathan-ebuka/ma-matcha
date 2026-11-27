import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Ma Matcha home" className={`flex flex-col items-center gap-1.5 text-ink ${className}`}>
      <span className="grid size-10 place-items-center rounded-full bg-ink md:size-12">
        <span className="font-display -rotate-6 text-[13px] leading-none text-background md:text-[15px]">
          MA
        </span>
      </span>
      <span className="font-display text-lg leading-none tracking-wide md:text-xl">MA MATCHA</span>
    </Link>
  );
}
