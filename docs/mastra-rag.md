# MASTRA RAG & MEMORY STANDARDS (Mar 2026)
> **Context:** Sovereign Brain Architecture
> **Stack:** Mastra 1.x (@mastra/core 1.15, @mastra/memory 1.9, @mastra/pg 1.8, @mastra/rag 2.1)

## 0. Mastra 1.x Migration Notes (from 0.x)
*   **All classes require `id` field:** `Agent`, `PostgresStore`, `PgVector` constructors now require `{ id: '...' }`.
*   **Tool execute params flattened:** `execute: async ({ context }) => { const { x } = context; }` → `execute: async ({ x }) => { ... }`.
*   **Zod requirement:** `^3.25.0` or `^4.0.0` (Standard Schema compatibility).

## 1. Vector Database (PgVector)
### Constructor (1.x)
```typescript
const vectorStore = new PgVector({
  id: 'nerd-brain',
  connectionString: process.env.DATABASE_URL,
});
```

### Upsert Strategy
*   **Pattern:** "Parallel Arrays"
*   **Rule:** When using `pgVector.upsert`, do NOT pass an array of objects. Pass separate arrays for vectors and metadata.
*   **Code:**
    ```typescript
    await store.upsert({
      indexName: 'nerd_brain',
      vectors: numerArrayOfArrays, // number[][]
      metadata: metadataToObjectArray // Record<string, any>[]
    });
    ```

### Query Strategy
*   **Pattern:** `queryVector` Property
*   **Rule:** The `query` method strictly requires the key `queryVector` for the embedding input.
*   **Code:**
    ```typescript
    await vectorStore.query({
      indexName: 'nerd_brain',
      queryVector: embedding, // number[]
      topK: 5
    });
    ```
*   **Naming:** Index names must be `snake_case` (e.g., `nerd_brain`). Hyphens are forbidden.

## 2. Model Selection (Google AI SDK)
### Retired Models
*   ❌ `gemini-1.5-flash`
*   ❌ `gemini-1.5-pro`
*   ❌ `text-embedding-004` (embedding) — returns `404 NOT_FOUND` as of Mar 2026
*   **Reason:** Deprecated/Retired on `v1beta`. Returns `404 NOT_FOUND`.

### Active Embedding Model
*   ✅ `gemini-embedding-001` (3072 dims, replaces text-embedding-004 which was 768 dims)

### Active Models (Sovereign Standard)
*   ✅ `gemini-3-flash` (Speed/Memory)
*   ✅ `gemini-3-pro` (Reasoning/RAG)

## 3. Persistent Memory
*   **Library:** `@mastra/memory` (1.9+)
*   **Storage:** `PostgresStore` (via `@mastra/pg`)
*   **Pattern (1.x):**
    ```typescript
    const store = new PostgresStore({ id: 'nart-store', connectionString: '...' });
    const memory = new Memory({ storage: store });
    const agent = new Agent({ id: 'nart-avatar', memory, ... });
    // Usage:
    agent.generate(prompt, { threadId, resourceId });
    ```
*   **Constraint:** Both `threadId` AND `resourceId` are required for persistence.

## 4. Tool Definition (1.x)
*   **Pattern:** Params are now passed directly, not wrapped in `context`.
    ```typescript
    export const myTool = createTool({
      id: 'my-tool',
      description: '...',
      inputSchema: z.object({ query: z.string() }),
      execute: async ({ query }) => {  // ← direct destructure, no `context`
        return { result: query };
      },
    });
    ```

## 5. Ingestion (PDFs)
*   **Environment:** `tsx` / ESM
*   **Rule:** `pdf-parse` requires robust import handling to avoid `TypeError`.
*   **Code:**
    ```typescript
    import { createRequire } from 'module';
    const require = createRequire(import.meta.url);
    const pdfModule = require('pdf-parse');
    const pdfParse = typeof pdfModule === 'function' ? pdfModule : pdfModule.default;
    ```
