// PAUSED 2026-05-03 — feed renders as raw XML in the browser (no XSL stylesheet).
// Endpoint generates a valid feed for readers, but the on-domain experience is broken.
// Deferred: add an XSL stylesheet (or an HTML /feed/ landing page) post-Phase-2 polish.
// See plan §16.
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [insurance, meat, note] = await Promise.all([
    getCollection('insurance'),
    getCollection('meat'),
    getCollection('note'),
  ]);

  const allEntries = [...insurance, ...meat, ...note].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'ประกันเนื้อๆ (beef.im)',
    description: 'สมุดบันทึกนักสืบสัญญา — ประกัน · เนื้อ · บันทึก',
    site: context.site!,
    items: allEntries.map(entry => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.lede,
      link: `/${entry.collection}/${entry.id}/`,
    })),
    customData: '<language>th</language>',
  });
}
