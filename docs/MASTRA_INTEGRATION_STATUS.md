# Mastra AI Integration — Status & Operations Guide
**Last Updated:** March 22, 2026
**Stack:** Mastra 1.x (`@mastra/core` 1.15, `@mastra/memory` 1.9, `@mastra/pg` 1.8, `@mastra/rag` 2.1)
**Status:** Functional (CLI-only, no web-facing API)

---

## What Mastra Does in This Project

Mastra powers the **"Sovereign Brain"** — the AI backbone behind Nerd with Nart's content production and insurance consulting. Instead of injecting 70KB+ of knowledge into every LLM prompt, the system stores 13 pillar documents in a **PgVector database** (488 rows), and agents **search for what they need** at runtime.

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│  YOU (CLI)                                      │
│  npx tsx scripts/generate-content.ts            │
└────────────────┬────────────────────────────────┘
                 │
     ┌───────────▼───────────┐
     │   Nart Avatar Agent   │  ← Gemini 2.5 Flash
     │   (nerd/agents/)      │     + Voice DNA prompt
     ├───────────────────────┤
     │  Tools:               │
     │  ├─ searchNerdBrain   │  → PgVector (nerd_brain, 488 rows)
     │  └─ calculatePremium  │  → CSV rate tables (AIA products)
     │                       │
     │  Memory:              │
     │  └─ PostgresStore     │  → Neon Postgres (persistent threads)
     └───────────────────────┘

     ┌───────────────────────┐
     │   CTO Conductor       │  ← Gemini 2.5 Pro
     │   (nerd/agents/)      │     + Strategic oversight
     ├───────────────────────┤
     │  Tools:               │
     │  ├─ searchNerdBrain   │
     │  └─ askNartAvatar     │  → Delegates to Nart Avatar
     └───────────────────────┘
