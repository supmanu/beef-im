# beef.im UI/UX Decision Log — Session: Kimi K2.6

**Date:** 2026-04-26
**Agent:** Kimi K2.6 (OpenRouter)
**Task:** Evaluate six shortlisted UI/UX directions against `voice-dna.md` and `constitution.md`; recommend and prototype unified architecture.

---

## Directions Evaluated

| # | Direction | Source | User's Read |
|---|---|---|---|
| 1 | **Clause Block** | GPT-5.4 | Similar to Tabloid but less negative, more to the point |
| 2 | **Docket#** | DeepSeek V4 Flash | Good balance, red tone catches attention without being obvious |
| 3 | **Weekend Dossier** | GPT-5.4 | Classy and clean, favorite from start, but a bit boring |
| 4 | **Hand-Drawn Lab Notebook** | Opus 4.7 wildcard | Unique and clean; maintenance concern; needs WOW animations |
| 5 | **Yaowarat Code** | DeepSeek V4 Flash | Love it but too loud; dark-mode / sunlight risk |
| 6 | **Bangkok Zine** | Sonnet 4.6 CC | Similar to Yaowarat but less extreme |

**Plus referenced:** Tabloid (Preview 4) — attention mechanism admired, urgency register rejected.

---

## Core Insight

The user identified a real gap: all 14 LLM proposals (and their 70+ directions) trended toward **editorial/material systems** that look excellent at rest but lack the **cinematic hero immersion** of the legacy `nerd-with-nart` homepage (Snowstorm + EmberGlow). The Tabloid direction was eye-catching precisely because it solved the attention problem — but its urgency register fights the Constitution.

**Key realization:** Do not pick one direction. Pick a **body system** (durability + readability) and a **hero system** (attention + immersion), then graft them. Use other directions as **component donors**.

---

## Per-Direction Forensic Read

### Clause Block
- **Register:** Brutalist-dense, conviction over urgency
- **AIA red:** `#D1492E` is terracotta/architectural — NOT corporate AIA red. Ideal for "I represent AIA but am not AIA."
- **Pillar fit:** Forensic Mode perfect; Casual Mode weak (cooking becomes "procedure")
- **Hero potential:** Low — body system, not opening shot
- **Verdict:** Ship as **alt body** for data-heavy pages (comparison charts, spec sheets)

