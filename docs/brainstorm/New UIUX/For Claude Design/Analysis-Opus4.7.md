# beef.im UI/UX Brainstorm — Analysis & Shortlist

**Author:** Opus 4.7 (official Claude Code CLI)
**Date:** 2026-04-25
**Inputs analyzed:** 13 LLM proposals in `docs/brainstorm/New UIUX/`
**Visual companion:** `Preview-Opus4.7.html` — palette swatches + interface mockups for the 5+1 shortlist (open in browser)

---

## Context

After Phase 6 shipped on `beef.im` (DeepSeek V4 Pro plan execution `9ac9b27` → 5 post-review tweak commits → final at `3c8b871`), the home still inherits the old Nerd-with-Nart mountaineer skeleton — even with the rebrand paint job, the underlying design carries baggage from a different brand era. The user described it as "driving with the handbrake on" and ran a from-scratch UI/UX brainstorm across 13 LLMs to explore alternatives that start from beef.im's actual brand (forensic insurance teardowns + casual meat/cooking content, mass-affluent Thai 35+, mobile-first).

This file is the comparative analysis of all 13 outputs.

---

## 1. Bake-off matrix

Five axes, 1–5 scale.

- **Brand Fit** — does the dual-content (insurance forensics + meat) actually unify, or does it work for one half and force the other?
- **Thai Typography** — depth of Thai-font reasoning (named with weights, x-heights, mobile-sunlight context) vs. checkbox listing
- **Originality** — uncopyable in the Thai finance landscape, or convergent/derivative
- **Buildability** — solo Next.js + Tailwind realism; specific CSS/timing/intersection thresholds and reduced-motion handling
- **Editorial Depth** — info architecture, layout instinct, mobile fallbacks, honest trade-off analysis

| # | Model | Brand Fit | Thai Typo | Originality | Buildability | Editorial Depth | **Total** |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | **GPT-5.4** | 5 | 5 | 5 | 5 | 5 | **25** |
| 2 | **DeepSeek V4 Flash** (direct API) | 5 | 5 | 5 | 4 | 5 | **24** |
| 2 | **DeepSeek V4 GO max** (OpenCode Go) | 5 | 5 | 5 | 4 | 5 | **24** |
| 2 | **Sonnet 4.6** (CC CLI) | 5 | 5 | 5 | 4 | 5 | **24** |
| 5 | **Opus 4.7** (CC CLI) | 5 | 4 | 4 | 4 | 5 | **22** |
| 5 | **GLM 5.1** | 5 | 4 | 5 | 4 | 4 | **22** |
| 7 | **Opus 4.6** (Merlin) | 5 | 4 | 4 | 4 | 4 | **21** |
| 8 | **DeepSeek V4 Pro** (direct API) | 4 | 4 | 4 | 3 | 4 | **19** |
| 8 | **Sonnet 4.6** (Merlin) | 4 | 4 | 3 | 4 | 4 | **19** |
| 10 | **Kimi K2.6** | 4 | 4 | 3 | 3 | 3 | **17** |
| 10 | **Qwen 3.5 Plus** | 4 | 3 | 4 | 3 | 3 | **17** |
| 10 | **MiniMax 2.7** ⚠️ | 4 | 3 | 4 | 3 | 3 | **17** |
| 13 | **Gemini 3.1** | 4 | 3 | 3 | 3 | 3 | **16** |

> **Note (corrected 2026-04-26):** Original parallel Read returned three result blocks in shuffled order, causing a circular three-way mix-up that swapped Opus 4.7 ↔ GPT-5.4 ↔ Gemini 3.1 attributions. The scores above stay attached to the content actually evaluated — only the model labels needed to swap. Verified by `grep` against source files. Full correction record in §5.

### Failure / quality notes

- **MiniMax 2.7 (⚠️):** Token-bleed in Direction 4 mood line — `深夜` (CJK) where Thai/English context expected `late-night`. Same failure mode as the 2026-04-21 bench rejection. Trustworthiness penalty even though proposal *content* is competent.
- **Sonnet 4.6 / Merlin vs. Sonnet 4.6 / CC CLI gap (19 vs. 24):** same model, different harness. Merlin's webapp stripped depth — fewer mobile-fallback notes, less Thai-typography reasoning, more derivative reference points (are.na, Teenage Engineering). The CC CLI version produced original Thai-vernacular thinking (Bangkok Zine, Cold Protocol). **Harness matters more than model here.**
- **Opus 4.6 / Merlin scored 21** — also harness-degraded vs. what Opus would deliver via CC CLI, but survived Merlin better than Sonnet did.

