import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain, Compass } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [compassRotation, setCompassRotation] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setCompassRotation(window.scrollY / 5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'หน้าหลัก', sub: 'Basecamp', path: '/' },
    { name: 'คลังเครื่องมือ', sub: 'Gear Check', path: '/tools' },
    { name: 'คลังความรู้', sub: 'Archive', path: '/articles' },
    { name: 'จุดยืน', sub: 'Manifesto', path: '/manifesto' },
    { name: 'ติดต่อ', sub: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled
          ? 'bg-[#0B1D35]/80 backdrop-blur-md border-white/10 py-4 shadow-lg'
          : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group mr-8" // Added mr-8 for breathing room
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Mountain size={32} className="text-[#F59E0B] group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-widest font-['Prompt'] leading-none group-hover:text-[#F59E0B] transition-colors">
              NERD WITH NART
            </span>
            <span className="text-[10px] text-slate-400 tracking-[0.2em] font-mono group-hover:text-[#F59E0B]/70 transition-colors">
              DATA. LOGIC. LEGACY.
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU (Centered) */}
        <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));

            return (
              <Link
                key={link.path}
                to={link.path}
                className="group flex flex-col items-center"
              >
                <span className={`text-base font-bold font-['Prompt'] transition-colors ${isActive ? 'text-[#F59E0B]' : 'text-slate-200 group-hover:text-[#F59E0B]'
                  }`}>
                  {link.name}
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-wide transition-colors ${isActive ? 'text-[#F59E0B]/60' : 'text-slate-500 group-hover:text-[#F59E0B]/70'
                  }`}>
                  {link.sub}
                </span>
              </Link>
            );
          })}
        </div>

        {/* COMPASS (Far Right) */}
        <div
          className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-[#F59E0B]/50 transition-colors"
          title="Navigation Online"
        >
          <Compass
            size={20}
            className="text-slate-400 group-hover:text-[#F59E0B] transition-colors"
            style={{ transform: `rotate(${compassRotation}deg)` }}
          />
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="lg:hidden text-white hover:text-[#F59E0B] transition-colors ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0B1D35]/95 backdrop-blur-xl border-b border-white/10 lg:hidden flex flex-col p-6 shadow-2xl h-screen">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="py-6 border-b border-white/5 flex items-center justify-between group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold font-['Prompt'] text-xl group-hover:text-[#F59E0B] transition-colors">
                  {link.name}
                </span>
                <span className="text-slate-500 text-xs font-mono uppercase tracking-widest group-hover:text-[#F59E0B]/70 transition-colors">
                  {link.sub}
                </span>
              </div>
              <span className="text-slate-600 group-hover:text-[#F59E0B] transition-transform group-hover:translate-x-2">→</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;