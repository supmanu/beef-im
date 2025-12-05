import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { request } from 'graphql-request';
import { GET_SEARCH_INDEX } from '../queries';

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT || 'https://api-ap-south-1.hygraph.com/v2/cmio1jnkr03oo06o7af14hqyd/master';

interface SearchResult {
    id: string;
    title: string;
    slug: string;
    categories: { name: string }[];
    content: { text: string };
}

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch data once on mount
    useEffect(() => {
        const fetchSearchIndex = async () => {
            try {
                setIsLoading(true);
                // We use a try-catch block to handle the case where GET_SEARCH_INDEX might not be available yet if queries.ts update failed
                // But generally we assume the queries are available.
                const data: any = await request(HYGRAPH_ENDPOINT, GET_SEARCH_INDEX);
                setPosts(data.posts);
            } catch (error) {
                console.error("Failed to fetch search index:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchIndex();
    }, []);

    // Initialize Fuse
    const fuse = useMemo(() => {
        return new Fuse(posts, {
            keys: ['title', 'content.text', 'categories.name'],
            threshold: 0.3,
            includeMatches: true,
            minMatchCharLength: 2,
        });
    }, [posts]);

    // Compute Results
    const results = useMemo(() => {
        if (!searchTerm) return [];
        return fuse.search(searchTerm).map(result => ({
            item: result.item,
            matches: result.matches
        }));
    }, [searchTerm, fuse]);

    const toggleSearch = () => setIsOpen(prev => !prev);

    return {
        searchTerm,
        setSearchTerm,
        results,
        isOpen,
        setIsOpen,
        toggleSearch,
        isLoading
    };
};
