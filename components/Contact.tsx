import React, { useState } from 'react';
import { BRANCHES } from '../constants';
import { MapPin, Send, ExternalLink, Loader2, CheckCircle2, Phone, Clock, XCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Insert lead into Supabase
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message
        }]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Error saving lead:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Erro ao enviar mensagem. Tente novamente.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const getDynamicAddress = (index: number) => {
    if (index === 0) return content.contact.address1 || BRANCHES[0].info.address + " - " + BRANCHES[0].info.neighborhood;
    if (index === 1) return content.contact.address2 || BRANCHES[1].info.address + " - " + BRANCHES[1].info.neighborhood;
    return "";
  };

  const getMapUrl = (index: number) => {
    const address = getDynamicAddress(index);
    const query = encodeURIComponent(`${address}, Rio de Janeiro - RJ`);
    // Added dark mode parameter to map styling if supported, though iframe content styling is limited by Google
    return `https://maps.google.com/maps?q=${query}&t=m&z=16&output=embed&iwloc=near`;
  };

  return (
    <section id="contato" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Decorative Background Mesh */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 text-brand-red border border-brand-red/20 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            Estamos Perto de Você
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Nossas <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-600">Unidades</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Visite nossas lojas ou entre em contato online. Peças nacionais e importadas com a qualidade que você confia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Form Area - Dark Glass Card */}
           <div className="lg:col-span-5 bg-[#111] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative group h-full hover:border-brand-red/30 transition-colors duration-500">
             
             {status === 'success' ? (
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center py-20 animate-fade-in-up">
                  <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Mensagem Enviada!</h3>
                  <p className="text-gray-400">Nossa equipe entrará em contato em breve.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors border border-white/10"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
             ) : status === 'error' ? (
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center py-20 animate-fade-in-up">
                  <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                    <XCircle className="w-12 h-12 text-red-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Erro ao Enviar</h3>
                  <p className="text-gray-400 mb-4">{errorMessage}</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors border border-white/10"
                  >
                    Tentar novamente
                  </button>
                </div>
             ) : (
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-brand-red/10 rounded-xl">
                        <Send className="w-6 h-6 text-brand-red" />
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-white">Fale Conosco</h4>
                        <p className="text-gray-400 text-sm">Orçamento rápido e sem compromisso.</p>
                    </div>
                  </div>
                  
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="group/input">
                      <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block group-focus-within/input:text-brand-red transition-colors">Nome Completo</label>
                      <input 
                        required
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all duration-300" 
                        placeholder="Ex: João da Silva" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group/input">
                        <label htmlFor="phone" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block group-focus-within/input:text-brand-red transition-colors">Telefone</label>
                        <input 
                          required
                          type="tel" 
                          id="phone" 
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          maxLength={15}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all duration-300" 
                          placeholder="(21) ..." 
                        />
                      </div>
                      <div className="group/input">
                        <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block group-focus-within/input:text-brand-red transition-colors">E-mail</label>
                        <input 
                          required
                          type="email" 
                          id="email" 
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all duration-300" 
                          placeholder="@email.com" 
                        />
                      </div>
                    </div>

                    <div className="group/input">
                      <label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block group-focus-within/input:text-brand-red transition-colors">Mensagem</label>
                      <textarea 
                        required
                        id="message" 
                        rows={4} 
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all duration-300 resize-none" 
                        placeholder="Olá, gostaria de saber se tem a peça..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="w-full bg-gradient-to-r from-brand-red to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-[0_10px_30px_-10px_rgba(217,4,41,0.5)] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(217,4,41,0.6)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          Enviar Solicitação
                        </>
                      )}
                    </button>
                  </form>
               </div>
             )}
          </div>

          {/* Locations Area - Redesigned Cards */}
          <div className="lg:col-span-7 space-y-6">
            {BRANCHES.map((branch, idx) => (
              <div key={idx} className="bg-[#111] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto min-h-[340px] border border-white/10 hover:border-white/20 transition-all duration-300 group">
                
                {/* Info Section */}
                <div className="p-8 md:w-5/12 flex flex-col justify-between relative bg-gradient-to-br from-[#151515] to-[#0a0a0a]">
                   {/* Decorative accent */}
                   <div className={`absolute top-0 left-0 w-1 h-full ${branch.type === 'Nacional' ? 'bg-gradient-to-b from-green-500 to-green-800' : 'bg-gradient-to-b from-blue-500 to-blue-800'}`}></div>
                   
                   <div>
                     <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 border ${branch.type === 'Nacional' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                          {branch.type}
                        </span>
                        <h5 className="text-2xl md:text-3xl font-black text-white leading-none">
                            {branch.name}
                        </h5>
                     </div>
                     
                     <div className="space-y-5">
                        <div className="flex items-start gap-3 group/item">
                          <div className="mt-1 p-1.5 rounded-full bg-white/5 text-gray-400 group-hover/item:text-brand-red group-hover/item:bg-brand-red/10 transition-colors">
                              <MapPin className="w-4 h-4" />
                          </div>
                          <p className="text-sm text-gray-300 font-medium leading-relaxed pt-1">
                            {getDynamicAddress(idx)}
                          </p>
                        </div>

                        <div className="flex items-start gap-3 group/item">
                            <div className="mt-1 p-1.5 rounded-full bg-white/5 text-gray-400 group-hover/item:text-green-400 group-hover/item:bg-green-400/10 transition-colors">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="text-sm text-gray-300 pt-1">
                                <p>Seg-Sex: 08:00 - 18:00</p>
                                <p className="text-gray-500">Sábado: 08:00 - 13:00</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 pl-10">
                          {branch.info.phone.map((ph, i) => (
                             <a href={`tel:${ph.replace(/\D/g, '')}`} key={i} className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                               <Phone className="w-3 h-3 text-brand-red opacity-50 group-hover/link:opacity-100" />
                               {ph}
                             </a>
                          ))}
                        </div>
                     </div>
                   </div>

                   <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getDynamicAddress(idx))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 flex items-center justify-center gap-2 w-full py-3.5 bg-white/5 hover:bg-brand-red hover:text-white text-white text-sm font-bold rounded-xl border border-white/10 hover:border-brand-red transition-all duration-300 group/btn shadow-lg"
                   >
                      <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Abrir no Google Maps
                   </a>
                </div>

                {/* Map Section */}
                <div className="md:w-7/12 min-h-[250px] relative bg-zinc-900 border-l border-white/5">
                    {/* Map Overlay to darken it slightly for theme consistency before interaction */}
                    <div className="absolute inset-0 bg-black/10 pointer-events-none z-10 mix-blend-multiply"></div>
                    <iframe 
                        src={getMapUrl(idx)} 
                        width="100%" 
                        height="100%" 
                        style={{border:0, filter: 'contrast(1.1) saturate(1.1)'}} 
                        allowFullScreen={true} 
                        loading="lazy"
                        title={`Mapa ${branch.name}`}
                        className="absolute inset-0 w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;