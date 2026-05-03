# beef.im — Final Implementation Plan
## Opus 4.7, acting as Head of UI/UX, Marketing, and Art Direction

**Date:** 2026-05-02
**Status:** **APPROVED — execute**
**Lineage:** Synthesizes GLM/DeepSeek/Kimi convergence + Pixila/Thorgal effects research + bold-mode design call + user's editorial taxonomy pivot (`insurance`/`meat`/`note`) + user's "drop the 8 pairings" signal + user's grant of art-director authority.
**North star:** Quiet luxury, classy boldness, notebook metaphor, hand-drawn ink as the visual signature.
**Time budget:** Phase 0 + 1 + 1b shippable in **one working day with AI assist.** Full plan in **3 working days** through Phase 3. Calculators (Phase 4) on demand.
**Safety net:** Every phase ships on its own branch → Cloudflare Pages preview → merge to main when satisfied. Rollback = single `git revert`.

---

## 1. Decisions locked by the Art Director

These are not up for debate. Subsequent sections execute against them.

### 1.1 Information architecture

- **Three content collections, pillar-first URLs**
  - `/insurance/<slug>/` — 📊 forensics, contract teardowns, health-finance
  - `/meat/<slug>/` — 🔥 cuts, technique, cooking, science
  - `/note/<slug>/` — 📝 *FUCK-IT mode* — personal essays, asides, anything that isn't insurance or meat but interests the author
- **`format` is an optional free-form badge label, not URL and not a template** — author writes whatever fits the piece (`EXPERIMENT LOG`, `CASE FILE`, `FIELD NOTE`, `บันทึก`, or omit). One single-column prose template handles every article; structural shape comes from the MDX components the author chooses to include (`<Highlight>`, `<MarginNote>`, `<ScrapCard>`, `<CorrectionBlock>`, `<VerdictSeal>`, plus opt-in `<ForensicMyth>` / `<ForensicEvidence>` / `<ForensicMechanism>` / `<ForensicVerdict>` for teardowns)
- **No tags as public routes** until 100+ articles
- **No author archives** — single voice
- **Six static pages:** `/manifesto/`, `/contact/`, `/colophon/`, `/methods/`, `/corrections/`, `/cleaver/` (replaces `/paradox/` — the Cleaver is the more useful page)
- **Pillar hubs** at `/insurance/`, `/meat/`, `/note/` — Phase 2, ~20 articles in
- **Archive at `/archive/<n>/`** with 24 entries per volume — Phase 2
- **No bridges page** — cross-pillar linking happens via MarginNote and Soulmate cards inside articles, not a hub. Ship at Phase 3.
- **No /paradox auto-index** — the Cleaver glossary covers more reader value at less maintenance cost

### 1.2 Visual signature: the hand-drawn pen

The brand's visual signature is **a single fountain pen drawing in real time.** Not eight pairings. Not a cow chart. **One pen, three places:**

1. **A flourish that draws under the hero headline on first load** — single curving SVG path, ~1.0s draw, burnt sienna ink. The pen lifts at the end. Cookie-flagged: returning visitors see it static.
2. **Three pillar-mascot icons** that draw themselves once when you first visit each pillar hub:
   - `/insurance/` — a small line-drawn clipboard with a folded corner
   - `/meat/` — a small line-drawn cleaver
   - `/note/` — a small line-drawn open notebook with a pen across it
   Each ~20-30 paths, draws in ~1.2s, only on hub landing.
3. **Section rules across the site** are SVG `<line>` elements with `stroke-dashoffset` reveal — every horizontal divider is "drawn" rather than just "appearing."

**No 8-pairing cow+contract dual-sketch.** The user is right — it overcomplicates. The brand statement is communicated by the *register* (hand-drawn ink) and the *act* (drawing in real time), not by an essay-length illustration.

### 1.3 Color system

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F0EADC` | Cream parchment background (existing) |
| `--ink` | `#1A1816` | Primary body text (near-black, never pure black) |
| `--ink-soft` | `#3A3530` | Secondary text |
| `--burn` | `#C2451F` | **Burnt sienna — the brand ink color** (existing) |
| `--insurance` | `#1E3A5F` | **Fountain-pen ink blue** — accent for `/insurance/` only |
| `--meat` | `#C2451F` | Burnt sienna doubles as the meat accent (= blood) |
| `--note` | `#2A2826` | Graphite pencil — accent for `/note/` only |
| `--gold` | `#A88A36` | Sparingly: corner marks, VerdictSeal accent |

The accent colors (insurance blue, note graphite) appear **only on per-pillar surfaces** — the watermark line, the format badge, the section rule on hub pages. Body text and primary chrome stay in `--ink` and `--burn`. This keeps the cream/sienna identity intact while giving the three pillars distinct sub-personalities.

### 1.4 Typography

Locked. No fourth family.

- **Anuphan** — display headlines (Thai), hero, brand wordmark
- **Sarabun** — body Thai prose
- **IBM Plex Mono** — labels, technical, codes, dates, badges
- (No K2D, no Quantico — both proposed in prior plans, both unnecessary)

### 1.5 Motion vocabulary

**Permitted:**
- Ink-settle: `filter: blur(4px → 0)` + `opacity 0 → 1` over 600-1200ms
- Stroke draw: `stroke-dashoffset` on SVG paths, 800-1200ms
- Clip-path reveals: `inset()` and `polygon()`, 350-800ms
- `mix-blend-mode: difference / multiply`
- Single-axis transform `translateY` ≤ 8px
- WebGL fragment shaders (hero only, GPU-cheap)

**Banned:**
- 3D transforms, `perspective`, `rotateY/X` (vestibular memory holds)
- Viewport-relative translation (`translateX(100vw)` etc.)
- Parallax depth on body content
- Scroll-jacking beyond a single frame
- Character-level text-splitting reveal (DOM bloat, gimmicky)
- Text scramble on editorial labels (gimmicky on a serious brand)
- Custom cursor (overhead > payoff at this scale)
- Audio of any kind
- Marquee tickers
- Auto-playing video on hero

