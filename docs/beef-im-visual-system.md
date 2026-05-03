# beef.im — Visual System

**Status:** Synced to live codebase — describes `src/styles/global.css` as of 2026-05-03.
**Source of truth:** the CSS. When this doc and the CSS disagree, fix the doc.
**Last updated:** 2026-05-03 (full sync from Apr 28 v1.0 draft)

**Brand master line:** ดูเนื้อ ไม่ดูหน้า — *judge by substance, not appearance.*

---

## 1. Aesthetic — "Notebook"

beef.im renders as a **working paper notebook**: cream parchment, faint graph-paper grid, hand-marked annotations in red ink, small ephemera (tilted scraps, post-its, wax seals). The hero acts as a notebook cover; article pages are inner pages with marginalia.

**Tone register:** academic-but-warm. Investigative, not promotional. Annotated, not decorated.

**What it is not:**
- Not adventure / expedition (mountain metaphor retired with rebrand)
- Not editorial magazine (no full-bleed photography, no display-type overrides)
- Not minimalist tech (no infinite white space, no flat colour blocks)

---

## 2. Color Palette

All tokens declared in `global.css` via Tailwind v4's `@theme {}` block. Available as `var(--color-*)` and Tailwind utility classes (`text-ink`, `bg-cream`, etc.).

| Token | Hex | Role |
|---|---|---|
| `--color-cream` | `#F0EADC` | Primary parchment — page canvas, CTA text on dark |
| `--color-cream-card` | `#F8F2E4` | ScrapCard and exhibit surface — slightly warmer than page |
| `--color-cream-deep` | `#E3DAC3` | Deep background (`.bg-notebook-paper` utility) |
| `--color-ink` | `#1B1A17` | Primary body text — near-black, never pure `#000` |
| `--color-red` | `#CC3A2F` | Primary accent — VerdictSeal stroke, hover underline, accent rules |
| `--color-red-stamp` | `#A84030` | Secondary red — article masthead badges (CASE FILE, EXPERIMENT LOG) |
| `--color-navy` | `#2B4A5E` | MarginNote text, bylines, sidenotes, hero sub, sketch lines |
| `--color-burn` | `#C2451F` | Burnt sienna — eyebrow labels, back-links, SP-brand hover, entry numbers |
| `--color-teal` | `#2E6D63` | Nav-right labels, ScrapCard labels, date stamps |
| `--color-gold` | `#C7B78F` | Hairline rules between entries, page-footer border |
| `--color-highlight` | `#F4EED8` | Inline `<Highlight>` background tint |
| `--color-grid-line` | `rgba(120,100,75,0.11)` | Graph-paper grid on all surfaces |

**Color rules:**
- **Pure black is banned** — use `--color-ink`. Pure black reads foreign on parchment.
- **Pure white is banned** for body backgrounds — reserved for scrap cards via `--color-cream-card`.
- **Red (`--color-red`) is sacred** — verdicts, accent rules, hover underlines only. Don't use for body emphasis; use `<Highlight>` (yellow) instead.
- **Burn (`--color-burn`) ≠ Red** — burn is the warm secondary accent for navigation and labels; red is the brand verdict colour.

**Hardcoded values not yet tokenised** (in CSS but not in `@theme`):

| Value | Where | Nearest token |
|---|---|---|
| `#EFE8D5` | `.homepage`, `.nb-article-body` backgrounds | close to `--color-cream-deep` |
| `rgba(239,232,213,0.96)` | `.article-nav` background | close to `--color-cream` at 96% |
| `rgba(244,238,216,0.85)` | Latest stamp, scrap tape | close to `--color-cream` |

---

## 3. Typography

### Font families

