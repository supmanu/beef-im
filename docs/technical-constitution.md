# 🛠️ Agent 2A: Technical Directives

## 1. 🛑 The "No-Go" Zone (Version Constraints)

### Next.js: LOCKED at v15.5.9 (LTS)
- **Rule**: Do NOT upgrade to v16.x. It causes critical Hydration/useId bugs in the Admin Panel (dnd-kit incompatibility) and introduces unstable Turbopack behavior.
- **Review Date**: Re-evaluate in Q2 2026.

### Node.js: Minimum v20.9.0
- **Rule**: Strictly enforce engines: `{ "node": ">=20.9.0" }` to align with Next.js 15 security patches.

## 2. 🔐 Environment & Data Protocol

### Variable Prefixing
- **Rule**: All client-side environment variables MUST use `NEXT_PUBLIC_` prefix.
- **Correction**: `VITE_` prefixes are deprecated and forbidden in this architecture.

### Hygraph Status
- **Status**: Active (Legacy).
- **Rule**: Do NOT delete `NEXT_PUBLIC_HYGRAPH_ENDPOINT` yet. It is the life-support line for the frontend content until migration is complete.

## 3. ⚙️ Build Pipeline Adjustments

### Linting
- **Status**: Bypassed (`ignoreDuringBuilds: true`).
- **Rule**: Do not block production deployments on ESLint errors during this transition phase. We will address code style debt after the Payload migration is 100% complete.

### Bundler
- **Status**: Standard (Webpack).
- **Rule**: Do not force `--turbopack` or `--webpack` flags in `package.json`. Let Next.js 15 handle the default bundling to avoid "ghost flag" errors.

## 4. 🏗️ Architecture State: "The Hybrid"

- **Backend**: Payload CMS (`/admin`) -> Live & Connected.
- **Frontend**: Hygraph Content -> Live & Connected.
- **Directive**: The system is currently a "Chimera." Any changes to the article route must be done with extreme caution to avoid severing the Hygraph connection before Payload is ready to take over.
