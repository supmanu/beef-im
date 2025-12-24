import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

interface HeroHUDProps {
    temperature: number;
    windSpeed: number;
}

const HeroHUD: React.FC<HeroHUDProps> = ({ temperature, windSpeed }) => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const y = useTransform(scrollY, [0, 400], [0, -50]); // Slight upward drift as it fades

    // 1. DATA CONFIGURATION (Easy to add more items later)
    const stats = [
        { label: 'TEMP', value: `${temperature}°C`, color: 'text-[#22d3ee]', shadow: 'rgba(34,211,238,0.3)' },
        { label: 'WIND', value: `${windSpeed} km/h`, color: 'text-[#f59e0b]', shadow: 'rgba(245,158,11,0.3)' },
        { label: 'SYSTEM', value: 'ONLINE', color: 'text-emerald-400', isStatus: true },
    ];

    // 2. ANIMATION VARIANTS (Clean separation of logic)
    const container: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2, delayChildren: 2.2 } }
    };

    const item: Variants = {
        hidden: { opacity: 0, x: 20 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.8, ease: "easeOut" as const } 
        }
    };

    const glitchEffect = {
        animate: {
            opacity: [1, 0.8, 1, 0.9, 1],
            scale: [1, 1.02, 1, 0.98, 1],
            transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror" as const,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            className="fixed bottom-10 right-10 z-40 hidden lg:flex flex-col gap-4 pointer-events-none"
            variants={container}
            initial="hidden"
            animate="visible"
            style={{ opacity, y }}
        >
            {stats.map((stat) => (
                <motion.div
                    key={stat.label}
                    variants={item}
                    className="flex flex-col items-end group"
                >
                    {/* Label */}
                    <span className="font-mono text-[10px] text-slate-500 tracking-widest opacity-60 mb-1">
                        {stat.label}
                    </span>

                    {/* Value */}
                    <motion.span
                        variants={glitchEffect}
                        animate="animate"
                        className={`font-mono ${stat.isStatus ? 'text-xs tracking-[0.2em] animate-pulse' : 'text-xl'} font-bold ${stat.color} transition-all duration-300`}
                        style={stat.shadow ? { textShadow: `0 0 10px ${stat.shadow}` } : {}}
                    >
                        {stat.value}
                    </motion.span>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default HeroHUD;