import { Ad, Shop, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'الإلكترونيات', icon: '📱' },
  { id: '2', name: 'الملابس', icon: '👔' },
  { id: '3', name: 'المطاعم', icon: '🍽️' },
  { id: '4', name: 'السوبرماركت', icon: '🛒' },
  { id: '5', name: 'الخدمات', icon: '🔧' },
];

export const mockShops: Shop[] = [
  {
    id: '1',
    name: 'متجر التقنية الحديثة',
    email: 'tech@waditech.com',
    password: '123456',
    phone: '+201001234567',
    location: 'وادي القمر - الحي الشمالي',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'مطعم الأصالة',
    email: 'asala@restaurant.com',
    password: '123456',
    phone: '+201007654321',
    location: 'وادي القمر - الحي الأوسط',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'سوبرماركت ابو الضبع',
    email: 'supermarket@tayson.com',
    password: '123456',
    phone: '+201001234567',
    location: 'وادي القمر - الحي الأوسط',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'سوبر ماركت ابو حاتم',
    email: 'supermarket@hatem.com',
    password: '123456',
    phone: '+201007654321',
    location: 'وادي القمر - الحي الجنوبي',
    createdAt: new Date().toISOString(),
  },
];

export const mockAds: Ad[] = [
  {
    id: '1',
    title: 'آيفون 15 برو ماكس',
    description: 'جديد بالكرتون، ضمان سنتين، جميع الألوان متوفرة',
    price: 4500,
    category: 'الإلكترونيات',
    location: 'وادي القمر - الحي الشمالي',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500',
    shopId: '1',
    shopName: 'متجر التقنية الحديثة',
    createdAt: new Date().toISOString(),
    featured: true,
  },
  {
    id: '2',
    title: 'وجبة الملك الشاملة',
    description: 'وجبة متكاملة تشمل الأرز والدجاج والسلطة والشوربة',
    price: 85,
    category: 'المطاعم',
    location: 'وادي القمر - الحي الأوسط',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    shopId: '2',
    shopName: 'مطعم الأصالة',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'تشكيلة ملابس رجالية',
    description: 'تشكيلة متنوعة من الثياب الرجالية بأسعار مميزة',
    price: 120,
    category: 'الملابس',
    location: 'وادي القمر - الحي الجنوبي',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    shopId: '1',
    shopName: 'متجر التقنية الحديثة',
    createdAt: new Date().toISOString(),
  },
];

// Admin credentials
export const adminCredentials = {
  email: 'hoda01201820@gmail.com',
  password: 'hoda102002',
};