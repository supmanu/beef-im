# 🏗️ CTO PROJECT CONFIGURATION GUIDE v6.6.1
## Claude + Gemini Twin CTO Setup
### December 14, 2025 — Sovereign Stack Edition

---

## 🎯 CTO PHILOSOPHY

> **CTO = System Architect + Capability Advisor (Mini-CEO)**
> 
> The CTO must have **full awareness** of all system capabilities to:
> 1. **Remind** — "We already have a Lemon8 system for that"
> 2. **Advise** — "Use the NotebookLM protocol for audio content"
> 3. **Prevent** — Avoid reinventing existing solutions
> 4. **Maintain** — Keep all components aligned and updated
>
> **Delete only truly superseded versions**, not capability files.

---

## 🏗️ INFRASTRUCTURE CONTEXT (v6.6.1)

### The Sovereign Stack v5.5

```
┌─────────────────────────────────────────────────────┐
│  SOVEREIGN STACK v5.5 (Phase H Complete)            │
├─────────────────────────────────────────────────────┤
│  Framework:    Next.js 16.0.8 (App Router)          │
│  CMS:          Payload 3.0 (Embedded)               │
│  Database:     Neon (Postgres)                      │
│  Hosting:      Vercel (Serverless Functions)        │
│  Storage:      Vercel Blob (Free Tier)              │
│  Node:         20 LTS (ENFORCED)                    │
└─────────────────────────────────────────────────────┘
```

### Architecture Pattern: Duplex Layout Strategy
```
app/
├── layout.tsx         ← Pass-through (returns {children} only)
├── (site)/            ← Public website (own <html><body>)
└── (payload)/         ← Admin panel (own <html><body>)
```

**Reference:** `tech-archive-layout-fix.md`

### Critical Infrastructure Rules (From Phase H)
1. **PIN NODE 20** — Do not use Node 24 (breaks Payload CLI)
2. **NO ZOMBIE CODE** — Purge legacy configs before migration
3. **EXPLICIT > IMPLICIT** — Hard-wire imports, no auto-discovery
4. **RELATIVE IMPORTS** — Use `../../../../` instead of `@payload-config`
5. **WEBPACK MODE** — Use `next dev --webpack` (no Turbopack with Payload)

---

## 📊 ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                    CTO LAYER (System Management)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐         ┌─────────────────┐              │
│   │  CLAUDE CTO     │ ←─────→ │  GEMINI CTO     │              │
│   │  (Full View)    │  Sync   │  (Quick Tasks)  │              │
│   │                 │         │                 │              │
│   │ • All 19 files  │         │ • 10 core files │              │
│   │ • Full awareness│         │ • Fast lookups  │              │
│   │ • Heavy lifting │         │ • Daily maint.  │              │
│   │ • Mini-CEO role │         │ • Simple patches│              │
│   └─────────────────┘         └─────────────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 PRODUCTION LAYER (Content Creation)             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Gemini Architect → Claude Performer → Gemini Auditor         │
│   (Blueprint)         (Draft)            (Verify)              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ CLAUDE CTO PROJECT (Full Awareness)

### System Instructions
Use: `instruction-performer.txt`

### Knowledge Base Files (~19 Core Files)

#### 🏛️ ARCHITECTURE & IDENTITY (6 files)
| # | File | Version | Purpose |
|---|------|---------|---------|
| 1 | `FIVE_PILLAR_SYSTEM_v5_2_MASTER_INDEX.md` | v5.2 | System map — overview of everything |
| 2 | `tech-architecture-3way.md` | **v5.2.1** | 3-Way agent coordination |
| 3 | `voice-dna.md` | v5.2 | Identity — WHO we are |
| 4 | `constitution.md` | v4.3.2 | Laws — bans & requirements |
| 5 | `content-engine.md` | v4.5.1 | Content modes (S/A/B/C) |
| 6 | `tech-archive-layout-fix.md` | **v1.0** | **NEW:** System benchmark |

