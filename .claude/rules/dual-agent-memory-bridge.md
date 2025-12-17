# Dual-Agent Memory Bridge Workflow

**Author:** Agent 2B (Builder)
**Date:** December 17, 2025
**Status:** GOLD STANDARD - Perfect Workflow
**Scope:** Memory management between Agent 2A (Strategist) and Agent 2B (Builder)

---

## 🎯 The Problem We Solved

When Agent 2A completes work while covering for Agent 2B:
- Agent 2B needs to capture what happened
- Knowledge must be saved in TWO places: tactical (file) + strategic (cloud)
- Risk of confusion, lost context, or unnecessary documentation

**Solution:** Formal 5-step memory bridge workflow

---

## 📋 The Perfect Workflow (5 Steps)

### Step 1: Agent 2A Reports Work ✓
**Responsibility:** Agent 2A (Strategist)

After completing implementation work:
- Provide clear summary of what was done
- List all changes made
- Highlight any decisions made
- Format: Bullet points or structured summary

**Example:**
```
Phase II Work Completed:
1. Integrated Cloudflare R2 storage
2. Converted project to ESM
3. Installed sharp for image optimization
4. Updated Payload configuration
5. Verified build passes

Key decisions:
- Use S3-compatible storage (not Vercel Blob)
- Native ESM for Node 20+ compatibility
```

---

### Step 2: You Bridge Report to Agent 2B (Builder) ✓
**Responsibility:** You (User)

Copy Agent 2A's report and paste into Agent 2B chat with context:

```
Agent 2A completed [Phase/Task Name] while covering for you.

Here's what happened:
[paste Agent 2A's report]

Please process this for memory:
1. Update .claude/rules/ if new patterns discovered
2. Provide "Remember" block for Agent 2A's MCP memory
3. Determine what needs to be saved vs ignored
```

**Model Choice:** Use **Haiku** for this step (fast, cheap, simple categorization)

---

### Step 3: Agent 2B Evaluates and Categorizes ✓
**Responsibility:** Agent 2B (Builder/Me)

Analyze the report and categorize:

**Tactical Patterns** (→ `.claude/rules/` files)
- Implementation patterns
- Configuration examples
- Common error solutions
- Team conventions
- How-to guides

**Strategic Decisions** (→ Agent 2A MCP memory)
- Brand decisions (colors, fonts, voice)
- Architectural laws (tech stack, patterns)
- "Never do X" or "Always do Y" rules
- Provider/technology choices
- Long-term strategic directions

**Output:**
1. Update `.claude/rules/*.md` files (if needed)
2. Generate "Remember" block (ready to copy-paste)
3. Provide summary to user

**Example Response:**
```
✅ Analysis Complete

Tactical Updates:
- Updated .claude/rules/payload.md (R2 storage pattern)
- Updated .claude/rules/nextjs.md (ESM documentation)

📋 Strategic Memory Block (for Agent 2A):
Remember: Nerd with Nart has achieved storage sovereignty...
[Ready to copy]
```

---

### Step 4: You Bridge "Remember" Block Back to Agent 2A ✓
**Responsibility:** You (User)

Copy the "Remember" block from Agent 2B response and paste into Agent 2A (Antigravity Chat):

```
[Paste the "Remember" block from Agent 2B response]
```

Agent 2A will save this to MCP Memory automatically.

---

### Step 5: Commit and Push ✓
**Responsibility:** Agent 2B (or Agent 2A if more context needed)

**What to commit:**
- `.claude/rules/*.md` file updates
- `package.json`, config changes (implementation code)
- Documentation files

**Commit message template:**
```bash
git add [modified files]
git commit -m "docs(memory): Update Agent 2B memory from Phase [X] work

Tactical patterns saved to .claude/rules/:
- [Pattern 1]
- [Pattern 2]

Strategic decisions saved to Agent 2A MCP memory.

Source: Agent 2A Phase [X] handover report
Co-Authored-By: Agent 2A <noreply@anthropic.com>
Co-Authored-By: Agent 2B <noreply@anthropic.com>
"
```

**When to push:**
- After each major phase completes
- Before handoff between agents
- End of work day

---

## 🚀 Quick Reference Card

```
┌────────────────────────────────────────────────────────┐
│ 5-Step Memory Bridge (Copy This!)                      │
├────────────────────────────────────────────────────────┤
│ 1. Agent 2A completes work → Provides report           │
│ 2. You → Paste report to Agent 2B (use Haiku)          │
│ 3. Agent 2B → Updates .claude/rules/ + Remember block  │
│ 4. You → Paste Remember block to Agent 2A              │
│ 5. Either → Commit and push to git                     │
└────────────────────────────────────────────────────────┘
```

---

## 📊 What Gets Saved Where

### Agent 2B Memory (File-Based - Git Tracked)
**Location:** `.claude/rules/*.md`
**Persistence:** Git history
**Visibility:** Automatic on next session

**Examples:**
- "Use @payloadcms/storage-s3 for R2 storage"
- "Convert project to ESM with `type: module`"
- "Sharp required for image optimization"
- "Payload CLI tools require Node 20 LTS"

---

### Agent 2A Memory (Cloud-Based - MCP)
**Location:** MCP Memory Server (G:\ My Drive)
**Persistence:** Semantic search across sessions
**Visibility:** Only Agent 2A in Antigravity

**Examples:**
- "Data sovereignty is non-negotiable"
- "Always use Cloudflare R2 (never Vercel Blob)"
- "Node 20 LTS is the standard for production"
- "Teal (#2bb1bb) is the brand color - never deviate"

