# 📚 Agent 2B Memory System - Rules & Patterns

**Index of all `.claude/rules/` files for the Nerd with Nart project**

Last Updated: December 20, 2025

---

## 🚀 Start Here

### For Memory Management
- **[MEMORY_BRIDGE_QUICKSTART.md](./MEMORY_BRIDGE_QUICKSTART.md)** ⭐ **START HERE**
  - One-page reference for the 5-step workflow
  - Copy-paste templates
  - Model selection guide
  - Print this!

- **[dual-agent-memory-bridge.md](./dual-agent-memory-bridge.md)** - GOLD STANDARD
  - Complete workflow documentation
  - Decision matrix (tactical vs strategic)
  - Examples and checklists
  - Pro tips

- **[memory-bridge-workflow.md](./memory-bridge-workflow.md)** - Original Process
  - Original workflow design
  - Agent evaluation prompts
  - Pattern extraction guides

---

## 🛠️ Implementation Patterns

### Framework & Build
- **[nextjs.md](./nextjs.md)**
  - Next.js 15.5.9 conventions
  - Node v20.18.0 requirement
  - ESM module system (Phase II)
  - Routing with route groups
  - Data fetching patterns

- **[typescript-patterns.md](./typescript-patterns.md)** ⭐ NEW (Emergency Fix)
  - Payload CMS ↔ Frontend type alignment
  - Emergency fix for id mismatch (number vs string)
  - Long-term type refinement strategy (Phase IV)
  - Best practices for Payload-generated types
  - Why `as any` is temporary, not permanent

### CMS & Storage
- **[payload.md](./payload.md)** ⭐ UPDATED Phase III
  - Payload 3.0 configuration with Sharp
  - Sovereign data fetching pattern (new - getSovereignArticles)
  - Cloudflare R2 storage integration (Phase II)
  - S3 plugin setup
  - Environment variables
  - Collections: Users, Posts, Categories, Media, Articles

- **[archive-ui.md](./archive-ui.md)** ⭐ NEW
  - `ArchiveClient.tsx` component pattern
  - Client-side filtering (search + category)
  - Responsive grid layout (1/2/3 columns)
  - Category color system (Teal Protocol)
  - Integration with sovereign data fetching
  - Performance characteristics & testing

### API Development
- **[api-rules.md](./api-rules.md)**
  - REST endpoint patterns
  - Error handling conventions
  - Response formatting

---

## 📊 Project Management

- **[project-status.md](./project-status.md)**
  - Current project state
  - Phase progress tracking
  - Decision log
  - Known issues & blockers
  - Next objectives

- **[semantic-versioning.md](./semantic-versioning.md)** ⭐ NEW (Phase V)
  - Semantic v1.0 standard (version-less naming)
  - The 21 core files reference list
  - Global reference repair protocol
  - System Manifest management
  - Agent knowledge distribution patterns

- **[deployment.md](./deployment.md)**
  - Pre-deploy checklist
  - Vercel configuration
  - Environment variables
  - Database migrations
  - Post-deploy verification

---

## 💡 Optimization & Strategy

- **[token-optimization.md](./token-optimization.md)**
  - When to use Agent 2A vs Agent 2B
  - Model selection (Gemini 3 Pro vs Claude)
  - Token budget strategy
  - Memory bridge workflow

- **[QUICK_COMMANDS.md](./QUICK_COMMANDS.md)**
  - Memory command cheatsheet
  - One-word commands (Save?, Bridge, Document)
  - Quick reference patterns

---

## 📖 Reference

- **[DEMO_EXAMPLE.md](./DEMO_EXAMPLE.md)**
  - Example of how memory works
  - Pattern documentation demo

---

## 🎯 File Organization

### By Purpose

**🚀 For New Sessions:**
1. Read `MEMORY_BRIDGE_QUICKSTART.md` (1 min)
2. Reference specific pattern file (nextjs.md, payload.md, etc.)
3. Check project-status.md for context

**🔄 For Handovers:**
1. Use MEMORY_BRIDGE_QUICKSTART.md template
2. Agent 2B processes with Haiku model
3. Commit updates to `.claude/rules/`

