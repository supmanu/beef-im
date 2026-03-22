# Payload CMS 3.0 Patterns

## Configuration (Sovereign Migration - Phase III Complete, Payload 3.80.0)
- **Location:** `payload-config/payload.config.ts`
- **Hard-wire pattern:** Import `sharp` directly for image optimization
  ```typescript
  import sharp from 'sharp';
  export default buildConfig({
    sharp,  // <-- Critical for image processing
    // ... rest of config
  });
  ```
- **Relative imports:** Use `../../../../payload-config/payload.config` NOT `@payload-config`
- **importMap:** Automatically handled via layout.tsx (no longer explicit import needed)
- **Dependencies:** `graphql` (^16.8.1) is a REQUIRED peer dependency for `@payloadcms/graphql`. Must be in `package.json`.

## Route Groups (Duplex Layout Strategy)
```
app/
├── layout.tsx         # Pass-through (returns {children} only)
├── (payload)/         # Admin routes - isolated layout
│   └── layout.tsx     # RootLayout with <html><body>
└── (site)/            # Public routes - isolated layout
    └── layout.tsx     # Site layout with Navbar/Footer
```

## Database
- **Provider:** Neon Postgres (Serverless)
- **Connection:** Set `DATABASE_URI` in .env
- **Migrations:** Run `npx payload migrate` for schema changes

## Admin UI
- **Path:** `/admin`
- **Components:** Import from `importMap.ts`
- **Styling:** Custom SCSS in `app/(payload)/custom.scss`

## Collections
- Define in `payload-config/collections/`
- Export in `payload.config.ts`
- Generate types: `npx payload generate:types`
- **Articles Collection (New):** Supports Lexical editor, categories, publishing status

## Sovereign Data Fetching (Phase III - Zero External Dependencies)
**Pattern:** Use local Payload API instead of external GraphQL

```typescript
// lib/payload.ts - Singleton pattern for caching
import { getPayload } from 'payload';
import config from '../payload-config/payload.config';

let cachedPayload: Promise<Payload> | null = null;

export const getLocalPayload = async (): Promise<Payload> => {
    if (!cachedPayload) {
        cachedPayload = getPayload({ config });
    }
    return cachedPayload;
};

// Fetch published articles (server-side)
export const getSovereignArticles = async () => {
    const payload = await getLocalPayload();
    return payload.find({
        collection: 'articles',
        where: { _status: { equals: 'published' } },
        sort: '-publishedDate',
        depth: 1,
    });
};
```

**Usage in Server Components:**
```typescript
// app/(site)/articles/page.tsx
const posts = await getSovereignArticles();
return <ArchiveClient initialPosts={posts.docs} />;
```

**Benefits:**
- ✅ Zero external API calls
- ✅ Data stays within sovereign infrastructure
- ✅ Faster than GraphQL round-trips
- ✅ Server-side filtering (only published articles sent to client)

## Storage (Phase II - Sovereign Infrastructure)
- **Provider:** Cloudflare R2 (S3-compatible)
- **Plugin:** `@payloadcms/storage-s3` (NOT `@payloadcms/storage-vercel-blob`)
- **Bucket:** `nwn-assets`
- **Configuration Pattern:**
  ```typescript
  import { s3Storage } from '@payloadcms/storage-s3';

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET_NAME || 'nwn-assets',
      config: {
        endpoint: process.env.R2_ENDPOINT,
        region: process.env.R2_REGION || 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ]
  ```

## Environment Variables Required
```env
# Cloudflare R2 Storage
R2_ENDPOINT=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=nwn-assets
R2_REGION=auto

# Payload Core
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=...
PAYLOAD_PUBLIC_SERVER_URL=...
```

## Image Optimization
- **Required Package:** `sharp` (^0.34.5 or higher)
- **Purpose:** Server-side image resizing and thumbnail generation
- **Installation:** `npm install sharp`
- **Note:** Payload will warn if sharp is not installed when image resizing is enabled

## Lexical Editor Enhancements (Phase IV - Intelligence Suite)
**Location:** Articles collection editor in Payload Admin
**Status:** Production-ready with Tables, Code Blocks, and Intelligence Boxes

### Enabled Features
- **Tables:** `EXPERIMENTAL_TableFeature` with Teal Protocol styling (borders, hover effects)
- **Code Blocks:** `CodeBlockFeature` for syntax-highlighted code snippets
- **Intelligence Boxes:** Styled blockquotes as "Calculation Zones" (Dark bg, Teal border, shadow)
- **Rich Formatting:** Lists, links, headings (H1-H6)

### Client-Side Rendering Pattern (`components/ArticleContent.tsx`)
**Purpose:** Safely convert Lexical JSON to React components with hydration safety

```typescript
// components/ArticleContent.tsx - Custom Lexical converter
export default async function ArticleContent({ content }: { content: string }) {
  const json = JSON.parse(content);

  // Render nodes recursively
  // - Code blocks: Use <pre><code> (semantic HTML)
  // - Tables: Use <table> with Teal styling
  // - Blockquotes: Use <blockquote class="intelligence-box">
  // - Paragraphs: Use <p> with safe child spans (NOT divs inside p)

  return <div className="prose prose-invert">{renderNodes(json)}</div>;
}
```

**Critical:** Avoid divs inside paragraphs - use spans for inline elements to prevent hydration mismatches.

### Text Extraction Utility (`lib/lexical.ts`)
**Purpose:** Extract plain text and calculate reading time from Lexical JSON

```typescript
// lib/lexical.ts
export function extractTextFromLexical(content: string): string {
  const json = JSON.parse(content);
  // Recursively extract text from all nodes
  // Returns plain text (no HTML)
}

export function calculateReadTime(text: string): number {
  // Average: 200 words per minute
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}
```

**Usage:** Homepage featured articles display "X min read" + excerpt.

### Integration Pattern (Server-Side)
```typescript
// app/(site)/articles/page.tsx
const articles = await getSovereignArticles();
articles.map(article => ({
  ...article,
  excerpt: extractTextFromLexical(article.content).slice(0, 200),
  readTime: calculateReadTime(extractTextFromLexical(article.content)),
}));
```

### Styling Override (`app/globals.css`)
```css
/* Intelligence Boxes */
blockquote {
  background-color: #0B1D35;     /* brand-dark */
  border-left: 4px solid #2bb1bb; /* brand-teal */
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Code Blocks */
pre {
  background-color: #1a2a3a;
  border: 1px solid #2bb1bb;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

/* Tables */
table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
}

table th, table td {
  border: 1px solid #2bb1bb;
  padding: 12px;
  text-align: left;
}

table th {
  background-color: rgba(43, 177, 187, 0.1);
  color: #2bb1bb;
}

table tr:hover {
  background-color: rgba(43, 177, 187, 0.05);
}
```

### Admin Configuration Pattern
```typescript
// payload-config/collections/Articles.ts
const articlesField: Field = {
  name: 'content',
  type: 'richText',
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
      CodeBlockFeature(),
    ],
  }),
};
```

### Import Map Regeneration
**When to do:** After adding new Lexical features
```bash
npm run build  # Includes: payload generate:importmap
```

**Why:** Ensures Payload admin UI has access to all custom components at runtime.
