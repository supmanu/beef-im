# Thai Content — LLM Routing Doctrine

**Status:** ACTIVE (established 2026-04-21 short-form + 2026-04-22 flagship Mode B + 2026-04-25 tagline workshop, all native-reader audited)
**Scope:** All Thai production output for nerd-with-nart (MAGNET posts, articles, social drafts).

**Length tier matters** — short-form and flagship longform have different winners. See §3.

---

## 1. The Rule

**By length tier:**
- **Short-form (S, 150-300w) → Qwen3.6 Plus.** Native rhythm beats structure at scroll-post length.
- **Flagship longform (B/C, 1500w+) → Kimi K2.6.** Mechanism depth + Naval one-liner pacing both land; Qwen's token integrity degrades at length.
- **Auditor for either → Sonnet 4.6.** Structural reference only, never the shipped draft.

Inverts the English ranking. For English content, Sonnet/Opus remain preferred. For Thai, the winning axis is: *native readers don't detect it as AI.*

---

## 2. Why

Four blind tests across the same 6-model roster — Kimi K2.6, GLM-5.1, Qwen3.6 Plus, MiniMax M2.7, Sonnet 4.6, Opus 4.7.

**Test 1 — Short-form intro (2026-04-21, 150-300w):** Qwen won.
> *"Sonnet and Opus were excellent but too good that it sounded like an obvious AI. Qwen one looks good for a short and compact social media message."*

**Test 2 — Mid-form article (2026-04-21, 500-800w):** Qwen won.
> *"Sonnet 4.6 has better language, complexity, and format. But Qwen here felt more natural and more enjoyable and straightforward to read. I think it followed the voiceDNA for Naval and Dalio tone well."*

**Test 3 — Flagship longform (2026-04-22, Mode B 1500-2000w, shared Architect blueprint):** **Kimi won. Qwen regressed.**
- Kimi's one-line-per-thought pacing is how Thai longform finance bloggers actually write — not essay-register, not translated-English rhythm.
- Qwen's same draft leaked four non-Thai characters (`与健康` CN, `Ihnen` DE, `催促` CN, bare `storm` EN) — token integrity breaks under Mode B composition load.
- GLM-5.1 surprisingly clean this run (no `หวัว`-class garbling) — flag for re-evaluation.

**Test 4 — Tagline workshop (2026-04-25, 15 candidates × 6 models, short-form direct register):** **GLM-5.1 redeemed.**
- All 6 models produced clean Thai — zero garbling, zero token bleed. MiniMax also cleared short-form on this run.
- User's top 3 picks: **2 of 3 from GLM-5.1** — #15 *"ดูเนื้อ ไม่ดูหน้า"* (now the brand master line, leverages real Thai idiom meaning *judge by substance, not appearance*) and #14 *"เน้นเนื้อ ทุกเรื่อง"*. Remaining pick: MiniMax *"เนื้อๆ ไม่มีน้ำ"*.
- GLM's unique strength: **organic Thai-idiom leverage** and **behavioral-observation paradox** (*"คนอ่านเมนูก่อนสั่ง แต่ไม่อ่านกรมธรรม์ก่อนซื้อ"* — the strongest longer-form line in the workshop).
- Zero picks from Qwen despite its short-form default status — Qwen's strength is *paragraph rhythm*, not 4-word idiom leverage. Different short-form sub-register.
- Inverts the Apr 21 short-form disqualification for GLM and MiniMax.

The failure mode for Sonnet/Opus is consistent: over-composition. They translate English literary rhythm into Thai essay-register, which reads as AI to native scrollers. What changes with length is which model best avoids *that* without breaking the other direction (Qwen's short-form simplicity becomes short-form rhythm + token bleed at longform).

---

## 3. Model Roster (Apr 2026, post-flagship bake-off)

| Model | Short-form (S) | Mid-form (A) | Flagship (B/C) | Notes |
|---|:-:|:-:|:-:|---|
| **Qwen3.6 Plus** | ✅ **Default** | ✅ Default (audit) | ⚠️ **Regressed** | Wins S + A on native rhythm. At Mode B, token integrity broke (Chinese + German + bare English leaks). Always audit. Known issues: names specific drugs (Metformin) → strip per [content-compliance-boundaries.md](./content-compliance-boundaries.md); skips Thai-First Handshake on English terms (`Paradox`, `pandemic`, `Pipeline`). |
| **Kimi K2.6** | 🟡 alt | 🟡 alt | ✅ **Default** | Flagship-tier winner (2026-04-22). One-line-per-thought pacing = closest to how Thai longform bloggers write. Mechanism depth (5-step chain) + Naval one-liners both land at length. |
| **Sonnet 4.6** | 🟡 Auditor | 🟡 Auditor | 🟡 Auditor | Structural reference only. Mode B output is audit-ready (4 watermarks, tables, tool placeholders) but reads slightly AI. Ship as last-resort when Kimi+Qwen both fail. |
| **Opus 4.7** | 🟡 Strategy | 🟡 Strategy | 🟡 Strategy | Best emotional richness + Dalio closers, but literary over-composition. Use for Architect blueprints, not Performer output. |
| **GLM-5.1** | ✅ **Direct/idiom register (2026-04-25)** | 🟡 alt | ⚠️ Clean 2026-04-22 | Apr 21 short-form garbled; Apr 22 flagship clean; **Apr 25 tagline workshop: won 2 of user's top 3 picks** (idiom-leverage + scope claim). **Redemption confirmed for short-form direct register.** Strength: organic Thai-idiom leverage, behavioral-observation paradox. Not a Qwen replacement — different sub-register (idiom/wit, not paragraph rhythm). Re-test quarterly. |
| **MiniMax M2.7** | ⚠️ Clean (2026-04-25) | ❌ Token bleed | ⚠️ Plain-but-clean | Apr 21: `กินยะm`, `Powel ขั้นสูง`. Apr 22 flagship: clean but plainest. Apr 25 tagline workshop: clean Thai + 1 of user's top 3 picks (*"เนื้อๆ ไม่มีน้ำ"*). Short-form redemption partial — usable for direct-register drafts, longform still benched. |

**Legend:** ✅ production · 🟡 use with care / non-content role · ⚠️ unstable, needs re-test · ❌ disqualified

**Cross-tier insight:** Winner flips at length because the failure modes swap. Short-form rewards naturalness (Qwen wins, Sonnet/Opus lose on over-composition). Longform rewards *structure + naturalness together* (Kimi wins because its one-liners scale; Qwen loses because token bleed scales too).

---

## 4. Standard Thai Pipeline

**Short-form (S) / Mid-form (A):**
```
Topic / Blueprint → Qwen3.6 Plus draft → Sonnet or Gem #4 audit → Ship
```

**Flagship (B / C):**
```
Blueprint (Architect, usually Sonnet/Opus) → Kimi K2.6 draft → Sonnet or Gem #4 audit → Ship
```

**Audit checklist (both tiers):**
- Paradox present? Case Builder 4-step?
- Thai-First Handshake 85/15 (Thai leads, English in parens) ← Qwen skips often; Kimi usually clean
- Content-compliance boundaries (no drug names / dosage / verdict) ← Gem #4 missed Apr 21
- Token integrity scan (Mode B only): grep output for CJK/Latin-outside-handshake characters ← Qwen Mode B regression 2026-04-22
- Word count within target band (flagship: 1500-2000w minimum) ← all 6 models undershot Apr 22

Do not route either model's draft back through Sonnet for *rewriting* — only auditing. Sonnet's edits will over-compose the Thai and re-introduce AI-detector signal.

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
