import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, ChevronRight, Search, X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { request } from 'graphql-request';
import { GET_ARCHIVE } from '../queries';

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT;

// UPDATED: Matched Color Map (Teal for Health)
const colorMap: Record<string, string> = {
  emerald: 'text-[#2bb1bb] border-[#2bb1bb]/30 bg-[#2bb1bb]/10',
  amber: 'text-amber-400 border-amber-500/30 bg-amber-900/30',
  blue: 'text-blue-400 border-blue-500/30 bg-blue-900/30',
  slate: 'text-slate-400 border-slate-500/30 bg-slate-900/30',
  default: 'text-gray-400 border-gray-500/30 bg-gray-900/30'
};

const Articles: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await request(HYGRAPH_ENDPOINT, GET_ARCHIVE);
        setPosts(data.posts);
        setCategories(data.categories);
      } catch (error) {
        console.error("Signal Lost:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredArticles = posts.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? article.categories.some((c: any) => c.slug === selectedCategory)
      : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="min-h-screen pt-40 text-center text-slate-500 font-mono animate-pulse">Initializing Archive...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Prompt']">
            คลังความรู้ <span className="text-[#2bb1bb] text-2xl font-normal">(The Archive)</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            บันทึกการเดินทางและองค์ความรู้ที่รวบรวมจากการทำงานจริง
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-white/5 pb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search intelligence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#2bb1bb]/50 focus:ring-1 focus:ring-[#2bb1bb]/50 transition-all placeholder:text-gray-600"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills - UPDATED TO TEAL STYLING */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === null
                ? 'bg-white text-[#0B1D35] border-white font-bold scale-105'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-[#2bb1bb] hover:text-[#2bb1bb] hover:bg-[#2bb1bb]/10'
                }`}
            >
              All
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === cat.slug
                  ? 'bg-[#2bb1bb] text-white border-[#2bb1bb] shadow-[0_0_15px_rgba(43,177,187,0.3)] font-bold scale-105'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-[#2bb1bb] hover:text-[#2bb1bb] hover:bg-[#2bb1bb]/10'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <GlassCard
              key={article.id}
              className="flex flex-col h-full group cursor-pointer hover:border-[#2bb1bb]/30 transition-all duration-500"
              onClick={() => navigate(`/articles/${article.slug}`)}
            >
              <div className="h-48 overflow-hidden relative bg-slate-900">
                {article.coverImage ? (
                  <img
                    src={article.coverImage.url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono text-xs">NO VISUAL</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  {article.categories.map((cat: any) => (
                    <span key={cat.slug} className={`px-3 py-1 backdrop-blur-md rounded text-[10px] font-bold tracking-[0.15em] uppercase border ${colorMap[cat.color] || colorMap.default}`}>
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-mono">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(article.releaseDate).toLocaleDateString('en-GB')}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {Math.ceil(article.content.text.split(' ').length / 200)} min</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 leading-snug font-['Prompt'] group-hover:text-[#2bb1bb] transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 font-['Sarabun'] line-clamp-3">
                  {article.content.text}
                </p>

                <div className="flex items-center gap-2 text-gray-300 text-sm font-bold tracking-wide group-hover:text-[#2bb1bb] transition-colors">
                  READ ANALYSIS
                  <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl bg-[#0B1D35]/50">
          <p className="text-gray-500 text-lg">No signals found matching your parameters.</p>
          <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} className="mt-4 text-[#F59E0B] hover:underline">Reset Filters</button>
        </div>
      )}
    </div>
  );
};

export default Articles;