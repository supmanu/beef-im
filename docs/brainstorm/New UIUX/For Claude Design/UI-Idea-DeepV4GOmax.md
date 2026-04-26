## Direction 1: ถ่าน (Charcoal) — The Dark Steakhouse

**One-line mood:** A private 10-seat counter at midnight — binchotan embers, bone china, and the quiet confidence of someone who annotates policy wordings between courses.

**Palette (5 colors with hex):**
- Primary background: `#1A1A17` — binchotan charcoal after one hour of burn
- Surface / card: `#242420` — lifted ash, first layer
- Body text: `#E5DDD0` — bone china cream; crisp on AMOLED, never whites out
- Accent (limited use): `#D4A040` — single ember amber. One glow per viewport max
- Critical signal (errors / highlights): `#E0553D` — dying ember red; urgent but warm, never clinical

**Typography stack:**
- Display headline (Thai + Latin pairing): **Kanit Bold** (700) + **Space Grotesk Bold** (700) — matched x-height (~0.52), Kanit's geometric Thai loops echo Space Grotesk's sharp Latin angles
- Body (Thai + Latin pairing): **IBM Plex Sans Thai** (400) + **IBM Plex Sans** (400) — 18px mobile, line-height 1.7 for Thai tall characters
- Mono / data / accent: **IBM Plex Mono** (400) — policy numbers, cooking temps, timestamps

**Visual motif:** The lone ember. Every viewport contains exactly one amber element — the active nav marker, the CTA, a single glowing table row on hover. The rest stays charcoal-quiet. Never two glowing elements simultaneously. This enforces "one grill, one cook" without being literal about fire.

**Animation/interaction signature:** Ember pulse on interactive hover — a single 16px amber box-shadow glow (`0 0 16px rgba(212,160,64,0.4)`) fades in over 300ms ease-out and dissipates on mouse-leave at 200ms delay, like pressing a fingertip into warm ash. Pure CSS transition on box-shadow property. `@media (hover: none)` disables entirely — touch users see static accent borders instead.

**Layout instinct:** Single-column long-scroll with violent negative space. Cards have zero borders — depth via 1px background-lightening to `#2A2A26` on hover. Table containers get horizontal scroll with a sticky left column. Eye lands on the amber element first, then the headline, then scrolls.

**3 reference points:**
- **SingleThread Farms** restaurant website (2024) — the charred-oak interior photography palette and single-warm-element restraint
- **Stripe documentation dark mode** (2024) — specifically their table component: zebra-striping via background lift, no borders
- **Noma's "A Cookbook"** by Mikkel Jul Hvilshøj — the single-accent-per-spread discipline across 368 pages

**Why it fits beef.im:** Charcoal-dark makes insurance tables feel like a serious workspace; the single ember transforms recipe content into a premium counter experience. One amber at a time mirrors both an auditor's focus and a grill cook's fire discipline.

---

## Direction 2: หน้าหนังสือพิมพ์ (Broad Sheet)

**One-line mood:** A 1950s Thai newspaper masthead, reinterpreted for someone reading policy wordings on a phone at 7am with black coffee — ink, rules, and no apology for density.

**Palette (5 colors with hex):**
- Primary background: `#FCFAF5` — aged newsprint, 2% yellow warmth
- Surface / card: `#FFFFFF` with `1px solid #E8E3D8` — column-rule border, no elevation
- Body text: `#1C1C1A` — letterpress black, 2% warmth off true black
- Accent (limited use): `#C83C23` — vintage Thai newspaper masthead red; section markers, bylines, single-word highlights only
- Critical signal (errors / highlights): `#B71C1C` — press-stop red

**Typography stack:**
- Display headline (Thai + Latin pairing): **Noto Serif Thai Bold** (700) + **Newsreader Bold** (700) — sharp serifs of hot-metal type. Thai headlines set at -0.02em tracking. Oldstyle figures where available
- Body (Thai + Latin pairing): **Noto Serif Thai** (400) + **Newsreader** (400) — 17px, line-height 1.75. 1.5em paragraph margins. Drop caps: 3-line Noto Serif Thai Bold on first article paragraph
- Mono / data / accent: **Sarabun** (500) at 15px for tables — typewriter regularity with tabular figures. Code snippets: **IBM Plex Mono** (400)

**Visual motif:** The column rule. Visible 1px vertical lines separate content blocks as actual `<hr>` elements styled into thin rules — not CSS borders, not box-shadows. On mobile, rules rotate to horizontal separators. The grid is always visible without being oppressive. Dividers are real semantic elements, not decoration.

