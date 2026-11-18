"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { ArrowDown } from "lucide-react"
import { profile } from "@/lib/data"
import { Asterisk, DoodleArrow, Flower } from "@/components/decor/shapes"
import { TornEdge } from "@/components/decor/torn-edge"
import { Floaty, useFinePointer } from "@/components/motion/primitives"

// size, vertical offset (em) and tilt per letter — the jumbled cut-out-letters look
const LETTERS = [
  { ch: "P", s: 1, y: 0.04, r: -5 },
  { ch: "o", s: 0.64, y: 0.3, r: 8 },
  { ch: "R", s: 0.82, y: -0.1, r: -4 },
  { ch: "t", s: 1.06, y: -0.24, r: 3 },
  { ch: "f", s: 0.92, y: -0.15, r: -7 },
  { ch: "o", s: 0.7, y: 0.14, r: 5 },
  { ch: "L", s: 0.84, y: 0.1, r: -3 },
  { ch: "i", s: 0.9, y: -0.06, r: 5 },
  { ch: "o", s: 0.74, y: 0.12, r: -6 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const lettersY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06])

  return (
    <section
      ref={ref}
      id="top"
      className="crumple relative flex min-h-[100svh] flex-col overflow-hidden bg-paper pt-28 md:pt-40"
    >
      <h1 className="sr-only">
        {profile.name}, {profile.role}: {profile.tagline.join(", ")}. Portfolio 2026.
      </h1>

      {/* background decor */}
      <Floaty className="absolute top-[16%] left-[3%] z-0" duration={9} spin={25}>
        <Asterisk className="size-16 blur-[3px] md:size-28" />
      </Floaty>
      <Floaty className="absolute top-[12%] right-[9%] z-0" duration={8} spin={-30} delay={1}>
        <Asterisk className="size-10 blur-[2px] md:size-16" />
      </Floaty>
      <Floaty className="absolute top-[47%] -right-6 z-30" duration={10} spin={40} delay={0.5}>
        <Asterisk className="size-20 blur-[4px] md:size-28" />
      </Floaty>

      {/* PORTFOLIO letters */}
      <motion.div style={{ y: lettersY }} className="relative z-10 mx-auto w-full max-w-7xl px-3">
        <div
          aria-hidden
          className="relative flex items-center justify-center font-display leading-[0.78] font-extrabold tracking-[-0.06em] text-ink select-none [--hero:clamp(4.1rem,19.5vw,17rem)]"
          style={{ fontSize: "var(--hero)" }}
        >
          {LETTERS.map((l, i) => (
            <span
              key={i}
              className="relative inline-block"
              style={{
                fontSize: `${l.s}em`,
                transform: `translateY(${l.y}em) rotate(${l.r}deg)`,
                marginInline: "-0.015em",
              }}
            >
              <motion.span
                className="inline-block will-change-transform"
                style={{ cursor: fine ? "grab" : undefined, touchAction: fine ? "none" : "auto" }}
                initial={{ y: -520, rotate: (i % 2 ? 1 : -1) * 40, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 13, mass: 0.9, delay: 0.15 + i * 0.07 }}
                whileHover={{ y: -14, rotate: i % 2 ? 8 : -8, color: "#7a5cf0" }}
                drag={fine}
                dragSnapToOrigin
                dragElastic={0.9}
                dragTransition={{ bounceStiffness: 320, bounceDamping: 11 }}
                whileDrag={{ scale: 1.12, cursor: "grabbing" }}
              >
                {l.ch}
              </motion.span>
            </span>
          ))}

          <motion.span
            className="sticker-text absolute -top-[0.12em] right-[2%] font-display text-[0.26em] tracking-tight md:right-[4%]"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: -10 }}
            transition={{ type: "spring", stiffness: 260, damping: 12, delay: 1 }}
          >
            ’26
          </motion.span>
        </div>

        {fine && (
          <motion.div
            className="pointer-events-none absolute -top-12 left-[5%] hidden items-start gap-1 font-hand text-2xl text-lilac-deep lg:flex"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <span className="-rotate-6">psst… the letters are draggable</span>
            <DoodleArrow className="mt-3 w-14 rotate-12" />
          </motion.div>
        )}
      </motion.div>

      {/* name + disciplines */}
      <div className="relative z-30 mx-auto mt-6 flex w-full max-w-7xl items-start justify-between gap-6 px-5 md:mt-10 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <p className="font-display text-base leading-tight font-extrabold tracking-tight uppercase md:text-2xl">
            Saumya
            <br />
            Pathak
          </p>
          <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-ink/60 uppercase md:text-xs">
            {profile.role}
          </p>
        </motion.div>
        <motion.ul
          className="text-right text-sm leading-snug font-medium md:text-lg"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}
        >
          {profile.tagline.map((t) => (
            <motion.li
              key={t}
              variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
            >
              {t}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="min-h-[40svh] flex-1 md:min-h-[34svh]" />

      {/* torn lime band */}
      <div className="crumple absolute inset-x-0 bottom-0 z-0 h-[27%] bg-lime [--crumple-opacity:0.25] md:h-[30%]">
        <TornEdge side="top" color="var(--lime)" seed={3} />
        <Floaty className="absolute -bottom-6 -left-8" duration={8} spin={30}>
          <Asterisk className="size-28 blur-[3px] md:size-40" />
        </Floaty>
        <Floaty className="absolute right-[10%] bottom-[30%] hidden md:block" duration={7} spin={-25} delay={0.8}>
          <Asterisk className="size-20 blur-[2px]" />
        </Floaty>
        <Floaty className="absolute top-[18%] left-[18%] hidden md:block" duration={9} spin={20} delay={0.3}>
          <Flower className="size-12" color="#fbf8ee" />
        </Floaty>
      </div>

      {/* cut-out photo */}
      <motion.div
        style={{ y: photoY, scale: photoScale }}
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[150vw] max-w-none -translate-x-1/2 origin-bottom sm:w-[88vw] md:w-[min(64vw,calc(76svh*1.165))]"
      >
        <motion.div
          initial={{ y: 160, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.55 }}
        >
          <Image
            src="/me-cutout.png"
            alt="Portrait of Saumya Pathak"
            width={1086}
            height={932}
            preload
            sizes="(max-width: 640px) 150vw, (max-width: 768px) 88vw, 64vw"
            className="h-auto w-full drop-shadow-[0_18px_30px_rgb(20_20_20/0.25)]"
          />
        </motion.div>
      </motion.div>

      {/* footer row on the band */}
      <div className="relative z-30 mx-auto flex w-full max-w-7xl items-end justify-between px-4 pb-4 md:px-10 md:pb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[0.65rem] tracking-wide uppercase shadow-sm md:text-xs">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {profile.status}
        </span>
        <a
          href="#about"
          className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 font-mono text-[0.65rem] tracking-wide text-paper uppercase md:text-xs"
        >
          Scroll
          <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5 motion-safe:animate-bounce" />
        </a>
      </div>
    </section>
  )
}
