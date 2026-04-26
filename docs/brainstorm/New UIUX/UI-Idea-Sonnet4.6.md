## Direction 1: Deep Research

**One-line mood:** The analyst who prints the brief, marks it up in three colors, and then posts the annotated scan.

**Palette (5 colors with hex):**
- Primary background: `#FDFCF8` (warm paper-white, near a lamp — not pure white)
- Surface / card: `#F5F2EB` (aged parchment — annotation boxes, pull-out findings)
- Body text: `#1A1A18` (warm near-black)
- Accent (limited use): `#2456C8` (cobalt — data, active links, intelligence signal)
- Critical signal (errors / highlights): `#D4480A` (burnt sienna — contradiction flags, rejection verdicts, key findings)

**Typography stack:**
- Display headline (Thai + Latin pairing): Prompt (ExtraBold 800, Thai) + Fraunces (700 Italic, Latin) — Prompt's geometric authority against Fraunces's organic serif creates productive tension: rigor that trusts its own tone
- Body (Thai + Latin pairing): Sarabun (Regular 400 / Medium 500, Thai) + Source Serif 4 (Regular 400, Latin) — both designed for sustained reading, both slightly warm, both feel like journalism not app UI
- Mono / data / accent: Fira Code — contract clause IDs (`AIA-CI-MP-3A`), data table values, cooking temperatures; precision without hostility

**Visual motif:** Margin annotation — throughout the site, content carries margin notes rendered at 85% body size and 65% opacity, positioned right of the main column on desktop. Not decorative quotes — actual analytical notes: clause flags, temperature tolerances, contradiction pointers. Insurance teardowns get policy-clause annotations; recipe content gets temperature and timing notes. Same motif, same typographic treatment, both content types. On mobile, annotations collapse to inline cobalt chips that expand on tap.

**Animation/interaction signature:** On every data table or comparison block's first appearance in the viewport (intersection observer, threshold 0.3), column values count up from `0` to their real values over `600ms` using `ease-out`, each column staggered `100ms` from left to right. Numeric strings only — Thai text cells appear instantly. No other animation exists on the site. No hover lifts, no parallax, no card transitions — this one technique on every table, every time.

**Layout instinct:** Long-scroll narrative. Content column breaks *outward* for tables and key-findings blocks — they extend `120px` beyond the text column on both sides on desktop, like a research exhibit stepping past the page margin. Eye enters at a strong Thai headline, drops to a cobalt pull-line paradox statement, then follows annotated body. Mobile: outward-breaking tables become horizontally scrollable with a fading right-edge gradient hint.

**3 reference points:** The Pudding, "The Largest Vocabulary in Hip Hop" (2014 original — specifically the scrollytelling mechanics, not the redesign); Rest of World's Southeast Asia finance longform (2024); NYT Upshot's health-care data journalism series — the specific approach of building the argument through sequential data reveals.

**Why it fits beef.im:** Insurance contract forensics IS data journalism — the analyst and the investigative reporter hold the same job title. The annotation motif treats a policy teardown and a reverse-sear guide with identical analytical discipline, making the paradox visible at the structural level without a single steak photograph.

---

## Direction 2: Yakiniku Private

**One-line mood:** The private yakiniku room where the house cut costs more than your annual premium — and both are worth analyzing before you commit.

**Palette (5 colors with hex):**
- Primary background: `#0D0B0A` (near-black with charcoal-brown warmth — not blue-black, not pure black)
- Surface / card: `#1C1714` (charcoal brown, distinct from background without metallic shimmer)
- Body text: `#E5DDD0` (aged cream — warm without reading yellow)
- Accent (limited use): `#C27832` (copper — hot-worked metal, more red-orange than gold; read as heat, not wealth)
- Critical signal (errors / highlights): `#E8452A` (ember red — danger, rejection, raw-meat temperature warning)

**Typography stack:**
- Display headline (Thai + Latin pairing): Anuphan (Black 900, Thai) + Neue Haas Grotesk Display 85 Heavy (Latin) — both grotesque, both precise; no serif softness anywhere; the seriousness of a kitchen where every motion is deliberate
- Body (Thai + Latin pairing): Noto Sans Thai (Regular 400 / Medium 500) + Neue Haas Grotesk Text 55 Roman (Latin) — same grotesque family DNA; all warmth comes from palette, not from type
- Mono / data / accent: JetBrains Mono — contract codes, premium pricing, cooking temperatures; cold precision against the warm palette creates the exact tension the brand lives in

**Visual motif:** Copper rule — a `2px` horizontal line in `#C27832` at the top of every content section, article card, and navigation group. It does not animate. It does not glow at rest. It just sits there like the edge of a grill grate. All other hierarchy comes from type weight and opacity modulation, not from borders or drop shadows. The copper rule is the site's only decoration.

