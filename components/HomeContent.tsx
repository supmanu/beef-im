'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import EmberGlow from './EmberGlow';
import { useSearchModal } from '../context/SearchContext';

const HomeContent: React.FC = () => {
    const router = useRouter();
    const { openSearch } = useSearchModal();

    return (
        <div className="w-full bg-[#0B1D35]">

            <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0B1D35]">
                <div className="absolute inset-0 z-0">
                    <EmberGlow intensity={60} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 w-full text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-bold leading-tight text-white mb-4 font-prompt"
                    >
                        เนื้อๆ ไม่มีน้ำ
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                        className="text-sm md:text-base font-bold tracking-widest text-brand-amber mb-6 font-mono"
                    >
                        DATA. LOGIC. NO FLUFF.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light mb-10 leading-relaxed font-prompt"
                    >
                        เรื่องประกันเราจริงจัง เรื่องย่างเนื้อเราก็จัดเต็ม
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
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
                                className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-1 text-base h-full cursor-pointer pointer-events-none"
                            />
                            <button className="h-10 w-10 rounded-full bg-brand-amber hover:bg-brand-amber/80 flex items-center justify-center text-brand-dark transition-colors">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default HomeContent;
