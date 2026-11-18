import type { IconType } from "react-icons"
import {
  SiPython,
  SiJavascript,
  SiFastapi,
  SiFlask,
  SiLangchain,
  SiLanggraph,
  SiGooglegemini,
  SiHuggingface,
  SiPandas,
  SiNumpy,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiPostman,
  SiVercel,
  SiHtml5,
  SiCss,
  SiWhatsapp,
  SiDeepgram,
  SiJson,
  SiGnubash,
  SiPydantic,
  SiDotenv,
  SiGooglemaps,
} from "react-icons/si"
import { cn } from "@/lib/utils"

type Tech = { icon?: IconType; color: string; mono?: string }

const TECH: Record<string, Tech> = {
  Python: { icon: SiPython, color: "#3776AB" },
  JavaScript: { icon: SiJavascript, color: "#E5C400" },
  SQL: { mono: "SQL", color: "#336791" },
  HTML5: { icon: SiHtml5, color: "#E34F26" },
  CSS3: { icon: SiCss, color: "#663399" },
  LangChain: { icon: SiLangchain, color: "#1C3C3C" },
  LangGraph: { icon: SiLanggraph, color: "#1C3C3C" },
  RAG: { mono: "RAG", color: "#7A5CF0" },
  "OpenAI API": { mono: "AI", color: "#10A37F" },
  "Gemini API": { icon: SiGooglegemini, color: "#4285F4" },
  "Hugging Face": { icon: SiHuggingface, color: "#E8A100" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  Flask: { icon: SiFlask, color: "#141414" },
  "REST APIs": { mono: "{ }", color: "#141414" },
  Webhooks: { mono: "⇄", color: "#C73A63" },
  Twilio: { mono: "Tw", color: "#F22F46" },
  Pandas: { icon: SiPandas, color: "#150458" },
  NumPy: { icon: SiNumpy, color: "#4D77CF" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  ChromaDB: { mono: "Ch", color: "#FF6446" },
  FAISS: { mono: "FA", color: "#0467DF" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#141414" },
  Linux: { icon: SiLinux, color: "#141414" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  n8n: { mono: "n8n", color: "#EA4B71" },
  Vercel: { icon: SiVercel, color: "#141414" },
  WhatsApp: { icon: SiWhatsapp, color: "#25D366" },
  Deepgram: { icon: SiDeepgram, color: "#13EF93" },
  JSON: { icon: SiJson, color: "#141414" },
  JSONL: { icon: SiJson, color: "#141414" },
  CLI: { icon: SiGnubash, color: "#141414" },
  pydantic: { icon: SiPydantic, color: "#E92063" },
  "python-dotenv": { icon: SiDotenv, color: "#C5A100" },
  "Google Maps": { icon: SiGooglemaps, color: "#4285F4" },
}

export function hasTech(name: string) {
  return name in TECH
}

/** Brand glyph for a technology, falling back to a monogram tile (skipped when `iconOnly`). */
export function TechGlyph({ name, className, iconOnly }: { name: string; className?: string; iconOnly?: boolean }) {
  const t = TECH[name]
  if (!t || (iconOnly && !t.icon)) return null
  if (t.icon) {
    const Icon = t.icon
    return <Icon aria-hidden className={cn("size-6", className)} style={{ color: t.color }} />
  }
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-6 place-items-center rounded-md font-mono text-[0.6rem] leading-none font-bold text-white",
        className
      )}
      style={{ background: t.color }}
    >
      {t.mono}
    </span>
  )
}
