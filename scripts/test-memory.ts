
import 'dotenv/config';
import { Agent } from '@mastra/core';
import { Memory } from '@mastra/memory';
import { PostgresStore } from '@mastra/pg';
import { google } from '@ai-sdk/google';

async function main() {
    console.log('🧠 PHASE D: Testing Persistent Memory...');

    if (!process.env.DATABASE_URL) {
        throw new Error('❌ DATABASE_URL is missing');
    }

    // 1. Storage
    const store = new PostgresStore({
        connectionString: process.env.DATABASE_URL,
    });

    // 2. Memory
    const memory = new Memory({
        storage: store,
    });

    // 3. Agent
    const agent = new Agent({
        name: 'MemoryTester',
        instructions: 'You are a helpful assistant with infinite memory.',
        model: google('gemini-3-flash-preview'),
        memory: memory,
    });

    const threadId = `mem-test-${Date.now()}`;
    const resourceId = 'test-resource-user-1';
    console.log(`📝 Thread ID: ${threadId}, Resource ID: ${resourceId}`);

    try {
        // Turn 1
        console.log("➡️  User: My name is Nart.");
        const res1 = await agent.generate("My name is Nart.", { threadId, resourceId });
        console.log("⬅️  Agent:", res1.text);

        // Turn 2
        console.log("➡️  User: What is my name?");
        const res2 = await agent.generate("What is my name?", { threadId, resourceId });
        console.log("⬅️  Agent:", res2.text);

        if (res2.text.includes('Nart')) {
            console.log("✅ SUCCESS: Memory recall confirmed.");
        } else {
            console.warn("⚠️  WARNING: Agent did not recall the name immediately.");
        }

    } catch (err) {
        console.error("❌ MEMORY FAILURE:", err);
    }
}

main();
