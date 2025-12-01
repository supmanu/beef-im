import { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { GET_LATEST_POSTS } from '../queries'; // Ensure this path matches where you put queries.ts
import { SinekHook } from './SinekHook';
import { VerdictBlock } from './VerdictBlock';

// Configure your endpoint from .env
const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT;

export default function KnowledgeEngine() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data: any = await request(HYGRAPH_ENDPOINT, GET_LATEST_POSTS);
                setPosts(data.posts);
            } catch (error) {
                console.error("Engine Failure:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
            {posts.map((post) => (
                <article key={post.id} className="mb-40 relative">

                    {/* Vertical Timeline Line (Visual Connector) */}
                    <div className="absolute left-0 md:-left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent hidden md:block"></div>

                    {/* HEADER */}
                    <header className="mb-12 text-center max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-mono rounded tracking-widest uppercase">
                                {post.type}
                            </span>
                            <span className="text-slate-600 text-xs font-mono">•</span>
                            <span className="text-slate-500 text-xs font-mono uppercase">
                                {post.releaseDate ? new Date(post.releaseDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unscheduled'}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                            {post.title}
                        </h1>

                        {/* Tone Indicator */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-slate-800 backdrop-blur-sm">
                            <div className={`w-2 h-2 rounded-full ${post.tone === 'T2_Guardian' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
                            <span className="text-xs text-slate-400 font-mono uppercase">{post.tone?.replace('_', ' ') || 'T1 TEACHER'}</span>
                        </div>
                    </header>

                    {/* 1. THE TOP BUN (HOOK) - Validated via Sandwich Architecture */}
                    {post.openingHook && <SinekHook data={post.openingHook} />}

                    {/* 2. THE MEAT (BODY) - Rich Text */}
                    <div className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-a:text-emerald-400 prose-strong:text-white prose-blockquote:border-l-emerald-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:pr-2">
                        <RichText content={post.content.raw} />
                    </div>

                    {/* 3. THE BOTTOM BUN (VERDICT) - Validated via Sandwich Architecture */}
                    {post.theVerdict && <VerdictBlock data={post.theVerdict} />}

                    {/* 4. FOOTER (CITATIONS) - Automated Source of Truth */}
                    {post.citations && post.citations.length > 0 && (
                        <footer className="mt-16 pt-8 border-t border-slate-800/50">
                            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                                <span className="text-emerald-500">📚</span> Primary Sources (Verified)
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {post.citations.map((cite: any, idx: number) => (
                                    <li key={idx} className="bg-black/30 p-4 rounded border border-slate-800 hover:border-slate-700 transition-colors">
                                        <div className="flex items-start justify-between mb-1">
                                            <span className="text-sm text-slate-200 font-medium">{cite.sourceName}</span>
                                            {cite.tier === 1 && <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20">TIER 1</span>}
                                        </div>
                                        <div className="text-xs text-slate-500 font-mono">
                                            {cite.publisher} • {cite.year}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </footer>
                    )}

                </article>
            ))}
        </div>
    );
}