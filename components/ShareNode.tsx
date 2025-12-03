import React, { useState } from 'react';
import { FacebookShareButton, LineShareButton, LinkedinShareButton } from 'react-share';
import { Facebook, Linkedin, Link as LinkIcon, Check, Send } from 'lucide-react';

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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 my-12 border-t border-b border-white/10 bg-[#0f2645]/30 rounded-xl px-8">

            {/* Label */}
            <div className="flex flex-col items-center sm:items-start">
                <span className="text-[#2bb1bb] text-[10px] font-bold uppercase tracking-[0.2em] font-['Prompt'] mb-1">
                    Transmit Data
                </span>
                <span className="text-slate-400 text-sm font-light">
                    Share this intelligence with your network.
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

                {/* LINE (Custom Icon) */}
                <LineShareButton url={url} title={title} className="group">
                    <div className={btnClass} title="Share to LINE">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-[18px] h-[18px]"
                        >
                            <path d="M21.35 11.1h-.17c-.3-5-4.43-9-9.48-9-5.3 0-9.6 4.07-9.6 9.07 0 4.5 3.46 8.27 8.08 8.95.53.12 1.25.35 1.44.8.1.28.06.67-.03 1.05-.13.56-.6 2.22-.7 2.7-.1.46.23.68.6.36.43-.36 3.6-3.1 4.92-4.22 3.1-2.4 4.88-4.72 4.94-9.7z" />
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