## Direction 1: Prime Cut

One-line mood: A candlelit steakhouse where the menu is written in data — dark, warm, reverent, every surface feels oiled by decades of use.

Palette (5 colors with hex):
- Primary background: #1A0D06 (near-black warm, aged leather)
- Surface / card: #2C1810 (dark mahogany)
- Body text: #E8D5C4 (warm cream, candlelit paper)
- Accent (limited use): #C4945A (aged brass, well-worn gold)
- Critical signal: #B84A3A (warm red, like the center of a rare cut)

Typography stack:
- Display headline: Kanit (Thai) + Playfair Display (Latin) — Kanit's weight anchors the dark, Playfair brings steakhouse serif elegance
- Body: Sarabun (Thai) + Inter (Latin) — Sarabun is the most readable Thai web font at body sizes
- Mono / data / accent: JetBrains Mono — data tables, policy numbers, COI schedules

Visual motif: The marbling seam — thin veined lines that run through backgrounds, card borders, and section dividers, like fat marbling through wagyu. On hover, these veins subtly warm from `#2C1810` to `#C4945A` over 1.2s.

Animation/interaction signature: Candlelight vignette oscillation — a warm radial gradient overlay (center fully transparent, edges `#1A0D06`) on every section background that slowly shifts opacity between 0.15 and 0.35 on a 6-second sine wave via CSS `@property --vignette-opacity` with `transition: opacity 6s ease-in-out infinite alternate` on a `::before` pseudo-element. No JS needed, negligible GPU cost. The entire page breathes like a room lit by candles.

Layout instinct: Long-scroll narrative with generous vertical rhythm. Each section is a "course" — full-bleed dark background, content centred in a 680px column, wide margins. Sections separated by a single thin horizontal marbling vein. The hero is one-screen: headline left, a single full-bleed dark photograph right, the photograph almost lost in shadow except for one warm highlight.

3 reference points:
- Crafthouse Chicago website (steakhouse digital, dark warm minimalism)
- Aesop product pages (brown apothecary restraint, material texture)
- The Connaught Bar interior (dark clubby elegance, single-light-source tables)

Why it fits beef.im: Warmth without sentimentality — the dark premium register says "we take this seriously" for contract forensics, while the candlelit table is where the grill cook serves his best work. The paradox lives in the tension between high-data rigor and restaurant-calm presentation; the reader feels like they're being served analysis by a master chef, not sold a policy.

---

## Direction 2: Docket#

One-line mood: You're reading an advocate's annotated brief — red ink in the margin, paper that has been argued on, every claim marked up by someone who has already done the work for you.

Palette (5 colors with hex):
- Primary background: #F5F0E8 (aged bond paper, slight warmth)
- Surface / card: #FFFFFF (clean white — the "new leaf" added to the brief)
- Body text: #1C1C1C (near-black, high contrast for long-form reading)
- Accent (limited use): #D43830 (red-line red, judicial annotation ink)
- Critical signal: #A61A1A (deeper red, emergency stamp)

Typography stack:
- Display headline: IBM Plex Sans Thai (Thai) + IBM Plex Serif (Latin) — legal brief authority
- Body: Sarabun (Thai) + IBM Plex Sans (Latin) — clean, 8+ hours readable
- Mono / data / accent: IBM Plex Mono Thai — the only major Thai-Latin mono with proper Thai glyph coverage

Visual motif: The annotated margin — every page has a left-margin annotation lane. Red vertical bracket rules, tiny handwritten-style numbers in `ink-annotation` class, circled text, and `✓ / ✗` stamp marks. The content appears "worked over" by an expert. Cards have a 1px red left border that sits at `2px` width for data rows.

Animation/interaction signature: Red-line draw on hover — on hover over any article card or data row, a 1px vertical red line (`#D43830`) draws from top to bottom in the left margin. CSS: `stroke-dasharray: 240; stroke-dashoffset: 240; transition: stroke-dashoffset 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)` on a `path` element. At completion, a small `✓` circle stamp scales in at the top of the line (`transform: scale(0→1)`, `cubic-bezier(0.34, 1.56, 0.64, 1)`, 300ms delay). Reverses on hover-out.

Layout instinct: Two-column desktop (content + marginalia). The left column (70%) carries the main article, the right column (30%) carries annotations, definitions, callouts, and cross-references — like reading SCOTUS oral arguments with a clerk's notes alongside. Mobile: marginalia collapses inline as expandable "annotations" triggered by red bracket icons.

3 reference points:
- scotusblog.com (the gold standard for legal-content reading experience)
- Stripe documentation pages (marginalia system, inline annotation design pattern)
- Francis Fukuyama's "The End of History?" PDF (marginal notes as information layering)

Why it fits beef.im: Contract forensics IS the brand's founding edge — the document-review metaphor makes the UI itself an argument for the brand's credibility. Every interaction says "someone qualified has already read this for you." For cooking content, the margin annotations become chef's notes: "use this cut instead," "watch the fire temp here." Same system, different register.

---