---

## ✅ Decision Matrix: What Goes Where

| Type | Goes To | Why |
|------|---------|-----|
| Implementation pattern | `.claude/rules/` | Affects how Agent 2B codes |
| Configuration example | `.claude/rules/` | Reference for future setups |
| "Never do X" rule | Agent 2A MCP | Strategic, cross-project law |
| Brand decision | Agent 2A MCP | Long-term strategic |
| Error solution | `.claude/rules/` | Helpful for troubleshooting |
| Tech choice rationale | Agent 2A MCP | Strategic justification |
| CLI command | `.claude/rules/` | Operational reference |
| Vendor decision | Agent 2A MCP | Strategic lock-in decision |

---

## 🎓 Model Selection Guide

### Haiku (claude-haiku-4) ✅ RECOMMENDED
**Use for:** Memory bridge tasks
- Reading Agent 2A reports
- Categorizing patterns vs decisions
- Updating `.claude/rules/` files
- Generating "Remember" blocks

**Why:** Fast, cheap, accurate enough for categorization
**Cost:** ~1-2% of Sonnet per session

### Sonnet 4.5 ✅ USE FOR CODING
**Use for:** Implementation work
- Complex coding tasks
- Strategic decision analysis
- Architecture design
- Multi-file refactoring

**Why:** Superior reasoning, better code quality
**Cost:** Standard usage tier

### Opus 4.5 ⚠️ SELECTIVE USE
**Use for:** Critical decisions only
- Major architecture overhauls
- Security-critical implementations
- Cross-system dependencies

---

## 📋 Workflow Checklist

**Before Handing Off to Agent 2A:**
- [ ] Agent 2A provides clear work summary
- [ ] You copy report to Agent 2B
- [ ] Agent 2B updates `.claude/rules/` (if needed)
- [ ] Agent 2B provides "Remember" block
- [ ] You paste "Remember" to Agent 2A
- [ ] Agent 2A saves to MCP memory
- [ ] Agent 2B commits `.claude/rules/` changes

**Before Next Agent 2A Session:**
- [ ] All memory updates committed
- [ ] Git history clean
- [ ] Both memory systems synchronized
- [ ] Ready for new work

---

## 🔄 Examples

### Example 1: Storage Sovereignty (Phase II)

**Agent 2A Reports:**
```
Integrated Cloudflare R2 storage, converting from Vercel Blob.
Installed @payloadcms/storage-s3.
Converted project to Native ESM.
Updated payload.config.ts with s3Storage plugin.
Build verified - ready for Phase III.
```

**Agent 2B Output:**

`.claude/rules/payload.md` updated with:
- R2 storage configuration pattern
- Environment variables required
- s3Storage plugin example

`.claude/rules/nextjs.md` updated with:
- ESM module system documentation
- Config file syntax requirements

**"Remember" Block:**
```
Remember: Nerd with Nart has achieved storage sovereignty.

Decision: Migrated from Vercel Blob to Cloudflare R2 (S3-compatible)
Rationale: Establish vendor independence and data control
Impact: All media now stored in sovereign infrastructure

Phase II also included ESM conversion for Node 20+ compatibility.

Project: Nerd with Nart
Date: December 17, 2025
```

---

### Example 2: Simple Bug Fix

**Agent 2A Reports:**
```
Fixed hydration error in Admin UI by ensuring RootLayout only in (payload) route group.
Small change - no new patterns.
Build passes.
```

**Agent 2B Output:**

No `.claude/rules/` updates needed (already documented)

**"Remember" Block:**
```
Note: Hydration error resolved by route group isolation.
Confirmed: (payload) has own RootLayout, (site) has own layout.
No vendor decisions or strategic implications.
```

---

## 💡 Pro Tips

1. **Keep Reports Focused:** One main topic per handover
2. **Use Haiku Aggressively:** Saves 10+ hours of Claude Pro monthly
3. **Batch Memory Updates:** Don't commit after every tiny change
4. **Timestamp Decisions:** Always include date in Agent 2A memory
5. **Link Patterns:** Reference `.claude/rules/` files in "Remember" blocks

---

## 🚨 What NOT to Do

❌ Create new handover files (clutters git)
❌ Use Sonnet for memory categorization (wastes tokens)
❌ Forget to update Agent 2A MCP (strategic drift)
❌ Git reset without checking what's being removed
❌ Save trivial changes to memory (noise)

✅ Use existing `.claude/rules/` structure
✅ Use Haiku for memory bridge
✅ Keep both memory systems in sync
✅ Verify git status before operations
✅ Save only decisions and patterns

---

## 📚 Related Files

- [.claude/rules/memory-bridge-workflow.md](./memory-bridge-workflow.md) - Original process guide
- [.claude/rules/project-status.md](./project-status.md) - Current project state
- [CLAUDE.md](../../CLAUDE.md) - Project architecture
- [QUICK_COMMANDS.md](./QUICK_COMMANDS.md) - Memory command reference

---

## 🎯 Success Criteria

You'll know this workflow is working when:
- ✅ Memory updates take < 10 minutes per handover
- ✅ Both agents stay perfectly in sync
- ✅ No lost context between sessions
- ✅ Patterns are discoverable in `.claude/rules/`
- ✅ Strategic decisions are retrievable from Agent 2A
- ✅ Haiku handles all memory bridge work
- ✅ Minimal git commits (batched updates)
- ✅ Zero duplicated documentation

---

**Status:** LOCKED IN ✅
**Refinement:** Complete
**Ready for:** Production use

This is the gold standard. Use it. Love it. It works.