| Token | Family + fallback | Loaded weights | Role |
|---|---|---|---|
| `--font-display` | `"Anuphan"`, `"Anuphan-fallback"`, sans-serif | 700, 800 | Hero headline, article H1, brand wordmark, nav badges |
| `--font-thai` | `"Sarabun"`, `"Sarabun-fallback"`, sans-serif | 400, 400-italic, 500, 700 | Body Thai prose everywhere |
| `--font-mono` | `"IBM Plex Mono"`, monospace | (system/CDN) | Dates, codes, badges, masthead labels, back-links |
| `--font-hand` | `"K2D"`, `"K2D-fallback"`, sans-serif | 300, 300-italic | MarginNote text, sidenotes, bylines, VerdictSeal caption, page-footer |

### Metric-adjusted fallbacks

All three `@fontsource` families have `@font-face` fallbacks in `global.css` using `local("Noto Sans Thai")` with size-adjust overrides. This eliminates CLS during web-font load.

| Fallback | size-adjust | ascent-override | descent-override |
|---|---|---|---|
| `Anuphan-fallback` | 103.2% | 95% | 25% |
| `Sarabun-fallback` | 106.1% | 92% | 28% |
| `K2D-fallback` | 102% | 94% | 26% |

IBM Plex Mono: no fallback needed — monospace stack substitutes cleanly.

### LCP font preload

`BaseLayout.astro` preloads the hashed Anuphan 700 woff2 (LCP font on every page). The hash is locked to the current `@fontsource/anuphan` version — update the `href` if the package version bumps.

### Type scale

**Hero (`/`):**

| Element | Size (mobile / tablet / desktop) | Family | Weight | Notes |
|---|---|---|---|---|
| Brand wordmark | 16px / 20px / 22px | Anuphan | 700 | + IBM Plex Mono sub-label 8–10px |
| Eyebrow | 9.5px / 10.5px / 11px | IBM Plex Mono | — | `letter-spacing: 0.18–0.20em`, typewriter reveal |
| Hero H1 | 36px / 52px / 58px | Anuphan | 800 | `letter-spacing: -0.025em` / `-0.03em` |
| Sub-headline | 15px / 17px / 18px | K2D | 300 italic | navy `#2B4A5E` |
| CTA button | 13px / 14.5px / 15px | Anuphan | 600 | cream on dark |

**Article pages:**

| Element | Size (mobile / desktop) | Family | Notes |
|---|---|---|---|
| Back-link | 12px | IBM Plex Mono | `padding: 8px 10px`, `letter-spacing: 0.12em` |
| Nav stamp (format badge) | 9.5px | Anuphan 700 | uppercase, `--color-red-stamp` |
| Nav date | 9px | IBM Plex Mono | teal, uppercase |
| Article H1 | 28px / 34px | Anuphan | 800, `line-height: 1.2`, `letter-spacing: -0.015em` |
| Byline | 13px | K2D | 300 italic, navy |
| Body paragraph | 15px / 16px ≥1200px | Sarabun | `line-height: 1.78` |
| ScrapCard label | 8px | IBM Plex Mono | teal, `letter-spacing: 0.12em`, 600 weight |
| MarginNote text | 12px (desktop) / 12.5px (mobile) | K2D | 300 italic, navy |
| VerdictSeal caption | 12px | K2D | 300 italic, navy, `max-width: 180px` |
| VerdictSeal inner text | 11px | Anuphan (SVG inline) | 700, `fill: var(--color-red)`, `text-anchor: middle` |
| Page-footer | 11px | K2D | 300 italic, navy |
| Footer stamp SVG text | 10px | Anuphan (SVG inline) | 700, `fill: var(--color-red)`, `opacity: 0.85` |
| Watermark footer | 10.5px | (inherited) | `color: rgba(27,26,23,0.42)` |

**Static pages (via `StaticPageLayout`):**

| Element | Size | Family | Notes |
|---|---|---|---|
| Brand wordmark | 16px / 20px / 22px | Anuphan 700 | identical to hero nav |
| Eyebrow | 10px | IBM Plex Mono | `letter-spacing: 0.18em`, `--color-burn` |
| H1 | `clamp(28px, 5vw, 40px)` | Anuphan | 800, `letter-spacing: -0.025em` |
| H2 | 20px | Anuphan | 700, `letter-spacing: -0.01em` |
| Body paragraph | 16px | Sarabun | `line-height: 1.8` |

