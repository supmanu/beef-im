
Direction 1: Obsidian Counter

One-line mood: The private dining room where the sommelier also reads your policy documents.

Palette (5 colors with hex):

    Primary background: #0E0E0E
    Surface / card: #1A1917
    Body text: #E8E2D9
    Accent (limited use): #C8922A (aged brass)
    Critical signal (errors / highlights): #D95F3B (sear-char orange-red)

Typography stack:

    Display headline (Thai + Latin pairing): Anuphan (Thai, weight 700) + Cormorant Garamond (Latin, weight 600 italic) — the contrast between Anuphan's geometric clarity and Cormorant's old-money serif creates controlled tension
    Body (Thai + Latin pairing): IBM Plex Sans Thai (Thai) + IBM Plex Sans (Latin) — same family, zero friction, financial credibility
    Mono / data / accent: IBM Plex Mono — for contract clause references, premium values, table figures

Visual motif: The cross-section ring — a thin circular arc, like a meat thermometer dial or a contract seal stamp, that appears as a decorative structural element at section breaks, as a loading state, and as a framing device around pull-quotes. It never closes into a full circle; it always stops at 330°, leaving a deliberate gap — suggesting incompleteness, something still being analyzed.

Animation/interaction signature: Brass-fill on hover — every interactive card begins with a #0E0E0E surface; on hover, a horizontal fill sweeps left-to-right at exactly 280ms using ease-in-out, flooding the card background to #1A1508, while the top border transitions from 1px #2A2A2A to 1px #C8922A. The fill does not animate on scroll, only on pointer-enter. One technique, everywhere: tables, recipe cards, policy-breakdown cards, nav items.

Layout instinct: Dense editorial column — 680px max-width content column centered on desktop, pinned left on mobile. The eye enters at a large Thai headline flush-left, then drops into a brass horizontal rule, then into structured body. No hero imagery. The content is the hero. Sidebar on desktop carries data at-a-glance (e.g., policy grade, cut temperature). On mobile it collapses to inline chips.

3 reference points:

    Stripe's annual letter pages (2022–2024) — the way financial density is treated with editorial calm
    The Fat Duck restaurant website — dark surfaces, restrained luxury, zero kitsch
    Monocle Magazine print layouts — structured, slightly stern, typographically confident without being loud

Why it fits beef.im: The darkness reads as premium steakhouse and also as the serious late-night analyst poring over contract clauses — it's the same person in both contexts. Brass signals heat and aged value simultaneously, which is the exact double-meaning beef.im lives in.
Direction 2: Broadsheet Verdict

One-line mood: If The Economist and a Michelin-starred brasserie had a child raised entirely in Bangkok.

Palette (5 colors with hex):

    Primary background: #F5F0E8 (uncoated newsprint)
    Surface / card: #FFFFFF
    Body text: #1C1C1C
    Accent (limited use): #BF1A1A (editorial red — the Economist stripe)
    Critical signal (errors / highlights): #BF1A1A (same red, used at reduced opacity for non-critical states)

Typography stack:

    Display headline (Thai + Latin pairing): Bai Jamjuree (Thai, weight 800, uppercase tracking +0.02em) + Playfair Display (Latin, weight 900) — Bai Jamjuree's narrow stroke at heavy weight mimics broadsheet headline condensed fonts while remaining Thai-native
    Body (Thai + Latin pairing): Sarabun (Thai, weight 400/600) + Source Serif 4 (Latin) — both designed for long-form reading, both slightly warm
    Mono / data / accent: Roboto Mono — rendered small, in red, for policy codes and cut reference codes (e.g., MB-Class-3A, Ribeye / 54°C)

Visual motif: The column rule — a single 1px vertical line, #1C1C1C at 60% opacity, that divides content zones the way a newspaper column gutter does. It appears at section breaks as a horizontal rule that then pivots 90° as a visual transition marker, reinforcing the print-native language. On recipe pages the same rule structure holds — the cooking is just another story filed on deadline.

