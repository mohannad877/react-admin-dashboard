import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { productRepository } from '../../../infrastructure/repositories/ProductRepository';
import { calculateProductStatus } from '../../../shared/utils/helpers';

const categoryOptions = [
  { value: 'electronics', label: 'إلكترونيات' },
  { value: 'furniture', label: 'أثاث' },
  { value: 'supplies', label: 'مستلزمات' },
  { value: 'other', label: 'أخرى' },
];

export default function ProductModal({ product, onClose, onSave }) {
  const isEdit = !!product;
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'electronics',
    price: product?.price || '',
    stock: product?.stock || '',
    minStockAlert: product?.minStockAlert || 10,
    image: product?.image || '',
    createdAt: product?.createdAt || new Date().toISOString().split('T')[0],
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'اسم المنتج مطلوب';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) e.price = 'السعر غير صالح';
    if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) e.stock = 'الكمية غير صالحة';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const data = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      minStockAlert: Number(formData.minStockAlert),
      status: calculateProductStatus(Number(formData.stock), Number(formData.minStockAlert)),
    };
    try {
      if (isEdit) {
        await productRepository.update(product.id, data);
      } else {
        await productRepository.create(data);
      }
      onSave();
    } catch {
      alert('فشل الحفظ، حاول مجدداً.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const inputClass = (field) => `w-full px-3 py-2.5 rounded-lg border text-sm transition-colors
    bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
    ${errors[field]
      ? 'border-red-400 dark:border-red-500'
      : 'border-slate-200 dark:border-slate-700'
    }`;

  // حساب الحالة المتوقعة بشكل فوري
  const previewStatus = calculateProductStatus(Number(formData.stock), Number(formData.minStockAlert));
  const statusLabels = { available: 'متوفر ✅', low_stock: 'منخفض ⚠️', out_of_stock: 'منفذ ❌' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500" aria-label="إغلاق">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* اسم المنتج */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              اسم المنتج <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={inputClass('name')}
              placeholder="أدخل اسم المنتج"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* التصنيف */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">التصنيف</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className={inputClass('category')}
            >
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* السعر والمخزون */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                السعر ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={inputClass('price')}
                placeholder="0.00"
                dir="ltr"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                الكمية <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className={inputClass('stock')}
                placeholder="0"
                dir="ltr"
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>

          {/* حد التنبيه - الحالة المتوقعة */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">حد تنبيه المخزون</label>
              <input
                type="number"
                min="0"
                value={formData.minStockAlert}
                onChange={(e) => handleChange('minStockAlert', e.target.value)}
                className={inputClass('minStockAlert')}
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">الحالة المتوقعة</label>
              <div className={`px-3 py-2.5 rounded-lg border text-sm font-medium
                ${previewStatus === 'available' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' :
                  previewStatus === 'low_stock' ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' :
                  'bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400'
                }`}>
                {statusLabels[previewStatus]}
              </div>
            </div>
          </div>

          {/* رابط الصورة */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">رابط صورة المنتج</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className={inputClass('image')}
              placeholder="https://picsum.photos/300/200"
              dir="ltr"
            />
            {formData.image && (
              <img src={formData.image} alt="معاينة" className="mt-2 w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-700" onError={(e) => e.target.style.display = 'none'} />
            )}
          </div>

          {/* تاريخ الإضافة */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">تاريخ الإضافة</label>
            <input
              type="date"
              value={formData.createdAt}
              onChange={(e) => handleChange('createdAt', e.target.value)}
              className={inputClass('createdAt')}
              dir="ltr"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>إلغاء</Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'جارٍ الحفظ...' : isEdit ? 'حفظ التعديلات' : 'إضافة المنتج'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
