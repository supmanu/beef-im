import { getArchive } from '@/lib/hygraph';
import ArchiveListing from '@/components/ArchiveListing';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "The Archive | Nerd with Nart",
    description: "Financial Strategies and Knowledge Base.",
};

export default async function ArticlesPage() {
    const data = await getArchive();

    return <ArchiveListing posts={data.posts} categories={data.categories} />;
}
