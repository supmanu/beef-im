'use client';

import { SearchProvider, useSearchModal } from '@/context/SearchContext';
import SearchModal from './SearchModal';
import { ReactNode } from 'react';

interface ProvidersProps {
    children: ReactNode;
}

// Inner component that can access the SearchContext
function SearchModalWrapper() {
    const { isSearchOpen, closeSearch } = useSearchModal();
    return <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SearchProvider>
            {children}
            <SearchModalWrapper />
        </SearchProvider>
    );
}
