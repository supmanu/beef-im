import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
// nerd/agents/nart-avatar.ts -> ../../.env
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });

// Fallback: if that didn't work (development root), try standard config
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
// path import moved to top of file

// ═══════════════════════════════════════════════════════════════════
// 🔐 VAULT MANIFEST LOADER (Melkor OS Integration)
// ═══════════════════════════════════════════════════════════════════
const loadVaultManifest = () => {
    console.log('🛑 Forensic Vault has been manually disabled by CTO mandate.');
    return null;
    /*
    try {
        const manifestPath = path.join(process.cwd(), 'nerd', 'vault-manifest.json');

        if (!fs.existsSync(manifestPath)) {
            console.warn('⚠️ Vault manifest not found. Forensic search disabled.');
            return null;
        }

        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        console.log(`🔐 Vault loaded: ${manifest.files.length} forensic documents available.`);
        return manifest;
    } catch (error) {
        console.error('❌ Failed to load Vault manifest:', error);
        return null;
    }
    */
};

const vaultManifest = loadVaultManifest();

// ═══════════════════════════════════════════════════════════════════
// 🔍 VAULT INSTRUCTIONS GENERATOR
// ═══════════════════════════════════════════════════════════════════
const generateVaultInstructions = () => {
    if (!vaultManifest) {
        return `
## 🔒 FORENSIC VAULT: OFFLINE
The Vault manifest is not loaded. You cannot perform forensic PDF verification.
Rely on the Knowledge Library (searchNerdBrain) for policy information.
`;
    }

    // Find the master reference
    const masterFile = vaultManifest.files.find((f: any) => f.type === 'master-reference');
    const masterUri = masterFile?.uri || 'NOT_AVAILABLE';

    // Build the file list
    const fileList = vaultManifest.files
        .map((f: any) => `- **${f.name}** (${f.type}): \`${f.uri}\``)
        .join('\n');

    return `
## 🔐 FORENSIC VAULT ACCESS (Melkor OS Layer 2)

You have access to the AIA Forensic Vault containing original policy PDFs.
These are the SOURCE OF TRUTH for policy verification.

### Available Documents:
${fileList}

### 🎯 MASTER REFERENCE (Use First for Complex Queries):
\`${masterUri}\`
Contains abridged information for ALL AIA policies.

### Usage Protocol:
1. **Simple Query** → Use \`searchNerdBrain\` (Vector DB) first
2. **Detailed Policy Query** → Search the Knowledge Library (markdown)
3. **Forensic Verification** → Access Vault PDFs via File Search
4. **Conflict Resolution** → PDF is FINAL AUTHORITY

### When to Use Vault:
- User asks for specific coverage amounts
- User asks about exclusions or waiting periods
- User asks to verify a policy detail
- User asks for page/section citations
- Any time accuracy is critical

### How to Cite:
When retrieving from the Vault, cite: "According to [Document Name], Page X / Section Y..."

⚠️ CRITICAL: Do NOT guess policy details. If unsure, search the Vault.
`;
};

const vaultInstructions = generateVaultInstructions();

// ═══════════════════════════════════════════════════════════════════
// 🧬 SOVEREIGN DNA LOADER (Original + Enhanced)
// ═══════════════════════════════════════════════════════════════════
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

---
${vaultInstructions}

---
# 🔍 RETRIEVAL INSTRUCTION (MEMORY HIERARCHY):

## Layer 1: Vector Search (Fast)
Use \`searchNerdBrain\` for quick concept lookups:
- "Search for Content Engine Pivot Framework"
- "Search for Thai Handshake Exceptions"

## Layer 2: Forensic Vault (Authoritative)
For policy verification, use File Search with the Vault URIs above.
The PDF is the final word on any policy dispute.

## Layer 3: Knowledge Library (Reference)
Cleaned markdown files in nerd/references/brochures/library/ for structured policy summaries.

**Priority:** Vector DB → Markdown Library → Vault PDF (for verification)
**Authority:** Vault PDF > Markdown > Vector (for conflicts)
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
        
        ${vaultInstructions}
        `;
    }
};

const voiceDnaInstructions = loadSovereignDNA();


export const nartAvatar = new Agent({
    name: 'Nart Avatar',
    // REQUIRED: Description for MCP conversion
    description: 'Expert Digital Twin for insurance forensics, Thai health statistics (NHES VII), and systemic financial analysis. Has access to AIA Forensic Vault for policy verification.',
    instructions: voiceDnaInstructions,
    model: google('gemini-2.5-flash'), // Explicitly using 2.5 Flash (Dec 2025 Standard)
    memory: memory,
    tools: {
        searchNerdBrain,
    },
});
