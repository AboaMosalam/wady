import { Ad, Shop } from '../types';

const STORAGE_KEYS = {
  ADS: 'wadi_ads',
  SHOPS: 'wadi_shops',
  CURRENT_USER: 'wadi_current_user',
};

export const storageUtils = {
  // Ads
  getAds: (): Ad[] => {
    const ads = localStorage.getItem(STORAGE_KEYS.ADS);
    return ads ? JSON.parse(ads) : [];
  },

  saveAds: (ads: Ad[]): void => {
    localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(ads));
  },

  addAd: (ad: Ad): void => {
    const ads = storageUtils.getAds();
    ads.unshift(ad);
    storageUtils.saveAds(ads);
  },

  updateAd: (adId: string, updatedAd: Partial<Ad>): void => {
    const ads = storageUtils.getAds();
    const index = ads.findIndex(ad => ad.id === adId);
    if (index !== -1) {
      ads[index] = { ...ads[index], ...updatedAd };
      storageUtils.saveAds(ads);
    }
  },

  deleteAd: (adId: string): void => {
    const ads = storageUtils.getAds();
    const filteredAds = ads.filter(ad => ad.id !== adId);
    storageUtils.saveAds(filteredAds);
  },

  // Shops
  getShops: (): Shop[] => {
    const shops = localStorage.getItem(STORAGE_KEYS.SHOPS);
    return shops ? JSON.parse(shops) : [];
  },

  saveShops: (shops: Shop[]): void => {
    localStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(shops));
  },

  updateShop: (shopId: string, updatedShop: Partial<Shop>): void => {
    const shops = storageUtils.getShops();
    const index = shops.findIndex(shop => shop.id === shopId);
    if (index !== -1) {
      shops[index] = { ...shops[index], ...updatedShop };
      storageUtils.saveShops(shops);
    }
  },

  // User session
  getCurrentUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: any) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  clearCurrentUser: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
};