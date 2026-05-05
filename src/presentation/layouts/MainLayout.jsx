import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex" dir="rtl">
      {/* Sidebar للديسكتوب */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden md:flex"
      />
      
      {/* Overlay للجوال */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar للجوال (Drawer) */}
      {mobileMenuOpen && (
        <Sidebar 
          collapsed={false}
          onToggle={() => setMobileMenuOpen(false)}
          className="md:hidden flex"
        />
      )}
      
      {/* المحتوى الرئيسي */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300
          ${sidebarCollapsed ? 'md:mr-16' : 'md:mr-64'}
        `}
      >
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
