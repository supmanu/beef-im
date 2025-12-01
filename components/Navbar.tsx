import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Compass, Menu, X, Mountain } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Basecamp', path: '/' },
    { label: 'Gear Check', path: '/tools' }, 
    { label: 'Knowledge Engine', path: '/articles' },
    { label: 'Manifesto', path: '/manifesto' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B1D35]/80 backdrop-blur-md border-b border-white/10 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Area */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <Mountain className="w-8 h-8 text-[#F59E0B] transition-transform group-hover:scale-110" />
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold tracking-wider text-white font-['Prompt'] leading-none">
              NERD WITH NART
            </span>
            <span className="text-[0.65rem] text-gray-400 font-bold tracking-[0.2em] uppercase mt-1 group-hover:text-[#F59E0B] transition-colors ml-0.5">
              Data. Logic. Legacy.
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-[#F59E0B]' : 'text-gray-300 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Action / Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:border-[#F59E0B] hover:text-[#F59E0B] hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all text-gray-300">
            <Compass size={20} />
          </button>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B1D35] border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive ? 'text-[#F59E0B]' : 'text-gray-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;