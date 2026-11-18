"use client"

import Image from "next/image"
import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react"
import { profile } from "@/lib/data"

const STRAP = 150 // px from the anchor to the top of the card

function Barcode() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 1, 3]
  return (
    <svg viewBox="0 0 100 24" className="h-6 w-28" aria-hidden>
      {bars.reduce<{ x: number; els: React.ReactNode[] }>(
        (acc, w, i) => {
          if (i % 2 === 0) acc.els.push(<rect key={i} x={acc.x} y={0} width={w * 1.3} height={24} fill="var(--ink)" />)
          acc.x += w * 1.3 + 1
          return acc
        },
        { x: 0, els: [] }
      ).els}
    </svg>
  )
}

/** A draggable ID badge on a lanyard that springs back and swings. */
export function Lanyard() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const strapLength = useTransform(() => Math.hypot(x.get(), STRAP + y.get()))
  const strapAngle = useTransform(() => (Math.atan2(-x.get(), STRAP + y.get()) * 180) / Math.PI)
  const cardRotate = useTransform(x, [-220, 220], [-22, 22])

  const strapCls =
    "bg-lilac shadow-[inset_-3px_0_0_rgb(0_0_0/0.12)] [background-image:repeating-linear-gradient(180deg,transparent_0_18px,rgb(255_255_255/0.55)_18px_22px)]"

  return (
    <div className="relative mx-auto h-[630px] w-[290px]">
      {/* strap running up behind the marquee tape, as if pinned above */}
      <div aria-hidden className={`absolute bottom-full left-1/2 h-[130px] w-7 -translate-x-1/2 [mask-image:linear-gradient(to_top,#000_60%,transparent)] ${strapCls}`} />

      <motion.div
        className="absolute inset-0 origin-top"
        animate={reduce ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
      {/* strap */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-1/2 w-7 -translate-x-1/2 origin-top"
        style={{ height: strapLength, rotate: strapAngle }}
      >
        <div className={`h-full w-full ${strapCls}`} />
      </motion.div>

      {/* card */}
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.55}
        dragTransition={{ bounceStiffness: 220, bounceDamping: 9 }}
        whileDrag={{ scale: 1.03 }}
        style={{ x, y, rotate: cardRotate, top: STRAP }}
        className="absolute left-0 w-[290px] cursor-grab touch-none active:cursor-grabbing"
      >
        {/* clip */}
        <div aria-hidden className="mx-auto -mb-3 h-9 w-12 rounded-t-lg rounded-b-sm border-[3px] border-ink/70 bg-gradient-to-b from-zinc-200 to-zinc-400" />
        <div className="paper-shadow relative overflow-hidden rounded-2xl border border-ink/10 bg-[#fbf9f2] p-3 select-none">
          <div aria-hidden className="mx-auto mb-3 h-2.5 w-14 rounded-full bg-paper-deep shadow-[inset_0_1px_2px_rgb(0_0_0/0.25)]" />
          <div className="flex items-center justify-between px-1 font-mono text-[0.6rem] tracking-widest uppercase">
            <span>Dev pass</span>
            <span className="rounded-full bg-lime px-2 py-0.5 font-bold">’26</span>
          </div>
          <div className="relative mt-2 aspect-[4/4.2] overflow-hidden rounded-xl border-[3px] border-lilac bg-lilac-soft">
            <Image
              src="/me-cutout.png"
              alt=""
              width={1086}
              height={932}
              sizes="290px"
              draggable={false}
              className="absolute bottom-0 left-1/2 w-[135%] max-w-none -translate-x-1/2"
            />
          </div>
          <div className="mt-3 px-1">
            <p className="font-display text-2xl leading-none font-extrabold tracking-tight">{profile.name}</p>
            <p className="mt-1 text-xs text-ink/60">Python · AI agents · Automation</p>
          </div>
          <div className="mt-3 flex items-end justify-between px-1">
            <Barcode />
            <span className="font-mono text-[0.6rem] text-ink/50">ID · CSE-2026</span>
          </div>
        </div>
      </motion.div>
      </motion.div>
    </div>
  )
}
