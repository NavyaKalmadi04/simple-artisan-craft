import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Compass,
  Wand2,
  Phone,
  MessageCircle,
  Plus,
  Minus,
  Heart,
  Zap,
  Users,
  GraduationCap,
  Send,
  Mail,
  Bot,
  Home,
  Briefcase,
  FolderOpen,
  HelpCircle,
  X,
} from "lucide-react";
import { BookingDialog, type BookingService } from "@/components/BookingDialog";
import zetacraftLogo from "@/assets/zetacraft-logo.png.asset.json";


const COMPANY_NAME = "Zetaacraft";
const COMPANY_SHORT = "Zetaacraft";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#projects", label: "Projects" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const MOBILE_NAV = [
  { href: "#", label: "Home", icon: Home },
  { href: "#services", label: "Services", icon: Briefcase },
  { href: "#projects", label: "Work", icon: FolderOpen },
  { href: "#faq", label: "FAQ", icon: HelpCircle },
  { href: "#contact", label: "Contact", icon: MessageCircle },
];

const PHONE_DISPLAY = "+91 84286 38871";
const PHONE_TEL = "+918428638871";
const WHATSAPP_NUMBER = "918428638871";

type ServiceKey =
  | "general"
  | "productDesign"
  | "websiteBuilding"
  | "aiFullstack"
  | "productStrategy"
  | "workshops";

const WHATSAPP_TEMPLATES: Record<ServiceKey, string> = {
  general:
    "Hi Zetaacraft! 👋 I'd like to book a session to discuss a product idea. Could you share the next available slot?",
  productDesign:
    "Hi Zetaacraft! 👋 I'm interested in your *Product Design* service. I'd love to discuss my product, target users and timeline. When can we connect?",
  websiteBuilding:
    "Hi Zetaacraft! 👋 I'd like to enquire about your *Website Building* service. I want a fast, simple website for my business and would love a quote.",
  aiFullstack:
    "Hi Zetaacraft! 👋 I'd like to enquire about your *AI Full-stack Apps* service. I have an idea that needs AI + a full product around it — can we discuss?",
  productStrategy:
    "Hi Zetaacraft! 👋 I'd like to enquire about your *Product Strategy* service. I need help with roadmap, scope and the right next step for my product.",
  workshops:
    "Hi Zetaacraft! 👋 I'd like to book a *Workshop* for our college / event on product, design and AI full-stack. Please share formats, duration and pricing.",
};

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const WHATSAPP_URL = waLink(WHATSAPP_TEMPLATES.general);

const ROTATING_LINES = [
  "Booking two new projects this month",
  "Workshops booking for colleges Aug–Oct",
  "Open slots for AI full-stack builds",
  "Now shipping in 2-week sprints",
];


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zetaacraft — Simple products customers love" },
      {
        name: "description",
        content:
          "Zetaacraft builds user-friendly SaaS, websites and AI full-stack products for every kind of business — shipped at lighting speed.",
      },
      { property: "og:title", content: "Zetaacraft — Simple products customers love" },
      {
        property: "og:description",
        content:
          "We understand real customers, design optimal solutions and ship products people actually like — fast.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Team />
      <Projects />
      <FAQ />
      <Contact />
      <Footer />
      <ChatBot />
      <MobileTabBar />
    </main>
  );
}

function CalmWay() {
  const pillars = [
    {
      icon: Users,
      t: "Understand real customers",
      b: "We start with people, not features — interviews and observation until the real problem is sharp.",
    },
    {
      icon: Compass,
      t: "Optimal solution design",
      b: "PM-grade thinking that picks the smallest, sharpest thing that earns trust on day one.",
    },
    {
      icon: Heart,
      t: "Build products users love",
      b: "Calm, simple interfaces with the small details that make a product feel inevitable.",
    },
    {
      icon: Zap,
      t: "Ship at lighting speed",
      b: "Design and engineering in one room — short loops, visible progress, weekly shipping.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 pb-8 md:pt-32 md:pb-16">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">How we work</span>
      <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
        A calm way of working, <em className="text-muted-foreground">on purpose.</em>
      </h2>
      <p className="mt-6 max-w-xl text-muted-foreground">
        Four quiet principles guide every project — they're how we move fast without losing care.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <div key={p.t} className="rounded-3xl border border-border bg-card p-6">
            <p.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-lg">{p.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4 md:px-6 md:py-5">
        {/* Brand (left on desktop, hidden on mobile to keep header compact) */}
        <a href="#" className="hidden md:flex items-center gap-2 shrink-0">
          <img src={zetacraftLogo.url} alt="Zetacraft" className="h-9 w-auto object-contain" />
        </a>

        {/* Centered brand on mobile */}
        <a href="#" className="flex items-center gap-2 lg:hidden md:hidden">
          <img src={zetacraftLogo.url} alt="Zetacraft" className="h-8 w-auto object-contain" />
        </a>

        {/* Center: nav menu on desktop / brand name on mobile */}
        <div className="flex items-center justify-center min-w-0">
          <span className="sr-only">{COMPANY_SHORT} Solutions</span>
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border bg-card/70 px-2 py-1.5 text-sm text-muted-foreground backdrop-blur">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 origin-bottom transition-all duration-200 ease-out hover:scale-110 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground hover:shadow-md"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right CTA */}
        <a
          href="#contact"
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90 lg:inline-flex"
        >
          Book a session <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <span className="lg:hidden" />
      </div>
    </header>
  );
}


function MobileTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-primary/30 bg-primary text-primary-foreground/85 backdrop-blur lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {MOBILE_NAV.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] text-primary-foreground/75 transition-colors hover:text-primary-foreground"
            >
              <l.icon className="h-5 w-5" strokeWidth={1.6} />
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


function RotatingBadge() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING_LINES.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
      <span className="relative inline-block h-4 overflow-hidden">
        <span
          key={i}
          className="block animate-[fadeUp_400ms_ease-out]"
        >
          {ROTATING_LINES[i]}
        </span>
      </span>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </span>
  );
}

function BookCTA() {
  return (
    <a
      href="#contact"
      className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background transition-opacity hover:opacity-90"
    >
      <MessageCircle className="h-4 w-4" /> Book a session
    </a>
  );
}


function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-12 pb-20 md:px-6 md:pt-24 md:pb-36">
      <div className="absolute left-1/2 top-32 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blush/40 blur-3xl" />
      <div className="absolute right-10 top-48 -z-10 h-56 w-56 rounded-full bg-sage/30 blur-3xl" />

      <RotatingBadge />

      <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
        Simple products,
        <br />
        <em className="font-display italic text-muted-foreground">built around real customers</em>
        — shipped at lighting speed.
      </h1>

      <p className="mt-8 max-w-xl text-lg text-muted-foreground">
        We understand real customers, design the optimal solution and build products users actually
        like — for SaaS, websites and AI workflows across every kind of business.
      </p>

      <div className="mt-10">
        <BookCTA />
      </div>

      <dl className="mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-border pt-8">
        {[
          { k: "60+", v: "Products shipped" },
          { k: "2 wks", v: "Avg. to first launch" },
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
  const items = [
    "Bakeries",
    "Law firms",
    "Indie SaaS",
    "Studios",
    "Clinics",
    "Agencies",
    "Marketplaces",
    "Nonprofits",
  ];
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

function About() {
  const pillars = [
    {
      icon: Users,
      t: "Understand real customers",
      b: "We start with people, not features — talking to your users until the problem is clear.",
    },
    {
      icon: Compass,
      t: "Design the optimal solution",
      b: "PM-grade thinking that picks the smallest, sharpest thing that earns trust on day one.",
    },
    {
      icon: Heart,
      t: "Build products users like",
      b: "Calm, simple interfaces with the small details that make a product feel inevitable.",
    },
    {
      icon: Zap,
      t: "Ship at lighting speed",
      b: "Design and engineering in one room — short loops, visible progress, weekly shipping.",
    },
  ];
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">About</span>
          <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
            A small studio that builds
            <em className="text-muted-foreground"> simple software</em> for every kind of business.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Zetaacraft is a product studio led by designers and AI full-stack engineers. We help founders
            and teams turn complex problems into clear, user-friendly products — websites, SaaS,
            internal tools and AI workflows — without the usual agency drag.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.t}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <p.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-lg">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services: {
    icon: typeof Wand2;
    title: string;
    body: string;
    template: ServiceKey;
  }[] = [
    {
      icon: Wand2,
      title: "Product design",
      body: "Interfaces with care for tone, rhythm and the small details that make a product feel inevitable.",
      template: "productDesign",
    },
    {
      icon: Layers,
      title: "Website building",
      body: "Marketing sites that load fast, read well and convert — for any business type, edited by you.",
      template: "websiteBuilding",
    },
    {
      icon: Sparkles,
      title: "AI full-stack apps",
      body: "End-to-end apps with AI in the right places — never gimmicks, always useful workflows.",
      template: "aiFullstack",
    },
    {
      icon: Compass,
      title: "Product strategy",
      body: "PM-grade thinking: roadmap, scope, metrics. We help you pick the smallest right next thing.",
      template: "productStrategy",
    },
    {
      icon: GraduationCap,
      title: "Workshops for colleges & events",
      body: "Hands-on sessions on product thinking, design and AI full-stack — for colleges, hackathons and corporate events.",
      template: "workshops",
    },
  ];

  const serviceOptions: BookingService[] = services.map((s) => ({
    key: s.template,
    label: s.title,
    whatsappTemplate: WHATSAPP_TEMPLATES[s.template],
  }));
  const [bookingOpen, setBookingOpen] = useState(false);
  useEffect(() => {
    const open = () => setBookingOpen(true);
    window.addEventListener("open-booking", open);
    return () => window.removeEventListener("open-booking", open);
  }, []);

  return (
    <section id="services" className="bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Services</span>
            <h2 className="mt-4 max-w-xl font-display text-4xl tracking-tight md:text-5xl">
              Five ways we help <em className="text-muted-foreground">your business ship & grow.</em>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Design taste paired with full-stack engineering, so ideas move from sketch to shipped
            without handoffs going cold.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.title}
              className="group flex flex-col rounded-3xl border border-border bg-card p-8 transition-colors hover:bg-background"
            >
              <s.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 flex-1 text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Ready to start?{" "}
          <a href="#contact" className="font-medium text-foreground underline-offset-4 hover:underline">
            Book a session →
          </a>{" "}
          and pick the service from the form.
        </p>
      </div>

      <BookingDialog
        service={null}
        serviceOptions={serviceOptions}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </section>
  );
}


