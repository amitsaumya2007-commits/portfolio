import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { featured } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Asterisk, Flower } from "@/components/decor/shapes"
import { Floaty, Reveal, SplitWords } from "@/components/motion/primitives"
import { TechGlyph } from "@/components/site/tech-icon"
import { TerminalLog, WhatsAppPing } from "./featured-widgets"

function Tile({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} y={20} className={`min-w-0 ${className}`}>
      {children}
    </Reveal>
  )
}

export function Featured() {
  return (
    <section id={featured.slug} className="crumple relative scroll-mt-8 bg-paper pt-6 pb-24 md:pb-32">
      <Floaty className="absolute top-0 right-[5%]" duration={8} spin={-30}>
        <Flower className="size-14 blur-[1px]" />
      </Floaty>

      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-ink/60 uppercase">
              01 · {featured.kind} · {featured.year}
            </p>
            <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight text-lilac-deep md:text-7xl">
              <SplitWords text="Project" />
            </h2>
          </div>
          <Button
            nativeButton={false}
            render={<a href={featured.repo} target="_blank" rel="noopener" />}
            className="h-11 rounded-full px-5 text-sm font-semibold"
          >
            <SiGithub /> View the code <ArrowUpRight />
          </Button>
        </div>

        {/* brand board */}
        <div className="relative mt-8 rounded-[1.75rem] bg-navy p-3 shadow-[0_30px_80px_-30px_rgb(18_22_51/0.7)] md:p-4">
          <Floaty className="absolute -top-10 -left-8 z-10" duration={9} spin={40}>
            <Asterisk className="size-20 blur-[2px] md:size-24" />
          </Floaty>

          <div className="grid gap-3 md:grid-cols-12 md:gap-4">
            {/* cover */}
            <Tile className="md:col-span-7 md:row-span-2">
              <div className="group relative h-full min-h-[16rem] overflow-hidden rounded-2xl bg-[#121633] ring-1 ring-white/10">
                <Image
                  src={featured.art}
                  alt="Illustration: the ISS orbiting above a location pin with a ±5° detection window"
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </Tile>

            {/* wordmark */}
            <Tile className="md:col-span-5" delay={0.08}>
              <div className="crumple relative flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-2xl bg-lime p-5 [--crumple-opacity:0.25] md:p-6">
                <p className="font-mono text-[0.65rem] tracking-widest uppercase">Real-time · Python</p>
                <p className="font-display text-5xl leading-[0.85] font-extrabold tracking-tighter md:text-6xl">
                  ISS<span className="text-lilac-deep">{"//"}</span>
                  <br />
                  ALERT
                </p>
                <p className="max-w-sm text-sm leading-snug">{featured.summary}</p>
                <Asterisk className="absolute -right-6 -bottom-6 size-28 opacity-90 motion-safe:animate-spin-slow" color="var(--navy)" />
              </div>
            </Tile>

            {/* whatsapp */}
            <Tile className="md:col-span-5" delay={0.14}>
              <WhatsAppPing />
            </Tile>

            {/* terminal */}
            <Tile className="md:col-span-7" delay={0.06}>
              <TerminalLog />
            </Tile>

            {/* stats */}
            <Tile className="md:col-span-5" delay={0.12}>
              <dl className="grid h-full grid-cols-2 gap-3">
                {featured.stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col justify-between rounded-2xl p-4 ${
                      ["bg-lilac text-ink", "bg-paper text-ink", "bg-paper text-ink", "bg-[#25D366] text-ink"][i]
                    }`}
                  >
                    <dt className="order-2 text-xs font-medium opacity-70">{s.label}</dt>
                    <dd className="order-1 font-display text-4xl font-extrabold tracking-tight md:text-5xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Tile>

            {/* palette */}
            <Tile className="md:col-span-4" delay={0.05}>
              <ul className="grid h-full gap-2 rounded-2xl bg-[#1b2047] p-3" aria-label="Colour palette">
                {featured.palette.map((c) => (
                  <li
                    key={c.hex}
                    className="flex items-center justify-between rounded-full px-4 py-2.5 font-mono text-xs ring-1 ring-white/15"
                    style={{
                      background: c.hex,
                      color: c.hex === "#121633" ? "var(--paper)" : "var(--ink)",
                    }}
                  >
                    <span>{c.name}</span>
                    <span>{c.hex}</span>
                  </li>
                ))}
              </ul>
            </Tile>

            {/* type specimens */}
            <Tile className="md:col-span-4" delay={0.1}>
              <div className="grid h-full gap-2 rounded-2xl bg-[#1b2047] p-3 text-paper">
                {[
                  { aa: "Aa", name: "Bricolage Grotesque", cls: "font-display font-extrabold" },
                  { aa: "Aa", name: "Geist Mono", cls: "font-mono" },
                  { aa: "Aa", name: "Caveat", cls: "font-hand" },
                ].map((f) => (
                  <div key={f.name} className="flex items-center gap-4 rounded-full bg-paper/95 px-4 py-2 text-ink">
                    <span className={`text-2xl leading-none ${f.cls}`}>{f.aa}</span>
                    <span className="h-6 w-px bg-ink/20" />
                    <span className="text-xs font-semibold tracking-wide uppercase">{f.name}</span>
                  </div>
                ))}
              </div>
            </Tile>

            {/* stack */}
            <Tile className="md:col-span-4" delay={0.15}>
              <div className="flex h-full flex-col justify-between gap-4 rounded-2xl bg-lilac p-4">
                <p className="font-mono text-[0.65rem] tracking-widest uppercase">Stack</p>
                <ul className="flex flex-wrap gap-2">
                  {featured.stack.map((s) => (
                    <li key={s} className="flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-xs font-semibold">
                      <TechGlyph name={s} className="size-3.5" iconOnly />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Tile>
          </div>
        </div>

        {/* write-up */}
        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {featured.bullets.map((b, i) => (
            <Reveal key={b.title} delay={(i % 2) * 0.1} className="flex gap-5">
              <span className="font-display text-5xl leading-none font-extrabold text-lilac">0{i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
