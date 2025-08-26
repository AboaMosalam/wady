export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  image: string;
  shopId: string;
  shopName: string;
  createdAt: string;
  featured?: boolean;
}

export interface Shop {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  createdAt: string;
}

export interface User {
  id: string;
  type: 'admin' | 'shop';
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}