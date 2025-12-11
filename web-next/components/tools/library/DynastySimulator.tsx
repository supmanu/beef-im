import { useState } from 'react';

// --- 1. ACTUARIAL PROXY DATA (Standard Whole Life 99/20) ---
const PROXY_RATES: Record<string, Record<number, number>> = {
    male: {
        0: 10.5, 5: 11.5, 10: 12.8, 15: 14.2, 20: 15.8,
        25: 17.5, 30: 20.2, 35: 23.5, 40: 27.8, 45: 33.5,
        50: 41.2, 55: 50.5, 60: 62.8, 65: 78.5, 70: 98.2
    },
    female: {
        0: 9.5, 5: 10.2, 10: 11.5, 15: 12.8, 20: 14.2,
        25: 15.8, 30: 17.8, 35: 20.5, 40: 24.2, 45: 28.8,
        50: 34.5, 55: 42.5, 60: 52.8, 65: 66.5, 70: 84.2
    }
};

const getRate = (gender: 'male' | 'female', age: number) => {
    const rates = PROXY_RATES[gender];
    const ages = Object.keys(rates).map(Number).sort((a, b) => a - b);
    if (rates[age]) return rates[age];
    const lowerAge = ages.filter(a => a < age).pop() || 0;
    const upperAge = ages.find(a => a > age) || 70;
    if (age > 70) return rates[70];
    const ratio = (age - lowerAge) / (upperAge - lowerAge);
    return rates[lowerAge] + ratio * (rates[upperAge] - rates[lowerAge]);
};

