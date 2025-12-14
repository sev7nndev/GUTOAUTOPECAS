import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { Product } from '../types';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { content } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = content.products.filter((product: Product) => 
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term)
    );

    setResults(filtered.slice(0, 5)); // Limit to 5 results
  }, [searchTerm, content.products]);

  const handleSelectResult = (product: Product) => {
    setSearchTerm('');
    setIsOpen(false);
    onSearch(product.name);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsOpen(false);
      onSearch(searchTerm);
    }
  };

  const highlightMatch = (text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-yellow-200">{part}</mark> : part
    );
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 group"
      >
        <Search className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-600 hidden md:block">Buscar peças...</span>
        <div className="hidden lg:flex items-center gap-1 ml-2 px-2 py-0.5 bg-white rounded border border-gray-300">
          <Command className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400">K</span>
        </div>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Box */}
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Input */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Buscar por nome, marca ou categoria..."
                className="flex-1 outline-none text-lg"
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-2">
                  <div className="text-xs text-gray-500 px-3 py-2 font-semibold uppercase tracking-wide">
                    Resultados ({results.length})
                  </div>
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectResult(product)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate group-hover:text-brand-red transition-colors">
                          {highlightMatch(product.name, searchTerm)}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {product.brand} • {product.category}
                        </div>
                      </div>
                      <div className="text-brand-red font-bold flex-shrink-0">
                        {product.price}
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="p-8 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-semibold mb-1">Nenhum resultado encontrado</p>
                  <p className="text-sm">Tente buscar por outro termo</p>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-semibold mb-1">Busque por peças</p>
                  <p className="text-sm">Digite o nome, marca ou categoria</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">↵</kbd>
                  para buscar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">ESC</kbd>
                  para fechar
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
