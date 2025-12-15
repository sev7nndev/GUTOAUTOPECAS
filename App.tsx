import React, { useState } from 'react';
import { ContentProvider, useContent } from './contexts/ContentContext';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Brands from './components/Brands';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BudgetPage from './components/BudgetPage';
import Categories from './components/Categories';
import CatalogPage from './components/CatalogPage';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminDashboard from './components/AdminDashboard';
import Testimonials from './components/Testimonials';
import { Lock, Loader2 } from 'lucide-react';

function AppContent() {
  const { loading } = useContent();
  const [currentPage, setCurrentPage] = useState<'home' | 'budget' | 'admin' | 'login' | 'catalog'>('home');
  const [catalogFilters, setCatalogFilters] = useState({ category: 'Todos', search: '' });
  const [password, setPassword] = useState('');

  const navigateTo = (page: string, params?: { category?: string, search?: string }) => {
    if (page === 'home') {
      setCurrentPage('home');
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    } else if (page === 'budget') {
      setCurrentPage('budget');
      window.scrollTo(0, 0);
    } else if (page === 'admin') {
      setCurrentPage('login'); // Force login check
    } else if (page === 'catalog') {
      if (params) {
        setCatalogFilters({
            category: params.category || 'Todos',
            search: params.search || ''
        });
      }
      setCurrentPage('catalog');
      window.scrollTo(0, 0);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hash the password using SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Compare with the hashed password (gutoadmin26)
    const correctHash = 'a20401f9b531b404c6decff28f3ba43b46458dd6925917353941d0eeea0cb573';
    
    if (hashHex === correctHash) {
      setCurrentPage('admin');
      setPassword(''); // Clear password from memory
    } else {
      alert('Senha incorreta');
      setPassword(''); // Clear password from memory
    }
  };

  // Show loading screen while fetching data from Supabase
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-brand-red animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Carregando...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-brand-charcoal border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
           <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center">
                 <Lock className="w-8 h-8 text-brand-red" />
              </div>
           </div>
           <h2 className="text-2xl font-bold text-white text-center mb-6">Acesso Administrativo</h2>
           <input 
             type="password" 
             placeholder="Digite a senha" 
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white mb-4 focus:border-brand-red outline-none"
             autoFocus
           />
           <button type="submit" className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors">
             Entrar
           </button>
           <button 
             type="button" 
             onClick={() => setCurrentPage('home')}
             className="w-full mt-4 text-gray-500 hover:text-white text-sm"
           >
             Voltar ao site
           </button>
        </form>
      </div>
    );
  }

  if (currentPage === 'admin') {
    return <AdminDashboard onLogout={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'catalog') {
    return (
        <div className="min-h-screen bg-white">
            <TopBar />
            <Navbar onNavigate={navigateTo} />
            <CatalogPage 
                initialCategory={catalogFilters.category} 
                initialSearch={catalogFilters.search}
                onBack={() => navigateTo('home')} 
            />
            <Footer onAdminClick={() => navigateTo('admin')} />
            <FloatingWhatsApp />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar onNavigate={navigateTo} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onSearch={(term) => navigateTo('catalog', { search: term })} />
            <Brands />
            <Categories onCategoryClick={(cat) => navigateTo('catalog', { category: cat })} />
            <Features />
            <About />
            <Testimonials />
            <Contact />
          </>
        ) : (
          <BudgetPage onBack={() => navigateTo('home')} />
        )}
      </main>
      
      <Footer onAdminClick={() => navigateTo('admin')} />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}