**Pacing:** 350-700ms for interactions. 1.0-1.2s for entrances. Never longer than 2.0s for any single animation on a content page.

### 1.6 What the WOW is

The WOW is **distributed, not concentrated.** Three compounding signatures:

1. **WebGL parchment shader** on hero only — slow, candle-warm fiber-shift at ~3% intensity. Quiet luxury at the substrate level. (Lifted from Kimi's Phase 4d, moved up to Phase 1b.)
2. **Polygon clip-path page transition** on every navigation — page reveals through a notebook-page-tear silhouette wipe. (Pixila signature, brand-customized polygon.)
3. **The fountain pen drawing itself in real time** — once on first hero load, once per pillar hub on first visit. Hand-drawn ink as the literal artifact.

These three together do more than any single hero illustration could. They make the *site* feel hand-made, not just the *artwork*.

---

## 2. The site map (final)

```
/                          Cover — hero + reverse-chronological journal stream

─── Content (pillar-first URLs) ───
/insurance/<slug>/         📊 prose article — optional `format` badge (CASE FILE, etc.)
/meat/<slug>/              🔥 prose article — optional `format` badge (EXPERIMENT LOG, etc.)
/note/<slug>/              📝 anything goes — FUCK-IT space

─── Pillar hubs (Phase 2) ───
/insurance/                Curated entry point + recent + bridges
/meat/                     Curated entry point + recent + bridges
/note/                     Reverse-chrono only — no curation, by design

─── Static (Phase 1) ───
/manifesto/                What beef.im is and is not
/contact/                  Single-screen: LINE QR + email + status dot
/colophon/                 How the notebook is made (stack, type, attribution)
/methods/                  Forensic methodology + evidence tiers
/corrections/              Errata log, dated index of every CorrectionBlock
/cleaver/                  Combined alphabetical glossary — insurance + butchery interleaved

─── Archive (Phase 2) ───
/archive/                  Volume shelf
/archive/<n>/              Volume detail, filterable

─── Tools (Phase 4, on demand) ───
/tools/                    Index
/tools/<slug>/             React Island calculators

─── Infrastructure ───
/search/                   Pagefind, JS only here
/rss.xml                   Single firehose feed
/sitemap.xml               Astro auto
/404                       Existing beef-facts widget
```

**Watermarks per pillar (locked):**
- `/insurance/` → `📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)` · `#ประกันเนื้อๆ`
- `/meat/` → `🔥 คัดเนื้อโดย: ประกันเนื้อๆ (beef.im)` · `#ประกันเนื้อๆ`
- `/note/` → `📝 บันทึกโดย: ประกันเนื้อๆ (beef.im)` · `#ประกันเนื้อๆ`

---

## 3. Content schema

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  date: z.date(),
  lede: z.string(),

  // Optional free-form badge label rendered top-left of article (e.g.
  // "EXPERIMENT LOG", "CASE FILE", "FIELD NOTE", "บันทึก"). Omit for no badge.
  // Author owns the label — no fixed enum, no decision-fatigue tax at write-time.
  // Template is single-column prose for every article; structure comes from MDX
  // components the author chooses to include.
  format: z.string().optional(),

  // Display
  temperature: z.enum(['risk', 'medium', 'low']).optional(),
  readTime: z.string().optional(),
  wordCount: z.number().optional(),
  code: z.string().optional(),
  sidenote: z.string().optional(),
  latest: z.boolean().optional(),

  // Cross-linking (Phase 3)
  soulmate: z.string().optional(),       // single article slug — e.g. "meat/reverse-sear-54c"
  references: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional(),

  // Future: dynamic OG (Phase 5, not in this plan)
});

export const collections = {
  insurance: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/insurance' }),
    schema: articleSchema,
  }),
  meat: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/meat' }),
    schema: articleSchema,
  }),
  note: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/note' }),
    schema: articleSchema,
  }),
};
```

---

## 4. Phase 0 — Migration (90 minutes)

**Branch:** `feat/taxonomy-pivot`

### Steps

```bash
git checkout -b feat/taxonomy-pivot

