"use client"

import { useRef, useSyncExternalStore } from "react"
import { motion, useScroll, useTransform, useReducedMotion, type HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  ...rest
}: { children: React.ReactNode; className?: string; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Words slide up out of a mask, one after another. */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
}) {
  const words = text.split(" ")
  // The in-view trigger lives on the wrapper: the words start translated outside
  // their overflow-hidden masks, where IntersectionObserver would never see them.
  return (
    <motion.span
      className={cn("inline-block", className)}
      aria-label={text}
      role="text"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.75, ease } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Moves its children at a different speed than the scroll. */
export function Parallax({
  children,
  className,
  speed = 60,
  style,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed, -speed])
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  )
}

/** Gentle forever-float + spin for decorative shapes. */
export function Floaty({
  children,
  className,
  duration = 7,
  spin = 0,
  amp = 14,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  className?: string
  duration?: number
  spin?: number
  amp?: number
  delay?: number
  style?: React.CSSProperties
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={style}
      animate={reduce ? undefined : { y: [0, -amp, 0], rotate: [0, spin, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  )
}

const finePointerQuery = "(hover: hover) and (pointer: fine)"
function subscribePointer(cb: () => void) {
  const mq = window.matchMedia(finePointerQuery)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}

/** True on mouse/trackpad devices — used to avoid hijacking touch scrolling. */
export function useFinePointer() {
  return useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(finePointerQuery).matches,
    () => false
  )
}
