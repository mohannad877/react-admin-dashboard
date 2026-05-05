# 🖥️ لوحة تحكم تفاعلية (Admin Dashboard)

> مشروع تدريبي احترافي يُبرز مهارات تطوير الواجهات الأمامية باستخدام React + Tailwind + React Router - مصمم خصيصاً للسوق السعودي مع دعم كامل للعربية (RTL).

---

## ✨ الميزات الرئيسية

- 🌓 **وضع ليلي/نهاري** مع حفظ التفضيل في localStorage
- 📱 **تصميم متجاوب** يعمل على جميع الأجهزة (موبايل، تابلت، ديسكتوب)
- 🔍 **بحث وفرز وتصفية** في جداول المستخدمين والمنتجات (مع Debounce)
- 📊 **رسوم بيانية تفاعلية** (Area Chart, Bar Chart, Pie Chart) باستخدام Recharts
- ✅ **عمليات CRUD** كاملة: إضافة، تعديل، حذف المستخدمين والمنتجات
- 🏷️ **شارات المخزون** الديناميكية (متوفر / منخفض / منفذ) مع تحديث تلقائي
- 🧩 **مكونات قابلة لإعادة الاستخدام**: DataTable، Button، Modal، Sidebar
- 🌐 **دعم RTL كامل** مع خط Tajawal العربي وتواريخ بالتقويم العربي

---

## 🛠️ التقنيات المستخدمة

| المجال | التقنية |
|--------|---------|
| الإطار | React 18 + Vite 5 |
| التوجيه | React Router v6 (`createBrowserRouter`) |
| الأنماط | Tailwind CSS v4 |
| إدارة الحالة | Context API |
| الرسوم البيانية | Recharts |
| الأيقونات | Lucide React |
| طلبات API | Axios |
| بيانات وهمية | JSON Server |
| النشر | Vercel |

---

## 📁 هيكلية المشروع

```
admin-dashboard/
├── public/
│   └── db.json                 # بيانات JSON Server (المستخدمون والمنتجات)
├── src/
│   ├── components/
│   │   ├── ui/                 # Button, DataTable
│   │   ├── layout/             # Sidebar, Header, MainLayout
│   │   ├── users/              # UserModal
│   │   └── products/           # ProductModal
│   ├── pages/
│   │   ├── Dashboard/          # لوحة الإحصائيات والمخططات
│   │   ├── Users/              # إدارة المستخدمين
│   │   └── Products/           # إدارة المنتجات
│   ├── contexts/               # ThemeContext (Dark Mode)
│   ├── hooks/                  # useDebounce
│   ├── services/               # api.js (Axios instance)
│   ├── utils/                  # helpers.js
│   ├── App.jsx                 # التوجيه الرئيسي
│   ├── main.jsx                # نقطة الدخول + Providers
│   └── index.css               # Tailwind + CSS Variables
├── .env.example
├── vercel.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 التشغيل المحلي

```bash
# 1. استنساخ المستودع
git clone https://github.com/mohannad877/react-admin-dashboard.git
cd react-admin-dashboard

# 2. تثبيت الاعتماديات
npm install

# 3. تشغيل التطبيق + API الوهمي معاً
npm run dev:all

# 🌐 التطبيق: http://localhost:5173
# 🔌 API الوهمي: http://localhost:3001
```

### أوامر منفصلة:
```bash
# تشغيل React فقط
npm run dev

# تشغيل JSON Server فقط
npm run dev:api

# بناء للإنتاج
npm run build
```

---

## 🔌 API Endpoints (JSON Server)

```
GET    /users          - جلب جميع المستخدمين
GET    /users?role=admin&status=active  - فلترة
POST   /users          - إضافة مستخدم
PATCH  /users/:id      - تعديل مستخدم
DELETE /users/:id      - حذف مستخدم

GET    /products       - جلب جميع المنتجات
GET    /products?category=electronics&price_gte=100  - فلترة
POST   /products       - إضافة منتج
PATCH  /products/:id   - تعديل منتج
DELETE /products/:id   - حذف منتج
```

---

## 📦 النشر على Vercel

المشروع جاهز للنشر مباشرة:

1. ارفع الكود على GitHub
2. ادخل [vercel.com](https://vercel.com) → **New Project**
3. اختر المستودع وانقر **Deploy**

> ⚠️ **ملاحظة API**: JSON Server يعمل محلياً فقط. في الإنتاج، استخدم [MockAPI.io](https://mockapi.io) أو انشر JSON Server على [Render.com](https://render.com) واضبط `VITE_API_URL` في إعدادات Vercel.

---

## 📸 لقطات الشاشة

| الصفحة | الوصف |
|--------|-------|
| لوحة التحكم | بطاقات إحصائية + 3 مخططات تفاعلية |
| إدارة المستخدمين | جدول مع بحث، فرز، فلاتر، وحذف |
| إدارة المنتجات | جدول مع صور مصغرة وشارات المخزون |

---

## 👨‍💻 المطور

**محمد** - مطور واجهات أمامية | Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-mohannad877-181717?style=flat&logo=github)](https://github.com/mohannad877)

---

## 📄 الرخصة

مشروع تعليمي مفتوح المصدر - مجاني للاستخدام والتعديل.
