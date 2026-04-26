import React, { useState } from 'react';
import policiesRaw from '../../data/calculator/main_policies.csv?raw';

// Parse CSV at load
const policyData = policiesRaw.split('\n').slice(1).filter(r => r.trim()).map(r => {
  const cols = r.split(',');
  return {
    age: cols[0],
    gender: cols[1],
    segcode: cols[3],
    interest: cols[4]
  };
});

const TERM_RATES = {
    'Term5': {
        minAge: 20,
        male: [4.89, 4.95, 4.99, 5.03, 5.06, 5.09, 5.13, 5.18, 5.25, 5.34, 5.45, 5.58, 5.72, 5.88, 6.05, 6.24, 6.44, 6.67, 6.91, 7.17, 7.46, 7.78, 8.14, 8.53, 8.96, 9.44, 9.95, 10.51, 11.11, 11.77, 12.47, 13.24, 14.08, 15.01, 16.04, 17.19, 18.50, 19.97, 21.65, 23.54],
        female: [3.28, 3.30, 3.32, 3.34, 3.36, 3.37, 3.40, 3.42, 3.44, 3.47, 3.51, 3.55, 3.60, 3.66, 3.73, 3.81, 3.91, 4.01, 4.13, 4.26, 4.41, 4.56, 4.73, 4.92, 5.11, 5.33, 5.56, 5.82, 6.11, 6.44, 6.80, 7.22, 7.70, 8.24, 8.85, 9.54, 10.31, 11.19, 12.18, 13.30]
    },
    'Term10': {
        minAge: 20,
        male: [4.38, 4.42, 4.47, 4.52, 4.57, 4.64, 4.72, 4.81, 4.91, 5.04, 5.18, 5.33, 5.50, 5.69, 5.90, 6.13, 6.37, 6.65, 6.94, 7.27, 7.63, 8.02, 8.45, 8.92, 9.43, 9.99, 10.59, 11.25, 11.97, 12.76, 13.63, 14.60, 15.68, 16.89, 18.25, 19.78],
        female: [2.79, 2.81, 2.83, 2.85, 2.87, 2.90, 2.93, 2.96, 3.00, 3.05, 3.10, 3.17, 3.24, 3.32, 3.42, 3.52, 3.64, 3.77, 3.91, 4.07, 4.24, 4.42, 4.63, 4.85, 5.10, 5.37, 5.68, 6.02, 6.41, 6.85, 7.34, 7.90, 8.54, 9.25, 10.06, 10.99]
    },
    'Term15': {
        minAge: 20,
        male: [4.42, 4.49, 4.56, 4.64, 4.73, 4.83, 4.94, 5.07, 5.21, 5.38, 5.56, 5.76, 5.98, 6.23, 6.50, 6.79, 7.12, 7.47, 7.85, 8.27, 8.72, 9.22, 9.76, 10.35, 11.01, 11.72, 12.52, 13.39, 14.37, 15.45, 16.66],
        female: [2.73, 2.76, 2.79, 2.82, 2.86, 2.90, 2.95, 3.00, 3.06, 3.13, 3.21, 3.30, 3.41, 3.52, 3.64, 3.78, 3.93, 4.10, 4.28, 4.48, 4.71, 4.96, 5.24, 5.55, 5.90, 6.29, 6.73, 7.22, 7.77, 8.40, 9.11]
    },
    'Term20': {
        minAge: 20,
        male: [4.56, 4.66, 4.76, 4.87, 5.00, 5.13, 5.29, 5.46, 5.65, 5.87, 6.11, 6.37, 6.65, 6.97, 7.31, 7.68, 8.09, 8.53, 9.01, 9.54, 10.12, 10.77, 11.48, 12.27, 13.14, 14.11],
        female: [2.75, 2.79, 2.83, 2.88, 2.94, 3.00, 3.07, 3.15, 3.23, 3.33, 3.44, 3.55, 3.69, 3.83, 3.99, 4.18, 4.38, 4.61, 4.86, 5.14, 5.46, 5.81, 6.20, 6.64, 7.14, 7.70]
    }
};

