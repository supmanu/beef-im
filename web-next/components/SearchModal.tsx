'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search as SearchIcon, FileText } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const { query, setQuery, results, isLoading } = useSearch();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    const handleResultClick = (slug: string) => {
        router.push(`/articles/${slug}`);
        onClose();
        setQuery(''); // Reset search
    };

    // Helper to highlight matching text
    const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
        if (!highlight.trim()) return <span>{text}</span>;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={i} className="text-amber-500 font-bold bg-amber-500/10 rounded px-1">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-[#0B1D35]/80 backdrop-blur-sm transition-all duration-300">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-[#0F2440] border border-teal-500/30 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
                {/* Header / Input */}
                <div className="flex items-center gap-4 p-5 border-b border-teal-500/20 bg-[#0F2440]/50 backdrop-blur-md">
                    <SearchIcon className="text-teal-500" size={24} />
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-slate-500 font-prompt"
                        placeholder="Search the Archive (e.g. Unit Linked, Tax, Claims)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {isLoading && (
                        <div className="p-8 text-center text-slate-500 font-sarabun">Loading Index...</div>
                    )}

                    {!isLoading && query && results.length === 0 && (
                        <div className="p-8 text-center text-slate-500 font-sarabun">
                            No results found for "{query}"
                        </div>
                    )}

                    {!isLoading && !query && (
                        <div className="p-8 text-center text-slate-600 font-sarabun text-sm">
                            Type to start searching the archives...
                        </div>
                    )}

                    {results.map((article) => (
                        <div
                            key={article.id}
                            onClick={() => handleResultClick(article.slug)}
                            className="group flex flex-col gap-1 p-4 rounded-lg hover:bg-teal-500/10 cursor-pointer transition-colors border border-transparent hover:border-teal-500/20"
                        >
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-slate-500 group-hover:text-amber-500 transition-colors" />
                                <h4 className="text-lg font-bold font-prompt text-slate-200 group-hover:text-white">
                                    <HighlightedText text={article.title} highlight={query} />
                                </h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                                    {article.category}
                                </span>
                            </div>

                            <p className="text-sm text-slate-400 font-sarabun line-clamp-2 pl-6">
                                {article.plainText ? article.plainText.substring(0, 150) + "..." : "No preview available."}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-3 bg-[#0B1D35] border-t border-teal-500/20 flex justify-between items-center text-xs text-slate-500 font-mono">
                    <span>
                        <kbd className="bg-slate-800 px-2 py-1 rounded text-slate-300">Esc</kbd> to close
                    </span>
                    <span>
                        {results.length} results
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
