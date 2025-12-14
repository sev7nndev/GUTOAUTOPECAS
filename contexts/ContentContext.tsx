import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRANDS, FEATURES, INITIAL_PRODUCTS } from '../constants';
import { Category } from '../types';

// Default categories with IDs
const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Freios', icon: 'Disc', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Suspensão', icon: 'Wrench', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Motor', icon: 'Zap', image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Óleos & Fluidos', icon: 'Droplets', image: 'https://images.unsplash.com/photo-1527383214149-17ec136aa254?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Elétrica', icon: 'Battery', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=400' },
  { id: '6', name: 'Arrefecimento', icon: 'Thermometer', image: 'https://images.unsplash.com/photo-1504222490345-c075b3136214?auto=format&fit=crop&q=80&w=400' },
];

// Initial default state
const defaultContent = {
  logo: {
    url: "" 
  },
  hero: {
    badge: "Líder em Auto Peças no RJ",
    titleLine1: "SUA PEÇA",
    titleLine2: "ESTÁ AQUI.",
    subtitle: "Nacionais e Importados. Do motor ao acabamento, garantimos a peça certa para o seu carro voltar a rodar com performance máxima.",
    bgImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
  },
  about: {
    images: [
      "https://images.unsplash.com/photo-1599256621730-d3dc05368a7f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  contact: {
    whatsapp: "5521970281814",
    phoneNacional: "(21) 3350-3305",
    phoneImports: "(21) 2450-3173",
    address1: "Rua Picuí, 869 - Bento Ribeiro",
    address2: "Largo do Sapê, 75 - Rocha Miranda",
    openingHours: "Seg - Sex: 08h às 18h | Sáb: 08h às 13h",
    topBarInfo: "Peças com Garantia e Nota Fiscal"
  },
  brands: BRANDS,
  features: FEATURES,
  products: INITIAL_PRODUCTS,
  categories: DEFAULT_CATEGORIES
};

type ContentType = typeof defaultContent;

interface ContentContextType {
  content: ContentType;
  updateContent: (section: keyof ContentType, data: any) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use lazy initialization for state to ensure we get localStorage data immediately
  // before the first render.
  const [content, setContent] = useState<ContentType>(() => {
    const saved = localStorage.getItem('site_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // DEEP MERGE STRATEGY:
        // We merge sub-objects explicitly to ensure saved data overrides defaults,
        // but missing keys in saved data (from older versions) fallback to defaults.
        return { 
          ...defaultContent, 
          ...parsed,
          hero: { ...defaultContent.hero, ...(parsed.hero || {}) },
          logo: { ...defaultContent.logo, ...(parsed.logo || {}) },
          contact: { ...defaultContent.contact, ...(parsed.contact || {}) },
          about: { 
            ...defaultContent.about, 
            ...(parsed.about || {}),
            images: parsed.about?.images?.length ? parsed.about.images : defaultContent.about.images
          },
          // For Arrays, usually if the user has saved data, we want that EXACT list, 
          // not a merge, otherwise we might duplicate items.
          products: parsed.products && parsed.products.length > 0 ? parsed.products : defaultContent.products,
          categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : defaultContent.categories,
          brands: parsed.brands && parsed.brands.length > 0 ? parsed.brands : defaultContent.brands
        };
      } catch (e) {
        console.error("Failed to parse saved content", e);
        return defaultContent;
      }
    }
    return defaultContent;
  });

  const updateContent = (section: keyof ContentType, data: any) => {
    setContent((prev) => {
      let updatedSectionData;
      
      // If data is an array (like brands or products), replace it entirely.
      // Otherwise merge it with existing section data.
      if (Array.isArray(data)) {
        updatedSectionData = data;
      } else {
        updatedSectionData = { ...prev[section], ...data };
      }

      const newContent = {
        ...prev,
        [section]: updatedSectionData
      };

      // Persist to local storage immediately
      localStorage.setItem('site_content', JSON.stringify(newContent));
      
      return newContent;
    });
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('site_content');
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within a ContentProvider");
  return context;
};