import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, MessageCircle, Info } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface CatalogPageProps {
  initialCategory?: string;
  initialSearch?: string;
  onBack: () => void;
}

const CATEGORIES = ['Todos', 'Freios', 'Suspensão', 'Motor', 'Óleos & Fluidos', 'Elétrica', 'Arrefecimento', 'Outros'];

const CatalogPage: React.FC<CatalogPageProps> = ({ initialCategory = 'Todos', initialSearch = '', onBack }) => {
  const { content } = useContent();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filteredProducts, setFilteredProducts] = useState(content.products);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = content.products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(lowerQuery) || 
        product.brand.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery);
      
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, content.products]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-brand-dark text-white pt-24 pb-12 px-4 shadow-xl">
        <div className="container mx-auto">
           <button 
             onClick={onBack}
             className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium group"
           >
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
             Voltar para Início
           </button>
           
           <h1 className="text-4xl md:text-5xl font-black mb-6">
             Nosso <span className="text-brand-red">Estoque</span>
           </h1>
           
           <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
              <div className="flex-grow relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Busque por peça, marca ou modelo..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:border-brand-red focus:bg-black/50 outline-none transition-all"
                />
              </div>
           </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 -mt-6">
         <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0 mr-2" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 mt-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 opacity-50">
             <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search className="w-10 h-10 text-gray-400" />
             </div>
             <p className="text-xl font-bold text-gray-600">Nenhum produto encontrado.</p>
             <p className="text-gray-500">Tente buscar por outro termo ou categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredProducts.map(product => (
               <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                  {/* Image */}
                  <div className="h-56 relative overflow-hidden bg-gray-100">
                     <img 
                       src={product.image} 
                       alt={product.name}
                       loading="lazy" 
                       decoding="async"
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                       onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400")} 
                     />
                     <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                       {product.category}
                     </div>
                     {!product.inStock && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                           <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold">Indisponível</span>
                        </div>
                     )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                     <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-brand-red uppercase tracking-wide">{product.brand}</span>
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 flex-grow">{product.name}</h3>
                     <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                     
                     <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xl font-black text-gray-900">{product.price}</span>
                        <a 
                          href={`https://wa.me/${content.contact.whatsapp}?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20produto%3A%20${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-colors shadow-lg shadow-green-500/20"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Tenho Interesse
                        </a>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;