# Visual Assets & Sovereign Branding

## Sovereign Avatar Protocol (v1.0)
- **Goal:** Ensure the author's visual identity (the "face") is stable and never breaks during build or deployment.
- **Pattern:** Use a **Verified Static URL** for the author avatar instead of dynamic CMS lookups that might fail early in the build.
- **Verified URL:** `https://assets.nerdwithnart.com/nwn-assets/natapol-supmanu-nerd-with-nart-avatar.png`

## Implementation Pattern
In components where the author avatar appears (e.g., `ArticleContent.tsx`):

```tsx
// Temporary Sovereign Override for stability
const AVATAR_URL = "https://assets.nerdwithnart.com/nwn-assets/natapol-supmanu-nerd-with-nart-avatar.png";

// ... usage in <img> tag
<img src={AVATAR_URL} alt="Nerd with Nart" />
```

## Remote Asset Domains
- **Rule:** whitelist the sovereign domain in `next.config.mjs` to allow Next.js Image optimization (if used) or standard rendering.
- **Pattern:**
```javascript
{
  protocol: 'https',
  hostname: 'assets.nerdwithnart.com',
  port: '',
  pathname: '/**',
}
```

## Media Purge Rules
- When migrating to the Sovereign stack, all legacy GraphQL assets (Hygraph) must be purged to prevent "ghost" hydration errors or build failures.
- **Checklist:**
  - [x] Delete `KnowledgeEngine.tsx` (legacy).
  - [x] Delete `queries.ts` (legacy).
  - [x] Delete `hygraph.ts` (legacy).
