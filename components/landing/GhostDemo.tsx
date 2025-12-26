'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { MousePointer2, FileSearch, ShieldCheck, Database, LayoutPanelTop, CheckCircle2 } from 'lucide-react';
import GlassCard from '../GlassCard';

/**
 * GHOST DEMO: A self-playing simulation of the Nart Forensic Engine.
 * Adheres to Melkor-OS standards: No "Pi", 85/15 Thai/English ratio.
 */
const GhostDemo: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'moving' | 'uploading' | 'scanning' | 'complete'>('idle');
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);
    const cursorControls = useAnimation();

    // Refs for target elements to calculate dynamic mouse movement
    const uploadRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const runSequence = async () => {
        if (!mounted || !uploadRef.current || !containerRef.current) return;

        // Reset
        setStatus('idle');
        setProgress(0);
        await cursorControls.set({ x: 0, y: 0, opacity: 1 });

        // Step 1: Move to Upload Button
        if (uploadRef.current && containerRef.current) {
            const rect = uploadRef.current.getBoundingClientRect();
            const parentRect = containerRef.current.getBoundingClientRect();

            // Calculate relative position
            const targetX = rect.left - parentRect.left + (rect.width / 2);
            const targetY = rect.top - parentRect.top + (rect.height / 2);

            setStatus('moving');
            await cursorControls.start({
                x: targetX,
                y: targetY,
                transition: { duration: 1.5, ease: "easeInOut" }
            });

            // Step 2: "Click" and Upload
            setStatus('uploading');
            await new Promise(r => setTimeout(r, 1000));

            // Step 3: Scanning Phase
            setStatus('scanning');
            let p = 0;
            const interval = setInterval(() => {
                p += 5;
                setProgress(p);
                if (p >= 100) clearInterval(interval);
            }, 50);

            await new Promise(r => setTimeout(r, 1500));

            // Step 4: Complete
            setStatus('complete');
            await new Promise(r => setTimeout(r, 4000));

            // Restart
            runSequence();
        }
    };

    useEffect(() => {
        setMounted(true);
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            runSequence();
        }, 100);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="py-24 px-6 bg-[#0B1D35] relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-prompt">
                        สัมผัสพลัง <span className="text-brand-teal">Forensic Simulator</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        ระบบจำลองสถานการณ์ความเสี่ยง (Risk Modeling) เพื่อหา "จุดบอด" ในแผนการเงินและสุขภาพของคุณ
                        <span className="text-xs ml-2 text-slate-600 font-mono tracking-tighter">Powered by Mastra AI</span>
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full aspect-video md:aspect-[21/9] max-h-[500px] rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm overflow-hidden shadow-2xl"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

                    {/* Simulated Interface */}
                    <div className="absolute inset-0 p-8 flex gap-6">
                        {/* Sidebar */}
                        <div className="w-16 h-full border-r border-white/5 flex flex-col items-center py-4 gap-8">
                            <LayoutPanelTop className="text-slate-600" size={20} />
                            <Database className="text-slate-600" size={20} />
                            <FileSearch className="text-brand-teal" size={20} />
                            <ShieldCheck className="text-slate-600" size={20} />
                        </div>

                        {/* Main Work Area */}
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="h-10 border-b border-white/5 flex items-center justify-between px-4">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                    System Mode: <span className={status === 'complete' ? 'text-emerald-400' : 'text-brand-amber animate-pulse'}>{status === 'uploading' ? 'SIMULATING' : status.toUpperCase()}</span>
                                </span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                </div>
                            </div>

                            <div className="flex-1 flex items-center justify-center relative">
                                <AnimatePresence mode="wait">
                                    {status === 'idle' || status === 'moving' || status === 'uploading' ? (
                                        <motion.div
                                            key="upload-view"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            ref={uploadRef}
                                            className="group cursor-default"
                                        >
                                            <GlassCard className={`px-12 py-16 flex flex-col items-center gap-4 border-dashed transition-all duration-500 ${status === 'uploading' ? 'scale-95 bg-white/10 border-brand-teal' : 'hover:border-white/20'}`}>
                                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                                    <ShieldCheck className="text-brand-teal" size={32} />
                                                </div>
                                                <span className="text-white font-prompt text-lg text-center">
                                                    {status === 'uploading' ? 'กำลังจำลองสถานการณ์...' : 'เริ่มจำลองความเสี่ยงรายบุคคล'}
                                                </span>
                                                <span className="text-slate-500 text-xs uppercase tracking-tighter">Identify financial blind spots in seconds</span>
                                            </GlassCard>
                                        </motion.div>
                                    ) : status === 'scanning' ? (
                                        <motion.div
                                            key="scanning-view"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full max-w-md flex flex-col items-center gap-6"
                                        >
                                            <div className="relative w-48 h-48">
                                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                                    <circle className="text-white/5 stroke-current" strokeWidth="2" fill="transparent" r="45" cx="50" cy="50" />
                                                    <motion.circle
                                                        className="text-brand-teal stroke-current"
                                                        strokeWidth="2"
                                                        strokeDasharray="283"
                                                        strokeDashoffset={283 - (283 * progress) / 100}
                                                        strokeLinecap="round"
                                                        fill="transparent"
                                                        r="45" cx="50" cy="50"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-3xl font-mono text-white">{progress}%</span>
                                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Risk Analysis</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-brand-teal"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                            <p className="text-sm font-prompt text-slate-400 italic text-center">
                                                กำลังคำนวณ "ออกซิเจนทางการเงิน" และจำลองสถานการณ์ Death Zone...
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="complete-view"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-8"
                                        >
                                            <GlassCard className="p-6 border-emerald-500/30 bg-emerald-500/5">
                                                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                                                    <CheckCircle2 size={20} />
                                                    <span className="font-prompt font-bold">ผลการจำลองสถานการณ์</span>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                                                        <span className="text-slate-500 uppercase">System Safety</span>
                                                        <span className="text-white font-bold">OPTIMIZED</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                                                        <span className="text-slate-500 uppercase">Cost Efficiency</span>
                                                        <span className="text-emerald-400 font-bold">+24%</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-slate-500 uppercase">Fiduciary Score</span>
                                                        <span className="text-white font-bold">98/100</span>
                                                    </div>
                                                </div>
                                            </GlassCard>

                                            <div className="space-y-4">
                                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                    <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-tighter">Intelligence Insight</span>
                                                    <p className="text-sm text-slate-300 font-prompt">
                                                        ตรวจพบการซ้อนทับของผลประโยชน์ (Overlap) ในสัญญาเพิ่มเติมค่ารักษาพยาบาล
                                                    </p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                    <span className="block text-[10px] text-slate-500 mb-1 uppercase tracking-tighter">NHES VII Benchmark</span>
                                                    <p className="text-sm text-slate-300 font-prompt">
                                                        ความเสี่ยงโรค NCDs ของคุณอยู่ในเกณฑ์เฉลี่ย (45% Obesity Trend)
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* The Ghost Cursor */}
                    <motion.div
                        className="absolute z-50 pointer-events-none text-white drop-shadow-lg"
                        animate={cursorControls}
                        initial={{ opacity: 0 }}
                    >
                        <MousePointer2 size={24} fill="currentColor" />
                        {status === 'moving' && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 0.2 }}
                                className="absolute top-0 left-0 w-6 h-6 bg-brand-teal rounded-full -translate-x-1/2 -translate-y-1/2"
                            />
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default GhostDemo;
