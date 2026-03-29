/**
 * publish-article.ts
 * Publishes a markdown article file directly to Payload CMS via the Local API.
 *
 * Usage:
 *   npx tsx scripts/publish-article.ts <path-to-article.md> [--draft]
 *
 * Required frontmatter in the .md file:
 * ---
 * title: "Article title in Thai or English"
 * slug: "url-slug-here"
 * category: health                        # single slug OR [health, wealth]
 * publishedDate: 2026-03-29
 * excerpt: "Short description (max ~250 chars)"
 * coverImage: https://assets.nerdwithnart.com/nwn-assets/image.jpg
 * ---
 *
 * Optional:
 *   coverImageId: 5                       # Use existing Payload media ID directly
 *   status: draft                          # Override to save as draft (default: published)
 *
 * Categories available (slugs): health, wealth, legacy, perspective
 */

import 'dotenv/config';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getPayload } from 'payload';
import config from '../payload-config/payload.config';
import { markdownToLexical } from './md-to-lexical';

// ─── Frontmatter Parser ───────────────────────────────────────────────────────

interface Frontmatter {
    title: string;
    slug: string;
    category: string | string[];
    publishedDate: string;
    excerpt?: string;
    coverImage?: string;
    coverImageId?: number;
    status?: 'draft' | 'published';
}

function parseFrontmatter(content: string): { data: Frontmatter; body: string } {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
        throw new Error('No frontmatter found. File must start with --- block.');
    }

    const yamlStr = match[1];
    const body = match[2].trim();
    const data: Record<string, unknown> = {};

    for (const line of yamlStr.split('\n')) {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) continue;

        const key = line.slice(0, colonIdx).trim();
        const rawValue = line.slice(colonIdx + 1).trim();

        if (!key || !rawValue) continue;

        // Array: [a, b, c]
        if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
            data[key] = rawValue
                .slice(1, -1)
                .split(',')
                .map(v => v.trim().replace(/^["']|["']$/g, ''));
        } else if (rawValue === 'true') {
            data[key] = true;
        } else if (rawValue === 'false') {
            data[key] = false;
        } else if (!isNaN(Number(rawValue)) && rawValue !== '') {
            data[key] = Number(rawValue);
        } else {
            // Strip surrounding quotes
            data[key] = rawValue.replace(/^["']|["']$/g, '');
        }
    }

    return { data: data as Frontmatter, body };
}

// ─── Cover Image Resolver ─────────────────────────────────────────────────────

async function resolveCoverImage(
    payload: Awaited<ReturnType<typeof getPayload>>,
    fm: Frontmatter
): Promise<number> {
    // Direct media ID provided — use it
    if (fm.coverImageId) {
        console.log(`  ↳ Using media ID: ${fm.coverImageId}`);
        return fm.coverImageId;
    }

    if (!fm.coverImage) {
        throw new Error('frontmatter must include either coverImage (URL) or coverImageId (number).');
    }

    const url = fm.coverImage;
    const filename = url.split('/').pop() ?? 'cover.jpg';

    // Search for existing media by filename
    const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
    });

    if (existing.docs.length > 0) {
        const id = existing.docs[0].id as number;
        console.log(`  ↳ Found existing media: "${filename}" (ID: ${id})`);
        return id;
    }

    // Create a stub media record pointing to the R2 URL
    const mimeType = filename.endsWith('.png') ? 'image/png'
        : filename.endsWith('.webp') ? 'image/webp'
        : 'image/jpeg';

    console.log(`  ↳ Creating new media record for: ${filename}`);
    const created = await payload.create({
        collection: 'media',
        data: {
            filename,
            url,
            mimeType,
            filesize: 0,
            width: 1200,
            height: 630,
            alt: filename.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
        } as any,
    });

    return created.id as number;
}

// ─── Category Resolver ────────────────────────────────────────────────────────

