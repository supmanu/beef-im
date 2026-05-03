# Skill: /decorate

Adds notebook components (`<Highlight>`, `<MarginNote>`, `<ScrapCard>`,
`<CorrectionBlock>`, `<VerdictSeal>`) to a Markdown draft or live MDX article.
Runs a **mechanical pass** (always safe — wraps tables, ends with verdict seal,
upgrades bold) and a **semantic pass** (proposes Paradox/aside/highlight tags
based on article content). Always shows a diff preview before writing. You can
manually edit the result afterwards.

> **Pairs with `/publish`.** Run `/decorate` on an audited draft, then `/publish`
> it. Or run `/decorate` directly on a live `src/content/<collection>/<file>.mdx`
> to add toys to an existing article. Same logic, same diff preview.

---

## Usage

```
/decorate <path-to-file>                 # full pass (mechanical + semantic)
/decorate <path-to-file> --light         # mechanical only (tables + verdict seal + bold→highlight)
/decorate <path-to-file> --semantic-only # skip mechanical, just propose semantic tags
/decorate <path-to-file> --dry-run       # show diff, don't write
```

**Examples:**
```
/decorate nerd/output/drafts/unit-linked-trap.md
/decorate src/content/insurance/unit-linked-coi.mdx --light
/decorate src/content/meat/moo-sam-chan-tod-nam-pla.mdx --dry-run
```

---

## What I Will Do When You Run /decorate

1. **Read the file** and parse the YAML frontmatter (need `collection` for VerdictSeal defaults — use the frontmatter field if present, else infer from file path under `src/content/<collection>/`).
2. **Skip if already decorated** — if the file already has `<VerdictSeal`, `<CorrectionBlock`, or 3+ other tags, run in `--light` mode by default and ask before adding more.
3. **Run the passes** (see below) — produce a candidate decorated body.
4. **Show a unified diff** of every change with a one-line rationale per change.
5. **Confirm** before writing (skip with `--auto`, but only if you really trust it).
6. **Write the file** in place. No backup file — git is the backup.
7. **Report**: count of each tag added, file path, whether the live URL needs a `git push` (if path is under `src/content/`).

---

## Pass 1 — Mechanical (always safe, deterministic)

These changes never need a judgment call. They run in `--light` mode too.

### A. Wrap markdown tables in `<ScrapCard>`

For every standalone markdown table (lines starting with `|` followed by `|---|`):

- Wrap with `<ScrapCard label="EXHIBIT N · DERIVED LABEL">` and `</ScrapCard>`
- **Required blank lines** above and below the table inside the card (MDX parser quirk)
- **Label derivation:**
  - If an H3/H4 (`### …`) sits immediately above the table → use that heading uppercased, prefix with `EXHIBIT N · `
  - Else → `EXHIBIT N · ตาราง` (numbered sequentially)
- Skip if the table is already inside a `<ScrapCard>`

### B. Add `<VerdictSeal>` if missing

If the article's `collection` is `insurance` or `meat` AND there is no `<VerdictSeal` anywhere in the file:

- Append at the end of the body (after a blank line)
- Default text by collection:
  - `insurance` → `<VerdictSeal line1="ตรวจสอบ" line2="ก่อนเซ็น" />`
  - `meat` → `<VerdictSeal line1="ทดลอง" line2="ก่อนเชื่อ" />`
- Prompt the user to override the default lines (one input, two short Thai phrases)

`note` articles **do not** get an auto-VerdictSeal — they're observational/personal, not adjudicating. Same rule for `meat` articles tagged `format: "FIELD NOTE"` or `format: "OBSERVATION"` — skip the auto-seal but warn the user one paragraph above the end if they want to add one manually.

### C. Promote `**bold Thai phrases**` to `<Highlight>`

For every `**…**` markdown bold:

- If the content is **purely Thai** (no Latin letters except a single English handshake in parens) → convert to `<Highlight>…</Highlight>`
- Else → leave as `**…**` (preserves Markdown emphasis for English handshake terms like `**Paradox**` which already follow the Thai-First rule)

