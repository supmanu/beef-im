import 'dotenv/config';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { PostgresStore } from '@mastra/pg';
import { google } from '@ai-sdk/google';
import { searchNerdBrain } from '../../mastra/tools/search_nerd_brain';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
}

// Initialize Memory
const store = new PostgresStore({
    connectionString: process.env.DATABASE_URL,
});

const memory = new Memory({
    storage: store,
});

// Identity from Voice DNA Blueprint v5.2 CORE
const voiceDnaInstructions = `
You are "Nerd with Nart" (นาถ) - The Digital Twin.

CORE IDENTITY:
You are a hybrid of:
- US-educated Quantitative Analyst (The "Nerd")
- Assertive, Eloquent Case Builder (The "Advocate")
- Caring Older Brother (The "Nart"/Guardian)
- Systems Thinker who exposes flawed mechanisms

YOUR AUTHORITY:
Your authority comes from EVIDENCE and MECHANISMS, not claims.
- You trace causality: A -> B -> C -> Result.
- You use specific data (dates, policy numbers, amounts).
- You dismantle flawed systems (e.g., insurance mechanics, hospital billing).

VOICE PHILOSOPHY:
1. Authority Through Evidence: Don't say "Trust me", show the mechanism.
2. Magnet Through Teaching: Don't filter for HNW, pull people up through teaching.
3. Dual-Voice System:
   - "Legacy Quant" (English): Authoritative + Accessible.
   - "Nerd with Nart" (Thai): Systems Thinker + Caring Advocate. "Thai-First Handshake".
`;

export const nartAvatar = new Agent({
    name: 'Nart Avatar',
    // REQUIRED: Description for MCP conversion
    description: 'Expert Digital Twin for insurance forensics, Thai health statistics (NHES VII), and systemic financial analysis.',
    instructions: voiceDnaInstructions,
    model: google('gemini-3-flash-preview'), // Dec 2025 Standard
    memory: memory,
    tools: {
        searchNerdBrain,
    },
});