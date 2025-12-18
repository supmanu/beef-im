# Semantic Versioning & Repository Standardization

**Added:** December 19, 2025 (Phase V - Repository Refactor Complete)
**Standard:** Semantic v1.0 (Version-less Naming)
**Status:** Production-ready, locked in place
**Source:** `nerd/SYSTEM_MANIFEST_v1_0.md` (Canonical Reference)

---

## The Semantic Versioning Standard (v1.0)

### Core Rule
**All core files in `/nerd/pillars/` MUST use semantic, version-less filenames.**

**Pattern:**
```
✅ CORRECT:  voice-dna.md
❌ WRONG:    Voice_DNA_v5_2.md
✅ CORRECT:  constitution.md
❌ WRONG:    Brand_Constitution_v4_3_2.md
```

**Rationale:**
- Filenames are the first thing agents see - they anchor expectations
- Version suffixes create confusion when files evolve
- Semantic names (concept-based) are stable across decades
- Enables stable internal references that never break

---

## The 22 Core Files (Semantic Standard)

### Maintained in: `nerd/SYSTEM_MANIFEST_v1_0.md`

**Lead Files (3):**
- `voice-dna.md` - Core identity & philosophy
- `constitution.md` - Laws, bans & strategy
- `content-engine.md` - Structures, modes & triggers

**Framework (4):**
- `framework-deep-dive.md` - Deep research & NotebookLM protocol
- `tech-architecture-3way.md` - 3-Agent workflow documentation
- `tech-bridge-lab.md` - Analogy library (25 bridges)
- `tech-archive-layout-fix.md` - Critical layout collision doc

**Data & Tools (6):**
- `data-nhes-vii.md` - Hard-coded health benchmarks
- `data-terminology.md` - Verified Thai-first terms
- `data-thai-handshake-exceptions.md` - Formatting exception rules
- `data-citation-template.md` - Citation formats (TMO/OIC)
- `data-notebooklm-prompt.txt` - Forensic seed extraction prompt
- `data-flagship-article.md` - Formatting gold standard

**Instructions & Extensions (8):**
- `instruction-performer.txt` - Claude Agent system prompt
- `instruction-architect-cto.txt` - Gemini Architect system prompt
- `instruction-gemini-cto.txt` - Consultant strategy prompt
- `instruction-auditor-setup.md` - Sovereign Auditor system prompt
- `instruction-cto-config.md` - Cloud project configuration
- `instruction-platform-setup.md` - AI platform setup guide
- `instruction-notebooklm-protocol.md` - Audio/research workflow
- `visual-engine.md` - Visual style guide v3.0

**Index (1):**
- `master-index.md` - The map of everything

---

## Global Reference Repair Protocol

### When to Execute

**Trigger:** Anytime a file in `/nerd/pillars/` is renamed or moved

### The Protocol (5 Steps)

**Step 1: Plan the Rename**
```
Old name: Voice_DNA_v5_2.md
New name: voice-dna.md
Reason: Semantic standardization
```

**Step 2: Rename the File**
```bash
git mv nerd/pillars/Voice_DNA_v5_2.md nerd/pillars/voice-dna.md
```

**Step 3: Global Search & Replace**
```bash
# Search for ALL references to old filename
grep -r "Voice_DNA_v5_2" nerd/ .claude/
```

**Step 4: Update All References**
```markdown
# OLD (in other markdown files)
[See Voice_DNA_v5_2.md](../pillars/Voice_DNA_v5_2.md)

# NEW (after repair)
[See voice-dna.md](../pillars/voice-dna.md)
```

**Step 5: Commit with Clear Message**
```bash
git commit -m "refactor(semantic): rename Voice_DNA_v5_2 → voice-dna

Standardize to Semantic v1.0 (version-less naming).
Updated all internal references across /nerd/ and .claude/

Files updated:
- master-index.md (3 refs)
- tech-architecture-3way.md (2 refs)
- constitution.md (1 ref)
- [other files]

See SYSTEM_MANIFEST_v1_0.md for canonical file list.
"
```

---

## System Manifest Management

### Location
**Canonical Source:** `nerd/SYSTEM_MANIFEST_v1_0.md`

### When to Update

1. **Add New File to `/nerd/pillars/`**
   - Add row to manifest table with semantic name
   - Add to appropriate category (Lead, Framework, Data, Instructions, Index)
   - Include purpose column
   - Commit with reference to manifest

2. **Change File Purpose**
   - Update purpose column in manifest
   - NO FILE RENAME (purposes evolve, names stay stable)
   - Document reason in commit message

3. **Deprecate Old File**
   - Mark as [DEPRECATED] in manifest
   - Keep file in place (history)
   - Archive old version if needed
   - Redirect to replacement in manifest

### Manifest Update Checklist

- [ ] Total file count accurate (should be 22)
- [ ] All filenames match actual files in `/nerd/pillars/`
- [ ] Categories properly organized (Lead, Framework, Data, Instructions, Index)
- [ ] Purposes are clear and up-to-date
- [ ] Legacy IDs provided for reference (for old documentation)
- [ ] Agent distribution list verified (if roles changed)

