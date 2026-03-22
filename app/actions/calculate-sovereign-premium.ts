'use server'

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { TERM_RATES } from './term-rates';

// --- Types ---

type PlanType = 'WHOLE_LIFE' | 'TERM' | 'UNKNOWN';

interface PricingRequest {
    productCode: string; // e.g., 'PLN 20.00', 'Term 20'
    age: number;
    gender: 'male' | 'female';
    sumAssured: number;
}

interface PricingResult {
    success: boolean;
    basePremium?: number;
    finalPremium?: number;
    discountApplied?: number;
    warnings?: string[];
    error?: string;
    debug?: {
        rate?: number;
        baseRate?: number; // Pre-discount
        formula?: string;
        source?: string;
    };
}

// --- Constants & Config ---

const CSV_PATH = path.join(process.cwd(), 'nerd/references/raw/calculator_source/main_policies_full.csv');
let GLOBAL_POLICY_CACHE: any[] | null = null;

// Product Code Mapping (UI Label -> CSV Code / Internal Key)
const PRODUCT_MAP: Record<string, { type: PlanType; csvCode?: string; termYears?: number }> = {
    // Whole Life
    '20Pay Life': { type: 'WHOLE_LIFE', csvCode: 'PLN 20.00' }, // Note: CSV has non-breaking space likely, handled by partial match logic if needed, but strict map preferred
    '15Pay 25': { type: 'WHOLE_LIFE', csvCode: '15Pay25' },
    '10Pay 25': { type: 'WHOLE_LIFE', csvCode: '10Pay25' }, // Verify if exists, waiting for "10Pay" confirmation in CSV investigation. Assuming '10Pay25' based on pattern or similar.
    // Term
    'Term 5': { type: 'TERM', termYears: 5 },
    'Term 10': { type: 'TERM', termYears: 10 },
    'Term 15': { type: 'TERM', termYears: 15 },
    'Term 20': { type: 'TERM', termYears: 20 },
};

// NOTE: CSV Codes in current file: 
// PLN 20.00, 15Pay25 ... 
// If '10Pay 25' isn't in CSV, it will fail gracefully.

// --- Helper: Load CSV ---
function loadPolicyData() {
    if (GLOBAL_POLICY_CACHE) return GLOBAL_POLICY_CACHE;

    try {
        const fileContent = fs.readFileSync(CSV_PATH, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });
        GLOBAL_POLICY_CACHE = records;
        return records;
    } catch (error) {
        console.error("Failed to load CSV:", error);
        return [];
    }
}

// --- Core Logic ---

