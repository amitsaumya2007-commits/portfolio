import { Mail } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { FaLinkedinIn } from "react-icons/fa6"
import { profile, education, interests, currently } from "@/lib/data"
import { TornEdge } from "@/components/decor/torn-edge"
import { Asterisk, DoodleArrow } from "@/components/decor/shapes"
import { Floaty, Reveal, SplitWords } from "@/components/motion/primitives"
import { Lanyard } from "./lanyard"

function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-xl font-bold tracking-tight text-lilac-deep">{children}</h3>
}

export function About() {
  const contacts = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: SiGithub, label: profile.githubHandle, href: profile.github },
    { icon: FaLinkedinIn, label: "in/saumya-pathak", href: profile.linkedin },
  ]

  return (
    <section id="about" className="crumple relative z-10 mt-10 bg-lime [--crumple-opacity:0.28]">
      <TornEdge side="top" color="var(--lime)" seed={21} />
      <TornEdge side="bottom" color="var(--lime)" seed={34} />

      <Floaty className="absolute top-10 right-[6%] z-0" duration={9} spin={30}>
        <Asterisk className="size-20 blur-[3px] md:size-28" />
      </Floaty>
      <Floaty className="absolute bottom-6 -left-6 z-0" duration={8} spin={-25} delay={1}>
        <Asterisk className="size-24 blur-[3px]" />
      </Floaty>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pt-8 pb-20 md:grid-cols-[320px_1fr] md:gap-16 md:px-10 md:pt-0 md:pb-28">
        <div className="relative -mt-2 md:-mt-10">
          <Lanyard />
          <div className="pointer-events-none absolute top-24 right-0 hidden items-start gap-1 font-hand text-2xl text-ink/80 md:-right-10 md:flex">
            <DoodleArrow className="mt-4 w-12 -scale-x-100 rotate-[200deg]" />
            <span className="rotate-6">drag me!</span>
          </div>
        </div>

        <div className="md:pt-24">
          <p className="font-mono text-xs tracking-[0.2em] text-ink/60 uppercase">{"// 01 · About"}</p>
          <h2 className="mt-2 font-display text-6xl font-extrabold tracking-tight text-lilac-deep md:text-8xl">
            <SplitWords text="Hello" />
            <span className="text-ink">!</span>
          </h2>
          <Reveal>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed md:text-xl">
              Hi, my name is{" "}
              <span className="font-hand text-[1.6em] leading-none font-bold text-lilac-deep">{profile.name}</span>,{" "}
              {profile.intro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            <Reveal delay={0.05}>
              <Heading>Education</Heading>
              <ul className="mt-3 space-y-4">
                {education.map((e) => (
                  <li key={e.school}>
                    <p className="text-xs text-ink/60">{e.detail}</p>
                    <p className="font-semibold">{e.school}</p>
                    <p className="font-mono text-xs text-ink/60">
                      {e.when} · {e.where}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <Heading>Contact</Heading>
              <ul className="mt-3 space-y-2.5">
                {contacts.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener"
                      className="group flex items-center gap-3 text-sm font-medium"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-lime transition-transform group-hover:-rotate-12 group-hover:scale-110">
                        <c.icon className="size-4" />
                      </span>
                      <span className="break-all underline-offset-4 group-hover:underline">{c.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.19}>
              <Heading>Right now</Heading>
              <ul className="mt-3 space-y-2 text-sm">
                {currently.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.26} className="sm:col-span-2 xl:col-span-3">
              <Heading>Off the clock</Heading>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {interests.map((i, idx) => (
                  <li
                    key={i.label}
                    className="paper-shadow flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-1 hover:rotate-0"
                    style={{ rotate: `${[-2, 1.5, -1][idx % 3]}deg` }}
                  >
                    <span aria-hidden>{i.emoji}</span>
                    {i.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
