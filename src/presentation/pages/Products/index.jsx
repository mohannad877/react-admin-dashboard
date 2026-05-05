import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { productRepository } from '../../../infrastructure/repositories/ProductRepository';
import { translateCategory, formatPrice, calculateProductStatus } from '../../../shared/utils/helpers';
import ProductModal from '../../components/products/ProductModal';

const StockBadge = ({ stock, minStockAlert = 10 }) => {
  const status = calculateProductStatus(stock, minStockAlert);
  const configs = {
    available: { label: 'متوفر', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400', dot: 'bg-emerald-500' },
    low_stock: { label: 'منخفض', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400', dot: 'bg-amber-500' },
    out_of_stock: { label: 'منفذ', cls: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400', dot: 'bg-red-500' },
  };
  const config = configs[status];
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.cls}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
        {config.label}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400">({stock})</span>
    </div>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.price_gte = filters.minPrice;
      if (filters.maxPrice) params.price_lte = filters.maxPrice;
      const data = await productRepository.getAll(params);
      setProducts(data);
    } catch {
      setError('تعذّر الاتصال بالخادم. تأكد من تشغيل JSON Server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [filters]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`هل أنت متأكد من حذف "${name}"؟`)) return;
    try {
      await productRepository.delete(id);
      fetchProducts();
    } catch {
      alert('فشل الحذف، حاول مجدداً.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const columns = [
    {
      field: 'name',
      header: 'المنتج',
      sortable: true,
      cell: (p) => (
        <div className="flex items-center gap-3">
          <img
            src={p.image || `https://picsum.photos/seed/${p.id}/60/60`}
            alt={p.name}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-100"
            onError={(e) => { e.target.src = `https://picsum.photos/seed/${p.id}/60/60`; }}
          />
          <span className="font-medium text-slate-900 dark:text-slate-100 truncate max-w-[150px]">{p.name}</span>
        </div>
      )
    },
    {
      field: 'category',
      header: 'التصنيف',
      sortable: true,
      cell: (p) => (
        <span className="inline-flex px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium">
          {translateCategory(p.category)}
        </span>
      )
    },
    {
      field: 'price',
      header: 'السعر',
      sortable: true,
      cell: (p) => (
        <span className="font-semibold text-slate-900 dark:text-slate-100">{formatPrice(p.price)}</span>
      )
    },
    {
      field: 'stock',
      header: 'المخزون',
      sortable: true,
      cell: (p) => <StockBadge stock={p.stock} minStockAlert={p.minStockAlert} />
    },
    {
      field: 'actions',
      header: 'الإجراءات',
      cell: (p) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleEdit(p)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
            aria-label={`تعديل ${p.name}`}
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => handleDelete(p.id, p.name)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            aria-label={`حذف ${p.name}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">إدارة المنتجات</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {products.length} منتج في المخزون
          </p>
        </div>
        <Button icon={Plus} onClick={() => setShowModal(true)}>
          إضافة منتج
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">تصفية:</span>

          <select
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={filters.category}
            onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
          >
            <option value="">جميع التصنيفات</option>
            <option value="electronics">إلكترونيات</option>
            <option value="furniture">أثاث</option>
            <option value="supplies">مستلزمات</option>
            <option value="other">أخرى</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="سعر من"
              min="0"
              value={filters.minPrice}
              onChange={(e) => setFilters(f => ({ ...f, minPrice: e.target.value }))}
              className="w-24 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              dir="ltr"
            />
            <span className="text-slate-400 text-sm">—</span>
            <input
              type="number"
              placeholder="إلى"
              min="0"
              value={filters.maxPrice}
              onChange={(e) => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
              className="w-24 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              dir="ltr"
            />
            <span className="text-xs text-slate-500">ر.س</span>
          </div>

          {(filters.category || filters.minPrice || filters.maxPrice) && (
            <button
              onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '' })}
              className="px-3 py-2 text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              إعادة تعيين
            </button>
          )}

          <button
            onClick={fetchProducts}
            className="mr-auto p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-500/10 rounded-lg transition-colors"
            aria-label="تحديث"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-6 text-center">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchProducts} className="mt-3">إعادة المحاولة</Button>
        </div>
      ) : loading ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b border-slate-100 dark:border-slate-800 animate-pulse bg-slate-50 dark:bg-slate-800/50" />
          ))}
        </div>
      ) : (
        <DataTable
          data={products}
          columns={columns}
          searchableColumns={['name', 'category']}
          initialSort={{ field: 'price', direction: 'asc' }}
        />
      )}

      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={handleModalClose}
          onSave={() => { handleModalClose(); fetchProducts(); }}
        />
      )}
    </div>
  );
}
