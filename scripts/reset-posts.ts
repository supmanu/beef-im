// scripts/reset-posts.ts
// Nuclear option: Drop posts table so Payload can rebuild it with correct schema
// Run with: npx tsx scripts/reset-posts.ts

import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload-config/payload.config';

const resetPosts = async () => {
    try {
        const payload = await getPayload({ config });

        console.log('--- NUKING POSTS TABLE ---');

        // Direct SQL execution via Payload's DB adapter
        await payload.db.drizzle.execute('DROP TABLE IF EXISTS "posts_rels" CASCADE;');
        await payload.db.drizzle.execute('DROP TABLE IF EXISTS "posts" CASCADE;');

        console.log('✅ Posts tables dropped successfully.');
        console.log('📋 Restart the server to rebuild the schema.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error dropping table:', error);
        process.exit(1);
    }
};

resetPosts();
