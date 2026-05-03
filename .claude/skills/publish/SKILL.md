# Skill: /publish

Promotes an audited Thai draft into the live Astro content collection as MDX.
No CMS, no DB, no Lexical conversion. One command → file written → `git push` →
Cloudflare Pages auto-deploys.

> **As-built note (May 3, 2026):** Stack is Astro 6.1.9 + Content Layer API + MDX.
> Schema lives at `src/content.config.ts` (repo-level inside `src/`, NOT inside `src/content/`).
> Three collections, all sharing the same schema: `insurance`, `meat`, `note`.
> Notebook components (`Highlight`, `MarginNote`, `ScrapCard`, `CorrectionBlock`,
> `VerdictSeal`) are **globally injected** by `src/pages/[...slug].astro` via
> `<Content components={mdxComponents} />` — `.mdx` files use them directly with **zero
> import statements**.
>
> **`footerType` is auto-derived from the collection folder by `[...slug].astro`**
> (`insurance`→📊 analysis, `meat`→🔥 beef, `note`→📝 note). Don't put `footerType`
> in frontmatter — it's ignored.

---

## Usage

```
/publish <path-to-draft.md>
/publish <path-to-draft.md> --filename=custom-slug
```

**Examples:**
```
/publish nerd/output/drafts/2026-04-21-no-insurance-5-traps-kimi2.6.md
/publish nerd/output/drafts/unit-linked-trap.md --filename=unit-linked-coi
```

The `--filename` flag overrides the derived slug. By default the skill derives a
filename from the draft's `title` field (Thai-romanised + lowercase + hyphens) or
from the source filename (stripping any leading `YYYY-MM-DD-` and `-modelname`
suffix).

---

## Required Frontmatter

The draft must start with this block. Anything missing → stop and ask the user.

```yaml
---
title: "Unit-linked: กับดักค่าธรรมเนียม ที่ตัวแทนไม่บอก"
collection: insurance     # insurance | meat | note  ← drives target folder
date: 2026-04-25
lede: "COI ปีที่ 30 = 128,400 บาท — exponential curve ที่หายไปจาก presentation ทุกครั้ง"
---
```

> **No `slug:` field.** Astro 6 derives the slug from the filename via `entry.id`.
> The file is written to `src/content/<collection>/<filename>.mdx` and the live URL is
> `/<collection>/<filename>`. The skill picks the filename — don't pass slug in
> frontmatter, it'll be silently ignored.
>
> **No `footerType:` field.** Auto-derived from the collection folder.
>
> **No `category:` field.** That was the pre-pivot taxonomy (`case`/`experiment`/
> `field-note`). Use `collection:` instead.

**Optional but encouraged:**

```yaml
format: "CASE FILE"        # free-form badge label, top-left of article
temperature: risk          # risk | medium | low — drives <TemperatureBar> colour
author: "ณัฐพล"             # default if omitted
readTime: "11 MIN"
wordCount: 2840
code: "AIA-UL"             # short ref code shown in masthead
sidenote: "ตัวอย่าง AIA Multi-Pay CI ปี 2024 — COI เพิ่ม 8% ต่อปีหลังอายุ 50"
latest: true               # marks the LatestStamp on the homepage TOC
```

**`format` is free-form.** Author owns the label — no fixed enum. Examples:
`CASE FILE`, `EXPERIMENT LOG`, `FIELD NOTE`, `RECIPE`, `OBSERVATION`, `บันทึก`,
or omit entirely. The collection determines the URL prefix and watermark; the
`format` badge is editorial dressing.

**Field reference:**

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Full Thai article title |
| `collection` | Yes | `insurance` / `meat` / `note` — drives target folder + watermark |
| `date` | Yes | `YYYY-MM-DD` |
| `lede` | Yes | 1–2 sentences shown on the homepage TOC entry |
| `format` | No | Free-form badge label rendered top-left of article |
| `temperature` | No | `risk` / `medium` / `low` |
| `author` | No | Defaults to "ณัฐพล" |
| `readTime` | No | Display only, e.g. `"11 MIN"` |
| `wordCount` | No | Display only, integer |
| `code` | No | Short ref code rendered next to the masthead |
| `sidenote` | No | Margin note string for the TOC entry on the homepage |
| `latest` | No | Boolean — only one article should carry `latest: true` at a time |

