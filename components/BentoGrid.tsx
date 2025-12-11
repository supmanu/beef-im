import Link from 'next/link';
import { Calculator, ScrollText, Library, ArrowRight } from 'lucide-react';

export default function BentoGrid() {
    return (
        <section className="py-12 bg-[#0B1D35]">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* Section Header */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <span className="text-brand-amber text-xs font-bold tracking-widest uppercase mb-2 block">
                            The Gear Check
                        </span>
                        <h2 className="text-3xl font-bold text-slate-100 font-prompt">
                            คลังเครื่องมือและข้อมูล <span className="text-slate-500 text-lg font-normal ml-2">(Resources)</span>
                        </h2>
                    </div>
                </div>

                {/* The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: The Armory (Tools) */}
                    <Link href="/tools" className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-brand-teal/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-teal/10">
                        <div className="absolute top-8 right-8 p-3 rounded-full bg-slate-800/50 text-slate-400 group-hover:bg-brand-teal/10 group-hover:text-brand-teal transition-colors">
                            <Calculator size={24} />
                        </div>
                        <div className="mt-8">
                            <span className="text-xs font-bold text-brand-teal tracking-widest uppercase mb-2 block">
                                The Armory
                            </span>
                            <h3 className="text-2xl font-bold text-slate-100 mb-3 font-prompt group-hover:text-brand-teal transition-colors">
                                คลังเครื่องมือ
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                คำนวณภาษี ตรวจสอบกรมธรรม์ และวางแผนเกษียณด้วยตัวคุณเอง ผ่านเครื่องมือที่เราออกแบบมาเพื่อความแม่นยำ
                            </p>
                            <div className="flex items-center text-sm font-semibold text-slate-300 group-hover:text-brand-amber transition-colors">
                                ลองใช้งาน <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Card 2: The Manifesto (Philosophy) */}
                    <Link href="/manifesto" className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-brand-teal/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-teal/10">
                        <div className="absolute top-8 right-8 p-3 rounded-full bg-slate-800/50 text-slate-400 group-hover:bg-brand-teal/10 group-hover:text-brand-teal transition-colors">
                            <ScrollText size={24} />
                        </div>
                        <div className="mt-8">
                            <span className="text-xs font-bold text-brand-teal tracking-widest uppercase mb-2 block">
                                The Manifesto
                            </span>
                            <h3 className="text-2xl font-bold text-slate-100 mb-3 font-prompt group-hover:text-brand-teal transition-colors">
                                จุดยืนของเรา
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                ทำไมเราถึงไม่ขาย "ทางลัด" สู่ความมั่งคั่ง? อ่านเบื้องหลังความคิดและปรัชญาการทำงานของ Nerd with Nart
                            </p>
                            <div className="flex items-center text-sm font-semibold text-slate-300 group-hover:text-brand-amber transition-colors">
                                อ่านต่อ <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Card 3: The Archive (Knowledge) */}
                    <Link href="/articles" className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-brand-teal/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-teal/10">
                        <div className="absolute top-8 right-8 p-3 rounded-full bg-slate-800/50 text-slate-400 group-hover:bg-brand-teal/10 group-hover:text-brand-teal transition-colors">
                            <Library size={24} />
                        </div>
                        <div className="mt-8">
                            <span className="text-xs font-bold text-brand-teal tracking-widest uppercase mb-2 block">
                                The Archive
                            </span>
                            <h3 className="text-2xl font-bold text-slate-100 mb-3 font-prompt group-hover:text-brand-teal transition-colors">
                                คลังความรู้
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                รวมบทวิเคราะห์เจาะลึก กรณีศึกษา (Case Study) และจดหมายเหตุทางการเงินที่คุณอาจไม่เคยรู้มาก่อน
                            </p>
                            <div className="flex items-center text-sm font-semibold text-slate-300 group-hover:text-brand-amber transition-colors">
                                ดูทั้งหมด <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
