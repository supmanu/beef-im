---
name: produce-article
description: "Full article production pipeline: Architect (blueprint) → Performer (write) → Auditor (verify) → Decorate (notebook MDX) → Publish (write to src/content/). End-to-end from topic to live MDX file."
disable-model-invocation: true
argument-hint: "[topic] [mode: S|A|B|C]"
allowed-tools: Read, Glob, Grep
---

# Full Article Production Pipeline (Astro/MDX, v2.0)

Execute the complete 5-step pipeline to produce a published Thai article in the
notebook layout — from a topic to a live `.mdx` file in `src/content/`.

## Topic & Mode

**Input:** $ARGUMENTS

If no mode is specified, default to **Mode A** (Analysis, 600–1,000 words).

| Mode | Length | Watermarks | Use case |
|---|---|---|---|
| S | 150–300w | 1 | Scroll post / social draft |
| A | 600–1,000w | 3 | Standard analysis |
| B | 1,500–2,000w | 4 | Deep-dive (flagship) |
| C | 4,000–5,000w | 5 | Quarterly epic — multi-paradox |

## Pipeline Overview

```
Step 1: ARCHITECT  → GSB-Kane Blueprint (find the Paradox)
Step 2: PERFORMER  → Thai prose draft (voice + brand law applied)
Step 3: AUDITOR    → 6-point compliance verdict + Forensic Reconstruction if needed
Step 4: DECORATE   → Add notebook MDX components (Highlight, MarginNote, ScrapCard,
                     CorrectionBlock, VerdictSeal) with diff preview
Step 5: PUBLISH    → Write to src/content/<category>/<slug>.mdx
```

---

## STEP 1: ARCHITECT (Blueprint)

### Architect Instructions
!`cat nerd/agents/instruction-architect.md`

### Required Knowledge for Blueprinting
- Voice DNA: `nerd/pillars/voice-dna.md`
- Framework: `nerd/pillars/framework-deep-dive.md`
- NHES VII: `nerd/pillars/data-nhes-vii.md`
- Terminology: `nerd/pillars/data-terminology.md`
- Content Engine: `nerd/pillars/content-engine.md`
- Paradox doctrine: `.claude/rules/paradox-architecture.md` — **mandatory: no Paradox = no Blueprint**

**Task:** Find the Paradox. Build the GSB-Kane Blueprint with Core Contradiction,
Sinek Hook, Archetype, and Narrative Arc.

**Output the blueprint, then proceed to Step 2.**

---

## STEP 2: PERFORMER (Writing)

### Performer Instructions (v1.9.3)
Read `nerd/agents/performer.md` before writing.

### Required Knowledge
- Voice DNA: `nerd/pillars/voice-dna.md`
- Constitution: `nerd/pillars/constitution.md`
- Thai Handshake: `nerd/pillars/data-thai-handshake-exceptions.md`
- Bridge Lab: `nerd/pillars/tech-bridge-lab.md`
- Terminology: `nerd/pillars/data-terminology.md`
- NHES VII: `nerd/pillars/data-nhes-vii.md`
- Citations: `nerd/pillars/data-citation-template.md`
- Compliance boundaries: `.claude/rules/content-compliance-boundaries.md` — no drug names, no dosages, no diagnostic verdicts

**Task:** Execute the blueprint into a Thai article. Apply the brand voice
(เน้นเนื้อๆ ไม่เอาน้ำ — substance, no filler), watermarks, and footer.

**Pre-submission checklist:**
- No "พี่" (Pi) self-reference
- Headers in pure Thai (no English sub-headers in production)
- NHES VII stats (not NHES 6)
- Watermark count matches mode (S=1, A=3, B=4, C=5)
- Thai-First Handshake ≥ 85% (Thai leads, English in parens)
- Footer per constitution Article VII:
  - Finance/insurance → `📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)`
  - Beef facts/cooking → `🔥 คัดเนื้อโดย: ประกันเนื้อๆ (beef.im)`
- No specific drug names / dosages / diagnostic verdicts
- No Whole Life framed as "bad investment" (canonical LLM hallucination —
  WL = wealth-transfer + protection, not investment)

**Output the draft, then proceed to Step 3.**

---

## STEP 3: AUDITOR (Verification)

### Auditor Instructions
Read `nerd/agents/instruction-sovereign-auditor.md`.

### Required Knowledge
- Constitution: `nerd/pillars/constitution.md`
- NHES VII: `nerd/pillars/data-nhes-vii.md`
- Terminology: `nerd/pillars/data-terminology.md`
- Compliance boundaries: `.claude/rules/content-compliance-boundaries.md`

**Task:** Run the 6-point compliance audit:
1. OIC Compliance (waiting periods, guaranteed renewal)
2. Revenue Code (annuity limits, hold requirements)
3. PDPA Privacy (no child full names, no real client identifiers)
4. SEC Disclaimers (risk warnings on investment-linked content)
5. FDA Health Claims (no "cure", no diagnostic verdicts, no specific drug names)
6. Brand Constitution (banned terms, identity, footer correctness)

**If PASS:** Stamp "APPROVED FOR PUBLICATION" and proceed to Step 4.
**If REJECT:** Apply Forensic Reconstruction (fix violations, output corrected
version) — per `.claude/rules/agent-pattern-forensic.md`, never stop and ask
permission to fix. Then proceed to Step 4 with the corrected version.

---

## STEP 4: DECORATE (Notebook MDX)

Reference: `.claude/skills/decorate/SKILL.md`

The audited Thai prose is now ready for notebook decoration. Run the decorator's
two-pass logic on the approved text:

