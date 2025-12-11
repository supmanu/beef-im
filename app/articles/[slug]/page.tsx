import { getArticle, getArchive } from '@/lib/hygraph';
import ArticleContent from '@/components/ArticleContent';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Generate paths for all articles at build time
export async function generateStaticParams() {
    const data = await getArchive();
    return data.posts.map((post: any) => ({
        slug: post.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

// SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getArticle(slug);

    if (!post) {
        return { title: 'Article Not Found | Nerd with Nart' };
    }

    // Extract excerpt from content if available
    const excerpt = post.content?.text || "Data. Logic. Legacy.";

    return {
        title: post.seoTitle || post.title,
        description: post.seoDescription || excerpt,
        openGraph: {
            title: post.seoTitle || post.title,
            description: post.seoDescription || excerpt,
            url: `https://nerdwithnart.com/articles/${slug}`,
            siteName: 'Nerd with Nart',
            images: [{
                url: post.coverImage?.url || 'https://nerdwithnart.com/default-og.jpg',
                width: 1200,
                height: 630,
            }],
            type: 'article',
            publishedTime: post.publishedAt,
            authors: ['Nerd with Nart'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.seoTitle || post.title,
            description: post.seoDescription || excerpt,
            images: [post.coverImage?.url || ''],
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const post = await getArticle(slug);

    if (!post) {
        notFound();
    }

    return <ArticleContent post={post} />;
}
