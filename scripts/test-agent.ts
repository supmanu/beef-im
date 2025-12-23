
import 'dotenv/config';
import { nartAvatar } from '../nerd/agents/nart-avatar';
import fs from 'fs';

async function main() {
    console.log("🤖 WAKING NART AVATAR...");

    try {
        const response = await nartAvatar.generate([
            { role: 'user', content: 'What is the obesity rate in NHES VII? Use your brain tool.' }
        ]);

        console.log("\n✅ AGENT RESPONSE:");
        console.log(response.text);

        console.log("\n🔧 TOOL CALLS:");
        console.log(JSON.stringify(response.toolCalls, null, 2));

    } catch (error: any) {
        console.error("❌ AGENT FAILURE (See agent-error.log)");
        // Capture all enumerable properties
        const errorLog = {
            message: error.message,
            stack: error.stack,
            ...error
        };
        fs.writeFileSync('agent-error.log', JSON.stringify(errorLog, null, 2));
    }
}

main();
