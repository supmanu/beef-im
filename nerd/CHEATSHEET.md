# Content Pipeline Cheat Sheet

---

## Setup (One Time)

```bash
# 1. Install Obsidian (already done)
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
2. Name: 2026-03-25-ci-waiting-period
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
5. After publishing:
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

## Browse Operational Files

The `_ops/` folder in your vault contains symlinks to project files outside `nerd/`:

| Folder | What's Inside |
|--------|---------------|
| `_ops/docs` | Production guides, handovers, technical docs |
| `_ops/input` | Raw blueprints (.txt) ready for pipeline |
| `_ops/content` | Articles, drafts, test outputs |
| `_ops/claude-rules` | Tactical patterns, project status |
| `_ops/claude-skills` | Skill definitions (architect, performer, etc.) |

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
created: 2026-03-24             # auto-filled by template {{date}}
published_date:                 # fill after publishing
article_slug: ""                # URL slug
---
```

---

## Key Files

| Open This | To Do This |
|-----------|------------|
| `seeds/_template.md` | Template with auto-date (insert via Ctrl+P) |
| `dashboard.md` | See pipeline status |
| `content-catalog.md` | Find existing content |
| `OBSIDIAN_GUIDE.md` | Full documentation |
| `pillars/master-index.md` | Content system architecture (v6.0) |
| `pillars/voice-dna.md` | Check brand voice |
| `pillars/content-engine.md` | Check article modes |
| `_ops/` | Browse docs, rules, skills, content |

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
