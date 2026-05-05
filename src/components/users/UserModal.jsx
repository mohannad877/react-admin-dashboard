import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { userService } from '../../services/api';

const roleOptions = [
  { value: 'admin', label: 'مدير' },
  { value: 'editor', label: 'محرر' },
  { value: 'viewer', label: 'مطلع' },
];

const departmentOptions = [
  'تقنية المعلومات', 'التسويق', 'الموارد البشرية', 'المبيعات', 'المحاسبة', 'الإدارة', 'العمليات'
];

export default function UserModal({ user, onClose, onSave }) {
  const isEdit = !!user;
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'viewer',
    status: user?.status || 'active',
    department: user?.department || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    joinDate: user?.joinDate || new Date().toISOString().split('T')[0],
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'الاسم مطلوب';
    if (!formData.email.trim()) e.email = 'البريد الإلكتروني مطلوب';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'بريد إلكتروني غير صالح';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (isEdit) {
        await userService.update(user.id, formData);
      } else {
        await userService.create(formData);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {isEdit ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={inputClass('name')}
                placeholder="أدخل الاسم الكامل"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={inputClass('email')}
                placeholder="example@company.sa"
                dir="ltr"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">الدور</label>
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className={inputClass('role')}
              >
                {roleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">الحالة</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className={inputClass('status')}
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">القسم</label>
              <select
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className={inputClass('department')}
              >
                <option value="">اختر القسم</option>
                {departmentOptions.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">رقم الجوال</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={inputClass('phone')}
                placeholder="+966501234567"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">تاريخ الانضمام</label>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => handleChange('joinDate', e.target.value)}
                className={inputClass('joinDate')}
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">رابط الصورة</label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => handleChange('avatar', e.target.value)}
                className={inputClass('avatar')}
                placeholder="https://..."
                dir="ltr"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>إلغاء</Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'جارٍ الحفظ...' : isEdit ? 'حفظ التعديلات' : 'إضافة المستخدم'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
