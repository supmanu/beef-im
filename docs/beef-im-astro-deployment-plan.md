# beef.im Astro Scaffold Initialization

> **Stack pivot:** Next.js / Payload / Neon → Astro 6.x / MDX / Cloudflare Pages
> **Decision date:** Apr 26, 2026
> **Updated:** Apr 26, 2026 — handoff-ready for Antigravity (Gemini 3.1 Pro)
> **Reference:** [PRODUCTION-NOTES.md](./brainstorm/New%20UIUX/PRODUCTION-NOTES.md) · [Prototype-Definitive-v1.html](./brainstorm/New%20UIUX/Prototype-Definitive-v1.html)

This plan transitions the `beef.im` repository from the legacy Next.js/Payload codebase to a clean Astro + MDX architecture. All open questions are resolved — this document is ready for execution.

---

## Confirmed Decisions

| Question | Decision | Rationale |
|---|---|---|
| Legacy code cleanup | **Archive** to `_archive/nextjs-legacy/` (not `rm -rf`) | Calculator components, hero effects, CSV pricing data, and pricing engine logic will be ported to Astro Islands — keep on disk for grep access |
| Emdash for launch | **Skip** (Path 2: MDX-only) | Obsidian → CLI pipeline is established. Add Emdash post-launch if mobile editing becomes a priority. |
| Directory layout | **`src/` (Astro standard)** — NOT flat root | Prior flat-root rule was Payload+Vercel-specific. Astro convention is `src/`; cleaner coexistence with `nerd/`, `_archive/`, `docs/` at repo root. |
| Existing `content/` directory | **Archive with Payload** | Root `content/` (articles, drafts, test, viral) is Payload data; would collide with Astro's `src/content/` collections |

---

## Phase 1 — Legacy Archive

Move the following to `_archive/nextjs-legacy/` (preserve, do not delete):

**Directories:**
- `app/` — Next.js app-router pages
- `collections/` — Payload collection schemas
- `components/` — old React components (HomeContent, Navbar, ArticleContent, etc.)
- `content/` — Payload content data (`articles/`, `_draft_archive/`, `test-articles/`, `viral-articles/`)
- `hooks/`, `lib/`, `payload-config/` — Payload glue code
- `.next/`, `node_modules/` — build artefacts (regenerate after pivot)
- `mastra/` — archived embeddings infra (per project-status.md, Apr 21)

**Files:**
- `next.config.mjs`, `next-env.d.ts`, `postcss.config.js`
- `package.json`, `package-lock.json` (will be regenerated)
- `eslint.config.mjs`
- `tsconfig.json` (will be regenerated for Astro)

**Keep at root (unchanged):**
- `nerd/` — content vault (pillars, agents, seeds, references)
- `docs/` — deployment plan, brainstorm, payload/nextjs/typescript reference docs
- `.claude/`, `CLAUDE.md`, `GEMINI.md`, `AGENTS.md` — agent context
- `.git`, `.gitignore`, `.env`, `.gitattributes`, `.npmrc`, `.nvmrc`
- `_archive/` — existing archive structure (legacy goes inside it)

---

## Phase 2 — Astro Foundation

Inject the scaffolding cleanly without using the interactive `npm create astro` CLI.

### `package.json` (NEW)

```json
{
  "name": "beef-im",
  "type": "module",
  "version": "0.1.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^6.1.9",
    "@astrojs/mdx": "^5.x",
    "@tailwindcss/vite": "^4.x",
    "@astrojs/sitemap": "^3.7",
    "@astrojs/react": "^5.x",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "tailwindcss": "^4.x"
  }
}
```

> React + `@astrojs/react` are required because Phase 4 ports the legacy COI / IRR / Premium calculators as React Islands.

