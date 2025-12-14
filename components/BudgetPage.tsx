import React, { useState } from 'react';
import { Send, ArrowLeft, CheckCircle, Loader2, CheckCircle2 } from 'lucide-react';

interface BudgetPageProps {
  onBack: () => void;
}

const BudgetPage: React.FC<BudgetPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carInfo: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-10 pb-20 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Voltar para Home
        </button>

        <div className="max-w-4xl mx-auto">
          {status === 'success' ? (
             <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-12 shadow-2xl text-center animate-fade-in-up">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4">Orçamento Recebido!</h2>
                <p className="text-gray-400 text-lg max-w-lg mx-auto mb-8">
                  Recebemos sua solicitação com sucesso. Nossa equipe técnica analisará a compatibilidade das peças e retornará em breve.
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={onBack} 
                    className="px-8 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-bold"
                  >
                    Voltar ao Início
                  </button>
                  <button 
                     onClick={() => {
                       setStatus('idle');
                       setFormData({ name: '', phone: '', email: '', carInfo: '', message: '' });
                     }}
                     className="px-8 py-3 rounded-xl bg-brand-red text-white hover:bg-red-600 transition-colors font-bold shadow-lg shadow-red-900/20"
                  >
                    Novo Pedido
                  </button>
                </div>
             </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red border border-brand-red/20 text-xs font-bold uppercase tracking-widest mb-4">
                   Orçamento Online
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Solicite seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-600">Orçamento</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Preencha o formulário abaixo com os detalhes das peças que você precisa. 
                  Nossa equipe de especialistas responderá com rapidez.
                </p>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-orange-500 to-brand-red"></div>
                 
                 <form onSubmit={handleSubmit}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                         <h3 className="text-2xl font-bold text-white mb-6">Seus Dados</h3>
                         <div className="space-y-5">
                            <div className="space-y-1">
                              <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nome Completo</label>
                              <input 
                                required
                                type="text" 
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all duration-300" 
                                placeholder="Ex: João da Silva" 
                              />
                            </div>
                            
                            <div className="space-y-1">
                               <label htmlFor="phone" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Telefone / WhatsApp</label>
                               <input 
                                 required
                                 type="tel" 
                                 id="phone" 
                                 value={formData.phone}
                                 onChange={handlePhoneChange}
                                 className="w-full bg-black/40 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all duration-300" 
                                 placeholder="(21) 99999-9999" 
                               />
                            </div>

                            <div className="space-y-1">
                               <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">E-mail</label>
                               <input 
                                 required
                                 type="email" 
                                 id="email" 
                                 value={formData.email}
                                 onChange={handleChange}
                                 className="w-full bg-black/40 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all duration-300" 
                                 placeholder="joao@email.com" 
                               />
                            </div>
                         </div>
                      </div>

                      <div className="flex flex-col h-full">
                         <h3 className="text-2xl font-bold text-white mb-6">Dados do Pedido</h3>
                         <div className="space-y-5 flex-grow">
                            <div className="space-y-1">
                              <label htmlFor="carInfo" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Veículo (Modelo / Ano / Motor)</label>
                              <input 
                                required
                                type="text" 
                                id="carInfo"
                                value={formData.carInfo}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all duration-300" 
                                placeholder="Ex: Gol G5 1.0 2010" 
                              />
                            </div>

                            <div className="space-y-1 flex-grow">
                              <label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Peças Necessárias / Observações</label>
                              <textarea 
                                required
                                id="message" 
                                rows={6} 
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full h-full min-h-[160px] bg-black/40 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all duration-300 resize-none" 
                                placeholder="Descreva as peças que você precisa..."
                              ></textarea>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Atendimento especializado</span>
                         </div>
                         <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Peças originais e importadas</span>
                         </div>
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className="w-full md:w-auto px-12 bg-gradient-to-r from-brand-red to-brand-darkRed hover:from-red-600 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/30 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-red-900/50 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                         {status === 'loading' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Enviar Solicitação
                          </>
                        )}
                      </button>
                   </div>
                 </form>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;