export default function DynastySimulator() {
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [sumAssured, setSumAssured] = useState<number>(1000000);
    const [baseAge, setBaseAge] = useState<number>(5);
    const [compareAge, setCompareAge] = useState<number>(40);

    const baseRate = getRate(gender, baseAge);
    const compareRate = getRate(gender, compareAge);
    const basePremium = (sumAssured / 1000) * baseRate;
    const comparePremium = (sumAssured / 1000) * compareRate;
    const baseTotalCost = basePremium * 20;
    const compareTotalCost = comparePremium * 20;
    const wealthLost = compareTotalCost - baseTotalCost;
    const multiplier = (compareTotalCost / baseTotalCost).toFixed(2);

    return (
        <div className="w-full max-w-2xl mx-auto my-8 font-sarabun text-slate-700">
            {/* HEADER */}
            <div className="bg-[#1e293b] text-white p-6 rounded-t-2xl border-b-4 border-[#2bb1bb]">
                <div className="flex items-center gap-3 mb-2">
                    <svg className="w-8 h-8 text-[#2bb1bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold font-prompt text-[#2bb1bb]">Dynasty Calculator</h2>
                </div>
                <p className="text-xs tracking-wider text-slate-400 uppercase font-mono mb-1">
                    STANDARD ACTUARIAL MODEL • WHOLE LIFE 99/20
                </p>
                <p className="text-sm text-slate-300">
                    ประกันชีวิตแบบตลอดชีพ (Whole Life) ชำระเบี้ย 20 ปี คุ้มครองตลอดชีพถึงอายุ 99 ปี
                    เปรียบเทียบต้นทุนส่วนเพิ่ม (Opportunity Cost) ของการรอเวลา
                </p>
            </div>

            <div className="bg-white border-x border-b border-slate-200 p-6 rounded-b-2xl shadow-sm space-y-8">

                {/* CONTROL SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">เพศผู้เอาประกัน (Gender)</label>
                            <div className="flex bg-slate-100 rounded-lg p-1">
                                {['male', 'female'].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setGender(g as any)}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${gender === g
                                                ? 'bg-[#2bb1bb] text-white shadow-sm'
                                                : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                    >
                                        {g === 'male' ? 'ชาย (Male)' : 'หญิง (Female)'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">ทุนประกัน (Sum Assured)</label>
                            <input
                                type="text"
                                value={sumAssured.toLocaleString()}
                                onChange={(e) => {
                                    const val = Number(e.target.value.replace(/,/g, ''));
                                    // Cap increased to 500M based on CTO Strategy
                                    if (!isNaN(val) && val <= 500000000) setSumAssured(val);
                                }}
                                className="w-full p-3 text-right text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2bb1bb] focus:outline-none mb-2"
                            />
                            {/* Presets Grid - Added 100M */}
                            <div className="grid grid-cols-4 gap-2">
                                {[1000000, 10000000, 50000000, 100000000].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setSumAssured(val)}
                                        className="text-xs px-1 py-1.5 bg-slate-100 rounded hover:bg-slate-200 text-slate-600 transition-colors"
                                    >
                                        {val / 1000000}M
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">เปรียบเทียบอายุ (Compare Age)</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <div className="text-xs text-slate-500 mb-1">เริ่มทำให้ (Start For)</div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-slate-700">อายุ</span>
                                    <input
                                        type="number"
                                        value={baseAge}
                                        onChange={(e) => setBaseAge(Number(e.target.value))}
                                        className="w-12 text-center bg-white border border-slate-300 rounded"
                                    />
                                </div>
                                <div className="text-right font-bold text-[#2bb1bb]">
                                    {Math.round(basePremium).toLocaleString()} <span className="text-xs font-normal text-slate-500">/ปี</span>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-xl border-2 border-[#2bb1bb] shadow-sm relative">
                                <div className="absolute -top-3 -right-2 bg-[#2bb1bb] text-white text-[10px] px-2 py-0.5 rounded-full">
                                    SELECTED
                                </div>
                                <div className="text-xs text-slate-500 mb-1">เทียบกับ (Vs)</div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-slate-700">อายุ</span>
                                    <input
                                        type="number"
                                        value={compareAge}
                                        onChange={(e) => setCompareAge(Number(e.target.value))}
                                        className="w-12 text-center bg-slate-100 border border-slate-300 rounded font-bold"
                                    />
                                </div>
                                <div className="text-right font-bold text-[#2bb1bb]">
                                    {Math.round(comparePremium).toLocaleString()} <span className="text-xs font-normal text-slate-500">/ปี</span>
                                </div>
                            </div>

                            <button onClick={() => setCompareAge(25)} className="text-xs text-slate-400 hover:text-[#2bb1bb]">Set: 25</button>
                            <button onClick={() => setCompareAge(40)} className="text-xs text-slate-400 hover:text-[#2bb1bb]">Set: 40</button>
                            <button onClick={() => setCompareAge(60)} className="text-xs text-slate-400 hover:text-[#2bb1bb]">Set: 60</button>
                        </div>
                    </div>
                </div>

                {/* RESULTS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="flex items-center gap-2 font-bold text-slate-700 mb-6">
                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            ต้นทุนรวม 20 ปี (Total Cost)
                        </h3>
                        <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1">
                                <span>เริ่มอายุ {baseAge}</span>
                                <span>{(baseTotalCost / 1000000).toFixed(2)} ล้านบาท</span>
                            </div>
                            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#2bb1bb] w-full"></div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between text-xs mb-1 font-bold text-slate-700">
                                <span>เริ่มอายุ {compareAge}</span>
                                <span>{(compareTotalCost / 1000000).toFixed(2)} ล้านบาท</span>
                            </div>
                            <div className="h-3 bg-slate-200 rounded-full overflow-hidden relative">
                                <div className="h-full bg-[#F59E0B]" style={{ width: `${Math.min((compareTotalCost / baseTotalCost) * 20, 100)}%` }}></div>
                            </div>
                            <div className="text-right text-xs text-[#F59E0B] font-bold mt-1">
                                แพงกว่า {multiplier}x
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
                            <svg className="w-6 h-6 text-red-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <div className="font-bold text-red-800 text-sm">ส่วนต่างราคา (Wealth Lost)</div>
                                <div className="text-red-600 font-prompt text-lg">
                                    เงินหายไป {Math.round(wealthLost).toLocaleString()} บาท
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center">
                        <h3 className="flex items-center gap-2 font-bold text-slate-700 mb-6">
                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            ประสิทธิภาพกองทุน
                        </h3>

                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 bg-white p-3 rounded-xl border border-slate-200 text-center">
                                <div className="text-xs text-slate-400">ระยะเวลาคุ้มครอง</div>
                                <div className="font-bold text-slate-700 text-lg">99 ปี</div>
                            </div>
                            {/* UPDATED LABEL HERE */}
                            <div className="flex-1 bg-white p-3 rounded-xl border border-slate-200 text-center">
                                <div className="text-xs text-slate-400">ระยะเวลาชำระเบี้ย</div>
                                <div className="font-bold text-slate-700 text-lg">20 ปี</div>
                            </div>
                        </div>

                        <div className="bg-[#f0f9fa] border border-[#2bb1bb] border-opacity-30 p-4 rounded-xl text-center">
                            <div className="text-xs text-slate-500 mb-1">มูลค่ากองทุนส่งต่อ (เมื่อครบสัญญา)</div>
                            <div className="text-3xl font-bold text-[#2bb1bb] font-prompt">
                                {(sumAssured / 1000000).toFixed(2)} ล้านบาท
                            </div>
                            <div className="text-[10px] text-slate-400 mt-2">
                                *ปลอดภาษีเงินได้ & ไม่ต้องผ่านกระบวนการมรดก
                            </div>
                        </div>
                    </div>
                </div>

                {/* DISCLAIMER */}
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-[11px] text-slate-500 leading-relaxed text-center">
                    ข้อมูลนี้เพื่อการศึกษาเท่านั้น ตัวเลขเบี้ยประกันเป็นประมาณการเพื่อการเปรียบเทียบ (Standard Actuarial Model)
                    อัตราจริงขึ้นอยู่กับบริษัท อายุ เพศ สุขภาพ และเงื่อนไขของแต่ละกรมธรรม์
                    ควรขอใบเสนอราคาจริงจากบริษัทประกันก่อนตัดสินใจ
                </div>

            </div>
        </div>
    );
}
