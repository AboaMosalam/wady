import React, { useState, useEffect } from 'react';
import { Users, Package, TrendingUp, Star, Edit, Trash2, Search, Plus } from 'lucide-react';
import AdCard from './AdCard';
import AddShopModal from './AddShopModal';
import { Ad, Shop } from '../types';
import { storageUtils } from '../utils/storage';
import { formatPrice, formatDate, generateId } from '../utils/helpers';

const AdminDashboard: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [selectedTab, setSelectedTab] = useState<'ads' | 'shops'>('ads');
  const [isAddShopModalOpen, setIsAddShopModalOpen] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    // Filter ads based on search term
    const filtered = ads.filter(ad => 
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.shopName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAds(filtered);
  }, [ads, searchTerm]);

  const refreshData = () => {
    const allAds = storageUtils.getAds();
    const allShops = storageUtils.getShops();
    setAds(allAds);
    setShops(allShops);
    setFilteredAds(allAds);
  };

  const handleDeleteAd = (adId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      storageUtils.deleteAd(adId);
      refreshData();
    }
  };

  const toggleFeatured = (adId: string) => {
    const ad = ads.find(a => a.id === adId);
    if (ad) {
      storageUtils.updateAd(adId, { featured: !ad.featured });
      refreshData();
    }
  };

  const handleAddShop = (newShop: Omit<Shop, 'id' | 'createdAt'>) => {
    const shop: Shop = {
      ...newShop,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    const existingShops = storageUtils.getShops();
    const updatedShops = [...existingShops, shop];
    storageUtils.saveShops(updatedShops);
    refreshData();
    setIsAddShopModalOpen(false);
  };

  const totalRevenue = ads.reduce((sum, ad) => sum + ad.price, 0);
  const featuredAds = ads.filter(ad => ad.featured);

  const handleChangeShopPassword = (shop: Shop) => {
    const newPassword = window.prompt(`تغيير كلمة مرور ${shop.name}`, shop.password || '');
    if (newPassword === null) return;
    const trimmed = newPassword.trim();
    if (trimmed.length < 4) {
      alert('يجب أن تكون كلمة المرور 4 أحرف على الأقل');
      return;
    }
    storageUtils.updateShop(shop.id, { password: trimmed });
    refreshData();
    alert('تم تحديث كلمة المرور بنجاح');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl shadow-lg p-8 mb-8 fade-in">
          <h1 className="text-4xl font-bold mb-2 arabic-text">لوحة الإدارة</h1>
          <p className="text-red-100 text-lg">إدارة شاملة لنظام إعلانات وادي القمر</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {ads.length}
                </div>
                <div className="text-blue-800 font-semibold">إجمالي الإعلانات</div>
              </div>
              <Package className="text-blue-400" size={40} />
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-100 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {shops.length}
                </div>
                <div className="text-green-800 font-semibold">المحلات المسجلة</div>
              </div>
              <Users className="text-green-400" size={40} />
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 border border-amber-100 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  {featuredAds.length}
                </div>
                <div className="text-amber-800 font-semibold">إعلانات مميزة</div>
              </div>
              <Star className="text-amber-400" size={40} />
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="text-purple-800 font-semibold">إجمالي القيمة</div>
              </div>
              <TrendingUp className="text-purple-400" size={40} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 fade-in">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setSelectedTab('ads')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                selectedTab === 'ads'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Package className="inline ml-2" size={20} />
              إدارة الإعلانات ({ads.length})
            </button>
            <button
              onClick={() => setSelectedTab('shops')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                selectedTab === 'shops'
                  ? 'bg-green-50 text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Users className="inline ml-2" size={20} />
              إدارة المحلات ({shops.length})
            </button>
          </div>

          <div className="p-6">
            {selectedTab === 'ads' ? (
              <div>
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="البحث في الإعلانات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Ads Management */}
                {filteredAds.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAds.map(ad => (
                      <div key={ad.id} className="relative">
                        <AdCard ad={ad} />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <button
                            onClick={() => toggleFeatured(ad.id)}
                            className={`p-2 rounded-full shadow-lg transition-colors ${
                              ad.featured
                                ? 'bg-amber-500 text-white'
                                : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                            }`}
                            title={ad.featured ? 'إلغاء التمييز' : 'جعل مميز'}
                          >
                            <Star size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteAd(ad.id)}
                            className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                            title="حذف"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      لا توجد إعلانات
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm ? 'لم يتم العثور على نتائج مطابقة للبحث' : 'لا توجد إعلانات مسجلة حتى الآن'}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Shops Management
              <div>
                {/* Add Shop Button */}
                <div className="mb-6">
                  <button
                    onClick={() => setIsAddShopModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Plus size={20} />
                    إضافة محل جديد
                  </button>
                </div>

                {shops.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            اسم المحل
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            البريد الإلكتروني
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            كلمة المرور
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الهاتف
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الموقع
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            عدد الإعلانات
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            تاريخ التسجيل
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            إجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {shops.map(shop => {
                          const shopAdsCount = ads.filter(ad => ad.shopId === shop.id).length;
                          return (
                            <tr key={shop.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {shop.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {shop.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {shop.password}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {shop.phone}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {shop.location}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {shopAdsCount}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(shop.createdAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() => handleChangeShopPassword(shop)}
                                  className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors"
                                  title="تغيير كلمة المرور"
                                >
                                  تغيير كلمة المرور
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🏪</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      لا توجد محلات مسجلة
                    </h3>
                    <p className="text-gray-500">
                      لم يتم تسجيل أي محل في النظام حتى الآن
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Shop Modal */}
      {isAddShopModalOpen && (
        <AddShopModal
          onClose={() => setIsAddShopModalOpen(false)}
          onSubmit={handleAddShop}
        />
      )}
    </div>
  );
};

export default AdminDashboard;