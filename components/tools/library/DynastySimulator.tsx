import React, { useState, useMemo } from 'react';
import { Users, TrendingUp, AlertTriangle, ShieldCheck, User } from 'lucide-react';

/**
 * DYNASTY SIMULATOR (Generic Benchmark Engine)
 * CORE LOGIC:
 * - Uses Industry Standard Whole Life 20-Pay Premium Arrays.
 * - Applies Large Sum Assured Discounts (>250k: -1, >600k: -2).
 * - Compares "Age 5" (Baseline) vs Future Ages.
 * * NOTE: Data is strictly for educational simulation based on 
 * standard actuarial risk curves. No specific brands mentioned.
 */

// --- 1. ACTUARIAL BENCHMARK DATA (Sanitized) ---
// Source: Standard Market Rates for Non-Par Whole Life 20-Pay
const GENERIC_WL20_DATA = {
    male: [
        12.76, 12.81, 12.98, 13.15, 13.33, 13.53, 13.73, 13.95, 14.18, 14.42, // 0-9
        14.68, 14.96, 15.23, 15.52, 15.80, 16.09, 16.38, 16.67, 16.97, 17.27, // 10-19
        17.58, 17.90, 18.23, 18.57, 18.93, 19.31, 19.70, 20.12, 20.56, 21.02, // 20-29
        21.50, 22.01, 22.55, 23.11, 23.69, 24.30, 24.94, 25.61, 26.31, 27.04, // 30-39
        27.80, 28.60, 29.44, 30.32, 31.24, 32.20, 33.22, 34.28, 35.40, 36.57, // 40-49
        37.81, 39.13, 40.51, 41.99, 43.56, 45.25, 47.05, 48.99, 51.08, 53.33, // 50-59
        55.77, 58.42, 61.29, 64.19, 66.96, 69.89, 71.99, 73.80, 75.13, 76.40  // 60-69
    ],
    female: [
        11.47, 11.47, 11.51, 11.58, 11.68, 11.80, 11.94, 12.10, 12.27, 12.45, // 0-9
        12.66, 12.87, 13.09, 13.32, 13.56, 13.76, 13.97, 14.19, 14.41, 14.65, // 10-19
        14.90, 15.15, 15.43, 15.71, 16.00, 16.31, 16.64, 16.98, 17.34, 17.72, // 20-29
        18.11, 18.53, 18.96, 19.42, 19.90, 20.40, 20.93, 21.48, 22.06, 22.67, // 30-39
        23.30, 23.96, 24.66, 25.39, 26.15, 26.95, 27.79, 28.68, 29.61, 30.59, // 40-49
        31.62, 32.72, 33.88, 35.11, 36.41, 37.81, 39.29, 40.89, 42.60, 44.44, // 50-59
        46.43, 48.59, 50.93, 53.49, 56.27, 59.32, 61.90, 63.61, 64.71, 66.13  // 60-69
    ]
};

