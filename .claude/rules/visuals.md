# Visual Assets & Sovereign Branding

## Sovereign Asset Registry (R2)
**CDN Domain:** `https://assets.beef.im/`
**Bucket:** `beef-assets` (Cloudflare R2, S3-compatible)
**Status:** 100% sovereign — zero Hygraph CDN dependencies remain (migrated Mar 22, 2026; rebranded to beef.im Apr 24, 2026)

### Asset Inventory
| File | Size | Usage |
|------|------|-------|
| `natapol-supmanu-avatar.png` | 496K | Author avatar (ArticleContent.tsx) — renamed from `natapol-supmanu-nerd-with-nart-avatar.png` |
| `hero-mountain.jpg` | 96K | Homepage hero (HomeContent.tsx) |
| `contact-basecamp.jpg` | 163K | Contact page photo (ContactContent.tsx) |
| `navbar-logo.png` | 9K | Site logo (Navbar.tsx) |
| `og-background.jpg` | 361K | OG image + backgrounds (BackgroundLayers, SEO, page.tsx, manifesto) |

### Code References (7 locations)
- `components/HomeContent.tsx` — hero-mountain.jpg
- `components/ContactContent.tsx` — contact-basecamp.jpg
- `components/Navbar.tsx` — navbar-logo.png
- `components/BackgroundLayers.tsx` — og-background.jpg (default prop)
- `components/SEO.tsx` — og-background.jpg (default OG image)
- `app/(site)/page.tsx` — og-background.jpg (metadata)
- `app/(site)/manifesto/page.tsx` — og-background.jpg (background)

### Legacy Bucket
**Domain:** `https://assets.nerdwithnart.com/nwn-assets/`
**Bucket:** `nwn-assets` (Cloudflare R2, left untouched)
**Status:** Legacy only — serves historical article images. New assets use `beef-assets` bucket.
**Avatar old filename:** `natapol-supmanu-nerd-with-nart-avatar.png` (still available via legacy bucket for backward compatibility)

## Sovereign Avatar Protocol (v1.1)
- **Pattern:** Use verified static R2 URL for the author avatar.
- **URL:** `https://assets.beef.im/natapol-supmanu-avatar.png`

```tsx
const AVATAR_URL = "https://assets.beef.im/natapol-supmanu-avatar.png";
```

## Remote Asset Domains
- **Rule:** Whitelist the sovereign domain in `next.config.mjs`:
```javascript
{
  protocol: 'https',
  hostname: 'assets.beef.im',
}
// Legacy hostname (still whitelisted for historical article images):
// {
//   protocol: 'https',
//   hostname: 'assets.nerdwithnart.com',
//   port: '',
//   pathname: '/**',
// }
```

## Site-Wide Typography Standards (Mar 22, 2026)

### Letter-Spacing
- **Standard:** `tracking-wider` for ALL uppercase labels, badges, and section tags.
- **Banned:** `tracking-widest`, `tracking-[0.2em]`, `tracking-[0.3em]` — all replaced site-wide.

### Display Numbers
- **Standard:** `font-prompt` for large formatted numbers with commas (e.g., ฿1,930, 1,000,000).
- **Banned:** `font-mono` on display numbers — monospace gives commas equal width as digits, creating excessive spacing.
- **Exception:** `font-mono` remains valid for small technical labels (axis ticks, unit suffixes like "THB", decorative numbering "01/02/03", code snippets, progress %).

### Article Content Typography
- **Headings:** `text-slate-100` (not pure `text-white` — reduces harsh contrast against #0B1D35)
- **Body:** `leading-relaxed` (not `leading-loose` — tighter reading rhythm)
- **Heading spacing:** `mt-10 mb-5` (tightened from `mt-12 mb-6`)
- **Table headers:** `bg-brand-teal/15` (visible distinction from data rows)
- **Blockquotes:** Styled exclusively via `globals.css` (no duplicate inline prose classes)
- **Scroll gradient:** DISABLED on article pages (`enableScrollGradient={false}`)

### Hero Section
- **Image opacity:** `opacity-70` (not 60 — more vivid)
- **Bottom gradient via:** `#0B1D35/40` (not /60 — less mid-section haze)
- **Side vignette:** `#0B1D35/50` (not /70 — lighter left edge)
- **Heading gradient:** `from-white to-gray-200` (not to-gray-400 — crisper text)

### Disclaimer Cards (Tools)
- **Standard:** Dark-themed `bg-slate-800/60 backdrop-blur-sm border border-white/10`
- **Text:** `text-slate-300` body, `text-white` bold, `text-amber-400` header
- **Banned:** Light cards (`bg-white/80`) on dark theme pages

## Media Purge Rules
- All legacy Hygraph (GraphQL) assets have been fully migrated to R2.
- **Completed Purges:**
  - [x] Delete `KnowledgeEngine.tsx` (legacy)
  - [x] Delete `queries.ts` (legacy)
  - [x] Delete `hygraph.ts` (legacy)
  - [x] Migrate all `graphassets.com` image URLs to R2 (Mar 22, 2026)

## Known Flags
- `ContactContent.tsx` LINE link is placeholder (`lin.ee/YOUR_ID`) — needs real URL
