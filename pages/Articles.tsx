import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, ChevronRight, Search, X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { articles } from '../data/mockData';

const Articles: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(new Set(articles.map(a => a.category)));

  // Filter Logic
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header & Filter Controls */}
      <div className="mb-12 space-y-8">
         <div>
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Prompt']">The Archive</h1>
           <p className="text-gray-400 max-w-2xl text-lg font-light">
             บันทึกการเดินทางและองค์ความรู้ที่รวบรวมจากการทำงานจริง
           </p>
         </div>

         <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-600"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  selectedCategory === null 
                    ? 'bg-[#F59E0B] text-[#0B1D35] border-[#F59E0B]' 
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    selectedCategory === cat 
                      ? 'bg-cyan-900/40 text-cyan-400 border-cyan-500' 
                      : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                  }`}
                >
                  {cat}
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
              className="flex flex-col h-full"
              onClick={() => navigate(`/articles/${article.id}`)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#0B1D35]/80 backdrop-blur-sm rounded text-[10px] font-bold text-[#F59E0B] tracking-[0.15em] uppercase border border-[#F59E0B]/20">
                  {article.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-mono">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 leading-snug font-['Prompt'] group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 font-['Sarabun']">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-gray-300 text-sm font-bold tracking-wide group-hover:text-[#F59E0B] transition-colors">
                  READ ANALYSIS 
                  <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No signals found matching your parameters.</p>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedCategory(null);}}
            className="mt-4 text-[#F59E0B] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Articles;