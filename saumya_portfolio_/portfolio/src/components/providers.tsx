"use client"

import { ReactLenis } from "lenis/react"
import { MotionConfig } from "motion/react"
import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -16 }, autoRaf: true }}>
      <MotionConfig reducedMotion="user">
        <TooltipProvider delay={120}>{children}</TooltipProvider>
      </MotionConfig>
    </ReactLenis>
  )
}
