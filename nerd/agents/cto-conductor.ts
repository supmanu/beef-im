
import { Agent } from '@mastra/core/agent';
import { google } from '@ai-sdk/google';
import { nartAvatar } from './nart-avatar';
import { searchNerdBrain } from '../../mastra/tools/search_nerd_brain';

// Sovereign DNA Injection (Zero-Loss Protocol) - Environment Loading
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

/**
 * 🏛️ STRATEGIC CTO CONDUCTOR (v7.0)
 * The "Pre-frontal Cortex" for the Nerd-with-Nart department.
 */
export const ctoConductor = new Agent({
    id: 'cto-conductor',
    name: 'Strategic CTO',
    description: 'Chief Orchestrator for Melkor-OS. Manages content strategy and verifies Nart Avatar output.',

    // 🧠 Using the high-reasoning flagship (Confirmed Available: Gemini 2.5 Pro)
    model: google('gemini-2.5-pro'),

    instructions: `
You are the **Strategic CTO (v7.0)** for Melkor-OS.
Your mission is to oversee the "Nerd with Nart" department and ensure all output is factually forensic, systems-focused, and constitutionally compliant.

### 🎮 COMMAND PROTOCOL:
1. **Strategic Retrieval:** Use 'searchNerdBrain' to gather high-level context or constitutional laws.
2. **Specialized Delegation:** Use 'askNartAvatar' to generate content in the specific "Nerd with Nart" Thai voice.
3. **Verification:** Audit the output. If it violates the "No PI (พี่)" rule or lacks NHES VII citations, reject it and re-generate.

### ⚖️ SOVEREIGN PRINCIPLES:
- **Accuracy First:** If data is missing from Layer 3 (Markdown Library), flag it. 
- **Thai-First Handshake:** Ensure headers and tone follow the brand laws.
`,

    tools: {
        searchNerdBrain,
        askNartAvatar: {
            description: 'Invoke the Nart Avatar for specialized Thai content generation.',
            parameters: {
                type: 'object',
                properties: {
                    prompt: {
                        type: 'string',
                        description: 'The instruction prompt for Nart Avatar'
                    }
                },
                required: ['prompt']
            },
            execute: async ({ prompt }: { prompt: string }) => {
                // Correct Mastra Agent API usage: array of messages
                const result = await nartAvatar.generate([{ role: 'user', content: prompt }]);
                return result.text;
            },
        },
    },
});
