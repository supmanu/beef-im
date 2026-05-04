---
description: Add notebook MDX components (Highlight, MarginNote, ScrapCard, CorrectionBlock, VerdictSeal) to a draft or live article
agent: build
---
Load and execute the `decorate` skill from `.claude/skills/decorate/SKILL.md`.

**Path + flags:** $ARGUMENTS

Mechanical pass first (always safe), semantic pass second (proposes Paradox/aside/highlight tags). **Always show a unified diff before writing** unless `--auto` is passed. Notebook components are globally injected by `src/pages/[...slug].astro` — emit MDX with **zero import statements**.
