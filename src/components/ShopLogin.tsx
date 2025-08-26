import React, { useState } from 'react';
import { Store, Eye, EyeOff } from 'lucide-react';
import { mockShops } from '../data/mockData';
import { storageUtils } from '../utils/storage';

interface ShopLoginProps {
  onLogin: (user: any) => void;
  onBack: () => void;
}

const ShopLogin: React.FC<ShopLoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Initialize shops data if not exists
    const existingShops = storageUtils.getShops();
    if (existingShops.length === 0) {
      storageUtils.saveShops(mockShops);
    }

    const allShops = existingShops.length > 0 ? existingShops : mockShops;
    const shop = allShops.find(s => s.email === email && s.password === password);

    if (shop) {
      const shopUser = {
        id: shop.id,
        type: 'shop',
        name: shop.name,
        email: shop.email,
      };
      
      storageUtils.setCurrentUser(shopUser);
      onLogin(shopUser);
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card text-center fade-in">
          <div className="bg-blue-600 text-white p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Store size={40} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2 arabic-text">دخول المحل</h2>
          <p className="text-gray-600 mb-8">تسجيل دخول أصحاب المحلات</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50"
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'دخول'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>

          {/* تمت إزالة قسم بيانات التجربة لحماية الحسابات */}
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;