async function resolveCategoryIds(
    payload: Awaited<ReturnType<typeof getPayload>>,
    slugs: string[]
): Promise<number[]> {
    const ids: number[] = [];

    for (const slug of slugs) {
        const result = await payload.find({
            collection: 'categories',
            where: { slug: { equals: slug } },
            limit: 1,
        });

        if (result.docs.length === 0) {
            throw new Error(`Category not found: "${slug}". Run seed-categories.ts first.`);
        }

        ids.push(result.docs[0].id as number);
        console.log(`  ↳ Category "${slug}" → ID ${result.docs[0].id}`);
    }

    return ids;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    const args = process.argv.slice(2);
    const filePath = args.find(a => !a.startsWith('--'));
    const forceDraft = args.includes('--draft');

    if (!filePath) {
        console.error('Usage: npx tsx scripts/publish-article.ts <path-to-article.md> [--draft]');
        process.exit(1);
    }

    const absolutePath = resolve(process.cwd(), filePath);
    console.log(`\n📄 Reading: ${absolutePath}`);

    let raw: string;
    try {
        raw = readFileSync(absolutePath, 'utf-8');
    } catch {
        console.error(`❌ Cannot read file: ${absolutePath}`);
        process.exit(1);
    }

    // Parse frontmatter + body
    const { data: fm, body } = parseFrontmatter(raw);

    // Validate required fields
    const missing = ['title', 'slug', 'category', 'publishedDate'].filter(
        k => !fm[k as keyof Frontmatter]
    );
    if (missing.length > 0) {
        console.error(`❌ Missing required frontmatter fields: ${missing.join(', ')}`);
        process.exit(1);
    }

    const status = forceDraft ? 'draft' : (fm.status ?? 'published');
    const categorySlugs = Array.isArray(fm.category) ? fm.category : [fm.category];

    console.log(`\n🔧 Initializing Payload...`);
    const payload = await getPayload({ config });

    // Resolve relations
    console.log(`\n🔍 Resolving categories: ${categorySlugs.join(', ')}`);
    const categoryIds = await resolveCategoryIds(payload, categorySlugs);

    console.log(`\n🖼  Resolving cover image...`);
    const coverImageId = await resolveCoverImage(payload, fm);

    // Convert markdown to Lexical JSON
    console.log(`\n⚙️  Converting markdown to Lexical JSON...`);
    const content = markdownToLexical(body);
    console.log(`  ↳ Parsed ${content.root.children.length} top-level nodes`);

    // Check for existing article by slug (upsert)
    const existing = await payload.find({
        collection: 'articles',
        where: { slug: { equals: fm.slug } },
        limit: 1,
    });

    const articleData = {
        title: fm.title,
        slug: fm.slug,
        publishedDate: new Date(fm.publishedDate).toISOString(),
        coverImage: coverImageId,
        category: categoryIds,
        excerpt: fm.excerpt ?? '',
        content,
        _status: status,
    };

    let result: { id: number | string };

    if (existing.docs.length > 0) {
        const id = existing.docs[0].id as number;
        console.log(`\n♻️  Updating existing article (ID: ${id})...`);
        result = await payload.update({
            collection: 'articles',
            id,
            data: articleData as any,
            draft: status === 'draft',
        });
        console.log(`✅ Updated: "${fm.title}"`);
    } else {
        console.log(`\n🆕 Creating new article...`);
        result = await payload.create({
            collection: 'articles',
            data: articleData as any,
            draft: status === 'draft',
        });
        console.log(`✅ Created: "${fm.title}"`);
    }

    console.log(`\n🎉 Done!`);
    console.log(`   ID:     ${result.id}`);
    console.log(`   Slug:   ${fm.slug}`);
    console.log(`   Status: ${status}`);
    console.log(`   URL:    /articles/${fm.slug}\n`);

    process.exit(0);
}

main().catch(err => {
    console.error('\n❌ Fatal error:', err.message ?? err);
    process.exit(1);
});
