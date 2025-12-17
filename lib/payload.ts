import { getPayload } from 'payload';
import type { Payload } from 'payload';
import config from '../payload-config/payload.config';
import type { Config } from '../payload-config/payload-types';

// Singleton cached payload instance
let cachedPayload: Promise<Payload> | null = null;

export const getLocalPayload = async (): Promise<Payload> => {
    if (!cachedPayload) {
        cachedPayload = getPayload({ config });
    }
    return cachedPayload;
};

export const getSovereignArticles = async () => {
    const payload = await getLocalPayload();
    const data = await payload.find({
        collection: 'articles',
        depth: 1,
        sort: '-publishedDate',
        where: {
            _status: { equals: 'published' },
        },
    });
    return data.docs;
};

export const getSovereignArticleBySlug = async (slug: string) => {
    const payload = await getLocalPayload();
    const result = await payload.find({
        collection: 'articles',
        where: { slug: { equals: slug } },
        depth: 1,
        limit: 1,
    });
    return result.docs[0] || null;
};
