# Project Status — Nerd with Nart

**Last Updated:** March 29, 2026
**Phase:** v6.0 Production (CLI-first pipeline)
**Status:** 🟢 Live, sovereign, production-ready

---

## Stack (current)

| Layer | Value |
|-------|-------|
| Framework | Next.js 16.2.1 (App Router, Turbopack) |
| React | 19.2.4 |
| CMS | Payload 3.80.0 (embedded) |
| Database | Neon Postgres (`nerd_brain`: 231 rows, 3072d) |
| AI | Mastra 1.x + Gemini 3 Flash — **non-core, exploratory** |
| Embedding | `gemini-embedding-001` (3072 dims) |
| Storage | Cloudflare R2 (S3-compatible, sovereign) |
| Styling | Tailwind v4.2 (CSS-first) |
| Node | 24 LTS (nixpkgs) |
| Hosting | Vercel |

Active constraints, patterns, and operational details live in the topic-specific rule files (`.claude/rules/*.md`) and reference docs (`docs/*.md`). See [README.md](./README.md) for the index.

---

## Pipeline (v6.0)

```
Obsidian seeds/ → (Gemini Deep Research when needed) → /architect → /performer → /auditor → /publish → Payload CMS
```

One-shot: `/produce-article [topic] [mode]` · Quick: `/hybrid [topic] S`

---

## Next Objectives

1. Content seeding cadence (real articles through `/publish`)
2. Search perf baseline with 100+ articles
3. Monitor Vercel logs + Neon free-tier health; hold exit plan warm (see [docs/deployment.md](../../docs/deployment.md))

---

## Blockers

None.

---

## Historical

Phase I–V completion logs (Dec 2025) and the Sovereign Migration decision trail have been pruned — git history is authoritative. Key propagated decisions:

- Sovereign migration (Hygraph → Payload → R2) → [docs/payload.md](../../docs/payload.md), [docs/deployment.md](../../docs/deployment.md), [visuals.md](./visuals.md)
- Semantic versioning standard → [semantic-versioning.md](./semantic-versioning.md), [repository.md](./repository.md)
- Paradox Architecture doctrine → [paradox-architecture.md](./paradox-architecture.md)
- Strategic stack review (Mar 29, 2026) — keep Payload, Mastra non-core, Neon exit plan → [docs/deployment.md](../../docs/deployment.md)
- Lexical Intelligence Suite (tables / code / intelligence boxes) → [docs/payload.md](../../docs/payload.md)
- Type-mismatch emergency fix → [docs/typescript-patterns.md](../../docs/typescript-patterns.md)
