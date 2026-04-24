# beef.im Infrastructure Rebrand — Plan

**Date:** 2026-04-24
**Status:** Phase 0 pending user pre-flight; Phase 1 ready to execute
**Prerequisites:** Voice-DNA + Constitution rebrand complete (see [beef-im-rebrand-brief.md](./beef-im-rebrand-brief.md) STATUS table)
**CDN decision:** **Option B locked** — migrate image URLs to `assets.beef.im` (new CNAME), keep `assets.nerdwithnart.com` alive for legacy compatibility

---

## Mental Model

Three axes. Do not conflate.

| Axis | What | Actor | Phase |
|---|---|---|---|
| **A. Code strings** | Brand name, URLs, OG metadata in the Next.js app | Sonnet 4.6 | Phase 2 |
| **B. External infrastructure** | Vercel domain, Cloudflare DNS, R2 custom domain, Facebook page | **User, manual** | Phases 0, 1, 3 |
| **C. Author identity** | "Natapol" / "นาถ" as person, avatar file, article bylines | **No change ever** | — |

The dangerous mistake: Sonnet touches Axis B or C. Sonnet's remit is Axis A only, with explicit file list. Sonnet must not rename avatar files, edit historical articles, or touch Vercel/DNS/R2.

---

## Phase 0 — Pre-flight (user, manual, ~15 min)

Confirm before Sonnet begins:

```
□ Vercel access — can add domains to nerd-with-nart project
□ DNS provider for beef.im confirmed (likely Cloudflare)
□ Cloudflare R2 access — can add custom domains to nwn-assets bucket
□ Facebook page admin access — can rename when ready
□ Low-traffic window identified for Phase 3 cutover (~15 min window)
```

---

## Phase 1 — Infrastructure setup (user, manual, ~30 min)

**Must happen before Sonnet edits code, or the site breaks.**

### 1.1 Vercel — Add `beef.im` as secondary domain

- Vercel dashboard → nerd-with-nart project → Domains → Add Domain
- Add both: `beef.im` and `www.beef.im`
- Follow Vercel's DNS instructions:
  - `beef.im` (apex) → A record to Vercel's anycast IP
  - `www.beef.im` → CNAME to `cname.vercel-dns.com`
- Wait for SSL cert (~5 min)
- **Do NOT set as primary yet** — leave `nerdwithnart.com` as primary until Phase 3

### 1.2 Cloudflare R2 — Add `assets.beef.im` custom domain (Option B)

- Cloudflare dashboard → R2 → `nwn-assets` bucket → Settings → Custom Domains → Add
- Domain: `assets.beef.im`
- Cloudflare auto-creates the DNS CNAME if `beef.im` is under Cloudflare
- Wait for SSL provisioning
- **Do NOT remove** `assets.nerdwithnart.com` — it stays live forever for legacy image URLs

### 1.3 Verify infrastructure

```
□ https://beef.im loads the current site (still branded "Nerd with Nart" — expected)
□ https://www.beef.im loads the current site
□ https://nerdwithnart.com still loads the site (unchanged)
□ https://assets.beef.im/nwn-assets/navbar-logo.png serves the logo
□ https://assets.nerdwithnart.com/nwn-assets/navbar-logo.png still serves the logo
```

All five green → proceed to Phase 2.

---

## Phase 2 — Code rebrand (Sonnet 4.6 executes)

### System architecture

```
┌──────────────────────┐
│  PRIMARY DOMAIN      │   Still nerdwithnart.com during Phase 2
│  (pre-cutover)       │   beef.im serves same content as secondary
└──────────────────────┘
         ↓
┌──────────────────────┐
│  NEXT.JS APP         │   ← Sonnet edits brand strings here
│  components/ + app/  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  CLOUDFLARE R2       │   Both hostnames work:
│  bucket: nwn-assets  │     assets.beef.im (new, branded)
│                      │     assets.nerdwithnart.com (legacy)
└──────────────────────┘
```

### File-by-file checklist

**Seven files, precise edits. Sonnet follows this list exactly.**

#### 1. `components/SEO.tsx` (5 strings)

| Line | Before | After |
|---|---|---|
| 20 | `"Nerd with Nart (เนิร์ดกับนาถ) \| Financial Strategy"` | `"ประกันเนื้อๆ (beef.im) \| Insurance Forensics & Meat"` |
| 24 | `"https://assets.nerdwithnart.com/nwn-assets/og-background.jpg"` | `"https://assets.beef.im/nwn-assets/og-background.jpg"` |
| 26 | `"https://nerdwithnart.com"` | `"https://beef.im"` |
| 29 | `` `${title} | Nerd with Nart` `` | `` `${title} | ประกันเนื้อๆ` `` |
| 46 | `og:site_name content="Nerd with Nart"` | `og:site_name content="ประกันเนื้อๆ"` |

