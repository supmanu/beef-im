## Direction 1: Pavilion

**One-line mood:** A two-Michelin tasting menu rendered as a website — every section earns its plate.

**Palette (5 colors with hex):**
- Primary background: `#F4EFE6` (warm paper cream)
- Surface / card: `#FAF7F1` (lifted ivory)
- Body text: `#1C1814` (warm ink, never pure black)
- Accent (limited use): `#C45A2D` (smoked persimmon)
- Critical signal (errors / highlights): `#7A1F1F` (vintage burgundy)

**Typography stack:**
- Display headline (Thai + Latin pairing): Anuphan + Söhne
- Body (Thai + Latin pairing): Sarabun + Söhne
- Mono / data / accent: Söhne Mono

**Visual motif:** Numbered "courses." Every section opens with a single 1px hairline rule, a roman numeral, and a Thai/Latin section label set in small caps. Hero photography is austere — one object on cream, sometimes nothing at all but the title.

**Animation/interaction signature:** A 1px hairline rule extends from `0%` to `100%` width over `1200ms` ease-out as each section's title crosses the viewport top. Used exclusively as the divider between sections. No other motion anywhere on the page — no fades, no parallax, no hover lifts.

**Layout instinct:** Generous outer margins. One column on mobile; on desktop, body text caps at ~640px with wide whitespace flanking. Eye lands on the section number, drops to the headline, then the body unfolds at reading pace.

**3 reference points:** Eleven Madison Park's redesigned site (elevenmadisonpark.com, 2023 redesign). The Gentlewoman magazine, Issue 30 Spring/Summer 2024. Aesop's product education pages (aesop.com, current).

**Why it fits beef.im:** Quiet luxury says "I take this seriously" without insurance-corporate stiffness, and the tasting-menu discipline honors substance while the warm cream paper honors the meat half. Same restaurant pours the Burgundy and grills the wagyu next door.

---

## Direction 2: Newsroom

**One-line mood:** Bloomberg Businessweek meets Monocle — confident, dense, news-led, no apologies.

**Palette (5 colors with hex):**
- Primary background: `#F1ECE2` (bone newsprint)
- Surface / card: `#FFFFFF` (pure white for inset modules)
- Body text: `#1A1A1A` (charcoal)
- Accent (limited use): `#6B0F1A` (oxblood)
- Critical signal (errors / highlights): `#B8860B` (mustard alert)

**Typography stack:**
- Display headline (Thai + Latin pairing): IBM Plex Serif Thai Loop + IBM Plex Serif
- Body (Thai + Latin pairing): IBM Plex Sans Thai + IBM Plex Sans
- Mono / data / accent: IBM Plex Mono

**Visual motif:** Every article carries a print masthead block — datestamp · section tag · word-count · estimated read time — set above the headline in monospace small caps. Pull quotes break out of the body and inhabit the right margin column the way they would in a Sunday Times feature.

**Animation/interaction signature:** On first article render, a single `0.5px` hairline rule draws beneath the byline from left margin to right margin over `800ms` ease-out, exactly once on initial paint — never re-triggers on scroll. The page is otherwise still.

**Layout instinct:** Magazine three-column on desktop (article + pull-quote margin + sidebar with related stories). Single column on mobile. Eye lands on a giant Thai serif headline, then the masthead block calibrates expectations.

**3 reference points:** Bloomberg Businessweek's Richard Turley-era redesign carried into the 2018 web refresh. Monocle.com (current). Reuters Lens visual journalism section (current).

**Why it fits beef.im:** Treats insurance forensics as journalism — which is what they actually are — and the masthead discipline gives recipe content equal legitimacy as a "Food desk" piece. Bloomberg covers gold; the Sunday section covers Negroni-glazed short ribs; neither feels misplaced.

---

## Direction 3: Spec Sheet

**One-line mood:** Hodinkee product page meets Bang & Olufsen owner's manual — every page reads as instrument documentation.

**Palette (5 colors with hex):**
- Primary background: `#0A0A0A` (matte black)
- Surface / card: `#141414` (subtle lift)
- Body text: `#E8E8E8` (off-white, never pure)
- Accent (limited use): `#00D4FF` (electric cyan, tabular numerals only)
- Critical signal (errors / highlights): `#FF3B30` (signal red)

**Typography stack:**
- Display headline (Thai + Latin pairing): Bai Jamjuree + JetBrains Mono
- Body (Thai + Latin pairing): Anuphan + Inter
- Mono / data / accent: JetBrains Mono with tabular figures locked

**Visual motif:** Every entity — article, policy teardown, recipe — opens with a "spec card." Two columns: left column key in Latin small caps, right column value in monospace. Thin silver hairlines between rows. Insurance teardowns become side-by-side spec comparisons; recipes get cook-time / temp / serving-size / cost-per-portion spec rows. The card is the page's load-bearing element.

**Animation/interaction signature:** On viewport entry, every numeric value in every spec card count-ups from `0` to its final value over `600ms` with monospace tabular alignment locked so digits never reflow — simulating an instrument booting. Comparable spec tables animate in lockstep so the eye reads them as one mechanism waking up.

**Layout instinct:** Dense, data-first. Eye lands on the spec card before the prose. Body copy is short and load-bearing — never decorative. On mobile the spec card collapses to one column with values right-aligned.

**3 reference points:** Hodinkee Reference Points pages (hodinkee.com/articles/reference-points entries from 2024). Teenage Engineering OB-4 product page (teenage.engineering/products/ob-4). Naked & Famous Denim raw-jean spec cards (current product pages).

