import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "Saumya Pathak · Python developer, AI agents & automation"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const photo = await readFile(join(process.cwd(), "public/me-cutout.png"))
const photoSrc = `data:image/png;base64,${photo.toString("base64")}`

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#f4f1e6" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 210, background: "#d5e64b", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", padding: "70px 0 0 72px", width: 720 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#5b5850", textTransform: "uppercase" }}>Portfolio ’26</div>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.9, color: "#141414", marginTop: 18, letterSpacing: -4 }}>
            Saumya
          </div>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.9, color: "#7a5cf0", letterSpacing: -4 }}>Pathak</div>
          <div style={{ fontSize: 32, color: "#141414", marginTop: 34 }}>Python · AI Agents · Automation</div>
        </div>
        <img src={photoSrc} width={620} height={532} style={{ position: "absolute", right: -40, bottom: 0 }} alt="" />
      </div>
    ),
    size
  )
}
