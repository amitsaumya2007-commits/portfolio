"use client"

import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { featured, projects } from "@/lib/data"
import { Asterisk, Flower } from "@/components/decor/shapes"
import { Floaty } from "@/components/motion/primitives"
import { cn } from "@/lib/utils"

type Entry = { n: number; label: string; href: string; color: string; dark?: boolean }

const entries: Entry[] = [
  { n: 1, label: "ISS proximity alert", href: `#${featured.slug}`, color: "#121633", dark: true },
  ...projects.map((p, i) => ({
    n: i + 2,
    label: p.label,
    href: `#${p.slug}`,
    color: p.color,
    dark: p.darkBg,
  })),
  { n: 10, label: "Your idea here?", href: "#contact", color: "var(--lime)" },
]

function Bar({ e, i }: { e: Entry; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.05 }}
    >
      <a
        href={e.href}
        className={cn(
          "group relative flex h-16 items-center justify-between overflow-hidden rounded-sm pl-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--ink)] md:h-[4.75rem] md:pl-7",
          e.dark ? "text-paper" : "text-ink"
        )}
        style={{ background: e.color }}
      >
        <span className="flex items-center gap-2 text-base font-semibold md:text-lg">
          {e.label}
          <ArrowUpRight className="size-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
        <span
          aria-hidden
          className={cn(
            "relative h-full overflow-hidden pr-4 font-display text-[4.6rem] leading-[0.95] font-extrabold tracking-tighter md:pr-6 md:text-[5.75rem]",
            e.n === 10 ? "text-ink" : "text-white"
          )}
        >
          <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
            {e.n}
          </span>
          <span className="absolute top-full block text-ink/80 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
            {e.n}
          </span>
        </span>
      </a>
    </motion.li>
  )
}

export function Contents() {
  return (
    <section id="work" className="crumple relative overflow-hidden bg-paper py-24 md:py-32">
      <Floaty className="absolute top-20 left-[4%]" duration={8} spin={30}>
        <Flower className="size-16 blur-[1.5px] md:size-20" />
      </Floaty>
      <Floaty className="absolute top-14 right-[3%]" duration={9} spin={-30} delay={0.6}>
        <Asterisk className="size-20 blur-[3px] md:size-28" />
      </Floaty>
      <Floaty className="absolute right-[2%] bottom-24" duration={7} spin={20} delay={1.2}>
        <Flower className="size-12 blur-[1px]" />
      </Floaty>

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <p className="text-center font-mono text-xs tracking-[0.2em] text-ink/60 uppercase">{"// 02 · Selected work"}</p>
        <motion.h2
          className="sticker-text mt-3 text-center font-display text-6xl font-extrabold tracking-tight uppercase md:text-9xl"
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
        >
          Contents
        </motion.h2>

        <ol className="mt-14 grid gap-x-10 gap-y-4 md:mt-20 md:grid-cols-2 md:gap-y-5">
          {entries.map((e, i) => (
            <Bar key={e.n} e={e} i={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
