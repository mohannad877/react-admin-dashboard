/**
 * حساب حالة المنتج بناءً على المخزون
 * @param {number} stock - الكمية المتاحة
 * @param {number} minAlert - حد التنبيه (افتراضي: 10)
 * @returns {'available'|'low_stock'|'out_of_stock'}
 */
export const calculateProductStatus = (stock, minAlert = 10) => {
  if (stock === 0) return 'out_of_stock';
  if (stock <= minAlert) return 'low_stock';
  return 'available';
};

/**
 * تنسيق السعر بالدولار
 */
export const formatPrice = (price) => {
  return `$${Number(price).toLocaleString()}`;
};

/**
 * تنسيق التاريخ
 */
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * ترجمة دور المستخدم
 */
export const translateRole = (role) => {
  const roles = { admin: 'مدير', editor: 'محرر', viewer: 'مطلع' };
  return roles[role] || role;
};

/**
 * ترجمة تصنيف المنتج
 */
export const translateCategory = (category) => {
  const categories = {
    electronics: 'إلكترونيات',
    furniture: 'أثاث',
    supplies: 'مستلزمات',
    other: 'أخرى'
  };
  return categories[category] || category;
};
