import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

// ----------------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------------
// Using models/ prefix is often safer for raw SDK
const MODEL_NAME = 'gemini-1.5-pro';
const OUTPUT_DIR = path.join(process.cwd(), 'nerd', 'references');

// ----------------------------------------------------------------------------
// MAIN
// ----------------------------------------------------------------------------
async function main() {
    const filePath = process.argv[2];

    if (!filePath) {
        console.error('❌ Usage: npm run digitize <path-to-pdf>');
        process.exit(1);
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        console.error('❌ Missing GOOGLE_GENERATIVE_AI_API_KEY in .env');
        process.exit(1);
    }

    const cleanPath = filePath.replace(/"/g, '');
    const absolutePath = path.resolve(cleanPath);

    if (!fs.existsSync(absolutePath)) {
        console.error(`❌ File not found: ${absolutePath}`);
        process.exit(1);
    }

    console.log(`🚀 Nart Digitizer (Native SDK): Processing ${path.basename(absolutePath)}...`);

    // 1. Initialize SDKs
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const fileManager = new GoogleAIFileManager(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // 2. Upload File to Google
    console.log('📤 Uploading to Google AI Studio...');
    const uploadResult = await fileManager.uploadFile(absolutePath, {
        mimeType: 'application/pdf',
        displayName: path.basename(absolutePath),
    });

    // 3. Wait for Active State
    console.log(`   File URI: ${uploadResult.file.uri}`);
    let file = await fileManager.getFile(uploadResult.file.name);

    process.stdout.write('   Processing PDF');
    while (file.state === 'PROCESSING') {
        process.stdout.write('.');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        file = await fileManager.getFile(uploadResult.file.name);
    }
    process.stdout.write('\n'); // Newline

    if (file.state === 'FAILED') {
        console.error('❌ File processing failed on Google server.');
        process.exit(1);
    }
    console.log(`   ✅ File Ready (State: ${file.state})`);

    // 4. Generate Content (The "Vision" Step)
    console.log(`🧠 Vision Engine: Digitizing to Markdown (${MODEL_NAME})...`);

    try {
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResult.file.mimeType,
                    fileUri: uploadResult.file.uri,
                },
            },
            {
                text: `
                You are a rigorous Data Digitizer for an insurance forensic engine.
                
                TASK: Convert this PDF brochure into clean, structured Markdown.
                
                RULES:
                1. **Tables:** You MUST convert all benefit tables, pricing grids, and exclusion lists into proper Markdown tables. Do not simplify them; keep the data density.
                2. **Structure:** Use H2 (##) and H3 (###) to match the document hierarchy.
                3. **Omit:** Ignore page numbers, legal disclaimers at the very bottom padding, and decorative marketing slogans.
                4. **Output:** Return ONLY the markdown. No conversational filler.
                `
            },
        ]);

        const mdContent = result.response.text();

        // 5. Save to Disk
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        const outputFilename = path.basename(absolutePath, path.extname(absolutePath)) + '.md';
        const outputPath = path.join(OUTPUT_DIR, outputFilename);

        fs.writeFileSync(outputPath, mdContent);
        console.log(`✅ Saved digitized file: ${outputPath}`);

    } catch (error: any) {
        console.error('❌ Error generating content:', error);
    } finally {
        // 6. Cleanup (Delete from Google Cloud)
        // We delete even if error to avoid clutter
        try {
            await fileManager.deleteFile(uploadResult.file.name);
            console.log('🧹 Remote file cleanup complete.');
        } catch (e) {
            console.warn('⚠️ Failed to cleanup file:', e);
        }
    }
}

main().catch(console.error);
