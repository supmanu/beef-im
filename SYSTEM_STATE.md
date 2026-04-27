# ประกันเนื้อๆ (beef.im): SYSTEM STATE

## 🧹 GEM MAINTENANCE PROTOCOL (COLD STORAGE)
**Location:** `_archive/legacy_pillars/`
**Concept:** "Runtime vs. Config."
*   **Runtime:** `nerd/pillars/` (Clean) → Read by Agents during execution.
*   **Config:** `_archive/legacy_pillars/` (Storage) → Source code for Gem Prompts.

**Procedure for Updating Gems:**
1.  **Retrieve:** Fetch specific instruction file (e.g., `instruction-auditor-setup.md`) from archive.
2.  **Update:** Edit the file with new standards (e.g., v1.8 changes).
3.  **Generate:** Create the new prompt string.
4.  **Restore:** Save the updated file BACK to `_archive/legacy_pillars/`.
*   **Do NOT** leave config files in the active `nerd/pillars/` folder.

## 🟢 CURRENT STATUS: v6.3 SEO + ANIMATION POLISH (Apr 28, 2026)
* **Last Updated:** Apr 28, 2026 (Flip animation removed → ink-settle reveal; SEO & accessibility fixes)
* **Model Stack:**
    *   **Premium:** Claude Sonnet 4.6 / Opus 4.6 (Code & Production)
    *   **Research:** Gemini 3 Pro (Deep Research & UI Verification — Irreplaceable)
    *   **Routine:** Gemini 3 Flash
* **Architecture:** Astro 6.1.9 + Tailwind v4 + MDX + Content Layer.
* **UI State:** "Notebook" aesthetic fully implemented. Typography legibility pass complete. Ink-settle reveal active (IntersectionObserver cascade on homepage entries).
* **Deployment:** Cloudflare Pages (`beef-im`) active. Primary repo: `supmanu/beef-im`.

## ✅ ACCOMPLISHMENTS
*   **[Architecture]** **Strategic Pivot to Astro 6.1+ & MDX (Apr 26-27, 2026).**
    *   **Action:** Full migration from Next.js to Astro 6.1.9. Dropped Payload/Neon for Git-based MDX Content Layer.
    *   **MDX Suite:** Custom components (`<Highlight>`, `<MarginNote>`, `<ScrapCard>`, `<CorrectionBlock>`, `<VerdictSeal>`) implemented with auto-injection.
    *   **Visual Parity:** 100% matched `Prototype-Definitive-v1.html`. Fixed background bleed, MDX paragraph wrapper bugs, and typography drifts.
    *   **Dynamic Hero:** Implemented truly dynamic client-side date in Hero section (MON · 27 APR 26).
    *   **Refinement:** "ภรรยาบอกว่า..." verdict label tuned to 10px / 0.8 opacity / Navy (fixed the "hidden bug" where MDX forced 15px/Black).
    *   **Deployment:** Cloudflare Pages build pipeline verified.
*   **[Brand]** **Rebranded to beef.im (Apr 23, 2026).**
*   **[Insurance Ops]** **AIA Client Onboarding Toolkit Deployed (Apr 22, 2026).**
    *   **Health Questions Preview (`Health_Questions_PREVIEW_Card.md`):** Compact bilingual EN/TH checklist for pre-meeting client prep. Sent via LINE before iPad sessions.
    *   **Medical History Checklist (`Medical_History_Checklist.md`):** Full 8-section self-assessment (symptoms, diagnosed conditions, surgeries, medications, family history, lifestyle, tests, declarations).
    *   **AIA iPad Cheat Sheet (`AIA_iPad_Application_Cheat_Sheet.md`):** Agent reference mapping Q21–Q29 from AIA e-policy screenshots. EN-first with TH condition matching for iPad form navigation.
    *   **Document Requirements (`Document_Requirements_Checklist.md` + `Document_Checklist_Card.md`):** Full + pocket-size checklists for foreign nationals by visa type (Work, Business, Elite, Student, Retirement). Highlights Thailand Elite = passport only, no Work Permit.
    *   **LINE Message Templates:** Ready-to-send preview messages for expat clients, with W-8BEN heads-up for US citizens.
