"use client"

import { motion } from "motion/react"
import { skillGroups, equations } from "@/lib/data"
import { TornEdge } from "@/components/decor/torn-edge"
import { Asterisk, Flower, Tape } from "@/components/decor/shapes"
import { Floaty, Reveal, SplitWords } from "@/components/motion/primitives"
import { TechGlyph } from "@/components/site/tech-icon"

function Logo({ name, i }: { name: string; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 220, damping: 18, delay: i * 0.035 }}
      whileHover={{ y: -6, rotate: i % 2 ? 4 : -4 }}
      className="flex flex-col items-center gap-2"
    >
      <span className="paper-shadow grid size-16 place-items-center rounded-2xl bg-card md:size-[4.5rem]">
        <TechGlyph name={name} className="size-8 md:size-9" />
      </span>
      <span className="text-center text-xs font-medium text-ink/75">{name}</span>
    </motion.li>
  )
}

function Equation({ e, i }: { e: (typeof equations)[number]; i: number }) {
  const rot = [-2.5, 1.8, -1.2, 2.4][i % 4]
  return (
    <motion.li
      initial={{ opacity: 0, y: 60, rotate: rot * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 90, damping: 14, delay: i * 0.1 }}
      whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
      className="relative"
    >
      <Tape className="-top-3 left-1/2 z-10 -translate-x-1/2 rotate-[-4deg]" />
      <div className="flex flex-col items-center gap-2 rounded-t-xl bg-gradient-to-b from-[#fbf9f2] to-[#f1f4c9] px-4 pt-8 pb-6 text-center">
        <TechGlyph name={e.a} className="size-9" />
        <span className="text-xs font-semibold">{e.a}</span>
        <span className="font-display text-2xl leading-none font-extrabold text-ink/40">+</span>
        <TechGlyph name={e.b} className="size-9" />
        <span className="text-xs font-semibold">{e.b}</span>
        <span className="font-display text-2xl leading-none font-extrabold text-ink/40">=</span>
        <span className="font-display text-xl leading-tight font-extrabold tracking-tight text-lilac-deep">{e.result}</span>
      </div>
      {/* polaroid foot */}
      <div className="paper-shadow rounded-b-xl bg-white p-2.5 pb-3">
        <div className="grid h-16 place-items-center rounded-md bg-ink">
          <span className="font-mono text-[0.7rem] text-lime">
            <span className="text-paper/50">$</span> {e.result.toLowerCase().replaceAll(" ", "-")}
          </span>
        </div>
        <p className="mt-2 text-center font-hand text-lg leading-none text-ink/70">{e.note}</p>
      </div>
    </motion.li>
  )
}

export function Toolbox() {
  let k = 0
  return (
    <section id="toolbox" className="relative">
      <div className="crumple relative bg-paper pt-24 pb-24 md:pt-32 md:pb-32">
        <Floaty className="absolute top-16 right-[4%]" duration={8} spin={-35}>
          <Asterisk className="size-20 blur-[3px] md:size-28" />
        </Floaty>
        <Floaty className="absolute bottom-24 left-[3%]" duration={9} spin={25} delay={0.5}>
          <Flower className="size-14 blur-[1px]" />
        </Floaty>

        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <p className="font-mono text-xs tracking-[0.2em] text-ink/60 uppercase">{"// 03 · Skills"}</p>
          <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight text-lilac-deep md:text-7xl">
            <SplitWords text="Toolbox" />
          </h2>

          <div className="mt-14 space-y-12">
            {skillGroups.map((g) => (
              <Reveal key={g.label} className="grid gap-6 md:grid-cols-[180px_1fr] md:items-start">
                <h3 className="flex items-center gap-3 font-display text-lg font-bold tracking-tight md:pt-5">
                  <span aria-hidden className="h-0.5 w-6 bg-ink" />
                  {g.label}
                </h3>
                <ul className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 md:grid-cols-7">
                  {g.items.map((name) => (
                    <Logo key={name} name={name} i={k++} />
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="crumple relative bg-lime pt-16 pb-24 [--crumple-opacity:0.28] md:pt-20 md:pb-28">
        <TornEdge side="top" color="var(--lime)" seed={58} />
        <Floaty className="absolute top-[30%] -left-8" duration={8} spin={30}>
          <Asterisk className="size-24 blur-[3px] md:size-32" />
        </Floaty>
        <Floaty className="absolute right-[2%] bottom-10" duration={9} spin={-30} delay={0.7}>
          <Asterisk className="size-16 blur-[2px]" />
        </Floaty>
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Things I put <span className="font-hand text-[1.2em] font-bold text-lilac-deep">together</span>
            </h3>
            <p className="max-w-xs text-sm text-ink/70">Two tools in, one useful thing out.</p>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
            {equations.map((e, i) => (
              <Equation key={e.result} e={e} i={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
