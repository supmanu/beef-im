# beef.im Infrastructure Rebrand — Plan

**Date:** 2026-04-24
**Status:** Phase 1 in progress (R2 custom domain binding pending); Phase 2 ready for Sonnet once verified
**Prerequisites:** Voice-DNA + Constitution rebrand complete (see [beef-im-rebrand-brief.md](./beef-im-rebrand-brief.md) STATUS table)

**Key decisions (locked):**
- **Vercel primary domain:** `beef.im` from day one (no cutover dance — current Vercel only serves `nerd-with-nart-prod.vercel.app`; `nerdwithnart.com` is on Cloudflare Pages with old Hygraph, unrelated)
- **CDN:** New bucket `beef-assets` with clean root paths. Old `nwn-assets` bucket stays untouched for legacy article images.
- **URL pattern:** `https://assets.beef.im/navbar-logo.png` (no `/nwn-assets/` path segment — debt-free from day one)
- **Legacy bucket `nwn-assets`:** Kept alive via `assets.nerdwithnart.com` indefinitely. Historical article images continue to work.
- **404 page:** Legacy beef.im HTML fun page becomes `app/not-found.tsx` (Phase 5, Sonnet task)

---

## Mental Model

Three axes. Do not conflate.

| Axis | What | Actor | Phase |
|---|---|---|---|
| **A. Code strings** | Brand name, URLs, OG metadata in the Next.js app | Sonnet 4.6 | Phase 2 + Phase 5 |
| **B. External infrastructure** | Vercel domain, Cloudflare DNS, R2 buckets, Facebook page | **User, manual** | Phases 0, 1, 3 |
| **C. Author identity** | "Natapol" / "นาถ" as person, avatar file, article bylines | **No change ever** | — |

The dangerous mistake: Sonnet touches Axis B or C. Sonnet's remit is Axis A only, with explicit file list. Sonnet must not touch Vercel/DNS/R2 or edit historical article content.

---

## Phase 0 — Pre-flight (user, manual)

```
✅ Vercel access confirmed
✅ Cloudflare DNS for beef.im confirmed
✅ Cloudflare R2 access confirmed
✅ Facebook page admin access confirmed
```

---

## Phase 1 — Infrastructure setup (user, manual)

### 1.1 Vercel — Add `beef.im` as primary domain ✅ DONE

- Added `beef.im` and `www.beef.im` to nerd-with-nart project
- Using CNAME flattening (Cloudflare supports): both point to `a441b54658d2bde2.vercel-dns.com`
- DNS records are **"DNS only"** (grey cloud) — Vercel handles SSL + CDN. Do NOT enable Cloudflare proxy on these records.
- SSL provisioned, site live at `https://beef.im` (still branded "Nerd with Nart" at this stage — expected)

### 1.2 Cloudflare R2 — Create NEW bucket `beef-assets` ✅ DONE

Decision: fresh bucket to sidestep the double-folder tech debt in `nwn-assets` (files were at `nwn-assets/nwn-assets/*` — redundant path segment in URLs).

- Created bucket `beef-assets`
- Uploaded 5 site assets at bucket root (not in a subfolder):
  ```
  beef-assets/
    ├── contact-basecamp.jpg       (163 KB)
    ├── hero-mountain.jpg          (96 KB)
    ├── natapol-supmanu-avatar.png (496 KB — renamed from natapol-supmanu-nerd-with-nart-avatar.png)
    ├── navbar-logo.png            (9 KB)
    └── og-background.jpg          (361 KB)
  ```
- Total: ~615 KB

**Filename rename:** `natapol-supmanu-nerd-with-nart-avatar.png` → `natapol-supmanu-avatar.png` (drops old brand from the URL)

**What was NOT copied:**
- Hygraph-generated article images (`cmj1ug9ib04ns06o5npbcrnm4-*.png`) — legacy, stay in old bucket
- Pre-generated resized variants (`-400x300`, `-768x1024`, `-1024x576`) — Next.js Image handles resizing at request time; variants are dead weight
- Article-specific infographics — will be regenerated when articles are rewritten for beef.im

### 1.3 Cloudflare R2 — Bind `assets.beef.im` custom domain ⏳ NEXT STEP

**Exactly one step remaining for Phase 1:**

1. Cloudflare dashboard → R2 → click `beef-assets` bucket
2. **Settings** tab (not Objects)
3. Scroll to **Custom Domains** section → click **Connect Domain**
4. Enter: `assets.beef.im`
5. Cloudflare auto-creates the DNS CNAME (since `beef.im` is on this account)
6. Wait for SSL (~2–5 min)

