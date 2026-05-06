import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Bell, Shield, Globe, Monitor, Moon, Sun, Check, Lock } from 'lucide-react';
import { useTheme } from '../../../application/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { switchLanguage } from '../../../shared/config/i18n';
import { useAuth } from '../../../application/contexts/AuthContext';
import { Button } from '../../components/ui/Button';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'profile', name: t('profileTab'), icon: User },
    { id: 'preferences', name: t('preferencesTab'), icon: Monitor },
    { id: 'notifications', name: t('notificationsTab'), icon: Bell },
    { id: 'security', name: t('securityOptionsTab'), icon: Lock },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
  };

  const currentLang = i18n.language.startsWith('ar') ? 'ar' : i18n.language.startsWith('fr') ? 'fr' : 'en';

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <Helmet>
        <title>{t('settings')} | Admin Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('settings')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          {t('settingsDesc')}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-800/30 border-b md:border-b-0 md:border-l border-slate-200 dark:border-slate-800 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 lg:p-8">
          
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">{t('personalInfo')}</h3>
              
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-2xl">
                  {currentUser?.displayName ? currentUser.displayName.charAt(0) : 'A'}
                </div>
                <Button variant="outline" size="sm">{t('changeAvatar')}</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('fullName')}</label>
                  <input type="text" defaultValue={currentUser?.displayName || t('admin')} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('emailAddress')}</label>
                  <input type="email" defaultValue={currentUser?.email || 'admin@company.com'} disabled className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('roleLabel')}</label>
                  <input type="text" defaultValue="{t('adminRoleName')}" disabled className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed" />
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">{t('appearanceAndLanguage')}</h3>
              
              {/* Theme */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Monitor size={16} /> {t('themeLabel')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => !isDark && toggleTheme()} className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${!isDark ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 ring-1 ring-teal-500' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    <Sun size={20} className={!isDark ? 'text-teal-600' : 'text-slate-400'} />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{t('lightModeBtn')}</span>
                  </button>
                  <button onClick={() => isDark && toggleTheme()} className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${isDark ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 ring-1 ring-teal-500' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    <Moon size={20} className={isDark ? 'text-teal-400' : 'text-slate-400'} />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{t('darkModeBtn')}</span>
                  </button>
                </div>
              </div>

              {/* Language */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Globe size={16} /> {t('displayLanguage')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['ar', 'en', 'fr'].map(lang => (
                    <button 
                      key={lang}
                      onClick={() => switchLanguage(lang)}
                      className={`flex justify-between items-center p-3 rounded-xl border transition-all ${currentLang === lang ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      <span className="font-medium text-sm text-slate-700 dark:text-slate-300">
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'English' : 'Français'}
                      </span>
                      {currentLang === lang && <Check size={16} className="text-teal-600 dark:text-teal-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">{t('systemNotifications')}</h3>
              <div className="space-y-4">
                {[
                  { title: t('stockAlerts'), desc: t('stockAlertsDesc'), defaultChecked: true },
                  { title: t('newUsers'), desc: t('newUsersDesc'), defaultChecked: false },
                  { title: t('weeklyReports'), desc: t('weeklyReportsDesc'), defaultChecked: true },
                  { title: t('securityUpdates'), desc: t('securityUpdatesDesc'), defaultChecked: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-teal-600 rtl:peer-checked:after:-translate-x-full"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab Fallback */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col items-center justify-center py-10 text-center">
              <Shield size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">إعدادات الأمان المتقدمة</h3>
              <p className="text-slate-500 max-w-sm">{t('securityFallbackDesc')}</p>
            </div>
          )}

          {/* Action Footer */}
          {activeTab !== 'security' && (
            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? t('saving') : t('saveChanges')}
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
