'use client';

import Link from 'next/link';
import { Calculator, ScrollText, Library, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BentoGrid() {
    const cards = [
        {
            href: '/tools',
            icon: Calculator,
            category: 'The Armory',
            title: 'คลังเครื่องมือ',
            description: 'คำนวณภาษี ตรวจสอบกรมธรรม์ และวางแผนเกษียณด้วยตัวคุณเอง ผ่านเครื่องมือที่เราออกแบบมาเพื่อความแม่นยำ',
            cta: 'ลองใช้งาน'
        },
        {
            href: '/manifesto',
            icon: ScrollText,
            category: 'The Manifesto',
            title: 'จุดยืนของเรา',
            description: 'ทำไมเราถึงไม่ขาย "ทางลัด" สู่ความมั่งคั่ง? อ่านเบื้องหลังความคิดและปรัชญาการทำงานของ ประกันเนื้อๆ',
            cta: 'อ่านต่อ'
        },
        {
            href: '/articles',
            icon: Library,
            category: 'The Archive',
            title: 'คลังความรู้',
            description: 'รวมบทวิเคราะห์เจาะลึก กรณีศึกษา (Case Study) และจดหมายเหตุทางการเงินที่คุณอาจไม่เคยรู้มาก่อน',
            cta: 'ดูทั้งหมด'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-12 bg-[#0B1D35]">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 flex items-end justify-between"
                >
                    <div>
                        <span className="text-brand-amber text-xs font-bold tracking-wider uppercase mb-2 block">
                            The Gear Check
                        </span>
                        <h2 className="text-3xl font-bold text-slate-100 font-prompt">
                            คลังเครื่องมือและข้อมูล <span className="text-slate-500 text-lg font-normal ml-2">(Resources)</span>
                        </h2>
                    </div>
                </motion.div>

                {/* The Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {cards.map((card, index) => (
                        <motion.div key={card.href} variants={cardVariants}>
                            <Link href={card.href} className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-brand-teal/50 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-teal/10 block h-full">
                                <motion.div
                                    className="absolute top-8 right-8 p-3 rounded-full bg-slate-800/50 text-slate-400 group-hover:bg-brand-teal/10 group-hover:text-brand-teal transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <card.icon size={24} />
                                </motion.div>
                                <div className="mt-8">
                                    <span className="text-xs font-bold text-brand-teal tracking-wider uppercase mb-2 block">
                                        {card.category}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 font-prompt group-hover:text-brand-teal transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-base text-slate-400 leading-loose mb-6">
                                        {card.description}
                                    </p>
                                    <div className="flex items-center text-sm font-semibold text-slate-300 group-hover:text-brand-amber transition-colors">
                                        {card.cta} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                </motion.div>
            </div>
        </section>
    );
}
