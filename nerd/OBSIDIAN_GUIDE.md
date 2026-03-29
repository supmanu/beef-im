# Obsidian + Content Pipeline Guide

**Created:** March 24, 2026
**Updated:** March 29, 2026 (v6.0 pipeline, /publish skill, _ops/ symlinks, /seed skill, Templates plugin)
**Purpose:** How to use Obsidian as the intake layer for the Nerd with Nart content production system

---

## Part 1: What We Did and Why

### The Problem

The content production workflow had a missing first stage. Raw material (Facebook posts, article ideas, research notes) was being copy-pasted directly into AI tools with no organization. This caused:

- Sample outputs from multi-model testing got lost in chat histories
- Production-ready articles sat forgotten in scattered folders
- No way to see what topics had been covered vs what had gaps
- No pipeline visibility (what's a seed? what's in progress? what's published?)
- Starting each article felt like starting from scratch

### The Solution

Added Obsidian as the **intake layer** — the organized inbox where raw material lands before entering the CLI-first production pipeline.

```
BEFORE:
  📱 Facebook → 🧠 Your memory → 🤖 Gemini Gem → ✍️ Claude → ⚖️ Gemini Gem
                  ↑ everything lost here

AFTER (v6.0 + /publish):
  📱 Facebook → 📥 Obsidian Seed → 📊 Dashboard → 🤖 /architect → ✍️ /performer → ⚖️ /auditor → 📤 /publish
                  ↑ captured, tagged, tracked       ↑ CLI Skills, one terminal session              ↑ direct to Payload
  Alternative:
  📱 Facebook → 💻 /seed [dump] → auto-creates seed file in Obsidian
```

### What Was Built

| Item | Location | Purpose |
|------|----------|---------|
| Obsidian | NixOS melkor config | Visual markdown editor + Dataview dashboards |
| `nerd/seeds/` | Seed folder | Capture raw ideas with frontmatter tags |
| `nerd/seeds/_template.md` | Seed template | Auto-date via `{{date}}`, insert with Ctrl+P |
| `nerd/content-catalog.md` | Content index | Map of all 68+ existing files |
| `nerd/dashboard.md` | Dataview dashboard | Live pipeline visibility |
| `nerd/_ops/` | Symlinks | Browse docs, input, content, rules, skills from vault |
| `.claude/skills/seed/` | CLI skill | `/seed [dump]` — captures seed from terminal |

### Why `nerd/` as Vault (Not `nerd-with-nart/`)

Using the project root as vault would crawl `node_modules/`, `.next/`, TypeScript files — polluting search, graph view, and Dataview queries. The `nerd/` folder is pure content domain. Operational files are accessible via `_ops/` symlinks.

| Domain | Tool |
|--------|------|
| **Content** (pillars, seeds, research) | Obsidian (`nerd/`) |
| **Code** (app, components, config) | IDE (Antigravity) |
| **Ops** (.claude/rules, docs) | Obsidian via `_ops/` symlinks |

---

## Part 2: Installation

### Step 1: Install Obsidian on NixOS

Already added to NixOS config. Run:

```bash
sudo nixos-rebuild switch --flake ~/Melkor-OS/nixos#melkor
```

### Step 2: Open Your Vault

1. Launch Obsidian (from Fuzzel or terminal: `obsidian`)
2. Choose "Open folder as vault"
3. Navigate to: `~/Melkor-OS/departments/nerd-with-nart/nerd/`
4. Click "Open"

### Step 3: Install Dataview Plugin

1. Settings (gear icon) → Community Plugins → Turn off Restricted Mode
2. Browse → Search "Dataview" → Install → Enable
3. Open `dashboard.md` — you should see live tables

### Step 4: Configure Templates (Core Plugin)

1. Settings → Core Plugins → Enable "Templates"
2. Settings → Templates:
   - **Template folder location:** `seeds`
   - **Date format:** `YYYY-MM-DD`
   - **Time format:** (leave default, not needed for seeds)
3. Now `Ctrl+P` → "Insert template" → `_template.md` inserts the seed template with today's date auto-filled in the `created:` field

### Step 5: Customize Fonts (Optional)

For Thai readability:
- Settings → Appearance → Font → Set to **Sarabun** (body) and **Prompt** (headings)
- These match your site's typography

---

## Part 3: Daily Workflow

### Capturing a New Idea — Two Methods

#### Method 1: `/seed` CLI Skill (Fastest — 10 seconds)

From Claude Code terminal, just dump:

```
/seed เห็นโพสต์ใน Facebook เรื่องคนซื้อ CI แล้วเคลมไม่ได้เพราะ waiting period ไม่ครบ 90 วัน
```

The skill automatically:
- Names the file `2026-03-25-ci-waiting-period.md`
- Fills `created:` with today's date
- Infers the `pillar:` (critical-illness)
- Pastes your raw material into the Raw Material section
- Writes a "Why This Matters" note

You can then open the file in Obsidian to refine it.

#### Method 2: Obsidian Template (Visual — 30 seconds)

1. In Obsidian, go to `seeds/` folder
2. `Ctrl+N` → Name the file: `2026-03-25-ci-waiting-period`
3. `Ctrl+P` → "Insert template" → select `_template.md`
4. The `created:` field auto-fills with today's date (`{{date}}` → `2026-03-25`)
5. Fill in `pillar:` and paste raw material below
6. Done. Fill in paradox/mode/archetype later.

**You don't need to fill in everything.** The minimum is:

```yaml
---
type: seed
status: seed
pillar: critical-illness
created: 2026-03-25      ← auto-filled by template
---

(paste the Facebook post or idea here)
```

### Reviewing Your Pipeline (2 Minutes)

Open `dashboard.md` in Obsidian. You'll see:

- **Inbox:** New seeds not yet researched
- **Researching:** Seeds you're gathering data for
- **Ready:** Seeds with paradox + data, ready for the pipeline
- **Gap Analysis:** Which pillars have too few ideas

### Promoting a Seed to Production (v6.0)

When a seed is ready:

1. Change frontmatter: `status: ready` → `status: in-production`
2. Open Claude Code terminal
3. Run: `/produce-article [topic] [mode]` (full pipeline) or step-by-step:
   - `/architect [topic] [mode]` → generates blueprint
   - `/performer [blueprint]` → writes Thai article
   - `/auditor [article]` → 6-point compliance check
4. If regulatory-sensitive: escalate audit to Gemini Gem #4
5. Save approved article as `.md` with publish frontmatter (title, slug, category, date, coverImage)
6. Publish to Payload: `/publish nerd/output/article-slug.md` (or `--draft` to preview first)
7. Update seed: `status: published`, add `published_date` and `article_slug`

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
created: 2026-03-25 # auto-filled by {{date}} template
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

## Part 5: Browsing Operational Files (`_ops/`)

The `_ops/` folder in your vault contains symlinks to project files outside `nerd/`:

```
nerd/_ops/
├── claude-rules  → .claude/rules/    (22 tactical pattern files)
├── claude-skills → .claude/skills/   (6 skill folders)
├── content       → content/          (articles, drafts, viral)
├── docs          → docs/             (guides, handovers, constitution)
└── input         → input/            (raw blueprints)
```

**Why symlinks?** Keeps the vault focused on content (no `node_modules/` pollution) while giving you read access to operational files through Obsidian's nice UI.

**To add more symlinks later:**
```bash
cd ~/Melkor-OS/departments/nerd-with-nart/nerd/_ops
ln -s ../../[folder] [name]
```

---

## Part 6: Using the Content Catalog

Open `nerd/content-catalog.md` to see everything you already have.

### Immediate Actions Available

**Publish Now (3 ready articles):**
1. `content/articles/premium-holiday-trap.md` — กับดัก "พักเบี้ย"
2. `content/articles/insurance-extinction-2083.md` — 2083: ปีที่อุตสาหกรรมประกันภัยไทยตาย
3. `content/test-articles/structure-war-final.md` — ศึกเชิงโครงสร้าง

**Unused Blueprints (3 ready for pipeline):**
- `input/diabetes-blueprint.txt` → `/produce-article`
- `input/senior-crisis-blueprint.txt` → `/produce-article`
- `input/aia-war-blueprint.txt` → `/produce-article`

---

## Part 7: How Everything Connects (v6.0)

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR CONTENT SYSTEM (v6.0)                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  INTAKE                        PRODUCTION                    │
│  ──────                        ──────────                    │
│                                                              │
│  📱 Facebook/LINE/Idea          💻 Claude Code Skills:        │
│       ↓                            /seed (capture)           │
│  📥 nerd/seeds/                    /architect (blueprint)    │
│     (/seed CLI or Obsidian)        /performer (write)        │
│       ↓                            /auditor (comply)         │
│  📊 dashboard.md                   /produce-article (all 3)  │
│     (pipeline view)                /hybrid (one-shot)        │
│       ↓                                                      │
│  When status = "ready" ───→     🔬 Gemini (when needed):     │
│                                    Deep Research (web)       │
│                                    Gem #4 (regulatory audit) │
│                                                              │
│  KNOWLEDGE                     PUBLISHING                    │
│  ─────────                     ──────────                    │
│                                                              │
│  📚 nerd/pillars/ (22 files)    🌐 Payload CMS               │
│  📚 nerd/agents/ (instructions)  🌐 Vercel (auto-deploy)     │
│  📚 nerd/references/brochures/   🌐 nerdwithnart.com          │
│  📋 nerd/content-catalog.md                                  │
│                                                              │
│  BROWSING (Obsidian)                                         │
│  ───────                                                     │
│  📁 _ops/docs          (project documentation)               │
│  📁 _ops/input         (raw blueprints)                      │
│  📁 _ops/content       (articles, drafts)                    │
│  📁 _ops/claude-rules  (tactical patterns)                   │
│  📁 _ops/claude-skills (skill definitions)                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Tool Roles (v6.0)

| Tool | Role | When to Use |
|------|------|-------------|
| **Obsidian** | Capture, organize, browse, visualize pipeline | Daily — dump ideas, check dashboard, browse files |
| **Claude Code CLI** | Production pipeline (`/seed`, `/architect`, `/performer`, `/auditor`) | When capturing or producing articles |
| **Gemini Deep Research** | Multi-source web research | Deep dives requiring investigative research |
| **Gemini Gem #4** | Escalation audit (regulatory web search) | When article makes regulatory claims you're unsure about |
| **NotebookLM** | Multi-document forensic extraction | Occasional — bulk PDF processing |
| **Payload CMS** | Publishing platform | When posting final articles |

### Key Principle

**Obsidian is for YOU. Claude Code is for the AI.** Both read the same markdown files. Edit in whichever is more comfortable — the other tool sees the changes instantly.

---

## Part 8: Obsidian Tips for This Workflow

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

### Useful Obsidian Hotkeys

| Key | Action |
|-----|--------|
| Ctrl+N | New file |
| Ctrl+O | Quick open file |
| Ctrl+P | Command palette (insert template, search commands) |
| Ctrl+Shift+F | Search across all files |
| Ctrl+G | Open Graph View |

### Graph View

Open Graph View (Ctrl+G) to see connections between your files. Filter by folder (`path:seeds/`) to see only your content pipeline.

---

## Part 9: Maintenance

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
| `nerd/seeds/_template.md` | Seed template with `{{date}}` auto-fill |
| `nerd/seeds/README.md` | Seed system documentation |
| `nerd/dashboard.md` | Dataview pipeline dashboard |
| `nerd/content-catalog.md` | Index of all 68+ existing content files |
| `nerd/CHEATSHEET.md` | One-page quick reference (print this) |
| `nerd/OBSIDIAN_GUIDE.md` | This file |
| `nerd/pillars/master-index.md` | Content system architecture (v6.0) |
| `nerd/_ops/` | Symlinks to docs, input, content, rules, skills |
| `.claude/skills/seed/` | `/seed` CLI skill for terminal capture |
