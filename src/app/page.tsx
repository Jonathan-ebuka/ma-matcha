import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="flex min-h-screen items-center justify-center">
        <h1 className="text-6xl font-semibold tracking-tight">Ma Matcha</h1>
      </section>

      <section className="flex min-h-screen items-center justify-center">
        <ScrollReveal>
          <p className="text-2xl">GSAP + ScrollTrigger is wired up.</p>
        </ScrollReveal>
      </section>
    </main>
  );
}
