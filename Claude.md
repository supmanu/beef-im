# 🤖 CLAUDE AGENT CONTEXT (PHASE 7 COMPLETE)
**Project:** Nerd with Nart - Financial Strategy Platform
**Stack:** Next.js 16 (App Router) + Tailwind CSS v3 + Hygraph
**Deployment:** Cloudflare Pages (`output: 'export'`)
**Status:** ✅ PRODUCTION READY
**Last Updated:** Dec 11, 2025

---

## ⚠️ CRITICAL ARCHITECTURE RULES

### 1. Framework
- **Next.js:** 16.0.8 (App Router)
- **React:** 19.2.1
- **Build Target:** Static export for Cloudflare Pages

### 2. Styling (Teal Protocol)
- **Engine:** Tailwind CSS v3.4.17 (v3 only - v4 is incompatible)
- **Config:** `tailwind.config.ts` with content paths: `./app`, `./components`, `./lib`, `./hooks`, `./context`
- **Colors:**
  - Primary: `#2bb1bb` (Teal) → `brand-teal`
  - Action: `#F59E0B` (Amber) → `brand-amber`
  - Background: `#0B1D35` (Dark) → `brand-dark`
- **Fonts:** Prompt (Headings), Sarabun (Body)

### 3. Data Layer
- **CMS:** Hygraph (GraphQL API)
- **Fetcher:** Native `fetch` in `lib/hygraph.ts`
- **Queries:** Defined in `queries.ts`
- **Patterns:**
  - Server Components: Fetch data directly
  - Client Components: Use Context for state

### 4. Search Engine
- **Library:** Fuse.js v7.x
- **Strategy:** "Pancake Strategy" - Flatten Hygraph Rich Text AST to plain text before indexing
- **Implementation:** `hooks/useSearch.ts`
- **Key Features:**
  - AST text extraction
  - Fuzzy matching (threshold: 0.4)
  - Weighted search (title > plainText > category)
  - Debug logging enabled

---

## 🛠️ CURRENT STATUS

### ✅ Completed
- **Frontend:** Fully migrated to Next.js 16 App Router
- **Pages:** All routes live and functional:
  - `/` - Homepage with hero + knowledge engine
  - `/articles` - Article listing
  - `/articles/[slug]` - Dynamic article pages
  - `/tools` - Calculator tools (COI, Dynasty)
  - `/manifesto` - Philosophy page
  - `/contact` - Contact form (Web3Forms)
- **Search:** Fully functional with flat data structure
  - Modal opens from Navbar, Homepage, `Cmd+K`
  - English/Thai keyword search working
  - Fuzzy matching enabled
- **Tools:** Interactive calculators (`'use client'` verified)

### 🔧 Configuration
- **Tailwind:** v3.4.17 (downgraded from v4)
- **PostCSS:** v8.4.49 with autoprefixer
- **Static Export:** `output: "export"` in `next.config.mjs`
- **Image Optimization:** Disabled for static export

---

## 📂 FILE STRUCTURE (Flat Root - No `src/`)

```
web-next/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with Providers
│   ├── page.tsx            # Homepage
│   ├── articles/           # Article routes
│   ├── tools/              # Tools page
│   ├── manifesto/          # Philosophy page
│   └── contact/            # Contact page
├── components/             # UI Components (Teal Protocol)
│   ├── Navbar.tsx
│   ├── SearchModal.tsx
│   ├── Providers.tsx       # Context wrapper + SearchModal mount
│   └── tools/              # Calculator components
├── hooks/                  # Custom React hooks
│   └── useSearch.ts        # Search engine (Fuse.js + AST extraction)
├── context/                # React Context
│   └── SearchContext.tsx   # Search modal state
├── lib/                    # Utilities
│   └── hygraph.ts          # Hygraph client
├── queries.ts              # GraphQL queries
├── tailwind.config.ts      # Tailwind v3 config
├── postcss.config.js       # PostCSS v3 format
└── next.config.mjs         # Next.js config (static export)
```

---

## 🔍 SEARCH IMPLEMENTATION DETAILS

### Data Flow
1. **Fetch:** `GET_SEARCH_INDEX` query from Hygraph
2. **Extract:** AST text extraction via recursive `extractText()` function
3. **Flatten:** Transform to flat structure:
   ```typescript
   {
     id: string;
     title: string;
     slug: string;
     category: string;      // Single value
     plainText: string;     // Flattened AST text
   }
   ```
4. **Index:** Initialize Fuse.js with simple keys
5. **Search:** Reactive search on query change

### Fuse.js Configuration
```typescript
{
  keys: [
    { name: 'title', weight: 2 },
    { name: 'plainText', weight: 1 },
    { name: 'category', weight: 0.5 }
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true
}
```

### Debug Features
- Console logs: `[Search Debug] Indexed X articles.`
- Sample text preview logged on mount
- Search query results count logged per search

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deploy
- ✅ Static export configured (`output: "export"`)
- ✅ Image optimization disabled
- ✅ All pages render without errors
- ✅ Search functionality tested
- ✅ Tool calculators functional
- ✅ Responsive design verified

### Environment Variables Required
```env
NEXT_PUBLIC_HYGRAPH_ENDPOINT=https://api-ap-south-1.hygraph.com/v2/[your-id]/master
```

### Build Commands
```bash
npm run build    # Generate static export
npm run export   # (Built-in to build command)
```

Output: `out/` directory ready for Cloudflare Pages

---

## 🐛 KNOWN ISSUES & SOLUTIONS

### Issue: Tailwind Classes Not Working
**Solution:** Ensure using v3.4.17, not v4. Check `postcss.config.js` uses CommonJS format.

### Issue: Search Returns 0 Results
**Solution:** Check browser console for `[Search Debug]` logs. Verify AST extraction is working.

### Issue: "useSearchModal must be used within a SearchProvider"
**Solution:** Ensure `Providers.tsx` wraps children in `<SearchProvider>` in `app/layout.tsx`.

---

## 📚 REFERENCE

### Key Dependencies
- `next`: 16.0.8
- `react`: 19.2.1
- `tailwindcss`: 3.4.17
- `fuse.js`: ^7.0.0
- `framer-motion`: ^12.0.0
- `graphql-request`: ^7.1.2

### Related Documentation
- [Next.js 16 App Router](https://nextjs.org/docs/app)
- [Tailwind CSS v3](https://v3.tailwindcss.com)
- [Fuse.js Documentation](https://www.fusejs.io)
- [Hygraph API](https://hygraph.com/docs)

---

**Agent Note:** This project uses a flat root structure (no `src/`). All `'use client'` directives are explicitly added where needed. Search uses the "Pancake Strategy" for optimal Fuse.js performance.
