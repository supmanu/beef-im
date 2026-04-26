# beef.im — Astro Migration Runbook

> **Stack:** Astro 6.1.9 / Tailwind v4 / MDX / Cloudflare Pages
> **Decision date:** Apr 26, 2026
> **Completed:** Apr 27, 2026
> **Reference:** [PRODUCTION-NOTES.md](./brainstorm/New%20UIUX/PRODUCTION-NOTES.md) · [Prototype-Definitive-v1.html](./brainstorm/New%20UIUX/Prototype-Definitive-v1.html)

This document serves two purposes:
1. **Historical record** — exactly what was done, what broke, how it was fixed.
2. **Clean-slate runbook** — if the Astro installation is nuked, this is the step-by-step to restore it from zero as quickly as possible.

---

## Final Architecture (as-built)

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Astro 6.1.9 | Static output, zero-JS by default |
| **Styling** | Tailwind v4 (CSS-first via `@tailwindcss/vite`) | No `tailwind.config.js` — tokens defined in `@theme {}` in `global.css` |
| **MDX** | `@astrojs/mdx` v5 | Articles live in `src/content/{case,experiment,field-note}/` |
| **Content API** | Astro 6 Content Layer (glob loader) | Config at `src/content.config.ts` (NOT `src/content/config.ts`) |
| **React** | `@astrojs/react` v5 + React 19 | Kept in deps for future calculator islands |
| **Sitemap** | `@astrojs/sitemap` v3.7 | Working in v6 (was broken in v4 due to `reduce` bug) |
| **Fonts** | Fontsource (npm packages) | Self-hosted via npm, no Google Fonts CDN calls |
| **Hosting** | Cloudflare Pages (`beef-im` project) | Git-connected to `supmanu/beef-im` on `main` |
| **Build output** | `dist/` | Static HTML, CSS, assets |
| **Repository** | `supmanu/beef-im` (primary) | `supmanu/nerd-with-nart-prod` = legacy, frozen |

### Directory Tree (as-built)

```
beef.im/
├── astro.config.mjs             ← Vite-plugin tailwind (NOT @astrojs/tailwind)
├── tsconfig.json
├── package.json
├── wrangler.toml                ← Cloudflare Pages: name=beef-im, dist=dist/
│
├── public/
│   └── favicon.svg              ← Thai ป lettermark on parchment/red circle
│
├── src/
│   ├── content.config.ts        ← ⚠️ MUST be here, NOT src/content/config.ts
│   ├── env.d.ts
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro     ← Fontsource imports, global.css, OG meta, favicon
│   │   └── ArticleLayout.astro  ← article-nav, nb-article-body, slot, Footer
│   │
│   ├── pages/
│   │   ├── index.astro          ← Hero + homepage notebook entries
│   │   └── [...slug].astro      ← Dynamic routing — uses entry.id (NOT entry.slug)
│   │
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── HeroSketch.astro     ← COI escalation SVG (CSS-drawn)
│   │   ├── Navbar.astro
│   │   ├── NotebookEntry.astro
│   │   ├── Footer.astro
│   │   ├── TemperatureBar.astro
│   │   ├── LatestStamp.astro
│   │   └── mdx/                 ← Used inside .mdx files
│   │       ├── Highlight.astro
│   │       ├── MarginNote.astro
│   │       ├── ScrapCard.astro
│   │       ├── CorrectionBlock.astro
│   │       └── VerdictSeal.astro
│   │
│   ├── content/
│   │   ├── case/               ← .mdx articles
│   │   ├── experiment/
│   │   └── field-note/
│   │
│   └── styles/
│       └── global.css          ← ALL component CSS lives here (not in <style> tags)
│
├── nerd/                       ← Content vault (pillars, agents, seeds) — DO NOT TOUCH
├── docs/                       ← This file + brainstorm prototypes
├── _archive/
│   └── nextjs-legacy/          ← Frozen Next.js/Payload codebase
└── .claude/, CLAUDE.md, GEMINI.md, AGENTS.md
```

---

## What Happened — Historical Record

### Phase 1 — Legacy Archive (✅ DONE)
Moved the entire Next.js/Payload codebase to `_archive/nextjs-legacy/`:
- `app/`, `components/`, `collections/`, `content/` (Payload data), `hooks/`, `lib/`, `payload-config/`, `mastra/`
- `next.config.mjs`, `next-env.d.ts`, `postcss.config.js`, old `package.json`

