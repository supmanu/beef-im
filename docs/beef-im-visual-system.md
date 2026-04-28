# beef.im — Visual System (v1.0 draft)

**Status:** Early draft, codifies what is already shipping in `src/styles/global.css` and the live site as of Apr 28, 2026. Source of truth is the CSS — this document is a human-readable translation. When they disagree, the CSS wins; update this doc.

**Brand master line:** ดูเนื้อ ไม่ดูหน้า — *judge by substance, not appearance.*

---

## 1. Aesthetic — "Notebook"

beef.im is rendered as a **paper notebook**: cream parchment, faint graph-paper grid, hand-marked annotations in red ink, small ephemera (scraps, post-its, wax seals). The hero acts as a notebook cover; article pages are inner pages with marginalia. Not a magazine, not a SaaS dashboard, not a blog — a working journal that happens to be on the web.

**Tone register:** academic-but-warm. Investigative, not promotional. Annotated, not decorated.

**What it is not:**
- Not adventure / expedition (no mountaineering metaphor — retired with rebrand)
- Not editorial magazine (no full-bleed photography, no display headlines)
- Not minimalist tech (no infinite white space, no flat color blocks)

---

## 2. Color Palette

CSS tokens live in `:root` of `src/styles/global.css`.

| Token | Hex | Role |
|---|---|---|
| `--color-cream` | `#F0EADC` | Body text on dark surfaces; CTA text fill |
| `--color-cream-card` | `#F8F2E4` | Tilted scrap-card paper (lighter than page) |
| `--color-cream-deep` | `#E3DAC3` | Deeper parchment for inset surfaces |
| `--color-ink` | `#1B1A17` | Primary text; near-black, never pure black |
| `--color-red` | `#CC3A2F` | Verdict seal, accent rule, hover state, "ล่าสุด" stamp text |
| `--color-red-stamp` | `#A84030` | Masthead category labels (CASE FILE, EXPERIMENT LOG, FIELD NOTE) |
| `--color-navy` | `#2B4A5E` | Hand-script subhead, sidenote text, sketch line |
| `--color-burn` | `#B85C38` | Eyebrow / mono labels / entry numbers (warm secondary) |
| `--color-teal` | `#2E6D63` | Mono right-aligned tags, hp-header-right, nav-right |
| `--color-gold` | `#C7B78F` | Hairline rules between entries |
| `--color-highlight` | `#F4EED8` | Entry hover background |
| `--color-grid-line` | `rgba(120,100,75,0.11)` | Graph-paper grid (24px) |

**Page background gradient:**
- Hero top → bottom: `#F3EDDF → #EFE9D8 → #EFE8D5`
- Homepage flat: `#EFE8D5` (matches hero bottom — there is a deliberate radial-warmth difference, see `Hero` notes in CSS)

**Color rules:**
- **Pure black is banned.** Use `--color-ink`. Pure black reads foreign on parchment.
- **Pure white is banned** for body backgrounds. White is reserved for tilted scrap cards via `--color-cream-card`.
- **Red is sacred.** Reserved for verdicts, accents, and the latest stamp. Don't use it for body emphasis — use `<Highlight>` (yellow) instead.

---

## 3. Typography

### Font stack
```css
--font-thai:    "Sarabun", sans-serif;       /* Body Thai prose */
--font-display: "Anuphan", sans-serif;       /* Headings, brand labels, CTAs */
--font-mono:    "IBM Plex Mono", monospace;  /* Eyebrows, codes, meta, tags */
--font-hand:    "K2D", sans-serif;           /* Hand-script subhead, sidenote, verdict subtext */
```

**Anuphan ExtraBold (800)** is preloaded for LCP — never swap the H1 weight.

### Type scale (post Apr 27 legibility pass)

| Element | Size mobile / desktop | Weight | Family |
|---|---|---|---|
| Hero H1 (`ดูเนื้อ ไม่ดูหน้า`) | 36 / 58 | 800 | display |
| Hero subhead (italic hand) | 15 / 18 | 300 italic | hand |
| Hero eyebrow (CASE FILE №...) | 9.5 / 11 | 500 mono | mono |
| Article H1 | 28 / 34 | 800 | display |
| Article body paragraph | 15 / 16 | 400 | thai (line-height 1.78) |
| Homepage entry title (H2) | 18 / 19.5 | 800 | display |
| Homepage entry lede | 14 | 400 | thai (line-height 1.65) |
| Homepage entry sidenote | 12 | 300 italic | hand |
| Homepage masthead category | 9.5 | 700 mono uppercase | display |
| Homepage masthead meta (code · words · time) | 8.5 | 500 | mono |
| Verdict label ("ภรรยาบอกว่า...") | 12 | 300 italic | hand (opacity 0.85) |
| Footer stamp circle | 10 | 700 mono uppercase | display (48px circle, opacity 0.85) |
| Latest stamp ("ล่าสุด") | 8.5 | 700 | display (rotated −2°) |

### Letter-spacing
- All uppercase mono labels: `0.14–0.22em` (English wider than Thai)
- Display headings: `−0.012 to −0.03em` (tight)
- Body Thai: 0 (default)

### Banned
- `font-mono` on display numbers (use display font + tabular numerals if needed)
- `tracking-widest` (use `0.14–0.22em` literal values)
- Pure white on body text (use `#1B1A17` ink)

