import { Menu, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/': 'لوحة التحكم',
  '/users': 'إدارة المستخدمين',
  '/products': 'إدارة المنتجات',
};

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'لوحة التحكم';

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 px-4 md:px-6">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            aria-label="فتح القائمة"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {title}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
            aria-label="الإشعارات"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                المسؤول
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                admin@company.sa
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              م
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
