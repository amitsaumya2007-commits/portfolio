import { cn } from "@/lib/utils"

// Deterministic PRNG so the server and client draw the same rip.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const W = 1440
const H = 60

function ripLine(seed: number, base: number, amp: number) {
  const rand = mulberry32(seed)
  const pts: [number, number][] = []
  let x = 0
  let drift = 0
  while (x < W) {
    drift = Math.max(-amp, Math.min(amp, drift + (rand() - 0.5) * amp * 0.9))
    const jitter = (rand() - 0.5) * amp * 0.7
    pts.push([x, base + drift + jitter])
    x += 6 + rand() * 18
  }
  pts.push([W, base + drift])
  return pts
}

function buildPaths(seed: number) {
  const fiber = ripLine(seed, 22, 9)
  const body = fiber.map(([x, y], i) => [x, y + 5 + ((i * 7919) % 5)] as [number, number])
  const toPath = (pts: [number, number][]) =>
    `M0 ${H} L` + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L") + ` L${W} ${H} Z`
  return { fiber: toPath(fiber), body: toPath(body) }
}

/**
 * A torn-paper edge. Place it inside a `relative` section: `side="top"` sticks out
 * above the section, `side="bottom"` hangs below it. `color` should match the section bg.
 */
export function TornEdge({
  side = "top",
  color,
  fiber = "#fbf8ee",
  seed = 7,
  className,
}: {
  side?: "top" | "bottom"
  color: string
  fiber?: string
  seed?: number
  className?: string
}) {
  const { fiber: f, body } = buildPaths(seed)
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 block h-7 w-full md:h-10",
        side === "top" ? "bottom-full -mb-px" : "top-full -mt-px rotate-180",
        className
      )}
    >
      <path d={f} fill={fiber} />
      <path d={body} fill={color} />
    </svg>
  )
}
