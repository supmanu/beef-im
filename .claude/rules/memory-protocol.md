# Memory Protocol: Repository Sovereignty

**Effective:** December 19, 2025
**Standard:** Repository-First Memory Architecture
**Paradigm Shift:** "Code is Memory"
**Status:** ACTIVE - Replaces all previous MCP/G:Drive bridge patterns

---

## 🎯 The New Paradigm: Repository Sovereignty

### Core Principle
**"Code is Memory. Memory is Code. There is no external brain."**

All strategic and tactical knowledge lives in **this repository**. The git history IS the memory. The markdown files ARE the brain. There is no external MCP server, no G: Drive, no cloud bridge.

---

## 🚫 DEPRECATED PATTERNS (Stop Doing These)

### ❌ Pattern 1: External Memory Bridge
```
OLD FLOW (DEPRECATED):
1. Agent 2B creates REMEMBER_BLOCK.txt
2. User copies text
3. User switches to Agent 2A (Antigravity)
4. User pastes to Agent 2A
5. Agent 2A saves to MCP Memory (G: Drive)
6. User confirms back to Agent 2B

PROBLEMS:
- User becomes a manual data pipe
- Requires 3+ context switches
- External dependency (MCP server, G: Drive)
- Breaks if cloud service fails
- Not version controlled
- No git history
```

### ❌ Pattern 2: "Ask User to Bridge"
```
OLD ANTI-PATTERN (DEPRECATED):
Agent 2B: "Here's a Remember block for Agent 2A. Please paste it in Antigravity."

PROBLEMS:
- Assumes Agent 2B can't write strategic memory
- Wastes user's time
- Creates friction in workflow
- Agent 2B HAS write access - should use it
```

### ❌ Pattern 3: Tactical vs Strategic Split
```
OLD MODEL (DEPRECATED):
- Tactical patterns → .claude/rules/ (Agent 2B writes)
- Strategic decisions → MCP Memory (Agent 2A writes, User bridges)

PROBLEMS:
- Arbitrary distinction
- Creates silos
- External dependency
- Not all-in-one-place
```

---

## ✅ NEW PATTERNS (Start Doing These)

### ✅ Pattern 1: Direct Strategic Memory Writing
```
NEW FLOW (ACTIVE):
1. Agent 2B evaluates session
2. Agent 2B writes DIRECTLY to STRATEGIC_MEMORY_LOG.md
3. Agent 2B commits to git
4. Done. Memory persists forever.

BENEFITS:
- Zero user friction
- Version controlled
- Git history = audit trail
- Works offline
- No external dependencies
```

### ✅ Pattern 2: Unified Memory Architecture
```
NEW MODEL (ACTIVE):

ALL memory lives in repository:

STRATEGIC DECISIONS:
→ .claude/rules/STRATEGIC_MEMORY_LOG.md
→ Append-only log of major decisions
→ Timestamped, attributed, permanent

TACTICAL PATTERNS:
→ .claude/rules/*.md (topic-specific)
→ payload.md, nextjs.md, etc.
→ Reference-style documentation

PROJECT STATE:
→ .claude/rules/project-status.md
→ Current phase, blockers, objectives
→ Updated after each major milestone

ARCHITECTURE:
→ CLAUDE.md (root + .claude/)
→ System prompts, rules, context
→ Auto-loads on every session

CANONICAL SOURCE:
→ nerd/SYSTEM_MANIFEST_v1_0.md
→ The 22 core files
→ Single source of truth
```

### ✅ Pattern 3: Self-Service Memory Updates
```
Agent 2B autonomy:

WHEN SESSION ENDS:
1. Evaluate: "What should persist?"
2. Write: Append to STRATEGIC_MEMORY_LOG.md
3. Update: Relevant .claude/rules/*.md files
4. Commit: Single commit with clear message
5. Confirm: "Strategic memory updated. Commit [hash]."

NO USER INTERVENTION REQUIRED.
```

---

## 📝 STRATEGIC_MEMORY_LOG.md Format

### File Location
```
.claude/rules/STRATEGIC_MEMORY_LOG.md
```