#### ⚙️ MAIN PROTOCOL & DATA (3 files)
| # | File | Version | Purpose |
|---|------|---------|---------|
| 7 | `framework-deep-dive.md` | v4.5.5 | Deep Dive engine |
| 8 | `data-nhes-vii.md` | v1.0 | Health data benchmarks |
| 9 | `data-flagship-article.md` | — | Quality benchmark example |

#### 🧰 EXECUTION TOOLBOX (4 files — for awareness)
| # | File | Version | Purpose |
|---|------|---------|---------|
| 10 | `tech-bridge-lab.md` | v4.6.2 | 25 analogies — know what's available |
| 11 | `data-terminology.md` | v4.3 | 35 verified terms |
| 12 | `data-citation-template.md` | v1.1 | Citation formats |
| 13 | `data-thai-handshake-exceptions.md` | v4.3.1 | Formatting rules |

#### 🚀 EXTENSIONS & CAPABILITIES (4 files — for awareness)
| # | File | Version | Purpose |
|---|------|---------|---------|
| 14 | `EXTENSION_Lemon8_Carousel_v1_1.md` | v1.1 | Carousel creation capability |
| 15 | `visual-engine.md` | **v3.0** | Visual style guide |
| 16 | `instruction-notebooklm-protocol.md` | v4.5 | Audio/podcast content |
| 17 | `instruction-platform-setup.md` | v1.3 | Platform configuration |

#### 🤖 AGENT CONFIGURATIONS (2 files)
| # | File | Version | Purpose |
|---|------|---------|---------|
| 18 | `instruction-performer.txt` | **v5.5** | Know what Agent 2 does |
| 19 | `instruction-auditor-setup.md` | v5.4 | Know what Agent 3 does |

---

### ❌ FILES TO DELETE (Truly Superseded)

| File | Reason |
|------|--------|
| `instruction-cto-config.md_v5_4_REVISED.md` | **Replaced by v6.6.1** |
| `tech-architecture-3way.md_v5_2_BULLETPROOF.md` | **Replaced by v5.2.1** |
| `instruction-gemini-cto.txt_v6_6_STRATEGIC_CONSULTANT.txt` | **Replaced by v6.6.1** |
| `Deep_Dive_UNLEASHED_Protocol_v4_3_5.md` | Superseded by GSB_Kane v4.5.5 |
| `Voice_DNA_v4_3_SUPPLEMENTARY_NOTES.md` | Superseded by v5.2 CORE |
| `voice-dna.md_v5_1_CORE.md` | Replaced by v5.2 |
| `framework-deep-dive.md_v4_5_4_OPTIMIZED.md` | Replaced by v4.5.5 |
| `instruction-performer.txt_v5_4.md` | **Replaced by v5.5** |
| `NHES_VII_PATCH_HANDOVER_v1.md` | Transition doc — integrated |
| `NHES_VII_PATCH_PROTOCOL_v2025_11.md` | Superseded by ENHANCED |
| `NHES_VII_PATCH_PROTOCOL_v2025_11_ENHANCED.md` | Integrated into Master Reference |
| `NHES_VII_Quick_Reference_Card.md` | Redundant with Master Reference |
| `CHANGELOG_v5_0_Nov27.md` | Historical — archive externally |
| `ENGINE_BRANDING_PACKAGE_v1_0.md` | Marketing assets, not system |
| `KNOWLEDGE_BASE_UPLOAD_CHECKLIST_v1_0.md` | Replaced by this config |
| `TRIGGER_PHRASES_v4_5_2_QUICK_REFERENCE.md` | Embedded in Performer v5.5 |
| `PROMPTS_LIBRARY_v4_3.md` | Content embedded in other files |
| `Standalone_Visual_Generator_v1_0.md` | **Replaced by PILLAR_5 v3.0** |
| `WORKFLOW_Content_Waterfall_v1_1.md` | Integrated into Content Engine |

**Total to Delete: ~18 files**

---

### 📊 CLAUDE CTO — SUMMARY

