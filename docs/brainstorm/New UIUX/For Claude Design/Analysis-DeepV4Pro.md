# beef.im UI/UX Brainstorm — Analysis & Shortlist (DeepSeek V4 Pro)

**Analyst:** DeepSeek V4 Pro (OpenCode CLI)
**Date:** 2026-04-25
**Inputs:** 13 LLM proposals in `docs/brainstorm/New UIUX/`
**Context:** Independent second analysis — the Opus 4.7 analysis hit a token limit. This is a fresh bake-off.

---

## 1. Bake-off Matrix (14 models)

Five axes, 1–5 scale:

- **Brand Fit** — does the dual-content (insurance forensics + meat/cooking) unify, or do the directions split?
- **Thai Typography** — depth of Thai-font reasoning: named weights, x-heights, mobile-sunlight context, specific script pairs
- **Originality** — uncopyable in the Thai finance landscape, or convergent/derivative
- **Buildability** — solo Next.js + Tailwind realism; CSS/timing specificity, reduced-motion handling
- **Editorial Depth** — info architecture, layout instinct, mobile fallbacks, honest trade-off analysis

| # | Model | Brand Fit | Thai Typo | Originality | Buildability | Editorial Depth | **Total** |
|---|-------|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | **OPUS 4.7** (CC CLI) | 5 | 5 | 5 | 5 | 5 | **25** |
| 2 | **DeepSeek V4 Flash** (direct API) | 5 | 5 | 5 | 4 | 5 | **24** |
| 2 | **DeepSeek V4 GO max** (OpenCode Go) | 5 | 5 | 5 | 4 | 5 | **24** |
| 2 | **Sonnet 4.6** (CC CLI) | 5 | 5 | 5 | 4 | 5 | **24** |
| 5 | **GLM 5.1** | 5 | 4 | 5 | 4 | 4 | **22** |
| 6 | **Opus 4.6** (Merlin webapp) | 5 | 4 | 4 | 4 | 4 | **21** |
| 7 | **DeepSeek V4 Flash GO max ⚡** (OpenCode Go) | 4 | 4 | 4 | 4 | 4 | **20** |
| 7 | **Gemini 3.1** | 4 | 4 | 4 | 4 | 4 | **20** |
| 9 | **DeepSeek V4 Pro** (direct API) | 4 | 4 | 4 | 3 | 4 | **19** |
| 10 | **Sonnet 4.6** (Merlin webapp) | 4 | 4 | 3 | 4 | 4 | **19** |
| 11 | **GPT-5.4** | 4 | 3 | 4 | 3 | 4 | **18** |
| 12 | **Kimi K2.6** | 4 | 4 | 3 | 3 | 3 | **17** |
| 12 | **Qwen 3.5 Plus** | 4 | 3 | 4 | 3 | 3 | **17** |
| 12 | **MiniMax 2.7** ⚠️ | 4 | 3 | 4 | 3 | 3 | **17** |

### Quality notes

- **DeepSeek V4 Flash GO max ⚡ (20):** Mid-pack but with a named violation. Direction 1 "Slaughterhouse Chic" uses the word "slaughterhouse" in the name and "blood-drip" as the animation metaphor — directly contradicting the prompt's hard rule against blood-and-cleaver imagery. The direct API Flash (24) internalized all rules cleanly; this Flash variant on OpenCode Go did not. The standout direction is **Tabloid** (Direction 4) — Thai Rath vernacular + Chakra Petch + ticker strip — which joins the Bangkok Zine/Yaowarat Code Thai-vernacular cluster. The **Garment Label** wildcard (rotating fashion-season palettes) is genuinely original. See §8 for the full OpenCode Go subscription comparison.
- **MiniMax 2.7 (⚠️):** Direction 4 uses `深夜` (CJK character) where Thai/English context expected. Same token-bleed failure mode as the 2026-04-21 bench rejection. Otherwise competent output (Paper Provenance is genuinely strong on Thai trust-signal reasoning).
- **Sonnet 4.6 CC CLI vs Merlin gap (24 vs 19):** Same model, different harness. Merlin's webapp version is noticeably thinner — less Thai-font reasoning, more derivative references (Teenage Engineering, are.na), missing the genuine cultural observations that the CC CLI version produced (Bangkok Zine, Cold Protocol, Investment Grade with IBM Plex deep dive). Harness matters more than model here.
- **GPT-5.4 Weekend Dossier:** Opus 4.7 independently proposed a direction with the same name and nearly identical DNA — broadsheet + cookbook margin + buy-side memo. This cross-model convergence is high signal. GPT-5.4's execution was competent but Thai typography reasoning was thin.
- **Opus 4.6 / Merlin at 21:** Harness-degraded from what Opus would deliver via CC CLI, but survived better than Sonnet did under the same constraint. Open Market (Direction 5) is the native Thai-vernacular price-tag direction — structurally important as the counterpoint to Investment Grade.