### Letter-spacing conventions
- All uppercase mono labels: `0.14–0.22em`
- Display headings: `-0.012em` to `-0.03em` (tight)
- Body Thai: `0` (default)

### Banned
- `font-mono` on display numbers — use Anuphan (monospace gives commas equal width as digits)
- `tracking-widest` — use literal `0.14–0.22em` values
- Pure white on body text — use `--color-ink`

---

## 4. Background Surfaces

Every surface uses the graph-paper grid. Grid is `24px × 24px`, colour `rgba(120,100,75,0.11)`.

| Surface | Background recipe | Used on |
|---|---|---|
| Hero | grid + radial centre glow + cream gradient `#F3EDDF→#EFE9D8→#EFE8D5` | `.hero` |
| Homepage stream | grid + radial vignette + `#EFE8D5` solid | `.homepage` |
| Article body | grid + radial vignette + `#EFE8D5` solid | `.nb-article-body` |
| Article sticky nav | grid + `rgba(239,232,213,0.96)` + `backdrop-filter: blur(8px)` | `.article-nav` |
| Static pages | grid + cream gradient `#F0EADC→#EDE7D8` | `.sp-wrap` |
| Notebook paper utility | grid + radial vignette + `--color-cream-deep` | `.bg-notebook-paper` |
| Paper grain overlay | SVG `feTurbulence` fractalNoise, `opacity: 0.055`, `position: fixed` | `body::after` (all pages) |

**Grid rule:** never align content to the grid — content respects its own typographic baseline. The grid is texture, not a layout system.

**Paper grain overlay (`body::after`):** `position: fixed; z-index: 9998` — above all page content. `pointer-events: none`. Inline SVG `background-image` (no external request). `background-size: 100px 100px` tiled. Disabled under `prefers-reduced-motion: reduce`.

---

## 5. Motion Vocabulary

All animation is pure CSS or small vanilla inline JS. No GSAP, Lenis, Three.js, or animation libraries.

### Active animations

| Name | Properties animated | Duration | Trigger | Where used |
|---|---|---|---|---|
| `inkSettle` | `filter: blur(4px→0)` + `opacity: 0→1` + `translateY(4px→0)` | 350–1200ms | load / JS `.ink-visible` | Hero H1 (1s, 1.2s delay), hero sub (800ms), hero CTA (600ms), homepage entries (500ms), header (400ms) |
| `tapeSettle` | `translateY(-5px→0)` + `opacity: 0.7→1` | 550ms `cubic-bezier(0.34,1.56,0.64,1)` | load | `<ScrapCard>` spring-in |
| `verdictDraw` | `stroke-dashoffset: 195→0` (SVG ellipse) | 800ms `ease-in-out` | load | `<VerdictSeal>` circle stroke |
| `page-tear-in` | `clip-path: polygon()` via `--ink-spread: 0%→100%` | 850ms `ease-out` | article navigation | `<main>` via `.nb-page-reveal` (ArticleLayout inline script) |
| `ruleDraw` | `width: 0→60px` + opacity | 900ms `cubic-bezier(0.25,0.1,0.25,1)` | load | Hero red accent rule |
| `typeIn` | `width: 0→100%` (typewriter) | 1.2s `steps(28)` | load | Hero eyebrow text |
| `sketchDraw` | `stroke-dashoffset: 240→0` | 2.2s `ease-in-out` | load | Hero margin sketch lines |
| `sketchDot` | `opacity: 0→1` + `r: 0→3.5` | 400ms | load | Hero sketch data points |
| `sketchAppear` | `opacity: 0→1` | 400–600ms | load | Hero sketch labels |
| `wmFade` | `opacity: 0→1` | 1800ms | load | Hero watermark text |
| `burstFade` | `opacity: 0→1` | 2200ms | load | Hero sunburst reveal |
| `burstRotate` | `rotate(0→360deg)` | 59s linear infinite | load (starts at 3.6s) | Hero sunburst slow spin |
| `.nb-link::after` | `width: 0→100%` | 300ms ease | hover | Animated underline links |
| `.sp-brand::after` | `width: 0→100%` | 400ms ease | hover | Static-page brand underline |
| `.hero-brand` hover | `color` shift + underline draw | 350ms ease | hover | Hero brand wordmark |

