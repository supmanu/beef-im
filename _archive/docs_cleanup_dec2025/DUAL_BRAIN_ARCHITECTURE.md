# 🧠 DUAL-BRAIN ARCHITECTURE
**Project:** Nerd with Nart - Financial Strategy Platform
**Status:** ✅ OPERATIONAL (Phase H+)
**Date Established:** December 15, 2025
**Architecture Version:** 1.0

---

## 📋 OVERVIEW

This project uses a **Dual-Brain AI Architecture** with separated memory systems optimized for different cognitive tasks:

- **Agent 2A (The Strategist):** Strategic planning, architectural decisions, brand compliance
- **Agent 2B (The Builder):** Deep coding, refactoring, implementation with context preservation

### The Core Principle: Separation of Concerns

```
┌─────────────────────────────────────────────────────┐
│  AGENT 2A - STRATEGIC BRAIN (Knowledge Graph)      │
│  Google Antigravity IDE - Built-in Chat            │
├─────────────────────────────────────────────────────┤
│  Storage: G:\My Drive\_AI_MEMORY\Nerd_Brain\       │
│           nerd-memory.json                          │
│  Engine: MCP Memory Server                          │
│  Type: Structured Knowledge Graph                   │
│  Content: Laws, Decisions, Brand Rules, Constraints │
│  Lifespan: Permanent (Cloud backup)                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  AGENT 2B - TACTICAL BRAIN (File-Based Memory)     │
│  Claude Code Extension - VS Code Terminal          │
├─────────────────────────────────────────────────────┤
│  Storage: ./CLAUDE.md + ./.claude/rules/*.md        │
│  Engine: Built-in Claude Code Memory (file-based)   │
│  Type: Project context, patterns, guidelines        │
│  Content: Implementation patterns, coding rules     │
│  Lifespan: Version-controlled (git)                 │
└─────────────────────────────────────────────────────┘
```

---

---

## 🎯 FINAL ARCHITECTURE DECISION (Dec 16, 2025)

**After extensive testing, we've finalized Agent 2B's memory approach:**

### ❌ What We Tried (and Why It Failed)
- **claude-mem npm v3.9.16:** Windows PATH issues, hook failures
- **claude-mem plugin v7.2.4:** "ProcessTransport is not ready" crashes, Chroma sync failures

### ✅ What We're Using (Production Setup)

**Agent 2B Memory:** Built-in Claude Code file-based memory system

**Why This Works:**
1. **Zero Dependencies:** No external plugins or servers to maintain
2. **Version Controlled:** Memory files tracked in git for team collaboration
3. **Reliable:** No crashes, no complex setup, always available
4. **Modular:** Organize patterns by topic in `.claude/rules/`
5. **Portable:** Works on any OS without modification

**Architecture:**
```
nerd-with-nart/
├── CLAUDE.md                    # Main project context (committed)
├── CLAUDE.local.md              # Personal preferences (gitignored)
└── .claude/
    └── rules/
        ├── payload.md           # CMS-specific patterns
        ├── nextjs.md            # Next.js conventions
        └── deployment.md        # Deployment procedures
```

**Memory Persistence:**
- **Strategic decisions:** Manually bridge to Agent 2A (Google Drive)
- **Implementation patterns:** Document in `.claude/rules/`
- **Project context:** Keep in CLAUDE.md (version-controlled)
- **Code reference:** Use @-mention for importing files

---

## 🔧 TECHNICAL SETUP

### Agent 2A Configuration (Antigravity Chat)

**Config File:** `%APPDATA%\.gemini\antigravity\mcp_config.json`

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-memory"
      ],
      "env": {
        "MEMORY_FILE_PATH": "G:\\My Drive\\_AI_MEMORY\\Nerd_Brain\\nerd-memory.json"
      }
    }
  }
}
```

**Access:** Antigravity → MCP Servers → Manage MCP Servers → View raw config

**Status:** ✅ Verified operational (Dec 15, 2025)

### Agent 2B Configuration (Claude Code Extension)

**Memory Files:**

```
nerd-with-nart/
├── CLAUDE.md                    # Main project context
├── CLAUDE.local.md              # Personal preferences (gitignored)
└── .claude/
    └── rules/
        ├── payload.md           # Payload CMS patterns
        ├── nextjs.md            # Next.js conventions
        ├── deployment.md        # Deployment procedures
        ├── api-rules.md         # API patterns
        ├── memory-bridge-workflow.md  # Bridge workflow
        └── QUICK_COMMANDS.md    # Command cheatsheet
