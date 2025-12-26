'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ArticlesBackgroundProps {
    enableScrollGradient?: boolean;
}

/**
 * Enhanced background for Articles pages
 * - Animated grid pattern
 * - Scroll-triggered gradient shift
 * - Noise texture overlay
 */
export default function ArticlesBackground({ enableScrollGradient = true }: ArticlesBackgroundProps) {
    const { scrollYProgress } = useScroll();

    // Subtle gradient shift on scroll (dark blue → darker teal)
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 1],
        ['#0B1D35', '#0B2D35']
    );

    return (
        <>
            {/* Base background with scroll gradient */}
            {enableScrollGradient ? (
                <motion.div
                    className="fixed inset-0 z-0"
                    style={{ backgroundColor }}
                />
            ) : (
                <div className="fixed inset-0 z-0 bg-[#0B1D35]" />
            )}

            {/* Animated Grid Pattern */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2dd4bf_1px,transparent_1px),linear-gradient(to_bottom,#2dd4bf_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            </div>

            {/* Noise Texture Overlay */}
            <div
                className="fixed inset-0 z-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    animation: 'grain 8s steps(10) infinite'
                }}
            />

            {/* Subtle gradient overlay for depth */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/40 pointer-events-none" />

            <style jsx>{`
                @keyframes grain {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -10%); }
                    20% { transform: translate(-15%, 5%); }
                    30% { transform: translate(7%, -25%); }
                    40% { transform: translate(-5%, 25%); }
                    50% { transform: translate(-15%, 10%); }
                    60% { transform: translate(15%, 0%); }
                    70% { transform: translate(0%, 15%); }
                    80% { transform: translate(3%, 35%); }
                    90% { transform: translate(-10%, 10%); }
                }
            `}</style>
        </>
    );
}
