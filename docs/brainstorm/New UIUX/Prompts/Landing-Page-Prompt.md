# One-Shot Landing Page Visual Comparison Prompt

**Paste into:** Kimi K2.6, Qwen 3.6 Plus, DeepSeek V4 Pro, or any coding-capable LLM
**Output:** Single HTML file rendering all 3 beef.im direction variants
**Goal:** Visual side-by-side comparison on phone and desktop

---

## The Prompt (copy from here ↓)

```
Generate a single self-contained HTML file that renders a landing page comparison for a Thai personal-finance + meat/cooking content platform called **ประกันเนื้อๆ (beef.im)**.

You must render 3 distinct visual directions stacked vertically in the same file. Each section is labeled. Use the same Thai content for all 3 so the comparison is fair.

## Content to render (use this exact copy for all 3)

**Site name:** ประกันเนื้อๆ
**Domain:** beef.im
**Hero headline:** ดูเนื้อ ไม่ดูหน้า
**Hero subhead:** วิเคราะห์สัญญาประกันและเนื้อวากิวด้วยมาตรฐานเดียวกัน — ไม่มีน้ำ ไม่มีเซลล์
**Sample article title:** ทำไม Whole Life 99/20 ถึงได้เกรด C — แกะสัญญาทีละข้อ
**Sample article dek (summary):** สัญญานี้ขายดีที่สุดในไทย แต่เมื่ออ่านเงื่อนไขจริง — ค่าเบี้ยสูงเกินผลตอบแทน 60% และข้อจำกัดการเวนคืนซ่อนอยู่ในหน้า 7
**Rating badge text:** UNDERWEIGHT
**Temperature value:** HOT / ความเสี่ยงสูง
**Category tag:** CASE FILE #031
**Read time:** 8 นาที
**Verdict stamp text:** ไม่ผ่าน
**Footer byline:** บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)

---

## Direction 1: Provenance (hybrid synthesis)

**Palette:**
- Background: #F5F0E8 (warm cream, like old almanac paper — NOT pure white, NOT beige)
- Surface / card: #FFFCF7 (lifted ivory)
- Body text: #1C1814 (warm near-black, never #000)
- Accent (verdict red): #B85C3A (smoked persimmon — for badges, annotations, critical callouts)
- Accent (institutional): #1B3A6B (midnight navy — for rating badges, data, hyperlinks)
- Accent (gold): #B8860B (gold leaf — one element per viewport: section markers, stamp borders)
- Critical signal: #D43830 (unambiguous red)

**Typography:** IBM Plex Sans Thai for Thai body, IBM Plex Sans for Latin body, IBM Plex Mono for data/badges. Anuphan ExtraBold for Thai headlines. All at least 18px on body for mobile readability.

**Background:** Render a subtle 36×36px CSS grid texture over the cream background — thin faint lines `rgba(39,32,23,0.06)`. Add two subtle radial color washes: forest-green `rgba(0,127,109,0.06)` top-left, warm amber `rgba(240,179,35,0.10)` top-right. The cream base has a slight diagonal gradient from #F8F2E8 to #F5F0E8 to #EBE3D4.

**Hero:** A 90vh hero section. Behind the headline, render a slow-rotating conic-gradient sunburst in persimmon: `repeating-conic-gradient(from 12deg, rgba(184,92,58,0.10) 0deg 12deg, transparent 12deg 24deg)` at 50% opacity, inside a circle clipped to the hero. The headline sits centered, large, confident. Below it: the subhead, then a search bar.

**Rating badge:** Top-right of the article card — a 72×24px pill badge in navy `#1B3A6B` with white IBM Plex Mono text at 10px uppercase reading "UNDERWEIGHT". The badge has a hard-offset shadow: `3px 3px 0 rgba(39,32,23,0.11)`.

**Temperature bar:** A thin 4px horizontal gradient bar at the top of the article card: `#3B7DD8` → `#F5A623` → `#E8482F`. Below it: a label reading "ความเสี่ยงสูง — อ่านก่อนเซ็น".

