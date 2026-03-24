# 📚 FIVE PILLAR SYSTEM — MASTER INDEX
## Nerd with Nart Content Creation Engine

**Updated:** March 25, 2026
**Architecture:** CLI-First Pipeline (Obsidian Intake → CLI Skills → Payload CMS)
**Version:** v6.0

---

## 🆕 WHAT'S NEW IN v6.0

| Change | Impact |
|--------|--------|
| **CLI-First Pipeline** | Gemini Gem #2 (Blueprint) replaced by `/architect` skill |
| **CLI Auditor** | Gemini Gem #4 replaced by `/auditor` skill (Gemini Gem #4 retained for escalation) |
| **Obsidian Intake** | `nerd/seeds/` replaces ad-hoc capture — 30-second seed workflow |
| **One-Shot Production** | `/produce-article` chains all 3 steps in a single CLI session |
| **Gemini Deep Research** | Retained — irreplaceable for multi-source investigative research |
| **NotebookLM** | Retained — optional for multi-document forensic extraction |

### What Was Retired
| Old | Replaced By | Why |
|-----|-------------|-----|
| Gemini Gem #2 (Blueprint) | `/architect` skill | Direct pillar access, no manual file loading |
| Gemini Gem #4 (primary audit) | `/auditor` skill | Rule-based checks run faster in-pipeline |
| Manual seed capture | Obsidian `seeds/` + frontmatter template | Structured, searchable, git-tracked |

### What Was Kept
| Tool | Role | Why Irreplaceable |
|------|------|-------------------|
| Gemini Deep Research | Multi-source investigative research | Web-scale synthesis no CLI can match |
| NotebookLM | Multi-document forensic extraction | Bulk PDF processing + audio overviews |
| Gemini Gem #4 | Escalation auditor (spot checks) | Real-time regulatory web search |

---

## 🏗️ SYSTEM ARCHITECTURE (v6.0)

```
┌─────────────────┐
│ OBSIDIAN INTAKE  │ (Layer 0 - Daily Capture)
│ nerd/seeds/      │
│ 30-sec frontmatter│
└────────┬────────┘
         ↓
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ GEMINI RESEARCH │  →   │  CLI PIPELINE   │  →   │  CLI AUDITOR    │
│                 │      │                 │      │                 │
│ • Deep Research │      │ /architect      │      │ /auditor        │
│ • Multi-source  │      │ /performer      │      │ 6-Point Check   │
│ • Web synthesis │      │ /produce-article│      │ Rule-based      │
│                 │      │                 │      │                 │
│ Gemini (when    │      │ Claude Code CLI │      │ Claude Code CLI │
│ research needed)│      │ or OpenCode CLI │      │                 │
└─────────────────┘      └─────────────────┘      └────────┬────────┘
                                                           │
                                                  ┌────────▼────────┐
                                                  │ GEMINI GEM #4   │
                                                  │ (ESCALATION)    │
                                                  │                 │
                                                  │ • Live web search│
                                                  │ • Regulatory    │
                                                  │   verification  │
                                                  │ • Spot checks   │
                                                  └─────────────────┘

Optional Layer 0 alternative:
┌─────────────────┐
│ NOTEBOOKLM      │ (Multi-doc forensic extraction)
│ Bulk PDFs →     │
│ Structured seeds│
└─────────────────┘
```

**Why 3-Way still matters:** The writer can't proofread their own work. Separating creation from audit eliminates same-session bias and catches regulatory errors.

**What changed:** The tools changed (Gemini Gems → CLI Skills), but the principle is the same — separate agents for separate roles. Research stays with Gemini where it's strongest. Everything else runs in one CLI session with direct pillar access.

---

## 📂 THE FIVE PILLARS

### PILLAR 1: VOICE DNA (Identity)
| File | Version | Size | Purpose |
|------|---------|------|---------|
| [voice-dna.md](voice-dna.md) | v5.2 | 18K | Pure identity — นาถ's voice, influences, tone |

**Key Contents:**
- 35 verified terms (TMO 2017, OIC, NHES, NCD, NSO)
- Voice influences: Naval Ravikant, Ray Dalio, Dr. Wit, JQA
- Brand positioning: Benevolent Teacher, Fiduciary Standard
- Banned words and ethical guidelines

---

### PILLAR 2: BRAND CONSTITUTION (Laws)
| File | Version | Size | Reduction |
|------|---------|------|-----------|
| [constitution.md](constitution.md) | v4.3.2 | 16K | 45% ↓ |

**Key Contents:**
- Article I: Core Values (LEARN Framework)
- Article II: Banned Terms (รวย, รีบ, โปรโมชั่น, etc.)
- Article III: Editorial Standards
- Article IV: Platform Guidelines
- Article V: Quality Assurance

