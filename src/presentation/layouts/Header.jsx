import { useState } from 'react';
import { Menu, Bell, LogOut, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTenant } from '../../application/contexts/TenantProvider';
import { useAuth } from '../../application/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const { config } = useTenant();
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  
  // Fake notifications for demonstration
  const [notifications, setNotifications] = useState([
    { id: 1, text: t('notifNewUser'), read: false, time: t('minsAgo5') },
    { id: 2, text: t('notifLowStock'), read: false, time: t('hourAgo1') },
    { id: 3, text: t('notifSecurityUpdated'), read: true, time: t('daysAgo2') }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const pageKeys = {
    '/': 'dashboard',
    '/users': 'users',
    '/products': 'products',
    '/analytics': 'analytics',
    '/reports': 'reports',
    '/settings': 'settings',
    '/security': 'security',
  };

  const titleKey = pageKeys[location.pathname] || 'dashboard';
  const title = t(titleKey);

  // استخرج الأحرف الأولى للصورة الرمزية
  const getInitials = (name) => {
    if (!name) return 'A';
    const parts = name.trim().split(' ');
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0];
  };

  const displayName = currentUser?.displayName || t('admin');
  const displayEmail = currentUser?.email || 'admin@company.com';
  const initials = getInitials(displayName);

  const handleLogout = async () => {
    if (!window.confirm(t('confirmLogout'))) return;
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
      setShowUserMenu(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 px-4 md:px-6">
      <div className="flex items-center justify-between h-full">

        {/* Right: Hamburger + Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            aria-label="فتح القائمة"
          >
            <Menu size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <img src={config.logo} alt="Tenant Logo" className="h-6 w-6 rounded-full" />
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {config.name}
              </h1>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-tight">{title}</p>
          </div>
        </div>

        {/* Left: Notifications + User Menu */}
        <div className="flex items-center gap-2">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
              aria-label={t('notifications')}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} aria-hidden="true" />
                <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{t('notifications')}</p>
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="text-xs text-teal-600 dark:text-teal-400 hover:underline">
                        {t('markAllAsRead')}
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div key={notification.id} className={`px-4 py-3 border-b border-slate-50 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${!notification.read ? 'bg-teal-50/50 dark:bg-teal-900/20' : ''}`}>
                          <p className={`text-sm ${!notification.read ? 'font-semibold text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}>{notification.text}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                        {t('noNotifications')}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              id="user-menu-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-expanded={showUserMenu}
              aria-haspopup="true"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0">
                {initials}
              </div>
              {/* Name (hidden on mobile) */}
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                  {displayName}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-tight truncate max-w-[120px]">
                  {displayEmail}
                </p>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                  aria-hidden="true"
                />
                <div className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  {/* User Info Block */}
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{displayName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{displayEmail}</p>
                  </div>
                  {/* Actions */}
                  <div className="p-1.5">
                    <button
                      id="logout-btn"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      <LogOut size={15} />
                      <span>{loggingOut ? t('loggingOut') : t('logout')}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
