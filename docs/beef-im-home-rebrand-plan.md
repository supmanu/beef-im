# beef.im HOME Page Rebrand — Phase 6 Plan

**Date:** 2026-04-25
**Status:** Planning complete; ready for execution
**Prerequisites:**
- Phases 0–5 of infra rebrand complete (see [beef-im-infra-plan.md](./beef-im-infra-plan.md))
- Voice-DNA v6.0 + Constitution v5.0 locked
- Tagline workshop complete (see [brainstorm/](./brainstorm/) — 6-model × 15-candidate results; user picks locked 2026-04-25)
- GLM-5.1 routing redemption shipped (commit `eecc963`)

**Key decisions (all locked):**

| Decision | Value |
|---|---|
| Hero headline | `เนื้อๆ ไม่มีน้ำ` (large, white) |
| Hero sub-line | `DATA. LOGIC. NO FLUFF.` (medium, amber) |
| Hero subhead | `เรื่องประกันเราจริงจัง เรื่องย่างเนื้อเราก็จัดเต็ม` (regular, gray/white) — **`ก็` mandatory** |
| Logo tagline | `ดูเนื้อ ไม่ดูหน้า` (replaces `DATA. LOGIC. LEGACY.`) |
| Master brand line | `ดูเนื้อ ไม่ดูหน้า` — deployed at logo + footer |
| Archive subtitle | `เน้นเนื้อ ทุกเรื่อง` (added to `/articles`) |
| Menu sub-labels | `BASECAMP → HOME`, `GEAR CHECK → TOOLS`; `ARCHIVE / MANIFESTO / CONTACT` unchanged |
| Hero background | Deep navy (`#0B1D35`) + `EmberGlow` particles rising from bottom |
| Hero animation | Retuned `Snowstorm` logic → new `EmberGlow.tsx` (amber, upward, lower density) |
| Palette | Unchanged (navy + amber primary, teal accent-only) |
| Preservation | Git tag `hero/mountaineer-v1` + move to `components/_legacy/hero-mountaineer/` |
| Mountain remount | Deferred — `/about` page is a later phase, not Phase 6 |

---

## Mental Model

Three axes. Do not conflate.

| Axis | What | Actor | Phase |
|---|---|---|---|
| **A. Code (components/copy)** | HomeContent hero, Navbar tagline, Footer quote, Archive subtitle, new EmberGlow component | Sonnet 4.6 **or** DeepSeek V4 Pro | 6.2–6.5 |
| **B. External assets** | R2 filename `hero-mountain.jpg` (retire or rename) | **User, manual** | Out of Phase 6 scope |
| **C. Author identity** | Byline "Natapol" / "นาถ", avatar | **No change ever** | — |

The dangerous mistake: the executing model touches Axis B or C. Executor's remit is **Axis A only**, with explicit file list.

---

## Phase 6.1 — Preservation (preflight, 10 min)

### 6.1.1 Git tag the pre-state

```bash
git tag hero/mountaineer-v1
git push origin hero/mountaineer-v1
```

This is the exact rollback point. `git checkout hero/mountaineer-v1 -- components/HomeContent.tsx` restores the mountain hero at any future time with zero archaeology.

### 6.1.2 Screenshot current hero

User visits `https://beef.im`, takes full-page screenshot of home page, saves to:

```
docs/mountaineer-hero-snapshot.png
```

Or (if available): run a headless browser (`curl | chromium --headless --screenshot=...`). Purpose: visual reference for `/about` rebuild later, and for diffing at review time.

### 6.1.3 Create `components/_legacy/hero-mountaineer/`

Structure:

```
components/_legacy/hero-mountaineer/
├── MountainHero.tsx     # NEW — extracted standalone component
├── HeroHUD.tsx          # moved via git mv (only HomeContent uses it)
└── README.md            # preservation intent + import instructions
```

**`MountainHero.tsx`** — extract the `<section>` block from `HomeContent.tsx` lines 29–131 (hero section only, everything above `</section>`). Wrap as a standalone client component:

