# beef.im Site Audit — 2026-05-03
**Auditor:** DeepSeek V4 Pro GO  
**Scope:** Full codebase evaluation of the beef.im Astro website  
**Status:** Clean, with minor optimization opportunities

---

## 1. What's Confirmed Fixed

| Item | Status |
|---|---|
| WebGL warmth shader (`HeroCanvas.astro`) | Removed — file deleted, import stripped from `Hero.astro` |
| `noto-serif-thai` font | Fully removed — not in package.json, BaseLayout imports, nor CSS tokens |
| Homepage JS budget | ~15 lines (IntersectionObserver + Navbar date update). Near zero TBT. |
| All MDX components | Zero JavaScript. Pure Astro templates. |
| Hero layering | Clean z-index stack: grid(1) → watermark(2) → sunburst(2) → vignette(3) → sketch(4) → content(5) → nav(10) |

### Phase 2 Fixes (2026-05-03 — commit `67f850c`)

| Item | File | Change |
|---|---|---|
| Forced reflow in `initReveal` (298ms) | `src/pages/index.astro:47-61` | Moved `container.dataset.inkInit = '1'` from before `getBoundingClientRect()` to after all geometry reads |
| Sarabun body font preload | `src/layouts/BaseLayout.astro:31-33` | Added `<link rel="preload">` for `sarabun-thai-400-normal.C2DaJlKK.woff2` — breaks longest chain in font cascade |
| CSS async swap (attempted, reverted) | `src/layouts/BaseLayout.astro:14` | Tried `?url` import + `rel="preload" onload` pattern to make CSS non-render-blocking. Reverted — `?url` bypasses Astro's CSS minification/deduplication (141KB unminified vs 25KB gzipped). Requires build-time critical CSS extraction. |

---

## 2. Remaining Issues

### 2.1 [LOW — FIXED] Forced reflow in `initReveal` — 298ms layout thrash
**File:** `src/pages/index.astro:46-84`  
**Fixed in commit:** `67f850c` (2026-05-03)

The `initReveal` function wrote `container.dataset.inkInit = '1'` (DOM mutation) BEFORE calling `getBoundingClientRect().top` (geometry read). This forced the browser to synchronously recalculate layout. Additionally, the Navbar's inline `updateHeroDate()` script (which writes `el.textContent`) runs earlier in document order, leaving the DOM in a dirty layout state — making `getBoundingClientRect()` even more expensive.

**Lighthouse trace:** `https://beef.im:17:22` → 298ms, `https://beef.im:26:20` → 298ms, `[unattributed]` → 14ms.  
**Fix:** Moved `container.dataset.inkInit = '1'` to AFTER all geometry reads (line 60), ensuring no DOM mutation precedes `getBoundingClientRect()`.

---

### 2.2 [MEDIUM] `body::after` noise overlay — global perpetual GPU cost
**File:** `src/styles/global.css:84-91`

An SVG `feTurbulence` filter (`fractalNoise`, `numOctaves=3`) runs on a `position:fixed` full-viewport pseudo-element at `z-index:9998` on every page. On static article pages with zero animation, the GPU is still compositing fractal noise.

**Suggestion:** Scope to homepage only (`.homepage body::after`, `.hero body::after`) or reduce to `numOctaves=1`. This is the single hardest-working GPU layer on the site with no proportional visual return on non-hero pages.

---

### 2.3 [MEDIUM] Dead React dependencies and integration
**Files:** `package.json`, `astro.config.mjs:11`

React is installed, integrated in Astro config, but zero `.jsx`/`.tsx` files exist in `src/`. Dead packages:
- `react`, `react-dom`, `react-is`
- `framer-motion`, `motion`
- `lucide-react`, `recharts`
- `@astrojs/react`

**Suggestion:** Remove all React packages + the `react()` integration from `astro.config.mjs`. This drops ~200KB from `node_modules` and removes the React runtime from Astro's Vite pipeline. If calculators return later, re-add as needed.

---

### 2.4 [LOW] Font subset waste — ~500KB of unused woff2 in dist
**Root cause:** Fontsource ships all available subsets (Latin, Latin-ext, Vietnamese, Cyrillic) but the site is Thai-only.

**Affected fonts:** Anuphan (~15 extra files), Sarabun (~15 extra), K2D (~10 extra), IBM Plex Mono (Cyrillic/Vietnamese unused).

**Suggestion:** Either:
1. Configure Fontsource import paths to `@fontsource/anuphan/thai.css` etc. (subset-scoped imports in BaseLayout.astro), or
2. Accept the waste (browsers load subsets on-demand via `unicode-range`, so actual bytes transferred may be less than the file count suggests)

