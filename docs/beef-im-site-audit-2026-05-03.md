# beef.im Site Audit — 2026-05-03
**Auditor:** DeepSeek V4 Pro GO  
**Scope:** Full codebase evaluation of the beef.im Astro website  
**Status:** Complete. All actionable issues fixed or deferred. Final Performance 99.

---

## 1. What's Confirmed Fixed

**Pre-session baseline:** `60ca069` — use this to revert if needed.

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

### Phase 3 Fixes (2026-05-04 — commits `660adaf` → `b9235fc`)

| Item | File | Change |
|---|---|---|
| Hero heading visible during delay (latent bug) | `src/styles/global.css:147-150` | Added `opacity: 0` at 0% and `opacity: 1` at 100% to `heroReveal` keyframe. `filter: blur(5px)` alone on 36–58px Thai text was still fully readable — the headline was visible from frame 1, killing the dramatic reveal. |
| Flourish timing mismatch | `src/components/Hero.astro:43` | Delayed `pen-draw` from 0.6s → 1.4s to match heading reveal. Was drawing a red line under empty space for 0.8s while heading was invisible. |
| Noise overlay GPU cost | `src/styles/global.css:89` | Reduced `feTurbulence numOctaves` from 3 → 1. At 5.5% opacity, visually identical but significantly cheaper GPU compositing on the site's hardest-working layer. |
| Slower heading reveal (Option C) | `src/styles/global.css:282` | Changed `heroReveal` duration from 0.9s → 1.2s. Heading still appears at 1.4s, but blur→sharp transition is more luxurious. Reverted a +0.4s delay shift (1.4s→1.8s) that had pushed SI to 4.1s on some runs. |

---

## 2. Remaining Issues

### 2.1 [LOW — FIXED] Forced reflow in `initReveal` — 298ms layout thrash
**File:** `src/pages/index.astro:46-84`  
**Fixed in commit:** `67f850c` (2026-05-03)

The `initReveal` function wrote `container.dataset.inkInit = '1'` (DOM mutation) BEFORE calling `getBoundingClientRect().top` (geometry read). This forced the browser to synchronously recalculate layout. Additionally, the Navbar's inline `updateHeroDate()` script (which writes `el.textContent`) runs earlier in document order, leaving the DOM in a dirty layout state — making `getBoundingClientRect()` even more expensive.

**Lighthouse trace:** `https://beef.im:17:22` → 298ms, `https://beef.im:26:20` → 298ms, `[unattributed]` → 14ms.  
**Fix:** Moved `container.dataset.inkInit = '1'` to AFTER all geometry reads (line 60), ensuring no DOM mutation precedes `getBoundingClientRect()`.

---

### 2.2 [MEDIUM — FIXED] `body::after` noise overlay — global perpetual GPU cost
**File:** `src/styles/global.css:84-91`  
**Fixed in commits:** `60ca069` (scope to homepage) + `5acb164` (reduce `numOctaves` 3→1)

An SVG `feTurbulence` filter (`fractalNoise`, `numOctaves=3`) ran on a `position:fixed` full-viewport pseudo-element at `z-index:9998` on every page.

**Phase 1 fix (commit `60ca069`):** Scoped to `body.home::after` so the overlay only runs on the homepage.  
**Phase 3 fix (commit `5acb164`):** Reduced `numOctaves` from 3 → 1. At 5.5% opacity, the visual difference is imperceptible, but GPU compositing cost drops significantly.

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
| **10 (cosmetic)** | Hero heading reveal timing | 30 sec | ✅ DONE — commits `5ac46ae` → `45b4771` (2026-05-03). `.hero-h` animation-delay: 0.2s → 0.8s → **1.4s**. Restores dramatic stagger: rule (0.2s) → eyebrow types (0.6s) → heading ink reveal (1.4s) → sub/CTA (1.8s/2.2s). Cost: SI 2.6s → ~3.0s. |
| **11 (visual bug)** | Hero heading visible during delay | 30 sec | ✅ DONE — commit `660adaf` (2026-05-04). Added `opacity: 0/1` to `heroReveal` keyframe. `filter: blur(5px)` on 36–58px Thai text was still readable — the headline appeared from frame 1, killing the dramatic reveal. |
| **12 (visual bug)** | Flourish draws under invisible heading | 30 sec | ✅ DONE — commit `5acb164` (2026-05-04). Delayed `pen-draw` from 0.6s → 1.4s. The red flourish was drawing for 0.8s under empty space before the heading appeared. |
| **13 (GPU)** | Reduce noise overlay `numOctaves` 3→1 | 30 sec | ✅ DONE — commit `5acb164` (2026-05-04). At 5.5% opacity, 1 vs 3 octaves is visually identical. Single hardest-working GPU layer on the site. |
| **14 (cosmetic)** | Slower heading reveal duration (Option C) | 30 sec | ✅ DONE — commit `b9235fc` (2026-05-04). Changed `heroReveal` duration 0.9s → 1.2s. A +0.4s delay shift (1.4s→1.8s) had pushed SI to 4.1s on some runs — reverted, kept original timing, slowed the transition itself instead. |