Animation/interaction signature: Ink-stamp reveal on section entry — each major content section (H2 + its first paragraph block) enters the viewport with a radial-wipe mask that originates from the center of the section headline, expanding outward over 400ms at cubic-bezier(0.22, 1, 0.36, 1), as though a rubber stamp is being pressed onto paper. The red accent color briefly flashes (80ms) at the wipe's origin point before resolving to normal text color. Triggered once per session per section; never repeats on re-scroll.

Layout instinct: Asymmetric broadsheet grid — a dominant wide-left column (65%) and a narrow-right sidebar column (30%) with a 5% gutter. The left column carries the long-form narrative; the right carries verdicts, ratings, quick facts, and recipe metadata. On mobile it stacks vertically with the sidebar collapsing into inline callout blocks. The eye enters top-left at a large headline, scans right to a red "verdict chip," then commits to the left column.

3 reference points:

    The Economist digital edition layout (2024–2025) — the unashamed confidence of all-text, no-nonsense editorial
    Noma restaurant's printed menus — how a dining establishment can treat its own documentation as editorial design
    Rest of World's feature articles — non-Western editorial rigor applied to digital-first long-form

Why it fits beef.im: The broadsheet format signals that every piece of content — whether a policy teardown or a reverse-sear guide — is filed as a story, treating both with equal intellectual seriousness. Red has a dual resonance: danger-warning in finance, and the doneness indicator on a thermometer.
Direction 3: Brutalist Ledger

One-line mood: A financial contract tattooed directly onto a concrete wall, and it smells like smoke.

Palette (5 colors with hex):

    Primary background: #F2EFE9 (raw concrete cast)
    Surface / card: #E8E3DA
    Body text: #111111
    Accent (limited use): #FF4D00 (industrial warning orange)
    Critical signal (errors / highlights): #FF4D00

