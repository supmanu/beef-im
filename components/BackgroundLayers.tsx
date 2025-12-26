'use client';

import React from 'react';
import Snowstorm from '@/components/Snowstorm';

interface BackgroundLayersProps {
    imageUrl?: string;
    imageOpacity?: number;
    overlayOpacity?: number;
    snowIntensity?: number;
    enableSnow?: boolean;
}

/**
 * Sovereign Background Layers Component
 * Provides consistent background effects across all pages:
 * - Fixed background image
 * - Black overlay for readability
 * - Snowstorm effect (optional)
 */
export default function BackgroundLayers({
    imageUrl = 'https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmit9qvyx13ln07pjg8ad4u8t',
    imageOpacity = 0.4,
    overlayOpacity = 0.6,
    snowIntensity = 20,
    enableSnow = true,
}: BackgroundLayersProps) {
    return (
        <>
            {/* Background Image Layer */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${imageUrl}')`,
                    opacity: imageOpacity,
                }}
            />

            {/* Black Overlay for Readability */}
            <div
                className="fixed inset-0 z-0 bg-black"
                style={{ opacity: overlayOpacity }}
            />

            {/* Snowstorm Effect (Optional) */}
            {enableSnow && (
                <div className="fixed inset-0 z-1 pointer-events-none">
                    <Snowstorm windIntensity={snowIntensity} />
                </div>
            )}
        </>
    );
}
