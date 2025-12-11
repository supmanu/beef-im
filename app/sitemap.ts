import { MetadataRoute } from 'next';
import { gql } from 'graphql-request';

export const dynamic = 'force-static';

const GET_SITEMAP_DATA = gql`
  query GetSitemapData {
    posts(first: 100) {
      slug
      updatedAt
    }
  }
`;

async function getSitemapData() {
  const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || '';
  if (!endpoint) return [];

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_SITEMAP_DATA }),
      next: { revalidate: 3600 }
    });
    const { data } = await res.json();
    return data?.posts || [];
  } catch (error) {
    console.error('Sitemap Error:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nerdwithnart.com';
  const articles = await getSitemapData();

  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.updatedAt,
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