### Cost-adjusted note

DeepSeek V4 Flash (direct API) and DeepSeek V4 GO max (OpenCode Go) both tied for 2nd at score 24 with Opus 4.7-tier output. GO max ran on the **$10/mo OpenCode Go cap**, not pay-per-token — meaningful for repeat brainstorm sessions like this one. Flash (direct API) ran on pay-per-token. Flash GO max (OpenCode Go, 20) is the budget option — $10/mo, but 4 points weaker than the direct API version. For creative-strategic work, use the standard GO max on the subscription, not the Flash variant.

---

## 2. Convergence Map

### Strong convergent themes (high signal — multiple models independently arrived)

| Theme | Count | Read |
|---|---|---|
| **Dark canvas + single warm/ember accent** | ~20 directions across all 13 models | The "safe premium" answer. Convergence is so high it's the herd instinct, not insight. Penalized hardest by the mobile-sunlight constraint — none of the top-5 directions in my shortlist are dark-first. |
| **Editorial broadsheet/newspaper layout** | 9 directions | Strong signal that content-platform-as-publication (Bloomberg/FT/Monocle) reads as the most defensible structure for dual-content authority. |
| **Forensic/annotated legal document** | 7 directions | Picks up the brand's actual founding edge (contract teardowns from unit-linked rescue). |
| **Stamp/seal/grade badge as dual-use mechanic** | 7 directions | Single most structurally valuable convergent idea. Same visual element works for `WELL MARBLED` (steak) AND `OVERWEIGHT` (whole life) without code-switching. |
| **Spec-card / data-instrument / verdict-before-argument** | 7 directions | Thesis: present the grade *first*, the argument *after*. Mirrors how analysts actually read. |
| **Brutalist / typography-first / exposed-grid** | 5 directions | "Raw substance" aesthetic — visually enacts `เน้นเนื้อๆ ไม่เอาน้ำ`. |

### Wildcard convergence (3+ models)

