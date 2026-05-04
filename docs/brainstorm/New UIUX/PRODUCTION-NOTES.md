# beef.im Definitive Scaffolding — Production Notes
> Base: `Prototype-Definitive-v1.html` (forked from GLM-5.1)
> Stack: **Astro 6.2+ + Git CMS + MDX** (Pivoted from Next.js/Payload/Neon — Apr 26, 2026; version uncapped May 4, 2026; Emdash deferred to post-launch)
> Created: 26 Apr 2026

---

## Changes Made in Definitive v1 (vs GLM-5.1)

### 1. Hero Typography Scaled Up for Desktop
The GLM-5.1 sizes felt small on 1080p+ PC screens. Mobile sizes are untouched.

| Element | Mobile | Tablet (768px+) | Desktop (1200px+) | GLM-5.1 was |
|---|---|---|---|---|
| **Hero headline** | 28px | 52px | 58px | 46px desktop |
| **Brand logo** | 16px | 20px | 22px | 16px flat |
| **Brand sub-label** | 8px | 9.5px | 10px | 8px flat |
| **Eyebrow** | 9.5px | 10.5px | 11px | 9.5px flat |
| **Subtitle** | 15px | 17px | 18px | 15px flat |
| **CTA button** | 13px / 12×28 pad | 14.5px / 14×34 pad | 15px / 15×38 pad | 13px flat |
| **Nav-right date** | 9px | 10px | 10.5px | 9px flat |
| **Hero content max-width** | 480px | 520px | 560px | 480px flat |
| **Margin sketch** | 96×74 | 130×100 | 160×124 | 130×100 flat |

### 2. Unused Font Removed
`Caveat` was in the Google Fonts URL but never referenced in CSS. Removed to reduce page weight.

### 3. Large Desktop Breakpoint (1200px+)
Added `@media(min-width:1200px)` for notebook containers:
- `.hp-container` → max-width 640px (was 580)
- `.nb-article-wrap` → max-width 660px (was 620)

---

## What's Missing for Production

### Must-Have (Before Launch)

#### Site-Wide Footer
The scaffold has per-article watermarks but no persistent footer with:
- Navigation links (About, Tools/Calculator, สมุดบันทึก)
- Social links (if any)
- Legal disclaimer (OIC license number, etc.)
- Dual footer per constitution.md: `📊 บทวิเคราะห์โดย:` / `🔥 คัดเนื้อโดย:`

#### Mobile Navigation
The current nav is a simple flex row (`hero-nav`). Needs:
- Hamburger menu or slide-out drawer for mobile
- Links to: สมุดบันทึก (home), เกี่ยวกับเรา (about), เครื่องมือ (tools/calc)
- The nav should become sticky on scroll past the hero

#### SEO Meta Tags
Each article needs:
- `<meta name="description">` with the lede text
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Twitter Card tags
- Structured data (`Article` schema with `author`, `datePublished`)
- Canonical URLs

#### OG Image Generation
Each article needs a dynamic social share image. Suggested approach:
- Use Satori (via `astro-og-canvas` or custom endpoint) — works with Astro's SSG
- Template: parchment background + Anuphan headline + red category stamp
- Size: 1200×630px

### Should-Have (Post-Launch Iteration)

#### Search & Category Filter
As article count grows beyond ~10:
- Simple text search bar (Thai-aware)
- Category filter tabs: CASE FILE / EXPERIMENT LOG / FIELD NOTE
- Keep the flat-list layout — just filter which entries show

#### Reading Progress Bar
For long-form CASE FILE articles (2000w+):
- Thin bar at top of viewport showing scroll progress
- Use `--red` color for CASE FILE, `--burn` for EXPERIMENT, `--teal` for FIELD NOTE

#### Content Sharing
- Copy-link button per article
- Optional: share to LINE (primary Thai social) / Twitter

