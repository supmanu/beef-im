# Concept: The Expedition Notebook

> **Brief:** Hybridize the Lab Notebook body with a custom cinematic hero, rebuilding the mountaineering/expedition DNA from legacy `nerd-with-nart` into the new beef.im brand. Dark expedition-cover hero → light graph-paper notebook body. One person, one journal, two obsessions.

**Date:** 2026-04-26
**Derived from:** Exploration-Lab-Notebook.md + Preview5 Hybrid D + Docket# red-line marginalia + legacy EmberGlow.tsx

---

## One-line mood

You found an expedition journal left open on a camp table at 4,200 meters. The cover is weathered leather. The pages are graph paper. Half the entries are contract teardowns. Half are grill experiments. The same person wrote everything — in fountain pen, with red-pen corrections, mistakes crossed out, evidence taped in. The fire is still burning beside it.

---

## Structure: Two zones, one page

```
┌──────────────────────────────────────────┐
│  ZONE 1 — THE COVER (Hero)               │
│  Dark expedition canvas                  │
│  ─ Ember particles drifting (campfire)   │
│  ─ Massive เนื้อ watermark at 320px       │
│  ─ Headline ink-bleed animation          │
│  ─ Title-card pin position, bottom-left  │
│  ─ Temperature bar at edge               │
│  ─ Graph-paper grid lines fading up      │
│     from the bottom — the pages inside   │
│     bleeding through the cover           │
│  Duration: first 80vh of scroll          │
├──────────────────────────────────────────┤
│  ZONE 2 — THE PAGES (Body)               │
│  Light cream graph paper, 24px grid      │
│  ─ Clean typeset body (Sarabun/Serif)    │
│  ─ Navy-blue fountain-pen marginalia     │
│  ─ Red-pen verdict circles               │
│  ─ Taped-in scrap exhibits               │
│  ─ Crossed-out corrections               │
│  ─ Highlighter overlays                  │
│  ─ Hand-drawn connector arrows           │
│  Scroll-pinned after 80vh release        │
└──────────────────────────────────────────┘
```

The brand lives in the transition: the dark cover opens, the notebook pages appear. The cinematic moment is the *opening* of the journal. Not a banner. Not a splash screen. A held breath before the investigation begins.

---

## ZONE 1 — The Cover Hero

### Palette

| Role | Hex | Name |
|---|---|---|
| Hero background | `#0D0A07` | Expedition night — warm near-black, not clinical black |
| Hero surface / title card | `#1A1510` | Weathered leather — the journal cover |
| Hero text | `#F0E8D5` | Campfire-lit warm cream |
| Hero accent | `#E8782A` | Ember amber — from legacy EmberGlow |
| Hero critical | `#B85C38` | Burnt sienna — expedition red |
| Graph-paper bleed | `rgba(175, 165, 145, 0.06)` | Grid lines fading up from body into hero |

### Typography

| Role | Thai | Latin | Notes |
|---|---|---|---|
| Hero brand mark | Anuphan ExtraBold | Bricolage Grotesque | Mountaineering weight, not fashion weight |
| Hero headline | Anuphan ExtraBold | — | 32px, `-0.025em` tracking |
| Hero eyebrow / metadata | IBM Plex Mono | IBM Plex Mono | 10.5px, `0.22em` tracking, burnt sienna |
| Hero watermark glyph | Anuphan ExtraBold | — | 320px, 8% opacity, `เนื้อ` or `ดู` |

### Five cinematic techniques (all pure CSS)

1. **Ember particle drift (legacy EmberGlow.tsx reuse).** 12 ember particles animate upward from the bottom edge — warm amber `#E8782A`, 3px circles with soft glow. Same physics. Retuned for campfire energy, not arctic storm. Particles drift from margin positions, not center — so the title card remains readable.

2. **Slow conic-gradient sunburst.** Top-right quadrant only. Rotates at 32s per cycle. Sourced from Provenance's sunburst. `repeating-conic-gradient(from 12deg, rgba(232, 120, 42, 0.10) 0deg 12deg, transparent 12deg 24deg)`. Suggests a compass rose or expedition instrument without being literal.

3. **Massive Thai glyph watermark.** `เนื้อ` set at 320px Anuphan ExtraBold, bottom-left, 8% opacity in ember amber. Borrowed from Yaowarat Code's giant glyph marker but recoded from typographic chaos → atmospheric depth. The glyph bleeds off the bottom-left like a field journal's stamped ownership mark. `prefers-reduced-motion`: static.