# Move existing content
mkdir -p src/content/insurance src/content/meat src/content/note
git mv src/content/case/unit-linked-coi-trap.mdx       src/content/insurance/
git mv src/content/case/ci-rider-36-vs-108.mdx         src/content/insurance/
git mv src/content/experiment/ribeye-reverse-sear.mdx  src/content/meat/
git mv src/content/field-note/moo-sam-chan-tod-nam-pla.mdx src/content/meat/
rmdir src/content/case src/content/experiment src/content/field-note
```

### Edits

| File | Change |
|---|---|
| `src/content.config.ts` | Replace 3-collection schema with §3 above |
| `src/pages/[...slug].astro` | `getStaticPaths()` over the three new collections; URL pattern `/<collection>/<slug>/`; pass `collection` prop to `ArticleLayout` |
| `src/pages/index.astro` | Query all three collections, sort by date desc, pass collection prop to NotebookEntry |
| `src/layouts/ArticleLayout.astro` | New `watermark` prop derived from `collection`: `'analysis' | 'beef' | 'note'` |
| `src/components/NotebookEntry.astro` | Accept `collection` + `format` props; render small badge for each |
| `src/components/Footer.astro` | Add `note` watermark variant |
| `public/_redirects` | New file with the 4 article 301s + `/case/* → /insurance/:splat 301`, `/experiment/* → /meat/:splat 301`, `/field-note/* → /meat/:splat 301` |

### Smoke test
- `npm run build` — zero errors
- `npm run dev` — every existing article loads at its new URL
- Old URLs hit 301 to new ones
- Sitemap regenerates with three collections
- Per-pillar watermark renders correctly on each article

### Acceptance criteria
- [ ] All four existing articles ship at new URLs
- [ ] Old URLs redirect with 301
- [ ] No console errors, no build warnings
- [ ] Visual diff vs main: zero (pure URL/data restructure, no UI change)

**Merge to main when green.**

---

## 5. Phase 1 — Static pages, search, RSS (3-4 hours)

**Branch:** `feat/static-pages` (from main after Phase 0 merge)

### 5.1 Six static pages

Each is a single `.astro` file using `BaseLayout`. Single-column, narrow column width, generous leading.

| Route | Length | Voice | Notes |
|---|---|---|---|
| `/manifesto/` | 600-900 Thai words | First-person, declarative | Three sections separated by `<svg>` red rules. (1) **เราเป็นใคร** — forensic method, two professional pillars, one personal pillar. (2) **เราไม่ใช่ใคร** — sales funnel, content farm, credential-flexer, mass-market. (3) **ถ้าคุณ…** — filtering statements that select the right reader. Self-references one `<VerdictSeal>` on the brand's own commitment. |
| `/contact/` | <100 words | Direct, terse | LINE ID, email (`mailto:`), 1-line boundaries statement, status dot 🟢/🔴 hard-coded per deploy. **No form.** "ส่งอีเมลมาตรงๆ" |
| `/colophon/` | 300-500 words | Technical, calm | Stack (Astro 6.x, MDX, Cloudflare Pages, R2), typography credit, Pixila + Thorgal effect attribution, zero-JS rationale, accessibility note |
| `/methods/` | 400-700 words | Forensic, plain | Evidence tiers (T1: primary docs / T2: aggregated / T3: anecdote), source hygiene, uncertainty handling. The promise to readers. |
| `/corrections/` | Indexed list | Dated, terse | Hand-curated `src/data/corrections.ts`. Each row: date (Mono) · article link · correction summary. Empty state: *"ยังไม่มีการแก้ไข — นี่เป็นสิ่งที่ดี"* |
| `/cleaver/` | Glossary | Lexical, cross-pillar | Two-column on desktop, single-column mobile. Alphabetical, **no separation** between insurance and butchery terms. Header letter dividers (ก ข ค...). Each row: `term · brief gloss · → first-occurrence-link`. This is the brand thesis as architecture. |

### 5.2 Footer

```
📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im) · #ประกันเนื้อๆ          (per-page watermark)
แถลงการณ์ · วิธีสืบสวน · คำนิยาม · แก้ไข · ติดต่อ · วิธีสร้าง · ค้นหา · RSS
                                                              เน้นเนื้อๆ ไม่เอาน้ำ ©2026
```

11px Anuphan, `--burn` links with animated underlines (Pixila steal: `width: 0 → 100%` on hover, 300ms).

### 5.3 Search

Pagefind. `/search/` page is the only place that loads JS for search. Header link is a plain `<a>` to `/search/`. Zero search-JS on every other page.

### 5.4 RSS

`src/pages/rss.xml.ts` — Astro endpoint, single firehose feed, full article content (no excerpts).

### Acceptance
- [ ] All six static pages render at correct URLs
- [ ] Footer links work site-wide
- [ ] `/search/` returns results for known terms
- [ ] `/rss.xml` validates with W3C
- [ ] Lighthouse mobile ≥ 95 on every static page

**Merge to main when green.**

---

## 6. Phase 1b — Visual signature & hero polish (3-4 hours)

**Branch:** `feat/visual-signature` (from main after Phase 1)

This is the layer that makes beef.im *look* hand-made.

### 6.1 Foundation CSS (1 hour)

In `src/styles/global.css`:

```css
/* Animatable custom property for clip-path interpolation */
@property --ink-spread { syntax: '<percentage>'; inherits: true; initial-value: 100%; }

/* Font metric fallbacks — kills CLS during web font load */
@font-face {
  font-family: "Anuphan-fallback";
  src: local("Noto Sans Thai");
  size-adjust: 103.2%;
  ascent-override: 95%;
  descent-override: 25%;
}
@font-face {
  font-family: "Sarabun-fallback";
  src: local("Noto Sans Thai");
  size-adjust: 106.1%;
  ascent-override: 92%;
  descent-override: 28%;
}
/* Update font-family stacks to include fallbacks */

/* Noise overlay — paper grain */
.nb-grain::after {
  content: '';
  position: fixed; inset: 0; z-index: 9998;
  pointer-events: none;
  opacity: 0.06;
  background: url('/noise.webp') repeat;
  background-size: 100px 100px;
}

/* Mix-blend multiply on every photograph — auto-harmonize to parchment */
img.nb-photo, .nb-content img {
  mix-blend-mode: multiply;
}

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .nb-grain::after { display: none; }
}

/* Animated link underlines (Pixila) */
.nb-link {
  position: relative;
  text-decoration: none;
}
.nb-link::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 0;
  width: 0; height: 1px;
  background: currentColor;
  transition: width 300ms ease;
}
.nb-link:hover::after { width: 100%; }
```

Generate `public/noise.webp` (100×100px grayscale noise tile, ~2KB) — one-shot via shell or any image tool.

### 6.2 Knife-cut logo hover (15 minutes)

In the brand wordmark:

```css
@keyframes brand-cut {
  0%, 100% { clip-path: inset(0); }
  50%      { clip-path: inset(0 0 0 120px); }
  50.1%    { clip-path: inset(100% 0 0); }
}
.brand:hover { animation: brand-cut 0.8s ease-in-out; }
```

Direct steal from Pixila. The wordmark slices on hover. Brand pun rendered.

### 6.3 The fountain-pen flourish (1 hour)

Hand-draw a single short SVG path — a stylized flourish/swash that lives under the hero headline. ~12-20 anchor points. Export from Figma/Affinity, run through SVGO.

```html
<!-- in Hero.astro, beneath the title -->
<svg class="hero-flourish" viewBox="0 0 360 24" aria-hidden="true">
  <path d="M2 16 C 60 4, 120 24, 180 12 C 240 0, 300 22, 358 8" />