**Homepage ink-settle** is scroll-driven: `IntersectionObserver` adds `.ink-visible` → triggers `inkSettle`. No-JS fallback: `.js-ink-init` guard class is never added, so entries are always visible.

**Page-tear on article pages:** fires on every article navigation (not session-gated — deviation §17). `.nb-page-reveal` added to `<main>`, removed on `animationend`. Uses `@property --ink-spread { inherits: false }` to prevent style-recalculation cascade across all DOM descendants.

### Pacing rules

| Context | Duration |
|---|---|
| Hover interactions | 200–400ms |
| Element entrances | 500–1200ms |
| Hero sequence (full cascade) | 0.2s → 4.8s |
| Page-tear transition | 850ms (direct), 500ms (ViewTransitions fallback) |
| Maximum single animation (content pages) | 2.0s |

### Banned animations

Per plan §1.5 — do not introduce:

- 3D transforms (`perspective`, `rotateY/X`) — causes motion sickness (vestibular memory)
- Viewport-relative translation (`translateX(100vw)`)
- Parallax depth on body content
- Scroll-jacking beyond a single frame
- Character-level text-splitting (`SplitType`, CharReveal) — DOM bloat
- Text scramble on editorial labels (calculator results only, not editorial text)
- Custom cursor
- Auto-playing video, audio, marquee tickers

### `prefers-reduced-motion`

Two blocks in `global.css`:
1. **Global override** — `animation-duration: 0.01ms`, `transition-duration: 0.01ms` on `*, ::before, ::after`
2. **Component overrides** — hero elements forced to final visible state (`opacity: 1`, `width: auto`), ScrapCard animation removed, VerdictSeal `stroke-dashoffset: 0`, page-tear `clip-path: none`, paper grain hidden

---

## 6. MDX Component Vocabulary

Five components in `src/components/mdx/`. **Globally injected** by `src/pages/[...slug].astro` via `<Content components={mdxComponents} />` — no `import` statements in `.mdx` files.

### `<Highlight>`

```mdx
<Highlight>ค่าธรรมเนียมที่ซ่อนอยู่</Highlight>
```

CSS class `.nb-hl`. Yellow inline highlight: `background: rgba(255,237,100,0.5)`, `box-shadow: 0 0 2px rgba(255,237,100,0.3)`, `padding: 1px 0`.

**Use:** 2–5 per article, key phrases the reader should lock onto mid-sentence — numerical anchors, counterintuitive one-liners. Not for cosmetic emphasis (use bold). Not inside tables or code blocks.

### `<MarginNote>`

```mdx
<MarginNote>คำอธิบายเสริม</MarginNote>
<MarginNote position="left" caution>⚠ คำเตือน</MarginNote>
```

Default: right-side `.nb-note`. `position="left"`: `.nb-note.left`. `caution`: `.nb-note.caution` (red, weight 400).

Mobile (default): inline block, left border `2px solid rgba(43,74,94,0.28)`, cream background.

Desktop ≥768px: absolutely positioned outside the column:
- Right: `right: -220px; width: 195px; transform: rotate(1.2deg)`
- Left: `left: -220px; transform: rotate(-1.5deg)`

**Use:** 1–3 per article. Right for clarifications; left-caution for reader warnings. Sprinkles, not the main course.

### `<ScrapCard>`

```mdx
<ScrapCard label="EXHIBIT A · AIA-UL COI SCHEDULE">

| รายการ | มูลค่า |
|---|---|
| เบี้ยรายปี | ฿120,000 |
| COI ปีที่ 30 | ฿128,400 |

</ScrapCard>
```