---

### 2.5 [LOW] Dead CSS keyframe
**File:** `src/styles/global.css:169-172`

```css
@keyframes downFloat { ... }
```
Defined but never referenced by any selector in `src/`. Leftover from prototype HTML in `docs/brainstorm/`.

**Suggestion:** Remove. Safe cleanup — grep `src/` confirms zero usage.

---

### 2.6 [LOW] 404 page: persistent rAF typewriter loop
**File:** `src/pages/404.astro`

A `requestAnimationFrame` loop + `setInterval(factRotate, 8000)` + `visibilitychange` listener runs constantly. Isolated to the 404 page — negligible for real traffic. Only worth fixing if 404 page shows up in CrUX data.

---

### 2.7 [NOTE] Article pages: `backdrop-filter: blur(8px)` on sticky nav
**File:** `src/styles/global.css:371`

Paint cost per scroll frame while the sticky article-nav is visible. Minor — only on article pages, and `backdrop-filter` is well-optimized in modern browsers. Acceptable.

---

## 3. Current Font Stack (Confirmed)

| Token | Font | Role |
|---|---|---|
| `--font-thai` | Sarabun | Body Thai prose |
| `--font-display` | Anuphan | Headings, brand labels, CTAs |
| `--font-mono` | IBM Plex Mono | Eyebrows, codes, meta, tags |
| `--font-hand` | K2D | Hand-script subhead, sidenote |

Preloads:
- LCP font: `anuphan-thai-700-normal.rOsLv-jZ.woff2` (7.5KB) — hero heading font
- Body font: `sarabun-thai-400-normal.C2DaJlKK.woff2` (12KB) — breaks longest chain in font cascade (added 2026-05-03 Phase 2)

---

## 4. CSS Animation Inventory (14 @keyframes)

| Keyframe | Used? | Cost |
|---|---|---|
| wmFade, burstFade, burstRotate, ruleDraw, typeIn, inkSettle, heroReveal, sketchAppear, sketchDraw, sketchDot, page-tear-in, tapeSettle, verdictDraw | Yes, all active | Fire-and-forget or compositor-only. Acceptable. |
| **downFloat** | **No — dead code** | Remove |

---

## 5. JavaScript Inventory

| Page | JS | Rating |
|---|---|---|
| Homepage | IntersectionObserver (entry reveal) + Navbar date setInterval | Clean |
| Article pages | Zero JS | Perfect |
| MDX components | Zero JS | Perfect |
| 404 page | rAF typewriter + setInterval fact rotator | Isolated, acceptable |
| Navbar (all pages) | setInterval once/hour | Negligible |

---

## 6. Accessibility

- Full `prefers-reduced-motion` coverage in `global.css:204-211` and `:448-462`
- All WebGL/particle effects respect `deviceMemory < 4GB` guardrail (when they existed)
- `aria-hidden="true"` on decorative SVG/watermark elements
- No autoplay, no infinite-loop animations above the fold (sunburst is 59s, reads as static)

---

## 7. Recommended Action Priority

| Priority | Item | Effort | Status |
|---|---|---|---|
| **1 (quick win)** | Remove dead React packages + `react()` integration | 10 min | ✅ DONE — commit `60ca069` (2026-05-03). 84 packages removed. |
| **2 (quick win)** | Delete `@keyframes downFloat` | 30 sec | ✅ DONE — commit `60ca069` (2026-05-03). |
| **3** | Scope noise overlay to homepage only | 5 min | ✅ DONE — commit `60ca069` (2026-05-03). `body::after` → `body.home::after`; `bodyClass="home"` on `index.astro`. |
| **4** | Fix forced reflow in `initReveal` (298ms) | 2 min | ✅ DONE — commit `67f850c` (2026-05-03). Moved `dataset.inkInit = '1'` to after all geometry reads. |
| **5** | Preload sarabun body font | 2 min | ✅ DONE — commit `67f850c` (2026-05-03). Added `<link rel="preload">` for `sarabun-thai-400-normal` in `BaseLayout.astro`. |
| **6** | CSS render-blocking → async swap | 10 min | ⏸ DEFERRED — Attempted via `?url` import + `rel="preload" onload` pattern. Reverted: `?url` bypasses Astro's CSS optimization pipeline, producing 141KB unminified CSS vs. 25KB gzipped from Astro's normal pipeline. Proper fix requires build-time critical CSS extraction (Vite plugin or Astro integration). Diminishing returns at Performance 96 — 19KB gzipped CSS downloads in ~300ms on slow 4G. |
| **7 (optional)** | Scope font imports to Thai/Latin subsets | 15 min | ⏸ DEFERRED — `unicode-range` means browsers only fetch needed subsets on demand; actual bandwidth impact minimal. Revisit post-launch. |
| **8 (defer)** | 404 page rAF optimization | Later | ⏸ DEFERRED — isolated to 404 page, negligible for real traffic. |
| **9 (defer)** | Article-nav backdrop-filter | Accept | ✅ ACCEPTED — well-optimized in modern browsers, minor paint cost only on article pages. |