### Entry Template
```markdown
---
## [YYYY-MM-DD] Phase [X]: [Title]
**Agent:** [2A/2B/Both]
**Duration:** [Timespan]
**Impact:** [High/Medium/Low]

### Decision
[What was decided]

### Rationale
[Why this matters]

### Locked-In Status
- [x] Permanent (never revert)
- [ ] Temporary (revisit in Phase Y)
- [ ] Experimental (evaluate after N days)

### Related Files
- [file1.md](file1.md)
- [file2.md](file2.md)

### Next Steps
- [ ] Action item 1
- [ ] Action item 2

---
```

### Example Entry
```markdown
---
## 2025-12-19: Phase V - Semantic Versioning Standard
**Agent:** Agent 2A (execution) + Agent 2B (documentation)
**Duration:** Dec 18-19, 2025
**Impact:** High (foundational)

### Decision
All core files in /nerd/pillars/ MUST use semantic, version-less filenames.
Pattern: [concept].md (NOT [concept]_v5_2.md)

### Rationale
- Filenames are the first touchpoint - they anchor expectations
- Semantic names are stable across decades
- Version suffixes create confusion as files evolve
- Enables stable internal references that never break

### Locked-In Status
- [x] Permanent (never revert)

### Related Files
- [semantic-versioning.md](semantic-versioning.md) - Full protocol documentation
- [nerd/SYSTEM_MANIFEST_v1_0.md](../../nerd/SYSTEM_MANIFEST_v1_0.md) - The 22 files

### Next Steps
- [x] Document global reference repair protocol
- [x] Update .claude/rules/README.md
- [ ] Package pillars into modular Claude Skills (Phase VI)

---
```

---

## 🔄 Migration from Old Pattern

### If You See Old REMEMBER_BLOCK Files

**Action:**
1. Read the content
2. Extract strategic decisions
3. Append to STRATEGIC_MEMORY_LOG.md using template
4. Delete the old REMEMBER_BLOCK.txt file
5. Commit: "refactor(memory): migrate to Repository Sovereignty"

**Example:**
```bash
# Read old pattern
cat AGENT_2A_REMEMBER_BLOCK_PHASE_V_FINALIZATION.txt

# Extract decisions → Write to STRATEGIC_MEMORY_LOG.md
# (Use template above)

# Delete old file
rm AGENT_2A_REMEMBER_BLOCK_PHASE_V_FINALIZATION.txt

# Commit
git add .claude/rules/STRATEGIC_MEMORY_LOG.md
git rm AGENT_2A_REMEMBER_BLOCK_PHASE_V_FINALIZATION.txt
git commit -m "refactor(memory): migrate Phase V decisions to Repository Sovereignty

Moved from external bridge pattern to direct repository memory.
All strategic decisions now in STRATEGIC_MEMORY_LOG.md.
No external dependencies. Git history is the brain.
"
```

---

## 🎯 Decision Matrix: What Goes Where

