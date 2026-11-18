# Saumya Pathak · Portfolio ’26

A scrapbook-style animated portfolio: crumpled paper, torn lime bands, blurry lilac asterisks, draggable letters and a swinging ID badge.

**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 · shadcn/ui (Base UI) · Motion · Lenis · react-icons

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

## Edit content

Everything you'd want to change lives in **`src/lib/data.ts`**: bio, links, education, projects, skills, the ISS case study, marquee words.

| What | Where |
| --- | --- |
| Project cover art (animated SVGs) | `public/projects/*.svg` |
| Hero cut-out / sticker photo | `public/me-cutout.png`, `public/me-sticker.png` |
| Resume download | `public/saumya-pathak-resume.pdf` |
| Colours, textures, fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Sections | `src/components/sections/*` |

To add a project: drop a 800×600 SVG in `public/projects/`, then add an entry to `projects` in `data.ts`. It shows up in both the Contents index and the Mini Projects grid.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new); no config needed. If you add a custom domain, set `SITE_URL=https://your-domain` so social previews use it.
