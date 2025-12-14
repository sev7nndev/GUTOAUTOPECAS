
import { Branch, Product } from './types';
import { Car, ShieldCheck, ThumbsUp, Wrench } from 'lucide-react';

export const BRANCHES: Branch[] = [
  {
    name: "Guto Nacional",
    type: "Nacional",
    info: {
      phone: ["(21) 3350-3305", "(21) 3264-8084", "(21) 97028-1814"],
      address: "Rua Picuí, 869",
      neighborhood: "Bento Ribeiro",
      city: "Rio de Janeiro - RJ",
      zip: "21550-400",
      mapLink: "https://maps.google.com/maps?q=Rua%20Picu%C3%AD%2C%20869%20-%20Bento%20Ribeiro%2C%20Rio%20de%20Janeiro%20-%20RJ&t=&z=17&ie=UTF8&iwloc=&output=embed"
    }
  },
  {
    name: "Guto Imports",
    type: "Imports",
    info: {
      phone: ["(21) 2450-3173", "(21) 4106-1254", "(21) 96491-2933"],
      address: "Largo do Sapê, 75",
      neighborhood: "Rocha Miranda",
      city: "Rio de Janeiro - RJ",
      zip: "21550-380",
      mapLink: "https://maps.google.com/maps?q=Largo%20do%20Sap%C3%AA%2C%2075%20-%20Rocha%20Miranda%2C%20Rio%20de%20Janeiro%20-%20RJ&t=&z=17&ie=UTF8&iwloc=&output=embed"
    }
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Kit Troca de Óleo 5w40 + Filtro",
    category: "Óleos & Fluidos",
    brand: "Castrol / Volkswagen",
    price: "R$ 189,90",
    image: "https://images.unsplash.com/photo-1579737153920-562a95c3b5d3?auto=format&fit=crop&q=80&w=600",
    description: "Kit ideal para linha VW (Gol, Fox, Voyage). Óleo sintético de alta performance.",
    inStock: true
  },
  {
    id: "2",
    name: "Amortecedor Dianteiro (Par)",
    category: "Suspensão",
    brand: "Cofap",
    price: "R$ 450,00",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600",
    description: "Compatível com Fiat Palio/Uno. O melhor para os buracos do Rio. Garantia de 2 anos.",
    inStock: true
  },
  {
    id: "3",
    name: "Pastilha de Freio Dianteira",
    category: "Freios",
    brand: "Cobreq / Bosch",
    price: "R$ 95,00",
    image: "https://images.unsplash.com/photo-1626438079634-1c6d1d4f232e?auto=format&fit=crop&q=80&w=600",
    description: "Jogo de pastilhas para Chevrolet Onix e Prisma. Segurança e durabilidade.",
    inStock: true
  },
  {
    id: "4",
    name: "Kit Correia Dentada + Tensor",
    category: "Motor",
    brand: "Continental",
    price: "R$ 220,00",
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=600",
    description: "Kit completo para Hyundai HB20 1.0. Essencial para evitar quebra do motor.",
    inStock: true
  },
  {
    id: "5",
    name: "Bateria 60Ah Livre Manutenção",
    category: "Elétrica",
    brand: "Moura",
    price: "R$ 480,00",
    image: "https://images.unsplash.com/photo-1456077366750-f8f870535384?auto=format&fit=crop&q=80&w=600",
    description: "A mais vendida do Brasil. 18 meses de garantia. Base de troca.",
    inStock: true
  },
  {
    id: "6",
    name: "Radiador de Água",
    category: "Arrefecimento",
    brand: "Visconde",
    price: "Sob Consulta",
    image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=600",
    description: "Radiador brasado para Gol G5/G6 com Ar Condicionado. Alta eficiência térmica.",
    inStock: true
  },
  {
    id: "7",
    name: "Jogo de Velas de Ignição",
    category: "Motor",
    brand: "NGK",
    price: "R$ 140,00",
    image: "https://images.unsplash.com/photo-1624515152504-74075b06060c?auto=format&fit=crop&q=80&w=600",
    description: "Jogo com 4 velas Iridium para Toyota Corolla. Melhora o consumo e arranque.",
    inStock: true
  },
  {
    id: "8",
    name: "Kit Embreagem Completo",
    category: "Motor",
    brand: "LUK",
    price: "R$ 580,00",
    image: "https://images.unsplash.com/photo-1599839572688-444490f8484e?auto=format&fit=crop&q=80&w=600",
    description: "Platô, disco e rolamento para Ford Ka/Fiesta. Pedal leve e macio.",
    inStock: false
  }
];

export const BRANDS = [
  { name: "Volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/600px-Volkswagen_logo_2019.svg.png" },
  { name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/1200px-Ford_logo_flat.svg.png" },
  { name: "Fiat", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fiat_Automobiles_logo.svg/1200px-Fiat_Automobiles_logo.svg.png" },
  { name: "Chevrolet", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Chevrolet_logo_2013.svg/2560px-Chevrolet_logo_2013.svg.png" },
  { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/1200px-Honda_Logo.svg.png" },
  { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png" },
  { name: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png" },
  { name: "Renault", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Renault_2021_Text.svg/2560px-Renault_2021_Text.svg.png" },
  { name: "Peugeot", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Peugeot_logo_2021.svg/1200px-Peugeot_logo_2021.svg.png" },
  { name: "Citroën", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Citro%C3%ABn_2016.svg/1200px-Citro%C3%ABn_2016.svg.png" },
  { name: "Kia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia_logo.svg/2560px-Kia_logo.svg.png" },
  { name: "Mitsubishi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/2560px-Mitsubishi_logo.svg.png" },
  { name: "Jeep", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Jeep_logo.svg/2560px-Jeep_logo.svg.png" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png" },
  { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/2560px-Mercedes-Benz_Logo_2010.svg.png" },
  { name: "Volvo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Volvo_logo.svg/1200px-Volvo_logo.svg.png" },
  { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1200px-Audi-Logo_2016.svg.png" },
  { name: "Nissan", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Nissan_logo_%282013%29.svg/1200px-Nissan_logo_%282013%29.svg.png" }
];

export const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Qualidade Garantida",
    description: "Trabalhamos apenas com peças originais e de primeira linha para sua segurança."
  },
  {
    icon: ThumbsUp,
    title: "Confiança e Respeito",
    description: "Mais de 20 anos de tradição construindo relacionamentos sólidos com nossos clientes."
  },
  {
    icon: Car,
    title: "Nacionais e Importados",
    description: "O maior estoque de peças para veículos nacionais e importados da região."
  },
  {
    icon: Wrench,
    title: "Especialistas",
    description: "Equipe treinada para oferecer a melhor solução técnica para o seu veículo."
  }
];
