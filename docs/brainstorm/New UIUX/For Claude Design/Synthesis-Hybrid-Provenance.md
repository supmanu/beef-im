# Synthesis: Provenance — The Ultimate Hybrid Direction

**Compiled by:** DeepSeek V4 Pro — drawing from 14 model outputs + DeepSeek V4 showcase
**Date:** 2026-04-25
**Thesis:** Every component solves a specific problem. No decoration. No compromise.

---

## One-line mood

A graded, annotated, stamped research publication printed on warm almanac paper — where insurance contract forensics and reverse-seared ribeye receive equal analytical gravity, in the same typeface, on the same grid.

---

## What this hybrid steals from where

| Component | Source | Why it earned its place |
|---|---|---|
| Cream + grid texture background | DeepSeek V4 showcase (catalog) | The "simple idea that caught your eye." Mobile-sunlight readable. 5-layer CSS — zero images, infinite scale. |
| Rating badge system | Investment Grade (Sonnet 4.6 CC) | The cleanest dual-content unifier across all 70 directions. Same badge, same position, different labels. |
| Margin annotation lane | Docket# (DeepSeek V4 Flash) + Deep Research (Sonnet 4.6 CC) | Makes forensic credibility visible in every interaction. The UI proves the claim. |
| Stamp/chop verification | Rice Paper & Ink (DeepSeek V4 Pro) + Certified (GLM 5.1) | Thai trust-signal system. Verified articles get stamped. Drafts don't. |
| Temperature bar preview | Temperature Grade (GLM 5.1) | The most original cross-content idea. Same gradient bar = insurance risk AND meat doneness. Scannable at a glance. |
| Hard-offset chunky shadows | DeepSeek V4 showcase + Engraved (GO max) | 12px × 12px × 0 shadow on hero cards. No blur. Physical document weight. Stamped, not elevated. |
| Slow rotating sunburst | DeepSeek V4 showcase | 28s linear rotation, 12° amber wedges. Zero JS. GPU-composited. Reads as "alive," not "animated." |
| Gold-leaf section markers | Engraved (GO max) | #B8860B single-use accents. Section numbers, stamp borders. Gilding, not painting. |
| Count-up data tables | Deep Research (Sonnet 4.6 CC) + Spec Sheet (Opus 4.7) | Every table boots on viewport entry. Monospace tabular figures lock so digits never reflow. |
| Red-line hover draw | Docket# (DeepSeek V4 Flash) | stroke-dasharray animation + ✓ stamp reveal on card hover. Memorable enough to be brand shorthand. |
| IBM Plex full family | Investment Grade (Sonnet 4.6 CC) | Only production-complete Thai+Latin type system. Institutional credibility + mobile readability. One family throughout. |
| Ink-bleed card hover | White Ink / ขาว-หมึก (GO max) | Cursor-position radial gradient spread. Washi paper physics. Touch devices get static tint. |
| Single-ember restraint | ถ่าน / Charcoal (GO max) | One amber element per viewport maximum. Enforces "one grill, one cook" discipline. |
| Chiseled headline reveal | Engraved (GO max) | Text gradient sweep revealing carved depth on scroll entry. One animation, one technique, once per headline. |

---

## Palette (7 colors with hex)

