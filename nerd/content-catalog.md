---
type: catalog
updated: 2026-03-24
stale_since: 2026-04-22
total_files: 68
production_ready: 3
drafts: 6
blueprints_unused: 3
draft_archive_batches: 4
---

# Content Catalog — Everything You Have

Last scanned: 2026-03-24
**⚠️ STALE as of 2026-04-22** — this catalog predates:
- The new `nerd/output/blueprints/` and `nerd/output/drafts/` directories (Apr 21-22)
- Seeds added April 2026 (`2026-04-21-no-insurance-5-traps.md`, `2026-04-21-health-insurance-beua-thing.md`)
- 6-model bake-off drafts in `nerd/output/drafts/`
- New `.claude/rules/` additions (thai-model-routing, content-compliance-boundaries)
- Mastra RAG soft-pause (Apr 21)

Numbers below are **last known good** from Mar 24. Re-scan recommended before relying on counts.

---

## Production-Ready (Publish Now)

These are complete, structured articles ready for final review and posting.

| # | File | Thai Title | Topic | Lines | Mode |
|---|------|-----------|-------|-------|------|
| 1 | `content/articles/premium-holiday-trap.md` | กับดัก "พักเบี้ย": การตลาดที่ทำให้คุณจ่ายแพงขึ้น โดยไม่รู้ตัว | Premium Holiday trap | 132 | A |
| 2 | `content/articles/insurance-extinction-2083.md` | 2083: ปีที่อุตสาหกรรมประกันภัยไทยตาย | Insurance industry collapse | 226 | B |
| 3 | `content/test-articles/structure-war-final.md` | ศึกเชิงโครงสร้าง: "สัญญาเช่า" ปะทะ "สินทรัพย์" | Term vs Whole Life | 536 | C |

---

## Strong Drafts (Pick Best Variant → Publish)

Multiple model variants of the same topic. Pick the best one, polish, publish.

### Premium Holiday — 6 Variants

| Variant | Thai Title | Tone | Lines | Standout Quality |
|---------|-----------|------|-------|-----------------|
| `premium-holiday-trap.md` | กับดัก "พักเบี้ย" | Analytical | 132 | Clean structure |
| `premium-holiday-OPUS.md` | พักเบี้ย: คำหวานที่กลายเป็นยาพิษ | Narrative (Khun Srisom) | 152 | Emotional hook |
| `premium-holiday-sonnet.md` | พักเบี้ย = พักตาย | Aggressive | 168 | Strong metaphors |
| `premium-holiday-trap-glm-Deep.md` | กับดักพักเบี้ย: อย่าหลงว่า "พัก" แล้วปลอดภัย | Deep analysis (Khun Somchai) | 271 | Numeric case study |
| `premium-holiday-trap-sovereign.md` | กับดัก "พักเบี้ย": เสียงสะท้อนจากเหยื่อตัวจริง | Victim narrative | 110 | Real-feeling |
| `premium-holiday-trap-glm4-7.md` | กับดักพักเบี้ย: ภาพลวงตาที่คิดดอกเบี้ยแพงกว่าสินเชื่อ | Short form | 108 | Concise |

### Unit-Linked — 2 Variants (Early Stage)

| Variant | Thai Title | Lines | Notes |
|---------|-----------|-------|-------|
| `unit-linked-side-contract-test.md` | ทดสอบ "สัญญาเสริม" กองทุน Unit Linked | 62 | Fragment, needs expansion |
| `unit-linked-stern-guardian-version.md` | สัญญามรณะ Unit Linked | 74 | Stern tone, short |

---

## Blueprints — `nerd/output/blueprints/` (v6.0+, single source of truth)

All blueprints now live under `nerd/output/blueprints/`. Legacy `input/*.txt` files were migrated on Apr 22, 2026 — converted to `.md`, wrapped with retrospective frontmatter (`seed: null`, `status: legacy-ready | legacy-consumed`, `legacy_source:` pointer), and the original `input/` folder + `_ops/input` symlink were removed.

