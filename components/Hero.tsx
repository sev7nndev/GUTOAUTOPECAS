import React, { useState } from 'react';
import { ArrowRight, Search, Zap } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface HeroProps {
  onSearch?: (term: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const { content } = useContent();
  const { hero } = content;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (onSearch) {
        onSearch(searchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
  };

  return (
    <div className="relative min-h-[70vh] md:min-h-[85vh] flex items-center bg-[#050505] overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.bgImage} 
          alt="Banner" 
          // @ts-ignore - fetchPriority is valid in React 18+ but TS might complain depending on version
          fetchPriority="high"
          className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>
      
      {/* Decorative Cyberpunk/Auto Lines */}
      <div className="absolute top-0 right-0 w-[600px] h-full border-l border-white/5 bg-white/[0.02] transform skew-x-12 origin-top hidden lg:block"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brand-red/10 border border-brand-red/20 mb-8 backdrop-blur-md animate-fade-in-up">
            <Zap className="w-4 h-4 text-brand-red fill-brand-red" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">{hero.badge}</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 animate-fade-in-up flex flex-col items-center gap-2 sm:gap-4" style={{animationDelay: '0.1s'}}>
            <span className="leading-[1.1] block">{hero.titleLine1}</span>
            <span className="leading-[1.1] block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{hero.titleLine2}</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl animate-fade-in-up whitespace-pre-line" style={{animationDelay: '0.2s'}}>
            {hero.subtitle}
          </p>
          
          {/* "Search Bar" Component - Funnels to Catalog */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 w-full max-w-2xl mb-10 shadow-2xl animate-fade-in-up transform transition-all hover:scale-[1.01] hover:bg-white/15" style={{animationDelay: '0.3s'}}>
             <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-grow flex items-center px-4 h-14 bg-black/40 rounded-xl border border-white/5">
                   <Search className="w-5 h-5 text-gray-400 mr-3" />
                   <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Qual peça você procura? (Ex: Pastilha Gol G5)" 
                      className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 text-left"
                   />
                </div>
                <button 
                  onClick={handleSearch}
                  className="h-14 px-8 bg-brand-red hover:bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(217,4,41,0.4)] hover:shadow-[0_0_30px_rgba(217,4,41,0.6)] whitespace-nowrap"
                >
                  Consultar Estoque
                  <ArrowRight className="w-5 h-5" />
                </button>
             </div>
             <div className="hidden sm:flex px-4 py-2 gap-4 text-xs text-gray-400 overflow-x-auto no-scrollbar justify-center">
                <span className="whitespace-nowrap">Populares:</span>
                <button onClick={() => onSearch && onSearch('Amortecedor')} className="hover:text-white underline decoration-brand-red/50">Amortecedores</button>
                <button onClick={() => onSearch && onSearch('Óleo')} className="hover:text-white underline decoration-brand-red/50">Óleo 5w30</button>
                <button onClick={() => onSearch && onSearch('Embreagem')} className="hover:text-white underline decoration-brand-red/50">Kit Embreagem</button>
                <button onClick={() => onSearch && onSearch('Pastilha')} className="hover:text-white underline decoration-brand-red/50">Pastilha de Freio</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;