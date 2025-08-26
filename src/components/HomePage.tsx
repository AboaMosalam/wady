import React, { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Clock } from 'lucide-react';
import AdCard from './AdCard';
import FilterBar from './FilterBar';
import { Ad } from '../types';
import { storageUtils } from '../utils/storage';
import { mockAds } from '../data/mockData';

const HomePage: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    // Load ads from storage or use mock data
    const storedAds = storageUtils.getAds();
    const initialAds = storedAds.length > 0 ? storedAds : mockAds;
    
    if (storedAds.length === 0) {
      storageUtils.saveAds(mockAds);
    }
    
    setAds(initialAds);
    setFilteredAds(initialAds);
  }, []);

  useEffect(() => {
    let filtered = ads;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ad =>
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(ad => ad.category === selectedCategory);
    }

    // Price range filter
    if (minPrice) {
      filtered = filtered.filter(ad => ad.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(ad => ad.price <= parseInt(maxPrice));
    }

    // Sort by featured first, then by date
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredAds(filtered);
  }, [ads, searchTerm, selectedCategory, minPrice, maxPrice]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  const featuredAds = filteredAds.filter(ad => ad.featured);
  const regularAds = filteredAds.filter(ad => !ad.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 arabic-text fade-in">
            مرحباً بكم في وادي القمر
          </h1>
          <p className="text-xl mb-8 opacity-90 fade-in">
            اكتشف أفضل العروض والخدمات في منطقتك
          </p>
          <div className="flex justify-center gap-8 text-center fade-in">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-amber-400" size={24} />
              <span className="text-lg">عروض مميزة</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-green-400" size={24} />
              <span className="text-lg">خدمات محلية</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-400" size={24} />
              <span className="text-lg">تحديث يومي</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onReset={handleReset}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100 fade-in">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {ads.length}
            </div>
            <div className="text-blue-800 font-semibold">إجمالي الإعلانات</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100 fade-in">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {featuredAds.length}
            </div>
            <div className="text-green-800 font-semibold">إعلانات مميزة</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 text-center border border-amber-100 fade-in">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {filteredAds.length}
            </div>
            <div className="text-amber-800 font-semibold">نتائج البحث</div>
          </div>
        </div>

        {/* Featured Ads */}
        {featuredAds.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 arabic-text flex items-center gap-3">
              <TrendingUp className="text-amber-500" />
              الإعلانات المميزة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAds.map(ad => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </section>
        )}

        {/* Regular Ads */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 arabic-text">
            جميع الإعلانات
          </h2>
          {regularAds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularAds.map(ad => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                لم يتم العثور على إعلانات
              </h3>
              <p className="text-gray-500">
                جرب تغيير معايير البحث أو إزالة الفلاتر
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;