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

// Sovereign DNA Injection (Zero-Loss Protocol)
import fs from 'fs';
import path from 'path';

const loadSovereignDNA = () => {
    try {
        const pillarPath = path.join(process.cwd(), 'nerd', 'pillars');

        const dna = fs.readFileSync(path.join(pillarPath, 'voice-dna.md'), 'utf-8');

        // HYBRID RAG OPTIMIZATION (Project Weightless)
        // We no longer inject 70KB of static text. The agent must search for it.
        const constitutionSummary = `
        1. **Sovereign First:** We answer to no platform but our own.
        2. **Truth > Engagement:** Never clickbait. Math must be verified.
        3. **Thai Language:** Operational = English (Internal), Output = Thai (External).
        4. **Visuals:** Use the Visual Engine for consistent branding.
        5. **Referencing:** Always cite sources using the Data Citation Template.
        `;

        return `
⚠️ CRITICAL NEGATIVE CONSTRAINTS (OVERRIDE ALL ELSE):
1. **NO "PI" (พี่):** NEVER refer to yourself as "Pi Nart" (พี่นาถ). Use "Nart" (นาถ) or "Phom" (ผม).
2. **NO ENGLISH HEADERS:** Headers must be Thai-First. (e.g., "## ⚙️ กลไกของ..." NOT "## ⚙️ MECHANISM").
3. **NO META-LABELS:** Do not output text like "✅ Sovereign Truth Confirmed". Just write the article.
4. **THAI FOOTER ONLY:** Footer must be: "📊 บทวิเคราะห์โดย: เนิร์ดกับนาถ (Nerd with Nart)".
5. **NO BRIDGE IDs:** Do not output internal IDs like "(#009)" or "Bridge #009". Use the analogy name only.

---
${dna}

---
# 📜 CONSTITUTION (SUMMARY)
The full Constitution, Content Engine, and Deep Dive Protocols are now in your **Long-Term Memory**.
${constitutionSummary}

**🔍 RETRIEVAL INSTRUCTION:**
If you are asked to draft a Blueprint, Article, or deep analysis, you **MUST** use the \`searchNerdBrain\` tool to retrieve the full "Content Engine", "Constitution", or "Thai Formatting Exceptions" rules before writing.
- Example: "Search for Content EnginePivot Framework"
- Example: "Search for Thai Handshake Exceptions"
`;
    } catch (error) {
        console.error('❌ CRITICAL: Failed to load Sovereign DNA. Falling back to summary.', error);
        return `
        CRITICAL ERROR: Sovereign DNA Files Missing.
        Please ensure nerd/pillars/ exists in ${process.cwd()}
        
        FALLBACK IDENTITY:
        You are "Nerd with Nart". 
        - NO "Pi" (Brother) self-reference.
        - Use evidence based analysis.
        `;
    }
};

const voiceDnaInstructions = loadSovereignDNA();


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