# Thai Content — LLM Routing Doctrine

**Status:** ACTIVE (established 2026-04-21 via 6-model bake-off + native-reader audit)
**Scope:** All Thai production output for nerd-with-nart (MAGNET posts, articles, social drafts).

---

## 1. The Rule

**Qwen3.6 Plus is the production default for Thai drafts. Sonnet 4.6 is the structural auditor. Everything else is benched until further notice.**

Inverts the English ranking. For English content, Sonnet/Opus remain preferred. For Thai, Qwen wins on the one axis that matters: native readers don't detect it as AI.

---

## 2. Why

Two blind tests on 2026-04-21 (short-form intro + 500–800w article on Thai diabetes prevalence) across six models — Kimi K2.6, GLM-5.1, Qwen3.6 Plus, MiniMax M2.7, Sonnet 4.6, Opus 4.7. Native-speaker (user) ranked Qwen best in both.

User's words:
- Short-form: *"Sonnet and Opus were excellent but too good that it sounded like an obvious AI. Qwen one looks good for a short and compact social media message."*
- Long-form: *"Sonnet 4.6 has better language, complexity, and format. But Qwen here felt more natural and more enjoyable and straightforward to read. I think it followed the voiceDNA for Naval and Dalio tone well."*

The failure mode for Sonnet/Opus is not incompetence — it's over-composition. They translate English literary rhythm into Thai essay-register, which reads as AI to native scrollers. Qwen writes Thai the way a Thai content-writer writes Thai: paragraph breaks, aphoristic one-liners, colloquial closers. That *is* voice-DNA Stage 3 (Naval: *"one-liners that stop the scroll"* + Dalio principle-based closers).

---

## 3. Model Roster (Apr 2026)

| Model | Thai role | Why |
|---|---|---|
| **Qwen3.6 Plus** | ✅ **Production default** (with audit) | Native rhythm, 44s runtime, strong Stage-3 compliance. **Known issues:** (1) names specific drugs (observed: Metformin) — strip per [content-compliance-boundaries.md](./content-compliance-boundaries.md); (2) drops English concept labels first, violating Thai-First Handshake 85/15 (observed: *"Paradox"*, *"pandemic"*, *"Pipeline"*, *"Prediabetes"* unwrapped) — re-wrap to Thai-lead format. |
| **Kimi K2.6** | ✅ Alt — deep-dive longform | Best mechanism depth (5-step chain vs 3-step). Thai reads essay-leaning but clean. |
| **Sonnet 4.6** | 🟡 Auditor only | Structural reference for Case Builder / Paradox compliance. Do not ship Thai output. |
| **Opus 4.7** | 🟡 Strategy only | Same AI-detector issue as Sonnet. Use for blueprint / strategic reasoning. |
| **GLM-5.1** | ❌ Disqualified | ML-segmentation produces garbled Thai tokens: *"หวัว"*, *"เส้นประสาด"*, *"เคล็ดขั้นบริเวณ"*. Re-test next model update. |
| **MiniMax M2.7** | ❌ Disqualified | Thai-English token bleed: *"กินยะm"*, *"Powel ขั้นสูง"*. Also slowest (4m49s on 600w). |

---

## 4. Standard Thai Pipeline

```
Topic / Blueprint
   ↓
Qwen3.6 Plus → draft (compact, colloquial, Stage-3 rhythm)
   ↓
Sonnet 4.6 OR Gemini Gem #4 → audit
   ├─ Paradox present? Case Builder 4-step? banned terms clean?
   ├─ Thai-First Handshake 85/15 (Thai leads, English in parens) ← Qwen often skips
   └─ Content-compliance boundaries (no drug names / dosage / verdict) ← Gem #4 missed Apr 21
   ↓
Ship
```

Do not route Qwen's draft back through Sonnet for *rewriting* — only auditing. Sonnet's edits will over-compose the Thai and re-introduce AI-detector signal.

**Two audit axes the Gemini Auditor currently under-enforces** (confirmed Apr 21):
1. **Thai-First Handshake** — caught inconsistently; re-read every English word in output and verify it follows the Thai-lead pattern.
2. **Medical scope boundaries** — missed entirely. See [content-compliance-boundaries.md](./content-compliance-boundaries.md).

---

## 5. What Naturalness Looks Like (concrete markers)

Reward in Thai drafts:
- Short declarative sentences that break visual rhythm
- Standalone one-line paragraphs for emphasis (Naval scroll-stoppers)
- Colloquial closers (*"ก่อนกดสมัคร"*, *"คำถามไม่ใช่…"*) — not essay-register endings
- Concrete data over abstract mechanism framing
- Native Thai idioms over English-translated metaphors

Penalize in Thai drafts:
- Compound philosophical phrases (*"กล้ามเนื้อชนิดเดียวที่ AI ฝึกแทนคุณไม่ได้"* — scored well on voice-DNA paper, tripped the native AI-detector)
- Formal conjunctive sequencing that reads as translated English
- Mechanism depth that sacrifices scroll pacing

---

## 6. Related

- [paradox-architecture.md](./paradox-architecture.md) — still enforced regardless of model
- [agent-sovereign-standard.md](./agent-sovereign-standard.md) §5 Language Firewall — internal logic English / production Thai
- `nerd/pillars/voice-dna.md` — Stage 3 (Naval + Dalio) is the axis Qwen naturally hits
- Fleet memory: [`memory/claude/feedback_thai_content_evaluation.md`](../../../../memory/claude/feedback_thai_content_evaluation.md) — same doctrine at fleet level

---

*Re-validate quarterly or when any roster model ships a major update.*