### Docket#
- **Register:** Legal-forensic, annotated brief
- **AIA red:** `#D43830` IS essentially AIA red — closest alignment in the bake-off. Framed as "red ink annotation" not "brand color," providing cover.
- **Pillar fit:** Forensic Mode perfect; Casual Mode acceptable (chef's notes stretch)
- **Hero potential:** Low — document system
- **Verdict:** Ship as **alt body** for archive / index views; annotation lane is genuinely ownable

### Weekend Dossier
- **Register:** Institutional editorial, FT Weekend-style
- **Pillar fit:** Strong across all tests; equal-weight dual tracks via `POLICY DESK` / `FOOD DESK`
- **Hero potential:** None pure — but **Preview5 Hybrid B** (Cold-Open Hero × Dossier Body) already solved this
- **Verdict:** Ship as **primary body system** — most durable 5-year container

### Hand-Drawn Lab Notebook
- **Register:** Autodidact personal journal
- **Maintenance:** Not a nightmare IF systematized (CSS graph paper, generative tilt seeded by article ID, SVG arrows). But requires a designer who can write generative rules.
- **WOW factor:** Page-turn transitions, ink-bleed reveals (SVG stroke-dasharray), handwriting animation — all CSS/SVG, low build cost
- **Risk:** First-time readers may read "hand-drawn" as "amateur blog" — filters FOR authenticity, AGAINST institutional credibility
- **Verdict:** Ship as **secondary/alt body** for personal essays / bridge content; NOT primary system

### Yaowarat Code
- **Register:** Thai street-typographic chaos
- **Pillar fit:** Forensic Mode weak (chaos fights mechanism-deep reading); Casual Mode strong
- **Sunlight:** `#0D0D0D` + `#FF5533` neon fails 11am–3pm Bangkok mobile. No viable mitigation.
- **Verdict:** Do NOT ship as body. **Steal components for hero ONLY:** giant Thai glyph (retuned to 10% opacity for atmosphere), neon accent as hover state

### Bangkok Zine
- **Register:** Pratunam shophouse signage, calmer than Yaowarat
- **Risk:** Dark warm brown reads as nightlife/restaurant — writing must carry extra authority
- **Verdict:** Ship as **component donor** (sticker system: `วิเคราะห์แล้ว`, `เนื้อแน่น`, `ไม่ผ่าน`) or alternate body for lifestyle content

---

## Unified Architecture (Approved)

```
┌─────────────────────────────────────────────┐
│  HERO: beef.im Signature Module              │
│  • Ember particles (CSS, 12 count)           │
│  • Slow sunburst rotation (conic-gradient)   │
│  • Giant Thai glyph "เนื้อ" at 10% opacity   │
│  • Brand master line: ดูเนื้อ ไม่ดูหน้า       │
│  • Temperature bar teaser                    │
│  • Pins for 80vh, then releases on scroll    │
├─────────────────────────────────────────────┤
│  BODY: Weekend Dossier (primary)             │
│  • Cream paper #F6F1E8                       │
│  • Masthead block (DESK · WORDS · MIN)       │
│  • Sidenote rail for evidence depth          │
│  • FOOD DESK / POLICY DESK parity            │
├─────────────────────────────────────────────┤
│  ALT BODY: Docket# (forensic deep dives)     │
│  • Red-rule margin annotation                │
│  • Cite ⌘K for source documents              │
├─────────────────────────────────────────────┤
│  ALT BODY: Clause Block (dense data)         │
│  • Brutalist block framing                   │
│  • Row-slam reveal on tables/cards           │
├─────────────────────────────────────────────┤
│  COMPONENTS (swappable gallery)              │
│  • Bangkok Zine sticker system               │
│  • Hand-Drawn Lab SVG arrow cross-reference  │
│  • Tabloid ticker (footer signal stream)     │
│  • Yaowarat giant glyph (hero atmosphere)    │
└─────────────────────────────────────────────┘
```

**Why this wins:**
1. **Weekend Dossier body** = 5-year durability, sunlight readability, equal-weight dual tracks
2. **Signature hero** = cinematic immersion of legacy NWN without punishing the rest of the site
3. **Docket# alt** = forensic credibility for founding edge (unit-linked rescue)
4. **Clause Block alt** = brutalist density for data-heavy comparisons
5. **Component donors** = signature moments without committing to their full systems

**Constitution compliance:** Every body direction is urgency-free, status-free, evidence-led. Hero performs atmosphere, not manipulation.

**The "expensive" factor:** Hero carries production value; body carries trust. Same pattern as *The Economist* (quiet grid, theatrical cover) or *Monocle* (restrained page, flex photography).

---

## Files Produced

| File | Description |
|---|---|
| `Prototype-Unified-KimiK2.6.html` | Working HTML prototype with CSS animations demonstrating all five sections |

---

## Open Questions (for next session)

1. **Hero photography requirement:** Does the signature hero need a photographic background, or do particles + sunburst + glyph carry it alone? If photography is needed, what is the production plan?
2. **Mobile scroll-pin behavior:** Is 80vh pin duration right, or should it be shorter (50vh) for faster access to content?
3. **Temperature bar semantics:** Should every article carry a temperature value (high editorial discipline), or is it homepage-only?
4. **CMS implementation:** Can Payload CMS support per-article body-style switching (Weekend Dossier vs Docket# vs Clause Block), or should the body style be determined by content category?
5. **Dark mode:** Does the signature hero need an automatic light-mode fallback for daytime mobile, or is the dark hero acceptable with a light body?

---

*End of log.*
