'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Compass, Search } from 'lucide-react';
import { useSearchModal } from '../context/SearchContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [compassRotation, setCompassRotation] = useState(0);
  const { openSearch } = useSearchModal();
  const pathname = usePathname();

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
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled
          ? 'bg-[#0B1D35]/80 backdrop-blur-md border-white/10 py-4 shadow-lg'
          : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer group mr-8"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* PART A: THE ICON */}
            <img
              src="https://assets.beef.im/navbar-logo.png"
              alt="ประกันเนื้อๆ Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />

            {/* PART B: THE TEXT STACK */}
            <div className="flex flex-col justify-center">
              {/* Main Title */}
              <span className="font-prompt font-bold text-white text-lg lg:text-xl leading-none tracking-wide">
                ประกันเนื้อๆ
              </span>
              {/* Tagline */}
              <span className="font-sarabun text-amber-500 text-[10px] font-medium tracking-[0.2em] leading-tight">
                DATA. LOGIC. LEGACY.
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU (Centered) */}
          <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex flex-col items-center"
                >
                  <span className={`text-base font-bold font-['Prompt'] transition-colors ${isActive ? 'text-brand-amber' : 'text-slate-200 group-hover:text-brand-amber'
                    }`}>
                    {link.name}
                  </span>
                  <span className={`text--[10px] font-mono uppercase tracking-wide transition-colors ${isActive ? 'text-brand-amber/60' : 'text-slate-500 group-hover:text-brand-amber/70'
                    }`}>
                    {link.sub}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* SEARCH ICON (Desktop) */}
          <button
            onClick={openSearch}
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-amber-500/50 hover:bg-amber-500/10 transition-colors mr-4"
            title="Search (Cmd+K)"
          >
            <Search size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
          </button>

          {/* COMPASS (Far Right) */}
          <div
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-brand-amber/50 transition-colors"
            title="Navigation Online"
          >
            <Compass
              size={20}
              className="text-slate-400 group-hover:text-brand-amber transition-colors"
              style={{ transform: `rotate(${compassRotation}deg)` }}
            />
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-4 lg:hidden ml-auto">
            <button
              className="text-white hover:text-brand-amber transition-colors"
              onClick={openSearch}
            >
              <Search size={24} />
            </button>

            <button
              className="text-white hover:text-brand-amber transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0B1D35]/95 backdrop-blur-xl border-b border-white/10 lg:hidden flex flex-col p-6 shadow-2xl h-screen">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="py-6 border-b border-white/5 flex items-center justify-between group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-white font-bold font-['Prompt'] text-xl group-hover:text-brand-amber transition-colors">
                    {link.name}
                  </span>
                  <span className="text-slate-500 text-xs font-mono uppercase tracking-widest group-hover:text-brand-amber/70 transition-colors">
                    {link.sub}
                  </span>
                </div>
                <span className="text-slate-600 group-hover:text-brand-amber transition-transform group-hover:translate-x-2">→</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;