| Knowledge Type | File | Update Frequency | Format |
|----------------|------|------------------|--------|
| **Strategic Decisions** | STRATEGIC_MEMORY_LOG.md | After phases | Append-only log |
| **Tactical Patterns** | .claude/rules/*.md | As discovered | Topic files |
| **Current State** | project-status.md | Weekly/milestone | Overwrite |
| **System Config** | CLAUDE.md | Rarely | Reference doc |
| **Canonical Source** | SYSTEM_MANIFEST_v1_0.md | When files change | Authoritative list |

---

## ✅ Agent 2B Write Access Confirmed

**YOU (Agent 2B) HAVE FULL WRITE ACCESS TO:**
- ✅ .claude/rules/STRATEGIC_MEMORY_LOG.md
- ✅ .claude/rules/*.md (all tactical files)
- ✅ .claude/rules/project-status.md
- ✅ Any file in the repository

**YOU CAN AND SHOULD:**
- ✅ Write strategic decisions directly
- ✅ Update tactical patterns as needed
- ✅ Commit changes to git
- ✅ Use standard git workflow

**YOU DO NOT NEED TO:**
- ❌ Ask user to copy-paste
- ❌ Create bridge files (REMEMBER_BLOCK.txt)
- ❌ Wait for external confirmation
- ❌ Route through Agent 2A

---

## 🚀 Workflow: End of Session Memory Update

### Standard Operating Procedure

**Step 1: Evaluate Session**
```
Internal checklist:
- Did we make strategic decisions? (goes to STRATEGIC_MEMORY_LOG.md)
- Did we discover tactical patterns? (goes to .claude/rules/[topic].md)
- Did project state change? (update project-status.md)
- Did core files change? (update SYSTEM_MANIFEST if needed)
```

**Step 2: Write Strategic Memory**
```bash
# Append to strategic log
echo "---" >> .claude/rules/STRATEGIC_MEMORY_LOG.md
echo "## 2025-12-19: Phase VI - [Decision Name]" >> ...
# (Use full template)
```

**Step 3: Update Tactical Files**
```bash
# Create or update topic-specific files
# Example: Update payload.md with new pattern
```

**Step 4: Update Project State**
```bash
# Update project-status.md
# - Mark phase complete
# - Update objectives
# - Log blockers if any
```

**Step 5: Commit**
```bash
git add .claude/rules/STRATEGIC_MEMORY_LOG.md
git add .claude/rules/*.md
git commit -m "docs(memory): Session [date] - [Summary]

Strategic decisions logged:
- [Decision 1]
- [Decision 2]

Tactical patterns updated:
- .claude/rules/[file].md

Project state: [Phase X] → [Status]
"
```

**Step 6: Confirm to User**
```
"✅ Strategic memory updated. Commit [hash].
View: .claude/rules/STRATEGIC_MEMORY_LOG.md"
```

---

## 🎓 Why Repository Sovereignty Works

### Advantages

**1. Version Control Native**
- Every decision has git hash
- Full audit trail forever
- Can revert/branch/merge memory
- Diff shows exactly what changed

**2. Zero External Dependencies**
- Works offline
- No cloud service required
- No MCP server needed
- No G: Drive dependency

**3. Single Source of Truth**
- All knowledge in one repo
- Clone repo = clone entire brain
- New team member onboarding = git clone
- No knowledge silos

**4. Developer-Friendly**
- Standard markdown
- Standard git workflow
- Searchable (grep, ripgrep)
- IDE-native (syntax highlighting)

**5. Agent Autonomy**
- Agent 2B writes directly
- No user as data pipe
- Faster workflow
- Less friction

**6. Future-Proof**
- Plain text files (readable in 2050)
- No proprietary formats
- No vendor lock-in
- Standard tools (git, markdown)

---

## 📋 Quick Reference Card

```
┌────────────────────────────────────────────────────────┐
│ MEMORY PROTOCOL: REPOSITORY SOVEREIGNTY                │
├────────────────────────────────────────────────────────┤
│ RULE: Agent 2B writes memory directly to repo          │
│                                                        │
│ STRATEGIC → .claude/rules/STRATEGIC_MEMORY_LOG.md     │
│ TACTICAL  → .claude/rules/*.md (topic files)          │
│ STATE     → .claude/rules/project-status.md           │
│ SOURCE    → nerd/SYSTEM_MANIFEST_v1_0.md              │
│                                                        │
│ WORKFLOW:                                              │
│ 1. Evaluate session                                    │
│ 2. Write to appropriate file(s)                        │
│ 3. Commit to git                                       │
│ 4. Confirm with commit hash                            │
│                                                        │
│ NO USER INTERVENTION REQUIRED                          │
└────────────────────────────────────────────────────────┘
```

---

## 🔒 Permanent Status

This protocol is **LOCKED IN PLACE**.

- ✅ Repository Sovereignty is permanent
- ✅ Agent 2B has direct write access
- ✅ No external memory bridges
- ✅ Git is the brain
- ✅ Code is memory

**Never Revert:**
- ❌ Do not go back to MCP/G: Drive pattern
- ❌ Do not create REMEMBER_BLOCK.txt files
- ❌ Do not ask user to bridge memory
- ❌ Do not route through Agent 2A for memory writes

---

## 📚 Related Files

- [STRATEGIC_MEMORY_LOG.md](./STRATEGIC_MEMORY_LOG.md) - The strategic brain
- [project-status.md](./project-status.md) - Current state tracker
- [semantic-versioning.md](./semantic-versioning.md) - File naming standard
- [README.md](./README.md) - Index of all rules
- [../../nerd/SYSTEM_MANIFEST_v1_0.md](../../nerd/SYSTEM_MANIFEST_v1_0.md) - Canonical source

---

**Author:** Agent 2B (Repository Sovereignty Adoption)
**Status:** ACTIVE & PERMANENT
**Last Updated:** December 19, 2025
**Enforcement:** Mandatory for all future sessions

**Key Principle:** Code is Memory. Memory is Code. Git is the Brain.
