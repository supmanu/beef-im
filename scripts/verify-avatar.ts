import 'dotenv/config';
import { nartAvatar } from '../nerd/agents/nart-avatar';

async function main() {
    console.log("🤖 WAKING UP NART AVATAR...");

    // 1. Define Identifiers (Mastra NEEDS both)
    const threadId = "verify-avatar-" + Date.now();
    const resourceId = "test-user-nart";

    try {
        // 2. First Interaction: Establish Context
        console.log(`\n📝 Thread: ${threadId} | Resource: ${resourceId}`);
        console.log("➡️  User: 'My name is Nart. I am testing your memory.'");

        const response1 = await nartAvatar.generate("My name is Nart. I am testing your memory.", {
            threadId,
            resourceId
        });
        console.log(`🤖 Avatar: ${response1.text}`);

        // 3. Second Interaction: Test Memory & Voice
        console.log("\n➡️  User: 'What is my name? And explain why Health Insurance is a mechanism, not a product.'");

        const response2 = await nartAvatar.generate("What is my name? And explain why Health Insurance is a mechanism, not a product.", {
            threadId,
            resourceId
        });

        console.log(`\n🤖 Avatar (Voice & Memory Test):\n${response2.text}`);

        console.log("\n✅ VERIFICATION COMPLETE.");
    } catch (error) {
        console.error("❌ AVATAR FAILED:", error);
    }
}

main();