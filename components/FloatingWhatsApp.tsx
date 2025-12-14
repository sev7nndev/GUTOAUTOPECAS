import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const FloatingWhatsApp: React.FC = () => {
  const { content } = useContent();

  return (
    <a 
      href={`https://wa.me/${content.contact.whatsapp}?text=Ol%C3%A1%2C%20estou%20no%20site%20da%20Guto%20Auto%20Pe%C3%A7as%20e%20gostaria%20de%20um%20or%C3%A7amento.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      <span className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0 hidden md:block">
        Fale conosco agora!
      </span>
      <div className="relative">
         <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
         <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-900/50 hover:bg-green-500 transition-colors duration-300">
            <MessageCircle className="w-8 h-8 text-white fill-white" />
         </div>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;