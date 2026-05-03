# Content Pipeline Cheat Sheet

> **As of May 3, 2026** — beef.im is live on Cloudflare Pages, sourced from
> `src/content/*.mdx` in this repo. Pushing to `origin/main` (= `supmanu/beef-im`)
> auto-deploys. There is no Payload, no Vercel, no `--draft` flag.
>
> **Taxonomy (Phase-0 pivot, May 2):** three collections — `insurance`, `meat`,
> `note`. The pre-pivot `case` / `experiment` / `field-note` enum is gone.

---

## Setup (One Time)

```bash
# 1. Install Obsidian (already done if you were here pre-pivot)
sudo nixos-rebuild switch --flake ~/Melkor-OS/nixos#melkor

# 2. Open vault
obsidian → "Open folder as vault" → ~/Melkor-OS/departments/nerd-with-nart/nerd/

# 3. Install plugins
Settings → Community Plugins → Install "Dataview" → Enable

# 4. Configure Templates (Core plugin)
Settings → Core Plugins → Enable "Templates"
Settings → Templates:
  - Template folder location: seeds
  - Date format: YYYY-MM-DD
```

---

## Capture New Idea — Two Methods

### Method 1: CLI (Fastest — 10 seconds)

```
/seed เห็นโพสต์เรื่อง CI เคลมไม่ได้เพราะ waiting period 90 วัน
```

That's it. The skill auto-generates filename, date, and pillar.

### Method 2: Obsidian (Visual — 30 seconds)

```
1. Obsidian → seeds/ folder → Ctrl+N (new file)
2. Name: 2026-04-27-ci-waiting-period
3. Ctrl+P → "Insert template" → _template.md
4. created: field auto-fills with today's date
5. Fill in pillar, paste raw material below
6. Done. Fill in paradox/mode later.
```

**Pillar values:** `life-insurance` | `critical-illness` | `health-insurance` | `tax` | `savings` | `investment` | `estate` | `general`

---

## Status Flow

```
seed ──→ researching ──→ ready ──→ in-production ──→ published
                           ↓
                        killed
```

| Status | What To Do |
|--------|------------|
| `seed` | Just captured. No action needed yet. |
| `researching` | Find data anchors, link brochures, identify paradox. |
| `ready` | Has paradox + data. Change status and run pipeline. |
| `in-production` | Running through Architect → Performer → Auditor. |
| `published` | Add `published_date` and `article_slug`. |
| `killed` | Not pursuing. Keep for reference. |

---

## Produce an Article (v6.0 CLI-First)

```
# When a seed is ready:

1. Change frontmatter: status: in-production
2. Open terminal (Claude Code)
3. Run one of:

   /architect [topic] [mode]         ← blueprint only
   /performer [blueprint]            ← write from blueprint
   /auditor [article]                ← compliance check
   /produce-article [topic] [mode]   ← full pipeline (all 3 steps)
   /hybrid [topic] [mode]            ← one-shot (skip split)

4. If regulatory-sensitive: escalate audit to Gemini Gem #4
5. Save approved draft as nerd/output/drafts/<slug>.md with the publish frontmatter (below)
6. Promote to live site:

   /publish nerd/output/drafts/<slug>.md
   /publish nerd/output/drafts/<slug>.md --filename=custom-slug   (optional override)

   This writes src/content/<collection>/<filename>.mdx — no DB, no upload.

7. Commit + push to deploy:

   git add src/content/ && git commit -m "feat: publish <title>" && git push origin main

   Cloudflare Pages auto-deploys in ~30 seconds. URL: https://beef.im/<collection>/<filename>

8. Update seed frontmatter:
   status: published
   published_date: 2026-04-27
   article_slug: <filename>
```

---

## Publish Frontmatter (for /publish)

Add this block to the top of any approved draft before running `/publish`:

```yaml
---
title: "Unit-linked: กับดักค่าธรรมเนียม ที่ตัวแทนไม่บอก"
collection: insurance     # insurance | meat | note  ← drives folder + watermark
date: 2026-04-25
lede: "COI ปีที่ 30 = 128,400 บาท — exponential curve ที่หายไป"
---
```

**Required:** `title`, `collection`, `date`, `lede`.

**No `slug:` field.** Astro 6 derives the URL slug from the filename.
The skill picks the filename — pass `--filename=…` to override.

**No `footerType:` field.** Auto-derived from collection (`insurance`→📊,
`meat`→🔥, `note`→📝).

**No `category:` field.** That's the pre-pivot taxonomy — use `collection:`.

**Optional but useful:**
```yaml
format: "CASE FILE"      # free-form badge: CASE FILE / EXPERIMENT LOG / FIELD NOTE / RECIPE / บันทึก / omit
temperature: risk        # risk | medium | low — drives <TemperatureBar> colour
author: "ณัฐพล"          # default if omitted
readTime: "11 MIN"
wordCount: 2840
code: "AIA-UL"           # masthead ref code
sidenote: "..."          # margin post-it on homepage TOC
latest: true             # marks the LatestStamp (one article at a time)
```

