'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

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
    title: string; // Payload CMS uses 'title' not 'name'
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

    // Animation variants for stagger effect on cards only
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Search Bar - Forensic Style */}
                <div className="mb-12">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-500/50" size={20} />
                        <input
                            type="text"
                            placeholder="Search intelligence..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-900/60 backdrop-blur border border-teal-500/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Category Filter Pills - Holographic Style */}
                <div className="flex flex-wrap gap-3 mb-12 justify-center">
                    <motion.button
                        onClick={() => setSelectedCategory('all')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${selectedCategory === 'all'
                            ? 'bg-brand-amber text-[#0B1D35] shadow-lg shadow-brand-amber/30'
                            : 'bg-slate-900/60 backdrop-blur text-slate-400 border border-slate-700/50 hover:border-brand-amber/30 hover:text-brand-amber'
                            }`}
                    >
                        ทั้งหมด (All)
                    </motion.button>
                    {categories.map((cat) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.slug)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${selectedCategory === cat.slug
                                ? 'bg-brand-amber text-[#0B1D35] shadow-lg shadow-brand-amber/30'
                                : 'bg-slate-900/60 backdrop-blur text-slate-400 border border-slate-700/50 hover:border-brand-amber/30 hover:text-brand-amber'
                                }`}
                        >
                            {cat.title}
                        </motion.button>
                    ))}
                </div>

                {/* Articles Grid with Stagger Animation */}
                {filteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-12 border border-teal-500/20 rounded-2xl bg-slate-900/60 backdrop-blur text-center"
                    >
                        <h3 className="text-xl text-slate-300 font-semibold mb-2">No Articles Found</h3>
                        <p className="text-slate-500">
                            {searchQuery ? 'Try a different search term.' : 'No articles in this category.'}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
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
                                ? firstCategory.title
                                : typeof post.category === 'string'
                                    ? post.category.replace('-', ' ')
                                    : 'General';

                            return (
                                <motion.article
                                    key={post.id}
                                    variants={cardVariants}
                                    whileHover={{ y: -8 }}
                                    className="h-full cursor-pointer"
                                >
                                    <Link href={`/articles/${post.slug}`} className="group block h-full">
                                        <article className="bg-[#0f2645] border border-slate-800/50 rounded-2xl overflow-hidden hover:border-brand-teal/50 hover:shadow-[0_0_20px_rgba(43,177,187,0.15)] transition-all duration-500 h-full flex flex-col">
                                            <div className="aspect-video bg-slate-800 relative overflow-hidden">
                                                {coverImageUrl ? (
                                                    <img
                                                        src={coverImageUrl}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
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
                                                <h3 className="text-xl font-bold text-white group-hover:text-brand-teal transition-colors mb-3 line-clamp-2 font-prompt">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-grow font-sarabun">
                                                    {post.excerpt || 'Click to read more...'}
                                                </p>
                                                <div className="flex items-center gap-2 text-brand-amber text-sm font-bold tracking-wider group-hover:translate-x-2 transition-transform mt-auto">
                                                    READ ANALYSIS <span className="text-lg">→</span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