### `astro.config.mjs` (NEW)

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://beef.im',
  srcDir: './src',
  publicDir: './public',
  integrations: [tailwind(), mdx(), sitemap(), react()],
});
```

### `tsconfig.json` (NEW)

Extend Astro's strict preset:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

### `tailwind.config.js` (NEW)

Pull design tokens (`--cream`, `--ink`, `--red`, `--burn`, `--teal`, `--gold`, `--grid-line`) from `Prototype-Definitive-v1.html` `:root` block into the Tailwind theme.

---

## Phase 3 — Directory Structure

```
beef.im/
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
├── package.json
│
├── public/
│   ├── fonts/                      ← Self-hosted woff2 (Anuphan, Sarabun, IBM Plex Mono, K2D)
│   └── favicon.svg
│
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro        ← <html>, fonts, global CSS, SEO defaults
│   │   ├── ArticleLayout.astro     ← Notebook grid + article nav + footer
│   │   └── ToolLayout.astro        ← Layout for interactive tool pages
│   │
│   ├── pages/
│   │   ├── index.astro             ← Hero + Notebook TOC
│   │   ├── about.astro
│   │   ├── tools/
│   │   │   ├── index.astro
│   │   │   ├── coi-calculator.astro
│   │   │   ├── irr-truth-teller.astro
│   │   │   └── premium-calculator.astro
│   │   └── [...slug].astro         ← Dynamic article pages from src/content/
│   │
│   ├── content/
│   │   ├── config.ts               ← Astro Content Collections schema
│   │   ├── case/                   ← CASE FILE articles (.mdx)
│   │   ├── experiment/             ← EXPERIMENT LOG articles (.mdx)
│   │   └── field-note/             ← FIELD NOTE articles (.mdx)
│   │
│   ├── components/
│   │   ├── Hero.astro              ← Full hero (zero JS)
│   │   ├── HeroSketch.astro        ← COI escalation SVG (CSS-animated)
│   │   ├── Navbar.astro            ← Sticky nav + mobile hamburger
│   │   ├── NotebookEntry.astro     ← TOC entry (masthead/headline/lede/sidenote)
│   │   ├── Footer.astro            ← Site-wide footer with dual watermark
│   │   ├── TemperatureBar.astro    ← risk/medium/low gradient bar
│   │   ├── LatestStamp.astro       ← "ล่าสุด" sealing-wax stamp
│   │   │
│   │   ├── mdx/                    ← Used inside .mdx article files
│   │   │   ├── Highlight.astro
│   │   │   ├── MarginNote.astro
│   │   │   ├── ScrapCard.astro
│   │   │   ├── CorrectionBlock.astro
│   │   │   └── VerdictSeal.astro
│   │   │
│   │   └── tools/                  ← React Islands
│   │       ├── COICalculator.tsx
│   │       ├── IRRTruthTeller.tsx
│   │       └── PremiumCalculator.tsx
│   │
│   ├── data/
│   │   └── calculator/
│   │       ├── main_policies.csv   ← Ported from astro-nerd (504 rows, 3 plans)
│   │       └── riders.csv          ← Ported from astro-nerd (53 rows)
│   │
│   └── styles/
│       └── global.css              ← Design tokens, notebook-grid utility, all CSS
│
├── nerd/                           ← Content vault (unchanged)
├── docs/                           ← Deployment plan, brainstorm, reference docs
├── _archive/
│   └── nextjs-legacy/              ← Archived Next.js/Payload codebase
├── .claude/                        ← Agent rules
├── CLAUDE.md, GEMINI.md, AGENTS.md
└── .env, .gitignore, .nvmrc
```

---

## Phase 4 — Port Interactive Tools (React Islands)

Reference: PRODUCTION-NOTES.md §"React Islands — Confirmed Working Patterns".

Copy these files from `~/Projects/astro-nerd/src/`:
- `components/COICalculator.tsx` — TMO 2017 mortality + recharts
- `data/calculator/main_policies.csv`, `riders.csv` — pricing data

Port from `_archive/nextjs-legacy/components/` (search by name):
- `PremiumCalculator.tsx` — port the full Sovereign Pricing Engine logic (placeholder in astro-nerd)
- `IRRTruthTeller.tsx`

Each tool page wraps the island:

```astro
---
import ToolLayout from '../../layouts/ToolLayout.astro';
import COICalculator from '../../components/tools/COICalculator.tsx';
---
<ToolLayout title="เครื่องคำนวณ COI">
  <COICalculator client:load />
