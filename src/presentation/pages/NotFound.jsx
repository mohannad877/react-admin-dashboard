import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4" dir="rtl">
      <div className="text-center space-y-5">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-teal-50 dark:bg-teal-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-teal-600 dark:text-teal-400" />
          </div>
        </div>
        <div>
          <h1 className="text-6xl font-black text-teal-600 dark:text-teal-400">404</h1>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">الصفحة غير موجودة</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium text-sm transition-colors"
        >
          <Home size={16} />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
