import React from 'react';

interface VerdictProps {
    data: {
        emoji: string;
        command: string;
        linkUrl?: string;
    };
}

export const VerdictBlock: React.FC<VerdictProps> = ({ data }) => {
    return (
        <div className="mt-16 mb-12 relative group">
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

            {/* The Content Box */}
            <div className="relative bg-black border border-slate-800 rounded-lg p-8 text-center">

                {/* Emoji Icon */}
                <div className="text-5xl mb-6 filter drop-shadow-lg animate-pulse">{data.emoji}</div>

                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
                    THE VERDICT
                </h3>

                {/* The Binary Command */}
                <p className="text-emerald-300 text-xl md:text-2xl font-bold mb-8 leading-snug">
                    {data.command}
                </p>

                {/* The Action Button (Optional) */}
                {data.linkUrl && (
                    <a
                        href={data.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                    >
                        EXECUTE PROTOCOL
                        <span aria-hidden="true">→</span>
                    </a>
                )}
            </div>
        </div>
    );
};