---

## 8. Overall Verdict

**The site is in excellent shape.** The WebGL removal and noto-serif-thai cleanup were the two biggest wins — both are confirmed complete. All actionable issues are either fixed or correctly deferred.

The site ships zero JS on article pages, near-zero JS on the homepage, and all visual atmosphere is CSS-driven. This is a strong foundation for scaling content.

---

## 9. Phase 2 — Lighthouse Report Correlation (2026-05-03)

### Pre-fix (10:34 PM)
**Score:** Performance 96 · Accessibility 100 · Best Practices 100 · SEO 100  
**Metrics:** FCP 1.8s · LCP 1.8s · TBT 0ms · CLS 0.001 · SI 4.1s

### Post-fix (11:28 PM) — commit `1cbf485`
**Score:** Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100  
**Metrics:** FCP 1.7s · LCP 1.8s · TBT 0ms · CLS 0.003 · SI 2.6s

### Improvements

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Performance | 96 | **99** | +3 |
| FCP | 1.8s | 1.7s | −0.1s |
| Speed Index | 4.1s | **2.6s** | −1.5s (36%) |
| Critical path latency | 868ms | **461ms** | −407ms |
| Forced reflow | 298ms | **GONE** | ✅ |

### Lighthouse Findings → Code Mapping

| Lighthouse Flag | Before | After |
|---|---|---|
| Render blocking CSS (1,470ms est savings) | Flagged | ⏸ Still flagged — needs build-time critical CSS extraction. Diminishing returns at 99. |
| Forced reflow (298ms) | Flagged at `beef.im:17:22`, `:26:20` | ✅ Gone — no longer in audit |
| Network dependency tree (868ms critical path) | 13 font files in cascade | Reduced to 461ms — sarabun preload broke the longest chain |
| Avoid non-composited animations | Not shown (masked by forced reflow) | 13 animated elements — `stroke-dashoffset`, `filter: blur()`, `width`. Intentional hero atmosphere, fire-once, disabled via `prefers-reduced-motion`. Acceptable. |
| Long main-thread task | Not shown | 1 task, 188ms — `initReveal` IO setup. Under 200ms threshold. |
| Layout shift culprits | Not shown | CLS 0.003 from `.hero-content` (0.002) + `typeIn` eyebrow animation (0.000×3). Well below 0.1 threshold. |

### LCP Breakdown (post-fix)
The real bottleneck is now visible: **Element render delay = 1,230ms** on `.hero-h`. The browser has the font and CSS ready but takes 1.2s to paint the heading through the `heroReveal` animation's `filter: blur(5px)`. Without this animation, LCP would be near-instantaneous. This is a deliberate brand choice — the blur-to-sharp ink reveal IS the visual identity.

### CSS Async Swap — Attempt & Revert

The `?url` import pattern (`import globalCssUrl from '../styles/global.css?url'`) was tried to implement a non-render-blocking CSS load. This was reverted because:

1. **`?url` bypasses Astro's CSS pipeline** — no minification, no deduplication. Result: 141KB unminified vs. 25KB gzipped through Astro's normal pipeline.
2. **Astro auto-injects fontsource CSS separately** — `import '@fontsource/...'` uses Astro's CSS bundling, creating a second `<link rel="stylesheet">` that IS render-blocking. The `?url` only affects the explicitly imported file.
3. **Two `<link rel="stylesheet">` tags** in the final output — one from `?url` (async) and one from fontsource imports (blocking) — negate the benefit.

**Correct approach for the future:** Use a Vite plugin (e.g., `vite-plugin-critical`) or Astro integration that extracts above-the-fold CSS at build time and inlines it into `<style>`, while deferring the rest. This requires Tailwind-aware CSS splitting, which adds complexity.

### Verdict

**Performance 99 with zero JS article pages, 0ms TBT, and near-zero CLS.** The only remaining Lighthouse flag (CSS render-blocking) is a 25KB file downloading in 300ms on slow 4G — fixing it for the last point would require significant build-tool investment (critical CSS extraction) with diminishing returns. The site is production-ready at scale.
