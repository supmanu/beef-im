
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { MDocument } from '@mastra/rag';
import { PgVector } from '@mastra/pg';
import { embedMany } from 'ai';
import { google } from '@ai-sdk/google';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// Robust PDF import
const pdfModule = require('pdf-parse');
const pdfParse = typeof pdfModule === 'function' ? pdfModule : pdfModule.default;

async function main() {
    console.log('🧠 NERD WITH NART: Sovereign Sync Engine v1.3 (Google Edition - Final)');

    if (!process.env.DATABASE_URL) {
        throw new Error('❌ DATABASE_URL is missing in .env');
    }

    // Initialize Vector Store
    const vectorStore = new PgVector({ id: 'nerd-brain', connectionString: process.env.DATABASE_URL });
    const indexName = 'nerd_brain';
    const dimension = 768; // Google text-embedding-004

    // RESET LOGIC
    try {
        console.log('☢️  Purifying DB: Attempting to drop existing index...');
        await vectorStore.deleteIndex({ indexName });
        console.log('   Index dropped.');
    } catch (e) {
        console.log('   No existing index to drop or drop failed (non-fatal).');
    }

    try {
        await vectorStore.createIndex({
            indexName: indexName,
            dimension: dimension,
            metric: 'cosine',
        });
        console.log(`✅ Connected to Vector Index: ${indexName} (${dimension} dims)`);
    } catch (e) {
        console.log('ℹ️ Index creation skipped/error:', e);
    }

    // 1. THE LOGIC CORE (Markdown)
    const coreDirs = [
        'nerd/pillars',
        'nerd/rules',
        'nerd/agents'
    ];

    for (const dirRelative of coreDirs) {
        const dir = path.join(process.cwd(), dirRelative);
        if (!fs.existsSync(dir)) {
            console.warn(`⚠️ Directory not found: ${dirRelative}`);
            continue;
        }

        const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
        console.log(`📂 Ingesting ${dirRelative} (${files.length} files)...`);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            const doc = new MDocument({
                docs: [{
                    text: content,
                    metadata: {
                        source: dirRelative,
                        filename: file,
                        type: 'logic_core'
                    }
                }]
            } as any);

            const chunks = await doc.chunk({
                strategy: 'markdown',
            });

            console.log(`   - ${file}: ${chunks.length} chunks`);
            await processChunks(chunks, vectorStore, indexName, file);
        }
    }

    // 2. THE EVIDENCE LOCKER (PDFs)
    const referencesDir = path.join(process.cwd(), 'nerd/references');
    if (fs.existsSync(referencesDir)) {
        const pdfs = fs.readdirSync(referencesDir).filter(f => f.endsWith('.pdf'));
        console.log(`📂 Ingesting ${referencesDir} (PDFs)...`);

        for (const file of pdfs) {
            const filePath = path.join(referencesDir, file);
            const dataBuffer = fs.readFileSync(filePath);
            try {
                const data = await pdfParse(dataBuffer);
                const text = data.text;
                const doc = new MDocument({
                    docs: [{
                        text: text,
                        metadata: {
                            source: 'nerd/references',
                            filename: file,
                            type: 'evidence_locker'
                        }
                    }]
                } as any);

                const chunks = await doc.chunk({
                    strategy: 'recursive',
                    size: 512,
                    overlap: 50
                });

                console.log(`   - ${file}: ${chunks.length} chunks`);
                await processChunks(chunks, vectorStore, indexName, file);

            } catch (pdfErr) {
                console.error(`   ❌ Failed to parse/process PDF ${file}:`, pdfErr);
            }
        }
    } else {
        console.warn(`⚠️ References directory not found: nerd/references`);
    }

    console.log('✅ Sovereign Sync Complete.');
}

async function processChunks(chunks: any[], store: PgVector, indexName: string, sourceId: string) {
    if (chunks.length === 0) return;

    const texts = chunks.map(c => c.text || c);
    if (texts.some(t => !t)) return;

    try {
        const { embeddings } = await embedMany({
            model: google.textEmbeddingModel('text-embedding-004'),
            values: texts,
        });

        // Parallel Arrays Strategy for Mastra PgVector
        // vectors: number[][]
        // metadata: Record<string, any>[]
        const vectorData = chunks.map((_, i) => embeddings[i]);
        const metadataData = chunks.map((chunk) => ({
            ...chunk.metadata,
            text: chunk.text
        }));

        await store.upsert({
            indexName: indexName,
            vectors: vectorData as any,
            metadata: metadataData as any
        } as any);
        console.log(`      ✅ Upserted ${chunks.length} chunks for ${sourceId}`);

    } catch (error) {
        console.error(`      ❌ Error processing ${sourceId}:`, error);
    }
}

main().catch(console.error);
