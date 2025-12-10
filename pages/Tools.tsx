import React, { useState, useEffect } from 'react';
import { Shield, Download, FileText, Calculator } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { request } from 'graphql-request';
import { GET_TOOLS } from '../queries';
import { LogicEngineScene } from '../components/LogicEngine';
import SEO from '../components/SEO';

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT;

// 1. DEFINE THE COLOR MAP (TEAL PROTOCOL ENFORCED)
// All externally defined colors are re-routed to Brand Identity
const colorMap: Record<string, string> = {
  emerald: 'text-brand-teal bg-brand-teal/10 border-brand-teal/20', // Logic/Success -> Teal
  blue: 'text-brand-teal bg-brand-teal/10 border-brand-teal/20',    // Logic/Data -> Teal
  amber: 'text-brand-amber bg-brand-amber/10 border-brand-amber/20', // Warning/CAUTION -> Amber
  rose: 'text-brand-amber bg-brand-amber/10 border-brand-amber/20',  // Critical -> Amber
  slate: 'text-slate-400 bg-slate-500/10 border-slate-500/20',      // Neutral
  default: 'text-brand-teal bg-brand-teal/10 border-brand-teal/20'
};

// Map string names to Lucide Components
const iconMap: Record<string, any> = {
  shield: Shield,
  download: Download,
  file: FileText,
  calculator: Calculator,
  default: FileText
};

// Cinematic Entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 40, damping: 10 }
  }
};

export default function ToolsPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data: any = await request(HYGRAPH_ENDPOINT, GET_TOOLS);
        setTools(data.tools);
      } catch (error) {
        console.error("Armory Offline:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  // Helper to format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="relative min-h-screen bg-brand-dark overflow-hidden font-sarabun">
      <SEO
        title="The Armory"
        description="Essential documents, checklists, and calculators for your financial ascent."
        image="https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmit9qvyx13ln07pjg8ad4u8t"
      />

      {/* BACKGROUND ENGINE */}
      <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <LogicEngineScene />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">

        {/* HEADER */}
        <header className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark/80 border border-brand-teal/30 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(43,177,187,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
            <span className="text-xs font-mono text-brand-teal tracking-widest uppercase">The Armory</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold text-white tracking-tight mb-6 font-prompt"
          >
            Gear <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-amber to-amber-200 drop-shadow-md">Check</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            We do not guess. We verify. <br className="hidden md:block" />
            Essential instruments derived from the central logic core.
          </motion.p>
        </header>

        {/* TOOL GRID */}
        {loading ? (
          <div className="text-center text-brand-teal/50 font-mono animate-pulse tracking-widest text-lg">
            [ INITIALIZING ARMORY PROTOCOLS... ]
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {tools.map((tool) => {
              // 2. RESOLVE COLORS DYNAMICALLY (TEAL PROTOCOL)
              const colorKey = tool.categories?.[0]?.color || 'amber';
              const themeClasses = colorMap[colorKey] || colorMap.default;
              const IconComponent = iconMap[tool.icon] || iconMap.default;

              return (
                <motion.div
                  key={tool.id}
                  variants={itemVariants}
                  className="group relative bg-[#0B1D35]/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-brand-teal/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1"
                >

                  {/* ICON BADGE */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 ${themeClasses} transition-all duration-300 shadow-inner group-hover:scale-110`}>
                    <IconComponent size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-amber transition-colors font-prompt tracking-wide">
                    {tool.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-8 min-h-[60px]">
                    {tool.description}
                  </p>

                  <div className="w-full pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      {tool.file?.mimeType?.split('/')[1]?.toUpperCase()} • {formatSize(tool.file?.size || 0)}
                    </span>

                    {/* BUTTON */}
                    <a href={tool.file?.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all duration-300 bg-brand-teal text-brand-dark hover:bg-brand-teal/90 shadow-[0_0_10px_rgba(43,177,187,0.3)] hover:shadow-[0_0_20px_rgba(43,177,187,0.5)]">
                      <Download size={14} />
                      Download
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}