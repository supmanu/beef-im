
import { spawn } from 'child_process';
import path from 'path';

const MCP_SCRIPT = path.join(process.cwd(), 'scripts', 'mastra-mcp.ts');

async function testMcpServer() {
    console.log(`🚀 Spawning MCP Server: npx tsx ${MCP_SCRIPT}`);

    const serverProcess = spawn('npx', ['tsx', MCP_SCRIPT], {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true
    });

    let buffer = '';

    serverProcess.stdout.on('data', (data) => {
        const chunk = data.toString();
        // console.log(`[SERVER STDOUT]: ${chunk}`); 
        buffer += chunk;

        // Check for JSON-RPC responses
        const lines = buffer.split('\n');
        for (const line of lines) {
            if (line.trim().startsWith('{')) {
                try {
                    const json = JSON.parse(line);
                    if (json.id === 1 && json.result) {
                        console.log("✅ MCP Initialization Successful!");
                        console.log("Server Capabilities:", JSON.stringify(json.result.capabilities, null, 2));
                        console.log("Server Info:", JSON.stringify(json.result.serverInfo, null, 2));
                        serverProcess.kill();
                        process.exit(0);
                    }
                } catch (e) {
                    // ignore partial json
                }
            }
        }
    });

    serverProcess.stderr.on('data', (data) => {
        console.error(`[SERVER STDERR]: ${data}`);
    });

    serverProcess.on('close', (code) => {
        console.log(`Server exited with code ${code}`);
    });

    // Wait a bit for server to start, then send initialize request
    setTimeout(() => {
        console.log("📤 Sending 'initialize' JSON-RPC request...");
        const initRequest = {
            jsonrpc: "2.0",
            id: 1,
            method: "initialize",
            params: {
                protocolVersion: "2024-11-05",
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {}
                },
                clientInfo: {
                    name: "test-client",
                    version: "1.0.0"
                }
            }
        };
        serverProcess.stdin.write(JSON.stringify(initRequest) + '\n');
    }, 3000);
}

testMcpServer();