</ToolLayout>
```

**CSV import pattern** (build-time, no API needed):

```ts
import policiesCSV from '../../data/calculator/main_policies.csv?raw';
```

**Cross-island communication:** native `CustomEvent`, NOT React Context (validated in astro-nerd).

---

## Phase 5 — Migrate Definitive Prototype CSS

Extract the prototype CSS into the Astro project:

1. **Design tokens** (`:root` block from Prototype-Definitive-v1.html lines ~10-40) → `src/styles/global.css` `@layer base`
2. **Tailwind tokens** (matching CSS vars) → `tailwind.config.js` `theme.extend.colors`
3. **Component CSS** (per-section) → inline `<style>` in matching `.astro` component
4. **Notebook grid utility** → `src/styles/global.css` (used in 4 places)
5. **Animations** (`inkSettle`, `ruleDraw`, `typeIn`, infinite sunburst rotation) → keyframes in `global.css`
6. **Reduced-motion support** — `@media(prefers-reduced-motion:reduce)` block already in prototype, copy as-is

Sizing reference (mobile / tablet / desktop) is in PRODUCTION-NOTES.md §"Sizing Reference Table".

---

## Phase 6 — Self-Host Fonts

Per PRODUCTION-NOTES.md §"Font Issues & Loading Strategy":

1. Download woff2 files for Anuphan, Sarabun, IBM Plex Mono, K2D (italic 300 only), Noto Serif Thai → `public/fonts/`
2. Subset to Thai + Latin Basic (~40% size reduction)
3. `<link rel="preload">` Anuphan + IBM Plex Mono in `BaseLayout.astro`
4. Drop unused weights — see PRODUCTION-NOTES §"Font Conflict: K2D Italic vs K2D Regular"

---

## Verification Plan

### Automated
```bash
npm install                  # Resolve dependencies
npm run build                # Verify Astro builds from src/
npm run preview              # Smoke-test the output
```

### Manual
- `npm run dev` → http://localhost:4321 should serve the Hero + empty Notebook TOC
- Each MDX article in `src/content/case/`, `src/content/experiment/`, `src/content/field-note/` should resolve at `/case/[slug]`, `/experiment/[slug]`, `/field-note/[slug]`
- `/tools/coi-calculator` should hydrate the React island and accept input
- Lighthouse score: target Performance ≥ 95, Accessibility ≥ 95 (zero-JS pages should hit 100)

### Visual Audit
Compare against `Prototype-Definitive-v1.html` at three breakpoints:
- Mobile (<768px) — 360px viewport
- Tablet (768-1199px) — 900px viewport
- Desktop (1200px+) — 1440px viewport

Per PRODUCTION-NOTES.md sizing tables.

---

## Out of Scope for This Phase

These will be handled in follow-up tasks (NOT by Antigravity in this phase):

- `/publish` CLI skill rewrite (Obsidian seed → MDX with frontmatter) — Claude Code task
- Auditor pipeline integration with new MDX format — Claude Code task
- Cloudflare Pages deployment config (`wrangler.toml`, R2 binding for media uploads if needed) — separate phase
- Emdash CMS integration (deferred — see Confirmed Decisions)
- Real article content seeding — content team

---

## Handoff Notes for Antigravity

- **Source of truth for design:** `docs/brainstorm/New UIUX/Prototype-Definitive-v1.html`
- **Source of truth for sizing/fonts/architecture:** `docs/brainstorm/New UIUX/PRODUCTION-NOTES.md`
- **Source of truth for React Island patterns:** `~/Projects/astro-nerd/EMDASH_MIGRATION.md`
- **Reusable assets:** `~/Projects/astro-nerd/src/components/COICalculator.tsx`, `~/Projects/astro-nerd/src/data/calculator/*.csv`
- **Brand laws** (read before any text content): `nerd/pillars/voice-dna.md`, `nerd/pillars/constitution.md`
- **Do NOT modify:** `nerd/`, `docs/`, `.claude/`, `_archive/` (after the legacy archive move)
- **One commit per phase** — Phase 1 archive should be its own commit before Phase 2 scaffolding

When done, report:
1. Build passing (`npm run build` exit 0)
2. Dev server running (`npm run dev` shows localhost:4321)
3. Three sample MDX articles render
4. One calculator page hydrates
5. Visual diff against prototype at three breakpoints

Then handoff back to Claude Code for `/publish` skill rewrite + Auditor integration.
