const fs = require('fs');
const path = require('path');

// Configuration
const RAW_FILE_PATH = String.raw`C:\Users\supma\Melkor-OS\departments\nerd-with-nart\nerd\references\brochures\raw\AIA_Benefits_Plus_2025.md`;
const OUTPUT_FILE_PATH = String.raw`C:\Users\supma\Melkor-OS\departments\nerd-with-nart\nerd\references\brochures\library\aia-benefits-plus-2025.md`;

function cleanOcrErrors(text) {
    let cleaned = text;

    // 1. Product Names & Key Terms (High Confidence)
    const replacements = [
        [/โนนัส/g, "โบนัส"],
        [/ใบนัส/g, "โบนัส"],
        [/ใบมีสลำหรับ/g, "โบนัสสำหรับ"],
        [/ผลประโยชน์/g, "ผลประโยชน์"],
        [/พลประโยชน์/g, "ผลประโยชน์"],
        [/สัญญาพันเดิม/g, "สัญญาเพิ่มเติม"],
        [/สัญญาพื้นที่ม/g, "สัญญาเพิ่มเติม"],
        [/ผู้ลดประกันภัย/g, "ผู้เอาประกันภัย"],
        [/ยูนิต ลิงค์/g, "ยูนิต ลิงค์"],
        [/Unit Linked/ig, "Unit Linked"], // Normalize casing if needed
    ];

    replacements.forEach(([pattern, replacement]) => {
        cleaned = cleaned.replace(pattern, replacement);
    });

    // 2. Extensive Terminology Fixes
    // Vitality Statuses
    cleaned = cleaned.replace(/บรรยายชี/g, "บรอนซ์");
    cleaned = cleaned.replace(/บรรยาย/g, "บรอนซ์"); // Risk check: "บรรยาย" usually means lecture, but in this context it's Bronze. Safe if context is Vitality.
    cleaned = cleaned.replace(/ชีลเวอร์/g, "ซิลเวอร์");
    cleaned = cleaned.replace(/ไกลด์/g, "โกลด์");
    cleaned = cleaned.replace(/แพลทดนัม/g, "แพลทินัม");
    cleaned = cleaned.replace(/แพลทตินั่ม/g, "แพลทินัม"); // Standardize spelling
    cleaned = cleaned.replace(/แพลทตินัม/g, "แพลทินัม");

    // Common Words
    cleaned = cleaned.replace(/ใบมีส/g, "โบนัส"); // Covers ใบมีสสุขภาพ -> โบนัสสุขภาพ
    cleaned = cleaned.replace(/เอไดเอ/g, "เอไอเอ");
    cleaned = cleaned.replace(/โพรเทคเคอร์/g, "โพรเทคเตอร์");
    cleaned = cleaned.replace(/แบบบ้านาญ/g, "แบบบำนาญ");

    // Specific Campaigns
    cleaned = cleaned.replace(/AIA กิNE BILLIกิN/g, "AIA ONE BILLION");

    // Standardize Disclaimer (Heavy OCR damage usually)
    // Pattern: "เอกสารฉบับนี้...ผูกพันบริษัท"
    const disclaimerPattern = /เอกสารฉบับนี้.*?(?:มิใช่|มีไว้|ไม่ใช่).*?(?:ส่วนหนึ่ง|ส่วนใด).*?สัญญาประกันภัย.*?(?:ผูกพัน|ถูกพัน|ถูกพิมพ์).*?บริษัท/g;
    cleaned = cleaned.replace(disclaimerPattern, "เอกสารฉบับนี้มิใช่ส่วนหนึ่งของสัญญาประกันภัย หรือเอกสารที่ผูกพันบริษัท");

    // Fix " สงวนสิทธิ์" broken patterns
    cleaned = cleaned.replace(/ลงวนสิทธิ์/g, "สงวนสิทธิ์");
    cleaned = cleaned.replace(/ลวนสิทธิ์/g, "สงวนสิทธิ์");
    cleaned = cleaned.replace(/ลงบนสิทธิ์/g, "สงวนสิทธิ์");
    cleaned = cleaned.replace(/ลงบนลิทธิ์/g, "สงวนสิทธิ์");

    // Fix Suicide Clause (Common OCR garble)
    if (cleaned.includes("ฆ่าตัวตาย") || cleaned.includes("ใจสมัคร")) {
        cleaned = cleaned.replace(/โจสตั๊คม/g, "ใจสมัคร");
        cleaned = cleaned.replace(/โจมตีควาย/g, "ใจสมัคร");
        cleaned = cleaned.replace(/โจสมีควรยานยนต์/g, "ใจสมัคร");
    }

    // 3. Medical Terms
    cleaned = cleaned.replace(/คันอักเสบ/g, "ตับอักเสบ");
    cleaned = cleaned.replace(/โวรัส/g, "ไวรัส");

    return cleaned;
}

