// components/RefactoredRenderers.tsx
import React from 'react';

// --- HELPER: Internal Content Box ---
export const ContentInternals = ({ node }: { node: any }) => (
    <>
        <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded bg-[#2bb1bb]/10 text-[#2bb1bb] text-xs font-bold uppercase tracking-wider border border-[#2bb1bb]/20">
                Verified Source
            </span>
        </div>
        <div className="font-mono text-[#2bb1bb] font-bold text-lg mb-2">
            {node.sourceName}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
            {node.publisher}
        </p>
    </>
);

// --- RENDERER: Citation ---
export const ArticleCitation = ({ node, citations }: { node: any, citations: any[] }) => {
    const list = citations || [];
    let matchIndex = list.findIndex((c: any) => c.id === node.id);
    if (matchIndex === -1 && node.sourceName) {
        matchIndex = list.findIndex((c: any) => c.sourceName === node.sourceName);
    }
    const bigNumber = matchIndex !== -1 ? matchIndex + 1 : 1;

    return (
        <div className="flex gap-6 my-12 items-start group">
            {/* 1. THE BIG NUMBER */}
            <div className="hidden sm:block text-[#2bb1bb]/40 font-mono font-bold select-none pt-2">
                <span className="text-4xl">[</span>
                <sup className="text-2xl">{bigNumber}</sup>
                <span className="text-4xl">]</span>
            </div>

            {/* 2. THE CONTENT BOX */}
            <div className="flex-1">
                {node.citationUrl ? (
                    <a
                        href={node.citationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-6 bg-slate-800/50 border-l-4 border-[#2bb1bb] rounded-r-xl shadow-lg backdrop-blur-sm hover:scale-[1.01] hover:bg-slate-800/80 transition-all cursor-pointer"
                    >
                        <ContentInternals node={node} />
                    </a>
                ) : (
                    <div className="p-6 bg-slate-800/50 border-l-4 border-[#2bb1bb] rounded-r-xl shadow-lg backdrop-blur-sm">
                        <ContentInternals node={node} />
                    </div>
                )}
            </div>
        </div>
    );
};

// --- RENDERER: Asset (Image) ---
export const ArticleAsset = ({ url, mimeType, altText }: any) => (
    <div className="my-12">
        <img
            src={url}
            alt={altText || 'Article visual'}
            className="w-full rounded-2xl shadow-2xl border border-slate-700/50"
            loading="lazy"
        />
    </div>
);

// --- RENDERER: Divider ---
export const ArticleDivider = ({ isInvisible, variant }: { isInvisible?: boolean; variant?: string }) => {
    // 🚨 PRIORITY CHECK: If the Boolean Switch is ON, render Air.
    if (isInvisible === true) {
        return <div className="h-16 w-full" aria-hidden="true" />;
    }

    // Fallback for the Variant method (just in case)
    if (variant === 'Invisible' || variant === 'Invisible Spacer') {
        return <div className="h-16 w-full" aria-hidden="true" />;
    }

    // 🛡️ DEFAULT: Render the Teal Ghost Line
    return (
        <div className="py-12 flex items-center justify-center">
            {/* Gradient Line: Transparent -> Teal -> Transparent */}
            <div className="h-[1px] w-3/4 max-w-2xl bg-gradient-to-r from-transparent via-brand-teal/40 to-transparent"></div>
        </div>
    );
};