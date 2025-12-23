
import 'dotenv/config';
import { nartAvatar } from '../nerd/agents/nart-avatar';
import fs from 'fs';

async function main() {
    console.log("🤖 WAKING NART AVATAR [CONTENT MODE]...");

    try {
        // 📝 EDIT THIS PROMPT TO GENERATE NEW CONTENT
        const prompt = `
[TASK]
Draft a Mode A (Standard) deep dive article about "Why 10 Million Baht isn't enough for retirement if you get sick."

[TARGET AUDIENCE]
Thai 35-45 year olds (Nerd with Nart persona).

[CONSTRAINTS]
1. LANGUAGE: THAI ONLY (ภาษาไทย 100%).
2. HEADERS: Pure Thai Headers (No English).
3. MECHANISM: Compare General Inflation (3%) vs Medical Inflation (8-10%).
4. ANALOGY: Use "The Boiling Frog" (Analogy ONLY, DO NOT PRINT "#009" ID).
5. WATERMARKS: Embed 3 seamless watermarks ("ผม (เนิร์ดกับนาถ)...").
6. CITATIONS: Use [¹] footnote style.

[EXECUTION]
Execute as 'Nerd with Nart'. Start with a Single Victim story.
`;

        console.log("📝 Generating article...");
        const response = await nartAvatar.generate([
            { role: 'user', content: prompt } // Using explicitly configured 2.5 Flash model
        ]);

        console.log("\n✅ AGENT RESPONSE:");
        console.log(response.text);

        // Save to file with UTF-8 encoding
        const filename = 'draft-article.md';
        fs.writeFileSync(filename, response.text, 'utf-8');
        console.log(`\n💾 Saved to ${filename}`);

        console.log("\n🔧 TOOL CALLS:");
        console.log(JSON.stringify(response.toolCalls, null, 2));

    } catch (error: any) {
        console.error("❌ AGENT FAILURE (See agent-error.log)");
        const errorLog = {
            message: error.message,
            stack: error.stack,
            ...error
        };
        fs.writeFileSync('agent-error.log', JSON.stringify(errorLog, null, 2));
    }
}

main();