### 1.4 Phase 1 verification (user)

After binding, verify all five URLs resolve:

```
□ https://beef.im                                  → loads current site ✅
□ https://www.beef.im                              → loads or redirects to apex ✅
□ https://nerdwithnart.com                         → still loads (CF Pages Hygraph, unchanged)
□ https://assets.beef.im/navbar-logo.png           → loads logo (after 1.3)
□ https://assets.beef.im/og-background.jpg         → loads OG bg (after 1.3)
□ https://assets.nerdwithnart.com/nwn-assets/navbar-logo.png → still loads (legacy, untouched)
```

All green → Phase 1 complete, hand off Phase 2 to Sonnet 4.6.

### 1.5 Legacy `nwn-assets` bucket policy

**Do not touch, do not delete.** Files stay at `nwn-assets/nwn-assets/*` with the double-folder pattern serving `https://assets.nerdwithnart.com/nwn-assets/*` URLs. Historical article images continue working forever this way.

Future deprecation (months from now, separate decision): when `nerdwithnart.com` is fully replaced, unbind `assets.nerdwithnart.com` custom domain and delete `nwn-assets` bucket. That's a one-command cleanup, not this migration's scope.

---

## Phase 2 — Code rebrand (Sonnet 4.6 executes)

### Scope summary

Swap brand strings + URLs across 8 files. The URL changes are **not just hostname swaps** — they also drop the `/nwn-assets/` path segment (clean new bucket has files at root) AND the avatar filename changed.

### System architecture (post-cutover)

```
┌──────────────────────┐
│  beef.im (primary)   │  Vercel serves Next.js app
│  www.beef.im         │  CNAME flattening, no Cloudflare proxy
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  Next.js app         │  ← Sonnet edits brand strings here
│  components/ + app/  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  assets.beef.im      │  → R2 bucket: beef-assets (CLEAN, root paths)
│  (new, used by app)  │
└──────────────────────┘

Legacy (untouched, still live for historical content):
┌──────────────────────┐
│ nerdwithnart.com     │  → Cloudflare Pages (old Hygraph site)
├──────────────────────┤
│ assets.nerdwithnart  │  → R2 bucket: nwn-assets (double-folder kept)
│ .com                 │    Historical article images only
└──────────────────────┘
```

### File-by-file checklist

Sonnet follows this list exactly. **URL pattern change: drop `/nwn-assets/` AND update avatar filename.**

#### 1. `components/SEO.tsx` (5 strings)

| Line | Before | After |
|---|---|---|
| 20 | `"Nerd with Nart (เนิร์ดกับนาถ) \| Financial Strategy"` | `"ประกันเนื้อๆ (beef.im) \| Insurance Forensics & Meat"` |
| 24 | `"https://assets.nerdwithnart.com/nwn-assets/og-background.jpg"` | `"https://assets.beef.im/og-background.jpg"` |
| 26 | `"https://nerdwithnart.com"` | `"https://beef.im"` |
| 29 | `` `${title} | Nerd with Nart` `` | `` `${title} | ประกันเนื้อๆ` `` |
| 46 | `og:site_name content="Nerd with Nart"` | `og:site_name content="ประกันเนื้อๆ"` |

#### 2. `components/Navbar.tsx` (2 strings + full read)

| Line | Before | After |
|---|---|---|
| 52 | `src="https://assets.nerdwithnart.com/nwn-assets/navbar-logo.png"` | `src="https://assets.beef.im/navbar-logo.png"` |
| 53 | `alt="Nerd with Nart Logo"` | `alt="ประกันเนื้อๆ Logo"` |

**Also:** Sonnet reads the full Navbar component to check for displayed brand text next to the logo. If present, update to `ประกันเนื้อๆ`.

#### 3. `app/(site)/layout.tsx`

| Line | Before | After |
|---|---|---|
| 23 | `title: "Nerd with Nart (เนิร์ดกับนาถ) \| Financial Strategy"` | `title: "ประกันเนื้อๆ (beef.im) \| Insurance Forensics & Meat"` |

Also read the `description` metadata field. If it references old brand, update to: *"Insurance forensics. Meat tricks. No filler."* (or similar — confirm with user).

#### 4. `app/sitemap.ts`

| Line | Before | After |
|---|---|---|
| 7 | `const baseUrl = 'https://nerdwithnart.com'` | `const baseUrl = 'https://beef.im'` |

#### 5. `app/robots.ts`

