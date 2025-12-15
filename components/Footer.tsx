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
          <div className="lg:col-span-1 space-y-6 flex flex-col items-center lg:items-start">
             <a href="#" className="inline-block">
                {content.logo && content.logo.url ? (
                  <img src={content.logo.url} alt="Logo Guto Auto Peças" className="h-48 w-auto object-contain" loading="lazy" />
                ) : (
                  <Logo className="h-32 w-auto" />
                )}
             </a>
             <p className="text-gray-500 text-sm leading-relaxed text-center lg:text-left">
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

          {/* Facebook Card - Enhanced */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-[#1877F2]/30 transition-all duration-300 group/fb">
            {/* Facebook Header */}
            <div className="bg-gradient-to-r from-[#1877F2] to-[#1664d8] p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Facebook className="w-7 h-7 text-[#1877F2]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Guto Auto Peças</h4>
                  <p className="text-blue-100 text-xs">@gutoautopecas</p>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Preview Image */}
              <div className="relative rounded-lg overflow-hidden bg-gray-800 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Facebook className="w-12 h-12 text-gray-600 mx-auto" />
                    <p className="text-gray-500 text-sm font-medium">Siga nossa página</p>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                Acompanhe nossas novidades, promoções exclusivas e dicas automotivas!
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 py-3 border-t border-white/5">
                <div className="text-center">
                  <p className="text-white font-bold text-lg">20+</p>
                  <p className="text-gray-500 text-xs">Anos</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg">2</p>
                  <p className="text-gray-500 text-xs">Lojas</p>
                </div>
              </div>
              
              {/* CTA Button */}
              <a 
                href="https://www.facebook.com/gutoautopecas" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#1877F2] hover:bg-[#1664d8] text-white font-bold rounded-lg transition-all duration-300 group-hover/fb:scale-[1.02] shadow-lg"
              >
                <Facebook className="w-5 h-5" />
                Visitar Página
              </a>
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