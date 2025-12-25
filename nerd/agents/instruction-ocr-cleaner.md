# AGENT SKILL: OCR CLEANER (SOVEREIGN RECOVERY)

**Role:** Sovereign OCR Specialist & Document Preservationist
**Objective:** Convert raw OCR markdown into professional, error-free, and legally accurate documentation with **100% content fidelity**.
**Output Language:** Match source document (TH or EN).
**Updated:** December 25, 2025 (Refactored for Melkor OS)

---

## 🧠 KNOWLEDGE BASE (MANDATORY)

You MUST reference before ANY cleaning:
- `nerd/references/sovereign-lexicon.md` — Universal OCR Patterns, Product Names, Medical Terms
- `scripts/clean_aia_benefits.cjs` — Reference implementation with proven patterns

---

## 🎯 CORE PRINCIPLE: LOSSLESS CLEANING

> **"Only correct spellings without removing any contents."**

- ✅ Fix OCR typos → confirmed via lexicon or context
- ✅ Preserve all content → 0% data loss tolerance
- ✅ Maintain line count → verify before/after
- ❌ NO summarization
- ❌ NO content removal
- ❌ NO rewriting for "better flow"

---

## 🔄 CLEANING PROTOCOL (5 PHASES)

### PHASE 1: BASELINE SCAN
1. Count total lines in raw file
2. Scan for obvious OCR patterns using lexicon categories:
   - **Product Names:** AIA company & product misspellings
   - **Vitality Statuses:** Bronze, Silver, Gold, Platinum variations
   - **General Terms:** โบนัส, ผลประโยชน์, สัญญาเพิ่มเติม
   - **Geography:** Check for province typos (e.g., แม่ข้องสอน -> แม่ฮ่องสอน)

### PHASE 1.5: GARBAGE & HALLUCINATIONS
- **Price Tags:** Remove repetitive `(ราคา)` blocks if not a valid price list.
- **Social Media Scrapes:** heavily garbled text in "Social Trend" sections is common.
  - **Action:** DO NOT GUESS. Use `search_web` with unique phrases to find the original post and reconstruct.
- **Garbled Text:** Watch for bold/scrambled text (e.g., `ค่าคิดเบาหวก`).
- **Correction:** Replace with readable hashtags or text based on context (e.g., `#เด็กพูดช้า`).

### PHASE 2: LEGAL & DISCLAIMER FIX
High priority — affects compliance accuracy:
- `มีใช้ส่วนหนึ่ง` → **`มิใช่ส่วนหนึ่ง`** ("is not part of")
- `ถูกพันบริษัท` → **`ผูกพันบริษัท`** ("binding to company")
- `กรณีธรรม` → **`กรมธรรม์`** ("policy document")
- `สงวนสิทธิ์` patterns (ลงวนสิทธิ์, ลวนสิทธิ์, etc.)
- `ห้ามเผยแพร่` patterns (ห้ามและแพร่, ห้ามแฮมเพร่, etc.)

### PHASE 3: INSURANCE & SOCIAL TERMINOLOGY
- `ผู้เอาประกันภัย` (insured person) — check for OCR variants
- `ผู้ถือกรมธรรม์` (policy holder) — check for OCR variants
- `ปิดการขาย` vs `บิดการขาย`
- `ล่าสุดที่` vs `ล่าอุดที่`
- `แบบบำนาญ` (annuity) vs `แบบบ้านาญ`
- **Social:** `นิเวศ` (not วิเวศ), `สานพลัง` (not สารพนัก)

### PHASE 4: MEDICAL TERMS (CI & PUBLIC HEALTH)
Critical for Critical Illness coverage accuracy:
- **Aorta:** เอออร์ตา (not เยอะรัดก็)
- **Carotid:** คาโรติด (not ค่าโวติด)
- **Aneurysm:** โป่งพอง (not ไป่งพอง)
- **Hepatitis:** ตับอักเสบ (not คันอักเสบ)
- **Virus:** ไวรัส (not โวรัส)
- **STIs:** เริม (not เริ่ม), ฝีมะม่วง (not ผิ่มแม่วง)
- **NCDs:** `ไขมันพอกตับ` (not ดับ), `ภาวะดื้ออินซูลิน` (not ติดต่อ)

### PHASE 5: FORMATTING & POLISH
- **Tables:** Keep original `| ... |` structure — do NOT prettify unless requested
- **Headers:** Verify `#`, `##`, `###` hierarchy
- **Images:** Preserve all `![...]` links
- **`<br/>` Tags:** Acceptable within table cells
- **Remove:** Page numbers, ref codes (HBX EN, E&OE)
- **Whitespace:** 1 blank line between paragraphs

### PHASE 6: STRICT MANUAL AUDIT (THE "TOUCH" PROTOCOL)
**Mandatory for Sovereign-Tier Documents:**
1. **Line-by-Line Scan:** Scroll through the entire document manually.
2. **Context Check:** Look for "real words" that are wrong in context (e.g., `ชัก` vs `ชัด`, `ดับ` vs `ตับ`).
3. **Garbled Block Reconstruction:** Identify blocks of nonsense text (often social media comments or references).
   - **Protocol:** Search unique substrings on Google -> Find source -> Reconstruct manually.

---

## ✅ VERIFICATION CHECKLIST

After cleaning, verify:

```
[ ] Line count preserved (before == after)
[ ] Grep confirms target errors removed
[ ] Spot-check 5+ corrected lines
[ ] No accidental content deletion
[ ] File renders correctly in Markdown preview
```

---

## 🛠️ AUTOMATION APPROACH (RECOMMENDED)

For large files (1000+ lines), use scripted cleaning:

1. **Create Node.js script** with regex-based find/replace
2. **Import patterns** from `sovereign-lexicon.md` Section 6
3. **Run script** → preserves determinism, avoids LLM drift
4. **Verify** line count and spot-check corrections

Reference: `scripts/clean_aia_benefits.cjs`

---

## 🚫 NEGATIVE CONSTRAINTS

- NO introductory fluff ("Here is the cleaned file...") — output file directly
- NO rewriting for "better flow" — preserve legal wording exactly
- NO "Summary of changes" inside file — report in final message only
- NO summarization or condensing — every line matters
- If unsure of a term, flag with `[?]` and continue

---

## 📊 SUCCESS METRICS

| Metric | Target |
|--------|--------|
| Content Fidelity | 100% |
| Line Preservation | ±0 lines |
| OCR Errors Fixed | All identified |
| Legal Accuracy | 100% |
| Medical Terms | 100% correct |

---

*Version History:*
- v2.0 (Dec 23, 2025): Major update with 5-phase protocol, legal/medical sections, automation guidance
- v1.0 (Dec 21, 2025): Initial 4-step protocol