```

---

## The Two Agents

| Agent | File | Model | Role |
|-------|------|-------|------|
| **Nart Avatar** | `nerd/agents/nart-avatar.ts` | `gemini-2.5-flash` | Content creator + insurance consultant. Loads Voice DNA, searches vector DB, calculates premiums. Has persistent memory. |
| **CTO Conductor** | `nerd/agents/cto-conductor.ts` | `gemini-2.5-pro` | Strategic oversight. Can delegate to Nart Avatar, verify constitutional compliance, audit content quality. |

**Note (Mar 2026):** Models are set to `gemini-2.5-flash` / `gemini-2.5-pro`. The `.claude/rules/mastra-rag.md` standard says to use `gemini-3-flash` / `gemini-3-pro`. Update the agent files if the 2.5 models start returning errors.

---

## The Two Tools

### 1. Search Nerd Brain (`mastra/tools/search_nerd_brain.ts`)
- **What:** Vector similarity search over 13 pillar documents
- **How:** Generates embedding via `text-embedding-004`, queries PgVector index `nerd_brain` (768 dimensions, cosine)
- **Returns:** Top 5 results with score, content text, source filename, document type
- **Use case:** Agent needs context about brand rules, health data, insurance terms, content frameworks

### 2. Calculate Premium (`mastra/tools/calculate_premium.ts`)
- **What:** Exact AIA insurance premium calculation from CSV rate tables
- **How:** Reads `nerd/references/raw/calculator_source/main_policies.csv` + `riders.csv`
- **Inputs:** `age`, `gender`, `plan_code` (e.g., `20PLN`, `HHM5`), optional `sum_assured`
- **Returns:** Plan name, premium (THB), calculation method, occupational class disclaimer
- **Authority:** FINAL AUTHORITY for pricing — supersedes vector search and markdown

---

## What You Can Do Right Now

### Generate a Thai Financial Article
```bash
cd ~/Melkor-OS/departments/nerd-with-nart
npx tsx scripts/generate-content.ts
```
Edit the prompt inside `scripts/generate-content.ts` to change the topic. Output saves to `draft-article.md`.

### Test the Agent (Diagnostic)
```bash
npx tsx scripts/test-agent.ts
```
Sends "What is the obesity rate in NHES VII?" to Nart Avatar and shows the response + tool calls.

### Search the Knowledge Base
```bash
npx tsx scripts/test-brain.ts
```
Queries the `nerd_brain` vector DB with a sample question. Verifies embeddings and search are working.

### Test Persistent Memory
```bash
npx tsx scripts/test-memory.ts
```
Two-turn conversation: tells the agent "My name is Nart", then asks "What is my name?" — verifies memory recall.

### Re-Ingest Pillars (after editing knowledge files)
```bash
npx tsx scripts/ingest-brain.ts
```
Re-chunks all `.md` files in `nerd/pillars/`, generates embeddings, upserts to PgVector. Run this after editing any pillar file.

### Start MCP Server (for Cherry Studio / Claude Desktop)
```bash
npx tsx scripts/mastra-mcp.ts
```
Exposes both agents as MCP tools over stdio transport. Allows interactive use from IDE chat panels.

### Test CTO Conductor
```bash
npx tsx scripts/test-conductor.ts
```

### Calculate Insurance Premiums
```bash
npx tsx scripts/probe-calculator.ts
```

### Verify Agent Startup
```bash
npx tsx scripts/verify-avatar.ts
```

---

## Knowledge Base (nerd_brain Vector DB)

**Database:** Neon Postgres with pgvector extension
**Index:** `nerd_brain` (snake_case required)
**Dimensions:** 768 (Gemini text-embedding-004)
**Rows:** 488 chunks from 13 pillar files

### Source Files (`nerd/pillars/`)

| File | Size | Content |
|------|------|---------|
| `voice-dna.md` | 18KB | Core identity — who "Nerd with Nart" is |
| `constitution.md` | 17KB | Brand laws, bans, fiduciary standard |
| `content-engine.md` | 16KB | Content framework (Mode A/B/C, Quick Magnet, Kane Edition) |
| `data-nhes-vii.md` | 5KB | Thai health stats (45% obesity, 10.6% diabetes, 29.5% hypertension) |
| `data-terminology.md` | 14KB | 35 verified Thai-first insurance/health terms |
| `data-thai-handshake-exceptions.md` | 7KB | Thai formatting rules (headers, numbers, currency) |
| `data-citation-template.md` | 7KB | Citation formats (TMO, OIC, academic) |
| `data-proposal-logic.md` | 46KB | Insurance proposal logic (multi-pay, benefits) |
| `framework-deep-dive.md` | 21KB | NotebookLM research methodology |
| `tech-bridge-lab.md` | 14KB | 25 analogies library (Boiling Frog, The Bridge, etc.) |
| `visual-engine.md` | 22KB | Visual style guide (Teal protocol, typography) |
| `master-index.md` | 14KB | System map |
| `sovereign-phrases.md` | 4KB | High-intensity linguistic patterns |

**To re-ingest after edits:** `npx tsx scripts/ingest-brain.ts`

---

## What's NOT Wired Up Yet

| Capability | Status | Notes |
|-----------|--------|-------|
| Web-facing chat API | Not built | No `/api/chat` route — agents are CLI-only |
| Public chatbot UI | Not built | No React component for user-facing conversations |
| Automated content pipeline | Manual | Must edit prompt in `generate-content.ts` and run CLI |
| Agent-to-Payload publishing | Not built | Generated articles don't auto-publish to CMS |
| Scheduled ingestion | Not built | Must manually run `ingest-brain.ts` after pillar edits |
| MCP integration with Claude Code | Not tested | `mastra-mcp.ts` exists but hasn't been verified with current stack |

---

## Mastra Packages (6 total)

```json
"@mastra/core": "^1.15.0",     // Agent class, tool definitions
"@mastra/mcp": "^1.3.1",       // MCP server (stdio transport)
"@mastra/memory": "^1.9.0",    // Persistent conversation memory
"@mastra/pg": "^1.8.2",        // PostgresStore + PgVector
"@mastra/rag": "^2.1.2",       // RAG utilities (chunk, embed)
"mastra": "^1.3.14"            // CLI + orchestration
```

---

## Environment Requirements

```env
# Required in .env (NEVER commit this file)
DATABASE_URL=postgresql://...    # Neon Postgres (vector DB + memory)
GOOGLE_GENERATIVE_AI_API_KEY=... # Gemini API key (for agents + embeddings)
```

---

## File Map

```
nerd/
├── agents/
│   ├── nart-avatar.ts          # Primary content agent
│   └── cto-conductor.ts        # Strategic oversight agent
├── pillars/                    # 13 knowledge files → vector DB
│   ├── voice-dna.md
│   ├── constitution.md
│   ├── content-engine.md
│   └── ... (10 more)
└── references/
    └── raw/calculator_source/
        ├── main_policies.csv   # AIA main policy rates
        └── riders.csv          # AIA rider rates

