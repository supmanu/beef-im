import React from 'react';

interface SinekHookProps {
    data: {
        variant: 'Tension' | 'SinekFilter';
        beliefStatement: string;
        alienationStatement: string;
        invitationStatement: string;
    };
}

export const SinekHook: React.FC<SinekHookProps> = ({ data }) => {
    // Check if this is the "Belief Filter" variant (High Contrast)
    const isFilter = data.variant === 'SinekFilter';

    return (
        <div className={`my-12 p-6 rounded-lg border-l-4 shadow-lg ${isFilter ? 'bg-slate-900 border-red-500 shadow-red-900/20' : 'bg-slate-800 border-emerald-500 shadow-emerald-900/20'}`}>

            {/* 1. The Opening Salvo */}
            <h3 className={`text-sm font-bold uppercase tracking-widest mb-3 font-mono ${isFilter ? 'text-red-400' : 'text-emerald-400'}`}>
                {isFilter ? "🚩 The Sinek Filter" : "💡 The Reality Check"}
            </h3>

            {/* 2. The Belief / Truth */}
            <p className="text-white text-xl font-medium mb-6 leading-relaxed">
                "{data.beliefStatement}"
            </p>

            {/* 3. The Filter Logic (Alienation vs Invitation) */}
            <div className="space-y-3 pt-4 border-t border-slate-700/50">
                <div className="flex items-start gap-3">
                    <span className="text-red-500 shrink-0">❌</span>
                    <p className="text-slate-400 text-sm">
                        <span className="text-slate-300 font-semibold">STOP:</span> {data.alienationStatement}
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-emerald-500 shrink-0">✅</span>
                    <p className="text-slate-400 text-sm">
                        <span className="text-slate-300 font-semibold">GO:</span> {data.invitationStatement}
                    </p>
                </div>
            </div>
        </div>
    );
};