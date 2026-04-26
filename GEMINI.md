# 🧠 NERD WITH NART: SOVEREIGN BRAIN v2.2
# Hierarchical context for Antigravity Agent (Gemini 3 Series)
# Architecture: Melkor OS v1.0 (Department 01)
# Updated: Apr 26, 2026 — Astro/MDX pivot. Active scaffolding plan: docs/beef-im-astro-deployment-plan.md

---

## 🏛️ MELKOR OS AWARENESS

This department operates under the **Melkor OS** parent-shell architecture.

### Memory Hierarchy
```
../../docs/wiki/                       ← FLEET-LEVEL (NixOS, Stow, Niri, agents)
./SYSTEM_STATE.md                      ← DEPARTMENT-LEVEL (Tactical)
./.claude/rules/                       ← Department rules (auto-loaded)
```

`../../memory/STRATEGIC_MEMORY_LOG.md` was retired Apr 17, 2026 (tombstone only). Strategic decisions now live in `../../CLAUDE.md` version history + the fleet wiki.

### MOS References
| Resource | Path |
|----------|------|
| Fleet CTO context | `../../CLAUDE.md` |
| Fleet wiki | `../../docs/wiki/` (index, log, current-status) |
| Submodule sync | See `./CLAUDE.md` § Submodule Save Protocol |

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

### Agent Fleet
| Agent | Interface | Model | Role |
|-------|-----------|-------|------|
| **Agent 2A** | Antigravity Built-in | Gemini 3 Pro/Flash, Claude Sonnet/Opus 4.6 | Primary Workhorse |
| **Agent 2B** | Claude Code CLI | Claude Sonnet 4.6 / Opus 4.6 | Deep Code + CLI Skills |
| **Agent 2C** | CLINE Extension | MiniMax M2.7 | Cost-Optimized Routine |

### Sovereign Stack (post-pivot, Apr 26, 2026)
| Component | Version |
|-----------|---------|
| **Framework** | Astro 4.x (Static, Zero-JS by default) |
| **Interactive** | React 19 inside Astro Islands (`client:load` / `client:visible`) — calculators only |
| **CMS** | Git (MDX in `src/content/`) — Emdash deferred to post-launch |
| **Database** | None |
| **Storage** | Cloudflare R2 (`beef-assets` bucket, sovereign) |
| **AI** | Claude Code CLI Skills (production) — Mastra ARCHIVED Apr 21 |
| **Node** | 24 LTS (nixpkgs, system-managed) |
| **Styling** | Tailwind CSS v4 (CSS-first config) |
| **Structure** | `src/` (Astro convention) — flat-root rule retired Apr 26 |
| **Hosting** | Cloudflare Pages (target) — Vercel retired with Next.js |
| **Intake** | Obsidian (vault: `nerd/`) |
| **Legacy** | `_archive/nextjs-legacy/` — Next.js 16 + Payload 3.80 + Neon (preserved for calculator port + reference) |
| **Prior Art** | `~/Projects/astro-nerd/` — Astro 6.1 port (95–97% visual parity validated Apr 6) |

---

## 🔁 CONTENT PIPELINE (v6.0 — CLI-First, Astro/MDX target)

```
Obsidian seeds/ → Gemini Deep Research → /architect → /performer → /auditor → /publish → src/content/*.mdx
                   (when needed)         (blueprint)  (write)      (comply)   (auto)      → Cloudflare Pages
```

| Step | Tool | Who |
|------|------|-----|
| **Capture** | Obsidian `nerd/seeds/` | Human |
| **Research** | Gemini Deep Research | **You (Gemini)** — irreplaceable |
| **Blueprint** | `/architect` CLI skill | Agent 2B |
| **Write** | `/performer` CLI skill | Agent 2B |
| **Audit (primary)** | `/auditor` CLI skill | Agent 2B |
| **Audit (escalation)** | Gemini Gem #4 | **You (Gemini)** — regulatory web search |
| **Publish** | `/publish` CLI skill → MDX with frontmatter + notebook components → Cloudflare Pages | Agent 2B (skill needs rewrite for MDX target — see deployment plan §"Out of Scope") |

**Your unique roles:** Research (web-scale synthesis) + Escalation Audit (live regulatory verification).

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
| **Fleet** | `../../docs/wiki/<topic>.md` + `../../CLAUDE.md` version history | Cross-department or NixOS/infra decisions |
| **Tactical** | `./SYSTEM_STATE.md` | Department state, phase updates, accomplishments |
| **Patterns** | `./.claude/rules/*.md` | Coding patterns, standards, SOPs |

`STRATEGIC_MEMORY_LOG.md` retired Apr 17, 2026 — do NOT write to it.

---

## 🔄 TRIGGER: "save", "log", "Save to Melkor", or "Save and Tell Melkor"