---

## What I Will Do When You Run /publish

1. Read the file path from your command.
2. Parse the YAML frontmatter; verify every required field is present.
3. Resolve the target folder from `collection`:
   - `insurance` → `src/content/insurance/<filename>.mdx`
   - `meat` → `src/content/meat/<filename>.mdx`
   - `note` → `src/content/note/<filename>.mdx`
4. Resolve the filename: `--filename` flag if given, else derived from `title` or
   the source filename (strip `YYYY-MM-DD-` prefix and any `-modelname` suffix
   like `-kimi2.6`, `-glm5.1`, `-qwen3.6`). Filename must match `^[a-z0-9-]+$`.
5. If the target file already exists → confirm with the user before overwriting.
6. Run draft hygiene checks (see below).
7. **Strip dead frontmatter fields** if found: `category:`, `footerType:` (with a
   one-line warning to the user — these were valid in the pre-pivot taxonomy).
8. Write the assembled `.mdx` file (frontmatter + blank line + body, **no
   imports**) using the Write tool.
9. Report: target path, collection, filename-derived slug, predicted URL
   (`/<collection>/<filename>`), and a one-line diff summary (NEW / OVERWRITE).

---

## File Layout the Skill Produces

```mdx
---
title: "Unit-linked: กับดักค่าธรรมเนียม ที่ตัวแทนไม่บอกคุณ"
collection: insurance
date: 2026-04-25
lede: "COI ปีที่ 30 = 128,400 บาท — exponential curve ที่หายไป"
format: "CASE FILE"
temperature: risk
code: "AIA-UL"
wordCount: 2840
readTime: "11 MIN"
author: "ณัฐพล"
sidenote: "ตัวอย่าง AIA Multi-Pay CI ปี 2024"
latest: true
---

เวลาตัวแทนขาย Unit-linked สิ่งที่คุณเห็นคือกราฟผลตอบแทน...

<MarginNote>กับดักที่พบบ่อยที่สุด — ตัวแทนมักบอกว่า "เบี้ยเท่าเดิม"</MarginNote>

<ScrapCard label="EXHIBIT A · AIA-UL COI SCHEDULE">

| รายการ | มูลค่า |
|---|---|
| เบี้ยรายปี | ฿120,000 |
| COI ปีที่ 30 | ฿128,400 |

</ScrapCard>

<CorrectionBlock
  strike='ความเชื่อผิด: "Unit-linked ดีกว่า Term เพราะเอาเงินคืนได้"'
  fix="ความจริง: เงินที่คุณ 'ได้คืน' คือเงินที่คุณจ่ายเข้าไป — ลบด้วยค่าธรรมเนียม"
/>

<VerdictSeal line1="ตรวจสอบ" line2="ก่อนเซ็น" />
```

**No `import …` lines.** All five components (`Highlight`, `MarginNote`,
`ScrapCard`, `CorrectionBlock`, `VerdictSeal`) are globally injected by
`src/pages/[...slug].astro` and resolve automatically inside any `.mdx` file in
the three content collections.

---

## Available Notebook Components

Drop these into the body anywhere — they render as designed in
`docs/brainstorm/New UIUX/Prototype-Definitive-v1.html`:

| Component | Use | Example |
|---|---|---|
| `<Highlight>…</Highlight>` | Yellow inline highlight | `<Highlight>ค่าใช้จ่ายรายเดือน</Highlight>` |
| `<MarginNote>…</MarginNote>` | Right-side post-it (default) | `<MarginNote>กับดักที่พบบ่อย</MarginNote>` |
| `<MarginNote position="left" caution>…</MarginNote>` | Left-side red ⚠ caution note | warns the reader |
| `<ScrapCard label="…">…</ScrapCard>` | Tilted white paper exhibit (great for tables) | wraps a markdown table |
| `<CorrectionBlock strike="…" fix="…" />` | Strikethrough belief + corrected truth | self-closing |
| `<VerdictSeal line1="…" line2="…" />` | Red sealing-wax circle stamp | self-closing |