This converts existing emphasis hints from the Performer/AI draft into rendered highlights without semantic reasoning.

---

## Pass 2 — Semantic (skipped in `--light` mode)

These need judgment. I propose, you approve via the diff preview.

### D. Find the Paradox → `<CorrectionBlock>`

Look for the article's **belief vs reality** pivot. Patterns to detect:

- "ความเชื่อ X … ความจริง Y"
- "เห็น X … ไม่เห็น Y"
- "ตัวแทนบอกว่า X … แต่จริง ๆ Y"
- "หลายคนคิดว่า X … แต่ความจริงคือ Y"
- Rhetorical inversion: "ถูกที่สุด … กลับแพงที่สุด"

When found, propose:
```mdx
<CorrectionBlock
  strike='<the belief sentence>'
  fix="<the reality sentence>"
/>
```

Place it at the natural reveal point — usually one beat after the table or data anchor that proves the inversion. **Maximum one `<CorrectionBlock>` per article** — it's the Paradox, by definition singular.

If the article has **no detectable Paradox**, flag it: this likely means the article violates the brand's Paradox Architecture rule (`.claude/rules/paradox-architecture.md`) and should go back through `/architect` rather than just being decorated.

### E. Propose `<MarginNote>` candidates (1–3 per article)

Look for sentences that are:

- **Parenthetical asides** that interrupt main flow — e.g. "(ในความเป็นจริงตัวเลขนี้สูงกว่า 8% ในกรุงเทพฯ)"
- **Expert tips** — "หมายเหตุ:", "เคล็ดลับ:", "ข้อสังเกต"
- **Trap warnings** — "ระวัง", "ข้อควรระวัง", "ตัวแทนมักไม่บอก"

When found:
- Default → `<MarginNote>…</MarginNote>` (right-side post-it)
- If the sentence contains warning words (ระวัง, อันตราย, ห้าม, ⚠) → `<MarginNote position="left" caution>…</MarginNote>`

Cap at 3 per article — they're sprinkles, not the main course. If more than 3 candidates surface, propose the strongest 3 and list the rest as "consider also".

### F. Propose `<Highlight>` for key phrases (2–5 per article, on top of any bold→highlight conversions)

Targets:

- **Numerical anchors** — `฿128,400`, `30%`, `ปีที่ 30`, `อายุ 65`
- **Brand-defining phrases** — the one sentence that captures the article's edge
- **Counterintuitive verbs** — "หาย", "ทบ", "กระโดด" applied to numbers

Skip if the phrase is inside a table, code block, or already inside another tag.

Cap at 5 per article. Highlight inflation kills the highlight.

---

## Diff Preview Format

Before writing, the skill shows:

```
=== /decorate proposed changes for src/content/insurance/unit-linked-coi.mdx ===

[Mechanical] +1 ScrapCard wrap (around table at line 22, label derived from heading "AIA-UL COI SCHEDULE")
[Mechanical] +1 VerdictSeal at end (default: ตรวจสอบ / ก่อนเซ็น — type new lines or press Enter to accept)
[Mechanical] +3 Highlight (from existing **bold** at lines 14, 18, 31)

[Semantic] +1 CorrectionBlock at line 38 (Paradox detected: "ความเชื่อผิด: Unit-linked ดีกว่า Term…" / "ความจริง: เงินที่คุณได้คืน…")
[Semantic] +2 MarginNote
  - Line 17 (right): "กับดักที่พบบ่อย — ตัวแทนมักบอกว่า เบี้ยเท่าเดิม…"
  - Line 44 (left, caution): "ระวัง — สัญญานี้ยกเลิกไม่ได้หลังปีที่ 5"
[Semantic] +1 Highlight at line 27: "128,400 บาทต่อปี" (numerical anchor)

[Skipped]
- Line 8 bold ("เงินที่คุณได้คืน") — already inside CorrectionBlock proposal
- Line 52 candidate MarginNote ("ในกรุงเทพฯ ตัวเลขสูงกว่า") — capped at 3 per article

Total: +9 tags. Apply? [y/N/edit]
```