```

**Usage:**
```bash
# Edit memory files
/memory

# Files auto-load at session start
# Use @-mention syntax to reference files
@.claude/rules/payload.md
```

**Status:** ✅ File-based memory operational, git-tracked

---

## 📖 USAGE GUIDE

### When to Use Agent 2A (The Strategist)

**Tool:** Antigravity built-in chat

**Use Cases:**
- 🎯 Strategic planning: "Should we migrate to Tailwind v4?"
- 🏗️ Architectural decisions: "How should we structure the new API?"
- 📐 Brand compliance: "Does this design follow Teal Protocol?"
- 🔍 Quick lookups: "What's our Node version law?"
- 🧪 Logic validation: "Does this approach violate our principles?"

**How to Save Strategic Memories:**
```
User: "Save this decision to memory: We are staying on Tailwind v3.4.17
because v4 breaks our current setup."
```

**Memory Type:** Permanent, cloud-backed, structured

---

### 💡 ADVANCED: Hybrid Agent 2A (Cost Optimization)

**Discovery:** You can use BOTH Gemini and Claude in the same Antigravity chat for maximum efficiency!

#### The Hybrid Pattern

```
┌─────────────────────────────────────────────────────────┐
│  AGENT 2A - HYBRID MODE (Token Cost Optimization)       │
├─────────────────────────────────────────────────────────┤
│  Phase 1: Tactical Work (90% of session)                │
│  ├─ Model: Gemini 2.0 Flash/Pro                         │
│  ├─ Tasks: Planning, debugging, minor fixes             │
│  ├─ Cost: Uses Google Pro quota (generous)              │
│  └─ Speed: Fast responses, low latency                   │
│                                                          │
│  Phase 2: Memory Save (10% of session)                  │
│  ├─ Model: Claude Sonnet 4.5                            │
│  ├─ Tasks: Extract & save strategic decisions           │
│  ├─ Cost: Minimal (only summary operations)             │
│  └─ Quality: Precise memory synthesis                   │
└─────────────────────────────────────────────────────────┘
```

#### How It Works

**1. Start with Gemini (Tactical Phase)**
```
[Antigravity Chat - Select Gemini 2.0 Flash]

You: "Let's debug the payment flow error"
Gemini: [provides debugging steps - uses Google quota]

You: "Now help me plan the refactoring approach"
Gemini: [suggests 3 approaches with pros/cons]

You: "Let's go with approach B"
Gemini: [guides implementation]

... work for 1-2 hours using Gemini ...
```

**2. Switch to Claude (Memory Phase)**
```
[Switch model dropdown: Gemini → Claude Sonnet 4.5]

You: "Review our entire conversation above and save the strategic
decisions to memory. Focus on:
- What we decided and why
- Any architectural patterns we established
- Technical constraints we discovered
- Solutions we validated

Format as a concise summary for future reference."

