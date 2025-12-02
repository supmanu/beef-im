import React, { useState, useEffect } from 'react';
import { Shield, Download, FileText, Calculator } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { request } from 'graphql-request';
import { GET_TOOLS } from '../queries';

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT;

// Map string names to Lucide Components
const iconMap: Record<string, any> = {
  shield: Shield,
  download: Download,
  file: FileText,
  calculator: Calculator,
  default: FileText
};

const Tools: React.FC = () => {
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
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <span className="text-[#F59E0B] font-bold tracking-widest text-xs mb-4 block uppercase">The Armory</span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Prompt']">Gear Check</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
          Essential documents, checklists, and calculators for your financial ascent.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-slate-500 font-mono animate-pulse">Loading Equipment...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = iconMap[tool.icon] || iconMap.default;

            return (
              <GlassCard key={tool.id} className="p-8 flex flex-col items-start group">
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={24} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F59E0B] transition-colors">
                  {tool.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                  {tool.description}
                </p>

                <div className="w-full pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-500">
                    {tool.file.mimeType.split('/')[1].toUpperCase()} • {formatSize(tool.file.size)}
                  </span>

                  <a
                    href={tool.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-[#F59E0B] hover:text-white transition-colors"
                  >
                    <Download size={16} /> Download
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tools;