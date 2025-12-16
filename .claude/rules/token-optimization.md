# Token Optimization Strategy

**Environment:** Antigravity IDE (VS Code Fork)
**Setup:** Both agents run in same IDE, different chat tabs

## 🎯 When to Use Which Agent

### Agent 2A (Antigravity Built-in Chat)
**Platform:** Antigravity IDE - Chat Tab 1
**Default Model:** Gemini 3 Pro (very generous limits - December 2025)
**Memory:** MCP Memory Server (G:\My Drive\_AI_MEMORY\Nerd_Brain\)

**Available Models:**
- Gemini 3 Pro: Very generous limits (default for heavy work)
- Claude Sonnet 4.5: Limited tokens (selective use)
- Claude Opus 4.5: Even more limited (strategic only)

**Use Gemini 3 Pro for:**
- Heavy lifting implementations (Phase I, II, etc.)
- Bulk file editing
- Multiple component creation
- Refactoring work
- Long documentation writing
- Routine coding tasks

**Switch to Claude Sonnet 4.5 only for:**
- Complex TypeScript type issues
- Tricky React hooks logic
- Writing to MCP Memory Server (requires Claude model)
- Quality-critical code sections

**Switch to Claude Opus 4.5 only for:**
- Critical architecture decisions
- Complex system design
- Strategic oversight requiring highest reasoning

---

### Agent 2B (Claude Code Extension)
**Platform:** Antigravity IDE - Chat Tab 2 (Claude Code Extension)
**Model:** Claude Sonnet 4.5 (always)
**Limits:** 5-hour usage cap + weekly limit (Claude Pro plan)
**Fallback:** Developer API (expensive!)
**Memory:** Built-in file-based (`.claude/rules/*.md` + `CLAUDE.md`)

**Use for:**
- Precision coding work (Claude is better than Gemini at coding)
- Complex logic implementation
- Quick pattern documentation updates
- Emergency fixes
- Short consultations (< 30 min)
- File-based memory updates

**Avoid using for:**
- Bulk implementations (use Agent 2A with Gemini 3 Pro)
- Long refactoring sessions (use Agent 2A)
- Routine file editing (use Agent 2A)

---

## 🔄 Memory Bridge Workflow

### After Agent 2A Heavy Session

**Step 1: Agent 2A Saves to MCP (Strategic Memory)**

In Agent 2A chat tab, switch to Claude Sonnet 4.5:
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

Switch to Agent 2B chat tab (Claude Code Extension):
```
"Agent 2A completed [task name] using Gemini 3 Pro.

Summary: [paste from Agent 2A tab]

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
**Convenience:** Just switch tabs in same Antigravity IDE!

---

## 💰 Token Budget Example

**Agent 2A (Typical Heavy Session in Antigravity):**
- 3 hours Gemini 3 Pro: ✅ Free (generous limits)
- 20 min Claude Sonnet 4.5: ✅ Acceptable (limited pool)
- 5 min Claude Opus 4.5: ✅ Strategic only (very limited)

**Agent 2B (Quick Sync in same Antigravity IDE):**
- 10 min pattern documentation: ✅ Minimal usage

**Savings:** ~2.5 hours Claude Pro usage avoided!

---

## 📋 Quick Commands

### Start Heavy Work (Agent 2A Tab)
```
Switch to Gemini 3 Pro. Implement [task name].
Use Gemini for all routine work.
```

### Save Strategic Memory (Agent 2A Tab)
```
Switch to Claude Sonnet 4.5.
Save to MCP Memory: [summary]
```

### Sync Tactical Memory (Agent 2B Tab)
```
Agent 2A completed [task] using Gemini 3 Pro.
Update .claude/rules/ with patterns.
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