**Article card:** Cream card `#FFFCF7` with a hard-offset shadow on hover. Contains: temperature bar (top), rating badge (top-right), headline, dek text, metadata pills (date, read time, 8 min, CASE FILE #031). Cards have 12px border-radius, 1px border `rgba(175,165,145,0.25)`.

**Annotation margin:** On the right side of the article body (desktop only), show a red bracket `[` in #B85C3A with annotation text in small IBM Plex Sans Thai: "ข้อจำกัดการเวนคืนซ่อนอยู่ในหน้า 7 — อ่านก่อนเซ็นสัญญา". On mobile, this collapses to an inline red chip.

**Verdict stamp:** At the article footer, a large circular stamp element (60×60px) with a 2px #B85C3A border, slightly rotated -2°, containing the text "ไม่ผ่าน" in red Anuphan Bold. The stamp has a subtle ink-bleed edge (SVG feGaussianBlur at 1.5px then sharpened).

**Footer:** Clean single-line footer: "📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)" in #6B6254, small, centered.

**Animation hints (don't need to fully implement — suggest with CSS comments):**
- Hero sunburst rotates at 32s linear infinite
- Rating badge fills from grey to navy on viewport entry
- Temperature bar expands from 4px to 24px on hover

---

## Direction 2: The Lab Notebook (hand-drawn research journal)

**Palette:**
- Background: #F5F2EA (warm notebook cream — Moleskine/Leuchtturm page color)
- Grid: `rgba(175,165,145,0.18)` — faint graph paper grid at 24px spacing
- Surface / card (scraps): #FDFBF7 (taped-in paper — slightly brighter than background)
- Body text (printed/typeset): #1C1814 (letterpress ink — the official content)
- Handwritten notes: #2B4A5E (navy fountain-pen ink — all marginal annotations)
- Red pen: #CC3A2F (correction red — verdict circles, strikethroughs, urgent stamps)
- Highlighter: `rgba(255,237,100,0.45)` (translucent yellow overlay behind key phrases)
- Masking tape: `rgba(245,240,220,0.65)` with slight rotation

**Typography:**
- Display headline: Anuphan ExtraBold (Thai) — large, heavy, anchors the page
- Body (printed): Sarabun Regular (Thai, 18px) — the clean "typeset" content
- Handwritten marginalia: K2D Light (Thai, 14px) + Caveat Regular (Latin, 14px) in navy #2B4A5E
- Mono/data: IBM Plex Mono (13px)
- Fallback if K2D/Caveat not available: Sarabun at 13px with wavy underline in navy

**Background:** Graph paper grid at 24px (5mm) spacing rendered with CSS repeating-linear-gradient. Add a subtle paper-fiber noise via inline SVG data URI at 4% opacity. A soft radial aging gradient darker at page edges. The background should feel like a physical notebook page — NOT a website background.

**Hero:** No traditional hero. The "hero" is the first notebook entry. The page opens with: a thin red horizontal rule (1px, #CC3A2F) across the top margin. Below it, the site title "ประกันเนื้อๆ" in small navy K2D handwriting, as if written at the top of the page. Then the date in navy: "25 เมษายน 2026". Then a thicker red rule. Then the headline "ดูเนื้อ ไม่ดูหน้า" in large Anuphan ExtraBold. Below it, a red-pen circle (SVG) containing "CASE FILE #031" in red. The subhead below in printed Sarabun body.

**Rating verdict circle:** Instead of a clean badge, render an imperfect hand-drawn red circle (SVG path with slight wobble — NOT a clean `<circle>` element). Inside: "UNDERWEIGHT" in red Anuphan Bold. The circle sits at the top-right of the article entry. Below it in navy handwriting: "เกรดต่ำ — อ่านก่อนเซ็น" in small K2D.

**Article entry:** The body text in clean Sarabun at 18px. In the right margin (desktop, 25% width), render handwritten annotations in navy K2D/Caveat at 14px, each with slight random rotation (-2° to +2°):
- Note 1: "สัญญานี้ขายดีที่สุดในไทย — แต่ไม่ใช่เพราะมันดี" (connected to the article title by a thin dashed red SVG line)
- Note 2: "ข้อ 7.3 — ค่าเวนคืนใน 3 ปีแรก = 0 บาท" (connected to the body text)
- Note 3: "อ่านย่อหน้า 2 ก่อนตัดสินใจ" with a hand-drawn arrow pointing left

**Taped-in scrap:** Render a "taped-in" exhibit box — a card with 1px border, slightly rotated -1.5°, with a strip of translucent masking tape `rgba(245,240,220,0.65)` across the top. The tape renders as a CSS pseudo-element with slight transparency and a subtle shadow where it lifts off. Inside the scrap: "Exhibit A — ตารางเปรียบเทียบค่าเบี้ย" with a mini spec table.

**Temperature indicator:** Instead of the clean gradient bar from Provenance, render a "hand-drawn" thermometer strip — a thin vertical bar with tick marks and a red fill level, annotated with navy handwriting "ระดับความเสี่ยง: สูง". SVG with hand-drawn quality.

**Correction marks:** Show one example of a correction: the original text in Sarabun with a red wavy strikethrough (`text-decoration-style: wavy` in #CC3A2F), then below it in navy K2D: "แก้ไข: 60% → 72% หลังตรวจสอบอีกครั้ง"

**Verdict stamp at footer:** A large imperfect red circle (SVG, hand-drawn wobble) at the bottom-right of the article, containing "✗ ไม่ผ่าน" in red Anuphan Bold. The circle stroke is slightly thicker at the bottom (the pen pressed harder at the end). Below it in navy handwriting: "นาถ — 25/04/2026" as the investigator's signature.

**Footer:** Clean typeset footer, but rendered as a "printed" label taped into the notebook: "📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)" in IBM Plex Sans Thai at 12px, on a small cream card with tape marks.

**Ink blot:** One subtle dark ink blot (radial-gradient, #2B4A5E at 2% opacity, irregular shape) somewhere on the page — barely visible, as if the pen dripped once.

**Animation hints:**
- Body text fades in with `filter: blur(2px)→blur(0px)` on page load (ink settling)
- Red-pen circle draws itself (stroke-dashoffset animation) on viewport entry
- Taped-in scrap settles from -4px above with overshoot bounce
- Ink blot slowly appears at 2% opacity over 2s on load

---

## Direction 3: Spec Sheet (instrument documentation)

**Palette:**
- Background: #0A0A0A (matte black — instrument panel darkness)
- Surface / card: #141414 (subtle lift — slightly lighter than background)
- Body text: #E8E8E8 (off-white, never pure white)
- Accent (data): #00D4FF (electric cyan — tabular numerals, active states, data highlights)
- Critical signal: #FF3B30 (signal red — errors, rejections)
- Secondary accent: #2456C8 (cobalt blue — from Deep Research, user-specified preference over Investment Grade's navy)

**Typography:** Bai Jamjuree Bold (Thai display) + JetBrains Mono (Latin display). Anuphan Regular (Thai body) + Inter Regular (Latin body). JetBrains Mono for all numeric data with tabular figures locked.

**Background:** Pure matte black `#0A0A0A` — no texture, no grid, no grain. The darkness is the instrument panel. Cards float by being 1-2 stops lighter (#141414) with zero borders.

**Hero:** A 90vh dark panel. A large cyan-accented headline "ดูเนื้อ ไม่ดูหน้า" in Bai Jamjuree Bold with letter-spacing +0.02em, rendered large against the black. Below it: a thin 1px cyan horizontal rule. Then the subhead in Inter Light at 300 weight. Below that: a spec-card preamble — a two-column table with thin silver hairlines between rows. Left column: KEY in JetBrains Mono small caps. Right column: VALUE in Inter. Rows show: "TYPE" → "Insurance Contract Analysis", "GRADE" → "UNDERWEIGHT", "RISK" → "HIGH", "READ TIME" → "8 min".

**Spec card (the signature component):** Every entity opens with a spec card — a dark panel (#141414) with a 1px cyan top border. Two columns: left = key in JetBrains Mono small caps at 11px in #888888, right = value in Inter at 14px in #E8E8E8. Thin silver hairlines (#333333) between rows. The spec card contains: product name, premium range, coverage type, risk grade, verdict. On mobile, collapses to single column with values right-aligned.

**Article content:** Below the spec card: the article body. Inter at 16px with 1.7 line-height. Generous whitespace between paragraphs. Pull quotes in cyan JetBrains Mono. No images unless they're instrument-readout-style (graphs, tables, scans). Tables are dark with cyan headers and zebra-striping via background-lightening (#1A1A1A).

**Data animation:** Every numeric value has a `data-count` attribute. On viewport entry, animate from 0 to the target value over 600ms ease-out with tabular figures locked (monospace digits never reflow).

**Rating indicator:** Not a badge — a status indicator. A small cyan dot (8px, #00D4FF) next to the label "UNDERWEIGHT" in JetBrains Mono. The dot pulses once on hover (box-shadow expand from 0→10px→0 at 600ms). Red dot for critical items (#FF3B30).

**Verdict:** Rendered as an instrument readout — a small panel with cyan label "VERDICT" and value "FAIL" in red #FF3B30, rendered in JetBrains Mono with a thin cyan border. Positioned bottom-right of the article.

**Footer:** Clean typeset footer — "📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)" in #666666, small, centered. Rendered in JetBrains Mono for cold instrument consistency.

**Animation hints:**
- Spec card metric values count up on viewport entry (monospace, tabular figures locked)
- Cyan status dot pulses once on hover
- Table rows highlight on hover with a 1px cyan left-border draw

---

## Structure requirements

Render all 3 directions stacked vertically in ONE HTML file:

```html
<!-- Section 1: Provenance -->
<!-- Section 2: The Lab Notebook -->
<!-- Section 3: Spec Sheet -->
```

Each section must contain:
1. A hero area (or equivalent — the Lab Notebook's "first entry" replaces the hero)
2. An article card preview showing the sample content
3. At least one instance of the direction's signature component (rating badge, red-pen circle, spec card)
4. The verdict/stamp
5. The footer
6. A thin horizontal divider between sections labeled "DIRECTION 1: PROVENANCE" etc.

## Hard rules

- **Single file.** No external CSS, no external JS (except Google Fonts import). All styles in `<style>`.
- **Use real Thai text.** The exact content provided above. No lorem ipsum.
- **Mobile-first.** The page must be readable at 360px width. Use responsive CSS. Test vertical stacking.
- **Google Fonts only.** Load from `fonts.googleapis.com/css2`. Use the exact fonts specified. If a specified font isn't on Google Fonts, use the closest available alternative and note the substitution in a comment.
- **No images.** Everything must be CSS, SVG, or text. No external image assets.
- **Label everything.** Each section must be clearly labeled at the top.
- **Honor reduced-motion.** Wrap animations in `@media (prefers-reduced-motion: no-preference)`.
- **No placeholder content.** Use the exact Thai text provided. If a component needs text not specified, use Thai that fits the context.

## Format

Output the complete HTML file only. No preamble, no explanation, no "here's the code." Just the HTML.
```

---

## Usage instructions

1. Copy everything between the fence markers above.
2. Open a new terminal: `kimi`, `qwen`, or `deepseek-v4-pro`.
3. Paste the prompt.
4. Save the output as `docs/brainstorm/New UIUX/Landing-3-Way.html`.
5. Open in browser. Test on phone outdoors.