**One commit:** `chore: archive legacy Next.js/Payload codebase to _archive/nextjs-legacy/`

---

### Phase 2 — Astro Foundation (✅ DONE)

Scaffolded manually (no interactive CLI). The plan originally specified Astro v4 — **this was corrected before execution** when a version audit revealed upstream was at Astro 6.1.9.

**Key difference from the original plan:**

| Original plan | As-built |
|---|---|
| `astro@^4.x` | `astro@^6.1.9` |
| `@astrojs/mdx@^3.x` | `@astrojs/mdx@^5.x` |
| `@astrojs/react@^3.x` | `@astrojs/react@^5.x` |
| `@astrojs/sitemap@^3.x` | `@astrojs/sitemap@^3.7` |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` Vite plugin (Tailwind v4 CSS-first) |
| `tailwind.config.js` with `theme.extend` | `@theme {}` block inside `global.css` |

**`astro.config.mjs` (actual):**
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://beef.im',
  srcDir: './src',
  publicDir: './public',
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

> **Why `@tailwindcss/vite` and not `@astrojs/tailwind`?**
> Tailwind v4 dropped the PostCSS-based integration. The official path for Astro + Tailwind v4 is the Vite plugin. `@astrojs/tailwind` only works with Tailwind v3.

**`global.css` header (actual):**
```css
@import "tailwindcss";

