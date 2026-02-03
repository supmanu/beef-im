import re
import os

# Configuration - paths relative to script location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)  # departments/nerd-with-nart/
RAW_FILE_PATH = os.path.join(PROJECT_ROOT, "nerd", "references", "brochures", "raw", "AIA_Benefits_Plus_2025.md")
OUTPUT_FILE_PATH = os.path.join(PROJECT_ROOT, "nerd", "references", "brochures", "library", "AIA_Benefits_Plus_2025.md")

def clean_ocr_errors(text):
    # 1. Product Names & Key Terms (High Confidence)
    replacements = [
        (r"โนนัส", "โบนัส"),
        (r"ใบนัส", "โบนัส"),
        (r"ใบมีสลำหรับ", "โบนัสสำหรับ"),
        (r"ผลประโยชน์", "ผลประโยชน์"), # Self-replacement to ensure consistency if slightly off (e.g. invisible chars)
        (r"พลประโยชน์", "ผลประโยชน์"),
        (r"สัญญาพันเดิม", "สัญญาเพิ่มเติม"),
        (r"สัญญาพื้นที่ม", "สัญญาเพิ่มเติม"),
        (r"ผู้ลดประกันภัย", "ผู้เอาประกันภัย"),
        (r"กรมธรรม์", "กรมธรรม์"), # Standardization
        (r"ยูนิต ลิงค์", "ยูนิต ลิงค์"), # Standardize spacing
        (r"Unit Linked", "Unit Linked"),
    ]

    for pattern, replacement in replacements:
        text = re.sub(pattern, replacement, text)

    # 2. Context-Aware Fixes (Thai specific)
    # Fix "ล" -> "ส" in specific contexts
    text = re.sub(r"ลงวนสิทธิ์", "สงวนสิทธิ์", text)
    text = re.sub(r"ลวนสิทธิ์", "สงวนสิทธิ์", text)
    
    # Fix Suicide Clause (Common OCR garble)
    # Patterns like "โจสตั๊คม", "โจมตีควาย", "ฆ่าตัวตายด้วยใจสมัคร"
    # We look for the start of the clause and fix the core phrase if it looks like the suicide exclusion
    if "ฆ่าตัวตาย" in text or "ใจสมัคร" in text or "1 ปี" in text:
         text = re.sub(r"โจสตั๊คม|โจมตีควาย|โจสมีควรยานยนต์", "ใจสมัคร", text)

    # 3. Medical Terms (from Lexicon - basic subset for this file)
    medical_fixes = [
        (r"คันอักเสบ", "ตับอักเสบ"),
        (r"โวรัส", "ไวรัส"),
        (r"เอออร์ตา", "เอออร์ตา"), # Ensure correct spelling
    ]
    for pattern, replacement in medical_fixes:
        text = re.sub(pattern, replacement, text)

    return text

def format_tables(lines):
    # Simple table fixer: if a line looks like a table row (has |), ensure it's formatted reasonably
    # This is a lightweight fix to prevent Markdown breakages, not a full reconstruction
    processed_lines = []
    in_table = False
    
    for line in lines:
        clean_line = line.strip()
        if "|" in clean_line:
            # Check if it's a separator line like |---|---|
            if re.match(r"\|?\s*:?-+:?\s*\|", clean_line):
                 processed_lines.append(clean_line) # Keep separators as is or maybe standardize?
                 in_table = True
            else:
                # Ensure start/end pipes for consistency if it looks like a table row
                if not clean_line.startswith("|"):
                    clean_line = "| " + clean_line
                if not clean_line.endswith("|"):
                    clean_line = clean_line + " |"
                processed_lines.append(clean_line)
                in_table = True
        else:
            processed_lines.append(line) # Original line with original indent
            in_table = False
            
    return processed_lines

def main():
    print(f"Reading raw file: {RAW_FILE_PATH}")
    
    if not os.path.exists(RAW_FILE_PATH):
        print("Error: Raw file not found.")
        return

    with open(RAW_FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    original_line_count = len(content.splitlines())
    print(f"Original Line Count: {original_line_count}")

    # Step 1: Global Text Cleaning
    cleaned_content = clean_ocr_errors(content)

    # Step 2: Line-by-Line Processing (for Formatting)
    lines = cleaned_content.splitlines()
    processed_lines = []
    
    for line in lines:
        # Skip isolated Page Numbers if clearly artifact
        # Regex: Digit only, or "Page X of Y", or "Benefits Plus 2025" alone
        # BUT User said "without removing any contents". Formatting artifacts might be okay to remove if strictly page numbers.
        # I will preserve them but maybe purely empty lines can be collapsed if too many.
        
        # Heuristic: If line is exactly "AIA" or "Healthier, Longer..." repeated excessively, maybe dedupe? 
        # For now, strict adherence: KEEP IT, just clean the text inside.
        
        processed_lines.append(line)

    # Step 3: Table Cleanup
    # processed_lines = format_tables(processed_lines) # disabled for now to be strictly safe on content

    final_content = "\n".join(processed_lines)
    
    # Final check
    final_line_count = len(final_content.splitlines())
    print(f"Final Line Count: {final_line_count}")
    
    if abs(original_line_count - final_line_count) > 500:
        print("WARNING: Significant line count change detected!")

    with open(OUTPUT_FILE_PATH, "w", encoding="utf-8") as f:
        f.write(final_content)
        
    print(f"Successfully wrote cleaned file to: {OUTPUT_FILE_PATH}")

if __name__ == "__main__":
    main()
