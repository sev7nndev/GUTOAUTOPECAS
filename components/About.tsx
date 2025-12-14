import React, { useState } from 'react';
import { Award, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const About: React.FC = () => {
  const { content } = useContent();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Safe fallback if images array is empty or undefined
  const images = content.about?.images?.length 
    ? content.about.images 
    : ["https://images.unsplash.com/photo-1599256621730-d3dc05368a7f?q=80&w=1000&auto=format&fit=crop"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="sobre" className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 order-2 lg:order-1 relative select-none">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group h-[500px]">
              <div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay z-10 pointer-events-none"></div>
              
              {/* Carousel Image */}
              <img 
                src={images[currentImageIndex]} 
                alt={`Interior da loja Guto Auto Peças - Foto ${currentImageIndex + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700"
                key={currentImageIndex} // Key forces re-render for animation if needed, or remove for smooth crossfade if using CSS
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-brand-red text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-brand-red text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-brand-red w-4' : 'bg-white/50 hover:bg-white'}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Floating Badge (Kept from original design) */}
              <div className="absolute bottom-8 right-8 bg-brand-red/90 backdrop-blur-md p-6 rounded-xl shadow-xl z-20 text-white max-w-[200px] border border-white/20 hidden sm:block">
                <p className="text-4xl font-black mb-1">24+</p>
                <p className="text-sm font-medium leading-tight opacity-90">Anos de liderança no mercado automotivo</p>
              </div>
            </div>
            
            {/* Decorative Element Behind */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-white/5 rounded-2xl -z-10 hidden lg:block"></div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-[1px] w-12 bg-brand-red"></div>
              <h2 className="text-brand-red font-bold uppercase tracking-widest text-xs">Quem Somos</h2>
            </div>
            
            <h3 className="text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
              A Excelência que seu <br />
              <span className="text-gray-500">veículo merece.</span>
            </h3>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-10">
              <p>
                A <strong>Guto Auto Peças</strong> não é apenas uma loja; é um marco de confiança fundado em 1999. Desde o primeiro dia, nossa obsessão tem sido garantir que cada motorista encontre exatamente o que precisa, sem dores de cabeça.
              </p>
              <p>
                Combinamos tradição com modernidade. Nossa equipe é treinada para entender de mecânica, não apenas de vendas, garantindo a solução técnica ideal para o seu problema.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Clock, label: "Agilidade", sub: "Entrega Rápida" },
                { icon: Award, label: "Garantia", sub: "Procedência" },
                { icon: Users, label: "Suporte", sub: "Especializado" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                  <item.icon className="w-6 h-6 text-brand-red mb-3" />
                  <h4 className="text-white font-bold">{item.label}</h4>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;