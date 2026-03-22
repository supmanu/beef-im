import { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Shield } from 'lucide-react';

// --- 1. THE TRUTH KERNEL: TMO 2017 (Male) ---
const TMO_2017_MALE: Record<number, number> = {
    0: 1.32, 10: 0.20, 20: 1.27, 25: 1.39, 30: 1.55,
    35: 1.93, 40: 2.53, 45: 3.48, 50: 5.00, 55: 8.50,
    60: 13.5, 65: 20.5, 70: 32.1, 75: 51.5, 80: 78.8,
    85: 121.5, 90: 199.1, 99: 1000
};

// --- 2. ACTUARIAL LOGIC ENGINE ---
const getRate = (age: number) => {
    const ages = Object.keys(TMO_2017_MALE).map(Number).sort((a, b) => a - b);
    if (TMO_2017_MALE[age]) return TMO_2017_MALE[age];
    const lowerAge = ages.filter(a => a < age).pop() || 0;
    const upperAge = ages.find(a => a > age) || 99;
    const ratio = (age - lowerAge) / (upperAge - lowerAge);
    const lowerRate = TMO_2017_MALE[lowerAge];
    const upperRate = TMO_2017_MALE[upperAge];
    return lowerRate + ratio * (upperRate - lowerRate);
};

export default function COICalculator() {
    // --- STATE ---
    const [currentAge, setCurrentAge] = useState<number>(35);
    const [sumAssured, setSumAssured] = useState<number>(1000000);
    const [mounted, setMounted] = useState(false);

    // Ensure chart renders only on client
    useEffect(() => {
        setMounted(true);
    }, []);

    // --- PROJECTION ENGINE ---
    const data = useMemo(() => {
        const projection = [];
        const endAge = Math.min(currentAge + 40, 90);

        for (let age = currentAge; age <= endAge; age++) {
            const rate = getRate(age);
            const annualCost = (sumAssured / 1000) * rate;
            projection.push({ age, cost: Math.round(annualCost) });
        }
        return projection;
    }, [currentAge, sumAssured]);

    // Safety Checks for Data Access
    const currentCost = data.length > 0 ? data[0].cost : 0;
    const futureCost = data.length > 0 ? data[data.length - 1].cost : 0;
    const multiplier = currentCost > 0 ? (futureCost / currentCost).toFixed(1) : "0.0";

    // Hydration Mismatch Prevention: Return null or loader until mounted
    if (!mounted) return <div className="p-10 text-center text-slate-500">Initializing Actuarial Engine...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto font-sarabun text-slate-200">

            {/* --- HEADER --- */}
            <div className="bg-slate-900/80 border border-white/10 p-8 rounded-t-[2rem] border-b-4 border-brand-teal shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <AreaChart width={100} height={40} data={[{ v: 1 }, { v: 5 }, { v: 2 }, { v: 8 }]}>
                        <Area type="monotone" dataKey="v" stroke="#2bb1bb" fill="#2bb1bb" />
                    </AreaChart>
                </div>
                <div className="flex items-start gap-6 relative z-10">
                    <div className="p-4 rounded-2xl bg-brand-teal/10 border border-brand-teal/30 text-brand-teal shrink-0 mt-1 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-prompt text-white uppercase tracking-tight mb-2 text-shadow-sm">Unit-Linked COI Calculator</h2>
                        <p className="text-lg text-slate-300 font-sarabun leading-relaxed max-w-2xl font-medium">
                            เครื่องมือจำลองค่าใช้จ่ายความเสี่ยง (Cost of Insurance) ตามตารางมรณะไทย 2560
                            เพื่อวิเคราะห์แนวโน้มต้นทุนที่แท้จริงในระยะยาว
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/60 border-x border-b border-white/10 p-8 rounded-b-[2rem] shadow-2xl space-y-8 backdrop-blur-sm">

                {/* --- CONTROLS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 relative shadow-inner">
                        <label className="block text-base font-bold text-slate-400 mb-4 uppercase tracking-wide font-prompt">
                            อายุปัจจุบันของคุณ (Current Age): <span className="text-brand-teal text-3xl font-mono ml-2">{currentAge}</span>
                        </label>
                        <input
                            type="range"
                            min="0" max="70"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                            className="w-full accent-brand-teal h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer mb-2"
                        />
                        <div className="flex justify-between text-xs font-mono text-slate-500 font-bold">
                            <span>0</span><span>35</span><span>70</span>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-inner">
                        <label className="block text-base font-bold text-slate-400 mb-4 uppercase tracking-wide font-prompt">ทุนประกัน (Sum Assured)</label>
                        <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-white/10 mb-4">
                            <input
                                type="text"
                                value={sumAssured.toLocaleString()}
                                onChange={(e) => {
                                    const val = Number(e.target.value.replace(/,/g, ''));
                                    if (!isNaN(val)) setSumAssured(val);
                                }}
                                className="bg-transparent w-full text-right font-mono font-bold text-brand-teal text-2xl focus:outline-none"
                            />
                            <span className="text-slate-500 text-sm font-bold font-mono">THB</span>
                        </div>
                        <div className="flex gap-2 justify-end flex-wrap">
                            {[1000000, 5000000, 10000000].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setSumAssured(val)}
                                    className="text-sm font-bold font-mono px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-brand-teal/20 hover:border-brand-teal/40 text-slate-300 hover:text-white transition-all"
                                >
                                    {val / 1000000}M
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- THE REVEAL --- */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-brand-teal/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div style={{ width: '100%', height: 400 }} className="relative bg-slate-950/40 p-6 rounded-3xl border border-white/10 shadow-inner">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2bb1bb" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#2bb1bb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="age"
                                    tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'monospace', fontWeight: 'bold' }}
                                    tickLine={false}
                                    axisLine={false}
                                    padding={{ left: 20, right: 20 }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'monospace', fontWeight: 'bold' }}
                                    tickFormatter={(value) => `${value / 1000}k`}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#2bb1bb', strokeWidth: 2, strokeDasharray: '5 5' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-slate-900 border border-brand-teal/50 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
                                                    <p className="text-xs text-slate-400 font-prompt uppercase mb-1">อายุ {payload[0].payload.age} ปี</p>
                                                    <p className="text-brand-teal font-bold font-mono text-lg">฿{payload[0].value?.toLocaleString()}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="cost"
                                    stroke="#2bb1bb"
                                    fill="url(#colorCost)"
                                    strokeWidth={3}
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* --- THE VERDICT --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-teal/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-brand-teal/10 transition-colors" />
                        <div className="relative z-10">
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-prompt mb-3 font-bold">วันนี้ (Age {currentAge})</div>
                            <div className="text-4xl md:text-5xl font-bold text-white font-mono tracking-tight">
                                ฿{currentCost.toLocaleString()} <span className="text-xl text-slate-400 font-normal font-sarabun">/ปี</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-500/10 p-8 rounded-3xl border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-amber-500/20 transition-colors" />
                        <div className="relative z-10">
                            <div className="text-xs text-amber-500 uppercase tracking-wider font-prompt mb-3 font-bold">ในอนาคต (Age {data.length > 0 ? data[data.length - 1].age : 0})</div>
                            <div className="text-4xl md:text-5xl font-bold text-brand-amber font-mono tracking-tight">
                                ฿{futureCost.toLocaleString()} <span className="text-xl text-amber-400/70 font-normal font-sarabun">/ปี</span>
                            </div>
                            <div className="inline-block mt-4 px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-400 font-bold uppercase tracking-wide">
                                แพงขึ้น {multiplier} เท่าตัว!
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- DISCLAIMER (SUBTLE LIGHT CARD) --- */}
                <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
                    <div className="absolute right-6 bottom-6 opacity-5 pointer-events-none">
                        <Shield size={100} className="text-slate-600" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <p className="text-lg font-bold text-amber-400 uppercase tracking-wider font-prompt">ข้อควรระวัง (Disclaimer):</p>
                        <ul className="text-base text-slate-300 font-sarabun leading-relaxed list-none space-y-4">
                            <li className="flex gap-3">
                                <span className="text-amber-500 font-mono font-bold mt-1">01</span>
                                <span>ข้อมูลนี้เป็นการจำลอง <strong className="text-white">"ต้นทุนความเสี่ยงภัยพื้นฐาน" (Base COI)</strong> ตามตารางมรณะไทยปี 2560 (TMO 2017) ที่ คปภ. กำหนดเพื่อใช้เป็นมาตรฐานอ้างอิงเท่านั้น</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-amber-500 font-mono font-bold mt-1">02</span>
                                <span><strong className="text-white">อัตราค่าใช้จ่ายจริง (Actual COI) ที่บริษัทประกันเรียกเก็บมักจะสูงกว่านี้</strong> เนื่องจากมีการบวกค่าใช้จ่ายดำเนินงาน (Expense Loading) และความเสี่ยงเฉพาะของพอร์ตโฟลิโอแต่ละบริษัท</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-amber-500 font-mono font-bold mt-1">03</span>
                                <span>กราฟนี้มีวัตถุประสงค์เพื่อแสดง <strong className="text-white">"แนวโน้ม (Trend)"</strong> ของต้นทุนที่เพิ่มขึ้นแบบทวีคูณตามอายุ (Exponential Curve) เพื่อประกอบการวางแผนระยะยาว ไม่สามารถใช้อ้างอิงเพื่อคำนวณเบี้ยประกันที่ต้องจ่ายจริงได้</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