4. **Title-card pin position.** Noto Serif Thai headline anchored bottom-left in a documentary still position. Eyebrow + byline above. The title card is the "first page" visible through the cover — a hint of what's inside. Headline fades in with ink-bleed: `filter: blur(2px) → blur(0px)` over 400ms (ink settling into paper). After blur clears, marginal notes appear with 200ms stagger.

5. **Temperature bar at hero bottom edge.** 4px gradient bar: `#3B7DD8` (safe) → `#F5A623` (caution) → `#E8482F` (critical). Position marker at 78%. Teases the editorial body's core information tool. Sourced from GLM 5.1's Temperature Grade.

### The transition

The graph-paper grid from Zone 2 fades *up* into the hero's bottom 30% — `linear-gradient(to top, rgba(175, 165, 145, 0.14) 0%, transparent 100%)` overlaid on the 24px grid pattern. The notebook pages are literally bleeding through the cover. As the user scrolls past 80vh, the title card releases and the grid rises to fill the viewport — the cover is now fully open.

### Animation budget (hero only)

| Element | Technique | Duration | Trigger |
|---|---|---|---|
| Ember particles | `translateY` drift + opacity | 6s loop, staggered | On load, continuous |
| Sunburst compass | `transform: rotate()` | 32s loop | On load, continuous |
| Headline ink-bleed | `filter: blur(2px → 0)` | 400ms | On load |
| Marginal note stagger | Opacity fade + `translateY(4px → 0)` | 200ms each, staggered | After ink-bleed completes |
| Title-card scroll release | Position: sticky → static | N/A | IntersectionObserver at 80vh |
| CTAs (if any) | Ember pulse glow (legacy) | 4s loop | On load |

### Build cost

| Dimension | Rating |
|---|---|
| Code reuse from legacy | High — EmberGlow.tsx ports directly |
| Typeface licensing | $0 — Anuphan + IBM Plex Mono + Bricolage Grotesque free |
| Photography required | None — type-driven hero. Can layer expedition photography over time |
| Animation budget | Medium — same as Hybrid D |
| Mobile sunlight | Hero penalized (dark). Body fully readable (cream). Acceptable — pattern proven by legacy NWN |
| Build complexity | Low-Medium — pure CSS, no WebGL, no canvas |

---

## ZONE 2 — The Notebook Pages

### Palette (8 colors + grid)

| Role | Hex | Name |
|---|---|---|
| Primary background | `#F5F2EA` | Notebook cream — Moleskine/Leuchtturm warm ivory |
| Grid lines | `rgba(175, 165, 145, 0.18)` | Graph paper grid at 24px (5mm) spacing |
| Surface / card (scraps) | `#FDFBF7` | Taped-in paper — slightly brighter than background |
| Body text (printed) | `#1C1814` | Letterpress ink — warm near-black, never `#000` |
| Handwritten notes | `#2B4A5E` | Fountain-pen navy — all marginal annotations |
| Red pen / verdict | `#CC3A2F` | Correction red — verdict circles, strikethroughs |
| Highlighter | `rgba(255, 237, 100, 0.45)` | Translucent yellow overlay |
| Masking tape | `rgba(245, 240, 220, 0.65)` | Semi-transparent cream — tape across scraps |

### Typography stack

| Role | Thai | Latin | Size/Weight | Notes |
|---|---|---|---|---|
| Display headline | Anuphan ExtraBold | Bricolage Grotesque Bold | 2.2–4rem, 800/700 | Anchors the page |
| Body (typeset) | Sarabun Regular | Source Serif 4 Regular | 18px, 400, 1.7 leading | The official report |
| Marginalia (handwritten) | K2D Light | Caveat Regular | 14px, 300/400, 1.5 leading | Navy-blue pen notes |
| Mono / data | IBM Plex Mono | IBM Plex Mono | 13px, 500 | Clause IDs, temps, timestamps |
| Verdict stamps | Anuphan Bold | Caveat Bold | 16px, 700 | Red-pen verdict circles |

### Component system

#### `<Note>` — marginal annotation
```
Props: text, color ("navy"|"red"), rotationSeed (string), position ("left"|"right")
```
Renders a marginal note in K2D/Caveat at 14px. Rotation: `-2° to +2°` derived from `rotationSeed`. Desktop: left or right of body column. Mobile: collapses to inline chip.