@theme {
  --color-cream: #F0EADC;
  /* ... all design tokens ... */
  --font-display: "Anuphan", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
  /* etc. */
}
```

---

### Phase 3 — Directory Structure (✅ DONE)
Built `src/layouts/`, `src/pages/`, `src/components/`, `src/content/`, `src/styles/`. Stub MDX files added to each collection to prove routing.

---

### Phase 4 — React Islands (⏸ DEFERRED)
The COI, IRR, and Premium calculators were **intentionally removed** from the launch critical path. They were deleted:
- `src/components/tools/COICalculator.tsx`
- `src/components/tools/IRRTruthTeller.tsx`
- `src/components/tools/PremiumCalculator.tsx`
- `src/data/calculator/main_policies.csv`, `riders.csv`
- `src/pages/tools/` (all tool pages)
- `/tools` link removed from `Navbar.astro`

**Rationale:** Keeps the initial bundle zero-JS and static. Calculators can be restored from `_archive/nextjs-legacy/` when needed.

---

### Phase 5 — CSS Migration (✅ DONE)

The original plan said to put component CSS into inline `<style>` blocks inside each `.astro` component. **This was changed during execution.**

**What actually works:** All CSS lives in `src/styles/global.css`. The components use plain class names that match the prototype — no scoped styles. This is simpler and avoids Astro's CSS scoping hash mangling the class names.

The full prototype CSS (`Prototype-Definitive-v1.html` lines 11–321) was ported as-is into `global.css` after the `@theme {}` and `@keyframes` blocks:
- Hero section (`.hero`, `.hero-nav`, `.hero-watermark`, `.hero-sketch`, etc.)
- Homepage entries (`.nb-entry`, `.nb-entry-masthead`, `.nb-entry-h`, `.nb-entry-lede`, `.nb-entry-sidenote`, `.nb-entry-temp`, etc.)
- Article body (`.article-nav`, `.nb-article-body`, `.nb-article-wrap`, `.nb-h`, `.nb-p`, `.nb-note`, `.nb-scrap`, `.nb-correction`, `.nb-verdict`, etc.)

---

### Phase 6 — Self-Host Fonts (✅ DONE — via Fontsource, not manual woff2)

The original plan said: download woff2 files → `public/fonts/` → manual `@font-face`.

**What was done instead:** npm Fontsource packages. Cleaner, version-locked, no manual download.

**Packages installed:**
```
@fontsource/anuphan (400, 500, 700)
@fontsource/ibm-plex-mono (400, 500, 600)
@fontsource/k2d (300, 400, 300-italic, 400-italic)
@fontsource/noto-serif-thai (400, 700)
@fontsource/sarabun (400, 500, 700)
```

**Import location:** `BaseLayout.astro` frontmatter (top of file).

---

### Bugs Fixed & Gotchas

#### ❌ Bug 1: `LegacyContentConfigError` — Wrong config file location

**Error:**
```
[LegacyContentConfigError] Found legacy content config file in "src/content/config.ts".
Please move this file to "src/content.config.ts"
```

**Root cause:** Astro 6 requires the content collection config at `src/content.config.ts` (repo root of `src/`). In Astro 4, it was `src/content/config.ts`.

**Fix:**
```bash
mv src/content/config.ts src/content.config.ts
```

---

#### ❌ Bug 2: Sitemap `_routes.reduce is not a function`

**Error:** `Cannot read properties of undefined (reading 'reduce') at astro:build:done`

**Root cause:** `@astrojs/sitemap` v3.x was incompatible with Astro 4.x. The version mismatch caused a runtime crash.

**Fix:** Upgrading to Astro 6.1.9 + `@astrojs/sitemap` v3.7 resolved it completely. The sitemap now generates `sitemap-0.xml` and `sitemap-index.xml` cleanly.

---

#### ❌ Bug 3: Dynamic routes using deprecated `entry.slug`

**Error:** No hard error — but wrong URL generation at runtime.

**Root cause:** Astro 5+ Content Layer API changed `entry.slug` → `entry.id`.

**Files fixed:**
- `src/pages/[...slug].astro` — changed `entry.slug` → `entry.id`, and `await entry.render()` → `const { Content } = await render(entry)`
- `src/pages/index.astro` — changed `slug={entry.slug}` → `slug={entry.id}` in `<NotebookEntry>`

---

#### ❌ Bug 4: Pages rendered with no styles (all black / unstyled)

**Symptom:** After the upgrade, the dev server served the pages but they were almost entirely unstyled (dark background, tiny text, no parchment design visible).

**Root cause:** The component CSS from `Prototype-Definitive-v1.html` was never in `global.css`. The components had the correct HTML class names, but the matching CSS rules were missing entirely.

**Fix:** Appended the full prototype CSS (Hero, Homepage, Article body sections) to `src/styles/global.css`. After this single edit, the pages immediately rendered as a 1:1 visual match with the prototype.

---

#### ❌ Bug 5: Astro v4 plan used wrong Tailwind integration

**Root cause:** The original scaffolding plan was written when Tailwind v3 + `@astrojs/tailwind` was standard. Tailwind v4 changed the integration model entirely.

**Fix:** Replace `@astrojs/tailwind` with `@tailwindcss/vite` as a Vite plugin, and replace `tailwind.config.js` with `@theme {}` in `global.css`.

---

## Clean-Slate Rebuild Runbook

> Use this if you nuke the installation and need to restore from zero.
> Time estimate: **~45 minutes** if following this exactly.

### Prerequisites

- Node 24 (system-managed via nixpkgs)
- `nerd/`, `docs/`, `_archive/`, `.claude/`, `CLAUDE.md`, `GEMINI.md`, `AGENTS.md` intact (not touched by Astro)
- `git` configured with `origin` pointing to `supmanu/beef-im`

---

### Step 1 — Clear Astro artefacts

```bash
rm -rf src/ public/ dist/ node_modules/ package.json package-lock.json \
       astro.config.mjs tsconfig.json wrangler.toml src/content.config.ts
```

Do NOT delete: `nerd/`, `docs/`, `_archive/`, `.claude/`, `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `.env`, `.gitignore`, `.git`

---

### Step 2 — Create `package.json`

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
    "@astrojs/mdx": "^5.0.0",
    "@astrojs/react": "^5.0.0",
    "@astrojs/sitemap": "^3.7.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@fontsource/anuphan": "*",
    "@fontsource/ibm-plex-mono": "*",
    "@fontsource/k2d": "*",
    "@fontsource/noto-serif-thai": "*",
    "@fontsource/sarabun": "*"
  }
}
```

---

### Step 3 — Create config files

**`astro.config.mjs`:**
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://beef.im',
  srcDir: './src',
  publicDir: './public',
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**`tsconfig.json`:**
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

**`wrangler.toml`:**
```toml
name = "beef-im"
pages_build_output_dir = "dist"
compatibility_date = "2024-01-01"
```

---

### Step 4 — Install dependencies

```bash
npm install
```

---

### Step 5 — Create directory structure

```bash
mkdir -p src/layouts src/pages src/components/mdx \
         src/content/case src/content/experiment src/content/field-note \
         src/styles public
