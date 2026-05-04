---
description: Promote an audited Thai draft into the live Astro content collection as MDX
agent: build
---
Load and execute the `publish` skill from `.claude/skills/publish/SKILL.md`.

**Path + flags:** $ARGUMENTS

Validate frontmatter (`title`, `collection`, `date`, `lede`). Derive slug from `title` or filename. Write to `src/content/<collection>/<slug>.mdx`. Do NOT include `slug:` or `footerType:` in frontmatter — both are auto-derived. Cloudflare Pages auto-deploys on `git push`.