---

## Draft Hygiene Checks (Pre-flight)

Before writing the file, the skill confirms:

- [ ] Frontmatter parses (no YAML syntax errors)
- [ ] All required fields present (`title`, `collection`, `date`, `lede`)
- [ ] `collection` is one of `insurance` / `meat` / `note`
- [ ] If `temperature` is set, it's one of `risk` / `medium` / `low`
- [ ] Resolved filename matches `^[a-z0-9-]+$`
- [ ] Body contains **no specific drug names** (`Metformin`, `Glimepiride`,
  `Atorvastatin`, …) — see
  [`.claude/rules/content-compliance-boundaries.md`](../../rules/content-compliance-boundaries.md).
  If detected, surface to user before writing.
- [ ] Body does **not** frame Whole Life as an investment / IRR comparison —
  see `memory/feedback_whole_life_framing.md`. Whole Life = wealth-transfer +
  protection. Unit-linked is the legitimate target for cost-of-insurance
  forensics. If the draft frames WL as a "bad investment", stop and surface
  to the user — this is the canonical LLM hallucination.
- [ ] Every English term in the body follows Thai-First Handshake (Thai leads,
  English in parens) — soft warning, not a block.
- [ ] No legacy `category:` or `footerType:` fields (warn + strip if present).

If any block-level check fails, stop and surface to the user. Do not write a
half-broken MDX file into the live content collection.

---

## What This Skill Does NOT Do

- **No git operations.** The skill writes the file. The user (or a separate
  `/save` step) commits and pushes. Cloudflare Pages handles deploy on push to
  `origin/main` (= `git@github.com:supmanu/beef-im.git`).
- **No image upload.** R2 uploads are handled separately. Reference images via
  their `https://assets.beef.im/...` URL in the markdown body.
- **No HTML/Lexical conversion.** MDX is the source format end-to-end.
- **No collection creation.** The three collections are fixed: `insurance`,
  `meat`, `note`. Adding a fourth requires a content collection schema change
  in `src/content.config.ts`.
- **No import injection.** Components are globally injected by the dynamic
  route. Don't write `import` lines.

---

## Troubleshooting

**"Filename already exists in this collection"** → Use `--filename=...` to
override, or delete the existing file first if you really mean to replace it.

**"Component used but doesn't render in the live preview"** → Check that the
component name is one of the five listed above (case-sensitive). If you need a
new component, it has to be added to `src/components/mdx/` AND registered in the
`mdxComponents` object in `src/pages/[...slug].astro` first — that's a code
change, not a content change.

**"No frontmatter found"** → File must start with `---` on line 1. No blank
lines, no BOM, no Obsidian properties block.

**"Legacy `category:` or `footerType:` field detected"** → The pre-pivot
taxonomy (`case`/`experiment`/`field-note` + `analysis`/`cooking`) is gone.
Replace `category:` with `collection: insurance|meat|note` and remove
`footerType:` entirely (it's auto-derived from the collection now).

**Drug name flagged** → Strip the specific drug, swap for "ยา" or the drug
class, re-run.

**Whole Life "bad investment" framing flagged** → Reframe around wealth
transfer / tax-free death benefit / lifetime protection, OR redirect the
critical energy to Unit-linked (where it belongs).

---

## Related

- [`.claude/rules/content-compliance-boundaries.md`](../../rules/content-compliance-boundaries.md) — what to strip from health drafts
- [`.claude/rules/paradox-architecture.md`](../../rules/paradox-architecture.md) — every article needs a Paradox before it gets here
- `memory/feedback_whole_life_framing.md` — Whole Life positioning rule
- [`docs/brainstorm/IMPLEMENTATION-PLAN-FINAL-opus47.md`](../../../docs/brainstorm/IMPLEMENTATION-PLAN-FINAL-opus47.md) §3 — schema canonical source
- [`src/content.config.ts`](../../../src/content.config.ts) — Zod schema this skill writes against
- [`src/pages/[...slug].astro`](../../../src/pages/[...slug].astro) — global MDX component injection + footerType derivation
