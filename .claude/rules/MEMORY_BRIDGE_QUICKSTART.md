# 🚀 Memory Bridge Workflow - ONE PAGE QUICKSTART

**Print this. Use this. Master it.**

---

## The 5-Step Workflow

```
┌──────────────────────────────────────────────────────────────┐
│ 1. AGENT 2A COMPLETES WORK                                  │
│    └─ Provides: Clear summary of changes + decisions        │
├──────────────────────────────────────────────────────────────┤
│ 2. YOU → COPY REPORT TO AGENT 2B                             │
│    └─ Say: "Agent 2A did [this]. Process for memory."        │
│    └─ Model: **HAIKU** (fast, cheap)                         │
├──────────────────────────────────────────────────────────────┤
│ 3. AGENT 2B → EVALUATES & SAVES                              │
│    ├─ Updates .claude/rules/ (tactical patterns)             │
│    └─ Provides "Remember" block (strategic decisions)        │
├──────────────────────────────────────────────────────────────┤
│ 4. YOU → PASTE REMEMBER BLOCK TO AGENT 2A                    │
│    └─ Agent 2A saves to MCP Memory                           │
├──────────────────────────────────────────────────────────────┤
│ 5. EITHER → COMMIT & PUSH                                    │
│    └─ Save .claude/rules/ changes to git                     │
└──────────────────────────────────────────────────────────────┘
```

---

## Tactical vs Strategic

| What | Saves To | Example |
|------|----------|---------|
| **Tactical** | `.claude/rules/` | "Use s3Storage for R2" |
| **Strategic** | Agent 2A MCP | "Data sovereignty matters" |

**Rule of Thumb:**
- Tactical = HOW to implement
- Strategic = WHY we chose it

---

## Copy-Paste Templates

### Template: Paste to Agent 2B
```
Agent 2A completed [Phase/Task Name].

Here's the report:
[paste Agent 2A's work summary]

Please process for memory (use Haiku):
1. Update .claude/rules/ if patterns discovered
2. Provide "Remember" block for Agent 2A
3. What should be saved vs ignored?
```

### Template: Agent 2B Response Format
```
✅ Tactical Updates:
- .claude/rules/[file].md updated with [pattern]

📋 Strategic Memory Block (paste to Agent 2A):
[Remember block here]
```

### Template: Commit Message
```bash
git add .claude/rules/*.md
git commit -m "docs(memory): Update Agent 2B memory - Phase [X]

Patterns saved:
- [Pattern 1]
- [Pattern 2]

Source: Agent 2A Phase [X] handover
Co-Authored-By: Agent 2A, Agent 2B
"
```

---

## Model Selection

| Task | Model | Why |
|------|-------|-----|
| Memory bridge categorization | **Haiku** ✅ | Fast, cheap, accurate enough |
| Coding implementation | **Sonnet 4.5** ✅ | Best code quality |
| Strategic analysis | **Sonnet/Opus** | Complex reasoning needed |

**Key:** Use Haiku for 80% of memory work. Save Sonnet for coding.

---

## Checklist: Before Next Session

- [ ] Agent 2A report received
- [ ] Agent 2B processed (Haiku mode)
- [ ] `.claude/rules/` updated (if needed)
- [ ] "Remember" block pasted to Agent 2A
- [ ] Memory changes committed to git
- [ ] Both agents synchronized

---

## Common Mistakes (DON'T DO THESE)

❌ Create handover documentation files
❌ Use Sonnet for memory categorization
❌ Skip Agent 2A MCP memory save
❌ Git reset without checking what's removed
❌ Save trivial changes to memory

---

## Pro Tips

✅ Keep reports focused (one topic per handover)
✅ Batch memory updates (don't commit after tiny changes)
✅ Always timestamp decisions in Agent 2A memory
✅ Reference `.claude/rules/` files in strategic blocks
✅ Use relative paths: `[.claude/rules/payload.md]()`

---

## 📞 Quick Commands

**Next handover:**
```
→ Paste Agent 2A report here (Haiku mode)
→ I'll provide Remember block + .claude/rules/ updates
→ You paste Remember to Agent 2A
→ Done!
```

---

## Full Documentation

See: [.claude/rules/dual-agent-memory-bridge.md](./dual-agent-memory-bridge.md)

---

**Status:** GOLD STANDARD ✅
**Ready to Use:** NOW ✅
**Print This:** YES ✅
