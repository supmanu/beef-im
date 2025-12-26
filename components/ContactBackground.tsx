'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced background for Contact page
 * - Ambient light orbs (glassmorphic blobs)
 * - Scanline animation
 * - Noise texture overlay
 */
export default function ContactBackground() {
    return (
        <>
            {/* Base background */}
            <div className="fixed inset-0 z-0 bg-[#0B1D35]" />

            {/* Ambient Light Orbs */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Top-left teal orb */}
                <motion.div
                    className="absolute -top-20 -left-20 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.08, 0.05],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Bottom-right amber orb */}
                <motion.div
                    className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.05, 0.07, 0.05],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Center-right teal orb */}
                <motion.div
                    className="absolute top-1/2 -right-32 w-80 h-80 bg-teal-500/4 rounded-full blur-[100px]"
                    animate={{
                        y: [-20, 20, -20],
                        opacity: [0.04, 0.06, 0.04],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4
                    }}
                />
            </div>

            {/* Scanline Animation */}
            <motion.div
                className="fixed left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent z-0 pointer-events-none"
                animate={{ top: ['0%', '100%'] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 2
                }}
            />

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
