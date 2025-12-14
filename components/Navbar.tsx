import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '../contexts/ContentContext';
import SearchBar from './SearchBar';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      onNavigate('home');
    } else {
      e.preventDefault();
      onNavigate('home');
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'A Empresa', href: '#sobre' },
    { name: 'Marcas', href: '#marcas' },
    { name: 'Contato', href: '#contato' },
  ];


  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-white/5 ${
        scrolled 
          ? 'bg-brand-dark/90 backdrop-blur-md py-2 shadow-lg shadow-black/50' 
          : 'bg-brand-dark py-3'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:justify-between items-center">
          {/* Logo Area */}
          <div className="flex items-center flex-shrink-0 mx-auto md:mx-0">
             <a 
               href="#" 
               onClick={(e) => handleLinkClick(e, '#')}
               className="flex items-center group relative"
             >
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {content.logo && content.logo.url ? (
                  <img 
                    src={content.logo.url} 
                    alt="Logo Guto Auto Peças" 
                    className="h-12 md:h-16 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105" 
                  />
                ) : (
                  <Logo className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105 relative z-10" />
                )}
             </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <SearchBar onSearch={(term) => onNavigate('catalog')} />
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold text-gray-300 hover:text-white uppercase tracking-wide transition-colors relative group overflow-hidden"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={() => onNavigate('budget')}
              className="bg-brand-red text-white px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(217,4,41,0.4)] hover:shadow-[0_0_25px_rgba(217,4,41,0.6)] hover:bg-red-600 transition-all duration-300 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              Orçamento
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-brand-charcoal/95 backdrop-blur-xl border-t border-gray-800 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-4 py-3 text-base font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all"
            >
              {link.name}
            </a>
          ))}
           <button
              onClick={() => {
                onNavigate('budget');
                setIsOpen(false);
              }}
              className="w-full mt-4 text-center bg-brand-red text-white px-5 py-3 rounded-lg text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
            >
              <ShoppingBag className="w-5 h-5" />
              Solicitar Orçamento
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;