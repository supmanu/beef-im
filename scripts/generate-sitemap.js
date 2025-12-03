import fs from 'fs';
import { GraphQLClient, gql } from 'graphql-request';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CLOUDFLARE SAFETY CHECK ---
// Only load dotenv if we are NOT in production (i.e., Localhost)
try {
    if (process.env.NODE_ENV !== 'production') {
        const dotenv = await import('dotenv');
        dotenv.config();
    }
} catch (e) {
    // Silent fail: We assume variables are provided by the host (Cloudflare)
}

const ENDPOINT = process.env.VITE_HYGRAPH_ENDPOINT;
const DOMAIN = 'https://nerdwithnart.com';

if (!ENDPOINT) {
    console.error('❌ Error: VITE_HYGRAPH_ENDPOINT not found in environment');
    process.exit(1);
}

// Query matches your schema + adds updatedAt for SEO freshness
const SITEMAP_QUERY = gql`
  query GetSitemapData {
    posts(first: 1000, orderBy: releaseDate_DESC) {
      slug
      releaseDate
    }
  }
`;

const STATIC_ROUTES = [
    '/',
    '/tools',
    '/articles',
    '/manifesto',
    '/contact'
];

async function generateSitemap() {
    console.log('🗺️  Starting Sitemap Generation...');

    try {
        const client = new GraphQLClient(ENDPOINT);
        const { posts } = await client.request(SITEMAP_QUERY);

        console.log(`📊 Found ${posts.length} articles.`);

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${STATIC_ROUTES.map(route => `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}

  ${posts.map(post => {
            // Use releaseDate
            const dateStr = post.releaseDate;
            const date = new Date(dateStr).toISOString().split('T')[0];
            return `
  <url>
    <loc>${DOMAIN}/articles/${post.slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
        }).join('')}
</urlset>`;

        // Write to PUBLIC folder
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const publicDir = path.resolve(__dirname, '../public');

        // Ensure public dir exists
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
        console.log('✅ Sitemap generated successfully at public/sitemap.xml');

    } catch (error) {
        console.error('❌ Sitemap Generation Failed:', error);
        // Warning only - do not break the build deployment if sitemap fails
        console.warn('⚠️ Proceeding with build without updating sitemap.');
    }
}

generateSitemap();