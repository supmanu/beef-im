import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// --- 1. THE TRUTH KERNEL: TMO 2017 (Male) ---
// Anchor points: Age -> Rate per 1,000 Sum Assured
// Source: Thai Mortality Table 2017 (Standard Risk)
const TMO_2017_MALE: Record<number, number> = {
    0: 1.32, 10: 0.20, 20: 1.27, 25: 1.39, 30: 1.55,
    35: 1.93, 40: 2.53, 45: 3.48, 50: 5.00, 55: 8.50,
    60: 13.5, 65: 20.5, 70: 32.1, 75: 51.5, 80: 78.8,
    85: 121.5, 90: 199.1, 99: 1000
};

// --- 2. ACTUARIAL LOGIC ENGINE ---
const getRate = (age: number) => {
    const ages = Object.keys(TMO_2017_MALE).map(Number).sort((a, b) => a - b);

    // Exact match
    if (TMO_2017_MALE[age]) return TMO_2017_MALE[age];

    // Bounds
    const lowerAge = ages.filter(a => a < age).pop() || 0;
    const upperAge = ages.find(a => a > age) || 99;

    // Linear Interpolation
    const ratio = (age - lowerAge) / (upperAge - lowerAge);
    const lowerRate = TMO_2017_MALE[lowerAge];
    const upperRate = TMO_2017_MALE[upperAge];

    return lowerRate + ratio * (upperRate - lowerRate);
};

export default function COICalculator() {
    // --- STATE ---
    const [currentAge, setCurrentAge] = useState<number>(35);
    const [sumAssured, setSumAssured] = useState<number>(1000000); // 1 Million

    // --- PROJECTION ENGINE (Next 40 Years) ---
    const data = useMemo(() => {
        const projection = [];
        const endAge = Math.min(currentAge + 40, 90); // Cap view at 90 or +40 years

        for (let age = currentAge; age <= endAge; age++) {
            const rate = getRate(age);
            const annualCost = (sumAssured / 1000) * rate;

            projection.push({
                age,
                cost: Math.round(annualCost),
                // Visual Logic: Warning Color if Cost > 50k (arbitrary pain threshold)
                isHigh: annualCost > 50000
            });
        }
        return projection;
    }, [currentAge, sumAssured]);

    // Snapshot Metrics
    const currentCost = data[0].cost;
    const futureCost = data[data.length - 1].cost;
    const multiplier = (futureCost / currentCost).toFixed(1);

    return (
        <div className="w-full max-w-3xl mx-auto my-12 font-sarabun text-slate-700">

            {/* --- HEADER (Teal Protocol) --- */}
            <div className="bg-[#1e293b] text-white p-6 rounded-t-2xl border-b-4 border-[#2bb1bb]">
                <div className="flex items-center gap-3 mb-2">
                    <svg className="w-8 h-8 text-[#2bb1bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h2 className="text-2xl font-bold font-prompt text-[#2bb1bb]">Unit-Linked Truth Engine</h2>
                </div>
                <p className="text-xs tracking-wider text-slate-400 uppercase font-mono mb-1">
                    BASED ON TMO 2017 MORTALITY TABLE
                </p>
            </div>

            <div className="bg-white border-x border-b border-slate-200 p-6 rounded-b-2xl shadow-sm space-y-8">

                {/* --- CONTROLS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Age Input */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            อายุปัจจุบันของคุณ (Current Age): <span className="text-[#2bb1bb] text-lg">{currentAge}</span>
                        </label>
                        <input
                            type="range"
                            min="0" max="70"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                            className="w-full accent-[#2bb1bb] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>0</span><span>35</span><span>70</span>
                        </div>
                    </div>

                    {/* Sum Assured Input */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">ทุนประกัน (Sum Assured)</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={sumAssured.toLocaleString()}
                                onChange={(e) => {
                                    const val = Number(e.target.value.replace(/,/g, ''));
                                    if (!isNaN(val)) setSumAssured(val);
                                }}
                                className="w-full p-2 text-right font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2bb1bb] focus:outline-none"
                            />
                            <span className="text-slate-500 text-sm font-bold">THB</span>
                        </div>
                        <div className="flex gap-2 justify-end mt-2">
                            {[1000000, 5000000, 10000000].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setSumAssured(val)}
                                    className="text-[10px] px-2 py-1 bg-slate-100 rounded hover:bg-slate-200 text-slate-600"
                                >
                                    {val / 1000000}M
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- THE REVEAL (Chart) --- */}
                <div className="h-64 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2bb1bb" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2bb1bb" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorDanger" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="age"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => `${value / 1000}k`}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                formatter={(value: number) => [`฿${value.toLocaleString()}`, 'ค่าความเสี่ยง (COI)']}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="cost"
                                stroke="#2bb1bb"
                                fill="url(#colorCost)"
                                strokeWidth={3}
                            />
                            {/* Invisible line to force scale, visualized by ReferenceLine below if needed */}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* --- THE VERDICT (Summary Box) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="text-xs text-slate-500 uppercase tracking-wide">วันนี้ (Age {currentAge})</div>
                        <div className="text-2xl font-bold text-[#2bb1bb] font-prompt">
                            ฿{currentCost.toLocaleString()} <span className="text-sm text-slate-400 font-normal">/ปี</span>
                        </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-xs text-amber-700 uppercase tracking-wide font-bold">ในอนาคต (Age {data[data.length - 1].age})</div>
                            <div className="text-2xl font-bold text-[#F59E0B] font-prompt">
                                ฿{futureCost.toLocaleString()} <span className="text-sm text-amber-600/60 font-normal">/ปี</span>
                            </div>
                            <div className="text-xs text-amber-600 mt-1 font-bold">
                                แพงขึ้น {multiplier} เท่าตัว!
                            </div>
                        </div>
                        {/* Background Icon */}
                        <svg className="absolute -right-4 -bottom-4 w-24 h-24 text-amber-100 z-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12a3 3 0 10-4.24-4.24 3 3 0 004.24 4.24z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="text-[11px] text-center text-slate-400">
                    *คำนวณจากอัตราความเสี่ยงภัยตามตารางมรณะไทย 2560 (TMO 2017) สำหรับเพศชาย
                    อัตราจริงอาจแตกต่างกันตามบริษัทและแบบประกัน (COI Rate)
                </div>

            </div>
        </div>
    );
}
