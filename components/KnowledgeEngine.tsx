'use client';

import { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { GET_ARCHIVE } from '@/queries';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

// TEAL PROTOCOL LOCKED
const colorMap: Record<string, string> = {
    emerald: 'bg-[#2bb1bb]/10 text-[#2bb1bb] border-[#2bb1bb]/20', // Health = Teal
    amber: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',   // Wealth = Orange
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',       // Legacy = Blue
    slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',   // Perspective = Slate
    default: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
};

export default function KnowledgeEngine() {
    const router = useRouter();
    const [posts, setPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: any = await request(HYGRAPH_ENDPOINT, GET_ARCHIVE);
                setPosts(data.posts);
                setCategories(data.categories);
            } catch (error) {
                console.error("Archive Offline:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredPosts = filter === 'all'
        ? posts
        : posts.filter(post => post.categories.some((c: any) => c.slug === filter));

    if (loading) return (
        <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2bb1bb]"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-24">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-['Prompt']">
                        คลังความรู้ <span className="text-[#2bb1bb] text-lg font-normal">(The Archive)</span>
                    </h2>
                    <p className="text-slate-400">บันทึกการเดินทางและองค์ความรู้ที่รวบรวมจากการทำงานจริง</p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${filter === 'all'
                            ? 'bg-white text-[#0B1D35] font-bold border-white scale-105'
                            : 'bg-transparent text-slate-400 border-slate-700 hover:border-[#2bb1bb] hover:text-[#2bb1bb] hover:bg-[#2bb1bb]/10'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.slug)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${filter === cat.slug
                                ? 'bg-[#2bb1bb] text-white border-[#2bb1bb] shadow-[0_0_15px_rgba(43,177,187,0.3)] font-bold scale-105'
                                : 'bg-transparent text-slate-400 border-slate-700 hover:border-[#2bb1bb] hover:text-[#2bb1bb] hover:bg-[#2bb1bb]/10'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* POSTS GRID */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl bg-[#0f2645]/50">
                    <p className="text-slate-500">No signals found in this sector.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <article
                            key={post.id}
                            onClick={() => router.push(`/articles/${post.slug}`)}
                            className="group relative bg-[#0f2645] border border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#2bb1bb]/50 hover:shadow-[0_0_20px_rgba(43,177,187,0.15)] flex flex-col h-full cursor-pointer"
                        >

                            {/* Image */}
                            <div className="h-48 overflow-hidden relative bg-slate-900">
                                {post.coverImage ? (
                                    <img
                                        src={post.coverImage.url}
                                        alt={post.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono text-xs">NO VISUAL</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2645] to-transparent opacity-90"></div>

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {post.categories.map((cat: any) => (
                                        <span key={cat.slug} className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded backdrop-blur-md border ${colorMap[cat.color] || colorMap.default}`}>
                                            {cat.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-xs text-slate-500 font-mono mb-3 flex items-center gap-2">
                                    <span>{new Date(post.releaseDate).toLocaleDateString('en-GB')}</span>
                                    <span>•</span>
                                    <span>{Math.ceil(post.content.text.split(' ').length / 200)} min read</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#2bb1bb] transition-colors font-['Prompt'] leading-snug">
                                    {post.title}
                                </h3>

                                {/* 🚨 DEEP SANITATION PATCH ACTIVE HERE */}
                                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1 font-['Sarabun']">
                                    {post.content.text
                                        .replace(/\\n/g, ' ') // Strip literal "\n" strings
                                        .replace(/\n/g, ' ')  // Strip real newlines
                                        .replace(/\s+/g, ' ') // Collapse double spaces
                                        .trim()               // Clean edges
                                        .substring(0, 120)}...
                                </p>

                                <div className="flex items-center gap-2 text-[#F59E0B] text-sm font-bold group-hover:translate-x-2 transition-transform mt-auto">
                                    READ ANALYSIS <ArrowRight size={16} />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}