Claude: [Reads full chat history, extracts decisions, saves via MCP]
"I've saved the following to your strategic memory:
1. Decision: Use approach B for payment refactoring (faster, less risky)
2. Pattern: Stripe Checkout preferred over Elements
3. Constraint: Must maintain backward compatibility with v1 API
..."
```

**3. Continue with Gemini (Optional)**
```
[Switch back to Gemini if continuing work]
```

#### Why This Works

✅ **Claude can read full chat history** - Sees everything you and Gemini discussed
✅ **Gemini handles tactical work** - Fast, uses generous Google Pro quota
✅ **Claude handles memory** - Only processes final save (minimal tokens)
✅ **Quality control** - Claude's precision for strategic extraction
✅ **No data loss** - MCP memory system properly utilized

#### Cost Comparison

| Approach | Gemini Tokens | Claude Tokens | Est. Cost* | Notes |
|----------|---------------|---------------|------------|-------|
| All Claude | 0 | 200k | $1.00 | Precise but expensive |
| All Gemini | 200k | 0 | $0.20** | Can't save to MCP memory |
| **Hybrid** | 180k | 20k | **$0.28** | **Best value!** |
| Hybrid + Hourly Saves | 180k | 30k | $0.31 | Best safety! |

*Based on typical 2-hour session with 50 messages
**Gemini can't save to MCP, so strategic memory is lost

#### Recommended Workflows

**Option A: Single Save at End** (Maximum Efficiency)
```
Gemini (90 min) → Switch → Claude (2 min save) → Done
```
- ✅ Maximum token efficiency
- ⚠️ Risk: If you forget to switch, no memory saved

**Option B: Hourly Checkpoints** (Recommended for Long Sessions)
```
Gemini (60 min) → Switch → Claude (save checkpoint 1)
→ Switch back → Gemini (60 min) → Switch → Claude (final save)
```
- ✅ Never lose >60 min of decisions
- ✅ Safer for critical planning sessions
- ⚠️ Slightly more switching overhead

**Option C: Manual Notes Bridge** (Maximum Control)
```
Gemini (full session) + You take notes manually
→ At end: Switch to Claude
→ You: "Save these decisions to memory: [paste notes]"
```
- ✅ No context window limits
- ✅ Explicit control over what's saved
- ⚠️ Requires manual note-taking discipline

#### Critical Rules

⚠️ **NEVER ask Gemini to "save to memory"** - It will use Google's proprietary memory system (disconnected from MCP)

⚠️ **ALWAYS switch to Claude for MCP saves** - Only Claude has access to `create_entities` and `nerd-memory.json`

⚠️ **Context window limits** - For very long sessions (>100k tokens), consider periodic saves to avoid truncation

✅ **Explicit prompts** - When switching to Claude, be specific about what to save

#### Example Session Flow

```
[9:00 AM] Start Antigravity chat with Gemini 2.0 Flash
[9:00-10:00] Planning session (Gemini handles all discussion)
[10:00] Switch to Claude Sonnet 4.5
[10:02] "Save our last hour's strategic decisions to memory"
[10:02] Switch back to Gemini 2.0 Flash
[10:02-11:00] Continue debugging (Gemini handles tactical work)
[11:00] Switch to Claude Sonnet 4.5
[11:02] "Save final decisions and solutions to memory"
[11:02] Session complete - strategic memory preserved!
```

**Result:** 2-hour productive session, minimal Claude tokens, full memory persistence

---

### 🎯 Agent Selection Quick Reference

| Agent | Model | Use For | Memory Type |
|-------|-------|---------|-------------|
| **2A-Tactical** | Gemini 2.0 Flash/Pro | Planning, debugging, brainstorming | Google native (temp) |
| **2A-Strategic** | Claude Sonnet 4.5 | Memory saves, decision extraction | MCP (permanent) |
| **2B** | Claude Sonnet 4.5 | Deep implementation, file ops | File-based (git-tracked) |
| **2C** | Gemini 2.0 Flash/Pro | Research, multimodal tasks | Google native (isolated) |

### When to Use Agent 2B (The Builder)

**Tool:** Claude Code Extension terminal (this terminal)

**Use Cases:**
- 💻 Deep refactoring: Multi-file changes with context
- 🔨 Complex implementations: Features requiring detailed code context
- 🐛 Debugging: Issues requiring session history
- 📝 File operations: Reading, editing, writing code
- 🔄 Workflow automation: Git, npm, build processes

**Memory Type:** File-based (CLAUDE.md + .claude/rules/*.md)

**What Gets Saved:**
- Implementation patterns and coding guidelines
- Project-specific conventions
- Common commands and workflows
- Reference implementations (@-mention syntax)
- Architecture decisions (manually documented)

### The "Bridge Workflow"

Since the two brains don't sync automatically, **you act as the synapse**:

1. **Deep Work in Agent 2B (CLI):**
   ```
   User: "Refactor the payment flow to use the new Stripe integration"
   Agent 2B: [Performs deep refactoring across 8 files]
   ```

2. **Extract Summary:**
   ```
   User: "Summarize what we just implemented"
   Agent 2B: [Provides concise summary]
   ```

3. **Bridge to Agent 2A (Chat):**
   ```
   [Switch to Antigravity Chat - Agent 2A]
   User: "Save this to memory: Implemented new Stripe payment flow.
   Replaced legacy PayPal integration. Files: checkout.tsx,
   api/payment.ts, stripe.config.ts. Key decision: Using Stripe
   Checkout instead of Elements for faster implementation."
   ```

**Result:** Strategic brain knows WHAT changed and WHY, tactical brain knows HOW in detail.

---

## ✅ VERIFICATION CHECKLIST

### Agent 2A (Strategist) - Verified ✅
- [x] MCP config file created at correct path
- [x] Google Drive folder exists: `G:\My Drive\_AI_MEMORY\Nerd_Brain\`
- [x] Write test successful (nerd-memory.json created)
- [x] Memory persistence confirmed across sessions

### Agent 2B (Builder) - File-Based Memory ✅
- [x] Built-in Claude Code memory (no external dependencies)
- [x] CLAUDE.md file exists in project root
- [x] Memory system operational (file-based)
- [x] Version-controlled via git
- [ ] Create .claude/rules/ directory for modular patterns
- [ ] Document implementation patterns as they emerge

### Post-Session Workflow

**After Completing Work in Agent 2B:**
1. Document new patterns in `.claude/rules/` if significant
2. Update CLAUDE.md with new commands or conventions
3. Commit changes to git for team sharing
4. Bridge strategic decisions to Agent 2A manually

**To Access Memory:**
- Use `/memory` command to edit CLAUDE.md
- Reference files with @-mention syntax
- Organize rules by topic in `.claude/rules/`

**Test 3: Cross-Brain Sync**
1. Make a decision in Agent 2B
2. Summarize and save to Agent 2A
3. Query Agent 2A to verify strategic memory
4. Start new Agent 2B session and verify tactical recall

---

## 🛡️ ARCHITECTURAL LAWS

### Law 1: Separation of Concerns
- **Strategic Brain (2A):** Stores WHAT and WHY (decisions, laws, constraints)
- **Tactical Brain (2B):** Stores HOW and WHEN (code, changes, execution)
- **Never mix:** Don't pollute strategic knowledge graph with debug logs

### Law 2: Memory Pin Protocol
- Agent 2A memories are **explicit** (you manually save important decisions)
- Agent 2B memories are **automatic** (hooks capture everything)

### Law 3: Project Isolation
- **Nerd with Nart:** Uses `nerd-memory.json` for Agent 2A
- **Other projects:** Create separate memory files (e.g., `other-project-memory.json`)
- Agent 2B auto-isolates via project directory structure

### Law 4: The Human as Synapse
- **You** are responsible for bridging critical decisions from 2B → 2A
- Ask for summaries: "Summarize what we implemented"
- Explicitly save: "Save this decision to memory: [decision]"

---

## 📊 BENEFITS

### Performance
- ✅ **Fast strategic queries:** Agent 2A scans structured graph, not raw logs
- ✅ **Deep tactical context:** Agent 2B has full session history for complex refactoring
- ✅ **Cost efficient:** No token waste on irrelevant context

### Reliability
- ✅ **Cloud backup:** Agent 2A memories survive PC failures (Google Drive)
- ✅ **Local speed:** Agent 2B has instant access to recent work
- ✅ **Context preservation:** Never lose implementation details

### Scalability
- ✅ **Project isolation:** Clean separation between projects
- ✅ **Memory growth:** Strategic graph stays lean, tactical archives roll over
- ✅ **Multi-agent:** Can add more specialized agents in future

---

## 🔍 TROUBLESHOOTING

### "Agent 2A can't find memory tool"
**Solution:** Verify you're using Claude 3.5 Sonnet (not Gemini) in Antigravity chat

### "Agent 2B shows CHROMA_MCP_TOOLS.json warning"
**Status:** Known cosmetic issue, doesn't prevent functionality
**Impact:** None (hooks work regardless)

### "Agent 2B doesn't recall previous patterns"
**Check:**
1. Are files present in `.claude/rules/`?
2. Run `/memory` command to verify file contents
3. Check git status to ensure files are committed
4. Restart Claude Code session to reload memory
5. Use `@filename.md` syntax to explicitly reference rule files

### "Memories aren't syncing between agents"
**Expected behavior:** They DON'T auto-sync (by design)
**Solution:** Use the Bridge Workflow (manual summary transfer)

---

## ❓ WHY CLAUDE (NOT GEMINI) FOR AGENT 2A?

### The Critical Technical Distinction

**Agent 2A requires MCP (Model Context Protocol) tool access**, which is model-specific. Here's why Claude is required:

### MCP Memory Server Tools

The strategic memory system relies on these function calls:
- `create_entities` - Store new memories to knowledge graph
- `read_graph` - Query existing memories
- `search_nodes` - Semantic search across graph
- `open_nodes` - Retrieve specific memory nodes

### Model Compatibility

**Claude Sonnet (in Antigravity):**
- ✅ HAS access to MCP tools (configured via `mcp_config.json`)
- ✅ Can call `create_entities` to save structured memories
- ✅ Can query the knowledge graph in `nerd-memory.json`
- ✅ Uses the shared memory protocol with Agent 2B

**Gemini 2.0 Flash/Pro:**
- ❌ Does NOT have access to MCP tools
- ❌ Cannot call memory server functions
- ❌ Cannot write to `nerd-memory.json`
- ✅ Has its own proprietary long-term memory (Google's system)
- ✅ Can read/write Google Drive files directly

### What Happens If You Use Gemini?

**Scenario:** You tell Gemini: "Save this to memory: We use Node 20 LTS"

```
Gemini's Response: "I've noted that. I'll remember we use Node 20 LTS."

