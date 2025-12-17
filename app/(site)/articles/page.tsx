import React from 'react';
import Link from 'next/link';
import { getSovereignArticles } from '../../../lib/payload';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'คลังความรู้ (The Archive) - Nerd with Nart',
    description: 'บันทึกการเดินทางและองค์ความรู้ที่รวบรวมจากการทำงานจริง',
};

// Map categories to colors for the list view badges
const colorMap: Record<string, string> = {
    'deep-dive': 'text-brand-teal bg-brand-teal/10',
    'quick-magnet': 'text-brand-amber bg-brand-amber/10',
    'news': 'text-blue-400 bg-blue-900/30',
    'case-study': 'text-slate-400 bg-slate-900/30',
    default: 'text-gray-400 bg-gray-900/30'
};

export default async function ArticlesPage() {
    // 🛡️ SOVEREIGN DATA FETCH
    const posts = await getSovereignArticles();

    return (
        <main className="min-h-screen bg-brand-dark text-slate-200 pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        คลังความรู้ <span className="text-brand-teal text-2xl font-normal">(The Archive)</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        บันทึกการเดินทางและองค์ความรู้ที่รวบรวมจากการทำงานจริง
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="p-12 border border-slate-800 rounded-2xl bg-slate-900/50 text-center">
                        <h3 className="text-xl text-slate-300 font-semibold mb-2">No Articles Found</h3>
                        <p className="text-slate-500">The archive is currently empty.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => {
                            // Handle Cover Image
                            const coverImageUrl = post.coverImage?.url || post.coverImage;
                            const category = post.category || 'news';
                            const categoryLabel = post.category ? post.category.replace('-', ' ') : 'Article';

                            return (
                                <Link key={post.id} href={`/articles/${post.slug}`} className="group block h-full">
                                    <article className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-brand-teal/50 transition-all duration-300 h-full flex flex-col">
                                        <div className="aspect-video bg-slate-800 relative overflow-hidden">
                                            {coverImageUrl ? (
                                                <img
                                                    src={coverImageUrl}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                                    <span className="text-slate-500 text-sm">No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`text-xs font-mono px-2 py-1 rounded-full uppercase ${colorMap[category] || colorMap.default}`}>
                                                    {categoryLabel}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-brand-teal transition-colors mb-3 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                                                {post.excerpt || 'Click to read more...'}
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
