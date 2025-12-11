'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Shield, Download, Map, TrendingUp, ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GlassCard from './GlassCard';
import Snowstorm from './Snowstorm';
import HeroHUD from './HeroHUD';
import KnowledgeEngine from './KnowledgeEngine';
import { useSearchModal } from '../context/SearchContext';

const HomeContent: React.FC = () => {
    const router = useRouter();
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

            {/* --- HERO SECTION --- */}
            <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
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
                        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-xs font-bold tracking-widest mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
                        ALT: 24,500 FT
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6 font-['Prompt']"
                    >
                        การเงินไม่ใช่การ<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">วิ่งระยะสั้น...</span><br />
                        แต่คือการ<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">ปีนสู่ยอดเขา</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl font-light mb-10 leading-relaxed"
                    >
                        วางแผนมรดกและสุขภาพด้วย 'ระบบ' ที่ทนทานต่อทุกสภาพอากาศ <br />
                        <span className="text-sm font-medium text-brand-teal hover:text-brand-teal/80 transition-colors duration-300 cursor-default">Design your financial oxygen for the death zone.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
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

        </div>
    );
};

export default HomeContent;