**Animation/interaction signature:** Hot-metal impression on every H1 load — letter-spacing animates from `4px` to `-0.02em` over 700ms ease-out, while a simultaneous `text-shadow` (`1px 1px 0 rgba(200,60,35,0.3)`) fades from opacity 1.0 to 0.0 over the same duration. The combined physics: molten type pressing into warm newsprint. Pure CSS `@keyframes`, triggered by a single Intersection Observer adding `.loaded` class. Static fallback by default — animation only fires once per page load.

**Layout instinct:** Asymmetric 8-column grid (6 on mobile). Headlines span 5 cols, body 3 cols offset by 1. Pull quotes break column flow full-width. Article index: dense 4-col card grid (2 on mobile) — headline, dek, category tag stacked tightly. Insurance tables break into full-width horizontal scroll with sticky row headers.

**3 reference points:**
- **Bangkok Post's 1946 inaugural front page** — the multi-column headline hierarchy and rule density of the เจ้าพระยา era
- **The New York Times "The Interpreter"** (2024 digital redesign) — how broadsheet energy translates to 360px-wide mobile columns
- **Steven Heller's "The Daily Heller"** Print magazine column layouts — asymmetric play across 8-column grids

**Why it fits beef.im:** Broadsheet vocabulary signals "this information was verified" — ideal for insurance contract forensics — while the warm newsprint tones and sharp Thai serifs keep it human. A reader scans a premium comparison table with the same eye they'd scan a front-page lead story.

---

## Direction 3: ขาว-หมึก (White Ink)

**One-line mood:** A calligrapher's studio at dawn — washi paper, one ink stone, one red seal, and the discipline to add nothing else.

**Palette (5 colors with hex):**
- Primary background: `#F7F3ED` — washi paper cream with fiber warmth
- Surface / card: `#FFFFFF` — fresh sheets laid on the washi desk
- Body text: `#121212` — sumi ink black; organic, not digital
- Accent (limited use): `#CC2A1A` — cinnabar seal vermillion. Applied to exactly **one** element per page: logo mark OR CTA, never both. The chop is authority. Using it twice dilutes the stamp
- Critical signal (errors / highlights): `#8B1A1A` — aged vermillion, darker, for deletions and errors

**Typography stack:**
- Display headline (Thai + Latin pairing): **Kanit Bold** (700) + **Space Grotesk Bold** (700) — Kanit's geometric Thai shares x-height and stroke contrast with Space Grotesk's sharp Latin angles
- Body (Thai + Latin pairing): **Sarabun** (400) + **Inter** (400) — Sarabun, Thailand's most readable body face, matches Inter's neutral rhythm. 18px, line-height 1.8
- Mono / data / accent: **Sarabun Light** (300) at 14px for tables — reads like fine print without illegibility. True monospace: **Space Mono** (400)

**Visual motif:** The single ink stroke. Every article opens with a thick horizontal rule — `4px solid #121212`, 60px wide, left-aligned — the calligrapher's first decisive mark. This motif repeats: all icons are single-stroke SVGs (`stroke-width: 2; stroke-linecap: round; stroke-linejoin: round`), dividers use the same 4px rule, and even the favicon is a single brush-mark SVG. Every decorative element on the site is one continuous line.

**Animation/interaction signature:** Ink-bleed card hover — `.card:hover` transitions its `background` to a `radial-gradient(circle at var(--x) var(--y), transparent 0%, rgba(18,18,18,0.04) 100%)` over 400ms ease-out, where `--x` and `--y` are CSS custom properties updated by a single debounced `mousemove` listener (16ms throttle, one event handler on the parent container using event delegation, 20 lines of vanilla JS). The gradient center follows the cursor — ink spreading into washi wherever you point. Touch devices get a static center-tint gradient instead. Fallback for no-JS: solid white cards, no loss of function.

**Layout instinct:** Extreme negative space. Content constrained to a 620px center column (traditional Japanese book block proportion). Cards and asides break into the margins: pull quotes 120px left of the text column, data tables breaking out right. On mobile, everything collapses to 90vw single column with pull quotes becoming full-width interstitial bands.

**3 reference points:**
- **Kenya Hara's Kyoto Kyocera Museum identity system** (2023) — single-stroke minimalism at institutional scale; the museum's entire signage uses one line weight
- **Naoto Fukasawa's "Super Normal" exhibition catalog** — worship of ordinary materials elevated purely through spacing
- **Linear's 2024 changelog page** — single accent color against white space making every interaction feel deliberate, never decorative