</svg>
```

```css
.hero-flourish {
  width: clamp(180px, 32vw, 360px);
  height: auto;
  margin-top: 8px;
}
.hero-flourish path {
  fill: none;
  stroke: var(--burn);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 720;
  stroke-dashoffset: 720;
  animation: pen-draw 1.0s ease-out 0.6s forwards;
}
@keyframes pen-draw {
  to { stroke-dashoffset: 0; }
}

/* Cookie-flagged: returning visitors see static */
.hero--instant .hero-flourish path {
  stroke-dashoffset: 0;
  animation: none;
}
```

The flourish draws once per session, at 0.6s into the hero entry (after the headline ink-settle resolves). On replay (cookie expired or sessionStorage cleared), it re-draws.

### 6.4 WebGL parchment shader (1.5 hours — the bold bet)

A single fragment shader on a fixed-position `<canvas>` behind the hero only.

`src/components/HeroCanvas.astro`:

```html
<canvas id="hero-warmth" aria-hidden="true"></canvas>

<script type="module">
  const canvas = document.getElementById('hero-warmth');
  if (!canvas) {} else {
    const gl = canvas.getContext('webgl', { antialias: false, alpha: true });
    if (!gl) {} else {
      // Fragment shader: simplex noise warm flicker over parchment
      const vs = `attribute vec2 p; void main(){gl_Position=vec4(p,0,1);}`;
      const fs = `
        precision mediump float;
        uniform float u_time;
        uniform vec2  u_res;

        // Simplex noise (compact)
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
        float snoise(vec2 v){
          const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
          vec2 i=floor(v+dot(v,C.yy));
          vec2 x0=v-i+dot(i,C.xx);
          vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
          vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
          i=mod289(i);
          vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
          vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
          m=m*m; m=m*m;
          vec3 x=2.0*fract(p*C.www)-1.0;
          vec3 h=abs(x)-0.5;
          vec3 ox=floor(x+0.5);
          vec3 a0=x-ox;
          m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
          vec3 g; g.x=a0.x*x0.x+h.x*x0.y;
          g.yz=a0.yz*x12.xz+h.yz*x12.yw;
          return 130.0*dot(m,g);
        }

        void main(){
          vec2 uv = gl_FragCoord.xy / u_res;
          float n = snoise(uv * 2.5 + vec2(u_time * 0.04));
          vec3 paper  = vec3(0.941, 0.917, 0.863);  // #F0EADC
          vec3 warmth = vec3(0.984, 0.953, 0.882);  // candle highlight
          vec3 color = mix(paper, warmth, n * 0.5 + 0.5) ;
          float alpha = 0.45 + n * 0.05;             // very subtle
          gl_FragColor = vec4(color, alpha);
        }
      `;

      // ... compile, link, full-screen quad, requestAnimationFrame loop
      // ~50 lines of WebGL boilerplate, well-known pattern
      // Lazy-init: only run if reduced-motion is OFF and device pixel ratio is sane
    }
  }
</script>

<style>
  #hero-warmth {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) {
    #hero-warmth { display: none; }
  }
</style>
```

**Performance ceiling:** the shader runs at 30fps (throttled inside the rAF loop). On low-end devices (`navigator.deviceMemory < 4`), bypass the canvas entirely and fall back to the static `nb-grain` overlay. Lighthouse mobile target: ≥ 93 on slow 4G after this ships (down from ~99, deliberate trade).

### 6.5 Session-aware hero replay (10 minutes)

```html
<!-- in index.astro <head> -->
<script>
  if (sessionStorage.getItem('bf-hero-seen')) {
    document.documentElement.classList.add('hero--instant');
  } else {
    sessionStorage.setItem('bf-hero-seen', '1');
  }
</script>
```

Returning visitors within the same session skip the headline ink-settle, the flourish draw, and the WebGL fade-in. Cookie-class behavior. Cheap.

### Acceptance
- [ ] Logo cuts on hover, snaps back cleanly
- [ ] Flourish draws beneath hero headline once per session
- [ ] WebGL warmth visible on hero only, invisible on every other page
- [ ] Reduced-motion hides the WebGL canvas + skips the flourish animation
- [ ] Lighthouse mobile ≥ 93 on home, ≥ 95 on every other page
- [ ] Photos throughout the site auto-harmonize to parchment via mix-blend multiply

**Merge to main when green. This is the milestone where the site becomes recognizably "beef.im."**

---

## 7. Phase 2 — Hubs, archive, page transitions (1 working day)

**Branch:** `feat/hubs-archive`. **Trigger:** when ≥ 15 articles exist (~3-5 months of writing). **Or:** ship now if you want all the chrome before content.

### 7.1 Pillar hubs (3 hours)

`src/pages/insurance.astro`, `src/pages/meat.astro`, `src/pages/note.astro` — three hand-curated landings.

**Insurance hub structure:**
1. Hero block: title `📊 ประกันเนื้อๆ — สืบเนื้อหาในสัญญา` + 1-line lede + line-drawn clipboard mascot (draws once per session)
2. Curated section: 3-5 manually-chosen "core cases" pulled from `src/data/curated.ts`
3. Recent: 5 latest by date desc
4. Cross-pillar bridge: 1 hand-curated link "ดูเนื้อจริงๆ →" pointing to a single meat article that thematically rhymes

**Meat hub** — same structure, `🔥`, line-drawn cleaver mascot, bridge to an insurance article.

**Note hub** — different shape on purpose: **no curation, no bridges, no mascot mode**. Just reverse-chronological with a tiny `📝 บันทึก` header. The "FUCK-IT" pillar refuses curation by design — that's its register.

### 7.2 Archive (2 hours)

`/archive/` — volume shelf. Each volume = 24 entries (sort all entries chronologically oldest→newest, chunk into 24, reverse within each chunk to display newest-first; this means Volume 1 always = entries 1-24 forever, no shifting when new entries land).

`/archive/<n>/` — individual volume page. Filterable by collection (insurance/meat/note) using **CSS-only `:has()` filter**, no JS:

```css
.archive-list:has(input[value=insurance]:checked) .entry:not([data-pillar=insurance]) { display: none; }
.archive-list:has(input[value=meat]:checked)      .entry:not([data-pillar=meat])      { display: none; }
.archive-list:has(input[value=note]:checked)      .entry:not([data-pillar=note])      { display: none; }
```

Three radio buttons + an "all" default. Zero JavaScript. Universal browser support now.

### 7.3 Polygon clip-path page transition (2 hours — the second WOW)

The Pixila signature, customized.

`src/styles/global.css`:

```css
@keyframes page-tear-in {
  from { --ink-spread: 100%; }
  to   { --ink-spread: 0%; }
}

