/**
 * 🔥 إعداد Firebase Authentication
 *
 * يُستخدم هذا الملف لتهيئة عميل Firebase.
 * الوظيفة الوحيدة التي نستخدمها هنا هي Authentication.
 * قاعدة البيانات يتولاها Supabase بشكل منفصل.
 *
 * ⚠️  تأكد من وضع مفاتيحك الحقيقية في ملف .env.local
 *    ولا ترفع هذا الملف مع المفاتيح أبداً.
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// تهيئة Firebase فقط إذا كانت المفاتيح موجودة
const isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.authDomain);

let app = null;
let auth = null;
let analytics = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // تهيئة Analytics فقط في المتصفحات التي تدعمه
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
} else {
  console.warn(
    '[Firebase] لم يتم إعداد Firebase بعد. ' +
    'أضف مفاتيح VITE_FIREBASE_* في ملف .env.local للتفعيل الكامل. ' +
    'سيتم استخدام نمط المحاكاة في بيئة التطوير.'
  );
}

export { auth, analytics, isFirebaseConfigured };
export default app;
