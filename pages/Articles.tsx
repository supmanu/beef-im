import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Search, X, ArrowRight } from 'lucide-react'; // Removed Calendar/ChevronRight if unused
import { request } from 'graphql-request';
import { GET_ARCHIVE } from '../queries';

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT;

// TEAL PROTOCOL LOCKED
const colorMap: Record<string, string> = {
  emerald: 'bg-[#2bb1bb]/10 text-[#2bb1bb] border-[#2bb1bb]/20',
  amber: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  default: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
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
            คลังความรู้ <span className="text-[#2bb1bb] text-lg font-normal">(The Archive)</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-light">
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

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === null
                ? 'bg-white text-[#0B1D35] font-bold border-white scale-105'
                : 'bg-transparent text-slate-400 border-slate-700 hover:border-[#2bb1bb] hover:text-[#2bb1bb] hover:bg-[#2bb1bb]/10'
                }`}
            >
              All
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === cat.slug
                  ? 'bg-[#2bb1bb] text-white border-[#2bb1bb] shadow-[0_0_15px_rgba(43,177,187,0.3)] font-bold scale-105'
                  : 'bg-transparent text-slate-400 border-slate-700 hover:border-[#2bb1bb] hover:text-[#2bb1bb] hover:bg-[#2bb1bb]/10'
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
            <article
              key={article.id}
              onClick={() => navigate(`/articles/${article.slug}`)}
              className="group relative bg-[#0f2645] border border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#2bb1bb]/50 hover:shadow-[0_0_20px_rgba(43,177,187,0.15)] flex flex-col h-full cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative bg-slate-900">
                {article.coverImage ? (
                  <img
                    src={article.coverImage.url}
                    alt={article.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono text-xs">NO VISUAL</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2645] to-transparent opacity-90"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  {article.categories.map((cat: any) => (
                    <span key={cat.slug} className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded backdrop-blur-md border ${colorMap[cat.color] || colorMap.default}`}>
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs text-slate-500 font-mono mb-3 flex items-center gap-2">
                  <span>{new Date(article.releaseDate).toLocaleDateString('en-GB')}</span>
                  <span>•</span>
                  <span>{Math.ceil(article.content.text.split(' ').length / 200)} min read</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 leading-snug font-['Prompt'] group-hover:text-[#2bb1bb] transition-colors">
                  {article.title}
                </h3>

                {/* 🚨 DEEP SANITATION PATCH: APPLIED TO ARCHIVE GRID */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 font-['Sarabun'] line-clamp-3">
                  {article.content.text
                    .replace(/\\n/g, ' ') // Strip literal "\n"
                    .replace(/\n/g, ' ')  // Strip real newlines
                    .replace(/\s+/g, ' ') // Collapse spaces
                    .trim()               // Clean start/end
                    .substring(0, 120)}...
                </p>

                <div className="flex items-center gap-2 text-[#F59E0B] text-sm font-bold tracking-wide group-hover:translate-x-2 transition-transform mt-auto">
                  READ ANALYSIS
                  <ArrowRight size={16} />
                </div>
              </div>
            </article>
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