CSS class `.nb-scrap`. Tilted white paper exhibit: `transform: rotate(-1.2deg)`, `box-shadow: 2px 2px 8px rgba(28,24,20,0.10)`, tape-detail `::before`. Animated via `tapeSettle` spring-in. `will-change: transform` promotes to compositor layer.

Table inside: auto-styled by `.nb-scrap table` — IBM Plex Mono 11px, header row hidden, last column right-aligned in `--color-red`.

**MDX requirement:** blank lines above and below the markdown table inside the tag (MDX parser must re-enter Markdown mode).

**Labels:** `EXHIBIT A/B/C` for insurance forensics; `TRIAL 1/2/3` for meat experiments.

### `<CorrectionBlock>`

```mdx
<CorrectionBlock
  strike="ความเชื่อผิด: 'Unit-linked ให้ผลตอบแทนดี'"
  fix="ความจริง: ผลตอบแทนหักค่าธรรมเนียมแล้วมักติดลบ"
/>
```

Self-closing. CSS class `.nb-correction`. Strike: wavy line-through `#CC3A2F`, opacity 0.5. Fix: K2D 300 italic, left border `rgba(43,74,94,0.22)`.

**Use:** one per article at the Paradox reveal point. This IS the brand's core mechanic — Belief vs. Reality. Mandatory for `insurance` articles, strongly encouraged for `meat`.

### `<VerdictSeal>`

```mdx
<VerdictSeal line1="ตรวจสอบ" line2="ก่อนเซ็น" />

<!-- with optional caption: -->
<VerdictSeal line1="54°C" line2="ผ่านฉลุย">
  ภรรยาบอกว่า "เนื้อนุ่มกว่าครั้งก่อนเยอะ"
</VerdictSeal>
```

CSS class `.nb-verdict`. Right-aligned flex row: optional caption label (`.nb-verdict-label` via slot) + animated SVG circle stamp. Circle: 60px/68px, stroke `#CC3A2F`, animated `stroke-dashoffset: 195→0` (verdictDraw, 800ms). Separated from article body by `border-top: 1px dashed rgba(199,183,143,0.55)`.

**Defaults by collection** (applied by `/decorate` skill):
- `insurance` → `line1="ตรวจสอบ"` `line2="ก่อนเซ็น"`
- `meat` → `line1="ทดลอง"` `line2="ก่อนเชื่อ"`
- `note` → no auto-seal (observational; skip or author chooses)

**Use:** one per article, closing element. Mandatory for `insurance` and `meat`. `meat` articles tagged `format: "FIELD NOTE"` or `"OBSERVATION"` may skip.

**Decoration philosophy:** better to under-decorate than over-decorate. Two `<Highlight>` + one `<VerdictSeal>` reads cleaner than eight `<Highlight>` and five `<MarginNote>` competing.

---

## 7. Layout Architecture

### Article column width

| Breakpoint | `.nb-article-wrap` max-width |
|---|---|
| Mobile (default) | 580px |
| Tablet ≥768px | 620px |
| Desktop ≥1200px | 660px |

Right MarginNotes overhang at `right: -220px, width: 195px`. Visible without clipping roughly ≥1080px viewport. On mobile they revert to inline.

### Static page column width

680px (`.sp-content` in `StaticPageLayout`). Slightly narrower than article for reading-centric text-only pages.

### Layer stacking (z-index)

| Layer | z-index | Element |
|---|---|---|
| Paper grain | 9998 | `body::after` |
| Article nav | 20 | `.article-nav` |
| Hero content | 5 | `.hero-content` |
| Hero sketch | 4 | `.hero-sketch` |
| Static page nav | 10 | `.sp-nav` |
| Hero nav | 10 | `.hero-nav` |
| Hero watermark / sunburst | 2 | `.hero-watermark`, `.hero-sunburst` |
| Hero grid | 1 | `.hero-grid` |
| WebGL canvas | 0 | `HeroCanvas` component (hero only) |

---

## 8. Footer Watermark

