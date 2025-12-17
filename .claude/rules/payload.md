# Payload CMS 3.0 Patterns

## Configuration
- **Location:** `payload-config/payload.config.ts`
- **Hard-wire pattern:** Always import `importMap` explicitly (Node 24+ compatibility)
- **Relative imports:** Use `../../../../payload-config/payload.config` NOT `@payload-config`

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
