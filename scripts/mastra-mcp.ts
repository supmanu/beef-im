import { McpServer } from '@mastra/mcp';
import { nartAvatar } from '../nerd/agents/nart-avatar';

// Create MCP Server with Nart Avatar
const server = new McpServer({
    name: 'nerd-with-nart',
    version: '1.0.0',
    agents: [nartAvatar], // Expose the agent
});

// Start StdIO transport for Cherry Studio (local connection)
async function main() {
    console.error('🚀 Starting Nerd with Nart MCP Server...');
    try {
        await server.startStdio();
        console.error('✅ MCP Server Running via StdIO');
    } catch (err) {
        console.error('❌ MCP Server Failed:', err);
        process.exit(1);
    }
}

main();
