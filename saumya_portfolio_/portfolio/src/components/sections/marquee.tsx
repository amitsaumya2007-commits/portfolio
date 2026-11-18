import { marqueeWords } from "@/lib/data"
import { Asterisk } from "@/components/decor/shapes"
import { cn } from "@/lib/utils"

function Track({ words, className, reverse }: { words: string[]; className?: string; reverse?: boolean }) {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {words.map((w, i) => (
        <li key={i} className="flex items-center">
          <span className="px-5 font-display text-2xl font-extrabold tracking-tight whitespace-nowrap uppercase md:px-7 md:text-4xl">
            {w}
          </span>
          <Asterisk className="size-5 shrink-0 md:size-7" color="currentColor" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cn("flex w-max", reverse ? "animate-marquee-reverse" : "animate-marquee", className)}>
      {row}
      {row}
    </div>
  )
}

export function Marquee() {
  return (
    <section aria-label="What I work with" className="relative z-20 -my-6 overflow-hidden py-16 md:py-20">
      <p className="sr-only">{marqueeWords.join(", ")}</p>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-lilac py-3 text-ink shadow-md md:py-4 [--marquee-duration:55s]">
        <Track words={[...marqueeWords].reverse()} reverse />
      </div>
      <div className="relative -mx-[5%] -rotate-[2.5deg] bg-ink py-3 text-lime shadow-xl md:py-4 [--marquee-duration:45s]">
        <Track words={marqueeWords} />
      </div>
    </section>
  )
}