Per `nerd/pillars/constitution.md` Article VII, dual-emoji footer differentiates content type (derived automatically from `collection` by `src/pages/[...slug].astro`):

| Collection | Watermark |
|---|---|
| `insurance` | `📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)` |
| `meat` | `🔥 คัดเนื้อโดย: ประกันเนื้อๆ (beef.im)` |
| `note` | `📝 บันทึกโดย: ประกันเนื้อๆ (beef.im)` |

Inline brand attribution mid-article is **banned** — the brand law "เน้นเนื้อๆ ไม่เอาน้ำ" applied to the brand itself. Footer is enough.

Image overlays on charts/tables/diagrams: faint `beef.im` on a separate visual layer (does not interrupt prose). See `nerd/pillars/constitution.md` §7.2–§7.3.

---

## 9. Asset Sovereignty

CDN: `https://assets.beef.im/` (Cloudflare R2, bucket `beef-assets`). Legacy `assets.nerdwithnart.com` is read-only — new assets go to `beef-assets`.

Full asset inventory + code reference table: [`.claude/rules/visuals.md`](../.claude/rules/visuals.md).

Image blending: `img.nb-photo` and `.nb-content img` use `mix-blend-mode: multiply` to harmonise photographs against the parchment canvas.

---

## 10. Performance Notes

| Item | Value | Notes |
|---|---|---|
| Lighthouse mobile — homepage | ~91 | WebGL warmth shader + hero animations; intentional floor |
| Lighthouse mobile — static/hub pages | ~98–99 | No WebGL, no page-tear |
| Lighthouse mobile — article pages | ~90+ | Post `inherits: false` fix (was 80) |
| `@property --ink-spread { inherits: false }` | critical | Prevents style-recalc cascade on all DOM descendants during page-tear animation. `inherits: true` caused TBT 730ms on article pages |
| `will-change: transform` on `.nb-scrap` | compositor hint | Pre-promotes ScrapCard to GPU layer; removes it from layout-recalc budget |
| `backdrop-filter: blur(8px)` on `.article-nav` | ~2–3pt cost | Intentionally kept; sticky glass-nav aesthetic |
| Font preload | Anuphan 700 woff2 | Hash locked to `@fontsource/anuphan` version — update when package bumps |
| CSS render-blocking | structural | Thai font CSS via Astro `import '...'` is render-blocking by design; not worth fighting for 1pt |

---

## 11. What's Intentionally Undefined

Not yet locked — leave room for the first real article batch to surface patterns:

- Photography direction (only SVG sketches exist today — no live photos)
- Illustration style beyond the hero margin-sketch
- Print / social / LINE share templates
- Calculator UI inside `ToolLayout.astro` (React Islands — deferred to Phase 4)
- Dark-mode variant (deliberately not pursued — parchment IS the brand)

Add to this doc when those land. Don't pre-design them on paper.

---

## 12. Source-of-Truth Hierarchy

1. `src/styles/global.css` — authoritative for all values
2. `src/components/` — authoritative for component patterns
3. This doc — human-readable map of (1) and (2)
4. `docs/brainstorm/New UIUX/Prototype-Definitive-v1.html` — original visual reference, frozen. Used only to verify parity, not as a forward source.

---

## 13. File Map

| What | Where |
|---|---|
| All tokens + global styles | `src/styles/global.css` |
| Font imports (CSS) | `src/layouts/BaseLayout.astro` |
| Font preload `<link>` | `src/layouts/BaseLayout.astro` |
| MDX components | `src/components/mdx/*.astro` |
| Article layout (grid + nav + footer) | `src/layouts/ArticleLayout.astro` |
| Static page layout | `src/layouts/StaticPageLayout.astro` |
| Homepage entries (inkSettle JS) | `src/pages/index.astro` |
| Page-tear inline script | `src/layouts/ArticleLayout.astro` |
| R2 sovereign assets | `https://assets.beef.im/` |
| Asset code references | `.claude/rules/visuals.md` |

---

*Visual System — synced 2026-05-03. Rev when CSS changes.*
