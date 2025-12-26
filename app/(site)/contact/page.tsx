import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Metadata } from 'next';
import ContactBackground from '@/components/ContactBackground';

export const metadata: Metadata = {
    title: "Contact Command | Nerd with Nart",
    description: "Ready to plan your ascent? Reach out to schedule a consultation or verify your current equipment.",
};

export default function Contact() {
    return (
        <div className="relative min-h-screen">
            <ContactBackground />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Header - Narrative Style */}
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 border border-amber-500/30 rounded-full bg-amber-500/10 mb-4">
                            <span className="text-amber-500 text-xs font-bold tracking-[0.2em]">CONTACT COMMAND</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-prompt">Contact Command</h1>
                        <p className="text-slate-400 max-w-xl mx-auto text-lg font-sarabun">
                            Ready to plan your ascent? Reach out to schedule a consultation or verify your current equipment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="p-8 bg-slate-900/60 backdrop-blur border border-slate-700/50 rounded-2xl hover:border-amber-500/30 transition-all">
                                <h3 className="text-xl font-bold text-white mb-6 font-prompt">Direct Channels</h3>

                                <div className="space-y-6">
                                    {/* LINE (Secure Channel) */}
                                    <a href="https://lin.ee/YOUR_ID" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                                        <div className="w-10 h-10 rounded-lg bg-[#06C755]/10 border border-[#06C755]/20 flex items-center justify-center text-[#06C755] shrink-0 group-hover:scale-110 transition-transform">
                                            {/* LINE SVG */}
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                                                alt="LINE"
                                                className="w-7 h-7"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-[#06C755] uppercase tracking-widest mb-1 group-hover:underline">OFFICIAL CHANNEL (LINE)</div>
                                            <div className="text-white font-medium">@nerdwithnart</div>
                                        </div>
                                    </a>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email</div>
                                            <div className="text-white font-medium">hello@nerdwithnart.com</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Basecamp Location</div>
                                            <div className="text-white font-medium">
                                                Bangkok, Thailand
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PHOTO INTEGRATION: "Man in tent" placeholder */}
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 group h-64 md:h-auto">
                                <img
                                    src="https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmit8t8in13t807nzx2v9h79z"
                                    alt="Communicating from Basecamp"
                                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <p className="text-white/90 text-sm font-light italic leading-relaxed font-sarabun">
                                        "Even at 6,500 meters, communication matters. I might not reply instantly, but I always reply."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form (Web3Forms) */}
                        <div className="p-8 bg-slate-900/60 backdrop-blur border border-slate-700/50 rounded-2xl hover:border-teal-500/30 transition-all">
                            <form
                                className="space-y-6"
                                action="https://api.web3forms.com/submit"
                                method="POST"
                            >
                                {/* WEB3FORMS KEYS */}
                                <input type="hidden" name="access_key" value="e16163ac-bc57-4582-9579-8ff8b0803ace" />

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-brand-amber focus:ring-1 focus:ring-brand-amber outline-none transition-all placeholder:text-gray-600"
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-brand-amber focus:ring-1 focus:ring-brand-amber outline-none transition-all placeholder:text-gray-600"
                                        placeholder="name@company.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Topic</label>
                                    <select
                                        name="topic"
                                        className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-brand-amber focus:ring-1 focus:ring-brand-amber outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Consultation Request</option>
                                        <option>Medical Audit Defense</option>
                                        <option>Estate Planning Inquiry</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-brand-amber focus:ring-1 focus:ring-brand-amber outline-none transition-all placeholder:text-gray-600 resize-none"
                                        placeholder="Briefly describe your situation..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full py-4 bg-brand-amber hover:bg-amber-600 text-[#0B1D35] font-bold rounded-lg flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-orange-900/20">
                                    <Send size={18} />
                                    <span>Send Transmission</span>
                                </button>

                                <p className="text-center text-xs text-gray-500 pt-2">
                                    Secured by Web3Forms protocol.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