### Design Decision: No Dark Mode
Parchment IS the brand identity. The warm cream/gold/navy palette doesn't translate to dark mode without losing the notebook metaphor entirely. **Ship light-only.**

---

## Font Issues & Loading Strategy

### Current Font Stack (5 families)
| Font | Role | Weights | Est. Size (Thai subset) |
|---|---|---|---|
| Anuphan | Display, headlines, brand | 400, 500, 700, 800 | ~120KB |
| Sarabun | Body text, lede | 400, 500, 700 | ~100KB |
| IBM Plex Mono | Metadata, code, labels | 400, 500, 600 | ~60KB |
| K2D | Handwritten sidenotes | 300, 400, 300i, 400i | ~90KB |
| Noto Serif Thai | Article body (serif register) | 400, 700 | ~80KB |

**Total: ~450KB of web fonts** — this is heavy for Thai text.

### Recommended Loading Strategy

#### Critical Path (preload, above-fold)
```html
<link rel="preload" href="[Anuphan-woff2-url]" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="[IBMPlexMono-woff2-url]" as="font" type="font/woff2" crossorigin>
```

#### Deferred (load after paint)
- `Sarabun` — body text is below fold (homepage entries)
- `K2D` — sidenotes are below fold
- `Noto Serif Thai` — only used in article view (behind a click)

#### Optimization Options
1. **Subset to Thai + Latin Basic** — reduces each font by ~40%
2. **Use `font-display: swap`** — already set via `&display=swap` in Google Fonts URL ✅
3. **Self-host fonts** — avoids Google Fonts round-trip. Download woff2 files and serve from R2.
4. **Consider dropping Noto Serif Thai** — it's only used for `.nb-p` in article body, and Sarabun already handles body text well. Test whether the serif register adds enough value to justify the extra 80KB.

### Font Conflict: K2D Italic vs K2D Regular
The scaffold loads both `300` and `400` weights for K2D in both normal and italic. But the CSS only ever uses:
- `font-weight: 300; font-style: italic;`

**Recommendation:** Remove `K2D:wght@0,400;1,400` (regular 400 weight) from the font URL. We only need `K2D:ital,wght@1,300` for production, saving ~45KB.

---

## Project Architecture — Astro + Emdash + MDX

### Why We Pivoted (Apr 26, 2026)

The "Forensic Notebook" design requires rich structural components (margin notes, taped evidence cards, correction blocks, verdict seals). In Payload CMS, each of these would need a custom Lexical Block (React component for the admin editor + schema + JSON-to-HTML renderer). The `/publish` CLI skill would also need to convert markdown to Payload's Lexical JSON format — fragile and complex.

With **Astro + MDX**, these components are used directly inside the markdown content files. No CMS adapter needed. No database. Git is the CMS.

### File Structure