.nb-page-reveal {
  /* Notebook page-tear silhouette — irregular vertices, lower-frequency than Pixila's mountain peaks */
  clip-path: polygon(
    calc(50% - var(--ink-spread) * 0.55)  calc(50% - var(--ink-spread) * 0.50),
    calc(50% - var(--ink-spread) * 0.20)  calc(50% - var(--ink-spread) * 0.42),
    calc(50% + var(--ink-spread) * 0.18)  calc(50% - var(--ink-spread) * 0.55),
    calc(50% + var(--ink-spread) * 0.55)  calc(50% - var(--ink-spread) * 0.30),
    calc(50% + var(--ink-spread) * 0.50)  calc(50% + var(--ink-spread) * 0.10),
    calc(50% + var(--ink-spread) * 0.55)  calc(50% + var(--ink-spread) * 0.50),
    calc(50% + var(--ink-spread) * 0.10)  calc(50% + var(--ink-spread) * 0.55),
    calc(50% - var(--ink-spread) * 0.30)  calc(50% + var(--ink-spread) * 0.50),
    calc(50% - var(--ink-spread) * 0.55)  calc(50% + var(--ink-spread) * 0.20)
  );
  animation: page-tear-in 0.7s ease-out forwards;
  will-change: clip-path;
}

/* Astro View Transitions API fallback for browsers without @property */
::view-transition-new(root) { animation: page-tear-in 0.5s ease-out forwards; }
::view-transition-old(root) { animation: none; opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .nb-page-reveal { animation: none; clip-path: none; }
}
```

Wire into `ArticleLayout.astro` with ~150B inline JS that adds the class on first navigation per session, removes after `animationend`, then sets sessionStorage flag so subsequent navigations are instant.

**Anti-nausea note:** content is already in the DOM and stationary. Only the visibility mask animates over it. Zero DOM movement, zero scroll-jack.

### 7.4 No binding thread

Originally proposed (1px dotted vertical rail + nodes on the left margin of desktop articles for section navigation). **Killed.** The existing article layout already uses both left and right margins for `<MarginNote>` editorial annotations (visible in the canonical Ribeye article). Adding a fixed dotted rail on the same side competes for the same real estate, and at typical article length (~600-2,000 words) the navigation utility doesn't justify the visual noise. Margin notes are doing the wayfinding job. Substance, no water.

### Acceptance
- [ ] Three pillar hubs render with curated + recent sections
- [ ] Mascot icons draw once per session per hub, then sit static
- [ ] `/archive/` shelf shows volumes; `/archive/1/` filters via radios with no JS
- [ ] Page-tear transition fires on first navigation each session, then instant
- [ ] Article body layout matches the canonical Ribeye reverse-sear screenshot — graph grid, format badge, margin notes both sides, inline ScrapCard, closing VerdictSeal, footer block, all preserved
- [ ] Lighthouse mobile holds ≥ 93

**Merge to main when green.**

---

## 8. Phase 3 — Cross-linking infrastructure (2-3 hours)

**Branch:** `feat/cross-links`. **Trigger:** ≥ 30 articles.

### 8.1 เนื้อคู่ (Soulmate) card

End-of-article block, visible only when `soulmate` is set in frontmatter:

```
─────────────────────────────────────────────
🔗 เนื้อคู่ — same mechanism, different domain
   ▸ Reverse Sear: ทำไม 54°C
     "ความร้อนเหมือน COI — เลยจุดที่กำหนดแล้วกลับไม่ได้"
