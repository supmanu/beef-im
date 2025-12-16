# Token Optimization Strategy

## 🎯 When to Use Which Agent

### Agent 2A (Antigravity IDE)
**Default Model:** Gemini 2.5 Pro (very generous limits)

**Use for:**
- Heavy lifting implementations (Phase I, II, etc.)
- Bulk file editing
- Multiple component creation
- Refactoring work
- Long documentation writing
- Strategic planning

**Switch to Claude Sonnet 4.5 only for:**
- Complex TypeScript type issues
- Tricky React hooks logic
- Writing to MCP Memory Server (requires Claude)

**Switch to Claude Opus 4.5 only for:**
- Critical architecture decisions
- Complex system design
- Strategic oversight

---

### Agent 2B (Claude Code Extension - VS Code)
**Model:** Claude Sonnet 4.5 (5-hour usage cap + weekly limit)
**Fallback:** Developer API (expensive!)

**Use for:**
- Precision coding work (Claude is better)
- Complex logic implementation
- Quick pattern documentation updates
- Emergency fixes
- Short consultations (< 30 min)

**Avoid using for:**
- Bulk implementations
- Long refactoring sessions
- Routine file editing

---

## 🔄 Memory Bridge Workflow

### After Agent 2A Heavy Session

**Step 1: Agent 2A Saves to MCP (Strategic Memory)**

Switch Agent 2A to Claude Sonnet 4.5:
```
"Save these strategic decisions to MCP Memory:
- [What was accomplished]
- [Key architectural decisions]
- [Important patterns established]
- [Technology choices made]

Project: Nerd with Nart
Date: [today's date]"
```

**Step 2: Bridge to Agent 2B (Tactical Memory)**

Open new Claude Code chat:
```
"Agent 2A completed [task name] using Gemini 2.5 Pro.

Summary: [paste from Agent 2A]

Key patterns to document:
- [Pattern 1]
- [Pattern 2]

Update Agent 2B memory files."
```

Agent 2B will:
- Update `.claude/rules/*.md` files
- Commit to git
- Confirm sync complete

**Time cost:** 5-10 minutes of Claude Pro usage

---

## 💰 Token Budget Example

**Agent 2A (Typical Heavy Session):**
- 3 hours Gemini 2.5 Pro: ✅ Free
- 20 min Claude Sonnet 4.5: ✅ Acceptable
- 5 min Claude Opus 4.5: ✅ Strategic only

**Agent 2B (Quick Sync):**
- 10 min pattern documentation: ✅ Minimal usage

**Savings:** ~2.5 hours Claude Pro usage avoided!

---

## 📋 Quick Commands

### Start Heavy Work (Agent 2A)
```
Switch to Gemini 2.5 Pro. Implement [task name].
Use Gemini for all routine work.
```

### Save Strategic Memory (Agent 2A)
```
Switch to Claude Sonnet 4.5.
Save to MCP Memory: [summary]
```

### Sync Tactical Memory (Agent 2B)
```
Agent 2A completed [task]. Update .claude/rules/ with patterns.
```

---

## 🎯 Decision Matrix

**Choose Agent 2A when:**
- Over Agent 2B usage limits
- Task will take > 1 hour
- Bulk/routine work
- Want to save Claude Pro hours

**Choose Agent 2B when:**
- Within usage limits
- Need Claude's coding quality
- Complex logic required
- Quick fixes (< 30 min)

---

**Last Updated:** December 16, 2025