### Cost-adjusted note

DeepSeek V4 Flash and DeepSeek V4 GO max both tied for 2nd at score 24, matching Opus 4.7-tier output. DeepSeek V4 GO max ran on the **$10/mo OpenCode Go cap**, not pay-per-token — meaningful for the next time this kind of brainstorm runs.

---

## 2. Convergence map

### Strong convergent themes (high signal — multiple models independently arrived here)

| Theme | Count | Read |
|---|:-:|---|
| **Dark canvas + single warm/ember accent** | ~19 directions across 12 models | The obvious "premium serious" register. Almost universal because it's the safest reach for both halves. **High convergence = lowest novelty.** Penalized hard by mobile-sunlight constraint. |
| **Editorial broadsheet / newspaper layout** | 9 directions | Strong signal that content-platform metaphor (Bloomberg/FT/Monocle) reads as the most defensible structure for dual-content authority. |
| **Forensic / annotated legal document** | 7 directions | Picks up the brand's actual founding edge (contract teardowns) — high alignment with the unit-linked rescue history. |
| **Stamp / seal / grade badge as dual-use motif** | 7 directions | The single most structurally valuable convergent idea. The SAME visual element legitimately works for both `WELL MARBLED` (steak) and `OVERWEIGHT` (whole life), or for `ค่าเบี้ย ≤ 15,000/ปี` (insurance) and `เวลาย่าง: 12 นาที` (recipe) — solving the dual-content problem at the component level, not just the moodboard level. |
| **Spec-card / data-instrument / verdict-before-argument** | 7 directions | Thesis: present the grade *first*, the argument *after*. Mirrors how analysts actually read. |
| **Marginalia / footnote rail** | 6 directions | Recurs as the natural way to layer evidence onto narrative. |

### Wildcard convergence (3+ models)

