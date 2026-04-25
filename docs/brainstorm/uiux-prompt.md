# UI/UX Brainstorm Prompt — ประกันเนื้อๆ (beef.im)

**Date:** 2026-04-25
**Purpose:** Fresh UI/UX direction proposals for the rebrand. User pastes this verbatim into each LLM CLI (Kimi, Qwen, DeepSeek V4 Pro, GLM-5.1, MiniMax, Gemini 3 Flash, etc.), one at a time. Outputs save to `docs/brainstorm/uiux-<model>.md`.

**Workflow:**
1. User starts each LLM CLI session (e.g. `claude-kimi`, `claude-qwen`, etc.)
2. User pastes the prompt below (everything between the fence markers)
3. User saves the LLM's response to `docs/brainstorm/uiux-<model>.md`
4. After all 5–6 models run, side-by-side review (same as the tagline workshop)

---

## The Prompt (copy from here ↓)

````
You are an art director and brand designer briefed to propose FRESH UI/UX direction for a Thai personal-finance + meat/cooking content platform called **ประกันเนื้อๆ (beef.im)**. The previous era's aesthetic is deliberately off the table — think from scratch, not evolve what exists.

## Brand context (locked — these don't change)

- **Identity:** ประกันเนื้อๆ (beef.im). Bilingual — Thai for daily audience, "beef.im" as global handshake.
- **Content thesis:** Disciplined insurance + financial contract forensics meets casual meat-cooking content. The paradox: serious analyst meets fired-up grill cook. Same person, two passions, one site.
- **Audience:** Mass Affluent Thai readers, 35+, health-conscious. Reads on mobile primarily, desktop secondarily.
- **Voice:** *"เน้นเนื้อๆ ไม่เอาน้ำ"* — all substance, no fluff. Direct, confident, never preachy. Substance over style — but style still matters.
- **Brand master line (creative anchor only — do NOT redesign or replace):** *ดูเนื้อ ไม่ดูหน้า* — "judge by substance, not appearance." Pun on เนื้อ meaning both "meat" and "substance."
- **What we are NOT:** sterile fintech blog, gamer aesthetic, food-blogger pastels, generic SaaS dashboard, mountaineering/expedition theme (retired), corporate-insurance gravitas, retro synthwave.

## Open canvas (what to propose)

**5 distinct directions**, each bold and committed — not five flavors of the same idea. Range across registers like:
- Steakhouse (premium-restaurant calm) — if you go here, push somewhere unexpected
- Editorial / magazine layout
- Brutalist / typography-first
- Cinematic / atmospheric
- Anything else 2026-current that no one has shipped in the Thai finance space yet

For each direction, return exactly this format:

```
## Direction N: [Short evocative name]

**One-line mood:** [single sentence]

**Palette (5 colors with hex):**
- Primary background:
- Surface / card:
- Body text:
- Accent (limited use):
- Critical signal (errors / highlights):

**Typography stack:**
- Display headline (Thai + Latin pairing):
- Body (Thai + Latin pairing):
- Mono / data / accent:

**Visual motif:** what's the recurring visual idea — the page's "soul." Equivalent of "ember particles rising" but a different concept.

**Animation/interaction signature:** Name ONE specific technique that recurs across the site — not a list, ONE. Examples of the level of specificity required: "concentric ping rings on hover for active table rows" / "letter-by-letter glow reveal on every H1" / "horizontal specimen ticker scrolling left at 30px/s" / "parchment edge-curl + ink-blot reveal on card hover." Include enough detail that a developer could build it without follow-up questions.

**Layout instinct:** where does the eye go first? Long-scroll narrative, magazine grid, one-screen statement, asymmetric, dense data table, etc.

**3 reference points:** real websites, films, products, books, video games, museums. Be specific — not "Apple" but e.g. "Apple iPhone 16 Pro launch page, 2024" or "A24's Past Lives film palette" or "Linear's marketing site, 2025."

**Why it fits beef.im:** 2 sentences max. How does this direction honor the substance-meets-grill paradox without being literal about it?
```

After the 5 directions, add:

**Your top pick + why** — which would you ship if forced to choose, and what's the trade-off you'd be accepting.

**[WILDCARD]** — one more direction so far out it probably won't ship but is worth seeing. Skip the formal sections; describe it in 5 sentences.

## Hard rules

- Zero mountaineering / expedition / arctic / climbing imagery
- No literal butcher-shop blood-and-cleaver imagery — premium-restaurant energy at most
- No retro 80s synthwave (overdone in 2026)
- Thai typography must be considered for every direction (not just Latin) — name actual fonts that handle Thai well (Prompt, Sarabun, Noto Sans Thai, IBM Plex Sans Thai, Anuphan, Bai Jamjuree, etc.)
- Mobile-portrait must hold up — palette must read in sunlight, type must scale, animations must not punish slow connections
- Must work for insurance-contract teardowns AND grill recipe content on the same site without identity crisis

## Format

Markdown only. Self-contained. No preamble, no sign-off, no "let me know if you'd like…" Make confident proposals and live with them. Don't ask clarifying questions.
````

(↑ copy ends here — do not paste this trailing text)

---

## Notes for the reviewer (next session)

- See [uiux-references-deepseek-v4-showcase.md](./uiux-references-deepseek-v4-showcase.md) for the inspiration set the user shared (cream-almanac + dark-bioluminescent). Compare brainstorm outputs against those references during review.
- Reuse the side-by-side review format from the tagline workshop — model performance grades, top picks across all 5×N directions, transferable techniques even from non-winning directions.
- Don't anchor LLM proposals to any single reference; the brand-context block above is enough.