| # | File | Seed | Archetype | Mode | Status |
|---|------|------|-----------|------|--------|
| 1 | `nerd/output/blueprints/2026-04-21-no-insurance-5-traps.md` | `2026-04-21-no-insurance-5-traps` | — | B | Consumed — 6 drafts produced Apr 22 |
| 2 | `nerd/output/blueprints/legacy-diabetes.md` | _null (legacy)_ | Uncomfortable Truth | B | Legacy-ready |
| 3 | `nerd/output/blueprints/legacy-senior-crisis.md` | _null (legacy)_ | Systemic Reveal | C | Legacy-ready |
| 4 | `nerd/output/blueprints/legacy-aia-war.md` | _null (legacy)_ | Uncomfortable Truth | C | Legacy-ready |
| 5 | `nerd/output/blueprints/legacy-structure-war.md` | _null (legacy)_ | Uncomfortable Truth | C | Legacy-consumed → `content/test-articles/structure-war-final.md` |

---

## Draft Archive (Model A/B Testing Batches)

4 iteration batches of the Diabetes Trap article, each tested across 7 LLMs.

| Batch | Date | Models Tested | Purpose |
|-------|------|---------------|---------|
| `_draft_archive/2025-12-28_18-31-59/` | Dec 28 PM | Opus, Sonnet, GLM, Minimax, DeepSeek, DeepSeek-Chat, GPT5.2 | V1 — Initial |
| `_draft_archive/2025-12-28_23-37-25/` | Dec 28 Night | Same 7 models | V2 — Iteration |
| `_draft_archive/2025-12-29_02-04-23/` | Dec 29 AM | Same 7 models | V3 — Refinement |
| `_draft_archive/2025-12-30_03-47-06/` | Dec 30 AM | Same 7 models | V4 — Final |

**Action:** Review V4 batch (latest iteration). Pick the best model output. Promote to `content/articles/`.

---

## Gold Standard Samples

| File | Type | Purpose |
|------|------|---------|
| `nerd/samples/Article_Sample_Mode_B_Diagnosis.md` | Mode B example | Template reference |
| `nerd/samples/Article_Sample_Mode_B_Grandchild.md` | Mode B example | Template reference |
| `nerd/samples/Article_Sample_Mode_C_Dynasty.md` | Mode C example | Template reference |

---

## Client Proposals (Separate Category)

| File | Client | Type |
|------|--------|------|
| `nerd/samples/Health_Insurance_Proposal_Andy_Z.md` | Andy Z | Health insurance |
| `nerd/samples/Health_Insurance_Proposal_Joseph_K.md` | Joseph K | Health insurance |
| `nerd/samples/Health_Insurance_Proposal_Kenta_REVISED.md` | Kenta (final) | Health insurance |
| `nerd/samples/Kenta_Executive_Summary.md` | Kenta | Executive summary |
| `nerd/samples/Proposal_Tui_Dec2025_PRO.md` | Tui | Insurance proposal |

---

## Quick Wins — What to Do Right Now

### Immediate Publishes (3 articles)
1. Review `premium-holiday-trap.md` → publish
2. Review `insurance-extinction-2083.md` → publish
3. Review `structure-war-final.md` → publish

### Quick Promotions (Pick 1 from each)
4. Diabetes Trap: Review `_draft_archive/2025-12-30_03-47-06/` (V4 batch) → pick best model
5. Unit-Linked: Expand `unit-linked-stern-guardian-version.md` (74 lines → full article)

### Blueprint → Article (3 unused)
6. Feed `diabetes-blueprint.txt` to `/produce-article`
7. Feed `senior-crisis-blueprint.txt` to `/produce-article`
8. Feed `aia-war-blueprint.txt` to `/produce-article`

---

## File Location Map

```
nerd-with-nart/
├── content/
│   ├── articles/           ← 9 files (production + variants)
│   ├── _draft_archive/     ← 28 files (4 batches × 7 models)
│   └── test-articles/      ← 19 files (structure-war iterations)
├── input/                  ← 4 blueprints
├── nerd/
│   ├── seeds/              ← NEW: capture raw ideas here
│   ├── samples/            ← 8 files (gold standards + proposals)
│   ├── pillars/            ← 13 core knowledge files
│   ├── agents/             ← agent instructions
│   └── references/
│       └── brochures/
│           └── library/    ← 3 cleaned brochures
└── .claude/
    └── skills/             ← 5 production skills
```
