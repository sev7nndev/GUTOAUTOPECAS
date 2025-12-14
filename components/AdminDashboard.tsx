import React, { useState, useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import { Save, RefreshCw, LogOut, Layout, Phone, Image, Upload, XCircle, Check, Loader2, Camera, Plus, Trash2, Box, Edit, Search, Layers, Mail, Eye, Clock } from 'lucide-react';
import { Product, Category, Lead } from '../types';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  onLogout: () => void;
}

const CATEGORIES_OPTIONS = ['Freios', 'Suspensão', 'Motor', 'Óleos & Fluidos', 'Elétrica', 'Arrefecimento', 'Outros'];

// --- Image Compression Utility ---
// Compresses image to specific max width (default 800px) and 0.8 quality
const compressImage = async (file: File, maxWidth: number = 800): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                if (width > maxWidth) {
                    height = Math.round(height * (maxWidth / width));
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.8));
                } else {
                    reject(new Error("Canvas context failed"));
                }
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { content, updateContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState<'hero' | 'contact' | 'brands' | 'logo' | 'gallery' | 'inventory' | 'categories' | 'leads'>('inventory');
  
  // Local State for Form Fields
  const [tempHero, setTempHero] = useState(content.hero);
  const [tempContact, setTempContact] = useState(content.contact);
  const [tempBrands, setTempBrands] = useState(JSON.stringify(content.brands, null, 2));
  const [tempLogo, setTempLogo] = useState(content.logo || { url: '' });
  const [tempGallery, setTempGallery] = useState<string[]>(content.about?.images || []);
  const [tempCategories, setTempCategories] = useState<Category[]>(content.categories || []);
  
  // Inventory State
  const [products, setProducts] = useState<Product[]>(content.products || []);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  
  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // --- Synchronization Effect ---
  // Ensures admin panel has latest data even if Context updates late or changes
  useEffect(() => {
    setTempHero(content.hero);
    setTempContact(content.contact);
    setTempBrands(JSON.stringify(content.brands, null, 2));
    setTempLogo(content.logo || { url: '' });
    setTempGallery(content.about?.images || []);
    setProducts(content.products || []);
    setTempCategories(content.categories || []);
  }, [content]);

  // --- Fetch Leads from Supabase ---
  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoadingLeads(false);
    }
  };

  // Fetch leads when Leads tab is active
  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchLeads, 30000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // --- Handlers ---

  const handleSave = async () => {
    setSaveStatus('saving');

    try {
        const parsedBrands = JSON.parse(tempBrands);

        // Update all sections - await all promises
        await Promise.all([
          updateContent('hero', tempHero),
          updateContent('contact', tempContact),
          updateContent('logo', tempLogo),
          updateContent('brands', parsedBrands),
          updateContent('about', { images: tempGallery }),
          updateContent('products', products),
          updateContent('categories', tempCategories)
        ]);
        
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);

    } catch (e) {
        setSaveStatus('idle');
        alert("Erro ao salvar. Verifique o console e a sintaxe JSON das marcas.");
        console.error("Save error:", e);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 800);
        setTempLogo({ url: compressedBase64 });
      } catch (error) {
        alert("Erro ao processar imagem");
      }
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 1200);
        setTempGallery([...tempGallery, compressedBase64]);
      } catch (error) {
        alert("Erro ao processar imagem");
      }
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Use higher resolution for hero image (1920px width)
        const compressedBase64 = await compressImage(file, 1920);
        setTempHero({ ...tempHero, bgImage: compressedBase64 });
      } catch (error) {
        alert("Erro ao processar imagem do banner");
      }
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = tempGallery.filter((_, i) => i !== index);
    setTempGallery(newGallery);
  };

  // Category Handlers
  const handleCategoryNameChange = (id: string, newName: string) => {
    setTempCategories(tempCategories.map(c => c.id === id ? { ...c, name: newName } : c));
  };

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 800);
        setTempCategories(tempCategories.map(c => c.id === id ? { ...c, image: compressedBase64 } : c));
      } catch (error) {
        alert("Erro ao processar imagem");
      }
    }
  };

  // Inventory Handlers
  const handleOpenProductModal = (product?: Product) => {
    if (product) {
        setEditingProduct(product);
    } else {
        setEditingProduct({
            id: crypto.randomUUID(),
            name: '',
            brand: '',
            category: 'Freios',
            price: '',
            image: '',
            description: '',
            inStock: true
        });
    }
    setIsProductModalOpen(true);
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && editingProduct) {
          try {
              const compressedBase64 = await compressImage(file, 800);
              setEditingProduct({ ...editingProduct, image: compressedBase64 });
          } catch (error) {
              alert("Erro ao processar imagem");
          }
      }
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    
    try {
      // Check if editing or creating new
      const isEditing = products.some(p => p.id === editingProduct.id);
      
      if (isEditing) {
        // Update existing product in Supabase
        const { error } = await supabase
          .from('products')
          .update({
            name: editingProduct.name,
            category: editingProduct.category,
            brand: editingProduct.brand,
            price: editingProduct.price,
            image: editingProduct.image,
            description: editingProduct.description,
            in_stock: editingProduct.inStock
          })
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        
        // Update local state
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      } else {
        // Insert new product in Supabase
        const { error } = await supabase
          .from('products')
          .insert({
            id: editingProduct.id,
            name: editingProduct.name,
            category: editingProduct.category,
            brand: editingProduct.brand,
            price: editingProduct.price,
            image: editingProduct.image,
            description: editingProduct.description,
            in_stock: editingProduct.inStock
          });
        
        if (error) throw error;
        
        // Update local state
        setProducts([...products, editingProduct]);
      }
      
      // Also update ContentContext
      await updateContent('products', isEditing 
        ? products.map(p => p.id === editingProduct.id ? editingProduct : p)
        : [...products, editingProduct]
      );
      
      setIsProductModalOpen(false);
      setEditingProduct(null);
      alert('Produto salvo com sucesso!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erro ao salvar produto. Tente novamente.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      const newProducts = products.filter(p => p.id !== id);
      setProducts(newProducts);
      
      // Update ContentContext
      await updateContent('products', newProducts);
      
      alert('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erro ao excluir produto. Tente novamente.');
    }
  };

  // --- Leads Handlers ---
  const handleMarkAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ read: true })
        .eq('id', id);
      
      if (error) throw error;
      setLeads(leads.map(l => l.id === id ? { ...l, read: true } : l));
    } catch (error) {
      console.error('Error marking lead as read:', error);
      alert('Erro ao marcar como lido');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este lead?')) return;
    
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setLeads(leads.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Erro ao excluir lead');
    }
  };

  const filteredInventory = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Admin Header */}
      <header className="bg-brand-charcoal border-b border-white/10 p-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <h1 className="text-xl font-bold font-heading">Painel Administrativo</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all shadow-lg 
                ${saveStatus === 'saved' 
                  ? 'bg-green-600 hover:bg-green-700 shadow-green-900/20' 
                  : 'bg-brand-red hover:bg-red-600 shadow-red-900/20'
                }
                ${saveStatus === 'saving' ? 'opacity-80 cursor-wait' : ''}
              `}
            >
              {saveStatus === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
              {saveStatus === 'saved' && <Check className="w-4 h-4" />}
              {saveStatus === 'idle' && <Save className="w-4 h-4" />}
              
              {saveStatus === 'saving' ? 'Salvando...' : saveStatus === 'saved' ? 'Salvo!' : 'Salvar Tudo'}
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
           <button 
             onClick={() => setActiveTab('inventory')}
             className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-brand-red text-white shadow-lg shadow-red-900/20 border border-transparent' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
           >
             <Box className="w-5 h-5" /> Estoque (Produtos)
           </button>
           <button 
             onClick={() => setActiveTab('leads')}
             className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl transition-all ${activeTab === 'leads' ? 'bg-brand-red text-white shadow-lg shadow-red-900/20 border border-transparent' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
           >
             <div className="flex items-center gap-3">
               <Mail className="w-5 h-5" /> Leads (Contatos)
             </div>
             {leads.filter(l => !l.read).length > 0 && (
               <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                 {leads.filter(l => !l.read).length}
               </span>
             )}
           </button>
           <button 
             onClick={() => setActiveTab('categories')}
             className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'categories' ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
           >
             <Layers className="w-5 h-5" /> Categorias (Fotos)
           </button>
           <button 
             onClick={() => setActiveTab('hero')}
             className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'hero' ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:bg-white/5'}`}
           >
             <Layout className="w-5 h-5" /> Hero & Banner
           </button>
           <button 
             onClick={() => setActiveTab('logo')}
             className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'logo' ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:bg-white/5'}`}
           >
             <Upload className="w-5 h-5" /> Logo & Identidade
           </button>
           <button 
             onClick={() => setActiveTab('gallery')}
             className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'gallery' ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:bg-white/5'}`}
           >
             <Camera className="w-5 h-5" /> Galeria (Sobre)
           </button>
           <button 
             onClick={() => setActiveTab('contact')}
             className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'contact' ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:bg-white/5'}`}
           >
             <Phone className="w-5 h-5" /> Contatos & Links
           </button>
           <button 
             onClick={() => setActiveTab('brands')}
             className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'brands' ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:bg-white/5'}`}
           >
             <Image className="w-5 h-5" /> Marcas (Logos)
           </button>
           
           <div className="pt-8 mt-8 border-t border-white/10">
              <button 
                onClick={() => {
                    if(confirm("Tem certeza? Isso apagará todas as suas edições.")) {
                        resetContent();
                        window.location.reload();
                    }
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <RefreshCw className="w-5 h-5" /> Restaurar Padrões
              </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-brand-charcoal border border-white/5 rounded-2xl p-8 shadow-xl relative min-h-[600px]">
           
           {activeTab === 'inventory' && (
             <div className="space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Box className="text-brand-red"/> Gestão de Estoque</h2>
                    <button 
                        onClick={() => handleOpenProductModal()}
                        className="bg-brand-red hover:bg-red-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm"
                    >
                        <Plus className="w-4 h-4" /> Novo Produto
                    </button>
                </div>

                {/* Search in Inventory */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Filtrar por nome ou marca..." 
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-red outline-none"
                    />
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredInventory.map(product => (
                        <div key={product.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-white">{product.name}</h3>
                                <div className="text-sm text-gray-400 flex gap-3">
                                    <span className="text-brand-red">{product.category}</span>
                                    <span>•</span>
                                    <span>{product.brand}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{product.price}</div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleOpenProductModal(product)}
                                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredInventory.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            Nenhum produto encontrado.
                        </div>
                    )}
                </div>
             </div>
           )}

           {activeTab === 'leads' && (
             <div className="space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Mail className="text-brand-red"/> Leads de Contato</h2>
                    <button 
                        onClick={fetchLeads}
                        disabled={loadingLeads}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${loadingLeads ? 'animate-spin' : ''}`} />
                        Atualizar
                    </button>
                </div>

                {loadingLeads ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
                    </div>
                ) : leads.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <Mail className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>Nenhum lead recebido ainda.</p>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {leads.map(lead => (
                            <div 
                                key={lead.id} 
                                className={`bg-white/5 border rounded-xl p-5 transition-all ${
                                    lead.read ? 'border-white/5' : 'border-brand-red/30 bg-brand-red/5'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-white text-lg">{lead.name}</h3>
                                            {!lead.read && (
                                                <span className="bg-brand-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                    NOVO
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-3 h-3" />
                                                {lead.phone}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                {lead.email}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(lead.created_at).toLocaleString('pt-BR')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {!lead.read && (
                                            <button 
                                                onClick={() => handleMarkAsRead(lead.id)}
                                                className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                                                title="Marcar como lido"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDeleteLead(lead.id)}
                                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                            title="Excluir lead"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-black/30 rounded-lg p-3 mt-3">
                                    <p className="text-sm text-gray-300 leading-relaxed">{lead.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
             </div>
           )}

           {activeTab === 'categories' && (
             <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Layers className="text-brand-red"/> Editar Categorias (Fotos)</h2>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                    <p className="text-sm text-yellow-500">Altere a imagem de fundo e o nome das categorias que aparecem na página inicial.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {tempCategories.map((cat) => (
                      <div key={cat.id} className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-4">
                         {/* Image Preview */}
                         <div className="relative h-32 w-full rounded-lg overflow-hidden border border-white/5 group">
                             <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <label className="cursor-pointer bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                                    <Upload className="w-4 h-4" /> Trocar Foto
                                    <input type="file" accept="image/*" onChange={(e) => handleCategoryImageUpload(e, cat.id)} className="hidden" />
                                </label>
                             </div>
                         </div>
                         
                         <div className="space-y-2">
                             <label className="text-xs font-bold text-gray-500 uppercase">Nome da Categoria</label>
                             <input 
                                type="text" 
                                value={cat.name} 
                                onChange={(e) => handleCategoryNameChange(cat.id, e.target.value)} 
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-brand-red outline-none text-sm font-bold"
                             />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* Other Tabs */}
           {activeTab === 'logo' && (
             <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Upload className="text-brand-red"/> Logo do Site</h2>
                <div className="p-6 border-2 border-dashed border-white/20 rounded-xl bg-black/20 text-center">
                    {tempLogo.url ? (
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-800 p-4 rounded-lg mb-4">
                                <img src={tempLogo.url} alt="Logo Preview" className="h-20 object-contain" />
                            </div>
                            <button onClick={() => setTempLogo({ url: '' })} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-bold">
                                <XCircle className="w-4 h-4" /> Remover Logo
                            </button>
                        </div>
                    ) : (
                        <div className="py-8"><p className="text-gray-400 mb-4">Logo padrão sendo usada.</p></div>
                    )}
                    <div className="mt-6 relative">
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <button className="pointer-events-none bg-white/10 text-white px-6 py-2 rounded-lg font-bold">
                            {tempLogo.url ? 'Trocar Imagem' : 'Anexar Imagem'}
                        </button>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">A imagem será otimizada automaticamente para não pesar no site.</p>
             </div>
           )}

           {activeTab === 'gallery' && (
             <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Camera className="text-brand-red"/> Galeria (Seção Sobre)</h2>
                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-4 border border-dashed border-white/20 rounded-xl bg-black/20">
                      <div className="relative">
                          <input type="file" accept="image/*" onChange={handleGalleryUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          <button className="bg-brand-red hover:bg-red-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors pointer-events-none">
                              <Plus className="w-5 h-5" /> Anexar Foto
                          </button>
                      </div>
                      <span className="text-gray-500 text-sm">Selecione uma foto para adicionar ao carrossel.</span>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {tempGallery.map((img, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/50">
                           <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button onClick={() => handleRemoveGalleryImage(idx)} className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition-transform transform hover:scale-110"><Trash2 className="w-5 h-5" /></button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'hero' && (
             <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Layout className="text-brand-red"/> Editar Hero Section</h2>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Badge</label>
                   <input type="text" value={tempHero.badge} onChange={(e) => setTempHero({...tempHero, badge: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase">Título Linha 1</label><input type="text" value={tempHero.titleLine1} onChange={(e) => setTempHero({...tempHero, titleLine1: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase">Título Linha 2</label><input type="text" value={tempHero.titleLine2} onChange={(e) => setTempHero({...tempHero, titleLine2: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase">Subtítulo</label><textarea rows={5} value={tempHero.subtitle} onChange={(e) => setTempHero({...tempHero, subtitle: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" /></div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Imagem de Fundo (Banner Principal)</label>
                    
                    {/* Preview */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10 group bg-black/50">
                        {tempHero.bgImage && (
                            <img src={tempHero.bgImage} alt="Hero Background Preview" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <label className="cursor-pointer bg-brand-red hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-all transform hover:scale-105">
                                <Upload className="w-5 h-5" />
                                Trocar Imagem
                                <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="hidden" />
                            </label>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex-grow h-[1px] bg-white/10"></div>
                        <span className="text-xs text-gray-500 font-bold">OU USAR URL</span>
                        <div className="flex-grow h-[1px] bg-white/10"></div>
                    </div>

                    <input type="text" value={tempHero.bgImage} onChange={(e) => setTempHero({...tempHero, bgImage: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none placeholder-gray-600 text-sm" placeholder="https://..." />
                </div>
             </div>
           )}

           {activeTab === 'contact' && (
             <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Phone className="text-brand-red"/> Editar Contatos & Topo</h2>
                
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl mb-6 space-y-4">
                   <h3 className="text-sm font-bold text-gray-400 uppercase">Barra do Topo (Header)</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Horário de Funcionamento</label>
                        <input type="text" value={tempContact.openingHours} onChange={(e) => setTempContact({...tempContact, openingHours: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Frase de Destaque (Garantia)</label>
                        <input type="text" value={tempContact.topBarInfo} onChange={(e) => setTempContact({...tempContact, topBarInfo: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase">WhatsApp</label><input type="text" value={tempContact.whatsapp} onChange={(e) => setTempContact({...tempContact, whatsapp: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase">Tel Nacional</label><input type="text" value={tempContact.phoneNacional} onChange={(e) => setTempContact({...tempContact, phoneNacional: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase">Tel Imports</label><input type="text" value={tempContact.phoneImports} onChange={(e) => setTempContact({...tempContact, phoneImports: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase">Endereço Nacional (Bento Ribeiro)</label><input type="text" value={tempContact.address1} onChange={(e) => setTempContact({...tempContact, address1: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase">Endereço Imports (Rocha Miranda)</label><input type="text" value={tempContact.address2} onChange={(e) => setTempContact({...tempContact, address2: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" /></div>
                </div>
             </div>
           )}

           {activeTab === 'brands' && (
             <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Image className="text-brand-red"/> Editar Marcas</h2>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-4"><p className="text-sm text-yellow-500">Edite o JSON abaixo para adicionar/remover marcas.</p></div>
                <textarea rows={15} value={tempBrands} onChange={(e) => setTempBrands(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-4 font-mono text-xs text-green-400 focus:border-brand-red outline-none leading-relaxed" />
             </div>
           )}

        </div>
      </div>

      {/* Product Edit/Create Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-brand-charcoal border border-white/20 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">
                        {products.some(p => p.id === editingProduct.id) ? 'Editar Produto' : 'Novo Produto'}
                    </h3>
                    <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-white">
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Nome do Produto</label>
                        <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" placeholder="Ex: Pastilha Gol" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Categoria</label>
                            <select value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none appearance-none">
                                {CATEGORIES_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Marca</label>
                            <input type="text" value={editingProduct.brand} onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" placeholder="Ex: Bosch" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Preço (Texto)</label>
                            <input type="text" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" placeholder="R$ 100,00 ou Sob Consulta" />
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <input 
                                type="checkbox" 
                                id="inStock"
                                checked={editingProduct.inStock} 
                                onChange={(e) => setEditingProduct({...editingProduct, inStock: e.target.checked})} 
                                className="w-5 h-5 accent-brand-red" 
                            />
                            <label htmlFor="inStock" className="text-sm font-bold text-white cursor-pointer">Em Estoque</label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Imagem do Produto</label>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-grow">
                                <input type="file" accept="image/*" onChange={handleProductImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <div className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-gray-400 flex items-center justify-between">
                                    <span className="text-sm truncate">{editingProduct.image ? 'Imagem selecionada' : 'Escolher arquivo...'}</span>
                                    <Upload className="w-4 h-4" />
                                </div>
                            </div>
                            {editingProduct.image && (
                                <img src={editingProduct.image} alt="Preview" className="w-10 h-10 object-cover rounded border border-white/20" />
                            )}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1">
                            A imagem será otimizada automaticamente.
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Descrição</label>
                        <textarea rows={3} value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red outline-none" placeholder="Detalhes técnicos..." />
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
                    <button onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                    <button onClick={handleSaveProduct} className="bg-brand-red hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold">Salvar Produto</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;