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

    if (!post) return { title: 'Not Found' };

    return {
        title: post.seoTitle || post.title,
        description: post.seoDescription || "Data. Logic. Legacy.",
        openGraph: {
            title: post.seoTitle || post.title,
            description: post.seoDescription || "Data. Logic. Legacy.",
            images: post.coverImage ? [post.coverImage.url] : [],
        }
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