**Why it fits beef.im:** Calligraphic minimalism strips every decoration until only substance remains — "ดูเนื้อ ไม่ดูหน้า" as visual philosophy. The single vermillion seal mirrors the paradox: one person, two passions, one stamp of authority.

---

## Direction 4: ฟิล์ม (Celluloid)

**One-line mood:** A 35mm contact sheet from a Thai indie film — grain, halation, golden hour, subtitles, and the patience to hold a frame for ten seconds.

**Palette (5 colors with hex):**
- Primary background: `#0C0C09` — projection booth black, 2% warmth. Never `#000`
- Surface / card: `#1A1A14` with `0.5px solid #33332A` — individual frames on a contact sheet
- Body text: `#DDD5C4` — theatrical subtitle cream. The most comfortable extended-reading color in dark mode
- Accent (limited use): `#E8A840` — golden hour direct sun. Timestamps, cooking times, key financial figures only
- Critical signal (errors / highlights): `#E0553D` — red channel clipping, when film overexposes reds

**Typography stack:**
- Display headline (Thai + Latin pairing): **Taviraj Bold** (700) + **Cinzel Bold** (700) — Taviraj's high-contrast Thai serifs read like vintage Thai film title cards; Cinzel matches with cinematic Latin letterforms
- Body (Thai + Latin pairing): **Noto Sans Thai** (400) + **Inter** (400) — 17px, line-height 1.75. Noto Sans Thai's neutral clarity for extended reading sessions against dark backgrounds
- Mono / data / accent: **DM Mono** (400) — slightly wide letterforms echo subtitling fonts. Policy numbers, recipe temps, timestamp data

**Visual motif:** The 4:3 frame + vignette. Every hero image, recipe photo, and article header renders at 4:3 aspect ratio with a permanent `::after` pseudo-element overlay: `radial-gradient(ellipse at center, transparent 60%, #0C0C09 100%)` at 40% opacity. Content loads underneath — atmosphere overlays on top. Insurance tables get the same treatment at their horizontal scroll edges via `mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)`.

**Animation/interaction signature:** Film-grain dissolve on section transitions — a full-viewport canvas renders pre-generated monochrome noise (128×128 canvas filled with random grayscale pixels via `ctx.createImageData`, scaled to viewport with `image-rendering: pixelated`, opacity fading from 15% to 0% over 400ms). The grain pattern is generated once during `requestIdleCallback` after page load and cached in a hidden `<canvas>` — zero runtime cost until triggered. On viewport entry of each new `<section>`, the grain overlay flashes once. Touch devices: skip grain entirely, simple 200ms opacity crossfade. Pure JS, one canvas element, no libraries.

**Layout instinct:** Widescreen narrative scroll. Content in a 680px center column. Hero sections break full-bleed at 100vw with the 4:3 + vignette treatment. Between major sections: a 120px "intermission" band — solid `#0C0C09` with a single centered `#E8A840` 4px dot — giving readers a visual exhale between arguments.

**3 reference points:**
- **Apichatpong Weerasethakul's "Memoria"** (2021) — the color grading of Colombian jungle light through a statically framed, patient lens
- **A24's "Past Lives" promotional website** (2023) — grain + single warm accent + violent negative space as a visual language
- **MUBI Notebook's 2024 redesign** — film-still galleries with locked aspect ratios and near-zero UI chrome

**Why it fits beef.im:** The cinema frame transforms both insurance analysis and cooking into acts of careful observation — watching the details unfold. Recipe photography gains atmospheric weight without food-blogger gloss; premium tables feel like something worth slowing down to study.

---

## Direction 5: แกะสลัก (Engraved) — Tactile Minimalism

**One-line mood:** Information carved into warm limestone — tactile, permanent, weight-bearing — like a 14th-century Sukhothai inscription rendered on a 2026 OLED screen.

**Palette (5 colors with hex):**
- Primary background: `#F0ECE4` — limestone warm gray, centuries of sun
- Surface / card: `#EBE5DB` — slightly deeper relief panel limestone
- Body text: `#2B2620` — chiseled dark, warm brown-black of deeply carved lettering in shadow
- Accent (limited use): `#B8860B` — dark gold leaf. Section numbers, data highlights, active nav marker. Gilding, not painting
- Critical signal (errors / highlights): `#C03D2B` — iron oxide laterite red. For errors and urgent callouts

