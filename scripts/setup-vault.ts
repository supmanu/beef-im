/**
 * 🔐 SETUP VAULT: The AIA Brochure Uploader (Melkor Integrated)
 * Path: departments/nerd-with-nart/scripts/setup-vault.ts
 * * Target Source: nerd/references/brochures/pdfs
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { GoogleAIFileManager } from '@google/generative-ai/server';

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!API_KEY) throw new Error('❌ Missing GOOGLE_GENERATIVE_AI_API_KEY in .env');

const fileManager = new GoogleAIFileManager(API_KEY);

// 🎯 TARGET: Your specific architectural path
const PDF_DIR = path.join(process.cwd(), 'nerd', 'references', 'brochures', 'pdfs');

async function main() {
    console.log('🏛️  MELKOR OS: Initiating Forensic Vault Ingestion...');
    console.log(`📂 Scanning Archive: ${PDF_DIR}`);

    if (!fs.existsSync(PDF_DIR)) {
        console.error(`❌ Missing PDF Directory!`);
        console.log(`👉 Please create: ${PDF_DIR}`);
        console.log(`   and place your original AIA PDFs there.`);
        return;
    }

    const files = fs.readdirSync(PDF_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));

    if (files.length === 0) {
        console.log('⚠️  No PDFs found in the archive.');
        return;
    }

    console.log(`found ${files.length} forensic documents.`);
    const uploadedUris: string[] = [];

    for (const file of files) {
        const filePath = path.join(PDF_DIR, file);
        process.stdout.write(`⬆️  Uploading Forensic Copy: ${file}... `);

        try {
            const uploadResponse = await fileManager.uploadFile(filePath, {
                mimeType: 'application/pdf',
                displayName: file.replace('.pdf', ''),
            });

            console.log(`✅ URI: ${uploadResponse.file.uri}`);
            uploadedUris.push(uploadResponse.file.uri);
        } catch (error) {
            console.log(`❌ Fail.`);
            console.error(error);
        }
    }

    console.log('\n--- 📜 VAULT MANIFEST (Save this for Agent Config) ---');
    console.log(JSON.stringify(uploadedUris, null, 2));
}

main().catch(console.error);