mastra/
└── tools/
    ├── search_nerd_brain.ts    # Vector search tool
    └── calculate_premium.ts    # Premium calculator tool

scripts/
├── generate-content.ts         # Generate Thai article via Nart Avatar
├── ingest-brain.ts             # Ingest pillars → vector DB
├── test-agent.ts               # Diagnostic test
├── test-brain.ts               # Vector search test
├── test-memory.ts              # Memory persistence test
├── test-conductor.ts           # CTO agent test
├── mastra-mcp.ts               # MCP server for IDE integration
├── probe-calculator.ts         # Premium calculation test
├── verify-avatar.ts            # Agent startup check
└── sync-nerd.ts                # Knowledge sync utility
```

---

## Strategic Analysis: Mastra AI vs Claude Native (March 2026)

### What Mastra Provides Today

1. **Agent Framework** — `Agent` class with system prompts, tools, memory
2. **Vector Database** — `PgVector` for embedding storage/search (pgvector on Neon)
3. **Persistent Memory** — `PostgresStore` + `Memory` for conversation threads
4. **Tool System** — `createTool` with Zod schemas and typed execute functions
5. **MCP Server** — `MCPServer` for exposing agents to IDEs/tools
6. **Multi-Agent** — CTO Conductor delegates to Nart Avatar

### What Claude AI Now Offers Natively (March 2026)

| Capability | Claude Native | Mastra |
|-----------|--------------|--------|
| **Agent orchestration** | Claude Agent SDK (sub-agents, tool loops) | `Agent` class + `generate()` |
| **Tool calling** | Native `tool_use` with JSON schemas | `createTool` with Zod schemas |
| **Persistent memory** | No built-in persistence (stateless API) | `PostgresStore` + `Memory` |
| **Vector search / RAG** | No built-in vector DB | `PgVector` + embeddings |
| **MCP server** | Claude Code is an MCP *client* | `MCPServer` (stdio transport) |
| **Multi-agent** | Agent SDK supports sub-agents | Manual delegation via tools |
| **Model flexibility** | Claude models only | Any model via Vercel AI SDK (Gemini, Claude, etc.) |
| **Skills/Slash commands** | Claude Code CLI feature (local) | Not applicable |

### Honest Assessment

**Mastra's strengths that Claude can't replace:**
- **Vector DB integration** — Claude has no built-in pgvector/embedding pipeline. You'd still need a vector DB layer.
- **Model agnosticism** — Mastra uses Vercel AI SDK, so Nart Avatar runs on Gemini (cheaper for Thai content). Switching to Claude API would mean paying Claude rates for every article generation.
- **Persistent memory** — Claude API is stateless. Mastra's `PostgresStore` provides true cross-session memory. You'd need to build this yourself with Claude.
- **MCP server** — Mastra can expose agents *as* MCP tools. Claude Code *consumes* MCP tools but doesn't help you serve them.

**Where Claude has caught up or surpassed:**
- **Agent SDK** — Claude's agent SDK now supports sub-agents, tool loops, and complex workflows natively. For orchestration logic, it's arguably simpler than Mastra's approach.
- **Tool calling** — Claude's native `tool_use` is extremely mature and battle-tested.
- **Code generation quality** — Claude (Opus/Sonnet) produces better code than Gemini for TypeScript tasks.
- **Skills** — Claude Code's skill system is for CLI workflow automation, not a replacement for Mastra's runtime agents.

### Recommendation

**Keep Mastra for the Sovereign Brain pipeline. Don't replace it with Claude native.**

Reasons:
1. **Model flexibility is Mastra's killer feature** — Via Vercel AI SDK, Mastra can use *any* model. This enables a tiered cost/quality strategy that Claude-only can't match.
2. **Vector DB** — The `nerd_brain` PgVector setup is working and has 488 rows of indexed knowledge. Claude offers no replacement for this.
3. **Memory** — Mastra's persistent memory (PostgresStore) is a solved problem. Rebuilding it on Claude API would be unnecessary engineering.

### Model Tiering Strategy (March 2026)

Mastra's model-agnostic architecture enables a smart cost/quality mix:

| Tier | Model | Use Case | Cost | Quality |
|------|-------|----------|------|---------|
| **Flagship** | Claude Sonnet 4.6 / Opus 4.6 | High-quality Thai articles, deep analysis, premium content | $$$ | Highest |
| **Workhorse** | Gemini 3 Flash / Gemini 3 Pro | Standard content generation, vector search, routine Thai articles | $ | Good |
| **Budget** | Minimax M2.7, DeepSeek, Qwen | Bulk drafts, summarization, translation, low-stakes tasks | ¢ | Adequate |
| **Embeddings** | Gemini `text-embedding-004` | Vector DB ingestion (unchanged) | ¢ | N/A |

**The rule:** Use the cheapest model that meets the quality bar for the task.
- **"Nerd with Nart" signature articles** → Claude Sonnet/Opus (voice quality matters)
- **Routine knowledge retrieval / search** → Gemini Flash (speed + cost)
- **Bulk drafts / first passes** → Minimax M2.7 or similar Chinese models (then refine with Claude)
- **Insurance calculator / tool calls** → Any model (deterministic, not quality-sensitive)

**Implementation:** Mastra agents already accept any Vercel AI SDK model. To switch:
```typescript
// In nart-avatar.ts — change one line:
import { anthropic } from '@ai-sdk/anthropic';
model: anthropic('claude-sonnet-4-6-20250514'),  // For premium content