**Typography stack:**
- Display headline (Thai + Latin pairing): **Sarabun ExtraBold** (800) + **Fraunces Black** (900) — Sarabun at max weight has the monolithic presence of carved stone. Fraunces matches with chunky, slightly irregular hand-cut Latin letterforms. Both at -0.03em tracking
- Body (Thai + Latin pairing): **Sarabun** (400) + **Inter** (400) — 18px, line-height 1.8. Generous space between "carved lines"
- Mono / data / accent: **Anuphan** (400) — squared-off terminals give stonemason precision without cold monospace sterility. Code: **Geist Mono** (400)

**Visual motif:** The chisel mark. Every UI element has a single-side inset — not skeuomorphism, but one-directional inner shadow. Cards: `box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.06)`. Dividers are 1px grooves: one dark line with one white line directly below. Forms have inset input fields. The physics is the opposite of Material Design: things are carved *down* into the surface, not floating *above* it.

**Animation/interaction signature:** Chiseled light-catch on headline scroll-entry — `h1` elements use `background-clip: text; color: transparent` with a `linear-gradient(to right, rgba(43,38,32,0.3) 0%, rgba(43,38,32,1) 100%)` as the `background-image`. On Intersection Observer entry, `background-position` animates from `100% 0%` to `0% 0%` over 900ms with `cubic-bezier(0.25, 0.1, 0.25, 1)` easing. The effect: morning light traveling across carved stone lettering, revealing full inscription depth. CSS-only animation triggered by a single Observer instance. Static full-opacity text as default — animation fires once.

**Layout instinct:** Monumental single-column — one strong statement per screen height. 200px+ spacing between major sections; each section reads as a separate stone tablet. Cards stack in uniform-width grids with chiseled groove dividers. Insurance tables: each row separated by carved grooved rules, header row marked with a 2px `#B8860B` gold-leaf underline. The page feels like a temple wall of wisdom, not a dashboard.

**3 reference points:**
- **The Ramkhamhaeng Stele** (จารึกพ่อขุนรามคำแหง) at Bangkok National Museum — the inscribed surface proportions and lettering rhythm of the first Thai writing
- **V&A Museum collection pages** (2025 redesign) — "archival feel" through paper textures, warm neutrals, and minimal chrome
- **Figma's 2025 product redesign** — the "soft brutalism" language: inset UI, earthy neutrals, chunky type, and the rejection of floating elevation

**Why it fits beef.im:** Carved stone communicates permanence and trust — exactly right for insurance contract analysis — without corporate coldness. The gilded accents and limestone warmth keep the grill-cook's humanity present: wisdom etched in stone, not data flashed on glass.

---

## My top pick + why

**Direction 5: แกะสลัก (Engraved).**

It is the most differentiated direction. Every Thai finance site is either dark-fintech (à la Omise/Stripe) or corporate-white (à la Bangkok Bank). Nobody in Thailand is doing warm-stone tactile minimalism with inscriptions and gold leaf. The direction also has the strongest natural alignment with the brand thesis — "ดูเนื้อ ไม่ดูหน้า" rendered as *what's carved lasts; what's painted fades*.

**The trade-off I'm accepting:** The inset/chiseled visual language is harder to execute consistently across browsers — `box-shadow: inset` stacking behaves differently on Safari vs. Chrome at sub-pixel widths. It demands disciplined QA and a strict CSS variable system. The mobile spacing discipline (200px+ section gaps) also means fewer elements above the fold, which will challenge SEO-first stakeholders. Worth it.

---

## [WILDCARD] ปฏิทิน (Almanac)

The entire site is organized as a Thai farmer's almanac, not a blog feed. Content is indexed by lunar calendar phases — insurance advice tied to fiscal quarters are "seasons," recipes are "harvests," market analysis is "weather." The homepage is a perpetually scrolling calendar wheel with hand-drawn astronomical chart illustrations. Every article carries dual timestamps: Gregorian date AND the Thai lunar month with its zodiac animal. Visual language: weathered palm-leaf manuscript textures, hand-stamped red ink dates, constellation-line SVGs connecting related articles across time. The navigation asks "what season are you in?" before showing content — planning season (insurance), harvest season (cooking), storm season (market volatility). It would be stunningly unusable for SEO, hopeless for CMS categorization, and absolutely unforgettable for the 6,000 people who'd bookmark it.
