import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedPosts } from '@/lib/hygraph';

const colorMap: Record<string, string> = {
    emerald: 'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
    amber: 'bg-brand-amber/10 text-brand-amber border-brand-amber/20',
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    default: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
};

export default async function FeaturedPosts() {
    const posts = await getFeaturedPosts();

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
                {posts.map((article: any) => (
                    <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        className="group relative bg-[#0f2645] border border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand-teal/50 hover:shadow-[0_0_20px_rgba(43,177,187,0.15)] flex flex-col h-full"
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

                            <h3 className="text-xl font-bold text-white mb-3 leading-snug font-['Prompt'] group-hover:text-brand-teal transition-colors">
                                {article.title}
                            </h3>

                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 font-['Sarabun'] line-clamp-3">
                                {article.content.text
                                    .replace(/\\n/g, ' ')
                                    .replace(/\n/g, ' ')
                                    .replace(/\s+/g, ' ')
                                    .trim()
                                    .substring(0, 120)}...
                            </p>

                            <div className="flex items-center gap-2 text-brand-amber text-sm font-bold tracking-wide group-hover:translate-x-2 transition-transform mt-auto">
                                READ ANALYSIS
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
