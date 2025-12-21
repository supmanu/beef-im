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
        const constitution = fs.readFileSync(path.join(pillarPath, 'constitution.md'), 'utf-8');
        const contentEngine = fs.readFileSync(path.join(pillarPath, 'content-engine.md'), 'utf-8');
        const deepDive = fs.readFileSync(path.join(pillarPath, 'framework-deep-dive.md'), 'utf-8');
        const thaiHandshake = fs.readFileSync(path.join(pillarPath, 'data-thai-handshake-exceptions.md'), 'utf-8');

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
# 📜 CONSTITUTION (THE LAW)
${constitution}

---
# ⚙️ CONTENT ENGINE
${contentEngine}

---
# ⚓ DEEP DIVE PROTOCOLS & WATERMARK
${deepDive}

---
# 🇹🇭 THAI LANGUAGE EXCEPTIONS
${thaiHandshake}
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