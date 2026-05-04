---
description: 6-point compliance audit on a Thai article (Agent 3 of 3)
agent: build
---
Load and execute the `auditor` skill from `.claude/skills/auditor/SKILL.md`.

**Article to audit:** $ARGUMENTS

Run the 6-point compliance check (OIC, Revenue Code, PDPA, SEC, FDA, Brand Constitution). Apply the additional content-compliance-boundaries audit (no drug names, no dosages, no diagnostic verdicts) from `.claude/rules/content-compliance-boundaries.md`. Use Forensic Reconstruction pattern from `.claude/rules/agent-pattern-forensic.md` — produce Analysis + Log + Reconstruction in a single response, never stop to ask.
