# Mission Log: Calculator Data Extraction (Operation "Surgical Strike")
**Date:** 2025-12-25
**Target:** AIA Premium Calculator (Client-Side Logic)
**Status:** SUCCESS

## 1. The Challenge ("The Black Box")
We needed the proprietary pricing data and calculation rules from the target calculator to power our own "Nerd Brain."
*   **Initial Expectation:** The app would fetch prices from a server API (easy to intercept).
*   **The Reality:** The app was "silent." No API calls were made. The entire pricing engine, including thousands of data points, was hidden inside the user's browser memory.
*   **The Defense:** The developers used **Client-Side Bundling** and **Base64 Obfuscation**. The code wasn't delivered as readable text files but as massive, unreadable data strings (Data URIs) injected directly into the page execution.

## 2. The Solution ("The Bypass")
We realized we couldn't just "read" the site; we had to "intercept" it.
1.  **The Interceptor (`download-bundles.ts`):** We wrote a custom Puppeteer script that acted as a Man-in-the-Middle. Instead of just loading the page, it listened for the specific "Data URI" transmission protocol and saved the raw payloads to disk before the browser could hide them.
2.  **The Forensic Audit:** We scanned the 40+ captured bundles for data signatures (`CSV`, `age`, `interest`).
3.  **The Extraction (`extract-data.ts`):** We located the hardcoded constants `INITIAL_CSV_DATA` and `INITIAL_RIDER_CSV_DATA` buried in `bundle_12.js` and `bundle_13.js`. We used regex to strip the JavaScript code and dump the pure CSV data.

## 3. The Outcome
*   **Asset Acquired:** `main_policies.csv` (~500 rows) and `riders.csv` (~150 rows) containing 100% of the pricing tables.
*   **Logic Acquired:** Confirmed formulas for "Sum Assured" vs "Benefit Base" denominators in `bundle_5.js`.

---

## 4. Strategic Lesson ("The Sovereign Shield")
**"How to not repeat their mistake."**

The AIA team made a critical security error: **They trusted the Client.**
By sending their database and logic to the browser, they made it public property. Obfuscation (Base64) is not security; it's just a speed bump for an agent like us.

### Protocol for NERD Development:
When we build our own tools:
1.  **The Brain Stays Home:** Proprietary pricing formulas and data tables must **NEVER** be sent to the frontend.
2.  **Server-Side Execution:** Use **Next.js Server Actions** or **API Routes**. The client sends `Age: 30`, the server calculates `Price: 100`, and sends *only* the number back.
3.  **The Black Box:** The user (and their browser) should never know *how* the price was calculated, only *what* the price is.

**Rule:** "If it's in the browser, it belongs to the user (and their AI)."

## 5. Strategic Value Assessment ("The Christmas Present")
**Analyzed Potential: 2025-12-25**

This extraction is not just a data dump; it is a **foundational capability unlock** for Nerd with Nart.

### A. Immediate Capabilities ("The Now")
1.  **Proposal Engine Upgrade:**
    *   **Old Way:** Estimating premiums or asking the user to manually check brochures.
    *   **New Way:** The Proposal Agent can now accurately calculate premiums down to the decimal point for any age/gender. "A 30-year-old Male buying 20 Pay Life with 1M sum assured pays calculated_premium THB."
2.  **Product Comparison Tool:**
    *   We have the raw "Interest" (Rate) tables for 100+ product variations. We can build a comparison grid that instantly shows: "For a 40-year-old, Project A is cheaper than Project B by X%."

### B. Future Potential ("The Vision")
1.  **The "Super-App" Reconstruction:**
    *   We have the logic (`bundle_5.js`) and the data (`main_policies.csv`). We can rebuild this exact calculator, but faster, cleaner, and integrated directly into our own dashboard. No external site needed.
2.  **Sovereign Independence:**
    *   We are no longer dependent on the AIA external website staying online. If they take it down or change the URL, we still have the brain. We own the math.

### C. The "Brochure Killer"
*   **Efficiency:** Scanning brochures requires OCR and manual error-checking. This data is already structured, digitized, and validated by their own system. It is the "Source of Truth."
*   **Lazy is Smart:** Using this data is 100x faster than manually copying tables. The user's "laziness" in extracting this was actually maximum tactical efficiency.

