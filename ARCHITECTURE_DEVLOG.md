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