#### 2. `components/Navbar.tsx` (2 strings + read full component first)

| Line | Before | After |
|---|---|---|
| 52 | `src="https://assets.nerdwithnart.com/nwn-assets/navbar-logo.png"` | `src="https://assets.beef.im/nwn-assets/navbar-logo.png"` |
| 53 | `alt="Nerd with Nart Logo"` | `alt="ประกันเนื้อๆ Logo"` |

**Also:** Sonnet reads the full Navbar component to check for displayed brand text next to the logo (e.g., site name text). If present, update it to `ประกันเนื้อๆ`.

#### 3. `app/(site)/layout.tsx`

| Line | Before | After |
|---|---|---|
| 23 | `title: "Nerd with Nart (เนิร์ดกับนาถ) \| Financial Strategy"` | `title: "ประกันเนื้อๆ (beef.im) \| Insurance Forensics & Meat"` |

Sonnet also reads the `description` metadata field in the same file. If present and still references "Nerd with Nart," update to a description matching the new brand (e.g., "Insurance forensics. Meat tricks. No filler.").

#### 4. `app/sitemap.ts`

| Line | Before | After |
|---|---|---|
| 7 | `const baseUrl = 'https://nerdwithnart.com'` | `const baseUrl = 'https://beef.im'` |

#### 5. `app/robots.ts`

| Line | Before | After |
|---|---|---|
| 12 | `sitemap: 'https://nerdwithnart.com/sitemap.xml'` | `sitemap: 'https://beef.im/sitemap.xml'` |

#### 6. `next.config.mjs` (ADDITIVE — do not remove entries)

Under `images.remotePatterns`, add new hostnames alongside the existing ones. The legacy entries stay so historical images continue working.

| Line | Action |
|---|---|
| 26 area | Keep `'nerd-with-nart.vercel.app'`; add entries for `'beef.im'` and `'www.beef.im'` |
| 30 area | Keep `'assets.nerdwithnart.com'`; add entry for `'assets.beef.im'` |

#### 7. Sweep check (Sonnet reads each first, edits only if brand references found)

```
□ app/layout.tsx               — root layout metadata
□ app/(site)/page.tsx          — homepage-specific metadata
□ app/(site)/manifesto/page.tsx — inline brand mentions
□ components/Footer.tsx         — footer branding block
□ components/HomeContent.tsx    — hero copy
□ components/ContactContent.tsx — contact-page copy
```

If any contain "Nerd with Nart" / "nerdwithnart.com" references, apply the same substitution pattern:
- Site name: `Nerd with Nart` → `ประกันเนื้อๆ`
- Domain: `nerdwithnart.com` → `beef.im`
- CDN: `assets.nerdwithnart.com` → `assets.beef.im`

**Exception:** inline references to "Natapol" / "นาถ" as the author stay — that's Axis C, untouched.

### Sonnet's hard constraints

```
✗ Do NOT edit any file under content/articles/ or content/test-articles/
  → historical content stays
✗ Do NOT rename the avatar file natapol-supmanu-nerd-with-nart-avatar.png
  → the person is still Natapol; filename is an identifier
✗ Do NOT change author byline references to "นาถ" or "Natapol"
  → that's the writer, not the brand
✗ Do NOT remove nerdwithnart.com or assets.nerdwithnart.com from
  next.config.mjs allowlist
  → legacy compatibility requires both to work
✗ Do NOT change primary domain anywhere — still nerdwithnart.com until
  Phase 3 user-executed cutover
✓ One atomic commit: "infra: rebrand Navbar/SEO/metadata to beef.im"
✓ If anything outside the 7-file scope needs editing, STOP and ask user
```

### Phase 2 verification

After Sonnet commits, user verifies on `https://beef.im`:

```
□ <title> shows ประกันเนื้อๆ branding
□ OG preview (view-source, og:title / og:site_name) shows ประกันเนื้อๆ
□ Navbar logo loads from assets.beef.im
□ No mixed-brand artifacts (one page says "Nerd with Nart", another says "ประกันเนื้อๆ")
□ Sitemap at https://beef.im/sitemap.xml lists beef.im URLs
□ Historical images (article embeds) still load — some via assets.nerdwithnart.com, still OK
```

All green → proceed to Phase 3.

---

## Phase 3 — Cutover (user, manual, ~15 min)

### 3.1 Vercel — Flip primary domain

- Vercel dashboard → Domains → set `beef.im` as **primary**
- For `nerdwithnart.com` and `www.nerdwithnart.com`: set redirect to `beef.im` (301 permanent)
- Vercel handles the 301 config via the "Redirect to" option on each domain

### 3.2 Verify redirect chain

