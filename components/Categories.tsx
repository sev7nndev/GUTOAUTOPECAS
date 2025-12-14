import React from 'react';
import { useContent } from '../contexts/ContentContext';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface CategoriesProps {
  onCategoryClick?: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategoryClick }) => {
  const { content } = useContent();
  const categories = content.categories || [];

  // Helper to dynamically get the icon component based on string name
  const getIconComponent = (iconName: string): LucideIcon => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const icon = (Icons as any)[iconName];
    return icon || Icons.Zap;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
           <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">O que você <br/><span className="text-brand-red">Procura?</span></h2>
           <button 
             onClick={() => onCategoryClick && onCategoryClick('Todos')}
             className="hidden md:inline-flex items-center text-sm font-bold text-gray-500 hover:text-brand-red transition-colors"
           >
              Ver catálogo completo
           </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {categories.map((cat, idx) => {
             const Icon = getIconComponent(cat.icon);
             return (
               <button 
                 key={cat.id || idx} 
                 onClick={() => onCategoryClick && onCategoryClick(cat.name)}
                 className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer w-full text-left"
               >
                  {/* Background Image */}
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/60 transition-colors"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-center text-center">
                     <div className="mb-2 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">
                        <Icon className="w-5 h-5" />
                     </div>
                     <span className="text-white font-bold uppercase text-sm tracking-wider">{cat.name}</span>
                  </div>
               </button>
             );
           })}
        </div>
      </div>
    </section>
  );
};

export default Categories;