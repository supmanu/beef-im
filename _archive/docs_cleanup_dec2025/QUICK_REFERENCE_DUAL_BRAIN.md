# 🧠 DUAL-BRAIN QUICK REFERENCE

**Last Updated:** December 16, 2025
**Status:** Production Ready

## Which Agent to Use?

### 🎯 Agent 2A (Strategist) - Antigravity Chat
**When:** Planning, decisions, brand checks, quick questions

**💡 HYBRID MODE (Cost Optimization):**
- **Gemini 2.0 Flash/Pro** - For tactical work (planning, debugging)
- **Claude Sonnet 4.5** - For memory saves (switch at session end)

**Example Workflow:**
```
[Start with Gemini]
"Should we upgrade to Next.js 17?"
"Help me debug this payment flow"
... work for 1-2 hours ...

[Switch to Claude at end]
"Review our conversation and save strategic decisions to memory"
```

**To Save:** Only Claude can save to MCP memory
```
"Save to memory: [decision]"
```

**Cost Savings:** ~70% token cost reduction vs all-Claude sessions

### 💻 Agent 2B (Builder) - Claude Code Terminal
**When:** Coding, refactoring, debugging, file operations
**Example:**
```
"Refactor the payment component to use hooks"
"Debug this TypeScript error in checkout.tsx"
"Add validation to the contact form"
```
**Memory:** File-based (CLAUDE.md + .claude/rules/*.md)
**To Save:** Use `Save?` command at end of session

---

## The Bridge Workflow

```
┌─────────────────────────────────────────┐
│ 1. Work in Agent 2B (Deep Coding)      │
│    "Implement feature X..."             │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ 2. Get Summary from Agent 2B            │
│    "Summarize what we implemented"      │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ 3. Save to Agent 2A (Strategic Memory)  │
│    "Save to memory: [summary]"          │
└─────────────────────────────────────────┘
```

---

## File Locations

### Agent 2A
- **Config:** `%APPDATA%\.gemini\antigravity\mcp_config.json`
- **Memory:** `G:\My Drive\_AI_MEMORY\Nerd_Brain\nerd-memory.json`

### Agent 2B
- **Config:** `C:\Users\supma\.claude\settings.json`
- **Storage:** `C:\Users\supma\.claude-mem\`
- **Archives:** `C:\Users\supma\.claude-mem\archives\`

---

## Common Commands

### Agent 2B (This Terminal)
```bash
# Check status
claude-mem status

# View logs
claude-mem logs

# View help
claude-mem help
```

---

## First Session Test

**After ending this session:**
1. Check: `C:\Users\supma\.claude-mem\archives\` for files
2. Start new session
3. Ask: "What project am I working on?"
4. Should recall: Nerd with Nart, Dual-Brain, Node 20.18.0

---

## Quick Rules

✅ **Agent 2A = Strategic "WHY"** (manual saves, use Claude for memory)
✅ **Agent 2B = Tactical "HOW"** (automatic saves)
✅ **You = The Synapse** (bridge critical decisions)

### 💰 Cost Optimization Tips

1. **Use Gemini for tactical work** (planning, debugging, brainstorming)
2. **Switch to Claude to save** (only Claude can write to MCP memory)
3. **Never ask Gemini to save** (it uses disconnected Google memory)
4. **Hourly checkpoints** for long sessions (prevents data loss)

### ⚠️ Critical Warning

```
❌ WRONG: "Hey Gemini, save this to memory"
   (Saves to Google's memory - Agent 2B can't see it)

✅ RIGHT: [Switch to Claude] "Save this to memory: [decision]"
   (Saves to nerd-memory.json - shared MCP protocol)
```

---

## Agent Selection Table

| Agent | Model | Use For | Memory | Cost |
|-------|-------|---------|--------|------|
| **2A-Tactical** | Gemini Flash/Pro | Planning, debugging | Temp | Low |
| **2A-Strategic** | Claude Sonnet 4.5 | Memory saves | MCP | Minimal |
| **2B** | Claude Sonnet 4.5 | Implementation | Auto | Justified |
| **2C** | Gemini Flash/Pro | Research | Isolated | Low |
