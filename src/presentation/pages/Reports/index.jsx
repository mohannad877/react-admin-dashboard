import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, Filter, FileSpreadsheet, FileText, Printer, FileDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { userRepository } from '../../../infrastructure/repositories/UserRepository';
import { productRepository } from '../../../infrastructure/repositories/ProductRepository';

export default function Reports() {
  const { t } = useTranslation();
  const [reportType, setReportType] = useState('users');
  const [dateRange, setDateRange] = useState('month'); // week, month, year, all
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const generateReport = async () => {
    setLoading(true);
    try {
      let result = [];
      if (reportType === 'users') {
        result = await userRepository.getAll();
      } else if (reportType === 'products') {
        result = await productRepository.getAll();
      } else if (reportType === 'sales') {
        // Mock sales data since we don't have a real sales endpoint
        result = [
          { id: 1, orderId: 'ORD-1001', amount: 1500, status: 'completed', date: '2026-05-01' },
          { id: 2, orderId: 'ORD-1002', amount: 320, status: 'pending', date: '2026-05-02' },
          { id: 3, orderId: 'ORD-1003', amount: 890, status: 'completed', date: '2026-05-03' },
          { id: 4, orderId: 'ORD-1004', amount: 450, status: 'refunded', date: '2026-05-04' },
          { id: 5, orderId: 'ORD-1005', amount: 2100, status: 'completed', date: '2026-05-05' },
        ];
      }
      // Simulate network delay for effect
      await new Promise(r => setTimeout(r, 600));
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    if (!data.length) return;
    
    // Simple CSV generator
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => `"${row[h] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `report_${reportType}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const reportTypes = [
    { id: 'users', name: t('users_report') || 'تقرير المستخدمين', icon: FileText, desc: 'تفاصيل نشاط وتوزيع المستخدمين' },
    { id: 'products', name: t('products_report') || 'تقرير المخزون', icon: PackageIcon, desc: 'حركة المنتجات والكميات المتاحة' },
    { id: 'sales', name: t('sales_report') || 'تقرير المبيعات', icon: FileSpreadsheet, desc: 'الملخص المالي وحركة الطلبات' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <Helmet>
        <title>{t('reports')} | Admin Dashboard</title>
      </Helmet>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('reports')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          توليد وتصدير تقارير النظام بصيغ متعددة
        </p>
      </div>

      {/* Report Builder Form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm print:hidden">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5 flex items-center gap-2">
          <Filter size={18} className="text-teal-500" />
          إعداد التقرير
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Report Type */}
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

          {/* Filters */}
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
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">صيغة التصدير المفضلة</label>
              <div className="flex gap-2">
                <button 
                  onClick={exportCSV}
                  disabled={data.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  <FileSpreadsheet size={16} className="text-green-600" />
                  Excel / CSV
                </button>
                <button 
                  onClick={handlePrint}
                  disabled={data.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  <Printer size={16} className="text-blue-600" />
                  طباعة / PDF
                </button>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex flex-col justify-end pb-2">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mb-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">سيتم إنشاء التقرير المخصص بناءً على المعطيات المختارة وعرض النتيجة في الجدول أدناه.</p>
            </div>
            <Button 
              onClick={generateReport} 
              disabled={loading}
              className="w-full h-12 text-md shadow-md"
              icon={loading ? undefined : FileDown}
            >
              {loading ? 'جارٍ توليد التقرير...' : 'إنشاء التقرير'}
            </Button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <h3 className="font-bold text-slate-800 dark:text-slate-200">
            معاينة التقرير <span className="text-slate-400 text-sm font-normal ml-2">({data.length} سجل)</span>
          </h3>
          {data.length > 0 && (
            <button onClick={exportCSV} className="text-sm flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline print:hidden">
              <Download size={14} /> تصدير السجلات
            </button>
          )}
        </div>
        
        <div className="p-0 overflow-x-auto">
          {data.length === 0 && !loading ? (
            <div className="px-6 py-16 text-center text-slate-500 dark:text-slate-400">
              <FileText size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p>قم باختيار نوع التقرير واضغط على "إنشاء التقرير" لعرض البيانات هنا</p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  {data[0] && Object.keys(data[0]).slice(0, 6).map(key => (
                    <th key={key} className="px-6 py-3 uppercase tracking-wider">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.map((row, i) => (
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
    </div>
  );
}

// Just a quick icon missing in imports
const PackageIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
);
