"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { CheckCheck } from "lucide-react"
import { SiWhatsapp } from "react-icons/si"
import { featured } from "@/lib/data"
import { cn } from "@/lib/utils"

const tone = {
  cmd: "text-lime",
  out: "text-paper/75",
  ok: "text-[#25D366]",
  dim: "text-paper/45",
  warn: "text-lilac",
} as const

/** Replays the real ISS_tracker.py log output, line by line, while visible. */
export function TerminalLog() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [count, setCount] = useState(0)
  const lines = featured.terminal

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setCount((c) => (c >= lines.length + 3 ? 0 : c + 1))
    }, 900)
    return () => window.clearInterval(id)
  }, [inView, lines.length])

  return (
    <div ref={ref} className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#0b0d1f] ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[0.65rem] text-paper/40">~/ISS-Tracker — zsh</span>
      </div>
      <div className="min-h-[15.5rem] flex-1 space-y-1 p-4 font-mono text-[0.68rem] leading-relaxed md:text-xs" aria-label="Sample output of the ISS tracker">
        {lines.slice(0, Math.min(count, lines.length)).map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn("break-words", tone[l.t as keyof typeof tone])}
          >
            {l.text}
          </motion.p>
        ))}
        <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-lime" />
      </div>
    </div>
  )
}

/** The WhatsApp message the service actually sends. */
export function WhatsAppPing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const [stage, setStage] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    if (!inView) return
    let t2: number
    const run = () => {
      setStage(1)
      t2 = window.setTimeout(() => setStage(2), 1400)
    }
    run()
    const loop = window.setInterval(() => {
      setStage(0)
      window.setTimeout(run, 600)
    }, 7000)
    return () => {
      window.clearInterval(loop)
      window.clearTimeout(t2)
    }
  }, [inView])

  return (
    <div ref={ref} className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#efeae2]">
      <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
        <span className="grid size-9 place-items-center rounded-full bg-lime text-lg">🛰️</span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">ISS Alert Bot</p>
          <p className="text-[0.65rem] text-white/70">{stage === 1 ? "typing…" : "online"}</p>
        </div>
        <SiWhatsapp className="ml-auto size-5 text-[#25D366]" />
      </div>
      <div className="relative flex min-h-[10.5rem] flex-1 flex-col justify-end gap-2 p-4 [background-image:radial-gradient(rgb(0_0_0/0.05)_1px,transparent_1px)] [background-size:14px_14px]">
        <AnimatePresence mode="popLayout">
          {stage === 1 && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex w-fit gap-1 rounded-xl rounded-tl-sm bg-white px-3 py-3 shadow-sm"
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="size-1.5 rounded-full bg-ink/40"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.12 }}
                />
              ))}
            </motion.div>
          )}
          {stage === 2 && (
            <motion.div
              key="msg"
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="max-w-[92%] origin-bottom-left rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[0.8rem] leading-snug text-ink shadow-sm"
            >
              <p>🚀 LOOK UP! The ISS is passing directly over you right now!</p>
              <p className="mt-1">🛰️ Current Location: (31.42, 82.17)</p>
              <p className="mt-1 flex items-center justify-end gap-1 text-[0.6rem] text-ink/45">
                21:04 <CheckCheck className="size-3.5 text-sky-500" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