#### `<Verdict>` — red-pen circle
```
Props: text, verdict ("pass"|"fail"|"caution"|"custom"), position ("bottom-right"|"top-right")
```
Imperfect red SVG circle with ±3px perturbation at control points, seeded by text. Announces: `✓ ผ่าน`, `✗ ไม่ผ่าน`, `⚠ ตรวจสอบ`. Also usable as standalone stamps: `URGENT`, `VERIFIED`, `CASE FILE`, `EXPERIMENT LOG`.

#### `<Scrap>` — taped-in exhibit
```
Props: children (ReactNode), label (string), rotation (-4 to +4, derived from label)
```
Wraps content in a "taped-in" container. `::before` pseudo-element renders translucent masking tape across top, slight rotation, 1px border, subtle drop-shadow. Used for: policy clause excerpts, key recipe steps, spec card tables, "Exhibit A" callouts.

#### `<Correction>` — crossed-out mistake + fix
```
Props: original (string), corrected (string)
```
Red wavy strikethrough on original, corrected text below in navy handwriting. Used for failed recipe attempts AND insurance misconceptions → corrected facts.

#### `<Arrow>` — hand-drawn connector
```
Props: from (ref), to (ref), label (string, optional)
```
SVG curved arrow with irregular path connecting marginal notes to body passages. Connects ideas across sections. On mobile: collapses to underline.

#### `<Highlight>` — highlighter overlay
```
Props: children (inline text)
```
Wraps inline text in translucent yellow `rgba(255, 237, 100, 0.45)` with rough-edged background via `box-shadow` spread variance.

### Animation signatures (body)

| Animation | Description | Trigger | Duration |
|---|---|---|---|
| Ink-bleed on section entry | Body text `filter: blur(2px → 0)` then marginal notes stagger-fade | Viewport entry | 600ms total |
| Red-pen circle draw | SVG `stroke-dashoffset` → 0 with speed-vary midpoint (human hand) | Viewport entry, threshold 0.5 | 600ms |
| Tape-application settle | TranslateY overshoot + settle: `-4px → 0` with spring curve | Viewport entry | 400ms |
| Grid background | Completely static | — | — |
| No hover lifts, no parallax, no cursor-follow | — | — | — |

`prefers-reduced-motion`: all animations become instant opacity fades.

### Layout instinct

**Article page — the notebook leaf:**
- Above fold: large Anuphan ExtraBold headline, flush-left
- Thin red horizontal rule below headline (ruled margin line)
- Byline + date in navy handwriting below the rule
- Body: clean Sarabun/Source Serif in single column, capped at 640px
- Right margin (desktop, 25%): `<Note>` components at varied rotations, `<Arrow>` connectors, `<Verdict>` at section ends
- Between sections: horizontal ruled line, then next section
- Footer: large `<Verdict>` at bottom-right with overall grade, then date + initials + page number in navy handwriting

**Homepage — the table of contents:**
- Not a card grid. A notebook's *index* — list of entries
- Entry number (left column, red ink)
- Date (navy handwriting)
- Title (printed headline)
- Category stamp: `CASE FILE`, `EXPERIMENT LOG`, `FIELD NOTE`
- One-line summary in navy handwriting below
- Temperature bar at top of each entry (4px gradient, inherited from GLM 5.1)
- Top entry: subtle red `LATEST` stamp in margin
- Vertical scroll. No carousel. No hero image. The cover hero was already the image.

### Content-type mappings

| Content type | Notebook treatment | Signature component |
|---|---|---|
| Insurance contract teardown | **Case File.** Typeset body, red-pen annotations flagging clauses. `<Scrap>` taped-in policy excerpts. Header: `CASE FILE #__` stamped in `<Verdict>`. | `<Verdict>` at footer. `<Note>` in margin. `<Scrap>` for clauses. |
| Insurance product comparison | **Spec Sheet.** Two-column spec cards with count-up numbers, rendered as taped-in comparison tables inside `<Scrap>`. | `<Scrap>` with count-up table. `<Verdict>` per product. |
| Grill recipe | **Experiment Log.** Typeset body. Corrections in navy handwriting. Temp chart as hand-drawn marginal sketch. Header: `EXPERIMENT LOG #__`. | `<Correction>` for failed attempts. `<Note>` for technique tips. `<Arrow>` for temp-to-method links. |
| Quick cooking tip | **Field Note.** Entire entry in navy handwriting — jotted directly, no typeset body. | `<Note>` as body. Small `<Verdict>` with doneness stamp. |
| Market commentary | **Observation.** Typeset body, marginal reactions. The investigator recorded data, then wrote their reaction. | `<Note>` in navy. `<Highlight>` for key figures. |
| Opinion / editorial | **Reflection.** Typeset body with frequent red-pen interjections. Self-debate visible. | `<Note>` in red for self-debate. `<Verdict>`: `OPINION` not `FACT`. |

