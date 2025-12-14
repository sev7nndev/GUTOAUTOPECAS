import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] relative z-10 overflow-hidden">
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div className="max-w-2xl">
              <span className="text-brand-red font-bold tracking-widest uppercase text-xs mb-2 block">Diferenciais Guto</span>
              <h2 className="text-3xl md:text-5xl font-black text-white">
                Por que somos a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-600">Referência?</span>
              </h2>
           </div>
           <p className="text-gray-400 max-w-sm text-sm md:text-base border-l border-gray-800 pl-4">
             Não entregamos apenas peças, entregamos a segurança e a performance que seu carro precisa para rodar tranquilo.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] hover:border-brand-red/30 hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="w-16 h-16 bg-black rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(217,4,41,0.2)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-red/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <feature.icon className="w-8 h-8 text-white relative z-10" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;