import { useState } from 'react';
import ToolLoader from '../components/tools/ToolLoader';
import { Helmet } from 'react-helmet-async';

// TEAL PROTOCOL HEADER
const Header = () => (
    <div className="bg-[#1e293b] py-20 px-6 text-center border-b border-slate-800">
        <div className="inline-block p-3 rounded-2xl bg-slate-800 mb-6">
            <svg className="w-10 h-10 text-[#2bb1bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-prompt text-white mb-4 tracking-tight">
            Nerd's Laboratory
        </h1>
        <h2 className="text-xl font-sarabun text-[#2bb1bb] font-medium mb-6">
            คลังเครื่องมือคำนวณทางคณิตศาสตร์ประกันภัย
        </h2>
        <p className="text-slate-400 font-sarabun max-w-2xl mx-auto leading-relaxed text-lg">
            เครื่องมือที่ถูกสร้างขึ้นเพื่อเปิดเผย "กลไก" (Mechanism) ที่ซ่อนอยู่
            ให้คุณเห็นตัวเลขจริงก่อนตัดสินใจ โดยปราศจากการขายและการบิดเบือน
        </p>
    </div>
);

export default function ToolsPage() {
    // State to switch between tools
    const [activeTool, setActiveTool] = useState<string>('COI_CALC');

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Basic SEO Metadata */}
            <Helmet>
                <title>Nerd's Laboratory | เครื่องมือคำนวณประกันชีวิต</title>
                <meta name="description" content="คลังเครื่องมือคำนวณทางคณิตศาสตร์ประกันภัย: Unit-Linked COI Calculator และ Dynasty Simulator" />
            </Helmet>

            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

                {/* TAB CONTROLLER */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    <button
                        onClick={() => setActiveTool('COI_CALC')}
                        className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold font-prompt text-lg transition-all duration-300 ${activeTool === 'COI_CALC'
                            ? 'bg-[#3B82F6] text-white shadow-xl shadow-blue-500/20 scale-105 ring-4 ring-blue-500/10'
                            : 'bg-white text-slate-500 border border-slate-200 hover:border-[#3B82F6] hover:text-[#3B82F6] hover:-translate-y-1'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Unit-Linked COI
                    </button>

                    <button
                        onClick={() => setActiveTool('DYNASTY_SIM')}
                        className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold font-prompt text-lg transition-all duration-300 ${activeTool === 'DYNASTY_SIM'
                            ? 'bg-[#3B82F6] text-white shadow-xl shadow-blue-500/20 scale-105 ring-4 ring-blue-500/10'
                            : 'bg-white text-slate-500 border border-slate-200 hover:border-[#3B82F6] hover:text-[#3B82F6] hover:-translate-y-1'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Dynasty Simulator
                    </button>
                </div>

                {/* TOOL STAGE */}
                <div className="animate-fade-in transition-all duration-500">
                    <ToolLoader toolName={activeTool} />
                </div>

            </div>
        </div>
    );
}
