'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
    isSearchOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => setIsSearchOpen(false);
    const toggleSearch = () => setIsSearchOpen((prev) => !prev);

    // Global Keyboard Shortcut (Moved from Navbar to Provider for true global access)
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                openSearch();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <SearchContext.Provider value={{ isSearchOpen, openSearch, closeSearch, toggleSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchModal = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearchModal must be used within a SearchProvider');
    }
    return context;
};