| Category | Count | Purpose |
|----------|-------|---------|
| Architecture & Identity | 6 | Core system design + benchmark |
| Protocol & Data | 3 | Main engine + benchmarks |
| Execution Toolbox | 4 | Know available tools |
| Extensions & Capabilities | 4 | Know what we can do |
| Agent Configurations | 2 | Know how agents work |
| **TOTAL KEEP** | **19** | Full awareness |
| **TOTAL DELETE** | **~18** | Superseded only |

---

## 2️⃣ GEMINI CTO (Quick Tasks — 10 File Limit)

### System Instructions
Use: `instruction-gemini-cto.txt`

### Knowledge Base Files (10 Initial)

| # | File | Version | Priority |
|---|------|---------|----------|
| 1 | `FIVE_PILLAR_SYSTEM_v5_2_MASTER_INDEX.md` | v5.2 | 🔴 System map |
| 2 | `tech-architecture-3way.md` | **v5.2.1** | 🔴 Architecture |
| 3 | `voice-dna.md` | v5.2 | 🔴 Identity |
| 4 | `constitution.md` | v4.3.2 | 🔴 Laws |
| 5 | `content-engine.md` | v4.5.1 | 🟡 Structures |
| 6 | `framework-deep-dive.md` | v4.5.5 | 🟡 Protocol |
| 7 | `data-nhes-vii.md` | v1.0 | 🔴 Benchmarks |
| 8 | `data-terminology.md` | v4.3 | 🟡 Terms |
| 9 | `instruction-performer.txt` | **v5.5** | 🟡 Agent 2 |
| 10 | `data-flagship-article.md` | — | 🟢 Benchmark |

### Files to Upload Mid-Conversation (As Needed)

```
📎 tech-bridge-lab.md — For analogy questions
📎 data-thai-handshake-exceptions.md — For formatting audits
📎 data-citation-template.md — For citation audits
📎 instruction-auditor-setup.md — For compliance checks
📎 EXTENSION_Lemon8_Carousel_v1_1.md — For carousel questions
📎 visual-engine.md — For visual questions
📎 instruction-notebooklm-protocol.md — For audio/podcast questions
📎 tech-archive-layout-fix.md — For infrastructure debugging
```

---

## 3️⃣ TASK DIVISION: CLAUDE vs GEMINI CTO

| Task Type | Platform | Reason |
|-----------|----------|--------|
| Quick version check | **Gemini** | Fast, low token |
| Simple patch | **Gemini** | Low complexity |
| "Do we have X capability?" | **Claude** | Full awareness needed |
| Complex multi-file audit | **Claude** | All files loaded |
| New module creation | **Claude** | Dependency mapping |
| Strategic planning | **Claude** | Deep analysis |
| Benchmark evaluation | **Claude** | Detailed scoring |
| "Remind me about X workflow" | **Claude** | Extension files loaded |
| Daily maintenance | **Gemini** | Routine tasks |
| System-wide update | **Claude** | Full context required |
| Infrastructure debugging | **Claude** | Archive access needed |

---

## 4️⃣ VERSION ALIGNMENT CHECKLIST

After setup, verify these versions across BOTH platforms:

| Component | Required Version | Claude CTO | Gemini CTO |
|-----------|------------------|------------|------------|
| Voice DNA | **v5.2** | ☐ | ☐ |
| Brand Constitution | v4.3.2 | ☐ | ☐ |
| Content Engine | v4.5.1 | ☐ | ☐ |
| GSB Kane | **v4.5.5** | ☐ | ☐ |
| Architecture 3-Way | **v5.2.1** | ☐ | ☐ |
| LAB Bridge | v4.6.2 | ☐ | (on request) |
| NHES Reference | v1.0 | ☐ | ☐ |
| Terminology | v4.3 | ☐ | ☐ |
| Thai First Handshake | v4.3.1 | ☐ | (on request) |
| Quick Citation | v1.1 | ☐ | (on request) |
| Performer Instructions | **v5.5** | ☐ | ☐ |
| Sovereign Auditor | v5.4 | ☐ | (on request) |
| Lemon8 Extension | v1.1 | ☐ | (on request) |
| Visual Engine | **v3.0** | ☐ | (on request) |
| NotebookLM Protocol | v4.5 | ☐ | (on request) |
| Layout Collision Archive | **v1.0** | ☐ | (on request) |

