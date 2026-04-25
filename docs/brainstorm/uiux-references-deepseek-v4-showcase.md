# UI/UX Reference Analysis — DeepSeek-V4-Pro Showcase

**Analyzed:** 2026-04-25 by Opus 4.7 (session before user's rest break)
**Source URLs:**
- Catalog index: https://deepseek-v4.pages.dev/
- Sublevel 7 web demo: https://deepseek-v4.pages.dev/web/
- Build prompt for Sublevel 7: https://deepseek-v4.pages.dev/web/PROMPT.md
**User signal:** "the color palette is easy on the eyes" (catalog) · "similar to our flowing particles but in multicolours" (web demo)

This note captures what we learned from the showcase so future sessions don't re-analyze it. It informs the brainstorm review (see [uiux-prompt.md](./uiux-prompt.md)) but is **not** included inline in the LLM prompt — would anchor proposals.

---

## Page 1 — Catalog index (cream + forest-green almanac)

### Visual signature

- **Background:** warm cream/parchment (`~#F5F1E4`) with a faint grid texture
- **Hero:** dark forest-green sunburst rays radiating from the right edge behind the headline
- **Headline:** heavyweight condensed grotesque, near-black, set very tight — "DEEPSEEK-V4-PRO" stacked aggressively on three lines. Likely Inter Tight Black or similar.
- **Callout:** soft mint/sage green box (`#D8E8DC`-ish) with a thin border, dark green stroke
- **Metadata pills:** rounded cream pills with thin dark border, monospace key + serif/sans value
- **Table headers:** solid black band, white caps text
- **Status indicators:** soft-pastel-green check circles (think "OK" stamps)

### Why it's interesting for ประกันเนื้อๆ

This palette puts the brand in a **category of one** in Thai finance space. Every Thai personal-finance site is dark fintech-bro or pastel food-blogger — nobody is in the *almanac / vintage cookbook / Lloyd's-of-London ledger* register. Both halves of the brand actually have lineage there:

- **Meat content** — print cookbook DNA (Cherry Bombe, Lucky Peach, Cook's Illustrated, René Redzepi's *Noma* book)
- **Insurance content** — "trustworthy old institution" reads more Lloyd's-of-London than slack-channel-crypto-bro

The risk people will reflexively flag — "but we already shipped dark-mode!" — is exactly the bias we're brainstorming against. **When LLM proposals come back, do not rule out a light-palette direction reflexively.** Mobile readability under sunlight actually favors light backgrounds with dark body text.

### Typography moves to consider

Heavyweight Thai display fonts to pair with a heavy condensed Latin grotesque:
- **Prompt Black** (existing in stack, can push heavier)
- **Anuphan Bold / Black**
- **Bai Jamjuree Black**
- **IBM Plex Sans Thai Bold** — pairs naturally with IBM Plex Sans Latin

Body would still want a comfortable Thai sans (Sarabun, Noto Sans Thai, IBM Plex Sans Thai).

---

## Code-level findings — verified from catalog page source

Fetched 2026-04-25 via `curl https://deepseek-v4.pages.dev/`. The implementation is far simpler than it looks.

### Verified font stack

```css
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=IBM+Plex+Mono:wght@500;600&family=Spline+Sans:wght@400;500;650;700&display=swap");
```

| Role | Font | Notes |
|---|---|---|
| Display headline | **Bricolage Grotesque** (500/700/800) | Variable-width grotesque with personality. Not Inter Tight. Has more character — slight quirks per glyph that make headlines feel set, not generated. |
| Body | **Spline Sans** (400/500/650/700) | 2026-current modern sans, quietly trending. Note the unusual 650 weight in the load. |
| Mono / data | **IBM Plex Mono** (500/600) | Already on our shortlist. |

For Thai pairing — neither Bricolage Grotesque nor Spline Sans has Thai glyphs. We'd need to pair with Thai equivalents (Anuphan Bold for display, Sarabun or IBM Plex Sans Thai for body) and let the browser font-stack handle script splitting.

### Verified palette (CSS variables)

```css
:root {
  --bg:           #e8e1d0;                     /* warm cream                 */
  --panel:        #fff9e8;                     /* hero card surface (lighter)*/
  --ink:          #17140f;                     /* near-black body text       */
  --muted:        #6b6254;                     /* warm neutral muted         */
  --line:         #272017;                     /* dark stroke / borders      */
  --hairline:     rgba(39, 32, 23, 0.18);      /* subtle dividers            */
  --accent:       #007f6d;                     /* forest green               */
  --accent-ink:   #042b26;                     /* deeper green for emphasis  */
  --accent-soft:  #bde9d6;                     /* mint callout fill          */
  --warning:      #f0b323;                     /* warm yellow                */
  --error:        #a41437;                     /* deep crimson               */
  --error-soft:   #f8c9d5;                     /* dusty pink                 */
  --shadow:       12px 12px 0 rgba(23, 20, 15, 0.2);  /* hard offset shadow */
}
```

Notable: hard-offset chunky shadow (`12px 12px 0`) instead of blur — that's what gives the hero card its "stamped" almanac-poster feel.

### Body background stack — multi-layer, no images

```css
body {
  background:
    /* 1. fine grid texture — vertical lines  */
    linear-gradient(90deg, rgba(39, 32, 23, 0.05) 1px, transparent 1px),
    /* 2. fine grid texture — horizontal lines */
    linear-gradient(180deg, rgba(39, 32, 23, 0.05) 1px, transparent 1px),
    /* 3. green radial glow, top-left          */
    radial-gradient(circle at 18% 12%, rgba(0, 127, 109, 0.2), transparent 28rem),
    /* 4. yellow radial glow, top-right        */
    radial-gradient(circle at 88% 18%, rgba(240, 179, 35, 0.24), transparent 24rem),
    /* 5. base diagonal beige gradient         */
    linear-gradient(135deg, #f6efd9 0%, var(--bg) 54%, #d3c7ae 100%);
  background-size: 36px 36px, 36px 36px, auto, auto, auto;
}
```

Five stacked CSS layers — zero image assets, infinitely scalable, ~5 KB total payload. The 36×36 px grid + two radial color washes + base diagonal = warm "old-paper" depth without any photography.

### The rotating sunburst — the actual technique

What it looked like and behaved like → confirmed implementation:

```css
.hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.hero::before {
  content: "";
  position: absolute;
  inset: -25% -10% auto auto;     /* anchored top-right, hangs off edges */
  width: 46rem;
  height: 46rem;
  background: repeating-conic-gradient(
    from 12deg,
    rgba(0, 127, 109, 0.15) 0deg 12deg,    /* 12° forest-green wedge */
    transparent              12deg 24deg   /* 12° transparent gap    */
  );
  border-radius: 50%;             /* clips square gradient to circle */
  opacity: 0.7;
  z-index: -1;
  animation: slow-turn 28s linear infinite;
}

.hero::after {
  /* secondary decorative rounded rectangle, bottom-right */
  content: "";
  position: absolute;
  right: 28px;
  bottom: 28px;
  width: min(32vw, 300px);
  height: min(32vw, 300px);
  border: 2px solid rgba(39, 32, 23, 0.18);
  border-radius: 32px;
  transform: rotate(-6deg);
  z-index: -1;
}

@keyframes slow-turn {
  to { transform: rotate(1turn); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; }
}
```

**Names for this:** sunburst (design term), pinwheel (when rotating), conic-gradient sunburst (CSS-implementation term).

**Why it works:** 28-second linear rotation is below the perceptual threshold of "movement" — reads as "the site is alive" rather than "something is moving." The 12° wedge / 12° gap pattern at 0.15 opacity is subtle enough to read as texture, not motif.

**Cost:** ~12 lines of CSS, zero JavaScript, zero assets, GPU-composited transform. Cheapest possible premium-animated hero.

**Drop-in for beef.im:** trivial. Swap the green `rgba(0, 127, 109, 0.15)` to amber `rgba(255, 209, 102, 0.12)` (matches our existing brand-amber + glow opacity), drop opacity to 0.4–0.5 against our dark navy background, and it's done. Could replace or layer with EmberGlow depending on the chosen direction.

### Other notable patterns

- **Pill metadata badges** (`.meta span`):
  ```css
  background: rgba(255, 249, 232, 0.78);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 12px;
  box-shadow: 3px 3px 0 rgba(39, 32, 23, 0.11);  /* mini chunky shadow */
  ```
  Each pill carries the hard-offset shadow signature — visual consistency with the hero card.

- **`isolation: isolate`** on `.hero` — creates a new stacking context so `::before` and `::after` `z-index: -1` stays trapped inside the card without bleeding behind body content. Important detail.

- **`::selection` styling** — `color: var(--accent-ink); background: var(--warning);` — when a user selects text, it highlights in warm yellow with deep-green text. Tiny detail, real polish.

---

## Page 2 — Sublevel 7 web demo (deep-sea bioluminescent)

### Visual signature

- **Background:** midnight navy `#050d1a` (darker than our `#0B1D35`)
- **Particles:** ~80 drifting bioluminescent points in cyan `#00f5c4` + accents in abyssal purple `#1a0a2e`
- **Headline:** white display in monospace (Space Mono), letter-spaced, with cyan under-glow
- **Sidebar:** vertical depth-zone selector (SURFACE → EPIPELAGIC → MESOPELAGIC → BATHYPELAGIC → ABYSSAL → HADAL) with current zone highlighted in cyan + numeric depth readout (`3,200 m`)
- **Subtitle:** "RESEARCH BELOW THE THERMOCLINE" letterspaced caps
- **Scroll cue:** down-arrow in cyan at viewport bottom

### What's locked-out (theme)

The whole *fictional deep-sea oceanographic research institute* dressing is themed — "Lux in Profundis" motto, hexagonal crew avatars, ASCII-art deep-sea creatures, sonar pulse, depth meter showing fathoms. **Per the user's "no theme" rule, none of this transplants directly.** Don't propose deep-sea variants for ประกันเนื้อๆ.

### What's transferable (technique, theme-agnostic)

These are the gold:

| Technique | Source detail | How to repurpose for beef.im |
|---|---|---|
| **Multicolor particle field** | Cyan + purple on midnight navy | Re-tune `EmberGlow` to mix amber + a second warm hue (deep ember-red? burnt umber?) for a richer field. Two colors at different opacity layers, not literal multicolor confetti. |
| **Side depth-meter sidebar** | 6-zone vertical selector with active zone highlighted + numeric readout | Could become section ToC for a long-form article ("OVERVIEW / TERMS / CASE / ANALYSIS / VERDICT"), or a scroll-progress indicator with section names. |
| **Sonar ping concentric rings** | Two staggered CSS keyframe rings that scale and fade | Repurpose as "active item" indicator on cards, or "newly-published" pulse on featured articles. |
| **Custom cursor dot trailing** | Desktop-only JS positioning trailing the mouse | Premium-feel detail. Trivial to add. Keep amber on dark backgrounds. |
| **`IntersectionObserver` scroll reveals @ 0.15 threshold** | Triggers text fade-in/translate-up as elements enter viewport | Modern, performant. Should already replace the `framer-motion` per-element animations on long pages. |
| **`prefers-reduced-motion` honored to 0.01ms** | Accessibility default in their build | Standing engineering rule. Audit our existing animations. |

### Discipline lesson

The Sublevel 7 piece is **single-file HTML, only Google Fonts, no external assets**. That extreme constraint forced a tight design. Even though our actual stack is Next.js, the discipline transfers: when proposing a hero rebuild, ask **"could this be one file with one font and CSS gradients only?"** If yes, the design is probably tight enough.

---

## Recommendations for the brainstorm review

When the 5–6 LLM outputs come back:

1. **Don't reflexively rule out light-palette directions.** The almanac register is a serious candidate.
2. **Score "animation/interaction signature" specificity.** A direction that says "subtle hover effects" is weaker than one that says "concentric ping rings stagger 200ms apart on row entry." The added field in the prompt should produce concrete proposals.
3. **Watch for theme-violations.** Some LLMs will sneak in deep-sea, mountaineering, or arctic imagery if the prompt doesn't keep them out. The hard-rules block should catch most of it.
4. **Steal techniques from non-winning directions.** Even if a direction loses overall, a single move (sonar ping, side ToC, etc.) might be worth lifting into the winner.

---

## Related

- [uiux-prompt.md](./uiux-prompt.md) — the brainstorm prompt itself
- [tagline-*.md](./) — prior workshop (different scope, same review format)
- [../beef-im-rebrand-brief.md](../beef-im-rebrand-brief.md) — locked rebrand decisions
- [../../.claude/rules/visuals.md](../../.claude/rules/visuals.md) — current palette + typography rules (will be revised after brainstorm review)
