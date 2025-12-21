# MASTRA FRAMEWORK STANDARDS (v1.0)

## 1. IMPORTS
* **Agent:** NEVER import from root.
    * ❌ `import { Agent } from '@mastra/core';`
    * ✅ `import { Agent } from '@mastra/core/agent';`

## 2. MEMORY & PERSISTENCE
* **Required IDs:** When generating with memory, you MUST provide both IDs:
    * `threadId`: The specific conversation identifier.
    * `resourceId`: The user/project identifier (cannot be undefined).
    * *Error if missing:* `AGENT_MEMORY_MISSING_RESOURCE_ID`

## 3. MODELS
* **Google Provider:** Use `gemini-3-flash` (Dec 2025 Standard).
* **Deprecation:** `gemini-3-flash-preview` is discontinued.