---

## 5️⃣ NHES VII QUICK REFERENCE (Both CTOs)

Embed these benchmarks for instant verification:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NHES VII BENCHMARKS (2568)
Source: คณะแพทยศาสตร์รามาธิบดี + สวรส. + สสส.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Obesity (BMI ≥ 25):     45.0%
Diabetes Prevalence:    10.6%
Undiagnosed Diabetes:   27.0%
Hypertension:           29.5%
Undiagnosed HTN:        47.8%
Sodium Intake:          3,650 mg/day
High Sodium:            88.2%
Depression (BKK 15-29): 11.3%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 FLAG: NHES 6 cited as "current"
🔴 FLAG: Obesity <40% or >50%
🔴 FLAG: Undiagnosed DM <20% or >35%
```

---

## 6️⃣ CAPABILITY QUICK REFERENCE (Claude CTO)

When user asks about capabilities, CTO should know:

| Capability | File | What It Does |
|------------|------|--------------|
| **Carousels** | `EXTENSION_Lemon8_Carousel_v1_1.md` | Multi-slide social content |
| **Visuals** | `visual-engine.md` | Visual style guide + Nart mascot |
| **Audio/Podcast** | `instruction-notebooklm-protocol.md` | NotebookLM integration |
| **Deep Dives** | `GSB_Kane_v4_5_5` | Long-form articles |
| **Quick Magnets** | `PILLAR_3_v4_5_1` | Short-form content |
| **Kane Editions** | `PILLAR_3_v4_5_1` | Medium analysis pieces |
| **Analogies** | `tech-bridge-lab.md_v4_6_2` | 25 pre-built metaphors |
| **Infrastructure Debug** | `tech-archive-layout-fix.md_v1_0` | Layout collision fix |

**CTO Response Pattern:**
> "We already have that capability! Use `[filename]` — it handles [specific use case]."

---

## 7️⃣ INFRASTRUCTURE QUICK REFERENCE (Both CTOs)

When user asks about infrastructure:

| Component | Current | Notes |
|-----------|---------|-------|
| **Framework** | Next.js 16.0.8 | App Router, SSG |
| **CMS** | Payload 3.0 | Embedded, Local API |
| **Database** | Neon (Postgres) | Transaction Pooler |
| **Hosting** | Vercel | Serverless Functions |
| **Storage** | Vercel Blob | Free Tier (R2 for scale) |
| **Node** | 20 LTS | ENFORCED — no Node 24 |

**Architecture Pattern:** Duplex Layout Strategy
- Root layout = pass-through
- Route groups = isolated HTML shells
- Reference: `tech-archive-layout-fix.md`

---

## 8️⃣ SETUP CHECKLIST

### Claude CTO Project:
- [ ] Update System Instructions (or use current project setup)
- [ ] Upload `tech-architecture-3way.md` (replaces v5.2)
- [ ] Upload `tech-archive-layout-fix.md` (NEW)
- [ ] Upload `instruction-performer.txt` (replaces v5.4)
- [ ] Delete ~18 superseded files (see list above)
- [ ] Verify 19 core files remain
- [ ] Test: "What's our current infrastructure stack?"

### Gemini CTO Gem:
- [ ] Update Gem Instructions with `instruction-gemini-cto.txt`
- [ ] Upload `tech-architecture-3way.md` (replaces v5.2)
- [ ] Remove old versions (v5.2 Architecture, v6.6 CTO prompt)
- [ ] Test: "What database do we use?"

---

## 📊 VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| **v6.6.1** | Dec 14, 2025 | **Sovereign Stack Edition:** Neon + Vercel + Payload 3.0, added Archive file, aligned with Gemini CTO v6.6.1 |
| v5.4 | Dec 4, 2025 | Twin CTO Setup, Full Awareness Philosophy |
| v5.3 | Nov 2025 | Initial configuration guide |

---

*CTO Project Configuration Guide v6.6.1*
*Sovereign Stack Edition — Full Awareness Philosophy*
*December 14, 2025*