```

---

### Step 6 — Create `src/env.d.ts`

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

---

### Step 7 — Create `src/content.config.ts`

> ⚠️ CRITICAL: File MUST be at `src/content.config.ts`, NOT `src/content/config.ts`.

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  lede: z.string(),
  sidenote: z.string().optional(),
  date: z.coerce.date(),
  category: z.enum(['case', 'experiment', 'field-note']),
  temperature: z.enum(['risk', 'medium', 'low']).optional(),
  code: z.string().optional(),
  wordCount: z.number().optional(),
  readTime: z.string().optional(),
  latest: z.boolean().optional(),
  footerType: z.enum(['analysis', 'cooking']).default('analysis'),
});

const caseCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case' }),
  schema: articleSchema,
});
const experimentCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/experiment' }),
  schema: articleSchema,
});
const fieldNoteCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/field-note' }),
  schema: articleSchema,
});

export const collections = {
  case: caseCollection,
  experiment: experimentCollection,
  'field-note': fieldNoteCollection,
};
```

---

### Step 8 — Create layouts

**`src/layouts/BaseLayout.astro`:**
```astro
---
import '@fontsource/anuphan/400.css';
import '@fontsource/anuphan/500.css';
import '@fontsource/anuphan/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/k2d/300.css';
import '@fontsource/k2d/400.css';
import '@fontsource/k2d/300-italic.css';
import '@fontsource/k2d/400-italic.css';
import '@fontsource/noto-serif-thai/400.css';
import '@fontsource/noto-serif-thai/700.css';
import '@fontsource/sarabun/400.css';
import '@fontsource/sarabun/500.css';
import '@fontsource/sarabun/700.css';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}
const { title, description = 'ประกันเนื้อๆ — BEEF · IM · JOURNAL' } = Astro.props;
---
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content={description}>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:type" content="website">
  <meta property="og:locale" content="th_TH">
  <meta name="twitter:card" content="summary">
</head>
<body>
  <slot />
</body>
</html>
```

**`src/layouts/ArticleLayout.astro`:**
```astro
---
import BaseLayout from './BaseLayout.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
  category: string;
  date: string;
  footerType: 'analysis' | 'cooking';
}

const { title, description, category, date, footerType } = Astro.props;
const categoryMap: Record<string, string> = {
  'case': 'CASE FILE',
  'experiment': 'EXPERIMENT LOG',
  'field-note': 'FIELD NOTE'
};
const displayCategory = categoryMap[category] || category.toUpperCase();
---
<BaseLayout title={`${title} | ประกันเนื้อๆ`} description={description}>
  <section class="article-view active" id="article">
    <nav class="article-nav">
      <a href="/" class="article-nav-back">← กลับหน้าหลัก</a>
      <span class="article-nav-stamp">{displayCategory}</span>
      <span class="article-nav-date">{date}</span>
    </nav>
    <div class="nb-article-body">
      <div class="nb-article-wrap">
        <slot />
        <Footer type={footerType} />
      </div>
    </div>
  </section>
</BaseLayout>
```

---

### Step 9 — Create `src/pages/[...slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import ArticleLayout from '../layouts/ArticleLayout.astro';

export async function getStaticPaths() {
  const cases = await getCollection('case');
  const experiments = await getCollection('experiment');
  const fieldNotes = await getCollection('field-note');

  return [
    ...cases.map(entry => ({ params: { slug: `case/${entry.id}` }, props: { entry, category: 'case' } })),
    ...experiments.map(entry => ({ params: { slug: `experiment/${entry.id}` }, props: { entry, category: 'experiment' } })),
    ...fieldNotes.map(entry => ({ params: { slug: `field-note/${entry.id}` }, props: { entry, category: 'field-note' } })),
  ];
}

const { entry, category } = Astro.props;
const { Content } = await render(entry);
const dateStr = entry.data.date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
---
<ArticleLayout
  title={entry.data.title}
  description={entry.data.lede}
  category={category}
  date={dateStr}
  footerType={entry.data.footerType}
>
  <Content />
