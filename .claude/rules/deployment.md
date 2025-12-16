# Deployment Procedures

## Pre-Deploy Checklist
- [ ] Node version is v20.18.0
- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Environment variables set in Vercel
- [ ] Database migrations applied

## Vercel Configuration
- **Platform:** Vercel Serverless Functions
- **Framework:** Next.js 16
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

## Environment Variables (Vercel)
```
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=...
PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.vercel.app
S3_ENDPOINT=...
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_BUCKET=...
S3_REGION=auto
NEXT_PUBLIC_HYGRAPH_ENDPOINT=...
```

## Database Migrations
```bash
# Run migrations before deploying
npx payload migrate

# Verify connection
npx payload migrate:status
```

## Post-Deploy Verification
1. Visit `/admin` - verify login works
2. Create test content - verify database writes
3. Visit `/` - verify public site renders
4. Check `/api/health` - verify API responds
5. Test image uploads - verify S3 storage

## Rollback Procedure
1. Revert commit in git
2. Redeploy previous version in Vercel
3. Restore database backup if needed
4. Verify all systems operational

## Monitoring
- **Logs:** Vercel dashboard
- **Database:** Neon console
- **Storage:** Cloudflare R2 dashboard
