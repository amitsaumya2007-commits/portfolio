import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Bricolage_Grotesque, Caveat } from "next/font/google"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] })
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] })

// Set SITE_URL once you have a domain; on Vercel the production URL is picked up automatically.
const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Saumya Pathak · Python Developer, AI Agents & Automation",
  description:
    "Portfolio of Saumya Pathak, a Python developer building API integrations, event-driven automation and LLM-powered apps.",
  authors: [{ name: "Saumya Pathak", url: "https://github.com/amitsaumya2007-commits" }],
  keywords: ["Saumya Pathak", "Python developer", "AI agents", "LangChain", "automation", "FastAPI", "portfolio"],
  openGraph: {
    title: "Saumya Pathak · Portfolio ’26",
    description: "Python · AI Agents · Automation · API Integrations",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#f4f1e6",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
        <Toaster theme="light" position="bottom-center" richColors />
        <div aria-hidden className="grain" />
      </body>
    </html>
  )
}