Typography stack:

    Display headline (Thai + Latin pairing): Prompt (Thai, weight 900, no letter-spacing adjustment needed — Prompt's bold is already aggressive) + Space Grotesk (Latin, weight 700) — both are geometric grotesques, both designed to punch at large sizes, both hold up at display scale without looking corporate
    Body (Thai + Latin pairing): Noto Sans Thai (Thai, weight 400) + Space Grotesk (Latin, weight 400) — keeps the grotesque DNA consistent through the reading experience
    Mono / data / accent: Space Mono — used large, not small; contract terms and data labels rendered at 14–18px, treated as design elements not footnotes

Visual motif: The exposed grid — the underlying CSS grid is made visible as a design choice. Thin #BBBBBB lines trace the layout columns and rows as faint gutters that never fully disappear. Content sits in the grid, not on top of it. On data-heavy pages (contract comparisons), the grid lines double as table rules — no added markup, the layout structure is the table.

Animation/interaction signature: Hard-cut position offset on hover — interactive elements (cards, CTAs, nav items) have a CSS box-shadow: 4px 4px 0px #111111 at rest; on hover, the element translates exactly translate(-4px, -4px) over 60ms linear, making it appear to lift into the shadow — the shadow doesn't move, the element does. On click/active state, it snaps back to origin in 40ms. This single technique, applied universally, gives the entire interface a tactile mechanical register without any smooth easing curves.

Layout instinct: One-screen statement on entry, then dense scroll — the above-the-fold view on desktop is a single massive Thai headline (Prompt 900 at ~96px), one subhead, and a hard horizontal rule. No imagery, no carousel, no animation. Below the fold: dense, column-rich content that rewards scrolling. Mobile renders the headline at ~48px, still dominant. Users who expect slick landing pages will pause. That pause is intentional.

3 reference points:

    Are.na (arena.computer) — the refusal of visual decoration as a design statement
    Helvetica documentary (2007) title sequences — typography as the total visual environment
    Teenage Engineering's product pages — brutalist restraint that still reads as premium, not cheap

Why it fits beef.im: The brand voice is already brutalist — เน้นเนื้อๆ ไม่เอาน้ำ is a brutalist editorial philosophy. The design makes the interface live by the same rule the content does: nothing decorative, everything load-bearing.
Direction 4: Embers & Aperture

One-line mood: A long-exposure photograph taken inside a charcoal kiln that also happens to contain a spreadsheet.

Palette (5 colors with hex):

    Primary background: #0B0906 (near-black with warm brown undertone — not blue-black)
    Surface / card: #1D1410
    Body text: #EDE4D5
    Accent (limited use): #E8782A (live coal)
    Critical signal (errors / highlights): #F5C842 (flare yellow)

Typography stack:

    Display headline (Thai + Latin pairing): Anuphan (Thai, weight 600–700) + Neue Haas Grotesk Display or its free equivalent Inter Display (Latin, weight 700) — both are optically designed for large sizes, both have a slightly warm neutrality that avoids sterile tech-sans
    Body (Thai + Latin pairing): IBM Plex Sans Thai (Thai) + IBM Plex Sans (Latin) — again the Plex family earns its place here for readability at body size on OLED mobile screens in dark environments
    Mono / data / accent: JetBrains Mono — rendered in #E8782A for data values, creating the visual effect of glowing readouts

Visual motif: Depth-of-field blur halos — background decorative elements (geometric shapes, section dividers) are rendered slightly out of focus using CSS filter: blur(), creating a bokeh-like depth layering. Foreground content is always pixel-sharp. The effect is most pronounced on full-bleed section backgrounds where a faint radial gradient from #E8782A at 5% opacity blooms from the center — like a heat source behind the content plane.

Animation/interaction signature: Ember drift on page-load only — exactly 12 SVG particles (circles, diameter 2–4px, color #E8782A at varying 30–70% opacity) originate from the bottom-center of the viewport and drift upward with slight horizontal randomization, each fading to 0% opacity over 3–5 seconds. They run once on initial page load, never on scroll or interaction. Total canvas cost is negligible; on slow connections the animation is skipped via prefers-reduced-motion and a connection-speed check (navigator.connection.effectiveType !== '4g'). Nothing else moves like this anywhere on the site.

Layout instinct: Cinematic full-bleed sections with hard content drops — each major section is full-viewport-width with the dark background; content blocks float as lighter #1D1410 cards over it. The eye moves vertically through distinct "scenes" rather than a continuous scroll. On mobile, sections stack with a subtle #E8782A 1px top-border to signal the scene change. Data tables are on white cards embedded within the dark scene — the contrast is dramatic and intentional.

3 reference points:

    A24's Aftersun film visual palette — warmth-within-darkness, emotional without being sentimental
    Raycast's marketing site (2024–2025) — dark-mode done with craft, not laziness; the glows feel earned
    Eleven Madison Park's old website — cinematic stillness in a food-and-finance-adjacent context

Why it fits beef.im: The grill and the auditor both work in controlled, focused environments — one tends coals, one reads fine print. Cinematic darkness makes both feel like serious craft rather than hobby. The ember motif earns its single use because it's the only visual that could belong to both halves of the brand simultaneously.
Direction 5: Material Intelligence

One-line mood: What if the Bloomberg Terminal had a hospitality upgrade and moved to Bangkok.

Palette (5 colors with hex):

    Primary background: #F7F6F3 (warm off-white, not clinical)
    Surface / card: #FFFFFF
    Body text: #18181B
    Accent (limited use): #2563EB (Bloomberg terminal blue — familiar financial signal)
    Critical signal (errors / highlights): #DC2626

Typography stack:

    Display headline (Thai + Latin pairing): Bai Jamjuree (Thai, weight 700) + DM Sans (Latin, weight 700) — both humanist sans-serifs with rounded apertures that feel approachable without sacrificing authority; DM Sans is already used on fintech-adjacent products (Notion-adjacent, Linear-adjacent) giving instant credibility cues
    Body (Thai + Latin pairing): Sarabun (Thai, weight 400) + DM Sans (Latin, weight 400) — Sarabun is the single best Thai font for long-form body reading on screen at standard mobile sizes
    Mono / data / accent: Berkeley Mono or Fira Code — used for all numerical data, contract clause codes, cooking temperatures; the mono font is the most important brand-differentiator in this direction

Visual motif: The data chip — a small, pill-shaped component (border-radius: 4px, background #EEF2FF, text in #2563EB, monospaced font) appears throughout the interface as the connective tissue between the finance side and the cooking side. A recipe article has chips: Ribeye · 54°C core · 12 min. A policy article has chips: Type 1 · AIA · Grade: B+. Same component, different context. The chip is everywhere, quietly arguing that all content on this site is data first.

Animation/interaction signature: Progressive data-bar underlines on scroll-entry — every table row and every "key stat" line item has a thin #2563EB underline that begins at 0% width and grows to 100% from left to right over 500ms at linear timing, triggered once when the element enters the viewport at 80% threshold. Tables of 10+ rows stagger with a 30ms delay between rows, creating a "loading-in" readout effect reminiscent of a terminal populating results. No other element animates this way; the technique is reserved exclusively for data-bearing elements.

Layout instinct: Structured dashboard-meets-article — articles begin with a "contract card" or "cut card" at the top: a structured data block (the chip system, a grade/rating, key metrics) before any prose begins. The reader gets the verdict before the argument. Below that, long-form prose. On desktop, a persistent right-side sticky panel shows the "current reading context" (article grade summary, related policy codes, or recipe stats). Mobile collapses the sticky panel to a collapsible top banner. Dense, but organized.

3 reference points:

    Linear's marketing and app UI (2024–2025) — the benchmark for how to make dense data

continue
claude-4.6-sonnet ai model's iconClaude Sonnet 4.6
3 hours ago

feel considered and even beautiful

    Bloomberg Terminal's UX logic (not its aesthetics) — verdict before argument, data before narrative, always
    Stripe's Dashboard UI (2025) — the way financial data is presented with hospitality rather than hostility

Why it fits beef.im: The "verdict before argument" layout structure mirrors how a serious analyst actually reads — you want the grade first, then you decide if the reasoning is worth your time. Applying that same structure to a recipe (cut, temperature, time — then method) treats cooking with the same intellectual respect as contract analysis, without forcing a visual metaphor between them.
Top Pick: Direction 3 — Brutalist Ledger

Ship this one.

The case is simple: the brand voice is already written in brutalist. เน้นเนื้อๆ ไม่เอาน้ำ is not a tagline that belongs on a dark cinematic site or a polished dashboard — it belongs somewhere that looks like it means what it says. A brutalist layout doesn't decorate the content; it is the content. Every other direction asks the design to carry some atmosphere (warmth, prestige, data-density) that the writing then has to live up to. Brutalist Ledger reverses that: the writing sets the standard and the design refuses to compete with it.

The trade-off you are accepting is first-impression friction. New visitors — especially those arriving via social with no prior context — will not instantly understand what they're looking at. There is no visual shorthand that says "finance" or "food" in the conventional sense. You are betting entirely on the writing landing within the first two sentences, because the design will not catch anyone who bounces before reading. For an audience of Mass Affluent 35+ Thai readers who are already seeking this kind of no-nonsense voice, that bet is probably correct. For paid acquisition or cold traffic, it is a genuine risk.
[WILDCARD] — Living Contract

Imagine the entire site rendered as a single, endlessly long legal document — Thai Government Gazette formatting, complete with section numbers (ข้อ 1., ข้อ 2.), clause indentation, and margin annotations — except the document is alive. Recipe steps are formatted as sub-clauses. Policy grades are rendered as formal findings. Pull-quotes appear as margin notes stamped with a red วงกลม seal. The visual language is entirely bureaucratic Thai government document design — the kind most readers have been trained to distrust and skim — but here every single clause is worth reading, because the author has made it so. The subversive thesis is this: the most radical thing a Thai finance site can do in 2026 is look exactly like the documents it is teaching you to read, forcing familiarity where there was previously only avoidance. It will not ship because half the audience will mistake it for an actual government notice and close the tab. But the half that gets it will never leave.