**Animation/interaction signature:** On any article card or navigation item hover, the copper rule brightens — a radial gradient centered exactly on the cursor's current x-position along the rule blooms from `#C27832` to `#F0A854` over `160ms` ease-out, tracking cursor position in real time. On cursor-leave, it dims back to base `#C27832` over `400ms` ease-out. No lift, no scale, no shadow — only the rule warms where you touch it. Implemented on every card, every nav item, every section header across the site.

**Layout instinct:** Asymmetric two-column on desktop — content left-weighted (65%), persistent narrow right column (30%) for metadata: cut grade, policy grade, read time, price anchor. Both columns share the same copper-rule top border. Mobile: strict single column, metadata migrates to a thin chip row beneath the headline. The eye enters at a left-flush Thai headline, reads the copper rule as a visual stop, then drops into body.

**3 reference points:** Wagyumafia's web presence (wagyumafia.com, current) — specifically how dark surfaces plus selective copper create premium without announcing it; The Araki restaurant's visual identity (London, 2024 rebrand) — East Asian counter intimacy at institutional price points; Freitag's product pages — the discipline of letting one material element carry all the visual weight.

**Why it fits beef.im:** The East Asian private counter reference earns something European fine dining cannot — premium without imperial register, which fits a Thai brand speaking to Thai mass affluent who have been inside both worlds. Copper means heat-worked metal AND heat-worked analysis; you can't fake either.

---

## Direction 3: Investment Grade

**One-line mood:** Goldman Sachs equity research, translated for the reader who signed whole life without reading the prospectus.