`y` → write the file.
`N` → exit without writing.
`edit` → drop into per-tag confirmation (skip individual tags by number).

---

## What This Skill Does NOT Do

- **No git operations.** It writes the file. You commit + push.
- **No frontmatter changes.** Decoration is body-only.
- **No content rewriting.** It wraps and tags existing prose. It never changes the words you wrote, only adds component boundaries around them. (Exception: `**bold**` → `<Highlight>` is a syntactic conversion of existing markup, not a content change.)
- **No new headings, no new paragraphs.** If a passage is missing structure, that's an `/architect` or `/performer` problem.
- **No image insertion, no calculator embeds, no React island wrapping.** Notebook components only.
- **No ScrapCard wrapping inside CorrectionBlock or VerdictSeal.** They're peers, not nested.

---

## Pre-flight Checks

Before running either pass, verify:

- [ ] File exists and is readable
- [ ] Frontmatter parses; resolve `collection` from frontmatter or file path. Must be one of `insurance`/`meat`/`note` (else: skip the VerdictSeal step, warn user)
- [ ] File is `.md` or `.mdx` (else: refuse — this skill is MDX-aware only)
- [ ] No `<` characters that look like broken/half-typed component tags (e.g. `< Highlight`, `<MarginNote `) — flag for manual fix first

---

## Heuristics for Sensible Defaults

When in doubt:

- **Better to under-decorate than over-decorate.** A clean article with 2 `<Highlight>` + 1 `<VerdictSeal>` reads better than one with 8 `<Highlight>` and 5 `<MarginNote>` competing for attention.
- **Numerical anchors > rhetorical phrases** for `<Highlight>`. Concrete data is what readers remember.
- **Paradox is mandatory in `insurance` articles, optional in `note`, encouraged in `meat`.** If the article has no paradox AND it's `insurance`, decorate but warn the user that the structural problem is upstream.
- **`meat` articles** get a lighter hand: skip `<CorrectionBlock>` unless the prose explicitly inverts a cooking belief, skip caution MarginNote unless there's a real safety issue (raw chicken temps, undercooked pork, etc.).
- **`note` articles** are author-personal and unmoderated. Run mechanical only by default; semantic pass is opt-in via `--semantic-only` or full `/decorate <file>`. Don't propose `<CorrectionBlock>` — the FUCK-IT pillar isn't structured around a Paradox by design.

---

## Troubleshooting

**"No Paradox detected"** → Article may be informational rather than insight. Either rewrite the angle, or accept that decoration alone won't fix the structure. Run `/architect` to rebuild.

**"ScrapCard wrap broke the table"** → Check that there are blank lines above AND below the table inside the card. The skill enforces this, but if you edited manually after, the parser will silently render the table as plain text.

**"All my Highlights got skipped"** → They were either inside another tag, in a code block, or English-in-handshake (which the skill preserves as bold). Use `--full` to bypass the bold-skip rule.

**"VerdictSeal text feels wrong"** → The default is generic. Override on the prompt, or edit manually after — the lines are 2–4 Thai syllables each, no special syntax.

---

## Related

- [`.claude/skills/publish/SKILL.md`](../publish/SKILL.md) — the next step after decorating
- [`.claude/rules/paradox-architecture.md`](../../rules/paradox-architecture.md) — why `<CorrectionBlock>` is mandatory at the Paradox reveal
- [`.claude/rules/content-compliance-boundaries.md`](../../rules/content-compliance-boundaries.md) — decoration doesn't bypass the drug-name / Whole Life rules; if those flag, fix the prose first
- `nerd/CHEATSHEET.md` §"Notebook Components" — manual reference for the same five tags
- Live examples: `nerd/_ops/published/insurance/unit-linked-coi.mdx` (uses all five — good calibration target for the semantic pass)