**🛠️ For Implementation:**
1. Find relevant pattern file (nextjs.md, payload.md)
2. Follow configuration examples
3. Reference project-status.md for decisions

### By Phase

**Phase I (Completed):**
- Engine restored (Next.js 15.5.9)
- Visuals restored (Gold Copy)
- Data flow restored (Hygraph working)
- Admin access (Payload operational)

**Phase II (Completed - Dec 17):**
- Cloudflare R2 integration (payload.md)
- Native ESM conversion (nextjs.md)
- Storage sovereignty achieved
- Image optimization (sharp)

**Phase III (COMPLETED - Dec 17 Evening):**
- ✅ Content migration (Hygraph → Payload) DONE
- ✅ Frontend rewiring (getSovereignArticles) DONE
- ✅ Archive UI (ArchiveClient component) DONE
- ✅ Category filtering & search DONE
- ✅ R2 avatar integration DONE

**Phase IV (COMPLETED - Dec 18 Evening):**
- ✅ Intelligence Suite (Tables, Code Blocks, Blockquotes) DONE
- ✅ Homepage migration (Lexical + text extraction) DONE
- ✅ Styling refinement (Teal Protocol consistency) DONE
- ✅ Type mismatch fix (Emergency deployment unblock) DONE

**Phase V (COMPLETED - Dec 19):**
- ✅ Semantic repository refactor (21 core files renamed/purged) DONE
- ✅ System Manifest v1.0 generation (Canonical source) DONE
- ✅ Agent 2B memory protocol (Tactical patterns documented) DONE
- ✅ Semantic versioning standard (Version-less naming locked) DONE

**Phase VI (COMPLETED — Mar 23, 2026):**
- ✅ Claude Code Skills deployed (5 skills: architect, performer, auditor, hybrid, produce-article)
- ✅ Mastra Vector DB migrated (text-embedding-004 → gemini-embedding-001, 3072 dims)
- ✅ Article production guide documented (dual methods: Classic + Mastra AI)
- ✅ Content production pipeline fully operational

**Phase VII (COMPLETED - Dec 20):**
- ✅ Language Firewall Protocol implemented (English Operational) DONE
- ✅ Legacy instruction-architect-cto.txt retired DONE
- ✅ Strategic Memory Log updated & sync'd DONE

---

## ✅ Quick Checklist

**Before Starting Work:**
- [ ] Read current project-status.md
- [ ] Check nextjs.md for framework conventions
- [ ] Check payload.md if CMS work

**After Completing Work (Handover):**
- [ ] Agent 2A provides summary
- [ ] You paste to Agent 2B (use Haiku)
- [ ] Agent 2B updates relevant `.md` files
- [ ] Agent 2B provides "Remember" block
- [ ] You paste "Remember" to Agent 2A
- [ ] Commit changes to git

---

## 📞 How to Use This Index

**Looking for...**
- How to capture content ideas? → [nerd/CHEATSHEET.md](../../nerd/CHEATSHEET.md) + [nerd/OBSIDIAN_GUIDE.md](../../nerd/OBSIDIAN_GUIDE.md)
- How to publish an article? → `/publish` skill or [.claude/skills/publish/SKILL.md](../../.claude/skills/publish/SKILL.md)
- What content do I already have? → [nerd/content-catalog.md](../../nerd/content-catalog.md)
- Content pipeline dashboard? → [nerd/dashboard.md](../../nerd/dashboard.md) (open in Obsidian)
- How to set up Payload? → [payload.md](./payload.md)
- How to configure Next.js? → [nextjs.md](./nextjs.md)
- How to handle memory? → [MEMORY_BRIDGE_QUICKSTART.md](./MEMORY_BRIDGE_QUICKSTART.md)
- What's the current status? → [project-status.md](./project-status.md)
- How do I optimize tokens? → [token-optimization.md](./token-optimization.md)
- How do I deploy? → [deployment.md](./deployment.md)
- Stack strategy & DB exit plan? → [deployment.md](./deployment.md) (Strategic Stack Assessment section)

---

## 🔄 File Update History