| Wildcard concept | Models |
|---|---|
| **Thermal printer / receipt** | Qwen, GPT-5.4, Gemini 3.1 (Direction 5) |
| **Government / official document** | Sonnet 4.6 / Merlin (Living Contract), Opus 4.6 / Merlin (Live Ticker — adjacent), GLM (Cold Chain compliance reading) |
| **Cold storage / lab specimen** | DeepSeek V4 Flash (Abattoir Archive), Kimi (Marbling), GLM (Cold Chain), MiniMax (Butcher's X-Ray) |

The fact that wildcards converge too means there's a coherent "more radical beef.im" sitting just past the conservative options.

### Idiosyncratic / one-off proposals (low convergence — possibly missed signal)

| Direction | Model | Why it might matter |
|---|---|---|
| **Yaowarat Code** | DeepSeek V4 Flash | Bangkok street-typographic vernacular as design language. No other model went here. Genuinely Thai-cultural, hard to copy. |
| **Bangkok Zine** | Sonnet 4.6 (CC CLI) | Pratunam shophouse signage — the typography of mass-affluent Thai readers' actual neighborhoods. Inverts expectations. |
| **แกะสลัก / Engraved** | DeepSeek V4 GO max | Sukhothai stone inscription register. The only Thai-historical-material direction. Maps `ดูเนื้อ ไม่ดูหน้า` literally as *what's carved lasts; what's painted fades*. |
| **Temperature Grade** | GLM 5.1 | Heat-map gradient bar where insurance risk AND meat doneness use the SAME color spectrum. The single most genuinely novel cross-content information-design unification. |
| **Open Market** | Opus 4.6 / Merlin | Or Tor Kor market metaphor with mixed Thai+English price-tag labels as connective tissue. Thai-vernacular variant of the badge mechanic. |
| **Thai Modernist** | Qwen 3.5 Plus | 1970s Thai architecture as design language. Local but globally legible. |
| **Rice Paper & Ink** | DeepSeek V4 Pro | Thai literary quarterly + red ตราประทับ stamp. Only **light** direction picked as a top. |
| **Marbled Glass / The Marbling** | GPT-5.4 / Kimi | Translucent layers as literal cross-domain metaphor (legal contract layers AND fat marbling). |

### What nobody proposed (the negative space is also signal)

- Skeuomorphic-meat or skeuomorphic-money UI — every model correctly avoided. Validates the constitution.
- Motion-heavy / WebGL / 3D — convergent restraint. Validates that "premium" in 2026 ≠ animated.
- Social-feed-first homepage — nobody proposed Instagram-style. The brand's positioning as a publication, not a feed, is locked across all models.
- **Dual-mode toggle** ("switch between insurance mode and cooking mode"). Zero models proposed this. **Strong negative signal:** the dual-content problem must be solved at the *visual-system* level, not by code-switching the UI.

---

## 3. Shortlist — top 5 + swing alt

Selected from across all 65 directions (not just the top picks). Optimized for: actually shippable solo, solves dual-content at the system level, mobile-sunlight friendly, distinct from each other so the real range is visible.

### Pick 1 — **Investment Grade** (Sonnet 4.6 / CC CLI)

**Why:** The rating-badge system (`OVERWEIGHT` for whole life, `WELL MARBLED` for ribeye, identical 72×24px IBM Plex Mono, identical position) is the cleanest solution to the dual-content problem in the entire bake-off. It doesn't translate the visual language between content types — it *unifies* them at the component level. IBM Plex full family is the only production-complete Thai+Latin system that passes both institutional-credibility and mobile-readability tests today.

**Why ship:** Lowest custom-build cost (existing typeface infrastructure, no exotic fonts to license). Highest defensibility (institutional vocabulary signals "I ran the analysis"). Brand-thesis enacted: every piece of content gets a verdict.

**Trade-off (Sonnet's own honest flag):** *"The visual system protects nothing — it amplifies whatever the writing is. If the writing is hot, it becomes a weapon. If the writing is safe, it becomes a liability brochure."* Format risk: defaults to KBank wealth-management feel if voice slips into formal advisory register. Voice discipline is non-negotiable here.

### Pick 2 — **Docket#** (DeepSeek V4 Flash)

**Why:** Most direct enactment of the brand's founding edge (contract forensics from the unit-linked rescue history). Annotated-margin UI makes the credibility *visible in every interaction* — the user doesn't have to read "we analyze contracts," the interface proves it. Red-line draw on hover is memorable enough to be brand shorthand.

**Why ship:** Strongest *thesis-to-design* mapping. The forensic register is genuinely novel for Thai finance content — nobody is doing scotusblog-style annotation on insurance.

**Trade-off:** Cooking content reads slightly less native — margin annotations on a grill recipe become "chef's notes" rather than legal markup. Acceptable because ~80% of trust-building content is forensic; cooking lives in a slightly adapted variant. Less mobile-elegant than Pick 1 (the 70/30 marginalia split collapses to expandable inline markers, which loses some of the visual argument).

### Pick 3 — **Weekend Dossier** (GPT-5.4)

**Why:** The most durable system for a 5-year horizon. Light background = mobile-sunlight readable by default (a real beef.im constraint). Annotation-based depth instead of heavy motion = won't trend-date. Carries investigative teardown, explainer, opinion, interview, AND recipe in one editorial language without ever feeling like two brands sharing one CMS — which is the actual editorial reality of the platform.

**Why ship:** Best long-term durability. Highest editorial flexibility. FT Weekend × buy-side memo × cookbook margin is a precise structural analog for what beef.im actually publishes.

**Trade-off (GPT-5.4's own honest flag):** *"Less instantly theatrical than Heat Haze and less aggressively ownable than Clause Block. You accept that trade in exchange for a system that can still feel premium five years from now, not just bold at launch."*

### Pick 4 — **Temperature Grade** (GLM 5.1)

**Why:** The single most genuinely novel idea across all 13 outputs that solves the dual-content problem. The heat-map bar (`#3B7DD8` safe → `#F5A623` caution → `#E8482F` critical) is *literally* the same chart for "insurance risk level" and "meat doneness level." It's not a metaphor — it's a shared information-design language. You can scan the homepage and "read" the temperature of every article before clicking.

**Why ship:** Highest originality + structural payoff. Editorial process becomes self-disciplining (every article gets assigned a temperature value). Wildcard potential: the temperature spectrum becomes the brand's signature visual asset — recognizable in screenshots before the brand mark is.

**Trade-off:** Requires editorial discipline to commit to a temperature value per article (some pieces won't fit cleanly — explainer content has no obvious "risk level"). Color must be carefully tested for color-blind accessibility (the blue → amber → red gradient compresses for deuteranopia). Higher upfront design system cost than Picks 1–3.

### Pick 5 — **แกะสลัก / Engraved** (DeepSeek V4 GO max)

**Why:** The only direction that owns *Thai cultural depth* as a design system, not as decoration. Sukhothai inscription register, gold-leaf accents, carved-stone tactile minimalism with one-directional inner shadows replacing every box-shadow on the site. The brand thesis `ดูเนื้อ ไม่ดูหน้า` rendered as: *what's carved lasts; what's painted fades*. Fonts (Sarabun ExtraBold + Fraunces Black) at -0.03em tracking carry the monolithic stone presence at scale.

**Why ship:** Deepest cultural ownership. Genuinely uncopyable by any non-Thai brand. Highest "you'd recognize it from across the room" score.

**Trade-off (DeepSeek V4 GO max's own honest flag):** *"The inset/chiseled visual language is harder to execute consistently across browsers — `box-shadow: inset` stacking behaves differently on Safari vs. Chrome at sub-pixel widths. Demands disciplined QA and a strict CSS variable system. Mobile spacing discipline (200px+ section gaps) means fewer elements above the fold."* Highest execution risk of the five.

### Swing alt — **Open Market** (Opus 4.6 / Merlin)

Same structural job as Pick 1 (one component unifies dual content), different cultural register. Worth seeing side-by-side before committing to Pick 1.

| | Investment Grade (Pick 1) | Open Market (alt) |
|---|---|---|
| Bridging component | Rating badge: `OVERWEIGHT` / `WELL MARBLED` | Price-tag label: `ค่าเบี้ย ≤ 15,000/ปี` / `เวลาย่าง: 12 นาที` |
| Vocabulary | English uppercase, equity-research register | Mixed Thai+English, Or Tor Kor market register |
| Unifies via | **Verdict** (every piece is graded) | **Parameter** (every piece is scannable by key spec) |
| Reads as | Goldman Sachs analyst | Bangkok market vendor with credentials |
| Brand-voice fit | Forensic credibility ✓ but corporate-insurance risk | Native casual register ✓ but quieter authority |
| Layout | Dense 3-col research-report | Pinterest-style masonry, 3–4 col desktop |

**The honest call:** Investment Grade aligns with beef.im's *founding edge* (forensic verdicts). Open Market aligns with beef.im's *current voice* (casual register, "post whatever feels right"). Real fork — worth deciding before any more design work.

### Shortlist coverage map

| Pick | Register | Background | Risk profile | Best at |
|---|---|---|---|---|
| 1 — Investment Grade | Institutional research | Light | Low (writing-dependent) | Defensibility |
| 2 — Docket# | Legal-forensic | Light | Medium (cooking adapts) | Brand-thesis enactment |
| 3 — Weekend Dossier | Editorial dossier | Light | Low | 5-year durability |
| 4 — Temperature Grade | Information-design | Light | Medium (editorial discipline) | Originality + dual-content |
| 5 — Engraved | Thai-historical tactile | Warm light | High (execution) | Cultural ownership |
| Alt — Open Market | Thai market vernacular | Light | Low | Voice-native dual-content |

All six are **light-background**. The mobile sunlight constraint quietly eliminated the dark+ember cluster that converged most heavily across the 13 outputs. The herd's most popular direction is also the one most punished by the actual reader context.

**Recommended decision sequence:**
1. Decide register: institutional (Pick 1) vs. vernacular (Open Market alt). This is the biggest fork.
2. Decide structural skeleton: Weekend Dossier (Pick 3) is the most durable container — almost any of the other picks can layer their signature component on top of it.
3. Decide signature mechanic: badge/tag (Pick 1 or Open Market), margin annotation (Pick 2), temperature bar (Pick 4), or stone-carved relief (Pick 5).

---

## 4. Source files reference

| File | Model | Top pick | Rank |
|---|---|---|:-:|
| `UI-Idea-GPT5.4.md` | GPT-5.4 | Weekend Dossier | 1 |
| `UI-Idea-Deepv4FlashHigh.md` | DeepSeek V4 Flash (direct API) | Docket# | 2 |
| `UI-Idea-DeepV4GOmax.md` | DeepSeek V4 (OpenCode Go) | แกะสลัก / Engraved | 2 |
| `UI-Idea-Sonnet4.6.md` | Sonnet 4.6 (CC CLI) | Investment Grade | 2 |
| `UI-Idea-OPUS4.7.md` | Opus 4.7 (CC CLI) | Spec Sheet | 5 |
| `UI-Idea-GLM5.1.md` | GLM 5.1 | Hearth Cut | 5 |
| `UI-Idea-Opus4.6merlin.md` | Opus 4.6 (Merlin webapp) | Slow Burn | 7 |
| `UI-Idea-Deepv4Pro.md` | DeepSeek V4 Pro (direct API) | Rice Paper & Ink | 8 |
| `UI-Idea-Sonnet4.6merlin.md` | Sonnet 4.6 (Merlin webapp) | Brutalist Ledger | 8 |
| `UI-Idea-KimiK2.6.md` | Kimi K2.6 | Cinder & Ink | 10 |
| `UI-Idea-QWEN3.5PLUS.md` | Qwen 3.5 Plus | Charcoal & Ember | 10 |
| `UI-Idea-MiniMax2.7.md` | MiniMax 2.7 ⚠️ | Paper Provenance | 10 |
| `UI-Idea-Gemini3.1.md` | Gemini 3.1 | The Broadsheet Cut | 13 |
| `UI-Idea-DeepV4FlashGOmax.md` | DeepSeek V4 Flash (OpenCode Go) | Slaughterhouse Chic / The Dossier / Ember / Tabloid / Immersion Tank · top pick TBD | — |

> **Note:** `UI-Idea-DeepV4FlashGOmax.md` was added to the folder after this analysis was originally compiled. Not yet graded against the same rubric.

---

## 5. Corrections to earlier passes

- **Opus 4.6 / Merlin DNF was wrong.** Initial read returned content that matched Sonnet 4.6 / Merlin's tail — almost certainly a tool/cache artifact at the time of first read, since a later re-read confirmed a full 5-direction output (Charcoal Service / Morning Edition / Concrete Set / Slow Burn / Open Market, top: Slow Burn, wildcard: Live Ticker). Re-graded at 21. **Open Market specifically surfaced the Thai-vernacular variant of the badge mechanic, which is now in the shortlist as the swing alt to Pick 1.**

- **Three-way attribution mix-up between Opus 4.7, GPT-5.4, and Gemini 3.1 (corrected 2026-04-26).** When the original parallel Read of all 13 files happened, three result blocks came back in a different order than I assumed they would. Every subsequent reference inherited the flawed mapping. Verified by `grep` against actual file content:

  - Pavilion / Newsroom / Spec Sheet / Slow Cinema / Receipt + Hand-Drawn Lab Notebook wildcard → **Opus 4.7** (was attributed to Gemini 3.1)
  - Private Dining Ledger / Weekend Dossier / Clause Block / Heat Haze / Measured Vitality + Thermal Cartography wildcard → **GPT-5.4** (was attributed to Opus 4.7)
  - Broadsheet Cut / Ink & Iron / Midnight Smoke / Precision Instrument / Marbled Glass + Receipt wildcard → **Gemini 3.1** (was attributed to GPT-5.4)

  **Score implication:** GPT-5.4 was actually the highest-scoring output (25), Opus 4.7 was middle (22), Gemini 3.1 was lowest (16). The bake-off matrix in §1 reflects the corrected mapping. The shortlist designs are unchanged — Weekend Dossier is now correctly attributed to GPT-5.4 throughout, and Hand-Drawn Lab Notebook (Preview2) is correctly attributed to Opus 4.7's own wildcard.

- **A 14th file appeared after the original analysis** — `UI-Idea-DeepV4FlashGOmax.md` (Slaughterhouse Chic / The Dossier / Ember / Tabloid / Immersion Tank / Garment Label wildcard). Not yet graded against the same rubric.