```
├── astro.config.mjs                ← Astro config (MDX, Tailwind v4, sitemap)
├── tailwind.config.js              ← Design tokens from :root variables
├── public/
│   └── fonts/                      ← Self-hosted woff2 (Anuphan, Sarabun, etc.)
│
├── layouts/
│   ├── BaseLayout.astro            ← <html>, fonts, global CSS, SEO defaults
│   ├── ArticleLayout.astro         ← Notebook grid + article nav + footer
│   └── ToolLayout.astro            ← Layout for interactive tool pages
│
├── pages/
│   ├── index.astro                 ← Homepage (Hero + Notebook TOC)
│   ├── about.astro                 ← About page
│   ├── tools/
│   │   ├── index.astro             ← Tools landing page
│   │   ├── coi-calculator.astro    ← COI calculator (React Island)
│   │   ├── irr-truth-teller.astro  ← IRR calculator (React Island)
│   │   └── premium-calculator.astro← Premium calculator (React Island)
│   └── [...slug].astro             ← Dynamic article pages from content/
│
├── content/
│   ├── config.ts                   ← Astro Content Collections schema
│   ├── case/                       ← CASE FILE articles (.mdx)
│   │   ├── unit-linked.mdx
│   │   └── whole-life-8-figures.mdx
│   ├── experiment/                 ← EXPERIMENT LOG articles (.mdx)
│   │   └── ribeye-54c.mdx
│   └── field-note/                 ← FIELD NOTE articles (.mdx)
│       └── pork-belly-fish-sauce.mdx
│
├── components/
│   ├── Hero.astro                  ← Full hero section (pure Astro, zero JS)
│   ├── HeroSketch.astro            ← COI escalation SVG (CSS-animated)
│   ├── Navbar.astro                ← Sticky nav with mobile hamburger
│   ├── NotebookEntry.astro         ← TOC entry (masthead + headline + lede + sidenote)
│   ├── Footer.astro                ← Site-wide footer with dual watermark
│   ├── TemperatureBar.astro        ← risk/medium/low gradient bar
│   ├── LatestStamp.astro           ← "ล่าสุด" sealing-wax stamp
│   │
│   ├── mdx/                        ← MDX components (used inside article .mdx files)
│   │   ├── Highlight.astro         ← Yellow text highlight
│   │   ├── MarginNote.astro        ← Positioned margin annotation
│   │   ├── ScrapCard.astro         ← Taped evidence card with ::before tape
│   │   ├── CorrectionBlock.astro   ← Strikethrough + fix pattern
│   │   └── VerdictSeal.astro       ← Animated SVG verdict circle
│   │
│   └── tools/                      ← React Islands (interactive calculators)
│       ├── PremiumCalculator.tsx    ← Ported from legacy Next.js
│       ├── COICalculator.tsx        ← Ported from legacy Next.js
│       └── IRRTruthTeller.tsx       ← Ported from legacy Next.js
│
└── styles/
    └── global.css                  ← Design tokens, notebook-grid utility, all CSS
```

### MDX Article Example

An article `.mdx` file in `content/case/unit-linked.mdx` would look like:

```mdx
---
title: "Unit-linked: กับดักค่าธรรมเนียม ที่ตัวแทนไม่บอก"
category: "CASE FILE"
slug: "unit-linked"
date: 2026-04-25
author: "ณัฐพล"
readTime: "11 MIN"
wordCount: 2840
temperature: "risk"
code: "AIA-UL"
lede: "COI ปีที่ 30 = 128,400 บาท — exponential curve ที่หายไปจาก presentation ทุกครั้ง"
sidenote: "ตัวอย่าง AIA Multi-Pay CI ปี 2024 — COI เพิ่ม 8% ต่อปีหลังอายุ 50"
latest: true
footerType: "analysis"
---
import MarginNote from '../../components/mdx/MarginNote.astro';
import ScrapCard from '../../components/mdx/ScrapCard.astro';
import CorrectionBlock from '../../components/mdx/CorrectionBlock.astro';
import VerdictSeal from '../../components/mdx/VerdictSeal.astro';
import Highlight from '../../components/mdx/Highlight.astro';

เวลาตัวแทนขาย Unit-linked สิ่งที่คุณเห็นคือกราฟผลตอบแทนที่สมมติ 7–8% ต่อปี
สิ่งที่คุณไม่เห็นคือ <Highlight>ค่าใช้จ่ายที่หักจากกองทุนทุกเดือน</Highlight>

<MarginNote position="right">
  กับดักที่พบบ่อยที่สุด — ตัวแทนมักบอกว่า "เบี้ยเท่าเดิมตลอดสัญญา"
</MarginNote>

<ScrapCard label="EXHIBIT A · AIA-UL COI SCHEDULE">
  | รายการ | จำนวน |
  |--------|-------|
  | เบี้ยรายปี (ปี 1–30) | ฿120,000 |
  | COI ปีที่ 30 (อายุ 65) | ฿128,400 |
</ScrapCard>

<CorrectionBlock
  strike='ความเชื่อผิด: "Unit-linked ดีกว่า Term เพราะเอาเงินคืนได้"'
  fix="ความจริง: เงินที่คุณ 'ได้คืน' คือเงินที่คุณจ่ายเข้าไป — ลบด้วยค่าธรรมเนียม"
/>

<VerdictSeal line1="ตรวจสอบ" line2="ก่อนเซ็น" />
```