─────────────────────────────────────────────
```

Resolved at build time from the slug. If no soulmate, render nothing. Editorial choice, never algorithmic.

### 8.2 Marginalia cross-references

`references` frontmatter array drives a build-time citation graph. Article A's right margin gains pencil annotations linking to articles that reference A.

```
→ ดูหน้า: CI Rider 36 vs 108
```

Right-margin only on desktop ≥ 1280px. Mobile gets them appended at end of article instead.

### Acceptance
- [ ] Articles with `soulmate` field render the card; others don't
- [ ] Reference graph builds without circular-link errors
- [ ] Marginalia visible on wide desktop, appended on mobile

**Merge to main when green.**

---

## 9. Phase 4 — Calculators (1-2 days, on demand)

**Branch:** `feat/tools`. **Trigger:** when you want a calculator. Not before.

### 9.1 `/tools/` index — grid of calculator cards using existing ScrapCard component

### 9.2 `/tools/<slug>/` — React Island

Port from `_archive/nextjs-legacy/`:
- COI Calculator
- Premium Calculator
- IRR Truth-Teller

Each is a `client:load` React Island inside the existing `ToolLayout`. Inputs in IBM Plex Mono, results in Anuphan 800.

### 9.3 Canvas 2D charts (~2KB vanilla JS)

Hand-drawn-feel line charts via `<canvas>`. Slight jitter on data points = sketch style. **No Chart.js, no WebGL, no D3.**

### 9.4 Text-decode on results (~1KB vanilla JS)

When calculator output renders, the headline number decodes character-by-character through random symbols to the final value (~400ms). Forensic-unearthing moment. **Only on calculator results — never on editorial body text.**

### Acceptance
- [ ] Three calculators ship as React Islands
- [ ] Canvas charts render hand-drawn-style projections
- [ ] Text-decode fires only on result numbers, never body text
- [ ] Calculator pages still hit ≥ 90 mobile Lighthouse

---

## 10. What we are explicitly NOT building

These have been considered and rejected. Adding them later requires re-justification.

| Not building | Reason |
|---|---|
| **Cow + contract dual-sketch hero** | User rejected — overcomplicates. Replaced by single fountain-pen flourish + three pillar mascots. |
| **8-pair illustration system** | Ditto. The brand statement is delivered by the *act* of hand-drawing, not by a long visual essay. |
| **Custom contextual cursor** (pen / knife / contract) | Overhead exceeds payoff. Mobile parity issues. |
| **Scroll-driven font weight + color-temp shift** | Imperceptible per pixel; the Lighthouse cost isn't justified by something readers can't consciously notice. |
| **One-frame peel scrolljack on first scroll** | Vestibular memory rules it out, regardless of how brief. |
| **Per-form bespoke levitate animations** | Three variations of essentially-the-same micro-motion is overengineering. One ink-settle for all entries. |
| **Dynamic OG share images** | Defer to Phase 5 (post-launch, after the first viral share proves the demand). |
| **Cleaver as butcher's-block experience** (wood-grain SVG, knife illustrations) | Overcomplicates. The Cleaver is the cleanest typographic glossary; the page works because it interleaves the two pillars, not because it has an illustrated header. |
| **TextScramble on editorial labels** | Gimmicky on a serious brand. Reserved for calculator results only. |
| **CharReveal (per-character text splitting)** | DOM bloat. The single-element `inkSettle` blur achieves the same pacing for ~5% of the cost. |
| **WebGL beyond the hero warmth shader** | Hero only. Article pages stay zero-WebGL, near-zero JS. |
| **GSAP / Lenis / Locomotive / SplitType / Three.js / Barba / Taxi.js** | Every effect in this plan ships in pure CSS or vanilla micro-JS. Pixila and Thorgal both ship zero of these libraries — proof of feasibility. |
| **Dark mode toggle** | Parchment IS the brand. A dark notebook is a different brand. |
| **Newsletter / signup form** | Anti-funnel. RSS is the subscription primitive. |
| **Comments / reactions / share buttons** | All three are funnel infrastructure dressed as engagement. |
| **Author pages, "as-featured-in," social grid** | Single voice. The site is the author. |
| **Algorithmic related-articles** | Editorial linkage (MarginNote + Soulmate) or nothing. |
| **Mega-menu, sticky scroll-following nav** | The ribbon nav doesn't follow the scroll. Notebook tabs don't follow your finger. |
| **Cmd+K modal, search overlay** | Pagefind on `/search/` keeps the rest of the site zero-JS. |
| **Tags as public routes** | Frontmatter only until 100+ articles. |
| **Thai URLs** | English kebab-case for copy-paste reliability in LINE / FB / email. |
| **Dust jacket / cover overlay / preloader pageant** | The hero communicates the thesis; click-through overlays are friction without gain. |
| **Author bio module / headshot card** | The first-person `ผม` in every article does this. |
| **`/bridges/` as a separate page** | Cross-pillar linking lives inside articles via Soulmate cards. A bridge hub is a maintenance burden without a reader benefit. |
| **`/paradox/` auto-index** | Replaced by `/cleaver/` which delivers more reader value at less editorial overhead. |

---

## 11. Branch & deploy strategy

```
main                    → production (beef.im)
feat/taxonomy-pivot     → Phase 0       → preview deploy → review → merge
feat/static-pages       → Phase 1       → preview deploy → review → merge
feat/visual-signature   → Phase 1b      → preview deploy → review → merge
feat/hubs-archive       → Phase 2       → preview deploy → review → merge
feat/cross-links        → Phase 3       → preview deploy → review → merge
feat/tools              → Phase 4       → preview deploy → review → merge
```

Each branch:
1. Cloudflare Pages auto-deploys to `<branch>.beef-im.pages.dev`
2. You review on the preview URL
3. If green → squash-merge to main
4. If broken → `git revert` the commit on main; the preview branch lives on for fixes

**Rollback per individual feature:** every visual addition (WebGL warmth, page-tear transition, knife-cut logo, flourish, mascots) has its own commit and can be reverted in isolation without rolling back the whole branch.

---

## 12. Time budget (April 2026 reality)

With AI-assisted execution (Opus 4.7 + Sonnet 4.6 in CLI):

| Phase | Manual estimate | AI-assisted | What's in it |
|---|---|---|---|
| 0 | 90 min | **45 min** | File moves, schema, redirects |
| 1 | 1-2 days | **3-4 hours** | 6 static pages, footer, RSS, search |
| 1b | 2-3 days | **3-4 hours** | Visual signature: knife-cut logo, flourish, WebGL warmth, foundation CSS |
| 2 | 3-4 days | **1 working day** | Hubs (3 pages + 3 mascot drawings), archive, page-tear transitions |
| 3 | 1-2 days | **2-3 hours** | Soulmate cards + marginalia |
| 4 | 2-3 days | **1-2 days** | Calculator port (still needs human review on financial logic) |

**Phases 0 + 1 + 1b shippable in one calendar day** if the user is sitting alongside an executor agent. **Phases 0 → 3 in three calendar days.**

The hand-drawn assets (flourish + 3 mascots) are the only items that need human craft — those get drawn in Figma/Affinity by hand or AI-assisted (~2-3 hours total for all four).

---

## 13. The first week after launch

This plan ships the *frame*. The substance is content. The first week's editorial calendar:

1. **Day 1:** Migration goes live. Announce on LINE personal: *"beef.im just got a new structure — เน้นเนื้อๆ ไม่เอาน้ำ remains."*
2. **Day 2:** First `/note/` post — something personal that proves the third pillar exists. Opinion piece, kitchen story, anything that wouldn't fit the other two.
3. **Day 3:** First `/cleaver/` glossary entries committed (~30 terms across both pillars to seed the page).
4. **Day 4-7:** One forensic teardown to demonstrate the visual layer working on serious content. Pick the most-requested unit-linked policy in your client base and rebuild it in the new structure.

---

## 14. Final acceptance criteria for "beef.im v1.0 done"

- [ ] All four existing articles migrated to new URLs, old URLs 301
- [ ] Six static pages live and proofread
- [ ] Pillar hubs live with mascots
- [ ] Page-tear transitions firing on every first-of-session navigation
- [ ] WebGL warmth visible on hero, hidden on inner pages
- [ ] Logo knife-cut on hover
- [ ] Hand-drawn flourish under hero headline
- [ ] Lighthouse mobile ≥ 93 on home, ≥ 95 on inner pages
- [ ] Zero JavaScript on article body pages (only the page-tear transition's ~150B init lives in `BaseLayout`, runs once per session, removes itself)
- [ ] One personal `/note/` post live
- [ ] Cleaver page live with ≥ 30 interleaved terms
- [ ] LINE / Facebook share-test: someone opens a beef.im URL and the cream-on-burnt-sienna identity is unmistakable

---

## 15. Authority addendum

You handed me art-direction authority. I exercised it by **subtracting**, not adding. This plan is shorter than any of the three LLM plans on purpose — every "should we" got resolved into a decision instead of an option. The risk profile sits exactly at "bold but reversible": one WebGL bet, one polygon-transition bet, one hand-drawn-flourish bet — each in its own commit, each rolled back in 30 seconds if it doesn't read.

The brand law (เน้นเนื้อๆ ไม่เอาน้ำ) was honored at the **content layer.** The frame is allowed to be quietly luxurious — the WebGL warmth, the page-tear transition, the fountain-pen flourish, the knife-cut logo. None of those add น้ำ to a single article. They add craft to the room the articles live in.

Ship Phase 0 + 1 + 1b on Monday. If the WebGL hero feels right after a week of looking at it, keep it. If it doesn't, `git revert` the commit and you lose nothing structural. That's why this plan is bold without being reckless.

— Opus 4.7, May 2 2026

---

## 16. Post-Phase 2 polish (2026-05-03)

**Executor:** DeepSeek V4 Pro via OpenCode GO (OpenCode CLI). Claude Pro quota exhausted.

**Completed:**
- [x] K2D restored as `--font-hand` — overrides §1.4. Sarabun 300/300-italic dropped from BaseLayout.astro, K2D 300+300-italic imported. K2D-fallback @font-face added. Rationale: K2D's handwritten character distinguishes editorial voice from body prose — Sarabun italic was just a slanted version of the same font.
- [x] HeroCanvas WebGL warmth shader wired — CSS background grid extracted into `.hero-grid` DOM div, canvas at z:0, grid at z:1, z-indices bumped across all hero layers to maintain stacking order. Canvas positioned between grid and content.
- [x] Session-aware hero replay removed — overrides §6.5. sessionStorage `bf-hero-seen` gate and all `.hero--instant` CSS removed. All hero animations now replay on every visit.
- [x] Knife-cut logo hover replaced — overrides §6.2. Clip-path `brand-cut` animation replaced with: color transition `#1B1A17 → #CC3A2F` (matches hero accent) + fountain-pen underline `::after` draws in from left (0.4s ease). Inline `style="color:inherit"` removed — was blocking the CSS `:hover` color rule.
- [x] Grid layer fixed — opacity matched journal at 0.11 (was 0.18), grid z:1 > canvas z:0 so lines paint on top of warmth shader.
- [x] Color palette corrected — `--color-burn` `#B85C38` → `#C2451F` per §1.3. All 5 hardcoded `#B85C38` usages routed through `var(--color-burn)`.
- [x] Brand underline red — `#CC3A2F` (matches hero accent "ไม่ดูหน้า", flourish stroke, verdict circles).