| Theme | Models |
|---|---|
| **Thermal printer / receipt** | Opus 4.7 (Receipt), Gemini 3.1 (Receipt wildcard), Qwen (Receipt & Registry) |
| **Cold storage / lab specimen** | Flash (Abattoir Archive), GLM (Cold Chain), MiniMax (Butcher's X-Ray) |
| **Marbled / translucent layers** | Gemini (Marbled Glass), GPT-5.4 (Heat Haze), Kimi (The Marbling wildcard) |

The fact that wildcards converge too signals a coherent "more radical beef.im" sitting just past the conservative options. The receipt cluster is particularly interesting — three models independently landed on "thermal paper" as the metaphor that forces substance-first layout.

### Idiosyncratic / one-off (low convergence — possibly missed signal)

| Direction | Model | Why it matters |
|---|---|---|
| **Yaowarat Code** | DeepSeek V4 Flash | Bangkok street-typographic vernacular as design language. No other model went here. Genuinely Thai-cultural, hard to copy. |
| **Bangkok Zine** | Sonnet 4.6 (CC CLI) | Pratunam shophouse signage — the typography of mass-affluent Thai readers' actual neighborhoods. Sticker-label system with slap-on animation. |
| **Tabloid** | DeepSeek V4 Flash GO max | Thai Rath front-page density with Bloomberg Terminal energy. Chakra Petch Bold + Titillium Web. Ticker strip connecting insurance rates and recipe tips in one stream. Pull-quote explode interaction. Genuinely Thai-cultural tabloid register. |
| **แกะสลัก / Engraved** | DeepSeek V4 GO max | Sukhothai stone inscription register. Only Thai-historical-material direction. `ดูเนื้อ ไม่ดูหน้า` rendered as *what's carved lasts; what's painted fades*. One-directional inner shadows replace every box-shadow. |
| **Temperature Grade** | GLM 5.1 | Same gradient bar (`#3B7DD8` → `#F5A623` → `#E8482F`) means insurance risk level AND meat doneness. Single most genuinely novel dual-content unification across all 13 outputs. Not a metaphor — shared information-design language. |
| **Open Market** | Opus 4.6 (Merlin) | Or Tor Kor market metaphor — mixed Thai+English price-tag labels as connective tissue. Thai-vernacular variant of the badge mechanic. |
| **Thai Modernist** | Qwen 3.5 Plus | 1970s Thai architecture as design language. Local but globally legible. Thick-framed content with slide-and-lock mechanics. |
| **Rice Paper & Ink** | DeepSeek V4 Pro | One of the few LIGHT-first Thai-literary directions. Red ตราประทับ stamp system as dual-use trust mechanic. Sarabun body + washi paper warmth. |
| **ก๋วยเตี๋ยวเรือ at 4AM** | DeepSeek V4 Pro wildcard | Fluorescent-lit wet market chaos. Surgical cyan + steamed-rice white + pink plastic stool cards. Too unhinged to ship but the ONLY direction that captures the actual sensory experience of 4am Bangkok — which is where serious food people actually are. |
| **Living Terminal** | Sonnet 4.6 (CC CLI) wildcard | Full Thai monospaced financial instrument UI — Refinitiv Eikon in Thai. IBM Plex Mono Thai for everything including body copy. Insane but memorable. |
| **Living Contract** | Sonnet 4.6 (Merlin) wildcard | Entire site as Thai Government Gazette document — ข้อ 1, ข้อ 2, clause indentation, margin stamps. Radical thesis: the most subversive thing is to look exactly like the documents you're teaching readers to read. |

### What nobody proposed (negative space is also signal)

- **Skeuomorphic meat/money UI** — zero models. Correct restraint.
- **WebGL / 3D / motion-heavy** — zero models proposed heavy motion. Convergent restraint: premium in 2026 ≠ animated.
- **Social-feed-first homepage** — nobody proposed Instagram-style. Validates that the brand is a publication, not a feed.
- **Dual-mode toggle** ("switch between insurance mode and cooking mode") — **zero models proposed this.** Strong negative signal: the dual-content problem must be solved at the *visual-system* level, not by code-switching the UI.
- **Mountaineering/expedition** — zero violations of the hard rule. The prompt's hard-rules block worked.
- **Retro synthwave** — zero. Overdone-in-2026 call was correct.

---

## 3. Shortlist — Top 6 + Decision Framework

Selected from across all 65 directions. Optimized for: actually shippable solo, solves dual-content at the system level, mobile-sunlight friendly, distinct from each other.

### Pick 1 — **Investment Grade** (Sonnet 4.6 / CC CLI)

**Why:** The rating-badge system (`OVERWEIGHT` for policies, `WELL MARBLED` for cuts, identical 72×24px IBM Plex Mono, identical position) is the cleanest dual-content unifier in the entire bake-off. It doesn't *translate* between content types — it *unifies* them at the component level. IBM Plex full family is the only production-complete Thai+Latin type system that passes institutional-credibility AND mobile-readability tests simultaneously.

**Why ship:** Lowest custom-build cost (existing typeface infrastructure, no exotic fonts to license). Highest defensibility (institutional vocabulary signals "I ran the analysis"). Rating badge IS the brand thesis enacted — every piece of content gets a verdict.

**Trade-off (Sonnet's own honest flag):** "The visual system protects nothing — it amplifies whatever the writing is. If the writing is hot, it becomes a weapon. If the writing is safe, it becomes a liability brochure." Defaults to KBank wealth-management feel if voice slips into formal advisory register. Voice discipline is non-negotiable.

---

### Pick 2 — **Docket#** (DeepSeek V4 Flash)

**Why:** Most direct enactment of the brand's founding edge (contract forensics from unit-linked rescue history). Annotated-margin UI makes credibility *visible in every interaction* — the user doesn't have to read "we analyze contracts," the interface proves it. Red-line draw on hover (`stroke-dasharray` animation + `✓` stamp reveal) is memorable enough to become brand visual shorthand.

**Why ship:** Strongest thesis-to-design mapping. Forensic register is genuinely novel for Thai finance — nobody does scotusblog-style annotation on insurance.

**Trade-off:** Cooking content sits slightly less native — margin annotations on a grill recipe read as "chef's notes" rather than legal markup. Acceptable because ~80% of trust-building content is forensic. Mobile less elegant than Pick 1 (70/30 marginalia split collapses to expandable inline markers, losing some visual argument).

---

### Pick 3 — **แกะสลัก / Engraved** (DeepSeek V4 GO max)

**Why:** The only direction that owns *Thai cultural depth* as a design system, not decoration. Sukhothai inscription register, gold-leaf accents, carved-stone tactile minimalism with one-directional inner shadows replacing every box-shadow on the site. `ดูเนื้อ ไม่ดูหน้า` rendered literally as: *what's carved lasts; what's painted fades*. Sarabun ExtraBold + Fraunces Black at -0.03em tracking carry the monolithic stone presence.

**Why ship:** Deepest cultural ownership. Genuinely uncopyable by any non-Thai brand. Highest "recognize from across the room" score. Light background works in sunlight.

**Trade-off (GO max's own honest flag):** "The inset/chiseled visual language is harder to execute consistently across browsers — `box-shadow: inset` stacking behaves differently on Safari vs. Chrome at sub-pixel widths. Demands disciplined QA and a strict CSS variable system. Mobile spacing discipline (200px+ section gaps) means fewer elements above the fold." Highest execution risk of the six.

---

### Pick 4 — **Temperature Grade** (GLM 5.1)

**Why:** The single most genuinely novel idea across all 13 outputs that solves the dual-content problem. The heat-map bar (`#3B7DD8` safe → `#F5A623` caution → `#E8482F` critical) is *literally* the same chart for "insurance risk level" and "meat doneness level." Not a metaphor — shared information-design language. Reader can scan the homepage and "read" the temperature of every article before clicking.

**Why ship:** Highest originality + structural payoff. Editorial process becomes self-disciplining (every article gets assigned a temperature). Wildcard potential: the temperature spectrum becomes the brand's signature visual asset — recognizable in screenshots before the brand mark.

**Trade-off:** Requires editorial discipline to commit temperature values (some explainer content has no obvious "risk level"). Color must be tested for color-blind accessibility (blue→amber→red gradient compresses for deuteranopia). Higher upfront design system cost than Picks 1–3. The gradient needs careful QA to not read as a generic SaaS dashboard.

---

### Pick 5 — **Bangkok Zine** (Sonnet 4.6 / CC CLI) + **Yaowarat Code** (DeepSeek V4 Flash) — Grouped Pick

**Why:** These two directions share a thesis: *use the typographic vernacular that Thai mass-affluent readers actually grew up in*. Bangkok Zine deploys Pratunam shophouse signage, sticker labels with slap-on animation, Bai Jamjuree Black at commercial scale. Yaowarat Code uses character collisions, aggressive typographic scale, and asymmetric layouts borrowed from Bangkok's Chinatown. Both are genuinely Thai-cultural in a way that no Western/regional brand can replicate.

**Why ship:** High-rigor forensic content wrapped in a commercial-street visual wrapper *is* the brand paradox enacted. The density says "we have things to tell you" without performing seriousness. Sticker labels (`วิเคราะห์แล้ว`, `ผ่านแล้ว`, `ไม่ผ่าน`) are a native Thai trust-signal system — every reader has been reading price stickers and certification badges their whole life.

**Trade-off:** Density and visual energy can tip into chaos without strong editorial discipline. Needs a heavy-handed grid underneath the apparent chaos — the tension between street energy and structural rigor must be real, not faked with randomness. Less "calm premium" than other picks — a deliberate trade.

---

### Swing alt — **Open Market** (Opus 4.6 / Merlin)

| | Investment Grade (Pick 1) | Open Market (alt) |
|---|---|---|
| Bridging component | Rating badge: `OVERWEIGHT` / `WELL MARBLED` | Price-tag label: `ค่าเบี้ย ≤ 15,000/ปี` / `เวลาย่าง: 12 นาที` |
| Vocabulary | English uppercase, equity-research register | Mixed Thai+English, Or Tor Kor market register |
| Unifies via | **Verdict** (every piece is graded) | **Parameter** (every piece is scannable by key spec) |
| Reads as | Goldman Sachs analyst | Bangkok market vendor with credentials |
| Brand-voice fit | Forensic credibility ✓ but corporate-insurance risk | Native casual register ✓ but quieter authority |
| Layout | Dense 3-col research report | Pinterest-style masonry, 3–4 col desktop |

**The honest call:** Investment Grade aligns with beef.im's *founding edge* (forensic verdicts from unit-linked rescue). Open Market aligns with beef.im's *current voice* (casual register, "post whatever feels right"). This is the biggest philosophical fork in the entire bake-off. Worth deciding before any design work.

---

### Shortlist coverage map

| Pick | Register | Background | Risk | Best at |
|---|---|---|---|---|
| 1 — Investment Grade | Institutional research | Light | Low (writing-dependent) | Defensibility + dual-content |
| 2 — Docket# | Legal-forensic | Light | Medium (cooking adapts) | Brand-thesis enactment |
| 3 — Engraved | Thai-historical tactile | Warm light | High (execution) | Cultural ownership |
| 4 — Temperature Grade | Information-design | Light | Medium (editorial discipline) | Originality + scannability |
| 5 — Bangkok Zine / Yaowarat | Thai street vernacular | Dark | Medium (chaos discipline) | Cultural authenticity |
| Alt — Open Market | Thai market vernacular | Light | Low | Voice-native dual-content |

**All six primary picks are light-background or warm-light.** The mobile sunlight constraint quietly eliminated the dark+ember cluster that converged most heavily across all 13 models. The herd's most popular direction is the one most punished by actual reader context — reading on a phone outdoors in Bangkok.

---

## 4. Recommended Decision Sequence

1. **Decide register:** institutional (Pick 1) vs. vernacular (Alt Open Market). This is the biggest fork. It determines whether the design DNA is equity-research (English caps, IBM Plex, dense grids) or market-stall (mixed Thai+English, price tags, masonry).

2. **Decide structural skeleton:** Pick 1's 3-col research report layout, Pick 2's marginalia system, Pick 5's dense zine grid. Multiple picks can layer their signature component (badges, annotations, temperature bars) onto different skeletons.

3. **Decide signature mechanic:**
   - Rating badge (Pick 1 / Alt) — unified verdict across content types
   - Margin annotation (Pick 2) — forensic credibility visible in every interaction
   - Temperature bar (Pick 4) — scannable content preview
   - Stone-carved relief (Pick 3) — deep cultural ownership
   - Sticker labels (Pick 5) — native Thai trust signal

4. **Optional wildcard layer:** Lift a single specific technique from any non-winning direction:
   - Film grain dissolve on section transitions (GO max, Direction 4 — Celluloid)
   - Single ember-only element per viewport (GO max, Direction 1 — ถ่าน)
   - Ink-bleed card hover (GO max, Direction 3 — ขาว-หมึก)
   - Scanner line down data tables (Sonnet CC, Direction 5 — Cold Protocol)
   - Hot-metal impression headline load (GO max, Direction 2 — หน้าหนังสือพิมพ์)

---

## 5. Model Output Quality Notes

### Models that exceeded expectations

- **DeepSeek V4 Flash:** Yaowarat Code is the single most original Thai-cultural direction in the entire bake-off. Docket# is the strongest thesis-to-design mapping. At Flash speed/cost. Score 24 matching Opus.
- **DeepSeek V4 GO max:** แกะสลัก/Engraved shows genuine Thai-historical depth (Ramkhamhaeng Stele, Sukhothai register). Five distinct registers. Score 24, running on $10/mo cap.
- **GLM 5.1:** Temperature Grade is the bake-off's most original cross-content idea. Despite lower overall polish, one direction that genuinely nobody else thought of.

### Models that performed as expected

- **Opus 4.7:** Gold standard. Five genuinely distinct registers, specific CSS implementations, honest trade-off analysis, no padding.
- **Sonnet 4.6 (CC CLI):** Investment Grade + Bangkok Zine are both top-tier. IBM Plex deep dive is the most thorough type reasoning. Living Terminal wildcard is genuinely memorable.

### Models that underperformed vs. reputation

- **Kimi K2.6:** Competent but generic. Three of five directions are dark+ember variants (Cinder & Ink, The Tenderizer, Low & Slow). Lacks original Thai-specific thinking beyond Omakase. The Marbling wildcard is interesting but WebGL-dependent (not buildable).
- **Qwen 3.5 Plus:** Thai Modernist is the standout — the rest are safe variants of dark+ember or broadsheet. Not bad, just convergent.
- **GPT-5.4:** Weekend Dossier is competent (cross-model convergent with Opus 4.7's proposal of same name). Thai typography reasoning is the weakest — doesn't engage with Thai font characteristics beyond checkbox listing.

### Harness degradation confirmed

| Model | CC CLI / API | Webapp (Merlin) | Gap |
|---|---|---|---|
| Sonnet 4.6 | 24 | 19 | -5 |
| Opus 4.6 | (not run CC CLI) | 21 | — |

Sonnet 4.6 Merlin consistently produces thinner output: less Thai-font reasoning, more derivative references, missing the genuine cultural observations. Confirms that for creative-strategic work, the native CLI harness matters more than the model.

---

## 6. Source Files Reference

| File | Model | Top pick | Score |
|---|---|---|---|
| `UI-Idea-OPUS4.7.md` | Opus 4.7 (CC CLI) | Spec Sheet | 25 |
| `UI-Idea-Deepv4FlashHigh.md` | DeepSeek V4 Flash (direct API) | Docket# | 24 |
| `UI-Idea-DeepV4GOmax.md` | DeepSeek V4 (OpenCode Go) | แกะสลัก | 24 |
| `UI-Idea-Sonnet4.6.md` | Sonnet 4.6 (CC CLI) | Investment Grade | 24 |
| `UI-Idea-GLM5.1.md` | GLM 5.1 | Hearth Cut | 22 |
| `UI-Idea-Opus4.6merlin.md` | Opus 4.6 (Merlin) | Slow Burn | 21 |
| `UI-Idea-DeepV4FlashGOmax.md` | DeepSeek V4 Flash GO max ⚡ (OpenCode Go) | Ember | 20 |
| `UI-Idea-Gemini3.1.md` | Gemini 3.1 | Broadsheet Cut | 20 |
| `UI-Idea-Deepv4Pro.md` | DeepSeek V4 Pro (direct API) | Rice Paper & Ink | 19 |
| `UI-Idea-Sonnet4.6merlin.md` | Sonnet 4.6 (Merlin) | Brutalist Ledger | 19 |
| `UI-Idea-GPT5.4.md` | GPT-5.4 | Weekend Dossier | 18 |
| `UI-Idea-KimiK2.6.md` | Kimi K2.6 | Cinder & Ink | 17 |
| `UI-Idea-QWEN3.5PLUS.md` | Qwen 3.5 Plus | Charcoal & Ember | 17 |
| `UI-Idea-MiniMax2.7.md` | MiniMax 2.7 ⚠️ | Paper Provenance | 17 |

---

## 7. My Top-Level Observations

**The dark-first consensus is wrong for this brand.** ~20 directions across all 14 models proposed dark backgrounds with warm accents. It's the "smart" answer — premium, serious, atmospheric. But beef.im's primary audience reads on mobile in Bangkok daylight. Light-background directions (Investment Grade, Docket#, Temperature Grade, Engraved) solve a real constraint the herd ignored. None of my shortlist picks are dark-first.

**The stamp/badge mechanic is the highest-signal convergent idea.** When 7 models independently converge on "one component that grades both insurance and meat," that's not noise — that's a design insight so strong it rang through 14 different reasoning engines. The fork is whether that component speaks institutional English (OVERWEIGHT) or vernacular Thai (ค่าเบี้ย ≤ 15,000).

**The best wildcards are more compelling than most top picks.** Living Contract (Thai Government Gazette format), ก๋วยเตี๋ยวเรือ at 4AM, Living Terminal (Bloomberg terminal in Thai), Cold Chain (FDA compliance pipeline), Garment Label (rotating fashion-season palettes) — these are more memorable and more brand-thesis-aligned than half the "safe" top picks across the baker's dozen. The lesson: the actual best direction for beef.im might be sitting in the wildcard section of any of these outputs, not in the top picks.

**Voice discipline is the linchpin.** Multiple directions (Investment Grade, Docket#, Yaowarat Code) are writing-dependent — the visual system amplifies whatever the writing is. If the voice slips into formal advisory register, Investment Grade becomes a KBank brochure. If the voice stays at `เน้นเนื้อๆ ไม่เอาน้ำ` conviction, it becomes a weapon. The design direction and the voice DNA must be locked together at the decision point — you cannot choose one and tune the other afterward.

---

## 8. OpenCode Go Subscription Evaluation (DeepSeek Variants)

This bake-off tested four DeepSeek routing configurations. The results form a clear hierarchy:

| Variant | Route | Score | Best direction | Gap vs direct API |
|---|---|---|---|---|
| DeepSeek V4 Flash | Direct API (pay-per-token) | 24 | Yaowarat Code / Docket# | — (baseline) |
| DeepSeek V4 GO max | OpenCode Go ($10/mo) | 24 | แกะสลัก / Engraved | 0 |
| DeepSeek V4 Pro | Direct API (pay-per-token) | 19 | Rice Paper & Ink | -5 (vs Flash) |
| DeepSeek V4 Flash GO max ⚡ | OpenCode Go ($10/mo) | 20 | Tabloid (top pick was Ember) | -4 (vs Flash) |

### What this means for future use

1. **The standard GO max on OpenCode Go ($10/mo) is equivalent to direct API Flash.** Both scored 24. If you're on the subscription, use GO max — not Flash GO max — for creative-strategic work like this brainstorm.

2. **Flash GO max on OpenCode Go ($10/mo, 20) is the budget option that comes with real quality degradation.** It produced a named hard-rule violation (Slaughterhouse Chic), picked the most convergent direction as its top pick (Ember), and its best contribution (Tabloid) is good but not exceptional. Save it for quick tagline generation or single-paragraph work — not multi-direction creative strategy.

3. **The Flash label indicates a faster/cheaper variant, not a smarter one.** Both on direct API (Flash=24 vs Pro=19) and on OpenCode Go (Flash=20 vs standard GO max=24), the "Flash" variants run thinner. They trade depth for speed.

4. **Direct API Pro (19) underperformed all other DeepSeek variants.** Rice Paper & Ink is a solid direction but the overall output was less original and less buildable than expected. This is the same model that successfully executed the Phase 6 rebrand commits — creative strategy seems to be a different capability profile than code execution.

### Recommendation

| Task type | Use |
|---|---|
| Creative-strategic brainstorm (like this) | DeepSeek V4 GO max (OpenCode Go) or DeepSeek V4 Flash (direct API) |
| Quick tagline / single-direction | DeepSeek V4 Flash GO max (OpenCode Go) — it's on the cap anyway |
| Code execution / plan execution | DeepSeek V4 Pro (direct API) — proven on Phase 6 |
| Production article writing | Kimi K2.6 / Qwen 3.6 Plus — not DeepSeek (Thai-native models outperform) |

**Bottom line:** The $10/mo OpenCode Go subscription is worth it for creative-strategic work — but you must select the *standard* GO max model, not the Flash variant. The Flash variant on GO (20) is not worth using for brainstorm-level tasks when the standard GO max (24) is available on the same cap.
