import React from 'react';
import { Phone, Clock, ShieldCheck } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const TopBar: React.FC = () => {
  const { content } = useContent();
  
  return (
    <div className="bg-brand-charcoal text-gray-300 text-[10px] sm:text-xs font-medium py-2.5 px-4 border-b border-white/10 tracking-wide">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
             <Clock className="w-3 h-3 text-brand-red" />
             <span className="text-gray-300">{content.contact.openingHours}</span>
          </span>
          <span className="hidden lg:flex items-center gap-2">
             <ShieldCheck className="w-3 h-3 text-brand-red" />
             <span>{content.contact.topBarInfo}</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a href={`tel:${content.contact.phoneNacional.replace(/\D/g,'')}`} className="flex items-center gap-2 hover:text-white transition-colors group">
            <Phone className="w-3 h-3 text-brand-red group-hover:animate-pulse" />
            <span className="font-bold text-gray-200 group-hover:text-white uppercase">Nacional:</span> {content.contact.phoneNacional}
          </a>
          <div className="w-px h-3 bg-white/20 hidden md:block"></div>
          <a href={`tel:${content.contact.phoneImports.replace(/\D/g,'')}`} className="flex items-center gap-2 hover:text-white transition-colors group">
            <Phone className="w-3 h-3 text-brand-red group-hover:animate-pulse" />
            <span className="font-bold text-gray-200 group-hover:text-white uppercase">Imports:</span> {content.contact.phoneImports}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;