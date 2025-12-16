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

## Storage
- **Provider:** Cloudflare R2 (S3-compatible)
- **Plugin:** `@payloadcms/plugin-cloud-storage`
- **Config:** Set S3 credentials in .env