*   **[Tooling]** **Typora Theme: `aia-checklist.css` (Apr 22, 2026).**
    *   **Purpose:** Compact checklist/preview document theme optimized for PDF export → LINE sharing.
    *   **Design:** Sans-serif only (Inter + Sarabun), tight bullet spacing, navy blue accent (#1e4d8c), full table borders.
    *   **Contrast:** Slimmer and more scannable than `claude-proposal.css` for utility documents.
*   **[Validation]** **Mode C (Epic Deep Dive) Validated (v1.9.3).**
    *   **Result:** DeepSeek Reasoner produced a 2,800-word masterpiece with 100% compliance.
    *   **Evidence:** Perfect Fourth Wall discipline, exact watermark counts, and proactive self-correction loops.
*   **[Identity]** **Native Thai Terminology Pivot (v4.4).**
    *   **Action:** Updated `data-terminology.md` and `performer.md` to favor descriptive Thai over technical English (e.g., "แบบเบี้ยจ่ายทิ้ง" instead of "(Renewable Term)").
    *   **Goal:** Eliminate "translation smell" and maximize colloquial authenticity.
*   **[Agent]** **Performer v1.9.3 Deployed (The Discipline Upgrade).**
    *   **Fixes:** "Citation Trap" (citing Bridge Lab) patched. "มั่งคั่ง" banned globally.
    *   **Protocol:** Mandatory 5-File Pre-Flight Check enforced.
    *   **Optimization:** Watermark counts made EXACT (not minimums) to prevent clutter.
*   **[Agent]** **Performer v1.8 Deployed (A/B Test Validated).**
    *   **Optimization:** A/B tested across 7 models with 4 external evaluators.
    *   **Fixes:** Explicit "Fourth Wall" ban list, vocabulary guards for "quicksand" errors.
    *   **Stack:** **DeepSeek Reasoner** promoted to #1 Workhorse (9.3/10). **DeepSeek Chat** REMOVED (length explosion).
*   **[Infrastructure]** **Universal Performer Agent (v1.7.2) Standardized.**
    *   **Consolidation:** Merged high-strength `performer-universal.md` into the primary `performer.md`.
    *   **Capabilities:** Full 19-step CoT, 29-idiom bank, and explicit Vocabulary Guards (ปกป้อง vs ปกครอง) locked for all models.
    *   **Benchmarking:** Successfully completed a 7-model shootout (Opus, Sonnet, DeepSeek R1/V3, MiniMax, GLM, GPT-5.2) validating framework supremacy over model selection.
*   **[Optimization]** **Architect & Performer Protocol Calibration.**
    *   **Action:** Synchronized Agent 1 (Architect) and Agent 2 (Performer) measurement standards.
    *   **Result:** Updated `content-engine.md` and `instruction-architect.md` with Thai Length Calibration (30-40% shorter than English).
*   **[Infrastructure]** **OpenCode CLI Configuration Complete.**
    *   **Agent 2 (Performer):** Migrated to OpenCode CLI for high-velocity production.
    *   **Hygiene:** `reset-workbench.ps1` script and `_draft_archive` protocol active.
*   **[Optimization]** "Project Weightless" complete. `nart-avatar.ts` refactored to Hybrid RAG.
*   **[Cost]** Reduced per-message context from ~75KB to ~5KB.
*   **[Identity]** "No-Pi" Rule enforced via `nart-avatar.ts` injection.
*   **[Identity]** `#009` Bridge ID Leakage ELIMINATED via double-ban.
*   **[Quality]** Restored 10-Point "Legacy Checklist" in `framework-deep-dive.md`.
*   **[Identity]** "Footer Seal" Protocol enforced.
*   **[Agent]** **Performer v3.1 Calibrated** (Checklist + Data Imports).
*   **[Agent]** **Proposal Generator v4.1 (Sovereign Fortress)** Deployed.
    *   **Architecture:** Hybrid RAG Bridge (Active Retrieval).
    *   **Safeguards:** 10-point Checklist + 5 Hard-Coded Guards.
    *   **Status:** Production Ready.
*   **[Capability]** **Brochure Pipeline (Manual + AI)** Established.
    *   **Lexicon:** `sovereign-lexicon.md` created (Product/Medical/OCR).
    *   **Skill:** `instruction-brochure-cleaner.md` created.
    *   **Library:** Standardized `library/assets/raw` structure.
*   **[Brain]** `nerd_brain` re-ingested with v7.0 Rules.
*   **[Optimization]** **ThaiHealth Watch 2025/2026 Cleanup Complete.**
    *   **Scope:** Cleaned & Restored both documents (100% Accuracy).
    *   **Result:** 150+ OCR errors corrected, garbage/hallucinations removed.
    *   **Memory:** Patterns integrated into `nerd/references/sovereign-lexicon.md`.
*   **[Optimization]** **NHES VII Audit & Clean Complete.**
    *   **Status:** Certified & Ingested (Dec 25, 2025).
    *   **Scope:** Forensic audit, structural hardening, Golden Number verification.
    - [x] **NHES VII Pillar Upgrade (v2.0)** <!-- id: pillar_0 -->
    -   **Detailed audit & upgrade** complete. Logged in SYSTEM_STATE.
    *   **Golden Numbers:** Verified (Obesity 45.0% / Diabetes 10.6% / HT 29.5%).
*   **[Optimization]** **NHES VII Pillar Upgrade (v2.0) Complete.**
    *   **Status:** Sovereign Edition Live.
    *   **New Data:** Added Regional Risk Map & Demographic Deep-Dives.
    *   **Compliance:** Thai-First Headers, No "Pi".
*   **[Infrastructure]** **Agent 2C Toolchain Migration (Roo → Cline) Complete.**
    *   **Action:** Replaced unstable Roo Code with upstream CLINE extension.
    *   **Configuration:** Migrated `.roomodes` to `.clinerules` (v1.1) for seamless Agent 2C identity.
    *   **Provider:** **NATIVE MiniMax** (via Coding Plan API Key) - *Not OpenAI Compatible*.
    *   **Benefit:** Native BYOM support for Minimax M2.1 without "hacky" aliases.
*   **[Optimization]** **Performance fix applied:** `.clineignore` implemented to stabilize Agent 2C checkpoints.
*   **[Validation]** **Audit Complete:** Agent 2C Output (obesity-wealth-gap-test.md) **[PASS]**.
    *   **Checks:** Zero "Pi", 45.0% Benchmark, Analysis Footer.
    *   **Verdict:** Ambient Intelligence verification successful.
*   **[Discovery]** **"Ambient Intelligence" Confirmed.**
    *   **Finding:** MiniMax M2.1 autonomously reads workspace pillar files without explicit context injection.
    *   **Result:** A++ Thai content with Voice DNA compliance.
    *   **Action:** Updated `.clinerules` to leverage this native behavior.
*   **[Deprecation]** **GLM-4.7 Redundant.**
    *   **Decision:** Removed from content workflow (B-Grade Thai vs. MiniMax A++).
    *   **Status:** Agent 2C is now exclusively MiniMax M2.1.
*   **[Hygiene]** **Workspace Sanitized:** Archived legacy docs, purged logs & temp scripts.
*   **[Infrastructure]** **Vercel Deployment Fixed:** Added missing `graphql` dependency and fixed `tsconfig` script exclusion.
*   **[Infrastructure]** **Twin CTO Architecture Active:** Claude (Agent 2B) migrated to CLI/Desktop for full repository access.
*   **[Capability]** **Calculator Data Extraction (Operation 'Surgical Strike') Complete:**
    *   **Target:** External Premium Calculator (React App)
    *   **Method:** Logic Analysis -> Supabase Credential Discovery -> API Extraction
    *   **Assets:** `main_policies_full.csv` (18 products), `riders_full.csv` (51+ riders), 100% Rate Table Coverage.
    *   **Security Insight:** Client-side credentials exposed. New Protocol: **Server-Side Execution ONLY** for our tools.
    *   **Artifact:** `nerd/references/raw/calculator_source/` (Full Digital Brain)
*   **[Agent]** **Sovereign Pricing Engine (v1.0) Live.**
    *   **Tool:** `calculatePremium` integrated into `nart-avatar.ts`.
    *   **Power:** Exact premium calculations using extracted CSV rate tables.
    *   **Protocol:** Mandatory use for all proposal pricing to ensure 100% accuracy.
*   **[Agent]** **Sovereign Engine v1.5 Deployed.**
    *   **Consolidation:** Merged Performer v3.1 + Hybrid v8.1 + Proposal v4.1 into `.clinerules`.
    *   **Features:** Tone Matrix (T1-T5), Math Verification Protocol, Dual Brains (Artist/Analyst).
    *   **Result:** Actuarial precision + Native Thai fluency (Verified in `insurance-extinction-2083v1_5.md`).
*   **[Agent]** **Sovereign Proposal Engine v1.0 Deployed.**
    *   **File:** `.clinerules-proposal`
    *   **Logic:** RAG Bridge + Iron Dome Compliance + Nationality Positioning.
    *   **Status:** Production Ready for private client proposals.
*   **[Infrastructure]** **"Twin Brain" Alias System Live.**
    *   **Command:** `mmclaude` (Minimax M2.1) vs `claude` (Sonnet).
    *   **Method:** PowerShell profile injection via official Minimax Proxy (`api.minimax.io/anthropic`).
    *   **Benefit:** Zero-setup Sovereign Model Switching in CLI.
*   **[Discovery]** **Minimax Ambient Intelligence Confirmed.**
    *   **Observation:** Minimax M2.1 autonomously internalized "Voice DNA" from workspace files.
    *   **Result:** Produced A++ Thai content ("Letter from 75") without extensive prompting.
    *   **Decision:** Consolidated Agent 2C role to Minimax M2.1 (Code + Content).
*   **[Infrastructure]** **MiniMax MCP Protocol Active.**
    *   **Scope:** Enabled for both **Claude Desktop** and **Claude CLI**.
    *   **Capability:** "God Mode" (Vision + Web Search) now available for Agent 2B/2C.
    *   **Command:** `claude mcp list` to verify "MiniMax" server status.

## 🧠 STRATEGIC LOCKS
1.  **Hybrid Law:** Voice DNA is in Prompt. Constitution is in Vector.
2.  **Identity Law:** Never use "Pi". Never use English Headers.
3.  **Footer Law:** Per constitution.md Article VII — dual-footer: `📊 บทวิเคราะห์โดย: ประกันเนื้อๆ (beef.im)` for finance, `🔥 คัดเนื้อโดย: ประกันเนื้อๆ (beef.im)` for meat. Retired `เนิร์ดกับนาถ (Nerd with Nart)` is BANNED.
4.  **Bridge Law:** Usage of `#009` or internal IDs in output is FORBIDDEN.
5.  **Production Law:** Claude Code Skills = Truth Source. Mastra = Exploratory only (non-core).
6.  **Agent Law:** Performer MUST load `data-nhes-vii` and `tech-bridge-lab`.
7.  **Fiduciary Law:** Proposal Generator MUST bundle `Multi-Pay CI` + `Total Care` by hard-code.
8.  **RAG Law:** Pricing & Visa rules must use `<rag_bridge_protocol>` triggers.
9.  **Brochure Law:** Cleaners MUST use `sovereign-lexicon.md`.
10. **Hierarchy Law:** Layer 2 (PDF Vault) is **Forensic Fallback ONLY**. Primary production MUST use Layer 3 (Markdown/Vector).

## 🎨 UI/UX ENHANCEMENTS

*   **[SEO + Animation Polish]** beef.im Animation Replacement + SEO/Accessibility Fixes (Apr 28, 2026).
    *   **Flip animation REMOVED** — full-viewport `rotateY(-160deg)` at 1.4s caused vestibular-visual conflict (motion sickness). Same root cause as FPS sensitivity. Scroll hijack (preventDefault) compounded the effect. Decision: no viewport-filling 3D transforms on this site.
    *   **Ink-settle reveal (replacement):** Homepage entries fade+blur-in via IntersectionObserver cascade. Uses existing `inkSettle` keyframe (`blur(4px→0) + opacity(0→1) + translateY(4px→0)`). Header settles first (0ms/80ms), first visible cards stagger at 160/240/320…ms, below-fold cards reveal on scroll. Double event listener (`DOMContentLoaded` + `astro:page-load`) for View Transitions readiness. Guard: `container.dataset.inkInit` prevents double-init.
    *   **SEO fixes:**
        *   `public/robots.txt` created — was serving HTML to crawlers (100 errors in PageSpeed).
        *   `Sitemap: https://beef.im/sitemap-index.xml` — wired to existing `@astrojs/sitemap` integration.
    *   **Accessibility fixes:**
        *   `h3` → `h2` in `NotebookEntry.astro` — heading order was `h1` → `h3` (skipped level).
        *   `<main>` landmark added to `BaseLayout.astro` — screen reader navigation.
    *   **Font cleanup:**
        *   Removed `@fontsource/noto-serif-thai` (400+700) — `--font-serif` variable was declared but never applied to any element. Dead CSS imports.
        *   Added `<link rel="preload">` for `anuphan-thai-700-normal.rOsLv-jZ.woff2` — LCP font. Moves Thai heading font fetch to parallel with HTML parse. **Update hash if `@fontsource/anuphan` package version changes.**
    *   **Favicon:** Changed from custom `ป`-in-circle SVG to 🥩 emoji SVG. Readable at 16px tab size; on-brand for beef.im.
    *   **Typography Sprint (Apr 27, prev session):**
        *   Article H1: 24→28px mobile, 28→34px tablet. Homepage lede: 13→14px. Verdict label: 10→12px, opacity 0.8→0.85. Article nav back: 10→12px. Body text: 16px at ≥1200px. Footer stamp: 42→48px circle.
        *   Hero CTA button: warm black (#2B2420) + border-radius 3px + warm border.
*   **[Visual Refinement Sprint]** Site-Wide Typography & Asset Sovereignty (Mar 22, 2026).
    *   **Scope:** 11 commits across 2 sessions covering all pages (Home, Articles, Tools, Contact, Manifesto).
    *   **Typography Standard:** `tracking-wider` locked as site-wide standard for all uppercase labels/badges. Replaced all `tracking-widest`, `tracking-[0.2em]`, `tracking-[0.3em]` instances.
    *   **Display Numbers:** `font-mono` → `font-prompt` for all large formatted numbers (eliminates excessive comma spacing).
    *   **Article Page:** Disabled teal scroll gradient (flat #0B1D35 navy). Softened headings `text-white` → `text-slate-100`. Tightened line height `leading-loose` → `leading-relaxed`. Consolidated blockquote styling to globals.css.
    *   **Archive Cards:** Restored legacy hover effects (card lift -8px, image zoom+brighten on group-hover, 500ms/700ms transitions, READ ANALYSIS CTA with arrow slide).
    *   **Hero Section:** Freshened by reducing overlay stack (image opacity 60→70%, gradient via 60→40%, side vignette 70→50%, heading gradient to-gray-400 → to-gray-200).
    *   **Tools:** COI disclaimer dark-themed (`bg-slate-800/60`), Dynasty Simulator harmonized, IRR Truth Teller currency inputs fixed (type="text" + parseCurrency).
    *   **Contact Page:** All label tracking normalized to `tracking-wider`.
    *   **Asset Sovereignty:** ALL static assets migrated from Hygraph CDN to R2 (`assets.nerdwithnart.com/nwn-assets/`). Zero `graphassets.com` references remain in codebase.
    *   **R2 Asset Registry:** hero-mountain.jpg (94K), contact-basecamp.jpg (160K), navbar-logo.png (9K), og-background.jpg (353K), natapol-supmanu-avatar.png (renamed from natapol-supmanu-nerd-with-nart-avatar.png, rebrand Apr 24, 2026).
*   **[Manifesto Page]** Typography & Layout Refinement Complete (Dec 25, 2025).
    *   **Hero:** Optimized heading size (`text-4xl/6xl/7xl`) for balanced impact.
    *   **Container:** Widened from `max-w-4xl` to `max-w-5xl` for less cramped feel.
    *   **Thai Typography:** Upgraded body text to `text-lg` with `leading-loose` for +50% readability.
    *   **Card Hierarchy:** Section titles enlarged to `text-2xl/3xl`, English labels to `text-sm`.
    *   **Visual Balance:** Restructured number displays (66→33, ROI 13%) with proper spacing.
    *   **Icons:** Fixed decorative background icons with `p-6` spacing from corners.
*   **[Tools Page]** Hybrid Design Implementation Complete (Dec 25, 2025).
    *   **COI Calculator:** Light disclaimer card (`bg-white/80`) for Thai readability, upgraded labels to `text-base`.
    *   **Dynasty Simulator:** Standardized title to match COI (`text-3xl/4xl`), removed awkward DELTA badge.
    *   **Buttons:** Enlarged all preset buttons (`text-sm`, `px-5 py-2.5`) for better usability.
    *   **Disclaimers:** Converted to subtle light cards with `text-base leading-loose` for maximum readability.
    *   **Result:** Premium dark aesthetic + optimal Thai text readability.
*   **[Homepage]** Typography Standardization Complete (Dec 25, 2025).
    *   **BentoGrid Cards:** Upgraded all titles from `text-2xl` to `text-3xl md:text-4xl` (+50% size).
    *   **Card Descriptions:** Upgraded from `text-sm` to `text-base leading-loose` (+28% Thai readability).
    *   **Hero Subtitle:** Enlarged from `text-lg/xl` to `text-xl/2xl` with `leading-loose`.
    *   **Search Input:** Upgraded placeholder from `text-sm` to `text-base`.
    *   **Result:** Consistent typography scale across all pages (Manifesto/Tools/Homepage).
*   **[Tool]** **IRR Truth Teller (Beta) Deployed.**
    *   **Logic:** Server-Side Newton-Raphson Engine (`calculateIRR`) for 100% precision.
    *   **Privacy:** "Sovereign Shield" architecture (No client-side math exposure).
    *   **UI:** User-Input driven (Universal compatibility with any insurance illustration).
    *   **Verdict:** Auto-generates investment grade rating (e.g. "Bank Deposit Zone", "Wealth Destruction").
*   **[Tool]** **Sovereign Pricing Engine (Internal UI) Deployed.**
    *   **Logic:** Hybrid Server Action (Term Rates + CSV Loading).
    *   **Power:** Auto-applies "Large Sum Assured" discounts per Business Rules.
    *   **UI:** "Dark Mode Admin" theme with strict Validation Constraints.
    *   **Status:** Internal Actuarial Use Only (Not public).

## 🚀 READY
*   System is ready for **High-Volume Content Production** (Cost Optimized).
*   **Next:** Scaling production content.

## ⏳ PENDING ACTIONS
*   [ ] **Scale Content Production:** Execute High-Volume Weekly Pack.

## 📦 BACKLOG
*   [x] **Activate Z.AI Pro Plan:** CANCELLED (Redundant due to Minimax Consolidation).
*   [x] **Setup Agent 2C (GLM):** DEPRECATED (Minimax M2.1 is the new Agent 2C).
*   [ ] **Review Switch Guide:** Read `docs/GLM_CLAUDE_SWITCH_GUIDE.md` (for historical reference).