---

## Agent Knowledge Distribution

### The Distribution Model

Each agent receives a **specific subset** of the 22 core files based on their role.

**Current Distribution (Phase V):**

#### 🏛️ The Architect (Gemini)
- `voice-dna.md` - Core strategy
- `content-engine.md` - Content structures
- `framework-deep-dive.md` - Research methodology
- `data-nhes-vii.md` - Benchmark data
- `master-index.md` - System map

**Why this subset:** Architect needs strategic vision + data for planning

#### ✍️ The Performer (Claude)
- `instruction-performer.txt` - System prompt
- `voice-dna.md` - Identity for writing
- `constitution.md` - Laws to follow
- `tech-bridge-lab.md` - Analogies for explanations
- `data-terminology.md` - Verified terms
- `data-thai-handshake-exceptions.md` - Formatting rules
- `data-citation-template.md` - Citation formats

**Why this subset:** Performer needs identity + rules + tools for execution

#### ⚖️ The Auditor (Gemini)
- `instruction-auditor-setup.md` - System prompt
- `constitution.md` - Laws to verify against
- `data-nhes-vii.md` - Benchmark data
- `data-terminology.md` - Term verification

**Why this subset:** Auditor needs laws + data to verify compliance

### Updating Distribution

**When roles change:**
1. Update manifest's "Agent Knowledge Base Manifest" section
2. Document reason for change
3. Notify agents with CTO sync instructions
4. Commit to git with agent impact note

---

## Integration with Agent 2B Memory

### What Gets Saved Here (`.claude/rules/`)

**This file documents:**
- ✅ Semantic versioning standard (never change)
- ✅ The 22 core files (authoritative list)
- ✅ Reference repair protocol (how to rename safely)
- ✅ Manifest management rules (when to update)
- ✅ Agent distribution patterns (who gets what files)

**Use this file when:**
- Considering a file rename in `/nerd/pillars/`
- Adding new core files to the system
- Distributing knowledge to new agents
- Troubleshooting broken internal references

---

## Quick Reference: Semantic v1.0 Laws

| Law | Rule | Exception |
|-----|------|-----------|
| **Naming** | Semantic, version-less | None - always follow |
| **References** | Use relative paths | Use absolute for external links |
| **Renaming** | Run global repair | Never skip reference updates |
| **Manifest** | Update within 1 commit | ASAP after file changes |
| **Distribution** | Per manifest checklist | Requires Phase update |

---

## Examples: Rename Execution

### Example 1: Simple Rename (Already Done)
```
OLD: Voice_DNA_v5_2.md
NEW: voice-dna.md

Refs updated:
- master-index.md: 3 instances
- tech-architecture-3way.md: 2 instances
- README.md (in .claude/rules/): 1 instance

Commit: fe4f4c8 (Phase V - Semantic Refactor v2.0)
Status: ✅ COMPLETE
```

### Example 2: Future Rename (Template)
```
OLD: GSB_Kane_v4_5_6.md → NEW: framework-deep-dive.md

Search for refs:
grep -r "GSB_Kane" nerd/ .claude/

Expected files to update:
- master-index.md
- tech-architecture-3way.md
- Any .claude/rules/ files mentioning it

Commit message template:
"refactor(semantic): rename GSB_Kane → framework-deep-dive
Updated all internal references per Semantic v1.0 standard.
See SYSTEM_MANIFEST_v1_0.md for canonical file list."
```

---

## Why Semantic Versioning Matters

### Problem It Solves
```
❌ Version-heavy: "Is voice-dna-v5-2 newer than Voice_DNA_v5.2?"
❌ Confusing: Different agents see different names (v5_2 vs v5.2)
❌ Breaks links: Rename to v6 → all references must update
❌ Future proof: What version is v1.0 really on? Nobody knows.
```

### Solution: Semantic Names
```
✅ Clear: "voice-dna.md" - this is THE voice document
✅ Consistent: Same name across all agents and git history
✅ Stable: Rename only when concept changes (rare)
✅ Future proof: Works in 2025, still works in 2035
```

---

## Maintenance Checklist (Quarterly)

- [ ] Verify all 22 files exist in `/nerd/pillars/`
- [ ] Check manifest against actual files (count = 22)
- [ ] Search for any old versioned filenames (v5, v4, etc.)
- [ ] Verify agent distribution still reflects current roles
- [ ] Review and update purposes if needed
- [ ] Commit summary: "docs(semantic): Q1 2026 manifest review"

---

## Related Files

- `nerd/SYSTEM_MANIFEST_v1_0.md` - Canonical file reference
- `nerd/pillars/master-index.md` - The map of everything
- `.claude/rules/repository.md` - Repository structure guide
- `.claude/rules/project-status.md` - Current phase & objectives

---

**Author:** Agent 2B (Phase V Finalization)
**Status:** Locked in place ✅
**Last Updated:** December 19, 2025
**Enforcement:** Mandatory for all future work in `/nerd/pillars/`

**Key Principle:** Names are stable. Versions are temporary. Choose semantic naming and you never have to rename again.
