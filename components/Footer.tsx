import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-teal/20 py-16 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

        {/* 1. BRAND IDENTITY */}
        <h2 className="text-2xl font-bold font-['Prompt'] tracking-widest text-white mb-2">
          NERD WITH NART
        </h2>
        <p className="text-xs font-bold text-brand-amber tracking-widest mb-10">
          DATA • LOGIC • LEGACY
        </p>

        {/* 2. SOCIAL CONNECTION (Official Assets) */}
        <div className="flex gap-5 mb-12 items-center">

          {/* FACEBOOK (Official Blue) */}
          <a
            href="https://www.facebook.com/nerdwithnart"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 rounded-full hover:bg-[#1877F2]/20 transition-all duration-300 group"
            aria-label="Facebook"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
              alt="Facebook"
              className="w-6 h-6 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
            />
          </a>

          {/* LINE (Official Green - Optically Adjusted) */}
          <a
            href="#"
            className="p-3 bg-white/5 rounded-full hover:bg-[#00C300]/20 transition-all duration-300 group cursor-not-allowed"
            aria-label="LINE"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
              alt="LINE"
              className="w-7 h-7 -mt-0.5 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
            />
          </a>

          {/* LINKEDIN (Official Blue) */}
          <a
            href="#"
            className="p-3 bg-white/5 rounded-full hover:bg-[#0A66C2]/20 transition-all duration-300 group cursor-not-allowed"
            aria-label="LinkedIn"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
              alt="LinkedIn"
              className="w-6 h-6 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
            />
          </a>

           {/* X / TWITTER (Official Black/White) */}
           <a
            href="#"
            className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 group cursor-not-allowed"
            aria-label="X"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
              alt="X"
              className="w-5 h-5 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 invert dark:invert-0"
            />
          </a>

        </div>

        {/* 3. THE CREDENTIALS (Subtle Authority - Text Only) */}
        <div className="mb-10 text-center">
          <p className="text-brand-teal/80 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase select-none">
            MDRT • COT • Fiduciary Standard • IC License
          </p>
        </div>

        {/* 4. NAVIGATION (Clean) */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold tracking-widest uppercase mb-10 text-slate-500">
          <Link to="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <Link to="/articles" className="hover:text-brand-teal transition-colors">Articles</Link>
          <Link to="/tools" className="hover:text-brand-teal transition-colors">Tools</Link>
          <Link to="/contact" className="hover:text-brand-teal transition-colors">Contact</Link>
        </div>

        {/* 5. DISCLAIMER & COPYRIGHT */}
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