</ArticleLayout>
```

---

### Step 10 — Create `src/styles/global.css`

Copy the full CSS from the current `src/styles/global.css` in the repo. The key sections are:
1. `@import "tailwindcss";` — must be first line
2. `@theme { ... }` — all design tokens
3. `@layer base { ... }` — html/body base styles
4. `@layer utilities { ... }` — `.bg-grid-notebook`, `.bg-notebook-paper`
5. All `@keyframes` (wmFade, burstFade, burstRotate, ruleDraw, typeIn, inkSettle, sketchAppear, sketchDraw, sketchDot, downFloat, tapeSettle, verdictDraw)
6. Full Hero CSS (`.hero` → `.hero-down`)
7. Full Homepage CSS (`.homepage` → `.nb-home-footer`)
8. Full Article body CSS (`.article-nav` → `.nb-watermark`)
9. Reduced-motion overrides

> **Shortcut:** The current `global.css` is the source of truth. Just copy it verbatim.

---

### Step 11 — Create components

Copy all `.astro` components from the current repo:
- `src/components/Hero.astro`
- `src/components/HeroSketch.astro`
- `src/components/Navbar.astro`
- `src/components/NotebookEntry.astro`
- `src/components/Footer.astro`
- `src/components/TemperatureBar.astro`
- `src/components/LatestStamp.astro`
- `src/components/mdx/Highlight.astro`
- `src/components/mdx/MarginNote.astro`
- `src/components/mdx/ScrapCard.astro`
- `src/components/mdx/CorrectionBlock.astro`
- `src/components/mdx/VerdictSeal.astro`

---

### Step 12 — Create `src/pages/index.astro`

Copy from the current repo. Key API notes:
- Uses `entry.id` (not `entry.slug`) when passing to `<NotebookEntry>`
- Sorts all collections by `entry.data.date` descending

---

### Step 13 — Create `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" fill="#F0EADC"/>
  <circle cx="16" cy="16" r="12" fill="none" stroke="#CC3A2F" stroke-width="1.5"/>
  <text x="16" y="21" text-anchor="middle" font-family="serif" font-weight="700" font-size="14" fill="#CC3A2F">ป</text>
</svg>
```

---

### Step 14 — Add stub content

Add at least one `.mdx` file per collection (required for the build to work with stub routes):

`src/content/case/stub-case.mdx`:
```mdx
---
title: "Stub Case"
lede: "This is a stub case file."
date: 2026-04-26
category: case
temperature: risk
latest: true
footerType: analysis
---

Stub case content.
```

(Repeat for `experiment/stub-experiment.mdx` and `field-note/stub-field-note.mdx`)

---

### Step 15 — Verify build

```bash
npm run build     # Must exit 0
npm run dev       # Visit http://localhost:4321 — parchment hero + notebook entries
```

**Success criteria:**
- Hero renders with parchment background, watermark กlyph, COI sketch
- Homepage shows notebook entries with category stamps
- Article routes (`/case/stub-case`) render with article nav and content
- Sitemap generates `dist/sitemap-index.xml`

---

### Step 16 — Commit and push

```bash
git add .
git commit -m "feat(astro): clean-slate rebuild — Astro 6.1.9 + Tailwind v4 + Content Layer API"
git push origin main    # origin = supmanu/beef-im → triggers Cloudflare Pages CI
```

---

## Deployment (Cloudflare Pages)

**Project name:** `beef-im`
**Repo:** `supmanu/beef-im` (Git-connected, branch: `main`)
**Build command:** `npm run build`
**Build output:** `dist`

Every `git push origin main` auto-deploys via Cloudflare's CI.

**Custom domain:** Go to CF Dashboard → Pages → `beef-im` → Custom Domains → Add `beef.im`. Cloudflare manages DNS automatically if `beef.im` is already proxied through CF.

---

## Pending (Out of Scope for Initial Launch)

| Task | Owner | Notes |
|---|---|---|
| Wire `beef.im` custom domain in CF dashboard | User | One-click in CF → Pages → Custom Domains |
| Rewrite `/publish` CLI skill | Claude Code | Obsidian seed → MDX with correct frontmatter + notebook components |
| Auditor pipeline integration | Claude Code | New MDX format target |
| React calculator islands | Claude Code | Restore from `_archive/nextjs-legacy/` — COI, IRR, Premium |
| Emdash CMS | Deferred | Post-launch only if mobile editing becomes priority |
| Real article content seeding | Human | Run `/publish` skill on actual Obsidian seeds |