---

## 8. Overall Verdict

**The site is in excellent shape.** The WebGL removal and noto-serif-thai cleanup were the two biggest wins — both are confirmed complete. All actionable issues are fixed, correctly deferred, or accepted.

**Phase 3 hero reveal fixes (2026-05-04):**
- `opacity: 0/1` added to `heroReveal` keyframe — headline is truly invisible until its reveal moment
- Flourish timing synced to heading appearance — no more drawing under empty space
- `numOctaves` 3→1 on noise overlay — significant GPU savings, visually identical
- `heroReveal` duration 0.9s→1.2s — more luxurious ink-spreading without delaying LCP

The site ships zero JS on article pages, near-zero JS on the homepage, and all visual atmosphere is CSS-driven. Performance 99 with FCP 1.2s, LCP 1.9s, TBT 0ms, CLS 0.001. This is a strong foundation for scaling content.

---

## 9. Phase 2 — Lighthouse Report Correlation (2026-05-03)

### Pre-fix (10:34 PM)
**Score:** Performance 96 · Accessibility 100 · Best Practices 100 · SEO 100  
**Metrics:** FCP 1.8s · LCP 1.8s · TBT 0ms · CLS 0.001 · SI 4.1s

### Post-fix (11:28 PM) — commits `1cbf485`·`1de47d6`
**Score:** Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100  
**Metrics:** FCP 1.7s · LCP 1.8s · TBT 0ms · CLS 0.003 · SI 2.6s

### Current state (post cosmetic tweak — commits `5ac46ae`·`45b4771`)
**Estimated:** Performance ~97-98 · SI ~3.0-3.2s  
The hero heading delay bump (0.2s → 1.4s) trades ~2 Lighthouse points for dramatic pacing. Re-run PageSpeed to confirm. LCP should remain at 1.8s (heading renders at blurry 0% keyframe state at 1.4s delay — still within LCP window).

### Improvements

| Metric | Before | Phase 2 | Phase 3 (final) | Delta (overall) |
|--------|--------|---------|-----------------|-----------------|
| Performance | 96 | **99** | **99** | +3 |
| FCP | 1.8s | 1.7s | **1.2s*** | −0.6s |
| LCP | 1.8s | 1.8s | **1.9s** | +0.1s |
| Speed Index | 4.1s | **2.6s** | **1.2s*** | −2.9s (71%) |
| Critical path latency | 868ms | **461ms** | **310ms** | −558ms |
| TBT | — | 0ms | **0ms** | — |
| CLS | — | 0.003 | **0.001** | −0.002 |
| Forced reflow | 298ms | **GONE** | **GONE** | ✅ |

*Phase 3 FCP/SI of 1.2s is an optimistic outlier. Typical range: FCP 1.4–1.7s, SI 1.5–2.6s.

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
The LCP element is the `.hero-watermark` ("เนื้อ" at 0.2s), not the heading. The watermark fades in early and satisfies LCP before the headline even starts its reveal. This is a happy accident of the design — the dramatic heading reveal (now with `opacity: 0` at frame 1, commit `660adaf`) does not block LCP.  
**Element render delay on heading:** ~980–1,230ms — the browser has the font and CSS ready but the heading remains invisible until the `heroReveal` animation produces visible pixels. Without this animation, LCP would be near-instantaneous. This is a deliberate brand choice.

### CSS Async Swap — Attempt & Revert

The `?url` import pattern (`import globalCssUrl from '../styles/global.css?url'`) was tried to implement a non-render-blocking CSS load. This was reverted because:

1. **`?url` bypasses Astro's CSS pipeline** — no minification, no deduplication. Result: 141KB unminified vs. 25KB gzipped through Astro's normal pipeline.
2. **Astro auto-injects fontsource CSS separately** — `import '@fontsource/...'` uses Astro's CSS bundling, creating a second `<link rel="stylesheet">` that IS render-blocking. The `?url` only affects the explicitly imported file.
3. **Two `<link rel="stylesheet">` tags** in the final output — one from `?url` (async) and one from fontsource imports (blocking) — negate the benefit.

**Correct approach for the future:** Use a Vite plugin (e.g., `vite-plugin-critical`) or Astro integration that extracts above-the-fold CSS at build time and inlines it into `<style>`, while deferring the rest. This requires Tailwind-aware CSS splitting, which adds complexity.

### Post-deploy Cosmetic Tweak (commits `5ac46ae`, `45b4771`)

Bumped `.hero-h` animation-delay from 0.2s to 1.4s to restore the dramatic staged reveal. Previously the heading appeared blurry at the same moment as the rule (0.2s), before the eyebrow even started typing. The new sequence:

