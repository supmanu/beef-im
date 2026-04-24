# Phase 6 Post-Review Tweaks — 2026-04-25

**Context:** Phase 6 plan was executed fully by DeepSeek V4 Pro (`9ac9b27`).
User reviewed on `beef.im` and requested optical + density adjustments.
All changes are in commits `98bebac` → `3489014`.

---

## Commits (chronological)

| Commit | What |
|--------|------|
| `9ac9b27` | Plan execution: ember hero, tagline swap, legacy preservation |
| `98bebac` | center hero/navbar text + 25% more ember particles |
| `caa6d3f` | center subhead + search bar; restore navbar left-align with optical nudge |
| `ac33650` | stronger optical nudge on logo brand name (-2px → -3px) |
| `c5bb0ed` | ember particle count 63 → 95 |
| `3489014` | **rewrite** EmberGlow from Snowstorm physics — invert fade, stronger sway/repel, 180 particles |

---

## What changed (from `9ac9b27` → `3489014`)

### components/HomeContent.tsx

| Line | Before | After | Why |
|------|--------|-------|-----|
| 23 | `max-w-5xl mx-auto px-6 w-full` | `+ text-center` | Hero h1 + sub-line share center axis — eliminates Prompt-vs-mono left-edge optical skew |
| 46 | `max-w-2xl font-light` | `max-w-2xl mx-auto font-light` | Subhead block centered in parent |
| 55 | `flex flex-col sm:flex-row gap-4` | `+ justify-center` | Search bar floats center |
| 58 | `flex-1 max-w-md` | `max-w-md w-full mx-auto` | `flex-1` fights centering; replaced with `mx-auto` |

### components/Navbar.tsx

| Line | Before | After | Why |
|------|--------|-------|-----|
| 58 | `justify-center text-center` | `justify-center` (no text-center) | Centering a corner-logo was wrong — reverts to `text-left` |
| 60 | `tracking-wide` | `tracking-wide ml-[-3px]` | Optical nudge: `ป` has negative-space left bearing vs `ด` in tagline |

### components/EmberGlow.tsx

**Full physics rewrite** from Snowstorm's proven particle system. Primary issue: fade formula was inverted, making particles invisible at the bottom where they spawn.

| Property | Plan commit (`9ac9b27`) | Final (`3489014`) | Reason |
|----------|------------------------|-------------------|--------|
| Count | `max(63, intensity×1.0)` → **63** | `120 + intensity` → **180** | Too sparse; Snowstorm had 190 |
| Fade | `(canvasH - y) / canvasH × 2` | `y < 100 ? max(0.05, y/100) : 1` | Was fading at bottom (invisible spawn), now fades only near top |
| Sway amplitude | `sin × 0.3` | `sin × 0.5` | Too subtle; now matches Snowstorm |
| Sway increment | `0.008` | `0.01` | Now matches Snowstorm |
| Drift | None | `random*0.3 - 0.15` per particle | Particles had no horizontal life; added Snowstorm-style drift |
| Mouse repel | `pushStrength = 0.8`, radius 120 | `pushStrength = 2`, radius 150 | Too weak; now matches Snowstorm |
| Speed range | `0.3 – 0.8` | `0.2 – 0.8` | Slightly wider bottom range |
| Radius range | `1.5 – 3.5` | `1.0 – 3.0` | Now matches Snowstorm |
| Opacity range | `0.2 – 0.6` | `0.3 – 0.8` | Now matches Snowstorm |
| Shadow opacity | `0.15` | `0.12` | Slightly dimmer glow to avoid over-saturating |

---

## Files NOT touched (correctly)

- `components/Snowstorm.tsx` — preserved (manifesto depends on it)
- `components/_legacy/hero-mountaineer/` — preserved as-is
- `content/articles/` — out of scope
- `components/ArticlesContent.tsx` — subtitle edit from plan only, no post-review changes
- `components/Footer.tsx` — quote swap from plan only
- `components/HeroHUD.tsx` — moved to `_legacy/`, untouched
- Author byline, R2 assets, Vercel/DNS — out of scope
- Palette — unchanged throughout

---

## What OPUS 4.7 should verify

1. `components/EmberGlow.tsx` — physics rewrite is correct, no regressions vs Snowstorm architecture
2. `components/HomeContent.tsx` — hero stack is fully centered (text-center + mx-auto chaining is consistent)
3. `components/Navbar.tsx` — `ml-[-3px]` optical nudge is sufficient; no further typography drift between `ป` and `ด`
4. No straggler imports (MountainHero, HeroHUD, Snowstorm) outside their approved locations
5. Commit structure is clean (5 post-review commits, all on the same logical change chain)

### Next moves to plan

- `/about` page mounting `_legacy/hero-mountaineer/MountainHero.tsx`
- Manifesto page: Snowstorm → EmberGlow migration
- Article template: `เนื้อๆ ไม่มีน้ำ` as footer signature
- `components/BackgroundLayers.tsx` — verify usage, possibly delete if unused
