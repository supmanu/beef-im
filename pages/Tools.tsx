import React, { useState, useEffect } from 'react';
import { Shield, Download, FileText, Calculator } from 'lucide-react';
import { request } from 'graphql-request';
import { GET_TOOLS } from '../queries';
import { LogicEngineScene } from '../components/LogicEngine';

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT;

// 1. DEFINE THE COLOR MAP (The Paintbrush)
const colorMap: Record<string, string> = {
  emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  rose: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  slate: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

// Map string names to Lucide Components
const iconMap: Record<string, any> = {
  shield: Shield,
  download: Download,
  file: FileText,
  calculator: Calculator,
  default: FileText
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
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">

      {/* BACKGROUND ENGINE */}
      <div className="fixed inset-0 z-0">
        <LogicEngineScene />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">

        {/* IMPROVED HEADER UI */}
        <header className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-mono text-slate-300 tracking-widest uppercase">The Armory</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Gear <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Check</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed">
            We do not guess. We verify. <br className="hidden md:block" />
            Essential instruments derived from the central logic core.
          </p>
        </header>

        {/* TOOL GRID */}
        {loading ? (
          <div className="text-center text-slate-500 font-mono animate-pulse">Loading Equipment...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool) => {
              // 2. RESOLVE COLORS DYNAMICALLY
              // Default to 'amber' if no color found
              const colorKey = tool.categories?.[0]?.color || 'amber';
              const themeClasses = colorMap[colorKey] || colorMap.amber;
              const IconComponent = iconMap[tool.icon] || iconMap.default;

              return (
                <div key={tool.id} className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1">

                  {/* ICON BADGE - DYNAMIC COLOR */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 ${themeClasses} transition-colors`}>
                    <IconComponent size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-8 min-h-[80px]">
                    {tool.description}
                  </p>

                  <div className="w-full pt-6 border-t border-slate-800/50 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      {tool.file?.mimeType?.split('/')[1]?.toUpperCase()} • {formatSize(tool.file?.size || 0)}
                    </span>

                    {/* BUTTON - Matches the Icon Theme */}
                    <a href={tool.file?.url} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${themeClasses.split(' ')[0]} hover:opacity-80 transition-opacity`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}