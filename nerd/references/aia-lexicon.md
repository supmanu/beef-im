# AIA LEXICON & OCR CORRECTION DICTIONARY

**Purpose:** Master reference for cleaning OCR'd brochure text to ensure accuracy in Product Names and Medical Terminology.
**Updated:** December 2025

## 1. 🏷️ PRODUCT NAMES (OFFICIAL)

| English Name | Thai Name (Official) | Common OCR Errors (To Fix) |
| :--- | :--- | :--- |
| **AIA Multi-Pay CI Plus** | **เอไอเอ มัลติเพย์ ซีไอ พลัส** | เอไอเอ บัลตั๋ทพย์ ซีไอ, มัลติเพย์ ซีไอ |
| **AIA Total Care** | **เอไอเอ โททัล แคร์** | โททัลแคร์ (missing space) |
| **AIA Health Happy** | **เอไอเอ เฮลธ์ แฮปปี้** | เฮลธ์แฮปปี้ |
| **AIA HB Extra** | **เอไอเอ เอชบี เอ็กซ์ตร้า** | เอชบี เอ็กซ์ตรา |
| **AIA Vitality** | **เอไอเอ ไวทัลลิตี้** | ไวทัลดีดี |

---

## 2. 🏥 MEDICAL TERMINOLOGY (THAI)

| English Term | Thai Term (Verified) | Common OCR Errors (To Fix) |
| :--- | :--- | :--- |
| **Hepatitis** | **ตับอักเสบ** | คันอักเสบ |
| **Virus** | **ไวรัส** | โวรัส |
| **Viral Hepatitis** | **ไวรัสตับอักเสบ** | ไวรัสคันอักเสบ, โวรัสคันอักเสบ |
| **Aorta** | **เอออร์ตา** | เอื้ออร่ด, เอ ออร์ ตา |
| **Spinal Cord** | **ไขสันหลัง** | ไข่ลำหลัง, ไขกระดูก (check context) |
| **Multiple Sclerosis** | **มัลติเพิล สเคลอโรซิส** | มัลติเพลสตมาอะไรสีส, มัลติเพิล สเกลอโรซิส |
| **Systemic Lupus Erythematosus** | **ซิสเต็มมิค ลูปัส อิริเธมาโตซัส** | ซิสเต็มมีด, ซิสเต็มมิค ลูปัส |
| **Meningitis** | **เยื่อหุ้มสมองอักเสบ** | เลือดดังไม้เชื้อหุ้มสมอง |
| **Poliomyelitis** | **โรคโปลิโอ** | โรคไปตีโย |
| **Parkinson's Disease** | **โรคพาร์กินสัน** | โรคพาร์กินสับ |
| **Rheumatic Fever** | **โรคไข้รูมาติก** | โรคไขรุ่งมาติก |
| **Elephantiasis** | **โรคเท้าช้าง** | โรคเท้าข้าง |
| **Severe / Major** | **รุนแรง** | รูปแบบ, รูปแรง, ภัยแรง |
| **Recurrent** | **กลับเป็นซ้ำ** | กลับเป็นข้า |

---

## 3. 📝 COMMON OCR TYPOS & PATTERNS

| Wrong (OCR) | Right (Correction) | Context |
| :--- | :--- | :--- |
| สัญญาพันเดิม | **สัญญาเพิ่มเติม** | Header / Rider |
| สัญญาพื้นที่ม | **สัญญาเพิ่มเติม** | Header / Rider |
| ผลประโยชน์ | **ผลประโยชน์** | General |
| พลประโยชน์ | **ผลประโยชน์** | General |
| ผู้ลดประกันภัย | **ผู้เอาประกันภัย** | General |
| เบื้องอก | **เนื้องอก** | Medical |
| ถนนสุรวงค์ | **ถนนสุรวงศ์** | Address |

---

## 4. 📐 FORMATTING STANDARDS

- **Tables:** Convert broken text tables (using `|` or whitespace) into standard Markdown tables.
- **Headers:** Ensure strict hierarchy (`#`, `##`, `###`).
- **Lists:** Fix bullet points converted to random symbols (`*`, `-`, `•` are valid).
- **Footers:** Remove page numbers (e.g., `Page 2 of 2`) and ref codes (e.g., `HBX EN`, `E&OE`).
