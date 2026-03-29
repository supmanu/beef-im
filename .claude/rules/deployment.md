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

---

## Strategic Stack Assessment (March 29, 2026)
**Status:** Stack confirmed. Exit plans documented. No action required now.

### Decision: Keep Next.js + Payload CMS

After evaluating Astro + Keystatic (file-based CMS), Astro + Sveltia, and raw MDX approaches:

**We keep Payload.** The editing experience is a competitive advantage worth the infrastructure:
- Browser-based admin UI accessible from any device, anywhere
- Lexical WYSIWYG editor (visual tables, Intelligence Boxes, code blocks)
- Maturity and plugin ecosystem far ahead of file-based alternatives

Evaluated alternatives and their gaps:

| CMS | WYSIWYG Quality | Tables | Math | Deploy Anywhere | DB Required |
|---|---|---|---|---|---|
| **Payload** | **Best** | **Visual builder** | Plugin | Limited | **Yes** |
| Keystatic | Good | Basic | No | Yes | No |
| Sveltia | Basic | No | No | Yes | No |
| TinaCMS | Good | Basic | No | Yes (cloud req) | No |
| Raw MDX | N/A (code) | Markdown | LaTeX | Yes | No |

**Conclusion:** Moving to a file-based CMS would be trading a Ferrari for a Ford truck. The admin UI + WYSIWYG editing justifies carrying a database dependency.

### Mastra RAG: Confirmed Non-Core

Mastra AI/RAG (`nerd_brain` PgVector, 231 rows, gemini-embedding-001) was an exploration of AI-assisted content research and token optimization. It is **not required** for the website's blogging or web tools functions.

- The file-based `.md` knowledge system (`.claude/rules/`, `nerd/`, Obsidian vault) is the battle-tested content workflow
- Obsidian + Smart Connections plugin provides local semantic search without any infrastructure
- Mastra can be removed to simplify the stack when convenient — no urgency

### Database Exit Plan (Neon Postgres)

**Current:** Neon free tier (Postgres). Adequate for now, but free tiers are not permanent.

**Strategy:** "Think of the best, plan for the worst" — keep Neon while it works, have exit options ready.

**Exit triggers:**
- Neon kills or significantly degrades the free tier
- Neon pricing becomes unreasonable for usage levels
- Strong desire to deploy on Cloudflare Pages

**Exit options (ranked by effort):**

| Option | Effort | Downtime | What Changes |
|---|---|---|---|
| **Supabase / Railway Postgres** | 1 hour | Minutes | Swap `DATABASE_URI` connection string only |
| **Turso (LibSQL/SQLite)** | Half day | Minutes | Swap `@payloadcms/db-postgres` → `@payloadcms/db-sqlite` in `payload.config.ts` |
| **SQLite file on VPS** | 1 day | DNS propagation | Move from serverless to Hetzner VPS (3€/mo), full sovereignty |
| **Cloudflare D1** | 1-2 days | DNS propagation | SQLite adapter + CF Pages deployment, community adapter maturity TBD |

**Key insight:** Payload's database adapter pattern means the swap is a config-level change. Content, components, styling, Lexical editor — none of it touches the database layer. Migration risk is low.

---

## Cloudflare Pages Migration Research (March 2026)
**Status:** Feasible. Becomes straightforward if Mastra RAG is removed (confirmed non-core).

### Summary
As of March 2026, Cloudflare Pages + Payload CMS is **feasible but requires code changes**. Not "fundamentally incompatible" anymore.

### What Was Fixed (2025-2026)
- ✅ **Express.js** — fully supported via `nodejs_compat` flag + `node:http` polyfills
- ✅ **Payload CMS** — officially supports Cloudflare Pages with `@cloudflare/next-on-pages`
- ✅ **puppeteer** — NOT a blocker for this project (only used in local `scripts/`, never deployed)
- ✅ **R2 storage** — already on Cloudflare, zero change needed
- ✅ **Mastra RAG** — confirmed non-core, can be removed (eliminates PgVector edge concern)

### Remaining Blockers (require code changes)
| Dependency | Status | Required Fix |
|---|---|---|
| `sharp` in `payload.config.ts` | ❌ Still incompatible | Remove from Payload config; use Cloudflare Image Resizing instead |
| `@payloadcms/db-postgres` | ⚠️ Workaround needed | Switch to `@payloadcms/db-sqlite` with Turso, OR use Cloudflare Hyperdrive pointing at existing Neon |

### Recommended Migration Path (when ready)
1. Remove `import sharp` + `sharp,` from `payload-config/payload.config.ts`
2. Either:
   - **Option A:** Switch to `@payloadcms/db-sqlite` + Turso (cleaner, no Postgres at all)
   - **Option B:** Set up Cloudflare Hyperdrive → existing Neon (keeps Postgres, adds latency)
3. Add `wrangler.toml` + test `@cloudflare/next-on-pages` build
4. Remove Mastra dependencies (`@mastra/core`, `@mastra/memory`, `@mastra/pg`, `@mastra/rag`) if not already done

### Historical Context: Cloudflare Was Already Attempted (Nov-Dec 2025)

Around November-December 2025, a deployment of Next.js + Payload to Cloudflare (D1/Pages) was attempted and **failed** — it was buggy and unsuccessful, forcing a full switch to Vercel. The current Vercel deployment is not a default choice but a **fallback after Cloudflare didn't work** at the time.

This means:
- Cloudflare Pages + Payload has been tried before and failed in practice
- The ecosystem may have matured since then (March 2026), but caution is warranted
- Any future CF attempt should be done in an isolated branch/experiment, not a production migration
- The D1 (SQLite) path specifically had issues — Turso/LibSQL may be a different story

### Why Stay on Vercel for Now
- Zero-friction for current stack
- Cloudflare was already attempted and failed (Nov-Dec 2025)
- No migration risk
- Neon free tier still works
- R2 storage already in Cloudflare ecosystem regardless
- Move when there's a reason, not preemptively
