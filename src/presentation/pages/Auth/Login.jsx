import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Eye, EyeOff, LogIn, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../../application/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // الرجوع للصفحة التي كان المستخدم يحاول الدخول إليها
  const from = location.state?.from?.pathname || '/';

  const getArabicError = (code) => {
    const errors = {
      'auth/user-not-found': 'البريد الإلكتروني غير مسجل.',
      'auth/wrong-password': 'كلمة المرور غير صحيحة.',
      'auth/invalid-email': 'صيغة البريد الإلكتروني غير صحيحة.',
      'auth/too-many-requests': 'تم تجاوز عدد المحاولات. حاول لاحقاً.',
      'auth/user-disabled': 'هذا الحساب موقوف. تواصل مع المسؤول.',
      'auth/invalid-credential': 'بيانات الدخول غير صحيحة.',
      'auth/network-request-failed': 'تحقق من اتصالك بالإنترنت.',
    };
    return errors[code] || 'حدث خطأ غير متوقع. حاول مجدداً.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getArabicError(err.code) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4" dir="rtl">
      <Helmet>
        <title>تسجيل الدخول | Admin Dashboard</title>
        <meta name="description" content="تسجيل الدخول إلى لوحة التحكم" />
      </Helmet>

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/20 border border-teal-500/30 rounded-2xl mb-4">
              <LogIn className="w-8 h-8 text-teal-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
            <p className="text-slate-400 mt-1 text-sm">سجّل دخولك للمتابعة</p>
          </div>

          {/* Dev Mode Banner */}
          {!isFirebaseConfigured && (
            <div className="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-6 text-amber-300 text-xs">
              <Info size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                <strong>وضع التطوير:</strong> Firebase غير مُعدّ. يمكنك الدخول بأي بريد وكلمة مرور.
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-300 mb-1.5">
                البريد الإلكتروني
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isFirebaseConfigured ? 'example@company.sa' : 'admin@company.sa'}
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 focus:outline-none transition-all text-sm"
                dir="ltr"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-slate-300 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isFirebaseConfigured ? '••••••••' : 'أي كلمة مرور'}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 pl-10 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 focus:outline-none transition-all text-sm"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs" role="alert">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              id="login-submit-btn"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-teal-900/50 text-sm mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>جارٍ تسجيل الدخول...</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>تسجيل الدخول</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-500 text-xs mt-6">
            نسيت كلمة المرور؟{' '}
            <span className="text-teal-400 cursor-pointer hover:underline">تواصل مع المسؤول</span>
          </p>
        </div>

        {/* Attribution */}
        <p className="text-center text-slate-600 text-xs mt-4">
          Admin Dashboard v2 · Enterprise Edition 🇸🇦
        </p>
      </div>
    </div>
  );
}
