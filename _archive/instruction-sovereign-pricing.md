# 📤 AGENT 2A MISSION: SOVEREIGN PRICING ENGINE (INTERNAL UI)

**Objective:** Build the "AIA Pricing Engine" dashboard for internal use.
**Architecture:** Next.js Server Actions (Logic) + React Client Component (UI).

## Phase 1: The Sovereign Logic (Server Side)
Create `app/actions/calculate-sovereign-premium.ts`.

### 1. Data Loading Strategy (Hybrid Source)
*   **Whole Life (20PLNP, 15PLNP, 10PLNP):** Read from `nerd/references/raw/calculator_source/main_policies_full.csv`.
*   **Term Life (Term5, Term10, Term15, Term20):** I have extracted these rates for you. Import them from the file I just created: `app/actions/term-rates.ts`. Do **not** try to find them in the CSV.

### 2. Business Logic Implementation
*   **Formula:** `(Base Rate - Discount) * (Sum Assured / 1000)`
*   **Term Rate Lookup:** Since `term-rates.ts` uses arrays starting at `minAge`, the index is `inputAge - minAge`. If index is out of bounds, product is unavailable.

### 3. Critical Discount Rules (Must Implement)
*   **20Pay Life:**
    *   SA 250,000 - 599,999: Discount **-1.00**
    *   SA >= 600,000: Discount **-2.00**
*   **15Pay / 10Pay Life:**
    *   SA >= 500,000: Discount **-1.00**
*   **Term Plans:**
    *   SA 500,000 - 999,999: Discount **-0.50**
    *   SA >= 1,000,000: Discount **-1.00**

### 4. Validation Rules
*   **Max Entry Age:** Strictly **98** (Coverage to 99). Block inputs >= 99.
*   **Term Age Limits:**
    *   Term 20: 20-45
    *   Term 15: 20-50
    *   Term 10: 20-55
    *   Term 5: 20-59
*   **Min Sum Assured:**
    *   20Pay: 100,000
    *   15/10Pay: 300,000
    *   Term: 350,000

## Phase 2: The Dashboard UI (Client Side)
Create `components/tools/library/SovereignPricingEngine.tsx`.

1.  **Theme:** "Dark Mode Admin" (Slate/Indigo). Use the layout style: Gender/Age/Plan/SA inputs.
2.  **Inputs:**
    *   **Plan Dropdown:** 20Pay, 15Pay, 10Pay, Term 5/10/15/20.
    *   **Age Input:** 0-98 (with validation feedback).
    *   **Sum Assured:** Auto-format with commas.
3.  **Output:**
    *   Total Annual Premium.
    *   **Warning Card:** "⚠️ Rate for Occupational Class 1 Only".

## Phase 3: Integration
1.  Add to `ToolLoader.tsx` with key `SOVEREIGN_PRICING`.
2.  Add a button to `ToolsPageContent.tsx` (Use `Shield` icon, Indigo/Slate theme).

## Verification Test Case
*   **Scenario:** Male, Age 35, Term 20 Years, Sum Assured 1,000,000.
*   **Base Rate:** 7.68 (from `term-rates.ts`)
*   **Discount:** -1.00 (SA >= 1M)
*   **Final Rate:** 6.68
*   **Premium:** 6,680 THB.
