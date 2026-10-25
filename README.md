# TARUSH SINGH — Personal Portfolio

Cinematic, dark, editorial portfolio for Tarush Singh — MCA Cyber Security student, cybersecurity researcher, aspiring OSINT analyst.

Static single-page site. **React 19 · TypeScript · Vite 7 · Tailwind CSS 4**. No backend, no database, no analytics, no cookies. All fonts bundled locally at build time.

## Local development

```bash
npm install       # first time only (or after pulling changes)
npm run dev       # dev server → http://localhost:5173
```

## Production build & preview

```bash
npm run build     # type-checks (tsc -b) then bundles → dist/
npm run preview   # serves the production bundle → http://localhost:4173
```

## Deploy to Vercel

The repo includes `vercel.json` (rewrite so unknown paths resolve to the SPA) — nothing else is needed.

**Dashboard:** New Project → import the repo → framework preset **Vite** (build `npm run build`, output `dist`) → Deploy.

**CLI:**

```bash
npm i -g vercel
vercel           # preview deployment
vercel --prod    # production
```

After the domain is assigned, hand-edit `index.html` and add a canonical/`og:url` meta tag with the final domain (it is deliberately omitted until a real domain exists).

## Content & honesty rules enforced in the build

Everything external is verified live at build time (see `src/data/content.ts` header):

- GitHub profile `@Tarush002` — live. All project/repository CTAs point here.
- `github.com/Tarush002/SpatialDisplayResearch` — **not publicly resolvable (404)**, so **no direct repo link is rendered**. When the repository goes public, add it in `src/data/content.ts` (`PROJECTS[1].cta`).
- The AI-SOC repository is not publicly listed; the project is presented honestly as *in development* with a GitHub-profile CTA.
- Publication — verified via Taylor & Francis citation metadata: book chapter *"Recent Advances in Computational Intelligence and Cyber Security"*, CRC Press, 1st ed., **2024**, pp. 157–168, DOI `10.1201/9781003518587-15`.
- **No email** could be verified, so no email link and no contact form exist on purpose.
- No employment history, certifications, grades, or metrics are invented anywhere.

## Known limitations

- `public/og.svg` is used for social preview. Most crawlers (Facebook, Twitter/X, LinkedIn) do not render SVG previews — replace it with a 1200×630 PNG (`og.png`) and update `og:image` / `twitter:image` in `index.html` for full card support.
- Project 02 (`SpatialDisplayResearch`) has no repository link for the reason above.

## Structure

```
index.html                 template + SEO/OG meta
vercel.json                SPA rewrite for Vercel
public/                    favicon, OG card
src/
  main.tsx                 entry, local font bundling
  App.tsx                  page composition
  data/content.ts          ALL copy + verified links (audit trail)
  styles/global.css        design tokens, grain, type, motion rules
  components/
    Nav.tsx                sticky nav + mobile overlay (Esc/focus handled)
    Hero.tsx               headline, CTAs, status line
    TopoField.tsx          generative "signal field" SVG (synthetic, labelled)
    About.tsx  Projects.tsx  Research.tsx
    ProjectVisuals.tsx     pipeline / depth-stack / dossier tiles
    Capabilities.tsx  Education.tsx  Contact.tsx  Footer.tsx
    Reveal.tsx             IntersectionObserver reveal (reduced-motion aware)
    Icons.tsx              inline arrow icons
```
