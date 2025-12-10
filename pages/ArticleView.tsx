import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { GET_POST_BY_SLUG } from '../queries';
import SEO from '../components/SEO';
import ShareNode from '../components/ShareNode';
// ✅ IMPORTING THE CLEAN RENDERERS
import { ArticleCitation, ArticleAsset, ArticleDivider } from '../components/RefactoredRenderers';
import ToolLoader from '../components/tools/ToolLoader';

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT;

// 📸 AUTHOR AVATAR (Hardcoded for Phase 4)
const AVATAR_URL = "https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmiq5wff81fd707plg0f2l2y4";

// ✅ FIXED: Map Categories to Badge Colors (Teal Protocol Enforced)
// Removed duplicate keys. 'emerald' is now strictly Teal #2bb1bb.
const colorMap: Record<string, string> = {
  emerald: 'text-brand-teal border-brand-teal/30 bg-brand-teal/10',
  amber: 'text-brand-amber border-brand-amber/30 bg-brand-amber/10',
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

  if (!post || !post.content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#0B1D35]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Signal Lost</h2>
          <p className="text-gray-400 mb-4">The requested archive does not exist.</p>
          <button onClick={() => navigate('/articles')} className="text-brand-amber hover:underline">Return to Base</button>
        </div>
      </div>
    );
  }




  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0B1D35]">
      {/* SEO SIGNALS (UPDATED) */}
      <SEO
        title={post.title}
        description={post.content.text.substring(0, 160) + "..."}
        image={post.coverImage?.url}
        url={`/articles/${post.slug}`}
        type="article"
      />

      {/* Progress/Status Bar Visual (Teal for Logic) */}
      <div className="fixed top-0 left-0 h-1 bg-brand-teal/50 w-full z-40"></div>

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
              <img
                src={AVATAR_URL}
                alt="Nerd with Nart"
                className="w-full h-full object-cover"
              />
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
            
            /* GLOBAL IMAGE ROUNDING */
            prose-img:rounded-2xl
            prose-img:shadow-lg
            prose-img:border
            prose-img:border-white/10

            /* 1. HEADINGS (H2/H3) */
            prose-headings:font-['Prompt'] 
            prose-headings:text-white
            prose-headings:mt-12
            prose-headings:mb-6
            
            /* 2. LINKS */
            prose-a:text-brand-amber
            prose-a:no-underline
            prose-a:border-b
            prose-a:border-brand-amber/50
            prose-a:transition-colors
            hover:prose-a:text-brand-amber/80
            
            /* 3. BLOCKQUOTES (Teal Protocol) */
            prose-blockquote:border-l-4
            prose-blockquote:border-brand-teal
            prose-blockquote:text-gray-200
            prose-blockquote:bg-brand-teal/10
            prose-blockquote:py-4
            prose-blockquote:px-6
            prose-blockquote:rounded-r-lg
            prose-blockquote:not-italic
            prose-blockquote:my-8
            prose-blockquote:before:content-none
            prose-blockquote:after:content-none

            /* 4. H4 HEADERS - Logic Labels (Teal) */
            prose-h4:text-brand-teal
            prose-h4:text-xs
            prose-h4:font-bold
            prose-h4:uppercase
            prose-h4:tracking-widest
            prose-h4:mb-2
            prose-h4:mt-10

            /* 5. HR (Horizontal Rule) */
            prose-hr:border-brand-teal/30
            prose-hr:my-12

            /* 6. LISTS */
            prose-li:marker:text-brand-amber
            
            /* 7. STRONG */
            prose-strong:text-white
            prose-strong:font-bold
          ">

          <RichText
            content={post.content.raw}
            references={post.content.references || []}
            renderers={{
              // 1. STANDARD BLOCKS
              p: ({ children }) => {
                // 🛠️ SHORTCODE INJECTION LOGIC (CTO NUCLEAR FIX)



                // Helper to recursively extract text from React Children (DIAMOND-DRILL FIX v2 - Safe Mode)
                const getText = (node: any, depth = 0): string => {
                  if (!node || depth > 10) return ''; // Depth limit to prevent infinite recursion
                  if (typeof node === 'string') return node;
                  if (typeof node === 'number') return String(node);
                  if (Array.isArray(node)) return node.map(n => getText(n, depth + 1)).join('');

                  // 1. Handle React Elements (recursive)
                  if (node.props && node.props.children) return getText(node.props.children, depth + 1);

                  // 2. Handle Hygraph Text Nodes
                  if (node.text) return node.text;

                  // 3. Fallback
                  return '';
                };

                const textContent = getText(children);

                // DEBUG: Verify what we are actually receiving
                if (textContent.includes("TOOL:")) {
                  // Found Potential Tool via getText
                } else {
                  // FALLBACK CHECK: Scan the raw JSON of children
                  const rawJSON = JSON.stringify(children);
                  if (rawJSON.includes("TOOL:")) {
                    // Try to extract it from the JSON match as a backup.
                    const jsonMatch = rawJSON.match(/\[TOOL:([A-Z_]+)\]/);
                    if (jsonMatch) {
                      const toolKey = jsonMatch[1];
                      return (
                        <div className="my-8 tool-container">
                          <ToolLoader toolName={toolKey} />
                        </div>
                      );
                    }
                  }
                }

                // Regex to find [TOOL:KEY] (Relaxed)
                const match = textContent.match(/\[TOOL:([A-Z_]+)\]/);

                if (match) {
                  const toolKey = match[1];
                  return (
                    <div className="my-8 tool-container">
                      <ToolLoader toolName={toolKey} />
                    </div>
                  );
                }

                // 🛠️ FALLBACK: Check stringified children for shortcode (for complex structures)
                const stringifiedChildren = JSON.stringify(children);
                const fallbackMatch = stringifiedChildren.match(/\[TOOL:([A-Z_]+)\]/);

                if (fallbackMatch) {
                  const toolKey = fallbackMatch[1];
                  return (
                    <div className="my-8 tool-container">
                      <ToolLoader toolName={toolKey} />
                    </div>
                  );
                }

                // Default Rendering
                return <p className="mb-8 text-lg text-slate-300 leading-relaxed">{children}</p>;
              },

              h1: ({ children }) => <h1 className="text-4xl font-bold text-white mt-12 mb-6">{children}</h1>,
              h2: ({ children }) => <h2 className="text-3xl font-bold text-brand-teal mt-16 mb-8">{children}</h2>,
              h3: ({ children }) => <h3 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h3>,
              ul: ({ children }) => <ul className="list-disc list-outside mb-8 ml-6 text-slate-300 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-outside mb-8 ml-6 text-slate-300 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="pl-2">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="
                  border-l-4 border-brand-teal pl-6 py-2 my-10 
                  bg-brand-teal/10 italic text-slate-200 text-xl rounded-r-lg 
                  
                  /* 🛡️ NUCLEAR QUOTE REMOVAL */
                  before:content-none after:content-none 
                  [&_p]:before:content-none [&_p]:after:content-none
                ">
                  {children}
                </blockquote>
              ),
              bold: ({ children }) => <strong className="font-bold text-brand-teal">{children}</strong>,

              // 2. EMBEDDED BLOCKS - ✅ CLEANED UP
              embed: {
                Citation: (props: any) => <ArticleCitation {...props} citations={post?.citations} />,
                Asset: ArticleAsset,
                Divider: (props: any) => <ArticleDivider isInvisible={props.isInvisible} variant={props.variant} />,
              },
            }}
          />
        </div>



        {/* 🚨 SHARE NODE (Capture High Dopamine) */}
        {post && <ShareNode title={post.title} slug={slug!} />}

        {/* Citations Footer (Smart Links) */}
        {post.citations.length > 0 && (
          <div className="mt-16 pt-8 border-t-2 border-brand-teal opacity-100 origin-left">
            {/* UPDATED: Thai Header + Prompt Font */}
            <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 font-['Prompt']">
              {/* Icon is now Teal (#2bb1bb) to signal "Verified Source" */}
              <BookOpen size={14} className="text-brand-teal" />
              เอกสารอ้างอิง (Primary Sources)
            </h4>
            <ul className="space-y-2">
              {post.citations.map((cite: any, idx: number) => {
                const hasUrl = !!cite.url;
                const Wrapper = hasUrl ? 'a' : 'div';
                const props = hasUrl ? {
                  href: cite.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-xs text-gray-400 font-mono bg-black/20 p-3 rounded border border-white/5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all cursor-pointer group block w-full text-left"
                } : {
                  className: "text-xs text-gray-400 font-mono bg-black/20 p-3 rounded border border-white/5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 block w-full text-left"
                };

                return (
                  <Wrapper key={idx} {...props}>
                    {/* Index: Amber (Action) */}
                    <span className="text-brand-amber font-extrabold text-sm">[{idx + 1}]</span>
                    {/* Source Name: Hover to Teal */}
                    <span className={`font-bold ${hasUrl ? 'text-gray-400 group-hover:text-brand-teal transition-colors' : 'text-gray-400'}`}>
                      {cite.sourceName}
                    </span>
                    <span className="hidden sm:inline text-gray-600">—</span>
                    <span className="text-gray-500">{cite.publisher}</span>
                    {hasUrl && <span className="text-slate-600 group-hover:text-brand-teal ml-auto">↗</span>}
                  </Wrapper>
                );
              })}
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