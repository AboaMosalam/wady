import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import ShopLogin from './components/ShopLogin';
import AdminDashboard from './components/AdminDashboard';
import ShopDashboard from './components/ShopDashboard';
import { storageUtils } from './utils/storage';

type View = 'home' | 'admin-login' | 'shop-login' | 'admin' | 'shop-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check for existing user session
    const user = storageUtils.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (user.type === 'admin') {
        setCurrentView('admin');
      } else if (user.type === 'shop') {
        setCurrentView('shop-dashboard');
      }
    }
  }, []);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    if (user.type === 'admin') {
      setCurrentView('admin');
    } else if (user.type === 'shop') {
      setCurrentView('shop-dashboard');
    }
  };

  const handleLogout = () => {
    storageUtils.clearCurrentUser();
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'admin-login':
        return (
          <AdminLogin
            onLogin={handleLogin}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'shop-login':
        return (
          <ShopLogin
            onLogin={handleLogin}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'admin':
        return <AdminDashboard />;
      case 'shop-dashboard':
        return <ShopDashboard currentUser={currentUser} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App arabic-text">
      {currentView !== 'admin-login' && currentView !== 'shop-login' && (
        <Header
          currentView={currentView}
          onViewChange={handleViewChange}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
      {renderCurrentView()}
    </div>
  );
}

export default App;