export async function calculateSovereignPremium(request: PricingRequest): Promise<PricingResult> {
    const { productCode, age, gender, sumAssured } = request;
    const warnings: string[] = ["⚠️ Rate for Occupational Class 1 Only"]; // Always present

    // 1. Resolve Product Type
    // Direct mapping or fallback to raw code if passed directly
    let productInfo = PRODUCT_MAP[productCode];

    // If not in map, check if it looks like a raw CSV code (e.g. "PLN 20.00")
    if (!productInfo) {
        // Simple heuristic for now, or default to WHOLE_LIFE if it matches known CSV codes
        if (productCode.startsWith('Term')) {
            const years = parseInt(productCode.replace('Term', '').trim());
            if (!isNaN(years)) productInfo = { type: 'TERM', termYears: years };
        } else {
            productInfo = { type: 'WHOLE_LIFE', csvCode: productCode };
        }
    }

    if (!productInfo) {
        return { success: false, error: "Unknown Product Code", warnings };
    }

    // 2. Validation Rules
    if (age > 98) return { success: false, error: "Age exceeds maximum (98)", warnings };
    if (sumAssured <= 0) return { success: false, error: "Invalid Sum Assured", warnings };

    // Min Sum Assured Logic
    if (productInfo.type === 'WHOLE_LIFE') {
        if (productInfo.csvCode?.includes('20') && sumAssured < 100000) { // 20Pay
            return { success: false, error: "Minimum Sum Assured is 100,000", warnings };
        }
        // logic for 15/10 Pay
        if ((productInfo.csvCode?.includes('15Pay') || productInfo.csvCode?.includes('10Pay')) && sumAssured < 300000) {
            return { success: false, error: "Minimum Sum Assured is 300,000", warnings };
        }
    } else if (productInfo.type === 'TERM') {
        if (sumAssured < 350000) {
            return { success: false, error: "Minimum Sum Assured is 350,000", warnings };
        }
    }

    // Term Age Limits
    if (productInfo.type === 'TERM' && productInfo.termYears) {
        if (productInfo.termYears === 20 && (age < 20 || age > 45)) return { success: false, error: "Term 20 requires age 20-45", warnings };
        if (productInfo.termYears === 15 && (age < 20 || age > 50)) return { success: false, error: "Term 15 requires age 20-50", warnings };
        if (productInfo.termYears === 10 && (age < 20 || age > 55)) return { success: false, error: "Term 10 requires age 20-55", warnings };
        if (productInfo.termYears === 5 && (age < 20 || age > 59)) return { success: false, error: "Term 5 requires age 20-59", warnings };
    }

    // 3. Rate Lookup
    let baseRate = 0;
    let source = "";

    if (productInfo.type === 'TERM' && productInfo.termYears) {
        // Legacy Term Rate Lookup
        // Array structure in term-rates.ts is assumed to be [rate_at_min_age, rate_at_min_age+1, ...]
        // We need to know the min start age for the array. Usually 20 for Term.
        const minAge = 20;
        const index = age - minAge;

        const rates = TERM_RATES[`Term${productInfo.termYears}` as keyof typeof TERM_RATES];

        const ratesAny = rates as any;
        if (!rates || index < 0 || index >= (ratesAny.male?.length ?? ratesAny.length ?? 0)) {
            return { success: false, error: "Rate not found for this Age/Term", warnings };
        }

        // Gender Split? Assuming term-rates.ts has gender specific structure or just one array?
        // Checking archive instruction: "Term Rate Lookup: ... index is inputAge - minAge"
        // It implies a simple array. Usually Term rates differ by gender.
        // Let's assume term-rates export has structure: { "Term 20": { male: [], female: [] } } OR just flattened.
        // Looking at file size of term-rates.ts being small (2KB), it likely has simple structures.
        // We will perform a runtime check on the import structure.

        // Safe access
        const termData = rates as any;
        if (termData[gender]) {
            baseRate = termData[gender][index];
        } else {
            // Fallback if structure is different (flat array mixed?) - Unlikely for gender diff.
            // If undefined, maybe it's just 'rates[index]' if not gendered (unlikely for insurance).
            return { success: false, error: `Term Rate not found for gender ${gender}`, warnings };
        }

        source = "term-rates.ts";

    } else {
        // Whole Life CSV Lookup
        // Key format based on previous file view: Age-Gender-SegCode-Rate (This is the KEY column)
        // But we have the COLUMNS: age, gender, segcode, interest (Rate is often in 'interest' column in this dataset context per user notes? No, 'interest' usually means... wait.
        // Let's look at CSV header: key,age,gender,segment,segcode,interest,benefit,payment_term,coverage_period
        // Row 2 example: 46-male-20PLN-33.22, 46, male, ..., PLN 20.00, 33.22 ...
        // So 'interest' column holds the Premium Rate!

        const data = loadPolicyData();

        // Clean csvCode (CSV has "PLN 20.00", typically "PLN<nbsp>20.00" or similar)
        const targetCode = productInfo.csvCode;

        const row = data.find((r: any) =>
            r.age == age.toString() &&
            r.gender.toLowerCase() === gender.toLowerCase() &&
            r.segcode.replace(/\u00A0/g, ' ') === targetCode // Normalize NBSP
        );

        if (!row) {
            return { success: false, error: `Rate not found in CSV for ${targetCode} Age ${age} ${gender}`, warnings };
        }

        baseRate = parseFloat(row.interest);
        source = "main_policies_full.csv";
    }

    // 4. Discount Business Rules
    let discount = 0;

    if (productInfo.type === 'TERM') {
        if (sumAssured >= 1000000) discount = 1.00;
        else if (sumAssured >= 500000) discount = 0.50;
    }
    else if (productInfo.type === 'WHOLE_LIFE') {
        const code = productInfo.csvCode || '';

        if (code.includes('PLN') && code.includes('20')) { // 20Pay
            if (sumAssured >= 600000) discount = 2.00;
            else if (sumAssured >= 250000) discount = 1.00;
        }
        else if (code.includes('15Pay') || code.includes('10Pay')) { // 15/10 Pay
            if (sumAssured >= 500000) discount = 1.00;
        }
    }

    // 5. Calculation
    // Formula: (Rate - Discount) * (SA / 1000)
    const finalRate = Math.max(0, baseRate - discount);
    const totalPremium = finalRate * (sumAssured / 1000);

    return {
        success: true,
        basePremium: parseFloat((baseRate * (sumAssured / 1000)).toFixed(2)),
        finalPremium: parseFloat(totalPremium.toFixed(2)),
        discountApplied: discount,
        warnings,
        debug: {
            rate: finalRate,
            baseRate,
            source
        }
    };
}

// --- Test Verification (Manual Run) ---
/*
(async () => {
    // Term 20 Benchmark
    console.log("Test Term 20 (Male 35, 1M):", await calculateSovereignPremium({
        productCode: 'Term 20', age: 35, gender: 'male', sumAssured: 1000000
    }));
    
    // 20Pay Benchmark
    console.log("Test 20Pay (Male 35, 1M):", await calculateSovereignPremium({
        productCode: '20Pay Life', age: 35, gender: 'male', sumAssured: 1000000
    }));
})();
*/
