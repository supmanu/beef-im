
import Link from 'next/link';
import { Map, Shield, Edit3, ArrowRight } from 'lucide-react';

export default function BentoGrid() {
    return (
        <section className="bg-[#0f2645]/50 border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* --- TOOLS --- */}
                    <Link href="/tools" className="group bg-[#0B1D35] border border-slate-800 p-8 rounded-2xl hover:border-brand-amber/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-brand-amber/10 flex items-center justify-center text-brand-amber mb-6 group-hover:scale-110 transition-transform">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-['Prompt']">The Armory</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Access interactive calculators, audit checklists, and policy comparisons.
                        </p>
                        <span className="flex items-center gap-2 text-brand-amber text-sm font-bold tracking-wide group-hover:translate-x-2 transition-transform">
                            OPEN TOOLS <ArrowRight size={16} />
                        </span>
                    </Link>

                    {/* --- MANIFESTO --- */}
                    <Link href="/manifesto" className="group bg-[#0B1D35] border border-slate-800 p-8 rounded-2xl hover:border-brand-teal/50 hover:shadow-[0_0_20px_rgba(43,177,187,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-6 group-hover:scale-110 transition-transform">
                            <Map size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-['Prompt']">The Manifesto</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Understanding the "Why" behind the logic. Our philosophy on wealth architecture.
                        </p>
                        <span className="flex items-center gap-2 text-brand-teal text-sm font-bold tracking-wide group-hover:translate-x-2 transition-transform">
                            READ PHILOSOPHY <ArrowRight size={16} />
                        </span>
                    </Link>

                    {/* --- ARCHIVE --- */}
                    <Link href="/articles" className="group bg-[#0B1D35] border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                            <Edit3 size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-['Prompt']">The Archive</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Full library of analyses, case studies, and technical deep-dives.
                        </p>
                        <span className="flex items-center gap-2 text-blue-500 text-sm font-bold tracking-wide group-hover:translate-x-2 transition-transform">
                            BROWSE ALL <ArrowRight size={16} />
                        </span>
                    </Link>

                </div>
            </div>
        </section>
    );
}
