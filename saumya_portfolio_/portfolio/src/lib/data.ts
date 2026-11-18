// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: "Saumya Pathak",
  firstName: "Saumya",
  role: "Software Developer",
  tagline: ["Python", "AI Agents", "Automation", "API Integrations"],
  intro:
    "a Python developer who builds API integrations, event-driven automations and LLM-powered apps. I like code with production concerns built in: fault tolerance, idempotent alerting, persistent logging and secrets that stay out of the repo.",
  email: "amitsaumya.2007@gmail.com",
  github: "https://github.com/amitsaumya2007-commits",
  githubHandle: "amitsaumya2007-commits",
  linkedin: "https://www.linkedin.com/in/saumya-pathak-993ba7268",
  resume: "/saumya-pathak-resume.pdf",
  status: "Open to internships & collabs",
}

export const education = [
  {
    school: "Galgotias University",
    detail: "B.Tech, Computer Science & Engineering",
    when: "2026 – 2030",
    where: "Greater Noida",
  },
  {
    school: "Gyan International School",
    detail: "Senior Secondary (CBSE) · 84.6%",
    when: "2026",
    where: "Pilibhit",
  },
]

export const interests = [
  { label: "Hindustani Classical Vocal", emoji: "🎶" },
  { label: "Painting", emoji: "🎨" },
  { label: "Space Technology", emoji: "🛰️" },
]

export const currently = [
  "Building agents with LangChain + LangGraph",
  "Wiring automations in n8n & webhooks",
  "Year one of B.Tech CSE",
]

export type Project = {
  slug: string
  title: string
  label: string // short name used in the contents index
  kind: string
  year: string
  blurb: string
  stack: string[]
  repo: string
  art: string
  color: string
  darkBg?: boolean
}

export const featured = {
  slug: "iss-alert",
  title: "Real-Time ISS Proximity Alert Service",
  short: "ISS//ALERT",
  kind: "Event-driven service",
  year: "2026",
  repo: "https://github.com/amitsaumya2007-commits/ISS-Tracker",
  art: "/projects/iss-alert.svg",
  summary:
    "A long-running Python service that watches the International Space Station and pings my WhatsApp the moment it flies over — once per pass, never spammy.",
  stack: ["Python", "REST APIs", "Twilio", "WhatsApp", "python-dotenv", "CSV"],
  stats: [
    { value: "10s", label: "polling interval" },
    { value: "±5°", label: "lat / long window" },
    { value: "1", label: "alert per pass" },
    { value: "0", label: "secrets in code" },
  ],
  bullets: [
    {
      title: "Polling + geospatial check",
      body: "Consumes a live satellite-position REST API every 10 seconds and evaluates proximity against a configurable ±5° latitude/longitude window.",
    },
    {
      title: "Idempotent alerting",
      body: "A state-driven pipeline over the Twilio WhatsApp API sends exactly one notification per pass and auto-resets on exit, so no duplicate messages or wasted credits.",
    },
    {
      title: "Built to keep running",
      body: "Retries on network failures and non-200 responses, plus an append-only CSV audit log of every sighting with timestamp and coordinates.",
    },
    {
      title: "Secrets out of the repo",
      body: "Fixed a credential-exposure risk by moving secrets to environment config (python-dotenv) and splitting production from experimental entry points.",
    },
  ],
  palette: [
    { name: "Orbit Navy", hex: "#121633" },
    { name: "Signal Lime", hex: "#D5E64B" },
    { name: "Nebula Lilac", hex: "#A68BF7" },
    { name: "Ping Green", hex: "#25D366" },
  ],
  terminal: [
    { t: "cmd", text: "$ python ISS_tracker.py" },
    { t: "out", text: "[21:04:10] ISS is at Lat: 38.91, Lon: 71.36. Not overhead yet." },
    { t: "out", text: "[21:04:20] ISS is at Lat: 35.47, Lon: 75.02. Not overhead yet." },
    { t: "ok", text: "[21:04:30] WhatsApp alert sent successfully! SID: SM8f3c…" },
    { t: "ok", text: "[21:04:30] Logged overhead location to CSV." },
    { t: "dim", text: "[21:04:40] ISS is overhead, but alert was already sent for this pass." },
    { t: "dim", text: "[21:04:50] ISS is overhead, but alert was already sent for this pass." },
    { t: "warn", text: "The ISS has left your airspace. Resetting alert trigger for next time." },
  ],
}

