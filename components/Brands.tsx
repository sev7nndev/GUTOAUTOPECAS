import React from 'react';
import { useContent } from '../contexts/ContentContext';

const Brands: React.FC = React.memo(() => {
  const { content } = useContent();
  // Duplicate brands to create seamless infinite loop from Context
  const marqueeBrands = [...content.brands, ...content.brands];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const parent = target.parentElement;
    if (parent) {
      parent.style.display = 'none';
    }
  };

  return (
    <section id="marcas" className="py-12 bg-white border-b border-gray-100 relative overflow-hidden">
      
      <div className="container mx-auto px-4 mb-10 text-center">
         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
           Trabalhamos com as principais marcas do mercado
         </p>
      </div>

      <div className="relative w-full">
        <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-full overflow-hidden group">
          <div className="flex animate-scroll group-hover:[animation-play-state:paused] gap-12 md:gap-20 px-4 items-center">
            {marqueeBrands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`} 
                className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer"
              >
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="h-16 md:h-20 w-auto max-w-[180px] object-contain drop-shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Brands;