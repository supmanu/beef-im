# Nerd with Nart — Financial Strategy Platform

**Sovereign AI Architecture for Financial Intelligence.**

---

## Stack

| Component | Version |
|-----------|---------|
| Framework | Next.js 16.2.1 (App Router, Turbopack) |
| CMS | Payload 3.80.0 (Embedded) |
| Database | Neon Postgres |
| AI | Gemini 3 (Research) + Claude Code Skills (Production) |
| AI (Exploratory) | Mastra 1.x (non-core, token optimization research) |
| Hosting | Vercel (Cloudflare Pages: feasible, exit plan ready) |
| Node | 24 LTS (nixpkgs) |
| Styling | Tailwind CSS v4.2 |
| Storage | Cloudflare R2 |

## Content Pipeline (v6.0)

```
Obsidian seeds/ → Gemini Research (optional) → /architect → /performer → /auditor → /publish → Payload CMS
```

**Skills:** `/seed`, `/architect`, `/performer`, `/auditor`, `/produce-article`, `/hybrid`, `/publish`

**Publishing:** `/publish` converts `.md` → Lexical JSON → Payload CMS via Local API. No manual copy-paste into admin UI.

## Key Directories

| Path | Purpose |
|------|---------|
| `nerd/pillars/` | Voice DNA, Constitution, Content Engine (22 core files) |
| `nerd/seeds/` | Obsidian intake — raw idea capture |
| `nerd/agents/` | Agent instruction files |
| `nerd/references/` | Brochures, lexicon, data |
| `.claude/skills/` | CLI pipeline skills (7 — includes /publish) |
| `.claude/rules/` | Tactical patterns (22 files) |
| `app/(site)/` | Public website |
| `app/(payload)/` | CMS admin |
| `mastra/` | Agent tools |
| `docs/` | Active documentation |
| `_archive/` | Legacy files (historical reference) |

## Context Files

| File | For |
|------|-----|
| `CLAUDE.md` | Agent 2B (Claude Code CLI) |
| `GEMINI.md` | Agent 2A (Gemini / Antigravity) |
| `SYSTEM_STATE.md` | Tactical state + strategic locks |
| `nerd/pillars/master-index.md` | Content system architecture (v6.0) |

## Quick Start

```bash
npm install
npm run dev     # http://localhost:3000
```

## Submodule

This is a Git submodule of [Melkor-OS](https://github.com/supmanu/melkor-os).
