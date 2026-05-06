import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Moon, Sun, ChevronRight, ChevronLeft, BarChart3 } from 'lucide-react';
import { useTheme } from '../../application/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { switchLanguage } from '../../shared/config/i18n';
import { Globe } from 'lucide-react';



export default function Sidebar({ collapsed, onToggle, className = '' }) {
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  
  const navigation = [
    { name: t('dashboard'), href: '/', icon: LayoutDashboard },
    { name: t('users'), href: '/users', icon: Users },
    { name: t('products'), href: '/products', icon: Package },
  ];
  
  return (
    <aside className={`
      fixed right-0 top-0 h-full
      bg-white dark:bg-slate-900
      border-l border-slate-200 dark:border-slate-800
      transition-all duration-300 ease-in-out z-50
      flex flex-col
      ${collapsed ? 'w-16' : 'w-64'}
      ${className}
    `}>
      {/* Header */}
      <div className={`flex items-center border-b border-slate-200 dark:border-slate-800 h-16 px-4
        ${collapsed ? 'justify-center' : 'justify-between'}
      `}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-lg">داشبورد</span>
          </div>
        )}
        <button 
          onClick={onToggle} 
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
          aria-label={collapsed ? 'توسيع القائمة' : 'طي القائمة'}
        >
          {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 px-3 mb-2 uppercase tracking-wider">
            القائمة الرئيسية
          </p>
        )}
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/'}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-150
                ${isActive 
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={toggleTheme}
          title={isDark ? 'الوضع الفاتح' : 'الوضع الليلي'}
          className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium
            text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800
            transition-colors duration-150
            ${collapsed ? 'justify-center' : ''}
          `}
          aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الليلي'}
        >
          {isDark 
            ? <Sun size={18} className="text-amber-500 flex-shrink-0" /> 
            : <Moon size={18} className="text-slate-500 flex-shrink-0" />
          }
          {!collapsed && (
            <span>{isDark ? 'الوضع الفاتح' : 'الوضع الليلي'}</span>
          )}
        </button>
        <button
          onClick={() => {
            // Cycle: ar → en → fr → ar
            const cycle = { ar: 'en', en: 'fr', fr: 'ar' };
            const current = i18n.language.split('-')[0]; // handle 'ar-SA' etc
            switchLanguage(cycle[current] || 'en');
          }}
          title={t('language')}
          className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium
            text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800
            transition-colors duration-150 mt-2
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <Globe size={18} className="text-blue-500 flex-shrink-0" />
          {!collapsed && (
            <span>
              {i18n.language.startsWith('ar') ? 'EN' : i18n.language.startsWith('en') ? 'FR' : 'عربي'}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
