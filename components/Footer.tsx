import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, MessageCircle, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-teal/20 py-16 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

        {/* 1. Brand Identity */}
        <h2 className="text-2xl font-bold font-['Prompt'] tracking-widest text-white mb-2">
          NERD WITH NART
        </h2>
        <p className="text-xs font-bold text-brand-amber tracking-widest mb-8">
          DATA • LOGIC • LEGACY
        </p>

        {/* 2. Social Connection (The Bridge) */}
        <div className="flex gap-6 mb-10">
          <a
            href="https://www.facebook.com/nerdwithnart"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-brand-amber transition-all duration-300 group"
          >
            <Facebook size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          {/* Inactive Channels */}
          <div className="p-3 bg-white/5 rounded-full text-slate-700 cursor-not-allowed">
            <MessageCircle size={20} />
          </div>
          <div className="p-3 bg-white/5 rounded-full text-slate-700 cursor-not-allowed">
            <Linkedin size={20} />
          </div>
        </div>

        {/* 3. The Credentials (Subtle Authority) */}
        <div className="mb-8 text-center">
          <p className="text-brand-teal/80 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase select-none">
            MDRT • COT • Fiduciary Standard • IC License
          </p>
        </div>

        {/* 4. Navigation (Clean) */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold tracking-widest uppercase mb-10 text-slate-500">
          <Link to="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <Link to="/articles" className="hover:text-brand-teal transition-colors">Articles</Link>
          <Link to="/tools" className="hover:text-brand-teal transition-colors">Tools</Link>
          <Link to="/contact" className="hover:text-brand-teal transition-colors">Contact</Link>
        </div>

        {/* 5. Disclaimer & Copyright */}
        <div className="max-w-2xl text-center border-t border-white/5 pt-8">
          <p className="text-slate-600 text-[10px] leading-relaxed mb-4">
            Unit-Linked & Investment products involve risk. Past performance does not guarantee future results.
            All content is for educational purposes only.
          </p>
          <p className="text-slate-700 text-[10px]">
            © {new Date().getFullYear()} Nerd with Nart. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
