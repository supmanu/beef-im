# Content Compliance — Professional Scope Boundaries

**Status:** ACTIVE (established 2026-04-21 after Qwen/Gemini-Auditor miss)
**Applies to:** All nerd-with-nart content (articles, MAGNET posts, social drafts, proposals).
**Enforcement:** Architect · Performer · Auditor must all check before ship.

---

## 1. The Rule

**We comment on financial, insurance, and health-finance decisions. We do NOT practice medicine, law, or licensed financial advisory.**

Explicit bans in production output:

| Never include | Always substitute |
|---|---|
| Specific drug names (Metformin, Glimepiride, Atorvastatin, etc.) | "medication" / "ยา" / "ยาเบาหวาน" (generic class) |
| Dosage recommendations (500mg, 2x daily, etc.) | Remove entirely — doctor's decision |
| Diagnostic thresholds *as advice* (HbA1c > 6.5 → you have diabetes) | Frame as *indicator*, always close with *"ปรึกษาแพทย์"* |
| Specific treatment protocols (start Metformin + lifestyle) | *"เริ่มรักษาตามแผนของแพทย์ + ปรับพฤติกรรม"* |
| Legal advice on claim disputes | Cite policy language; recommend lawyer consult |
| Specific buy/sell stock picks | Principle-level only |

Data citations (NHES VII, prevalence stats, Bangkok-specific %) are **allowed and encouraged** — that's journalism, not practice.

---

## 2. Why

The Sinek Filter (*"We do not convince. We confirm."*) already bans sales manipulation. This rule extends the same principle to professional advice boundaries: **naming a specific drug is a prescription act, not a journalism act.**

2026-04-21 incident: Qwen3.6 Plus's 600w draft on Thai diabetes prevalence named *Metformin* specifically in the "if you already have diabetes but no complications" scenario. Gemini Gem #4 (Auditor) passed the draft with 🟢 on every axis except Thai-First Handshake — **missed the medical-scope violation entirely.** User (non-doctor) caught it.

**The risk is real, not theoretical:** nerd-with-nart's readership is Mass Affluent with health anxiety. A specific drug name from a trusted voice functions as permission to self-medicate or to push back against a doctor's different prescription.

---

## 3. How to Apply (Auditor Checklist)

Add to the 6-point compliance pass:

```
□ No specific drug/medication names
□ No dosage numbers
□ No diagnostic pronouncements (framed as indicator, not verdict)
□ No specific treatment protocols
□ Health claims close with a "consult a doctor" handoff where actionable
```

If an LLM draft (especially Qwen) includes any of these, strip and re-draft. Do not ship.

---

## 4. Safe Framing Examples

| ❌ Raw LLM output | ✅ Compliant rewrite |
|---|---|
| "เริ่มยา Metformin + ปรับพฤติกรรม" | "เริ่มยารักษาตามที่แพทย์สั่ง + ปรับพฤติกรรม" |
| "ค่า HbA1c ควรต่ำกว่า 7% ถ้าสูงกว่านี้คุณต้องเพิ่มยา" | "ค่าน้ำตาลสะสม (HbA1c) เป็นตัวบ่งชี้หนึ่งที่แพทย์ใช้ประเมิน — คุยกับหมอถึงเป้าหมายที่เหมาะกับคุณ" |
| "ถ้าน้ำตาลขึ้น 126 คุณเป็นเบาหวาน" | "ระดับน้ำตาล 126 mg/dL ขึ้นไปคือเกณฑ์ที่แพทย์ใช้วินิจฉัย — ควรพบแพทย์เพื่อยืนยัน" |

---

## 5. Related

- [paradox-architecture.md](./paradox-architecture.md) — Paradox doctrine (still required, this rule is additional)
- [thai-model-routing.md](./thai-model-routing.md) — Qwen is production default but needs this audit layer
- `nerd/pillars/constitution.md` — Article II (banned terms) + Anti-Sales Doctrine; this rule is the professional-scope extension
- `nerd/agents/instruction-auditor-Sonnet.md` — add compliance-boundary block on next revision
