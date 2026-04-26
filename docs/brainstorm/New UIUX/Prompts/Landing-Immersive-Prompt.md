# One-Shot Landing Page — 3 Most Immersive Directions

**Paste into:** Any coding-capable LLM terminal (Kimi, Qwen, DeepSeek)
**Output:** Single HTML file rendering Slow Cinema · Celluloid · Yaowarat Code
**Goal:** Compare which HOME page immersion feels most like a premium site

---

## The Prompt (copy from here ↓)

```
Generate a single self-contained HTML file that renders a landing page comparison for **ประกันเนื้อๆ (beef.im)** — a Thai personal-finance + meat/cooking content platform.

Render 3 distinct visual directions stacked vertically in the same file. Each section is labeled. Use the same Thai content for all 3 so comparison is fair.

---

## Content to render (use this exact copy for all 3)

**Site name:** ประกันเนื้อๆ
**Domain:** beef.im
**Hero headline:** ดูเนื้อ ไม่ดูหน้า
**Hero subhead:** วิเคราะห์สัญญาประกันและเนื้อวากิวด้วยมาตรฐานเดียวกัน
**Hero tagline:** ไม่มีน้ำ ไม่มีเซลล์
**Article title:** ทำไม Whole Life 99/20 ถึงได้เกรด C — แกะสัญญาทีละข้อ
**Article dek:** สัญญานี้ขายดีที่สุดในไทย แต่เมื่ออ่านเงื่อนไขจริง — ค่าเบี้ยสูงเกินผลตอบแทน 60% และข้อจำกัดการเวนคืนซ่อนอยู่ในหน้า 7
**Rating:** UNDERWEIGHT · ความเสี่ยงสูง
**Read time:** 8 นาที
**Category:** CASE FILE #031
**Body paragraph 1:** สัญญา Whole Life 99/20 คือผลิตภัณฑ์ประกันชีวิตที่ขายดีที่สุดในไทยในปี 2025 ด้วยจำนวนกรมธรรม์ใหม่กว่า 120,000 ฉบับ แต่เมื่ออ่านเงื่อนไขการจ่ายผลประโยชน์ตามจริง กลับพบว่าผลตอบแทนการลงทุนสุทธิหลังหักค่าธรรมเนียมอยู่ที่เพียง 1.8–2.2% ต่อปี — ต่ำกว่าอัตราเงินเฟ้อเฉลี่ยของไทยที่ 2.5%
**Body paragraph 2:** ข้อ 7.3 ในสัญญาระบุว่า "บริษัทขอสงวนสิทธิ์ในการปรับลดมูลค่าเวนคืนกรมธรรม์ ตามดุลยพินิจของบริษัทในกรณีที่มีการยกเลิกภายใน 3 ปีแรก" — คำว่า "ตามดุลยพินิจ" คือช่องโหว่ที่ทำให้บริษัทสามารถลดมูลค่าเวนคืนได้โดยไม่ต้องชี้แจงเหตุผล
**Verdict:** ไม่ผ่าน
**Footer:** 📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)

---

## Direction 1: Slow Cinema (Theatrical)

**Mood:** A24 film atmosphere — a full-bleed cinematic still pins in place while the headline rises and the byline fades in over 80vh of scroll. The page *performs* before it asks you to read. Like a film title sequence.

**Palette:**
- Background: #1A0F0A (deep teak — warm dark, NOT pure black)
- Surface / card: #2A1B12 (warmer charcoal, slightly lighter)
- Body text: #F0EAD6 (warm cream — theatrical subtitle color)
- Accent: #D2691E (ember orange — limited use: bylines, section numbers, one highlight)
- Critical: #C41E3A (cardinal red — verdicts, alerts)

**Typography:** Load from Google Fonts. Display: IBM Plex Serif Thai (weight 600–700) for Thai headlines + a warm editorial serif for Latin (Tiempos Headline or Playfair Display). Body: Sarabun (Thai, 400) + a warm readable serif (Source Serif 4 or Tiempos Text) at 17–18px. Mono: JetBrains Mono.

**Background:** Solid deep teak with no texture — the darkness is the cinema auditorium. Very subtle warm radial gradient behind the hero: `radial-gradient(ellipse at 30% 40%, rgba(210,105,30,0.08) 0%, transparent 60%)`.

**Hero — the cold open:**
- Full viewport height (100vh). A large "atmospheric still" fills the hero — since no external images, render a CSS gradient that reads as a textured dark still: a warm diagonal light ray across dark teak with subtle noise. Use multiple layered gradients with a faint SVG noise data URI.
- On the left side (lower third): the headline "ดูเนื้อ ไม่ดูหน้า" in large white/slightly-warm serif — IBM Plex Serif Thai at clamp(2.5rem, 6vw, 4.5rem), weight 700.
- Below: the subhead in small cream text.
- Below: the byline "ประกันเนื้อๆ · beef.im" in ember orange at 0.75rem.
- A subtle scrolling indicator at the bottom-centre: a thin vertical line that pulses.

**Animation (CSS + Intersection Observer):**
- The hero "still" image section stays position: sticky or uses a negative margin technique so that for the first ~60vh (mobile: 40vh) of scrolling, the hero content remains visible.
- During this pinned phase: the headline translates upward by 24px (from slightly below its rest position), the byline fades from opacity 0 to 1, and the subhead fades from 0.3 to 1 — all tracking scroll position via a single Intersection Observer at multiple thresholds or a scroll-linked CSS transform.
- After the hero releases, body content scrolls in normally. No further animation.

**Article section:**
- Below the hero: content in a single column, max-width 640px, generous padding. The body text renders in warm cream against the dark teak. Long-scroll narrative — no cards, just text and void.
- The verdict "ไม่ผ่าน" renders as a large standalone word in ember orange with a thin 1px horizontal rule above it, centered, at the article footer.

**What makes it immersive:** The page withholds content. For ~2-3 seconds of scrolling, the reader sees only the cinematic still and the headline — forced to absorb the atmosphere before earning the article. No Thai finance site has ever used a cinematic title-card lock.

---

## Direction 2: Celluloid (Film Grain + Intermission)

**Mood:** A 35mm contact sheet from a Thai indie film — grain, golden hour halation, 4:3 locked frames, and the patience to hold a frame for ten seconds.

**Palette:**
- Background: #0C0C09 (projection booth black, 2% warmth — never #000)
- Surface / card: #1A1A14 (frame borders — slightly lighter, for content cards)
- Body text: #DDD5C4 (theatrical subtitle cream — the most comfortable extended-reading warm light)
- Accent: #E8A840 (golden hour direct sun — timestamps, section markers, key figures)
- Critical: #E0553D (red channel clipping)

**Typography:** Load from Google Fonts. Display: Taviraj Bold (Thai, 700 — vintage Thai film title contrast) + Cinzel Bold (Latin, 700 — cinematic letterforms). Body: Noto Sans Thai (400) + Inter (400) at 17px. Mono: DM Mono (400 — slightly wide, like subtitle fonts).

**Background:** Solid projection-booth black. Very subtle warm radial vignette at the bottom of the viewport: `radial-gradient(ellipse at 50% 100%, rgba(232,168,64,0.04) 0%, transparent 50%)`. Faint film grain effect via a pre-rendered canvas overlay (see animation section).

**Hero:**
- Full viewport height. The headline "ดูเนื้อ ไม่ดูหน้า" in Taviraj Bold + Cinzel, large (clamp(2.5rem, 6vw, 5rem)), cream-white, centered or left-aligned.
- Below headline: a thin 1px golden horizontal rule (#E8A840 at 40% opacity).
- Below: the subhead and tagline in Noto Sans Thai + Inter, small, cream.
- Below: the byline "ประกันเนื้อๆ · beef.im" in golden hour amber.
- The hero has a permanent vignette overlay: `radial-gradient(ellipse at center, transparent 60%, #0C0C09 100%)` at 50% opacity — like looking through a lens.

**Visual motif — the 4:3 frame:**
- All images or hero sections are locked to 4:3 aspect ratio with a permanent `::after` overlay producing a soft dark vignette.
- Content cards have a 1px border in `#33332A` — like individual frames on a contact sheet.
- Between major sections: a "120px intermission band" — solid #0C0C09 with a single centered 5px amber dot (#E8A840) that breathes softly (box-shadow pulse on a 4s cycle). This is the reader's visual exhale.

**Animation:**
- **Film grain dissolve on section transitions.** Pre-render a 128×128 canvas of random warm-tinted pixels (not pure greyscale — bias toward amber-warm tones). Scale to full viewport with `image-rendering: pixelated`. On each new section entering the viewport (Intersection Observer), the grain overlay flashes from 0% to 15% opacity then settles back to 5% over 600ms. One flash per section. Touch devices: simple opacity crossfade, no grain.
- **Hero vignette breathing.** The hero's vignette overlay oscillates between 45% and 55% opacity on an 8s sine wave. Subtle enough to feel like the projector bulb warming.

**Article section:**
- Content in a 680px center column. Generous vertical spacing (64px between paragraphs).
- The body reads as "subtitles" — cream text on projection black, clean, calm.
- Between the hero and the article: an intermission band (120px black with amber dot).
- Between article sections: another intermission band.

**What makes it immersive:** The grain makes the page feel *shot*, not coded. The intermission bands force the reader to pause — cinematic pacing applied to a website. Every transition is film language.

---

## Direction 3: Yaowarat Code (Typographic Physics)

**Mood:** The typographic energy of Bangkok's Chinatown at night, refined into digital — Thai characters drift on scroll, collide, overlap, and land with deliberate tension. The page has physics.

**Palette:**
- Background: #0D0D0D (off-black — the night street)
- Surface / card: #1A1A2E (deep midnight blue — the sky between neon signs)
- Body text: #F0E6D0 (warm off-white — sign-lit pavement)
- Accent (primary): #FF5533 (neon orange-red — the dominant Yaowarat sign color)
- Accent (secondary): #FFD700 (warning gold — taxi-yellow, sign-yellow, highlights)

**Typography:** Load from Google Fonts. Display: Bai Jamjuree Bold (Thai, 700–800) + Unbounded (Latin, 700–900) — both geometric, both designed for large physical format. Body: Prompt (Thai, 300–400) + Inter (Latin, 400) — Prompt handles Thai at small scales better than most geometric faces. Mono: Space Mono (Latin only — used for data punch where Thai isn't needed).

**Background:** Solid off-black. Full-bleed sections with visible negative space between them. A very subtle vertical film grain or scanline effect across the darkest areas (12px repeating horizontal lines at 0.03 opacity).

**Hero:**
- Full viewport height (100vh). The headline "ดูเนื้อ ไม่ดูหน้า" is split into individual character spans — each character of "ดูเนื้อ" and "ไม่ดูหน้า" is a separate `<span>` inside the H1.
- The headline is massive: `clamp(3.5rem, 9vw, 7rem)` in Bai Jamjuree Black. The text color is #F0E6D0.
- Characters have slight baseline offsets — "ดู" sits 4px higher, "นื้อ" 3px lower, "ไม่" at baseline, "ดู" 2px higher, "หน้า" 5px lower. Each character staggered by 2–6px vertically.
- Below the headline: the subhead in Prompt at 1rem, separated by a 1px neon-orange rule.
- The byline in Space Mono, small, letter-spaced, in amber-gold.
- Behind the headline, at very low opacity: 3–4 giant single Thai characters (like watermarks) — "เน้", "อ", "หม่", "าั" — in Bai Jamjuree at 20rem, #FF5533 at 4% opacity, each at a different rotation and position, forming a chaotic but balanced cluster.

**Key animation — Character Drift on Scroll:**
- When the user scrolls into a section with character-drift spans, 3–5 specific Thai characters (spans within the headline or section markers) translate horizontally at opposing parallax rates.
- Characters marked as `data-drift="left"` translate at -0.25x the scroll delta (they drift left as you scroll down).
- Characters marked as `data-drift="right"` translate at +0.5x (they drift right faster).
- A single Intersection Observer detects which section is in view. A scroll handler (throttled to requestAnimationFrame) applies `transform: translateX(calc(var(--drift-offset) * var(--drift-multiplier)))` to each span.
- As the section fully enters view, characters settle back to their original positions over 600ms ease-out.
- Only 3–5 characters per section get this treatment — scarcity makes each collision feel intentional.

**Between sections:**
- Large single-Thai-character glyph markers act as section dividers. A centered giant character (e.g., `ก` for section 1, `ข` for section 2) in neon-orange at 12rem with 10% opacity sits between content blocks.
- These glyph-markers also drift slightly on scroll — acting as the section's visual anchor.

**Article card:**
- Cards have no border-radius. Hard edges. A 2px neon-orange left border.
- Headline in Bai Jamjuree Bold. Dek in Prompt.
- Rating "UNDERWEIGHT" and "ความเสี่ยงสูง" rendered as a small neon sign — amber text in a thin-bordered rectangle with a slight offset drop shadow in neon-orange.
- The card sits with deliberate asymmetry — it starts at an offset from the main content column, not perfectly aligned.

**Layout:**
- Asymmetric — headlines may start at the second visual "column" rather than flush-left. Text blocks have deliberate horizontal offsets.
- Generous vertical negative space between content blocks — 100px minimum.
- Mobile: offsets compress to left-aligned but the aggressive scale, character drift, and glyph-markers remain.

**Footer:**
- Rendered as a closing neon sign — the footer text in Space Mono, amber, with a thin neon-orange border around it, centered at the bottom of the page.

**What makes it immersive:** The page has *physics*. Characters don't just sit there — they move as you move, collide with each other, then settle. The layout is alive. It's the opposite of a static blog — it's a Bangkok street at night, rendered in type.

---

## Structure requirements

Render all 3 directions stacked vertically in ONE HTML file. Each labeled with a thin header: "SLOW CINEMA", "CELLULOID", "YAOWARAT CODE" in small uppercase monospace.

Each section must contain:
1. A complete hero area
2. The article content (headline, dek, 2 body paragraphs, verdict, footer)
3. The direction's signature animation/effect implemented

## Hard rules

- **Single file.** No external CSS, no external JS except Google Fonts `<link>`. All styles in `<style>`.
- **Use real Thai text.** The exact content provided above. No lorem ipsum.
- **Mobile-first.** Must be readable at 360px width. Responsive CSS for font sizes, spacing, and hiding effects that don't work on mobile.
- **No external images.** Everything CSS, SVG, or canvas-generated. Hero "photographs" are gradient composites or SVG.
- **Google Fonts only.** Load all fonts from `fonts.googleapis.com/css2`. If a specified font isn't on Google Fonts, use the closest available and note the substitution.
- **Honor reduced-motion.** Wrap animations in `@media (prefers-reduced-motion: no-preference)` or set `animation-duration: 0.01ms` under reduced-motion.
- **Implement the key animation for each direction.** Don't just describe it in comments. Slow Cinema needs the pinned-hero scroll effect. Celluloid needs the grain dissolve. Yaowarat Code needs character drift. These are the entire point of the preview.
- **Label each section** clearly at the top.

## Format

Output the complete HTML file only. No preamble, no explanation.
```

---

## Usage

1. Copy everything between the fence markers above.
2. New terminal: `kimi`, `qwen`, or `deepseek-v4-pro`.
3. Paste. Save output as `docs/brainstorm/New UIUX/Landing-Immersive-3-Way.html`.
4. Open in browser. Scroll through all 3.
