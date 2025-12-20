
import 'dotenv/config';
import { searchNerdBrain } from '../mastra/tools/search_nerd_brain';

async function main() {
    console.log("🧠 ASKING BRAIN: 'What is the obesity rate in NHES VII?'");

    try {
        const result = await searchNerdBrain.execute({
            context: {
                query: "What is the obesity rate in NHES VII?"
            }
        });

        console.log("\n✅ RESULT:");
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("❌ BRAIN DEAD (Error):", error);
    }
}

main();