---

## Component bridge: insurance + meat

The notebook format unifies both content types at the *container* level — not through a shared visual motif but through a shared *authorship*. The same person's journal, same pen, same verdict circles, same tape. Insurance teardowns get `CASE FILE` stamps. Recipes get `EXPERIMENT LOG` stamps. Both are filed in the same notebook index.

Bonus: the **temperature bar** works identically for both. Insurance risk level (`#3B7DD8` safe → `#E8482F` critical) and meat doneness (`#3B7DD8` rare → `#E8482F` well-done) share the same spectrum. A `HIGH RISK` policy and a `WELL DONE` steak both land in the red. The reader learns the language once, applies it everywhere.

---

## Constitution alignment

| Pillar | Verdict |
|---|---|
| §1.4 เน้นเนื้อๆ ไม่เอาน้ำ | ✓ Substance-first. Grid is functional, not decorative. Notes add evidence, not padding. |
| §1.1 True King Doctrine | ✓ Authority demonstrated through evidence in margins, not announced in hero. |
| §1.3 Anti-Sales (Sinek) | ✓ The notebook is a research artifact, not a sales pitch. No urgency, no begging. |
| Article II — Banned terms | ✓ Zero banned terms in component language. `CASE FILE` and `EXPERIMENT LOG` are forensic, not sales. |
| §6.1 Dual content | ✓ Notebook format unifies both content types at the container level. Equal weight. |
| §7.1 Footer watermark | ✓ `📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)` for finance. `🔥 คัดเนื้อโดย: ประกันเนื้อๆ (beef.im)` for meat. Fits naturally at page bottom. |
| Thai-First 85/15 | ✓ Thai leads everywhere. English appears only in data labels and monospace metadata. |
| Mountaineering DNA | ✓ The cover hero IS the expedition metaphor — embers as campfire, sunburst as compass, glyph as stamped gear. The legacy energy survived the rebrand. |

---

## Expedition metaphor mapping

| Everest / Expedition | Notebook visual |
|---|---|
| Summit log | Red-pen `<Verdict>` at page bottom — the conclusion after the investigation |
| Route map | Graph-paper grid (24px engineering pad) — the terrain beneath every entry |
| Field observations | Navy-blue `<Note>` marginalia — what the investigator saw |
| Failed attempts | `<Correction>` crossed-out mistakes — the wrong routes, the lessons |
| Collected specimens | `<Scrap>` taped-in policy excerpts and recipe cards — what was brought back |
| Weather / conditions data | Temperature bar — ambient conditions measured |
| Expedition number | `CASE FILE #__` / `EXPERIMENT LOG #__` stamps — sequential documentation |
| Gear stamp | Massive `เนื้อ` glyph watermark in hero — the mark of ownership |
| Campfire | 12 ember particles drifting — the fire that's always burning |
| Compass | Slow conic-gradient sunburst — orientation, not decoration |

---

## Why this beats pure Lab Notebook

The pure Lab Notebook (without hero) has no cinematic first impression. The cover hero solves that: 80vh of atmospheric depth, campfire energy, title-card gravity — then drop into the notebook body. The pattern is a direct evolution of legacy NWN: EmberGlow arctic storm → EmberGlow campfire. Mountain-summit photography → graph-paper journal. Same emotional gravity, different visual lexicon, fully beef.im-branded.

## Why this beats Docket# / Weekend Dossier for the mountaineering brand

Docket# is courtroom. Weekend Dossier is newsroom. Neither is expedition. The notebook IS the expedition — the field journal, the camp table, the fire, the evidence brought back. It encodes the person who climbed Everest into the design itself. No other direction in any of the 24 outputs does that.

## Why this beats Yaowarat Code / Bangkok Zine for the mountaineering brand

Those directions are bold-genius but loud-genius. They dominate attention through typographic aggression. The notebook is bold-quiet: the confidence of someone who left all their climbing gear by the door, sat down at the camp table, and opened their journal. No neon required. The crossed-out mistakes ARE the boldness.

---

## Buildability

