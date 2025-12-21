import { getPayload } from 'payload';
import config from '../../../../payload-config/payload.config';
import { NextResponse } from 'next/server';

// 1. ROBUST TEXT EXTRACTOR (Server-Side)
function extractText(node: any): string {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join(' ');

    let text = '';
    // Handle Lexical (root.children) or Generic Text or Slate (children)
    if (node.text) text += node.text + ' ';
    if (node.children && Array.isArray(node.children)) {
        text += node.children.map(extractText).join(' ');
    }
    // Handle Lexical root
    if (node.root && node.root.children) {
        text += extractText(node.root.children);
    }
    return text;
}

export const GET = async () => {
    try {
        const payload = await getPayload({ config });

        const articles = await payload.find({
            collection: 'articles',
            where: {
                _status: { equals: 'published' },
            },
            depth: 1,
            limit: 100,
        });

        // Flatten Content for Search
        const searchIndex = articles.docs.map((doc: any) => ({
            id: doc.id,
            title: doc.title,
            slug: doc.slug,
            category: doc.category || 'Article',
            plainText: extractText(doc.content),
        }));

        return NextResponse.json(searchIndex);

    } catch (error) {
        console.error('Search Index Error:', error);
        return NextResponse.json({ error: 'Failed to build search index' }, { status: 500 });
    }
}
