import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react';
import { request } from 'graphql-request';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { GET_POST_BY_SLUG } from '../queries';

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT;

// Map Categories to Badge Colors
const colorMap: Record<string, string> = {
  emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-900/30',
  amber: 'text-amber-400 border-amber-500/30 bg-amber-900/30',
  blue: 'text-blue-400 border-blue-500/30 bg-blue-900/30',
  slate: 'text-slate-400 border-slate-500/30 bg-slate-900/30',
  default: 'text-gray-400 border-gray-500/30 bg-gray-900/30'
};

const ArticleView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const data: any = await request(HYGRAPH_ENDPOINT, GET_POST_BY_SLUG, { slug });
        setPost(data.post);
      } catch (error) {
        console.error("Signal Lost:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-40 text-center text-slate-500 font-mono animate-pulse">Decrypting...</div>;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#0B1D35]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Signal Lost</h2>
          <p className="text-gray-400 mb-4">The requested archive does not exist.</p>
          <button onClick={() => navigate('/articles')} className="text-[#F59E0B] hover:underline">Return to Base</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0B1D35]">
      {/* Progress/Status Bar Visual (Teal for Logic) */}
      <div className="fixed top-0 left-0 h-1 bg-[#2bb1bb]/50 w-full z-40"></div>

      <article className="max-w-3xl mx-auto px-6">

        {/* Navigation */}
        <button
          onClick={() => navigate('/articles')}
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO ARCHIVE
        </button>

        {/* Header Section */}
        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.categories.map((cat: any) => (
              <span key={cat.slug} className={`px-3 py-1 text-xs font-bold rounded tracking-widest uppercase border ${colorMap[cat.color] || colorMap.default}`}>
                {cat.name}
              </span>
            ))}
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <Clock size={14} /> {Math.ceil(post.content.text.split(' ').length / 200)} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight font-['Prompt'] mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            {/* Author Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden border-2 border-white flex items-center justify-center">
              {/* Replace text with <img src="..." /> if you have a photo URL */}
              <span className="text-lg font-bold text-[#F59E0B]">N</span>
            </div>
            <div>
              <div className="text-white text-sm font-bold">Nerd with Nart</div>
              <div className="text-gray-500 text-xs flex items-center gap-1">
                <Calendar size={10} /> {new Date(post.releaseDate).toLocaleDateString('en-GB')}
              </div>
            </div>
          </div>
        </header>

        {/* --- THE CONTENT ENGINE (Rich Text) --- */}
        <div className="
                    prose prose-lg prose-invert 
                    max-w-none 
                    text-gray-300 
                    font-['Sarabun'] 
                    leading-loose 
                    
                    /* 1. HEADINGS */
                    prose-headings:font-['Prompt'] 
                    prose-headings:text-white
                    prose-headings:mt-12
                    prose-headings:mb-6
                    
                    /* 2. LINKS */
                    prose-a:text-[#F59E0B] 
                    prose-a:no-underline
                    prose-a:border-b
                    prose-a:border-[#F59E0B]/50
                    prose-a:transition-colors
                    hover:prose-a:text-[#F59E0B]/80
                    
                    /* 3. BLOCKQUOTES (Teal Logic) */
                    prose-blockquote:border-l-4
                    prose-blockquote:border-[#2bb1bb] 
                    prose-blockquote:text-gray-200
                    prose-blockquote:bg-[#2bb1bb]/10
                    prose-blockquote:py-4
                    prose-blockquote:px-6
                    prose-blockquote:rounded-r-lg
                    prose-blockquote:not-italic
                    prose-blockquote:my-8

                    /* 4. H4 HEADERS (Logic Labels) */
                    prose-h4:text-[#2bb1bb]
                    prose-h4:text-xs
                    prose-h4:font-bold
                    prose-h4:uppercase
                    prose-h4:tracking-widest 
                    prose-h4:mb-2
                    prose-h4:mt-10
                    
                    /* 5. HR (Fallbacks) */
                    prose-hr:border-[#2bb1bb]/30
                    prose-hr:my-12

                    /* 6. LISTS */
                    prose-li:marker:text-[#F59E0B]
                    
                    /* 7. STRONG */
                    prose-strong:text-white
                    prose-strong:font-bold
                ">
          <RichText
            content={post.content.raw}
            references={post.content.references} // Pass the embedded data
            renderers={{
              embed: {
                // Renders the 'Divider' model as a specialized HR
                Divider: () => (
                  <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-[#2bb1bb]/50 to-transparent" />
                ),
                // Renders 'Asset' models as Images
                Asset: ({ mimeType, url, altText }: any) => (
                  <div className="my-8">
                    <img src={url} alt={altText || 'Article Image'} className="w-full rounded-lg border border-white/10" />
                  </div>
                )
              }
            }}
          />
        </div>

        {/* Citations Footer */}
        {post.citations.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10">
            <h4 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
              <BookOpen size={14} /> Primary Sources
            </h4>
            <ul className="space-y-2">
              {post.citations.map((cite: any, idx: number) => (
                <li key={idx} className="text-xs text-gray-400 font-mono bg-black/20 p-3 rounded border border-white/5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-[#F59E0B] font-bold">[{idx + 1}]</span>
                  <span className="text-white font-medium">{cite.sourceName}</span>
                  <span className="hidden sm:inline text-gray-600">—</span>
                  <span className="text-gray-500">{cite.publisher} ({cite.year})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">End of transmission.</p>
          <button
            onClick={() => navigate('/articles')}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105"
          >
            Return to Archive
          </button>
        </div>
      </article>
    </div>
  );
};

export default ArticleView;