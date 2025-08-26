import React from 'react';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Ad } from '../types';
import { formatPrice, formatDate } from '../utils/helpers';

interface AdCardProps {
  ad: Ad;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const AdCard: React.FC<AdCardProps> = ({ ad, onEdit, onDelete, showActions = false }) => {
  return (
    <div className="card fade-in group">
      {ad.featured && (
        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Star size={12} />
          مميز
        </div>
      )}
      
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800 arabic-text leading-relaxed">
            {ad.title}
          </h3>
          <span className="text-2xl font-bold text-blue-600 arabic-text">
            {formatPrice(ad.price)}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed arabic-text">
          {ad.description}
        </p>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={14} />
          <span>{ad.location}</span>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{formatDate(ad.createdAt)}</span>
          </div>
          <span className="font-semibold">{ad.shopName}</span>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
            {ad.category}
          </span>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <button
              onClick={onEdit}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              تعديل
            </button>
            <button
              onClick={onDelete}
              className="flex-1 btn-danger"
            >
              حذف
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdCard;