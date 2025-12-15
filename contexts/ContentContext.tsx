import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRANDS, FEATURES, INITIAL_PRODUCTS } from '../constants';
import { Category } from '../types';
import { supabase } from '../lib/supabase';

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
  loading: boolean;
  updateContent: (section: keyof ContentType, data: any) => Promise<void>;
  resetContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentType>(defaultContent);
  const [loading, setLoading] = useState(true);

  // Fetch all data from Supabase on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch site_content sections
      const { data: siteData } = await supabase
        .from('site_content')
        .select('*');

      // Fetch products
      const { data: productsData } = await supabase
        .from('products')
        .select('*');

      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      // Fetch brands
      const { data: brandsData } = await supabase
        .from('brands')
        .select('*')
        .order('display_order');

      // Build content object
      const newContent = { ...defaultContent };

      // Process site_content sections
      if (siteData) {
        siteData.forEach((row: any) => {
          if (row.section === 'hero') newContent.hero = { ...defaultContent.hero, ...row.data };
          if (row.section === 'contact') newContent.contact = { ...defaultContent.contact, ...row.data };
          if (row.section === 'logo') newContent.logo = { ...defaultContent.logo, ...row.data };
          if (row.section === 'about') newContent.about = { ...defaultContent.about, ...row.data };
        });
      }

      // Set products, categories, brands
      if (productsData && productsData.length > 0) newContent.products = productsData;
      if (categoriesData && categoriesData.length > 0) newContent.categories = categoriesData;
      if (brandsData && brandsData.length > 0) newContent.brands = brandsData;

      setContent(newContent);
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (section: keyof ContentType, data: any) => {
    try {
      // Update local state immediately for responsiveness
      setContent((prev) => {
        const updatedSectionData = Array.isArray(data) ? data : { ...prev[section], ...data };
        return {
          ...prev,
          [section]: updatedSectionData
        };
      });

      // Save to Supabase based on section type
      if (section === 'products') {
        // Products are managed individually in AdminDashboard
        // Just update local state, don't delete/reinsert
        // Individual product saves happen in AdminDashboard.handleSaveProduct
        console.log('Products updated in local state only - managed individually in admin');
      } else if (section === 'categories') {
        // Handle categories - delete all and re-insert
        await supabase.from('categories').delete().neq('id', '');
        if (data.length > 0) {
          await supabase.from('categories').insert(data);
        }
      } else if (section === 'brands') {
        // Handle brands - delete all and re-insert
        await supabase.from('brands').delete().neq('id', '');
        if (data.length > 0) {
          await supabase.from('brands').insert(data);
        }
      } else if (['hero', 'contact', 'logo', 'about'].includes(section)) {
        // Handle site_content sections - upsert
        await supabase
          .from('site_content')
          .upsert({ section, data }, { onConflict: 'section' });
      }
    } catch (error) {
      console.error(`Error updating ${section}:`, error);
      // Revert local state on error
      await fetchAllData();
    }
  };

  const resetContent = async () => {
    try {
      // Reset all tables to defaults
      await supabase.from('products').delete().neq('id', '');
      await supabase.from('categories').delete().neq('id', '');
      await supabase.from('brands').delete().neq('id', '');
      
      // Reset site_content
      await supabase.from('site_content').upsert([
        { section: 'hero', data: defaultContent.hero },
        { section: 'contact', data: defaultContent.contact },
        { section: 'logo', data: defaultContent.logo },
        { section: 'about', data: defaultContent.about }
      ], { onConflict: 'section' });

      // Insert defaults
      await supabase.from('products').insert(INITIAL_PRODUCTS);
      await supabase.from('categories').insert(DEFAULT_CATEGORIES);
      await supabase.from('brands').insert(BRANDS);

      // Refresh data
      await fetchAllData();
    } catch (error) {
      console.error('Error resetting content:', error);
    }
  };

  return (
    <ContentContext.Provider value={{ content, loading, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within a ContentProvider");
  return context;
};