function Team() {
  const traits = ["Young", "Aspiring", "Driven", "Curious", "Hands-on", "Ship-first"];
  return (
    <section id="team" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Team</span>
      <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
        A tiny team — <em className="text-muted-foreground">young, aspiring, deeply driven.</em>
      </h2>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        We're a small group of designers and AI full-stack engineers who care about simple software.
        No account managers, no handoffs — the people who design and build are the people you talk
        to, every week and every decision. We're early in our journey, hungry to do excellent work,
        and we treat every project like our own.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {traits.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const items = [
    {
      tag: "SaaS · Scheduling",
      title: "Folio — a calendar for studios",
      meta: "Shipped in 3 weeks · 4.9★ from early users",
      tint: "bg-blush/40",
    },
    {
      tag: "Marketing site",
      title: "Petal & Pine — a florist online",
      meta: "+38% online orders in 30 days",
      tint: "bg-sage/40",
    },
    {
      tag: "AI workflow",
      title: "Drafts — quiet writing for PMs",
      meta: "Saves ~6 hours / PM / week",
      tint: "bg-accent/50",
    },
    {
      tag: "Internal tool",
      title: "Tally — ops dashboard for a clinic",
      meta: "Replaced 4 spreadsheets",
      tint: "bg-cream",
    },
    {
      tag: "SaaS · Marketplace",
      title: "Common — a hire board for makers",
      meta: "0 → 1,200 users in 8 weeks",
      tint: "bg-blush/30",
    },
    {
      tag: "Website",
      title: "Hearth Law — a friendly law firm",
      meta: "Triple the qualified leads",
      tint: "bg-sage/30",
    },
  ];
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="projects" className="bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Projects shipped
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
              A few things <em className="text-muted-foreground">we've shipped.</em>
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden text-sm text-muted-foreground hover:text-foreground md:inline"
          >
            Full case studies on request →
          </a>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((w, i) => (
            <article
              key={w.title}
              className={`group block ${!showAll && i >= 1 ? "hidden md:block" : ""}`}
            >
              <div
                className={`aspect-[4/5] overflow-hidden rounded-3xl border border-border ${w.tint} relative`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span className="rounded-full bg-background/80 px-3 py-1 text-xs backdrop-blur">
                    {w.tag}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl">{w.title}</h3>
              <p className="text-sm text-muted-foreground">{w.meta}</p>
            </article>
          ))}
        </div>

        {!showAll && (
          <div className="mt-8 flex justify-center md:hidden">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm transition-colors hover:bg-background"
            >
              See more projects <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FAQ() {
  const qa = [
    {
      q: "What kind of businesses do you work with?",
      a: "Founders, small teams and established businesses across every shape — SaaS, clinics, law firms, bakeries, studios, marketplaces. If your product needs to feel simple and human, we're a fit.",
    },
    {
      q: "How fast can you ship?",
      a: "Most first launches go live in 2–4 weeks. We work in short weekly loops so you see something real almost immediately — no months-long discovery decks.",
    },
    {
      q: "Do you only design, or do you build too?",
      a: "Both. We design AND build — websites, SaaS products and AI full-stack apps end-to-end. The same people own the work from sketch to shipped.",
    },
    {
      q: "How do projects start?",
      a: "Book a session on WhatsApp or call us. We'll have a relaxed 30-minute conversation, then send a short proposal within 48 hours.",
    },
    {
      q: "What does it cost?",
      a: "Small website projects start around the cost of a junior hire for a month; SaaS builds are scoped to a fixed monthly engagement. We'll quote clearly after the first call.",
    },
    {
      q: "Do you keep working with us after launch?",
      a: "Yes — most clients stay on a light monthly engagement for iteration, AI features and growth experiments.",
    },
  ];
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">FAQ</span>
          <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
            Questions, <em className="text-muted-foreground">answered.</em>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Still curious? Send a note on WhatsApp — we usually reply the same day.
          </p>
        </div>
        <div>
          <div className="divide-y divide-border border-y border-border">
            {qa.map((item, i) => (
              <div key={item.q} className={!showAll && i >= 1 ? "hidden md:block" : ""}>
                <FAQItem {...item} defaultOpen={i === 0} />
              </div>
            ))}
          </div>
          {!showAll && (
            <div className="mt-6 flex justify-center md:hidden">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm transition-colors hover:bg-background"
              >
                See more questions <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  q,
  a,
  defaultOpen,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg md:text-xl">{q}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors ${
            open
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground"
          }`}
          aria-hidden
        >
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>

      </button>
      {open && <p className="pb-6 pr-10 text-muted-foreground">{a}</p>}
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-24 scroll-mt-24 md:pb-32 md:scroll-mt-32">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-16 text-primary-foreground md:px-16 md:py-24">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blush/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-sage/20 blur-3xl" />
        <div className="relative z-10">
          <p className="font-display text-sm italic opacity-70">Book a session</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-6xl">
            Tell us about the thing you wish existed.
          </h2>
          <p className="mt-6 max-w-lg opacity-80">
            A relaxed 30-minute call — no decks, no pressure. Just a real conversation about your
            product, your customers and the smallest next step.
          </p>

          <div className="mt-10">
            <ContactBookCTA />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBookCTA() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm text-foreground transition-opacity hover:opacity-90 sm:w-auto"
      >
        <Send className="h-4 w-4" /> Open enquiry form
      </button>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-background/30 px-5 py-3 text-sm text-primary-foreground transition-colors hover:bg-background/10 sm:w-auto"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-background/30 px-5 py-3 text-sm text-primary-foreground transition-colors hover:bg-background/10 sm:w-auto"
      >
        <Phone className="h-4 w-4" /> Call
      </a>
    </div>
  );
}


function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground">
        {/* Mobile: contacts row + logo on right */}
        <div className="flex items-center justify-between gap-3 md:hidden">
          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              aria-label="Call"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="mailto:Zetaacraft@gmail.com"
              aria-label="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <span className="font-display text-base leading-none">Z</span>
          </span>
        </div>
        <p className="mt-4 text-xs md:hidden">© {new Date().getFullYear()} {COMPANY_NAME}.</p>

        {/* Desktop */}
        <div className="hidden flex-col items-start justify-between gap-4 md:flex md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. Built simply, shipped quickly.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 hover:text-foreground">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a
              href="mailto:Zetaacraft@gmail.com"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="h-4 w-4" /> Zetaacraft@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


type ChatMsg = { from: "bot" | "user"; text: string; actions?: { label: string; href: string }[] };

const QUICK_PROMPTS = [
  "What services do you offer?",
  "How much does a website cost?",
  "Do you do workshops for colleges?",
  "How fast can you ship?",
  "How do I book a session?",
];

function botAnswer(input: string): ChatMsg {
  const q = input.toLowerCase();
  const book = { label: "Book a session", href: WHATSAPP_URL };

  if (/(workshop|college|event|hackathon|seminar|training)/.test(q)) {
    return {
      from: "bot",
      text: "Yes! We run hands-on workshops for colleges, hackathons and corporate events — on product thinking, design and AI full-stack. Typical formats: 2-hour talk, half-day, or full-day hands-on.",
      actions: [
        { label: "Book a session", href: waLink(WHATSAPP_TEMPLATES.workshops) },
        { label: "See services", href: "#services" },
      ],
    };
  }
  if (/(price|cost|pricing|charge|budget|how much)/.test(q)) {
    return {
      from: "bot",
      text: "Small websites start around the cost of a junior hire for a month. SaaS and AI apps are scoped as fixed monthly engagements. We send a clear quote after the first 30-min call.",
      actions: [book, { label: "See services", href: "#services" }],
    };
  }
  if (/(time|fast|speed|how long|duration|deadline|ship)/.test(q)) {
    return {
      from: "bot",
      text: "Most first launches go live in 2–4 weeks. We work in short weekly loops, so you see something real almost immediately.",
      actions: [book, { label: "See projects", href: "#projects" }],
    };
  }
  if (/(service|offer|do you|what.*build)/.test(q)) {
    return {
      from: "bot",
      text: "We offer 5 services: Product Design, Website Building, AI Full-stack Apps, Product Strategy, and Workshops for colleges & events.",
      actions: [{ label: "See services", href: "#services" }, book],
    };
  }
  if (/(ai|gpt|llm|chatbot|automation)/.test(q)) {
    return {
      from: "bot",
      text: "We build AI full-stack apps end-to-end — chatbots, internal copilots, automation workflows. AI is added only where it's genuinely useful, never as a gimmick.",
      actions: [
        { label: "Enquire about AI", href: waLink(WHATSAPP_TEMPLATES.aiFullstack) },
        { label: "See services", href: "#services" },
      ],
    };
  }
  if (/(website|landing|marketing site|web)/.test(q)) {
    return {
      from: "bot",
      text: "Yes — we build fast, beautiful marketing sites for any business type. You can edit content yourself after launch.",
      actions: [
        { label: "Enquire about Website", href: waLink(WHATSAPP_TEMPLATES.websiteBuilding) },
        { label: "See projects", href: "#projects" },
      ],
    };
  }
  if (/(design|ux|ui)/.test(q)) {
    return {
      from: "bot",
      text: "Product Design is our core craft — calm, simple interfaces that feel inevitable. We design AND build, so handoffs never go cold.",
      actions: [
        { label: "Enquire about Design", href: waLink(WHATSAPP_TEMPLATES.productDesign) },
        { label: "See services", href: "#services" },
      ],
    };
  }
  if (/(book|session|call|meet|contact|talk|reach|whatsapp|phone)/.test(q)) {
    return {
      from: "bot",
      text: `Easiest way: book a 30-min session on WhatsApp, or call ${PHONE_DISPLAY}.`,
      actions: [book, { label: `Call ${PHONE_DISPLAY}`, href: `tel:${PHONE_TEL}` }],
    };
  }
  if (/(team|who|people|founder)/.test(q)) {
    return {
      from: "bot",
      text: "We're a tiny team of young, driven designers and AI full-stack engineers. The people you talk to are the people who design and build your product.",
      actions: [{ label: "Meet the team", href: "#team" }, book],
    };
  }
  if (/(project|portfolio|work|case|example)/.test(q)) {
    return {
      from: "bot",
      text: "We've shipped 60+ products across SaaS, marketing sites, AI workflows and internal tools. Full case studies on request.",
      actions: [{ label: "See projects", href: "#projects" }, book],
    };
  }
  if (/(hi|hello|hey|namaste)/.test(q)) {
    return {
      from: "bot",
      text: "Hi there! I'm Zetaacraft's assistant. Ask me about services, pricing, workshops, or how to book a session.",
      actions: [
        { label: "See services", href: "#services" },
        { label: "See projects", href: "#projects" },
        book,
      ],
    };
  }
  return {
    from: "bot",
    text: "Good question! I'd love to get our team on it — the fastest way is a quick WhatsApp message.",
    actions: [book, { label: "See services", href: "#services" }],
  };
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      from: "bot",
      text: "Hi! I'm Zetaacraft's assistant 🌿 Ask me about our services, pricing, workshops, or how to book a session.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, botAnswer(t)]);
    }, 350);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-20 left-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105 lg:bottom-5 lg:left-auto lg:right-5"
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-36 left-4 right-4 z-50 flex max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl sm:right-auto md:bottom-24 md:left-auto md:right-5">

          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base leading-tight">Ask Zetaacraft</p>
              <p className="text-xs text-muted-foreground">Usually replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex max-h-[55vh] min-h-[280px] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "user" ? "self-end" : "self-start max-w-full"}>
                <div
                  className={
                    m.from === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                      : "max-w-[90%] rounded-2xl rounded-bl-md bg-secondary px-4 py-2 text-sm text-foreground"
                  }
                >
                  {m.text}
                </div>
                {m.actions && m.actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.actions.map((a) => (
                      <a
                        key={a.label}
                        href={a.href}
                        target={a.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer noopener"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:bg-secondary"
                      >
                        {a.label} <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {messages.length <= 1 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-card px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-foreground/40"
            />
            <button
              type="submit"
              aria-label="Send"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