**Collections → folder + watermark + URL:**
| `collection:` | Lives in | Watermark | URL prefix |
|---|---|---|---|
| `insurance` | `src/content/insurance/` | 📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im) | `/insurance/<slug>/` |
| `meat` | `src/content/meat/` | 🔥 คัดเนื้อโดย: ประกันเนื้อๆ (beef.im) | `/meat/<slug>/` |
| `note` | `src/content/note/` | 📝 บันทึกโดย: ประกันเนื้อๆ (beef.im) | `/note/<slug>/` |

**`format` is free-form** — author owns the editorial badge. Use whatever
fits the article: `CASE FILE`, `EXPERIMENT LOG`, `FIELD NOTE`, `RECIPE`,
`OBSERVATION`, `บันทึก`, or omit entirely. The collection determines URL +
watermark; the `format` badge is just the top-left label.

---

## Notebook Components (Use Inside .mdx Body)

No imports needed — all five are globally injected by the dynamic article route.
You can edit these by hand in any text editor — no AI required.

| Tag | Looks like | Use it when… |
|---|---|---|
| `<Highlight>คำสำคัญ</Highlight>` | Yellow inline highlight | The reader needs to lock onto a key phrase mid-sentence |
| `<MarginNote>คำอธิบายเสริม</MarginNote>` | Right-side post-it (navy italic) | You want to add a side comment without breaking the main flow |
| `<MarginNote position="left" caution>คำเตือน ⚠</MarginNote>` | Left-side red ⚠ caution note | A warning the reader must not miss |
| `<ScrapCard label="EXHIBIT A · COI SCHEDULE">…ตาราง…</ScrapCard>` | Tilted white-paper exhibit card with tape | Wraps a markdown table to make it look like a piece of evidence |
| `<CorrectionBlock strike="ความเชื่อผิด" fix="ความจริง" />` | Strikethrough belief + corrected truth (self-closing) | The Paradox reveal — myth vs. reality |
| `<VerdictSeal line1="ตรวจสอบ" line2="ก่อนเซ็น" />` | Red sealing-wax circle stamp (self-closing) | The article's verdict, usually at the end |

### Concrete example — plain → decorated

**Before** (plain Markdown):

```mdx
เวลาตัวแทนขาย Unit-linked สิ่งที่คุณเห็นคือกราฟผลตอบแทนสมมติ 7-8% ต่อปี
สิ่งที่คุณไม่เห็นคือค่าใช้จ่ายที่หักจากกองทุนทุกเดือน

| รายการ | มูลค่า |
|---|---|
| เบี้ยรายปี | ฿120,000 |
| COI ปีที่ 30 | ฿128,400 |
```

**After** (with toys):

```mdx
เวลาตัวแทนขาย Unit-linked สิ่งที่คุณเห็นคือกราฟผลตอบแทนสมมติ 7-8% ต่อปี
สิ่งที่คุณไม่เห็นคือ <Highlight>ค่าใช้จ่ายที่หักจากกองทุนทุกเดือน</Highlight>

<MarginNote>กับดักที่พบบ่อย — ตัวแทนมักบอกว่า "เบี้ยเท่าเดิม" ซึ่งจริงแค่ครึ่งเดียว</MarginNote>

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

Same article, totally different visual register. **Every tag is optional** — sprinkle only where they earn their place.

### Editing workflow when adding tags by hand

1. **Write the Thai prose first** in Obsidian, plain Markdown — focus on the words.
2. **Re-read and sprinkle tags** where they add visual punch:
   - One `<VerdictSeal>` at the end (mandatory for `insurance` and `meat` articles; skip for `note`)
   - One `<CorrectionBlock>` at the Paradox reveal point (your brand law: every article needs a Paradox)
   - 1–3 `<MarginNote>` for side commentary
   - 2–5 `<Highlight>` for key phrase emphasis
   - `<ScrapCard>` around any data table
3. **Preview locally** (optional) — `npm run dev`, then open `http://localhost:4321/<collection>/<filename>` to see how it looks before pushing.
4. **Push to deploy** — `git add src/content/ && git commit -m "..." && git push origin main`. Cloudflare Pages auto-deploys in ~30s.

### Three things to know

- **Tags are case-sensitive.** `<highlight>` won't work — capital `H`. Same for the others.
- **`<ScrapCard>` needs blank lines** above and below the markdown table inside it (MDX quirk — the parser needs to switch back into Markdown mode to render the table). The other tags don't need this.
- **Obsidian shows tags as plain text** — there's no live preview of how they'll render. The site is the preview. Use `npm run dev` for local, or just push and check beef.im.

### When to edit by hand vs use AI

**Edit by hand when:**
- The AI draft is 95% there and you just want to add one `<MarginNote>` or move a `<Highlight>`
- You're writing a short observational piece (a `note`, a cooking field-note in `meat`) and don't want to re-architect through `/architect → /performer`
- You're touching up live mockup articles before they're real
- You spot a typo or want to swap a `<Highlight>` for stronger emphasis

