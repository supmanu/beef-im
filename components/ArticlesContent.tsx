'use client';

import React, { useState, useEffect } from 'react';
import ArchiveClient from '@/components/ArchiveClient';
import ArticlesBackground from '@/components/ArticlesBackground';

interface Article {
    id: string | number;
    title: string;
    slug: string;
    excerpt?: string;
    category?: any;
    coverImage?: { url?: string } | string;
}

interface Category {
    id: string | number;
    title: string;
    slug: string;
}

interface ArticlesContentProps {
    initialPosts: Article[];
    categories: Category[];
}

export default function ArticlesContent({ initialPosts, categories }: ArticlesContentProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <ArticlesBackground enableScrollGradient={false} />

            {/* Hero Section with Animation */}
            <div className={`relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="text-center space-y-6">
                    <div className="inline-block px-3 py-1 border border-teal-500/30 rounded-full bg-teal-500/10 animate-fade-in">
                        <span className="text-teal-400 text-xs font-bold tracking-[0.2em]">THE ARCHIVE</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white font-prompt tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        คลังความรู้
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-sarabun leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        บันทึกการเดินทางและองค์ความรู้ที่รวบรวมจากการทำงานจริง
                    </p>
                </div>
            </div>

            {/* ArchiveClient with staggered reveal */}
            <div className={`relative z-10 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <ArchiveClient
                    initialPosts={initialPosts as any}
                    categories={categories as any}
                />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                .animate-slide-up {
                    animation: slideUp 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}