function prettifyTables(text) {
    const lines = text.split('\n');
    let inTable = false;
    let tableLines = [];
    let result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Check if line is a table row (starts and ends with pipe, or similar structure)
        if (line.match(/^\|.*\|$/)) {
            inTable = true;
            tableLines.push(line);
        } else {
            if (inTable) {
                // End of table, process it
                if (tableLines.length > 0) {
                    // Simple visual aligner logic
                    // 1. Parse rows
                    const rows = tableLines.map(row => row.split('|').map(cell => cell.trim()));
                    // 2. Get max width per col
                    const colWidths = [];
                    rows.forEach(row => {
                        row.forEach((cell, idx) => {
                            // Skip empty first/last from split if they exist
                            if (idx === 0 && cell === '') return;
                            if (idx === row.length - 1 && cell === '') return;

                            const len = cell.length;
                            if (!colWidths[idx]) colWidths[idx] = 0;
                            if (len > colWidths[idx]) colWidths[idx] = len;
                        });
                    });

                    // 3. Rebuild
                    const newTable = rows.map(row => {
                        let newRow = "|";
                        row.forEach((cell, idx) => {
                            if (idx === 0 && cell === '') return;
                            if (idx === row.length - 1 && cell === '') return;

                            const width = colWidths[idx] || 0;
                            // Check for separator row (---)
                            if (cell.match(/^-+$/)) {
                                newRow += " " + "-".repeat(width) + " |";
                            } else {
                                newRow += " " + cell.padEnd(width) + " |";
                            }
                        });
                        return newRow;
                    });
                    result.push(...newTable);
                }
                tableLines = [];
                inTable = false;
            }
            result.push(lines[i]);
        }
    }
    // Flush last table
    if (inTable && tableLines.length > 0) {
        // Same logic as above (duplicated for simplicity in this context)
        // For now, just push robustly to avoid complexity in this snippet
        result.push(...tableLines);
    }

    return result.join('\n');
}

function start() {
    console.log(`Reading raw file: ${RAW_FILE_PATH}`);

    if (!fs.existsSync(RAW_FILE_PATH)) {
        console.error("Error: Raw file not found.");
        return;
    }

    const content = fs.readFileSync(RAW_FILE_PATH, 'utf-8');
    const originalLineCount = content.split('\n').length;
    console.log(`Original Line Count: ${originalLineCount}`);

    // Clean Content
    let cleanedContent = cleanOcrErrors(content);

    // Additional Phase 2 Replacements found during Deep Scan
    cleanedContent = cleanedContent.replace(/เอโยเอ/g, "เอไอเอ");
    cleanedContent = cleanedContent.replace(/เอโอเอ/g, "เอไอเอ");
    cleanedContent = cleanedContent.replace(/ซีโอ/g, "ซีไอ");
    cleanedContent = cleanedContent.replace(/ปิดอ/g, "ปีต่อ");

    // Phase 3: Final Polish - Critical OCR Fixes (Dec 23, 2025)
    // Legal/Disclaimer Text
    cleanedContent = cleanedContent.replace(/ได้หู/g, "ได้");
    cleanedContent = cleanedContent.replace(/จัดนับสนุน/g, "สนับสนุน");
    cleanedContent = cleanedContent.replace(/ผู้เป็นการแข่งขันประกันภัย/g, "ผู้เอาประกันภัย");
    cleanedContent = cleanedContent.replace(/ผู้ถือการแข่งขัน/g, "ผู้ถือกรมธรรม์");
    cleanedContent = cleanedContent.replace(/กรณีธรรม/g, "กรมธรรม์");
    cleanedContent = cleanedContent.replace(/ห้ามและแพร่/g, "ห้ามเผยแพร่");
    cleanedContent = cleanedContent.replace(/ห้ามแฮมเพร่/g, "ห้ามเผยแพร่");
    cleanedContent = cleanedContent.replace(/ห้ามแผนพร่/g, "ห้ามเผยแพร่");
    cleanedContent = cleanedContent.replace(/ลงวันที่หรือที่มาบูรณาย/g, "สงวนสิทธิ์ตามกฎหมาย");

    // Insurance Terminology
    cleanedContent = cleanedContent.replace(/บิดการขาย/g, "ปิดการขาย");
    cleanedContent = cleanedContent.replace(/ล่าอุดที่/g, "ล่าสุดที่");
    cleanedContent = cleanedContent.replace(/ลูกค้าที่อยู่ขอเอาประกัน/g, "ลูกค้าหรือผู้ขอเอาประกัน");
    cleanedContent = cleanedContent.replace(/ระยะเวลาเป็นกรมธรรม์/g, "ระบุไว้ในกรมธรรม์");
    cleanedContent = cleanedContent.replace(/มีใช้ส่วนหนึ่ง/g, "มิใช่ส่วนหนึ่ง");
    cleanedContent = cleanedContent.replace(/ถูกพันบริษัท/g, "ผูกพันบริษัท");
    cleanedContent = cleanedContent.replace(/ถูกต้องบริษัท/g, "ผูกพันบริษัท");
    cleanedContent = cleanedContent.replace(/ผูกพับบริษัท/g, "ผูกพันบริษัท");

    // Medical Terms (Critical Illness products)
    cleanedContent = cleanedContent.replace(/เยอะรัดก็/g, "เอออร์ตา");
    cleanedContent = cleanedContent.replace(/ค่าโวติด/g, "คาโรติด");
    cleanedContent = cleanedContent.replace(/ไป่งพอง/g, "โป่งพอง");
    cleanedContent = cleanedContent.replace(/ผิงท่อ/g, "ฝังท่อ");

    // Prettify Tables
    // cleanedContent = prettifyTables(cleanedContent); // Keeping disabled for now as logic above is complex to inline perfectly without risk. 
    // User priority is content accuracy. 

    // Final Stats
    const finalLineCount = cleanedContent.split('\n').length;
    console.log(`Final Line Count: ${finalLineCount}`);

    if (Math.abs(originalLineCount - finalLineCount) > 500) {
        console.warn("WARNING: Significant line count change detected!");
    } else {
        console.log("Success: Line count preserved (approx).");
    }

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE_PATH);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE_PATH, cleanedContent, 'utf-8');
    console.log(`Successfully wrote cleaned file to: ${OUTPUT_FILE_PATH}`);
}

start();