### Pass 1 — Mechanical (always safe)
- Wrap every markdown table in `<ScrapCard label="EXHIBIT N · …">`
- Append `<VerdictSeal line1="…" line2="…" />` if category is `case` or `experiment`
  and no seal exists yet (default for `case`: ตรวจสอบ / ก่อนเซ็น; for `experiment`:
  ทดลอง / ก่อนเชื่อ)
- Promote pure-Thai `**bold**` to `<Highlight>…</Highlight>`

### Pass 2 — Semantic (judgment calls, max one per article)
- Find the Paradox pivot → `<CorrectionBlock strike="…" fix="…" />` at the reveal point
- Propose 1–3 `<MarginNote>` candidates (right-side default; `position="left" caution`
  for warnings: ระวัง, อันตราย, ห้าม)
- Propose 2–5 additional `<Highlight>` for numerical anchors (฿ amounts, percentages,
  ages) and brand-defining one-liners

**Decoration philosophy:** under-decorate beats over-decorate. Two highlights + one
verdict seal beats eight highlights + five margin notes. Beef articles
(`footerType: beef` — covers beef facts, science, technique, recipes, history) get
a lighter hand — no `<CorrectionBlock>` (beef content isn't adversarial).

**No `import` lines.** All five components are globally injected by
`src/pages/[...slug].astro` and resolve automatically inside any `.mdx` file in
the three content collections.

---

## STEP 5: PUBLISH (Write MDX file)

Reference: `.claude/skills/publish/SKILL.md`

Compose the final MDX file with this frontmatter:

```yaml
---
title: "Full Thai title"
lede: "1–2 sentence homepage TOC summary"
sidenote: "Optional margin note shown on the homepage entry"
date: YYYY-MM-DD
category: case            # case | experiment | field-note
temperature: risk         # risk | medium | low — drives <TemperatureBar> colour
code: "AIA-UL"            # short ref code shown next to the masthead (optional)
wordCount: 1420           # display only (optional)
readTime: "6 MIN"         # display only (optional)
author: "ณัฐพล"            # default if omitted
latest: true              # only one article carries this at a time
footerType: analysis      # analysis (📊 finance/insurance) | beef (🔥 beef facts/technique/recipes)
---
```

**Categories (drives target folder + URL):**
- `case` → `src/content/case/<slug>.mdx` → live at `/case/<slug>`
- `experiment` → `src/content/experiment/<slug>.mdx` → `/experiment/<slug>`
- `field-note` → `src/content/field-note/<slug>.mdx` → `/field-note/<slug>`

**Slug derivation:** Romanise the Thai title to lowercase + hyphens, or use
`--filename=<slug>` flag to override. Filename must match `^[a-z0-9-]+$`.

**Image references:** Use `https://assets.beef.im/<file>.{jpg,png}` (sovereign R2
bucket `beef-assets`). Legacy `assets.nerdwithnart.com` is read-only — do not
publish new content pointing there.

**No `slug:` field in frontmatter.** Astro 6 derives the slug from the filename
via `entry.id`. Pass `--filename=...` to `/publish` if you want to override.

---

## Final Output Format

```
═══════════════════════════════════════
STEP 1: ARCHITECT BLUEPRINT
═══════════════════════════════════════
[Blueprint here — Core Contradiction, Sinek Hook, Archetype, Arc]

═══════════════════════════════════════
STEP 2: PERFORMER DRAFT
═══════════════════════════════════════
[Thai prose, watermarks, footer]

═══════════════════════════════════════
STEP 3: AUDITOR VERDICT
═══════════════════════════════════════
Verdict: PASS / REJECT
[Audit findings; corrected version inline if rejected]

═══════════════════════════════════════
STEP 4: DECORATE DIFF
═══════════════════════════════════════
[Decoration summary: +N tags, list of insertions]

═══════════════════════════════════════
STEP 5: PUBLISH
═══════════════════════════════════════
File: src/content/<category>/<slug>.mdx
URL:  /<category>/<slug>
Status: NEW / OVERWRITE
Frontmatter:
  title, category, date, temperature, footerType, latest, ...
```

After Step 5 the file is on disk. Cloudflare Pages auto-deploys on push to
`origin/main` (`git@github.com:supmanu/beef-im.git`). The skill itself does
**not** run git operations — commit + push manually or via the submodule save
protocol in `CLAUDE.md`.

---

## What This Skill Does NOT Do

- **No git commit / push.** User commits after reviewing the file.
- **No image upload to R2.** Reference assets by their `https://assets.beef.im/...`
  URL — uploads are a separate step.
- **No category creation.** The three categories are fixed in the content
  collection schema (`src/content.config.ts`). Adding a fourth requires a code
  change.
- **No HTML/Lexical conversion.** MDX is the source format end-to-end. Payload
  and Lexical are archived (`_archive/nextjs-legacy/`).
- **No skipping the auditor.** If you want a quick draft without compliance
  audit, use `/hybrid [topic] S` instead.

---

## Related

- `.claude/skills/architect/SKILL.md` — Step 1 standalone
- `.claude/skills/performer/SKILL.md` — Step 2 standalone
- `.claude/skills/auditor/SKILL.md` — Step 3 standalone
- `.claude/skills/decorate/SKILL.md` — Step 4 standalone (with diff preview)
- `.claude/skills/publish/SKILL.md` — Step 5 standalone
- `.claude/rules/paradox-architecture.md` — every article needs a Paradox
- `.claude/rules/content-compliance-boundaries.md` — health-finance scope rules
- `.claude/rules/thai-model-routing.md` — which model to use for which mode
- `docs/beef-im-visual-system.md` — notebook component vocabulary + when to use which
- `nerd/pillars/voice-dna.md` — voice + brand law (เน้นเนื้อๆ ไม่เอาน้ำ)
- `nerd/pillars/constitution.md` — banned terms, footer template