| Component | Tech | Complexity |
|---|---|---|
| Ember particles | CSS `@keyframes` (legacy EmberGlow.tsx reuse) | Low |
| Sunburst compass | CSS `conic-gradient` + `transform: rotate()` | Low |
| Glyph watermark | Single CSS `::after` pseudo-element | Low |
| Ink-bleed animation | CSS `filter: blur()` transition | Low |
| Graph paper grid | CSS `background` with 3 linear-gradients | Low |
| `<Note>` | K2D/Caveat + CSS `transform: rotate()` seeded by prop hash | Low |
| `<Verdict>` | SVG `<path>` with cubic-bezier perturbation | Low-Medium |
| `<Scrap>` | `::before` tape + box-shadow + rotation | Low |
| `<Correction>` | Red strikethrough + navy text | Low |
| `<Arrow>` | SVG `<path>` with curved connectors | Medium |
| `<Highlight>` | `<mark>` with `box-shadow` spread | Low |
| Temperature bar | CSS gradient strip | Low |
| Scroll-pinned hero release | IntersectionObserver | Low |

**No canvas. No WebGL. No custom fonts (all Google Fonts, free).** 4–5 days for a solo Next.js developer. 10 font files (target: trim to 6–7 for production). All animations `prefers-reduced-motion` compliant.

---

## Risks

| Risk | Mitigation |
|---|---|
| K2D + Caveat at 14px on mobile — does "handwritten" survive? | Test on real device outdoors. Fallback: Sarabun Light at 13px italic in navy. |
| Graph paper grid at 24px — legible as "notebook" at 360px width? | Test. May need to scale to 20px on mobile. |
| Red-pen circle wobble tolerance — "hand-drawn" vs. "broken rendering"? | Test 2px, 3px, 5px perturbation. Sweet spot likely 2–4px at 60px radius. |
| MDX authoring overhead — does placing components slow writing? | Write one article in notebook format. Time it. If >20% overhead, add auto-defaults. |
| Font load weight — 10 font files is heavy | Trim: drop Source Serif 4 (system serif), drop Bricolage (Anuphan-only headlines). Target 6 files. |
| Dark hero + mobile sunlight = bad | Acceptable — proven by legacy NWN. Body is cream + sunlight-readable. Users scroll past hero in 1.5s. |
| Photography discipline — hero and scraps both depend on visual quality | Type-driven hero removes photo dependency. Scraps use existing article photography. Gradual investment. |

---

## Test before committing

1. Build a single article page as standalone HTML (like the Preview files). One cover hero + one notebook body section. Grid background, headline ink-bleed, 3 `<Note>` components, 1 `<Verdict>`, 1 `<Scrap>`. Open on phone in daylight. If it reads as "expedition journal" and not "broken CSS," the direction has legs.

2. Time MDX authoring: write one Case File (insurance teardown) in notebook components. If overhead <20%, ship. If >20%, add auto-placement defaults.

3. Test K2D + Caveat at 14px on Android budget device in direct sunlight. If illegible, pivot to Sarabun Light italic in navy.

---

## Reference points

1. **Leonardo da Vinci's Codex Leicester** — one brain's output, undivided by genre, unified by the notebook format. Observations alongside calculations. Ink density varying with urgency.

2. **Anthony Bourdain's kitchen prep notes** — recipe corrections in different ink colors. Technique modifications in margins. A chef who also wrote. The notebook as the natural home for both.

3. **Field Notes brand memo books** — the specific 3.5×5.5" graph-paper memo book aesthetic. The product argues: anything worth writing down belongs in one of these.

4. **Legacy nerd-with-nart mountaineering home** — the emotional register: warmth in hostile environments. Fires at altitude. The expedition journal is the natural evolution — same soul, new format, fully beef.im-branded.

---

## Hero mockup text (for the standalone HTML test)

```
ประกันเนื้อๆ
BEEF · IM · EXPEDITION LOG

CASE FILE 04 · POLICY TEARDOWN

ผมอ่านสัญญาให้คุณ — ทีละหน้า
ค่าธรรมเนียมที่ตัวแทนไม่บอกคุณ ตอนขาย Unit-Linked

โดย ณัฐพล · 25 APR 26 · 2,840 WORDS
```

The headline renders in the title-card pin position, bottom-left, Anuphan ExtraBold 32px, warm cream on dark. The ink bleeds into focus. The embers drift. The sunburst rotates in the top-right. The `เนื้อ` glyph bleeds off the bottom-left at 320px. The grid lines from the notebook pages below are faintly visible through the bottom of the cover.

Then you scroll. The cover releases. The notebook opens.
