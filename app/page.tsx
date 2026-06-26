"use client";

import Image from "next/image";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  ArrowUpRight,
  BadgeCheck,
  Bath,
  ChevronDown,
  Droplets,
  Flame,
  Gauge,
  Hammer,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  ThermometerSun,
  Wrench,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assets = (name: string) => `${basePath}/assets/${name}`;

const businessName = "Master Plumber Manchester Ltd";
const phone = "07512 413238";
const phoneHref = "tel:+447512413238";
const smsHref = "sms:+447512413238";
const facebookUrl = "https://www.facebook.com/p/Master-Plumber-Manchester-Ltd-100063506053442/";
const nextdoorUrl = "https://nextdoor.co.uk/pages/master-plumber-manchester-ltd-whitefieldmanchester-england/";
const address = "14 Albert Place, Manchester M45 8NE";
const mapsQuery = encodeURIComponent(`${businessName} ${address}`);
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const mapEmbedUrl = `https://maps.google.com/maps?ll=53.551407668410405,-2.2771464347110952&z=15&t=m&hl=en&q=${mapsQuery}&output=embed`;

const services = [
  {
    icon: Bath,
    title: "Bathroom refurbishments",
    body: "Full bathroom refits, shower areas, vanity units, radiators and finishing details handled as one tidy project.",
  },
  {
    icon: Flame,
    title: "Boiler installation",
    body: "Boiler installation and replacement work for Manchester homes, with clear discussion before the job starts.",
  },
  {
    icon: ThermometerSun,
    title: "Heating and radiators",
    body: "Heating upgrades, radiator changes, pipework and underfloor heating enquiries for practical, comfortable spaces.",
  },
  {
    icon: Wrench,
    title: "General plumbing",
    body: "Leaks, taps, kitchens, toilets and day-to-day plumbing issues sorted through one direct local phone number.",
  },
];

const work = [
  {
    src: "walk-in-shower.jpeg",
    alt: "Finished walk-in shower with grey wall tiles and black shower frame",
    title: "Walk-in shower finish",
  },
  {
    src: "bathroom-vanity-radiator.jpeg",
    alt: "Finished bathroom vanity with black towel radiator and grey tiles",
    title: "Vanity and heated rail",
  },
  {
    src: "finished-vanity.jpeg",
    alt: "Finished grey vanity unit, mirror and tiled wall in a bathroom refurb",
    title: "Modern bathroom fittings",
  },
];

const proofPoints = [
  "Manchester plumber listed publicly for plumbing, heating, renovations and bathroom refurb work.",
  "Direct mobile number shown consistently on the public business profile.",
  "Registered local company for plumbing, heat and air-conditioning installation work.",
  "Real bathroom project images available from the business activity feed.",
];

