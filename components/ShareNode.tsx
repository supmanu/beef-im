import React, { useState } from 'react';
import { FacebookShareButton, LineShareButton, LinkedinShareButton } from 'react-share';
import { Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

interface ShareNodeProps {
    title: string;
    slug: string;
}

const ShareNode: React.FC<ShareNodeProps> = ({ title, slug }) => {
    const [copied, setCopied] = useState(false);
    const url = `https://nerdwithnart.com/articles/${slug}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Custom Button Style Wrapper
    const btnClass = "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110 hover:border-[#F59E0B]/50 hover:text-white hover:bg-[#F59E0B]/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]";

    return (
        <div className="
            /* MOBILE LAYOUT: Sticky Bottom */
            fixed bottom-0 left-0 w-full z-50 
            bg-[#0F2440]/90 backdrop-blur-md 
            border-t border-teal-500/30 
            p-4 
            flex justify-between items-center
            
            /* DESKTOP LAYOUT: Floating Pill */
            md:static md:w-auto 
            md:bg-[#0B1D35] 
            md:border md:border-teal-500 
            md:rounded-full 
            md:px-8 md:py-4 
            md:hover:shadow-[0_0_20px_rgba(43,177,187,0.2)] 
            md:transition-shadow
            md:flex-col md:gap-4 md:items-center
            md:mx-auto md:my-12
        ">

            {/* Label */}
            <div className="flex flex-col items-start md:items-center">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest font-['Prompt'] leading-none">
                    TRANSMIT DATA
                </span>
            </div>

            {/* Icons Grid */}
            <div className="flex items-center gap-4">

                {/* Facebook */}
                <FacebookShareButton url={url} className="group">
                    <div className={btnClass} title="Share to Facebook">
                        <Facebook size={18} />
                    </div>
                </FacebookShareButton>

                {/* LINE (Official Green #06C755) */}
                <LineShareButton url={url} title={title} className="group">
                    <div className={btnClass} title="Share to LINE">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#06C755]">
                            <path d="M22 10.8c0-4.8-5.3-8.8-12-8.8S2 6 2 10.8c0 4.2 3.8 7.8 9 8.6.4.1.9.3 1 .9.1.5.1.8 0 1-.2 1.3-1.6 3.4-1.6 3.4s-.1.6.4.6.8-.5 3.3-2.7c2.3-2 6.6-2.2 6.6-2.2 4.3-.6 7.3-4.5 7.3-9.6z" />
                        </svg>
                    </div>
                </LineShareButton>

                {/* LinkedIn */}
                <LinkedinShareButton url={url} title={title} summary="An analysis by Nerd with Nart." source="Nerd with Nart" className="group">
                    <div className={btnClass} title="Share to LinkedIn">
                        <Linkedin size={18} />
                    </div>
                </LinkedinShareButton>

                {/* Copy Link */}
                <button onClick={handleCopy} className="group">
                    <div className={`${btnClass} ${copied ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10' : ''}`} title="Copy Link">
                        {copied ? <Check size={18} /> : <LinkIcon size={18} />}
                    </div>
                </button>

            </div>
        </div>
    );
};

export default ShareNode;