## Direction 3: Yaowarat Code

One-line mood: The typographic chaos of Bangkok's oldest street, refined into digital — characters collide, signs overlap, and the reader navigates the page like they navigate a market: by trusting the signal in the noise.

Palette (5 colors with hex):
- Primary background: #0D0D0D (off-black, the night street)
- Surface / card: #1A1A2E (deep midnight blue, the pre-dawn sky between signs)
- Body text: #F0E6D0 (warm off-white, sign-lit pavement)
- Accent (limited use): #FF5533 (neon orange-red, the primary Yaowarat sign color)
- Critical signal: #FFD700 (warning gold, the taxi-yellow / sign-yellow)

Typography stack:
- Display headline: Bai Jamjuree (Thai, bold) + Unbounded (Latin, heavy) — both share geometric DNA, both demand attention
- Body: Prompt (Thai, 300/400) + Inter (Latin) — Prompt handles Thai at small scales better than most geometric faces
- Mono / data / accent: Space Mono (Latin-only, used for data punch and code blocks where Thai isn't needed)

Visual motif: Character collision — Thai script elements overlap, stack, and intersect with deliberate visual tension. A headline's `เน` might overlap the photo next to it. Sections are separated by a single giant Thai character acting as a glyph-marker (e.g., `ก` for section 1, `ข` for section 2). Typographic scale is aggressive: H1 at `clamp(3rem, 8vw, 6rem)`.

Animation/interaction signature: Character drift on scroll — 3–5 key Thai brand characters (เนื้อ, ประกัน, ฯ) per page drift horizontally at opposing parallax rates (0.25x left, 0.5x right) across section transitions via `IntersectionObserver` + CSS `translateX()` on data-attribute-mapped spans. Characters briefly overlap before settling at their final position. Scarcity is the rule: only 3–5 per page, so each collision feels intentional, not noisy.

Layout instinct: Asymmetric and layered. No strict vertical grid. Text blocks sit at deliberate offsets — a headline might start at column 2 and end at column 5. Images intersect text blocks. The eye navigates by typographic mass and size contrast, not column alignment. Mobile: offsets compress to left-aligned but the aggressive scale and character collisions remain.

3 reference points:
- David Carson's Ray Gun spreads (typography as visual material, not just text)
- Actual Yaowarat Road / Chinatown Bangkok at night (signage as architecture)
- Mitsubishi Electric Japan's brand website (typographic density, controlled collision)

Why it fits beef.im: The energy of Yaowarat — dense, layered, unmistakably Thai — matches the "fuck it, post what you want" editorial policy. Contract forensics content gains the energy of a street vendor shouting "this is the real price." Grill content feels like a market stall. The layout itself says "we don't follow the grid everyone else uses" — which is exactly the brand's stance on insurance advice.

---

## Direction 4: Char Line

One-line mood: The aftermath of fire — blackened, elemental, reduced to what matters. A single ember still glows. The page is the residue of a process that has burned away everything unnecessary.

Palette (5 colors with hex):
- Primary background: #0A0806 (pure charcoal, no warmth bleeding in)
- Surface / card: #1C1612 (warm dark ash — the charcoal has cooled but retains memory of heat)
- Body text: #D9C8B8 (warm parchment, the last light before dark)
- Accent (limited use): #D47A3A (ember glow — the one still-hot point)
- Critical signal: #B83333 (warning ember red, the temperature spike)

Typography stack:
- Display headline: Prompt (Thai, weight 700) + Archivo (Latin, weight 900) — both have sharp, precise geometry that contrasts with the soft dark background
- Body: Noto Sans Thai (Thai, weight 300) + Inter (Latin, weight 300) — lighter weights feel "burned down," minimal
- Mono / data / accent: JetBrains Mono — clean, cold, precise against the warm dark

Visual motif: The char mark — thin horizontal scorch lines (1.5px, `#2A1A10`, 50% opacity) appear across backgrounds, section dividers, and card tops. They look like the residue of a wire rack on a steak. These are not decorative — they function as progress indicators, section separators, and hover-state reveals.

Animation/interaction signature: Grill-mark scroll progress — on the right gutter, a vertical track holds 10–12 thin horizontal lines (the "grill marks"). As the user scrolls, each line burns in from left to right (`clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` over 800ms `cubic-bezier(0.25, 0.1, 0.25, 1)`). When the user reaches the corresponding section, the line glows amber (`#D47A3A`) for 600ms then settles to warm charcoal. The final line — article end — stays amber. On mobile: the track collapses to a thin 4px-wide strip, same behavior.

Layout instinct: Long vertical scroll with a narrow content artery — the "cutting board" lane at `min(640px, 90vw)` centred on a full-bleed charcoal background. Each section is separated by a single char line. The narrow column forces focus; there's nowhere for the eye to escape to. Content IS the page. Photography is full-bleed, edge-to-edge, with a 1.5px char line separating it from text.

3 reference points:
- Kono (NYC) yakitori bar interior — black counter, single warm light, the food IS the decoration
- Noma fermentation lab photography (earthen, dark, reverent, material-honest)
- Jasper Morrison's design philosophy ("super normal" — reduction until only function remains)

Why it fits beef.im: This is the "เน้นเนื้อๆ ไม่เอาน้ำ" direction made visual. Everything unnecessary is burned away. The char marks are the only decoration, and they earn their existence by carrying function (progress, separation). The same reductionism that makes a great steak (salt, fire, time) is the reductionism applied to insurance analysis: remove the riders, remove the padding, show the mechanism.

---

## Direction 5: Exhibit A

One-line mood: A museum specimen display case, white-walled and clinical — except the specimens are insurance policies and prime cuts, each pinned to the board with a red string leading to the annotated truth.

Palette (5 colors with hex):
- Primary background: #F8F6F2 (warm off-white, museum gallery wall)
- Surface / card: #FFFFFF (clean white card, specimen label)
- Body text: #1C1C1C (near-black, specimen-label authority)
- Accent (limited use): #4A7C70 (teal-forest, oxidized copper — the patina of old evidence)
- Critical signal: #D43830 (evidence marker red)

Typography stack:
- Display headline: Kanit ExtraLight (Thai, 200) + Playfair Display (Latin, italic) — museum label weight, authoritative but quiet
- Body: Sarabun (Thai, 300) + DM Sans (Latin, 300) — clean, clinical, no personality
- Mono / data / accent: IBM Plex Mono Thai — specimen accession numbers need mono precision

Visual motif: The pin and string — every content card is held by a small circular red pin (4px dot, `#D43830`) at its top center. A thin red dashed line extends from the pin to a floating annotation label (e.g., "Exhibit 4A — COI Schedule Analysis"). The pin is the constant; the string extends and retracts.

Animation/interaction signature: Evidence pulse on hover — on hover over any specimen card, the red pin emits a concentric ring pulse: `box-shadow: 0 0 0 0 rgba(212, 56, 48, 0.4)` → `0 0 0 14px rgba(212, 56, 48, 0)` over 700ms `ease-out`, looped 2x. Simultaneously, a 1px dashed red line strokes out from the pin diagonally (15deg right) to reveal the annotation label — `stroke-dasharray: 400; stroke-dashoffset: 400 → 0` over 500ms `cubic-bezier(0.25, 0.1, 0.25, 1)`. On mobile: tap-and-hold triggers the same, pin stays visible always.

Layout instinct: Clean grid — museum display case. Cards in neat rows (3-column desktop, 2-column tablet, single-column mobile) with generous negative space (`gap: 2rem`). Each card is a specimen: a number badge (Exhibit A-1, A-2...), a clean photo or illustration, a Thai name, an English subtitle, and a one-line caption. The category pages look like a collector's cabinet. Article pages are the deep dive: the specimen card expands, red string and all, into the full content.

3 reference points:
- Cooper Hewitt Smithsonian Design Collection online (specimen cards, accession labels, clean grid)
- Gunther von Hagens' Körperwelten exhibition design (clinical specimen presentation, forensic aesthetic)
- Material Design 3 specimen pages (clean card anatomy, precise spacing)

Why it fits beef.im: The forensic identity IS the UI. Every article is "Exhibit A" in an ongoing case against bad insurance products. The grid says "we have receipts" before the reader reads a word. For cooking content, the specimen frame shifts from "evidence" to "specimen of excellence" — this cut, this technique, preserved and presented for study. One visual system, two contexts, no conflict.

---

## Top Pick

**Docket#** — because the brand's founding credibility is contract forensics, and the annotated-margin UI makes that credibility visible in every interaction. The user doesn't have to say "I analyze contracts" — the interface proves it. The red-line hover is memorable enough to be the brand's visual shorthand (imagine the watermark: a `#D43830` vertical red rule beside the logo). The trade-off: cooking content sits less naturally in this system. The margin annotations for a grill recipe read as "chef's notes" rather than "legal markup" — which works, but the translation isn't as seamless as Prime Cut or Char Line would be for that register. Acceptable because 80% of the content that builds trust is forensic; the cooking content can live in a slightly adapted variant without breaking the system.

---

## [WILDCARD] The Abattoir Archive

The site is a digital cold-storage locker. Monochromatic blue-white lighting (`#E0F0F0` to `#0A0F0F`). Everything feels refrigerated — clinical, cold, sterile. Content cards are stainless steel trays. Typography is clinical sans throughout — Noto Sans Thai at all weights, zero warmth. The cold is deliberate; the WARMTH comes only from the content itself. When a reader opens a forensic article, the temperature doesn't change. When they open a grill recipe — photographs of fire, char, sizzling fat — the warmth hits against the cold container with maximum contrast. The interface never heats up; the photography does all the warming. The brand line "ดูเนื้อ ไม่ดูหน้า" becomes literal: don't judge by the cold interface, judge by the substance inside. It's wrong enough to be memorable and it would make the cooking photography the most urgent visual experience on any Thai finance site — because it's the ONLY warm thing in the room.
