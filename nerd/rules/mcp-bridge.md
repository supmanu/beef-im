# MCP BRIDGE STANDARDS (v1.0)

## 1. PURPOSE
This protocol enables external desktop clients (Cherry Studio, Claude Desktop) to converse with our Mastra agents using the Model Context Protocol (MCP).

## 2. STANDARD IMPLEMENTATION
**File Location:** `scripts/mastra-mcp.ts`

```typescript
import { McpServer } from '@mastra/mcp';
import { nartAvatar } from '../nerd/agents/nart-avatar';

// 1. Create Server
const server = new McpServer({
    name: 'nerd-with-nart',
    version: '1.0.0',
    agents: [nartAvatar], // Expose specific agents
});

// 2. Start Transport (StdIO for Local/Desktop)
async function main() {
    try {
        await server.startStdio(); 
    } catch (err) {
        console.error('❌ MCP Failure:', err);
        process.exit(1);
    }
}
main();
```

## 3. CONNECTION CLIENTS
*   **Cherry Studio:** Add as "Local Server".
*   **Command:** `npx`
*   **Arguments:** `tsx scripts/mastra-mcp.ts`

## 4. CONSTRAINTS
*   **StdIO Only:** Do not use SSE for local desktop apps (too complex to tunnel).
*   **Logs:** `console.log` breaks StdIO json communication. Use `console.error` for debug logs.
