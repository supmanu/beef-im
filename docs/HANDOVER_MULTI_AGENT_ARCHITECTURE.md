# Handover Document: Nerd with Nart Multi-Agent Architecture

**To:** Gemini CTO (Webapp) & Claude CTO (Webapp)
**From:** Agent 2B (Antigravity IDE - Claude Code Extension)
**Date:** December 18, 2025
**Subject:** Development Architecture & Memory System Integration Guide

---

## 🎯 Executive Summary

The Nerd with Nart project operates a **dual-environment, four-agent architecture**:

1. **Antigravity IDE Agents** (Local Development - This Environment)
   - **Agent 2A (Strategist):** MCP cloud memory, strategic decisions, architecture oversight
   - **Agent 2B (Builder):** File-based memory, implementation work, pattern documentation

2. **Webapp CTOs** (External - Your Environment)
   - **Gemini CTO:** Heavy lifting, bulk implementations, routine coding
   - **Claude CTO:** Precision work, complex logic, quality-critical sections

This document explains how the Antigravity agents operate, how we manage memory across sessions, and how you should integrate with our established patterns.

---

## 🏗️ Architecture Overview

### Current Stack (Production Ready - Phase IV Complete)
- **Framework:** Next.js 15.5.9 (App Router) + React 19.0.0
- **CMS:** Payload 3.0 (Self-hosted, data sovereign)
- **Database:** Neon Postgres (Serverless)
- **Storage:** Cloudflare R2 (S3-compatible)
- **Styling:** Tailwind CSS v3.4.17 (Teal Protocol)
- **Node Version:** v20.18.0 LTS (strictly enforced)

### Project Status
- **Phase I-III:** ✅ Complete (Engine restoration, storage sovereignty, content migration)
- **Phase IV:** ✅ Complete (Intelligence Suite + Homepage Migration)
- **Current State:** Production-ready, fully sovereign infrastructure
- **Build Status:** Clean (Exit code: 0)

---

## 🧠 Memory System Architecture

### Agent 2A Memory (Strategic - MCP Cloud)
**Location:** MCP Memory Server (G:\My Drive\_AI_MEMORY\Nerd_Brain\)
**Persistence:** Semantic search across all sessions
**Access:** Agent 2A only (Antigravity built-in chat)

**What's Stored:**
- Strategic decisions (WHY we chose something)
- Architectural laws (tech stack constraints)
- Brand decisions (Teal Protocol, typography)
- "Never do X" / "Always do Y" rules
- Vendor/technology choices and rationale
- Long-term project direction

**How to Search:**
```typescript
// Agent 2A can search with:
mcp__claude-mem__chroma_query_documents([
  "nerd-with-nart [topic] [date]"
])
```

**Key Principle:** Agent 2A holds the "soul" of the project - the strategic vision and immutable laws.

---

### Agent 2B Memory (Tactical - File-Based Git)
**Location:** `.claude/rules/*.md` files (committed to git)
**Persistence:** Git history + auto-loaded each session
**Access:** Agent 2B (Claude Code Extension) + YOU (readable)

**What's Stored:**
- Implementation patterns (HOW to implement)
- Configuration examples (code snippets)
- Common error solutions
- Team conventions
- CLI commands and workflows
- Framework-specific patterns

**Key Files:**
- [CLAUDE.md](../CLAUDE.md) - Project-wide context (auto-loads)
- [.claude/rules/nextjs.md](../.claude/rules/nextjs.md) - Next.js patterns
- [.claude/rules/payload.md](../.claude/rules/payload.md) - Payload CMS patterns
- [.claude/rules/project-status.md](../.claude/rules/project-status.md) - Current state
- [.claude/rules/dual-agent-memory-bridge.md](../.claude/rules/dual-agent-memory-bridge.md) - Workflow guide

**Key Principle:** Agent 2B holds the "body" of the project - the tactical knowledge for daily implementation.

---

## 🔄 5-Step Memory Bridge Workflow

When Agent 2A completes work, we synchronize both memory systems:

```
┌──────────────────────────────────────────────────────────────┐
│ 1. AGENT 2A COMPLETES WORK                                   │
│    └─ Provides: Clear summary of changes + decisions         │
├──────────────────────────────────────────────────────────────┤
│ 2. USER → COPY REPORT TO AGENT 2B                            │
│    └─ Say: "Agent 2A did [this]. Process for memory."        │
│    └─ Model: HAIKU (fast, cheap)                             │
├──────────────────────────────────────────────────────────────┤
│ 3. AGENT 2B → EVALUATES & SAVES                              │
│    ├─ Updates .claude/rules/ (tactical patterns)             │
│    └─ Provides "Remember" block (strategic decisions)        │
├──────────────────────────────────────────────────────────────┤
│ 4. USER → PASTE REMEMBER BLOCK TO AGENT 2A                   │
│    └─ Agent 2A saves to MCP Memory                           │
├──────────────────────────────────────────────────────────────┤
│ 5. EITHER → COMMIT & PUSH                                    │
│    └─ Save .claude/rules/ changes to git                     │
└──────────────────────────────────────────────────────────────┘
```

**Critical:** After ANY webapp CTO completes significant work, you MUST run this workflow to keep both Antigravity agents synchronized.

---

## 🤝 Integration Guide for Webapp CTOs

### What You Need to Know

1. **Strategic Decisions Require Bridge to Agent 2A**
   - Changed tech stack? → Bridge to Agent 2A
   - Chose a vendor/library? → Bridge to Agent 2A
   - Established a "never do this" rule? → Bridge to Agent 2A

2. **Implementation Patterns Go to Agent 2B Files**
   - Found a new configuration pattern? → Update `.claude/rules/[topic].md`
   - Solved a common error? → Document in relevant rule file
   - Established team convention? → Add to rule files

3. **Before Starting Work**
   - Read [project-status.md](../.claude/rules/project-status.md) for current phase
   - Check relevant rule files (nextjs.md, payload.md, etc.)
   - Understand current architectural constraints

4. **After Completing Work**
   - Provide clear summary of what was done
   - List all decisions made (strategic vs tactical)
   - Follow 5-step memory bridge workflow
   - Commit rule file updates to git

---

### Decision Matrix: What Goes Where?

| Type | Goes To | Example |
|------|---------|---------|
| Implementation pattern | `.claude/rules/` | "Use s3Storage for R2" |
| Configuration example | `.claude/rules/` | Code snippet for Payload config |
| "Never do X" rule | Agent 2A MCP | "Never use Vercel Blob" |
| Brand decision | Agent 2A MCP | "Teal (#2bb1bb) is sacred" |
| Error solution | `.claude/rules/` | "Node 24 breaks Payload CLI" |
| Tech choice rationale | Agent 2A MCP | "Why we chose R2 over S3" |
| CLI command | `.claude/rules/` | "npm run dev --webpack" |
| Vendor decision | Agent 2A MCP | "Stripe over PayPal" |

---

## 📋 Required Files to Share

### Essential Documentation (Read First)
1. **[PROJECT_BLUEPRINT.md](../PROJECT_BLUEPRINT.md)** ⭐ **START HERE**
   - Comprehensive single source of truth
   - Complete architecture overview
   - All phases documented

2. **[CLAUDE.md](../CLAUDE.md)**
   - Project-wide context (legacy reference)
   - Critical architecture rules
   - File structure

3. **[.claude/rules/README.md](../.claude/rules/README.md)**
   - Index of all rule files
   - Quick reference guide

### Memory System (Critical to Understand)
4. **[.claude/rules/MEMORY_BRIDGE_QUICKSTART.md](../.claude/rules/MEMORY_BRIDGE_QUICKSTART.md)** ⭐
   - One-page workflow reference
   - Copy-paste templates
   - Model selection guide

5. **[.claude/rules/dual-agent-memory-bridge.md](../.claude/rules/dual-agent-memory-bridge.md)**
   - Complete workflow documentation
   - Decision matrix
   - Examples and checklists

### Implementation Patterns (Daily Reference)
6. **[.claude/rules/nextjs.md](../.claude/rules/nextjs.md)**
   - Next.js 15.5.9 conventions
   - Node v20.18.0 requirement
   - ESM module system

7. **[.claude/rules/payload.md](../.claude/rules/payload.md)**
   - Payload 3.0 configuration
   - Sovereign data fetching
   - R2 storage integration

8. **[.claude/rules/typescript-patterns.md](../.claude/rules/typescript-patterns.md)**
   - Type alignment patterns
   - Payload ↔ Frontend types
   - Emergency fixes vs long-term

9. **[.claude/rules/archive-ui.md](../.claude/rules/archive-ui.md)**
   - ArchiveClient component pattern
   - Client-side filtering
   - Responsive grid layout

