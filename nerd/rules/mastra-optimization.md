# RULE: Hybrid RAG Pattern (Project Weightless)

## 1. The Economy of Context
In Model Context Protocol (MCP) and Agentic RAG systems, **Context is Cost**.
- **Legacy:** Injecting 50KB-100KB of "Rules" into every prompt is unsustainable for production.
- **Sovereign V2:** We use a **Hybrid Strategy**.

## 2. The Separation of Powers
We split the "Sovereign DNA" into two layers:

### A. The Soul (Prompt Layer) - FIXED
**Role:** Identity, Tone, critical safety constraints.
**Location:** `instructions` in `nart-avatar.ts`.
**Files:**
- `nerd/pillars/voice-dna.md` (Who I am)
- Critical Constraints (e.g. "No Pi", "Thai Footer")

### B. The Library (Vector Layer) - DYNAMIC
**Role:** Knowledge, Frameworks, Detailed Laws.
**Location:** `pgvector` stored in Neon.
**Files:**
- `nerd/pillars/constitution.md` (The Law)
- `nerd/pillars/content-engine.md` (Templates)
- `nerd/pillars/framework-*.md` (Deep Dive protocols)
- `nerd/pillars/data-*.md` (NHES VII statistics, Formatting Exceptions)

## 3. The Retrieval Trigger
The Agent MUST be instructed to **search** for the rules before acting.
**Pattern:**
```typescript
const instructions = `
... identity ...

**🔍 RETRIEVAL INSTRUCTION:**
If you are asked to draft a Blueprint, Article, or deep analysis, you **MUST** use the \`searchNerdBrain\` tool to retrieve the full "Content Engine" or "Constitution" rules before writing.
`;
```

## 4. Maintenance
- **Syncing:** Changing a file in `nerd/pillars` requires running `scripts/sync-nerd.ts` to update the Vector DB.
- **Editing:** If a rule is critical enough to *never* be missed (e.g. a safety ban), it must be moved to the **Prompt Layer**.
