import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Download, FileSpreadsheet, FileText,
  Printer, FileDown, Upload, CheckCircle, XCircle, Info
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { userRepository } from '../../../infrastructure/repositories/UserRepository';
import { productRepository } from '../../../infrastructure/repositories/ProductRepository';
import { objectsToCSV, downloadCSV, csvToObjects, readCSVFile } from '../../../shared/utils/csv';

// ─── Toast Component ────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  const styles = {
    success: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
    error:   'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400',
    info:    'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400',
  };
  const icons = {
    success: <CheckCircle size={18} />,
    error:   <XCircle size={18} />,
    info:    <Info size={18} />,
  };
  return (
    <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-lg text-sm font-medium transition-all ${styles[type]}`}>
      {icons[type]}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 text-xs">✕</button>
    </div>
  );
};

// ─── PackageIcon SVG ─────────────────────────────────────────────────────────
const PackageIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
  </svg>
);

// ─── نماذج CSV للتوريد ───────────────────────────────────────────────────────
const IMPORT_TEMPLATES = {
  users: {
    headers: ['id', 'name', 'email', 'role', 'status', 'joinDate', 'phone', 'department'],
    sample: [
      { id: 'u-001', name: 'مثال مستخدم', email: 'user@example.com', role: 'editor', status: 'active', joinDate: '2026-01-01', phone: '+966500000000', department: 'التسويق' }
    ]
  },
  products: {
    headers: ['id', 'name', 'category', 'price', 'stock', 'minStockAlert', 'status', 'createdAt'],
    sample: [
      { id: 'p-001', name: 'منتج تجريبي', category: 'electronics', price: 299, stock: 50, minStockAlert: 10, status: 'available', createdAt: '2026-01-01' }
    ]
  },
};

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Reports() {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  // Export state
  const [reportType, setReportType] = useState('users');
  const [dateRange, setDateRange] = useState('month');
  const [exportLoading, setExportLoading] = useState(false);
  const [exportData, setExportData] = useState([]);

  // Import state
  const [importType, setImportType] = useState('users');
  const [importLoading, setImportLoading] = useState(false);
  const [importResult, setImportResult] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ─── التصدير ─────────────────────────────────────────────────────────────

  const generateReport = async () => {
    setExportLoading(true);
    try {
      let result = [];
      if (reportType === 'users') {
        result = await userRepository.getAll();
      } else if (reportType === 'products') {
        result = await productRepository.getAll();
      } else if (reportType === 'sales') {
        result = [
          { id: 1, orderId: 'ORD-1001', amount: 1500, status: 'completed', date: '2026-05-01' },
          { id: 2, orderId: 'ORD-1002', amount: 320,  status: 'pending',   date: '2026-05-02' },
          { id: 3, orderId: 'ORD-1003', amount: 890,  status: 'completed', date: '2026-05-03' },
          { id: 4, orderId: 'ORD-1004', amount: 450,  status: 'refunded',  date: '2026-05-04' },
          { id: 5, orderId: 'ORD-1005', amount: 2100, status: 'completed', date: '2026-05-05' },
        ];
      }
      await new Promise(r => setTimeout(r, 500));
      setExportData(result);
      if (result.length > 0) {
        showToast(`تم تحميل ${result.length} سجل. يمكنك الآن التصدير.`, 'info');
      } else {
        showToast('لا توجد بيانات لهذا النطاق.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('تعذّر جلب البيانات. تحقق من الاتصال.', 'error');
    } finally {
      setExportLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!exportData.length) return;
    const csv = objectsToCSV(exportData);
    const filename = `report_${reportType}_${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(csv, filename);
    showToast(`تم تصدير ${exportData.length} سجل كملف CSV بنجاح ✓`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  // ─── التوريد ─────────────────────────────────────────────────────────────

  const downloadTemplate = () => {
    const tpl = IMPORT_TEMPLATES[importType];
    const csv = objectsToCSV(tpl.sample, tpl.headers);
    downloadCSV(csv, `template_${importType}.csv`);
    showToast('تم تحميل نموذج CSV. عدّل البيانات ثم ارفع الملف.', 'info');
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      showToast('الرجاء اختيار ملف CSV فقط.', 'error');
      return;
    }
    setImportLoading(true);
    setImportResult(null);
    try {
      const text = await readCSVFile(file);
      const { rows, headers } = csvToObjects(text);

      if (rows.length === 0) {
        showToast('الملف فارغ أو لا يحتوي على بيانات صالحة.', 'error');
        return;
      }

      // التحقق من وجود العمود id على الأقل
      if (!headers.includes('id')) {
        showToast('يجب أن يحتوي الملف على عمود "id".', 'error');
        return;
      }

      // تحويل الأنواع حسب نوع التوريد
      const processed = rows.map(row => {
        if (importType === 'products') {
          return {
            ...row,
            price:         parseFloat(row.price)        || 0,
            stock:         parseInt(row.stock)           || 0,
            minStockAlert: parseInt(row.minStockAlert)   || 10,
          };
        }
        return row;
      });

      // استدعاء bulkCreate
      let result;
      if (importType === 'users') {
        result = await userRepository.bulkCreate(processed);
      } else {
        result = await productRepository.bulkCreate(processed);
      }

      setImportResult({ ...result, total: rows.length });
      if (result.failed === 0) {
        showToast(`تم استيراد ${result.success} سجل بنجاح ✓`, 'success');
      } else {
        showToast(`تم استيراد ${result.success} سجل، فشل ${result.failed} سجل.`, 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('فشل معالجة الملف: ' + err.message, 'error');
    } finally {
      setImportLoading(false);
      e.target.value = ''; // Reset input
    }
  };

  const reportTypes = [
    { id: 'users',    name: t('users_report')    || 'تقرير المستخدمين', icon: FileText,      desc: 'تفاصيل نشاط وتوزيع المستخدمين' },
    { id: 'products', name: t('products_report') || 'تقرير المخزون',    icon: PackageIcon,   desc: 'حركة المنتجات والكميات المتاحة' },
    { id: 'sales',    name: t('sales_report')    || 'تقرير المبيعات',   icon: FileSpreadsheet, desc: 'الملخص المالي وحركة الطلبات' },
  ];

  const importTypes = [
    { id: 'users',    label: 'استيراد مستخدمين' },
    { id: 'products', label: 'استيراد منتجات' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <Helmet>
        <title>{t('reports')} | Admin Dashboard</title>
        <meta name="description" content="توليد وتصدير واستيراد تقارير النظام" />
      </Helmet>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('reports')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          توليد وتصدير واستيراد تقارير النظام بصيغة CSV
        </p>
      </div>

      {/* ═══════════════════ قسم التصدير ═══════════════════ */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm print:hidden">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5 flex items-center gap-2">
          <Download size={18} className="text-teal-500" />
          تصدير التقارير
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* نوع التقرير */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">نوع التقرير</label>
            <div className="space-y-2">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.id}
                    className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                      reportType === type.id
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-500/10 ring-1 ring-teal-500'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportType"
                      value={type.id}
                      checked={reportType === type.id}
                      onChange={(e) => setReportType(e.target.value)}
                      className="mt-1 text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100 text-sm">
                        <Icon size={16} className={reportType === type.id ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500'} />
                        {type.name}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{type.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* الفلاتر وصيغ التصدير */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">النطاق الزمني</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="week">آخر 7 أيام</option>
                <option value="month">هذا الشهر</option>
                <option value="year">هذا العام</option>
                <option value="all">كل الأوقات</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">صيغة التصدير</label>
              <div className="flex gap-2">
                <button
                  onClick={exportToCSV}
                  disabled={exportData.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FileSpreadsheet size={16} className="text-green-600" />
                  Excel / CSV
                </button>
                <button
                  onClick={handlePrint}
                  disabled={exportData.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Printer size={16} className="text-blue-600" />
                  طباعة / PDF
                </button>
              </div>
            </div>
          </div>

          {/* زر الإنشاء */}
          <div className="flex flex-col justify-end pb-2">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mb-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                اضغط «إنشاء التقرير» لجلب البيانات، ثم اختر صيغة التصدير المطلوبة.
              </p>
            </div>
            <Button
              onClick={generateReport}
              disabled={exportLoading}
              className="w-full h-12 text-md shadow-md"
              icon={exportLoading ? undefined : FileDown}
            >
              {exportLoading ? 'جارٍ جلب البيانات...' : 'إنشاء التقرير'}
            </Button>
          </div>
        </div>
      </div>

      {/* ═══════════════════ معاينة التقرير ═══════════════════ */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <h3 className="font-bold text-slate-800 dark:text-slate-200">
            معاينة التقرير{' '}
            <span className="text-slate-400 text-sm font-normal ml-2">({exportData.length} سجل)</span>
          </h3>
          {exportData.length > 0 && (
            <button
              onClick={exportToCSV}
              className="text-sm flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline print:hidden"
            >
              <Download size={14} /> تصدير CSV
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          {exportData.length === 0 && !exportLoading ? (
            <div className="px-6 py-16 text-center text-slate-500 dark:text-slate-400">
              <FileText size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p>اختر نوع التقرير واضغط «إنشاء التقرير» لعرض البيانات هنا</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  {exportData[0] && Object.keys(exportData[0]).slice(0, 6).map(key => (
                    <th key={key} className="px-6 py-3 uppercase tracking-wider">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {exportData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    {Object.keys(row).slice(0, 6).map(key => (
                      <td key={key} className="px-6 py-3 text-slate-700 dark:text-slate-300">
                        {typeof row[key] === 'object' ? JSON.stringify(row[key]) : String(row[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ═══════════════════ قسم التوريد ═══════════════════ */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm print:hidden">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-2">
          <Upload size={18} className="text-violet-500" />
          استيراد البيانات
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
          ارفع ملف CSV لإضافة سجلات جديدة دفعةً واحدة. قم بتحميل النموذج أولاً للاطلاع على التنسيق المطلوب.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* اختيار نوع الاستيراد */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">نوع البيانات المراد استيرادها</label>
            <div className="flex gap-3">
              {importTypes.map(type => (
                <label
                  key={type.id}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer transition-all text-sm font-medium ${
                    importType === type.id
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-1 ring-violet-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="importType"
                    value={type.id}
                    checked={importType === type.id}
                    onChange={(e) => { setImportType(e.target.value); setImportResult(null); }}
                    className="sr-only"
                  />
                  {type.label}
                </label>
              ))}
            </div>

            {/* تحميل النموذج */}
            <button
              onClick={downloadTemplate}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <FileDown size={16} />
              تحميل نموذج CSV لـ «{importTypes.find(t => t.id === importType)?.label}»
            </button>
          </div>

          {/* منطقة الرفع */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">رفع ملف CSV</label>

            {/* Drop Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-violet-400 dark:hover:border-violet-500 hover:bg-violet-50/50 dark:hover:bg-violet-500/5 transition-all group"
            >
              <Upload size={28} className="text-slate-300 dark:text-slate-600 group-hover:text-violet-500 transition-colors" />
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {importLoading ? 'جارٍ المعالجة...' : 'انقر لاختيار ملف CSV'}
                </p>
                <p className="text-xs text-slate-400 mt-1">الحد الأقصى: 5MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileSelect}
                disabled={importLoading}
              />
            </div>

            {/* نتيجة الاستيراد */}
            {importResult && (
              <div className={`p-4 rounded-xl border text-sm ${
                importResult.failed === 0
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
                  : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
              }`}>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">نتيجة الاستيراد:</p>
                <p className="text-slate-600 dark:text-slate-300">
                  ✅ نجح: <strong>{importResult.success}</strong> سجل &nbsp;|&nbsp;
                  ❌ فشل: <strong>{importResult.failed}</strong> سجل &nbsp;|&nbsp;
                  المجموع: <strong>{importResult.total}</strong>
                </p>
                {importResult.errors.length > 0 && (
                  <ul className="mt-2 text-xs text-red-600 dark:text-red-400 space-y-0.5 list-disc list-inside">
                    {importResult.errors.slice(0, 5).map((e, i) => <li key={i}>{e}</li>)}
                    {importResult.errors.length > 5 && <li>...وأخطاء أخرى ({importResult.errors.length - 5})</li>}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
