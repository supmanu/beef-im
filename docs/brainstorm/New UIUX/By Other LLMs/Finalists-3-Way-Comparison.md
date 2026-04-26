# 3 Finalists Compared — Provenance · Lab Notebook · Spec Sheet

**Date:** 2026-04-25
**Context:** User narrowed to these three. Font risk is a decision concern. No custom fonts.

---

## Font Risk — resolved first

All three pass. Zero custom fonts required.

| Direction | Thai fonts (all Google) | Latin fonts (all Google) | Risk |
|---|---|---|---|
| **Provenance** | IBM Plex Sans Thai + IBM Plex Mono Thai + Anuphan | IBM Plex Sans + IBM Plex Mono + Bricolage Grotesque | None. Monolithic IBM Plex family. Most complete Thai+Latin system available. |
| **Lab Notebook** | Sarabun (body) + K2D (handwritten notes) + Anuphan (display) | Source Serif 4 (body) + Caveat (handwritten) + Bricolage Grotesque (display) + IBM Plex Mono (data) | Low. K2D is the closest Google Fonts Thai face to handwriting — humanist, organic stroke contrast. Caveat is genuinely handwritten Latin. The "handwritten" register comes from *treatment* (navy color, 14px, slight rotation, organic placement) more than the font itself. |
| **Spec Sheet** | Bai Jamjuree (display) + Anuphan (body) | JetBrains Mono (display) + Inter (body) | None. All production-proven. Inter at body size on dark backgrounds needs contrast testing. |

**The Lab Notebook font question specifically:**

You don't need a custom handwriting font. The trick is that the margin notes don't have to literally look like handwriting — they need to read as *notes distinct from the official printed text*. K2D at 14px in navy-blue (`#2B4A5E`) with a slight rotation (±2°) alongside clean Sarabun at 18px in black is enough contrast. The reader's brain categorizes: black serif = printed report, blue lighter sans = someone's notes. The hand-drawn SVG marks (circles, arrows, underlines) carry the organic quality — not the font.

If K2D doesn't convince on the phone test, fallback: keep the margin notes in Sarabun but at 13px in navy with a 0.5px `text-decoration-style: wavy` underline — the wavy underline alone signals "hand-annotated."

---

## 3-way comparison

### At a glance

| Axis | Provenance | Lab Notebook | Spec Sheet |
|---|---|---|---|
| **Background** | Light cream + grid texture | Light cream + graph paper grid | Matte black `#0A0A0A` |
| **Mood** | Graded, stamped research publication | One person's private research journal | Instrument documentation / owner's manual |
| **Brand voice** | Institutional analyst | Personal investigator | Machine operator |
| **Signature component** | Rating badge (WELL MARBLED / OVERWEIGHT) | Red-pen verdict circles + margin notes | Spec cards with count-up numbers |
| **Animation** | Sunburst + count-up + red-line hover | Ink-settle + circle draw + tape settle | Count-up numbers only |
| **Build days (solo)** | 3 | 4–5 | 2 |

### 10-axis scoring (1–5)

| Axis | Provenance | Lab Notebook | Spec Sheet |
|---|---|---|---|
| **Brand Fit** — expresses "one person doing forensic analysis" | 4 | **5** | 3 |
| **Build Cost** — solo Next.js realism | 5 | 3 | **5** |
| **Mobile Sunlight** — outdoor Bangkok readability | **5** | **5** | 2 |
| **Dual-Content** — insurance + meat without split | **5** | **5** | 4 |
| **Author Visibility** — can you see the person? | 3 | **5** | 1 |
| **Uncopyable** — can competitors replicate? | 4 | **5** | 3 |
| **5-Year Durability** — won't date | **5** | **5** | 4 |
| **First Impression** — 2-second impact | 3 | **5** | 4 |
| **Authoring Overhead** — extra work per article | 4 | 2 | **5** |
| **Font Risk** — all free, all available | **5** | 4 | **5** |
| **TOTAL** | **43** | **44** | **36** |

### Spec Sheet's sunlight problem

This is disqualifying for a mobile-first Thai audience. `#0A0A0A` background at 2pm in Bangkok means the reader sees their own reflection, not the content. You can add a light-mode toggle, but every model in the bake-off converged on "dark-first with toggle" and zero solved the "but the brand IS dark" tension. Spec Sheet's entire identity — instrument documentation, matte black, electric cyan numerals — collapses in sunlight. This is the direction's fatal constraint. You liked it most emotionally, but it will hurt your readers physically.

### Provenance vs Lab Notebook — the real fork

| If you believe... | Pick... |
|---|---|
| The brand's credibility comes from **institutional rigor** (the analysis is correct because the methodology is sound) | **Provenance** — rating badges, temperature bars, stamps. The system says "verified." |
| The brand's credibility comes from **personal accountability** (the analysis is correct because I'm showing my work, including my mistakes) | **Lab Notebook** — red-pen corrections, margin notes, crossed-out errors. The system says "I investigated this myself." |

Provenance says: *trust the grade.*
Lab Notebook says: *trust the grader.*

### The "why not both" option

Provenance's skeleton (cream grid, IBM Plex, rating badges, temperature bars) + Lab Notebook's soul (the personal margin notes, red-pen verdicts, the handwritten annotation register). The rating badge IS the verdict — but rendered inside the Lab Notebook's red-pen circle. The temperature bar IS the preview — but rendered as a hand-drawn thermometer strip at the top of the notebook entry.

This hybrid costs an extra day of build (4 days total) and keeps the authoring overhead of Lab Notebook. But it gets you: the institutional credibility of the badge system + the personal authority of the notebook + mobile sunlight readability from both.

---

## Recommendation

1. **Eliminate Spec Sheet** on mobile sunlight grounds. It's the right aesthetic for the wrong audience context. Keep its spec-card component and count-up animation — both transplant into either remaining direction.

2. **Build Provenance first** (3 days). It's the faster, safer ship. The rating badge + temperature bar + stamp system gives you a functioning site that already looks like nothing else in Thai finance.

3. **Layer Lab Notebook components onto Provenance over the next 2 weeks.** Add `<Note>` margin annotations, `<Verdict>` red circles, `<Scrap>` taped-in exhibits. These are additive components — they don't break the Provenance skeleton. As authors get comfortable, the notebook character grows.

4. **The K2D + Caveat test:** Before committing to Lab Notebook components, build one article page with K2D margin notes at 14px navy-blue on cream grid. Open on phone outdoors. If it reads as "notes" to you, ship it. If not, fall back to the wavy-underline approach.

**Bottom line:** You get 80% of the Lab Notebook's soul for 20% of its effort by building it as a component layer on top of Provenance, not as a separate direction. Don't choose — sequence.
