# 🏗️ NERD WITH NART: FRONTEND ARCHITECTURE LOG

## 1. Project Structure
**Status:** ✅ Active
**Type:** FLAT (No `src` folder)
**Root:**
- `components/` (UI & Tools)
- `pages/` (Views)
- `library/` (Helper logic)

## 2. The Tool Registry Pattern
**Location:** `components/tools/`
**Logic:**
- **Registry (`registry.tsx`):** Maps string keys (e.g., `'DYNASTY_SIM'`) to React Components.
- **Loader (`ToolLoader.tsx`):** Universal component that renders tools based on the key.
- **Library (`library/`):** Where individual tool components live (e.g., `components/tools/library/DynastySimulator.tsx`).

## 3. Shortcode Injection Engine
**Location:** `pages/ArticleView.tsx` (Rich Text p-renderer)
**Trigger:** `[TOOL:KEY]` inside Hygraph content.
**Mechanism:**
- Splits raw content string by Regex.
- Injects `<ToolLoader />` at the split point.
- **Crucial Fix:** Uses a recursive `getText()` helper in `ArticleView.tsx` to flatten nested Hygraph objects (The "Diamond-Drill Fix").

## 4. Current Active Tools
- **`DYNASTY_SIM`**: The Dynasty Calculator.
  - **Path:** `components/tools/library/DynastySimulator.tsx`
  - **Features:** 100M preset, Manual Age Input, Teal Protocol UI.

## 5. Design System (Teal Protocol)
- **Primary:** `#2bb1bb` (Teal)
- **Action:** `#F59E0B` (Amber)

---
- **`COI_CALC`**: The Unit-Linked Truth Engine (Unit-Linked COI Calculator).
  - **Path:** `components/tools/library/COICalculator.tsx`
  - **Features:** Linear Interpolation of TMO 2017 rates, Teal Protocol AreaChart, Safety Disclaimer.
  - **Trigger:** `[TOOL:COI_CALC]`

## 6. Key Pages
- **`ToolsPage` (Nerd's Laboratory)**
  - **Path:** `pages/ToolsPage.tsx`
  - **Route:** `/tools`
  - **Purpose:** Central hub showcased all registered tools (`ToolLoader`).

## 7. Contact Page Architecture
- **Component:** `pages/Contact.tsx`
- **Integrations:** Web3Forms (Email), Official LINE Logo (Asset Swap).
- **Copy:** "OFFICIAL CHANNEL" (Professional Standard).

## 8. Design Decision Record (2025-12-10)
- **Experiment:** "Antigravity Azure" (`#3B82F6`) vs "Electric Cyan" (`#06b6d4`) vs "Teal" (`#2bb1bb`).
- **Verdict:** **KEEP TEAL**.
- **Reason:** Fits "Financial Architect" persona. Avoids "Tech Demo" or "Generic SaaS" vibes.

---
**Protocol:** Update this file whenever architecture changes.

## [2025-12-11] PHASE 7: THE NEXT.JS MIGRATION (COMPLETE)
**Objective:** Migrated from Vite (CSR) to Next.js 16 (SSG) to fix Social SEO.

### 🏗️ Major Changes
1.  **Engine Swap:** Replaced Vite with Next.js 16.0.8 (App Router).
2.  **Styling Fix:** Reverted Tailwind v4 to v3.4 to restore "Teal Protocol" responsiveness (Hamburger menu fix).
3.  **Data Layer:** Replaced Apollo Client with `lib/hygraph.ts` (Server-Side Fetching).
4.  **Route Porting:** Created `/tools`, `/manifesto`, `/contact` pages.
5.  **Search Repair:** Fixed broken modals by creating `Providers.tsx` and wrapping `layout.tsx`.

### 🐛 Known Issues & Fixes
- **Article Crash:** Fixed circular JSON error in `ArticleContent` by removing illegal stringify.
- **Rate Limits:** Build process hits Hygraph limits during SSG. (Dev mode unaffected).
- **Search Logic:** English keywords ("Unit", "COI") currently fail. Suspect AST parsing issue.

### 🚀 Next Steps
1.  Fix Fuse.js indexing logic (Extract text from AST).
2.  Deploy to Cloudflare Production.

### [2025-12-11] SEARCH REPAIR COMPLETE
**Fix:** Implemented "Pancake Strategy" for Fuse.js.
- Flattened Hygraph Rich Text AST into plain text strings.
- Removed nested key lookups (`content.text`) in favor of `plainText`.
- Result: 100% Hit Rate for English and Thai keywords.