**Plan deviations (committed to main):**
| Section | Original | Changed | Reason |
|---------|----------|---------|--------|
| §1.4 | No K2D | K2D restored as `--font-hand` 300 italic | Distinct handwriting vs body prose |
| §6.2 | Knife-cut clip-path (brand-cut) | Color-shift + fountain-pen underline | User preferred sophisticated over stunt |
| §6.5 | Session-gated animations (hero--instant) | Always replay | User wanted repeat on logo click |
| §1.3 | `--burn: #C2451F` (in plan) | Was `#B85C38` in CSS, now corrected to `#C2451F` | Plan/implementation discrepancy fixed |

**Current state:**
- Phases 0–2: complete, live on beef.im
- Phase 3 (cross-links): gated — needs ≥30 articles (currently 4)
- Phase 4 (calculators): on demand
- Content gaps: no `/note/` post, cleaver glossary <30 terms, all articles are mockups
- Hero evaluation: deferred — revisit after real content fills the frame
- `@fontsource/sarabun/300` + `300-italic` removed from BaseLayout; still in node_modules (cleanup candidate)
- `@fontsource/noto-serif-thai` installed but unused (cleanup candidate)

**Model note:** DeepSeek V4 Pro performed adequately for CSS/HTML/Astro tweaking — no hallucinated imports, no syntax errors across 7 commits. Routing table note: DeepSeek V4 Pro is viable for beef.im component/stylesheet iteration..

