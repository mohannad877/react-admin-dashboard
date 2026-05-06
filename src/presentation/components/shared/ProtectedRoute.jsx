/**
 * 🛡️ ProtectedRoute - حماية مسارات لوحة التحكم
 *
 * يتحقق من أن المستخدم مسجل الدخول قبل السماح بالوصول.
 * في حالة عدم تسجيل الدخول: يُعيد التوجيه لصفحة /login
 * مع حفظ المسار المطلوب أصلاً للرجوع إليه بعد الدخول.
 *
 * الاستخدام:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/" element={<Dashboard />} />
 *   </Route>
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../application/contexts/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // أثناء التحقق من الجلسة: اعرض شاشة تحميل لتجنب وميض صفحة الدخول
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/10 border border-teal-500/20 rounded-2xl mb-4">
            <svg className="animate-spin w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm">جارٍ التحقق من هويتك...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // احفظ المسار الحالي للرجوع إليه بعد الدخول
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