**Why it fits beef.im:** "เน้นเนื้อๆ ไม่เอาน้ำ" rendered literally as design — facts in tables, decorative noise zero. The same spec-card logic frames a wagyu cut grade and a Critical Illness rider without code-switching the design language.

---

## Direction 4: Slow Cinema

**One-line mood:** A24's Past Lives marketing site reframed as a publication — atmospheric, image-led, emotionally weighted.

**Palette (5 colors with hex):**
- Primary background: `#1A0F0A` (deep teak)
- Surface / card: `#2A1B12` (warmer charcoal)
- Body text: `#F0EAD6` (warm cream)
- Accent (limited use): `#D2691E` (ember orange)
- Critical signal (errors / highlights): `#C41E3A` (cardinal red)

**Typography stack:**
- Display headline (Thai + Latin pairing): IBM Plex Serif Thai Loop + Tiempos Headline (Klim)
- Body (Thai + Latin pairing): Sarabun + Tiempos Text
- Mono / data / accent: JetBrains Mono

**Visual motif:** The "cold open." Every article begins with a `90vh` full-bleed atmospheric photograph — backlit smoke, a lone glass of bourbon, a pile of unsigned policy paper, the back of a chef's knife on butcher paper. White Thai serif title sits low-left. Article body content is hidden until the reader scrolls past the cinematic title card.

**Animation/interaction signature:** The full-bleed hero image stays pinned in place during the first `80vh` of scroll while the headline rises `24px` and the byline fades from `opacity 0` to `1` over that scroll distance — a cinematic title-card lock. After the title card releases, body content scrolls normally and no further motion fires.

**Layout instinct:** Long-scroll narrative. Eye lands on the cinematic still and sits there. Headlines act as chapter cards. Body copy ratio favors images over text by ~40/60. On mobile the cold-open holds at `100vh` and the lock distance shortens to `60vh`.

**3 reference points:** A24's Past Lives film website (a24films.com/films/past-lives, 2023). Studio Ghibli Park microsite (ghibli-park.jp, 2023). Apple AirPods Max launch page (apple.com/airpods-max, 2020).

**Why it fits beef.im:** The cinematic register reframes both halves — insurance becomes character study, grilling becomes ritual — same emotional gravity, same craft. Warm teak reads as a wood-fired room rather than a lifestyle brand.

---

## Direction 5: Receipt

**One-line mood:** Read.cv meets a thermal-printer receipt — flat, dense, deliberately unfussy, almost zine-like.

**Palette (5 colors with hex):**
- Primary background: `#FFFFFF` (pure white)
- Surface / card: `#F8F5EE` (warm receipt-paper gray)
- Body text: `#000000` (pure black)
- Accent (limited use): `#FFD800` (kerosene yellow, used as highlighter overlay only)
- Critical signal (errors / highlights): `#D70015` (signal red)

**Typography stack:**
- Display headline (Thai + Latin pairing): Bai Jamjuree (heavy weight) + IBM Plex Mono
- Body (Thai + Latin pairing): Anuphan + Inter
- Mono / data / accent: IBM Plex Mono

**Visual motif:** Every page is structured like a printed receipt — dotted divider lines, all-caps section labels, prices and numerical values right-aligned, footer with a "TOTAL" line. Articles end with a literal receipt-style itemization of what the reader "bought": three insights, one contradiction, one action. Highlighter accent is rendered as a translucent yellow rectangle behind specific phrases — like the reader marked it themselves.

**Animation/interaction signature:** Dotted rules between sections "print" left-to-right at `1200ms` ease-linear on viewport entry, mimicking a thermal printer head — followed by a `50ms` 1px vertical jitter on the row immediately below, like the paper advancing. The only animation on the page.

**Layout instinct:** Single column always — even on desktop, body width caps at ~640px and the rest of the screen stays empty. Eye lands on the all-caps section label and date stamp. Reads as a printed document, not a screen experience.

**3 reference points:** Read.cv (current). Are.na project pages (current). Onibus Coffee Tokyo bag stickers and shop receipts (physical product).

**Why it fits beef.im:** Maximum substance, zero decoration — design's only job is to step out of the way. Insurance details and grill recipes both reduce to clean itemized lists, which is what receipts have always been best at.

---

## Top pick + why

**Direction 3: Spec Sheet.** Most literally renders the brand line ("ดูเนื้อ ไม่ดูหน้า") into design, and the spec card is structurally reusable across both content modes without forcing the design language to code-switch between insurance and meat. Trade-off accepted: editorial inputs become more disciplined (every article needs its spec data captured up front, which slows the writer), and dark-first means extra QA on Thai font rendering in sunlight on cheap Android screens — Bai Jamjuree at small sizes on a budget AMOLED needs real testing before commit.

---

## [WILDCARD] — Hand-Drawn Lab Notebook

The whole site reads as one obsessive autodidact's leather-bound research journal — handwritten Thai annotations in the margins, scanned graph-paper texture as the page background, occasional ink-blot stains, taped-in scraps of policy clauses and torn recipe pages, hand-drawn arrows pointing between unrelated ideas. Insurance teardowns become "case files" with red-pen verdicts circled in the corner; recipes become cooking experiments with crossed-out failed attempts and written corrections in different ink. Two custom handwriting fonts — one Thai, one Latin — carry the marginalia, while clean serif typesetting carries the "official" body text inside boxed-off sections like glued-in printed notes. Equal parts Leonardo da Vinci's notebooks and Anthony Bourdain's kitchen prep notes — a single autodidact's brain externalized as a website. Probably a maintenance nightmare at scale and a typography rights minefield, but anyone who landed on it once would never forget it.
