# دليل المساهمة (Contributing Guide)

يسعدنا مساهمتك في مشروع **Admin Dashboard**! يرجى اتباع الإرشادات التالية لضمان الحفاظ على جودة الكود المعمارية.

## 📦 بيئة التطوير

1. **البيانات الوهمية:** للتطوير السريع دون الحاجة لمفاتيح حقيقية، استخدم الأمر `npm run dev:all`. سيعمل المشروع بـ `JSON Server` و `Mock Auth`.
2. **البيئة الحقيقية:** لاختبار بيئة الإنتاج محلياً، قم بإعداد المفاتيح في `.env.local` لـ Firebase و Supabase وغير `VITE_DATA_SOURCE=supabase`.

## 🏗️ كيفية إضافة ميزة جديدة

يجب أن تحترم ميزتك البنية المعمارية (Layered Architecture):

### 1. إضافة بيانات جديدة (مثال: الطلبات - Orders)
1. قم بإنشاء الـ Interface/Repository في طبقة البنية التحتية `src/infrastructure/repositories/OrderRepository.js`.
2. تأكد أن الـ Repository يدعم كلا المصدرين (JSON Server للتطوير، و Supabase للإنتاج).
3. لا تقم أبداً باستدعاء `axios` أو `supabase` مباشرة من المكونات (UI). استخدم الـ Repository دائماً.

### 2. إضافة مكون عرض (UI Component)
1. ضع المكون في `src/presentation/components/`.
2. إذا كان مكوناً قابلاً لإعادة الاستخدام (مثل Button, Modal)، ضعه في `src/presentation/components/ui/`.
3. حافظ على دعم **الوضع الليلي** (Dark Mode) و**اتجاه النص** (RTL).

### 3. إضافة صفحة جديدة (Page)
1. أنشئ مجلداً جديداً في `src/presentation/pages/` (مثال: `Orders/index.jsx`).
2. قم باستيراد الـ Repository لجلب البيانات.
3. أضف المسار في `src/App.jsx`. إذا كانت الصفحة حساسة، ضعها داخل المكون `<ProtectedRoute>`.

## 🧪 الاختبارات (Testing)

نستخدم `Vitest` و `React Testing Library`.
- قبل فتح Pull Request، تأكد من تشغيل الاختبارات: `npm run test`
- يجب كتابة اختبارات لأي مكون UI جديد أو Repository معقد.

## 📝 معايير القبول (Definition of Done)

- [ ] الكود نظيف ولا يحتوي على أي Warnings.
- [ ] الميزة تعمل بـ JSON Server و Supabase.
- [ ] المكون الجديد يدعم Dark Mode و RTL.
- [ ] تم تحديث الوثائق (إذا تطلب الأمر).
