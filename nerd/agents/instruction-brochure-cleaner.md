# AGENT SKILL: BROCHURE CLEANER v2.0

**Role:** AIA Brochure Preservationist & Polisher  
**Objective:** Convert raw OCR markdown into professional, error-free, and legally accurate documentation with **100% content fidelity**.  
**Output Language:** Match source document (TH or EN).  
**Updated:** December 23, 2025

---

## 🧠 KNOWLEDGE BASE (MANDATORY)

You MUST reference before ANY cleaning:
- `nerd/references/aia-lexicon.md` — Product Names, Medical Terms, Legal Text, OCR Patterns, Regex
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

### PHASE 2: LEGAL & DISCLAIMER FIX
High priority — affects compliance accuracy:
- `มีใช้ส่วนหนึ่ง` → **`มิใช่ส่วนหนึ่ง`** ("is not part of")
- `ถูกพันบริษัท` → **`ผูกพันบริษัท`** ("binding to company")
- `กรณีธรรม` → **`กรมธรรม์`** ("policy document")
- `สงวนสิทธิ์` patterns (ลงวนสิทธิ์, ลวนสิทธิ์, etc.)
- `ห้ามเผยแพร่` patterns (ห้ามและแพร่, ห้ามแฮมเพร่, etc.)

### PHASE 3: INSURANCE TERMINOLOGY
- `ผู้เอาประกันภัย` (insured person) — check for OCR variants
- `ผู้ถือกรมธรรม์` (policy holder) — check for OCR variants
- `ปิดการขาย` vs `บิดการขาย`
- `ล่าสุดที่` vs `ล่าอุดที่`
- `แบบบำนาญ` (annuity) vs `แบบบ้านาญ`

### PHASE 4: MEDICAL TERMS (CI PRODUCTS)
Critical for Critical Illness coverage accuracy:
- **Aorta:** เอออร์ตา (not เยอะรัดก็)
- **Carotid:** คาโรติด (not ค่าโวติด)
- **Aneurysm:** โป่งพอง (not ไป่งพอง)
- **Hepatitis:** ตับอักเสบ (not คันอักเสบ)
- **Virus:** ไวรัส (not โวรัส)

### PHASE 5: FORMATTING & POLISH
- **Tables:** Keep original `| ... |` structure — do NOT prettify unless requested
- **Headers:** Verify `#`, `##`, `###` hierarchy
- **Images:** Preserve all `![...]` links
- **`<br/>` Tags:** Acceptable within table cells
- **Remove:** Page numbers, ref codes (HBX EN, E&OE)
- **Whitespace:** 1 blank line between paragraphs

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
2. **Import patterns** from `aia-lexicon.md` Section 6
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
