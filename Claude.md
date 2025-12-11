# 🤖 CLAUDE AGENT CONTEXT (MEMORY FILE)
**Project:** Nerd with Nart - Financial Strategy Platform
**Stack:** React 19 + Vite + Tailwind CSS + Hygraph (Headless CMS)
**Deployment:** Cloudflare Pages
**Last Updated:** Dec 11, 2025 (SEO Patch Applied)

---

## ⚠️ CRITICAL ARCHITECTURE RULES (DO NOT IGNORE)

### 1. FILE STRUCTURE (FLAT ARCHITECTURE)
**We DO NOT use a `src/` folder.**
- ✅ Correct: `components/Navbar.tsx`, `pages/ArticleView.tsx`, `library/api.ts`
- ❌ WRONG: `src/components/...`
- **Why:** This matches our specific Vite + Cloudflare config. Do not refactor into `src/`.

### 2. DESIGN SYSTEM: "THE TEAL PROTOCOL"
- **Primary (Logic/Safe):** `#2bb1bb` (Teal)
- **Action (Risk/Alert):** `#F59E0B` (Amber)
- **Text:** `slate-800` (Body), `slate-900` (Headings)
- **Fonts:** `Prompt` (Headings), `Sarabun` (Body)
- **Global UI:** All images in articles must use `rounded-2xl`.

### 3. SEO ENGINE (CURRENT STATE)
- **Library:** `react-helmet-async`
- **Implementation:**
  - `main.tsx` is wrapped in `<HelmetProvider>`.
  - `ArticleView.tsx` injects `<Helmet>` tags using data from Hygraph.
- **Hygraph Fields Mapped:** `seoTitle`, `seoDescription`, `coverImage.url`.

### 4. TOOL REGISTRY
- Interactive tools live in: `components/tools/`
- **Active Tools:**
  - `COI_Calculator.tsx` (Unit-Linked logic)
  - `Dynasty_Simulator.tsx` (Whole Life logic)
- **Injection:** We use shortcodes like `[TOOL:COI_CALC]` in Hygraph content, which `ArticleView.tsx` parses and replaces with the component.

---

## 📊 CURRENT SYSTEM STATUS
- **Frontend:** Fully functional SPA.
- **SEO:** Google Indexing works (JS execution). Social previews (OG Tags) are limited (Known CSR limitation).
- **Content:** Flagship article "Unit-Linked" is live.
- **Pending:** "Nong A / Medical Audit" article is in drafting.

---

## 🛠️ STANDARD COMMANDS
- **New Component:** Create in `components/`, use Teal Protocol colors.
- **New Page:** Create in `pages/`, update `App.tsx` router.
- **Hygraph Update:** If schema changes, check `library/queries.ts`.