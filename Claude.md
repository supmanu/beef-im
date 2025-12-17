# 🤖 CLAUDE AGENT CONTEXT (ACTIVE)
**Project:** Nerd with Nart - Financial Strategy Platform
**Stack:** Next.js 15.5.9 (App Router) + Tailwind CSS v3 + Payload 3.0 CMS
**Database:** Neon (Postgres)
**Deployment:** Vercel (Serverless)
**Status:** 🟢 **PHASE III COMPLETE | PHASE IV READY**
**Build Status:** ✅ Clean (Exit code: 0) | Ready for deployment
**Last Updated:** Dec 17, 2025 (20:45 UTC)

> **📚 DOCUMENTATION INDEX - READ IN THIS ORDER:**
> 1. **⭐ [PROJECT_BLUEPRINT.md](PROJECT_BLUEPRINT.md)** - Comprehensive single source of truth (start here)
> 2. **Architecture Details:** This file (CLAUDE.md) - legacy reference
> 3. **Tactical Patterns:** [.claude/rules/README.md](.claude/rules/README.md) - indexed patterns
> 4. **Project Status:** [.claude/rules/project-status.md](.claude/rules/project-status.md) - phase tracking

> **🧠 Memory System (Agent 2B):**
> - This CLAUDE.md file provides project-wide context
> - Use `.claude/rules/*.md` for implementation patterns
> - Reference files with @-mention syntax (e.g., @package.json)
> - Edit memory: Run `/memory` command
> - See [Memory Docs](https://code.claude.com/docs/en/memory)

---

## ⚠️ CRITICAL ARCHITECTURE RULES

### 1. Framework
- **Next.js:** 15.5.9 LTS (App Router) ⚠️ NOT 16 (stability over bleeding-edge)
- **React:** 19.0.0 (native)
- **Build Mode:** Webpack enforced (`next dev` - Turbopack disabled)
- **Deployment:** Vercel Serverless Functions
- **Module System:** Native ESM (Node 20+ compatible)

### 2. CMS Architecture (Phase III Complete)
- **CMS:** Payload 3.0 (Self-hosted, full data sovereignty) ✅ OPERATIONAL
- **Database:** Neon Postgres (Serverless) ✅ CONNECTED
- **Admin UI:** `/admin` (isolated route group) ✅ WORKING
- **Data Source:** Local Payload API (zero external dependencies) ✅ SOVEREIGN
- **Storage:** Cloudflare R2 (S3-compatible) ✅ INTEGRATED

### 3. Styling (Teal Protocol)
- **Engine:** Tailwind CSS v3.4.17 (v3 only - v4 is incompatible)
- **Config:** `tailwind.config.ts` with content paths: `./app`, `./components`, `./lib`, `./hooks`, `./context`
- **Colors:**
  - Primary: `#2bb1bb` (Teal) → `brand-teal`
  - Action: `#F59E0B` (Amber) → `brand-amber`
  - Background: `#0B1D35` (Dark) → `brand-dark`
- **Fonts:** Prompt (Headings), Sarabun (Body)

### 4. Node.js Version (CRITICAL - ENFORCED)
- **Required:** Node v20.18.0 LTS (Iron) ⚠️ **STRICTLY ENFORCED**
- **Previous:** Node v24.11.1 (caused CLI tool failures - now removed)
- **Issue:** Node 24 breaks `payload generate:importmap` and `generate:types`
- **Verification:** Run `node -v` - must show `v20.18.0`
- **Launch Command:** `npm run dev --webpack` (Turbopack unstable with Payload 3.0)

---

## 🛠️ CURRENT STATUS (Phase III Complete)

### ✅ Sovereign Infrastructure (Phase III COMPLETE)
- **Articles Schema:** ✅ Deployed with Lexical editor, categories, publishing status
- **Sovereign Data Bridge:** ✅ getSovereignArticles() function connects to Neon
- **Payload 3.0:** ✅ Admin UI fully operational at `/admin`
- **Database:** ✅ Connected to Neon Postgres, articles fetchable
- **Route Groups:** ✅ Duplex Layout Strategy isolates `/admin` and `/`
- **R2 Storage:** ✅ S3-compatible media storage integrated
- **Sharp Optimization:** ✅ Server-side image processing enabled
- **Archive UI:** ✅ ArchiveClient component with search/filter
- **Type Safety:** ✅ Fixed TypeScript mismatch (commit 9b2ab48)

### ✅ Public Site (Legacy - Still Active)
- **Pages:** All routes live and functional:
  - `/` - Homepage with hero + knowledge engine
  - `/articles` - Article listing (Hygraph)
  - `/articles/[slug]` - Dynamic article pages
  - `/tools` - Calculator tools (COI, Dynasty)
  - `/manifesto` - Philosophy page
  - `/contact` - Contact form (Web3Forms)
- **Search:** Fully functional with flat data structure
  - Modal opens from Navbar, Homepage, `Cmd+K`
  - English/Thai keyword search working
  - Fuzzy matching enabled

### 🔧 Configuration
- **Tailwind:** v3.4.17 (downgraded from v4)
- **PostCSS:** v8.4.49 with autoprefixer
- **Webpack:** Enforced via `--webpack` flag (Turbopack disabled)
- **Payload:** Hard-wired importMap configuration

---

## 📂 FILE STRUCTURE (PHASE H)

**Note:** Dual architecture - Public site (Hygraph) + Admin CMS (Payload)

```
nerd-with-nart/             # ROOT (Next.js 16 App)
├── app/                    # Next.js App Router - Dual Route Groups
│   ├── layout.tsx          # Pass-through root layout
│   ├── (site)/             # PUBLIC WEBSITE (Hygraph-powered)
│   │   ├── layout.tsx      # Site layout with Navbar/Footer
│   │   ├── page.tsx        # Homepage
│   │   ├── articles/       # Article routes
│   │   ├── tools/          # Tools page
│   │   ├── manifesto/      # Philosophy page
│   │   └── contact/        # Contact page
│   └── (payload)/          # ADMIN PANEL (Payload 3.0)
│       ├── layout.tsx      # Payload RootLayout (isolated)
│       ├── admin/          # Admin UI
│       │   ├── [[...segments]]/
│       │   │   └── page.tsx     # Admin page (RootPage export)
│       │   └── importMap.ts     # Component map (hard-wired)
│       ├── api/            # REST API
│       │   └── [...slug]/
│       │       └── route.ts     # API handlers
│       └── custom.scss     # Admin styling
├── payload-config/         # PAYLOAD CONFIGURATION
│   ├── payload.config.ts   # Main config (hard-wired importMap)
│   └── payload-types.ts    # Generated types
├── components/             # UI Components - Teal Protocol
│   ├── Navbar.tsx
│   ├── SearchModal.tsx
│   ├── Providers.tsx       # Context wrapper + SearchModal mount
│   ├── KnowledgeEngine.tsx # Article listing
│   └── tools/              # Calculator components
├── hooks/                  # Search & Logic
│   └── useSearch.ts        # Search engine (Fuse.js + AST extraction)
├── context/                # React Context
│   └── SearchContext.tsx   # Search modal state
├── lib/                    # Hygraph Fetcher & Utils
│   └── hygraph.ts          # Hygraph client (legacy)
├── queries.ts              # GraphQL queries (Hygraph)
├── tailwind.config.ts      # Tailwind v3 config (REQUIRED)
├── postcss.config.js       # PostCSS config (REQUIRED)
├── tsconfig.json           # TypeScript config with @/* aliases
├── next.config.mjs         # Next.js config (Webpack enforced)
├── package.json            # Dependencies (@payloadcms/next, sass)
├── _legacy_archive/        # Old Vite App - DO NOT TOUCH
└── ARCHITECTURE_DEVLOG.md  # Complete migration history
```

---

## 🔐 PAYLOAD 3.0 ARCHITECTURE

### The "Hard-Wire" Pattern
**Problem:** Auto-discovery fails with Node 24 + complex directory structure
**Solution:** Explicit imports in `payload.config.ts`

```typescript
// payload-config/payload.config.ts
import { importMap } from '../app/(payload)/admin/importMap';

export default buildConfig({
  admin: {
    importMap, // <--- HARD-WIRED
  }
});
```

### Duplex Layout Strategy
**Problem:** Nested `<html>` tags causing hydration errors
**Solution:** Route group isolation

```
app/
├── layout.tsx         <-- Pass-through (returns {children})
├── (payload)/         <-- Payload Admin (own <html><body>)
│   └── layout.tsx     
└── (site)/            <-- Public Website (own <html><body>)
    └── layout.tsx     
```

**Result:**
- `/admin` → Uses **only** Payload's layout
- `/` → Uses **only** the Site's layout
- No conflicts!

### Relative Imports (CRITICAL)
**Problem:** Next.js 16 alias resolution bugs with `@payload-config`
**Solution:** Use relative paths

```typescript
// ❌ WRONG (breaks in Next.js 16)
import config from '@payload-config'

// ✅ CORRECT
import config from '../../../../payload-config/payload.config'
```

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deploy
- ✅ Payload Admin UI operational
- ✅ Database connection verified (Neon)
- ✅ First user created
- ✅ Route groups isolated
- ✅ All pages render without errors
- ⚠️ Switch to Node 20 LTS (currently on Node 24)

### Environment Variables Required
```env
# Payload
DATABASE_URI=postgresql://[user]:[pass]@[host]/[db]
PAYLOAD_SECRET=[your-secret-key]
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Hygraph (Legacy - Still in use)
NEXT_PUBLIC_HYGRAPH_ENDPOINT=https://api-ap-south-1.hygraph.com/v2/[your-id]/master

# Cloudflare R2 (Storage)
S3_ENDPOINT=[r2-endpoint]
S3_ACCESS_KEY_ID=[access-key]
S3_SECRET_ACCESS_KEY=[secret-key]
S3_BUCKET=[bucket-name]
S3_REGION=auto
```

### Build Commands
```bash
npm run dev     # Development (Webpack enforced)
npm run build   # Production build
npm run start   # Production server
```

---

## 🐛 KNOWN ISSUES & SOLUTIONS

### Issue: `payload.admin` is undefined
**Solution:** Ensure importMap is hard-wired in `payload.config.ts` and the file exists at `app/(payload)/admin/importMap.ts`.

### Issue: Nested `<html>` tags hydration error
**Solution:** Verify root `app/layout.tsx` is a pass-through and each route group has its own layout.

### Issue: `@payload-config` alias not found
**Solution:** Use relative imports: `../../../../payload-config/payload.config`

### Issue: Payload CLI tools fail (`generate:importmap`)
**Solution:** Switch to Node 20 LTS: `nvm use 20`

### Issue: Double URL (`localhost:3000localhost:3000/admin`)
**Solution:** Set `serverURL: undefined` in development mode in `payload.config.ts`

---

## 📚 PRODUCTION RULES (Phase H)

### 📜 RULE #1: PIN NODE VERSION
**Do not use Node 24 for Payload 3.0 production.**
- Use Node 20 LTS for working CLI tools
- Enforce with `.nvmrc` and `engine-strict=true`

### 📜 RULE #2: NO DEAD CODE
**Purge before you merge.**
- Remove all `webpackBundler` references
- Remove legacy `payload.admin.render()` calls
- Remove old plugin configs

### 📜 RULE #3: EXPLICIT OVER IMPLICIT
**Don't trust auto-discovery.**
- Import files directly
- Use TypeScript to validate existence
- Hard-wire critical dependencies

### 📜 RULE #4: USE RELATIVE IMPORTS
**Bypass Next.js 16 alias bugs.**
- Use `../../../../config` not `@config`
- Documented pattern from successful migrations

---

## 📚 REFERENCE

### Key Dependencies
- `next`: 16.0.8
- `react`: 19.2.1
- `payload`: ^3.68.3
- `@payloadcms/next`: ^3.68.3
- `@payloadcms/db-postgres`: ^3.68.3
- `tailwindcss`: 3.4.17
- `sass`: ^1.89.0
- `fuse.js`: ^7.0.0
- `framer-motion`: ^12.0.0

### Related Documentation
- [Payload CMS 3.0](https://payloadcms.com/docs)
- [Next.js 16 App Router](https://nextjs.org/docs/app)
- [Tailwind CSS v3](https://v3.tailwindcss.com)
- [Neon Database](https://neon.tech/docs)

---

**Agent Note:** This project now runs a **dual architecture** - the public site still uses Hygraph (legacy) while the new Payload 3.0 admin provides full CMS control. The "Duplex Layout Strategy" isolates these systems using Next.js route groups. Always use **relative imports** for Payload config files and ensure **Node 20 LTS** for production stability.

**Commit Reference:** Phase H documented in commit `4493a95` - "Implement Duplex Layout Strategy"
