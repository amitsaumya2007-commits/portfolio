import { Nav } from "@/components/site/nav"
import { Hero } from "@/components/sections/hero"
import { Marquee } from "@/components/sections/marquee"
import { About } from "@/components/sections/about"
import { Contents } from "@/components/sections/contents"
import { Featured } from "@/components/sections/featured"
import { Projects } from "@/components/sections/projects"
import { Toolbox } from "@/components/sections/toolbox"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Contents />
        <Featured />
        <Projects />
        <Toolbox />
        <Contact />
      </main>
    </>
  )
}
