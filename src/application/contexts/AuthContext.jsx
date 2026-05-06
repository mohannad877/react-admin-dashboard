/**
 * 🔐 AuthContext - إدارة حالة المصادقة عبر Firebase
 *
 * يوفر هذا الـ Context:
 *  - currentUser: بيانات المستخدم المسجل (null إذا لم يكن مسجلاً)
 *  - loading: حالة التحميل الأولية أثناء فحص الجلسة
 *  - login(email, password): تسجيل الدخول
 *  - logout(): تسجيل الخروج
 *  - isAuthenticated: هل المستخدم مسجل الدخول؟
 *
 * 💡 في وضع التطوير (بدون Firebase): يعمل بنمط محاكاة يتيح الدخول بأي بيانات.
 */
import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../../infrastructure/config/firebase';
import * as Sentry from '@sentry/react';

// ─── بيانات الدخول للمحاكاة (التطوير المحلي فقط) ─────────────────────────
const MOCK_USER = {
  uid: 'mock-dev-user',
  email: 'admin@company.sa',
  displayName: 'المسؤول',
  photoURL: null,
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // ── وضع المحاكاة: تحقق من وجود جلسة مخزنة محلياً ──
      const stored = sessionStorage.getItem('mock_auth');
      if (stored) setCurrentUser(MOCK_USER);
      setLoading(false);
      return;
    }

    // ── وضع Firebase الحقيقي: استمع لتغيرات الجلسة ──
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // ربط المستخدم بـ Sentry لتسهيل التشخيص
        Sentry.setUser({ id: user.uid, email: user.email });
      } else {
        Sentry.setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // تنظيف المستمع عند إزالة المكون
  }, []);

  // ─── دالة الدخول ─────────────────────────────────────────────────────────
  const login = async (email, password) => {
    if (!isFirebaseConfigured) {
      // محاكاة: اقبل أي بريد إلكتروني وكلمة مرور
      await new Promise((r) => setTimeout(r, 800)); // محاكاة تأخير الشبكة
      if (!email || !password) throw new Error('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      const user = { ...MOCK_USER, email };
      sessionStorage.setItem('mock_auth', '1');
      setCurrentUser(user);
      return user;
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ─── دالة الخروج ─────────────────────────────────────────────────────────
  const logout = async () => {
    if (!isFirebaseConfigured) {
      sessionStorage.removeItem('mock_auth');
      setCurrentUser(null);
      return;
    }
    return signOut(auth);
  };

  const value = {
    currentUser,
    loading,
    isAuthenticated: !!currentUser,
    login,
    logout,
    isFirebaseConfigured,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth يجب أن يُستخدم داخل AuthProvider');
  return ctx;
}