**Palette (5 colors with hex):**
- Primary background: `#F7F6F3` (warm off-white — research-report paper, not screen white)
- Surface / card: `#FFFFFF` (pure white for data boxes and call-out cards — intentional luminance contrast against the background)
- Body text: `#141414` (near-black — authoritative, no warmth in the text itself)
- Accent (limited use): `#1B3A6B` (midnight navy — institutional trust; the color of a fund manager's blazer and the cover of every research report that moves markets)
- Critical signal (errors / highlights): `#B91C1C` (unambiguous red — risk flag, rejection, "read this before you sign")

**Typography stack:**
- Display headline (Thai + Latin pairing): IBM Plex Sans Thai (Bold 700) + IBM Plex Sans (Bold 700) — one family, complete coherence; the typeface of IBM research, institutional documentation, and the one grotesque family with production-quality Thai support; globally credible, technically excellent for Thai body copy at all sizes
- Body (Thai + Latin pairing): IBM Plex Sans Thai (Regular 400 / Text 450) + IBM Plex Sans (Regular 400) — same family throughout; the monolithic IBM Plex stack is the statement: this is designed to be read, not admired
- Mono / data / accent: IBM Plex Mono — policy codes, clause references, coverage values, cooking temperatures; the full IBM Plex family playing together is the only institutionally complete Thai-capable type system available today

**Visual motif:** Rating badge — every article, product review, and section carries a small top-right badge using investment research vocabulary: `OVERWEIGHT` / `NEUTRAL` / `UNDERWEIGHT` for insurance products; `WELL MARBLED` / `LEAN` / `AVOID` for cuts. Consistent size (`72px × 24px`), IBM Plex Mono at `10px` uppercase, navy/red/amber fill. The rating badge IS the site's promise — everything gets graded, nothing is safe from analysis, the grill review and the policy teardown get equal rigor.

**Animation/interaction signature:** On every rating badge entering the viewport (intersection observer, threshold 0.5), the badge background transitions from neutral grey `#E5E5E5` to its final color (navy, red, or amber) over exactly `500ms` `ease-in-out`, with the label text fading from transparent to `#FFFFFF` simultaneously. No other animation exists anywhere on the site. Every other element is completely static. The badge is the only thing that moves, because the rating is the only thing that matters.

**Layout instinct:** Dense three-column on desktop — main content (55%), summary sidebar with rating + key metrics + related articles (30%), narrow outer column for footnotes and clause cross-references (15%). Layout intentionally echoes a PDF research report brought onto the web as a native format. Mobile: single column; sidebar becomes a summary card pinned above the article body; footnotes collapse to tap-expandable inline references.

**3 reference points:** Goldman Sachs Global Investment Research equity reports (any 2024 PDF — the typographic discipline, table formatting, and rating system are the direct reference); The Economist Intelligence Unit sector reports (information density + rating callout conventions); Morning Consult's brand confidence ratings design (for mobile-responsive dense-data presentation).

**Why it fits beef.im:** Every beef.im piece is already implicitly an equity research note — the asset is a contract, the analysis is forensics, the output is a buy/hold/avoid verdict. Making that language explicit turns the site from "insurance blog" to "institutional-grade analysis for civilian readers." The same rating badge on a grill cut review is not a joke; it is the brand thesis operating exactly as intended.

---

## Direction 4: Bangkok Zine

**One-line mood:** Pratunam shophouse sign typography, curated by someone who studied at ECAL and then came home.

**Palette (5 colors with hex):**
- Primary background: `#1A1208` (very dark warm brown — aged shophouse interior; not black, not navy, not grey)
- Surface / card: `#2B1F0F` (dark cognac brown — one stop lighter, still deep)
- Body text: `#F2E8D0` (aged newsprint cream — the specific off-white of Thai tabloid print)
- Accent (limited use): `#E8B020` (saturated commercial yellow — the color on every Thai street stall price tag, certification badge, and shophouse sign; signals fresh, cheap, important simultaneously)
- Critical signal (errors / highlights): `#E83020` (Thai commercial red — in Thai visual culture: sale, urgency, and heat, all at once)

**Typography stack:**
- Display headline (Thai + Latin pairing): Bai Jamjuree (Black 900, Thai) + Barlow Condensed (Black 900, Latin) — both are designed for large physical format; both have the width and mass of commercial signage; the display type should read like it was designed for a 3-meter banner before it was scaled down to a screen
- Body (Thai + Latin pairing): Sarabun (Regular 400, Thai) + DM Sans (Regular 400, Latin) — complete register pivot from display to body; this mirrors how Thai commercial media actually works: loud header, calm readable body beneath it
- Mono / data / accent: IBM Plex Mono — the only non-commercial element in the system; anchors data in cold precision against the street-energy palette

**Visual motif:** Sticker label — price stickers, food-cert stickers, `เปิดแล้ว` launch stickers from Thai retail, applied as every content tag, category badge, and rating element. Each label sits at a slight rotation (2–4°, randomized per instance, seeded by element ID so it's consistent across renders). Labels use an SVG clip-path with a slightly irregular edge rather than border-radius — slightly rough, slightly physical. Yellow accent on the most important label per page. Insurance content: `วิเคราะห์แล้ว`. Recipe content: `ผ่านแล้ว`. Policy rejection: `ไม่ผ่าน` in red.

**Animation/interaction signature:** When a sticker label enters the viewport, it slaps onto the surface — scaling from `1.08` to `1.0` and snapping from `(rotation + 3°)` to its seeded final rotation in `200ms` using `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring overshoot curve). No easing in: it starts at full scale-up, snaps to position. One technique. Every label on the site, on every page load. No hover interaction, no scroll trigger — slap once, stay.

**Layout instinct:** Dense and unapologetic on desktop — full-bleed content areas, minimal internal gaps, text that occupies the space rather than floating in it. The density says "we have things to tell you and we're not performing restraint." Mobile holds because Bai Jamjuree Black at 24px is still legible on the smallest Thai market phone at arm's length in daylight — this typeface was built for exactly that context.

**3 reference points:** Kasama restaurant's brand identity (Chicago, 2023) — the specific synthesis of Southeast Asian commercial visual tradition with contemporary design craft; Baan Dusit Thani's recent brand identity — Thai commercial heritage, not temple-heritage; PATTERNITY's method of extracting visual systems from vernacular culture for institutional clients.

**Why it fits beef.im:** Thai mass affluent readers grew up inside this visual system — it is literally the typography of their neighborhood. Using it for insurance forensics inverts the expectation (high-rigor content in a commercial visual wrapper) which is the brand paradox enacted, not described. It is the only direction on this list that is genuinely unavailable to any Western or non-Thai brand.

---

## Direction 5: Cold Protocol

**One-line mood:** Mass spectrometry results and reverse-sear temperature logs, same interface, same methodology, same confidence.

**Palette (5 colors with hex):**
- Primary background: `#F8F9FA` (clinical off-white with barely perceptible blue-grey tint — not warm, not cold, sterile)
- Surface / card: `#FFFFFF` (pure white — surfaces are sterile; the whiteness is structural, not decorative)
- Body text: `#1D2025` (cool near-black — deliberately not warm; all warmth comes from the content, not the container)
- Accent (limited use): `#00795C` (deep teal — the specific green of analytical lab equipment: Beckman Coulter instruments, HPLC displays, centrifuge readouts; precise, non-decorative, technically serious)
- Critical signal (errors / highlights): `#C81414` (specimen-flagged red — clause flagged, cut rejected, risk confirmed)

**Typography stack:**
- Display headline (Thai + Latin pairing): Prompt (SemiBold 600, Thai) + Inter (SemiBold 600, Latin) — both geometric sans, both designed for UI and data contexts first, editorial use second; display type reads like a laboratory report header, not a magazine cover; this is intentional
- Body (Thai + Latin pairing): Noto Sans Thai (Regular 400, Thai) + Inter (Regular 400, Latin) — the world's most neutral type pairing used here as a deliberate statement: the type removes itself so the data can speak
- Mono / data / accent: JetBrains Mono — for all numerical content: policy codes, coverage amounts, temperatures, clause references; monospace IS the signal that this value was measured, not estimated

**Visual motif:** Grid registration marks — fine `+` crosshair markers (`0.5px` stroke, teal at 40% opacity) at the corners of every data table, at every major section boundary, and as decorative structural elements in article headers. The motif references quality-control registration marks on analytical instruments and technical engineering drawings — they are the marks you would crop out before showing a normal person the document. Leaving them visible says: we're not hiding the methodology.

**Animation/interaction signature:** On every data table's first appearance in the viewport, a single `1.5px` teal horizontal line scans from the top edge to the bottom edge of the table over `800ms` linear timing — exactly like a document scanner or barcode reader in slow motion. As the line passes over each row, that row's values fade in from transparent at the line's position. After the scan completes, the table is completely static: no hover state, no ripple, no animation. One technique. Every table. Once per page load.

**Layout instinct:** Strict three-column grid on desktop — all columns share hard gutters, all elements align to the grid exactly, nothing breaks out or bleeds. Content feels as though it grew within the grid rather than being placed into it. The header block is a structured metadata summary (topic, date, analytical methodology, verdict) before the body begins — like a laboratory report's preamble. Mobile: single column with the same gutter discipline; the header block collapses to a compact summary chip row.

**3 reference points:** Stripe Press's book design for *An Elegant Puzzle* (Will Larson, 2019) — the page-layout discipline where data structures and prose share equal authority; Singapore CPF Board's public information design (2024 redesign) — a government financial agency that made dense data beautiful without sacrificing rigor; Refinery29's *Money Diaries* visual design — specifically how structured personal-finance data can be made readable without softening it.

**Why it fits beef.im:** Insurance contracts are laboratory specimens — they have measurable properties, they can be tested, some are safe and some are toxic. The clinical visual language says "I ran the assay" before the first sentence, which earns trust from mass affluent readers who are tired of being sold at. The same grid applied to a Maillard reaction temperature log is not a stretch — the chemistry of browning is literally food science, and food science is a laboratory discipline.

---

**Your top pick + why**

**Direction 3: Investment Grade.**

The IBM Plex family is the only production-complete Thai + Latin type system that passes both the institutional-credibility test and the mobile-readability test simultaneously, and the rating badge is the one visual element that extends naturally to both content types without any forcing. When you put `WELL MARBLED` on a wagyu short rib and `OVERWEIGHT` on a whole-life policy in the same typeface at the same size in the same badge format, the brand thesis becomes self-evident to every reader — it doesn't need explanation.

The trade-off you'd be accepting: this direction carries corporate-insurance-company risk. If the writing defaults at all from first-person conviction into formal advisory register, the entire site reads like a KBank wealth management brochure. The voice-DNA (`เน้นเนื้อๆ ไม่เอาน้ำ`) has to work harder here than in any other direction to keep the format from swallowing the personality. The visual system protects nothing — it amplifies whatever the writing is. If the writing is hot, it becomes a weapon. If the writing is safe, it becomes a liability brochure.

---

**[WILDCARD] — Living Terminal**

What if the entire site renders like a live financial instrument, not retro CRT but the specific modernity of a Refinitiv Eikon or Bloomberg dark-mode terminal in 2026 — rebuilt in Thai? Every article slug is a ticker symbol: `$AIA-MP-CI`, `$RIBEYE-54C`. The homepage is a live scrolling tape of content tickers flowing left. Insurance products have bid/ask spreads expressed as reader confidence votes (73 buy / 27 hold). Cooking content is listed under the commodity categories `PORK:BELLY` and `BEEF:RIBEYE` with today's price from a live Bangkok market API. A small sparkline of reader engagement lives on every article page styled exactly like a price chart. The entire system is monospaced Thai — using IBM Plex Mono Thai for everything, including body copy, which would be a genuinely insane typographic choice that somehow works because terminal operators read monospace body text all day. It would alienate readers who have never opened a financial terminal, and it would absolutely make every Thai financial journalist share a screenshot to ask what is happening. You ship this in 2028 after the brand has enough credibility to survive the inevitable Twitter argument about whether it's genius or alienating, and the answer is yes.
