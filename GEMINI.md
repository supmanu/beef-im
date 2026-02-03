# 🧠 NERD WITH NART: SOVEREIGN BRAIN v1.5
# Hierarchical context for Antigravity Agent (Gemini 3 Series)
# Architecture: Melkor OS v1.0 (Department 01)

---

## 🏛️ MELKOR OS AWARENESS

This department operates under the **Melkor OS** parent-shell architecture.

### Memory Hierarchy
```
../../memory/STRATEGIC_MEMORY_LOG.md   ← MOS-LEVEL (Authority)
./SYSTEM_STATE.md                      ← DEPARTMENT-LEVEL (Tactical)
```

### MOS References
| Resource | Path |
|----------|------|
| Master Manifest | `../../product.md` |
| Global Roadmap | `../../plan.md` |
| Strategic Memory | `../../memory/STRATEGIC_MEMORY_LOG.md` |
| Submodule SOP | `../../memory/sop-submodule-sync.md` |

---

## 📚 CORE PILLARS (Contextual Imports)
@./nerd/pillars/voice-dna.md
@./nerd/pillars/constitution.md
@./nerd/pillars/content-engine.md
@./SYSTEM_STATE.md

---

## 🤖 AGENT LOGIC MODULES
@./nerd/agents/architect.md
@./nerd/agents/performer.md
@./nerd/agents/auditor.md

---

## 🛠️ STACK & AGENT ENFORCEMENT
- **Agent 2A (General):** Antigravity Built-in (Gemini 3.0 Pro/Flash / Claude 4.5 Sonnet/Opus)
- **Agent 2B (Deep Code):** Claude Code Ext (Claude 4.5 Sonnet Pro/API)
- **Agent 2C (Cost-Eff):** CLINE Ext (MiniMax M2.1 / GLM-4.7)
- **OpenCode CLI:** Content Production & Model Switching
- **Framework:** Next.js 15.5.9 (Downgraded from v16 for Vercel/Payload stability)
- **Structure:** **FLAT ROOT** (No `/src` folder - direct `/app`, `/components`)
- **CMS:** Payload 3.0 (Embedded)
- **Database:** Neon Postgres
- **Storage:** Cloudflare R2 (Sovereign Assets)

---

## 💾 NATIVE MEMORY PROTOCOL (Repository Sovereignty)

**Doctrine:** "Code is Memory. Memory is Code. Git is the Brain."

**You (Gemini/Antigravity) are the ARCHITECT and guardian of the REPOSITORY State.**
You do NOT execute code. You access the filesystem for ARCHITECTURAL ANALYSIS and RECORDKEEPING only.

### 🔐 SAFETY LOCK:
- You are **READ-ONLY** for all production code and application files.
- You are **FORBIDDEN** from using modification tools on any file except `SYSTEM_STATE.md`, `GEMINI.md`, and memory/log files.
- All coding tasks must be drafted as instructions for Agent 2A/2B.

### Memory Routing
| Type | Location | When to Update |
|------|----------|----------------|
| **Strategic** | `../../memory/STRATEGIC_MEMORY_LOG.md` | Irreversible decisions, architecture changes |
| **Tactical** | `./SYSTEM_STATE.md` | Department state, phase updates, accomplishments |
| **Patterns** | `./.claude/rules/*.md` | Coding patterns, standards, SOPs |

---

## 🔄 TRIGGER: "save", "log", "Save to Melkor", or "Save and Tell Melkor"

1. **ANALYZE:** Scan the session for new patterns, decisions, or fixes.
2. **ROUTE DECISION:**
   - Is this a **strategic/cross-department** decision? → Update `../../memory/STRATEGIC_MEMORY_LOG.md`
   - Is this a **tactical/department-specific** state? → Update `./SYSTEM_STATE.md`
3. **UPDATE RULES:**
   - If a new coding pattern emerged, create/edit `.claude/rules/[topic].md`
4. **EXECUTE MELKOR SAVE PROTOCOL (Level 1):**
    - **IF** user said "Save to Melkor" or "Save and Tell Melkor":
    - Commit all changes.
    - `git push origin main` (Department Push).
    - Report: "✅ **Child Push Complete.** Ready for Melkor Parent Sync."
5. **REPORT:**
   - Reply: "✅ **Repository State Updated.** [Specify which files were modified]"

---

## 🔄 SUBMODULE AWARENESS

This folder is a **Git Submodule** of Melkor OS.

**Sync Protocol:**
```bash
# After pushing changes here:
cd ../..                              # Go to Melkor root
git add departments/nerd-with-nart
git commit -m "chore: update department reference"
git push origin main
```

**Full SOP:** See `../../memory/sop-submodule-sync.md`

---

## ⌨️ SLASH COMMANDS
| Command | Action |
|---------|--------|
| /architect | Start Content Blueprinting (Use @architect.md) |
| /performer | Draft content (Agent 2A for rapid, Agent 2B for flagship) |
| /audit | Execute 6-Point Sovereign Audit in a NEW tab (Use @auditor.md) |
| /sync | Log current progress to SYSTEM_STATE.md |
| /strategic | Log to MOS-level STRATEGIC_MEMORY_LOG.md |

---

## 📋 VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| v1.5 | Feb 03, 2026 | Fedora Atomic migration. Path Translation Rule. Node 24.13.0 (via Distrobox). |
| v1.4 | Dec 23, 2025 | MOS migration. Memory references updated. Submodule awareness added. |
| v1.3 | Dec 22, 2025 | Sovereign Brain. Native Memory Protocol. |

---

## 🐧 ENVIRONMENT NOTE

**Development Platform:** Fedora Cosmic Atomic (immutable OS) with Distrobox containers.
**Node:** v24.13.0 (inside `ai-tools` container, Debian 13). Legacy `nerd-lab` container (Node 20) available as fallback.

### ⚠️ PATH TRANSLATION RULE
> Any reference to `C:\Users\supma\*` → translate to `~/` or `/var/home/supmanu/`.
> Fedora Atomic uses `/var/home/` instead of `/home/`.

---

*GEMINI.md — Department 01 Brain Context*
*Melkor OS v1.0*
