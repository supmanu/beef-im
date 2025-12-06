import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-teal/20 py-12 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Brand & Tagline */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-['Prompt'] tracking-widest text-white mb-2">
            NERD WITH NART
          </h2>
          <div className="flex justify-center gap-4 text-xs font-bold text-brand-amber tracking-widest">
            <span>DATA</span>
            <span className="text-white/20">•</span>
            <span>LOGIC</span>
            <span className="text-white/20">•</span>
            <span>LEGACY</span>
          </div>
        </div>

        {/* The Badge Zone - Credentials */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-wrap justify-center gap-3 px-6 py-3 bg-white/5 border border-brand-teal/20 rounded-lg">
            <span className="text-xs font-bold text-brand-teal uppercase tracking-wide">MDRT</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-bold text-brand-teal uppercase tracking-wide">COT</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-bold text-brand-teal uppercase tracking-wide">Fiduciary Standard</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-bold text-brand-teal uppercase tracking-wide">IC License</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="text-slate-500 text-xs leading-relaxed">
            Unit-Linked & Investment products involve risk. Past performance does not guarantee future results.
            All content is for educational purposes only and does not constitute financial advice.
            Consult a licensed professional before making investment decisions.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold tracking-wide uppercase mb-8">
          <Link to="/" className="text-slate-400 hover:text-brand-amber transition-colors">
            Home
          </Link>
          <Link to="/articles" className="text-slate-400 hover:text-brand-amber transition-colors">
            Articles
          </Link>
          <Link to="/tools" className="text-slate-400 hover:text-brand-amber transition-colors">
            Tools
          </Link>
          <Link to="/manifesto" className="text-slate-400 hover:text-brand-amber transition-colors">
            Manifesto
          </Link>
          <Link to="/contact" className="text-slate-400 hover:text-brand-amber transition-colors">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/5 pt-6">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Nerd with Nart. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