---

## 17. Post-evaluation cleanup (2026-05-03, Opus 4.7 → Sonnet 4.6 follow-up)

**Trigger:** Opus 4.7 audited Phase 2 + DeepSeek's polish session. Found three remaining gaps. User approved fixes; Sonnet 4.6 executed.

**Completed:**
- [x] Color-token sweep finished — 18 hardcoded `#B85C38` across 11 files (DeepSeek's commit `8b21d64` only touched `global.css`) routed through `var(--color-burn)`. Fixes the home-vs-static hue split. Files: `SiteFooter.astro`, `StaticPageLayout.astro`, `404.astro`, `archive/{index,[n]}.astro`, `cleaver.astro`, `colophon.astro`, `corrections.astro`, `methods.astro`, `search.astro`. Commit `8c10b87`.
- [x] Font fallback stacks wired — `Sarabun-fallback`, `Anuphan-fallback`, `K2D-fallback` `@font-face` declarations were orphaned. Now active in `--font-thai`, `--font-display`, `--font-hand` stacks for CLS reduction.
- [x] View Transitions API fallback added — 4-line `::view-transition-{new,old}(root)` block from §7.3, missing in Phase 2 implementation. No-op until Astro `<ViewTransitions />` is enabled, but ready.
- [x] Sub-page brand wordmark parity — `.sp-brand` (in `StaticPageLayout.astro` + duplicated inline in `search.astro`) was 16px static `BEEF · IM`. Now matches HOME HERO: 16/20/22px responsive, full `BEEF · IM · JOURNAL` label, color-shift + fountain-pen underline hover (same as `.hero-brand`).

**Plan deviations not corrected (intentional):**
| Section | Reason kept as-is |
|---------|-------------------|
| §7.3 page-tear timing | Currently fires on every navigation, not first-per-session. Deferred to A/B once content density grows. |
| §7.1 curated-cases count | Plan asks 3-5 per pillar; `curated.ts` has 2. Content-gated — only 4 articles exist site-wide. |
| §7.3 keyframe direction | Sonnet 4.6 reversed the plan's `100% → 0%` to `0% → 100%`. Plan was wrong (would have been a hide animation). Implementation is the correct reveal. |

**Completed in same session:**
- [x] **RSS feed styled** — `public/rss-style.xsl` brand-matched XSL template + `stylesheet: '/rss-style.xsl'` wired into `rss.xml.ts`. Browsers now render `/rss.xml` as a styled HTML page (cream parchment, graph grid, Anuphan headings, brand wordmark in sticky nav, items list with date/title/lede). Feed-reader semantics unchanged — XSL is browser-only. Fonts loaded via Google Fonts CDN since XSL can't reference Astro's hashed self-hosted font filenames.

---

## 18. Pre-content-creation taxonomy sync (2026-05-03)

**Trigger:** User about to start writing real content. Pre-pivot taxonomy
(`category: case|experiment|field-note` + `footerType: analysis|cooking`) was
still embedded in 5 skills + 2 Obsidian guides. If a writer followed those
specs, `/publish` would write to `src/content/case/` etc. — folders Astro
no longer reads — silently breaking the deploy.

**Synced to current schema:**
- [x] `.claude/skills/publish/SKILL.md` — full rewrite. Frontmatter spec now
      requires `collection: insurance|meat|note` (plus `title`/`date`/`lede`).
      `footerType` removed (auto-derived from collection at render time by
      `[...slug].astro`). `category` removed (vestigial). Added `format`
      (free-form badge) as optional. Hygiene check warns + strips legacy
      `category`/`footerType` if present in incoming drafts.
- [x] `.claude/skills/decorate/SKILL.md` — VerdictSeal defaults keyed off
      `collection`: `insurance` → `ตรวจสอบ / ก่อนเซ็น`, `meat` → `ทดลอง / ก่อนเชื่อ`,
      `note` → no auto-seal (observational/personal). `meat` articles tagged
      `format: "FIELD NOTE"` or `"OBSERVATION"` also skip auto-seal.
- [x] `.claude/skills/produce-article/SKILL.md` — Step 5 frontmatter block,
      collections table, output format, decoration philosophy all migrated.
      Footer mapping now: `insurance`→📊, `meat`→🔥, `note`→📝.
- [x] `.claude/skills/seed/SKILL.md` — verified clean, no taxonomy refs.
- [x] `nerd/CHEATSHEET.md` — Publish Frontmatter section, collections table,
      live-examples paths, "When to edit by hand vs use AI" section all
      migrated. Header note documents the Phase-0 pivot.
- [x] `nerd/OBSIDIAN_GUIDE.md` — header updated with taxonomy-pivot note.
      Pipeline artifact chain, "When You Publish" steps, live-examples paths,
      tool-roles table all reference `<collection>` instead of `<category>`.

**Field-name conventions confirmed:**
- `collection: insurance | meat | note` (skill input → folder selection;
  written through to MDX as a self-documenting hint, though Astro derives
  the runtime collection from folder location regardless)
- `format: string` (free-form, optional — replaces enum-style category badge)
- `footerType` is **never** in frontmatter — derived in `[...slug].astro`

**Not touched (intentional):**
- `nerd/content-catalog.md` — full rescan needed when real content lands;
  current entries are pre-pivot legacy mockups.
- Live MDX files in `src/content/insurance/` and `src/content/meat/` still
  carry stale `category:` and `footerType:` lines. Harmless (Zod ignores
  unknown fields), but candidates for cleanup the next time they're edited.
