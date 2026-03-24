# Obsidian + Content Pipeline Guide

**Created:** March 24, 2026
**Purpose:** How to use Obsidian as the intake layer for the Nerd with Nart content production system

---

## Part 1: What We Did and Why

### The Problem

The content production workflow had a missing first stage. Raw material (Facebook posts, article ideas, research notes) was being copy-pasted directly into AI tools (Gemini Gem, NotebookLM, Claude Code) with no organization. This caused:

- Sample outputs from multi-model testing got lost in chat histories
- Production-ready articles sat forgotten in scattered folders
- No way to see what topics had been covered vs what had gaps
- No pipeline visibility (what's a seed? what's in progress? what's published?)
- Starting each article felt like starting from scratch

### The Solution

Added Obsidian as the **intake layer** — the organized inbox where raw material lands before entering the existing 3-agent production pipeline. Nothing in the existing system changed. Obsidian sits in front of it.

```
BEFORE:
  📱 Facebook → 🧠 Your memory → 🤖 Architect → ✍️ Performer → ⚖️ Auditor
                  ↑ everything lost here

AFTER:
  📱 Facebook → 📥 Obsidian Seed → 📊 Dashboard → 🤖 Architect → ✍️ Performer → ⚖️ Auditor
                  ↑ captured, tagged, tracked         ↑ fed with full context
```

### What Was Built

| Item | Location | Purpose |
|------|----------|---------|
| Obsidian | NixOS config (pending rebuild) | Visual markdown editor + Dataview dashboards |
| `nerd/seeds/` | New folder | Capture raw ideas with frontmatter tags |
| `nerd/seeds/_template.md` | Seed template | Copy this for every new idea |
| `nerd/content-catalog.md` | Content index | Map of all 68+ existing files (your treasure map) |
| `nerd/dashboard.md` | Dataview dashboard | Live pipeline visibility in Obsidian |

### What Did NOT Change

- Your `/nerd/pillars/` files — untouched
- Your `/nerd/agents/` instructions — untouched
- Your `.claude/skills/` (architect, performer, auditor, hybrid, produce-article) — untouched
- Your Mastra vector DB — untouched
- Your existing content files — untouched (just cataloged)

---

## Part 2: Installation

### Step 1: Install Obsidian on NixOS

Obsidian has already been added to your NixOS config. Run:

```bash
sudo nixos-rebuild switch --flake ~/Melkor-OS/nixos#melkor
```

### Step 2: Open Your Vault

1. Launch Obsidian (from Fuzzel or terminal: `obsidian`)
2. Choose "Open folder as vault"
3. Navigate to: `~/Melkor-OS/departments/nerd-with-nart/nerd/`
4. Click "Open"

This makes Obsidian read your entire `nerd/` folder — pillars, seeds, samples, everything.

### Step 3: Install Dataview Plugin

1. In Obsidian: Settings (gear icon) → Community Plugins → Turn off Restricted Mode
2. Browse → Search "Dataview" → Install → Enable
3. Open `dashboard.md` — you should see live tables

### Step 4: (Optional) Install Templater Plugin

1. Browse → Search "Templater" → Install → Enable
2. Settings → Templater → Template folder: `seeds`
3. Now you can create new seeds from template with a hotkey

---

## Part 3: Daily Workflow

### Capturing a New Idea (30 Seconds)

**When you see something interesting on Facebook, LINE, or anywhere:**

1. In Obsidian, go to `seeds/` folder
2. Create new file: `2026-03-24-short-topic-name.md`
3. Copy the frontmatter from `_template.md` (or use Templater hotkey)
4. Fill in the minimum:

```yaml
---
type: seed
status: seed
pillar: critical-illness
created: 2026-03-24
---
```

5. Paste the raw material below the frontmatter
6. Done. Move on with your day.

**You don't need to fill in everything.** The paradox, archetype, and mode can be filled in later when you're ready to research.

### Reviewing Your Pipeline (2 Minutes)

Open `dashboard.md` in Obsidian. You'll see:

- **Inbox:** New seeds not yet researched
- **Researching:** Seeds you're gathering data for
- **Ready:** Seeds with paradox + data, ready for the Architect
- **Gap Analysis:** Which pillars have too few ideas

### Promoting a Seed to Production

When a seed is ready:

1. Change frontmatter: `status: ready` → `status: in-production`
2. Open Claude Code terminal
3. Run: `/architect [topic from seed]` or `/produce-article [topic]`
4. The Architect now has context: your raw notes, the paradox, linked brochures
5. After publishing: change to `status: published`, add `published_date` and `article_slug`

### The Complete Status Flow

```
seed → researching → ready → in-production → published
  ↓
killed (decided not to pursue — keep for reference)
```

---

## Part 4: Frontmatter Reference

### Required Fields (Minimum Capture)

```yaml
---
type: seed          # always "seed"
status: seed        # seed | researching | ready | in-production | published | killed
pillar: tax         # which content pillar
created: 2026-03-24 # when you captured it
---
```

### Optional Fields (Fill In When Ready)

```yaml
paradox: "ทำไมประกันที่ถูกที่สุดถึงแพงที่สุด"  # core contradiction
source: "https://facebook.com/..."               # where you found it
brochure: "aia-multi-pay-ci-plus-th"             # linked brochure file
archetype: "uncomfortable-truth"                  # GSB archetype
mode: "B"                                        # target article mode (S/A/B/C)
published_date: 2026-04-01                       # filled after publishing
article_slug: "premium-holiday-trap"             # URL slug on site
```

### Pillar Values

| Value | Topic Area |
|-------|------------|
| `life-insurance` | Life insurance products & strategies |
| `critical-illness` | CI, Multi-Pay, cancer coverage |
| `health-insurance` | Health/medical insurance |
| `tax` | Tax deductions, planning, Revenue Code |
| `savings` | Savings plans, endowment |
| `investment` | Unit-linked, mutual funds |
| `estate` | Estate planning, inheritance |
| `general` | Industry news, general finance |

### Archetype Values

| Value | Pattern | When to Use |
|-------|---------|-------------|
| `uncomfortable-truth` | Lie → Mechanism → Verdict | Exposing misconceptions |
| `hidden-cost` | Surface → Compound Damage → Victim | Revealing hidden expenses |
| `simple-swap` | Trap → Principle → Swap | Offering clear alternatives |

### Mode Values

| Mode | Type | Word Count (Thai) |
|------|------|-------------------|
| `S` | Quick Magnet (Social) | 150-300 |
| `A` | Analysis | 600-1,000 |
| `B` | Pillar Article | 1,500-2,000 |
| `C` | Epic Deep Dive | 2,500-3,500 |

---

## Part 5: Using the Content Catalog

Open `nerd/content-catalog.md` to see everything you already have.

### Immediate Actions Available

**Publish Now (3 ready articles):**
1. `content/articles/premium-holiday-trap.md` — กับดัก "พักเบี้ย"
2. `content/articles/insurance-extinction-2083.md` — 2083: ปีที่อุตสาหกรรมประกันภัยไทยตาย
3. `content/test-articles/structure-war-final.md` — ศึกเชิงโครงสร้าง

**Pick Best Variant (6 model variants of Premium Holiday):**
- Read all 6 versions in `content/articles/premium-holiday-*.md`
- Pick your favorite tone/angle
- Polish and publish

**Unused Blueprints (3 ready for pipeline):**
- `input/diabetes-blueprint.txt` → `/produce-article`
- `input/senior-crisis-blueprint.txt` → `/produce-article`
- `input/aia-war-blueprint.txt` → `/produce-article`

**Draft Archive (28 files, 4 batches):**
- Check `content/_draft_archive/2025-12-30_03-47-06/` (V4, latest iteration)
- Compare the 7 model outputs for the diabetes article
- Promote the best one

---

## Part 6: How Everything Connects

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR CONTENT SYSTEM                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  INTAKE (New)                PRODUCTION (Existing)           │
│  ───────────                 ────────────────────            │
│                                                              │
│  📱 Facebook/LINE            🤖 Claude Code Skills:          │
│       ↓                         /architect                   │
│  📥 nerd/seeds/                 /performer                   │
│     (Obsidian capture)          /auditor                     │
│       ↓                         /produce-article             │
│  📊 dashboard.md                /hybrid                      │
│     (pipeline view)                                          │
│       ↓                      📚 Knowledge Base:              │
│  When status = "ready" ───→    nerd/pillars/ (13 files)     │
│                                nerd/agents/ (instructions)   │
│                                nerd/references/brochures/    │
│                                                              │
│  STORAGE                     PUBLISHING                      │
│  ───────                     ──────────                      │
│                                                              │
│  🗄️ content/articles/         🌐 Payload CMS                 │
│  🗄️ content/_draft_archive/   🌐 Vercel (auto-deploy)       │
│  🗄️ content/test-articles/    🌐 nerdwithnart.com            │
│  📋 nerd/content-catalog.md                                  │
│     (index of everything)                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Tool Roles

| Tool | Role | When to Use |
|------|------|-------------|
| **Obsidian** | Capture, organize, visualize pipeline | Daily — dump ideas, check dashboard |
| **Claude Code** | Production pipeline + system maintenance | When producing articles or coding |
| **Gemini Gem** | Alternative Architect (in browser) | When you prefer Gemini's analysis |
| **NotebookLM** | Deep research / forensic extraction | When doing heavy research on PDFs |
| **Payload CMS** | Publishing platform | When posting final articles |

### Key Principle

**Obsidian is for YOU. Claude Code is for the AI.** Both read the same markdown files. Edit in whichever is more comfortable — the other tool sees the changes instantly.

---

## Part 7: Obsidian Tips for This Workflow

### Bidirectional Links

Link seeds to brochures:
```markdown
Related brochure: [[aia-multi-pay-ci-plus-th]]
```

Link seeds to pillar knowledge:
```markdown
Data source: [[data-nhes-vii]]
Uses bridge: [[tech-bridge-lab]]
```

Over time, Graph View will show clusters of related ideas.

### Quick Capture Shortcut

1. Ctrl+N → New file
2. Type filename: `2026-03-24-topic.md`
3. Paste minimal frontmatter + raw material
4. Ctrl+S → Done

### Useful Obsidian Hotkeys

| Key | Action |
|-----|--------|
| Ctrl+N | New file |
| Ctrl+O | Quick open file |
| Ctrl+P | Command palette |
| Ctrl+Shift+F | Search across all files |
| Ctrl+G | Open Graph View |

### Graph View

Open Graph View (Ctrl+G) to see connections between your files. Filter by folder (`path:seeds/`) to see only your content pipeline.

---

## Part 8: Maintenance

### Weekly (5 minutes)

1. Open `dashboard.md` — check pipeline status
2. Any seeds stuck in "researching" for too long? Either promote or kill them
3. Any pillars with zero seeds? Think about what topics you've been ignoring

### Monthly (15 minutes)

1. Review `content-catalog.md` — is it still accurate?
2. Check `content/_draft_archive/` — any forgotten gems?
3. Look at Graph View — any surprising connections between ideas?

### When You Publish an Article

1. Update the seed: `status: published`, add `published_date` and `article_slug`
2. (Optional) Move the final article file to `content/articles/` if it's not there already

---

## Files Reference

| File | What It Is |
|------|------------|
| `nerd/seeds/_template.md` | Copy this for new seeds |
| `nerd/seeds/README.md` | Seed system documentation |
| `nerd/dashboard.md` | Dataview pipeline dashboard |
| `nerd/content-catalog.md` | Index of all 68+ existing content files |
| `nerd/OBSIDIAN_GUIDE.md` | This file |
