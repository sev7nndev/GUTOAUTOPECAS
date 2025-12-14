import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Silva",
    avatar: "https://ui-avatars.com/api/?name=Carlos+Silva&background=DC2626&color=fff&size=128",
    rating: 5,
    comment: "Atendimento excepcional! Encontrei a peça que precisava para meu Gol e ainda recebi orientação técnica. Preço justo e entrega rápida. Recomendo!",
    date: "Há 2 semanas",
    service: "Kit de Embreagem"
  },
  {
    id: 2,
    name: "Maria Santos",
    avatar: "https://ui-avatars.com/api/?name=Maria+Santos&background=DC2626&color=fff&size=128",
    rating: 5,
    comment: "Já sou cliente há anos. Sempre encontro o que preciso e a equipe é muito atenciosa. Melhor custo-benefício da região!",
    date: "Há 1 mês",
    service: "Pastilhas de Freio"
  },
  {
    id: 3,
    name: "João Pedro",
    avatar: "https://ui-avatars.com/api/?name=Joao+Pedro&background=DC2626&color=fff&size=128",
    rating: 5,
    comment: "Precisava de uma peça urgente para meu HB20. Eles tinham em estoque e me atenderam super rápido. Salvaram meu dia!",
    date: "Há 3 dias",
    service: "Correia Dentada"
  },
  {
    id: 4,
    name: "Ana Paula",
    avatar: "https://ui-avatars.com/api/?name=Ana+Paula&background=DC2626&color=fff&size=128",
    rating: 5,
    comment: "Excelente variedade de peças tanto nacionais quanto importadas. Preços competitivos e atendimento nota 10!",
    date: "Há 1 semana",
    service: "Bateria Moura"
  },
  {
    id: 5,
    name: "Roberto Lima",
    avatar: "https://ui-avatars.com/api/?name=Roberto+Lima&background=DC2626&color=fff&size=128",
    rating: 5,
    comment: "Compro aqui há mais de 10 anos. Confiança total! Peças originais, garantia e um atendimento que faz diferença.",
    date: "Há 2 dias",
    service: "Amortecedores"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-red font-bold text-sm uppercase tracking-wider mb-2">
            Depoimentos
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            O Que Nossos <span className="text-brand-red">Clientes</span> Dizem
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A confiança dos nossos clientes é o nosso maior patrimônio
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 bg-brand-red rounded-full p-4 shadow-lg">
              <Quote className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <div className="mt-4">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {renderStars(currentTestimonial.rating)}
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed mb-8 min-h-[120px]">
                "{currentTestimonial.comment}"
              </p>

              {/* Author Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full border-4 border-brand-red shadow-lg"
                />
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {currentTestimonial.service} • {currentTestimonial.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white transition-all duration-300 group"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-brand-red'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white transition-all duration-300 group"
                aria-label="Próximo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-black text-brand-red mb-1">500+</div>
              <div className="text-sm text-gray-600">Clientes Satisfeitos</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-black text-brand-red mb-1">20+</div>
              <div className="text-sm text-gray-600">Anos de Experiência</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-black text-brand-red mb-1">98%</div>
              <div className="text-sm text-gray-600">Recomendação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