const DynastySimulator = () => {
    // --- 2. STATE ---
    const [sex, setSex] = useState<'male' | 'female'>('male');
    const [sumAssured, setSumAssured] = useState<number>(1000000); // Default 1M THB
    const [selectedAge, setSelectedAge] = useState<5 | 25 | 40 | 60>(40);

    // --- 3. CALCULATION ENGINE (Standard Actuarial Logic) ---
    const calculatePremium = (targetAge: number) => {
        // 1. Get Base Rate
        const rates = GENERIC_WL20_DATA[sex];
        // Safety check for age range 0-69
        const safeAge = Math.min(Math.max(targetAge, 0), rates.length - 1);
        let baseRate = rates[safeAge];

        // 2. Apply Standard Large Sum Discounts
        // if sum >= 250k -> -1
        // if sum >= 600k -> -2
        if (sumAssured >= 600000) {
            baseRate -= 2.0;
        } else if (sumAssured >= 250000) {
            baseRate -= 1.0;
        }

        // 3. Calculate Annual Premium
        // Formula: (Rate * Sum) / 1000
        return (baseRate * sumAssured) / 1000;
    };

    // --- 4. DERIVED METRICS ---
    const comparisonData = useMemo(() => {
        const baselineAge = 5;
        const premiumBaseline = calculatePremium(baselineAge);
        const premiumCurrent = calculatePremium(selectedAge);

        // Total Cost (20 Years)
        const totalCostBaseline = premiumBaseline * 20;
        const totalCostCurrent = premiumCurrent * 20;

        // Metrics
        const multiplier = premiumCurrent / premiumBaseline;
        const lostValue = totalCostCurrent - totalCostBaseline;

        // Active Years (assuming Age 99 maturity)
        const activeYears = Math.max(0, 99 - (selectedAge + 20));

        return {
            premiumBaseline,
            premiumCurrent,
            totalCostBaseline,
            totalCostCurrent,
            multiplier,
            lostValue,
            activeYears
        };
    }, [sex, sumAssured, selectedAge]);

    // Format Helpers
    const formatMoney = (val: number) =>
        val.toLocaleString('th-TH', { maximumFractionDigits: 0 });

    const formatMillions = (val: number) =>
        (val / 1000000).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="w-full max-w-4xl mx-auto bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sarabun">

            {/* HEADER */}
            <div className="bg-slate-800 p-6 md:p-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="text-[#2bb1bb] w-8 h-8" />
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold font-prompt text-[#2bb1bb]">
                            Dynasty Calculator
                        </h2>
                        <p className="text-slate-400 text-xs font-mono mt-1 tracking-wider">
                            WHOLE LIFE 20-PAY • STANDARD ACTUARIAL MODEL
                        </p>
                    </div>
                </div>
                <p className="text-slate-300 max-w-2xl">
                    คำนวณเบี้ยประกันจริง (Real Premium) เปรียบเทียบระหว่างการซื้อให้ "หลาน" (Age 5)
                    vs "ซื้อให้ตัวเอง" เพื่อดูต้นทุนส่วนเพิ่ม (Opportunity Cost)
                </p>
            </div>

            <div className="p-6 md:p-8 space-y-8">

                {/* CONTROLS */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Inputs */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-prompt">
                                เพศผู้เอาประกัน (Gender)
                            </label>
                            <div className="flex p-1 bg-white border border-slate-200 rounded-xl">
                                <button
                                    onClick={() => setSex('male')}
                                    className={`flex-1 py-2 rounded-lg font-bold transition-all ${sex === 'male' ? 'bg-[#2bb1bb] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    ชาย (Male)
                                </button>
                                <button
                                    onClick={() => setSex('female')}
                                    className={`flex-1 py-2 rounded-lg font-bold transition-all ${sex === 'female' ? 'bg-[#2bb1bb] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    หญิง (Female)
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 font-prompt">
                                ทุนประกันที่ต้องการ (Sum Assured)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min={100000}
                                    max={10000000}
                                    step={100000}
                                    value={sumAssured}
                                    onChange={(e) => setSumAssured(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2bb1bb]"
                                />
                                <div className="w-32 px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-right font-bold text-slate-700">
                                    {formatMillions(sumAssured)}M
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 text-right">
                                *คำนวณส่วนลดเบี้ยรายใหญ่ (Large Sum Discount) อัตโนมัติ
                            </p>
                        </div>
                    </div>

                    {/* Right: Age Selector */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-4 font-prompt">
                            เปรียบเทียบอายุ (Compare Age)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[5, 25, 40, 60].map((age) => (
                                <button
                                    key={age}
                                    onClick={() => setSelectedAge(age as any)}
                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1
                    ${selectedAge === age
                                            ? 'border-[#2bb1bb] bg-[#2bb1bb]/5 text-[#2bb1bb]'
                                            : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'
                                        }`}
                                >
                                    <span className="text-lg font-bold font-prompt">
                                        {age === 5 ? 'หลาน (5)' : age === 25 ? 'ลูก (25)' : age === 40 ? 'คุณ (40)' : 'เกษียณ (60)'}
                                    </span>
                                    <span className="text-xs font-mono">
                                        {formatMoney(calculatePremium(age))} /ปี
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100" />

                {/* RESULTS CARDS */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Card 1: Cost Analysis */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-6 relative z-10">
                            <TrendingUp className="w-5 h-5 text-slate-400" />
                            <h3 className="font-bold font-prompt text-slate-800">ต้นทุนรวม 20 ปี (Total Cost)</h3>
                        </div>

                        <div className="space-y-6 relative z-10">
                            {/* Baseline Bar */}
                            <div>
                                <div className="flex justify-between text-sm text-slate-500 mb-1">
                                    <span>หลาน (5 ขวบ)</span>
                                    <span>{formatMillions(comparisonData.totalCostBaseline)} ล้านบาท</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#2bb1bb]" style={{ width: '100%' }} />
                                </div>
                            </div>

                            {/* Current Bar */}
                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-800 mb-1">
                                    <span>อายุ {selectedAge} ปี (คุณเลือก)</span>
                                    <span className={selectedAge > 5 ? "text-[#F59E0B]" : "text-[#2bb1bb]"}>
                                        {formatMillions(comparisonData.totalCostCurrent)} ล้านบาท
                                    </span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${selectedAge > 5 ? 'bg-[#F59E0B]' : 'bg-[#2bb1bb]'}`}
                                        style={{ width: `${comparisonData.multiplier * 20}%`, maxWidth: '100%' }}
                                    />
                                </div>
                                {/* Multiplier Badge */}
                                {selectedAge > 5 && (
                                    <p className="text-right text-xs font-bold text-[#F59E0B] mt-1">
                                        แพงกว่า {comparisonData.multiplier.toFixed(2)}x
                                    </p>
                                )}
                            </div>

                            {/* Warning Box */}
                            {selectedAge > 5 && (
                                <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                                    <div>
                                        <p className="text-red-800 font-bold text-sm font-prompt">ส่วนต่างราคา (Wealth Lost)</p>
                                        <p className="text-red-600 text-sm">
                                            เงินหายไป <span className="font-bold text-lg">{formatMoney(comparisonData.lostValue)}</span> บาท
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Card 2: Asset Value */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Users className="w-5 h-5 text-slate-400" />
                                <h3 className="font-bold font-prompt text-slate-800">ประสิทธิภาพกองทุน</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center mb-6">
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="text-slate-500 text-xs mb-1">ระยะเวลาคุ้มครอง</p>
                                    <p className="text-2xl font-bold font-prompt text-slate-700">99 ปี</p>
                                </div>
                                <div className={`p-4 rounded-xl ${selectedAge === 5 ? 'bg-[#2bb1bb]/10' : 'bg-slate-50'}`}>
                                    <p className={`text-xs mb-1 ${selectedAge === 5 ? 'text-[#2bb1bb]' : 'text-slate-500'}`}>
                                        ปีที่กองทุนพร้อมใช้
                                    </p>
                                    <p className={`text-2xl font-bold font-prompt ${selectedAge === 5 ? 'text-[#2bb1bb]' : 'text-slate-700'}`}>
                                        {comparisonData.activeYears} ปี
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl text-center">
                            <p className="text-slate-500 text-sm mb-2">มูลค่ากองทุนส่งต่อ (เมื่อครบสัญญา)</p>
                            <p className="text-3xl font-bold font-prompt text-[#2bb1bb]">
                                {formatMillions(sumAssured)} ล้านบาท
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                *ปลอดภาษีเงินได้ & ไม่ต้องผ่านกระบวนการมรดก
                            </p>
                        </div>
                    </div>

                </div>

                {/* VERDICT */}
                <div className={`rounded-xl p-6 border ${selectedAge === 5 ? 'bg-[#2bb1bb]/5 border-[#2bb1bb]/20' : 'bg-orange-50 border-orange-100'}`}>
                    <div className="flex items-start gap-3">
                        <User className={`w-6 h-6 shrink-0 ${selectedAge === 5 ? 'text-[#2bb1bb]' : 'text-orange-500'}`} />
                        <div>
                            <h4 className={`font-bold font-prompt text-lg mb-1 ${selectedAge === 5 ? 'text-[#2bb1bb]' : 'text-orange-700'}`}>
                                {selectedAge === 5 ? '✅ Dynasty Mode Activated' : '⚠️ Late Entry Penalty'}
                            </h4>
                            <p className="text-slate-700 leading-relaxed text-sm">
                                {selectedAge === 5
                                    ? `คุณกำลังซื้อ "ราคาของความเสี่ยงต่ำที่สุด" ในตลาด จ่ายเบี้ยเพียง ${formatMoney(comparisonData.premiumCurrent)}/ปี แต่ได้กองทุน ${formatMillions(sumAssured)}M ที่ดูแลหลานได้นานถึง 74 ปี นี่คือประสิทธิภาพสูงสุดของระบบประกัน`
                                    : `การเริ่มที่อายุ ${selectedAge} ทำให้ต้นทุนเพิ่มขึ้น ${comparisonData.multiplier.toFixed(1)} เท่า เงินจำนวน ${formatMoney(comparisonData.lostValue)} บาท คือ "ค่าปรับของเวลา" ที่หายไปเฉยๆ โดยไม่ได้ความคุ้มครองเพิ่มขึ้น`
                                }
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DynastySimulator;