```tsx
'use client';
// imports: React, motion, useScroll, useTransform, ArrowDown,
// Snowstorm (from ../../Snowstorm — stays in place, manifesto depends on it),
// HeroHUD (from ./HeroHUD — moved here)
export default function MountainHero() {
  // ... all weather state, useEffect, motion blocks
  return <section>...</section>;
}
```

**`HeroHUD.tsx`** — `git mv components/HeroHUD.tsx components/_legacy/hero-mountaineer/HeroHUD.tsx`. No content change.

**`Snowstorm.tsx`** — **stays in place** at `components/Snowstorm.tsx`. Used by `app/(site)/manifesto/page.tsx` (two call sites: lines 80, 280) and `components/BackgroundLayers.tsx`. Do NOT move.

**`README.md`** inside `_legacy/hero-mountaineer/`:

```markdown
# Legacy Mountaineer Hero

Preserved on 2026-04-25 during Phase 6 home page rebrand.
Tagged at `hero/mountaineer-v1`.

## Remount intent
Mount at `/about` page in a future phase. Component is self-contained;
adjust imports if needed:
- Snowstorm still at `components/Snowstorm.tsx` (used by manifesto too)
- HeroHUD moved here

## Import example
import MountainHero from '@/components/_legacy/hero-mountaineer/MountainHero';

## Original state
Mounted in `components/HomeContent.tsx` — see `docs/mountaineer-hero-snapshot.png`
```

---

## Phase 6.2 — EmberGlow component (~30 min)

Create `components/EmberGlow.tsx` by adapting `Snowstorm.tsx`. **Do not delete Snowstorm** — manifesto still uses it.

### Spec

| Dimension | Snowstorm (current) | EmberGlow (new) |
|---|---|---|
| Direction | Diagonal fall (down + horizontal wind) | Upward drift (bottom → top) with slight sway |
| Color | `rgba(255,255,255, α)` (white snow) | `rgba(255, 209, 102, α)` (brand-amber ember) |
| Density | 150 + (windIntensity × 2) ≈ 190 | ~50–80 particles |
| Speed | Scales with wind | Slow, warm, steady — 0.3–0.8 px/frame |
| Glow | None | Subtle `ctx.shadowBlur = 6` with amber shadow color |
| Size | 2–5 px | 1.5–3.5 px |
| Lifecycle | Wraps top↔bottom infinitely | Fades near top, respawns at bottom |
| Interface prop | `windIntensity: number` | `intensity?: number` (default 60) |

Keep the canvas-based `requestAnimationFrame` pattern — it was performant. The visual difference is parameter + direction + color, not architecture.

### Acceptance

- Renders <16 ms/frame on a standard laptop (same as Snowstorm)
- Feels warm, not busy — particles should register peripherally, not distract from hero copy
- No visible seams when particles respawn at the bottom

---

## Phase 6.3 — Rewrite `components/HomeContent.tsx`

### Strip list (line numbers approximate to current state)

| Target | Action |
|---|---|
| Line 5 imports (`Shield, Download, Map, TrendingUp, ArrowDown`) | Remove all except `ArrowRight` |
| Line 6 imports (`motion, useScroll, useTransform`) | Keep `motion`; drop `useScroll, useTransform` |
| Line 8 `import Snowstorm` | Remove |
| Line 9 `import HeroHUD` | Remove |
| Line 14–23 weather state + useEffect | Remove entirely |
| Line 15 `useScroll` + line 16 `useTransform(scrollY, [0, 500], [1, 1.15])` | Remove |
| Lines 30–49 background image + Snowstorm + HeroHUD + gradients | Replace with EmberGlow + plain navy backdrop |
| Lines 52–75 `ALT: 24,500 FT` amber badge | Remove |
| Lines 77–85 mountain headline | Replace with new headline |
| Lines 87–95 mountain subhead + death-zone flavor | Replace with new sub-line + subhead |
| Lines 120–130 `Descent to Basecamp` scroll cue | Remove |

### Insert — new hero structure

