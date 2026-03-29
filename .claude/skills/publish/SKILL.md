# Skill: /publish

Publishes a markdown article file to Payload CMS via the Local API.
No copy-pasting, no manual admin UI entry. One command → live article.

---

## Usage

```
/publish <path-to-article.md>
/publish <path-to-article.md> --draft
```

**Examples:**
```
/publish nerd/output/term-insurance-paradox.md
/publish nerd/output/term-insurance-paradox.md --draft
```

---

## Required Frontmatter

Every article must start with this block:

```yaml
---
title: "ทำไมประกันชีวิตแบบ Term ถึงดีกว่าที่คุณคิด"
slug: "term-insurance-paradox"
category: health
publishedDate: 2026-03-29
excerpt: "ประโยคสรุปสั้น ๆ ที่ดึงดูดผู้อ่าน ไม่เกิน 250 ตัวอักษร"
coverImage: https://assets.nerdwithnart.com/nwn-assets/og-background.jpg
---
```

**Field reference:**

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Full article title |
| `slug` | Yes | URL slug — lowercase, hyphens, unique |
| `category` | Yes | Slug: `health`, `wealth`, `legacy`, `perspective` — or array: `[health, wealth]` |
| `publishedDate` | Yes | Format: `YYYY-MM-DD` |
| `excerpt` | No | Short description shown in article cards |
| `coverImage` | Yes* | Full R2 URL — script finds or creates media record |
| `coverImageId` | Yes* | Payload media ID — use instead of coverImage if known |
| `status` | No | `published` (default) or `draft` |

*One of `coverImage` or `coverImageId` is required.

---

## What I Will Do When You Run /publish

1. Read the file path from your command
2. Check that the required frontmatter fields are present
3. Run the publish script:

```bash
npx tsx scripts/publish-article.ts <path> [--draft]
```

4. Report the result: article ID, slug, status, URL

---

## What the Script Does Internally

```
Read .md file
    ↓
Parse frontmatter (title, slug, category, date, cover, excerpt)
    ↓
Initialize Payload Local API (direct DB, no HTTP needed)
    ↓
Resolve category slugs → Payload category IDs
    ↓
Resolve coverImage URL → find or create Payload media record
    ↓
Convert markdown body → Lexical JSON (tables, code, blockquotes, lists, bold, italic, links)
    ↓
Upsert article (create if new, update if slug exists)
    ↓
Set _status: published | draft
    ↓
Done ✅
```

---

## Article Output Convention

When Claude Code Skills produce an article, the output file should follow this structure:

```
nerd/output/[slug].md
```

The `produce-article` skill outputs clean Thai markdown. Add the frontmatter block at the top before running `/publish`. The body below the frontmatter is standard markdown — headings, tables, blockquotes, code blocks all convert automatically.

---

## Draft → Published Workflow

```bash
# Save as draft first (review in Payload admin)
/publish nerd/output/my-article.md --draft

# When happy, publish it
/publish nerd/output/my-article.md
```

The script detects existing articles by slug and updates them in place.

---

## Troubleshooting

**"Category not found"** → Run `npx tsx scripts/seed-categories.ts` to seed categories first.

**"No frontmatter found"** → File must start with `---` block. No blank lines before it.

**"Cannot read file"** → Check the path. Run from the project root (`/home/supmanu/Melkor-OS/departments/nerd-with-nart`).

**Cover image issues** → Use `coverImageId: <number>` for a known Payload media record. Find IDs in Payload admin at `/admin/collections/media`.
