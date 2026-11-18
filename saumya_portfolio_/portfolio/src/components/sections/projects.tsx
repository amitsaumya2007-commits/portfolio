"use client"

import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { projects, type Project } from "@/lib/data"
import { Asterisk, Tape } from "@/components/decor/shapes"
import { Floaty, SplitWords, useFinePointer } from "@/components/motion/primitives"
import { TechGlyph } from "@/components/site/tech-icon"

const tilts = [-1.6, 1.2, -0.8, 1.8, -1.4, 0.9, -1.1, 1.5]

function Card({ p, i }: { p: Project; i: number }) {
  const fine = useFinePointer()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 200, damping: 18 })
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"])
  const glare = useTransform(glareX, (x) => `radial-gradient(circle at ${x} 0%, rgb(255 255 255 / 0.35), transparent 60%)`)

  return (
    <motion.li
      id={p.slug}
      className="scroll-mt-28 [perspective:1100px]"
      initial={{ opacity: 0, y: 50, rotate: tilts[i % tilts.length] * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay: (i % 3) * 0.08 }}
    >
      <motion.article
        className="group paper-shadow relative flex h-full flex-col rounded-2xl bg-card p-3 [transform-style:preserve-3d]"
        style={fine ? { rotateX: rx, rotateY: ry } : undefined}
        onPointerMove={(e) => {
          if (!fine) return
          const r = e.currentTarget.getBoundingClientRect()
          mx.set((e.clientX - r.left) / r.width)
          my.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          mx.set(0.5)
          my.set(0.5)
        }}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Tape className="-top-3 left-1/2 z-10 -translate-x-1/2" style={{ rotate: `${tilts[(i + 3) % tilts.length] * 2}deg` }} />

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl" style={{ background: p.color }}>
          <Image
            src={p.art}
            alt={`${p.title} illustration`}
            fill
            unoptimized
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {fine && <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glare }} />}
          <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[0.6rem] tracking-widest uppercase">
            {String(i + 2).padStart(2, "0")} · {p.kind}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
          <h3 className="font-display text-2xl font-extrabold tracking-tight">{p.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{p.blurb}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li key={s} className="flex items-center gap-1 rounded-full border border-ink/10 bg-paper px-2.5 py-1 text-[0.7rem] font-medium">
                <TechGlyph name={s} className="size-3" iconOnly />
                {s}
              </li>
            ))}
          </ul>
          <a
            href={p.repo}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper transition-colors after:absolute after:inset-0 after:rounded-2xl hover:bg-lilac-deep"
          >
            <SiGithub className="size-3.5" /> Source
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.article>
    </motion.li>
  )
}

export function Projects() {
  return (
    <section className="crumple relative bg-paper-deep/60 py-24 md:py-32">
      <Floaty className="absolute top-12 left-[2%]" duration={9} spin={35}>
        <Asterisk className="size-16 blur-[2px] md:size-24" />
      </Floaty>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-ink/60 uppercase">02 – 09 · Smaller builds</p>
            <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight text-lilac-deep md:text-7xl">
              <SplitWords text="Mini Projects" />
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink/70">
            The reps behind the bigger builds: scrapers, CLIs, networking tools and OOP drills. Every one is on GitHub.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
