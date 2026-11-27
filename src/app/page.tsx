import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />

      <section className="flex min-h-svh items-center justify-center px-6">
        <ScrollReveal>
          <p className="font-display text-center text-4xl text-ink md:text-6xl">
            Your usual order says a lot.
          </p>
        </ScrollReveal>
      </section>
    </main>
  );
}