---

### PILLAR 3: CONTENT ENGINE (Codes)
| File | Version | Size | Reduction |
|------|---------|------|-----------|
| [content-engine.md](content-engine.md) | v4.5.1 | 14K | 44% ↓ |

**Key Contents:**
- Content Modes: S (Quick) / A (Deep Dive) / B (Kane) / C (Series)
- Watermark counts per mode
- Framework codes and triggers
- Platform-specific guidelines

---

### PILLAR 4: GSB KANE DEEP DIVE (Protocol)
| File | Version | Size | Changes |
|------|---------|------|---------|
| [framework-deep-dive.md](framework-deep-dive.md) | **v4.5.6** | 18K | 🆕 Deep Research + NotebookLM |

**Key Contents:**
- **NEW: Deep Research Protocol** (Step 1)
- **NEW: NotebookLM Forensic Integration** (Preferred input)
- **NEW: NHES VII Hard-Check** (Mandatory validation)
- **NEW: Sinek Filter** (Confirm believers, not convince cynics)
- 4-Step Deep Dive Protocol
- Gold Standard Example (ประกันตลอดชีพ article)
- Primary Sources Hierarchy (TMO 2017, NHES VII, OIC)
- Blueprint Adherence Rules
- ⚠️ **Gem #4 is EXTERNAL** (Sovereign Auditor)

---

### PILLAR 5: VISUAL STYLE GUIDE (Visuals)
| File | Version | Size | Reduction |
|------|---------|------|-----------|
| [visual-engine.md](visual-engine.md) | v3.0 | ~25K | Complete overhaul |

**Key Contents:**
- Electric Nerd color palette (Navy/Teal/Amber)
- 15 Canonical Nart poses
- Branded props library
- Visual Mode system (Explainer/Audit/Emotional)
- Platform-specific aspect ratios

---

## 📋 SUPPORT FILES

### Terminology & Formatting
| File | Version | Purpose |
|------|---------|---------|
| [data-terminology.md](data-terminology.md) | v4.3 | 35 verified terms with Thai-First format |
| [data-thai-handshake-exceptions.md](data-thai-handshake-exceptions.md) | v4.3.1 | Exception rules (SEC, Apple, Ray Dalio, etc.) |
| [data-citation-template.md](data-citation-template.md) | v1.1 | Citation formats for TMO, NHES, OIC |

