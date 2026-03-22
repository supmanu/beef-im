# Upgrade Plan: Next.js 16 + Payload 3.73+
**Created:** 2026-03-22
**Status:** COMPLETE (Phases 0–3 executed 2026-03-22)
**Owner:** Agent 2B + User
**Target:** Next.js 16.2+ / Payload 3.73+ / Turbopack / Hosting evaluation
**Result:** Next.js 16.2.1 + Payload 3.80.0 + React 19.2.4 — build clean ✅

---

## Current State (Snapshot)

| Component | Current Version | Target Version |
|-----------|----------------|----------------|
| Next.js | 15.5.9 | **16.2.0+** |
| Payload CMS | ~3.68.3 (`payload: latest` in package.json) | **3.73.0+** |
| React | 19.0.0 | **19.2** |
| React DOM | 19.0.0 | **19.2** |
| Bundler | webpack (explicit hook in next.config.mjs) | **Turbopack** (default) |
| Node.js | 24.13.0 (NixOS system) | 24.x (compatible) |
| Hosting | Vercel | **Evaluate: Vercel vs Cloudflare** |
| Tailwind CSS | 3.4.17 | 3.4.x (no change) |

### Why Upgrade Is Mandatory
- Next.js 15.5.x falls in Payload's **unsupported gap** (15.5–16.1.x)
- Payload 3.68 will not receive patches for Next.js 16 issues
- The supported path: stay on 15.4.x OR jump to 16.2.0+
- We're on 15.5.9 — neither safe harbor. Must move forward.

---

