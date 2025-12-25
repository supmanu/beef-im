const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_FILE = path.join(__dirname, '../nerd/references/ThaiHealth Watch 2025.md');
const OUTPUT_FILE = path.join(__dirname, '../nerd/references/ThaiHealth Watch 2025_Cleaned.md');

function cleanOcrErrors(text) {
    let cleaned = text;

    // --- 1. Product Names & Branding ---
    cleaned = cleaned.replace(/ThaiHealth UNatch/g, "ThaiHealth Watch");
    cleaned = cleaned.replace(/ThaiHealth UJatch/g, "ThaiHealth Watch");
    cleaned = cleaned.replace(/ThaiHealth Uatch/g, "ThaiHealth Watch");
    cleaned = cleaned.replace(/ThaiHealth Watch 2026/g, "ThaiHealth Watch 2026"); // Ensure stability
    cleaned = cleaned.replace(/สารพนัก/g, "สานพลัง"); // ThaiHealth Motto: สานพลัง สร้างนวัตกรรม สื่อสารสุข
    cleaned = cleaned.replace(/วิเวศ/g, "นิเวศ"); // นิเวศสื่อ, นิเวศการเรียนรู้

    // --- 2. Medical & Health Terminology ---
    cleaned = cleaned.replace(/คันอักเสบ/g, "ตับอักเสบ");
    cleaned = cleaned.replace(/โวรัส/g, "ไวรัส");
    cleaned = cleaned.replace(/ไขมันพอกดับ/g, "ไขมันพอกตับ");
    cleaned = cleaned.replace(/ภาวะติดต่ออินซูลิน/g, "ภาวะดื้ออินซูลิน");
    cleaned = cleaned.replace(/หัวใจหวาย/g, "หัวใจวาย");
    cleaned = cleaned.replace(/โภชนาการช้อน/g, "โภชนาการซ้อน");
    cleaned = cleaned.replace(/ภาวะติดถอย/g, "ภาวะถดถอย");
    cleaned = cleaned.replace(/สกิดี/g, "สถิติ");
    cleaned = cleaned.replace(/เจ็บหนักและเสียชีวิต/g, "บาดเจ็บและเสียชีวิต"); // Standardize
    cleaned = cleaned.replace(/บาตเจ็บ/g, "บาดเจ็บ");

    // --- 3. News, Social & Media ---
    cleaned = cleaned.replace(/นั้นหา/g, "เนื้อหา"); // e.g., นั้นหาที่เกี่ยวข้อง -> เนื้อหาที่เกี่ยวข้อง
    cleaned = cleaned.replace(/กระแสกเลี่ยง/g, "กระแสถกเถียง");
    cleaned = cleaned.replace(/กระแสนิดตัว/g, "กระแสตื่นตัว");
    cleaned = cleaned.replace(/อิงคาร/g, "อังคาร");
    cleaned = cleaned.replace(/หน้าจินเทอร์เฟซ/g, "หน้าจออินเทอร์เฟซ");
    cleaned = cleaned.replace(/บิ้นระบบ/g, "ขับเคลื่อนระบบ");
    cleaned = cleaned.replace(/กัยออนไลน์/g, "ภัยออนไลน์");
    cleaned = cleaned.replace(/กัย/g, "ภัย"); // Online/Road Dangers
    cleaned = cleaned.replace(/ฝาไฟแดง/g, "ฝ่าไฟแดง");
    cleaned = cleaned.replace(/ผ้าไฟแดง/g, "ฝ่าไฟแดง");

    // --- 4. Gambling & Digital Dangers ---
    cleaned = cleaned.replace(/เติมพัน/g, "เดิมพัน");
    cleaned = cleaned.replace(/ลงเติมพัน/g, "ลงเดิมพัน");
    cleaned = cleaned.replace(/คุณพนันออนไลน์/g, "ควบคุมการพนันออนไลน์");
    cleaned = cleaned.replace(/กล่าลึก/g, "ก้าวลึก");
    cleaned = cleaned.replace(/อุตช่องโหว่/g, "อุดช่องโหว่");
    cleaned = cleaned.replace(/เล่นกี่อันตราย/g, "เล่นที่อันตราย");

    // --- 5. Road Safety & Infrastructure ---
    cleaned = cleaned.replace(/ลูกระบาด/g, "ลูกระนาด");
    cleaned = cleaned.replace(/ขนสวน/g, "ชนสวน");
    cleaned = cleaned.replace(/ถูกเก่ง/g, "ถูกเก๋ง");
    cleaned = cleaned.replace(/รถพุ่งขนดับ/g, "รถพุ่งชนดับ");
    cleaned = cleaned.replace(/พุ่งขนดับ/g, "พุ่งชนดับ");
    cleaned = cleaned.replace(/รถคนส่ง/g, "รถขนส่ง");
    cleaned = cleaned.replace(/ชนส่งสาธารณะ/g, "ขนส่งสาธารณะ");
    cleaned = cleaned.replace(/คนส่งเดลิเวอรี/g, "ขนส่งเดลิเวอรี");
    cleaned = cleaned.replace(/ธุรกิจส่วนักเรียน/g, "รถรับส่งนักเรียน");
    cleaned = cleaned.replace(/ธุกรับส่งนักเรียน/g, "รถรับส่งนักเรียน");
    cleaned = cleaned.replace(/ช้าม ทางม้าลาย/g, "ข้ามทางม้าลาย");
    cleaned = cleaned.replace(/ยกมือช้าม/g, "ยกมือข้าม");
    cleaned = cleaned.replace(/ลูกไซ่/g, "ลูกโซ่");
    cleaned = cleaned.replace(/ขนประสานงา/g, "ชนประสานงา");
    cleaned = cleaned.replace(/บิกไบก์/g, "บิ๊กไบค์");

    // --- 6. Government & Organizations ---
    cleaned = cleaned.replace(/กรมกิจการเล็กและเยาวชน/g, "กรมกิจการเด็กและเยาวชน");
    cleaned = cleaned.replace(/ศพค\./g, "ศพด."); // Child Development Center
    cleaned = cleaned.replace(/ประกาศิด/g, "ประกาศิต");
    cleaned = cleaned.replace(/รายงานที่ถือว่าไอ/g, "รายงานทีดีอาร์ไอ"); // TDRI
    cleaned = cleaned.replace(/ขอตำรวจเข็ม/g, "ขอตำรวจเข้ม");

    // --- 7. Legal & Sovereign Lexicon ---
    cleaned = cleaned.replace(/มีใช้ส่วนหนึ่ง/g, "มิใช่ส่วนหนึ่ง");
    cleaned = cleaned.replace(/ถูกพันบริษัท/g, "ผูกพันบริษัท");
    cleaned = cleaned.replace(/ถูกต้องบริษัท/g, "ผูกพันบริษัท");
    cleaned = cleaned.replace(/ผูกพับบริษัท/g, "ผูกพันบริษัท");
    cleaned = cleaned.replace(/กรณีธรรม/g, "กรมธรรม์");
    cleaned = cleaned.replace(/ห้ามและแพร่/g, "ห้ามเผยแพร่");
    cleaned = cleaned.replace(/ห้ามแฮมเพร่/g, "ห้ามเผยแพร่");
    cleaned = cleaned.replace(/ห้ามแผนพร่/g, "ห้ามเผยแพร่");
    cleaned = cleaned.replace(/ลงวนสิทธิ์/g, "สงวนสิทธิ์");
    cleaned = cleaned.replace(/ลวนสิทธิ์/g, "สงวนสิทธิ์");
    cleaned = cleaned.replace(/ลงบนสิทธิ์/g, "สงวนสิทธิ์");
    cleaned = cleaned.replace(/ลงบนลิทธิ์/g, "สงวนสิทธิ์");
    cleaned = cleaned.replace(/ลงวันที่หรือที่มาบูรณาย/g, "สงวนสิทธิ์ตามกฎหมาย");
    cleaned = cleaned.replace(/หรันวิกฤตสั่งคม/g, "เป็นวิกฤตสังคม");

    // --- 8. Specific OCR Artifacts & Hallucinations ---
    cleaned = cleaned.replace(/ตีาบอดัง ตีร่างบริคกรรม ตี๖สารสุข/g, "สานพลัง สร้างนวัตกรรม สื่อสารสุข"); // Motto Line 6
    cleaned = cleaned.replace(/“哈，你是个小伙子.*/g, ""); // Chinese Hallucination
    cleaned = cleaned.replace(/ค่าคิดเบาหวก/g, "#เด็กพูดช้า");
    cleaned = cleaned.replace(/โนนัส/g, "โบนัส");
    cleaned = cleaned.replace(/จัดนับสนุน/g, "สนับสนุน");
    cleaned = cleaned.replace(/ได้หู/g, "ได้");
    cleaned = cleaned.replace(/เนียนนิ่ง/g, "เนือยนิ่ง");
    cleaned = cleaned.replace(/เนื้อยัง/g, "เนือยนิ่ง");
    cleaned = cleaned.replace(/ขัดเจน/g, "ชัดเจน");
    cleaned = cleaned.replace(/หวั่งว่า/g, "หวังว่า");
    cleaned = cleaned.replace(/ร้าให้แทบขาดใจ/g, "ร้องไห้แทบขาดใจ");
    cleaned = cleaned.replace(/ชื่นอเตอร์ไซค์/g, "ขี่มอเตอร์ไซค์");
    cleaned = cleaned.replace(/มุงค์กโขน/g, "พุงคักขวาน"); // Phung Khac Khoan

    // --- 9. Formatting & Polish ---
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    return cleaned;
}

function start() {
    console.log(`Reading raw file: ${INPUT_FILE}`);

    if (!fs.existsSync(INPUT_FILE)) {
        console.error("Error: Raw file not found.");
        return;
    }

    const content = fs.readFileSync(INPUT_FILE, 'utf-8');
    const originalLineCount = content.split('\n').length;
    console.log(`Original Line Count: ${originalLineCount}`);

    // Clean Content
    const cleanedContent = cleanOcrErrors(content);

    // Final Stats
    const finalLineCount = cleanedContent.split('\n').length;
    console.log(`Final Line Count: ${finalLineCount}`);

    if (Math.abs(originalLineCount - finalLineCount) > 500) {
        console.warn("WARNING: Significant line count change detected!");
    } else {
        console.log("Success: Line count preserved (approx).");
    }

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, cleanedContent, 'utf-8');
    console.log(`Successfully wrote cleaned file to: ${OUTPUT_FILE}`);
}

start();