### Content Library
| File | Version | Purpose |
|------|---------|---------|
| [tech-bridge-lab.md](tech-bridge-lab.md) | v4.6.2 | 25 analogies (#001-#025) |
| [instruction-notebooklm-protocol.md](instruction-notebooklm-protocol.md) | v4.5 | Forensic Seed Extraction workflow |

### Reference Data
| File | Version | Purpose |
|------|---------|---------|
| [data-nhes-vii.md](data-nhes-vii.md) | v1.0 | Hard-coded health statistics (2568) |

---

## 🎛️ CLI SKILLS (Claude Code / OpenCode)

### Pipeline Skills
| Skill | Role | Command |
|-------|------|---------|
| `/architect` | Blueprint from topic + pillars | `/architect [topic] [mode: S\|A\|B\|C]` |
| `/performer` | Execute blueprint into Thai article | `/performer [blueprint or topic]` |
| `/auditor` | 6-point compliance audit | `/auditor [paste article]` |
| `/produce-article` | Full pipeline: architect → performer → auditor | `/produce-article [topic] [mode]` |
| `/hybrid` | One-shot (skip 3-agent split, for Mode S/A) | `/hybrid [topic] [mode]` |

### Performer Key Features
- Tone Matrix (T1-T5)
- Blueprint Adherence Protocol
- Clean Output Rule (strip meta-labels)
- Thai-First Formatting (85% rule)
- Primary Sources Hierarchy
- Source: [instruction-performer.txt](instruction-performer.txt)

### Auditor: 6-Point Compliance System
| Check | Domain | What It Verifies |
|-------|--------|------------------|
| 1 | **PDPA** | PII scan — names, IDs, policy numbers |
| 2 | **OIC/คปภ. + SEC** | Products, claims, market conduct, Unit-Linked |
| 3 | **Revenue Code** | Tax deductions, annuity conditions |
| 4 | **FDA/อย.** | No therapeutic claims for non-drugs |
| 5 | **Actuarial** | Premium benchmarks, TMO 2017 |
| 6 | **Brand DNA** | Banned words, Thai-First, tone |

**Auditor loads these pillar files automatically:**
1. [voice-dna.md](voice-dna.md)
2. [constitution.md](constitution.md)
3. [data-thai-handshake-exceptions.md](data-thai-handshake-exceptions.md)
4. [data-nhes-vii.md](data-nhes-vii.md)

---

## 🛡️ GEMINI GEM #4 (Escalation Auditor)

| File | Version | Purpose |
|------|---------|---------|
| [instruction-auditor-setup.md](instruction-auditor-setup.md) | v5.4 | Setup for Gemini Gem #4 |

**When to escalate to Gem #4 (instead of `/auditor`):**
- Article makes specific regulatory claims you're unsure about
- New OIC/SEC announcements may affect content accuracy
- Tax law changes need real-time verification
- Product-specific claims need current market validation

**Rule:** `/auditor` = primary (every article). Gem #4 = escalation (regulatory-sensitive content).

---

## 🏛️ ARCHITECTURE DOCUMENTATION

| File | Version | Purpose |
|------|---------|---------|
| [tech-architecture-3way.md](tech-architecture-3way.md) | v5.2.1 | Complete 3-Way system documentation |
| [instruction-platform-setup.md](instruction-platform-setup.md) | v1.3 | Platform configuration guide |

---

## 🎛️ TONE MATRIX QUICK REFERENCE

| ID | Mode | Formula | Use Case |
|----|------|---------|----------|
| **T1** | Benevolent Teacher | Nerd + Nart | 90% of content (default) |
| **T2** | Stern Guardian | JQA + Naval | Scams, uncomfortable truths |
| **T3** | Sunday Letter | Dalio + Naval | Philosophy, mindset, essay |
| **T4** | Case Builder | Lawyer + Actuary | Formal letters (AIA/OIC/Gov) |
| **T5** | Custom | User-defined | "Write like [X]..." |

---

## 📊 FILE STRUCTURE BY TOOL

### CLI Skills — `/architect`, `/performer`, `/auditor` (Pillar Access)
```
Skills auto-load relevant pillars from nerd/pillars/:
✅ framework-deep-dive.md
✅ voice-dna.md
✅ constitution.md
✅ data-thai-handshake-exceptions.md
✅ tech-bridge-lab.md
✅ data-terminology.md
✅ data-citation-template.md
✅ data-nhes-vii.md
+ Skill definitions: .claude/skills/{architect,performer,auditor}/
```

### Gemini Deep Research (Research Phase)
```
No pillar files needed — Gemini searches the web
Input: Topic + seed notes from Obsidian
Output: Research synthesis → feed to /architect
```

### Gemini Gem #4 (Escalation Auditor)
```
✅ voice-dna.md
✅ constitution.md
✅ data-thai-handshake-exceptions.md
✅ data-nhes-vii.md
+ System Instructions: From instruction-auditor-setup.md
+ Real-time web search for regulatory verification
```

### NotebookLM (Optional — Multi-Doc Extraction)
```
Raw document dumps → Forensic Seed Extraction v6.6.1
Output: Structured seeds → nerd/seeds/
Prompt: instruction-notebooklm-protocol.md
```

### Obsidian Vault (Intake Layer)
```
Vault root: nerd/
✅ seeds/          — 30-second capture with frontmatter
✅ content-catalog.md — inventory of all 68+ content files
✅ dashboard.md    — Dataview pipeline tracker
✅ _ops/           — symlinks to docs, input, content, claude-rules, claude-skills
```

### Optional Files (Load as needed)
```
□ visual-engine.md (for visuals)
□ content-engine.md (for modes)
```

---

## 🔄 CONTENT WORKFLOW (v6.0)

### Deep Dive Workflow (CLI-First)
```
Step 0: CAPTURE (Obsidian)
        ├─ Capture seed in nerd/seeds/ (30 seconds)
        └─ Optional: NotebookLM for bulk PDF extraction
        ↓
Step 1: RESEARCH (Gemini Deep Research)
        ├─ Feed seed + topic to Gemini
        ├─ NHES VII Hard-Check (mandatory)
        └─ Sinek Filter (confirm believers)
        ↓
Step 2: BLUEPRINT (CLI)
        └─ /architect [topic] [mode] — loads pillars automatically
        ↓
Step 3: EXECUTE (CLI)
        └─ /performer [blueprint] — writes Thai article
        ↓
Step 4: AUDIT (CLI — primary)
        ├─ /auditor [article] — 6-point compliance check
        └─ Escalate to Gemini Gem #4 if regulatory-sensitive
        ↓
Step 5: PUBLISH → Payload CMS → Vercel

Or one-shot: /produce-article [topic] [mode] — Steps 2-4 in one command
```

### Quick Content Workflow
```
"Quick Magnet: [topic]" → /hybrid [topic] S → Publish
"Kane Edition: [topic]" → /hybrid [topic] B → Publish
```

---

## ✅ QUALITY CONTROL MATRIX

### Pre-Publication (Claude Performer)
| Check | Standard |
|-------|----------|
| Thai-First Ratio | ≥85% |
| Meta-labels | Stripped |
| Headers | Pure Thai |
| Watermarks | Mode S=1, A=3, B=4, C=5 |
| Banned words | Zero |
| Spelling | นาถ (not นาท) |

### Post-Production (`/auditor` — escalate to Gemini Gem #4 if regulatory-sensitive)
| Check | Domain |
|-------|--------|
| PII Scan | PDPA |
| Insurance Claims | OIC + SEC |
| Tax Statements | Revenue Code |
| Health Claims | FDA/อย. |
| Math/Premiums | Actuarial |
| Brand Compliance | Constitution |

---

## 🚨 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Claude writes English headers | Check Thai-First file is loaded in skill |
| Meta-labels in output | Remind: "Strip all labels" |
| Wrong premium numbers | Check GSB_Kane actuarial benchmarks |
| Wrong tax amounts | Revenue Code: Life=100K, Health=25K, Annuity=200K (conditions!) |
| `/auditor` misses regulatory change | Escalate to Gemini Gem #4 (live web search) |
| Banned word slipped through | Run `/auditor` before publish |
| **OLD NHES data cited** | Verify NHES VII (2568): Obesity 45%, DM 10.6% |
| **Seeds don't convert** | Apply Sinek Filter: confirm believers, not convince cynics |
| Skill not loading pillars | Check `.claude/skills/` definitions reference correct paths |

---

## 📊 VERSION HISTORY

| Version | Date | Major Changes |
|---------|------|---------------|
| **v6.0** | Mar 25, 2026 | CLI-First Pipeline: Gem #2 → `/architect`, Gem #4 → `/auditor` (primary) + Gem #4 (escalation), Obsidian intake layer |
| v5.3 | Dec 15, 2025 | GSB Kane v4.5.6, Deep Research Protocol, NotebookLM Integration |
| v5.2 | Nov 27, 2025 | Bulletproof Auditor, Tone Matrix, PILLAR_5 optimized |
| v5.1 | Nov 27, 2025 | Enhanced 6-Point Compliance |
| v5.0 | Nov 27, 2025 | 3-Way Architecture launch |
| v4.5.4 | Nov 27, 2025 | File optimization (~53% reduction) |
| v4.5.x | Nov 2025 | Pre-3-Way versions |

---

## 📋 QUICK REFERENCE CARD

```
┌────────────────────────────────────────────────────────────────┐
│              NERD WITH NART v6.0 QUICK REFERENCE               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ARCHITECTURE: Obsidian → Gemini Research → CLI Pipeline       │
│                                                                │
│  CLI COMMANDS:                                                 │
│  /architect [topic] [S|A|B|C]  — generate blueprint           │
│  /performer [blueprint]        — write Thai article            │
│  /auditor [article]            — 6-point compliance            │
│  /produce-article [topic]      — full pipeline (all 3)        │
│  /hybrid [topic]               — one-shot (skip split)        │
│                                                                │
│  RESEARCH: Gemini Deep Research (when needed)                  │
│  ESCALATION AUDIT: Gemini Gem #4 (regulatory-sensitive)       │
│  FORENSIC EXTRACTION: NotebookLM (bulk PDFs, occasional)      │
│                                                                │
│  MANDATORY CHECKS:                                             │
│  ✓ NHES VII Hard-Check (Obesity 45%, DM 10.6%)               │
│  ✓ Sinek Filter (confirm believers)                           │
│  ✓ Primary Sources Only (TMO, OIC, NSO)                       │
│                                                                │
│  TONE: T1=Teacher T2=Guardian T3=Sunday T4=Builder T5=Custom  │
│  SOURCES: TMO 2017 | NHES VII | OIC | NSO | Revenue Code     │
│  COMPLIANCE: OIC + SEC + Revenue + FDA + PDPA + Brand         │
│                                                                │
│  ⚠️ ALWAYS: Run /auditor before publishing                    │
│  ⚠️ ESCALATE: Gemini Gem #4 for regulatory-sensitive content  │
│  ⚠️ ALWAYS: Use Part 3 (revised draft) if any 🔴 flags       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

*FIVE_PILLAR_SYSTEM_v6_0_MASTER_INDEX.md*
*Nerd with Nart Content Creation Engine*
*CLI-First Pipeline — Obsidian Intake + Gemini Research + CLI Skills*
*March 25, 2026*