---

## 4. Grid & Texture

**Graph paper grid:** 24px × 24px, `rgba(120,100,75,0.11)`. Applied as two `linear-gradient` overlays on `.hero` and `.homepage`. Never align content to the grid — content respects its own typographic baseline; the grid is texture.

**Page edges:** No box, no card, no hard border around content blocks. Hairline `--color-gold` opacity 0.55 between entries is the only ruled separator.

**Drop-shadow rule:** Long-gone. Notebook elements lift via tiny rotational offset (`transform: rotate(−2deg)`) and 1px shadows max. No SaaS-style box-shadow stacks.

---

## 5. Motion Principles

### Allowed
- **Ink-settle reveal** — IntersectionObserver cascade on homepage entries. Existing `inkSettle` keyframe (filter blur 4px → 0, opacity 0 → 1, 1s ease-out). First-batch stagger 80ms.
- **Type-in eyebrow** — hero eyebrow uses `steps(28)` typewriter animation (1.2s).
- **Rule draw** — accent rules use `scaleX(0) → scaleX(1)` (900ms, cubic-bezier).
- **Sketch draw** — hero SVG sketch lines use `stroke-dashoffset` animation (2.2s).

### Banned (hard rule)
- **No full-viewport 3D transforms.** Removed Apr 27 — caused vestibular-visual conflict (motion sickness). Codified in `memory/feedback_no_viewport_3d_transforms.md`.
- **No parallax scrolling on hero.** Static.
- **No infinite-loop animations** above the fold (the conic sunburst is technically infinite at 60–80s, that's the only exception — slow enough to read as static).

### Reduced motion
All animations honor `prefers-reduced-motion: reduce` via the global override at `global.css:111`. Do not bypass.

---

## 6. MDX Component Vocabulary

Five notebook components, globally injected by `src/pages/[...slug].astro` — no `import` lines in MDX files.

| Component | When to use | When NOT to use |
|---|---|---|
| `<Highlight>` | Numerical anchors (฿128,400, 30%), brand-defining one-liners, counterintuitive verbs on numbers | Cosmetic emphasis (use bold), inside tables, inside code blocks |
| `<MarginNote>` | Right-side parenthetical aside, expert tip, soft observation | More than 3 per article — sprinkles, not the main course |
| `<MarginNote position="left" caution>` | Hard warning (ระวัง, อันตราย, safety) | Soft observations (use right-side default) |
| `<ScrapCard label="EXHIBIT N · …">` | Wrapping markdown tables, exhibit blocks | Wrapping prose paragraphs, nested inside other components |
| `<CorrectionBlock strike="…" fix="…" />` | The Paradox reveal — belief vs reality pivot | Anywhere not at the article's structural pivot. Max 1 per article. |
| `<VerdictSeal line1="…" line2="…" />` | Conclusion stamp on `case` and `experiment` articles | `field-note` articles (observational, not adjudicating) |

Decoration philosophy: **better to under-decorate than over-decorate.** Two `<Highlight>` + one `<VerdictSeal>` reads cleaner than eight `<Highlight>` and five `<MarginNote>` competing.

---

## 7. Footer Watermark

Per `nerd/pillars/constitution.md` Article VII, dual-emoji footer differentiates content type:

- **Finance/insurance:** `📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)` (frontmatter `footerType: analysis`)
- **Beef (facts, science, technique, recipes):** `🔥 คัดเนื้อโดย: ประกันเนื้อๆ (beef.im)` (frontmatter `footerType: beef`)

Inline brand attribution mid-article is **banned** — applies the brand law "เน้นเนื้อๆ ไม่เอาน้ำ" to the brand itself. Footer is enough; first-person ผม voice is not attribution and stays.

Image overlays on charts/tables/diagrams carry a faint `beef.im` watermark on a separate visual layer (does not interrupt prose).

---

## 8. Asset Sovereignty

CDN: `https://assets.beef.im/` (Cloudflare R2, bucket `beef-assets`). Whitelisted in build config. Legacy `assets.nerdwithnart.com` is read-only — new assets land in `beef-assets`.

See [.claude/rules/visuals.md](../.claude/rules/visuals.md) for the asset inventory + code reference table.

---

## 9. What's Intentionally Undefined

These are **not yet locked** — leave room for the first 5 articles to surface real patterns:

- Photography direction (no live photos in the system yet — only SVG sketches)
- Illustration style beyond the hero compass-sketch
- Print/social/LINE share templates
- Calculator UI inside `ToolLayout.astro` (currently empty — React Islands deferred)
- Dark-mode variant (deliberately not pursued — parchment is the brand)

Add to this doc when those land. Don't pre-design them on paper.

---

## 10. Source-of-Truth Hierarchy

1. **`src/styles/global.css`** — authoritative for all values
2. **`src/components/`** — authoritative for component patterns
3. **This doc** — human-readable map of (1) and (2)
4. **`docs/brainstorm/New UIUX/Prototype-Definitive-v1.html`** — original visual reference, frozen. Used only to verify parity, not as a forward source.

When CSS and this doc disagree, fix the doc. When this doc and the prototype disagree, prefer the live CSS unless the user explicitly asks to roll back.

---

*Draft v1.0 · Apr 28, 2026 · Will rev as the article corpus grows.*
