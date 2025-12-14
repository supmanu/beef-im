// scripts/nuke-posts-raw.ts
// Direct database connection to drop posts table (bypasses Payload initialization)
// Run with: npx tsx scripts/nuke-posts-raw.ts

import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const nukePosts = async () => {
    const connectionString = process.env.DATABASE_URI;

    if (!connectionString) {
        console.error('❌ DATABASE_URI environment variable not set');
        process.exit(1);
    }

    const client = new Client({ connectionString });

    try {
        console.log('🔌 Connecting to database...');
        await client.connect();
        console.log('✅ Connected');

        console.log('💣 Dropping posts tables...');

        // Drop in correct order (relations first, then main table)
        await client.query('DROP TABLE IF EXISTS "posts_rels" CASCADE;');
        console.log('  ✓ posts_rels dropped');

        await client.query('DROP TABLE IF EXISTS "posts" CASCADE;');
        console.log('  ✓ posts dropped');

        console.log('\n🎉 Posts tables nuked successfully!');
        console.log('📋 Restart the server to let Payload rebuild the schema.');

        await client.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        await client.end();
        process.exit(1);
    }
};

nukePosts();
