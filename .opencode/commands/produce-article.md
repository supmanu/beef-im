---
description: Full article pipeline — Architect → Performer → Auditor → Decorate → Publish (end-to-end)
agent: build
---
Load and execute the `produce-article` skill from `.claude/skills/produce-article/SKILL.md`.

**Topic:** $1
**Mode:** $2 (S | A | B | C)

End-to-end pipeline. Stop and surface for user review at each stage transition (post-Architect, post-Performer, post-Auditor) before continuing. Final output is a published MDX file at `src/content/<collection>/<slug>.mdx`.
