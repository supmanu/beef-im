import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `transition-colors ${isActive ? 'text-[#F59E0B]' : 'text-gray-400 hover:text-white'}`;

  return (
    <footer className="bg-[#0B1D35] border-t border-white/10 py-12 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Brand */}
        <h2 className="text-2xl font-bold font-['Prompt'] tracking-widest text-white mb-2">
          NERD WITH NART
        </h2>
        
        {/* Subtitle / Divider */}
        <div className="flex justify-center gap-4 text-xs font-bold text-[#F59E0B] tracking-widest mb-8">
          <span>DATA</span>
          <span className="text-white/20">•</span>
          <span>LOGIC</span>
          <span className="text-white/20">•</span>
          <span>LEGACY</span>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-[#F59E0B] transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-[#F59E0B] transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-[#F59E0B] transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-[#F59E0B] transition-colors flex items-center gap-1">
                <Globe size={20} /> <span className="text-[10px] font-bold uppercase">Lemon8</span>
            </a>
        </div>
        
        {/* Quote */}
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
          We don't sell shortcuts to wealth. We provide the map and the compass for a safe ascent.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold tracking-wide uppercase mb-8">
            <NavLink to="/" className={linkClass}>Basecamp</NavLink>
            <NavLink to="/articles" className={linkClass}>Knowledge Engine</NavLink>
            <NavLink to="/tools" className={linkClass}>Gear Check</NavLink>
            <NavLink to="/manifesto" className={linkClass}>Manifesto</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Nerd with Nart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;