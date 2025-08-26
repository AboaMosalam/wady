import React, { useState } from 'react';
import { X, Upload, Star } from 'lucide-react';
import { categories } from '../data/mockData';
import { convertImageToBase64 } from '../utils/helpers';
import { Ad } from '../types';

interface EditAdModalProps {
  ad: Ad;
  onClose: () => void;
  onSubmit: (updatedAd: Partial<Ad>) => void;
}

const EditAdModal: React.FC<EditAdModalProps> = ({ ad, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: ad.title,
    description: ad.description,
    price: ad.price.toString(),
    category: ad.category,
    location: ad.location,
    image: ad.image,
    featured: ad.featured || false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const base64Image = await convertImageToBase64(file);
        setFormData(prev => ({ ...prev, image: base64Image }));
      } catch (error) {
        alert('خطأ في رفع الصورة');
      }
    } else {
      alert('يرجى اختيار صورة صالحة');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageUpload(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 arabic-text">تعديل الإعلان</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">صورة الإعلان</label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.image ? (
                <div className="space-y-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                  <div className="space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                      className="hidden"
                      id="image-upload-edit"
                    />
                    <label
                      htmlFor="image-upload-edit"
                      className="btn-primary cursor-pointer inline-block text-sm"
                    >
                      تغيير الصورة
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto text-gray-400" size={48} />
                  <div>
                    <p className="text-gray-600 mb-2">اسحب الصورة هنا أو</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="btn-primary cursor-pointer inline-block"
                    >
                      اختر صورة
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              عنوان الإعلان
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input-field"
              placeholder="أدخل عنوان جذاب للإعلان"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              وصف الإعلان
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="input-field resize-none"
              placeholder="اكتب وصفاً تفصيلياً للمنتج أو الخدمة"
              required
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                السعر (جنيه)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="input-field"
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                الفئة
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">اختر الفئة</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الموقع
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="input-field"
              placeholder="مثال: وادي القمر - الحي الأوسط"
              required
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
            />
            <label htmlFor="featured" className="flex items-center gap-2 text-gray-700 font-semibold">
              <Star size={18} className="text-amber-500" />
              إعلان مميز (يظهر في المقدمة)
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdModal;