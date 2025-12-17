import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { getSovereignArticles } from '@/lib/payload';
import { extractTextFromLexical } from '@/lib/lexical';

// ✅ FIXED: Map Categories to Teal Protocol Colors
const colorMap: Record<string, string> = {
    'deep-dive': 'text-brand-teal border-brand-teal/30 bg-brand-teal/10',
    'quick-magnet': 'text-brand-amber border-brand-amber/30 bg-brand-amber/10',
    'news': 'text-blue-400 border-blue-500/30 bg-blue-900/30',
    'case-study': 'text-slate-400 border-slate-500/30 bg-slate-900/30',
    default: 'text-gray-400 border-gray-500/30 bg-gray-900/30'
};

export default async function FeaturedPosts() {
    const allPosts = await getSovereignArticles();
    // Take top 3
    const posts = allPosts.slice(0, 3);

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex items-end justify-between mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-['Prompt']">Featured Intelligence</h2>
                    <p className="text-slate-400 font-['Sarabun']">Latest strategic insights and analysis.</p>
                </div>
                <Link href="/articles" className="text-brand-teal hover:text-white transition-colors flex items-center gap-2 text-sm font-bold tracking-wide">
                    VIEW ALL ARCHIVES <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((article: any) => {
                    // Extract Category
                    let firstCategory = null;
                    if (Array.isArray(article.category) && article.category.length > 0) {
                        const cat = article.category[0];
                        if (typeof cat === 'object') firstCategory = cat;
                    } else if (typeof article.category === 'object') {
                        firstCategory = article.category;
                    }

                    const categorySlug = firstCategory?.slug || (typeof article.category === 'string' ? article.category : 'default');
                    const categoryLabel = firstCategory?.name || (typeof article.category === 'string' ? article.category.replace('-', ' ') : 'Article');

                    // Extract Text & Min Read
                    const plainText = extractTextFromLexical(article.content?.root);
                    const minRead = Math.ceil((plainText.length || 0) / 1000) || 5; // Rough estim. 
                    const excerpt = article.excerpt || plainText.substring(0, 120) + '...';

                    // Cover Image
                    const coverUrl = article.coverImage?.url || article.coverImage;

                    return (
                        <Link
                            key={article.id}
                            href={`/articles/${article.slug}`}
                            className="group relative bg-[#0f2645] border border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand-teal/50 hover:shadow-[0_0_20px_rgba(43,177,187,0.15)] flex flex-col h-full"
                        >
                            <div className="h-48 overflow-hidden relative bg-slate-900">
                                {coverUrl ? (
                                    <img
                                        src={coverUrl}
                                        alt={article.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono text-xs">NO VISUAL</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2645] to-transparent opacity-90"></div>
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded backdrop-blur-md border ${colorMap[categorySlug] || colorMap.default}`}>
                                        {categoryLabel}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-xs text-slate-500 font-mono mb-3 flex items-center gap-2">
                                    <span>{new Date(article.publishedDate).toLocaleDateString('en-GB')}</span>
                                    <span>•</span>
                                    <span>{minRead} min read</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 leading-snug font-['Prompt'] group-hover:text-brand-teal transition-colors">
                                    {article.title}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 font-['Sarabun'] line-clamp-3">
                                    {excerpt}
                                </p>

                                <div className="flex items-center gap-2 text-brand-amber text-sm font-bold tracking-wide group-hover:translate-x-2 transition-transform mt-auto">
                                    READ ANALYSIS
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