- **Primary background:** `#F5F0E8` (warm almanac cream — paper, not screen. The showcase's `#e8e1d0` pushed slightly warmer and less yellow)
- **Surface / card:** `#FFFCF7` (lifted ivory — cards float above the grid texture)
- **Body text:** `#1C1814` (warm near-black — letterpress ink, never `#000`)
- **Accent — verdict red:** `#B85C3A` (smoked persimmon — brand-amber meets forensic-red. Margin annotations, stamp edges, critical callouts. The most-used accent after body)
- **Accent — institutional navy:** `#1B3A6B` (midnight navy — rating badges, hyperlinks, data headers. From Investment Grade. Used sparingly — it's the "I am serious" color)
- **Accent — gold leaf:** `#B8860B` (dark gold — section markers, stamp borders, one hero element. Exactly one per viewport. From Engraved)
- **Critical signal:** `#D43830` (unambiguous red — rejection verdicts, risk flags, well-done warnings. Pure attention signal, no ambiguity)
- **Grid / hairline:** `rgba(39, 32, 23, 0.12)` (warm transparent grid lines — the showcase's hairline, slightly lighter for readability)
- **Green wash:** `rgba(0, 127, 109, 0.08)` (forest-green radial glow, top-left — from the showcase, tuned down)
- **Amber wash:** `rgba(240, 179, 35, 0.12)` (warm amber radial glow, top-right — from the showcase, tuned down)

---

## Typography stack

| Role | Font | Weight | Why |
|---|---|---|---|
| Display headline (Thai) | **Anuphan** | ExtraBold 800 | Geometric authority. Pairs with Bricolage's quirky grotesque character. At -0.02em tracking for display sizes. |
| Display headline (Latin) | **Bricolage Grotesque** | Bold 700 | From the showcase. Variable-width, slight glyph quirks. Feels *set*, not generated. |
| Body (Thai) | **IBM Plex Sans Thai** | Regular 400 / Text 450 | The Thai arm of the monolithic Plex stack. 18px on mobile, line-height 1.7. Legible in sunlight on any screen. |
| Body (Latin) | **IBM Plex Sans** | Regular 400 | Same family, same rhythm. Complete script coherence. |
| Mono / data / accent | **IBM Plex Mono** | Regular 500 / Semibold 600 | Everything numeric: rating badges, contract clause IDs, temperatures, premium values. Tabular figures locked — digits never reflow. |
| Mono (Thai supplement) | **IBM Plex Mono Thai** | Regular 400 | Where mono Thai is needed for clause references and stamp text. |

**One family.** IBM Plex is the only production-complete Thai+Latin type system. Using it throughout is the statement: this is designed to be read, not admired.

---

## Background — the 5-layer CSS texture

From the showcase, confirmed production-ready:

```css
body {
  background:
    /* 1. vertical grid lines — 36px spacing */
    linear-gradient(90deg, rgba(39, 32, 23, 0.06) 1px, transparent 1px),
    /* 2. horizontal grid lines — 36px spacing */
    linear-gradient(180deg, rgba(39, 32, 23, 0.06) 1px, transparent 1px),
    /* 3. forest-green radial wash, top-left */
    radial-gradient(circle at 18% 12%, rgba(0, 127, 109, 0.08), transparent 28rem),
    /* 4. warm amber radial wash, top-right */
    radial-gradient(circle at 88% 18%, rgba(240, 179, 35, 0.12), transparent 24rem),
    /* 5. base diagonal cream → warm grid */
    linear-gradient(135deg, #F8F2E8 0%, #F5F0E8 54%, #EBE3D4 100%);
  background-size: 36px 36px, 36px 36px, auto, auto, auto;
}
```

Zero image assets. ~2 KB of CSS. Infinitely scalable. Warm old-paper depth without any photography. This is the page the content lives on.

---

## Visual motif — the rating badge

Every article, every product review, every section carries a small top-right badge. Consistent size: 72px × 24px. IBM Plex Mono at 10px uppercase. Hard-offset mini shadow: `3px 3px 0 rgba(39, 32, 23, 0.11)`.

| Content type | Labels | Fill color |
|---|---|---|
| Insurance products | `OVERWEIGHT` / `NEUTRAL` / `UNDERWEIGHT` | Navy `#1B3A6B` |
| Insurance alerts | `HIGH RISK` / `CAUTION` / `VERIFIED` | Red `#D43830` / Amber / Green |
| Meat cuts | `WELL MARBLED` / `LEAN` / `AVOID` | Navy `#1B3A6B` |
| Recipe doneness | `MEDIUM RARE` / `WELL DONE` / `RARE` | Navy `#1B3A6B` |
| General analysis | `GRADE: A+` / `GRADE: B` / `DRAFT` | Navy or grey |

The badge is the site's promise — everything gets graded, nothing is safe from analysis. The grill review and the policy teardown get equal rigor in the same typeface at the same size.

---

## Secondary motif — the annotated margin

On desktop, every article page carries a right-margin annotation lane. Width: 25% of viewport. Content: red bracket rules, handwritten-style clause numbers, `✓ / ✗` verification stamps, temperature tolerances, key contradictions flagged in persimmon red.

On mobile, annotations collapse to inline cobalt or red chips that expand on tap. The annotation system is the UI saying "someone qualified has already read this for you" — for insurance contracts AND recipe techniques.

---

## Tertiary motif — the stamp / chop

Every verified article carries a red `ตราประทับ` stamp at its footer. Shape varies by category:
- Insurance: square stamp (authority)
- Cooking: round stamp (tradition)
- Urgent/alert: oval stamp (movement)

Stamps render as SVGs with slight ink-bleed edges (`feGaussianBlur` at 1.5px then sharpened). Slight random rotation (-2° to +2°, seeded by article ID so it stays consistent). The stamp is the trust signal — articles without it are marked "draft."

---

## Signature mechanic — the temperature bar

Thin horizontal gradient bar (4px tall) at the top of every content card and article page. Same spectrum for both content types:

```
#3B7DD8 (safe/cool) → #F5A623 (caution/warm) → #E8482F (critical/hot)
```

| For insurance | For cooking |
|---|---|
| Safe = straightforward explainer | Rare = 52°C |
| Caution = needs reader attention | Medium = 57°C |
| Critical = read before signing | Well done = 68°C+ |

The bar IS the content preview — reader can scan the homepage and "read" the temperature of every article before clicking. Desktop hover expands bar from 4px to 24px, revealing tooltip with exact grade label.

---

## Hero — the rotating sunburst

One technique from the showcase, retuned to brand colors:

```css
.hero::before {
  content: "";
  position: absolute;
  inset: -25% -10% auto auto;
  width: 46rem; height: 46rem;
  background: repeating-conic-gradient(
    from 12deg,
    rgba(184, 92, 58, 0.10) 0deg 12deg,    /* persimmon wedge — tuned from showcase green */
    transparent              12deg 24deg
  );
  border-radius: 50%;
  opacity: 0.5;
  z-index: -1;
  animation: slow-turn 32s linear infinite;
  /* 32s instead of 28s — even slower, less perceptible */
}

@keyframes slow-turn { to { transform: rotate(1turn); } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; }
}
```

~12 lines of CSS. Zero JavaScript. Zero assets. GPU-composited. At 0.10 opacity in persimmon (#B85C3A) against the cream grid background, it reads as "the page is breathing," not "something is spinning."

No EmberGlow particles in the hero — the sunburst replaces them. (EmberGlow lives on the /manifesto page and article footers, not the home hero.)

---

## Animation signatures (4 total, all disciplined)

### 1. Chiseled headline reveal (once per headline, CSS-only)

```css
h1 {
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, rgba(28, 24, 20, 0.3) 0%, rgba(28, 24, 20, 1) 100%);
  background-position: 100% 0%;
}

h1.revealed {
  background-position: 0% 0%;
  transition: background-position 900ms cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

Activated by a single Intersection Observer. The effect: morning light traveling across carved stone lettering, revealing full inscription depth. Static full-opacity text as default — animation fires once.

### 2. Count-up data tables (once per viewport entry)

On every table's first appearance (observer threshold 0.3), column values count up from `0` to their real values over 600ms `ease-out`. Each column staggered 100ms left to right. Numeric strings only — Thai text cells appear instantly. IBM Plex Mono tabular figures locked — digits never reflow, simulating an instrument booting.

No other animation exists on the site unless listed below. No hover lifts, no parallax, no card transitions.

### 3. Red-line draw on card hover

On hover over an article card or data row, a 1px vertical red line (`#B85C3A`) draws from top to bottom in the left margin using `stroke-dasharray` / `stroke-dashoffset` CSS animation. At completion, a small `✓` stamp circle scales in at the top of the line (`transform: scale(0→1)`, spring overshoot curve, 300ms delay). Reverses on hover-out.

Touch devices: tap-and-hold triggers. Reduced-motion: red line appears instantly with no animation.

### 4. Ink-bleed card surface on cursor follow

Cards track cursor position via a single debounced `mousemove` listener (16ms throttle, event delegation on parent container). On pointer-move, `.card` transitions its `background` to a `radial-gradient(circle at var(--x) var(--y), transparent 0%, rgba(28, 24, 20, 0.03) 100%)` over 400ms ease-out. The gradient center follows the cursor — ink spreading into washi wherever you point.

Touch devices: static center-tint gradient instead. Fallback for no-JS: solid white cards. ~20 lines of vanilla JS.

### What does NOT animate

- Cards do not lift, scale, or shadow-shift on hover
- Navigation does not have hover transitions beyond the red-line draw
- Background sunburst is the only ambient motion
- No parallax
- No scroll-linked reveals beyond the headline chisel
- `prefers-reduced-motion` honored to 0ms on all animations

---

## Layout instinct

**Homepage:** Three tiers.

1. **Hero tier** — single-screen. Cream grid background with slow persimmon-tuned sunburst. One Anuphan ExtraBold Thai headline (`clamp(2.2rem, 5vw, 4rem)`). One Bricolage subhead. Rating badge top-right: `GRADE: A+`. Search bar centered below. Hard-offset shadow on the hero card: `12px 12px 0 rgba(28, 24, 20, 0.15)`. No image. The type IS the hero.

2. **Content stream** — dense 3-col card grid on desktop (2-col tablet, 1-col mobile). Every card carries: temperature bar (top), rating badge (top-right), headline, dek, metadata pills (date · read time · category), stamp or draft marker. Cards have hard-offset mini shadows on hover.

3. **Forensic rail** — right margin annotation lane on long-form article pages. Desktop only. On mobile, annotations collapse to expandable inline chips.

**Article page:** Spec-card preamble before body. Rating badge + temperature bar + key metrics (premium range, coverage type, risk level for insurance; cut grade, cook time, temp for recipes). Then body with annotated margins. Stamp at footer. Related cards below.

**Navigation:** Minimal. Logo left. Section labels in IBM Plex Mono. One persimmon-red underline on active section. No dropdowns. No hamburger menu on desktop — horizontal top-level only.

---

## 3 reference points

1. **DeepSeek-V4-Pro showcase catalog** (deepseek-v4.pages.dev, 2025) — the specific cream grid + conic sunburst + hard-offset shadow + pill badges implementation that the user flagged as "easy on the eyes." This is the direct visual foundation.

2. **Goldman Sachs Global Investment Research equity reports** (2024 PDFs) — the rating system, table formatting, and typographic discipline. The badge vocabulary (`OVERWEIGHT` / `NEUTRAL` / `UNDERWEIGHT`) comes from here. Translated for civilian readers.

3. **The Criterion Collection design language** — specifically how a consistent visual system (spine numbers, wacky C, minimal framing) makes 1,200 films across 40 countries feel like one canon. The rating badge + temperature bar + stamp system aims for the same effect: every piece of content, regardless of topic, belongs to the same publication.

---

## Why it fits beef.im — the core argument

Every component earns its place by solving a specific problem:

| Problem | Solution |
|---|---|
| Dual content (insurance + meat) reads as two different brands | Rating badge system — same component, same position, different labels. Every piece gets graded. No code-switching. |
| Mobile sunlight readability in Bangkok | Light cream background — the grid texture adds depth without darkening. High-contrast body text. |
| "How do I know this was verified?" | Stamp/chop system — verified articles stamped. Drafts marked. Trust is visible before the first sentence. |
| "Is this worth reading?" | Temperature bar preview — scannable risk/doneness spectrum before clicking. |
| "Who checked this?" | Margin annotations — the UI says "someone qualified already read this for you" without a sentence of copy. |
| Brand feels premium but not corporate | Cream grid + sunburst + gold leaf — institutional warmth, not bank-lobby cold. |
| Brand needs to be uncopyable | The stamp system + Thai-annotated margins + temperature bar — no Thai finance site has any of these. |

**The paradox is built into the structure, not described in the copy.** A first-time reader lands on the homepage: sees a temperature bar, a rating badge, and a stamped card. Before reading a word, they understand: this publication grades things. It doesn't matter whether the thing being graded is a whole-life policy or a wagyu short rib. The system handles both.

---

## What gets sacrificed (honest trade-offs)

1. **No cinematic atmosphere.** The dark+ember cluster's "premium steakhouse at midnight" mood is gone. This direction is warm daylight, not candlelight. It trades instant theatricality for 5-year durability and outdoor readability. A reader in Bangkok at 2pm will thank you. A reader browsing at midnight might miss the mood — but they'll still *read* better.

2. **No EmberGlow on the home hero.** The sunburst replaces the particle field for the homepage. EmberGlow is preserved on the /manifesto page and article footers — it's not deleted, just demoted. The homepage gets the more restrained, CSS-only hero.

3. **Editorial discipline required.** Every article needs: a rating, a temperature value, a stamp-or-draft marker, and spec data for the preamble card. This slows publication. The reward is a site that feels like a publication, not a blo

4. **Dense, not sparse.** The 3-col card grid + annotation lane + preamble cards mean more elements per viewport than any single-model direction proposed. The "violent negative space" directions (Spec Sheet, Hearth Cut) are cleaner. This direction bets that *information density* is the luxury for a mass-affluent reader who wants substance — clean whitespace is for readers who want to be impressed by restraint.

---

## Build cost estimate

| Component | Complexity | Notes |
|---|---|---|
| 5-layer CSS background | Trivial | ~2 KB of CSS. Copy from showcase, retune colors. |
| Rotating sunburst hero | Trivial | ~12 lines of CSS. Replace green with persimmon. |
| Rating badge component | Low | Single `<Badge>` component with label + fill props. |
| Temperature bar component | Low | Single `<TemperatureBar>` with value prop. Expand-on-hover. |
| Stamp/chop SVG system | Medium | 3 SVG shapes (square/round/oval) with ink-bleed filter. Dynamic rotation seed from article ID. |
| Margin annotation system | Medium | Desktop right rail with expand/collapse. Mobile: inline chips. Intersection Observer for positioning. |
| Chiseled headline reveal | Low | CSS-only. Single Observer. |
| Count-up data tables | Low | Single JS hook per table. Already production-proven. |
| Red-line draw on hover | Medium | SVG path overlay per card. stroke-dasharray animation. |
| Ink-bleed cursor follow | Low | 20 lines of vanilla JS. Event delegation. |
| IBM Plex font loading | Low | Google Fonts. Three weights per variant. |
| Mobile responsive pass | Standard | All components designed with mobile-first collapse. |

**Total:** 3 days for a solo Next.js developer. No exotic libraries. No WebGL. No canvas. No third-party assets beyond Google Fonts.

---

## Decision fork: what would change if...

**If the rating badge vocabulary shifted from English institutional to Thai vernacular:**
- `OVERWEIGHT` → `น้ำหนักเกิน` (though this is a financial term, not pejorative in Thai-equity context — needs testing)
- `WELL MARBLED` → `ลายหินอ่อนดี`
- `AVOID` → `หลีกเลี่ยง`
- This is the Open Market fork. Decide before building the badge component — the label length changes layout.

**If the temperature bar proved too complex editorially:**
- Collapse to a simpler 3-state system: `COOL / WARM / HOT` with matching colors
- Or drop it entirely and let the rating badge carry all the preview weight

**If the stamp system felt like too many trust signals piled on:**
- Keep rating badge + temperature bar; drop stamps
- Or reverse: keep stamps only for verified forensic articles; drop temperature bar

---

## Verification checklist (before shipping)

1. [ ] Cream grid texture readable at 360px wide in direct sunlight — test on a real phone outdoors
2. [ ] IBM Plex Sans Thai at 18px on budget Android LCD screen — no blurring, no spacing collapse
3. [ ] Temperature bar gradient distinguishable for deuteranopia (red-green color blindness) — test blue→amber→red contrast
4. [ ] Hard-offset shadows don't clip at viewport edges on mobile
5. [ ] Sunburst animation disabled under `prefers-reduced-motion`
6. [ ] Rating badge label length doesn't overflow at 320px (longest label: `UNDERWEIGHT` at 10 chars)
7. [ ] Stamp rotation doesn't cause text clipping at scale extremes
8. [ ] All animations pass Lighthouse performance audit (<100ms Total Blocking Time)
