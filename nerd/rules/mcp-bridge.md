# MCP BRIDGE STANDARDS (v1.1)

## 1. PURPOSE
This protocol enables external desktop clients (Cherry Studio, Claude Desktop) to converse with our Mastra agents using the Model Context Protocol (MCP).

## 2. STANDARD IMPLEMENTATION
**File Location:** `scripts/mastra-mcp.ts`

### Critical Pattern: Tool Injection
To prevent `undefined` tool errors during handshake, explicitly inject tools from the agent:

```typescript
const server = new MCPServer({
    name: 'nerd-with-nart',
    version: '1.0.0',
    agents: { 'nart-avatar': nartAvatar },
    tools: nartAvatar?.tools || {}, // <--- SAFETY INJECTION
});
```

### Critical Pattern: Agent Identity
All agents exposed via MCP **MUST** have a `description` property (30-60 words). Missing descriptions cause `MastraError`.

## 3. WINDOWS CONNECTION PROTOCOL (Cherry Studio)
Windows cannot spawn `npx` directly. You must wrap the command in `cmd.exe`.

*   **Command:** `C:\Windows\System32\cmd.exe`
*   **Arguments:** `/c npx -y tsx c:\Users\supma\Projects\nerd-with-nart\scripts\mastra-mcp.ts`
*   **Note:** Use ABSOLUTE PATHS for the script.

## 4. CONSTRAINTS
*   **StdIO Only:** Do not use SSE for local desktop apps.
*   **Logs:** Use `console.error` only. `console.log` destroys the JSON-RPC stream.