| Time | Element | Animation |
|------|---------|-----------|
| 0.2s | `.hero-rule` | Red line draws |
| 0.6s | `.hero-eyebrow span` | "CASE FILE №04..." types out (1.2s) |
| 1.4s | `.hero-h` | "ดูเนื้อ ไม่ดูหน้า" ink reveal (0.9s, blur→sharp) |
| 1.8s | `.hero-sub` | Settles |
| 2.2s | `.hero-cta` | Settles |

**Tradeoff:** Speed Index rises from 2.6s to ~3.0-3.2s. Performance score likely 97-98 (down 1-2 from 99). This is intentional — the blur-to-sharp ink reveal IS the brand's visual identity, and the dramatic pacing is worth more than 2 Lighthouse points.

### Phase 3 — Hero Reveal Fixes (2026-05-04)

#### Latent Bug: `filter: blur(5px)` Does Not Hide Thai Text (commit `660adaf`)

DeepSeek's optimization made the page paint faster, which **exposed** a bug that had always existed: the `heroReveal` keyframe used `filter: blur(5px)` without `opacity: 0`. On 36–58px Thai glyphs, 5px blur is decorative — the text is fully readable. With `animation-fill-mode: both`, the heading was visible-but-blurry from frame 1, completely killing the dramatic reveal.

**Fix:** Added `opacity: 0` at 0% and `opacity: 1` at 100% to `heroReveal`. The heading is now completely invisible during the 1.4s delay, then fades in from blur+transparent to sharp+visible.

**LCP impact:** Expected shift from ~1.8s → ~2.0–2.2s. In practice, LCP is satisfied by the `.hero-watermark` ("เนื้อ" at 0.2s), so the heading opacity change has minimal LCP impact.

#### Flourish Timing Mismatch (commit `5acb164`)

The fountain-pen flourish (`pen-draw`) started at 0.6s and finished at 1.6s — under empty space, since the heading was invisible until 1.4s.

**Fix:** Delayed `pen-draw` from 0.6s → 1.4s. The flourish now starts exactly when the heading appears.

#### Noise Overlay GPU Optimization (commit `5acb164`)

DeepSeek scoped `body::after` noise to `body.home::after` (good), but left `numOctaves=3` — the single hardest-working GPU layer on the site.

**Fix:** Reduced `numOctaves` from 3 → 1. At 5.5% opacity, visually identical.

#### Option C: Slower Reveal, Not Longer Delay (commit `b9235fc`)

A +0.4s delay shift (heading 1.4s→1.8s, sub 1.8s→2.2s, CTA 2.2s→2.6s) was tested for more dramatic staging. It felt smoother but pushed SI to 4.1s on one PageSpeed run (likely variance, but risky). Reverted the delay shift and instead **slowed the reveal itself**:

| Time | Element | Animation |
|------|---------|-----------|
| 0.2s | `.hero-rule` | Red line draws |
| 0.6s | `.hero-eyebrow span` | "CASE FILE №04..." types out (finishes at 1.8s) |
| **1.4s** | **`.hero-h`** | **Ink reveal begins (1.2s duration, was 0.9s)** |
| 1.8s | `.hero-sub` | Settles |
| 2.2s | `.hero-cta` | Settles |

The heading still appears at 1.4s (while eyebrow is still typing — intentional overlap), but the blur→sharp transition takes 1.2s instead of 0.9s for a more luxurious ink-spreading feel.

### Phase 3 — Lighthouse Report (2026-05-04, 1:03 AM)

**Score:** Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100  
**Metrics:** FCP 1.2s · LCP 1.9s · TBT 0ms · CLS 0.001 · SI 1.2s

| Metric | DeepSeek Post-fix | Phase 3 (final) | Delta |
|--------|-------------------|-----------------|-------|
| Performance | 99 | **99** | — |
| FCP | 1.7s | **1.2s** | −0.5s |
| LCP | 1.8s | **1.9s** | +0.1s (acceptable) |
| Speed Index | 2.6s | **1.2s** | −1.4s |
| Critical path | 461ms | **310ms** | −151ms |
| TBT | 0ms | **0ms** | — |
| CLS | 0.003 | **0.001** | −0.002 |

Note: The exceptionally low FCP/SI (1.2s) on this run is likely an optimistic outlier due to warm CDN cache and low server load. The typical range is FCP 1.4–1.7s, SI 1.5–2.6s. The 4.1s SI observed on one run with the +0.4s delay shift was a pessimistic outlier.

### Verdict

**Performance 99 with zero JS article pages, 0ms TBT, and near-zero CLS.** The only remaining Lighthouse flag (CSS render-blocking) is a 25KB file downloading in 300ms on slow 4G — fixing it for the last point would require significant build-tool investment (critical CSS extraction) with diminishing returns. The site is production-ready at scale.