const PRODUCT_MAP: Record<string, { type: string; csvCode?: string; termYears?: number }> = {
    '20Pay Life': { type: 'WHOLE_LIFE', csvCode: '20PLN' },
    '15Pay 25': { type: 'WHOLE_LIFE', csvCode: '15Pay25' },
    '10Pay 25': { type: 'WHOLE_LIFE', csvCode: '10Pay25' },
    'Term 5': { type: 'TERM', termYears: 5 },
    'Term 10': { type: 'TERM', termYears: 10 },
    'Term 15': { type: 'TERM', termYears: 15 },
    'Term 20': { type: 'TERM', termYears: 20 },
};

export default function PremiumCalculator() {
    const [result, setResult] = useState<any>(null);
    const [isPending, setIsPending] = useState(false);

    const [formData, setFormData] = useState({
        productCode: '20Pay Life',
        age: 35,
        gender: 'male' as 'male' | 'female',
        sumAssured: 1000000,
    });

    const PRODUCTS = Object.keys(PRODUCT_MAP);

    const handleCalculate = () => {
        setIsPending(true);
        setTimeout(() => {
            const res = calculateSovereignPremium(formData);
            setResult(res);
            setIsPending(false);
            
            if (res.success) {
                // Dispatch event for other islands to listen to
                const event = new CustomEvent('premium-calculated', { detail: res });
                window.dispatchEvent(event);
            }
        }, 300);
    };

    function calculateSovereignPremium({ productCode, age, gender, sumAssured }: any) {
        const warnings: string[] = ["⚠️ Rate for Occupational Class 1 Only"];
        let productInfo = PRODUCT_MAP[productCode];

        if (!productInfo) return { success: false, error: "Unknown Product Code", warnings };
        if (age > 98) return { success: false, error: "Age exceeds maximum (98)", warnings };
        if (sumAssured <= 0) return { success: false, error: "Invalid Sum Assured", warnings };

        if (productInfo.type === 'WHOLE_LIFE') {
            if (productInfo.csvCode?.includes('20') && sumAssured < 100000) return { success: false, error: "Minimum Sum Assured is 100,000", warnings };
            if ((productInfo.csvCode?.includes('15Pay') || productInfo.csvCode?.includes('10Pay')) && sumAssured < 300000) return { success: false, error: "Minimum Sum Assured is 300,000", warnings };
        } else if (productInfo.type === 'TERM') {
            if (sumAssured < 350000) return { success: false, error: "Minimum Sum Assured is 350,000", warnings };
            
            if (productInfo.termYears === 20 && (age < 20 || age > 45)) return { success: false, error: "Term 20 requires age 20-45", warnings };
            if (productInfo.termYears === 15 && (age < 20 || age > 50)) return { success: false, error: "Term 15 requires age 20-50", warnings };
            if (productInfo.termYears === 10 && (age < 20 || age > 55)) return { success: false, error: "Term 10 requires age 20-55", warnings };
            if (productInfo.termYears === 5 && (age < 20 || age > 59)) return { success: false, error: "Term 5 requires age 20-59", warnings };
        }

        let baseRate = 0;
        let source = "";

        if (productInfo.type === 'TERM' && productInfo.termYears) {
            const minAge = 20;
            const index = age - minAge;
            const rates = (TERM_RATES as any)[`Term${productInfo.termYears}`];

            if (!rates || index < 0 || index >= rates[gender].length) {
                return { success: false, error: "Rate not found for this Age/Term", warnings };
            }
            baseRate = rates[gender][index];
            source = "term-rates.ts";
        } else {
            const targetCode = productInfo.csvCode;
            const row = policyData.find((r: any) =>
                r.age == age.toString() &&
                r.gender.toLowerCase() === gender.toLowerCase() &&
                r.segcode.replace(/\u00A0/g, ' ') === targetCode
            );

            if (!row) return { success: false, error: `Rate not found in CSV for ${targetCode} Age ${age} ${gender}`, warnings };
            baseRate = parseFloat(row.interest);
            source = "main_policies_full.csv";
        }

        let discount = 0;
        if (productInfo.type === 'TERM') {
            if (sumAssured >= 1000000) discount = 1.00;
            else if (sumAssured >= 500000) discount = 0.50;
        } else if (productInfo.type === 'WHOLE_LIFE') {
            const code = productInfo.csvCode || '';
            if (code.includes('PLN') || code.includes('20')) {
                if (sumAssured >= 600000) discount = 2.00;
                else if (sumAssured >= 250000) discount = 1.00;
            } else if (code.includes('15Pay') || code.includes('10Pay')) {
                if (sumAssured >= 500000) discount = 1.00;
            }
        }

        const finalRate = Math.max(0, baseRate - discount);
        const totalPremium = finalRate * (sumAssured / 1000);

        return {
            success: true,
            basePremium: parseFloat((baseRate * (sumAssured / 1000)).toFixed(2)),
            finalPremium: parseFloat(totalPremium.toFixed(2)),
            discountApplied: discount,
            warnings,
            debug: { rate: finalRate, baseRate, source }
        };
    }

    const THEME = {
        bg: 'bg-slate-900',
        card: 'bg-slate-800',
        input: 'bg-slate-700 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-white',
        label: 'text-slate-400 text-sm font-medium',
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/30',
        success: 'text-emerald-400',
    };

    return (
        <div className={`w-full max-w-4xl mx-auto p-6 rounded-xl shadow-2xl ${THEME.bg} text-slate-100 min-h-[600px] font-sans`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className={`lg:col-span-5 space-y-6 ${THEME.card} p-6 rounded-xl border border-slate-700/50`}>
                    <div>
                        <label className={`block mb-2 ${THEME.label}`}>Product Plan</label>
                        <select
                            className={`w-full rounded-md px-4 py-3 ${THEME.input}`}
                            value={formData.productCode}
                            onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                        >
                            {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={`block mb-2 ${THEME.label}`}>Entry Age</label>
                            <input
                                type="number"
                                className={`w-full rounded-md px-4 py-3 ${THEME.input}`}
                                value={formData.age}
                                min={0} max={98}
                                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className={`block mb-2 ${THEME.label}`}>Gender</label>
                            <div className="flex bg-slate-700 rounded-md p-1">
                                {['male', 'female'].map(g => (
                                    <button
                                        key={g}
                                        onClick={() => setFormData({ ...formData, gender: g as 'male' | 'female' })}
                                        className={`flex-1 py-2 rounded text-sm font-medium capitalize transition-all ${formData.gender === g
                                                ? 'bg-slate-600 text-white shadow-sm'
                                                : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className={`block mb-2 ${THEME.label}`}>Sum Assured</label>
                        <div className="relative">
                            <input
                                type="text"
                                className={`w-full rounded-md px-4 py-3 ${THEME.input} font-mono text-lg`}
                                value={formData.sumAssured.toLocaleString('en-US')}
                                onChange={(e) => {
                                    const val = Number(e.target.value.replace(/,/g, ''));
                                    if (!isNaN(val)) setFormData({ ...formData, sumAssured: val });
                                }}
                            />
                            <span className="absolute right-4 top-3.5 text-slate-500 text-sm">THB</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCalculate}
                        disabled={isPending}
                        className={`w-full py-4 mt-4 rounded-lg transition-all transform active:scale-95 ${THEME.button} ${isPending ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {isPending ? 'Calculating...' : 'Calculate Premium'}
                    </button>
                </div>

                <div className="lg:col-span-7 space-y-6">
                    {!result ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl">
                            <p>Enter details to view pricing</p>
                        </div>
                    ) : result.success ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-indigo-500/10 border border-indigo-500/30 p-8 rounded-2xl text-center">
                                <p className="text-indigo-300 text-sm font-medium uppercase tracking-widest mb-2">Total Annual Premium</p>
                                <div className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                                    <span className="text-2xl text-slate-500 align-top mr-2">฿</span>
                                    {result.finalPremium.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`${THEME.card} p-4 rounded-lg border border-slate-700`}>
                                    <p className="text-slate-400 text-xs">Standard Rate</p>
                                    <p className="text-xl font-mono text-white mt-1">{result.debug?.rate ? (result.debug.rate + result.discountApplied).toFixed(2) : '-'}</p>
                                    <p className="text-xs text-slate-600">Per 1,000 SA</p>
                                </div>
                                <div className={`${THEME.card} p-4 rounded-lg border border-slate-700`}>
                                    <p className="text-slate-400 text-xs">Discount Applied</p>
                                    <p className={`text-xl font-mono mt-1 ${result.discountApplied > 0 ? THEME.success : 'text-slate-500'}`}>
                                        {result.discountApplied > 0 ? `-${result.discountApplied.toFixed(2)}` : '0.00'}
                                    </p>
                                    <p className="text-xs text-slate-600">Large SA Benefit</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-xl text-center">
                            <p className="text-rose-400 font-medium">Calculation Failed</p>
                            <p className="text-rose-300/80 text-sm mt-2">{result.error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
