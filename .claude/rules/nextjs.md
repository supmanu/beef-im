# Next.js 15 Conventions

## Build System
- **Command:** `npm run dev` (Turbopack is default in Next.js 16 — no flags needed)
- **Version:** 16.2.1
- **Structure:** **FLAT ROOT** (No `/src` folder)
- **React:** 19.2.4
- **Bundler:** Turbopack (webpack block removed from next.config.mjs)

## Node Version
- **Minimum:** Node v20.19.0 (required by Next.js 16 — engines field updated)
- **Primary:** Node v24.13.0 (via NVM native, `~/.nvm`) — fully supported
- **Fallback:** Node v20.x (via `nvm use 20`)
- **Check:** Run `node -v` before development

## Module System (Phase II - ESM)
- **Type:** Native ESM (`"type": "module"` in package.json)
- **Imports:** Use ES6 import/export syntax throughout
- **Config Files:** All config files must use ES6 exports
  - `postcss.config.js`: Use `export default { ... }`
  - `tailwind.config.ts`: Already ES6
  - `next.config.mjs`: Already ES6
- **Benefit:** Fixes Payload CLI tools (`generate:importmap` works correctly)
- **Note:** CommonJS is NOT supported - all modules must be ESM-compatible

## Routing
- Use route groups: `(site)` for public, `(payload)` for admin
- Each group has isolated layout
- Root `app/layout.tsx` must be pass-through only

## Environment Variables
```env
# Required in .env.local
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=...
NEXT_PUBLIC_HYGRAPH_ENDPOINT=...
```

## Styling (Teal Protocol)
- **Engine:** Tailwind CSS v4.2.2 (CSS-first config — no `tailwind.config.ts`)
- **Config:** `@theme` block in `globals.css`, plugin via `@plugin "@tailwindcss/typography"`
- **PostCSS:** `@tailwindcss/postcss` (replaces `tailwindcss` + `autoprefixer`)
- **Colors:**
  - Primary: `brand-teal` (#2bb1bb)
  - Action: `brand-amber` (#F59E0B)
  - Background: `brand-dark` (#0B1D35)

## Fonts
- **Headings:** Prompt
- **Body:** Sarabun
- Loaded via `next/font/google`

## Data Fetching
- **Public Site:** Hygraph GraphQL (legacy)
- **CMS Data:** Payload REST API at `/api/*`
- Use `fetch()` with Next.js cache configuration
