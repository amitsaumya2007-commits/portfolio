"use client"

import { useState } from "react"
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react"
import { ArrowDownToLine, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { profile } from "@/lib/data"
import { Asterisk } from "@/components/decor/shapes"

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#toolbox", label: "Toolbox" },
  { href: "#contact", label: "Contact" },
]

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 240)
  })

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-lilac"
        style={{ scaleX: progress }}
      />
      <motion.header
        className="fixed inset-x-0 top-3 z-40 flex justify-center px-4 md:top-4"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <nav className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-ink/10 bg-paper/75 p-1.5 pl-2 shadow-[0_8px_30px_-12px_rgb(20_20_20/0.25)] backdrop-blur-md">
          <a
            href="#top"
            className="group flex items-center gap-2 rounded-full pr-3 font-display text-lg font-extrabold tracking-tight"
            aria-label="Back to top"
          >
            <span className="relative grid size-9 place-items-center rounded-full bg-ink text-paper">
              <Asterisk className="absolute size-7 opacity-90 transition-transform duration-700 group-hover:rotate-180" color="var(--lilac)" />
              <span className="relative text-sm">SP</span>
            </span>
            <span className="hidden sm:inline">Saumya</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-3.5 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-lime hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Button
              nativeButton={false}
              render={<a href={profile.resume} target="_blank" rel="noopener" />}
              className="h-9 rounded-full px-4 font-semibold"
            >
              Resume <ArrowDownToLine />
            </Button>

            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon" className="size-9 rounded-full bg-transparent md:hidden" aria-label="Open menu" />
                }
              >
                <Menu />
              </SheetTrigger>
              <SheetContent side="top" className="rounded-b-3xl bg-paper px-6 pt-14 pb-8">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <ul className="flex flex-col">
                  {links.map((l, i) => (
                    <li key={l.href}>
                      <SheetClose
                        nativeButton={false}
                        render={<a href={l.href} />}
                        className="flex items-baseline justify-between border-b border-ink/10 py-4 font-display text-4xl font-extrabold tracking-tight"
                      >
                        {l.label}
                        <span className="font-mono text-sm font-normal text-ink/50">0{i + 1}</span>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>
    </>
  )
}
