import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
       <div className="max-w-4xl mx-auto">
         <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Prompt']">Contact Command</h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
              Ready to plan your ascent? Reach out to schedule a consultation or verify your current equipment.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
                <GlassCard className="p-8">
                    <h3 className="text-xl font-bold text-white mb-6 font-['Prompt']">Direct Channels</h3>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email</div>
                                <div className="text-white font-medium">expedition@nerdwithnart.com</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Emergency / Urgent</div>
                                <div className="text-white font-medium">+66 (0) 2-123-4567</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Basecamp Location</div>
                                <div className="text-white font-medium">
                                    Sathorn Prime Building, 20th Floor<br/>
                                    Bangkok, Thailand
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                <div className="p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-cyan-900/20 to-transparent">
                    <p className="text-cyan-400 text-sm font-['Prompt'] font-bold mb-2">NOTE:</p>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        For Medical Audit defense requests, please include your policy number and the date of the incident in your initial message for faster processing.
                    </p>
                </div>
            </div>

            {/* Contact Form */}
            <GlassCard className="p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none transition-all placeholder:text-gray-600"
                            placeholder="Your full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                        <input 
                            type="email" 
                            className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none transition-all placeholder:text-gray-600"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Topic</label>
                        <select className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none transition-all appearance-none cursor-pointer">
                            <option>Consultation Request</option>
                            <option>Medical Audit Defense</option>
                            <option>Estate Planning Inquiry</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                        <textarea 
                            rows={4}
                            className="w-full bg-[#0B1D35]/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none transition-all placeholder:text-gray-600 resize-none"
                            placeholder="Briefly describe your situation..."
                        ></textarea>
                    </div>

                    <button className="w-full py-4 bg-[#F59E0B] hover:bg-[#d97706] text-[#0B1D35] font-bold rounded-lg flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-orange-900/20">
                        <Send size={18} />
                        <span>Send Transmission</span>
                    </button>
                </form>
            </GlassCard>
         </div>
       </div>
    </div>
  );
};

export default Contact;