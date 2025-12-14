
export interface ContactInfo {
  phone: string[];
  address: string;
  neighborhood: string;
  city: string;
  zip: string;
  mapLink: string;
}

export interface Branch {
  name: string;
  type: 'Nacional' | 'Imports';
  info: ContactInfo;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: string; // Stored as string to allow "Sob Consulta" or "R$ 100,00"
  image: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Icon name from lucide-react
  image: string;
}
