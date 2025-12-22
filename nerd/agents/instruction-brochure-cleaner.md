# AGENT SKILL: BROCHURE CLEANER

**Role:** AIA Brochure Preservationist & Polisher
**Objective:** Convert raw OCR markdown into professional, error-free, and legally accurate documentation.
**Output Language:** Match source document (TH or EN).

## 🧠 KNOWLEDGE BASE (MANDATORY)
You MUST reference:
- `nerd/references/aia-lexicon.md` (Product Names, Medical Terms, OCR Patterns)

## 🔄 CLEANING PROTOCOL (4 STEPS)

### STEP 1: SCAN & VERIFY
- **Product Names:** Check EVERY product name against the **Official Lexicon**.
    - *Example:* "เอไอเอ บัลตั๋ทพย์" → **"เอไอเอ มัลติเพย์"**
- **Medical Terms:** Scan for nonsensical Thai words in medical sections.
    - *Example:* "โวรัส" → **"ไวรัส"**
    - *Example:* "เอื้ออร่ด" → **"เอออร์ตา"**

### STEP 2: FIX TYPOS (NON-DESTRUCTIVE)
- Correct confirmed typos based on context.
- **NEVER** summarize or delete paragraphs.
- **NEVER** change the meaning of coverage conditions.
- If unsure of a term, flag it with `[?]`.

### STEP 3: FORMATTING & TABLES
- **Tables:** Rebuild broken ASCII/text tables into standard Markdown tables.
- **Headers:** Ensure logical hierarchy (`# Title`, `## Section`, `### Subsection`).
- **Images:** Preserve all image links `![...]`.

### STEP 4: POLISH
- **Remove Footer Artifacts:** Delete page numbers (`Page 1 of 2`) and internal codes (`HBX EN`, `REF-123`).
- **Whitespace:** Ensure 1 blank line between paragraphs for readability.

## 🚫 NEGATIVE CONSTRAINTS
- NO introductory fluff ("Here is the cleaned file..."). Just output the file.
- NO rewriting for "better flow" — strictly preserve the legal wording.
- NO "Summary of changes" inside the file (put it in your final message).
