# 🧠 MASTRA RAG & MEMORY STANDARDS (Dec 2025)
> **Context:** Sovereign Brain Architecture (Phase VIII)
> **Stack:** Mastra 0.x, PgVector, Google Gemini 3

## 1. Vector Database (PgVector)
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
*   **Reason:** Deprecated/Retired on `v1beta` as of Dec 2025. Returns `404 NOT_FOUND`.

### Active Models (Sovereign Standard)
*   ✅ `gemini-3-flash-preview` (Speed/Memory)
*   ✅ `gemini-3-pro-preview` (Reasoning/RAG)

## 3. Persistent Memory
*   **Library:** `@mastra/memory`
*   **Storage:** `PostgresStore` (via `@mastra/pg`)
*   **Pattern:**
    ```typescript
    const memory = new Memory({ storage: new PostgresStore(...) });
    const agent = new Agent({ memory, ... });
    // Usage:
    agent.generate(prompt, { threadId, resourceId });
    ```
*   **Constraint:** Both `threadId` AND `resourceId` are required for persistence.

## 4. Ingestion (PDFs)
*   **Environment:** `tsx` / ESM
*   **Rule:** `pdf-parse` requires robust import handling to avoid `TypeError`.
*   **Code:**
    ```typescript
    import { createRequire } from 'module';
    const require = createRequire(import.meta.url);
    const pdfModule = require('pdf-parse');
    const pdfParse = typeof pdfModule === 'function' ? pdfModule : pdfModule.default;
    ```
