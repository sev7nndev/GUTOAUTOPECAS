import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const FloatingWhatsApp: React.FC = () => {
  const { content } = useContent();
  const [showTooltip, setShowTooltip] = useState(false);

  const message = `Olá! Vim pelo site da Guto Auto Peças e gostaria de:
%0A• Solicitar um orçamento
%0A• Verificar disponibilidade de peças
%0A• Tirar uma dúvida`;

  // Remove all non-numeric characters and add Brazil country code
  const phoneNumber = content.contact.whatsapp.replace(/\D/g, '');
  const formattedPhone = phoneNumber.startsWith('55') ? phoneNumber : `55${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a 
        href={`https://wa.me/${formattedPhone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        <div className={`bg-white text-black px-4 py-2 rounded-lg text-sm font-bold shadow-xl border border-gray-200 transition-all duration-300 ${showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} hidden md:block`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Fale conosco no WhatsApp!</span>
          </div>
        </div>

        {/* Button */}
        <div className="relative">
          {/* Pulse animation */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
          
          {/* Online badge */}
          <div className="absolute -top-1 -right-1 z-10">
            <span className="flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
            </span>
          </div>

          {/* Main button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-2xl shadow-green-900/50 hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 cursor-pointer">
            <MessageCircle className="w-9 h-9 text-white fill-white animate-pulse" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;