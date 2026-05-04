---
description: Generate a GSB-Kane Strategic Blueprint for a content topic (Agent 1 of 3)
agent: build
---
Load and execute the `architect` skill from `.claude/skills/architect/SKILL.md`.

**Topic / seed path:** $1
**Mode:** $2 (S | A | B | C — defaults per skill if omitted)

Pre-read `nerd/pillars/voice-dna.md` and `nerd/pillars/constitution.md` before structuring the Blueprint. Enforce the Paradox rule from `.claude/rules/paradox-architecture.md` — no Paradox = no Blueprint.

Save the result to `nerd/output/blueprints/`.
