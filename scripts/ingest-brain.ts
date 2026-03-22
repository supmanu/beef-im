
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { PgVector } from '@mastra/pg';
import { embed } from 'ai';
import { google } from '@ai-sdk/google';

// Configuration
const TABLE_NAME = 'nerd_brain';
const PILLAR_DIR = path.join(process.cwd(), 'nerd', 'pillars');

async function ingest() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not configured');
    }

    console.log('🚀 Starting Sovereign Brain Ingestion...');

    // Initialize Vector Store
    const vectorStore = new PgVector({ id: 'nerd-brain', connectionString: process.env.DATABASE_URL });

    // Explicitly create table
    console.log('Creating Vector Table...');
    await vectorStore.createIndex({
        indexName: TABLE_NAME,
        dimension: 3072, // Google gemini-embedding-001
        metric: 'cosine',
    });

    const files = fs.readdirSync(PILLAR_DIR).filter(f => f.endsWith('.md'));
    console.log(`Found ${files.length} pillar files.`);

    for (const file of files) {
        const filePath = path.join(PILLAR_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        console.log(`Processing ${file}...`);

        // Simple chunking: Split by headers or just ingest whole file if small?
        // Let's do a simple chunk by "---" (sections) for better retrieval
        const chunks = content.split('---').map(c => c.trim()).filter(c => c.length > 50);

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];

            try {
                // Generate Embedding
                const { embedding } = await embed({
                    model: google.textEmbeddingModel('gemini-embedding-001'),
                    value: chunk,
                });

                // Insert into Vector DB
                await vectorStore.upsert({
                    indexName: TABLE_NAME,
                    vectors: [Array.from(embedding)],
                    metadata: [{
                        filename: file,
                        chunkIndex: i,
                        text: chunk,
                        type: 'sovereign_pillar'
                    }],
                    ids: [`${file}-${i}`]
                });

            } catch (err) {
                console.error(`Failed to ingest chunk ${i} of ${file}:`, err);
            }
        }
    }

    console.log('✅ Ingestion Complete.');
}

ingest();
