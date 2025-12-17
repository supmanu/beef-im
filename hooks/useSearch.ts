import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

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

  // 1. FETCH & INDEX FROM SOVEREIGN API
  useEffect(() => {
    async function initSearch() {
      try {
        setIsLoading(true);
        // Fetch from our new local API route
        const res = await fetch('/api/search/index');

        if (!res.ok) {
          console.error('[Search] API Error:', res.statusText);
          return;
        }

        const flattenedDocs: FlattenedArticle[] = await res.json();

        console.log(`[Search Debug] Indexed ${flattenedDocs.length} articles.`);

        // 2. CONFIGURE FUSE
        const fuseInstance = new Fuse<FlattenedArticle>(flattenedDocs, {
          keys: [
            { name: 'title', weight: 2 },
            { name: 'plainText', weight: 1 },
            { name: 'category', weight: 0.5 }
          ],
          threshold: 0.3, // Slightly tighter threshold
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

  // 3. PERFORM SEARCH
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
