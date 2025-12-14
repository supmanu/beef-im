// app/layout.tsx
// This is a minimal pass-through layout that delegates to route groups.
// The actual html/body wrappers are in:
// - app/(site)/layout.tsx (for the public website)
// - app/(payload)/layout.tsx (for the Payload admin panel)

import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // No html/body here - each route group provides its own
    return <>{children}</>;
}