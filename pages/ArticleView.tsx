import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { articles } from '../data/mockData';

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Signal Lost</h2>
          <p className="text-gray-400 mb-4">Article not found.</p>
          <button onClick={() => navigate('/articles')} className="text-[#F59E0B] hover:underline">Return to Base</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0B1D35]">
      {/* Progress Bar (Optional nice-to-have visual) */}
      <div className="fixed top-0 left-0 h-1 bg-cyan-900/30 w-full z-40"></div>
      
      <article className="max-w-3xl mx-auto px-6">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO ARCHIVE
        </button>

        {/* Header */}
        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="flex items-center gap-3 mb-6">
             <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-xs font-bold rounded tracking-widest uppercase">
               {article.category}
             </span>
             <span className="w-1 h-1 rounded-full bg-gray-600"></span>
             <span className="text-gray-400 text-sm font-mono flex items-center gap-2">
               <Clock size={14} /> {article.readTime}
             </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight font-['Prompt'] mb-6">
            {article.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-white/10">
                 <img src="https://ui-avatars.com/api/?name=Nart&background=F59E0B&color=0B1D35" alt="Author" />
               </div>
               <div>
                 <div className="text-white text-sm font-bold">Nart</div>
                 <div className="text-gray-500 text-xs flex items-center gap-1">
                   <Calendar size={10} /> {article.date}
                 </div>
               </div>
            </div>
            
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg prose-invert max-w-none text-gray-300 font-['Sarabun'] leading-loose"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Footer of Article */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-gray-500 text-sm">
             End of transmission.
           </p>
           <button 
             onClick={() => navigate('/articles')}
             className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105"
           >
             Read Next Article
           </button>
        </div>
      </article>
    </div>
  );
};

export default ArticleView;