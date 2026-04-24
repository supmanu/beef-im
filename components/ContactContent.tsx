'use client';

import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import ContactBackground from '@/components/ContactBackground';
import { motion } from 'framer-motion';

export default function ContactContent() {
    // Form field variants for stagger animation
    const fieldVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5 }
        })
    };

    return (
        <div className="relative min-h-screen">
            <ContactBackground />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Header - Narrative Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-3 py-1 border border-amber-500/30 rounded-full bg-amber-500/10 mb-4">
                            <span className="text-amber-500 text-xs font-bold tracking-wider">CONTACT COMMAND</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-prompt">Contact Command</h1>
                        <p className="text-slate-400 max-w-xl mx-auto text-lg font-sarabun">
                            Ready to plan your ascent? Reach out to schedule a consultation or verify your current equipment.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="p-8 bg-slate-900/60 backdrop-blur border border-slate-700/50 rounded-2xl hover:border-amber-500/30 transition-all">
                                <h3 className="text-xl font-bold text-white mb-6 font-prompt">Direct Channels</h3>

                                <div className="space-y-6">
                                    {/* LINE (Secure Channel) */}
                                    <a href="https://lin.ee/YOUR_ID" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-10 h-10 rounded-lg bg-[#06C755]/10 border border-[#06C755]/20 flex items-center justify-center text-[#06C755] shrink-0 transition-transform"
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                                                alt="LINE"
                                                className="w-7 h-7"
                                            />
                                        </motion.div>
                                        <div>
                                            <div className="text-xs font-bold text-[#06C755] uppercase tracking-wider mb-1 group-hover:underline">OFFICIAL CHANNEL (LINE)</div>
                                            <div className="text-white font-medium">@nerdwithnart</div>
                                        </div>
                                    </a>

                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-start gap-4 cursor-default"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</div>
                                            <div className="text-white font-medium">hello@nerdwithnart.com</div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-start gap-4 cursor-default"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Basecamp Location</div>
                                            <div className="text-white font-medium">
                                                Bangkok, Thailand
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* PHOTO INTEGRATION: "Man in tent" placeholder */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="relative rounded-2xl overflow-hidden border border-white/10 group h-64 md:h-auto"
                            >
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.7 }}
                                    src="https://assets.beef.im/contact-basecamp.jpg"
                                    alt="Communicating from Basecamp"
                                    className="w-full h-full object-cover opacity-70"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D35] to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <p className="text-white/90 text-sm font-light italic leading-relaxed font-sarabun">
                                        "Even at 6,500 meters, communication matters. I might not reply instantly, but I always reply."
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form (Web3Forms) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="p-8 bg-slate-900/60 backdrop-blur border border-slate-700/50 rounded-2xl hover:border-teal-500/30 transition-all"
                        >
                            <form
                                className="space-y-6"
                                action="https://api.web3forms.com/submit"
                                method="POST"
                            >
                                {/* WEB3FORMS KEYS */}
                                <input type="hidden" name="access_key" value="e16163ac-bc57-4582-9579-8ff8b0803ace" />

                                <motion.div
                                    custom={0}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fieldVariants}
                                    className="space-y-2"
                                >
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Name</label>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-brand-amber focus:ring-1 focus:ring-brand-amber outline-none transition-all placeholder:text-gray-600"
                                        placeholder="Your full name"
                                    />
                                </motion.div>

                                <motion.div
                                    custom={1}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fieldVariants}
                                    className="space-y-2"
                                >
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-brand-amber focus:ring-1 focus:ring-brand-amber outline-none transition-all placeholder:text-gray-600"
                                        placeholder="name@company.com"
                                    />
                                </motion.div>

                                <motion.div
                                    custom={2}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fieldVariants}
                                    className="space-y-2"
                                >
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Topic</label>
                                    <motion.select
                                        whileFocus={{ scale: 1.02 }}
                                        name="topic"
                                        className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-brand-amber focus:ring-1 focus:ring-brand-amber outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Consultation Request</option>
                                        <option>Medical Audit Defense</option>
                                        <option>Estate Planning Inquiry</option>
                                        <option>Other</option>
                                    </motion.select>
                                </motion.div>

                                <motion.div
                                    custom={3}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fieldVariants}
                                    className="space-y-2"
                                >
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                                    <motion.textarea
                                        whileFocus={{ scale: 1.02 }}
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-brand-amber focus:ring-1 focus:ring-brand-amber outline-none transition-all placeholder:text-gray-600 resize-none"
                                        placeholder="Briefly describe your situation..."
                                    ></motion.textarea>
                                </motion.div>

                                <motion.button
                                    custom={4}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fieldVariants}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-4 bg-brand-amber hover:bg-amber-600 text-[#0B1D35] font-bold rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-orange-900/20"
                                >
                                    <Send size={18} />
                                    <span>Send Transmission</span>
                                </motion.button>

                                <motion.p
                                    custom={5}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fieldVariants}
                                    className="text-center text-xs text-gray-500 pt-2"
                                >
                                    Secured by Web3Forms protocol.
                                </motion.p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
