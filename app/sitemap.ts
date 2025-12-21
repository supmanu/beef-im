import { MetadataRoute } from 'next';
import { getSovereignArticles } from '@/lib/payload';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nerdwithnart.com';

  // Fetch from Sovereign Payload DB
  let articles = [];
  try {
    articles = await getSovereignArticles();
  } catch (error) {
    console.error('Sitemap Error: Failed to fetch articles', error);
  }

  const articleUrls = articles.map((doc: any) => ({
    url: `${baseUrl}/articles/${doc.slug}`,
    lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/manifesto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...articleUrls];
}
