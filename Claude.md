# 🤖 CLAUDE AGENT CONTEXT — MELKOR OS ERA
**Role:** Agent 2B (Support & Construction)  
**Version:** 2.2 (Authoritative Sync — Dec 24, 2025)  
**Architecture:** Melkor OS v1.0 (Department 01: Nerd with Nart)

---

## ⚠️ CRITICAL: YOU ARE IN MELKOR OS NOW

The old single-app "nerd-with-nart" is **absorbed into Melkor OS** — a sovereign monorepo.

```
Melkor-OS/                          ← MONOREPO ROOT
├── GEMINI.md                       ← CTO Persona (Gemini CLI + Conductor)
├── product.md                      ← Master manifest
├── plan.md                         ← Utumno roadmap
│
├── memory/                         ← STRATEGIC LAYER (MOS-Level)
│   ├── STRATEGIC_MEMORY_LOG.md     ← Permanent decision log (AUTHORITY)
│   ├── memory-architecture.md      ← Memory hierarchy docs
│   └── sop-submodule-sync.md       ← Git submodule workflow
│
└── departments/
    └── nerd-with-nart/             ← DEPARTMENT 01 (Git Submodule)
        ├── CLAUDE.md               ← THIS FILE
        ├── GEMINI.md               ← Agent 2A department context
        ├── SYSTEM_STATE.md         ← Tactical state (10 Strategic Locks)
        │
        ├── nerd/
        │   ├── pillars/            ← Voice DNA, Constitution, etc.
        │   ├── agents/
        │   │   └── nart-avatar.ts  ← Mastra agent (Hybrid RAG)
        │   └── references/
        │       └── brochures/
        │           ├── library/    ← Cleaned markdown (LAYER 3 — PRIMARY)
        │           ├── pdfs/       ← Original PDFs (LAYER 2 — FALLBACK ONLY)
        │           ├── assets/     ← Images
        │           └── raw/        ← Staging area
        │
        └── mastra/
            └── tools/
                └── search_nerd_brain.ts  ← Vector search
```

---

## 🧠 MEMORY HIERARCHY (Lock #10 Active)

| Layer | Name | Location | Purpose | Authority |
|-------|------|----------|---------|-----------|
| **1** | Strategic Memory | `memory/STRATEGIC_MEMORY_LOG.md` | Long-term decisions | HIGHEST (MOS-Level) |
| **2** | Forensic Vault | `nerd/references/brochures/pdfs/` | Original PDFs | **FALLBACK ONLY** |
| **3** | Knowledge Library | `nerd/references/brochures/library/` + Vector DB | Cleaned markdown | **PRIMARY PRODUCTION** |

### ⚠️ HIERARCHY LAW (Lock #10)
> **Layer 2 (PDF Vault) is FORENSIC FALLBACK ONLY.**  
> **Primary production MUST use Layer 3 (Markdown/Vector).**

**When to use Layer 2:**
- ✅ Audit/Verification of disputed data
- ✅ Cross-checking markdown accuracy against source PDF
- ❌ NOT for standard content generation

**Conflict Rule:** `Strategic Memory > Vault (audit only) > Library > Vector DB`

---

## ⚙️ SOVEREIGN STACK

```
┌─────────────────────────────────────────────────────────────────┐
│  SOVEREIGN STACK (Enforced)                                     │
├─────────────────────────────────────────────────────────────────┤
│  Framework:    Next.js 15.5.9 (App Router)                      │
│  CMS:          Payload 3.0 (Embedded)                           │
│  Database:     Neon (Postgres) — nerd_brain: 488 rows           │
│  AI:           Mastra + Gemini 3 Flash                          │
│  Hosting:      Vercel (rootDirectory: departments/nerd-with-nart)│
│  Node:         20 LTS (ENFORCED — No Node 24)                   │
│  Styling:      Tailwind CSS v3.4 (Cannot upgrade to v4)         │
│  CTO:          Gemini CLI + Conductor (official, at Melkor root)│
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 STRATEGIC LOCKS (10 Permanent)

| # | Lock | Constraint |
|---|------|------------|
| 1 | **Hybrid Law** | Voice DNA in Prompt. Constitution in Vector. |
| 2 | **Identity Law** | Never use "พี่". Never use English Headers. |
| 3 | **Footer Law** | Use `📊 บทวิเคราะห์โดย...` template. No meta-text. |
| 4 | **Bridge Law** | Never expose `#009` or internal IDs in output. |
| 5 | **Production Law** | Cherry Studio + Mastra = Truth Source. |
| 6 | **Agent Law** | Performer MUST load `data-nhes-vii` and `tech-bridge-lab`. |
| 7 | **Fiduciary Law** | Proposal Generator bundles Multi-Pay CI + Total Care. |
| 8 | **RAG Law** | Pricing & Visa rules use `<rag_bridge_protocol>`. |
| 9 | **Brochure Law** | Cleaners MUST use `aia-lexicon.md`. |
| 10 | **Hierarchy Law** | Layer 2 = Forensic Fallback ONLY. Production uses Layer 3. |

