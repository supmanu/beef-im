import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Download, Map, TrendingUp, ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import SEO from '../components/SEO'; // <--- 1. IMPORT SEO
import Snowstorm from '../components/Snowstorm';
import HeroHUD from '../components/HeroHUD';
import KnowledgeEngine from '../components/KnowledgeEngine';

import { useSearchModal } from '../context/SearchContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState({ temp: -15, wind: 20 });
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const { openSearch } = useSearchModal();

  useEffect(() => {
    const wind = Math.floor(Math.random() * 31) + 10;
    const temp = Math.round(-15 - ((wind - 10) / 30) * 10);
    setWeather({ temp, wind });
  }, []);

  return (
    <div className="w-full bg-[#0B1D35]">
      {/* 2. INJECT SIGNALS */}
      <SEO
        title="Financial Strategy"
        description="Data. Logic. Legacy. Designing financial architecture and insurance systems for the sophisticated investor."
      />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" as const }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.img
              src="https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmit33qbm10wh07nz61n3l18i"
              alt="Mountain Expedition"
              className="w-full h-full object-cover opacity-60"
              style={{ scale }}
            />
          </motion.div>
          <Snowstorm windIntensity={weather.wind} />
          <HeroHUD temperature={weather.temp} windSpeed={weather.wind} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] via-[#0B1D35]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D35]/70 via-transparent to-[#0B1D35]/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" as const }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-xs font-bold tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
            ALT: 24,500 FT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" as const }}
            className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6 font-['Prompt']"
          >
            การเงินไม่ใช่การ<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">วิ่งระยะสั้น...</span><br />
            แต่คือการ<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">ปีนสู่ยอดเขา</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" as const }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl font-light mb-10 leading-relaxed"
          >
            วางแผนมรดกและสุขภาพด้วย 'ระบบ' ที่ทนทานต่อทุกสภาพอากาศ <br />
            <span className="text-sm font-medium text-brand-teal hover:text-brand-teal/80 transition-colors duration-300 cursor-default">Design your financial oxygen for the death zone.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" as const }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div
              className="flex-1 max-w-md h-14 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center px-2 pl-6 transition-colors hover:bg-white/10 hover:border-white/30 cursor-pointer"
              onClick={openSearch}
            >
              <input
                type="text"
                readOnly
                placeholder="ค้นหา Unit-Linked, COI, หรือ แผนเกษียณ..."
                className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-1 text-sm h-full cursor-pointer pointer-events-none"
              />
              <button className="h-10 w-10 rounded-full bg-brand-amber hover:bg-brand-amber/80 flex items-center justify-center text-brand-dark transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">
            Descent to Basecamp
          </span>
          <ArrowDown className="text-slate-400 opacity-50 animate-bounce" size={20} />
        </motion.div>
      </section>

      {/* --- 2. KNOWLEDGE ENGINE SECTION (INJECTED) --- */}
      <section className="relative z-20 w-full bg-gradient-to-b from-[#0B1D35] via-[#0B1D35] to-[#0f2645]">
        <KnowledgeEngine />
      </section>

      {/* --- 3. BENTO GRID SECTION (EVERGREEN TOOLS) --- */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">The Gear Check</h2>
            <p className="text-gray-400">อุปกรณ์และแผนที่สำหรับการเดินทางไกล</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* ... (Kept Bento Grid same as before for brevity) ... */}
          <GlassCard className="col-span-1 md:col-span-2 p-8 flex flex-col justify-between relative group overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmit2qaew10q007nzdhsh86ra"
                alt="Core Mechanisms"
                className="w-full h-full object-cover object-right-bottom opacity-40 group-hover:scale-105 transition-transform duration-700 mix-blend-overlay rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] via-[#0B1D35]/80 to-transparent"></div>
            </div>
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity z-10">
              <Map size={32} className="text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-brand-amber text-xs font-bold tracking-widest mb-3">
                <Map size={14} /> NAVIGATION
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Core Mechanisms</h3>
              <p className="text-gray-300 max-w-md leading-relaxed">
                โครงสร้างพื้นฐานที่จำเป็นก่อนเริ่มออกเดินทาง เจาะลึกกลไกการทำงานของเครื่องมือทางการเงิน
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 relative z-10">
              {['COI Structures', 'Estate Planning', 'Tax Efficiency'].map(tag => (
                <span key={tag} className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
            <div
              className="mt-6 flex items-center gap-2 text-brand-teal hover:text-brand-teal/80 cursor-pointer transition-colors w-fit relative z-10"
              onClick={() => navigate('/articles')}
            >
              <span className="text-sm font-medium">Browse Full Archive</span>
              <ArrowRight size={16} />
            </div>
          </GlassCard>

          <GlassCard
            className="col-span-1 row-span-2 relative group h-[400px] md:h-auto"
            onClick={() => navigate('/articles')}
          >
            <img
              src="https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmit2qacu106807pjid7pu2iy"
              alt="Medical Audit"
              className="absolute inset-0 w-full h-full object-cover object-[30%_20%] opacity-60 group-hover:scale-105 transition-transform duration-700 rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] via-[#0B1D35]/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="px-2 py-1 bg-brand-amber text-brand-dark text-xs font-bold rounded mb-3 inline-block">
                CASE #005
              </span>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                Medical Audit Defense
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                ถอดบทเรียนการเคลมสินไหมสุขภาพ และการรับมือกับการตรวจสอบประวัติ
              </p>
              <div className="flex items-center gap-2 text-brand-amber text-sm group-hover:translate-x-2 transition-transform">
                Read Analysis <TrendingUp size={16} />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="col-span-1 md:col-span-2 p-8 relative overflow-hidden flex flex-row items-center justify-between group">
            <div className="relative z-10 max-w-sm">
              <div className="flex items-center gap-2 text-brand-amber text-xs font-bold tracking-widest mb-3">
                <Shield size={14} /> ARMORY
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Audit Gear & Checklists</h3>
              <p className="text-gray-400 text-sm mb-6">
                ดาวน์โหลด Checklist และตารางเปรียบเทียบ Unit-Linked สำหรับปี 2024
              </p>
              <button
                onClick={() => navigate('/tools')}
                className="flex items-center gap-2 bg-brand-amber hover:bg-brand-amber/80 text-brand-dark font-bold py-3 px-6 rounded-full transition-colors"
              >
                <Download size={18} />
                <span>Download Kit</span>
              </button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none">
              <div className="w-full h-full bg-[url('https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmit2qags106f07pjena59ajv')] bg-cover bg-bottom grayscale mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Home;