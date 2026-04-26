# Project Status — Nerd with Nart

**Last Updated:** April 26, 2026
**Phase:** beef.im rebuild — Astro/MDX pivot (in progress)
**Status:** 🟡 Pivoting from Next.js/Payload to Astro/MDX. Legacy site archived; new scaffold pending.

---

## Stack (current — beef.im rebuild)

| Layer | Value |
|-------|-------|
| Framework | **Astro 4.x** (static, zero-JS by default) |
| Interactive | React 19 inside Astro Islands (`client:load` / `client:visible`) — calculators only |
| CMS | **Git** — MDX in `src/content/` (Emdash deferred to post-launch) |
| Database | **None** |
| AI | Claude Code CLI Skills (production) · Mastra 1.x + Gemini 3 Flash — **⚠️ ARCHIVED 2026-04-21** (infra preserved, not deleted) |
| Storage | Cloudflare R2 (`beef-assets` bucket, sovereign) |
| Styling | Tailwind v4 (CSS-first) |
| Node | 24 LTS (nixpkgs) |
| Hosting | **Cloudflare Pages** (target) — Vercel retired with Next.js |
| Legacy | `_archive/nextjs-legacy/` — Next.js 16.2.1 + Payload 3.80.0 + Neon (preserved for reference, calculator port source) |

Active constraints, patterns, and operational details live in the topic-specific rule files (`.claude/rules/*.md`) and reference docs (`docs/*.md`). See [README.md](./README.md) for the index.

---

## Pipeline (v6.0 — to be re-pointed at MDX)

```
Obsidian seeds/ → (Gemini Deep Research when needed) → /architect → /performer → /auditor → /publish → src/content/*.mdx
```

One-shot: `/produce-article [topic] [mode]` · Quick: `/hybrid [topic] S`

`/publish` skill needs rewrite: emit MDX with notebook-component imports + frontmatter (title, category, slug, date, lede, sidenote, temperature, footerType) instead of Payload Lexical JSON. Tracked under Next Objectives.

---

## Next Objectives

1. **Astro scaffold execution** — handoff plan ready at [docs/beef-im-astro-deployment-plan.md](../../docs/beef-im-astro-deployment-plan.md); Antigravity (Gemini 3.1 Pro) executes Phases 1–6
2. **`/publish` skill rewrite** — Obsidian seed → MDX with frontmatter + notebook component imports (Claude Code task)
3. **Auditor pipeline integration** — verify Thai content compliance checks survive the MDX pivot
4. **Cloudflare Pages deployment config** — `wrangler.toml`, R2 binding (separate phase, post-scaffold)
5. **Visual audit** — diff against `Prototype-Definitive-v1.html` at mobile / tablet / desktop breakpoints

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
- Mastra RAG soft-pause (Apr 21, 2026) — Method 2 archived in article-production-guide v1.4; production is CLI Skills only. `nerd_brain` table + agents preserved for potential revival.
- Flagship Mode B bake-off (Apr 22, 2026) — 6-model shared-blueprint test. **Kimi K2.6 wins longform** (Naval pacing + mechanism depth); Qwen regressed on token integrity at length; GLM-5.1 cleaned up (anomaly, re-test). Routing now length-tiered: Qwen for S/A, Kimi for B/C. See [thai-model-routing.md](./thai-model-routing.md) §3.
- **Rebrand to beef.im (Apr 23, 2026)** — Drop "Nerd with Nart" before public launch. Public brand is beef.im (domain) + ประกันเนื้อๆ (Facebook display name). Repo/folder stays `nerd-with-nart` — internal only. Voice-dna + constitution recalibration pending (Opus 4.7 task). Full decision record: [docs/beef-im-rebrand-brief.md](../../docs/beef-im-rebrand-brief.md).
- **Stack pivot to Astro/MDX (Apr 26, 2026)** — Drop Next.js 16 / Payload 3.80 / Neon for Astro 4.x + MDX + Cloudflare Pages. Trigger: Definitive notebook prototype (`docs/brainstorm/New UIUX/Prototype-Definitive-v1.html`) requires `<MarginNote>`, `<ScrapCard>`, `<CorrectionBlock>`, `<VerdictSeal>` components — MDX-native, painful in Lexical. Validated by `~/Projects/astro-nerd/` prototype (95–97% visual parity, Apr 6). Calculators port as React Islands. Legacy preserved at `_archive/nextjs-legacy/`. Flat-root rule retired. Full plan: [docs/beef-im-astro-deployment-plan.md](../../docs/beef-im-astro-deployment-plan.md).
- Lexical Intelligence Suite (tables / code / intelligence boxes) → [docs/payload.md](../../docs/payload.md)
- Type-mismatch emergency fix → [docs/typescript-patterns.md](../../docs/typescript-patterns.md)
