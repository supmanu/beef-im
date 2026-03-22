import { useState } from 'react';
import { motion } from 'framer-motion';
import { Binary, TrendingUp, Activity, ShieldAlert, Compass, Plus } from 'lucide-react';

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
        <div className="w-full max-w-4xl mx-auto font-sarabun text-slate-300">
            {/* HEADER (Forensic Style) */}
            <div className="bg-slate-900/80 border border-white/10 p-8 rounded-t-[2rem] border-b-2 border-brand-teal shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-6 relative z-10">
                    <div className="p-4 rounded-2xl bg-brand-teal/10 border border-brand-teal/30 text-brand-teal shrink-0 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                        <Binary size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-prompt text-white uppercase tracking-tight mb-2">Dynasty Calculator</h2>
                        <p className="text-lg text-slate-300 font-sarabun leading-relaxed">
                            ประกันชีวิตแบบตลอดชีพ (Whole Life) ชำระเบี้ย 20 ปี คุ้มครองตลอดชีพถึงอายุ 99 ปี
                            เปรียบเทียบต้นทุนส่วนเพิ่ม (Opportunity Cost) ของการรอเวลา
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/40 border-x border-b border-white/5 p-8 rounded-b-[2rem] shadow-2xl space-y-8 backdrop-blur-sm">

                {/* CONTROL SECTION (The Instrumentation Panel) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-8">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 shadow-inner">
                            <label className="block text-base font-bold text-slate-400 mb-4 uppercase tracking-wide font-sarabun">เพศผู้เอาประกัน (Gender)</label>
                            <div className="flex bg-slate-950/50 rounded-2xl p-1.5 border border-white/10">
                                {['male', 'female'].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setGender(g as any)}
                                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all font-sarabun ${gender === g
                                            ? 'bg-brand-teal text-white shadow-lg shadow-teal-500/20'
                                            : 'text-slate-500 hover:text-slate-300'
                                            }`}
                                    >
                                        {g === 'male' ? 'ชาย (Male)' : 'หญิง (Female)'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 shadow-inner">
                            <label className="block text-base font-bold text-slate-400 mb-4 uppercase tracking-wide font-sarabun">ทุนประกัน (Sum Assured)</label>
                            <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/10 mb-4 flex items-center">
                                <input
                                    type="text"
                                    value={sumAssured.toLocaleString()}
                                    onChange={(e) => {
                                        const val = Number(e.target.value.replace(/,/g, ''));
                                        if (!isNaN(val) && val <= 500000000) setSumAssured(val);
                                    }}
                                    className="bg-transparent w-full text-right font-prompt font-bold text-brand-teal text-3xl focus:outline-none"
                                />
                                <span className="ml-3 text-slate-500 text-xs font-bold font-mono tracking-widest">THB</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {[1000000, 10000000, 50000000, 100000000].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setSumAssured(val)}
                                        className="text-sm font-bold font-mono py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-brand-teal/20 text-slate-400 hover:text-white transition-all"
                                    >
                                        {val / 1000000}M
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col justify-between shadow-inner">
                        <label className="block text-base font-bold text-slate-400 mb-6 uppercase tracking-wide font-sarabun text-center">เปรียบเทียบอายุ (Compare Age)</label>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 bg-slate-950/50 rounded-2xl border border-white/10 relative group">
                                <div className="text-[10px] text-slate-500 mb-3 uppercase font-mono font-bold">เริ่มทำให้ (Start For)</div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-slate-400 font-bold font-sarabun">อายุ</span>
                                    <input
                                        type="number"
                                        value={baseAge}
                                        onChange={(e) => setBaseAge(Number(e.target.value))}
                                        className="w-12 bg-white/5 border border-white/10 rounded-lg text-center text-brand-teal font-mono font-bold text-lg focus:outline-none"
                                    />
                                </div>
                                <div className="text-right font-prompt font-bold text-white text-base">
                                    ฿{Math.round(basePremium).toLocaleString()} <span className="text-[10px] font-normal text-slate-500 font-sarabun">/ปี</span>
                                </div>
                            </div>

                            <div className="p-5 bg-slate-950/50 rounded-2xl border-2 border-brand-teal shadow-[0_0_20px_rgba(43,177,187,0.1)] relative">
                                <div className="text-[10px] text-slate-500 mb-3 uppercase font-mono font-bold">เทียบกับ (Vs)</div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-slate-400 font-bold font-sarabun">อายุ</span>
                                    <input
                                        type="number"
                                        value={compareAge}
                                        onChange={(e) => setCompareAge(Number(e.target.value))}
                                        className="w-12 bg-white/5 border border-white/10 rounded-lg text-center text-brand-amber font-mono font-bold text-lg focus:outline-none"
                                    />
                                </div>
                                <div className="text-right font-prompt font-bold text-white text-base">
                                    ฿{Math.round(comparePremium).toLocaleString()} <span className="text-[10px] font-normal text-slate-500 font-sarabun">/ปี</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-center mt-6">
                            {[25, 40, 60].map(a => (
                                <button key={a} onClick={() => setCompareAge(a)} className="text-sm font-bold font-mono px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-slate-500 hover:text-brand-teal hover:border-brand-teal/30 transition-colors uppercase">Set: {a}</button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RESULTS SECTION (Analyzed Data) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp size={80} />
                        </div>
                        <h3 className="flex items-center gap-3 font-bold text-white mb-10 uppercase text-sm tracking-wider font-sarabun">
                            <Activity className="text-brand-teal" size={20} />
                            ต้นทุนรวม 20 ปี (Total Cost)
                        </h3>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider font-sarabun">
                                    เริ่มอายุ {baseAge}
                                    <span className="text-white text-lg">{(baseTotalCost / 1000000).toFixed(2)} ล้านบาท</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1 }} className="h-full bg-brand-teal shadow-[0_0_10px_rgba(43,177,187,0.5)]"></motion.div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider font-sarabun">
                                    เริ่มอายุ {compareAge}
                                    <span className="text-brand-amber text-lg font-bold">{(compareTotalCost / 1000000).toFixed(2)} ล้านบาท</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((compareTotalCost / baseTotalCost) * 20, 100)}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-brand-amber shadow-[0_0_10px_rgba(245,158,11,0.5)]"></motion.div>
                                </div>
                                <div className="text-right text-xs text-brand-amber font-bold mt-3 uppercase tracking-wider">
                                    Temporal Premium: {multiplier}x
                                </div>
                            </div>
                        </div>

                        {/* THE RED BOX (ALARMING VERSION - FIXED LAYOUT) */}
                        <div className="mt-10 bg-red-500/10 p-6 rounded-[1.5rem] border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)] relative overflow-hidden group">
                            {/* Warning Pulse Background */}
                            <motion.div
                                className="absolute inset-0 bg-red-500/5"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                                <div className="p-3 rounded-xl bg-red-500 text-white shrink-0 shadow-lg self-start">
                                    <ShieldAlert size={24} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-red-500 text-xs uppercase tracking-wider mb-1 font-sarabun">
                                        ส่วนต่างราคา (Wealth Lost)
                                    </div>
                                    <div className="text-white font-prompt text-2xl md:text-3xl font-black tracking-tight mb-1 break-words">
                                        เงินหายไป <span className="text-red-500">฿{Math.round(wealthLost).toLocaleString()}</span>
                                    </div>
                                    <p className="text-base text-red-200/90 font-sarabun font-bold leading-snug">
                                        นี่คือมูลค่าทรัพย์สินที่หายไปเพียงเพราะการ "รอเวลา"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Compass size={80} />
                        </div>
                        <h3 className="flex items-center gap-3 font-bold text-white mb-10 uppercase text-sm tracking-wider font-sarabun">
                            <Plus className="text-brand-teal" size={20} />
                            ประสิทธิภาพกองทุน
                        </h3>

                        <div className="flex gap-6 mb-10">
                            <div className="flex-1 bg-slate-950/50 p-6 rounded-3xl border border-white/10 text-center shadow-inner">
                                <div className="text-[10px] text-slate-500 uppercase font-mono mb-2 font-bold tracking-wider">ระยะเวลาคุ้มครอง</div>
                                <div className="font-bold text-white text-2xl font-prompt uppercase tracking-tighter">99 ปี</div>
                            </div>
                            <div className="flex-1 bg-slate-950/50 p-6 rounded-3xl border border-white/10 text-center shadow-inner">
                                <div className="text-[10px] text-slate-500 uppercase font-mono mb-2 font-bold tracking-wider">ระยะเวลาชำระเบี้ย</div>
                                <div className="font-bold text-white text-2xl font-prompt uppercase tracking-tighter">20 ปี</div>
                            </div>
                        </div>

                        <div className="bg-brand-teal/10 border-2 border-brand-teal/30 p-8 rounded-[2rem] text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent pointer-events-none" />
                            <div className="text-xs text-brand-teal font-bold mb-3 uppercase tracking-wider font-sarabun text-shadow-sm opacity-80">มูลค่ากองทุนส่งต่อ (เมื่อครบสัญญา)</div>
                            <div className="text-3xl sm:text-4xl font-black text-white font-prompt tracking-tight mb-2">
                                {(sumAssured / 1000000).toFixed(2)} <span className="text-xl sm:text-2xl text-brand-teal font-bold ml-1">ล้านบาท</span>
                            </div>
                            <p className="text-sm md:text-base text-brand-teal/90 font-sarabun font-bold leading-snug mt-4 px-4 py-2 bg-brand-teal/5 rounded-xl border border-brand-teal/20 inline-block">
                                * ปลอดภาษีเงินได้ & ไม่ต้องผ่านกระบวนการมรดก
                            </p>
                        </div>
                    </div>
                </div>

                {/* DISCLAIMER */}
                <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl">
                    <p className="text-base text-slate-300 font-sarabun leading-relaxed text-center">
                        ข้อมูลนี้เพื่อการศึกษาเท่านั้น ตัวเลขเบี้ยประกันเป็นประมาณการเพื่อการเปรียบเทียบ (Standard Actuarial Model) •
                        อัตราจริงขึ้นอยู่กับบริษัท อายุ เพศ สุขภาพ และเงื่อนไขของแต่ละกรมธรรม์ • ควรขอใบเสนอราคาจริงจากบริษัทประกันก่อนตัดสินใจ
                    </p>
                </div>

            </div>
        </div>
    );
}