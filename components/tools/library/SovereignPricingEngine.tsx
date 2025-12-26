'use client'

import React, { useState, useTransition } from 'react';
import { calculateSovereignPremium } from '@/app/actions/calculate-sovereign-premium';

// Theme Constants
const THEME = {
    bg: 'bg-slate-900',
    card: 'bg-slate-800',
    input: 'bg-slate-700 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-white',
    label: 'text-slate-400 text-sm font-medium',
    accent: 'text-indigo-400',
    button: 'bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/30',
    danger: 'text-rose-400',
    success: 'text-emerald-400',
};

export default function SovereignPricingEngine() {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        productCode: '20Pay Life',
        age: 35,
        gender: 'male' as 'male' | 'female',
        sumAssured: 1000000,
    });

    const PRODUCTS = [
        '20Pay Life',
        '15Pay 25',
        'Term 20',
        'Term 15',
        'Term 10',
        'Term 5'
    ];

    const handleCalculate = () => {
        startTransition(async () => {
            const res = await calculateSovereignPremium(formData);
            setResult(res);
        });
    };

    const formatCurrency = (amt: number) => {
        return new Intl.NumberFormat('th-TH', { style: 'decimal', minimumFractionDigits: 0 }).format(amt);
    };

    return (
        <div className={`w-full max-w-4xl mx-auto p-6 rounded-xl shadow-2xl ${THEME.bg} text-slate-100 min-h-[600px] font-sans`}>

            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Sovereign Pricing Engine</h1>
                        <p className="text-slate-400 text-xs uppercase tracking-wider">Internal Actuarial Dashboard</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Input Panel */}
                <div className={`lg:col-span-5 space-y-6 ${THEME.card} p-6 rounded-xl border border-slate-700/50`}>

                    {/* Product */}
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

                    {/* Age & Gender Row */}
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

                    {/* Sum Assured */}
                    <div>
                        <label className={`block mb-2 ${THEME.label}`}>Sum Assured</label>
                        <div className="relative">
                            <input
                                type="text"
                                className={`w-full rounded-md px-4 py-3 ${THEME.input} font-mono text-lg`}
                                value={formData.sumAssured.toLocaleString()}
                                onChange={(e) => {
                                    const val = Number(e.target.value.replace(/,/g, ''));
                                    if (!isNaN(val)) setFormData({ ...formData, sumAssured: val });
                                }}
                            />
                            <span className="absolute right-4 top-3.5 text-slate-500 text-sm">THB</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-right">Min: 100,000 (Based on plan)</p>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        disabled={isPending}
                        className={`w-full py-4 mt-4 rounded-lg transition-all transform active:scale-95 ${THEME.button} ${isPending ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {isPending ? 'Calculating...' : 'Calculate Premium'}
                    </button>
                </div>

                {/* Display Panel */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Warning Card */}
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-start gap-3">
                        <span className="text-amber-500 text-xl">⚠️</span>
                        <div>
                            <h4 className="text-amber-400 font-semibold text-sm">Occupational Class 1 Only</h4>
                            <p className="text-amber-500/80 text-xs mt-1">
                                Display rates are valid for standard risk class only. High-risk occupations require loading.
                            </p>
                        </div>
                    </div>

                    {/* Empty State / Results */}
                    {!result ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl">
                            <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <p>Enter details to view pricing</p>
                        </div>
                    ) : result.success ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            {/* Main Total */}
                            <div className="bg-indigo-500/10 border border-indigo-500/30 p-8 rounded-2xl text-center">
                                <p className="text-indigo-300 text-sm font-medium uppercase tracking-widest mb-2">Total Annual Premium</p>
                                <div className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                                    <span className="text-2xl text-slate-500 align-top mr-2">฿</span>
                                    {formatCurrency(result.finalPremium)}
                                </div>
                            </div>

                            {/* Breakdown */}
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

                            {/* Debug Info */}
                            <div className="p-4 bg-black/20 rounded text-xs font-mono text-slate-600">
                                DEBUG: Source={result.debug?.source} | BasePrem={result.basePremium}
                            </div>

                        </div>
                    ) : (
                        <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-xl text-center">
                            <p className="text-rose-400 font-medium">Calculation Failed</p>
                            <p className="text-rose-300/80 text-sm mt-2">{result.error}</p>
                            {result.warnings?.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-rose-500/20 text-xs text-rose-500/60">
                                    {result.warnings.join(', ')}
                                </div>
                            )}
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}