export const projects: Project[] = [
  {
    slug: "audio-converter",
    title: "Audio → Transcript",
    label: "Audio converter",
    kind: "CLI tool",
    year: "2026",
    blurb:
      "Sends a local audio file to Deepgram's nova-3 speech model and saves the full response as a JSON transcript, printing the best guess to the terminal.",
    stack: ["Python", "Deepgram", "httpx", "pydantic", "JSON"],
    repo: "https://github.com/amitsaumya2007-commits/Audio-Converter",
    art: "/projects/audio-converter.svg",
    color: "#52C9A8",
  },
  {
    slug: "book-scraper",
    title: "Book Scraper",
    label: "Book scraper",
    kind: "Web scraper",
    year: "2026",
    blurb:
      "Crawls books.toscrape.com, follows pagination to the last page and writes every title → price pair to JSON Lines, with a polite delay and retry/backoff.",
    stack: ["Python", "requests", "BeautifulSoup", "JSONL"],
    repo: "https://github.com/amitsaumya2007-commits/Book_Scraper",
    art: "/projects/book-scraper.svg",
    color: "#E9B98B",
  },
  {
    slug: "networking-toolkit",
    title: "Networking Toolkit",
    label: "Networking toolkit",
    kind: "Python collection",
    year: "2026",
    blurb:
      "An HTTP request inspector (status, headers, timing, redirects), a DNS resolver for IPv4/IPv6 forward and reverse lookups, and generator-based scrapers.",
    stack: ["Python", "socket", "requests", "bs4", "lxml"],
    repo: "https://github.com/amitsaumya2007-commits/Networking-Projects",
    art: "/projects/networking-toolkit.svg",
    color: "#5470D6",
    darkBg: true,
  },
  {
    slug: "terminal-chess",
    title: "Terminal Chess",
    label: "Terminal chess",
    kind: "Interactive CLI",
    year: "2026",
    blurb:
      "A text chess board you drive from the prompt: move e2 e4, set, remove, reset, clear and fill. No dependencies. Built from an Automate the Boring Stuff exercise.",
    stack: ["Python", "CLI", "stdlib"],
    repo: "https://github.com/amitsaumya2007-commits/CHESS",
    art: "/projects/terminal-chess.svg",
    color: "#D8B6D3",
  },
  {
    slug: "oop-lab",
    title: "OOP Lab",
    label: "OOP lab",
    kind: "Design practice",
    year: "2026",
    blurb:
      "Five mini systems (bank account, money, order system, shapes, users & roles) built to drill encapsulation, inheritance, polymorphism and abstraction.",
    stack: ["Python", "OOP", "SOLID-ish"],
    repo: "https://github.com/amitsaumya2007-commits/OOP-Mini-Projects",
    art: "/projects/oop-lab.svg",
    color: "#A9C47F",
  },
  {
    slug: "cli-todo",
    title: "CLI To-Do",
    label: "CLI to-do",
    kind: "CLI app",
    year: "2026",
    blurb:
      "An interactive to-do manager: create named lists, reopen and edit old ones, and track each task's done state, with every list saved as its own JSON file.",
    stack: ["Python", "JSON", "File I/O"],
    repo: "https://github.com/amitsaumya2007-commits/CLI-To-Do-App",
    art: "/projects/cli-todo.svg",
    color: "#BDB07C",
  },
  {
    slug: "job-portal",
    title: "Job Application Portal",
    label: "Job portal",
    kind: "Web",
    year: "2026",
    blurb:
      "A three-stage application flow (landing, application, confirmation) with POST-based submission and client-side validation to keep the data clean.",
    stack: ["HTML5", "CSS3", "Forms"],
    repo: "https://github.com/amitsaumya2007-commits/job-apply",
    art: "/projects/job-portal.svg",
    color: "#8193E8",
  },
  {
    slug: "travel-page",
    title: "Travel Discovery Page",
    label: "Travel page",
    kind: "Web",
    year: "2026",
    blurb:
      "A content-rich landing page with breadcrumb navigation, embedded media, an interactive Google Map and proper SEO metadata.",
    stack: ["HTML5", "CSS3", "Google Maps"],
    repo: "https://github.com/amitsaumya2007-commits/travels",
    art: "/projects/travel-page.svg",
    color: "#F08A7E",
  },
]

export const skillGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "JavaScript", "SQL", "HTML5", "CSS3"] },
  {
    label: "AI & agents",
    items: ["LangChain", "LangGraph", "RAG", "OpenAI API", "Gemini API", "Hugging Face"],
  },
  { label: "Backend", items: ["FastAPI", "Flask", "REST APIs", "Webhooks", "Twilio"] },
  { label: "Data", items: ["Pandas", "NumPy", "MySQL", "MongoDB", "ChromaDB", "FAISS"] },
  { label: "Tools", items: ["Docker", "Git", "GitHub", "Linux", "Postman", "n8n", "Vercel"] },
]

export const equations = [
  { a: "Python", b: "Twilio", result: "WhatsApp alerts", note: "the ISS pinger" },
  { a: "LangChain", b: "ChromaDB", result: "RAG pipelines", note: "chat with your docs" },
  { a: "FastAPI", b: "Docker", result: "Shippable APIs", note: "runs anywhere" },
  { a: "n8n", b: "Webhooks", result: "Hands-free automation", note: "less clicking" },
]

export const marqueeWords = [
  "Python",
  "AI Agents",
  "LangChain",
  "FastAPI",
  "Automation",
  "Twilio",
  "REST APIs",
  "RAG",
  "n8n",
  "Webhooks",
]
