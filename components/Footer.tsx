import React from 'react';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail, ChevronRight, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '../contexts/ContentContext';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = React.memo(({ onAdminClick }) => {
  const { content } = useContent();

  return (
    <footer className="bg-[#050505] text-white border-t border-gray-900 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
             <a href="#" className="inline-block">
                {content.logo && content.logo.url ? (
                  <img src={content.logo.url} alt="Logo Guto Auto Peças" className="h-48 w-auto object-contain" loading="lazy" />
                ) : (
                  <Logo className="h-32 w-auto" />
                )}
             </a>
             <p className="text-gray-500 text-sm leading-relaxed">
               Desde 1999, sua referência em peças nacionais e importadas no Rio de Janeiro. Qualidade, confiança e preço justo em um só lugar.
             </p>
             <div className="flex gap-4 pt-2">
                <a href="https://www.facebook.com/gutoautopecas" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group">
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#FD1D1D] hover:to-[#833AB4] hover:text-white transition-all duration-300 group">
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href={`https://wa.me/${content.contact.whatsapp}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300 group">
                  <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
             </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
             <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <span className="w-1 h-6 bg-brand-red rounded-full"></span>
               Navegação
             </h4>
             <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="flex items-center gap-2 hover:text-brand-red transition-colors group"><ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-brand-red" /> Início</a></li>
                <li><a href="#sobre" className="flex items-center gap-2 hover:text-brand-red transition-colors group"><ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-brand-red" /> A Empresa</a></li>
                <li><a href="#marcas" className="flex items-center gap-2 hover:text-brand-red transition-colors group"><ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-brand-red" /> Marcas</a></li>
                <li><a href="#contato" className="flex items-center gap-2 hover:text-brand-red transition-colors group"><ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-brand-red" /> Fale Conosco</a></li>
             </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
             <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <span className="w-1 h-6 bg-brand-red rounded-full"></span>
               Contato
             </h4>
             <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                   <span>
                     <strong>Bento Ribeiro:</strong> {content.contact.address1 || "Rua Picuí, 869"}<br/>
                     <strong>Rocha Miranda:</strong> {content.contact.address2 || "Largo do Sapê, 75"}
                   </span>
                </li>
                <li className="flex items-center gap-3">
                   <Phone className="w-5 h-5 text-brand-red flex-shrink-0" />
                   <div className="flex flex-col">
                     <span>{content.contact.phoneNacional}</span>
                     <span>{content.contact.phoneImports}</span>
                   </div>
                </li>
                <li className="flex items-center gap-3">
                   <Mail className="w-5 h-5 text-brand-red flex-shrink-0" />
                   <span>contato@gutoautopecas.com.br</span>
                </li>
             </ul>
          </div>

          {/* Facebook Widget */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Facebook className="w-5 h-5 text-[#1877F2]" />
              <h4 className="font-bold text-white">
               Facebook
              </h4>
            </div>
            <div className="rounded-lg overflow-hidden">
              <iframe 
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fgutoautopecas&tabs=timeline&width=340&height=250&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                  width="100%" 
                  height="250" 
                  style={{border:'none', overflow:'hidden'}} 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Facebook Page Preview"
              ></iframe>
             </div>
          </div>

        </div>
        
        {/* Footer Bottom Line */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
             <p>© {new Date().getFullYear()} Guto Auto Peças. Todos os direitos reservados.</p>
             <button onClick={onAdminClick} className="flex items-center gap-1 hover:text-brand-red transition-colors opacity-50 hover:opacity-100">
               <Lock className="w-3 h-3" /> Área Restrita
             </button>
          </div>
          {/* Right side is now empty to accommodate Floating WhatsApp */}
          <div className="w-10"></div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;