# Next.js 16 Conventions

## Build System
- **Command:** `npm run dev --webpack` (Turbopack disabled for Payload compatibility)
- **Version:** 16.0.8 with App Router
- **React:** 19.2.1

## Node Version (CRITICAL)
- **Required:** Node v20.18.0 LTS (Iron)
- **Incompatible:** Node v24+ breaks Payload CLI tools
- **Check:** Run `node -v` before development

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
- **Engine:** Tailwind CSS v3.4.17 (NOT v4 - incompatible)
- **Config:** `tailwind.config.ts` with content paths
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
