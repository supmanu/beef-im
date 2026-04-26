# Astro Scaffold Initialization

This plan outlines the steps to physically transition the `beef.im` repository from the legacy Next.js/Payload codebase to the new Astro + MDX architecture, adhering to the "Flat Root" policy defined in `GEMINI.md`.

## User Review Required

> [!WARNING]
> **Legacy Code Cleanup**
> The root directory currently contains the old Next.js codebase (`app/`, `collections/`, `payload-config/`, `next.config.mjs`, etc.). My plan is to move these files into `_archive/nextjs-legacy/` to get them out of the way without permanently deleting them. Let me know if you would prefer I just `rm -rf` them entirely.

## Open Questions

> [!NOTE]
> **Emdash Dependencies**
> As agreed, we are skipping Emdash for launch (Path 2: MDX-only). I will intentionally *not* install `@portabletext/react` or `emdash/astro` in this phase to keep the package lightweight. We can always add them later. Does this sound good?

## Proposed Changes

### 1. Legacy Cleanup
Move the following directories and files to `_archive/nextjs-legacy/`:
- `app/`, `collections/`, `components/` (old React ones), `hooks/`, `lib/`, `payload-config/`, `.next/`
- `next.config.mjs`, `next-env.d.ts`, `postcss.config.js`

### 2. Astro Foundation
Instead of fighting the interactive `npm create astro` CLI, I will cleanly inject the exact scaffolding we need.

#### [MODIFY] package.json
Rewrite to remove Next.js/Payload dependencies and add:
- `astro` (v4.x)
- `@astrojs/mdx`
- `tailwindcss` (v4.x) and `@astrojs/tailwind`
- Scripts: `"dev": "astro dev"`, `"build": "astro build"`

#### [MODIFY] tsconfig.json
Update for Astro's strict mode and module resolution, pointing to the flat root.

#### [NEW] astro.config.mjs
Configure Astro with:
```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  srcDir: '.',       // <--- Enforces the FLAT ROOT policy
  publicDir: './public',
  integrations: [tailwind(), mdx()],
});
```

### 3. Flat Root Directory Structure
Create the new Astro-native directories at the root level:
- `pages/` (for `index.astro`)
- `layouts/` (for `BaseLayout.astro`)
- `components/` (will hold our Astro Islands and MDX components)
- `content/` (for MDX collections)
- `public/fonts/`

## Verification Plan

### Automated Tests
- Run `npm install` to resolve the new dependencies.
- Run `npm run build` to verify that Astro correctly builds an empty project from the Flat Root configuration.

### Manual Verification
- You can run `npm run dev` and open `localhost:4321` to verify the Astro server starts successfully without any Next.js conflicts.
