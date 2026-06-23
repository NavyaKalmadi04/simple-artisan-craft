import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Layers, Compass, Wand2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maren Studio — Quiet software for ambitious teams" },
      {
        name: "description",
        content:
          "An independent studio designing and shipping SaaS, websites and product systems for businesses of every shape.",
      },
      { property: "og:title", content: "Maren Studio — Quiet software for ambitious teams" },
      {
        property: "og:description",
        content:
          "Product design, full-stack engineering and AI craft. We help founders turn complex problems into calm, user-friendly products.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Approach />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <a href="#" className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
          <span className="font-display text-lg leading-none">m</span>
        </span>
        <span className="font-display text-xl">Maren</span>
      </a>
      <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        <a href="#services" className="transition-colors hover:text-foreground">Services</a>
        <a href="#approach" className="transition-colors hover:text-foreground">Approach</a>
        <a href="#work" className="transition-colors hover:text-foreground">Work</a>
        <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
      </nav>
      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
      >
        Start a project <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-28 md:pt-24 md:pb-36">
      <div className="absolute left-1/2 top-32 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blush/40 blur-3xl" />
      <div className="absolute right-10 top-48 -z-10 h-56 w-56 rounded-full bg-sage/30 blur-3xl" />

      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-sage" />
        Taking on two projects for Q3
      </span>

      <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
        Quiet software,
        <br />
        <em className="font-display italic text-muted-foreground">crafted with care</em> for
        ambitious teams.
      </h1>

      <p className="mt-8 max-w-xl text-lg text-muted-foreground">
        We design and build SaaS products, marketing sites and AI workflows for businesses of every
        shape — turning complex problems into calm, user-friendly products people actually love.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background transition-opacity hover:opacity-90"
        >
          Book an intro call <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href="#work"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm transition-colors hover:bg-secondary"
        >
          See recent work
        </a>
      </div>

      <dl className="mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-border pt-8">
        {[
          { k: "60+", v: "Products shipped" },
          { k: "12 yrs", v: "Building software" },
          { k: "9/10", v: "Clients return" },
        ].map((s) => (
          <div key={s.v}>
            <dt className="font-display text-3xl">{s.k}</dt>
            <dd className="mt-1 text-sm text-muted-foreground">{s.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Marquee() {
  const items = ["Bakeries", "Law firms", "Indie SaaS", "Studios", "Clinics", "Agencies", "Marketplaces", "Nonprofits"];
  return (
    <section className="border-y border-border bg-cream/60 py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-6 text-sm text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Trusted across</span>
        {items.map((i) => (
          <span key={i} className="font-display italic">{i}</span>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Wand2,
      title: "Product design",
      body: "Interfaces with care for tone, rhythm and the small details that make a product feel inevitable.",
    },
    {
      icon: Layers,
      title: "Website building",
      body: "Marketing sites that load fast, read well and convert — designed for editors, not just designers.",
    },
    {
      icon: Sparkles,
      title: "AI full-stack",
      body: "End-to-end apps with thoughtful AI in the right places — never gimmicks, always useful workflows.",
    },
    {
      icon: Compass,
      title: "Product strategy",
      body: "PM-grade thinking: roadmap, scope, metrics. We help you pick the smallest right next thing.",
    },
  ];
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-xl font-display text-4xl tracking-tight md:text-5xl">
          One small studio. <em className="text-muted-foreground">Four ways</em> to help.
        </h2>
        <p className="max-w-sm text-muted-foreground">
          We pair design taste with full-stack engineering so ideas can move from sketch to shipped without
          handoffs going cold.
        </p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.title}
            className="group rounded-3xl border border-border bg-card p-8 transition-colors hover:bg-secondary"
          >
            <s.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
            <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
            <p className="mt-3 text-muted-foreground">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    { n: "01", t: "Listen", b: "A loose call. We learn the business, the people and the friction." },
    { n: "02", t: "Frame", b: "We narrow the problem and propose the smallest product that earns trust." },
    { n: "03", t: "Make", b: "Design and engineering happen together, in short, visible loops." },
    { n: "04", t: "Tend", b: "After launch we stay close — measuring, refining, telling the story." },
  ];
  return (
    <section id="approach" className="bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
          A calm way of working, <em className="text-muted-foreground">on purpose.</em>
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8">
              <span className="font-display text-sm text-muted-foreground">{s.n}</span>
              <h3 className="mt-8 font-display text-2xl">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const items = [
    { tag: "SaaS · Scheduling", title: "Folio — a calendar for studios", tint: "bg-blush/40" },
    { tag: "Marketing site", title: "Petal & Pine — a florist online", tint: "bg-sage/40" },
    { tag: "AI workflow", title: "Drafts — quiet writing for PMs", tint: "bg-accent/50" },
  ];
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl">Selected work</h2>
        <a href="#contact" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">
          Full case studies on request →
        </a>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((w) => (
          <a key={w.title} href="#" className="group block">
            <div className={`aspect-[4/5] overflow-hidden rounded-3xl border border-border ${w.tint} relative`}>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="rounded-full bg-background/80 px-3 py-1 text-xs backdrop-blur">{w.tag}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
            <h3 className="mt-4 font-display text-xl">{w.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-16 text-primary-foreground md:px-16 md:py-24">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blush/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-sage/20 blur-3xl" />
        <p className="font-display text-sm italic opacity-70">A note from us</p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-6xl">
          Tell us about the thing you wish existed.
        </h2>
        <p className="mt-6 max-w-lg opacity-80">
          We reply to every message, usually within a day. No discovery decks, no pressure — just a real
          conversation about your product.
        </p>
        <a
          href="mailto:hello@maren.studio"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm text-foreground transition-opacity hover:opacity-90"
        >
          hello@maren.studio <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Maren Studio. Made slowly, in small batches.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Twitter</a>
          <a href="#" className="hover:text-foreground">Are.na</a>
          <a href="#" className="hover:text-foreground">Read.cv</a>
        </div>
      </div>
    </footer>
  );
}