| Line | Before | After |
|---|---|---|
| 12 | `sitemap: 'https://nerdwithnart.com/sitemap.xml'` | `sitemap: 'https://beef.im/sitemap.xml'` |

#### 6. `next.config.mjs` (ADDITIVE — do not remove)

Add new hostnames to `images.remotePatterns`:
- Keep: `'nerd-with-nart.vercel.app'`, `'assets.nerdwithnart.com'`
- Add: `'beef.im'`, `'www.beef.im'`, `'assets.beef.im'`

Legacy entries stay so historical article images keep loading.

#### 7. `components/ArticleContent.tsx` (avatar URL + filename change)

Find:
```
https://assets.nerdwithnart.com/nwn-assets/natapol-supmanu-nerd-with-nart-avatar.png
```
Replace with:
```
https://assets.beef.im/natapol-supmanu-avatar.png
```

Note: **both hostname AND filename changed.** Double-check with grep for any stale references to the old avatar filename.

#### 8. `.claude/rules/visuals.md` (rules doc — update registry)

This doc is read by every Claude Code session; must reflect current state.

- Update CDN domain reference: `https://assets.nerdwithnart.com/nwn-assets/` → `https://assets.beef.im/`
- Update bucket name: `nwn-assets` → `beef-assets`
- Update asset inventory table with new filenames (avatar renamed)
- Update the `AVATAR_URL` code sample to new URL + filename
- Update Remote Asset Domains code sample in `next.config.mjs` section to show `assets.beef.im` (keep legacy hostname in example as commented backwards-compat note)
- Document the filename rename for avatar (add a note that old filename still works via legacy bucket)

### Sweep check (Sonnet reads each first, edits only if brand strings found)

```
□ app/layout.tsx               — root layout metadata
□ app/(site)/page.tsx          — homepage-specific metadata
□ app/(site)/manifesto/page.tsx — inline brand mentions
□ components/Footer.tsx         — footer branding block
□ components/HomeContent.tsx    — hero copy
□ components/ContactContent.tsx — contact copy
□ components/BackgroundLayers.tsx — og-background URL
```

Apply the same substitution pattern:
- Site name: `Nerd with Nart` → `ประกันเนื้อๆ`
- Domain: `nerdwithnart.com` → `beef.im`
- CDN: `assets.nerdwithnart.com/nwn-assets/` → `assets.beef.im/` (drop the path segment)
- Avatar filename: `natapol-supmanu-nerd-with-nart-avatar.png` → `natapol-supmanu-avatar.png`

**Exception:** inline references to "Natapol" / "นาถ" as the author stay — that's Axis C, untouched.

### Sonnet's hard constraints

```
✗ Do NOT edit any file under content/articles/ or content/test-articles/
  → historical content stays; article images still reference legacy bucket
✗ Do NOT rename or delete anything in the old nwn-assets R2 bucket
✗ Do NOT change author byline references to "นาถ" or "Natapol"
  → that's the writer, not the brand
✗ Do NOT remove nerdwithnart.com or assets.nerdwithnart.com from
  next.config.mjs allowlist
  → legacy images still load from there
✗ Do NOT create a new commit-per-file — one atomic change
✓ One atomic commit: "infra: rebrand to beef.im (domain, CDN, brand strings)"
✓ If anything outside the listed scope needs editing, STOP and ask user
```

### Phase 2 verification (user, after Sonnet's commit deploys)

Go to `https://beef.im` and confirm:

```
□ <title> shows ประกันเนื้อๆ branding
□ view-source: og:title / og:site_name / og:image show new brand + beef.im URLs
□ Navbar logo loads (URL in network tab: assets.beef.im/navbar-logo.png)
□ No mixed-brand artifacts (one page says "Nerd with Nart", another says "ประกันเนื้อๆ")
□ Sitemap at https://beef.im/sitemap.xml lists beef.im URLs
□ Historical article images (in article embeds) still load — some via assets.nerdwithnart.com, still OK
□ Favicon, PWA manifest (if present) — brand-aligned
```

---

## Phase 3 — Post-rebrand housekeeping (user, manual, ~15 min)

**Much simpler than original plan** — no primary-domain flip needed. beef.im was primary from day one.

### 3.1 Facebook page rename

After Phase 2 is live and verified stable (~24h observation):

- Facebook page → Settings → Page Info → rename
- New page name: `ประกันเนื้อๆ` (or `beef.im` — user preference)
- Update bio with tagline: *"Insurance forensics. Meat tricks. No filler."*
- Update cover image if it has old branding

