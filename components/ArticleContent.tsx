'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import ArticlesBackground from '@/components/ArticlesBackground';

// Temporary Sovereign Override
const AVATAR_URL = "https://assets.nerdwithnart.com/nwn-assets/natapol-supmanu-nerd-with-nart-avatar.png";

// ✅ FIXED: Map Categories to Badge Colors (Teal Protocol Enforced)
const colorMap: Record<string, string> = {
    'deep-dive': 'text-brand-teal border-brand-teal/30 bg-brand-teal/10',
    'quick-magnet': 'text-brand-amber border-brand-amber/30 bg-brand-amber/10',
    'news': 'text-blue-400 border-blue-500/30 bg-blue-900/30',
    'case-study': 'text-slate-400 border-slate-500/30 bg-slate-900/30',
    default: 'text-gray-400 border-gray-500/30 bg-gray-900/30'
};

interface ArticleContentProps {
    post: any;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ post }) => {

    if (!post) return null;

    // Handle Cover Image (R2 or Hygraph Legacy Fallback)
    const coverImageUrl = post.coverImage?.url || post.coverImage;

    // Extract first category from relationship array
    let firstCategory = null;
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
            : 'news';

    const categoryLabel = firstCategory
        ? firstCategory.name
        : typeof post.category === 'string'
            ? post.category.replace('-', ' ')
            : 'Article';

    return (
        <div className="relative min-h-screen">
            <ArticlesBackground enableScrollGradient={true} />

            {/* Progress/Status Bar Visual (Teal for Logic) */}
            <div className="fixed top-0 left-0 h-1 bg-brand-teal/50 w-full z-40"></div>

            <article className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">

                {/* Navigation */}
                <Link
                    href="/articles"
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide w-fit"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    BACK TO ARCHIVE
                </Link>

                {/* Header Section */}
                <header className="mb-12 border-b border-white/10 pb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`px-3 py-1 text-xs font-bold rounded tracking-widest uppercase border ${colorMap[categorySlug] || colorMap.default}`}>
                            {categoryLabel}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span className="text-gray-400 text-sm font-mono flex items-center gap-2">
                            <Clock size={14} /> 5 min read
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight font-['Prompt'] mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-3">
                        {/* Author Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden border-2 border-white flex items-center justify-center">
                            <img
                                src={AVATAR_URL}
                                alt="Nerd with Nart"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="text-white text-sm font-bold">Nerd with Nart</div>
                            <div className="text-gray-500 text-xs flex items-center gap-1">
                                <Calendar size={10} /> {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-GB')}
                            </div>
                        </div>
                    </div>
                </header>

                {/* --- THE CONTENT ENGINE (Rich Text) --- */}
                <div className="
            prose prose-lg prose-invert 
            max-w-none 
            text-gray-300 
            font-['Sarabun'] 
            leading-loose 
            
            /* GLOBAL IMAGE ROUNDING */
            prose-img:rounded-2xl
            prose-img:shadow-lg
            prose-img:border
            prose-img:border-white/10

            /* 1. HEADINGS (H2/H3) */
            prose-headings:font-['Prompt'] 
            prose-headings:text-white
            prose-headings:mt-12
            prose-headings:mb-6
            
            /* 2. LINKS */
            prose-a:text-brand-amber
            prose-a:no-underline
            prose-a:border-b
            prose-a:border-brand-amber/50
            prose-a:transition-colors
            hover:prose-a:text-brand-amber/80
            
            /* 3. BLOCKQUOTES (Teal Protocol - Intelligence Box / Calculation Zone) */
            prose-blockquote:border-l-4
            prose-blockquote:border-brand-teal
            prose-blockquote:text-gray-200
            prose-blockquote:bg-brand-dark/50
            prose-blockquote:p-6
            prose-blockquote:rounded-r-lg
            prose-blockquote:not-italic
            prose-blockquote:my-8
            prose-blockquote:before:content-none
            prose-blockquote:after:content-none
            prose-blockquote:shadow-lg

            /* 5. HR (Horizontal Rule) */
            prose-hr:border-brand-teal/30
            prose-hr:my-12

            /* 6. LISTS */
            prose-li:marker:text-brand-amber
            
            /* 7. STRONG */
            prose-strong:text-white
            prose-strong:font-bold
            
            /* 8. TABLES (Teal Protocol) */
            prose-table:border-separate
            prose-table:border-spacing-0
            prose-table:border
            prose-table:border-brand-teal/30
            prose-table:rounded-lg
            prose-table:overflow-hidden
            prose-table:my-8
            
            prose-thead:bg-brand-teal/10
            prose-thead:border-b
            prose-thead:border-brand-teal/30
            
            prose-th:px-4
            prose-th:py-3
            prose-th:text-left
            prose-th:font-bold
            prose-th:text-white
            prose-th:border-r
            prose-th:border-brand-teal/20
            prose-th:last:border-r-0
            
            prose-td:px-4
            prose-td:py-3
            prose-td:border-r
            prose-td:border-brand-teal/10
            prose-td:last:border-r-0
            
            prose-tr:border-b
            prose-tr:border-brand-teal/10
            prose-tr:last:border-b-0
            prose-tbody:prose-tr:hover:bg-white/5
            prose-tbody:prose-tr:transition-colors
          ">

                    {post.content && (
                        <RichText
                            data={post.content}
                            converters={({ defaultConverters }) => ({
                                ...defaultConverters,
                                blocks: {
                                    Code: ({ node }: { node: any }) => (
                                        <span className="block my-8 rounded-lg overflow-hidden border border-brand-teal/20 bg-slate-800 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] p-6">
                                            <span className="block font-mono text-sm text-slate-200 leading-relaxed whitespace-pre font-normal">
                                                <code>{node.fields.code}</code>
                                            </span>
                                        </span>
                                    ),
                                },
                            })}
                        />
                    )}
                </div>

                {/* Footer Navigation */}
                <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-sm">End of transmission.</p>
                    <Link
                        href="/articles"
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105"
                    >
                        Return to Archive
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default ArticleContent;