const faqs = [
  ["Can I call about a bathroom refurb?", "Yes. The public profiles list bathroom remodeling, plumbing, heating and renovation work."],
  ["Do they cover Whitefield and Manchester?", "The business is listed around Whitefield and Manchester, with a public Manchester contact number."],
  ["Can I send job details before calling?", "Yes. Use the enquiry form and it will prepare a text message to the verified mobile number."],
  ["Is an email available?", "I could not verify a public email, so the page uses phone and text enquiry routes only."],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "220px" });

  useEffect(() => {
    if (!ref.current || !inView) return;
    const controls = animate(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      className="group w-full rounded-xl border border-white/10 bg-white/[0.045] p-5 text-left transition hover:border-cyan-300/35 hover:bg-white/[0.075]"
      onClick={() => setOpen((current) => !current)}
      type="button"
    >
      <span className="flex items-center justify-between gap-4 text-base font-black text-white">
        {q}
        <ChevronDown className={`shrink-0 text-cyan-300 transition ${open ? "rotate-180" : ""}`} size={20} />
      </span>
      {open ? <span className="mt-4 block text-sm leading-7 text-white/64">{a}</span> : null}
    </button>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06z" />
    </svg>
  );
}

function EnquiryForm() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [service, setService] = useState("Bathroom refurb");
  const [details, setDetails] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = [
      `Hi Master Plumber Manchester, my name is ${name || "[name]"}.`,
      `I need help with: ${service}.`,
      `Area/address: ${area || "[area]"}.`,
      `Details: ${details || "[job details]"}`,
    ].join("\n");
    window.location.href = `${smsHref}?&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/12 bg-[#071014]/82 p-5 shadow-[0_32px_100px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-black uppercase text-cyan-200">Quick enquiry</p>
          <h2 className="text-2xl font-black leading-tight text-white">Text the job details</h2>
        </div>
        <MessageSquareText className="text-cyan-200" />
      </div>
      <div className="grid gap-3">
        <input value={name} onChange={(event) => setName(event.target.value)} className="min-h-12 rounded-xl border border-white/12 bg-white/8 px-4 text-sm font-bold text-white outline-none placeholder:text-white/38 focus:border-cyan-200" placeholder="Your name" />
        <input value={area} onChange={(event) => setArea(event.target.value)} className="min-h-12 rounded-xl border border-white/12 bg-white/8 px-4 text-sm font-bold text-white outline-none placeholder:text-white/38 focus:border-cyan-200" placeholder="Area or postcode" />
        <select value={service} onChange={(event) => setService(event.target.value)} className="min-h-12 rounded-xl border border-white/12 bg-[#102027] px-4 text-sm font-bold text-white outline-none focus:border-cyan-200">
          <option>Bathroom refurb</option>
          <option>Boiler installation</option>
          <option>Heating or radiator work</option>
          <option>Leak or plumbing repair</option>
          <option>Kitchen plumbing</option>
        </select>
        <textarea value={details} onChange={(event) => setDetails(event.target.value)} className="min-h-28 rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-white/38 focus:border-cyan-200" placeholder="What needs sorting?" />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button type="submit" variant="brass" className="min-h-12 rounded-xl bg-cyan-200 text-black hover:bg-white">
          <MessageSquareText size={18} />Text enquiry
        </Button>
        <a href={phoneHref}>
          <Button asChild variant="secondary" className="min-h-12 w-full rounded-xl border-white/15 bg-white/10 text-white hover:bg-white/16">
            <span><Phone size={18} />Call instead</span>
          </Button>
        </a>
      </div>
    </form>
  );
}

export default function Page() {
  const main = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -76]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, syncTouch: false });
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".gsap-rise", {
        y: 46,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 72%" },
      });
      gsap.from(".proof-line", {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: { trigger: ".why-section", start: "top 68%", end: "bottom 35%", scrub: true },
      });
    }, main);
    return () => ctx.revert();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: businessName,
    image: assets("walk-in-shower.jpeg"),
    telephone: "+447512413238",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14 Albert Place",
      addressLocality: "Manchester",
      postalCode: "M45 8NE",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 53.551407668410405, longitude: -2.2771464347110952 },
    areaServed: ["Manchester", "Whitefield", "Bury", "Prestwich", "Greater Manchester"],
    sameAs: [facebookUrl, nextdoorUrl],
    url: "https://deanooooooooo.github.io/master-plumber-manchester/",
  };

  return (
    <motion.main ref={main} className="min-h-screen overflow-hidden bg-[#061014] text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <motion.div style={{ y: glowY }} className="pointer-events-none fixed left-1/2 top-0 z-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061014]/78 px-4 py-3 backdrop-blur-2xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-200 text-black"><Droplets size={24} /></span>
            <span className="min-w-0">
              <strong className="block text-sm leading-none sm:text-base">{businessName}</strong>
              <small className="mt-1 block text-xs text-white/56">Manchester plumbing, heating and bathrooms</small>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold text-white/62 lg:flex">
            {["Services", "Proof", "Gallery", "FAQ", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-cyan-200">{item}</a>
            ))}
          </nav>
          <a href={phoneHref} aria-label="Call Master Plumber Manchester">
            <Button asChild variant="brass" className="min-h-11 rounded-xl bg-cyan-200 px-4 text-black shadow-[0_0_28px_rgba(103,232,249,0.24)] hover:bg-white">
              <span><Phone size={18} /><span className="hidden sm:inline">{phone}</span></span>
            </Button>
          </a>
        </div>
      </header>

      <section id="top" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(103,232,249,0.16),transparent_30%),linear-gradient(135deg,#061014_0%,#0c1b20_48%,#050809_100%)]" />
        <Image src={assets("walk-in-shower.jpeg")} alt="" fill priority sizes="100vw" className="object-cover opacity-16" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#061014]/62 to-[#061014]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_430px]">
          <motion.div style={{ y: heroY }} className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-black uppercase text-cyan-100 backdrop-blur-xl">
              <ShieldCheck size={15} /> Local plumbing, heating and bathroom work
            </div>
            <h1 className="text-5xl font-black leading-[0.92] tracking-normal sm:text-7xl lg:text-8xl">
              Plumber in Manchester for bathrooms, heating and repairs.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              Master Plumber Manchester Ltd handles bathroom refurbishments, boiler installation, heating, underfloor heating, kitchen plumbing and repair work across the Manchester area.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={phoneHref}>
                <Button asChild variant="brass" className="rounded-xl bg-cyan-200 text-black hover:bg-white">
                  <span><Phone size={19} />Call {phone}</span>
                </Button>
              </a>
              <a href="#gallery">
                <Button asChild variant="secondary" className="rounded-xl border-white/15 bg-white/10 text-white hover:bg-white/16">
                  <span><ArrowUpRight size={19} />View bathroom work</span>
                </Button>
              </a>
            </div>
          </motion.div>
          <EnquiryForm />
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-16 grid max-w-7xl gap-4 px-4 sm:px-8 md:grid-cols-3">
        {[
          [2020, "", "company incorporated"],
          [4, "", "main service lanes"],
          [3, "", "real project images used"],
        ].map(([value, suffix, label]) => (
          <Card key={String(label)} className="rounded-2xl border-white/12 bg-white/[0.075] text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <CardContent className="p-6">
              <strong className="block text-5xl font-black text-cyan-200"><Counter value={Number(value)} suffix={String(suffix)} /></strong>
              <span className="mt-3 block text-sm font-bold text-white/58">{label}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase text-cyan-200">Services</p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">Practical plumbing and refurbishment help for Manchester homes.</h2>
        </Reveal>
        <div className="services-grid mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} className="gsap-rise group min-h-[300px] rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl" whileHover={{ y: -10, rotateX: 3, rotateY: -3, scale: 1.02 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
                <div className="mb-10 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-200/25 bg-cyan-200/10 text-cyan-200 transition group-hover:bg-cyan-200 group-hover:text-black">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-black">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{service.body}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="proof" className="why-section relative bg-white/[0.035] px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr]">
          <Reveal>
            <p className="mb-3 text-xs font-black uppercase text-cyan-200">Local trust</p>
            <h2 className="text-4xl font-black leading-none sm:text-6xl">A direct local route for work that needs doing properly.</h2>
          </Reveal>
          <div className="space-y-5">
            {proofPoints.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-black/22 p-5 backdrop-blur-xl">
                  <div className="proof-line mb-4 h-px w-full bg-gradient-to-r from-cyan-200 to-lime-200" />
                  <p className="m-0 flex gap-3 text-lg font-black text-white/86"><BadgeCheck className="shrink-0 text-cyan-200" />{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-stage overflow-hidden bg-[#030708] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Reveal>
            <p className="mb-3 text-xs font-black uppercase text-cyan-200">Bathroom work</p>
            <h2 className="max-w-4xl text-4xl font-black leading-none sm:text-6xl">Real refurb images with the details customers look for.</h2>
          </Reveal>
        </div>
        <div className="gallery-track mt-12 flex w-[92rem] gap-4 px-4 sm:px-8">
          {work.map((item) => (
            <motion.figure key={item.src} className="relative h-[560px] w-[350px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:w-[420px]" whileHover={{ y: -10, scale: 1.018 }}>
              <Image src={assets(item.src)} alt={item.alt} fill sizes="420px" loading="eager" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/65 to-transparent p-5 text-sm font-black">{item.title}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="mb-3 text-xs font-black uppercase text-cyan-200">Bathroom refurbishments</p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">Clean finishes, practical layouts and heating details handled together.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            The visible work shows modern grey tile finishes, black fixtures, a walk-in shower screen, vanity storage and heated towel rail installation.
          </p>
        </Reveal>
        <Reveal className="relative min-h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055]">
          <Image src={assets("finished-vanity.jpeg")} alt="Finished bathroom vanity and tiled wall" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/12 bg-black/44 p-5 backdrop-blur-xl">
            <p className="mb-2 text-xs font-black uppercase text-cyan-200">Refurb detail</p>
            <p className="m-0 text-2xl font-black">Tiled walls, fitted vanity, black brassware and heated rail in one finished scheme.</p>
          </div>
        </Reveal>
      </section>

      <section id="faq" className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-8 lg:grid-cols-[0.72fr_1fr]">
        <Reveal>
          <p className="mb-3 text-xs font-black uppercase text-cyan-200">FAQ</p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">Useful answers before the call.</h2>
        </Reveal>
        <div className="space-y-3">{faqs.map(([q, a]) => <FAQItem key={q} q={q} a={a} />)}</div>
      </section>

      <section id="contact" className="relative px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <Card className="rounded-3xl border-white/10 bg-white/[0.075] text-white backdrop-blur-2xl">
            <CardContent className="p-7 lg:p-9">
              <p className="mb-3 text-xs font-black uppercase text-cyan-200">Contact</p>
              <h2 className="text-4xl font-black leading-none">Call or text for plumbing and bathroom work.</h2>
              <div className="mt-8 grid gap-4 text-sm font-bold text-white/68">
                <a className="flex gap-3 rounded-xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-200/40" href={phoneHref}>
                  <Phone className="shrink-0 text-cyan-200" size={19} /> {phone}
                </a>
                <a className="flex gap-3 rounded-xl border border-white/10 bg-black/24 p-4 transition hover:border-cyan-200/40" href={facebookUrl}>
                  <FacebookIcon /> Facebook profile
                </a>
                <span className="flex gap-3 rounded-xl border border-white/10 bg-black/24 p-4">
                  <Hammer className="shrink-0 text-cyan-200" size={19} /> Bathroom refurbishments, plumbing, heating, boilers and kitchens
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={phoneHref}><Button asChild variant="brass" className="rounded-xl bg-cyan-200 text-black hover:bg-white"><span><Phone size={18} />Call now</span></Button></a>
                <a href={smsHref}><Button asChild variant="secondary" className="rounded-xl border-white/15 bg-white/10 text-white hover:bg-white/16"><span><MessageSquareText size={18} />Text</span></Button></a>
              </div>
            </CardContent>
          </Card>
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#102027,#071014)] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="p-7 lg:p-9">
              <p className="mb-3 text-xs font-black uppercase text-cyan-200">Manchester base</p>
              <h3 className="max-w-2xl text-4xl font-black leading-none">{businessName}</h3>
              <div className="mt-7 grid gap-4 text-sm font-bold text-white/70">
                <span className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-4">
                  <MapPin className="shrink-0 text-cyan-200" size={19} />{address}
                </span>
                <span className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-4">
                  <Gauge className="shrink-0 text-cyan-200" size={19} />Whitefield and wider Manchester plumbing enquiries
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={mapsUrl}>
                  <Button asChild variant="secondary" className="rounded-xl border-white/15 bg-white/10 text-white hover:bg-white/16"><span><ArrowUpRight size={18} />Open directions</span></Button>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 bg-black/24 p-3">
              {work.map((item) => (
                <div key={item.src} className="relative h-40 overflow-hidden rounded-xl bg-black/30 sm:h-52">
                  <Image src={assets(item.src)} alt={item.alt} fill sizes="(min-width: 1024px) 18vw, 33vw" className="object-cover object-center" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-3xl border border-white/10 bg-white/[0.055] p-5 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="p-4">
            <p className="mb-3 text-xs font-black uppercase text-cyan-200">Plumber in Manchester and Whitefield</p>
            <h2 className="text-3xl font-black leading-tight">{businessName}, {address}</h2>
            <p className="mt-4 text-sm leading-7 text-white/64">
              Local plumbing, heating, bathroom refurbishment and boiler installation enquiries through the verified public phone number {phone}.
            </p>
          </div>
          <iframe title="Map to Master Plumber Manchester Ltd" src={mapEmbedUrl} width="100%" height="430" loading="lazy" className="min-h-[360px] rounded-2xl border-0" />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-4 py-8 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-200 text-black"><ShowerHead size={22} /></span>
            <span>
              <strong className="block font-black">{businessName}</strong>
              <small className="text-white/48">Plumbing, heating and bathrooms in Manchester</small>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { href: phoneHref, label: "Call Master Plumber Manchester", icon: <Phone size={19} /> },
              { href: smsHref, label: "Text Master Plumber Manchester", icon: <MessageSquareText size={19} /> },
              { href: facebookUrl, label: "Facebook", icon: <FacebookIcon /> },
              { href: nextdoorUrl, label: "Nextdoor", icon: <Sparkles size={19} /> },
              { href: mapsUrl, label: "Google Maps directions", icon: <MapPin size={19} /> },
            ].map((link) => (
              <a key={link.label} aria-label={link.label} href={link.href} className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] text-white/82 transition hover:border-cyan-200/45 hover:bg-cyan-200 hover:text-black">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </motion.main>
  );
}
