# Feasibility Report: Premium Calculator Data Extraction

## Executive Summary
**Verdict:** **Logic-Based (Extraction Complete)**
The target application (`https://premium-cal-649957826912.us-west1.run.app/`) does **not** use an external JSON API for pricing data. Instead, all pricing logic and data are **embedded purely client-side** within the JavaScript bundles.

Using a custom reconnaissance probing script, we successfully intercepted the application bundles, identified the hardcoded data sources (`INITIAL_CSV_DATA` and `INITIAL_RIDER_CSV_DATA`), and extracted the raw CSV files containing all premium rates and policy rules.

## Technical Analysis

### 1. Architecture
*   **Type:** Client-Side Single Page Application (React)
*   **Hosting:** Google Cloud Run
*   **Bundling:** Vite/Webpack (Heavily code-split)
*   **Data Strategy:** Static CSV strings embedded in JavaScript variables, parsed at runtime by a `csvUtils` module.

### 2. Data Discovery
During network analysis, no relevant XHR/Fetch requests were observed. Analysis of the downloaded JavaScript bundles revealed:
*   **`dataService.js`**: Orchestrates data loading. It attempts to load from Supabase (which failed/was not configured in this environment) and falls back to hardcoded `INITIAL_CSV_DATA`.
*   **`csvUtils.js`**: Contains logic to parse standard CSV strings into JSON objects.
*   **`bundle_12.js`**: Contained the variable `INITIAL_CSV_DATA` (Main Policies).
*   **`bundle_13.js`**: Contained the variable `INITIAL_RIDER_CSV_DATA` (Riders).

### 3. Data Extraction (Phase 1, 2 & 4)
- **Initial Finding:** `INITIAL_CSV_DATA` (Main Policies) and `INITIAL_RIDER_CSV_DATA` (Riders) were found embedded in JS bundles.
- **Correction:** Both embedded datasets were incomplete fallbacks.
- **Solution:** Utilized discovered Supabase credentials to fetch the **full datasets** directly from the backend tables `main_policies` and `riders`.
- **Result:**
    - `main_policies_full.csv`: Complete catalog of 18 products (e.g., 10/15/20 Pay Life, Annuity Fix, CI ProCare).
    - `riders_full.csv`: Complete catalog of 51+ rider options across all ages.

### 4. Logic & Calculation
The pricing calculation is performed by `Calculator.js` using `useMemo` hooks. It filters the parsed CSV data based on user input (Age, Gender, Segment) and applies simple arithmetic formulas:
*   **Premium Formula:** `(Interest Rate * Sum Assured) / Denominator`
*   **Denominator:** Usually 1000 or the Policy Benefit amount.

## Recommendations
Since the data is static clientside code, "ingestion" into `nerd_brain` is simply a matter of parsing the now-extracted CSV files. No ongoing API integration is needed unless the source application is updated, in which case the `download-bundles.ts` and `extract-data.ts` scripts can be re-run to fetch the latest data.

**Next Steps:**
1.  Ingest `main_policies_full.csv` and `riders_full.csv` into the `product_engine`.
2.  Map the CSV columns to the `nerd` generic data schema.
3.  Update `calculatePremium` tool to use the new full datasets.
