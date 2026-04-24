# PILLAR SYSTEM — MASTER INDEX
## ประกันเนื้อๆ / beef.im Content Production Engine

**Updated:** 2026-04-24 (beef.im rebrand, v7.0)
**Architecture:** CLI-First Pipeline (Obsidian → CLI Skills → Payload CMS)

---

## THE FIVE PILLARS

### PILLAR 1 — VOICE DNA (Identity)
| File | Version | Purpose |
|------|---------|---------|
| [voice-dna.md](voice-dna.md) | v6.0 | Contract-forensicist identity, three modes (Forensic / Casual / Bridge), เน้นเนื้อๆ discipline, authority doctrine |

---

### PILLAR 2 — BRAND CONSTITUTION (Laws)
| File | Version | Purpose |
|------|---------|---------|
| [constitution.md](constitution.md) | v5.0 | Governing principles, absolute bans, fiduciary standard, content scope (insurance + meat), Footer Law (Lock #3) |

**Article summary:**
- §I Governing: True King, Fiduciary Oath, Sinek Filter, เน้นเนื้อๆ
- §II Bans: status terms, urgency manipulation, badge ban, internal leak
- §III Privacy: children initials, personal info
- §IV Fiduciary: multi-option rule, disadvantage disclosure
- §V Evidence: evidence tiers, no-prediction rule, pre-ship tests
- §VI Content scope: insurance + meat parallel tracks, filter principle
- §VII Footer Law: 📊/🔥 templates, inline length-gated, visual overlay
- §VIII Regulatory: OIC/IC license scope, permitted/prohibited
- §IX Enforcement: violation tiers, oath, monthly audit

---

### PILLAR 3 — CONTENT ENGINE (Modes)
| File | Version | Purpose |
|------|---------|---------|
| [content-engine.md](content-engine.md) | v4.5.1 | Content modes S/A/B/C, triggers, platform guidelines |

---

### PILLAR 4 — FRAMEWORK DEEP DIVE (Protocol)
| File | Version | Purpose |
|------|---------|---------|
| [framework-deep-dive.md](framework-deep-dive.md) | v4.5.6 | Deep Research protocol, NHES VII hard-check, Sinek Filter, 4-step deep dive |

---

### PILLAR 5 — VISUAL ENGINE (Style)
| File | Version | Purpose |
|------|---------|---------|
| [visual-engine.md](visual-engine.md) | v3.0 | ประกันเนื้อๆ color palette (Navy/Teal/Amber), branded props, visual mode system, platform aspect ratios |

---

## SUPPORT FILES

### Terminology & Formatting
| File | Version | Purpose |
|------|---------|---------|
| [data-terminology.md](data-terminology.md) | v4.3 | 35 verified terms, Thai-First format |
| [data-thai-handshake-exceptions.md](data-thai-handshake-exceptions.md) | v4.3.1 | Exception rules (SEC, Apple, Ray Dalio, etc.) |
| [data-citation-template.md](data-citation-template.md) | v1.1 | Citation formats: TMO, NHES, OIC |

### Content Library
| File | Version | Purpose |
|------|---------|---------|
| [tech-bridge-lab.md](tech-bridge-lab.md) | v4.6.2 | 25 verified analogies/bridges (#001–#025) |

### Reference Data
| File | Version | Purpose |
|------|---------|---------|
| [data-nhes-vii.md](data-nhes-vii.md) | v1.0 | Hard-coded health statistics NHES VII (2568): Obesity 45%, DM 10.6%, Undiagnosed DM 27.0% |
| [data-proposal-logic.md](data-proposal-logic.md) | — | Proposal logic for insurance proposal generator |

---

## CLI SKILLS

| Skill | Role | Command |
|-------|------|---------|
| `/architect` | Blueprint from topic + pillars | `/architect [topic] [mode: S\|A\|B\|C]` |
| `/performer` | Execute blueprint into Thai article | `/performer [blueprint or topic]` |
| `/auditor` | 6-point compliance audit | `/auditor [paste article]` |
| `/produce-article` | Full pipeline: architect → performer → auditor | `/produce-article [topic] [mode]` |
| `/hybrid` | One-shot (Mode S/A, skip 3-agent split) | `/hybrid [topic] [mode]` |
| `/publish` | Publish to Payload CMS | `/publish` |

Skills auto-load relevant pillar files from `nerd/pillars/`. Definitions at `.claude/skills/`.

---

## AGENT INSTRUCTIONS

| File | Role |
|------|------|
| [nard/agents/instruction-architect.md](../agents/instruction-architect.md) | Blueprint agent |
| [nard/agents/instruction-performer.md](../agents/instruction-performer.md) | Performer agent (slim XML) |
| [nard/agents/performer.md](../agents/performer.md) | Performer universal (full instructions) |
| [nard/agents/instruction-auditor-Sonnet.md](../agents/instruction-auditor-Sonnet.md) | Sonnet auditor |
| [nard/agents/instruction-sovereign-auditor.md](../agents/instruction-sovereign-auditor.md) | Sovereign auditor |
| [nard/agents/instruction-hybrid-architect-builder.md](../agents/instruction-hybrid-architect-builder.md) | Hybrid agent |
| [nard/agents/instruction-proposal-generator.md](../agents/instruction-proposal-generator.md) | Proposal generator |
| [nard/agents/instruction-ocr-cleaner.md](../agents/instruction-ocr-cleaner.md) | OCR/brochure cleaner |
| [nard/agents/nart-avatar.ts](../agents/nart-avatar.ts) | Identity avatar (protected) |

---

## CONTENT WORKFLOW (v6.0)

```
Obsidian seeds/ → (Gemini Deep Research when needed) → /architect → /performer → /auditor → /publish → Payload CMS
```

**Thai model routing (per `.claude/rules/thai-model-routing.md`):**
- Short/mid (S, A): Qwen3.6 Plus draft → Sonnet 4.6 audit
- Flagship (B, C): Kimi K2.6 draft → Sonnet 4.6 audit

**Escalation:** `/auditor` = every article. Gemini Gem #4 = regulatory-sensitive content needing live web verification.

---

## QUALITY CONTROL

### Pre-Publication
| Check | Standard |
|-------|----------|
| Thai-First ratio | ≥85% |
| Meta-labels | Stripped |
| Headers | Pure Thai |
| Inline watermark | 0 for ≤800w / 1 for 1,200–1,600w / ≤2 for flagship |
| Footer watermark | 📊 or 🔥 + `#ประกันเนื้อๆ` — every post |
| Visual overlay | `beef.im` faint overlay on every chart/table/image |
| Banned words | Zero |
| Compliance | No drug names, no dosage, no diagnostic verdict |

### Auditor 6-Point Compliance
| Check | Domain |
|-------|--------|
| 1 | PDPA — PII scan (names, IDs, policy numbers) |
| 2 | OIC/SEC — products, claims, market conduct, Unit-Linked |
| 3 | Revenue Code — tax deductions, annuity conditions |
| 4 | FDA/อย. — no therapeutic claims for non-drugs |
| 5 | Actuarial — premium benchmarks, TMO 2017 |
| 6 | Brand DNA — banned words, Thai-First, tone, compliance boundaries |

---

## TONE MATRIX

| ID | Mode | Influences | Use Case |
|----|------|-----------|----------|
| T1 | Benevolent Teacher | Naval + Dalio | 90% of content (default) |
| T2 | Stern Guardian | JQA + Naval | Scams, unit-linked teardowns, uncomfortable truths |
| T3 | Sunday Letter | Dalio + Naval | Philosophy, mindset, essay |
| T4 | Case Builder | Lawyer + Actuary | Formal letters (AIA/OIC/Gov) |
| T5 | Custom | User-defined | "Write like [X]..." |

---

## QUICK REFERENCE

```
┌──────────────────────────────────────────────────────────────┐
│          ประกันเนื้อๆ / beef.im — CONTENT ENGINE v7.0        │
├──────────────────────────────────────────────────────────────┤
│  CLI: /architect → /performer → /auditor → /publish          │
│  One-shot: /produce-article [topic] [mode]                   │
│  Quick: /hybrid [topic] S                                    │
│                                                              │
│  THAI MODELS: Qwen (S/A draft) · Kimi (B/C draft)           │
│               Sonnet 4.6 (audit) · Opus (strategy)          │
│                                                              │
│  MANDATORY CHECKS:                                           │
│  ✓ NHES VII: Obesity 45%, DM 10.6%, Undiagnosed 27.0%       │
│  ✓ Sinek Filter: confirm believers, not convince cynics      │
│  ✓ Paradox Architecture: Myth → Evidence → Logic → Solution  │
│  ✓ Thai-First Handshake 85/15                                │
│  ✓ No drug names / dosage / diagnostic verdict               │
│                                                              │
│  WATERMARK: 📊 finance · 🔥 meat · #ประกันเนื้อๆ            │
│  SOURCES: TMO 2017 · NHES VII · OIC · NSO · Revenue Code    │
│                                                              │
│  ⚠️  Run /auditor before publishing                         │
│  ⚠️  Escalate to Gem #4 for regulatory-sensitive content     │
└──────────────────────────────────────────────────────────────┘
```

---

## TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| English headers in output | Check Thai-First file loaded in skill |
| Meta-labels in output | Remind: "Strip all labels" |
| Wrong premium numbers | Check GSB Kane actuarial benchmarks |
| Wrong tax amounts | Revenue Code: Life=100K, Health=25K, Annuity=200K (conditions) |
| `/auditor` misses regulatory change | Escalate to Gemini Gem #4 |
| Drug names in draft (Qwen) | Strip per `content-compliance-boundaries.md` — always |
| Thai-First violations (Qwen) | Re-wrap every bare English term manually |
| Token bleed in Mode B (Qwen) | Switch to Kimi K2.6 for flagship |
| OLD NHES data cited | NHES VII (2568): Obesity 45%, DM 10.6% |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| **v7.0** | 2026-04-24 | beef.im rebrand. Updated pillar versions (voice-dna v6.0, constitution v5.0). Removed stale file references (instruction-notebooklm-protocol, instruction-auditor-setup, tech-architecture-3way, instruction-platform-setup, sovereign-phrases). Updated watermark counts to length-gated system. Added Kimi/Qwen Thai model routing. Updated brand throughout. |
| v6.0 | 2026-03-25 | CLI-First Pipeline: Gem #2 → `/architect`, Gem #4 → `/auditor` (primary) + Gem #4 (escalation), Obsidian intake layer |
| v5.x | 2025-11/12 | Pre-CLI-First: 3-Way Architecture, Tone Matrix, NHES VII integration |

---

*ประกันเนื้อๆ / beef.im — Content Production Engine*
*CLI-First Pipeline — Obsidian Intake + Gemini Research + CLI Skills*
*2026-04-24*
