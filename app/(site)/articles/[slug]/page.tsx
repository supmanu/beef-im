import { getSovereignArticleBySlug, getSovereignArticles } from '@/lib/payload';
import ArticleContent from '@/components/ArticleContent';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Generate paths for all articles at build time
export async function generateStaticParams() {
    const posts = await getSovereignArticles();
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

// SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post: any = await getSovereignArticleBySlug(slug);

    if (!post) {
        return { title: 'Article Not Found | ประกันเนื้อๆ' };
    }

    // Handle Image URL
    const coverImageUrl = post.coverImage?.url || post.coverImage || 'https://beef.im/default-og.jpg';

    return {
        title: post.title,
        description: post.excerpt || "Data. Logic. Legacy.",
        openGraph: {
            title: post.title,
            description: post.excerpt || "Data. Logic. Legacy.",
            url: `https://beef.im/articles/${slug}`,
            siteName: 'ประกันเนื้อๆ',
            images: [{
                url: coverImageUrl,
                width: 1200,
                height: 630,
            }],
            type: 'article',
            publishedTime: post.publishedDate,
            authors: ['ประกันเนื้อๆ'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || "Data. Logic. Legacy.",
            images: [coverImageUrl],
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const post = await getSovereignArticleBySlug(slug);

    if (!post) {
        notFound();
    }

    return <ArticleContent post={post} />;
}
