import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { request } from 'graphql-request';
import { GET_SEARCH_INDEX } from '../queries';

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || 'https://api-ap-south-1.hygraph.com/v2/cmio1jnkr03oo06o7af14hqyd/master';

// 1. ROBUST TEXT EXTRACTOR
function extractText(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join(' ');

  let text = '';
  if (node.text) text += node.text + ' ';
  if (node.children && Array.isArray(node.children)) {
    text += node.children.map(extractText).join(' ');
  }
  return text;
}

interface FlattenedArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  plainText: string;
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FlattenedArticle[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [fuse, setFuse] = useState<Fuse<FlattenedArticle> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 2. FETCH & INDEX
  useEffect(() => {
    async function initSearch() {
      if (!HYGRAPH_ENDPOINT) return;
      try {
        setIsLoading(true);
        const data: any = await request(HYGRAPH_ENDPOINT, GET_SEARCH_INDEX);

        // 3. FLATTEN THE DATA (The Pancake Strategy)
        const flattenedDocs = data.posts.map((post: any) => {
          const rawText = extractText(post.content?.json || post.content);
          return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            category: post.categories[0]?.name || 'Article',
            plainText: rawText // <--- FLATTENED HERE
          };
        });

        console.log(`[Search Debug] Indexed ${flattenedDocs.length} articles.`);
        console.log(`[Search Debug] Sample plainText:`, flattenedDocs[0]?.plainText?.substring(0, 200));

        // 4. CONFIGURE FUSE (Simple Keys)
        const fuseInstance = new Fuse<FlattenedArticle>(flattenedDocs, {
          keys: [
            { name: 'title', weight: 2 },
            { name: 'plainText', weight: 1 }, // <--- SIMPLE KEY
            { name: 'category', weight: 0.5 }
          ],
          threshold: 0.4, // Fuzzy match
          ignoreLocation: true,
          includeScore: true
        });

        setFuse(fuseInstance);
      } catch (error) {
        console.error('[Search Debug] Failed to index:', error);
      } finally {
        setIsLoading(false);
      }
    }

    initSearch();
  }, []);

  // 5. PERFORM SEARCH
  useEffect(() => {
    if (!fuse || !query) {
      setResults([]);
      return;
    }
    const searchResults = fuse.search(query).map(result => result.item);
    console.log(`[Search Debug] Searching "${query}" -> Found ${searchResults.length}`);
    setResults(searchResults);
  }, [query, fuse]);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return {
    query,
    setQuery,
    results,
    isSearchOpen,
    openSearch,
    closeSearch,
    isLoading
  };
}
