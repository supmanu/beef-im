'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

// Map categories to colors for badges
const colorMap: Record<string, string> = {
    'deep-dive': 'text-brand-teal bg-brand-teal/10 border-brand-teal/30',
    'quick-magnet': 'text-brand-amber bg-brand-amber/10 border-brand-amber/30',
    'news': 'text-blue-400 bg-blue-900/30 border-blue-500/30',
    'case-study': 'text-slate-400 bg-slate-900/30 border-slate-500/30',
    default: 'text-gray-400 bg-gray-900/30 border-gray-500/30'
};

interface Category {
    id: string | number;
    name: string;
    slug: string;
}

interface Article {
    id: string | number;
    title: string;
    slug: string;
    excerpt?: string;
    category?: Category | Category[] | string;
    coverImage?: {
        url?: string;
    } | string;
}

interface ArchiveClientProps {
    initialPosts: Article[];
    categories: Category[];
}

export default function ArchiveClient({ initialPosts, categories }: ArchiveClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter posts based on category and search
    const filteredPosts = useMemo(() => {
        let filtered = initialPosts;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => {
                if (!post.category) return false;

                // Handle relationship array
                if (Array.isArray(post.category)) {
                    return post.category.some(cat =>
                        typeof cat === 'object' ? cat.slug === selectedCategory : cat === selectedCategory
                    );
                }

                // Handle single relationship object
                if (typeof post.category === 'object') {
                    return post.category.slug === selectedCategory;
                }

                // Handle legacy string format
                return post.category === selectedCategory;
            });
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(query) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [initialPosts, selectedCategory, searchQuery]);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                    คลังความรู้ <span className="text-brand-teal text-2xl font-normal">(The Archive)</span>
                </h1>
                <p className="text-slate-400 max-w-2xl">
                    บันทึกการเดินทางและองค์ความรู้ที่รวบรวมจากการทำงานจริง
                </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search intelligence..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-teal/50 transition-colors"
                    />
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-3 mb-12">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${selectedCategory === 'all'
                        ? 'bg-brand-teal text-white'
                        : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-slate-700'
                        }`}
                >
                    ทั้งหมด (All)
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${selectedCategory === cat.slug
                            ? 'bg-brand-teal text-white'
                            : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-slate-700'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Articles Grid */}
            {filteredPosts.length === 0 ? (
                <div className="p-12 border border-slate-800 rounded-2xl bg-slate-900/50 text-center">
                    <h3 className="text-xl text-slate-300 font-semibold mb-2">No Articles Found</h3>
                    <p className="text-slate-500">
                        {searchQuery ? 'Try a different search term.' : 'No articles in this category.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => {
                        // Handle Cover Image
                        const coverImageUrl = typeof post.coverImage === 'string'
                            ? post.coverImage
                            : post.coverImage?.url;
                        // Extract first category from relationship array
                        let firstCategory: Category | null = null;

                        if (Array.isArray(post.category) && post.category.length > 0) {
                            const cat = post.category[0];
                            if (typeof cat === 'object' && cat !== null && 'slug' in cat) {
                                firstCategory = cat;
                            }
                        } else if (typeof post.category === 'object' && post.category !== null && !Array.isArray(post.category)) {
                            firstCategory = post.category;
                        }

                        const categorySlug = firstCategory
                            ? firstCategory.slug
                            : typeof post.category === 'string'
                                ? post.category
                                : 'general';

                        const categoryLabel = firstCategory
                            ? firstCategory.name
                            : typeof post.category === 'string'
                                ? post.category.replace('-', ' ')
                                : 'General';

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
                                            <span className={`text-xs font-mono px-2 py-1 rounded-full uppercase border ${colorMap[categorySlug] || colorMap.default}`}>
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
    );
}
