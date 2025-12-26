import React from 'react';
import { getSovereignArticles } from '../../../lib/payload';
import { getLocalPayload } from '../../../lib/payload';
import { Metadata } from 'next';
import ArticlesContent from '@/components/ArticlesContent';

export const metadata: Metadata = {
    title: 'คลังความรู้ (The Archive) - Nerd with Nart',
    description: 'บันทึกการเดินทางและองค์ความรู้ที่รวบรวมจากการทำงานจริง',
};

export default async function ArticlesPage() {
    // 🛡️ SOVEREIGN DATA FETCH
    const posts = await getSovereignArticles();

    // Fetch Categories from Payload
    const payload = await getLocalPayload();
    const categoriesData = await payload.find({
        collection: 'categories',
        limit: 100,
    });

    return (
        <main className="min-h-screen bg-brand-dark text-slate-200">
            <ArticlesContent
                initialPosts={posts as any}
                categories={categoriesData.docs as any}
            />
        </main>
    );
}
