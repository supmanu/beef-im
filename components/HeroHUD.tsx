import React from 'react';
import { motion, Variants } from 'framer-motion';

interface HeroHUDProps {
    temperature: number;
    windSpeed: number;
}

const HeroHUD: React.FC<HeroHUDProps> = ({ temperature, windSpeed }) => {

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
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
    };

    return (
        <motion.div
            className="fixed bottom-10 right-10 z-40 hidden lg:flex flex-col gap-4 pointer-events-none"
            variants={container}
            initial="hidden"
            animate="visible"
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
                    <span
                        className={`font-mono ${stat.isStatus ? 'text-xs tracking-[0.2em] animate-pulse' : 'text-xl'} font-bold ${stat.color} transition-all duration-300`}
                        style={stat.shadow ? { textShadow: `0 0 10px ${stat.shadow}` } : {}}
                    >
                        {stat.value}
                    </span>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default HeroHUD;