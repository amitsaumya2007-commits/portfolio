"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { toast } from "sonner"
import { ArrowUp, ArrowUpRight, Copy, FileText, Mail } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { FaLinkedinIn } from "react-icons/fa6"
import { profile } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { TornEdge } from "@/components/decor/torn-edge"
import { Asterisk, DoodleArrow, Flower } from "@/components/decor/shapes"
import { Floaty, Reveal, useFinePointer } from "@/components/motion/primitives"

const WORD = [
  { ch: "L", r: -6, y: 0.04 },
  { ch: "e", r: 5, y: 0.16 },
  { ch: "t", r: -3, y: -0.1 },
  { ch: "’", r: 0, y: -0.2 },
  { ch: "s", r: 7, y: 0.12 },
  { ch: " ", r: 0, y: 0 },
  { ch: "T", r: -4, y: -0.08 },
  { ch: "a", r: 6, y: 0.14 },
  { ch: "l", r: -5, y: -0.04 },
  { ch: "k", r: 4, y: 0.06 },
]

export function Contact() {
  const fine = useFinePointer()

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      toast.success("Email copied, talk soon!", { description: profile.email })
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative bg-ink text-paper">
      <TornEdge side="top" color="var(--ink)" fiber="#2a2a2a" seed={91} />
      <Floaty className="absolute top-16 left-[6%]" duration={9} spin={30}>
        <Asterisk className="size-16 blur-[2px] md:size-24" />
      </Floaty>
      <Floaty className="absolute top-[38%] right-[4%]" duration={8} spin={-25} delay={0.6}>
        <Flower className="size-12 blur-[1px] md:size-16" />
      </Floaty>

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-10 md:px-10 md:pt-28">
        <p className="text-center font-mono text-xs tracking-[0.2em] text-paper/50 uppercase">{"// 04 · Contact"}</p>

        <h2 className="sr-only">Let’s talk</h2>
        <div
          aria-hidden
          className="mt-6 flex flex-wrap items-center justify-center font-display text-[clamp(4.5rem,15vw,13rem)] leading-[0.85] font-extrabold tracking-[-0.05em] text-lime select-none"
        >
          {WORD.map((l, i) =>
            l.ch === " " ? (
              <span key={i} className="w-[0.25em]" />
            ) : (
              <span key={i} className="inline-block" style={{ transform: `translateY(${l.y}em) rotate(${l.r}deg)` }}>
                <motion.span
                  className="inline-block"
                  initial={{ y: 120, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 150, damping: 12, delay: i * 0.05 }}
                  whileHover={{ y: -12, color: "#a68bf7" }}
                  drag={fine}
                  dragSnapToOrigin
                  dragElastic={0.9}
                  style={{ cursor: fine ? "grab" : undefined }}
                >
                  {l.ch}
                </motion.span>
              </span>
            )
          )}
        </div>

        <div className="relative mt-14 grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-8">
          <Reveal>
            <p className="max-w-xl text-xl leading-relaxed text-paper/85 md:text-2xl">
              Got an API that needs babysitting, a workflow begging to be automated, or an agent idea? My inbox is open.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                onClick={copyEmail}
                className="h-auto rounded-full bg-lime px-5 py-3 text-base font-semibold text-ink hover:bg-lime-deep"
              >
                <Copy className="size-4" />
                {profile.email}
              </Button>
              <Button
                nativeButton={false}
                render={<a href={`mailto:${profile.email}`} />}
                variant="outline"
                className="h-auto rounded-full border-paper/25 bg-transparent px-5 py-3 text-base text-paper hover:bg-paper hover:text-ink"
              >
                <Mail className="size-4" /> Write to me
              </Button>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {[
                { href: profile.github, label: "GitHub", icon: SiGithub },
                { href: profile.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
                { href: profile.resume, label: "Resume (PDF)", icon: FileText },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-lilac hover:text-ink"
                  >
                    <l.icon className="size-4" />
                    {l.label}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <motion.div
            className="relative mx-auto w-56 md:mr-8 md:w-72"
            initial={{ rotate: 18, scale: 0.6, opacity: 0 }}
            whileInView={{ rotate: 6, scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 120, damping: 11 }}
            whileHover={{ rotate: -4, scale: 1.05 }}
          >
            <Image src="/me-sticker.png" alt="Sticker of Saumya" width={679} height={700} sizes="288px" />
            <div className="pointer-events-none absolute top-[38%] -left-20 hidden items-start gap-1 font-hand text-3xl text-lime md:-left-32 md:flex">
              <span className="-rotate-12">say hi!</span>
              <DoodleArrow className="mt-5 w-12 -rotate-[30deg] text-lime" />
            </div>
          </motion.div>
        </div>

        <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-6 font-mono text-xs text-paper/50 md:flex-row">
          <p>© 2026 {profile.name}</p>
          <p>Built with Next.js, shadcn/ui, Motion &amp; Lenis</p>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-lime">
            Back to top <ArrowUp className="size-3.5" />
          </a>
        </footer>
      </div>
    </section>
  )
}
