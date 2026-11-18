import { cn } from "@/lib/utils"

type ShapeProps = { className?: string; color?: string; style?: React.CSSProperties }

/** Six rounded petals — the blurry lavender asterisk from the inspo. */
export function Asterisk({ className, color = "var(--lilac)", style }: ShapeProps) {
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden className={cn("block", className)} style={style}>
      {[0, 60, 120].map((r) => (
        <rect
          key={r}
          x={-11}
          y={-46}
          width={22}
          height={92}
          rx={11}
          fill={color}
          transform={`rotate(${r})`}
        />
      ))}
    </svg>
  )
}

/** Five round petals around a centre — the lime flower. */
export function Flower({ className, color = "var(--lime)", style }: ShapeProps) {
  const petals = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2
    return { cx: Math.cos(a) * 24, cy: Math.sin(a) * 24 }
  })
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden className={cn("block", className)} style={style}>
      {petals.map((p, i) => (
        <circle key={i} cx={p.cx.toFixed(2)} cy={p.cy.toFixed(2)} r={20} fill={color} />
      ))}
      <circle r={18} fill={color} />
    </svg>
  )
}

/** A strip of washi tape. */
export function Tape({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      className={cn("tape pointer-events-none absolute block h-6 w-24", className)}
      style={{
        clipPath:
          "polygon(0 8%, 4% 0, 9% 10%, 14% 2%, 100% 0, 97% 30%, 100% 55%, 96% 80%, 100% 100%, 0 100%, 3% 70%, 0 45%, 4% 22%)",
        ...style,
      }}
    />
  )
}

/** Hand-drawn curvy arrow for scribbled annotations. */
export function DoodleArrow({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("block", className)}
      style={style}
    >
      <path d="M6 10c22 2 44 10 58 26 10 12 14 24 12 34" />
      <path d="M62 60l14 12 10-17" />
    </svg>
  )
}

/** Tiny 4-point sparkle. */
export function Sparkle({ className, color = "currentColor" }: ShapeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("block", className)}>
      <path d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0z" fill={color} />
    </svg>
  )
}