```tsx
<section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0B1D35]">
  {/* EmberGlow background — amber particles rising from bottom */}
  <div className="absolute inset-0 z-0">
    <EmberGlow intensity={60} />
    {/* Subtle bottom→top gradient to ground the ember glow */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] via-transparent to-transparent"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      className="text-5xl md:text-7xl font-bold leading-tight text-white mb-4 font-prompt"
    >
      เนื้อๆ ไม่มีน้ำ
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
      className="text-sm md:text-base font-bold tracking-widest text-brand-amber mb-6 font-mono"
    >
      DATA. LOGIC. NO FLUFF.
    </motion.p>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
      className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light mb-10 leading-relaxed font-prompt"
    >
      เรื่องประกันเราจริงจัง เรื่องย่างเนื้อเราก็จัดเต็ม
    </motion.p>

    {/* Keep search bar as-is (was lines 103–117) */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
      className="flex flex-col sm:flex-row gap-4"
    >
      {/* ... existing search bar markup, unchanged ... */}
    </motion.div>
  </div>
</section>
```

Acceptance: no mountain, no snow, no HUD, no ALT badge, no "Descent to Basecamp". Search bar placeholder (`ค้นหา Unit-Linked, COI, หรือ แผนเกษียณ...`) stays verbatim.

---

## Phase 6.4 — Navbar + Footer updates

### `components/Navbar.tsx`

**Logo tagline swap (line 64):**

Before:
```tsx
<span className="font-sarabun text-amber-500 text-[10px] font-medium tracking-[0.2em] leading-tight">
  DATA. LOGIC. LEGACY.
</span>
```

After:
```tsx
<span className="font-prompt text-amber-500 text-xs font-medium tracking-wide leading-tight">
  ดูเนื้อ ไม่ดูหน้า
</span>
```

**Typography rationale:** Thai glyphs have higher stroke density than Latin caps. `tracking-[0.2em]` at 10px will crowd. Swap to `text-xs` (12px) + `tracking-wide` + `font-prompt` (better Thai optical rendering than Sarabun at small sizes).

**Menu sub-labels (line 25–31):**

Before:
```tsx
const navLinks = [
  { name: 'หน้าหลัก', sub: 'Basecamp', path: '/' },
  { name: 'คลังเครื่องมือ', sub: 'Gear Check', path: '/tools' },
  { name: 'คลังความรู้', sub: 'Archive', path: '/articles' },
  { name: 'จุดยืน', sub: 'Manifesto', path: '/manifesto' },
  { name: 'ติดต่อ', sub: 'Contact', path: '/contact' },
];
```

After:
```tsx
const navLinks = [
  { name: 'หน้าหลัก', sub: 'Home', path: '/' },
  { name: 'คลังเครื่องมือ', sub: 'Tools', path: '/tools' },
  { name: 'คลังความรู้', sub: 'Archive', path: '/articles' },
  { name: 'จุดยืน', sub: 'Manifesto', path: '/manifesto' },
  { name: 'ติดต่อ', sub: 'Contact', path: '/contact' },
];
```

**Compass icon (line 108):** Keep. Generic "navigation" semantics, not mountaineering-exclusive. Its scroll rotation is a small delight that survives the rebrand.

### `components/Footer.tsx`

Lines 92–93 currently read:
```tsx
"We don't sell shortcuts to wealth. <br />
We provide the <span>map</span> and the <span>compass</span> for a safe expedition."
```

Replace entirely with:
```tsx
"ดูเนื้อ ไม่ดูหน้า"
```

Strip the JSX `<span>` / `<br />` decorations — the line is its own emphasis. Preserve whatever container classes currently wrap the quote; just swap inner text.

---

## Phase 6.5 — Archive subtitle

### `app/(site)/articles/page.tsx`

Read the file first. If there's a page header block, add `เน้นเนื้อ ทุกเรื่อง` as a subtitle beneath the title. If there's no obvious header block, defer — smaller decision, can ship as a later commit.

Placement: subtitle line in the same amber sub-line style used in the hero (`text-brand-amber text-sm tracking-widest font-mono`).

---

## Phase 6.6 — Sweep + verify

### Grep sweep