### 3.2 nerdwithnart.com — separate decision (defer)

**Do not touch during this migration.** The old Cloudflare Pages Hygraph site stays live as a backup.

When ready to deprecate (weeks/months later, your call):

| Option | Action | When |
|---|---|---|
| Leave as-is | Keep running Hygraph silently | Indefinitely — zero risk |
| 301 to beef.im | On Cloudflare Pages: configure redirect all → `https://beef.im` | After beef.im stable ~1 week |
| DNS swap | Point `nerdwithnart.com` DNS at Vercel (same Next.js app) | Requires canonical URL handling for SEO |

Recommendation: **301 redirect on Cloudflare Pages** once beef.im has proven stable. Simpler than DNS changes, preserves Hygraph backup (can re-enable if disaster).

---

## Phase 4 — Post-cutover verification (user, spread over a week)

### 4.1 OG cache invalidation

Social platforms cache OG metadata aggressively. Force-refresh:

```
□ Facebook Sharing Debugger:
    https://developers.facebook.com/tools/debug/
    → enter https://beef.im → Scrape Again
    → verify og:title, og:site_name, og:image all show new brand

□ LinkedIn Post Inspector:
    https://www.linkedin.com/post-inspector/
    → same process

□ Twitter Card Validator (if posting to X):
    https://cards-dev.twitter.com/validator
    → same process
```

### 4.2 Search Console

- Add `beef.im` as a new property in Google Search Console
- Submit sitemap: `https://beef.im/sitemap.xml`
- If/when you 301 `nerdwithnart.com`, use Search Console's "Change of Address" tool (if old domain is verified there) — signals the move to Google for faster re-indexing

### 4.3 Monitoring (one week)

```
□ Vercel logs — watch for 404s on old bookmark-style URLs
□ R2 analytics — confirm assets.beef.im traffic ramping up;
  assets.nerdwithnart.com still serving legacy article images
□ Test deep-link articles — historical article images load via old bucket as expected
```

---

## Phase 5 — 404 page from legacy HTML (Sonnet 4.6, after Phase 2)

### Source

Legacy standalone page at `/home/supmanu/Downloads/Beef.im HTML fun web.txt` — a "Beef.im - The Prime Cut of Knowledge" facts site with:
- Logo: big "Beef" with `.im` superscript
- Typing subtitle effect (rotates through 5 phrases)
- 4-category grid: Prime Cuts / Science & Grill / Beef Lore / Health & Beef
- Random beef-fact card (auto-rotates every 8 seconds)
- CTA button: "Discover More Facts"
- Fully client-side, no backend

### Why this is a 404 page

- Delightful surprise on broken links — high brand-memory touchpoint
- Reinforces the meat half of the brand on every dead link
- "Prime Cut of Knowledge" tagline echoes เน้นเนื้อๆ substance-no-water
- Low integration cost — single file: `app/not-found.tsx`

### Scope for Sonnet

1. **Convert HTML → JSX** (Next.js App Router convention)
   - Create `app/not-found.tsx` as a client component (`'use client'` at top — needed for the typing effect and fact rotation)
   - Preserve layout, animations (CSS keyframes), facts database, typing effect verbatim
   - Use Next.js `<Link>` for any internal navigation (CTA button can link to homepage `/`)

2. **Recolor palette to brand** (teal/navy/amber, not red/gold)
   
   Current palette in source file:
   ```
   --primary:   #E63946   (red)       → replace with brand teal
   --accent:    #FFD166   (gold)      → replace with brand amber
   --dark:      #1D3557   (dark navy) → keep (already close to brand navy)
   ```
   
   Sonnet reads `.claude/rules/visuals.md` for exact brand hex codes. Typical teal in this brand is `#2bb1bb` (brand-teal per existing rules); amber/navy should match the existing site palette.

3. **Keep facts content** — the beef-facts database is gold; ship as-is

4. **Subtle brand tie-in** — change the top logo text from `Beef` + `.im` superscript to keep the pun, but add a tiny footer link: *"← กลับไปที่ ประกันเนื้อๆ"* or *"Back to beef.im"* as a secondary action

5. **Test** — trigger by visiting `https://beef.im/does-not-exist` after deploy

### Constraints (Sonnet)

```
✗ Do NOT change the facts content — they're curated
✗ Do NOT remove animations — the typing subtitle + auto-rotating facts are the charm
✓ DO recolor to brand palette
✓ DO convert inline <style> into either styled-jsx or a scoped CSS module
✓ DO add 'use client' directive (needed for useEffect + animations)
✓ One commit: "feat: brand-aligned 404 page with beef-facts easter egg"
```

