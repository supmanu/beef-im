'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, BarChart3, Binary, Plus, Activity, Cpu, Search } from 'lucide-react';
import ToolLoader from './tools/ToolLoader';
import { gsap } from 'gsap';

// FORENSIC LAB HEADER
const Header = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            const chars = titleRef.current.innerText.split('');
            titleRef.current.innerText = '';
            chars.forEach((char) => {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.opacity = '0';
                titleRef.current?.appendChild(span);
            });

            gsap.to(titleRef.current.children, {
                opacity: 1,
                duration: 0.05,
                stagger: 0.02,
                ease: "none",
                delay: 0.5
            });
        }
    }, []);

    return (
        <div className="relative bg-[#0B1D35] py-24 px-6 text-center overflow-hidden border-b border-white/5">
            {/* Background Kinetic Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative inline-block p-4 rounded-3xl bg-teal-500/10 border border-teal-500/20 mb-8"
            >
                <FlaskConical className="w-12 h-12 text-[#2bb1bb]" />
                <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"
                />
            </motion.div>

            <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold font-prompt text-white mb-4 tracking-tighter uppercase">
                Nerd's Laboratory
            </h1>
            <h2 className="text-xl font-sarabun text-[#2bb1bb] font-medium mb-8 tracking-widest">
                คลังเครื่องมือคำนวณทางคณิตศาสตร์ประกันภัย
            </h2>
            <p className="text-slate-400 font-sarabun max-w-2xl mx-auto leading-relaxed text-lg">
                เครื่องมือที่ถูกสร้างขึ้นเพื่อเปิดเผย "กลไก" (Mechanism) ที่ซ่อนอยู่ <br />
                ให้คุณเห็นตัวเลขจริงก่อนตัดสินใจ โดยปราศจากการขายและการบิดเบือน
            </p>

            {/* HUD Decorations */}
            <div className="absolute top-10 left-10 opacity-20 hidden lg:block text-teal-500"><Activity size={40} /></div>
            <div className="absolute bottom-10 right-10 opacity-20 hidden lg:block text-teal-500"><Cpu size={40} /></div>
        </div>
    );
};

export default function ToolsPageContent() {
    const [activeTool, setActiveTool] = useState<string>('COI_CALC');
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get('admin') === 'true';

    return (
        <div className="min-h-screen bg-[#0B1D35] text-slate-200">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

                {/* TACTICAL TAB CONTROLLER */}
                <div className="flex flex-wrap justify-center gap-6 mb-20">
                    <button
                        onClick={() => setActiveTool('COI_CALC')}
                        className={`group relative flex items-center gap-3 px-10 py-5 rounded-2xl font-bold font-prompt text-xl transition-all duration-500 overflow-hidden ${activeTool === 'COI_CALC'
                            ? 'text-white border-teal-500/50 shadow-[0_0_30px_rgba(43,177,187,0.2)]'
                            : 'text-slate-500 border-white/5 hover:text-teal-400 hover:border-teal-500/30'
                            } border`}
                    >
                        {activeTool === 'COI_CALC' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-emerald-600/20"
                            />
                        )}
                        <BarChart3 className={`relative z-10 ${activeTool === 'COI_CALC' ? 'text-teal-400' : ''}`} />
                        <span className="relative z-10 tracking-tight">Unit-Linked COI</span>
                    </button>

                    <button
                        onClick={() => setActiveTool('DYNASTY_SIM')}
                        className={`group relative flex items-center gap-3 px-10 py-5 rounded-2xl font-bold font-prompt text-xl transition-all duration-500 overflow-hidden ${activeTool === 'DYNASTY_SIM'
                            ? 'text-white border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                            : 'text-slate-500 border-white/5 hover:text-amber-400 hover:border-amber-500/30'
                            } border`}
                    >
                        {activeTool === 'DYNASTY_SIM' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20"
                            />
                        )}
                        <Binary className={`relative z-10 ${activeTool === 'DYNASTY_SIM' ? 'text-amber-400' : ''}`} />
                        <span className="relative z-10 tracking-tight">Dynasty Simulator</span>
                    </button>

                    <button
                        onClick={() => setActiveTool('IRR_TRUTH')}
                        className={`group relative flex items-center gap-3 px-10 py-5 rounded-2xl font-bold font-prompt text-xl transition-all duration-500 overflow-hidden ${activeTool === 'IRR_TRUTH'
                            ? 'text-white border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                            : 'text-slate-500 border-white/5 hover:text-cyan-400 hover:border-cyan-500/30'
                            } border`}
                    >
                        {activeTool === 'IRR_TRUTH' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20"
                            />
                        )}
                        <Search className={`relative z-10 ${activeTool === 'IRR_TRUTH' ? 'text-cyan-400' : ''}`} />
                        <span className="relative z-10 tracking-tight">IRR Truth Teller</span>
                    </button>

                    {isAdmin && (
                        <button
                            onClick={() => setActiveTool('SOVEREIGN_PRICING')}
                            className={`group relative flex items-center gap-3 px-10 py-5 rounded-2xl font-bold font-prompt text-xl transition-all duration-500 overflow-hidden ${activeTool === 'SOVEREIGN_PRICING'
                                ? 'text-white border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]'
                                : 'text-slate-500 border-white/5 hover:text-indigo-400 hover:border-indigo-500/30'
                                } border`}
                        >
                            {activeTool === 'SOVEREIGN_PRICING' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-600/20"
                                />
                            )}
                            <Activity className={`relative z-10 ${activeTool === 'SOVEREIGN_PRICING' ? 'text-indigo-400' : ''}`} />
                            <span className="relative z-10 tracking-tight">Sovereign Pricing</span>
                        </button>
                    )}
                </div>

                {/* TOOL STAGE (The Holographic Container) */}
                <div className="relative min-h-[600px] bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-inner overflow-hidden">
                    {/* Scan Line Animation */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-px bg-teal-500/20 shadow-[0_0_10px_rgba(45,212,191,0.3)] z-20 pointer-events-none"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />

                    {/* HUD Corners */}
                    <div className="absolute top-6 left-6 text-white/10"><Plus size={20} /></div>
                    <div className="absolute top-6 right-6 text-white/10"><Plus size={20} /></div>
                    <div className="absolute bottom-6 left-6 text-white/10"><Plus size={20} /></div>
                    <div className="absolute bottom-6 right-6 text-white/10"><Plus size={20} /></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTool}
                            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                            className="relative z-10"
                        >
                            <ToolLoader toolName={activeTool} />
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
