# `.claude/rules/` — Nerd with Nart

Auto-loaded on every Claude Code session in this department. Keep lean: only active constraints, brand laws, and content doctrine belong here. Technical reference material lives in `../docs/`.

---

## Active constraints

| File | What it governs |
|------|-----------------|
| [paradox-architecture.md](./paradox-architecture.md) | Content law — every article needs a Paradox. Enforced by Architect / Performer / Auditor. |
| [thai-model-routing.md](./thai-model-routing.md) | Thai production uses Qwen3.6 Plus (draft) + Sonnet 4.6 (audit). GLM / MiniMax disqualified on Thai tokenization. |
| [content-compliance-boundaries.md](./content-compliance-boundaries.md) | Professional scope: no specific drug names / dosages / diagnostic verdicts. We comment, we do not prescribe. |
| [agent-sovereign-standard.md](./agent-sovereign-standard.md) | Agent authoring standard — XML protocol, Sinek Trinity, language firewall. |
| [agent-pattern-forensic.md](./agent-pattern-forensic.md) | Forensic Reconstruction pattern for audit agents (avoids "over-obedience" stops). |
| [visuals.md](./visuals.md) | Sovereign asset registry (R2), site-wide typography, avatar protocol. |
| [repository.md](./repository.md) | Flat-root structure, semantic naming, save protocol. |
| [semantic-versioning.md](./semantic-versioning.md) | Naming standard + rename repair protocol for `/nerd/pillars/`. |
| [api-rules.md](./api-rules.md) | Path-scoped: `app/api/**/*.ts` — REST error handling + auth. |
| [project-status.md](./project-status.md) | Current stack + next objectives. |

## Technical reference (not auto-loaded — in `../docs/`)

| File | When to read |
|------|--------------|
| [docs/payload.md](../../docs/payload.md) | Touching Payload config, collections, R2, or Lexical editor |
| [docs/nextjs.md](../../docs/nextjs.md) | Framework / build / routing questions |
| [docs/typescript-patterns.md](../../docs/typescript-patterns.md) | Type alignment Payload ↔ Frontend |
| [docs/archive-ui.md](../../docs/archive-ui.md) | Working on `ArchiveClient.tsx` or the articles archive |
| [docs/deployment.md](../../docs/deployment.md) | Vercel deploy, Neon exit plan, Cloudflare Pages research |
| [docs/mastra-rag.md](../../docs/mastra-rag.md) | Mastra 1.x vector / memory patterns — ⚠️ ARCHIVED 2026-04-21, reference only |

## Memory protocol

Department-level memory = commit to this repo + submodule-sync to Melkor-OS root. Fleet-level rule lives in `../../../CLAUDE.md` (Melkor-OS root). No external bridges, no retired `STRATEGIC_MEMORY_LOG`.

## Content pipeline (v6.0)

Obsidian intake (`nerd/seeds/`) → `/architect` → `/performer` → `/auditor` → `/publish` → Payload CMS. See [docs/article-production-guide.md](../../docs/article-production-guide.md).