**March 24, 2026 (Obsidian Intake Layer + Content Catalog):**
- ✅ Added Obsidian to NixOS melkor config (pending rebuild)
- ✅ Created `nerd/seeds/` capture system with frontmatter template
- ✅ Created `nerd/content-catalog.md` (indexed 68+ existing scattered content files)
- ✅ Created `nerd/dashboard.md` (Dataview pipeline dashboard for Obsidian)
- ✅ Created `nerd/OBSIDIAN_GUIDE.md` (8-part installation + workflow guide)
- ✅ Created `nerd/CHEATSHEET.md` (one-page quick reference)
- ✅ Updated README.md with content pipeline references

**December 20, 2025 (Phase VII Sync - Language Firewall & Purge):**
218: - ✅ Implemented English-first Operational Language Protocol
219: - ✅ Retired legacy Architect CTO v6.6.1 instruction file
220: - ✅ Updated SYSTEM_STATE and Strategic Memory Log
221: 
222: **December 19, 2025 (Phase V Finalization - Semantic Versioning & Manifest):**
- ✅ Added `semantic-versioning.md` (Semantic v1.0 standard + 22 core files reference + manifest management)
- ✅ Updated `README.md` (Added semantic-versioning reference + Phase V completion note)
- ✅ Updated project-status.md (Marked Phase V complete, Phase VI planning ready)

**December 17, 2025 (20:45 UTC - Emergency Type Fix + Memory Bridge):**
- ✅ Updated `project-status.md` (Deployment unblocked + emergency decision log)
- ✅ Added `typescript-patterns.md` (Type mismatch resolution, Phase IV refinement plan)
- ✅ Updated `README.md` (TypeScript patterns reference + emergency fix note)

**December 17, 2025 (20:30 UTC - Sovereign Migration Complete):**
- ✅ Updated `project-status.md` (Phase III → Phase IV roadmap)
- ✅ Enhanced `payload.md` (sovereign data fetching pattern + getSovereignArticles)
- ✅ Added `archive-ui.md` (ArchiveClient component documentation)
- ✅ Updated `README.md` (Phase III completion + new file indexes)

**December 17, 2025 (Earlier):**
- ✅ Added `MEMORY_BRIDGE_QUICKSTART.md` (gold standard one-page)
- ✅ Added `dual-agent-memory-bridge.md` (comprehensive workflow)
- ✅ Updated `nextjs.md` (ESM documentation)
- ✅ Updated `payload.md` (R2 storage patterns)
- ✅ Added README.md (index file)

---

## 🎯 Key Principles

1. **TACTICAL PATTERNS** live in `.claude/rules/` (this directory)
2. **STRATEGIC DECISIONS** live in Agent 2A MCP memory
3. **PROJECT STATE** lives in project-status.md
4. **WORKFLOW** is 5-step memory bridge (see quickstart)
5. **COMMIT EARLY, COMMIT OFTEN** (documented decisions)

---

## 🚀 Next Session Workflow

```
1. Session starts
2. CLAUDE.md + .claude/rules/*.md auto-load
3. You can immediately reference patterns
4. Continue work or start new phase
5. At end: Use memory bridge workflow
6. Next session: All knowledge persists!
```

---

## 📝 Notes

- All files are **markdown** for readability
- Use **relative links** `[file.md](./file.md)`
- Keep files **focused** (one topic per file)
- Update **project-status.md** for state changes
- Commit **frequently** with clear messages

---

**Status:** Active
**Last Reviewed:** March 29, 2026 (v6.0 + /publish skill, Mastra non-core, stack review)
**Ready for:** Production use ✅
**Phase:** v6.0 Production (Obsidian Intake → Gemini Research (optional) → CLI Skills → /publish → Payload CMS — zero manual steps)
**Stack:** Next.js 16.2.1, Payload 3.80.0, Node 24, Tailwind v4.2 (Mastra: non-core, exploratory)

🎓 Start with MEMORY_BRIDGE_QUICKSTART.md - it's all you need for 80% of cases!
🎓 For semantic versioning: See [semantic-versioning.md](./semantic-versioning.md)
