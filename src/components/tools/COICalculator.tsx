import { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Shield } from 'lucide-react';

// TMO 2017 (Male) — Thai Mortality Table
const TMO_2017_MALE: Record<number, number> = {
  0: 1.32, 10: 0.20, 20: 1.27, 25: 1.39, 30: 1.55,
  35: 1.93, 40: 2.53, 45: 3.48, 50: 5.00, 55: 8.50,
  60: 13.5, 65: 20.5, 70: 32.1, 75: 51.5, 80: 78.8,
  85: 121.5, 90: 199.1, 99: 1000,
};

const getRate = (age: number) => {
  const ages = Object.keys(TMO_2017_MALE).map(Number).sort((a, b) => a - b);
  if (TMO_2017_MALE[age] !== undefined) return TMO_2017_MALE[age];
  const lowerAge = ages.filter(a => a < age).pop() || 0;
  const upperAge = ages.find(a => a > age) || 99;
  const ratio = (age - lowerAge) / (upperAge - lowerAge);
  return TMO_2017_MALE[lowerAge] + ratio * (TMO_2017_MALE[upperAge] - TMO_2017_MALE[lowerAge]);
};

export default function COICalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [sumAssured, setSumAssured] = useState(1_000_000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const data = useMemo(() => {
    const projection = [];
    const endAge = Math.min(currentAge + 40, 90);
    for (let age = currentAge; age <= endAge; age++) {
      const rate = getRate(age);
      projection.push({ age, cost: Math.round((sumAssured / 1000) * rate) });
    }
    return projection;
  }, [currentAge, sumAssured]);

  const currentCost = data[0]?.cost ?? 0;
  const futureCost = data[data.length - 1]?.cost ?? 0;
  const multiplier = currentCost > 0 ? (futureCost / currentCost).toFixed(1) : '0.0';

  if (!mounted) {
    return <div className="p-10 text-center text-slate-500">Initializing Actuarial Engine...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto text-slate-200" style={{ fontFamily: "'Sarabun', sans-serif" }}>

      {/* Header */}
      <div className="bg-[#0B1D35]/80 border border-white/10 p-8 rounded-t-[2rem] border-b-4 border-[#2bb1bb] shadow-2xl relative overflow-hidden">
        <div className="flex items-start gap-6 relative z-10">
          <div className="p-4 rounded-2xl bg-[#2bb1bb]/10 border border-[#2bb1bb]/30 text-[#2bb1bb] shrink-0 mt-1 shadow-[0_0_15px_rgba(43,177,187,0.2)]">
            <Activity size={32} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-2" style={{ fontFamily: "'Prompt', sans-serif" }}>
              Unit-Linked COI Calculator
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl font-medium">
              เครื่องมือจำลองค่าใช้จ่ายความเสี่ยง (Cost of Insurance) ตามตารางมรณะไทย 2560
              เพื่อวิเคราะห์แนวโน้มต้นทุนที่แท้จริงในระยะยาว
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0B1D35]/60 border-x border-b border-white/10 p-8 rounded-b-[2rem] shadow-2xl space-y-8 backdrop-blur-sm">

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-inner">
            <label className="block text-base font-bold text-slate-400 mb-4 uppercase tracking-wide" style={{ fontFamily: "'Prompt', sans-serif" }}>
              อายุปัจจุบันของคุณ (Current Age): <span className="text-[#2bb1bb] text-3xl font-mono ml-2">{currentAge}</span>
            </label>
            <input
              type="range"
              min="0" max="70"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full accent-[#2bb1bb] h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer mb-2"
            />
            <div className="flex justify-between text-xs font-mono text-slate-500 font-bold">
              <span>0</span><span>35</span><span>70</span>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-inner">
            <label className="block text-base font-bold text-slate-400 mb-4 uppercase tracking-wide" style={{ fontFamily: "'Prompt', sans-serif" }}>
              ทุนประกัน (Sum Assured)
            </label>
            <div className="flex items-center gap-4 bg-[#0B1D35]/50 p-4 rounded-2xl border border-white/10 mb-4">
              <input
                type="text"
                value={sumAssured.toLocaleString()}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/,/g, ''));
                  if (!isNaN(val)) setSumAssured(val);
                }}
                className="bg-transparent w-full text-right font-bold text-[#2bb1bb] text-2xl focus:outline-none"
                style={{ fontFamily: "'Prompt', sans-serif" }}
              />
              <span className="text-slate-500 text-sm font-bold font-mono">THB</span>
            </div>
            <div className="flex gap-2 justify-end flex-wrap">
              {[1_000_000, 5_000_000, 10_000_000].map(val => (
                <button
                  key={val}
                  onClick={() => setSumAssured(val)}
                  className="text-sm font-bold font-mono px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-[#2bb1bb]/20 hover:border-[#2bb1bb]/40 text-slate-300 hover:text-white transition-all"
                >
                  {val / 1_000_000}M
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-[#2bb1bb]/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div style={{ width: '100%', height: 400 }} className="relative bg-[#0B1D35]/40 p-6 rounded-3xl border border-white/10 shadow-inner">
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
                  tickFormatter={(value: number) => `${value / 1000}k`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ stroke: '#2bb1bb', strokeWidth: 2, strokeDasharray: '5 5' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0B1D35] border border-[#2bb1bb]/50 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
                          <p className="text-xs text-slate-400 uppercase mb-1" style={{ fontFamily: "'Prompt', sans-serif" }}>
                            อายุ {payload[0].payload.age} ปี
                          </p>
                          <p className="text-[#2bb1bb] font-bold text-lg" style={{ fontFamily: "'Prompt', sans-serif" }}>
                            {'\u0E3F'}{Number(payload[0].value).toLocaleString()}
                          </p>
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

        {/* Verdict */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#2bb1bb]/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-[#2bb1bb]/10 transition-colors" />
            <div className="relative z-10">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-bold" style={{ fontFamily: "'Prompt', sans-serif" }}>
                วันนี้ (Age {currentAge})
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "'Prompt', sans-serif" }}>
                {'\u0E3F'}{currentCost.toLocaleString()} <span className="text-xl text-slate-400 font-normal" style={{ fontFamily: "'Sarabun', sans-serif" }}>/ปี</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 p-8 rounded-3xl border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-amber-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="text-xs text-amber-500 uppercase tracking-wider mb-3 font-bold" style={{ fontFamily: "'Prompt', sans-serif" }}>
                ในอนาคต (Age {data[data.length - 1]?.age ?? 0})
              </div>
              <div className="text-4xl md:text-5xl font-bold text-amber-500 tracking-tight" style={{ fontFamily: "'Prompt', sans-serif" }}>
                {'\u0E3F'}{futureCost.toLocaleString()} <span className="text-xl text-amber-400/70 font-normal" style={{ fontFamily: "'Sarabun', sans-serif" }}>/ปี</span>
              </div>
              <div className="inline-block mt-4 px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-400 font-bold uppercase tracking-wide">
                แพงขึ้น {multiplier} เท่าตัว!
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#0B1D35]/60 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
          <div className="absolute right-6 bottom-6 opacity-5 pointer-events-none">
            <Shield size={100} className="text-slate-600" />
          </div>
          <div className="relative z-10 space-y-4">
            <p className="text-lg font-bold text-amber-400 uppercase tracking-wider" style={{ fontFamily: "'Prompt', sans-serif" }}>
              ข้อควรระวัง (Disclaimer):
            </p>
            <ul className="text-base text-slate-300 leading-relaxed list-none space-y-4">
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