---

## Risks + Rollback

Much simpler than original plan — no traffic cutover, no DNS swap on old domain.

| Risk | Likelihood | Mitigation |
|---|---|---|
| R2 custom domain binding fails SSL | Low | Wait 10 min and retry; reach out to CF support if persistent |
| OG previews show old brand for days | Certain | Force-refresh via Phase 4.1 platform debug tools |
| Legacy article images break | Blocked by design | `nwn-assets` bucket + `assets.nerdwithnart.com` stay live indefinitely |
| Sonnet misses a brand string in a file not in the list | Low | Sweep checklist + grep in Sonnet's starter prompt |
| Filename rename breaks avatar load | Low | Sonnet updates `ArticleContent.tsx` (#7); if missed, the page renders a broken image icon — user catches in Phase 2 verification |

**Rollback paths:**

- Sonnet's code changes → one commit → `git revert <sha>`, Vercel auto-deploys within ~60s
- R2 binding → unbind custom domain in CF UI, instant
- No data destruction possible anywhere

---

## What Sonnet Must NOT Do

```
✗ Touch Vercel, DNS, Cloudflare R2 dashboards
✗ Edit anything under content/articles/ or content/test-articles/
✗ Rename, delete, or reupload files in R2 buckets
✗ Remove legacy hostnames from next.config.mjs allowlist
✗ Create multiple commits when one logical change covers all files
✗ Edit files outside the Phase 2 scope without asking
✗ Rewrite the beef-facts content in the 404 page (Phase 5)
✗ Touch the author avatar FILE (only the URL reference in code)
```

---

## Sonnet's Starter Prompt

To hand off Phases 2 and 5 to a fresh Sonnet 4.6 session:

```
Execute Phase 2 of the beef.im infrastructure rebrand (code only).

Context: read docs/beef-im-infra-plan.md for the full plan. The voice-dna
and constitution rebrand is already done (see STATUS table in
docs/beef-im-rebrand-brief.md). Phase 0 and Phase 1 are complete:
- beef.im is live on Vercel (primary domain from day one)
- beef-assets R2 bucket is live with 5 site assets at root
- assets.beef.im custom domain bound and verified

Scope: 8 files in the Phase 2 File-by-file checklist. Follow it exactly.
URL changes are NOT just hostname swaps — also drop "/nwn-assets/" path
segment, and update avatar filename (natapol-supmanu-nerd-with-nart-
avatar.png → natapol-supmanu-avatar.png).

Hard constraints — from the plan doc:
- One atomic commit: "infra: rebrand to beef.im (domain, CDN, brand strings)"
- Do NOT touch content/articles/, content/test-articles/, R2 buckets,
  or Vercel/DNS
- Do NOT remove legacy hostnames from next.config.mjs allowlist
- Do NOT change author byline references (Natapol / นาถ stays)
- If anything outside the 8-file scope looks like it needs updating,
  STOP and ask

Workflow:
1. Read the plan doc fully
2. Read each file before editing
3. Do the explicit edits per the checklist
4. Run the sweep check — read each sweep file, edit only if brand
   strings present
5. Grep the repo for "nerd-with-nart-avatar" to catch any stale
   avatar references
6. Commit atomically with Melkor Save Protocol (department + parent
   pointer)
7. Report diff stat + user verification checklist from Phase 2
8. After user verifies production, execute Phase 5 (404 page from
   legacy HTML, source at /home/supmanu/Downloads/Beef.im HTML fun web.txt)

Ask questions before editing if anything is unclear.
```

---

## Related

- [beef-im-rebrand-brief.md](./beef-im-rebrand-brief.md) — full rebrand decision record
- [../nerd/pillars/voice-dna.md](../nerd/pillars/voice-dna.md) — voice DNA v6.0
- [../nerd/pillars/constitution.md](../nerd/pillars/constitution.md) — constitution v5.0 (Footer Law §7)
- [../.claude/rules/visuals.md](../.claude/rules/visuals.md) — R2 asset registry (to be updated in Phase 2)
- Tag `legacy/pre-beef-im-v5.2` — full pre-rebrand snapshot
- Source asset for Phase 5: `/home/supmanu/Downloads/Beef.im HTML fun web.txt`

---

*Plan authored 2026-04-24 by Opus 4.7. Revised 2026-04-24 after Phase 1.1+1.2 completion + clean-bucket decision. Phase 2 + Phase 5 execution assigned to Sonnet 4.6.*