---

## 🚫 EXPLICIT BANS

| Banned | Use Instead |
|--------|-------------|
| Next.js 16 | v15.5.9 |
| Hygraph | Payload CMS |
| Auto-Imports | Hard-wire Payload config |
| G: Drive MCP | Repository is the memory |
| Node 24 | Node 20 LTS |
| Tailwind v4 | v3.4 |
| Layer 2 for Generation | Layer 3 (Markdown/Vector) |
| Custom CTO scripts | Official Gemini CLI + Conductor |

---

## 📂 CORE KNOWLEDGE FILES

| Purpose | File |
|---------|------|
| Identity | `nerd/agents/nart-avatar.ts` |
| Tactical State | `SYSTEM_STATE.md` (this department) |
| Strategic Memory | `../../memory/STRATEGIC_MEMORY_LOG.md` (MOS-level) |
| Standards | `nerd/rules/` |
| Lexicon | `nerd/references/brochures/aia-lexicon.md` |
| CTO Persona | `../../GEMINI.md` (MOS root — for Gemini CLI) |

---

## 🤝 COLLABORATION PROTOCOL

1. **Read** `SYSTEM_STATE.md` for current tactical state
2. **Check** `nerd/rules/mastra-standards.md` before touching AI code
3. **Report** major changes via `SYSTEM_STATE.md` updates
4. **Reference** `/memory/STRATEGIC_MEMORY_LOG.md` for strategic decisions
5. **Use Layer 3** (Markdown/Vector) for all production work
6. **Use Layer 2** (PDF) only for audit/verification

---

## 🔄 SUBMODULE AWARENESS

This folder is a **Git Submodule** of Melkor OS.

**Melkor Save Protocol (Level 1):**
```bash
# Step 1: Commit in department (Child)
cd departments/nerd-with-nart
git add . && git commit -m "[MESSAGE]" && git push origin main

# Step 2: Update pointer in Melkor (Parent)
cd ../..
git add departments/nerd-with-nart
git commit -m "chore: update nerd-with-nart pointer" && git push
```

---

## 🛡️ SAFETY CONSTRAINTS

### Protected Files (Confirm Before Editing):
| File | Protection |
|------|------------|
| `memory/STRATEGIC_MEMORY_LOG.md` | APPEND-ONLY |
| `nerd/pillars/voice-dna.md` | HIGH |
| `nerd/pillars/constitution.md` | HIGH |
| `nerd/agents/nart-avatar.ts` | HIGH |
| `.env` / `.env.local` | FORBIDDEN |
| `payload.config.ts` | HIGH |

### Destructive Commands (Require Confirmation):
- `git reset --hard`
- `rm -rf`
- `DROP TABLE`
- `npm run db:push`

---

## 📊 VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| v2.2 | Dec 24, 2025 | Authoritative sync: Lock #10, CLI migration, Gemini CLI replaces custom scripts |
| v1.1 | Dec 23, 2025 | MOS migration, memory reference updated |
| v1.0 | Dec 22, 2025 | Phase F-LITE, Sovereign Mastra Architecture |

---

*CLAUDE.md — Department 01 Agent Context*  
*Melkor OS Era — Lock #10 Active*  
*"The Repository remembers. The Vector searches. The Prompt speaks."*
