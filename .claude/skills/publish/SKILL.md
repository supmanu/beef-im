# Skill: /publish

Promotes an audited Thai draft into the live Astro content collection as MDX.
No CMS, no DB, no Lexical conversion. One command → file written → git takes over.

> **Pivot note (Apr 26, 2026):** The legacy version of this skill upserted into Payload via
> the Local API. After the Astro/MDX pivot, the source of truth is `src/content/` on disk.
> Publishing = writing a properly-shaped `.mdx` file to the right folder. Deploy is a separate
> `git push` step (handled out-of-band by Cloudflare Pages once that's wired).

---

## Usage

```
/publish <path-to-draft.md>
/publish <path-to-draft.md> --slug=custom-slug
```

**Examples:**
```
/publish nerd/output/drafts/2026-04-21-no-insurance-5-traps-kimi2.6.md
/publish nerd/output/drafts/unit-linked-trap.md --slug=unit-linked
```

---

## Required Frontmatter

The draft must start with this block. Anything missing → stop and ask the user.

```yaml
---
title: "Unit-linked: กับดักค่าธรรมเนียม ที่ตัวแทนไม่บอก"
category: case            # case | experiment | field-note
slug: "unit-linked-trap"
date: 2026-04-25
lede: "COI ปีที่ 30 = 128,400 บาท — exponential curve ที่หายไปจาก presentation ทุกครั้ง"
temperature: risk         # risk | medium | low
footerType: analysis      # analysis | cooking
---
```

**Optional but encouraged:**

```yaml
author: "ณัฐพล"            # default if omitted
readTime: "11 MIN"
wordCount: 2840
code: "AIA-UL"            # short ref code shown in masthead
sidenote: "ตัวอย่าง AIA Multi-Pay CI ปี 2024 — COI เพิ่ม 8% ต่อปีหลังอายุ 50"
latest: true              # marks the LatestStamp on the homepage TOC
---
```

**Field reference:**

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Full Thai article title |
| `category` | Yes | `case` / `experiment` / `field-note` — drives target folder |
| `slug` | Yes | URL slug, lowercase + hyphens, unique within category |
| `date` | Yes | `YYYY-MM-DD` |
| `lede` | Yes | 1–2 sentences shown on the homepage TOC entry |
| `temperature` | Yes | `risk` / `medium` / `low` — drives the `<TemperatureBar>` colour |
| `footerType` | Yes | `analysis` (📊 บทวิเคราะห์โดย: ประกันเนื้อๆ) / `cooking` (🔥 คัดเนื้อโดย: ประกันเนื้อๆ) |
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
3. Resolve the target folder from `category`:
   - `case` → `src/content/case/<slug>.mdx`
   - `experiment` → `src/content/experiment/<slug>.mdx`
   - `field-note` → `src/content/field-note/<slug>.mdx`
4. If the target file already exists → confirm with the user before overwriting.
5. Scan the body for usage of any of the five MDX components below and **inject only the
   imports that are actually referenced** (no unused imports — keeps the file lean):
   - `<MarginNote …>` → `import MarginNote from '../../components/mdx/MarginNote.astro';`
   - `<ScrapCard …>` → `import ScrapCard from '../../components/mdx/ScrapCard.astro';`
   - `<CorrectionBlock …>` → `import CorrectionBlock from '../../components/mdx/CorrectionBlock.astro';`
   - `<VerdictSeal …>` → `import VerdictSeal from '../../components/mdx/VerdictSeal.astro';`
   - `<Highlight>…</Highlight>` → `import Highlight from '../../components/mdx/Highlight.astro';`
6. Write the assembled `.mdx` file (frontmatter, blank line, imports, blank line, body) using
   the Write tool.
7. Report: target path, slug, category, predicted URL (`/<category>/<slug>`), and a one-line
   diff summary (NEW / OVERWRITE).

---

## File Layout the Skill Produces

```mdx
---
title: "..."
category: case
slug: "unit-linked-trap"
date: 2026-04-25
lede: "..."
temperature: risk
footerType: analysis
author: "ณัฐพล"
readTime: "11 MIN"
wordCount: 2840
code: "AIA-UL"
sidenote: "..."
latest: true
---
import MarginNote from '../../components/mdx/MarginNote.astro';
import ScrapCard from '../../components/mdx/ScrapCard.astro';
import Highlight from '../../components/mdx/Highlight.astro';

…article body in Thai markdown, with <MarginNote>, <ScrapCard>, <Highlight> etc. inline…
```

---

## Draft Hygiene Checks (Pre-flight)

Before writing the file, the skill confirms:

- [ ] Frontmatter parses (no YAML syntax errors)
- [ ] All required fields present
- [ ] `category` is one of the three allowed values
- [ ] `temperature` is one of `risk` / `medium` / `low`
- [ ] `footerType` is one of `analysis` / `cooking`
- [ ] `slug` is `^[a-z0-9-]+$`
- [ ] No specific drug names in body (`Metformin`, `Glimepiride`, `Atorvastatin`, …) — see
  `.claude/rules/content-compliance-boundaries.md`. If detected, surface to user before writing.
- [ ] Every English term in the body follows Thai-First Handshake (Thai leads, English in
  parens) — soft warning, not a block.

If any block-level check fails, stop and surface to the user. Do not write a half-broken MDX
file into the content collection.

---

## What This Skill Does NOT Do

- **No git operations.** The skill writes the file. The user (or a separate `/save` step)
  commits and pushes. Cloudflare Pages handles deploy on push.
- **No image upload.** R2 uploads are handled separately. Reference images via their
  `https://assets.beef.im/...` URL in the markdown body.
- **No HTML/Lexical conversion.** MDX is the source format end-to-end.
- **No category creation.** The three categories are fixed: `case`, `experiment`,
  `field-note`. Adding a fourth requires a content collection schema change.

---

## Troubleshooting

**"Slug already exists in this category"** → Use `--slug=...` to override, or rename in the
frontmatter, or delete the existing file first if you really mean to replace it.

**"Component imported but src/components/mdx/X.astro does not exist"** → Phases 3–6 of the
Astro scaffold haven't landed all five components yet. Verify which exist with
`ls src/components/mdx/` and ask the user before forcing the import.

**"No frontmatter found"** → File must start with `---` on line 1. No blank lines, no BOM,
no Obsidian properties block.

**Drug name flagged** → Strip the specific drug, swap for "ยา" or the drug class, re-run.

---

## Related

- [.claude/rules/content-compliance-boundaries.md](../../rules/content-compliance-boundaries.md) — what to strip from health drafts
- [.claude/rules/paradox-architecture.md](../../rules/paradox-architecture.md) — every article needs a Paradox before it gets here
- [docs/beef-im-astro-deployment-plan.md](../../../docs/beef-im-astro-deployment-plan.md) — full Astro pivot plan
- [docs/brainstorm/New UIUX/PRODUCTION-NOTES.md](../../../docs/brainstorm/New%20UIUX/PRODUCTION-NOTES.md) — MDX article example, component contract