From the repo root:

```bash
grep -rn "basecamp\|summit\|expedition\|gear check\|climb\|altitude\|oxygen\|death zone" \
  app components --include="*.tsx" \
  | grep -v "_legacy\|node_modules"
```

Expected after edits: **zero matches outside `_legacy/`**, except the two known stragglers:
- `app/(site)/manifesto/page.tsx` — uses `<Snowstorm>` twice. **Deferred to a later phase** (manifesto content rebrand). Phase 6 does not touch manifesto.
- `components/ContactContent.tsx` line 111 — `contact-basecamp.jpg` is an R2 asset filename. **Axis B**, user handles out of scope.

### Verification checklist (user, after deploy)

```
□ https://beef.im — no mountain image, no snow, no ALT/TEMP/WIND HUD, no "Descent to Basecamp"
□ Hero renders 3 lines in order:
    เนื้อๆ ไม่มีน้ำ (large, white)
    DATA. LOGIC. NO FLUFF. (medium, amber)
    เรื่องประกันเราจริงจัง เรื่องย่างเนื้อเราก็จัดเต็ม (regular, gray)
□ "ก็" present in subhead (critical — not "เราจัดเต็ม" without it)
□ EmberGlow particles rising from bottom edge (amber, not white snow falling)
□ Search bar placeholder still: "ค้นหา Unit-Linked, COI, หรือ แผนเกษียณ..."
□ Navbar logo tagline: ดูเนื้อ ไม่ดูหน้า (readable at 12px Prompt)
□ Navbar menu subs: Home / Tools / Archive / Manifesto / Contact
□ Footer quote: ดูเนื้อ ไม่ดูหน้า (no more map/compass/expedition)
□ /manifesto still loads (Snowstorm not broken)
□ /contact, /tools, /articles unchanged structurally
□ Git tag hero/mountaineer-v1 exists: `git tag -l hero/*`
□ components/_legacy/hero-mountaineer/ exists with 3 files + README
```

---

## Hard Constraints

```
✗ Do NOT touch content/articles/ or content/test-articles/
✗ Do NOT rebuild the home page from scratch — it's descale + ember replacement
✗ Do NOT delete Snowstorm.tsx (manifesto + BackgroundLayers depend on it)
✗ Do NOT touch R2 buckets, Vercel, or DNS
✗ Do NOT rename or delete hero-mountain.jpg on R2 (Axis B)
✗ Do NOT modify author byline (Natapol / นาถ stays)
✗ Do NOT drop `ก็` from the subhead — it creates the paradox structure
✗ Do NOT change the color palette — navy + amber primary, teal accent only
✗ Do NOT create multiple commits when one logical change covers everything
✓ ONE atomic commit: "feat: home page rebrand — ember-glow hero + master tagline (ดูเนื้อ ไม่ดูหน้า)"
✓ Git tag BEFORE touching code — recovery point is mandatory
✓ If anything outside the listed scope needs editing, STOP and ask
```

---

## Risks + Rollback

| Risk | Likelihood | Mitigation |
|---|---|---|
| EmberGlow performance regression vs Snowstorm | Low | Particle count is lower (~50 vs 150); if jank appears, halve count |
| Thai logo tagline crowding at small size | Medium | Typography spec already adjusted (text-xs, tracking-wide, font-prompt). Review at deploy; further tweaks are cheap. |
| Manifesto page breaks | Blocked by design | Snowstorm.tsx stays in place; scope explicitly excludes manifesto |
| Subhead ships without `ก็` | Low | Hard constraint + verification checkbox |
| Executor tries to "improve" mountain copy instead of replacing | Low | One atomic commit rule + explicit strip list |

**Rollback path:**

```bash
# If home page regresses, full revert:
git revert <phase-6-sha>
# Vercel auto-deploys previous build in ~60s.

# If only the mountain hero needs back on home temporarily:
git checkout hero/mountaineer-v1 -- components/HomeContent.tsx
git commit -m "temp: restore mountaineer hero while we fix <thing>"
```

---

## Handoff Prompt (for Sonnet 4.6 or DeepSeek V4 Pro)

```
Execute Phase 6 of the beef.im rebrand (HOME page — code only).

Context: read docs/beef-im-home-rebrand-plan.md for the full plan.
Prerequisite phases 0–5 of infra rebrand are complete. Voice-DNA v6.0
and constitution v5.0 are locked. Tagline copy is locked — do not
re-litigate, use verbatim from the plan's "Key decisions" table.

Scope:
1. Phase 6.1 — preservation (git tag + move HeroHUD to _legacy, extract
   MountainHero.tsx, write README)
2. Phase 6.2 — create components/EmberGlow.tsx (retuned Snowstorm logic)
3. Phase 6.3 — rewrite components/HomeContent.tsx (strip mountain,
   insert new hero stack with ก็ preservation)
4. Phase 6.4 — Navbar tagline + menu subs + Footer quote swap
5. Phase 6.5 — /articles subtitle addition (optional, skip if header
   structure unclear)
6. Phase 6.6 — grep sweep + sanity check

Hard constraints (see plan §"Hard Constraints"):
- One atomic commit titled: "feat: home page rebrand — ember-glow hero
  + master tagline (ดูเนื้อ ไม่ดูหน้า)"
- Do NOT delete Snowstorm.tsx (manifesto depends on it)
- Do NOT touch content/articles/, R2, Vercel, DNS, author byline, palette
- PRESERVE `ก็` in subhead — this is a Thai grammar requirement, not optional
- Git tag hero/mountaineer-v1 BEFORE touching code

Workflow:
1. Read the plan doc fully
2. `git tag hero/mountaineer-v1 && git push origin hero/mountaineer-v1`
3. Ask user to take the screenshot (or do it yourself if browser-tool available)
4. Create components/_legacy/hero-mountaineer/ with MountainHero.tsx + HeroHUD.tsx + README
5. Build components/EmberGlow.tsx per the spec table
6. Rewrite HomeContent.tsx per the strip list + insert block
7. Navbar + Footer edits per the before/after blocks
8. Articles page subtitle (optional — skip if page structure unclear)
9. Grep sweep to confirm no stragglers outside _legacy
10. Commit atomically via Melkor Save Protocol (dept + parent pointer)
11. Report diff stat + verification checklist

If anything outside the 6 listed files looks like it needs updating,
STOP and ask. No creative edits.
```

---

## Related

- [beef-im-infra-plan.md](./beef-im-infra-plan.md) — Phases 0–5 (infra + code rebrand + 404)
- [beef-im-rebrand-brief.md](./beef-im-rebrand-brief.md) — full rebrand decision record
- [brainstorm/](./brainstorm/) — 6-model tagline workshop outputs
- [../nerd/pillars/voice-dna.md](../nerd/pillars/voice-dna.md) — voice DNA v6.0
- [../.claude/rules/visuals.md](../.claude/rules/visuals.md) — palette + typography rules
- [../.claude/rules/thai-model-routing.md](../.claude/rules/thai-model-routing.md) — GLM redemption shipped in commit `eecc963`
- Tag `hero/mountaineer-v1` — pre-Phase-6 recovery point (created during 6.1.1)

---

## Future scope (explicitly NOT Phase 6)

| Item | Why later |
|---|---|
| `/about` page built from `_legacy/hero-mountaineer/MountainHero.tsx` | Needs its own design pass (what goes around the mountain hero?) |
| Manifesto page: Snowstorm → EmberGlow migration | Needs manifesto-content rebrand first |
| R2 asset cleanup: `hero-mountain.jpg` → archive | Axis B — user operation, not code |
| Article template: `เนื้อๆ ไม่มีน้ำ` as footer signature | Separate scope — article template is its own consideration |
| `components/BackgroundLayers.tsx` — verify usage, possibly delete if unused | Low priority cleanup |

---

*Plan authored 2026-04-25 by Opus 4.7. Execution target: Sonnet 4.6 or DeepSeek V4 Pro. Estimated 2–3 hours end-to-end (preservation + code + sweep + commit).*