What Actually Happens:
├─ Gemini stores it in Google's proprietary memory system
├─ Does NOT write to nerd-memory.json
├─ Does NOT use MCP Memory Server
├─ Memory is NOT accessible to Agent 2B (Claude)
├─ Memory format is NOT structured knowledge graph
└─ Result: Two disconnected memory systems ❌
```

### Architecture Requires Shared Protocol

```
✅ CORRECT (Shared Memory):
┌──────────────────────────────────────┐
│ Agent 2A (Claude) → MCP Memory       │
│         ↓                            │
│ nerd-memory.json (shared storage)    │
│         ↓                            │
│ Agent 2B (Claude) → Can query it     │
└──────────────────────────────────────┘

❌ BROKEN (If using Gemini):
┌──────────────────────────────────────┐
│ Agent 2A (Gemini) → Google Memory    │
│         X (no connection)            │
│ nerd-memory.json (empty/unused)      │
│         X (no connection)            │
│ Agent 2B (Claude) → Sees nothing     │
└──────────────────────────────────────┘
```

### Could You Use Gemini for Agent 2A?

**Technically yes, but you'd need to:**
1. Rebuild the entire memory system around Gemini's native memory API
2. Write custom integration to export Gemini memories to Agent 2B-compatible format
3. Lose the structured knowledge graph benefits
4. Maintain two separate memory systems

**This defeats the purpose of the Dual-Brain Architecture**, which relies on compatible memory protocols.

### What IS Gemini Good For?

Consider adding **Agent 2C - "The Researcher"** (optional third brain):

**Role:** Web research, document analysis, multimodal tasks
**Memory:** Uses Gemini's native long-term memory (isolated)
**Use Cases:**
- Research Thai insurance regulations
- Analyze competitor websites
- Process uploaded PDFs/images
- Generate content drafts

**Why it works:** Agent 2C doesn't need memory integration with Agent 2A/2B. You still bridge strategic insights manually to Agent 2A for permanent storage.

### Bottom Line

**Use Claude Sonnet for Agent 2A because:**
1. ✅ Has MCP tool access (required for memory system)
2. ✅ Compatible with the shared memory protocol
3. ✅ Preserves knowledge graph structure
4. ✅ Enables future memory sharing between Agent 2A and 2B

**Use Gemini for Agent 2C (optional):**
- ✅ Research and multimodal tasks
- ✅ Tasks that don't require memory integration
- ✅ Leverages Gemini's strengths (speed, cost, multimodal)

---

## 📚 RELATED DOCUMENTATION

- [CLAUDE.md](./CLAUDE.md) - Main project context for Claude
- [Migration History](./_archive/migration-history.md) - Historical migration logs (Phases A-H)
- [Claude-mem Documentation](https://github.com/anthropics/claude-mem)
- [MCP Memory Server](https://github.com/modelcontextprotocol/servers)

---

## 🚀 NEXT STEPS

### For New Team Members
1. Review [DUAL_BRAIN_EXECUTIVE_SUMMARY.md](DUAL_BRAIN_EXECUTIVE_SUMMARY.md) for architecture overview
2. Review [QUICK_REFERENCE_DUAL_BRAIN.md](QUICK_REFERENCE_DUAL_BRAIN.md) for usage guide
3. Understand when to use Agent 2A (strategic) vs Agent 2B (tactical)

### After Each Session
1. Run `Save?` command to evaluate what should be preserved
2. Update `.claude/rules/*.md` files for tactical patterns
3. Bridge strategic decisions to Agent 2A using provided commands
4. Commit memory files to git for team sharing

### Ongoing Maintenance
1. Weekly review of `.claude/rules/` files for outdated patterns
2. Promote tactical patterns to strategic rules when appropriate
3. Keep Agent 2A memory graph clean and focused
4. Use git history to track memory evolution

---

**Architecture Finalized:** December 16, 2025
**Verified By:** Claude Code Extension (Agent 2B)
**Strategic Oversight:** Strategic CTO v6.6.1 (via Agent 2A)
**Status:** ✅ ARCHITECTURE LOCKED - PRODUCTION READY
