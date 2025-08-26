import React from 'react';
import { User, LogOut, Store } from 'lucide-react';
import { storageUtils } from '../utils/storage';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  currentUser?: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, currentUser, onLogout }) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onViewChange('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full ml-3">
              <Store size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 arabic-text">وادي القمر</h1>
              <p className="text-sm text-gray-600">نظام الإعلانات المحلية</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-semibold">
                  مرحباً، {currentUser.name}
                </span>
                {currentUser.type === 'admin' && (
                  <button
                    onClick={() => onViewChange('admin')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      currentView === 'admin'
                        ? 'bg-red-600 text-white'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    لوحة الإدارة
                  </button>
                )}
                {currentUser.type === 'shop' && (
                  <button
                    onClick={() => onViewChange('shop-dashboard')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      currentView === 'shop-dashboard'
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    إدارة المتجر
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  تسجيل خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onViewChange('shop-login')}
                  className="btn-primary flex items-center gap-2"
                >
                  <User size={18} />
                  دخول المحل
                </button>
                <button
                  onClick={() => onViewChange('admin-login')}
                  className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  دخول الإدارة
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;