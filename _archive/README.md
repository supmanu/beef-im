# 📦 ARCHIVE - Historical Documentation

**Status:** Read-Only Reference
**Purpose:** Preserve historical migration logs and troubleshooting records
**Date Created:** December 15, 2025

---

## Why This Archive Exists

With the implementation of the **Dual-Brain Architecture** (Agent 2A + Agent 2B), we now have automated memory systems that preserve both strategic decisions and tactical implementation details. This makes extensive historical devlogs less critical for day-to-day operations.

**Memory Systems:**
- **Agent 2A (Strategic):** MCP Memory Server → `nerd-memory.json` (permanent, cloud-backed)
- **Agent 2B (Tactical):** claude-mem → `.claude-mem/archives/` (30-day rolling)

**Result:** Historical documentation can be safely archived while remaining accessible for reference.

---

## What's Archived Here

### [migration-history.md](migration-history.md)
**Former Name:** ARCHITECTURE_DEVLOG.md
**Content:** Complete technical migration history
- Phase 7: Vite → Next.js 16 migration
- Phase H: Payload 3.0 CMS integration
- Troubleshooting logs and solutions
- Step-by-step technical decisions

**When to Use:**
- Debugging legacy issues from Phases A-H
- Understanding WHY specific architectural choices were made
- Onboarding new team members to project history
- Legal/compliance audit requirements

---

## Active Documentation (Use These Instead)

For current project work, refer to these active documents:

### 📋 [CLAUDE.md](../CLAUDE.md)
**Purpose:** Current project context for AI agents
**Content:** Tech stack, architecture rules, critical constraints
**Update Frequency:** Weekly or after major changes

### 🧠 [DUAL_BRAIN_ARCHITECTURE.md](../DUAL_BRAIN_ARCHITECTURE.md)
**Purpose:** Dual-brain memory system specification
**Content:** Agent 2A/2B configuration, hybrid pattern, MCP details
**Update Frequency:** As dual-brain system evolves

### ⚡ [QUICK_REFERENCE_DUAL_BRAIN.md](../QUICK_REFERENCE_DUAL_BRAIN.md)
**Purpose:** Quick lookup guide for agent selection
**Content:** When to use which agent, cost optimization tips
**Update Frequency:** As needed

### 📊 [DUAL_BRAIN_EXECUTIVE_SUMMARY.md](../DUAL_BRAIN_EXECUTIVE_SUMMARY.md)
**Purpose:** Stakeholder report on dual-brain architecture
**Content:** ROI metrics, strategic impact, cost-benefit analysis
**Update Frequency:** Quarterly reviews

---

## Document Lifecycle Policy

### Active Phase
- Documents live in project root
- Updated regularly with current information
- Used by AI agents and developers daily

### Archive Phase (This Folder)
- Historical reference only
- Read-only (no active updates)
- Accessible but not prioritized

### Sunset Phase
- Fully migrated to Agent 2A strategic memory
- Removed from git (kept in external backups only)
- Will evaluate for [migration-history.md](migration-history.md) in 3 months

---

## How to Query Historical Information

### Option 1: Search This Archive
```bash
# Search for specific topics in archived docs
grep -r "Payload 3.0" _archive/
grep -r "Node 20" _archive/
```

### Option 2: Query Agent 2A Strategic Memory
```
[Switch to Agent 2A in Antigravity - Claude Sonnet 4.5]
"What was our decision about Node version for Payload 3.0?"
"Why did we choose Webpack over Turbopack?"
```

### Option 3: Query Agent 2B Tactical Archives
```
[Agent 2B - Claude Code Terminal]
"What did we do in our last session?"
"How did we implement the duplex layout strategy?"
```

---

## Archive Maintenance

**Review Schedule:** Every 3 months
**Next Review:** March 15, 2026

**Review Criteria:**
- Has this archive been accessed in the last 90 days?
- Is the information better stored in Agent 2A strategic memory?
- Can we sunset this document entirely?

**Sunset Conditions:**
- No access in 6+ months
- Information fully migrated to dual-brain memory
- Dual-brain system proven stable and reliable

---

**Last Updated:** December 15, 2025
**Managed By:** Development Team
**Policy Version:** 1.0
