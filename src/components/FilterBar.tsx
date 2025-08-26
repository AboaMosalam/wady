import React from 'react';
import { Search, Filter } from 'lucide-react';
import { categories } from '../data/mockData';

interface FilterBarProps {
  searchTerm: string;
  selectedCategory: string;
  minPrice: string;
  maxPrice: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  selectedCategory,
  minPrice,
  maxPrice,
  onSearchChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-blue-600" />
        <h3 className="text-lg font-bold text-gray-800">البحث والفلترة</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="ابحث في الإعلانات..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field pr-10"
          />
        </div>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="input-field"
        >
          <option value="">جميع الفئات</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>

        {/* Price Range */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="السعر الأدنى"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="input-field flex-1"
          />
          <input
            type="number"
            placeholder="السعر الأعلى"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="input-field flex-1"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="btn-secondary"
        >
          إعادة تعيين
        </button>
      </div>
    </div>
  );
};

export default FilterBar;