**Use AI (`/architect → /performer → /auditor`) when:**
- Long-form `insurance` articles (1500w+) — needs Paradox structure
- Anything regulatory-sensitive (auditor pass mandatory)
- A topic you haven't framed yet — you need a Blueprint first
- Bake-off testing across models (Qwen / Kimi / Sonnet)

**Use AI (`/decorate` skill) when:** you have a plain audited draft and want the toys auto-sprinkled. Wraps every table in `<ScrapCard>`, adds `<VerdictSeal>` at the end, promotes existing `**bold**` to `<Highlight>`, and proposes `<CorrectionBlock>` at the Paradox + 1–3 `<MarginNote>` candidates. **Always shows a diff preview before writing** — you stay in control. After it runs, you manually polish anything you don't like.

```
/decorate nerd/output/drafts/<slug>.md            # full pass with diff preview
/decorate src/content/insurance/<file>.mdx --light     # mechanical only (tables + VerdictSeal + bold→Highlight)
/decorate <file> --dry-run                         # show what it would do, don't write
```

**Use AI (`/publish` skill) when:** promoting any audited draft into the live `src/content/` collection. The skill handles filename derivation, frontmatter validation, content-compliance checks (drug names, Whole Life framing) — manually copying files skips all that.

**Typical full pipeline:**
```
/architect → /performer → /auditor → /decorate → /publish → git push
```

### Live examples to crib from

Open these in Obsidian via `_ops/published/` and copy-paste tag patterns:

| File | What to learn from it |
|---|---|
| `_ops/published/insurance/unit-linked-coi.mdx` | Uses all five components — full reference |
| `_ops/published/insurance/ci-rider-36-vs-108.mdx` | Long comparison structure with multiple `<ScrapCard>` tables |
| `_ops/published/meat/ribeye-reverse-sear.mdx` | `meat` watermark (🔥) + casual experiment-log register (try `format: "EXPERIMENT LOG"`) |
| `_ops/published/meat/moo-sam-chan-tod-nam-pla.mdx` | Short field-note-style decoration — minimal toys (try `format: "FIELD NOTE"`) |

---

## Check Pipeline

Open `dashboard.md` in Obsidian → see live tables:
- How many seeds in each status
- Which pillars have gaps
- What's ready for production

---

## Browse Operational Files (`_ops/` symlinks)

The `_ops/` folder in your vault links into the rest of the repo:

| Folder | What's Inside |
|--------|---------------|
| `_ops/published` | **Live `src/content/` — the .mdx files on beef.im right now** |
| `_ops/docs` | Production guides, deployment plan, brainstorm |
| `_ops/claude-rules` | Tactical patterns, project status |
| `_ops/claude-skills` | Skill definitions (architect, performer, publish, etc.) |
| `_ops/legacy` | `_archive/nextjs-legacy/` — old Payload site, frozen for reference |

---

## Frontmatter Quick Reference (Seed)

```yaml
---
type: seed
status: seed                    # seed|researching|ready|in-production|published|killed
pillar: critical-illness        # content category
paradox: "quote here"           # the core contradiction
source: "facebook URL or note"  # where you found it
brochure: "aia-multi-pay-ci"    # linked brochure file
archetype: uncomfortable-truth  # uncomfortable-truth|hidden-cost|simple-swap
mode: B                         # S|A|B|C
created: 2026-04-27             # auto-filled by template {{date}}
published_date:                 # fill after publishing
article_slug: ""                # filename of the .mdx in src/content/
---
```

---

## Key Files

| Open This | To Do This |
|-----------|------------|
| `seeds/_template.md` | Template with auto-date (insert via Ctrl+P) |
| `dashboard.md` | See pipeline status |
| `OBSIDIAN_GUIDE.md` | Full documentation |
| `pillars/master-index.md` | Content system architecture |
| `pillars/voice-dna.md` | Check brand voice |
| `pillars/constitution.md` | Brand laws (footer, banned terms) |
| `_ops/published/` | **Live MDX articles on beef.im — copy patterns from here** |
| `_ops/claude-skills/publish/SKILL.md` | `/publish` skill spec |

---

## Obsidian Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+N` | New file |
| `Ctrl+O` | Quick open |
| `Ctrl+P` | Command palette (insert template here) |
| `Ctrl+Shift+F` | Search all files |
| `Ctrl+G` | Graph view |
| `[[filename]]` | Link to another file |

---

## Content Compliance — Don't Ship These

Before `git push`, verify the draft has none of these:

- ❌ Specific drug names (Metformin, Glimepiride, Atorvastatin) — use "ยา" or drug class
- ❌ Dosage numbers — doctor's decision
- ❌ Diagnostic verdicts — frame as indicator, close with "ปรึกษาแพทย์"
- ❌ Whole Life framed as "bad investment" / IRR comparison — WL is wealth-transfer + protection, NOT investment. UL is the legitimate target for cost-of-insurance forensics.
- ❌ "เนิร์ดกับนาถ" anywhere — retired brand, use "ประกันเนื้อๆ (beef.im)"
- ⚠️ English terms not in Thai-First Handshake (Thai leads, English in parens)

Full rules: `_ops/claude-rules/content-compliance-boundaries.md`