1. **ANALYZE:** Scan the session for new patterns, decisions, or fixes.
2. **ROUTE DECISION:**
   - Is this a **fleet/cross-department** decision? → Update `../../docs/wiki/<topic>.md` + bump `../../CLAUDE.md` version history
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
| /architect | Run `/architect` CLI skill (or draft blueprint manually in Antigravity) |
| /performer | Draft content (Agent 2A for rapid, Agent 2B `/performer` for flagship) |
| /audit | Run `/auditor` CLI skill (primary) or Gemini Gem #4 (escalation for regulatory) |
| /sync | Log current progress to SYSTEM_STATE.md |
| /publish | Convert .md to MDX article in `src/content/{case,experiment,field-note}/` (auto-wraps with notebook components: MarginNote, ScrapCard, CorrectionBlock, VerdictSeal, Highlight) |
| /strategic | DEPRECATED — STRATEGIC_MEMORY_LOG retired Apr 17, 2026. Use fleet wiki + CLAUDE.md version history instead. |

---

## 📋 WIKI SESSION PROTOCOL

**Fleet wiki:** `../../docs/wiki/` — NixOS, Stow, Niri, hardware, agents.

**Session start** (read these when doing fleet/infra work):
- `../../docs/wiki/log.md`
- `../../docs/wiki/current-status.md`
- `../../docs/wiki/index.md`

**Full protocol** (session start checklist, frontmatter spec, 3-tier maintenance, log.md discipline): `../../docs/wiki/_protocol.md`.
**Writeback:** If department state changed, update `SYSTEM_STATE.md` first, then relevant wiki page.
**Content knowledge** lives in `nerd/` (Obsidian vault) — not in the wiki. Wiki = fleet ops. Obsidian = content intelligence.
**Note:** Datacore MCP fires automatically in Claude Code sessions (session.start/session.end). Not available here.

---

## 📋 VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| **v2.3** | Apr 26, 2026 | Astro pivot scaffolding plan ready (`docs/beef-im-astro-deployment-plan.md`). Stack table updated: `src/` (not flat root), Cloudflare Pages (not Vercel), Mastra archived removed from active stack. Memory routing: STRATEGIC_MEMORY_LOG retired references purged; routes to fleet wiki + CLAUDE.md instead. /strategic command deprecated. /publish path updated to `src/content/{case,experiment,field-note}/`. |
| **v2.2** | Apr 26, 2026 | Strategic Pivot: Dropped Next.js/Payload/Neon. Migrating to Astro + Emdash + MDX for Zero-JS "Notebook" aesthetic. |
| **v2.1** | Mar 29, 2026 | /publish skill: zero-touch .md → Payload CMS publishing. Mastra RAG confirmed non-core. .md is the standard (not .mdx). Strategic stack review: keep Payload + Next.js, Neon exit plan ready. |
| v2.0 | Mar 25, 2026 | v6.0 pipeline: CLI Skills for production, Gemini reserved for Research + Escalation Audit. Stack updated (Next.js 16.2.1, Node 24, Tailwind v4.2, Payload 3.80.0). Obsidian intake layer. |
| v1.8 | Mar 23, 2026 | Mastra Vector DB Migration + Claude Code Skills |
| v1.7 | Feb 04, 2026 | Native NVM Protocol v5.0: Retired Distrobox containers |
| v1.6 | Feb 19, 2026 | NixOS 26.05 migration. Rule D (Shebang Law). |
| v1.5 | Feb 03, 2026 | Fedora Atomic migration. Path Translation Rule. |
| v1.4 | Dec 23, 2025 | MOS migration. Memory references updated. |
| v1.3 | Dec 22, 2025 | Sovereign Brain. Native Memory Protocol. |

---

## 🐧 SYSTEM ARCHITECTURE: NIXOS 26.05 YARARA

**You (Gemini CLI) are running NATIVELY on the host.**

### Architecture Model
| Layer | Role | Constraint |
|-------|------|------------|
| **1. Host** | NixOS 26.05 Yarara (declarative) | Config via `configuration.nix`. No `apt`/`dnf`/`rpm-ostree`. Use `nixos-rebuild switch`. |
| **2. GUI** | Flatpak (sandboxed apps) | Cannot launch via bare CLI names. |
| **3. Dev/CLI** | System Node 24 (nixpkgs) | `npm install -g` → `~/.npm-global` (Gemini CLI only). |

### Operational Rules
- **Rule A:** AI CLIs use native installers. Gemini CLI uses npm (`~/.npmrc` sets `prefix=${HOME}/.npm-global`).
- **Rule B:** Node 24 via `pkgs.nodejs_24` (system-managed). Fallback: `nix-shell -p nodejs_20`.
- **Rule C:** Translate `C:\Users\supma\*` → `~/` or `/home/supmanu/`. NixOS uses `/home/`.
- **Rule D:** Scripts MUST use `#!/run/current-system/sw/bin/bash`. NixOS has no `/bin/bash`.

---

*GEMINI.md — Department 01 Brain Context*
*Melkor OS v1.0 — v6.0 CLI-First Pipeline*