### Legacy React Tools — Astro Islands

The legacy site has interactive React calculators (COI, IRR Truth Teller, Premium Calculator). These **do NOT need to be rewritten**. Astro's Island Architecture loads React only for the interactive component while the rest of the page stays zero-JS.

```astro
---
// pages/tools/coi-calculator.astro
import ToolLayout from '../../layouts/ToolLayout.astro';
import COICalculator from '../../components/tools/COICalculator.tsx';
---
<ToolLayout title="เครื่องคำนวณ COI">
  <COICalculator client:load />
</ToolLayout>
```

Hydration options:
- `client:load` — hydrate immediately on page load (for calculators)
- `client:visible` — hydrate when component scrolls into view (for charts below fold)
- `client:idle` — hydrate after page is idle (for non-critical interactive elements)

The CSV data files (`main_policies_full.csv`, `riders_full.csv`) can be imported as static data at build time via Vite, so no API or database needed.

### Key Implementation Notes

1. **Grid Background Pattern** — appears in 4 places. Extract to a shared CSS utility:
   ```css
   .notebook-grid {
     background-image:
       linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
       linear-gradient(180deg, var(--grid-line) 1px, transparent 1px);
     background-size: 24px 24px;
   }
   ```

2. **Article Routing** — each article is a `.mdx` file in `content/`. Astro's Content Collections auto-generate routes via `[...slug].astro`. URLs like `/case/unit-linked`, `/experiment/ribeye-54c` are derived from the folder + slug frontmatter.

3. **Animations** — keep CSS keyframes for one-shot entrance animations (`inkSettle`, `ruleDraw`, `typeIn`). Use a small vanilla JS `IntersectionObserver` snippet (in a `<script>` tag) for entry fade-in. The infinite sunburst rotation stays as pure CSS. No Framer Motion needed.

4. **The `.nb-scrap::before` tape effect** — pure CSS, no images. Preserve exactly as-is.

5. **Reduced Motion** — already has `@media(prefers-reduced-motion:reduce)` block. Astro components are HTML/CSS by default, so this just works.

6. **Emdash CMS** — sits on top of the Git repo. Provides a web-based visual editor for `.mdx` files (edit from phone/tablet). Source of truth remains Git. Optional — can be added post-launch.

7. **No Database** — all content lives in `content/` as MDX files. Deployed via Vercel (or Cloudflare Pages). Zero runtime cost.

---

## Learnings from `astro-nerd` Prototype

