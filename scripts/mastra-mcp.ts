import { MCPServer } from '@mastra/mcp';
import { nartAvatar } from '../nerd/agents/nart-avatar';

/**
 * SOVEREIGN BRIDGE v1.1
 * Manual tool injection prevents the Object.keys(tools) crash.
 */
const server = new MCPServer({
    name: 'nerd-with-nart',
    version: '1.0.0',
    agents: {
        'nart-avatar': nartAvatar
    },
    // Fallback to ensure tools is never undefined
    tools: nartAvatar?.tools || {},
});

async function main() {
    console.error('🚀 Starting Nerd with Nart MCP Server...');
    try {
        // Required for Cherry Studio StdIO transport
        await server.startStdio();
    } catch (err) {
        console.error('❌ MCP Server Failed:', err);
        process.exit(1);
    }
}

main();