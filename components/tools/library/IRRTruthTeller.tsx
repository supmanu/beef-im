'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateIRR } from '../../../app/actions/calculate-irr';
import { Plus, Trash2, Calculator, ArrowRight, AlertTriangle, TrendingUp, Search } from 'lucide-react';

type CashbackRule = {
    id: string;
    startYear: number;
    endYear: number;
    amount: number;
};

// Format number with commas, strip non-numeric, remove leading zeros
const formatCurrency = (value: string): string => {
    const num = value.replace(/[^0-9]/g, '').replace(/^0+/, '');
    if (!num) return '';
    return Number(num).toLocaleString();
};

const parseCurrency = (value: string): number => {
    const num = Number(value.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
};

export default function IRRTruthTeller() {
    // INPUT STATE
    const [premium, setPremium] = useState<number>(0);
    const [payYears, setPayYears] = useState<number>(20);
    const [cashbacks, setCashbacks] = useState<CashbackRule[]>([]);
    const [maturityAmount, setMaturityAmount] = useState<number>(0);
    const [maturityYear, setMaturityYear] = useState<number>(20);

    // RESULT STATE
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // HELPERS
    const addCashback = () => {
        setCashbacks([
            ...cashbacks,
            { id: Math.random().toString(36).substr(2, 9), startYear: 1, endYear: maturityYear, amount: 0 }
        ]);
    };

    const removeCashback = (id: string) => {
        setCashbacks(cashbacks.filter(c => c.id !== id));
    };

    const updateCashback = (id: string, field: keyof CashbackRule, value: number) => {
        setCashbacks(cashbacks.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const handleCalculate = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        // Build Cashflow Array
        const flows = [];

        // 1. Premiums (Outflows) - Paid at BEGINNING of year (Year 0 to N-1)
        for (let i = 0; i < payYears; i++) {
            flows.push({ year: i, amount: -premium });
        }

        // 2. Cashbacks (Inflows) - Received at END of year (Year 1 to N)
        cashbacks.forEach(rule => {
            for (let i = rule.startYear; i <= rule.endYear; i++) {
                flows.push({ year: i, amount: rule.amount });
            }
        });

        // 3. Maturity (Inflow) - Received at END of year
        if (maturityAmount > 0) {
            flows.push({ year: maturityYear, amount: maturityAmount });
        }

        try {
            const data = await calculateIRR(flows);
            if (data.status === 'success') {
                setResult(data);
            } else {
                setError(data.message || "Calculation Failed");
            }
        } catch (err) {
            setError("System Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 font-sarabun text-slate-200">
            
            {/* HEADER */}
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold font-prompt text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                    IRR Truth Teller
                </h2>
                <p className="text-slate-400">
                    เครื่องมือค้นหาความจริงของผลตอบแทน (Internal Rate of Return) <br/>
                    ถอดรหัสโฆษณาด้วยคณิตศาสตร์ที่เป็นกลาง
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LEFT: INPUTS */}
                <div className="space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                    
                    {/* SECTION 1: PAYING */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-rose-400 font-bold font-prompt">
                            <ArrowRight className="rotate-45" /> 1. สิ่งที่คุณจ่าย (Outflow)
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-slate-500 mb-1">เบี้ยประกันต่อปี (บาท)</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-teal-500 focus:outline-none"
                                    value={premium ? premium.toLocaleString() : ''}
                                    placeholder="0"
                                    onChange={(e) => setPremium(parseCurrency(e.target.value))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500 mb-1">จ่ายกี่ปี</label>
                                <input 
                                    type="number" 
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-teal-500 focus:outline-none"
                                    value={payYears}
                                    onChange={(e) => setPayYears(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/5" />

                    {/* SECTION 2: RECEIVING */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold font-prompt">
                            <ArrowRight className="rotate-[135deg]" /> 2. สิ่งที่คุณได้ (Inflow)
                        </div>

                        {/* CASHBACKS */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm text-slate-400">เงินคืนระหว่างสัญญา (Cashback)</label>
                                <button onClick={addCashback} className="text-xs flex items-center gap-1 text-teal-400 hover:text-teal-300">
                                    <Plus size={14} /> เพิ่มรายการ
                                </button>
                            </div>
                            
                            {cashbacks.map((cb) => (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    key={cb.id} 
                                    className="flex gap-2 items-center bg-slate-900/50 p-2 rounded-lg"
                                >
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        ปีที่ <input 
                                            type="number" 
                                            className="w-12 bg-slate-800 rounded px-1 text-center text-white"
                                            value={cb.startYear}
                                            onChange={(e) => updateCashback(cb.id, 'startYear', Number(e.target.value))}
                                        />
                                        ถึง <input 
                                            type="number" 
                                            className="w-12 bg-slate-800 rounded px-1 text-center text-white"
                                            value={cb.endYear}
                                            onChange={(e) => updateCashback(cb.id, 'endYear', Number(e.target.value))}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="จำนวนเงิน"
                                        className="flex-1 bg-slate-800 rounded px-2 py-1 text-sm text-white"
                                        value={cb.amount ? cb.amount.toLocaleString() : ''}
                                        onChange={(e) => updateCashback(cb.id, 'amount', parseCurrency(e.target.value))}
                                    />
                                    <button onClick={() => removeCashback(cb.id)} className="text-slate-600 hover:text-rose-500">
                                        <Trash2 size={16} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* MATURITY */}
                        <div className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20">
                            <label className="block text-sm font-bold text-emerald-400 mb-2">เงินก้อนเมื่อครบสัญญา (Maturity)</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">รับคืนปีที่</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                                        value={maturityYear}
                                        onChange={(e) => setMaturityYear(Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">จำนวนเงิน (บาท)</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                                        value={maturityAmount ? maturityAmount.toLocaleString() : ''}
                                        placeholder="0"
                                        onChange={(e) => setMaturityAmount(parseCurrency(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleCalculate}
                        disabled={loading}
                        className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold font-prompt text-lg rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? 'Processing...' : <><Search size={20} /> เปิดเผยความจริง (Reveal Truth)</>}
                    </button>

                    {error && (
                        <div className="p-3 bg-rose-500/20 text-rose-300 text-center rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                </div>

                {/* RIGHT: RESULT */}
                <div className="relative min-h-[400px] flex items-center justify-center">
                    {!result ? (
                        <div className="text-center text-slate-600 space-y-4 opacity-50">
                            <Calculator size={64} className="mx-auto" />
                            <p>กรอกข้อมูลและกดปุ่มเพื่อคำนวณ</p>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full space-y-6"
                        >
                            {/* VERDICT CARD */}
                            <div className="bg-slate-800/80 p-8 rounded-3xl border border-white/10 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none" />
                                
                                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">
                                    TRUE YIELD (IRR)
                                </h3>
                                <div className={`text-6xl md:text-7xl font-bold font-prompt tracking-tighter mb-4 ${
                                    result.irr < 0 ? 'text-rose-400' : 
                                    result.irr < 2 ? 'text-amber-400' : 'text-emerald-400'
                                }`}>
                                    {result.irr}%
                                </div>
                                <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${
                                    result.irr < 0 ? 'bg-rose-500/20 text-rose-300' : 
                                    result.irr < 2 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                                }`}>
                                    {result.verdict}
                                </div>
                            </div>

                            {/* DETAILS */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                                    <div className="text-slate-500 text-xs mb-1">เงินจ่ายทั้งหมด</div>
                                    <div className="text-xl font-prompt text-rose-300">
                                        -{result.totalPaid.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                                    <div className="text-slate-500 text-xs mb-1">เงินรับทั้งหมด</div>
                                    <div className="text-xl font-prompt text-emerald-300">
                                        +{result.totalReceived.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                                <div className="text-slate-400 text-sm">กำไรสุทธิ (Net Profit)</div>
                                <div className={`text-2xl font-prompt font-bold ${
                                    result.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                                }`}>
                                    {result.netProfit > 0 ? '+' : ''}{result.netProfit.toLocaleString()}
                                </div>
                            </div>

                            <div className="text-xs text-slate-500 text-center leading-relaxed">
                                *การคำนวณ IRR (Internal Rate of Return) ใช้วิธี Newton-Raphson method 
                                โดยอ้างอิง Cashflow รายปีตามที่ระบุ <br/>
                                นี่คือผลตอบแทนทบต้นที่แท้จริง ไม่ใช่ "ผลตอบแทนเฉลี่ย" ที่มักใช้ในโฆษณา
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