> Source: `~/Projects/astro-nerd/` — a clean-room port of the legacy Nerd with Nart site to Astro 6.1.
> Files: [EMDASH_MIGRATION.md](file:///home/supmanu/Projects/astro-nerd/EMDASH_MIGRATION.md), [CLAUDE.md](file:///home/supmanu/Projects/astro-nerd/CLAUDE.md), [README.md](file:///home/supmanu/Projects/astro-nerd/README.md)

### Visual Parity Result
The Astro port achieved **95–97% visual parity** with the original Next.js + Payload site. The remaining 3–5% was CSS crispiness differences (font rendering, subpixel alignment). Since beef.im is a ground-up rebuild with a new design system, this gap is irrelevant.

### Emdash CMS — Gotchas & Evolution (v0.1.0 → v0.7.0)

> We tested v0.1.0 in Mar 2026. Current release is **v0.7.0** (Apr 23, 2026). Many issues fixed.

| Issue | v0.1.0 Status | v0.7.0 Status |
|---|---|---|
| **`d1()` not exported** | Not exported despite docs | ✅ **Fixed** — `d1()` is now the primary setup pattern |
| **`better-sqlite3` needs Python** | Native compilation dependency | ⚠️ Same — use `libsql` (WASM) to avoid |
| **SSR required** | `output: 'server'` mandatory | ⚠️ Same — still requires SSR |
| **No built-in renderer** | Portable Text, not MDX | ⚠️ Same — still Portable Text |
| **Visual editing broken** | Inline editor always opened admin tab | ✅ **Fixed** — manifest fetch bug patched |
| **Seed status bug** | `"published"` entries weren't actually published | ✅ **Fixed** — live revisions now created |
| **Cold start latency** | Several seconds on Asia colos | ✅ **Fixed** — under 1 second (search deferred, manifest cached, D1 replicas) |
| **N+1 query performance** | Multiple round-trips per entry | ✅ **Fixed** — batch JOINs, per-request caching, query dedup |
| **Peer dep conflicts** | Astro 6.x peer dep warnings | ⚠️ Unknown — use `--legacy-peer-deps` as safety net |

### What's New in v0.7.0 (Relevant to beef.im)

| Feature | Detail |
|---|---|
| **`npm create emdash@latest`** | Official scaffolding — much easier than our manual v0.1.0 install |
| **Admin white-labeling** | Custom logo/name/favicon in `/_emdash/admin` — can brand as beef.im |
| **D1 read replicas** | Anonymous reads → nearest replica. Writes → primary. Global perf boost |
| **Self-hosted admin fonts** | Noto Sans via Astro Font API; Thai addable via `fonts.scripts` config |
| **Built-in MCP server** | AI tools can interact with content directly (relevant for agent pipeline) |
| **Passkey-first auth** | WebAuthn + OAuth + magic link — no password management |
| **Sandboxed plugins** | Worker isolates with capability manifests — enterprise-grade security |
| **`after()` helper** | Defer work past HTTP response (audit logging, analytics) |
| **WordPress import** | WXR exports, REST API, or WordPress.com — if we ever migrate old content |
| **Starter templates** | Blog, Marketing, Portfolio — can scaffold from these |
| **10.1k GitHub stars** | Growing community — 848 forks, 89 releases, active development |

### Critical Architecture Decision: Emdash = SSR, Not SSG

Emdash requires server-side rendering because it uses sessions and request headers at runtime. This means:
- **No `getStaticPaths()`** — routes resolve at request time
- **Content updates are instant** — no rebuild needed
- **Cold starts on Workers ~5-50ms** instead of pre-built HTML
- **Admin UI at `/_emdash/admin`** instead of static CMS

**Impact on beef.im:** If we want the Notebook pages to be static (fastest possible, zero runtime cost), we have two paths:
1. **Emdash for editing only** — use Emdash admin to edit content, but build/deploy as static via Astro's hybrid mode (`output: 'hybrid'`)
2. **Skip Emdash entirely** — edit `.mdx` files directly in Obsidian/VS Code, commit to Git. Emdash becomes optional and can be added later.

> Recommendation: **Path 2 for launch.** Our Obsidian → CLI pipeline is already established. While v0.7.0 has fixed most v0.1.0 pain points, the core trade-off is unchanged: Emdash stores content as Portable Text (not MDX), so our custom notebook components would need custom PT block types + a renderer. Add Emdash post-launch when mobile editing becomes a priority — by then it may reach v1.0 with even more stability.

### Emdash Dual-Path Config Pattern

The astro-nerd project solved local vs. production environments with an env-var driven config:

```js
// astro.config.mjs — dual-path pattern from astro-nerd
import emdash, { local } from 'emdash/astro';
import { libsql } from 'emdash/db';

const isCloudflare = process.env.DEPLOY_TARGET === 'cloudflare';

emdash({
  database: isCloudflare
    ? libsql({ url: process.env.TURSO_URL, authToken: process.env.TURSO_AUTH_TOKEN })
    : libsql({ url: 'file:./emdash.db' }),
  storage: isCloudflare
    ? s3({ endpoint: process.env.R2_ENDPOINT, bucket: 'beef-im-media', ... })
    : local({ directory: './uploads', baseUrl: '/_emdash/api/media/file' }),
})
```

### Cloudflare Deployment — Verified Steps

From the astro-nerd experiment, the deploy pipeline is:

```bash
# 1. Turso DB (production database for Emdash)
turso db create beef-im-db
turso db tokens create beef-im-db

# 2. R2 bucket (media storage)
wrangler r2 bucket create beef-im-media

# 3. Secrets
wrangler secret put TURSO_URL
wrangler secret put TURSO_AUTH_TOKEN
wrangler secret put R2_ENDPOINT
wrangler secret put R2_ACCESS_KEY_ID
wrangler secret put R2_SECRET_ACCESS_KEY

# 4. Deploy
wrangler pages deploy dist
```

Build command for Cloudflare Pages: `npm ci --legacy-peer-deps && npm run build`

### Portable Text vs. MDX — The Fork

Emdash uses **Portable Text** (structured JSON) for content. This is different from MDX. You need a custom renderer component (`@portabletext/react`) to map Portable Text blocks to your design system components.

**For beef.im:** If we go **MDX-only** (Path 2 above), we skip Portable Text entirely. Our custom components (`<MarginNote>`, `<ScrapCard>`, etc.) work natively in MDX without any renderer mapping. If we add Emdash later, we'll need to build a Portable Text → MDX bridge or write custom PT block types.

### React Islands — Confirmed Working Patterns

The astro-nerd project validated these exact patterns for interactive components:

| Component | Hydration | Notes |
|---|---|---|
| `COICalculator.tsx` | `client:load` | TMO 2017 mortality table + recharts chart |
| `PremiumCalculator.tsx` | `client:load` | CSV rate lookup + discount logic |
| `SearchModal.tsx` | `client:load` | Fuse.js, keyboard nav (Cmd+K) |
| `Snowstorm.tsx` | `client:visible` | Canvas particle system |
| `CoreValuesAccordion.tsx` | `client:visible` | Framer Motion accordion |
| `ContactBackground.tsx` | `client:visible` | Ambient orb animations |

**Key pattern:** Cross-island communication uses native `CustomEvent`, NOT React Context (React context doesn't span across Astro islands).

### Existing Calculator Assets (Reusable)

The following files from astro-nerd can be directly copied to beef.im:

| File | What |
|---|---|
| `src/data/calculator/main_policies.csv` | 504 rows, 3 plans (20PLN, 15Pay25, Excel) |
| `src/data/calculator/riders.csv` | 53 rows (HH, Infinite Care, CI riders) |
| `src/components/COICalculator.tsx` | Working COI calculator with recharts |
| `src/pages/api/calculate-premium.ts` | Server-side premium calculation API |

The Sovereign Pricing Engine was a placeholder in astro-nerd — needs the full logic from the original Next.js project.

---

## Sizing Reference Table (All Breakpoints)

### Mobile (<768px)
- Hero h1: 28px
- Brand: 16px
- Entry headline: 18px
- Entry lede: 13px
- Article body: 15px
- Container: 100% - 36px padding

### Tablet (768px–1199px)
- Hero h1: 52px
- Brand: 20px
- Entry headline: 19.5px
- Entry lede: 13px
- Article body: 15px
- Container: 580px / 620px (article)

### Desktop (1200px+)
- Hero h1: 58px
- Brand: 22px
- Entry headline: 19.5px
- Entry lede: 13px
- Article body: 15px
- Container: 640px / 660px (article)

---

*Last updated: 26 Apr 2026 · Opus 4.6 analysis*
*Stack pivot: Next.js/Payload/Neon → Astro/Emdash/MDX (Apr 26, 2026)*
*Emdash learnings incorporated from ~/Projects/astro-nerd/ (Apr 26, 2026)*
