---
name: produce-article
description: "Full 3-step article production pipeline: Architect (blueprint) → Performer (write) → Auditor (verify). End-to-end from topic to publishable article."
disable-model-invocation: true
argument-hint: "[topic] [mode: S|A|B|C]"
allowed-tools: Read, Glob, Grep
---

# Full Article Production Pipeline

Execute the complete 3-agent pipeline to produce a publishable Thai article.

## Topic & Mode

**Input:** $ARGUMENTS

If no mode is specified, default to **Mode A** (Analysis, 600-1,000 words).

## Pipeline Overview

```
Step 1: ARCHITECT → GSB-Kane Blueprint
Step 2: PERFORMER → Thai Article Draft
Step 3: AUDITOR  → Compliance Verification
```

---

## STEP 1: ARCHITECT (Blueprint)

### Architect Instructions
!`cat nerd/agents/instruction-architect.md`

### Required Knowledge for Blueprinting
- Voice DNA: Read `nerd/pillars/voice-dna.md`
- Framework: Read `nerd/pillars/framework-deep-dive.md`
- NHES VII: Read `nerd/pillars/data-nhes-vii.md`
- Terminology: Read `nerd/pillars/data-terminology.md`
- Content Engine: Read `nerd/pillars/content-engine.md`

**Task:** Find the Paradox. Build the GSB-Kane Blueprint with Core Contradiction, Sinek Hook, Archetype, and Narrative Arc.

**Output the blueprint, then immediately proceed to Step 2.**

---

## STEP 2: PERFORMER (Writing)

### Performer Instructions (v1.9.3)
Read the full performer instructions from `nerd/agents/performer.md` before writing.

### Required Knowledge for Writing
- Voice DNA: Read `nerd/pillars/voice-dna.md`
- Constitution: Read `nerd/pillars/constitution.md`
- Thai Handshake: Read `nerd/pillars/data-thai-handshake-exceptions.md`
- Bridge Lab: Read `nerd/pillars/tech-bridge-lab.md`
- Terminology: Read `nerd/pillars/data-terminology.md`
- NHES VII: Read `nerd/pillars/data-nhes-vii.md`
- Citations: Read `nerd/pillars/data-citation-template.md`

**Task:** Execute the blueprint into a Thai article. Apply watermarks, footer, and compliance rules.

**Pre-submission checklist:**
- No "พี่" (Pi) self-reference
- Headers in pure Thai
- NHES VII stats (not NHES 6)
- Watermark count correct (S=1, A=3, B=4, C=5)
- Thai-First >= 85%
- Footer: `📊 บทวิเคราะห์โดย: เนิร์ดกับนาถ (Nerd with Nart)`

**Output the draft, then immediately proceed to Step 3.**

---

## STEP 3: AUDITOR (Verification)

### Auditor Instructions
Read the auditor instructions from `nerd/agents/instruction-sovereign-auditor.md`.

### Required Knowledge for Auditing
- Constitution: Read `nerd/pillars/constitution.md`
- NHES VII: Read `nerd/pillars/data-nhes-vii.md`
- Terminology: Read `nerd/pillars/data-terminology.md`

**Task:** Run the 6-point compliance audit:
1. OIC Compliance (waiting periods, guaranteed renewal)
2. Revenue Code (annuity limits, hold requirements)
3. PDPA Privacy (no child full names)
4. SEC Disclaimers (risk warnings)
5. FDA Health Claims (no "cure")
6. Brand Constitution (banned terms, identity)

**If PASS:** Output the final article with "APPROVED FOR PUBLICATION" stamp.
**If REJECT:** Apply Forensic Reconstruction (fix violations) and output the corrected version.

---

## Final Output Format

```
═══════════════════════════════════════
STEP 1: ARCHITECT BLUEPRINT
═══════════════════════════════════════
[Blueprint here]

═══════════════════════════════════════
STEP 2: PERFORMER DRAFT
═══════════════════════════════════════
[Article here]

═══════════════════════════════════════
STEP 3: AUDITOR VERDICT
═══════════════════════════════════════
Verdict: PASS / REJECT
[Audit findings]

═══════════════════════════════════════
FINAL APPROVED ARTICLE
═══════════════════════════════════════
[Clean article ready to paste into Payload CMS]
```
