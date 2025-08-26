import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, TrendingUp, DollarSign, Package } from 'lucide-react';
import AdCard from './AdCard';
import AddAdModal from './AddAdModal';
import EditAdModal from './EditAdModal';
import { Ad } from '../types';
import { storageUtils } from '../utils/storage';
import { formatPrice } from '../utils/helpers';

interface ShopDashboardProps {
  currentUser: any;
}

const ShopDashboard: React.FC<ShopDashboardProps> = ({ currentUser }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [shopAds, setShopAds] = useState<Ad[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  useEffect(() => {
    const allAds = storageUtils.getAds();
    const myAds = allAds.filter(ad => ad.shopId === currentUser.id);
    setAds(allAds);
    setShopAds(myAds);
  }, [currentUser.id]);

  const refreshAds = () => {
    const allAds = storageUtils.getAds();
    const myAds = allAds.filter(ad => ad.shopId === currentUser.id);
    setAds(allAds);
    setShopAds(myAds);
  };

  const handleAddAd = (newAd: Omit<Ad, 'id' | 'shopId' | 'shopName' | 'createdAt'>) => {
    const ad: Ad = {
      ...newAd,
      id: Date.now().toString(),
      shopId: currentUser.id,
      shopName: currentUser.name,
      createdAt: new Date().toISOString(),
    };
    
    storageUtils.addAd(ad);
    refreshAds();
    setIsAddModalOpen(false);
  };

  const handleEditAd = (updatedAd: Partial<Ad>) => {
    if (editingAd) {
      storageUtils.updateAd(editingAd.id, updatedAd);
      refreshAds();
      setIsEditModalOpen(false);
      setEditingAd(null);
    }
  };

  const handleDeleteAd = (adId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      storageUtils.deleteAd(adId);
      refreshAds();
    }
  };

  const totalRevenue = shopAds.reduce((sum, ad) => sum + ad.price, 0);
  const featuredAds = shopAds.filter(ad => ad.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 arabic-text">
                مرحباً، {currentUser.name}
              </h1>
              <p className="text-gray-600">إدارة إعلانات متجركم</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              إضافة إعلان جديد
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {shopAds.length}
                </div>
                <div className="text-blue-800 font-semibold text-sm">
                  إجمالي الإعلانات
                </div>
              </div>
              <Package className="text-blue-400" size={32} />
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-100 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="text-green-800 font-semibold text-sm">
                  إجمالي القيمة
                </div>
              </div>
              <DollarSign className="text-green-400" size={32} />
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 border border-amber-100 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  {featuredAds.length}
                </div>
                <div className="text-amber-800 font-semibold text-sm">
                  إعلانات مميزة
                </div>
              </div>
              <Star className="text-amber-400" size={32} />
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {shopAds.length > 0 ? Math.round(totalRevenue / shopAds.length) : 0}
                </div>
                <div className="text-purple-800 font-semibold text-sm">
                  متوسط السعر
                </div>
              </div>
              <TrendingUp className="text-purple-400" size={32} />
            </div>
          </div>
        </div>

        {/* My Ads */}
        <div className="bg-white rounded-xl shadow-lg p-8 fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic-text">
            إعلاناتي ({shopAds.length})
          </h2>

          {shopAds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopAds.map(ad => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  showActions
                  onEdit={() => {
                    setEditingAd(ad);
                    setIsEditModalOpen(true);
                  }}
                  onDelete={() => handleDeleteAd(ad.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                لا توجد إعلانات بعد
              </h3>
              <p className="text-gray-500 mb-6">
                ابدأ بإضافة أول إعلان لمتجرك
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn-primary"
              >
                إضافة إعلان جديد
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddAdModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddAd}
        />
      )}

      {isEditModalOpen && editingAd && (
        <EditAdModal
          ad={editingAd}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingAd(null);
          }}
          onSubmit={handleEditAd}
        />
      )}
    </div>
  );
};

export default ShopDashboard;