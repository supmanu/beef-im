# Content Pipeline Cheat Sheet

---

## Setup (One Time)

```bash
# 1. Install Obsidian
sudo nixos-rebuild switch --flake ~/Melkor-OS/nixos#melkor

# 2. Open vault
obsidian → "Open folder as vault" → ~/Melkor-OS/departments/nerd-with-nart/nerd/

# 3. Install plugins
Settings → Community Plugins → Install "Dataview" → Enable
```

---

## Capture New Idea (30 Seconds)

```
1. Obsidian → seeds/ folder → New file
2. Name: 2026-03-24-short-topic.md
3. Paste this at the top:
```

```yaml
---
type: seed
status: seed
pillar:
created: 2026-03-24
---
```

```
4. Paste raw material below
5. Done. Fill in paradox/mode later.
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

## Produce an Article

```
# When a seed is ready:

1. Change frontmatter: status: in-production
2. Open terminal (Claude Code)
3. Run one of:

   /architect [topic]              ← blueprint only
   /produce-article [topic]        ← full pipeline (architect → performer → auditor)

4. After publishing:
   status: published
   published_date: 2026-04-01
   article_slug: premium-holiday-trap
```

---

## Check Pipeline

Open `dashboard.md` in Obsidian → see live tables:
- How many seeds in each status
- Which pillars have gaps
- What's ready for production

---

## Quick Wins Right Now

**3 articles ready to publish (in content-catalog.md):**

| Article | File |
|---------|------|
| กับดัก "พักเบี้ย" | `content/articles/premium-holiday-trap.md` |
| 2083: ปีที่ประกันภัยไทยตาย | `content/articles/insurance-extinction-2083.md` |
| ศึกเชิงโครงสร้าง | `content/test-articles/structure-war-final.md` |

**3 unused blueprints → feed to `/produce-article`:**

| Blueprint | File |
|-----------|------|
| เบาหวานกับประกัน | `input/diabetes-blueprint.txt` |
| วิกฤตประกันวัยเกษียณ | `input/senior-crisis-blueprint.txt` |
| Multi-Pay ปะทะ ProCare | `input/aia-war-blueprint.txt` |

---

## Frontmatter Quick Reference

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
created: 2026-03-24
published_date:                 # fill after publishing
article_slug: ""                # URL slug
---
```

---

## Key Files

| Open This | To Do This |
|-----------|------------|
| `seeds/_template.md` | Copy for new seed |
| `dashboard.md` | See pipeline status |
| `content-catalog.md` | Find existing content |
| `OBSIDIAN_GUIDE.md` | Full documentation |
| `pillars/voice-dna.md` | Check brand voice |
| `pillars/content-engine.md` | Check article modes |

---

## Obsidian Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+N` | New file |
| `Ctrl+O` | Quick open |
| `Ctrl+Shift+F` | Search all files |
| `Ctrl+G` | Graph view |
| `[[filename]]` | Link to another file |