// Or for budget tier:
import { minimax } from '@ai-sdk/minimax';       // If SDK adapter exists
// Otherwise use OpenAI-compatible endpoint
```

**Where to use Claude directly (not via Mastra):**
- **Agent 2B (Claude Code CLI)** — Surgical coder for implementation tasks
- **Strategic planning** — Claude Opus for architecture decisions
- **Content quality gate** — Final review pass on articles before publishing

**The smart hybrid:** Mastra is the **orchestration layer** that lets you plug in *any* model per task. Claude is used both *through* Mastra (for premium content) and *alongside* it (for development work). This is strictly better than being locked to one provider.

### If You Wanted to Migrate Away from Mastra (Future)

The migration path would be:
1. Replace `@mastra/core` Agent → Claude Agent SDK or raw Vercel AI SDK `generateText()`
2. Replace `@mastra/pg` PgVector → Direct `pgvector` npm package + `pg` client
3. Replace `@mastra/memory` → Custom PostgresStore (simple table with threadId/messages)
4. Replace `@mastra/mcp` MCPServer → `@modelcontextprotocol/sdk` (official MCP SDK)
5. Replace `createTool` → Direct Zod schemas + handler functions

Estimated effort: 2-3 days. Not worth it unless Mastra becomes unmaintained or introduces breaking changes frequently.

---

**Bottom line:** Mastra is the right tool for this job. It abstracts away the plumbing (vector DB, memory, tools, MCP) and lets you focus on the knowledge and prompts. Claude's innovations (Agent SDK, Skills) solve different problems — they're for building AI-powered developer tools, not for running a content production pipeline with domain-specific knowledge.