## Architecture Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| Payload admin UI breaks after upgrade | HIGH | Test `/admin` CRUD immediately after upgrade |
| Lexical editor features change/break (EXPERIMENTAL_TableFeature) | HIGH | Test all article editing, verify import map regeneration |
| `withPayload()` webpack hook conflict | HIGH | Remove explicit `webpack` block from next.config.mjs |
| Hydration errors from third-party libs | MEDIUM | Test framer-motion, react-three, recharts, dnd-kit |
| `serverExternalPackages` config format change | MEDIUM | Verify Next.js 16 still supports this key |
| Sass deprecation warnings escalate | LOW | May need to update sassOptions format |
| Mastra packages incompatible with React 19.2 | MEDIUM | Check @mastra/* compatibility before upgrading |
| Database migrations between Payload versions | HIGH | Run `npx payload migrate` after upgrade, backup DB first |
| R2 storage plugin breaking changes | MEDIUM | Verify @payloadcms/storage-s3 at 3.73+ |
| `eslint-config-next` version mismatch | LOW | Bump to match Next.js 16 |

---

## Phase 0: Pre-Flight (Before Touching Anything)

### 0.1 — Backup
```bash
# Git: ensure clean state
cd ~/Melkor-OS/departments/nerd-with-nart
git status  # must be clean
git tag pre-upgrade-snapshot  # mark current state

# Database: snapshot Neon
# → Neon console > Create Branch (point-in-time backup)
```

### 0.2 — Dependency Audit
```bash
# Check what "payload: latest" currently resolves to
npm ls payload
npm ls @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical @payloadcms/storage-s3

# Check for peer dependency warnings
npm ls --all 2>&1 | grep "WARN" | head -20
```

### 0.3 — Review Payload Changelog
- Read: https://github.com/payloadcms/payload/releases (3.68 → 3.73+)
- Look for: breaking changes in Lexical, collection config, admin UI
- Look for: `EXPERIMENTAL_TableFeature` status (still experimental? renamed? stable?)
- Look for: `BlocksFeature({ blocks: [CodeBlock()] })` API changes
- Look for: `s3Storage` plugin API changes

### 0.4 — Check Mastra Compatibility
```bash
# Mastra packages are tightly coupled to React version
npm info @mastra/core peerDependencies
npm info @mastra/memory peerDependencies
npm info @mastra/rag peerDependencies
```
If Mastra doesn't support React 19.2, this becomes a blocker.

### 0.5 — Check Three.js / R3F Compatibility
```bash
npm info @react-three/fiber peerDependencies
npm info @react-three/drei peerDependencies
```
React Three Fiber needs explicit React 19.2 support.

---

## Phase 1: Payload Upgrade (3.68 → 3.73+)

### 1.1 — Pin Payload Version
**Current problem:** `"payload": "latest"` is dangerous. Pin it.

```jsonc
// package.json — change:
"payload": "latest"
// to:
"payload": "^3.73.0"
```

### 1.2 — Upgrade All Payload Packages Together
All `@payloadcms/*` packages must be at the same minor version.

```bash
npm install payload@^3.73.0 \
  @payloadcms/next@^3.73.0 \
  @payloadcms/db-postgres@^3.73.0 \
  @payloadcms/richtext-lexical@^3.73.0 \
  @payloadcms/storage-s3@^3.73.0
```

### 1.3 — Run Migrations
```bash
npx payload migrate
npx payload migrate:status  # verify all applied
```

### 1.4 — Regenerate Types & Import Map
```bash
npx payload generate:types
npx payload generate:importmap
```

### 1.5 — Fix Breaking Changes
Check and update `payload-config/payload.config.ts`:
- [ ] `EXPERIMENTAL_TableFeature()` — may have been renamed or stabilized
- [ ] `BlocksFeature({ blocks: [CodeBlock()] })` — API may have changed
- [ ] `lexicalHTML` import — may have moved
- [ ] `s3Storage` config — verify no new required fields
- [ ] `postgresAdapter` — check for new options or removed ones
- [ ] `buildConfig` — check for deprecated/removed keys

### 1.6 — Verify Payload Standalone
```bash
npm run build  # still using Next.js 15, but with new Payload
# Test: /admin login, create article, upload media, edit content
```

**Gate:** Do NOT proceed to Phase 2 until Payload works on Next.js 15.

---

## Phase 2: Next.js Upgrade (15.5.9 → 16.2.0+)

### 2.1 — Upgrade Next.js + React
```bash
npm install next@^16.2.0 react@^19.2.0 react-dom@^19.2.0
npm install -D eslint-config-next@^16.2.0 @types/react@latest @types/react-dom@latest
```

### 2.2 — Update next.config.mjs (Critical)

The existing config needs significant changes:

```javascript
// BEFORE (current — next.config.mjs)
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig = {
    eslint: { ignoreDuringBuilds: true },
    serverExternalPackages: [ ... ],
    images: { remotePatterns: [ ... ] },
    sassOptions: { ... },
    // ⚠️ REMOVE THIS — conflicts with Turbopack
    webpack: (config) => { return config; },
};

export default withPayload(nextConfig);
```

```javascript
// AFTER (target — next.config.mjs)
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig = {
    eslint: { ignoreDuringBuilds: true },

    serverExternalPackages: [
        '@payloadcms/db-postgres',
        'payload',
        'sharp',
        'express',
        'graphql',
        // Check if @mastra/* glob still works in Next 16
    ],

    images: {
        remotePatterns: [
            // Keep existing patterns
            // Check: Next.js 16 may require `qualities` array
        ],
    },

    sassOptions: {
        // Verify format still valid in Next 16
        silenceDeprecations: ['legacy-js-api', 'import'],
        quietDeps: true,
    },

    // ❌ REMOVED: webpack hook (Turbopack is default now)
    // ❌ REMOVED: @payloadcms/bundler-webpack from serverExternalPackages
};

export default withPayload(nextConfig);
```

**Key changes:**
1. **Remove** the `webpack: (config) => { return config; }` block entirely
2. **Remove** `@payloadcms/bundler-webpack` from `serverExternalPackages` (deprecated)
3. **Verify** `serverExternalPackages` key name hasn't changed in Next 16
4. **Check** if `images.remotePatterns` needs a `qualities` array
5. **Verify** `sassOptions` format is still valid

### 2.3 — Update Scripts
```jsonc
// package.json scripts — verify:
"dev": "next dev",        // Turbopack is now default, no flag needed
"build": "next build",    // Turbopack for production too
```

### 2.4 — Update engines field
```jsonc
"engines": {
    "node": ">=20.19.0"    // Next.js 16 requires 20.19+ or 22.12+
}
```

### 2.5 — Build & Test
```bash
npm run build
npm run dev

# Test checklist:
# [ ] Homepage loads (/ route)
# [ ] Articles archive loads (/articles)
# [ ] Individual article loads (/articles/[slug])
# [ ] Payload admin loads (/admin)
# [ ] Admin CRUD works (create, edit, delete article)
# [ ] Media upload to R2 works
# [ ] Lexical editor: tables, code blocks, blockquotes all render
# [ ] ArticleContent.tsx renders without hydration errors
# [ ] FeaturedPosts.tsx works on homepage
# [ ] Search/filter in ArchiveClient works
# [ ] Framer Motion animations work
# [ ] Three.js / R3F components render (if any pages use them)
# [ ] No console errors
# [ ] HMR works (edit a component, verify instant reload)
```

---

## Phase 3: Cleanup & Hardening

### 3.1 — Remove Legacy References
- [ ] Remove `graphql` from dependencies if no longer needed by Payload 3.73
- [ ] Remove `@payloadcms/bundler-webpack` if it's anywhere
- [ ] Clean up any webpack-specific comments in config files

### 3.2 — Regenerate Everything
```bash
npx payload generate:types
npx payload generate:importmap
npm run build  # full clean build
```

### 3.3 — Type Alignment Check
The existing `as any` casts in `articles/page.tsx` — check if Payload 3.73 type generation resolves the `id: number vs string` issue. If so, remove them.

### 3.4 — Update Documentation
- [ ] `.claude/rules/nextjs.md` — update version, remove webpack references
- [ ] `.claude/rules/payload.md` — update version, note any API changes
- [ ] `.claude/rules/project-status.md` — mark upgrade complete
- [ ] `CLAUDE.md` Sovereign Stack section — update versions

---

## Phase 4: Hosting Evaluation (Vercel vs Cloudflare)

### 4.1 — Current Vercel Setup
- Auto-deploys from git push
- `rootDirectory: departments/nerd-with-nart`
- Serverless functions for Payload API
- Edge runtime for static pages

### 4.2 — Cloudflare Pages/Workers Evaluation

**Check these before deciding:**

| Criteria | Vercel | Cloudflare |
|----------|--------|------------|
| Next.js 16 support | Native (they build it) | Via `@cloudflare/next-on-pages` or Workers |
| Payload CMS SSR | Works (serverless) | Needs Workers runtime validation |
| R2 storage | External (S3 API) | **Native** (same platform, zero-latency) |
| Postgres (Neon) | TCP via serverless | TCP via Hyperdrive or direct |
| Build times | Baseline | Potentially faster (Rust toolchain) |
| Cost | Pro plan | Potentially cheaper (Workers paid plan) |
| Monorepo / rootDirectory | Supported | May need custom build config |
| Custom domain | *.vercel.app + custom | *.pages.dev + custom |
| Sharp (image processing) | Works in serverless | May need wasm-based alternative |

**Known Cloudflare Issues (recently fixed — verify):**
- [ ] Next.js App Router full support status
- [ ] Payload CMS admin UI on Workers runtime
- [ ] Sharp compatibility (Workers uses V8 isolates, not Node)
- [ ] Neon Postgres TCP connection from Workers (Hyperdrive?)
- [ ] `@mastra/*` packages in Workers runtime

### 4.3 — Decision Framework

**Stay on Vercel if:**
- Payload + Next.js 16 just works (path of least resistance)
- No cost pressure
- Cloudflare still has sharp/Postgres gaps

**Move to Cloudflare if:**
- R2 native integration is a big win (eliminate S3 API latency for media)
- Cost savings are meaningful
- All runtime compatibility issues are resolved
- Cloudflare's Next.js adapter supports 16.2+

### 4.4 — Cloudflare Test Plan (If Pursuing)
```bash
# 1. Create a Cloudflare Pages project
# 2. Configure build: npm run build
# 3. Set environment variables (R2, DATABASE_URI, PAYLOAD_SECRET)
# 4. Deploy and test:
#    - [ ] Homepage renders
#    - [ ] /admin loads and authenticates
#    - [ ] Article CRUD works
#    - [ ] Media uploads to R2
#    - [ ] Image optimization works
#    - [ ] Mastra agent endpoints respond
```

---

## Execution Order Summary

```
Phase 0  →  Backup, audit, compatibility checks
             ↓
Phase 1  →  Payload 3.68 → 3.73+ (stay on Next 15 temporarily)
             ↓ gate: Payload works on Next 15
Phase 2  →  Next.js 15.5.9 → 16.2.0+ (Turbopack)
             ↓ gate: full build + all tests pass
Phase 3  →  Cleanup, types, documentation
             ↓
Phase 4  →  Hosting evaluation (Vercel vs Cloudflare)
             ↓ decision gate
Phase 4a →  Deploy to chosen platform
```

**Estimated effort:** 1 evening for Phases 0–2 if no blockers. Phase 4 is a separate investigation.

---

## Rollback Plan

If upgrade fails at any point:

```bash
# Return to known-good state
git checkout pre-upgrade-snapshot
npm install  # restore original node_modules

# Database: restore Neon branch if migrations were applied
```

The `pre-upgrade-snapshot` tag created in Phase 0 is the safety net.

---

## Open Questions (Resolve Before Execution)

1. **Mastra + React 19.2:** Are all `@mastra/*` packages compatible?
2. **EXPERIMENTAL_TableFeature:** Renamed or stabilized in Payload 3.73?
3. **Cloudflare Workers + Sharp:** Is `sharp` now supported, or do we need `@cf/image-resizing`?
4. **Cloudflare + Neon Postgres:** Hyperdrive required, or direct TCP works?
5. **`payload: latest` in package.json:** When did it last resolve? Could already be >3.68.
6. **Tailwind v4:** Next.js 16 ships with Tailwind v4 support — do we upgrade Tailwind too, or keep v3.4? (CLAUDE.md warns v4 breaks responsive.)

---

*Plan created 2026-03-22. No code has been modified.*