```
□ https://nerdwithnart.com        → 301 → https://beef.im ✓
□ https://www.nerdwithnart.com    → 301 → https://beef.im ✓
□ https://beef.im                 → serves site directly ✓
□ https://www.beef.im             → 301 → https://beef.im (or serves directly, Vercel's choice) ✓
```

Test with: `curl -I https://nerdwithnart.com` — expect `301` and `Location: https://beef.im`

### 3.3 Facebook page rename

**Only after site cutover verified stable (wait ~30 min):**
- Facebook page → Settings → Page Info → rename
- New page name: `ประกันเนื้อๆ` (or `beef.im` if display preference)
- Update bio with new tagline: *"Insurance forensics. Meat tricks. No filler."*
- Update Facebook page cover image if it has old branding

---

## Phase 4 — Post-cutover (user, ~30 min spread over a week)

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

- If `nerdwithnart.com` is verified in Google Search Console: add `beef.im` as new property
- Submit new sitemap: `https://beef.im/sitemap.xml`
- Use "Change of Address" tool in Search Console to signal the domain move (Google indexes faster with this)

### 4.3 Monitoring (one week)

```
□ Vercel logs — watch for 404s on old bookmark-style URLs
□ Test a few deep-link articles: old URL 301s correctly to new domain
□ Cloudflare R2 analytics — confirm assets.beef.im traffic increasing,
  assets.nerdwithnart.com still serving historical article images
```

---

## Risks + Rollback

| Risk | Likelihood | Mitigation |
|---|---|---|
| DNS propagation lag during 3.1 | Low | Vercel uses anycast edge — users see minimal disruption |
| OG previews show old brand for days | Certain | Force-refresh via platform debug tools (4.1) |
| Historical article images break | Blocked by design | Both `assets.*` hostnames stay live indefinitely; same bucket |
| Legacy inbound links die | Blocked by 301 | Permanent redirects; Google re-indexes within weeks |
| Brand identity mismatch on mid-rebrand screenshot | Low | Phase 3 is a ~5-min window; low traffic window minimizes |

**Rollback path (if something breaks mid-Phase 3):**

```
1. Vercel: flip primary back to nerdwithnart.com (UI toggle, ~30 sec)
2. Vercel: remove 301 redirects from nerdwithnart.com
3. If code issue: git revert <Sonnet's commit>, Vercel auto-deploys
4. beef.im secondary domain can stay live — no rollback needed there
```

No data loss is possible. R2 bucket untouched. Old images keep serving.

---

## What Sonnet Must NOT Do

```
✗ Touch Vercel, DNS, Cloudflare R2 dashboards
✗ Edit anything under content/articles/ or content/test-articles/
✗ Rename or delete the author avatar file
✗ Remove legacy hostnames from next.config.mjs allowlist
✗ Create multiple commits for what is one logical change
✗ Change the primary domain — that's the user's Phase 3 job
✗ Edit files outside the 7-file scope without asking
```

---

## Sonnet's Starter Prompt

To hand this plan to a fresh Sonnet 4.6 session:

```
Execute Phase 2 of the beef.im infrastructure rebrand.

Context: read docs/beef-im-infra-plan.md for the full plan. The voice-dna
and constitution rebrand is already done (see the STATUS table in
docs/beef-im-rebrand-brief.md). You are executing Phase 2 only — code
strings — not infrastructure.

Prerequisites already confirmed by user: Phase 0 and Phase 1 complete.
beef.im and assets.beef.im are live as secondary domains. nerdwithnart.com
is still primary — do not change that.

Scope: 7 files in docs/beef-im-infra-plan.md § Phase 2 File-by-file
checklist. Follow it exactly. Do not edit content/articles/ or the avatar
file. Read each sweep-check file first; edit only if it contains brand
strings.

Commit style: one atomic commit, "infra: rebrand Navbar/SEO/metadata to
beef.im". Then Melkor Save Protocol (push to department, update parent
pointer). Report diff stat when done.

If you find anything outside the 7-file scope that looks like it needs
updating, STOP and ask before touching.
```

---

## Related

- [beef-im-rebrand-brief.md](./beef-im-rebrand-brief.md) — full rebrand decision record
- [../nerd/pillars/voice-dna.md](../nerd/pillars/voice-dna.md) — voice DNA v6.0
- [../nerd/pillars/constitution.md](../nerd/pillars/constitution.md) — constitution v5.0 (Footer Law §7)
- [../.claude/rules/visuals.md](../.claude/rules/visuals.md) — R2 asset registry and typography standards
- Tag `legacy/pre-beef-im-v5.2` — full pre-rebrand snapshot

---

*Plan authored 2026-04-24 by Opus 4.7. Phase 2 execution assigned to Sonnet 4.6. Phases 0, 1, 3, 4 user-executed.*