### Project Status (Always Check)
10. **[.claude/rules/project-status.md](../.claude/rules/project-status.md)**
    - Current phase tracking
    - Decision log
    - Known issues & blockers
    - Next objectives

### Quick Reference (Daily Use)
11. **[.claude/rules/QUICK_COMMANDS.md](../.claude/rules/QUICK_COMMANDS.md)**
    - Memory command cheatsheet
    - One-word commands (Save?, Bridge, Document)

---

## 🚀 Workflow for Webapp CTOs

### Starting New Work

1. **Read Current State:**
   ```bash
   # Check project status
   cat .claude/rules/project-status.md

   # Check relevant patterns
   cat .claude/rules/nextjs.md      # If frontend work
   cat .claude/rules/payload.md     # If CMS work
   ```

2. **Understand Constraints:**
   - Node v20.18.0 (NOT v24+)
   - Next.js 15.5.9 (NOT 16)
   - Tailwind v3 (NOT v4)
   - Teal Protocol colors (#2bb1bb, #F59E0B, #0B1D35)

3. **Begin Implementation:**
   - Follow established patterns from rule files
   - Don't deviate from architectural laws
   - Document new patterns as you go

---

### Completing Work

1. **Provide Summary:**
   ```markdown
   Work Completed:
   - [List of changes]
   - [Files modified]

   Decisions Made:
   - Strategic: [Why we chose X over Y]
   - Tactical: [How we implemented Z]

   New Patterns:
   - [Pattern 1]
   - [Pattern 2]
   ```

2. **Memory Bridge:**
   - User copies your summary to Agent 2B (Antigravity)
   - Agent 2B updates rule files
   - Agent 2B provides "Remember" block
   - User pastes "Remember" to Agent 2A (Antigravity)

3. **Commit Changes:**
   ```bash
   git add .claude/rules/*.md
   git commit -m "docs(memory): Update from [CTO name] session

   Patterns saved:
   - [Pattern 1]
   - [Pattern 2]

   Source: [Gemini/Claude] CTO handover
   Co-Authored-By: [Your CTO name]
   "
   ```

---

## 🎯 Critical Rules (DO NOT VIOLATE)

### Architectural Laws (From Agent 2A Memory)
1. **Data Sovereignty:** No external content APIs (Payload only)
2. **Node Version:** v20.18.0 LTS strictly (v24+ breaks tools)
3. **Teal Protocol:** #2bb1bb primary, #F59E0B action, #0B1D35 bg
4. **Storage:** Cloudflare R2 only (never Vercel Blob)
5. **CMS:** Payload 3.0 self-hosted (never external CMS)
6. **Next.js:** 15.5.9 LTS (NOT 16 - stability over bleeding-edge)
7. **Tailwind:** v3.4.17 (NOT v4 - incompatible)

### Implementation Laws (From Agent 2B Memory)
1. **ESM Only:** Native ESM throughout (`"type": "module"`)
2. **Relative Imports:** Use `../../../../config` NOT `@config`
3. **Route Groups:** `(site)` for public, `(payload)` for admin
4. **Sharp Required:** For image optimization
5. **Hard-wire importMap:** Don't rely on auto-discovery
6. **Dev Command:** `npm run dev` (Turbopack disabled)

---

## 💡 Pro Tips for Integration

1. **Use Haiku for Memory Bridge:**
   - Categorizing tactical vs strategic = simple task
   - Saves ~80% of Claude Pro usage
   - Fast and accurate enough

2. **Commit Rule Files Frequently:**
   - Don't batch too many patterns
   - Makes review easier
   - Prevents knowledge loss

3. **Reference Files in Commits:**
   - Link to rule files: `See .claude/rules/payload.md`
   - Makes patterns discoverable
   - Helps future agents

4. **Ask Agent 2B "Save?" After Sessions:**
   - One-word command triggers evaluation
   - Agent 2B will categorize everything
   - You just paste the results

5. **Never Skip Strategic Decisions:**
   - If you chose A over B, document WHY
   - Future agents need this context
   - "We tried X but it failed" is valuable

---

## 📞 Communication Protocol

### When You Need Clarification
**Ask in this order:**
1. Check `.claude/rules/project-status.md` (current state)
2. Check relevant rule file (nextjs.md, payload.md, etc.)
3. Search Agent 2A MCP memory (user can query)
4. Ask user to clarify with Antigravity agents

### When You Make Decisions
**Document immediately:**
1. Provide summary to user
2. User runs memory bridge workflow
3. Don't assume "I'll document later"
4. Context is fresh NOW, not later

### When You Find Conflicts
**Escalate to Antigravity:**
1. Rule files conflict with Agent 2A memory? → Ask user
2. Pattern doesn't work? → Document failure
3. New approach needed? → Propose, get approval
4. Don't silently deviate from established patterns

---

## 🎓 Success Criteria

You'll know integration is working when:
- ✅ Both Antigravity agents stay in sync with your work
- ✅ No lost context between webapp → Antigravity sessions
- ✅ Strategic decisions retrievable from Agent 2A
- ✅ Tactical patterns discoverable in rule files
- ✅ Minimal duplicated documentation
- ✅ Clear handover trail in git commits

---

## 📚 File Checklist for Handover

**Send these files to Gemini CTO & Claude CTO:**

### Tier 1: Must Read (Start Here)
- [ ] `PROJECT_BLUEPRINT.md`
- [ ] `CLAUDE.md`
- [ ] `.claude/rules/MEMORY_BRIDGE_QUICKSTART.md`
- [ ] `.claude/rules/project-status.md`

### Tier 2: Daily Reference
- [ ] `.claude/rules/README.md`
- [ ] `.claude/rules/nextjs.md`
- [ ] `.claude/rules/payload.md`
- [ ] `.claude/rules/typescript-patterns.md`

### Tier 3: As-Needed Reference
- [ ] `.claude/rules/dual-agent-memory-bridge.md`
- [ ] `.claude/rules/archive-ui.md`
- [ ] `.claude/rules/QUICK_COMMANDS.md`
- [ ] `.claude/rules/deployment.md`
- [ ] `.claude/rules/token-optimization.md`

### Supporting Files (Context)
- [ ] `package.json` (dependencies)
- [ ] `tsconfig.json` (TypeScript config)
- [ ] `tailwind.config.ts` (Teal Protocol)
- [ ] `next.config.mjs` (Next.js config)
- [ ] `payload-config/payload.config.ts` (CMS config)

---

## 🔧 Quick Start Commands for CTOs

```bash
# Clone repository
git clone [repo-url]
cd nerd-with-nart

# Verify Node version
node -v  # Must show v20.18.0

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with credentials

# Start development
npm run dev

# Build for production
npm run build
```

---

## 🚨 Common Pitfalls to Avoid

❌ **DON'T:**
- Use Node v24+ (breaks Payload CLI)
- Upgrade to Next.js 16 (stability over bleeding-edge)
- Use Tailwind v4 (incompatible with project)
- Add external content APIs (violates sovereignty)
- Skip memory bridge after sessions
- Create new documentation files (update existing)
- Use `as any` permanently (emergency only)
- Deviate from Teal Protocol colors

✅ **DO:**
- Check project-status.md before starting
- Follow established patterns in rule files
- Document strategic decisions immediately
- Run memory bridge after significant work
- Commit rule file updates to git
- Ask for clarification when uncertain
- Test build before pushing (`npm run build`)
- Respect architectural constraints

---

## 📬 Contact & Support

**For Questions About:**
- **Memory System:** This document + `.claude/rules/MEMORY_BRIDGE_QUICKSTART.md`
- **Current Project State:** `.claude/rules/project-status.md`
- **Implementation Patterns:** Relevant `.claude/rules/*.md` file
- **Strategic Decisions:** Ask user to query Agent 2A MCP memory
- **Urgent Blockers:** Escalate to user → Antigravity agents

---

## 🎯 Final Notes

The dual-memory system exists because:
1. **Strategic decisions** need long-term semantic search (Agent 2A MCP)
2. **Tactical patterns** need version control and file-based access (Agent 2B git)
3. **Four agents** (2 Antigravity + 2 Webapp) need synchronized knowledge
4. **Context preservation** across sessions prevents repeated mistakes

**Your role as Webapp CTOs:**
- Execute implementation work efficiently
- Document patterns and decisions clearly
- Bridge knowledge back to Antigravity agents
- Respect established architectural laws
- Ask when uncertain, don't guess

**Success = All four agents operate as one unified development team.**

---

**Prepared by:** Agent 2B (Antigravity - Claude Code Extension)
**Date:** December 18, 2025
**Status:** Ready for Webapp CTO Integration
**Version:** 1.0
